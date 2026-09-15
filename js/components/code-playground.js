/**
 * COMPONENTE CODE PLAYGROUND & TERMINAL VIRTUAL
 * Proporciona un entorno interactivo para ejecutar y experimentar con JS en vivo.
 * Utiliza CodeEditorWrapper (CodeMirror 5) para resaltado de sintaxis y experiencia de código fluida.
 */

import { CodeRunner } from '../core/code-runner.js';
import { appStore } from '../state/store.js';
import { CodeEditorWrapper } from './code-editor.js';
import { highlightHtmlSyntax } from '../core/html-highlighter.js';

export class CodePlayground {
  /**
   * @param {object} options
   * @param {string} options.id - Identificador único del snippet
   * @param {string} options.title - Título del bloque de código
   * @param {string} options.initialCode - Código inicial
   * @param {string} [options.description] - Explicación pedagógica
   * @param {string} [options.domFixture] - Estructura HTML inicial del lienzo interactivo
   * @param {boolean} [options.isVisual] - Indica si el snippet manipula el DOM visualmente
   */
  constructor({ id, title, initialCode, description, domFixture, isVisual }) {
    this.id = id;
    this.title = title;
    this.initialCode = initialCode.trim();
    this.description = description || '';
    this.domFixture = domFixture ? domFixture.trim() : '';
    this.isVisual = Boolean(isVisual || domFixture);
    this.currentCode = this.initialCode;
    this.editor = null;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-runner-widget';
    wrapper.id = `widget-${this.id}`;

    wrapper.innerHTML = `
      <div class="code-runner-header">
        <div class="code-title-group">
          <div class="window-dots">
            <span class="window-dot dot-red"></span>
            <span class="window-dot dot-yellow"></span>
            <span class="window-dot dot-green"></span>
          </div>
          <span class="code-snippet-title">${this.title}</span>
        </div>
        <div class="code-runner-actions">
          <button class="btn-code-action btn-copy-code" title="Copiar código al portapapeles">
            📋 Copiar
          </button>
          <button class="btn-code-action btn-reset-code" title="Restablecer código original">
            🔄 Reset
          </button>
          <button class="btn-code-action btn-run-code" title="Ejecutar script en el navegador">
            ▶ Ejecutar
          </button>
        </div>
      </div>

      ${this.description ? `<div class="code-runner-description">${this.description}</div>` : ''}

      ${this.domFixture ? `
        <div class="dom-visual-preview">
          <div class="dom-preview-header">
            <div class="dom-preview-tag" id="dom-preview-tag-${this.id}">
              <span class="live-indicator-dot"></span>
              <span>Lienzo Visual del DOM (Navegador en Vivo)</span>
            </div>
            <div class="dom-preview-actions">
              <div class="dom-view-toggle-group" role="tablist" aria-label="Modo de visualización del DOM">
                <button 
                  type="button" 
                  class="btn-dom-toggle active" 
                  data-view="rendered" 
                  data-target="${this.id}" 
                  title="Ver resultado visual renderizado en el navegador"
                >
                  👁 Renderizado
                </button>
                <button 
                  type="button" 
                  class="btn-dom-toggle" 
                  data-view="html" 
                  data-target="${this.id}" 
                  title="Ver marcado y código HTML inicial"
                >
                  &lt;/&gt; HTML Inicial
                </button>
              </div>
              <button class="btn-preview-reset btn-reset-dom" id="btn-reset-dom-${this.id}" title="Restablecer marcado HTML al estado inicial">
                ↺ Restablecer HTML
              </button>
            </div>
          </div>
          <div class="dom-preview-canvas" id="canvas-${this.id}">
            ${this.domFixture}
          </div>
          <div class="dom-preview-html-source" id="html-source-${this.id}" style="display: none;">
            <div class="html-source-toolbar">
              <span class="html-source-badge">📄 HTML Base del Ejemplo</span>
              <button type="button" class="btn-copy-html" id="btn-copy-html-${this.id}" title="Copiar HTML original al portapapeles">
                📋 Copiar HTML
              </button>
            </div>
            <pre class="html-source-pre"><code>${highlightHtmlSyntax(this.domFixture)}</code></pre>
          </div>
        </div>
      ` : ''}

      <div class="code-editor-area">
        <textarea 
          class="code-textarea" 
          id="editor-playground-${this.id}"
          spellcheck="false" 
          autocomplete="off" 
          autocorrect="off" 
          autocapitalize="off"
          aria-label="Editor de código para ${this.title}"
        >${this.initialCode}</textarea>
      </div>

      <div class="code-terminal">
        <div class="terminal-header">
          <span>Consola de Salida Virtual (DevTools)</span>
          <span class="execution-duration" style="font-family: var(--font-code); color: var(--color-cyan);">0.0ms</span>
        </div>
        <div class="terminal-entries">
          <div class="terminal-entry" style="color: var(--text-muted); font-style: italic;">
            Pulsa en "▶ Ejecutar" para ver la salida por consola aquí...
          </div>
        </div>
      </div>
    `;

    this.bindEvents(wrapper);
    return wrapper;
  }

