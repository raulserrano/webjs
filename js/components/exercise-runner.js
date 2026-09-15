/**
 * COMPONENTE DE EJERCICIOS Y AUTOEVALUACIÓN (EXERCISE RUNNER)
 * Renderiza preguntas de test interactivo de examen y retos de programación con tests unitarios.
 * Integra CodeEditorWrapper (CodeMirror 5) para resaltado de sintaxis JS, tabulación real y prevención de fallos de escritura.
 */

import { getContentForRa } from '../data/content-registry.js';
import { appStore } from '../state/store.js';
import { ChallengeEvaluator } from '../core/evaluator.js';
import { CodeRunner } from '../core/code-runner.js';
import { CodeEditorWrapper } from './code-editor.js';
import { highlightHtmlSyntax } from '../core/html-highlighter.js';

export class ExerciseRunnerComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.editors = new Map();
  }

  render() {
    const state = appStore.getState();
    const activeTab = state.activeTab; // 'quizzes' o 'challenges'

    if (activeTab === 'quizzes') {
      this.destroyEditors();
      this.renderQuizzes(state);
    } else if (activeTab === 'challenges') {
      this.renderChallenges(state);
    }
  }

  destroyEditors() {
    this.editors.forEach(ed => ed.destroy());
    this.editors.clear();
  }

  // ==========================================
  // RENDERIZADOR DE TEST DE AUTOEVALUACIÓN (QUIZZES)
  // ==========================================
  renderQuizzes(state) {
    const completedQuizzes = state.completedQuizzes || {};
    const raContent = getContentForRa(state.activeRaId);
    const quizzes = raContent.quizzes || [];
    const passedQuizzesCount = quizzes.filter(q => completedQuizzes[q.id]?.isCorrect).length;

    this.container.innerHTML = `
      <div style="margin-bottom: var(--space-xl);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
          <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">
            📝 Test de Autoevaluación Teórico-Práctica
          </h2>
          <span style="font-size: 0.85rem; color: var(--color-cyan); font-family: var(--font-code); font-weight: 700;">
            ${passedQuizzesCount} de ${quizzes.length} Superadas
          </span>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          Preguntas diseñadas para detectar fallos conceptuales y trampas típicas del motor V8 y del currículo oficial de DAW. Pulsa en una opción para comprobar tu respuesta al instante.
        </p>
      </div>

      <div class="exercise-container">
        ${quizzes.map((quiz, qIdx) => {
          const status = completedQuizzes[quiz.id];
          const isAnswered = Boolean(status);
          const isCorrect = status?.isCorrect;
          const selectedIdx = status?.selectedIndex;

          let cardClass = 'quiz-card animate-fade-in';
          if (isAnswered) {
            cardClass += isCorrect ? ' answered-correct' : ' answered-incorrect';
          }

          const letters = ['A', 'B', 'C', 'D'];

          return `
            <div class="${cardClass}" id="card-${quiz.id}">
              <div class="quiz-header">
                <span class="quiz-meta-tag">${quiz.topicTag}</span>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="quiz-difficulty ${quiz.difficultyClass}">${quiz.difficulty}</span>
                  <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">#${qIdx + 1}</span>
                </div>
              </div>

              <h3 class="quiz-question">${this.escapeHtml(quiz.question)}</h3>

              ${quiz.codeSnippet ? `
                <div class="quiz-code-box">${this.escapeHtml(quiz.codeSnippet)}</div>
              ` : ''}

              <div class="quiz-options" data-quiz-id="${quiz.id}">
                ${quiz.options.map((opt, optIdx) => {
                  let optClass = 'quiz-option-btn';
                  if (isAnswered) {
                    if (optIdx === quiz.correctIndex) {
                      optClass += ' is-correct';
                    } else if (optIdx === selectedIdx && !isCorrect) {
                      optClass += ' is-wrong';
                    }
                  }

                  return `
                    <button 
                      class="${optClass}" 
                      data-option-index="${optIdx}"
                      ${isAnswered ? 'disabled' : ''}
                    >
                      <span class="option-letter">${letters[optIdx]}</span>
                      <span style="flex: 1;">${this.escapeHtml(opt)}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <div class="quiz-explanation ${isAnswered ? 'visible' : ''}">
                <div class="quiz-explanation-title">
                  ${isCorrect ? '✓ ¡Respuesta Correcta!' : '✕ Respuesta Incorrecta'} · Explicación Docente:
                </div>
                <div style="line-height: 1.5;">${quiz.explanation}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this.bindQuizEvents();
  }

  bindQuizEvents() {
    this.container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const optionBtn = e.target.closest('.quiz-option-btn');
        const optionsGroup = optionBtn.closest('.quiz-options');
        const quizId = optionsGroup.dataset.quizId;
        const selectedIdx = parseInt(optionBtn.dataset.optionIndex, 10);

        const raContent = getContentForRa(appStore.getState().activeRaId);
        const quizData = (raContent.quizzes || []).find(q => q.id === quizId);
        if (!quizData) return;

        const isCorrect = selectedIdx === quizData.correctIndex;
        appStore.recordQuizAnswer(quizId, isCorrect, selectedIdx);
        this.render();
      });
    });
  }

  // ==========================================
  // RENDERIZADOR DE RETOS DE CÓDIGO (CHALLENGES)
  // ==========================================
  renderChallenges(state) {
    this.destroyEditors();
    const completedChallenges = state.completedChallenges || {};
    const raContent = getContentForRa(state.activeRaId);
    const challenges = raContent.challenges || [];
    const passedChallengesCount = challenges.filter(ch => Boolean(completedChallenges[ch.id])).length;

    // Estado vacío pedagógico y resiliente para RAs teóricos/conceptuales (ej: RA1)
    if (challenges.length === 0) {
      this.container.innerHTML = `
        <div class="state-container animate-fade-in" style="text-align: center; max-width: 680px; margin: 40px auto; padding: 40px 24px; background: var(--bg-surface-card); border: var(--border-subtle); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);">
          <div style="font-size: 3rem; margin-bottom: 16px;">📚</div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">
            Módulo Teórico y Conceptual
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            El <strong>${raContent.title || 'Resultado de Aprendizaje'}</strong> está centrado en los fundamentos arquitectónicos, modelos de ejecución cliente/servidor y especificaciones web. Por su naturaleza conceptual, no incluye retos de programación con pruebas unitarias.
          </p>

          <div style="background: var(--bg-surface-2); border-left: 4px solid var(--color-brand); padding: 14px 18px; text-align: left; border-radius: var(--radius-md); margin-bottom: 24px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-brand); margin-bottom: 4px;">
              💡 ¿Cómo poner en práctica este aprendizaje?
            </div>
            <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
              Puedes experimentar con los <strong>ejemplos de consola interactiva</strong> disponibles en los apartados teóricos y medir tus conocimientos con el <strong>Test de Autoevaluación</strong> oficial.
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
            <button class="btn-action-primary" id="btn-go-to-theory" style="background: var(--color-brand); color: #ffffff; padding: 10px 20px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; border: none;">
              📖 Ir a Teoría y Código en Vivo
            </button>
            <button class="btn-action-secondary" id="btn-go-to-quizzes" style="background: var(--bg-surface-2); color: var(--text-primary); border: var(--border-subtle); padding: 10px 20px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer;">
              🎯 Realizar Test de Autoevaluación
            </button>
          </div>
        </div>
      `;

      const btnTheory = this.container.querySelector('#btn-go-to-theory');
      const btnQuizzes = this.container.querySelector('#btn-go-to-quizzes');
      if (btnTheory) {
        btnTheory.addEventListener('click', () => appStore.setActiveTab('theory'));
      }
      if (btnQuizzes) {
        btnQuizzes.addEventListener('click', () => appStore.setActiveTab('quizzes'));
      }
      return;
    }

    this.container.innerHTML = `
      <div style="margin-bottom: var(--space-xl);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
          <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">
            💻 Retos de Programación Guiada con Verificación Automática
          </h2>
          <span style="font-size: 0.85rem; color: var(--color-cyan); font-family: var(--font-code); font-weight: 700;">
            ${passedChallengesCount} de ${challenges.length} Retos Superados
          </span>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          Resuelve los ejercicios aplicando los conceptos del módulo. Puedes usar <strong>"▶ Ejecutar"</strong> para probar tu código y ver los <code>console.log</code>, y cuando estés listo, pulsa <strong>"🧪 Comprobar Solución"</strong> para verificar todos los casos de prueba.
        </p>
      </div>

      <div class="challenges-wrapper">
        ${challenges.map((ch, idx) => {
          const isPassed = Boolean(completedChallenges[ch.id]);
          const cleanTag = (ch.topicTag || '').replace(/^Temas?\s+[\d\s,y]+\s*:\s*/i, '').trim();

          return `
            <div class="challenge-card animate-fade-in" id="challenge-card-${ch.id}">
              <div class="challenge-header">
                <div>
                  <span style="font-size: 0.72rem; color: var(--color-cyan); font-family: var(--font-code); font-weight: 800; text-transform: uppercase;">Reto ${idx + 1} de ${challenges.length}${cleanTag ? ` ${cleanTag}` : ''}</span>
                  <h3 class="challenge-title">${ch.title}</h3>
                </div>
                <div>
                  <span class="quiz-difficulty ${ch.difficulty === 'Básico' ? 'diff-facil' : ch.difficulty === 'Intermedio' ? 'diff-medio' : 'diff-examen'}">
                    ${ch.difficulty}
                  </span>
                  ${isPassed ? '<span class="status-pill completed" style="margin-left: 6px;">✓ Superado</span>' : ''}
                </div>
              </div>

              <div class="challenge-instruction">
                ${ch.instructions}
              </div>

              <div class="code-runner-widget" style="margin-bottom: 0;">
                <div class="code-runner-header">
                  <div class="code-title-group">
                    <div class="window-dots">
                      <span class="window-dot dot-red"></span>
                      <span class="window-dot dot-yellow"></span>
                      <span class="window-dot dot-green"></span>
                    </div>
                    <span class="code-snippet-title">Editor de Código JS</span>
                  </div>
                  <div class="code-runner-actions">
                    <button class="btn-code-action btn-challenge-hint" data-challenge-id="${ch.id}" title="Mostrar u ocultar pista">
                      💡 Pista
                    </button>
                    <button class="btn-code-action btn-challenge-reset" data-challenge-id="${ch.id}" title="Restablecer plantilla inicial">
                      🔄 Reset
                    </button>
                    <button class="btn-code-action btn-challenge-run" data-challenge-id="${ch.id}" title="Ejecutar código y ver salida por consola">
                      ▶ Ejecutar
                    </button>
                    <button class="btn-code-action btn-run-code btn-challenge-test" data-challenge-id="${ch.id}" title="Lanzar batería de tests unitarios" style="background: var(--color-cyan); color: #0f172a; font-weight: 700;">
                      🧪 Comprobar Solución
                    </button>
                  </div>
                </div>

                ${ch.domFixture ? `
                  <div class="dom-visual-preview challenge-visual-preview">
                    <div class="dom-preview-header">
                      <div class="dom-preview-tag" id="challenge-preview-tag-${ch.id}">
                        <span class="live-indicator-dot"></span>
                        <span>Lienzo Visual del Reto (Renderizado Real en Navegador)</span>
                      </div>
                      <div class="dom-preview-actions">
                        <div class="dom-view-toggle-group" role="tablist" aria-label="Modo de visualización del reto">
                          <button 
                            type="button" 
                            class="btn-dom-toggle active" 
                            data-challenge-view="rendered" 
                            data-challenge-id="${ch.id}" 
                            title="Ver resultado visual renderizado en el navegador"
                          >
                            👁 Renderizado
                          </button>
                          <button 
                            type="button" 
                            class="btn-dom-toggle" 
                            data-challenge-view="html" 
                            data-challenge-id="${ch.id}" 
                            title="Ver marcado y código HTML inicial del reto"
                          >
                            &lt;/&gt; HTML Inicial
                          </button>
                        </div>
                        <button class="btn-preview-reset btn-reset-challenge-dom" data-challenge-id="${ch.id}" title="Restablecer marcado HTML del reto al estado original">
                          ↺ Restablecer HTML
                        </button>
                      </div>
                    </div>
                    <div class="dom-preview-canvas" id="challenge-canvas-${ch.id}">
                      ${ch.domFixture}
                    </div>
                    <div class="dom-preview-html-source" id="challenge-html-source-${ch.id}" style="display: none;">
                      <div class="html-source-toolbar">
                        <span class="html-source-badge">📄 HTML Base del Reto</span>
                        <button type="button" class="btn-copy-html btn-copy-challenge-html" data-challenge-id="${ch.id}" title="Copiar HTML original del reto al portapapeles">
                          📋 Copiar HTML
                        </button>
                      </div>
                      <pre class="html-source-pre"><code>${highlightHtmlSyntax(ch.domFixture)}</code></pre>
                    </div>
                  </div>
                ` : ''}

                <div class="code-editor-area">
                  <textarea 
                    class="code-textarea challenge-editor" 
                    id="editor-${ch.id}"
                    spellcheck="false" 
                    autocomplete="off"
                  >${ch.starterCode.trim()}</textarea>
                </div>

                <!-- Consola Virtual Integrada para pruebas rápidas -->
                <div class="code-terminal" id="terminal-${ch.id}" style="display: none;">
                  <div class="terminal-header">
                    <span>Consola de Salida Virtual (DevTools)</span>
                    <span class="execution-duration" id="duration-${ch.id}" style="font-family: var(--font-code); color: var(--color-cyan);">0.0ms</span>
                  </div>
                  <div class="terminal-entries" id="entries-${ch.id}">
                    <div class="terminal-entry" style="color: var(--text-muted); font-style: italic;">
                      Pulsa en "▶ Ejecutar" para ver las llamadas a console.log...
                    </div>
                  </div>
                </div>
              </div>

              <div class="hint-box" id="hint-${ch.id}">
                <strong>💡 Pista pedagógica:</strong> ${ch.hint}
              </div>

              <!-- Resultados de los Casos de Prueba -->
              <div class="challenge-test-results" id="results-${ch.id}" style="display: none;">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
                  Batería de Pruebas Unitarias (${ch.tests ? ch.tests.length : 0} casos):
                </div>
                <div class="test-results-list" id="test-list-${ch.id}"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Inicializar CodeEditorWrapper para cada reto
    challenges.forEach(ch => {
      const textarea = document.getElementById(`editor-${ch.id}`);
      if (textarea) {
        const editor = new CodeEditorWrapper(textarea, {
          initialValue: ch.starterCode.trim()
        });
        this.editors.set(ch.id, editor);
      }
    });

    this.bindChallengeEvents();

    // Refrescar editores tras montaje completo
    setTimeout(() => {
      this.editors.forEach(ed => ed.refresh());
    }, 100);
  }

  bindChallengeEvents() {
    // 0. Conmutador de vista del reto: Renderizado vs HTML Inicial
    this.container.querySelectorAll('.btn-dom-toggle[data-challenge-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const chId = btn.dataset.challengeId;
        const viewMode = btn.dataset.challengeView;
        const group = btn.closest('.dom-view-toggle-group');
        if (group) {
          group.querySelectorAll('.btn-dom-toggle').forEach(b => {
            b.classList.toggle('active', b.dataset.challengeView === viewMode);
          });
        }
        const canvas = document.getElementById(`challenge-canvas-${chId}`);
        const htmlSource = document.getElementById(`challenge-html-source-${chId}`);
        const previewTag = document.getElementById(`challenge-preview-tag-${chId}`);

        if (viewMode === 'html') {
          if (canvas) canvas.style.display = 'none';
          if (htmlSource) htmlSource.style.display = 'block';
          if (previewTag) {
            previewTag.innerHTML = `
              <span class="code-indicator-icon">&lt;/&gt;</span>
              <span>Marcado HTML Inicial (Estructura Base del Reto)</span>
            `;
          }
        } else {
          if (canvas) canvas.style.display = 'block';
          if (htmlSource) htmlSource.style.display = 'none';
          if (previewTag) {
            previewTag.innerHTML = `
              <span class="live-indicator-dot"></span>
              <span>Lienzo Visual del Reto (Renderizado Real en Navegador)</span>
            `;
          }
        }
      });
    });

    // Copiar marcado HTML del reto
    this.container.querySelectorAll('.btn-copy-challenge-html').forEach(btn => {
      btn.addEventListener('click', async () => {
        const chId = btn.dataset.challengeId;
        const raContent = getContentForRa(appStore.getState().activeRaId);
        const chData = (raContent.challenges || []).find(c => c.id === chId);
        if (!chData || !chData.domFixture) return;

        try {
          await navigator.clipboard.writeText(chData.domFixture);
          const originalText = btn.textContent;
          btn.textContent = '✓ Copiado';
          setTimeout(() => { btn.textContent = originalText; }, 1800);
        } catch (e) {
          btn.textContent = 'Err al copiar';
        }
      });
    });

    // 1. Botón Pista
    this.container.querySelectorAll('.btn-challenge-hint').forEach(btn => {
      btn.addEventListener('click', () => {
        const chId = btn.dataset.challengeId;
        const hintBox = document.getElementById(`hint-${chId}`);
        if (hintBox) {
          hintBox.classList.toggle('open');
        }
      });
    });

    // 2. Botón Reset de Marcado HTML del Reto
    this.container.querySelectorAll('.btn-reset-challenge-dom').forEach(btn => {
      btn.addEventListener('click', () => {
        const chId = btn.dataset.challengeId;
        const raContent = getContentForRa(appStore.getState().activeRaId);
        const chData = (raContent.challenges || []).find(c => c.id === chId);
        const canvas = document.getElementById(`challenge-canvas-${chId}`);
        if (chData && canvas && chData.domFixture) {
          canvas.innerHTML = chData.domFixture;
        }
      });
    });

    // 3. Botón Reset de Código y Canvas
    this.container.querySelectorAll('.btn-challenge-reset').forEach(btn => {
      btn.addEventListener('click', () => {
        const chId = btn.dataset.challengeId;
        const raContent = getContentForRa(appStore.getState().activeRaId);
        const chData = (raContent.challenges || []).find(c => c.id === chId);
        const editor = this.editors.get(chId);
        const resultsBox = document.getElementById(`results-${chId}`);
        const terminal = document.getElementById(`terminal-${chId}`);
        const canvas = document.getElementById(`challenge-canvas-${chId}`);

        if (chData && editor) {
          editor.setValue(chData.starterCode.trim());
        }
        if (chData && canvas && chData.domFixture) {
          canvas.innerHTML = chData.domFixture;
        }
        if (resultsBox) {
          resultsBox.style.display = 'none';
        }
        if (terminal) {
          terminal.style.display = 'none';
        }
      });
    });

    // 3. Botón "▶ Ejecutar" (Consola en vivo)
    this.container.querySelectorAll('.btn-challenge-run').forEach(btn => {
      btn.addEventListener('click', async () => {
        const chId = btn.dataset.challengeId;

        // Si estaba en la vista HTML, regresar a la vista renderizada para apreciar la ejecución
        const canvas = document.getElementById(`challenge-canvas-${chId}`);
        const htmlSource = document.getElementById(`challenge-html-source-${chId}`);
        const previewTag = document.getElementById(`challenge-preview-tag-${chId}`);
        const toggleGroup = this.container.querySelector(`.btn-dom-toggle[data-challenge-id="${chId}"]`)?.closest('.dom-view-toggle-group');
        if (htmlSource && htmlSource.style.display !== 'none') {
          htmlSource.style.display = 'none';
          if (canvas) canvas.style.display = 'block';
          if (previewTag) {
            previewTag.innerHTML = `
              <span class="live-indicator-dot"></span>
              <span>Lienzo Visual del Reto (Renderizado Real en Navegador)</span>
            `;
          }
          if (toggleGroup) {
            toggleGroup.querySelectorAll('.btn-dom-toggle').forEach(b => {
              b.classList.toggle('active', b.dataset.challengeView === 'rendered');
            });
          }
        }

        const editor = this.editors.get(chId);
        const terminal = document.getElementById(`terminal-${chId}`);
        const entries = document.getElementById(`entries-${chId}`);
        const durationEl = document.getElementById(`duration-${chId}`);

        const userCode = editor ? editor.getValue() : '';
        if (!userCode || !terminal || !entries) return;

        terminal.style.display = 'block';
        entries.innerHTML = `
          <div class="terminal-entry" style="color: var(--text-muted);">
            <span class="entry-prefix">»</span> Ejecutando código del reto...
          </div>
        `;

        btn.disabled = true;
        btn.textContent = '⏳ Ejecutando...';

        const result = await CodeRunner.execute(userCode);

        if (durationEl) {
          durationEl.textContent = `${result.durationMs}ms`;
        }

        entries.innerHTML = '';

        if (result.logs.length === 0 && !result.error) {
          entries.innerHTML = `
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

            entries.appendChild(entryEl);
          });
        }

        btn.disabled = false;
        btn.textContent = '▶ Ejecutar';
      });
    });

    // 4. Botón "🧪 Comprobar Solución" (Tests automatizados)
    this.container.querySelectorAll('.btn-challenge-test').forEach(btn => {
      btn.addEventListener('click', async () => {
        const chId = btn.dataset.challengeId;

        // Si estaba en la vista HTML, regresar a la vista renderizada para apreciar la evaluación
        const canvas = document.getElementById(`challenge-canvas-${chId}`);
        const htmlSource = document.getElementById(`challenge-html-source-${chId}`);
        const previewTag = document.getElementById(`challenge-preview-tag-${chId}`);
        const toggleGroup = this.container.querySelector(`.btn-dom-toggle[data-challenge-id="${chId}"]`)?.closest('.dom-view-toggle-group');
        if (htmlSource && htmlSource.style.display !== 'none') {
          htmlSource.style.display = 'none';
          if (canvas) canvas.style.display = 'block';
          if (previewTag) {
            previewTag.innerHTML = `
              <span class="live-indicator-dot"></span>
              <span>Lienzo Visual del Reto (Renderizado Real en Navegador)</span>
            `;
          }
          if (toggleGroup) {
            toggleGroup.querySelectorAll('.btn-dom-toggle').forEach(b => {
              b.classList.toggle('active', b.dataset.challengeView === 'rendered');
            });
          }
        }

        const raContent = getContentForRa(appStore.getState().activeRaId);
        const chData = (raContent.challenges || []).find(c => c.id === chId);
        const editor = this.editors.get(chId);
        const resultsBox = document.getElementById(`results-${chId}`);
        const resultsList = document.getElementById(`test-list-${chId}`);

        const userCode = editor ? editor.getValue() : '';
        if (!chData || !userCode || !resultsBox || !resultsList) return;

        btn.disabled = true;
        btn.textContent = '⏳ Verificando...';

        const evalResult = await ChallengeEvaluator.evaluate(userCode, chData);

        resultsBox.style.display = 'block';
        resultsList.innerHTML = evalResult.results.map(r => `
          <div class="test-item">
            <span style="display: flex; align-items: center; gap: 6px; flex: 1;">
              <span style="color: ${r.passed ? 'var(--color-success)' : 'var(--color-danger)'}; font-weight: 800;">
                ${r.passed ? '✓' : '✕'}
              </span>
              <span>${this.escapeHtml(r.name)}</span>
            </span>
            <span class="${r.passed ? 'test-badge-pass' : 'test-badge-fail'}">
              ${r.passed ? 'PASADO' : 'FALLIDO'}
            </span>
          </div>
          ${r.error ? `<div style="font-size: 0.78rem; color: #f87171; background: rgba(239, 68, 68, 0.1); padding: 4px 8px; border-radius: var(--radius-xs); margin: 3px 0 6px 20px; font-family: var(--font-code);">${this.escapeHtml(r.error)}</div>` : ''}
        `).join('');

        if (evalResult.allPassed) {
          appStore.recordChallengeSuccess(chId);
          resultsList.insertAdjacentHTML('beforeend', `
            <div style="margin-top: 10px; padding: 10px 14px; border-radius: var(--radius-sm); background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: var(--color-success); font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
              🎉 ¡Enhorabuena! Has superado con éxito todos los casos de prueba de este reto.
            </div>
          `);
        }

        btn.disabled = false;
        btn.textContent = '🧪 Comprobar Solución';
      });
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
