/**
 * CONTENIDO DIDÁCTICO INTEGRAL: RESULTADO DE APRENDIZAJE 1 (RA1)
 * Módulo: Desarrollo Web en Entorno Cliente (0612) - FP DAW (Ciclo Superior)
 * Criterios de evaluación oficiales a) hasta f) según BOE (RD 686/2010) y BORM
 */

export const RA1_CONTENT = {
  id: 'ra1',
  title: 'Arquitecturas y Tecnologías de Programación sobre Clientes Web',
  duration: '10 Horas lectivas',
  officialCode: 'RA1 - Criterios a-f',

  // =========================================================================
  // LISTA DE SUBTEMAS TEÓRICOS (APARTADOS 1 AL 7)
  // =========================================================================
  topics: [
    {
      id: 'modelos-cliente-servidor',
      title: '1. Modelos de Ejecución Cliente/Servidor y Arquitecturas Web',
      criteriaRef: 'Criterio a)',
      description: 'Fundamentos de la arquitectura cliente/servidor, distribución del procesamiento, latencia, consumo de recursos y evolución desde el renderizado clásico en servidor (SSR) hasta las SPAs e hidratación moderna.',
      theoryHtml: `
        <p>Toda aplicación web actual descansa sobre el <strong>modelo de arquitectura cliente/servidor</strong>. En este paradigma, dos entidades con roles bien diferenciados se comunican mediante peticiones (<em>Requests</em>) y respuestas (<em>Responses</em>) a través de los protocolos de la capa de aplicación <strong>HTTP / HTTPS</strong> sobre una pila TCP/IP.</p>

        <div class="code-runner-widget" style="margin: 16px 0; background: var(--bg-surface-2); border: var(--border-subtle); padding: 16px; border-radius: var(--radius-lg);">
          <div style="font-family: var(--font-code); font-size: 0.85rem; line-height: 1.6; color: var(--text-primary);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: 10px;">
              <span style="font-weight: 700; color: var(--color-brand);">[ CLIENTE: Navegador Web ]</span>
              <span style="color: var(--color-cyan); font-size: 0.75rem;">Internet (HTTP/2, HTTP/3)</span>
              <span style="font-weight: 700; color: var(--color-brand);">[ SERVIDOR: Node, Nginx, API ]</span>
            </div>
            <div>1. Usuario solicita URL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;─── (HTTP GET Request) ───► &nbsp;Resuelve DNS, enruta y procesa</div>
            <div>2. Recibe HTML, CSS, JS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◄─── (HTTP Response 200) ─── &nbsp;Envía activos estáticos</div>
            <div>3. Ejecuta JS local (V8 Engine) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Libera carga de CPU en el host</div>
            <div>4. Pide datos puros asíncronos &nbsp;&nbsp;&nbsp;─── (Fetch API / JSON) ───► &nbsp;Consulta Base de Datos (SQL/NoSQL)</div>
            <div>5. Actualiza el DOM sin recargar &nbsp;&nbsp;&nbsp;◄── (Respuesta JSON) ────── &nbsp;Retorna únicamente los datos</div>
          </div>
        </div>

        <h4>A. Distribución del Procesamiento: Cliente vs Servidor</h4>
        <p>Una decisión técnica crucial para el desarrollador web es determinar <em>dónde</em> debe ejecutarse cada fase del procesamiento de la aplicación:</p>
        <ul>
          <li><strong>Procesamiento en Servidor (Backend)</strong>:
            <ul>
              <li><em>Responsabilidades</em>: Autenticación de credenciales, autorización, acceso directo a bases de datos, almacenamiento de secretos comerciales, orquestación de pagos y validación definitiva de integridad y seguridad de datos.</li>
              <li><em>Ventajas</em>: Entorno 100% controlado (hardware, SO y versión del runtime conocidos), seguridad garantizada de la lógica de negocio privada y óptima indexación inicial en motores de búsqueda (SEO).</li>
              <li><em>Inconvenientes</em>: Cada interacción puede requerir un viaje de ida y vuelta por la red (Round-Trip Time - RTT), elevando el consumo de CPU y memoria del servidor cuando concurren miles de usuarios simultáneos.</li>
            </ul>
          </li>
          <li><strong>Procesamiento en Cliente (Frontend - Navegador)</strong>:
            <ul>
              <li><em>Responsabilidades</em>: Renderizado visual, interactividad en tiempo real, validación inmediata de formularios para mejorar la experiencia de usuario (UX), transformaciones de presentación y gestión del estado en pantalla.</li>
              <li><em>Ventajas</em>: Aprovecha la CPU y memoria RAM del dispositivo del usuario (descentralización de la carga computacional), respuestas instantáneas a eventos de ratón/teclado y reducción radical del consumo de ancho de banda al transferir solo datos crudos (JSON) en vez de documentos HTML completos.</li>
              <li><em>Inconvenientes</em>: Entorno heterogéneo y no confiable (el usuario o un atacante puede modificar el código, alterar variables o inspeccionar las peticiones), diversidad de navegadores y dispositivos, y necesidad de descargar código antes de la primera interacción.</li>
            </ul>
          </li>
        </ul>

        <h4>B. Evolución de las Arquitecturas de Aplicaciones Web</h4>
        <p>A lo largo de la historia de la web profesional se han consolidado diferentes patrones arquitectónicos:</p>
        <ol>
          <li><strong>Web 1.0 y SSR Clásico (Server-Side Rendering con Multi-Page Applications - MPA)</strong>:
            <p>Modelos clásicos basados en PHP, JSP o ASP.NET. Ante cada clic o envío de formulario, el servidor genera un documento HTML completo desde cero. El navegador destruye la página en pantalla y descarga la nueva. <em>Problema:</em> Pantallazos en blanco, sobrecarga de red y pérdida del estado de la interfaz.</p>
          </li>
          <li><strong>SPAs (Single-Page Applications)</strong>:
            <p>Popularizadas con la llegada de AJAX y frameworks como React, Angular o Vue. El servidor entrega un único documento HTML base mínimo ("cascarón") y un bundle de JavaScript. A partir de ese momento, la navegación es interceptada por el cliente: JavaScript manipula dinámicamente el DOM e intercambia datos asíncronos en formato JSON. <em>Ventaja:</em> Fluidez similar a una app de escritorio. <em>Desafío:</em> Carga inicial más pesada y retos de indexación SEO.</p>
          </li>
          <li><strong>Arquitecturas Híbridas Modernas (SSR con Hidratación, SSG e ISR)</strong>:
            <p>Ecosistemas contemporáneos (Next.js, Remix, Astro, Nuxt). El servidor pre-renderiza el primer impacto en HTML para máxima velocidad y SEO perfecto (Core Web Vitals), y a continuación el navegador "hidrata" el marcado adjuntando los manejadores de eventos JavaScript para activar la reactividad completa del cliente.</p>
          </li>
        </ol>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica de Examen FP (DAW)',
        text: 'En una arquitectura Single Page Application (SPA), ¿por qué es obligatoria la validación de un formulario tanto en el cliente con JavaScript como en el servidor con el lenguaje de backend? <strong>Respuesta docente:</strong> La validación en el cliente mejora la usabilidad proporcionando feedback instantáneo al usuario sin latencia de red, pero <em>nunca garantiza seguridad</em>, ya que un atacante puede saltarse el código del navegador modificando la petición con herramientas como cURL o Postman. La validación en el servidor es la única que protege la integridad de la base de datos.'
      },
      examples: [
        {
          id: 'ex-latencia-red',
          title: 'Simulación de Rendimiento: Cómputo Local en Cliente vs Latencia de Red',
          description: 'Ejecuta esta demostración que compara el tiempo de procesar y filtrar 10.000 registros directamente en la CPU del cliente frente a simular la latencia inherente de una petición HTTP al servidor.',
          initialCode: `// 1. Simulación de cálculo en el cliente (JavaScript en navegador):
const t0Cliente = performance.now();

// Generamos 10.000 registros en la memoria RAM del navegador
const dataset = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  alumno: "Estudiante DAW " + (i + 1),
  nota: Math.round((Math.random() * 10) * 100) / 100
}));

