/**
 * REGISTRO CENTRALIZADO DE CONTENIDOS DIDÁCTICOS (CONTENT REGISTRY)
 * Desacopla la UI de un RA específico, permitiendo navegación modular entre RAs.
 * Principio de Responsabilidad Única (SoC) y Arquitectura Escalable.
 */

import { RA1_CONTENT } from './ra1-content.js';
import { RA2_CONTENT } from './ra2-content.js';
import { RA3_CONTENT } from './ra3-content.js';
import { RA6_CONTENT } from './ra6-content.js';

export const RA_CONTENT_REGISTRY = {
  ra1: RA1_CONTENT,
  ra2: RA2_CONTENT,
  ra3: RA3_CONTENT,
  ra6: RA6_CONTENT
};

/**
 * Obtiene el objeto de contenidos didácticos para un RA concreto
 * @param {string} raId - Identificador del RA (ej: 'ra2', 'ra3')
 * @returns {object} Contenido didáctico del RA o RA2 por defecto
 */
export function getContentForRa(raId) {
  if (raId && RA_CONTENT_REGISTRY[raId]) {
    return RA_CONTENT_REGISTRY[raId];
  }
  return RA2_CONTENT;
}

/**
 * Retorna la lista de identificadores de RAs con contenidos desarrollados
 * @returns {string[]}
 */
export function getAvailableRaIds() {
  return Object.keys(RA_CONTENT_REGISTRY);
}