  bindEvents(wrapper) {
    const textarea = wrapper.querySelector('.code-textarea');
    const runBtn = wrapper.querySelector('.btn-run-code');
    const copyBtn = wrapper.querySelector('.btn-copy-code');
    const resetBtn = wrapper.querySelector('.btn-reset-code');
    const terminalEntries = wrapper.querySelector('.terminal-entries');
    const durationEl = wrapper.querySelector('.execution-duration');

    // Inicializar CodeEditorWrapper
    if (textarea) {
      this.editor = new CodeEditorWrapper(textarea, {
        initialValue: this.initialCode,
        onChange: (val) => {
          this.currentCode = val;
        }
      });

      setTimeout(() => {
        if (this.editor) this.editor.refresh();
      }, 80);
    }

    // Conmutador Vista Renderizada / HTML Inicial
    const toggleBtns = wrapper.querySelectorAll(`.btn-dom-toggle[data-target="${this.id}"]`);
    const canvasEl = wrapper.querySelector(`#canvas-${this.id}`);
    const htmlSourceEl = wrapper.querySelector(`#html-source-${this.id}`);
    const previewTagEl = wrapper.querySelector(`#dom-preview-tag-${this.id}`);

    const switchView = (viewMode) => {
      toggleBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewMode);
      });

      if (viewMode === 'html') {
        if (canvasEl) canvasEl.style.display = 'none';
        if (htmlSourceEl) htmlSourceEl.style.display = 'block';
        if (previewTagEl) {
          previewTagEl.innerHTML = `
            <span class="code-indicator-icon">&lt;/&gt;</span>
            <span>Marcado HTML Inicial (Estructura Base)</span>
          `;
        }
      } else {
        if (canvasEl) canvasEl.style.display = 'block';
        if (htmlSourceEl) htmlSourceEl.style.display = 'none';
        if (previewTagEl) {
          previewTagEl.innerHTML = `
            <span class="live-indicator-dot"></span>
            <span>Lienzo Visual del DOM (Navegador en Vivo)</span>
          `;
        }
      }
    };

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(btn.dataset.view);
      });
    });

    // Copiar marcado HTML Inicial
    const copyHtmlBtn = wrapper.querySelector(`#btn-copy-html-${this.id}`);
    if (copyHtmlBtn && this.domFixture) {
      copyHtmlBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(this.domFixture);
          const originalText = copyHtmlBtn.textContent;
          copyHtmlBtn.textContent = '✓ Copiado';
          setTimeout(() => { copyHtmlBtn.textContent = originalText; }, 1800);
        } catch (err) {
          copyHtmlBtn.textContent = 'Err al copiar';
        }
      });
    }

    // Ejecutar código
    runBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Si el usuario estaba visualizando el HTML inicial, conmutamos a la vista renderizada para apreciar los cambios
      if (this.domFixture && htmlSourceEl && htmlSourceEl.style.display !== 'none') {
        switchView('rendered');
      }

      runBtn.disabled = true;
      runBtn.textContent = '⏳ Ejecutando...';

      const codeToRun = this.editor ? this.editor.getValue() : this.currentCode;

      terminalEntries.innerHTML = `
        <div class="terminal-entry" style="color: var(--text-muted);">
          <span class="entry-prefix">»</span> Ejecutando script en entorno cliente...
        </div>
      `;

      const result = await CodeRunner.execute(codeToRun);

      durationEl.textContent = `${result.durationMs}ms`;
      terminalEntries.innerHTML = '';

      if (result.logs.length === 0 && !result.error) {
        terminalEntries.innerHTML = `
          <div class="terminal-entry" style="color: var(--color-success);">
            <span class="entry-prefix">✓</span> El código se ejecutó sin errores pero no generó llamadas a console.log.
          </div>
        `;
      } else {
        result.logs.forEach(log => {
          const entryEl = document.createElement('div');
          entryEl.className = 'terminal-entry';

          if (log.type === 'error') {
            entryEl.innerHTML = `<span class="entry-prefix" style="color: var(--color-danger);">✕</span> <span class="entry-error">${this.escapeHtml(log.content)}</span>`;
          } else if (log.type === 'warn') {
            entryEl.innerHTML = `<span class="entry-prefix" style="color: var(--color-warning);">⚠</span> <span class="entry-warn">${this.escapeHtml(log.content)}</span>`;
          } else if (log.type === 'table') {
            entryEl.innerHTML = `<div class="entry-table"><pre>${this.escapeHtml(log.content)}</pre></div>`;
          } else {
            entryEl.innerHTML = `<span class="entry-prefix">»</span> <span class="entry-log">${this.escapeHtml(log.content)}</span>`;
          }

          terminalEntries.appendChild(entryEl);
        });
      }

      runBtn.disabled = false;
      runBtn.textContent = '▶ Ejecutar';

      // Registrar progreso
      appStore.recordSnippetExecution(this.id);
    });

    // Copiar al portapapeles
    copyBtn.addEventListener('click', async () => {
      try {
        const codeToCopy = this.editor ? this.editor.getValue() : this.currentCode;
        await navigator.clipboard.writeText(codeToCopy);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copiado';
        setTimeout(() => { copyBtn.textContent = originalText; }, 1800);
      } catch (err) {
        copyBtn.textContent = 'Err al copiar';
      }
    });

    // Resetear lienzo HTML del DOM si existe
    const resetDomBtn = wrapper.querySelector(`#btn-reset-dom-${this.id}`);
    if (resetDomBtn && canvasEl) {
      resetDomBtn.addEventListener('click', () => {
        canvasEl.innerHTML = this.domFixture;
      });
    }

    // Resetear código inicial
    resetBtn.addEventListener('click', () => {
      if (this.editor) {
        this.editor.setValue(this.initialCode);
      }
      this.currentCode = this.initialCode;
      if (canvasEl && this.domFixture) {
        canvasEl.innerHTML = this.domFixture;
      }
      terminalEntries.innerHTML = `
        <div class="terminal-entry" style="color: var(--text-muted); font-style: italic;">
          Código y lienzo HTML restaurados a los valores originales.
        </div>
      `;
      durationEl.textContent = '0.0ms';
    });
  }

  escapeHtml(str) {
    if (typeof str !== 'string') return String(str);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
