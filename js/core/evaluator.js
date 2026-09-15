/**
 * MOTOR DE EVALUACIÓN DE RETOS DE PROGRAMACIÓN (EVALUATOR)
 * Evalúa el código del estudiante contra conjuntos de pruebas unitarias.
 * Soporta evaluación orientada a variables (RA2) y a funciones (RA4+),
 * proporcionando diagnósticos pedagógicos de error claros y reproducibles.
 */

export class ChallengeEvaluator {
  /**
   * Evalúa el código de un alumno contra un reto completo
   * @param {string} userCode - Código fuente escrito por el alumno
   * @param {object|Array} challengeOrSuite - Configuración del reto o lista de tests
   * @returns {Promise<{ allPassed: boolean, results: Array<{name: string, passed: boolean, error: string|null}> }>}
   */
  static async evaluate(userCode, challengeOrSuite) {
    if (!userCode || typeof userCode !== 'string' || !userCode.trim()) {
      return {
        allPassed: false,
        results: [{
          name: 'Comprobación de código',
          passed: false,
          error: 'El editor está vacío. Escribe tu solución antes de comprobar.'
        }]
      };
    }

    // Normalizar objeto de reto
    const challenge = Array.isArray(challengeOrSuite)
      ? { type: 'function', tests: challengeOrSuite }
      : challengeOrSuite;

    const evaluationType = challenge.type || 'variable';

    if (evaluationType === 'variable') {
      return this.evaluateVariableChallenge(userCode, challenge);
    } else if (evaluationType === 'dom') {
      return this.evaluateDomChallenge(userCode, challenge);
    } else {
      return this.evaluateFunctionChallenge(userCode, challenge);
    }
  }

