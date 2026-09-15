/**
 * COMPONENTE DE NAVEGACIÓN CURRICULAR (LOS 7 RAs)
 * Renderiza la barra lateral con los 7 Resultados de Aprendizaje oficiales
 */

import { CURRICULUM_DATA } from '../data/curriculum.js';
import { appStore } from '../state/store.js';

export class NavigationComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.unsubscribe = null;
  }

  init() {
    this.render();
    this.unsubscribe = appStore.subscribe((state) => {
      this.updateActiveStates(state);
      this.updateProgressTrack(state);
    });
    this.bindEvents();
  }

  render() {
    const state = appStore.getState();
    const activeRa = CURRICULUM_DATA.find(r => r.id === state.activeRaId) || CURRICULUM_DATA[1];
    const metrics = appStore.getProgressMetrics(state.activeRaId);

    this.container.innerHTML = `
      <div class="sidebar-header">
        <div class="brand-logo-area">
          <div class="brand-icon">JS</div>
          <div class="brand-info">
            <h1>JS Docente FP</h1>
            <p>Módulo 0612 · DAW</p>
          </div>
        </div>
      </div>

      <div class="sidebar-progress-box">
        <div class="progress-label-row">
          <span id="global-progress-label">Progreso ${activeRa.code}</span>
          <span id="global-progress-percent">${metrics.percentage}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" id="global-progress-fill" style="width: ${metrics.percentage}%"></div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section-title">Resultados de Aprendizaje</div>
        <div class="ra-nav-list" id="ra-nav-items-container">
          ${CURRICULUM_DATA.map(ra => {
            const isActive = state.activeRaId === ra.id;
            const badge = this.getBadgeInfo(ra, isActive);

            return `
              <button 
                class="ra-nav-item ${isActive ? 'active' : ''}" 
                data-ra-id="${ra.id}"
                aria-current="${isActive ? 'true' : 'false'}"
              >
                <div class="ra-nav-badge">${ra.code}</div>
                <div class="ra-nav-content">
                  <div class="ra-nav-title" title="${ra.title}">${ra.title}</div>
                  <div class="ra-nav-meta">
                    <span class="status-pill ${badge.className}">${badge.label}</span>
                    <span style="font-size: 0.68rem; color: var(--text-muted);">${ra.durationHours}h</span>
                  </div>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </nav>

      <div class="sidebar-footer">
        <span>Ciclo Superior DAW</span>
        <span style="color: var(--color-cyan); font-family: var(--font-code);">RD 686/2010</span>
      </div>
    `;
  }

  getBadgeInfo(ra, isActive) {
    const isAvailable = ra.status === 'available';
    if (!isAvailable) {
      return { className: 'locked', label: 'Próximamente' };
    }
    if (isActive) {
      return { className: 'active-now', label: 'Activo' };
    }
    return { className: 'completed', label: 'Completo' };
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      const button = e.target.closest('.ra-nav-item');
      if (!button) return;

      const raId = button.dataset.raId;
      if (!raId) return;

      appStore.setActiveRa(raId);

      // En pantallas móviles, cerrar la barra lateral al seleccionar
      if (window.innerWidth <= 768) {
        appStore.toggleSidebar(false);
      }
    });
  }

  updateActiveStates(state) {
    const items = this.container.querySelectorAll('.ra-nav-item');
    items.forEach(item => {
      const raId = item.dataset.raId;
      const isActive = state.activeRaId === raId;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-current', isActive ? 'true' : 'false');

      const ra = CURRICULUM_DATA.find(r => r.id === raId);
      const pill = item.querySelector('.status-pill');
      if (ra && pill) {
        const badge = this.getBadgeInfo(ra, isActive);
        pill.className = `status-pill ${badge.className}`;
        pill.textContent = badge.label;
      }
    });

    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar && backdrop) {
      sidebar.classList.toggle('open', state.isSidebarOpen);
      backdrop.classList.toggle('active', state.isSidebarOpen);
    }
  }

  updateProgressTrack(state) {
    const activeRa = CURRICULUM_DATA.find(r => r.id === state.activeRaId) || CURRICULUM_DATA[1];
    const metrics = appStore.getProgressMetrics(state.activeRaId);
    const labelEl = document.getElementById('global-progress-label');
    const percentEl = document.getElementById('global-progress-percent');
    const fillEl = document.getElementById('global-progress-fill');

    if (labelEl) labelEl.textContent = `Progreso ${activeRa.code}`;
    if (percentEl) percentEl.textContent = `${metrics.percentage}%`;
    if (fillEl) fillEl.style.width = `${metrics.percentage}%`;
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
