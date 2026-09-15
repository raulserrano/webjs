/**
 * APLICACIÓN PRINCIPAL (APP BOOTSTRAP)
 * Orquesta los componentes, la navegación reactiva y el enrutamiento de vistas
 */

import { appStore } from './state/store.js';
import { CURRICULUM_DATA } from './data/curriculum.js';
import { getAvailableRaIds } from './data/content-registry.js';
import { NavigationComponent } from './components/navigation.js';
import { ProgressHeaderComponent } from './components/progress-header.js';
import { TopicViewComponent } from './components/topic-view.js';
import { ExerciseRunnerComponent } from './components/exercise-runner.js';
import { RoadmapViewComponent } from './components/roadmap-view.js';

class App {
  constructor() {
    this.navContainer = document.getElementById('app-sidebar');
    this.headerContainer = document.getElementById('view-header-container');
    this.mainContainer = document.getElementById('view-content-container');
    this.btnMobileToggle = document.getElementById('btn-mobile-nav');
    this.backdrop = document.getElementById('sidebar-backdrop');
    this.btnResetProgress = document.getElementById('btn-reset-progress');

    this.navigation = null;
    this.progressHeader = null;
    this.currentViewInstance = null;
    this.currentRaId = null;
    this.currentTab = null;
  }

  init() {
    try {
      // 1. Inicializar componente de navegación lateral
      this.navigation = new NavigationComponent(this.navContainer);
      this.navigation.init();

      // 2. Inicializar cabecera de progreso
      this.progressHeader = new ProgressHeaderComponent(this.headerContainer);
      this.progressHeader.render();

      // 3. Suscribirse a cambios del almacén de estado
      appStore.subscribe((state) => {
        const routeChanged = state.activeRaId !== this.currentRaId || state.activeTab !== this.currentTab;

        // Solo re-renderizar la vista completa si hay navegación de ruta o cambio de pestaña
        if (routeChanged) {
          this.renderView(state);
        }

        // La cabecera de métricas se actualiza siempre de forma reactiva
        this.progressHeader.render();
      });

      // 4. Render inicial de la vista
      this.renderView(appStore.getState());

      // 5. Vincular eventos globales (móvil, reset)
      this.bindGlobalEvents();

      console.log('🚀 Plataforma Docente JS - Módulo 0612 inicializada con éxito.');
    } catch (err) {
      console.error('Error fatal al iniciar la plataforma docente:', err);
      this.renderFatalError(err);
    }
  }