  /**
   * Evalúa retos basados en manipulación del DOM (RA6)
   * Verifica la presencia de nodos, clases, estilos y comportamiento en el lienzo visual
   */
  static async evaluateDomChallenge(userCode, challenge) {
    const results = [];
    let allPassed = true;
    const tests = challenge.tests || [];
    const canvasId = `challenge-canvas-${challenge.id}`;
    let canvas = document.getElementById(canvasId);

    let isCreatedSandbox = false;
    if (!canvas) {
      canvas = document.createElement('div');
      canvas.id = canvasId;
      canvas.style.display = 'none';
      document.body.appendChild(canvas);
      isCreatedSandbox = true;
    }

    // Restaurar HTML del canvas a su fixture inicial para la evaluación
    if (challenge.domFixture) {
      canvas.innerHTML = challenge.domFixture;
    }

    try {
      // Ejecutar código del alumno pasando canvas como argumento contextual
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const runnerFn = new AsyncFunction('canvas', userCode);
      await runnerFn(canvas);

      // Ejecutar cada caso de prueba sobre el DOM manipulado
      for (const t of tests) {
        try {
          let isOk = false;
          if (typeof t.testFn === 'function') {
            isOk = Boolean(await t.testFn(canvas, document));
          } else if (typeof t.testFn === 'string') {
            const testEvaluator = new Function('canvas', 'document', `return (${t.testFn})(canvas, document);`);
            isOk = Boolean(testEvaluator(canvas, document));
          }

          if (!isOk) allPassed = false;
          results.push({
            name: t.name,
            passed: isOk,
            error: isOk ? null : (t.error || 'La condición requerida sobre el DOM no se cumplió.')
          });
        } catch (testErr) {
          allPassed = false;
          results.push({
            name: t.name,
            passed: false,
            error: `Error en validación: ${testErr.message || String(testErr)}`
          });
        }
      }
    } catch (runtimeErr) {
      allPassed = false;
      results.push({
        name: 'Error de ejecución en el DOM',
        passed: false,
        error: `${runtimeErr.name}: ${runtimeErr.message}`
      });
    } finally {
      if (isCreatedSandbox && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }

    return { allPassed, results };
  }

  /**
   * Evalúa retos basados en variables de script (RA2)
   */
  static evaluateVariableChallenge(userCode, challenge) {
    const results = [];
    let allPassed = true;
    const tests = challenge.tests || [];
    const targetVars = challenge.targetVars || [];

    for (const t of tests) {
      try {
        const preparedCode = this.prepareVariableCode(userCode, t.inputs || {}, targetVars);
        
        // Ejecutar en entorno aislado
        const runnerFn = new Function(preparedCode);
        const outputs = runnerFn();

        // Verificar si alguna variable objetivo no estaba definida en ámbito
        let testPassed = true;
        let testError = null;

        if (t.expected) {
          for (const [key, expectedVal] of Object.entries(t.expected)) {
            if (outputs.__notDeclared && outputs.__notDeclared[key]) {
              testPassed = false;
              testError = `La variable '${key}' no está declarada o no es accesible (revisa que esté declarada en el ámbito principal, fuera de bloques if/else).`;
              break;
            }

            const actualVal = outputs[key];
            const isMatch = this.areValuesEqual(actualVal, expectedVal);

            if (!isMatch) {
              testPassed = false;
              const inputDesc = this.formatInputsSummary(t.inputs);
              testError = `Para ${inputDesc}: se esperaba ${key} = ${this.formatVal(expectedVal)}, pero se obtuvo ${this.formatVal(actualVal)}.`;
              break;
            }
          }
        }

        // Si incluye una función personalizada de verificación
        if (testPassed && typeof t.customCheck === 'function') {
          try {
            const ok = Boolean(t.customCheck(outputs));
            if (!ok) {
              testPassed = false;
              testError = t.customError || 'No se cumplió la condición de validación requerida.';
            }
          } catch (checkErr) {
            testPassed = false;
            testError = `Fallo en verificación: ${checkErr.message}`;
          }
        }

        if (!testPassed) allPassed = false;

        results.push({
          name: t.name,
          passed: testPassed,
          error: testError
        });
      } catch (runtimeErr) {
        allPassed = false;
        results.push({
          name: t.name,
          passed: false,
          error: `Error de ejecución: ${runtimeErr.name}: ${runtimeErr.message}`
        });
      }
    }

    return { allPassed, results };
  }

  /**
   * Evalúa retos basados en llamadas a funciones (RA4+)
   */
  static evaluateFunctionChallenge(userCode, challenge) {
    const results = [];
    let allPassed = true;
    const tests = challenge.tests || [];
    const fnName = challenge.functionName;

    try {
      const runnerFn = new Function(`
        ${userCode}
        ${fnName ? `return typeof ${fnName} !== 'undefined' ? ${fnName} : null;` : ''}
      `);
      const targetFunction = runnerFn();

      if (fnName && typeof targetFunction !== 'function') {
        return {
          allPassed: false,
          results: [{
            name: 'Declaración de función',
            passed: false,
            error: `No se encontró ninguna función declarada con el nombre '${fnName}'.`
          }]
        };
      }

      for (const t of tests) {
        try {
          const testEvaluator = new Function('fn', `return (${t.testFn})(fn);`);
          const isOk = Boolean(testEvaluator(targetFunction));

          if (!isOk) allPassed = false;
          results.push({
            name: t.name,
            passed: isOk,
            error: isOk ? null : (t.error || 'La condición no se cumplió con los datos de entrada.')
          });
        } catch (testErr) {
          allPassed = false;
          results.push({
            name: t.name,
            passed: false,
            error: testErr.message || String(testErr)
          });
        }
      }
    } catch (syntaxErr) {
      allPassed = false;
      results.push({
        name: 'Error de sintaxis o ejecución',
        passed: false,
        error: `${syntaxErr.name}: ${syntaxErr.message}`
      });
    }

    return { allPassed, results };
  }

  /**
   * Prepara el código del alumno sustituyendo/inyectando inputs y extrayendo variables de resultado
   */
  static prepareVariableCode(sourceCode, inputs, targetVars) {
    let transformedCode = sourceCode;

    // Sustituir o inyectar cada variable de entrada
    const injectedKeys = [];
    for (const [key, val] of Object.entries(inputs)) {
      const serialized = this.serializeForCode(val);
      // Coincidir con: let|const|var key = valor; o let key;
      const declRegex = new RegExp(`(^|[\\n;])\\s*(?:let|const|var)\\s+${key}\\s*(?:=[^;\\n]+)?;?`, 'g');

      let matched = false;
      transformedCode = transformedCode.replace(declRegex, (match, prefix) => {
        matched = true;
        return `${prefix}let ${key} = ${serialized};`;
      });

      if (!matched) {
        injectedKeys.push(`let ${key} = ${serialized};`);
      }
    }

    if (injectedKeys.length > 0) {
      transformedCode = `${injectedKeys.join('\n')}\n${transformedCode}`;
    }

    // Código de extracción de variables de salida de forma segura
    const allTargetVars = Array.from(new Set(targetVars));
    const extractionLines = allTargetVars.map(v => `
      let __val_${v} = undefined;
      let __missing_${v} = false;
      try {
        __val_${v} = ${v};
      } catch (e) {
        __missing_${v} = true;
      }
    `).join('\n');

    const returnObj = allTargetVars.map(v => `${v}: __val_${v}`).join(', ');
    const notDeclaredObj = allTargetVars.map(v => `${v}: __missing_${v}`).join(', ');

    return `
      ${transformedCode}

      ${extractionLines}
      return {
        ${returnObj},
        __notDeclared: { ${notDeclaredObj} }
      };
    `;
  }

  /**
   * Serializa un valor para inyectarlo como literal JavaScript válido
   */
  static serializeForCode(val) {
    if (val === undefined) return 'undefined';
    if (typeof val === 'number') {
      if (Number.isNaN(val)) return 'NaN';
      if (val === Infinity) return 'Infinity';
      if (val === -Infinity) return '-Infinity';
    }
    if (typeof val === 'bigint') return `${val}n`;
    if (typeof val === 'symbol') return 'Symbol()';
    return JSON.stringify(val);
  }

  /**
   * Compara dos valores considerando números en coma flotante, NaN, primitivos y objetos
   */
  static areValuesEqual(a, b) {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    if (typeof a === 'number' && typeof b === 'number') {
      return Math.abs(a - b) < 0.0001;
    }
    if (typeof a === 'object' && typeof b === 'object') {
      if (a === null || b === null) return a === b;
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
  }

  /**
   * Formatea un valor para mensajes docentes legibles
   */
  static formatVal(val) {
    if (val === undefined) return 'undefined';
    if (val === null) return 'null';
    if (Number.isNaN(val)) return 'NaN';
    if (typeof val === 'string') return `"${val}"`;
    return String(val);
  }

  /**
   * Formatea el resumen de inputs para el mensaje de error
   */
  static formatInputsSummary(inputs) {
    if (!inputs || Object.keys(inputs).length === 0) return 'la prueba';
    return Object.entries(inputs)
      .map(([k, v]) => `${k} = ${this.formatVal(v)}`)
      .join(', ');
  }
}
