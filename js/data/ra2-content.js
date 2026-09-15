/**
 * CONTENIDO DIDÁCTICO INTEGRAL: RESULTADO DE APRENDIZAJE 2 (RA2)
 * Módulo: Desarrollo Web en Entorno Cliente (0612) - FP DAW
 * Criterios de evaluación oficiales a) hasta h) y contenidos BORM
 */

export const RA2_CONTENT = {
  id: 'ra2',
  title: 'Manejo de la Sintaxis del Lenguaje: Variables, Tipos, Operadores, Decisiones y Bucles',
  duration: '14 Horas lectivas',
  officialCode: 'RA2 - Criterios a-h',

  // Lista de Subtemas Teóricos
  topics: [
    {
      id: 'ubicacion-entorno',
      title: '1. Ubicación del Código, Ciclo de Carga y Depuración',
      criteriaRef: 'Criterios a), h)',
      description: 'Cómo se integra JavaScript con el documento HTML, atributos defer y async, modo estricto ("use strict") y herramientas profesionales de depuración.',
      theoryHtml: `
        <p>En el desarrollo web en entorno cliente, el navegador interpreta el código HTML de manera secuencial (de arriba a abajo). La forma en que vinculamos los archivos de JavaScript influye directamente en los tiempos de renderizado y en la experiencia de usuario (Core Web Vitals).</p>

        <h4>A. Ubicación tradicional: &lt;head&gt; vs final del &lt;body&gt;</h4>
        <p>Históricamente, los scripts colocados en el <code>&lt;head&gt;</code> bloqueaban el análisis del HTML (HTML Parser Blocking). Por este motivo, la práctica clásica recomendaba ubicar las etiquetas <code>&lt;script&gt;</code> justo antes de la etiqueta de cierre <code>&lt;/body&gt;</code>.</p>

        <h4>B. La solución moderna: Atributos <code>defer</code> y <code>async</code></h4>
        <p>Actualmente, los navegadores modernos permiten cargar scripts externos sin bloquear el parser HTML mediante dos atributos booleanos clave:</p>
        <ul>
          <li><strong><code>async</code></strong>: El script se descarga en segundo plano de forma asíncrona. En el instante exacto en que finaliza la descarga, <em>el parser HTML se detiene</em> para ejecutar el script de inmediato. Los scripts con <code>async</code> no respetan el orden de aparición en el HTML (se ejecutan según terminen de descargarse). Ideal para analítica o widgets independientes.</li>
          <li><strong><code>defer</code> (Recomendado para la lógica de la app)</strong>: El script se descarga en paralelo mientras el HTML se parsea. Su ejecución se pospone hasta que todo el HTML se ha parseado por completo, pero <em>justo antes</em> de que se dispare el evento <code>DOMContentLoaded</code>. <strong>Garantiza el orden de ejecución</strong> en el que fueron declarados en el HTML.</li>
        </ul>

        <h4>C. Modo Estricto (<code>"use strict"</code>)</h4>
        <p>Introducido en ECMAScript 5, el modo estricto elimina errores silenciosos de JavaScript convirtiéndolos en excepciones arrojadas explícitamente (Throw Errors), impide la creación involuntaria de variables globales y prohíbe sintaxis obsoleta.</p>

        <h4>D. Depuración Profesional: DevTools y la sentencia <code>debugger</code></h4>
        <p>Para verificar el código, todo desarrollador de FP debe dominar la consola de las Chrome/Firefox DevTools (F12):</p>
        <ul>
          <li><code>console.log()</code>: Registro estándar de información.</li>
          <li><code>console.warn()</code> / <code>console.error()</code>: Mensajes con iconos y colores distintivos de advertencia o fallo.</li>
          <li><code>console.table()</code>: Renderiza matrices u objetos en formato de tabla interactiva.</li>
          <li><code>console.time()</code> y <code>console.timeEnd()</code>: Mide el tiempo de ejecución de un bloque de código en milisegundos.</li>
          <li><code>debugger</code>: Actúa como un punto de interrupción (breakpoint) programático que pausa la ejecución en DevTools permitiendo inspeccionar la pila de llamadas (Call Stack).</li>
        </ul>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica de Examen FP',
        text: 'Diferencia entre defer y async: "¿Cuál de los dos respeta el orden de los scripts y espera a que el DOM esté listo antes de ejecutarse?". Respuesta: <strong>defer</strong>. Async ejecuta apenas llega por red, sin respetar orden de inclusión.'
      },
      examples: [
        {
          id: 'ex-console-tools',
          title: 'Ejemplo Práctico 1: El poder de la API Console y medición de tiempos',
          description: 'Ejecuta el código para observar cómo formatear logs y medir el rendimiento.',
          initialCode: `// Demostración de métodos avanzados de la Consola
console.time("Procesamiento de datos");

const alumnosFP = [
  { id: 1, nombre: "Lucía García", modulo: "DAW Cliente", nota: 9.5 },
  { id: 2, nombre: "Marcos Ruiz", modulo: "DAW Cliente", nota: 7.2 },
  { id: 3, nombre: "Elena Vidal", modulo: "DAW Cliente", nota: 8.8 }
];

console.log("1. Registro estándar:");
console.log("Alumnos cargados:", alumnosFP.length);

console.warn("2. Advertencia preventiva:");
console.warn("Atención: El plazo de entrega de la práctica finaliza el viernes.");

console.log("3. Visualización con console.table:");
console.table(alumnosFP);

console.timeEnd("Procesamiento de datos");`
        }
      ]
    },

    {
      id: 'variables-scope',
      title: '2. Variables, Identificadores, Ámbitos (Scope) y Hoisting',
      criteriaRef: 'Criterios b), c)',
      description: 'Declaración con let, const y var, ámbitos de bloque vs función vs global, el fenómeno del Hoisting y la Temporal Dead Zone (TDZ).',
      theoryHtml: `
        <p>Una variable es un contenedor con nombre que almacena una referencia a un valor en memoria. En JavaScript moderno (ES6+), la gestión de memoria y el alcance de las variables se rigen por tres palabras reservadas:</p>

        <h4>A. Los Tres Tipos de Declaración</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: rgba(255,255,255,0.06); text-align: left;">
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Palabra clave</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Ámbito (Scope)</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Reasignable</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Redeclarable</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Hoisting</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><strong style="color:#ef4444;">var</strong> (Obsoleto)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Función o Global</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Sí</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Sí (Peligroso)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Sí (inicializa con <code>undefined</code>)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><strong style="color:#10b981;">let</strong> (Moderno)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Bloque <code>{ }</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Sí</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">No (SyntaxError)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">En TDZ (lanza ReferenceError)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><strong style="color:#38bdf8;">const</strong> (Moderno)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Bloque <code>{ }</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">No (TypeError)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">No</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">En TDZ (lanza ReferenceError)</td>
            </tr>
          </tbody>
        </table>

        <h4>B. Ámbito de Bloque (Block Scope)</h4>
        <p>Un bloque está delimitado por llaves <code>{ ... }</code> (como en un <code>if</code>, <code>for</code> o bloque simple). Las variables declaradas con <code>let</code> y <code>const</code> nacen y mueren dentro de ese bloque, evitando contaminar el entorno exterior.</p>

        <h4>C. Hoisting y la Zona Muerta Temporal (Temporal Dead Zone - TDZ)</h4>
        <p>El motor de JavaScript realiza dos pasadas al código: fase de creación (reserva memoria) y fase de ejecución. Con <code>var</code>, la variable se "eleva" (hoisted) y se inicializa con <code>undefined</code>. En cambio, con <code>let</code> y <code>const</code>, se eleva la reserva de nombre pero <strong>no se inicializa</strong>; acceder a ella antes de su línea de declaración dispara un <code>ReferenceError: Cannot access variable before initialization</code>. Ese lapso temporal se denomina <strong>TDZ</strong>.</p>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Regla de Oro de Arquitectura Profesional',
        text: 'Aplica el principio de inmutabilidad: <strong>Usa const por defecto en el 90% de los casos</strong>. Solo usa <code>let</code> cuando la variable cambie de valor de forma premeditada (por ejemplo, el acumulador de un bucle). NUNCA uses <code>var</code> en código nuevo.'
      },
      examples: [
        {
          id: 'ex-scope-tdz',
          title: 'Ejemplo Práctico 2: Ámbito de bloque vs Ámbito de var',
          description: 'Compara qué ocurre al acceder a variables fuera de un bloque if.',
          initialCode: `function demostrarAmbito() {
  console.log("--- Inicio de prueba de ámbito ---");
  
  if (true) {
    var variableVar = "Soy accesible en toda la función (var)";
    let variableLet = "Solo existo dentro de este bloque { }";
    const variableConst = 3.14159;
    
    console.log("Dentro del if:");
    console.log("variableLet:", variableLet);
    console.log("variableConst:", variableConst);
  }

  console.log("Fuera del if:");
  console.log("variableVar:", variableVar); // Funciona (se fugó del bloque)

  
    console.log(variableLet); // ReferenceError
  
}

demostrarAmbito();`
        }
      ]
    },

    {
      id: 'tipos-literales',
      title: '3. Tipos de Datos, Literales y Paso por Valor vs Referencia',
      criteriaRef: 'Criterios b), d)',
      description: 'Los 7 tipos de datos primitivos, tipo objeto, template strings con interpolación y la diferencia crítica entre paso por copia vs referencia.',
      theoryHtml: `
        <p>JavaScript es un lenguaje de tipado dinámico y débil. Las variables no tienen tipo fijo; el tipo lo determina el valor asignado en tiempo de ejecución.</p>

        <h4>A. Tipos Primitivos (Inmutables)</h4>
        <ol>
          <li><code>number</code>: Números enteros y de coma flotante de 64 bits (IEEE 754). Incluye valores especiales: <code>Infinity</code>, <code>-Infinity</code> y <code>NaN</code> (Not a Number).</li>
          <li><code>string</code>: Cadenas de caracteres alfanuméricos entre comillas simples, dobles o comillas invertidas.</li>
          <li><code>boolean</code>: <code>true</code> o <code>false</code>.</li>
          <li><code>undefined</code>: Variable declarada pero aún sin valor asignado.</li>
          <li><code>null</code>: Ausencia deliberada de valor (objeto nulo).</li>
          <li><code>symbol</code>: Identificador único e inmutable (ES6).</li>
          <li><code>bigint</code>: Enteros con precisión arbitraria para números mayores a 2<sup>53</sup> - 1 (sufijo <code>n</code>, ej: <code>9007199254740995n</code>).</li>
        </ol>

        <h4>B. Tipos por Referencia (Objetos)</h4>
        <p>Cualquier valor no primitivo es un objeto: <code>Object</code>, <code>Array</code>, <code>Function</code>, <code>Date</code>, etc. Los objetos se almacenan en el <em>Heap</em>, y la variable solo guarda un puntero o referencia en la memoria <em>Stack</em>.</p>

        <h4>C. Literales y Template Strings (ES6)</h4>
        <p>Los literales de plantilla delimitados por comillas invertidas (<em>backticks</em> <code>\`...\`</code>) permiten interpolación de expresiones con <code>\${expresion}</code> y textos multilínea nativos sin concatenar con <code>+</code>.</p>
      `,
      callout: {
        type: 'fp-exam',
        title: 'El Bug Histórico de JavaScript: typeof null',
        text: 'Si ejecutas <code>typeof null</code>, el resultado devuelto es <code>"object"</code>. Esto es un error de diseño original de 1995 que no se corrige para no romper la compatibilidad con millones de sitios web antiguos.'
      },
      examples: [
        {
          id: 'ex-tipos-datos',
          title: 'Ejemplo Práctico 3: Inspección de tipos con typeof y Template Literals',
          description: 'Verificación del tipo dinámico de distintas variables y formateo avanzado.',
          initialCode: `// Inspección de tipos primitivos
const matricula = "8492-KFC";
const creditos = 9;
const esAprobado = true;
let calificacionPendiente;
const beca = null;
const idSeguro = Symbol("id_estudiante");
const saldoGrande = 9007199254740999n;

console.log("typeof matricula:", typeof matricula);
console.log("typeof creditos:", typeof creditos);
console.log("typeof esAprobado:", typeof esAprobado);
console.log("typeof calificacionPendiente:", typeof calificacionPendiente);
console.log("typeof beca (Atención al bug histórico):", typeof beca);
console.log("typeof idSeguro:", typeof idSeguro);
console.log("typeof saldoGrande:", typeof saldoGrande);

// Template string multilínea e interpolación
const informe = \`
=== FICHA DE ESTUDIANTE ===
Matrícula: \${matricula}
Módulo: Desarrollo Web Cliente
Créditos ECTS: \${creditos}
¿Apto para Beca?: \${beca !== null ? "Sí" : "No asignada"}
\`;

console.log(informe);`
        }
      ]
    },

    {
      id: 'operadores-expresiones',
      title: '4. Operadores, Asignaciones y Evaluación en Cortocircuito',
      criteriaRef: 'Criterios b), e)',
      description: 'Operadores aritméticos, asignación compuesta, comparación estricta vs abstracta, cortocircuito lógico (&&, ||), coalescencia nula (??) y encadenamiento opcional (?. ).',
      theoryHtml: `
        <p>Los operadores permiten transformar y comparar valores para construir expresiones lógicas y matemáticas en nuestros programas.</p>

        <h4>A. Igualdad Estricta (<code>===</code>) vs Igualdad Débil (<code>==</code>)</h4>
        <p><strong>REGLA FUNDAMENTAL DE CLIENTE:</strong> Utiliza SIEMPRE <code>===</code> (triple igual) y <code>!==</code>. El operador <code>==</code> realiza una coerción implícita de tipos que provoca resultados erráticos (por ejemplo, <code>0 == ""</code> evalúa a <code>true</code>, mientras que <code>0 === ""</code> es <code>false</code>).</p>

        <h4>B. Evaluación en Cortocircuito (Short-Circuit Evaluation)</h4>
        <p>En expresiones lógicas, JavaScript evalúa de izquierda a derecha y se detiene en cuanto se determina el resultado:</p>
        <ul>
          <li><code>A && B</code>: Si <code>A</code> es falso, retorna <code>A</code> de inmediato sin evaluar <code>B</code>. Si <code>A</code> es verdadero, retorna <code>B</code>.</li>
          <li><code>A || B</code>: Si <code>A</code> es verdadero, retorna <code>A</code> de inmediato sin evaluar <code>B</code>. Si <code>A</code> es falso, retorna <code>B</code>.</li>
        </ul>

        <h4>C. Operadores Modernos ES2020: <code>??</code> y <code>?.</code></h4>
        <ul>
          <li><strong>Nullish Coalescing (<code>??</code>)</strong>: A diferencia de <code>||</code> (que sustituye valores como <code>0</code> o <code>""</code> porque son falsy), <code>??</code> solo sustituye si el valor es estrictamente <code>null</code> o <code>undefined</code>.</li>
          <li><strong>Optional Chaining (<code>?.</code>)</strong>: Permite leer propiedades anidadas de forma segura sin provocar un error si la referencia intermedia es nula.</li>
        </ul>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Buenas Prácticas con Valores por Defecto',
        text: 'Evita usar <code>const total = cantidad || 10;</code> si <code>cantidad</code> puede legítimamente ser <code>0</code> (¡cero es falsy y lo reemplazaría por 10!). Usa en su lugar <code>const total = cantidad ?? 10;</code>.'
      },
      examples: [
        {
          id: 'ex-operadores-modernos',
          title: 'Ejemplo Práctico 4: Cortocircuito, Coalescencia Nula y Comparación',
          description: 'Observa la diferencia fundamental entre el operador || y el operador ?? ante el valor 0.',
          initialCode: `// Comparación de Igualdad
console.log("0 == ''  ->", 0 == '');   // true (coerción peligrosa)
console.log("0 === '' ->", 0 === ''); // false (comparación estricta y segura)

// Diferencia crucial entre || y ??
const intentosUsuario = 0; // El usuario tiene 0 intentos válidos

// Con || (Reemplaza porque 0 es FALSY)
const intentosDefectoOR = intentosUsuario || 3;
console.log("Con || intentos:", intentosDefectoOR); // Imprime 3 (¡Incorrecto!)

// Con ?? (Solo reemplaza si es null o undefined)
const intentosDefectoNullish = intentosUsuario ?? 3;
console.log("Con ?? intentos:", intentosDefectoNullish); // Imprime 0 (¡Correcto!)

// Encadenamiento Opcional ?.
const configuracion = {
  usuario: {
    nombre: "Ana",
    contacto: null
  }
};

// Evitamos el temido TypeError: Cannot read properties of null
console.log("Teléfono seguro:", configuracion.usuario.contacto?.telefono ?? "No disponible");`
        }
      ]
    },

    {
      id: 'conversiones-coercion',
      title: '5. Conversiones y Coerción de Tipos (Type Casting)',
      criteriaRef: 'Criterios b), d)',
      description: 'Conversión explícita con Number(), String(), Boolean(), parseInt vs parseFloat, los 8 valores falsy y trampas de coerción implícita.',
      theoryHtml: `
        <p>La coerción de tipos es la conversión automática o implícita de valores de un tipo de datos a otro. Es una de las fuentes más frecuentes de errores lógicos en el desarrollo cliente.</p>

        <h4>A. Conversión Explícita (Recomendada)</h4>
        <ul>
          <li>A String: <code>String(valor)</code> o <code>valor.toString()</code>.</li>
          <li>A Number: <code>Number(valor)</code>, <code>parseInt(str, 10)</code>, <code>parseFloat(str)</code>.</li>
          <li>A Boolean: <code>Boolean(valor)</code> o la doble negación <code>!!valor</code>.</li>
        </ul>

        <h4>B. La Lista Oficial de los 8 Valores Falsy en JavaScript</h4>
        <p>Al ser evaluados en un contexto booleano (como la condición de un <code>if</code>), solo <strong>ocho</strong> valores se consideran falsos. Todo lo demás (incluidos <code>[]</code> y <code>{}</code>) es <strong>truthy</strong>:</p>
        <ol>
          <li><code>false</code></li>
          <li><code>0</code> (cero numérico)</li>
          <li><code>-0</code> (cero negativo)</li>
          <li><code>0n</code> (BigInt cero)</li>
          <li><code>""</code> (cadena vacía)</li>
          <li><code>null</code></li>
          <li><code>undefined</code></li>
          <li><code>NaN</code> (Not a Number)</li>
        </ol>

        <h4>C. La Peculiaridad de NaN</h4>
        <p><code>NaN</code> representa el resultado de una operación matemática no válida (ej: <code>"hola" * 2</code>). Regla inmutable: <code>NaN</code> <strong>no es igual a nada, ni siquiera a sí mismo</strong> (<code>NaN === NaN</code> devuelve <code>false</code>). Para comprobarlo se debe usar <code>Number.isNaN(valor)</code>.</p>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Trampa Típica de Examen: Coerción con + vs Otros Operadores',
        text: 'El operador <code>+</code> está sobrecargado: si uno de los operandos es String, <strong>concatena</strong> (<code>"5" + 2 = "52"</code>). En cambio, <code>-</code>, <code>*</code>, <code>/</code> fuerzan siempre conversión numérica (<code>"5" - 2 = 3</code>).'
      },
      examples: [
        {
          id: 'ex-coercion-falsy',
          title: 'Ejemplo Práctico 5: Conversiones explícitas y detección de Falsy',
          description: 'Prueba de coerción implícita y verificación de arrays vacíos.',
          initialCode: `// Curiosidades del operador + frente a -
console.log('"5" + 3  =>', "5" + 3);  // Concatenación: "53"
console.log('"5" - 3  =>', "5" - 3);  // Coerción matemática: 2
console.log('"5" * "2" =>', "5" * "2"); // 10

// Cuidado con NaN
const resultadoErroneo = Number("texto-invalido");
console.log("resultadoErroneo es:", resultadoErroneo);
console.log("¿resultadoErroneo === NaN?:", resultadoErroneo === NaN); // false!
console.log("Forma correcta -> Number.isNaN():", Number.isNaN(resultadoErroneo)); // true

// Comprobación de Truthy / Falsy
console.log("Boolean(0):", Boolean(0));           // false
console.log("Boolean(''):", Boolean(''));         // false
console.log("Boolean([]):", Boolean([]));         // true (¡los arrays vacíos son truthy!)
console.log("Boolean({}):", Boolean({}));         // true (los objetos vacíos son truthy!)`
        }
      ]
    },

    {
      id: 'estructuras-decisiones',
      title: '6. Estructuras de Control: Decisiones y Patrón Early Return',
      criteriaRef: 'Criterio e)',
      description: 'Sentencias if, else if, else, operador ternario, switch y buenas prácticas de código limpio eliminando el anidamiento excesivo (Arrow Code).',
      theoryHtml: `
        <p>Las sentencias condicionales permiten alterar el flujo de ejecución de un programa en función de si una expresión se evalúa como verdadera o falsa.</p>

        <h4>A. Sentencia <code>if / else if / else</code></h4>
        <p>Permite bifurcar la ejecución. El código debe agruparse siempre dentro de llaves <code>{ }</code> por motivos de legibilidad y mantenibilidad, incluso si el bloque contiene una sola línea.</p>

        <h4>B. El Patrón Early Return (Retorno Temprano)</h4>
        <p>En el desarrollo profesional se debe evitar el "Arrow Code" (anidamiento piramidal de <code>if</code> dentro de <code>else</code> dentro de <code>if</code>). La técnica de <strong>Early Return</strong> comprueba las condiciones negativas o de error en las primeras líneas y retorna inmediatamente, dejando el flujo principal plano y claro.</p>

        <h4>C. Operador Condicional Ternario (<code>? :</code>)</h4>
        <p>Estructura: <code>condicion ? valorSiVerdadero : valorSiFalso</code>. Excelente para asignaciones de una línea. <em>Consejo Clean Code:</em> Nunca anides ternarios múltiples; dificultan gravemente la lectura del código.</p>

        <h4>D. Sentencia <code>switch</code></h4>
        <p>Útil cuando comparamos una misma variable frente a múltiples valores concretos. La comparación interna se realiza mediante igualdad estricta (<code>===</code>). Es indispensable incluir la sentencia <code>break</code> para evitar la ejecución accidental en cascada (fall-through), así como la cláusula <code>default</code> para cubrir casos no contemplados.</p>
      `,
      callout: {
        type: 'architecture',
        title: 'Clean Code: Refactorizando Arrow Code',
        text: 'Si una función tiene más de dos niveles de llaves anidadas <code>if (x) { if (y) { ... } }</code>, refactorízala aplicando cláusulas de guarda (guard clauses) con retornos rápidos.'
      },
      examples: [
        {
          id: 'ex-decisiones-clean',
          title: 'Ejemplo Práctico 6: Early Return vs Anidamiento',
          description: 'Función de cálculo de descuento en matrícula aplicando cláusulas de guardia.',
          initialCode: `// Ejemplo de Early Return Pattern aplicado a un proceso de matrícula
function calcularDescuentoMatricula(edad, esFamiliaNumerosa, tieneBeca) {
  // 1. Cláusulas de guarda (verificaciones negativas al inicio)
  if (edad < 16) {
    return { error: "La edad mínima para cursar ciclos es 16 años.", descuento: 0 };
  }
  
  if (tieneBeca) {
    return { exento: true, descuento: 100, motivo: "Beca completa del Ministerio" };
  }

  if (esFamiliaNumerosa) {
    return { exento: false, descuento: 50, motivo: "Familia numerosa (50%)" };
  }

  // 2. Camino feliz / caso estándar al final sin anidar 'else'
  return { exento: false, descuento: 0, motivo: "Tarifa estándar ordinaria" };
}

console.log("Caso 1 (Menor de edad):", calcularDescuentoMatricula(15, false, false));
console.log("Caso 2 (Con Beca):", calcularDescuentoMatricula(20, false, true));
console.log("Caso 3 (Familia Numerosa):", calcularDescuentoMatricula(22, true, false));
console.log("Caso 4 (Ordinario):", calcularDescuentoMatricula(25, false, false));`
        }
      ]
    },

    {
      id: 'bucles-iteraciones',
      title: '7. Estructuras de Control: Bucles e Iteraciones',
      criteriaRef: 'Criterio f)',
      description: 'Bucles for clásico, while, do-while, sentencias de control break y continue, bucles infinitos y diferencias con for...of.',
      theoryHtml: `
        <p>Los bucles permiten ejecutar un bloque de sentencias de forma repetitiva mientras se cumpla una condición dada.</p>

        <h4>A. El Bucle <code>for</code> Clásico</h4>
        <p>Sintaxis: <code>for (inicialización; condición; actualización) { ... }</code>. Es ideal cuando conocemos o podemos calcular previamente el número exacto de iteraciones.</p>

        <h4>B. Bucles <code>while</code> y <code>do...while</code></h4>
        <ul>
          <li><code>while (condicion) { ... }</code>: Evalúa la condición <strong>antes</strong> de entrar al cuerpo del bucle. Si la condición es falsa de inicio, el bucle no se ejecutará ninguna vez.</li>
          <li><code>do { ... } while (condicion);</code>: Ejecuta el bloque <strong>al menos una vez</strong> de forma garantizada antes de verificar la condición al final.</li>
        </ul>

        <h4>C. Sentencias de Interrupción: <code>break</code> y <code>continue</code></h4>
        <ul>
          <li><strong><code>break</code></strong>: Detiene la ejecución del bucle por completo y salta inmediatamente a la siguiente sentencia posterior al bucle.</li>
          <li><strong><code>continue</code></strong>: Finaliza inmediatamente la iteración actual y avanza a la siguiente evaluación/iteración del bucle.</li>
        </ul>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Peligro en Bucles While',
        text: 'Asegúrate siempre de que dentro del cuerpo de un bucle <code>while</code> exista una sentencia que modifique la variable de control hacia la condición de salida; de lo contrario, provocarás un bucle infinito que congelará la pestaña del navegador.'
      },
      examples: [
        {
          id: 'ex-bucles-control',
          title: 'Ejemplo Práctico 7: Filtrado y control con break y continue',
          description: 'Recorrido numérico saltando múltiplos y deteniendo en un límite específico.',
          initialCode: `console.log("--- Búsqueda del primer número primo o salto con continue ---");

// Demostración de continue y break
console.log("Imprimiendo números del 1 al 10 omitiendo pares (continue) y parando en 9 (break):");

for (let i = 1; i <= 10; i++) {
  // Si es número par, saltamos a la siguiente iteración
  if (i % 2 === 0) {
    continue;
  }

  // Si alcanzamos el 9, salimos del bucle
  if (i === 9) {
    console.log("Se alcanzó el 9 -> break!");
    break;
  }

  console.log("Iteración procesada:", i);
}

// Ejemplo práctico con do...while garantizando al menos una tirada
let tiradaDado;
let intentos = 0;

do {
  intentos++;
  tiradaDado = Math.floor(Math.random() * 6) + 1;
  console.log(\`Tirada #\${intentos}: Ha salido un \${tiradaDado}\`);
} while (tiradaDado !== 6 && intentos < 5);

console.log(\`Fin de tiradas tras \${intentos} intentos.\`);`
        }
      ]
    },

    {
      id: 'comentarios-cleancode',
      title: '8. Comentarios, Documentación con JSDoc y Clean Code',
      criteriaRef: 'Criterio g)',
      description: 'Buenas prácticas en el uso de comentarios, sintaxis de documentación JSDoc para funciones y parámetros, y código auto-explicativo.',
      theoryHtml: `
        <p>Un código limpio (Clean Code) se lee como prosa bien escrita. Los nombres de variables y funciones deben expresar con total claridad su propósito sin necesidad de recurrir a comentarios superfluos.</p>

        <h4>A. Tipos de Comentarios en JavaScript</h4>
        <ul>
          <li>De una sola línea: <code>// Comentario breve</code></li>
          <li>Multilínea: <code>/* Bloque explicativo */</code></li>
        </ul>

        <h4>B. ¿Cuándo comentar?</h4>
        <ul>
          <li><strong>NO comentes lo obvio</strong>: <code>let total = precio + iva; // Suma el precio y el iva</code> (Inútil).</li>
          <li><strong>SÍ comenta decisiones de negocio o casos excepcionales</strong>: <code>// Restamos 1 al mes porque en la API Date de JS los meses indexan de 0 a 11</code>.</li>
        </ul>

        <h4>C. Estándar JSDoc</h4>
        <p>JSDoc es el estándar de la industria para documentar APIs y funciones en JavaScript. Los editores modernos (como VS Code) leen estas etiquetas para proveer autocompletado y tipado inteligente (IntelliSense):</p>
        <pre style="background: var(--bg-code-editor); border: 1px solid rgba(87, 76, 67, 0.3); padding: 14px; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 0.85rem; color: #fbd38d; overflow-x: auto;">
/**
 * Calcula el importe total con impuestos aplicados.
 * @param {number} baseImponible - Importe monetario base en euros.
 * @param {number} porcentajeIva - Tipo impositivo (ej: 21 para el 21%).
 * @returns {number} El total redondeado a dos decimales.
 */
function calcularTotalFactura(baseImponible, porcentajeIva) {
  const cuotaIva = baseImponible * (porcentajeIva / 100);
  return Number((baseImponible + cuotaIva).toFixed(2));
}
        </pre>
      `,
      callout: {
        type: 'architecture',
        title: 'Mantenibilidad de Código en FP',
        text: 'La documentación con JSDoc es evaluada en las rúbricas de proyectos de FP. Acostumbra a tus alumnos a documentar toda función que reciba parámetros o devuelva un valor.'
      },
      examples: [
        {
          id: 'ex-jsdoc-demo',
          title: 'Ejemplo Práctico 8: Función auto-documentada con JSDoc',
          description: 'Función de cálculo financiero documentada para producción.',
          initialCode: `/**
 * Determina el estado de evaluación de un alumno en un módulo de FP.
 * @param {string} nombreAlumno - Nombre y apellidos del alumno.
 * @param {number} notaExamen - Nota del examen teórico (0 a 10).
 * @param {number} notaPracticas - Nota de las prácticas entregadas (0 a 10).
 * @returns {object} Objeto con la calificación final y el veredicto.
 */
function evaluarAlumno(nombreAlumno, notaExamen, notaPracticas) {
  // Ponderación oficial de departamento: 60% examen, 40% prácticas
  const PESO_EXAMEN = 0.60;
  const PESO_PRACTICAS = 0.40;

  const notaFinal = (notaExamen * PESO_EXAMEN) + (notaPracticas * PESO_PRACTICAS);
  const notaRedondeada = Number(notaFinal.toFixed(1));

  const superado = notaRedondeada >= 5.0 && notaExamen >= 4.0;

  return {
    alumno: nombreAlumno,
    notaFinal: notaRedondeada,
    aprobado: superado,
    mencion: notaRedondeada >= 9 ? "Sobresaliente" : notaRedondeada >= 7 ? "Notable" : notaRedondeada >= 5 ? "Aprobado" : "Suspenso"
  };
}

const resultadoEvaluacion = evaluarAlumno("Carlos Mendoza", 7.5, 9.0);
console.log("Resultado de evaluación:", resultadoEvaluacion);`
        }
      ]
    }
  ],

  // BATERÍA DE EJERCICIOS DE AUTOEVALUACIÓN (TIPO TEST DE EXAMEN FP)
  quizzes: [
    {
      id: 'quiz-1',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Scope & Declaración',
      question: '¿Cuál será la salida por consola tras ejecutar el siguiente código?',
      codeSnippet: `console.log(mensaje);
var mensaje = "Hola Mundo de FP";`,
      options: [
        'Lanza un ReferenceError: Cannot access mensaje before initialization',
        'Imprime undefined debido al Hoisting de var',
        'Imprime "Hola Mundo de FP"',
        'Lanza un TypeError'
      ],
      correctIndex: 1,
      explanation: 'Las variables declaradas con "var" sufren Hoisting: su declaración se eleva al inicio del ámbito y se inicializan automáticamente con "undefined". Si se hubiera usado "let" o "const", se encontraría en la Temporal Dead Zone (TDZ) y lanzaría un ReferenceError.'
    },
    {
      id: 'quiz-2',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'Tipos & Coerción',
      question: '¿Qué valor devuelve la expresión: typeof typeof null ?',
      codeSnippet: `console.log(typeof typeof null);`,
      options: [
        '"null"',
        '"object"',
        '"string"',
        '"undefined"'
      ],
      correctIndex: 2,
      explanation: 'Primero se evalúa "typeof null", que por el bug histórico de JavaScript devuelve la cadena "object". Luego se evalúa "typeof \'object\'", y como cualquier resultado del operador typeof es siempre una cadena de texto (string), el resultado final es "string".'
    },
    {
      id: 'quiz-3',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Operadores & Igualdad',
      question: '¿Cuál de las siguientes comparaciones evaluará a FALSE en JavaScript?',
      codeSnippet: `// Compara las siguientes expresiones:
1) "" == false
2) 0 == false
3) null == undefined
4) NaN === NaN`,
      options: [
        '"" == false',
        '0 == false',
        'null == undefined',
        'NaN === NaN'
      ],
      correctIndex: 3,
      explanation: 'En JavaScript, NaN (Not-a-Number) es el único valor en todo el lenguaje que nunca es igual a ningún valor, ¡ni siquiera a sí mismo! Por tanto, "NaN === NaN" es false. Por el contrario, en igualdad débil (==), "" y 0 se coercen a falso, y null == undefined es true según las reglas de ECMAScript.'
    },
    {
      id: 'quiz-4',
      difficulty: 'Fácil',
      difficultyClass: 'diff-facil',
      topicTag: 'Carga de Scripts',
      question: '¿Qué atributo de la etiqueta script garantiza que los scripts se descarguen en segundo plano y se ejecuten en el orden exacto en el que aparecen en el HTML una vez terminado el parseo?',
      codeSnippet: `<script src="modulo-cliente.js" ???></script>`,
      options: [
        'async',
        'defer',
        'preload',
        'strict'
      ],
      correctIndex: 1,
      explanation: 'El atributo "defer" descarga el archivo en paralelo sin bloquear el análisis del DOM y asegura que los scripts se ejecuten en estricto orden de declaración justo antes de DOMContentLoaded. En cambio, "async" ejecuta de inmediato apenas llega el archivo, sin respetar ningún orden.'
    },
    {
      id: 'quiz-5',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'Operador Nullish',
      question: 'Dado el código: const cupo = 0; const plazas = cupo ?? 25; ¿Cuál es el valor de plazas?',
      codeSnippet: `const cupo = 0;
const plazas = cupo ?? 25;`,
      options: [
        '25',
        '0',
        'undefined',
        'Lanza un SyntaxError'
      ],
      correctIndex: 1,
      explanation: 'El operador de coalescencia nula (??) solo sustituye el valor si el operando de la izquierda es estrictamente "null" o "undefined". Dado que 0 es un número válido (aunque sea falsy), no se sustituye y plazas vale 0. Si se hubiera usado || en vez de ??, habría devuelto 25.'
    },
    {
      id: 'quiz-6',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Bucles & Salto',
      question: '¿Cuántas veces imprimirá "Paso" el siguiente bucle?',
      codeSnippet: `for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  if (i === 4) break;
  console.log("Paso");
}`,
      options: [
        '5 veces',
        '2 veces (para i=0 y i=1)',
        '3 veces (para i=0, i=1 y i=3)',
        '4 veces'
      ],
      correctIndex: 2,
      explanation: 'Para i=0 imprime "Paso". Para i=1 imprime "Paso". Para i=2 se ejecuta "continue" (salta la iteración sin imprimir). Para i=3 imprime "Paso". Para i=4 se ejecuta "break" (termina el bucle inmediatamente). En total imprime "Paso" exactamente 3 veces.'
    },
    {
      id: 'quiz-7',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Ámbitos & Bucles',
      question: '¿Qué imprimirá por consola la última línea tras finalizar el siguiente bucle?',
      codeSnippet: `for (var i = 0; i < 3; i++) {
  // iterando
}
console.log(i);`,
      options: [
        'Lanza un ReferenceError: i is not defined',
        'Imprime 3',
        'Imprime 2',
        'Imprime undefined'
      ],
      correctIndex: 1,
      explanation: 'Las variables declaradas con "var" tienen ámbito de función o global, carecen de ámbito de bloque (block scope). Al finalizar el bucle cuando i llega a 3 (la condición 3 < 3 da false), la variable i sigue existiendo fuera del bucle con valor 3. Si se hubiera usado "let", lanzaría un ReferenceError al intentar acceder fuera del bloque for.'
    },
    {
      id: 'quiz-8',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'Valor vs Referencia',
      question: '¿Cuál será la salida del siguiente código respecto a la mutabilidad de objetos?',
      codeSnippet: `const modulo1 = { nombre: "DAW Cliente", horas: 14 };
const modulo2 = modulo1;
modulo2.horas = 20;

console.log(modulo1.horas);`,
      options: [
        '14 (porque modulo2 es una copia independiente)',
        '20 (porque ambas variables apuntan a la misma referencia en el Heap)',
        'Lanza un TypeError: Assignment to constant variable',
        'undefined'
      ],
      correctIndex: 1,
      explanation: 'En JavaScript los objetos no se copian por valor, sino por referencia. Tanto "modulo1" como "modulo2" apuntan al mismo espacio en la memoria Heap. Modificar una propiedad mediante modulo2 afecta directamente al mismo objeto. Además, "const" impide reasignar la variable a otro objeto, pero permite mutar sus propiedades internas.'
    },
    {
      id: 'quiz-9',
      difficulty: 'Fácil',
      difficultyClass: 'diff-facil',
      topicTag: 'Operadores Lógicos',
      question: '¿Cuál es el valor final de la variable contador tras la siguiente evaluación?',
      codeSnippet: `let contador = 0;
const evaluacion = false && ++contador;
console.log(contador);`,
      options: [
        '1',
        '0',
        'false',
        'undefined'
      ],
      correctIndex: 1,
      explanation: 'El operador lógico AND (&&) aplica cortocircuito (Short-Circuit Evaluation): si el primer operando es falsy (en este caso "false"), el motor de JavaScript detiene la evaluación inmediatamente sin calcular el operando derecho. Por tanto, "++contador" nunca llega a ejecutarse y contador permanece en 0.'
    },
    {
      id: 'quiz-10',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Coerción Implícita',
      question: '¿Qué imprime por consola la ejecución de las siguientes operaciones con coerción?',
      codeSnippet: `const a = 5 + "5";
const b = 5 - "5";
console.log(a, b);`,
      options: [
        '10 0',
        '"55" 0',
        '"55" NaN',
        '10 NaN'
      ],
      correctIndex: 1,
      explanation: 'El operador binario "+" con un operando tipo string actúa como operador de concatenación textual, convirtiendo el 5 numérico en string y produciendo "55". Por el contrario, el operador de resta "-" no existe para cadenas de texto, por lo que el motor de JavaScript fuerza la conversión numérica del string "5" a número 5, calculando 5 - 5 = 0.'
    },
    {
      id: 'quiz-11',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Control de Flujo: Switch',
      question: '¿Qué valor mostrará por consola la variable salida tras ejecutarse la sentencia switch?',
      codeSnippet: `const opcion = "1";
let salida = "";

switch (opcion) {
  case 1:
    salida += "A";
  case "1":
    salida += "B";
  case "2":
    salida += "C";
    break;
  default:
    salida += "D";
}
console.log(salida);`,
      options: [
        '"ABC"',
        '"B"',
        '"BC"',
        '"BD"'
      ],
      correctIndex: 2,
      explanation: 'La instrucción "switch" evalúa los casos utilizando comparación estricta (===). Como opcion es el string "1", no coincide con el número 1 del primer case, pero sí con "1". Al no haber una sentencia "break" en case "1", la ejecución cae en cascada (fallthrough) hacia el siguiente case, ejecutando también salida += "C" hasta topar con el break. Resultado final: "BC".'
    },
    {
      id: 'quiz-12',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'Bucles: for...in vs for...of',
      question: '¿Qué mostrará la consola al ejecutar el siguiente fragmento con arrays e iteradores?',
      codeSnippet: `const notas = [7, 8, 9];
let resIn = "";
let resOf = "";

for (const x in notas) resIn += x;
for (const y of notas) resOf += y;

console.log(resIn, resOf);`,
      options: [
        '"789" "789"',
        '"012" "789"',
        '"789" "012"',
        '"012" "012"'
      ],
      correctIndex: 1,
      explanation: '"for...in" está diseñado para iterar sobre las propiedades o índices enumerables de un objeto o array (en un array son los índices "0", "1", "2"). En cambio, "for...of" (introducido en ES6) itera sobre los valores reales de cualquier colección iterable, recorriendo los elementos 7, 8 y 9.'
    },
    {
      id: 'quiz-13',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Modo Estricto ("use strict")',
      question: '¿Qué ocurrirá al invocar la función procesar() bajo la directiva "use strict"?',
      codeSnippet: `"use strict";
function procesar() {
  notaFinal = 10;
}
procesar();`,
      options: [
        'Se crea automáticamente una variable global notaFinal en el objeto window',
        'Lanza un ReferenceError: notaFinal is not defined',
        'Lanza un TypeError: Assignment to read-only property',
        'La asignación se ignora silenciosamente sin errores'
      ],
      correctIndex: 1,
      explanation: 'En modo no estricto tradicional, asignar un valor a una variable no declarada creaba de forma involuntaria una variable global en "window". En modo estricto ("use strict"), este fallo de diseño se bloquea y el motor de JavaScript lanza un ReferenceError, forzando a declarar las variables con let, const o var.'
    },
    {
      id: 'quiz-14',
      difficulty: 'Fácil',
      difficultyClass: 'diff-facil',
      topicTag: 'Documentación JSDoc',
      question: 'En el estándar profesional de documentación JSDoc, ¿cuál es la etiqueta oficial para documentar el tipo y descripción del valor que devuelve una función?',
      codeSnippet: `/**
 * Calcula el promedio ponderado del alumno.
 * @param {number[]} notas
 * @??? {number} Promedio final
 */
function calcularPromedio(notas) { ... }`,
      options: [
        '@output',
        '@returns (o @return)',
        '@yield',
        '@result'
      ],
      correctIndex: 1,
      explanation: 'En la especificación normativa de JSDoc, "@returns" (o su sinónimo "@return") es la etiqueta estándar que describe el tipo de dato y la semántica del valor devuelto por la función. Permite a los IDEs modernos proveer autocompletado y tipado estático.'
    }
  ],

  // RETOS DE PROGRAMACIÓN GUIADA (CODING CHALLENGES CON VERIFICACIÓN)
  // Diseñados estrictamente con contenidos de RA2 (variables, tipos, operadores, control de flujo y bucles)
  challenges: [
    {
      id: 'challenge-1',
      title: 'Reto 1: Validador de Tipos Primitivos y Valores Falsy Estricto',
      difficulty: 'Básico',
      topicTag: 'Variables, Tipos y Falsy',
      type: 'variable',
      targetVars: ['esValido'],
      instructions: `En la validación de formularios de matrícula en FP, recibimos valores que pueden ser erróneos o utilizables. Escribe el código necesario para evaluar <code>datoEntrada</code> y asignar un booleano (<code>true</code> o <code>false</code>) a la variable <code>esValido</code>:
      <ul>
        <li><code>esValido</code> debe ser <code>false</code> si <code>datoEntrada</code> es estrictamente <code>null</code>, <code>undefined</code> o <code>NaN</code>.</li>
        <li><code>esValido</code> debe ser <code>true</code> si es el número <code>0</code> (¡cero es una nota o cantidad válida!), cualquier cadena de texto (incluso vacía <code>""</code>) o un valor booleano (<code>true</code> o <code>false</code>).</li>
      </ul>
      <em>Nota pedagógica: Resuelve este reto usando únicamente variables, operadores de comparación (<code>===</code>) y operadores lógicos (<code>||</code>, <code>!</code>).</em>`,
      starterCode: `// Variable de entrada para pruebas locales (puedes cambiar su valor para probar):
let datoEntrada = null;

// Variable donde debes almacenar el resultado booleano (true o false):
let esValido;

// TODO: Escribe aquí la comprobación lógica sin utilizar funciones.
// Pista: Recuerda usar Number.isNaN(datoEntrada) para comprobar NaN de forma segura.


console.log("¿El dato es válido?:", esValido);`,
      hint: 'Recuerda que typeof null devuelve "object" por un fallo histórico de JS, y que NaN === NaN siempre devuelve false. Utiliza Number.isNaN(datoEntrada) y comparaciones estrictas === null.',
      tests: [
        { name: 'datoEntrada = 0 debe ser válido (true)', inputs: { datoEntrada: 0 }, expected: { esValido: true } },
        { name: 'datoEntrada = null debe ser descartado (false)', inputs: { datoEntrada: null }, expected: { esValido: false } },
        { name: 'datoEntrada = undefined debe ser descartado (false)', inputs: { datoEntrada: undefined }, expected: { esValido: false } },
        { name: 'datoEntrada = NaN debe ser descartado (false)', inputs: { datoEntrada: NaN }, expected: { esValido: false } },
        { name: 'datoEntrada = "DAW" debe ser válido (true)', inputs: { datoEntrada: 'DAW' }, expected: { esValido: true } },
        { name: 'datoEntrada = "" (cadena vacía) debe ser válido (true)', inputs: { datoEntrada: '' }, expected: { esValido: true } },
        { name: 'datoEntrada = false debe ser válido (true)', inputs: { datoEntrada: false }, expected: { esValido: true } }
      ]
    },

    {
      id: 'challenge-2',
      title: 'Reto 2: Conversor de Entradas de Formulario y Cálculo de Total',
      difficulty: 'Básico',
      topicTag: 'Conversión de Tipos y Operadores',
      type: 'variable',
      targetVars: ['totalFinal', 'estadoOperacion'],
      instructions: `En aplicaciones web cliente, las entradas de formulario HTML devuelven valores en formato <code>string</code>. Se requiere procesar y validar los importes de una compra:
      <ul>
        <li>Convierte las cadenas <code>precioTexto</code>, <code>unidadesTexto</code> y <code>descuentoPorcentajeTexto</code> a números mediante conversión explícita (<code>Number()</code>).</li>
        <li>Si alguno de los valores resultantes es <code>NaN</code> o menor a 0:
          <ul>
            <li>Asigna a <code>totalFinal = null;</code></li>
            <li>Asigna a <code>estadoOperacion = "ERROR_DATOS";</code></li>
          </ul>
        </li>
        <li>Si todos los datos son válidos:
          <ul>
            <li>Calcula el subtotal (precio por unidades).</li>
            <li>Calcula el descuento aplicando el porcentaje (<code>subtotal * (descuentoPorcentaje / 100)</code>).</li>
            <li>Asigna a <code>totalFinal</code> el total con descuento (<code>subtotal - descuento</code>).</li>
            <li>Asigna a <code>estadoOperacion = "CORRECTO";</code></li>
          </ul>
        </li>
      </ul>`,
      starterCode: `// Variables de entrada simulando datos recogidos de un formulario HTML:
let precioTexto = "25.50";
let unidadesTexto = "4";
let descuentoPorcentajeTexto = "10";

// Variables donde debes almacenar el resultado:
let totalFinal;
let estadoOperacion;

// TODO: Convierte los textos a números con Number(), valida con isNaN y calcula los importes:


console.log("Estado:", estadoOperacion, "| Total Final:", totalFinal);`,
      hint: 'Utiliza Number(precioTexto) para la conversión y Number.isNaN(...) para verificar que la conversión produjo números válidos antes de calcular.',
      tests: [
        {
          name: 'Cálculo correcto: 25.50€ x 4 unidades con 10% descuento da 91.80€',
          inputs: { precioTexto: "25.50", unidadesTexto: "4", descuentoPorcentajeTexto: "10" },
          expected: { totalFinal: 91.8, estadoOperacion: "CORRECTO" }
        },
        {
          name: 'Cálculo sin descuento: 100€ x 2 unidades con 0% descuento da 200€',
          inputs: { precioTexto: "100", unidadesTexto: "2", descuentoPorcentajeTexto: "0" },
          expected: { totalFinal: 200, estadoOperacion: "CORRECTO" }
        },
        {
          name: 'Detección de error en precio con texto inválido',
          inputs: { precioTexto: "precio_invalido", unidadesTexto: "3", descuentoPorcentajeTexto: "5" },
          expected: { totalFinal: null, estadoOperacion: "ERROR_DATOS" }
        },
        {
          name: 'Detección de error en unidades no numéricas',
          inputs: { precioTexto: "50", unidadesTexto: "abc", descuentoPorcentajeTexto: "10" },
          expected: { totalFinal: null, estadoOperacion: "ERROR_DATOS" }
        },
        {
          name: 'Cálculo con 50% de descuento: 10€ x 5 unidades con 50% da 25€',
          inputs: { precioTexto: "10", unidadesTexto: "5", descuentoPorcentajeTexto: "50" },
          expected: { totalFinal: 25, estadoOperacion: "CORRECTO" }
        }
      ]
    },

    {
      id: 'challenge-3',
      title: 'Reto 3: Clasificador Oficial de Calificaciones FP con Estructura Condicional',
      difficulty: 'Intermedio',
      topicTag: 'Estructuras de Decisión',
      type: 'variable',
      targetVars: ['calificacion'],
      instructions: `Clasifica la variable numérica <code>nota</code> según los baremos oficiales de evaluación en Formación Profesional:
      <ul>
        <li>Si <code>nota</code> no es de tipo <code>"number"</code>, es <code>NaN</code>, o está fuera del rango de 0 a 10: asignar a <code>calificacion = "Nota no válida"</code>.</li>
        <li>Si la nota es menor a 5.0: asignar <code>"Insuficiente"</code>.</li>
        <li>Si la nota es de 5.0 a 6.99 (menor a 7.0): asignar <code>"Aprobado"</code>.</li>
        <li>Si la nota es de 7.0 a 8.99 (menor a 9.0): asignar <code>"Notable"</code>.</li>
        <li>Si la nota es de 9.0 a 10.0: asignar <code>"Sobresaliente"</code>.</li>
      </ul>
      <em>Aplica una estructura condicional limpia con <code>if</code>, <code>else if</code> y <code>else</code>.</em>`,
      starterCode: `// Variable de entrada (puedes cambiarla para probar diversas notas):
let nota = 7.5;

// Variable donde debes guardar el texto de la calificación:
let calificacion;

// TODO: Evalúa la variable nota y asigna la calificación correspondiente a la variable calificacion:


console.log("Nota:", nota, "-> Calificación:", calificacion);`,
      hint: 'Comprueba primero las condiciones de error (typeof nota !== "number" || Number.isNaN(nota) || nota < 0 || nota > 10). A partir de ahí, puedes evaluar ordenadamente de menor a mayor.',
      tests: [
        { name: 'Nota 3.5 califica "Insuficiente"', inputs: { nota: 3.5 }, expected: { calificacion: "Insuficiente" } },
        { name: 'Nota límite 5.0 califica "Aprobado"', inputs: { nota: 5.0 }, expected: { calificacion: "Aprobado" } },
        { name: 'Nota 6.8 califica "Aprobado"', inputs: { nota: 6.8 }, expected: { calificacion: "Aprobado" } },
        { name: 'Nota 7.0 califica "Notable"', inputs: { nota: 7.0 }, expected: { calificacion: "Notable" } },
        { name: 'Nota 8.9 califica "Notable"', inputs: { nota: 8.9 }, expected: { calificacion: "Notable" } },
        { name: 'Nota 9.5 califica "Sobresaliente"', inputs: { nota: 9.5 }, expected: { calificacion: "Sobresaliente" } },
        { name: 'Nota máxima 10.0 califica "Sobresaliente"', inputs: { nota: 10.0 }, expected: { calificacion: "Sobresaliente" } },
        { name: 'Nota negativa -1 califica "Nota no válida"', inputs: { nota: -1 }, expected: { calificacion: "Nota no válida" } },
        { name: 'Nota fuera de rango 11.5 califica "Nota no válida"', inputs: { nota: 11.5 }, expected: { calificacion: "Nota no válida" } },
        { name: 'Nota de tipo string "sobresaliente" califica "Nota no válida"', inputs: { nota: "sobresaliente" }, expected: { calificacion: "Nota no válida" } }
      ]
    },

    {
      id: 'challenge-4',
      title: 'Reto 4: Enrutador de Módulos DAW con Estructura Switch',
      difficulty: 'Intermedio',
      topicTag: 'Control de Flujo',
      type: 'variable',
      targetVars: ['nombreModulo', 'horasSemanales'],
      instructions: `El ciclo formativo de Grado Superior DAW organiza sus materias por códigos oficiales del BOE. Utiliza una sentencia <code>switch (codigoModulo)</code> con cláusulas <code>case</code>, <code>break</code> y <code>default</code> para asignar:
      <ul>
        <li><code>"0612"</code>: <code>nombreModulo = "Desarrollo Web en Entorno Cliente"</code>, <code>horasSemanales = 6</code>.</li>
        <li><code>"0613"</code>: <code>nombreModulo = "Desarrollo Web en Entorno Servidor"</code>, <code>horasSemanales = 8</code>.</li>
        <li><code>"0614"</code>: <code>nombreModulo = "Despliegue de Aplicaciones Web"</code>, <code>horasSemanales = 4</code>.</li>
        <li><code>"0615"</code>: <code>nombreModulo = "Diseño de Interfaces Web"</code>, <code>horasSemanales = 6</code>.</li>
        <li>Cualquier otro código (<code>default</code>): <code>nombreModulo = "Módulo Desconocido"</code>, <code>horasSemanales = 0</code>.</li>
      </ul>`,
      starterCode: `// Variable de entrada con el código oficial del módulo:
let codigoModulo = "0612";

// Variables donde debes asignar los datos resultantes:
let nombreModulo;
let horasSemanales;

// TODO: Implementa la estructura switch con case, break y default:


console.log("Código:", codigoModulo, "| Nombre:", nombreModulo, "| Horas:", horasSemanales);`,
      hint: 'No olvides colocar break al final de cada bloque case para evitar la ejecución accidental en cascada (fall-through).',
      tests: [
        {
          name: 'Código "0612" asigna DWEC y 6 horas',
          inputs: { codigoModulo: "0612" },
          expected: { nombreModulo: "Desarrollo Web en Entorno Cliente", horasSemanales: 6 }
        },
        {
          name: 'Código "0613" asigna DWES y 8 horas',
          inputs: { codigoModulo: "0613" },
          expected: { nombreModulo: "Desarrollo Web en Entorno Servidor", horasSemanales: 8 }
        },
        {
          name: 'Código "0614" asigna DAW Despliegue y 4 horas',
          inputs: { codigoModulo: "0614" },
          expected: { nombreModulo: "Despliegue de Aplicaciones Web", horasSemanales: 4 }
        },
        {
          name: 'Código "0615" asigna DIW y 6 horas',
          inputs: { codigoModulo: "0615" },
          expected: { nombreModulo: "Diseño de Interfaces Web", horasSemanales: 6 }
        },
        {
          name: 'Código no reconocido ejecuta el bloque default',
          inputs: { codigoModulo: "9999" },
          expected: { nombreModulo: "Módulo Desconocido", horasSemanales: 0 }
        }
      ]
    },

    {
      id: 'challenge-5',
      title: 'Reto 5: Planificador de Ahorro con Bucle While',
      difficulty: 'Intermedio',
      topicTag: 'Bucles e Iteraciones',
      type: 'variable',
      targetVars: ['mesesNecesarios', 'saldoFinal'],
      instructions: `Un estudiante de informática planifica sus finanzas para adquirir un equipo de desarrollo web:
      <ul>
        <li>Dispone de un <code>saldoActual</code> inicial, una <code>metaAhorro</code> y aporta un <code>ahorroMensual</code> fijo cada mes.</li>
        <li>Inicializa <code>saldoFinal = saldoActual;</code> y <code>mesesNecesarios = 0;</code>.</li>
        <li>Mediante un bucle <code>while</code>, mientras <code>saldoFinal</code> sea estrictamente menor que <code>metaAhorro</code>:
          <ul>
            <li>Suma <code>ahorroMensual</code> al <code>saldoFinal</code>.</li>
            <li>Incrementa en 1 el contador de <code>mesesNecesarios</code>.</li>
          </ul>
        </li>
        <li>Si <code>saldoActual</code> ya es igual o superior a <code>metaAhorro</code> desde el inicio, <code>mesesNecesarios</code> debe ser 0.</li>
      </ul>`,
      starterCode: `// Variables de entrada:
let saldoActual = 200;
let metaAhorro = 800;
let ahorroMensual = 150;

// Variables de resultado:
let mesesNecesarios = 0;
let saldoFinal = saldoActual;

// TODO: Escribe el bucle while para acumular el ahorro mensual hasta alcanzar o superar la meta:


console.log("Meta:", metaAhorro, "| Meses:", mesesNecesarios, "| Saldo Final:", saldoFinal);`,
      hint: 'La condición del bucle while debe ser (saldoFinal < metaAhorro). Dentro del bucle, usa saldoFinal += ahorroMensual y mesesNecesarios++.',
      tests: [
        {
          name: 'Saldo 200€ con meta 800€ y ahorro de 150€/mes requiere 4 meses',
          inputs: { saldoActual: 200, metaAhorro: 800, ahorroMensual: 150 },
          expected: { mesesNecesarios: 4, saldoFinal: 800 }
        },
        {
          name: 'Meta ya alcanzada (500€ de 500€) requiere 0 meses',
          inputs: { saldoActual: 500, metaAhorro: 500, ahorroMensual: 100 },
          expected: { mesesNecesarios: 0, saldoFinal: 500 }
        },
        {
          name: 'Saldo 100€ con meta 1000€ y ahorro de 300€/mes requiere 3 meses (saldo 1000€)',
          inputs: { saldoActual: 100, metaAhorro: 1000, ahorroMensual: 300 },
          expected: { mesesNecesarios: 3, saldoFinal: 1000 }
        },
        {
          name: 'Saldo 0€ con meta 350€ y ahorro de 100€/mes supera la meta en mes 4 (saldo 400€)',
          inputs: { saldoActual: 0, metaAhorro: 350, ahorroMensual: 100 },
          expected: { mesesNecesarios: 4, saldoFinal: 400 }
        }
      ]
    },

    {
      id: 'challenge-6',
      title: 'Reto 6: Secuencia Numérica FizzBuzz en Formato Texto con Bucle For',
      difficulty: 'Intermedio',
      topicTag: 'Bucles For, Módulo y Strings',
      type: 'variable',
      targetVars: ['resultadoFizzBuzz'],
      instructions: `El clásico algoritmo FizzBuzz resuelto con la sintaxis estudiada: ¡construyendo una cadena de texto sin necesidad de arrays ni funciones!
      <ul>
        <li>Mediante un bucle <code>for</code> que recorra desde <code>1</code> hasta <code>limite</code> (inclusive):
          <ul>
            <li>Si el número es múltiplo de 3 y de 5 (o múltiplo de 15): añadir <code>"FizzBuzz"</code>.</li>
            <li>Si solo es múltiplo de 3: añadir <code>"Fizz"</code>.</li>
            <li>Si solo es múltiplo de 5: añadir <code>"Buzz"</code>.</li>
            <li>En cualquier otro caso: añadir el número en forma de texto.</li>
          </ul>
        </li>
        <li>Cada elemento debe estar separado por una coma y un espacio (<code>", "</code>). El último elemento NO debe llevar coma al final.</li>
        <li>Almacena la cadena resultante en <code>resultadoFizzBuzz</code>.</li>
        <li>Ejemplo para <code>limite = 5</code>: <code>"1, 2, Fizz, 4, Buzz"</code>.</li>
      </ul>`,
      starterCode: `// Variable de entrada (límite superior de la secuencia):
let limite = 15;

// Variable donde debes acumular la cadena resultante:
let resultadoFizzBuzz = "";

// TODO: Recorre del 1 al limite con un bucle for y construye la secuencia separada por comas:


console.log("Secuencia FizzBuzz:", resultadoFizzBuzz);`,
      hint: 'Comprueba primero si el número es divisible por 3 y 5 a la vez (i % 3 === 0 && i % 5 === 0) antes de comprobar 3 y 5 individualmente. Para separar por comas, puedes concatenar ", " solo si i < limite o si resultadoFizzBuzz no está vacío.',
      tests: [
        {
          name: 'FizzBuzz hasta 5 genera "1, 2, Fizz, 4, Buzz"',
          inputs: { limite: 5 },
          expected: { resultadoFizzBuzz: "1, 2, Fizz, 4, Buzz" }
        },
        {
          name: 'FizzBuzz hasta 15 incluye "Fizz", "Buzz" y termina con "FizzBuzz"',
          inputs: { limite: 15 },
          expected: { resultadoFizzBuzz: "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz" }
        },
        {
          name: 'Límite 1 genera únicamente "1"',
          inputs: { limite: 1 },
          expected: { resultadoFizzBuzz: "1" }
        },
        {
          name: 'Límite 3 genera "1, 2, Fizz"',
          inputs: { limite: 3 },
          expected: { resultadoFizzBuzz: "1, 2, Fizz" }
        }
      ]
    },

    {
      id: 'challenge-7',
      title: 'Reto 7: Sumatorio Filtrado con Break y Continue',
      difficulty: 'Avanzado',
      topicTag: 'Control de Bucles',
      type: 'variable',
      targetVars: ['sumaImpares', 'imparesSumados'],
      instructions: `Procesa un intervalo numérico aplicando las sentencias de salto y control de bucles <code>continue</code> y <code>break</code>:
      <ul>
        <li>Recorre los números enteros desde <code>inicio</code> hasta <code>fin</code> (ambos inclusive) usando un bucle <code>for</code>.</li>
        <li>Si el número actual es par (<code>i % 2 === 0</code>), salta inmediatamente a la siguiente iteración usando la sentencia <code>continue</code>.</li>
        <li>Si el número actual es impar:
          <ul>
            <li>Comprueba si sumarlo provocaría superar el <code>topeMaximo</code> (es decir, si <code>sumaImpares + i > topeMaximo</code>). Si es así, interrumpe el bucle de inmediato usando <code>break</code>.</li>
            <li>En caso contrario, acumula el número en <code>sumaImpares</code> e incrementa en 1 <code>imparesSumados</code>.</li>
          </ul>
        </li>
      </ul>`,
      starterCode: `// Variables de entrada:
let inicio = 1;
let fin = 20;
let topeMaximo = 50;

// Variables de resultado:
let sumaImpares = 0;
let imparesSumados = 0;

// TODO: Implementa el bucle for utilizando continue para pares y break si se supera topeMaximo:


console.log("Suma de Impares:", sumaImpares, "| Cantidad sumada:", imparesSumados);`,
      hint: 'Usa if (i % 2 === 0) continue; para saltar los pares sin procesarlos. Luego comprueba if (sumaImpares + i > topeMaximo) break; antes de sumar.',
      tests: [
        {
          name: 'Rango 1 a 10 con tope 100 suma todos los impares (1+3+5+7+9 = 25, 5 impares)',
          inputs: { inicio: 1, fin: 10, topeMaximo: 100 },
          expected: { sumaImpares: 25, imparesSumados: 5 }
        },
        {
          name: 'Rango 1 a 20 con tope 30 se detiene antes de sumar 11 (suma 25, 5 impares)',
          inputs: { inicio: 1, fin: 20, topeMaximo: 30 },
          expected: { sumaImpares: 25, imparesSumados: 5 }
        },
        {
          name: 'Rango 4 a 8 con tope 50 suma impares 5 y 7 (suma 12, 2 impares)',
          inputs: { inicio: 4, fin: 8, topeMaximo: 50 },
          expected: { sumaImpares: 12, imparesSumados: 2 }
        },
        {
          name: 'Rango 10 a 10 (único número par) resulta en suma 0 y 0 impares',
          inputs: { inicio: 10, fin: 10, topeMaximo: 50 },
          expected: { sumaImpares: 0, imparesSumados: 0 }
        }
      ]
    },

    {
      id: 'challenge-8',
      title: 'Reto 8 (Mini-Proyecto): Generador de Patrón de Tablero con Bucles Anidados',
      difficulty: 'Avanzado',
      topicTag: 'Bucles Anidados y Concatenación',
      type: 'variable',
      targetVars: ['patronTablero'],
      instructions: `La construcción de patrones bidimensionales es un ejercicio clásico para dominar la lógica algorítmica y los bucles anidados en Formación Profesional:
      <ul>
        <li>Dadas las dimensiones en <code>filas</code> y <code>columnas</code>, genera una cuadrícula textual alternando caracteres:</li>
        <li>Mediante dos bucles <code>for</code> anidados (un bucle externo para las filas <code>f</code> de <code>0</code> a <code>filas - 1</code>, y uno interno para las columnas <code>c</code> de <code>0</code> a <code>columnas - 1</code>):
          <ul>
            <li>Si la suma de índices <code>(f + c)</code> es par (<code>(f + c) % 2 === 0</code>), coloca un asterisco <code>*</code>.</li>
            <li>Si la suma es impar, coloca un punto <code>.</code>.</li>
            <li>Al finalizar cada fila (excepto tras la última fila), añade un salto de línea <code>"\\n"</code>.</li>
          </ul>
        </li>
        <li>Almacena el dibujo textual resultante en la variable <code>patronTablero</code>.</li>
        <li>Ejemplo para <code>filas = 3, columnas = 3</code>:
          <pre style="background: rgba(0,0,0,0.3); padding: 6px 10px; border-radius: 4px; margin-top: 6px;">*.*\\n.*.\\n*.*</pre>
        </li>
      </ul>`,
      starterCode: `// Dimensiones del tablero de texto:
let filas = 4;
let columnas = 4;

// Variable donde debes construir el dibujo del tablero:
let patronTablero = "";

// TODO: Utiliza dos bucles for anidados para construir el patrón con saltos de línea:


console.log("Patrón generado:\\n" + patronTablero);`,
      hint: 'Utiliza for (let f = 0; f < filas; f++) para las filas y for (let c = 0; c < columnas; c++) para las columnas. Tras el bucle interno, si f < filas - 1, concatena "\\n".',
      tests: [
        {
          name: 'Tablero 3x3 genera cuadrícula alternada con 2 saltos de línea',
          inputs: { filas: 3, columnas: 3 },
          expected: { patronTablero: "*.*\n.*.\n*.*" }
        },
        {
          name: 'Tablero rectangular 2x4 genera 2 filas de 4 caracteres',
          inputs: { filas: 2, columnas: 4 },
          expected: { patronTablero: "*.*.\n.*.*" }
        },
        {
          name: 'Fila única 1x5 no contiene saltos de línea',
          inputs: { filas: 1, columnas: 5 },
          expected: { patronTablero: "*.*.*" }
        },
        {
          name: 'Tablero 4x4 genera cuadrícula regular',
          inputs: { filas: 4, columnas: 4 },
          expected: { patronTablero: "*.*.\n.*.*\n*.*.\n.*.*" }
        }
      ]
    }
  ]
};

