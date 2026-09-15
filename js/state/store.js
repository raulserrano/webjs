/**
 * GESTOR DE ESTADO REACTIVO LIGERO (STORE)
 * Aplica Principio de Inmutabilidad y Persistencia Local
 */

import { getContentForRa } from '../data/content-registry.js';

const STORAGE_KEY = 'js_fp_learning_progress_v1';

// Estado Inicial Inmutable
const initialState = {
  activeRaId: 'ra2',
  activeTab: 'theory', // 'theory' | 'examples' | 'quizzes' | 'challenges'
  activeSubtopicId: 'all',
  completedQuizzes: {},    // { 'quiz-1': { correct: true, selectedIndex: 1 } }
  completedChallenges: {}, // { 'challenge-1': true }
  executedSnippets: {},    // { 'ex-1': true }
  isSidebarOpen: false
};

// Cargar progreso previo de localStorage si existe
function loadPersistedState() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return initialState;
    const parsed = JSON.parse(serialized);
    return { ...initialState, ...parsed, activeRaId: parsed.activeRaId || 'ra2' };
  } catch (err) {
    console.warn('Error al leer de localStorage:', err);
    return initialState;
  }
}

class Store {
  constructor() {
    this._state = loadPersistedState();
    this._listeners = new Set();
  }

  // Obtener snapshot inmutable del estado
  getState() {
    return Object.freeze({ ...this._state });
  }

  // Suscribirse a cambios
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  // Notificar a todos los observadores
  _notify() {
    const currentState = this.getState();
    this._listeners.forEach(fn => {
      try {
        fn(currentState);
      } catch (err) {
        console.error('Error en listener del store:', err);
      }
    });
    this._persist();
  }

  // Persistir en disco
  _persist() {
    try {
      const { completedQuizzes, completedChallenges, executedSnippets, activeRaId } = this._state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeRaId,
        completedQuizzes,
        completedChallenges,
        executedSnippets
      }));
    } catch (err) {
      console.warn('No se pudo persistir el progreso:', err);
    }
  }

  // Mutadores controlados (Acciones)
  setActiveRa(raId) {
    if (this._state.activeRaId === raId) return;
    this._state = { ...this._state, activeRaId: raId, activeSubtopicId: 'all' };
    this._notify();
  }

  setActiveTab(tabId) {
    if (this._state.activeTab === tabId) return;
    this._state = { ...this._state, activeTab: tabId };
    this._notify();
  }

  setActiveSubtopic(subtopicId) {
    if (this._state.activeSubtopicId === subtopicId) return;
    this._state = { ...this._state, activeSubtopicId: subtopicId };
    this._notify();
  }

  toggleSidebar(forceState) {
    const nextState = typeof forceState === 'boolean' ? forceState : !this._state.isSidebarOpen;
    this._state = { ...this._state, isSidebarOpen: nextState };
    this._notify();
  }

  recordQuizAnswer(quizId, isCorrect, selectedIndex) {
    this._state = {
      ...this._state,
      completedQuizzes: {
        ...this._state.completedQuizzes,
        [quizId]: { isCorrect, selectedIndex, answeredAt: Date.now() }
      }
    };
    this._notify();
  }

  recordChallengeSuccess(challengeId) {
    this._state = {
      ...this._state,
      completedChallenges: {
        ...this._state.completedChallenges,
        [challengeId]: true
      }
    };
    this._notify();
  }

  recordSnippetExecution(snippetId) {
    this._state = {
      ...this._state,
      executedSnippets: {
        ...this._state.executedSnippets,
        [snippetId]: true
      }
    };
    this._notify();
  }

  resetProgress() {
    this._state = {
      ...this._state,
      completedQuizzes: {},
      completedChallenges: {},
      executedSnippets: {}
    };
    this._notify();
  }

  // Métricas calculadas para cualquier RA (o el activo por defecto)
  getProgressMetrics(raId = this._state.activeRaId) {
    const raContent = getContentForRa(raId);
    const quizzes = raContent.quizzes || [];
    const challenges = raContent.challenges || [];
    const totalQuizzes = quizzes.length;
    const totalChallenges = challenges.length;
    const totalItems = totalQuizzes + totalChallenges;

    // Solo contabilizar los quizzes que pertenecen a este RA
    const raQuizIds = new Set(quizzes.map(q => q.id));
    const answeredCorrectQuizzes = Object.entries(this._state.completedQuizzes)
      .filter(([id, q]) => raQuizIds.has(id) && q && q.isCorrect).length;

    // Solo contabilizar los retos que pertenecen a este RA
    const raChallengeIds = new Set(challenges.map(c => c.id));
    const passedChallenges = Object.entries(this._state.completedChallenges)
      .filter(([id, passed]) => raChallengeIds.has(id) && Boolean(passed)).length;

    const completedCount = answeredCorrectQuizzes + passedChallenges;
    const percentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    return {
      answeredCorrectQuizzes,
      totalQuizzes,
      passedChallenges,
      totalChallenges,
      percentage: Math.min(100, Math.max(0, percentage))
    };
  }

  // Compatibilidad hacia atrás con RA2 (Chesterton's Fence)
  getRa2ProgressMetrics() {
    return this.getProgressMetrics('ra2');
  }
}

export const appStore = new Store();
