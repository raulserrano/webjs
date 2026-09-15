/**
 * COMPONENTE HERO Y NAVEGACIÓN DE PESTAÑAS (PROGRESS HEADER)
 * Muestra el banner del RA2, criterios oficiales del BOE y selector de vistas
 */

import { getContentForRa } from '../data/content-registry.js';
import { CURRICULUM_DATA } from '../data/curriculum.js';
import { appStore } from '../state/store.js';

export class ProgressHeaderComponent {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render() {
    const state = appStore.getState();
    const activeRa = CURRICULUM_DATA.find(r => r.id === state.activeRaId) || CURRICULUM_DATA[1];
    const raContent = getContentForRa(activeRa.id);
    const metrics = appStore.getProgressMetrics(activeRa.id);

    this.container.innerHTML = `
      <div class="ra-hero-card">
        <div class="ra-hero-header">
          <span class="ra-code-badge">${activeRa.code}</span>
          <span class="ra-official-badge">Módulo 0612 · DAW</span>
          <span style="font-size: 0.8rem; color: var(--color-cyan); font-family: var(--font-code); font-weight: 600;">
            ${activeRa.durationHours} Horas Lectivas Oficiales
          </span>
        </div>

        <h1 class="ra-hero-title">${activeRa.title}</h1>
        <p class="ra-hero-desc">${activeRa.description}</p>

        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <button class="criterios-toggle-btn" id="btn-toggle-criterios">
            📜 Ver Criterios de Evaluación Oficiales (${activeRa.criteria.length}) ▾
          </button>

          <div class="stats-pill-group">
            <div class="stat-pill">
              <span class="stat-pill-num">${metrics.percentage}%</span>
              <span class="stat-pill-label">Dominio ${activeRa.code}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-pill-num">${metrics.answeredCorrectQuizzes}/${metrics.totalQuizzes}</span>
              <span class="stat-pill-label">Autoevaluación</span>
            </div>
            ${metrics.totalChallenges > 0 ? `
              <div class="stat-pill">
                <span class="stat-pill-num">${metrics.passedChallenges}/${metrics.totalChallenges}</span>
                <span class="stat-pill-label">Retos Código</span>
              </div>
            ` : `
              <div class="stat-pill" title="Este resultado de aprendizaje es de naturaleza conceptual">
                <span class="stat-pill-num" style="font-size: 0.85rem;">Teórico</span>
                <span class="stat-pill-label">Módulo Conceptual</span>
              </div>
            `}
          </div>
        </div>

        <div class="criterios-box" id="criterios-box">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
            Criterios de Evaluación Oficiales del BOE (Real Decreto 686/2010):
          </div>
          <ul class="criterios-list">
            ${activeRa.criteria.map(c => `
              <li><span class="criterio-tag">•</span> <span>${c}</span></li>
            `).join('')}
          </ul>
        </div>
      </div>

      <!-- Navegación por pestañas principales de la unidad -->
      <div class="section-tabs-nav" role="tablist">
        <button 
          class="tab-btn ${state.activeTab === 'theory' ? 'active' : ''}" 
          data-tab-id="theory"
          role="tab"
          aria-selected="${state.activeTab === 'theory' ? 'true' : 'false'}"
        >
          📖 Teoría y Código en Vivo
          <span class="tab-count-badge">${raContent.topics.length}</span>
        </button>

        <button 
          class="tab-btn ${state.activeTab === 'quizzes' ? 'active' : ''}" 
          data-tab-id="quizzes"
          role="tab"
          aria-selected="${state.activeTab === 'quizzes' ? 'true' : 'false'}"
        >
          🎯 Test de Autoevaluación
          <span class="tab-count-badge">${metrics.answeredCorrectQuizzes}/${metrics.totalQuizzes}</span>
        </button>

        <button 
          class="tab-btn ${state.activeTab === 'challenges' ? 'active' : ''}" 
          data-tab-id="challenges"
          role="tab"
          aria-selected="${state.activeTab === 'challenges' ? 'true' : 'false'}"
        >
          💻 Retos de Código
          <span class="tab-count-badge">${metrics.totalChallenges > 0 ? `${metrics.passedChallenges}/${metrics.totalChallenges}` : 'Teórico'}</span>
        </button>

        <button 
          class="tab-btn ${state.activeTab === 'roadmap' ? 'active' : ''}" 
          data-tab-id="roadmap"
          role="tab"
          aria-selected="${state.activeTab === 'roadmap' ? 'true' : 'false'}"
        >
          🗺️ Mapa de los 7 RAs
          <span class="tab-count-badge">7</span>
        </button>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Toggle de criterios del BOE
    const toggleBtn = this.container.querySelector('#btn-toggle-criterios');
    const criteriosBox = this.container.querySelector('#criterios-box');
    if (toggleBtn && criteriosBox) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = criteriosBox.classList.toggle('open');
        toggleBtn.innerHTML = isOpen 
          ? '📜 Ocultar Criterios de Evaluación Oficiales ▴' 
          : `📜 Ver Criterios de Evaluación Oficiales ▾`;
      });
    }

    // Pestañas
    this.container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tabId;
        if (!tabId) return;
        appStore.setActiveTab(tabId);
      });
    });
  }
}
