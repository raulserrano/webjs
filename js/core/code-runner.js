/**
 * MOTOR SEGURO DE EJECUCIÓN DE CÓDIGO CLIENTE (CODE RUNNER)
 * Intercepta métodos de la API Console y captura errores en tiempo real
 */

export class CodeRunner {
  /**
   * Ejecuta una cadena de código JS en el navegador de manera controlada
   * @param {string} userCode - Código fuente a ejecutar
   * @returns {Promise<{ logs: Array<{type: string, content: string}>, error: string|null, durationMs: number }>}
   */
  static async execute(userCode) {
    const logs = [];
    const startTime = performance.now();
    let runtimeError = null;

    // Métodos virtuales para capturar la consola
    const originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
      table: console.table
    };

    const formatArg = (arg) => {
      if (arg === null) return 'null';
      if (arg === undefined) return 'undefined';
      if (typeof arg === 'bigint') return `${arg}n`;
      if (typeof arg === 'symbol') return arg.toString();
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, (key, value) => {
            if (typeof value === 'bigint') return `${value}n`;
            return value;
          }, 2);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    };

    // Sobrescribir temporalmente la consola
    console.log = (...args) => {
      logs.push({ type: 'log', content: args.map(formatArg).join(' ') });
      originalConsole.log(...args);
    };

    console.info = (...args) => {
      logs.push({ type: 'log', content: args.map(formatArg).join(' ') });
      originalConsole.info(...args);
    };

    console.warn = (...args) => {
      logs.push({ type: 'warn', content: args.map(formatArg).join(' ') });
      originalConsole.warn(...args);
    };

    console.error = (...args) => {
      logs.push({ type: 'error', content: args.map(formatArg).join(' ') });
      originalConsole.error(...args);
    };

    console.table = (data) => {
      try {
        const str = JSON.stringify(data, null, 2);
        logs.push({ type: 'table', content: str });
      } catch (e) {
        logs.push({ type: 'log', content: formatArg(data) });
      }
      originalConsole.table(data);
    };

    try {
      // Usar constructor Function para aislar el contexto léxico local
      // y prevenir acceso a variables locales del runner
      const runFn = new Function(userCode);
      const result = runFn();

      // Si el código retornó una promesa, la esperamos
      if (result && typeof result.then === 'function') {
        await result;
      }
    } catch (err) {
      runtimeError = err.name ? `${err.name}: ${err.message}` : String(err);
      logs.push({ type: 'error', content: runtimeError });
    } finally {
      // Restaurar siempre la consola nativa
      console.log = originalConsole.log;
      console.info = originalConsole.info;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
      console.table = originalConsole.table;
    }

    const durationMs = Number((performance.now() - startTime).toFixed(2));

    return {
      logs,
      error: runtimeError,
      durationMs
    };
  }
}
