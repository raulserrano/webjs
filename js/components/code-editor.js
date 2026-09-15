/**
 * WRAPPER AGNOSTICO DE EDITOR DE CÓDIGO (CODE EDITOR WRAPPER)
 * Encapsula la librería de edición de código (CodeMirror 5) para proveer:
 * - Resaltado de sintaxis JavaScript enriquecido.
 * - Indentación suave con Tab (2 espacios) sin perder el foco.
 * - Numeración de líneas y emparejamiento de llaves/paréntesis.
 * - Prevención de reemplazo de caracteres automáticos (ej. == no cambia a =).
 * - Modo fallback resiliente en caso de ausencia de la librería externa.
 */

export class CodeEditorWrapper {
  /**
   * @param {HTMLTextAreaElement|HTMLElement|string} target - Textarea o selector del editor
   * @param {object} [options] - Opciones de configuración
   * @param {string} [options.initialValue=''] - Código inicial
   * @param {boolean} [options.readOnly=false] - Modo solo lectura
   * @param {number} [options.tabSize=2] - Tamaño del tabulador
   * @param {function} [options.onChange] - Callback en cambios de texto
   */
  constructor(target, options = {}) {
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.options = {
      initialValue: '',
      readOnly: false,
      tabSize: 2,
      ...options
    };

    this.cmInstance = null;
    this.textareaFallback = null;
    this.changeListeners = new Set();

    if (options.onChange) {
      this.changeListeners.add(options.onChange);
    }

    this.init();
  }

  init() {
    if (!this.target) {
      console.warn('CodeEditorWrapper: Elemento destino no encontrado.');
      return;
    }

    const initialCode = this.options.initialValue ||
      (this.target.tagName === 'TEXTAREA' ? this.target.value : this.target.textContent) || '';

    // Si CodeMirror está disponible en el entorno global
    if (typeof window.CodeMirror === 'function') {
      try {
        if (this.target.tagName === 'TEXTAREA') {
          this.cmInstance = window.CodeMirror.fromTextArea(this.target, {
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true,
            indentUnit: this.options.tabSize,
            tabSize: this.options.tabSize,
            indentWithTabs: false,
            electricChars: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            lineWrapping: false,
            readOnly: this.options.readOnly,
            extraKeys: {
              'Tab': (cm) => cm.execCommand('insertSoftTab'),
              'Shift-Tab': (cm) => cm.execCommand('indentLess')
            }
          });
        } else {
          this.target.innerHTML = '';
          this.cmInstance = window.CodeMirror(this.target, {
            value: initialCode,
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true,
            indentUnit: this.options.tabSize,
            tabSize: this.options.tabSize,
            indentWithTabs: false,
            matchBrackets: true,
            autoCloseBrackets: true,
            lineWrapping: false,
            readOnly: this.options.readOnly,
            extraKeys: {
              'Tab': (cm) => cm.execCommand('insertSoftTab'),
              'Shift-Tab': (cm) => cm.execCommand('indentLess')
            }
          });
        }

        if (initialCode && !this.cmInstance.getValue()) {
          this.cmInstance.setValue(initialCode);
        }

        this.cmInstance.on('change', () => {
          const val = this.cmInstance.getValue();
          this.notifyChange(val);
        });

        this.resizeHandler = () => this.refresh();
        window.addEventListener('resize', this.resizeHandler);

        // Refresco tras montaje en DOM
        setTimeout(() => this.refresh(), 60);
        return;
      } catch (err) {
        console.warn('CodeEditorWrapper: Fallo al inicializar CodeMirror, activando fallback:', err);
      }
    }

    // MODO FALLBACK RESILIENTE: Textarea enriquecido
    this.initFallback(initialCode);
  }

  initFallback(initialCode) {
    if (this.target.tagName === 'TEXTAREA') {
      this.textareaFallback = this.target;
    } else {
      this.target.innerHTML = '';
      this.textareaFallback = document.createElement('textarea');
      this.textareaFallback.className = 'code-textarea';
      this.target.appendChild(this.textareaFallback);
    }

    // Desactivar cualquier intervención automática del navegador
    this.textareaFallback.spellcheck = false;
    this.textareaFallback.setAttribute('autocorrect', 'off');
    this.textareaFallback.setAttribute('autocapitalize', 'off');
    this.textareaFallback.setAttribute('autocomplete', 'off');

    if (initialCode) {
      this.textareaFallback.value = initialCode;
    }

    // Interceptar tecla Tab para insertar 2 espacios sin perder foco
    this.textareaFallback.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.textareaFallback.selectionStart;
        const end = this.textareaFallback.selectionEnd;
        const spaces = ' '.repeat(this.options.tabSize);
        this.textareaFallback.value =
          this.textareaFallback.value.substring(0, start) + spaces + this.textareaFallback.value.substring(end);
        this.textareaFallback.selectionStart = this.textareaFallback.selectionEnd = start + this.options.tabSize;
        this.notifyChange(this.textareaFallback.value);
      }
    });

    this.textareaFallback.addEventListener('input', () => {
      this.notifyChange(this.textareaFallback.value);
    });
  }

  getValue() {
    if (this.cmInstance) {
      return this.cmInstance.getValue();
    }
    return this.textareaFallback ? this.textareaFallback.value : '';
  }

  setValue(val) {
    const text = typeof val === 'string' ? val : String(val || '');
    if (this.cmInstance) {
      this.cmInstance.setValue(text);
      this.cmInstance.clearHistory();
    } else if (this.textareaFallback) {
      this.textareaFallback.value = text;
    }
  }

  focus() {
    if (this.cmInstance) {
      this.cmInstance.focus();
    } else if (this.textareaFallback) {
      this.textareaFallback.focus();
    }
  }

  refresh() {
    if (this.cmInstance) {
      this.cmInstance.refresh();
    }
  }

  onChange(listener) {
    if (typeof listener === 'function') {
      this.changeListeners.add(listener);
    }
    return () => this.changeListeners.delete(listener);
  }

  notifyChange(val) {
    this.changeListeners.forEach(fn => {
      try { fn(val); } catch (e) { console.error('CodeEditor listener error:', e); }
    });
  }

  destroy() {
    this.changeListeners.clear();
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
    if (this.cmInstance && typeof this.cmInstance.toTextArea === 'function') {
      try { this.cmInstance.toTextArea(); } catch (e) {}
    }
    this.cmInstance = null;
    this.textareaFallback = null;
  }
}
