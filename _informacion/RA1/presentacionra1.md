# Presentación: Resultado de Aprendizaje 1 (RA1)
## Arquitecturas y Tecnologías de Programación sobre Clientes Web

> **Módulo:** Desarrollo Web en Entorno Cliente (Código Oficial: 0612)  
> **Ciclo:** Grado Superior en Desarrollo de Aplicaciones Web (DAW)  
> **Criterios Evaluados:** a), b), c), d), e), f)  
> **Estructura:** Resumen didáctico dividido en 10 partes, diseñado para maquetación directa de diapositivas (slides), guion de exposición y preparación de exámenes oficiales.

---

## Índice de la Presentación

1. [Parte 1: Modelo Cliente/Servidor y Distribución del Procesamiento](#parte-1-modelo-clienteservidor-y-distribución-del-procesamiento)
2. [Parte 2: Evolución de las Arquitecturas Web: De MPA a SPA e Híbridas](#parte-2-evolución-de-las-arquitecturas-web-de-mpa-a-spa-e-híbridas)
3. [Parte 3: Anatomía y Capas Internas de los Navegadores Web](#parte-3-anatomía-y-capas-internas-de-los-navegadores-web)
4. [Parte 4: Motores JavaScript y Compilación Just-In-Time (JIT)](#parte-4-motores-javascript-y-compilación-just-in-time-jit)
5. [Parte 5: Concurrencia Monohilo, Call Stack y Event Loop](#parte-5-concurrencia-monohilo-call-stack-y-event-loop)
6. [Parte 6: El Pipeline de Renderizado Crítico (Critical Rendering Path)](#parte-6-el-pipeline-de-renderizado-crítico-critical-rendering-path)
7. [Parte 7: Ecosistema de Lenguajes en el Cliente: JS, TypeScript y WebAssembly](#parte-7-ecosistema-de-lenguajes-en-el-cliente-js-typescript-y-webassembly)
8. [Parte 8: Scripts vs Programación Tradicional y el Sandbox de Seguridad](#parte-8-scripts-vs-programación-tradicional-y-el-sandbox-de-seguridad)
9. [Parte 9: Seguridad en la Red Web: Same-Origin Policy (SOP) y CORS](#parte-9-seguridad-en-la-red-web-same-origin-policy-sop-y-cors)
10. [Parte 10: Integración HTML5, Módulos ES6, DevTools y Auditoría Lighthouse](#parte-10-integración-html5-módulos-es6-devtools-y-auditoría-lighthouse)

---

## Parte 1: Modelo Cliente/Servidor y Distribución del Procesamiento

* **Criterio de Evaluación:** a) Caracterización y diferenciación de modelos de ejecución cliente / servidor.
* **Objetivo de la diapositiva:** Comprender la comunicación HTTP/HTTPS y el reparto de responsabilidades entre navegador y backend.

### Puntos Clave para la Diapositiva
* **Flujo de Comunicación:** Protocolo HTTP/HTTPS sobre TCP/IP mediante ciclos de Petición (*Request*) y Respuesta (*Response*).
* **Rol del Servidor (Backend):**
  * Acceso directo a base de datos, custodia de secretos comerciales y orquestación de transacciones.
  * **Validación definitiva:** Es el único entorno que garantiza seguridad e integridad de datos.
  * *Inconveniente:* Cada interacción añade latencia de ida y vuelta de red (RTT - *Round-Trip Time*).
* **Rol del Cliente (Frontend - Navegador):**
  * Renderizado de la UI, interactividad en tiempo real y transformaciones visuales.
  * **Descentralización del cómputo:** Aprovecha la CPU y memoria RAM del dispositivo del usuario.
  * **Validación preliminar:** Mejora la experiencia de usuario (UX) ofreciendo feedback instantáneo sin tráfico de red.
  * *Regla de oro:* El entorno cliente es **no confiable** (código expuesto e inspeccionable).

### Esquema Visual
```text
[ NAVEGADOR CLIENTE ]                             [ SERVIDOR BACKEND ]
  1. Solicita URL           ─── HTTP GET ───►      Enruta y procesa
  2. Recibe activos estáticos ◄── HTML/CSS/JS ──── Retorna documentos
  3. Ejecuta JS local        (Cómputo en RAM/CPU)   Libera carga en host
  4. Pide datos puros       ─── Fetch / JSON ───►  Consulta Base de Datos
  5. Actualiza DOM           ◄─── Datos JSON ─────  Sin recargar la página
```

### Nota del Presentador / Examen FP
> **Pregunta típica:** *¿Por qué validar en el cliente si es obligatorio validar en el backend?*  
> **Respuesta:** La validación en cliente responde de forma inmediata al usuario y ahorra peticiones innecesarias al servidor, pero **nunca** garantiza seguridad; cualquier usuario malintencionado puede omitir JavaScript mediante cURL o Postman.

---

## Parte 2: Evolución de las Arquitecturas Web: De MPA a SPA e Híbridas

* **Criterio de Evaluación:** a) Caracterización y diferenciación de modelos de ejecución cliente / servidor.
* **Objetivo de la diapositiva:** Comparar los modelos arquitectónicos históricos y modernos, justificando la adopción de SPAs y SSR híbrido.

### Puntos Clave para la Diapositiva
* **1. Web Tradicional / MPA (Multi-Page Applications - SSR Clásico):**
  * Tecnologías: PHP, JSP, ASP.NET tradicional.
  * El servidor genera un documento HTML nuevo completo ante cada clic o formulario.
  * *Problema:* Parpadeos en blanco (*white flash*), consumo redundante de ancho de banda y pérdida del estado en pantalla.
* **2. SPAs (Single-Page Applications):**
  * Tecnologías: React, Angular, Vue, Svelte.
  * El servidor entrega un único archivo `index.html` base ("cascarón") y el bundle de JavaScript.
  * La navegación no recarga la página: se intercepta mediante la **History API** (`pushState`) y se actualiza el DOM asíncronamente con datos JSON.
  * *Ventajas:* Fluidez idéntica a una aplicación de escritorio.
  * *Desafíos:* Mayor tiempo inicial de descarga y retos de indexación SEO.
* **3. Arquitecturas Híbridas Modernas (SSR con Hidratación, SSG e ISR):**
  * Tecnologías: Next.js, Remix, Astro, Nuxt.
  * El primer impacto se genera en HTML estático o pre-renderizado en servidor (velocidad de carga y SEO óptimo).
  * **Hidratación:** En el navegador, JavaScript se enlaza a ese HTML para dotarlo de reactividad y eventos.

### Tabla Comparativa Rápida
| Característica | MPA Clásica | SPA (Single-Page) | SSR Híbrido Moderno |
| :--- | :--- | :--- | :--- |
| **Generación inicial** | Servidor (HTML completo) | Cliente (HTML cascarón) | Servidor (HTML completo) |
| **Navegación** | Recarga completa del navegador | Interceptada por JS (Sin recarga) | Interceptada por JS tras hidratar |
| **Tráfico en transiciones**| Descarga de HTML + recursos | Peticiones JSON mínimas | JSON / Server Components |
| **Indexación SEO** | Excelente de forma nativa | Requiere renderizado dinámico | Excelente y optimizada |

---

## Parte 3: Anatomía y Capas Internas de los Navegadores Web

* **Criterio de Evaluación:** b) Capacidades y mecanismos de ejecución de los navegadores Web.
* **Objetivo de la diapositiva:** Desglosar los componentes internos de un navegador y diferenciar motores de renderizado vs motores JavaScript.

### Puntos Clave para la Diapositiva
* **El navegador como sistema operativo cliente:** No es un simple visualizador de páginas, sino una plataforma completa de ejecución de software.
* **Capas Arquitectónicas:**
  1. **User Interface (UI):** Barra de direcciones, pestañas, marcadores, controles de navegación.
  2. **Browser Engine:** Orquesta las acciones entre la UI y los motores de renderizado.
  3. **Rendering Engine (Motor de Renderizado/Maquetación):** Procesa HTML y CSS para calcular geometría y dibujar en pantalla.
  4. **JavaScript Engine (Motor JS):** Interpreta y compila código ECMAScript a instrucciones de CPU.
  5. **Networking (Subsistema de Red):** Gestión de sockets TCP, DNS, HTTP/HTTPS y TLS.
  6. **Data Storage:** Persistencia local (Cookies, `localStorage`, `sessionStorage`, `IndexedDB`).

### Los Grandes Motores del Mercado
* **Motores de Renderizado (HTML/CSS):**
  * **Blink:** Google Chrome, Microsoft Edge, Opera, Brave, Vivaldi (Bifurcación de WebKit).
  * **Gecko:** Mozilla Firefox.
  * **WebKit:** Apple Safari (y todos los navegadores bajo iOS por política de App Store).
* **Motores de JavaScript (ECMAScript):**
  * **V8 (Google):** Chrome, Edge, Node.js, Deno (escrito en C++).
  * **SpiderMonkey (Mozilla):** Firefox (primer motor histórico, creado por Brendan Eich; C++ y Rust).
  * **JavaScriptCore / Nitro (Apple):** Safari, Bun (escrito en C++).

### Nota del Presentador
> **Aclaración crítica:** No confundir *Blink* (motor de renderizado que calcula cajas y pinta píxeles) con *V8* (motor JavaScript que compila y ejecuta código). Ambos cooperan dentro de Chrome/Edge.

---

## Parte 4: Motores JavaScript y Compilación Just-In-Time (JIT)

* **Criterio de Evaluación:** b) Capacidades y mecanismos de ejecución de los navegadores Web.
* **Objetivo de la diapositiva:** Explicar cómo el motor V8 transforma código fuente en texto plano a instrucciones binarias de máquina ultra-rápidas.

### Puntos Clave para la Diapositiva
* **Evolución del modelo:** Antiguamente JS era interpretado línea a línea (lento). Los motores modernos usan compilación **JIT (Just-In-Time)** combinando interpretación rápida con compilación optimizada en memoria.
* **Pipeline del Motor V8 paso a paso:**
  1. **Scanner / Lexer & Parser:** Descompone el código en tokens sintácticos y crea el **AST (Abstract Syntax Tree)**.
  2. **Ignition (El Intérprete):** Genera rápidamente una representación compacta llamada **Bytecode**. El programa comienza a ejecutarse de inmediato.
  3. **Profiler (Monitor de Ejecución):** Vigila qué funciones se llaman repetidamente (*Hot Functions*) y registra los tipos de datos que reciben.
  4. **TurboFan (El Compilador Optimizador):** Toma el bytecode y los datos del Profiler para generar **código máquina nativo** optimizado para la CPU.
  5. **Deoptimización (Bailout):** Si una función optimizada para enteros recibe repentinamente un string, TurboFan desecha el código máquina y regresa al bytecode de Ignition.

### Esquema del Pipeline V8
```text
[ Código JS ] ──► [ Parser ] ──► [ AST ] ──► [ Ignition (Intérprete) ] ──► [ Bytecode ]
                                                        │                         ▲
                                                        ▼                         │
                                                [ Profiler (Hot?) ]               │ Deoptimización
                                                        │                         │ (Bailout)
                                                        ▼                         │
                                            [ TurboFan (Compilador JIT) ] ────────┘
                                                        │
                                                        ▼
                                            [ Código Máquina Nativo ]
```

### Regla Práctica para Desarrolladores
* Mantener funciones **monomórficas** (que reciban siempre objetos con la misma estructura y tipos). Alterar propiedades aleatoriamente rompe las clases ocultas (*Hidden Classes / Shapes*) de V8 y fuerza penalizaciones de rendimiento por deoptimización.

---

## Parte 5: Concurrencia Monohilo, Call Stack y Event Loop

* **Criterio de Evaluación:** b) Capacidades y mecanismos de ejecución de los navegadores Web.
* **Objetivo de la diapositiva:** Dominar el modelo asíncrono de JavaScript: por qué un lenguaje de un solo hilo no bloquea la interfaz de usuario.

### Puntos Clave para la Diapositiva
* **La paradoja:** JavaScript es **monohilo (Single-Threaded)**, pero el **navegador es multihilo**.
* **Componentes del Runtime:**
  * **Call Stack (Pila de Llamadas):** Estructura LIFO (*Last In, First Out*). Solo ejecuta una función a la vez. Si una tarea síncrona tarda mucho, la página se congela.
  * **Memory Heap:** Espacio donde residen objetos y variables en memoria RAM.
  * **Web APIs:** Hilos de fondo proporcionados por el navegador (`fetch`, `setTimeout`, eventos DOM).
  * **Microtask Queue (Máxima prioridad):** Callbacks de Promesas (`.then`, `.catch`), `queueMicrotask`, `MutationObserver`.
  * **Task Queue / Callback Queue (Macrotareas):** `setTimeout`, `setInterval`, eventos de ratón/teclado, I/O.

### El Algoritmo del Event Loop (Bucle de Eventos)
1. Espera a que el **Call Stack** esté completamente vacío.
2. Procesa y vacía **todas las microtareas** pendientes en la *Microtask Queue*.
3. Si procede, refresca la pantalla en el ciclo de renderizado gráfico (60 FPS).
4. Extrae y ejecuta **una sola macrotarea** de la *Task Queue*.
5. Repite el ciclo infinitamente.

### Ejemplo de Examen: Orden de Salida
```javascript
console.log(1);                                  // 1º Síncrono (Call Stack)
setTimeout(() => console.log(2), 0);             // 4º Macrotarea (Task Queue)
Promise.resolve().then(() => console.log(3));    // 3º Microtarea (Microtask Queue)
console.log(4);                                  // 2º Síncrono (Call Stack)

// Salida exacta por consola: 1 -> 4 -> 3 -> 2
```

---

## Parte 6: El Pipeline de Renderizado Crítico (Critical Rendering Path)

* **Criterio de Evaluación:** b) Capacidades y mecanismos de ejecución de los navegadores Web.
* **Objetivo de la diapositiva:** Conocer las fases en que el navegador traduce HTML/CSS a píxeles y cómo evitar el cuello de botella del *Layout Thrashing*.

### Puntos Clave para la Diapositiva
* **Las 6 Fases del Critical Rendering Path:**
  1. **DOM (Document Object Model):** Árbol de nodos generado a partir del marcado HTML.
  2. **CSSOM (CSS Object Model):** Árbol de reglas y estilos calculados a partir de las hojas de estilo.
  3. **Render Tree:** Combinación del DOM y CSSOM. Solo incluye nodos visualmente visibles (ignora `<head>` y elementos con `display: none`).
  4. **Layout / Reflow:** Cálculo geométrico exacto de dimensiones (ancho, alto) y coordenadas espaciales $(x, y)$ de cada caja en la pantalla.
  5. **Paint (Repintado):** Rasterizado de colores, texto, sombras y bordes en capas de mapa de bits.
  6. **Composite (Composición):** La GPU unifica las distintas capas y las proyecta en la pantalla del usuario.

### Optimización y Malas Prácticas
* **Layout Thrashing (Reflujo forzado sincrónico):**
  * Ocurre cuando en un bucle JavaScript se alternan escrituras de estilos con lecturas de propiedades geométricas (como `element.offsetHeight` o `clientWidth`).
  * El navegador se ve obligado a pausar la ejecución y recalcular el Layout de forma forzada repetidas veces, provocando tirones y caídas de frames.
  * *Solución:* Leer todas las medidas geométricas primero y realizar las mutaciones del DOM en un bloque agrupado después.

---

## Parte 7: Ecosistema de Lenguajes en el Cliente: JS, TypeScript y WebAssembly

* **Criterio de Evaluación:** c) Identificación y caracterización de principales lenguajes cliente.
* **Objetivo de la diapositiva:** Caracterizar los tres lenguajes fundamentales del frontend moderno, su estandarización y casos de uso.

### Puntos Clave para la Diapositiva
* **1. JavaScript (ECMAScript / ECMA-262):**
  * Regulado por el comité **TC39** mediante un proceso de 5 etapas (*Stages 0 a 4*).
  * Hitos clave: **ES6/ES2015** (`let/const`, `class`, arrow functions, Promesas, módulos), y evolución anual con `async/await`, encadenamiento opcional (`?.`), coalescencia nula (`??`).
* **2. TypeScript (El estándar empresarial):**
  * **Superset tipado:** Todo JS válido es TS válido. Añade tipos estáticos, interfaces, genéricos y enums.
  * **Comprobación en tiempo de compilación:** Detecta bugs antes de ejecutar el software.
  * **Transpilación (*Type Erasure*):** El navegador **no** ejecuta TypeScript. Se compila con `tsc`, Babel o Vite para generar JavaScript limpio sin tipos.
* **3. WebAssembly / Wasm (Aceleración binaria de bajo nivel):**
  * 4º estándar oficial de la W3C para la web. Formato binario compilado desde C++, Rust, Go o C#.
  * Velocidad cuasi-nativa con consumo predecible de memoria.
  * **No sustituye a JavaScript:** Se complementan. JS gestiona la UI y el DOM; Wasm gestiona cómputo pesado (videojuegos, edición gráfica en Figma/Photoshop Web, codecs de vídeo y criptografía).

### Cuadro de Roles
```text
┌─────────────────────────────────────────────────────────────┐
│                       NAVEGADOR WEB                         │
├──────────────────────────────┬──────────────────────────────┤
│      JAVASCRIPT / TS         │       WEBASSEMBLY (WASM)     │
│  • Interactividad de la UI   │  • Algoritmos matemáticos    │
│  • Manipulación del DOM      │  • Motores 3D y videojuegos  │
│  • Llamadas fetch y eventos  │  • Edición vectorial/vídeo   │
└──────────────────────────────┴──────────────────────────────┘
```

---

## Parte 8: Scripts vs Programación Tradicional y el Sandbox de Seguridad

* **Criterio de Evaluación:** d) Particularidades de programación de scripts vs programación tradicional.
* **Objetivo de la diapositiva:** Contrastar los paradigmas de lenguajes compilados de escritorio frente a scripts web y comprender el modelo de aislamiento del navegador.

### Puntos Clave para la Diapositiva
* **Diferencias Principales:**
  * **Compilación:** Tradicionales compilan previamente AOT (*Ahead Of Time*); los scripts web compilan y se ejecutan al vuelo (JIT).
  * **Memoria:** Tradicionales permiten gestión manual de memoria y punteros (`malloc/free`); los scripts usan gestión automática con *Garbage Collector*.
  * **Tipado:** Tradicionales suelen ser estáticos y estrictos; JavaScript clásico es dinámico y con coerción débil.
* **El Modelo Sandbox (Caja de Arena):**
  * Al visitar una web, ejecutamos código no confiable descargado de internet. El navegador confina ese código en una "jaula" segura:
  * **Prohibido el acceso al Sistema de Archivos:** Un script no puede leer archivos locales de disco (salvo selección voluntaria del usuario mediante `<input type="file">` o *File System Access API* con permiso explícito).
  * **Aislamiento de procesos (*Site Isolation*):** Cada origen o pestaña se ejecuta en un proceso independiente del sistema operativo para mitigar vulnerabilidades como *Spectre*.
  * **Permisos controlados:** Cámara, micrófono y geolocalización requieren consentimiento mediante la *Permissions API*.

---

## Parte 9: Seguridad en la Red Web: Same-Origin Policy (SOP) y CORS

* **Criterio de Evaluación:** d) Particularidades de programación de scripts vs programación tradicional.
* **Objetivo de la diapositiva:** Comprender la política del mismo origen (SOP) y el protocolo de intercambio de recursos de origen cruzado (CORS).

### Puntos Clave para la Diapositiva
* **Same-Origin Policy (SOP):**
  * Regla fundamental de seguridad: un documento o script de un origen solo puede acceder a recursos de otro si comparten exactamente el mismo **Protocolo**, **Host (dominio)** y **Puerto**.
* **Comprobación de Origen:**
  * Base: `https://www.ies.es:443`
  * `https://www.ies.es:443/contacto.html` ──► **Mismo Origen** (Permitido).
  * `http://www.ies.es:443` ──► **Distinto Origen** (Protocolo http vs https).
  * `https://aula.ies.es:443` ──► **Distinto Origen** (Subdominio diferente).
  * `https://www.ies.es:8080` ──► **Distinto Origen** (Puerto distinto).
* **CORS (Cross-Origin Resource Sharing):**
  * Mecanismo para permitir excepciones legítimas entre dominios.
  * El servidor debe responder con cabeceras explícitas como:  
    `Access-Control-Allow-Origin: https://miapp.com`
* **Petición Preflight (OPTIONS):**
  * Antes de peticiones que alteran datos (PUT, DELETE o cabeceras personalizadas), el navegador envía de forma transparente una petición preliminar con el método **OPTIONS** consultando si la operación está autorizada.

---

## Parte 10: Integración HTML5, Módulos ES6, DevTools y Auditoría Lighthouse

* **Criterio de Evaluación:** e) Integración con lenguajes de marcas y f) Herramientas de desarrollo, depuración y auditoría.
* **Objetivo de la diapositiva:** Conocer las formas óptimas de vincular código a HTML5, la modularidad nativa, el uso de DevTools y la medición de Core Web Vitals.

