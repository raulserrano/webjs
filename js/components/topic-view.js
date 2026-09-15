/**
 * COMPONENTE TOPIC VIEW (VISTA TEÓRICA Y DE EJEMPLOS)
 * Renderiza el contenido didáctico, callouts docentes y playgrounds de código
 */

import { getContentForRa } from '../data/content-registry.js';
import { appStore } from '../state/store.js';
import { CodePlayground } from './code-playground.js';

export class TopicViewComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.playgrounds = [];
  }

  render() {
    const state = appStore.getState();
    const raContent = getContentForRa(state.activeRaId);
    const topicsToDisplay = raContent.topics || [];

    // Contenedor principal de la vista limpia
    this.container.innerHTML = `
      <div class="topics-list-container" id="topics-list">
        <!-- Renderizado dinámico de tarjetas -->
      </div>
    `;

    const topicsListEl = this.container.querySelector('#topics-list');
    this.playgrounds = [];

    if (topicsToDisplay.length === 0) {
      topicsListEl.innerHTML = `
        <div class="state-container">
          <div class="state-icon">🔍</div>
          <h3 class="state-title">No se encontraron contenidos</h3>
          <p class="state-desc">No hay módulos teóricos disponibles para el filtro seleccionado.</p>
        </div>
      `;
      return;
    }

    topicsToDisplay.forEach((topic, idx) => {
      const card = document.createElement('article');
      card.className = 'topic-card animate-fade-in';
      card.id = `topic-${topic.id}`;

      // Cabecera del tema con referencia a criterios oficiales
      card.innerHTML = `
        <header class="topic-header">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="topic-order">${topic.criteriaRef}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">${state.activeRaId === 'ra2' ? 'Tema' : 'Apartado'} ${idx + 1} de ${topicsToDisplay.length}</span>
          </div>
          <h2 class="topic-title">${topic.title}</h2>
          <p style="color: var(--text-secondary); font-size: 0.92rem; margin-top: 6px;">${topic.description}</p>
        </header>

        <div class="topic-body">
          ${topic.theoryHtml}
        </div>

        ${topic.callout ? `
          <div class="pedagogical-callout ${topic.callout.type}">
            <div class="callout-icon">
              ${topic.callout.type === 'fp-exam' ? '🎯' : topic.callout.type === 'pro-tip' ? '💡' : '🏛️'}
            </div>
            <div class="callout-content">
              <div class="callout-title">${topic.callout.title}</div>
              <div class="callout-text">${topic.callout.text}</div>
            </div>
          </div>
        ` : ''}

        <div class="topic-examples-area" id="examples-container-${topic.id}">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 24px 0 12px 0; display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--color-brand);">⚡</span> Consola Interactiva y Ejemplos Ejecutables
          </h4>
        </div>
      `;

      const examplesContainer = card.querySelector(`#examples-container-${topic.id}`);

      // Insertar los playgrounds de código interactivos
      topic.examples.forEach(ex => {
        const playground = new CodePlayground({
          id: ex.id,
          title: ex.title,
          initialCode: ex.initialCode,
          description: ex.description,
          domFixture: ex.domFixture,
          isVisual: ex.isVisual
        });

        this.playgrounds.push(playground);
        examplesContainer.appendChild(playground.render());
      });

      topicsListEl.appendChild(card);
    });
  }
}
