/**
 * CURRÍCULO OFICIAL - MÓDULO PROFESIONAL: DESARROLLO WEB EN ENTORNO CLIENTE
 * Código Oficial: 0612 | Ciclo Formativo de Grado Superior DAW
 * Fuente: BOE Núm. 143 (Real Decreto 686/2010) y BORM Núm. 73
 */

export const CURRICULUM_DATA = [
  {
    id: 'ra1',
    code: 'RA1',
    title: 'Arquitecturas y Tecnologías Cliente Web',
    shortTitle: 'Arquitecturas Web',
    description: 'Selecciona las arquitecturas y tecnologías de programación sobre clientes Web, identificando y analizando las capacidades y características de cada una.',
    status: 'available', // SECCIÓN DESARROLLADA COMPLETA (Módulo Teórico Conceptual)
    durationHours: 10,
    criteria: [
      'a) Caracterización y diferenciación de modelos de ejecución cliente / servidor.',
      'b) Capacidades y mecanismos de ejecución de los navegadores Web.',
      'c) Identificación y caracterización de principales lenguajes cliente.',
      'd) Particularidades de programación de scripts vs programación tradicional.',
      'e) Integración de lenguajes de marcas con lenguajes de cliente.',
      'f) Herramientas de desarrollo, depuración y auditoría web.'
    ],
    topicsSummary: [
      'Modelos de programación cliente/servidor',
      'Mecanismos de motores JS (V8, SpiderMonkey)',
      'Compatibilidad entre navegadores',
      'Herramientas DevTools y linters'
    ]
  },
  {
    id: 'ra2',
    code: 'RA2',
    title: 'Sintaxis del Lenguaje, Tipos, Decisiones y Bucles',
    shortTitle: 'Sintaxis y Control de Flujo',
    description: 'Escribe sentencias simples, aplicando la sintaxis del lenguaje y verificando su ejecución sobre navegadores Web.',
    status: 'available', // SECCIÓN DESARROLLADA COMPLETA
    durationHours: 14,
    criteria: [
      'a) Selección de un lenguaje cliente en función de posibilidades.',
      'b) Utilización de distintos tipos de variables y operadores.',
      'c) Identificación de ámbitos (scopes) de utilización de variables.',
      'd) Comprobación de peculiaridades en conversiones y coerción de tipos.',
      'e) Mecanismos de decisión en la creación de bloques de sentencias.',
      'f) Bucles e iteraciones verificando su funcionamiento.',
      'g) Adición de comentarios y documentación de código.',
      'h) Uso de herramientas y entornos para programación, prueba y depuración.'
    ],
    topicsSummary: [
      'Ubicación del código (<script>, defer, async) y "use strict"',
      'Variables (let, const, var), Scope (Bloque, Función, Global) y TDZ',
      'Tipos de datos primitivos vs referencia y literales',
      'Operadores aritméticos, lógicos (cortocircuito) y asignaciones',
      'Conversiones explícitas vs conversiones automáticas y valores truthy/falsy',
      'Decisiones (if-else, early return, operador ternario, switch)',
      'Bucles (for, while, do-while, break, continue)',
      'Buenas prácticas, JSDoc y depuración profesional'
    ]
  },
  {
    id: 'ra3',
    code: 'RA3',
    title: 'Objetos Predefinidos del Lenguaje y BOM',
    shortTitle: 'Objetos Nativos & BOM',
    description: 'Escribe código, identificando y aplicando las funcionalidades aportadas por los objetos predefinidos del lenguaje (BOM y nativos).',
    status: 'available',
    durationHours: 12,
    criteria: [
      'a) Identificación de los objetos predefinidos nativos del lenguaje.',
      'b) Objetos de ventanas (Window, Screen, Navigator, Location, History).',
      'c) Modificación del aspecto del navegador y control de ventanas.',
      'd) Generación de contenido textual y elementos desde código.',
      'e) Cuadros de diálogo y comunicación con el usuario.',
      'f) Gestión de ventanas y comunicación entre contextos.',
      'g) Uso y gestión de cookies para persistencia.',
      'h) Depuración y documentación.'
    ],
    topicsSummary: [
      'BOM (window, screen, location, history, navigator)',
      'Interacción modal (alert, confirm, prompt)',
      'Objetos nativos (Number, Math, String, Date, RegExp)',
      'Almacenamiento Web (localStorage, sessionStorage) y JSON'
    ]
  },
  {
    id: 'ra4',
    code: 'RA4',
    title: 'Estructuras de Datos, Funciones y POO',
    shortTitle: 'Arrays, Funciones y POO',
    description: 'Programa código para clientes Web analizando y utilizando estructuras definidas por el usuario.',
    status: 'roadmap',
    durationHours: 14,
    criteria: [
      'a) Clasificación y uso de funciones predefinidas.',
      'b) Definición e invocación de funciones de usuario (Arrow, Callbacks, Clousures).',
      'c) Características de creación y manipulación de Arrays.',
      'd) Métodos modernos de arrays (map, filter, reduce, find, some, every).',
      'e) Características de orientación a objetos en JavaScript.',
      'f) Definición de estructuras de objetos (literales y constructores).',
      'g) Métodos y propiedades de objetos (Getters, Setters, Clases ES6).',
      'h) Objetos definidos por el usuario y herencia con prototipos.',
      'i) Depuración y documentación.'
    ],
    topicsSummary: [
      'Funciones y Clousures',
      'Métodos funcionales de Arrays',
      'Objetos literales y Clases ES6',
      'Prototipos y desestructuración'
    ]
  },
  {
    id: 'ra5',
    code: 'RA5',
    title: 'Manejo de Eventos y Validación de Formularios',
    shortTitle: 'Eventos y Formularios',
    description: 'Desarrolla aplicaciones Web interactivas integrando mecanismos de manejo de eventos.',
    status: 'roadmap',
    durationHours: 10,
    criteria: [
      'a) Captura de eventos en el lenguaje de marcas.',
      'b) Gestión de eventos moderna con addEventListener.',
      'c) Fases del evento (Capturing, Bubbling, stopPropagation, preventDefault).',
      'd) Delegación de eventos para rendimiento.',
      'e) Acceso y control de formularios desde JavaScript.',
      'f) Validación síncrona de formularios.',
      'g) Expresiones regulares avanzadas en validación.',
      'h) Depuración y documentación.'
    ],
    topicsSummary: [
      'Modelo de propagación y delegación de eventos',
      'Manejadores modernos addEventListener',
      'Validación de campos y API Constraint Validation',
      'Expresiones Regulares (RegExp)'
    ]
  },
  {
    id: 'ra6',
    code: 'RA6',
    title: 'Modelo de Objetos del Documento (DOM)',
    shortTitle: 'Manipulación del DOM',
    description: 'Desarrolla aplicaciones web analizando y aplicando las características del modelo de objetos del documento.',
    status: 'available',
    durationHours: 10,
    criteria: [
      'a) Reconocimiento del modelo de objetos del documento de una página Web.',
      'b) Identificación de los objetos del modelo, sus propiedades y métodos.',
      'c) Creación y verificación de código que acceda a la estructura del documento.',
      'd) Creación de nuevos elementos de la estructura y modificación de elementos ya existentes.',
      'e) Asociación de acciones a los eventos del modelo.',
      'f) Identificación de diferencias que presenta el modelo en diferentes navegadores.',
      'g) Programación de aplicaciones Web compatibles con diferentes implementaciones del modelo.',
      'h) Independización de las tres facetas (contenido, aspecto y comportamiento) en aplicaciones Web.'
    ],
    topicsSummary: [
      'Árbol jerárquico DOM y tipos de nodos W3C',
      'Selectores modernos (querySelector) y navegación transversal',
      'Creación, inserción y eliminación dinámica de nodos',
      'Manipulación de atributos, classList y dataset (data-*)',
      'Estilos en línea vs estilos computados (getComputedStyle)',
      'Eventos, propagación (bubbling) y delegación de eventos',
      'Optimización con DocumentFragment y reducción de reflow',
      'Arquitectura de las 3 facetas y compatibilidad cross-browser'
    ]
  },
  {
    id: 'ra7',
    code: 'RA7',
    title: 'Comunicación Asíncrona: AJAX, Fetch y Promesas',
    shortTitle: 'Asincronía y APIs',
    description: 'Desarrolla aplicaciones Web dinámicas, reconociendo y aplicando mecanismos de comunicación asíncrona entre cliente y servidor.',
    status: 'roadmap',
    durationHours: 10,
    criteria: [
      'a) Ventajas e inconvenientes de la comunicación asíncrona.',
      'b) Mecanismos disponibles para comunicación cliente/servidor.',
      'c) El objeto XMLHttpRequest y la moderna API Fetch.',
      'd) Programación asíncrona con Promesas y sintaxis async/await.',
      'e) Actualización dinámica de vistas sin recargar la página.',
      'f) Manejo de formatos de intercambio de datos (JSON).',
      'g) Control de errores en red y estados de petición.'
    ],
    topicsSummary: [
      'Event Loop y asincronía en JavaScript',
      'Fetch API y consumo de servicios RESTful',
      'Promesas, async / await y try / catch',
      'Serialización y parseo de JSON'
    ]
  }
];