### Puntos Clave para la Diapositiva
* **Carga de Scripts en HTML5:**
  * `<script src="a.js">` (Síncrono): **Bloquea el parseo del HTML**. Detiene el renderizado hasta descargar y ejecutar.
  * `<script src="b.js" async>`: Descarga en paralelo, pero **se ejecuta en cuanto llega**, deteniendo el parser y sin garantizar orden cronológico. (Uso: analíticas independientes).
  * `<script src="c.js" defer>`: Descarga en paralelo, **garantiza el orden de los scripts** y se ejecuta al finalizar el parseo del HTML. *(Mejor práctica general)*.
* **Módulos ES6 Nativos (`type="module"`):**
  * Tienen comportamiento `defer` automático, aislamiento de ámbito (*Module Scope*, no contaminan `window`) y ejecutan siempre en `"use strict"`.
* **Herramientas de Desarrollador (DevTools - F12):**
  * **Elements:** Inspección en vivo del árbol DOM y modelos de caja CSS.
  * **Console:** REPL, inspección con `console.table()`, `console.time()`.
  * **Sources:** Depuración con *Breakpoints* condicionales, *Call Stack* y sentencia `debugger;`.
  * **Network:** Análisis de peticiones HTTP, cascada (*waterfall*) y simulación de redes lentas (*throttling*).
  * **Performance & Memory:** Diagnóstico de caídas de frames y fugas de memoria.