// Filtramos alumnos aprobados localmente:
const aprobados = dataset.filter(a => a.nota >= 5.0);
const t1Cliente = performance.now();
const tiempoClienteMs = (t1Cliente - t0Cliente).toFixed(2);

console.log("=== PROCESAMIENTO EN CLIENTE ===");
console.log("Total registros filtrados:", aprobados.length);
console.log("Tiempo de cómputo local:", tiempoClienteMs + " ms");

// 2. Comparación contra la latencia física de red mínima (RTT estimado a servidor):
const latenciaRedTipicaMs = 120; // 120 ms de ida y vuelta típica en 4G/WiFi
const factorAceleracion = (latenciaRedTipicaMs / parseFloat(tiempoClienteMs)).toFixed(1);

console.log("\\n=== COMPARATIVA CON LATENCIA DE RED ===");
console.log("Latencia estimada petición HTTP ida/vuelta:", latenciaRedTipicaMs + " ms");
console.log("¡El cliente procesó los datos " + factorAceleracion + " veces más rápido que esperar a la red!");
console.log("Por esto las interfaces SPA procesan interacciones en el navegador.");`
        }
      ]
    },

    {
      id: 'motores-y-anatomia-navegador',
      title: '2. Anatomía de los Navegadores y Motores de Ejecución',
      criteriaRef: 'Criterio b)',
      description: 'Estructura interna de un navegador web, motores de renderizado vs motores JavaScript, y el pipeline interno de compilación Just-In-Time (JIT) en el motor V8.',
      theoryHtml: `
        <p>Un navegador web no es simplemente un visor de páginas, sino un sofisticado sistema operativo de aplicaciones cliente. Para comprender su funcionamiento, es fundamental distinguir sus capas arquitectónicas:</p>

        <h4>A. Arquitectura por Capas del Navegador</h4>
        <ul>
          <li><strong>Interfaz de Usuario (User Interface)</strong>: Barra de direcciones, botones atrás/adelante, marcadores y pestañas.</li>
          <li><strong>Motor del Navegador (Browser Engine)</strong>: Coordina las acciones entre la interfaz de usuario y el motor de renderizado.</li>
          <li><strong>Motor de Renderizado (Rendering / Layout Engine)</strong>: Responsable de analizar el código HTML y CSS para dibujar los píxeles en la pantalla.
            <ul>
              <li><strong>Blink</strong>: Desarrollado por Google (usado en Google Chrome, Microsoft Edge, Opera, Brave y Vivaldi). Bifurcación de WebKit.</li>
              <li><strong>Gecko</strong>: Desarrollado por Mozilla (utilizado en Firefox).</li>
              <li><strong>WebKit</strong>: Desarrollado por Apple (usado en Safari y en todos los navegadores bajo iOS debido a normativas de la App Store).</li>
            </ul>
          </li>
          <li><strong>Motor de JavaScript (JavaScript Engine)</strong>: Interpreta y compila el código ECMAScript a instrucciones binarias de la CPU.</li>
          <li><strong>Subsistema de Red (Networking)</strong>: Gestiona llamadas HTTP/HTTPS, WebSockets, DNS y resolución de certificados TLS/SSL.</li>
          <li><strong>Almacenamiento Local (Data Persistence)</strong>: Almacena cookies, <code>localStorage</code>, <code>sessionStorage</code>, <code>IndexedDB</code> y la caché HTTP.</li>
        </ul>

        <h4>B. Los Motores JavaScript Modernos</h4>
        <p>Los principales motores del mercado actual son:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: var(--bg-surface-3); border-bottom: 2px solid var(--border-subtle); text-align: left;">
              <th style="padding: 10px;">Motor JS</th>
              <th style="padding: 10px;">Creador / Mantenimiento</th>
              <th style="padding: 10px;">Navegador / Entornos Clave</th>
              <th style="padding: 10px;">Tecnología Central</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 10px;"><strong>V8</strong></td>
              <td style="padding: 10px;">Google (C++)</td>
              <td style="padding: 10px;">Chrome, Edge, Node.js, Deno</td>
              <td style="padding: 10px;">Ignition (Intérprete) + TurboFan (JIT Compilador)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 10px;"><strong>SpiderMonkey</strong></td>
              <td style="padding: 10px;">Mozilla (C++ y Rust)</td>
              <td style="padding: 10px;">Firefox</td>
              <td style="padding: 10px;">Primer motor de la historia (Brendan Eich), Warp/IonMonkey</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>JavaScriptCore (Nitro)</strong></td>
              <td style="padding: 10px;">Apple (C++)</td>
              <td style="padding: 10px;">Safari, Bun runtime</td>
              <td style="padding: 10px;">LLInt (Low-Level Interpreter) + DFG + FTL</td>
            </tr>
          </tbody>
        </table>

        <h4>C. El Pipeline Interno del Motor V8: De Texto a Código Máquina</h4>
        <p>Antiguamente, JavaScript era un lenguaje puramente interpretado línea por línea, lo que resultaba en un rendimiento deficiente. V8 revolucionó la industria implementando <strong>Compilación Just-In-Time (JIT)</strong>:</p>
        <ol>
          <li><strong>Lexer / Scanner & Parser</strong>: Descompone el código fuente en tokens (palabras clave, operadores, identificadores) y construye el <strong>AST (Abstract Syntax Tree / Árbol de Sintaxis Abstracta)</strong>.</li>
          <li><strong>Ignition (El Intérprete)</strong>: Transforma el AST en una representación compacta denominada <em>Bytecode</em>. La aplicación comienza a ejecutarse de inmediato sin esperar a compilar todo el código.</li>
          <li><strong>Profiler (Monitor en Tiempo de Ejecución)</strong>: Analiza qué funciones se ejecutan con mucha frecuencia (denominadas <em>Hot Functions</em>) y recopila datos sobre los tipos de datos que reciben.</li>
          <li><strong>TurboFan (El Compilador Optimizador JIT)</strong>: Toma el bytecode de las hot functions y los datos del profiler, y genera <strong>código máquina optimizado</strong> de altísimo rendimiento para la CPU del equipo.</li>
          <li><strong>Deoptimización (Bailout)</strong>: Dado que JavaScript es dinámicamente tipado, si una función optimizada para números recibe repentinamente un string, TurboFan desecha el código máquina y regresa (<em>deopts</em>) al bytecode interpretado de Ignition.</li>
        </ol>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Buenas Prácticas para el Motor V8',
        text: 'Para ayudar al compilador TurboFan a generar el código máquina más veloz posible, mantén tus funciones <strong>monomórficas</strong> (que siempre reciban objetos con la misma estructura y tipos de parámetros). Cambiar dinámicamente los tipos de un objeto o añadirle propiedades de forma caótica rompe las clases ocultas (<em>Hidden Classes</em> / <em>Shapes</em>) de V8 y fuerza constantes deoptimizaciones.'
      },
      examples: [
        {
          id: 'ex-navigator-inspection',
          title: 'Auditoría del Entorno de Ejecución con la API Navigator',
          description: 'Inspecciona las propiedades del motor del navegador y del hardware subyacente que expone el entorno cliente web.',
          initialCode: `// Inspección de capacidades y metadatos del navegador cliente
console.log("=== AUDITORÍA DEL CLIENTE WEB (NAVIGATOR API) ===");
console.log("Navegador (User-Agent):", navigator.userAgent);
console.log("Idioma del cliente:", navigator.language);
console.log("Estado de conexión a Internet:", navigator.onLine ? "ONLINE (Conectado)" : "OFFLINE (Sin Red)");
console.log("Cookies habilitadas:", navigator.cookieEnabled);
console.log("Hilos lógicos de CPU detectados:", navigator.hardwareConcurrency || "No expuesto");

if (navigator.deviceMemory) {
  console.log("Memoria RAM aproximada del dispositivo:", navigator.deviceMemory + " GB");
}

if (navigator.connection) {
  console.log("Tipo de red efectiva:", navigator.connection.effectiveType);
  console.log("Velocidad de enlace estimada:", navigator.connection.downlink + " Mbps");
}

console.log("\\nAPI de Alto Rendimiento (performance):");
console.log("Milisegundos desde la carga de la página:", performance.now().toFixed(2) + " ms");`
        }
      ]
    },

    {
      id: 'event-loop-concurrencia',
      title: '3. El Modelo de Concurrencia: Single-Thread, Event Loop y Render Pipeline',
      criteriaRef: 'Criterio b)',
      description: 'El modelo de ejecución monohilo de JavaScript, la pila de llamadas (Call Stack), Heap de memoria, colas de microtareas vs macrotareas y el pipeline de renderizado gráfico del navegador.',
      theoryHtml: `
        <p>Una de las preguntas teóricas más recurrentes en el desarrollo web es: <em>¿Cómo puede JavaScript gestionar múltiples peticiones asíncronas, temporizadores y eventos de usuario si es un lenguaje de un solo hilo (Single-Threaded)?</em></p>
        <p>La clave reside en comprender que <strong>JavaScript es monohilo, pero el navegador web es multihilo</strong>.</p>

        <h4>A. Las Piezas del Entorno de Ejecución (Runtime)</h4>
        <ul>
          <li><strong>Call Stack (Pila de Llamadas)</strong>: Estructura de datos LIFO (<em>Last In, First Out</em>). Aquí se apilan los marcos de las funciones a medida que se invocan y se desapilan cuando retornan. Al ser monohilo, solo existe <strong>un único Call Stack</strong>: si una función ejecuta un bucle infinito síncrono, la interfaz completa del navegador se congela.</li>
          <li><strong>Memory Heap (Montículo de Memoria)</strong>: Región no estructurada de memoria donde se asignan las variables, objetos, matrices y funciones instanciadas. El <em>Garbage Collector</em> (Recolector de Basura) libera automáticamente la memoria de objetos inalcanzables.</li>
          <li><strong>Web APIs</strong>: Hilos en segundo plano provistos por el navegador (no forman parte del motor JS en sí). Gestionan peticiones <code>fetch()</code>, temporizadores <code>setTimeout()</code>, escuchadores de eventos y acceso a almacenamiento.</li>
          <li><strong>Microtask Queue (Cola de Microtareas - Prioridad Máxima)</strong>: Contiene callbacks de <strong>Promesas</strong> (<code>.then()</code>, <code>.catch()</code>, <code>.finally()</code>), <code>queueMicrotask()</code> y <code>MutationObserver</code>.</li>
          <li><strong>Task Queue / Callback Queue (Cola de Macrotareas)</strong>: Contiene callbacks de eventos de temporizadores (<code>setTimeout</code>, <code>setInterval</code>), eventos de usuario (click, submit) y respuestas de red I/O.</li>
        </ul>

        <h4>B. La Regla de Oro del Event Loop (Bucle de Eventos)</h4>
        <p>El Event Loop es un proceso en bucle constante que evalúa el siguiente algoritmo:</p>
        <ol>
          <li>¿Hay funciones ejecutándose en el <strong>Call Stack</strong>? Si es así, espera a que la pila se vacíe por completo.</li>
          <li>Una vez vacío el Call Stack, vacía <strong>TODAS las Microtareas</strong> pendientes en la <em>Microtask Queue</em>, una tras otra. Si una microtarea encola otra microtarea, se ejecuta en ese mismo ciclo.</li>
          <li>El navegador evalúa si corresponde ejecutar el <strong>Pipeline de Renderizado Gráfico</strong> (actualizar la pantalla a 60Hz / 120Hz).</li>
          <li>Extrae y ejecuta <strong>UNA sola Macrotarea</strong> de la <em>Task Queue</em>.</li>
          <li>Vuelve al paso 1.</li>
        </ol>

        <h4>C. El Pipeline de Renderizado Gráfico (Critical Rendering Path)</h4>
        <p>Cuando el navegador recibe el HTML y CSS, o cuando JavaScript muta el DOM, se produce el ciclo de dibujo:</p>
        <ol>
          <li><strong>DOM (Document Object Model)</strong>: Árbol de nodos generado a partir de las etiquetas HTML.</li>
          <li><strong>CSSOM (CSS Object Model)</strong>: Árbol de reglas de estilo computadas.</li>
          <li><strong>Render Tree</strong>: Unión del DOM y CSSOM que contiene solo los elementos visualmente visibles (excluye <code>&lt;head&gt;</code> o nodos con <code>display: none</code>).</li>
          <li><strong>Layout / Reflow</strong>: Cálculo de la geometría exacta: dimensiones (ancho, alto) y coordenadas espaciales (x, y) de cada caja en la pantalla.</li>
          <li><strong>Paint</strong>: Rasterizado de colores, bordes, sombras y texto en capas de mapa de bits.</li>
          <li><strong>Composite</strong>: La GPU combina las diferentes capas en la imagen final mostrada al usuario.</li>
        </ol>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Estrella de Oposiciones y Exámenes FP',
        text: '¿Cuál es la salida por consola exacta del siguiente código y por qué?<br><code>console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);</code><br><strong>Salida:</strong> <code>1, 4, 3, 2</code>.<br><strong>Explicación:</strong> 1 y 4 son síncronos (van directos al Call Stack). El callback de la Promesa (3) va a la <em>Microtask Queue</em> y tiene prioridad sobre el callback del <code>setTimeout</code> (2), que va a la <em>Task Queue</em> de macrotareas.'
      },
      examples: [
        {
          id: 'ex-event-loop-live',
          title: 'Laboratorio en Vivo del Event Loop: Síncrono vs Microtareas vs Macrotareas',
          description: 'Ejecuta y analiza paso a paso el orden en que el motor de JavaScript y el navegador resuelven las diferentes colas de concurrencia.',
          initialCode: `// Demostración del ciclo de concurrencia en JavaScript
console.log("▶ 1. [Síncrono] Inicio del script principal");

// Macrotarea (Task Queue) con retardo de 0 ms:
setTimeout(() => {
  console.log("⏰ 5. [Macrotarea - setTimeout] Ejecutada tras vaciar microtareas");
}, 0);

// Microtarea (Microtask Queue) vía Promesa nativa:
Promise.resolve()
  .then(() => {
    console.log("⚡ 3. [Microtarea - Promesa 1] Se ejecuta antes que cualquier macrotarea");
    return "Dato encadenado";
  })
  .then((dato) => {
    console.log("⚡ 4. [Microtarea - Promesa 2]", dato);
  });

// Microtarea explícita mediante la Web API queueMicrotask:
queueMicrotask(() => {
  console.log("⚡ 3.b [Microtarea - queueMicrotask] Misma cola de alta prioridad");
});

console.log("▶ 2. [Síncrono] Fin del script principal (Call Stack a punto de vaciarse)");
console.log("Observa en la consola inferior cómo el orden de salida respeta el algoritmo del Event Loop.");`
        }
      ]
    },

    {
      id: 'ecosistema-lenguajes-cliente',
      title: '4. Ecosistema de Lenguajes en el Cliente: JavaScript, TypeScript y WebAssembly',
      criteriaRef: 'Criterio c)',
      description: 'Evolución de JavaScript y el comité TC39, TypeScript como superset tipado estático, WebAssembly (Wasm) para computación binaria de alto rendimiento y herramientas de transpilación.',
      theoryHtml: `
        <p>Aunque JavaScript nació como un lenguaje de scripting modesto para validar formularios en 1995 (creado por Brendan Eich en apenas 10 días para Netscape), hoy en día es el lenguaje de programación más ubicuo del planeta, normalizado bajo el estándar <strong>ECMA-262</strong>.</p>

        <h4>A. Estandarización: TC39 y ECMAScript</h4>
        <p>El <strong>TC39 (Technical Committee 39)</strong> es el organismo responsable de evolucionar la especificación oficial de JavaScript (ECMAScript). Cualquier propuesta de nueva sintaxis debe superar 5 etapas rigurosas (<em>Stages 0 a 4</em>) antes de incorporarse al estándar anual (ES2015/ES6, ES2020, ES2023, etc.):</p>
        <ul>
          <li><strong>ES5 (2009)</strong>: Modo estricto (<code>"use strict"</code>), métodos funcionales de matrices (<code>map</code>, <code>filter</code>, <code>reduce</code>), soporte nativo de <code>JSON</code>.</li>
          <li><strong>ES6 / ES2015 (El punto de inflexión)</strong>: Declaraciones <code>let</code> y <code>const</code> con ámbito de bloque, funciones flecha (<code>=&gt;</code>), Clases (<code>class</code>), Módulos nativos (<code>import/export</code>), Promesas y Desestructuración.</li>
          <li><strong>ES2017 - ES2024</strong>: <code>async/await</code>, encadenamiento opcional (<code>?.</code>), operador de fusión nula (<code>??</code>), <code>BigInt</code>, métodos de array inmutables (<code>toSorted</code>, <code>toReversed</code>).</li>
        </ul>

        <h4>B. TypeScript: Seguridad de Tipos para la Empresa</h4>
        <p>A medida que las aplicaciones web en cliente crecieron a cientos de miles de líneas de código, el tipado dinámico y débil de JavaScript clásico provocaba errores frecuentes en producción (el temido <em>"TypeError: Cannot read properties of undefined"</em>). Para resolverlo, Microsoft creó <strong>TypeScript</strong>:</p>
        <ul>
          <li><strong>Superset de JavaScript</strong>: Todo código JavaScript válido es código TypeScript válido. Añade tipos estáticos opcionales, interfaces, genéricos, enums y modificadores de acceso (<code>public</code>, <code>private</code>, <code>readonly</code>).</li>
          <li><strong>Chequeo en Tiempo de Compilación</strong>: Los errores de tipos se detectan en el editor (IDE) mientras escribes, <em>antes de ejecutar el programa</em>.</li>
          <li><strong>Transpilación</strong>: Los navegadores web <strong>no pueden ejecutar TypeScript directamente</strong>. El compilador <code>tsc</code> o bundlers modernos (Babel, esbuild, SWC) eliminan los tipos y emiten JavaScript estándar que cualquier navegador entiende.</li>
        </ul>

        <h4>C. WebAssembly (Wasm): Velocidad Cuasi-Nativa en la Web</h4>
        <p>Aprobado por el W3C como el cuarto lenguaje oficial de la web (junto a HTML, CSS y JS), <strong>WebAssembly</strong> es un formato de código binario de bajo nivel diseñado como objetivo de compilación para lenguajes como <strong>C++, Rust, Go o C#</strong>:</p>
        <ul>
          <li><strong>Rendimiento Crítico</strong>: Se ejecuta a velocidades cercanas al código máquina nativo, con tiempos de inicio ultrarrápidos y consumo de memoria predecible.</li>
          <li><strong>No sustituye a JavaScript, se complementan</strong>: JavaScript gestiona la interfaz de usuario, eventos y llamadas a APIs web, mientras que WebAssembly asume las tareas intensivas de cómputo (motores de videojuegos, edición de imagen en Canva/Photoshop Web, Figma, codecs de vídeo y criptografía).</li>
          <li><strong>Seguridad Compartida</strong>: Wasm se ejecuta dentro del mismo entorno de aislamiento seguro (Sandbox) del navegador que JavaScript.</li>
        </ul>
      `,
      callout: {
        type: 'pro-tip',
        title: '¿Sabías que...?',
        text: 'La herramienta de diseño profesional <strong>Figma</strong> funciona íntegramente en el navegador gracias a que su motor de renderizado vectorial 2D está escrito en C++ y compilado a <strong>WebAssembly</strong>, permitiendo manipular miles de capas a 60 FPS sin saturar el recolector de basura de JavaScript.'
      },
      examples: [
        {
          id: 'ex-wasm-detection',
          title: 'Detección de Soporte WebAssembly y Comparación de Tipado',
          description: 'Comprueba de forma programática si el navegador actual soporta WebAssembly y experimenta con la naturaleza de tipado dinámico de JS.',
          initialCode: `// 1. Detección de soporte WebAssembly en el navegador:
const soporteWasm = typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function";

console.log("=== SOPORTE DE TECNOLOGÍAS EN ESTE NAVEGADOR ===");
console.log("¿Soporta WebAssembly (WASM)?:", soporteWasm ? "SÍ (Aceleración Binaria Disponible)" : "NO");

if (soporteWasm) {
  console.log("Versiones/Extensiones Wasm soportadas:", Object.keys(WebAssembly).join(", "));
}

// 2. Demostración de Tipado Dinámico en JavaScript:
console.log("\\n=== TIPADO DINÁMICO EN JS (VS TYPESCRIPT) ===");
let variableDinamica = 42;
console.log("Valor:", variableDinamica, "| Tipo detectado:", typeof variableDinamica);

variableDinamica = "Ahora soy una cadena de texto";
console.log("Valor:", variableDinamica, "| Tipo detectado:", typeof variableDinamica);

variableDinamica = { modulo: "0612", nombre: "Desarrollo Web Cliente" };
console.log("Valor:", JSON.stringify(variableDinamica), "| Tipo:", typeof variableDinamica);
console.log("En TypeScript esto generaría un error de compilación (Type 'string' is not assignable to type 'number').");`
        }
      ]
    },

    {
      id: 'scripts-vs-tradicional-sandbox',
      title: '5. Lenguajes de Script vs Programación Tradicional y Seguridad Sandbox',
      criteriaRef: 'Criterio d)',
      description: 'Diferencias entre scripts y lenguajes compilados clásicos, el modelo de aislamiento Sandbox del navegador, protección de hardware y las políticas Same-Origin Policy (SOP) y CORS.',
      theoryHtml: `
        <p>A diferencia de los lenguajes de programación tradicionales de escritorio o sistemas (como C, C++ o Java clásico), los lenguajes de script para cliente web operan bajo un paradigma condicionado por la <strong>seguridad, portabilidad e inmediatez</strong>.</p>

        <h4>A. Diferencias Clave: Scripts vs Programación Tradicional</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: var(--bg-surface-3); border-bottom: 2px solid var(--border-subtle); text-align: left;">
              <th style="padding: 10px;">Característica</th>
              <th style="padding: 10px;">Lenguajes Tradicionales (C, C++, Java)</th>
              <th style="padding: 10px;">Scripts de Cliente Web (JavaScript)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 10px;"><strong>Compilación</strong></td>
              <td style="padding: 10px;">Previa a la ejecución (AOT - Ahead Of Time) a binario o bytecode.</td>
              <td style="padding: 10px;">Interpretación y compilación dinámica JIT al vuelo en el navegador.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 10px;"><strong>Gestión de Memoria</strong></td>
              <td style="padding: 10px;">Manual (punteros <code>malloc/free</code>) o dependiente de JVM.</td>
              <td style="padding: 10px;">Automática y segura mediante <em>Garbage Collector</em>. Sin punteros directos.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 10px;"><strong>Acceso al Sistema</strong></td>
              <td style="padding: 10px;">Acceso total al sistema de archivos, sockets y hardware según permisos de usuario.</td>
              <td style="padding: 10px;"><strong>Aislamiento estricto (Sandbox)</strong>: Sin acceso directo a ficheros del SO ni memoria física.</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Tipado</strong></td>
              <td style="padding: 10px;">Estático y fuerte (verificado antes de compilar).</td>
              <td style="padding: 10px;">Dinámico y débil (coerción implícita de tipos).</td>
            </tr>
          </tbody>
        </table>

        <h4>B. El Modelo de Seguridad Sandbox (Caja de Arena)</h4>
        <p>Cuando un usuario entra en una página web, está descargando y ejecutando código JavaScript escrito por un desconocido en su ordenador. Si no existieran barreras de seguridad, cualquier sitio web podría leer tus contraseñas locales, infectar el sistema operativo o formatear el disco duro.</p>
        <p>Para evitarlo, el navegador ejecuta el código JavaScript dentro de una <strong>Sandbox (Caja de Arena)</strong>:</p>
        <ul>
          <li><strong>Prohibición de acceso al Sistema de Archivos</strong>: Una página web no puede ejecutar sentencias para abrir <code>C:\\Windows</code> o <code>/etc/passwd</code>. La única forma de leer un fichero es si el usuario lo selecciona voluntariamente mediante un <code>&lt;input type="file"&gt;</code> o la moderna <em>File System Access API</em> (con confirmación explícita del usuario).</li>
          <li><strong>Aislamiento de Procesos por Sitio (Site Isolation)</strong>: Cada pestaña y origen web se ejecuta en un proceso de memoria del sistema operativo independiente para mitigar ataques como <em>Spectre</em>.</li>
          <li><strong>Permisos Explícitos para Periféricos</strong>: El acceso a la cámara web, micrófono, geolocalización o notificaciones requiere la autorización explícita del usuario mediante la <em>Permissions API</em>.</li>
        </ul>

        <h4>C. Políticas de Seguridad Web: Same-Origin Policy (SOP) y CORS</h4>
        <p>La <strong>Política del Mismo Origen (Same-Origin Policy - SOP)</strong> es la piedra angular de la seguridad en navegadores. Establece que un script ejecutado en una página web solo puede acceder a recursos (DOM, cookies, peticiones AJAX) de otro documento si ambos comparten exactamente el mismo <strong>Origen</strong>.</p>
        <p>Un origen viene definido por la tupla: <code>Protocolo + Dominio (Host) + Puerto</code>:</p>
        <div style="background: var(--bg-surface-2); padding: 12px; border-radius: var(--radius-md); font-family: var(--font-code); font-size: 0.82rem; margin: 12px 0;">
          Origen Base: https://www.ejemplo.es:443<br>
          • https://www.ejemplo.es:443/contacto.html &nbsp;──► MISMO ORIGEN (Mismo protocolo, host y puerto)<br>
          • <span style="color: var(--color-danger);">http://</span>www.ejemplo.es:443/api &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──► DISTINTO ORIGEN (Protocolo http vs https)<br>
          • https://<span style="color: var(--color-danger);">tienda.</span>ejemplo.es:443 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──► DISTINTO ORIGEN (Subdominio diferente)<br>
          • https://www.ejemplo.es:<span style="color: var(--color-danger);">8080</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──► DISTINTO ORIGEN (Puerto 8080 vs 443)
        </div>
        <p>Para permitir que una API legítima en un servidor responda a peticiones de otro origen, se emplea <strong>CORS (Cross-Origin Resource Sharing)</strong>: el servidor debe enviar cabeceras HTTP explícitas como <code>Access-Control-Allow-Origin: *</code> autorizando el acceso.</p>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clave de Examen Oficial',
        text: '¿Qué es una petición "Preflight" (previa) en CORS y qué método HTTP utiliza? <strong>Respuesta:</strong> Es una comprobación preliminar automática que realiza el navegador antes de enviar peticiones potencialmente peligrosas (métodos PUT, DELETE o con cabeceras personalizadas). El navegador envía una petición con el método <strong>OPTIONS</strong> al servidor preguntando si la operación está autorizada antes de ejecutar la petición real.'
      },
      examples: [
        {
          id: 'ex-sop-checker',
          title: 'Comprobador Interactivo de Mismo Origen (SOP)',
          description: 'Función en vivo que analiza dos URLs completas y determina matemáticamente si cumplen la regla de Same-Origin Policy.',
          initialCode: `// Función que evalúa si dos URLs comparten el mismo origen según el estándar W3C
function verificarMismoOrigen(urlA, urlB) {
  try {
    const a = new URL(urlA);
    const b = new URL(urlB);

    const mismoProtocolo = a.protocol === b.protocol;
    const mismoHost = a.hostname === b.hostname;
    const mismoPuerto = (a.port || (a.protocol === "https:" ? "443" : "80")) === 
                        (b.port || (b.protocol === "https:" ? "443" : "80"));

    const esMismoOrigen = mismoProtocolo && mismoHost && mismoPuerto;

    return {
      urlA: a.origin,
      urlB: b.origin,
      esMismoOrigen,
      motivo: esMismoOrigen 
        ? "✓ Comparten protocolo, hostname y puerto." 
        : "✗ Violación SOP: " + [
            !mismoProtocolo ? "Protocolo distinto" : "",
            !mismoHost ? "Host distinto" : "",
            !mismoPuerto ? "Puerto distinto" : ""
          ].filter(Boolean).join(", ")
    };
  } catch (err) {
    return { error: "URL inválida: " + err.message };
  }
}

// Casos de prueba didácticos:
console.log("=== COMPROBACIÓN EMPÍRICA DE SAME-ORIGIN POLICY ===");
const caso1 = verificarMismoOrigen("https://fp.murciaeduca.es/daw", "https://fp.murciaeduca.es/noticias");
console.log("Caso 1 (Misma web, distinta ruta):", caso1.esMismoOrigen ? "PERMITIDO" : "BLOQUEADO", "-", caso1.motivo);

const caso2 = verificarMismoOrigen("https://aula.murciaeduca.es", "https://fp.murciaeduca.es");
console.log("Caso 2 (Subdominio diferente):", caso2.esMismoOrigen ? "PERMITIDO" : "BLOQUEADO", "-", caso2.motivo);

const caso3 = verificarMismoOrigen("http://localhost:3000", "https://localhost:3000");
console.log("Caso 3 (HTTP vs HTTPS):", caso3.esMismoOrigen ? "PERMITIDO" : "BLOQUEADO", "-", caso3.motivo);`
        }
      ]
    },

    {
      id: 'integracion-html-modulos-csp',
      title: '6. Integración de JavaScript con HTML5, Módulos ES6 y CSP',
      criteriaRef: 'Criterio e)',
      description: 'Mecanismos de inserción de scripts en el documento HTML, atributos async vs defer, el sistema de módulos estándar de JavaScript (ES Modules) y directivas de seguridad CSP.',
      theoryHtml: `
        <p>El estándar de desarrollo web actual establece una <strong>separación estricta de responsabilidades</strong> entre tres tecnologías complementarias: <strong>HTML5</strong> para la estructura y semántica del contenido, <strong>CSS3</strong> para la presentación y diseño visual, y <strong>JavaScript</strong> para el comportamiento y la reactividad.</p>

        <h4>A. Mecanismos de Carga de Scripts en HTML: <code>sync</code> vs <code>async</code> vs <code>defer</code></h4>
        <p>Cuando el motor del navegador analiza (parsea) el código HTML línea por línea y encuentra una etiqueta <code>&lt;script&gt;</code>, el comportamiento varía radicalmente según los atributos presentes:</p>
        <ul>
          <li><strong>Script Clásico Síncrono (<code>&lt;script src="app.js"&gt;</code>)</strong>:
            <p><strong>Bloquea el Parser HTML</strong>. El navegador detiene la construcción del DOM, descarga el archivo por la red, lo compila y ejecuta de inmediato. Hasta que no finaliza, el resto del HTML no se procesa. Si se coloca en el <code>&lt;head&gt;</code> sin atributos, retrasa el First Contentful Paint (FCP).</p>
          </li>
          <li><strong>Script Asíncrono (<code>&lt;script src="analitica.js" async&gt;</code>)</strong>:
            <p>El script se descarga en segundo plano sin pausar el parser HTML. <em>Atención:</em> En el instante exacto en que finaliza la descarga por red, <strong>el parser se detiene para ejecutar el script</strong>. Los scripts <code>async</code> <strong>no garantizan el orden de ejecución</strong> (se ejecutan según terminen de descargarse). Solo se recomiendan para librerías independientes que no dependan del DOM ni de otros scripts (ej: Google Analytics).</p>
          </li>
          <li><strong>Script Diferido (<code>&lt;script src="app.js" defer&gt;</code>) — La Práctica Recomendada</strong>:
            <p>El script se descarga en paralelo mientras el HTML continúa parseándose fluidamente. Su ejecución se pospone hasta que el HTML termina de analizarse por completo, justo antes del evento <code>DOMContentLoaded</code>. <strong>Garantiza el orden de ejecución</strong> en el que fueron declarados en el HTML.</p>
          </li>
        </ul>

        <h4>B. Módulos Nativos de JavaScript (ES Modules: <code>type="module"</code>)</h4>
        <p>Desde ES2015, los navegadores soportan de forma nativa la modularidad sin requerir herramientas externas:</p>
        <div style="background: var(--bg-surface-2); padding: 12px; border-radius: var(--radius-md); font-family: var(--font-code); font-size: 0.85rem; margin: 12px 0;">
          &lt;script type="module" src="main.js"&gt;&lt;/script&gt;
        </div>
        <p>Características esenciales de los módulos ES6 en el navegador:</p>
        <ol>
          <li><strong>Comportamiento <code>defer</code> implícito</strong>: Los scripts declarados con <code>type="module"</code> se comportan automáticamente como diferidos (no bloquean el renderizado HTML).</li>
          <li><strong>Ámbito propio de módulo (Module Scope)</strong>: Las variables o funciones declaradas en un módulo no contaminan el objeto global <code>window</code>. Para compartir elementos, deben exportarse explícitamente con <code>export</code> e importarse con <code>import</code>.</li>
          <li><strong>Modo Estricto automático</strong>: Los módulos siempre se ejecutan en modo estricto (<code>"use strict"</code>).</li>
          <li><strong>Sujetos a la política CORS</strong>: Los módulos cargados desde orígenes externos deben incluir cabeceras CORS válidas.</li>
          <li><strong>Importaciones dinámicas</strong>: Permiten cargar módulos bajo demanda (Code Splitting / Lazy Loading) con la función asíncrona <code>import('./modulo.js')</code> devolviendo una Promesa.</li>
        </ol>

        <h4>C. Políticas de Seguridad de Contenido (CSP - Content Security Policy)</h4>
        <p>Para mitigar ataques de inyección de código malicioso como <strong>XSS (Cross-Site Scripting)</strong> y secuestro de clics (Clickjacking), los servidores web envían la cabecera HTTP <code>Content-Security-Policy</code>:</p>
        <ul>
          <li>Restringe de qué dominios específicos está permitido cargar scripts, hojas de estilo o imágenes.</li>
          <li>Por defecto, una política CSP estricta <strong>prohíbe los scripts inline</strong> (código dentro de <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> o atributos <code>onclick="..."</code>) y la función <code>eval()</code>, obligando a vincular código JavaScript en ficheros externos desacoplados.</li>
        </ul>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Buenas Prácticas Profesionales',
        text: 'En el desarrollo web profesional moderno está absolutamente desaconsejado el uso de manejadores de eventos en línea (ej: <code>&lt;button onclick="enviar()"&gt;</code>). Viola el principio de separación de responsabilidades y es bloqueado por las políticas CSP estrictas en producción. Utiliza siempre <code>addEventListener</code> desde tus archivos de script.'
      },
      examples: [
        {
          id: 'ex-module-simulation',
          title: 'Simulación de Encapsulamiento Modular y Prevención de Colisiones Globales',
          description: 'Demostración de cómo el ámbito de módulo previene colisiones accidentales en window frente al uso de variables globales clásicas.',
          initialCode: `// 1. Simulación de patrón de módulo con ámbito cerrado:
const ModuloCalculadoraFP = (() => {
  // Variable privada (inaccesible desde el exterior / window):
  const tasaIva = 0.21;

  function calcularTotalConIva(baseImponible) {
    return baseImponible + (baseImponible * tasaIva);
  }

  // Interfaz pública expuesta:
  return {
    calcularTotal: calcularTotalConIva
  };
})();

console.log("=== ENCAPSULAMIENTO MODULAR ===");
const precioFinal = ModuloCalculadoraFP.calcularTotal(100);
console.log("Precio final calculado (100€ + 21%):", precioFinal + "€");

// Comprobación de que la variable interna no contamina el entorno:
console.log("¿Existe 'tasaIva' en el ámbito global?:", typeof tasaIva); // undefined

console.log("\\nEn los módulos ES6 (type='module'), este aislamiento ocurre de forma nativa sin necesidad de crear funciones autoejecutables (IIFE).");`
        }
      ]
    },

    {
      id: 'devtools-depuracion-auditoria',
      title: '7. Herramientas DevTools, Depuración, Linters y Auditoría Lighthouse',
      criteriaRef: 'Criterio f)',
      description: 'Dominio de las herramientas de desarrollo del navegador (DevTools), puntos de interrupción, análisis de red, linters (ESLint), formateadores (Prettier) y auditorías de rendimiento con Google Lighthouse y Core Web Vitals.',
      theoryHtml: `
        <p>Un futuro Técnico Superior en DAW debe dominar las herramientas profesionales de diagnóstico, depuración y auditoría que integran los navegadores modernos (accesibles mediante la tecla <strong>F12</strong> o <em>Ctrl+Shift+I</em>).</p>

        <h4>A. Las Pestañas Esenciales de DevTools</h4>
        <ul>
          <li><strong>Elements (Elementos / Inspector)</strong>:
            <p>Muestra el árbol DOM en vivo (tras las mutaciones de JavaScript), el panel de estilos CSS computados (<em>Computed Styles</em>) y el diagrama de cajas (<em>Box Model: margin, border, padding, content</em>). Permite modificar atributos y clases en tiempo real.</p>
          </li>
          <li><strong>Console (Consola)</strong>:
            <p>Entorno REPL (<em>Read-Eval-Print Loop</em>) para ejecutar sentencias interactivas, inspeccionar errores en tiempo de ejecución y utilizar la API <code>console</code> avanzada (<code>console.table</code>, <code>console.group</code>, <code>console.time</code>, <code>console.dir</code>).</p>
          </li>
          <li><strong>Sources / Debugger (Fuentes y Depuración)</strong>:
            <p>Permite navegar por el código fuente, configurar <strong>Breakpoints (puntos de interrupción)</strong> condicionales, pausar la ejecución en excepciones no capturadas, inspeccionar la pila de llamadas (<em>Call Stack</em>) y vigilar variables en tiempo real con <em>Watch Expressions</em>. La sentencia en código <code>debugger;</code> invoca automáticamente esta pausa.</p>
          </li>
          <li><strong>Network (Red)</strong>:
            <p>Registra cada petición HTTP/HTTPS: código de estado (200, 304, 404, 500), método, tamaño transferido por cable vs tamaño descomprimido, tipo MIME y gráfico en cascada (<em>Waterfall</em>). Permite simular conexiones lentas (<em>Network Throttling: Fast 3G, Slow 3G, Offline</em>) para verificar la robustez de la app.</p>
          </li>
          <li><strong>Performance (Rendimiento)</strong>:
            <p>Graba perfiles de uso de CPU y tasa de fotogramas por segundo (FPS). Esencial para detectar <strong>Layout Thrashing</strong> (operaciones forzadas de reflujo en bucles que provocan tirones visuales).</p>
          </li>
          <li><strong>Application / Storage (Almacenamiento)</strong>:
            <p>Inspecciona y limpia Cookies, <code>localStorage</code>, <code>sessionStorage</code>, <code>IndexedDB</code>, la caché de la aplicación y el ciclo de vida de los <em>Service Workers</em> (PWA).</p>
          </li>
        </ul>

        <h4>B. Auditorías de Rendimiento con Google Lighthouse</h4>
        <p>Lighthouse es una herramienta automatizada de código abierto integrada en Chrome DevTools que audita cualquier página web evaluando 4 pilares fundamentales:</p>
        <ol>
          <li><strong>Rendimiento (Performance)</strong>: Mide los <strong>Core Web Vitals</strong>:
            <ul>
              <li><strong>LCP (Largest Contentful Paint)</strong>: Mide la velocidad de carga percibida. Debe ser inferior a 2.5 segundos.</li>
              <li><strong>INP (Interaction to Next Paint)</strong>: Reemplazo oficial de FID en 2024. Mide la latencia de respuesta de la interfaz a las interacciones del usuario. Debe ser menor de 200 ms.</li>
              <li><strong>CLS (Cumulative Layout Shift)</strong>: Mide la estabilidad visual (evitar que los elementos salten de posición mientras la página carga). Debe ser inferior a 0.1.</li>
            </ul>
          </li>
          <li><strong>Accesibilidad (Accessibility / a11y)</strong>: Evalúa contraste de colores, textos alternativos en imágenes (<code>alt</code>), jerarquía correcta de encabezados (<code>h1-h6</code>) y roles ARIA.</li>
          <li><strong>Buenas Prácticas (Best Practices)</strong>: Comprueba el uso de HTTPS, ausencia de librerías con vulnerabilidades conocidas y prevención de APIs obsoletas.</li>
          <li><strong>SEO (Search Engine Optimization)</strong>: Verifica etiquetas <code>&lt;title&gt;</code>, meta descripciones, etiquetas <code>viewport</code> para móviles y rastreabilidad.</li>
        </ol>

        <h4>C. Herramientas de Calidad en el Flujo de Trabajo (Tooling)</h4>
        <ul>
          <li><strong>Linters (ESLint)</strong>: Analizadores estáticos de código que identifican patrones problemáticos, variables sin usar y posibles bugs antes de ejecutar el programa.</li>
          <li><strong>Formateadores (Prettier)</strong>: Normalizan el estilo de código (sangrías, comillas, punto y coma) automáticamente en todo el equipo.</li>
          <li><strong>Gestores de Paquetes y Bundlers (npm, Vite, esbuild)</strong>: Automatizan la instalación de librerías, minificación de ficheros y transpilación para producción.</li>
        </ul>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica de Examen FP (DAW)',
        text: '¿Qué es el "Layout Thrashing" (o reflujo forzado sincrónico) en el navegador y cómo se evita? <strong>Respuesta:</strong> Ocurre cuando un script lee una propiedad geométrica del DOM (como <code>offsetHeight</code> o <code>clientWidth</code>) justo después de haber mutado estilos o clases dentro de un bucle. Esto obliga al motor a recalcular de inmediato el Layout para poder devolver la medida actualizada, arruinando el rendimiento (frame drops). Se evita agrupando todas las lecturas de propiedades geométricas antes de realizar cualquier escritura o mutación en el DOM.'
      },
      examples: [
        {
          id: 'ex-devtools-console-pro',
          title: 'Técnicas Avanzadas de Diagnóstico con la API Console',
          description: 'Aprende a formatear registros con tablas interactivas, grupos desplegables y cronómetros de alta resolución.',
          initialCode: `// Demostración de métodos avanzados de auditoría y depuración en consola
console.log("=== TÉCNICAS AVANZADAS DE CONSOLA PARA DEVTOOLS ===");

// 1. console.table para colecciones de datos complejos:
const alumnosDAW = [
  { exp: "0612-01", alumno: "Alejandro Ruiz", modulo: "Cliente", notaMedia: 8.7 },
  { exp: "0612-02", alumno: "Beatriz Soto", modulo: "Cliente", notaMedia: 9.4 },
  { exp: "0612-03", alumno: "Carlos Mendoza", modulo: "Cliente", notaMedia: 7.2 }
];

console.log("Renderizado de objetos en formato tabla bidimensional:");
console.table(alumnosDAW);

// 2. Medición de tiempos de ejecución de algoritmos:
console.time("⏱ Búsqueda y reducción matemática");
let acumulador = 0;
for (let i = 0; i < 100000; i++) {
  acumulador += Math.sqrt(i);
}
console.timeEnd("⏱ Búsqueda y reducción matemática");

// 3. Contadores de ejecución (console.count):
for (let i = 1; i <= 3; i++) {
  console.count("Invocación de función crítica");
}

console.log("Resultado final acumulado:", acumulador.toFixed(2));
console.log("Consejo: Utiliza 'debugger;' en tu código para abrir el inspector de fuentes en DevTools.");`
        }
      ]
    }
  ],

  // =========================================================================
  // BANCO OFICIAL DE TEST DE AUTOEVALUACIÓN (12 PREGUNTAS TIPO EXAMEN FP)
  // =========================================================================
  quizzes: [
    {
      id: 'ra1-quiz-1',
      topicTag: 'Criterio a) Arquitecturas Web',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Cuál de las siguientes afirmaciones describe con precisión una ventaja clave del procesamiento de datos en el cliente (Frontend) mediante JavaScript frente al procesamiento en servidor?',
      options: [
        'Garantiza por sí solo la seguridad e integridad absoluta de la base de datos sin requerir validación posterior.',
        'Aprovecha los recursos de cómputo y memoria del dispositivo del usuario, reduciendo el tráfico de red y proporcionando respuestas inmediatas a la interfaz.',
        'Elimina por completo la necesidad de contar con servidores web o servicios de backend en la arquitectura.',
        'Garantiza que el código no podrá ser inspeccionado ni modificado por ningún usuario o herramienta de auditoría.'
      ],
      correctIndex: 1,
      explanation: 'El procesamiento en cliente descentraliza la carga computacional ejecutándola en el dispositivo del usuario, lo que reduce drásticamente el ancho de banda y proporciona feedback instantáneo sin sufrir la latencia física de red de cada petición HTTP.'
    },
    {
      id: 'ra1-quiz-2',
      topicTag: 'Criterio a) SPAs vs SSR',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: 'En una arquitectura Single Page Application (SPA), ¿qué mecanismo utiliza la aplicación para navegar entre diferentes vistas sin provocar una recarga completa del documento en el navegador?',
      options: [
        'Envía una petición HTTP POST sincrónica al servidor que fuerza el reinicio del socket TCP.',
        'Destruye el objeto window y descarga un nuevo archivo index.html completo desde la caché HTTP.',
        'Intercepta los eventos de navegación, actualiza la URL en la barra de direcciones con la History API y manipula dinámicamente el DOM intercambiando datos vía peticiones asíncronas (JSON).',
        'Ejecuta un reinicio del motor V8 utilizando la sentencia debugger en bucle.'
      ],
      correctIndex: 2,
      explanation: 'Las SPAs utilizan la History API del navegador (pushState/replaceState) para sincronizar la URL sin recargar la página, y mediante JavaScript solicitan únicamente datos (generalmente JSON) para mutar los nodos correspondientes del DOM en tiempo real.'
    },
    {
      id: 'ra1-quiz-3',
      topicTag: 'Criterio b) Motores del Navegador',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Qué combinación relaciona correctamente a los navegadores Google Chrome, Mozilla Firefox y Apple Safari con sus respectivos motores de JavaScript?',
      options: [
        'Chrome: SpiderMonkey | Firefox: V8 | Safari: Chakra',
        'Chrome: V8 | Firefox: SpiderMonkey | Safari: JavaScriptCore (Nitro)',
        'Chrome: Blink | Firefox: Gecko | Safari: WebKit',
        'Chrome: TurboFan | Firefox: Ignition | Safari: Blink'
      ],
      correctIndex: 1,
      explanation: 'V8 es el motor JavaScript de Google (Chrome, Node.js), SpiderMonkey es el motor histórico de Mozilla (Firefox) y JavaScriptCore (también conocido como Nitro) es el motor desarrollado por Apple para Safari y WebKit. (Blink, Gecko y WebKit son motores de renderizado, no de JS).'
    },
    {
      id: 'ra1-quiz-4',
      topicTag: 'Criterio b) Pipeline de Renderizado',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: 'Durante el ciclo de renderizado del navegador (Critical Rendering Path), ¿cuál es la diferencia fundamental entre las fases de Layout (Reflow) y Paint (Repintado)?',
      options: [
        'Layout calcula las dimensiones geométricas y posiciones espaciales de los elementos visibles, mientras que Paint dibuja los píxeles (colores, fondos, sombras) en capas.',
        'Layout descarga las hojas de estilo de la red y Paint se encarga de compilar el código JavaScript a bytecode.',
        'Paint solo se ejecuta en la carga inicial y Layout se ejecuta exclusivamente cuando el usuario hace scroll.',
        'Layout solo afecta a los elementos con display: none y Paint a los que tienen visibility: hidden.'
      ],
      correctIndex: 0,
      explanation: 'Layout (Reflow) es el costoso proceso geométrico donde el navegador calcula las coordenadas espaciales y tamaños de cada caja del Render Tree. Paint es la fase posterior donde se rasterizan visualmente los colores, bordes y tipografías en capas antes del composite final.'
    },
    {
      id: 'ra1-quiz-5',
      topicTag: 'Criterio b) Event Loop y Concurrencia',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      question: 'Analiza el siguiente código: ¿En qué orden exacto aparecerán los números en la consola?\\nconsole.log(10);\\nsetTimeout(() => console.log(20), 0);\\nPromise.resolve().then(() => console.log(30));\\nconsole.log(40);',
      options: [
        '10, 20, 30, 40',
        '10, 40, 20, 30',
        '10, 40, 30, 20',
        '10, 30, 40, 20'
      ],
      codeSnippet: `console.log(10);
setTimeout(() => console.log(20), 0);
Promise.resolve().then(() => console.log(30));
console.log(40);`,
      correctIndex: 2,
      explanation: '10 y 40 se ejecutan de inmediato en el Call Stack síncrono. La microtarea de la Promesa (30) entra en la Microtask Queue, cuya prioridad es máxima respecto a las macrotareas. Por tanto, el Event Loop ejecuta primero la microtarea (30) y finalmente la macrotarea de setTimeout (20).'
    },
    {
      id: 'ra1-quiz-6',
      topicTag: 'Criterio c) TypeScript en el Cliente',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: '¿Qué ocurre con los tipos, interfaces y anotaciones de TypeScript cuando una aplicación web se ejecuta en el navegador del usuario?',
      options: [
        'El motor V8 interpreta los tipos en tiempo de ejecución lanzando excepciones de tipo TypeCrash.',
        'Son completamente eliminados durante la fase de transpilación previa (por tsc o Babel), ejecutándose en el navegador únicamente código JavaScript estándar.',
        'Se convierten en comentarios multilínea que el navegador evalúa en la cola de microtareas.',
        'Se empaquetan dentro de un módulo WebAssembly para ser analizados por la GPU.'
      ],
      correctIndex: 1,
      explanation: 'Los navegadores web no entienden TypeScript de forma nativa. Durante la fase de build (transpilación), el compilador valida los tipos y los suprime íntegramente (Type Erasure), emitiendo código JavaScript vanilla compatible.'
    },
    {
      id: 'ra1-quiz-7',
      topicTag: 'Criterio c) WebAssembly (Wasm)',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Cuál es el propósito principal de WebAssembly (Wasm) en el ecosistema web actual?',
      options: [
        'Sustituir por completo a HTML y CSS para maquetar sitios web sin etiquetas de marcas.',
        'Permitir la ejecución de código binario compilado a velocidad cuasi-nativa en el navegador para tareas de computación intensiva.',
        'Obligar a todos los programadores web a escribir código ensamblador en lugar de JavaScript.',
        'Eliminar los protocolos HTTP para comunicarse directamente con discos duros locales.'
      ],
      correctIndex: 1,
      explanation: 'WebAssembly es un formato binario estándar de bajo nivel que permite ejecutar código compilado desde lenguajes como C++, Rust o Go a velocidad casi nativa, conviviendo con JavaScript para tareas de alta exigencia de cálculo (Figma, motores 3D, edición de vídeo).'
    },
    {
      id: 'ra1-quiz-8',
      topicTag: 'Criterio d) Seguridad Sandbox',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: '¿Por qué el modelo Sandbox del navegador prohíbe que el código JavaScript cliente acceda libremente al sistema de archivos local del ordenador del usuario?',
      options: [
        'Porque los discos duros modernos no soportan la codificación UTF-8 que utiliza JavaScript.',
        'Porque el motor V8 solo puede almacenar datos en la memoria caché del procesador.',
        'Para prevenir que cualquier sitio web malicioso descargue y ejecute código que pueda leer, modificar o destruir archivos privados del sistema del usuario.',
        'Porque la especificación ECMAScript solo permite guardar datos en memoria RAM Volátil.'
      ],
      correctIndex: 2,
      explanation: 'Al navegar por internet descargamos código de orígenes desconocidos. El Sandbox actúa como una jaula de seguridad que impide el acceso arbitrario al sistema de archivos del sistema operativo, requiriendo siempre la intervención o consentimiento explícito del usuario.'
    },
    {
      id: 'ra1-quiz-9',
      topicTag: 'Criterio d) Same-Origin Policy (SOP)',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      question: 'Tomando como origen de referencia "https://aulavirtual.ies.es:443", ¿cuál de las siguientes URLs pertenece al MISMO origen según la política SOP?',
      options: [
        'http://aulavirtual.ies.es:443/cursos (Protocolo HTTP)',
        'https://aulavirtual.ies.es:8080/cursos (Puerto 8080)',
        'https://alumnos.ies.es:443/cursos (Subdominio alumnos.ies.es)',
        'https://aulavirtual.ies.es/examenes/daw.html (Mismo protocolo https, mismo host y puerto 443 por defecto)'
      ],
      correctIndex: 3,
      explanation: 'La regla Same-Origin exige coincidencia exacta en Protocolo (https), Host (aulavirtual.ies.es) y Puerto (443, implícito en HTTPS). La ruta o subcarpeta (/examenes/daw.html) es irrelevante para el origen.'
    },
    {
      id: 'ra1-quiz-10',
      topicTag: 'Criterio e) Inclusión de Scripts: defer vs async',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: '¿Cuál es la diferencia fundamental entre los atributos booleanos "defer" y "async" en la etiqueta <script src="...">?',
      options: [
        'defer ejecuta el script apenas termina de descargarse; async espera a que el HTML esté completamente parseado.',
        'defer garantiza el orden de ejecución declarado en el HTML y espera a que el DOM esté parseado; async ejecuta de inmediato en cuanto finaliza la descarga de red sin garantizar orden.',
        'async solo funciona en archivos .css y defer solo en archivos .json.',
        'defer bloquea el análisis del HTML y async lo duplica en dos hilos paralelos.'
      ],
      correctIndex: 1,
      explanation: 'defer descarga en segundo plano y pospone la ejecución hasta finalizar el parsing HTML, respetando el orden secuencial de los scripts. async ejecuta de inmediato en cuanto se descarga por red, lo que detiene el parser y puede alterar el orden de dependencias.'
    },
    {
      id: 'ra1-quiz-11',
      topicTag: 'Criterio e) Módulos ES6 en Navegadores',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: 'Al incluir un script con el atributo type="module" (<script type="module" src="app.js">), ¿cuál de las siguientes propiedades se aplica de forma automática y obligatoria?',
      options: [
        'Todas las variables declaradas se registran automáticamente en el objeto global window.',
        'El script se ejecuta de forma síncrona bloqueando la descarga de imágenes.',
        'Se ejecuta automáticamente en modo estricto ("use strict"), tiene su propio ámbito de módulo cerrado y se comporta de manera diferida (defer) por defecto.',
        'El navegador desactiva la política de seguridad CORS para ese archivo.'
      ],
      correctIndex: 2,
      explanation: 'Los módulos ES6 nativos en navegadores encapsulan su propio ámbito (no contaminan window), habilitan "use strict" por defecto y se descargan de forma diferida (defer) sin necesidad de añadir el atributo explícito.'
    },
    {
      id: 'ra1-quiz-12',
      topicTag: 'Criterio f) Auditoría y Core Web Vitals',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: 'En una auditoría de rendimiento web con Google Lighthouse, ¿qué métrica Core Web Vital mide la estabilidad visual evitando que los elementos de la interfaz salten de posición bruscamente durante la carga?',
      options: [
        'LCP (Largest Contentful Paint)',
        'CLS (Cumulative Layout Shift)',
        'INP (Interaction to Next Paint)',
        'FCP (First Contentful Paint)'
      ],
      correctIndex: 1,
      explanation: 'CLS (Cumulative Layout Shift) cuantifica la suma total de cambios inesperados en el diseño que ocurren mientras el usuario lee o interactúa con la página (por ejemplo, imágenes que cargan sin dimensiones reservadas width/height).'
    }
  ],

  // =========================================================================
  // RETOS DE CÓDIGO INTERACTIVOS (CHALLENGES)
  // Al tratarse de un resultado de aprendizaje introductorio y conceptual,
  // no incluye retos de código con tests unitarios.
  // =========================================================================
  challenges: []
};