  renderView(state, shouldScroll = true) {
    this.currentRaId = state.activeRaId;
    this.currentTab = state.activeTab;

    // Si el usuario navega a un RA que aún no está desarrollado
    const availableRaIds = getAvailableRaIds();
    if (!availableRaIds.includes(state.activeRaId)) {
      this.renderOtherRaView(state.activeRaId);
      if (shouldScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Si está en un RA disponible (RA2, RA3...), renderizar según la pestaña activa
    const activeTab = state.activeTab;

    if (activeTab === 'theory') {
      this.currentViewInstance = new TopicViewComponent(this.mainContainer);
      this.currentViewInstance.render();
    } else if (activeTab === 'quizzes' || activeTab === 'challenges') {
      this.currentViewInstance = new ExerciseRunnerComponent(this.mainContainer);
      this.currentViewInstance.render();
    } else if (activeTab === 'roadmap') {
      this.currentViewInstance = new RoadmapViewComponent(this.mainContainer);
      this.currentViewInstance.render();
    }

    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  renderOtherRaView(raId) {
    const raData = CURRICULUM_DATA.find(r => r.id === raId);
    if (!raData) return;

    this.mainContainer.innerHTML = `
      <div class="state-container animate-fade-in" style="text-align: left; align-items: flex-start; max-width: 900px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 16px;">
          <span class="ra-code-badge">${raData.code}</span>
          <span class="status-pill locked">En Desarrollo Curricular</span>
        </div>

        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
          ${raData.title}
        </h2>
        <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.6; margin-bottom: 24px;">
          ${raData.description}
        </p>

        <div style="width: 100%; background: var(--bg-surface-2); border: var(--border-subtle); border-radius: var(--radius-lg); padding: 20px; margin-bottom: 24px;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-brand); text-transform: uppercase; margin-bottom: 12px;">
            Criterios de Evaluación Oficiales (BOE / BORM):
          </h4>
          <ul style="display: flex; flex-direction: column; gap: 8px; font-size: 0.88rem; color: var(--text-secondary);">
            ${raData.criteria.map(c => `<li>• ${c}</li>`).join('')}
          </ul>
        </div>

        <div style="width: 100%; background: rgba(120, 53, 15, 0.06); border: 1px solid rgba(120, 53, 15, 0.2); border-radius: var(--radius-lg); padding: 20px; margin-bottom: 24px;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-cyan); text-transform: uppercase; margin-bottom: 12px;">
            Contenidos Esenciales que se Desarrollarán:
          </h4>
          <ul style="list-style: disc; margin-left: 20px; font-size: 0.88rem; color: var(--text-secondary);">
            ${raData.topicsSummary.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>

        <div style="display: flex; gap: 12px; align-items: center; width: 100%; flex-wrap: wrap;">
          <button class="btn-code-action btn-run-code" id="btn-back-to-ra2" style="padding: 10px 20px; font-size: 0.9rem;">
            ← RA2: Sintaxis y Control
          </button>
          <button class="btn-code-action btn-run-code" id="btn-to-ra3" style="padding: 10px 20px; font-size: 0.9rem; background: var(--color-cyan); color: #fff;">
            → RA3: Objetos Nativos y BOM
          </button>
          <button class="btn-code-action btn-run-code" id="btn-to-ra6" style="padding: 10px 20px; font-size: 0.9rem; background: var(--color-brand); color: #fff;">
            → RA6: Manipulación del DOM
          </button>
          <button class="btn-code-action" id="btn-view-roadmap" style="padding: 10px 20px; font-size: 0.9rem;">
            Ver Mapa Global de RAs
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-back-to-ra2')?.addEventListener('click', () => {
      appStore.setActiveRa('ra2');
      appStore.setActiveTab('theory');
    });

    document.getElementById('btn-to-ra3')?.addEventListener('click', () => {
      appStore.setActiveRa('ra3');
      appStore.setActiveTab('theory');
    });

    document.getElementById('btn-to-ra6')?.addEventListener('click', () => {
      appStore.setActiveRa('ra6');
      appStore.setActiveTab('theory');
    });

    document.getElementById('btn-view-roadmap')?.addEventListener('click', () => {
      appStore.setActiveTab('roadmap');
    });
  }

  bindGlobalEvents() {
    // Menú móvil
    if (this.btnMobileToggle) {
      this.btnMobileToggle.addEventListener('click', () => {
        appStore.toggleSidebar();
      });
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => {
        appStore.toggleSidebar(false);
      });
    }

    // Botón reiniciar progreso
    if (this.btnResetProgress) {
      this.btnResetProgress.addEventListener('click', () => {
        if (confirm('¿Deseas reiniciar las respuestas y progreso guardado en este navegador?')) {
          appStore.resetProgress();
          this.renderView(appStore.getState(), false);
        }
      });
    }

    // Tecla Escape cierra sidebar en móvil
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && appStore.getState().isSidebarOpen) {
        appStore.toggleSidebar(false);
      }
    });
  }

  renderFatalError(error) {
    if (!this.mainContainer) return;
    this.mainContainer.innerHTML = `
      <div class="state-container" style="border-color: var(--color-danger-border);">
        <div class="state-icon" style="color: var(--color-danger);">⚠</div>
        <h3 class="state-title">Error de inicialización</h3>
        <p class="state-desc">${error.message || String(error)}</p>
        <button class="btn-code-action btn-run-code" onclick="location.reload()">Reintentar</button>
      </div>
    `;
  }
}

// Arrancar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