* **Auditoría Google Lighthouse y Core Web Vitals:**
  * **LCP (Largest Contentful Paint):** Velocidad de carga del elemento principal visual (< 2.5 s).
  * **INP (Interaction to Next Paint):** Respuesta interactiva a eventos de usuario (< 200 ms).
  * **CLS (Cumulative Layout Shift):** Estabilidad visual de los elementos en pantalla (< 0.1).

---

## Resumen Ejecutivo de Competencias del RA1

| Parte | Tema Principal | Concepto Clave de Evaluación |
| :---: | :--- | :--- |
| **1** | Modelo Cliente/Servidor | Validación UX en cliente vs seguridad e integridad en servidor. |
| **2** | Evolución Arquitectónica | SPAs con navegación por History API e hidratación en SSR moderno. |
| **3** | Anatomía de Navegadores | Motores de renderizado (Blink, Gecko, WebKit) vs Motores JS. |
| **4** | Motor V8 y JIT | Ignition (bytecode), Profiler y TurboFan (código máquina optimizado). |
| **5** | Event Loop y Concurrencia | Call Stack monohilo, Microtask Queue (Promesas) > Macrotareas. |
| **6** | Critical Rendering Path | Pipeline (DOM + CSSOM ➔ Render Tree ➔ Layout ➔ Paint ➔ Composite). |
| **7** | Ecosistema de Lenguajes | Tipado estático con TS (transpilación) y aceleración binaria con Wasm. |
| **8** | Paradigma de Scripts | Ejecución JIT, recolector de basura y confinamiento en Sandbox. |
| **9** | Políticas SOP y CORS | Tupla (Protocolo + Host + Puerto) y comprobación previa con OPTIONS. |
| **10** | HTML5, DevTools y Lighthouse| Atributos defer vs async, módulos ES6 y Core Web Vitals (LCP, INP, CLS). |
