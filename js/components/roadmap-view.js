/**
 * COMPONENTE ROADMAP VIEW (VISIÓN INTEGRAL DE LOS 7 RAs)
 * Muestra el currículo oficial completo del ciclo formativo y el estado de desarrollo
 */

import { CURRICULUM_DATA } from '../data/curriculum.js';
import { appStore } from '../state/store.js';

export class RoadmapViewComponent {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render() {
    this.container.innerHTML = `
      <div style="margin-bottom: var(--space-xl);">
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
          🗺️ Plan de Estudios Oficial: Los 7 Resultados de Aprendizaje (RA)
        </h2>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          Módulo Profesional 0612: Desarrollo Web en Entorno Cliente (9 créditos ECTS / 80-90 Horas). 
          Cada resultado de aprendizaje estructura las competencias profesionales que debe dominar el futuro Técnico Superior en DAW.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-lg);">
        ${CURRICULUM_DATA.map(ra => {
          const isAvailable = ra.status === 'available';

          return `
            <div class="topic-card animate-fade-in" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between; border-color: ${isAvailable ? 'var(--color-brand)' : 'var(--border-subtle)'}; ${isAvailable ? 'box-shadow: 0 4px 20px var(--color-brand-glow);' : ''}">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span class="ra-code-badge" style="${!isAvailable ? 'background: var(--bg-surface-3); color: var(--text-secondary); box-shadow: none;' : ''}">${ra.code}</span>
                  <span class="status-pill ${isAvailable ? 'completed' : 'locked'}">
                    ${isAvailable ? '✓ Disponible · Completo' : 'Próxima Entrega'}
                  </span>
                </div>

                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; line-height: 1.3;">
                  ${ra.title}
                </h3>
                <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 14px;">
                  ${ra.description}
                </p>

                <div style="background: var(--bg-surface-2); border: var(--border-subtle); padding: 10px; border-radius: var(--radius-md); margin-bottom: 14px;">
                  <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-cyan); text-transform: uppercase; margin-bottom: 6px;">
                    Contenidos Esenciales:
                  </div>
                  <ul style="font-size: 0.82rem; color: var(--text-secondary); list-style: disc; margin-left: 18px;">
                    ${ra.topicsSummary.map(t => `<li>${t}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div style="border-top: var(--border-subtle); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-code);">
                  ${ra.durationHours} Horas
                </span>
                <button 
                  class="btn-code-action ${isAvailable ? 'btn-run-code' : ''}" 
                  data-jump-ra="${ra.id}"
                  style="font-size: 0.82rem; padding: 6px 14px;"
                >
                  ${isAvailable ? 'Acceder al Módulo →' : 'Ver Detalles'}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('[data-jump-ra]').forEach(btn => {
      btn.addEventListener('click', () => {
        const raId = btn.dataset.jumpRa;
        const raItem = CURRICULUM_DATA.find(r => r.id === raId);
        appStore.setActiveRa(raId);
        if (raItem && raItem.status === 'available') {
          appStore.setActiveTab('theory');
        }
      });
    });
  }
}
