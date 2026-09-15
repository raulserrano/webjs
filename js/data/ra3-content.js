/**
 * CONTENIDO DIDÁCTICO INTEGRAL: RESULTADO DE APRENDIZAJE 3 (RA3)
 * Módulo: Desarrollo Web en Entorno Cliente (0612) - FP DAW
 * Criterios de evaluación oficiales a) hasta h) y contenidos BORM / BOE RD 686/2010
 * "Escribe código, identificando y aplicando las funcionalidades aportadas por los objetos predefinidos del lenguaje."
 */

export const RA3_CONTENT = {
  id: 'ra3',
  title: 'Objetos Predefinidos del Lenguaje y Modelo de Objetos del Navegador (BOM)',
  duration: '12 Horas lectivas',
  officialCode: 'RA3 - Criterios a-h',

  // =========================================================================
  // LISTA DE APARTADOS TEÓRICOS (8 APARTADOS CON EJEMPLOS Y CALLOUTS)
  // Nota pedagógica: Titulados con numeración de apartado (3.1 a 3.8)
  // =========================================================================
  topics: [
    {
      id: 'apartado-bom-window',
      title: '3.1 Jerarquía del BOM y el Objeto Global window',
      criteriaRef: 'Criterios a), b)',
      description: 'Arquitectura jerárquica del Browser Object Model (BOM), el objeto global window como raíz del entorno de ejecución cliente y gestión del tiempo con temporizadores.',
      theoryHtml: `
        <p>En el entorno de ejecución del navegador, no existe un objeto <code>process</code> como en Node.js; la cúspide de la jerarquía es el objeto <strong><code>window</code></strong>. Representa la ventana o pestaña del navegador que contiene el documento web y actúa simultáneamente como:</p>
        <ol>
          <li><strong>El Objeto Global de JavaScript</strong>: Todas las funciones globales (como <code>parseInt</code> o <code>fetch</code>) y las variables declaradas con <code>var</code> son propiedades directas de <code>window</code>.</li>
          <li><strong>La puerta de entrada al BOM (Browser Object Model)</strong>: Proporciona acceso a subsistemas del navegador como <code>navigator</code>, <code>screen</code>, <code>location</code>, <code>history</code> y al propio <code>document</code> (DOM).</li>
        </ol>

        <h4>A. Jerarquía Estructural del BOM</h4>
        <div style="background: var(--bg-surface-2); border: var(--border-subtle); border-radius: var(--radius-md); padding: 14px; margin: 12px 0; font-family: var(--font-code); font-size: 0.85rem;">
          <span style="color: var(--color-brand); font-weight: 700;">window</span> (Objeto raíz global)<br>
          ├── <span style="color: var(--color-cyan);">navigator</span> (Información y capacidades del agente de usuario/navegador)<br>
          ├── <span style="color: var(--color-cyan);">screen</span> (Propiedades físicas y de resolución del monitor del usuario)<br>
          ├── <span style="color: var(--color-cyan);">location</span> (URL actual, protocolo, host, rutas y control de redirecciones)<br>
          ├── <span style="color: var(--color-cyan);">history</span> (Pila de navegación de la sesión y manipulación del historial)<br>
          └── <span style="color: #10b981;">document</span> (El árbol DOM del documento web cargado en la ventana)
        </div>

        <h4>B. Ámbito Global: Variables Implícitas vs Explícitas</h4>
        <p>Al programar en cliente, cualquier propiedad o método de <code>window</code> puede invocarse sin el prefijo <code>window.</code>:</p>
        <ul>
          <li><code>window.alert("Hola")</code> es idéntico a <code>alert("Hola")</code>.</li>
          <li><code>var aula = "DAW2"</code> crea <code>window.aula</code>.</li>
          <li><strong>¡Atención ES6!</strong> Las variables declaradas con <code>let</code> o <code>const</code> en el ámbito superior <em>tienen alcance global de script</em>, pero <strong>NO</strong> se adhieren como propiedades del objeto <code>window</code>. Esto evita la colisión de nombres y mejora el aislamiento.</li>
        </ul>

        <h4>C. Gestión de Temporización Asíncrona</h4>
        <p>El BOM provee mecanismos esenciales de temporización gobernados por el <em>Event Loop</em>:</p>
        <ul>
          <li><code>setTimeout(callback, delayMs, ...args)</code>: Programa la ejecución diferida de una función una única vez tras transcurrir al menos <code>delayMs</code> milisegundos. Devuelve un identificador numérico único (<code>timerId</code>).</li>
          <li><code>setInterval(callback, intervalMs, ...args)</code>: Invoca la función de forma periódica y repetitiva cada <code>intervalMs</code> milisegundos hasta su cancelación.</li>
          <li><code>clearTimeout(timerId)</code> y <code>clearInterval(timerId)</code>: Detienen la cuenta atrás y liberan los recursos asociados en la cola de tareas.</li>
          <li><code>requestAnimationFrame(callback)</code>: Mecanismo de alta precisión sincronizado con la tasa de refresco del monitor (habitualmente 60Hz / 144Hz), ideal para animaciones suaves sin caídas de frames.</li>
        </ul>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica de Examen FP',
        text: '¿Qué valor imprime <code>window.profesor</code> si declaramos <code>const profesor = "Raúl";</code> en el ámbito superior de un script? <strong>undefined</strong>. Las variables declaradas con <code>let</code> y <code>const</code> no se convierten en propiedades de <code>window</code>, a diferencia de la arcaica <code>var</code>.'
      },
      examples: [
        {
          id: 'ex-bom-window-timers',
          title: 'Ejemplo Práctico 1: Temporizadores con Control de Cancelación',
          description: 'Observa cómo iniciar un contador con setInterval y detenerlo programáticamente con clearInterval al alcanzar un umbral.',
          initialCode: `// Demostración de control de temporizadores en window
console.log("=== Temporizador BOM en window ===");

let contador = 0;
const limiteMaximo = 4;

console.log("Iniciando intervalo periódico...");

// Guardamos el identificador del temporizador para poder cancelarlo
const temporizadorId = setInterval(() => {
  contador++;
  console.log(\`[Tick \${contador}] Ejecutado a las: \${new Date().toLocaleTimeString()}\`);

  if (contador >= limiteMaximo) {
    clearInterval(temporizadorId);
    console.log("✓ Límite alcanzado: Intervalo cancelado con clearInterval.");
  }
}, 300);

console.log("ID del temporizador programado:", temporizadorId);`
        }
      ]
    },

    {
      id: 'apartado-screen-nav-loc-hist',
      title: '3.2 Objetos de Navegación y Pantalla: screen, navigator, location y history',
      criteriaRef: 'Criterios b), c)',
      description: 'Inspección de las capacidades del dispositivo con screen y navigator, gestión de URLs y redirecciones con location, y control de navegación con history.',
      theoryHtml: `
        <p>Los subobjetos del BOM permiten al desarrollador consultar el entorno de ejecución y manipular la navegación sin depender del contenido HTML:</p>

        <h4>A. Objeto <code>window.screen</code>: Inspección del Monitor</h4>
        <p>Informa sobre las propiedades de la pantalla física del usuario:</p>
        <ul>
          <li><code>screen.width</code> / <code>screen.height</code>: Resolución física total en píxeles (ej: 1920x1080).</li>
          <li><code>screen.availWidth</code> / <code>screen.availHeight</code>: Espacio disponible excluyendo las barras del sistema operativo (como la barra de tareas de Windows o el Dock de macOS).</li>
          <li><code>screen.colorDepth</code>: Profundidad de bits de color por píxel (habitualmente 24 o 32 bits).</li>
        </ul>

        <h4>B. Objeto <code>window.navigator</code>: Información del Cliente</h4>
        <p>Proporciona metadatos del navegador y APIs de capacidades del dispositivo:</p>
        <ul>
          <li><code>navigator.userAgent</code>: Cadena identificadora del navegador, motor de render y SO.</li>
          <li><code>navigator.language</code> / <code>navigator.languages</code>: Idioma preferido configurado por el usuario (ej: <code>"es-ES"</code>).</li>
          <li><code>navigator.onLine</code>: Booleano que indica si el navegador tiene conectividad a la red.</li>
          <li><code>navigator.clipboard</code>: API moderna asíncrona para leer y escribir en el portapapeles.</li>
          <li><code>navigator.geolocation</code>: API para solicitar coordenadas GPS previa autorización del usuario.</li>
        </ul>

        <h4>C. Objeto <code>window.location</code>: Desglose y Redirección de URLs</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: rgba(255,255,255,0.06); text-align: left;">
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Propiedad</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Ejemplo</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>location.href</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>"https://fp.edu:8080/curso?mod=0612#ra3"</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">URL completa. Reasignable para redirigir.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>location.protocol</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>"https:"</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Protocolo web de la conexión.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>location.host</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>"fp.edu:8080"</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Nombre del host junto con el puerto.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>location.pathname</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>"/curso"</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Ruta interna del recurso solicitado.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>location.search</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>"?mod=0612"</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Parámetros de consulta (Query String).</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>location.hash</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>"#ra3"</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Identificador de fragmento o ancla.</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Métodos clave de redirección:</strong></p>
        <ul>
          <li><code>location.assign(url)</code>: Carga una nueva URL y <em>guarda la página anterior en el historial</em> (el usuario puede pulsar Atrás).</li>
          <li><code>location.replace(url)</code>: Carga una nueva URL <em>reemplazando la actual en el historial</em> (impide volver atrás; indispensable tras logins o compras para evitar envíos duplicados).</li>
          <li><code>location.reload(forceReload)</code>: Recarga el documento actual.</li>
        </ul>

        <h4>D. Objeto <code>window.history</code>: Historial y SPAs</h4>
        <p>Permite simular la navegación adelante/atrás (<code>history.back()</code>, <code>history.forward()</code>, <code>history.go(-2)</code>) y, mediante la <em>HTML5 History API</em> (<code>history.pushState()</code> y <code>history.replaceState()</code>), modificar la barra de direcciones sin recargar la página, pilar fundamental de los routers en aplicaciones SPA.</p>
      `,
      callout: {
        type: 'architecture',
        title: 'Buenas Prácticas de Redirección en DAW',
        text: 'En flujos de autenticación o pasarelas de pago, utiliza siempre <code>location.replace()</code> en lugar de <code>location.href = ...</code>. De esta forma, el usuario no podrá reingresar al formulario expirado pulsando el botón "Atrás" del navegador.'
      },
      examples: [
        {
          id: 'ex-bom-location-params',
          title: 'Ejemplo Práctico 2: Inspección y Procesamiento de Parámetros de URL',
          description: 'Uso de la API moderna URLSearchParams para extraer parámetros de una query string sin expresiones regulares complejas.',
          initialCode: `// Simulación de análisis de URL y parámetros
const urlSimulada = "https://aulavirtual.fp.es:443/modulo?codigo=0612&ciclo=DAW&curso=2#evaluacion";
console.log("URL de prueba:", urlSimulada);

// Parseo mediante el objeto nativo URL
const objetoUrl = new URL(urlSimulada);

console.log("1. Hostname:", objetoUrl.hostname);
console.log("2. Protocolo:", objetoUrl.protocol);
console.log("3. Ruta (pathname):", objetoUrl.pathname);
console.log("4. Fragmento (hash):", objetoUrl.hash);

// Procesamiento de parámetros con URLSearchParams
const params = objetoUrl.searchParams;
console.log("5. Parámetro 'codigo':", params.get("codigo"));
console.log("6. Parámetro 'ciclo':", params.get("ciclo"));
console.log("7. ¿Existe el parámetro 'convocatoria'?:", params.has("convocatoria"));

// Iterar todos los parámetros recibidos
console.log("Listado completo de parámetros:");
for (const [clave, valor] of params.entries()) {
  console.log(\`  - \${clave} => \${valor}\`);
}`
        }
      ]
    },

    {
      id: 'apartado-dialogos-interaccion',
      title: '3.3 Diálogos Nativos del Navegador e Interacción con el Usuario',
      criteriaRef: 'Criterio e)',
      description: 'Métodos síncronos de interacción modal (alert, confirm, prompt), el fenómeno del bloqueo del hilo principal y la API moderna de diálogos HTML5.',
      theoryHtml: `
        <p>JavaScript en el navegador dispone de tres métodos clásicos pertenecientes al objeto <code>window</code> para interactuar con el usuario mediante cuadros de diálogo modales del sistema operativo:</p>

        <h4>A. Métodos de Diálogo Tradicionales</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: rgba(255,255,255,0.06); text-align: left;">
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Método</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Botones que presenta</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Tipo y Valor devuelto</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Caso de uso docente</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>alert(mensaje)</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Aceptar</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>undefined</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Avisos informativos urgentes.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>confirm(pregunta)</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Aceptar / Cancelar</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>boolean</code> (<code>true</code> o <code>false</code>)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Confirmación de borrado o acciones críticas.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>prompt(texto, defecto)</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Aceptar / Cancelar + Caja de texto</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>string</code> (si pulsa Aceptar)<br><code>null</code> (si pulsa Cancelar o Esc)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Entrada rápida de datos por teclado.</td>
            </tr>
          </tbody>
        </table>

        <h4>B. El Gran Inconveniente: Bloqueo Síncrono del Hilo Principal (UI Thread)</h4>
        <p>Estos tres métodos son <strong>síncronos y bloqueantes</strong>:</p>
        <ul>
          <li>En el instante en que se invoca <code>alert()</code> o <code>prompt()</code>, la ejecución completa de JavaScript <strong>se congela</strong>.</li>
          <li>El repintado de la pantalla (Rendering Engine) se detiene, los temporizadores encolados no se ejecutan y los eventos de usuario quedan en espera hasta que el usuario cierre el diálogo.</li>
          <li>No pueden ser estilizados con CSS y presentan aspecto dependiente del sistema operativo.</li>
        </ul>

        <h4>C. La Alternativa Estándar Moderna: El Elemento <code>&lt;dialog&gt;</code> de HTML5</h4>
        <p>En el desarrollo web profesional contemporáneo, se sustituyen estos métodos por la etiqueta nativa <code>&lt;dialog&gt;</code> combinada con los métodos <code>dialogElement.showModal()</code> y <code>dialogElement.close()</code>. Esta solución no bloquea el hilo principal, soporta CSS completo, maneja automáticamente la accesibilidad (tecla Escape y foco) y el oscurecimiento del fondo con el pseudo-elemento <code>::backdrop</code>.</p>
      `,
      callout: {
        type: 'architecture',
        title: 'Trampa Clásica con prompt() y Números',
        text: '<code>prompt()</code> devuelve SIEMPRE un <code>string</code> o <code>null</code>. Si el usuario escribe <code>25</code>, la variable contendrá <code>"25"</code>. Si intentas sumar <code>edad + 5</code> obtendrás <code>"255"</code> por concatenación. Es imprescindible convertir explícitamente con <code>Number(valor)</code> o <code>parseInt(valor, 10)</code>.'
      },
      examples: [
        {
          id: 'ex-bom-dialog-flow',
          title: 'Ejemplo Práctico 3: Lógica de Validación con Confirm y Prompt',
          description: 'Flujo condicional robusto gestionando las respuestas del usuario y la pulsación del botón Cancelar.',
          initialCode: `// Demostración de flujo defensivo con prompt y confirm
function simularOperacionMatricula(nombreIntroducido, confirmarAccion) {
  console.log("Iniciando proceso de matriculación...");

  // Validación de cancelación o entrada vacía
  if (nombreIntroducido === null) {
    console.warn("Operación abortada: El usuario pulsó 'Cancelar'.");
    return { exito: false, motivo: "CANCELADO" };
  }

  const nombreLimpio = nombreIntroducido.trim();
  if (nombreLimpio === "") {
    console.error("Error: Debe introducir un nombre válido.");
    return { exito: false, motivo: "NOMBRE_VACIO" };
  }

  if (!confirmarAccion) {
    console.warn("Matriculación no confirmada.");
    return { exito: false, motivo: "NO_CONFIRMADO" };
  }

  console.log(\`✓ ¡Matrícula confirmada con éxito para: \${nombreLimpio}!\`);
  return { exito: true, alumno: nombreLimpio };
}

// Simulamos los escenarios de interacción:
console.log("Escenario 1 (Aceptado):", simularOperacionMatricula("Ana López", true));
console.log("Escenario 2 (Cancelado):", simularOperacionMatricula(null, false));`
        }
      ]
    },

    {
      id: 'apartado-number-math',
      title: '3.4 Objeto Predefinido Number y Objeto Nativo Math',
      criteriaRef: 'Criterio a)',
      description: 'Constantes y métodos estáticos de Number, precisión de coma flotante IEEE 754 con Number.EPSILON, conversiones a distintas bases y funciones analíticas de Math.',
      theoryHtml: `
        <p>JavaScript gestiona los valores numéricos mediante el tipo primitivo <code>number</code> y su objeto envoltorio predefinido <strong><code>Number</code></strong>, complementado con el objeto estático <strong><code>Math</code></strong> para operaciones matemáticas avanzadas.</p>

        <h4>A. Representación IEEE 754 y el Problema de la Precisión</h4>
        <p>Todos los números en JavaScript son de coma flotante en doble precisión de 64 bits (estándar <strong>IEEE 754</strong>). Esto provoca que ciertas operaciones con decimales generen pequeñas imprecisiones binarias:</p>
        <pre style="background: var(--bg-code-editor); border: 1px solid rgba(87, 76, 67, 0.3); padding: 10px; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 0.85rem; color: #fbd38d;">
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
        </pre>
        <p><strong>La solución canónica con <code>Number.EPSILON</code>:</strong> Para comparar números en coma flotante de forma segura, se comprueba si la diferencia absoluta es menor que <code>Number.EPSILON</code>:</p>
        <pre style="background: var(--bg-code-editor); border: 1px solid rgba(87, 76, 67, 0.3); padding: 10px; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 0.85rem; color: #10b981;">
const sonIguales = Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON; // true
        </pre>

        <h4>B. Atributos y Constantes Estáticas de <code>Number</code></h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: rgba(255,255,255,0.06); text-align: left;">
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Constante</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Valor / Significado</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Utilidad en DAW</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>Number.MAX_VALUE</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">~1.7976931348623157 × 10³⁰⁸</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Mayor número positivo almacenable. Valores superiores se convierten en <code>Infinity</code>.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>Number.MIN_VALUE</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">~5 × 10⁻³²⁴</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Menor número positivo no nulo (el valor más próximo a cero).</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>Number.MAX_SAFE_INTEGER</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">9,007,199,254,740,991 (2⁵³ - 1)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Límite para cálculos enteros exactos. A partir de aquí se debe usar <code>BigInt</code>.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>Number.MIN_SAFE_INTEGER</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">-9,007,199,254,740,991 (-(2⁵³ - 1))</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Límite inferior para operaciones enteras precisas.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>Number.POSITIVE_INFINITY</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>Infinity</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Desbordamiento positivo (ej: <code>1 / 0</code>).</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>Number.NEGATIVE_INFINITY</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>-Infinity</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Desbordamiento negativo (ej: <code>-1 / 0</code>).</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>Number.NaN</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">"Not-a-Number"</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Resultado de operaciones numéricas no válidas (ej: <code>0 / 0</code>).</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>Number.EPSILON</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">~2.220446049250313 × 10⁻¹⁶</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Mínima diferencia entre 1 y el siguiente flotante. Tolerancia de redondeo.</td>
            </tr>
          </tbody>
        </table>

        <h4>C. Métodos Estáticos de <code>Number</code> (ES6) vs Funciones Globales</h4>
        <p>Una mejora crucial introducida en ES6 fue trasladar las funciones globales a métodos estáticos de <code>Number</code> con comportamiento estricto:</p>
        <ul>
          <li><code>Number.isNaN(valor)</code>: <strong>No realiza coerción de tipos</strong>. Solo devuelve <code>true</code> si el argumento es de tipo number y exactamente <code>NaN</code>.
            <div style="background: var(--bg-surface-2); padding: 8px; border-radius: 4px; margin: 4px 0; font-family: var(--font-code); font-size: 0.8rem;">
              isNaN("hola") &rarr; true (¡coerción peligrosa!)<br>
              Number.isNaN("hola") &rarr; false (estricto y seguro)
            </div>
          </li>
          <li><code>Number.isFinite(valor)</code>: Comprueba si es un número finito sin convertir el tipo previo.</li>
          <li><code>Number.isInteger(valor)</code>: Retorna <code>true</code> si el valor es numérico y carece de parte fraccionaria (<code>Number.isInteger(4.0) === true</code>, <code>Number.isInteger(4.2) === false</code>, <code>Number.isInteger("4") === false</code>).</li>
          <li><code>Number.isSafeInteger(valor)</code>: Comprueba si es un entero dentro del intervalo seguro <code>[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]</code>.</li>
          <li><code>Number.parseInt(str, radix)</code> / <code>Number.parseFloat(str)</code>: Métodos idénticos a los globales, preferidos por legibilidad modular.</li>
        </ul>

        <h4>D. Métodos de Instancia (Prototipo) de <code>Number</code></h4>
        <p>Invocables sobre cualquier variable o literal numérico (usando paréntesis para literales, ej: <code>(255).toString(16)</code>):</p>
        <ul>
          <li><code>num.toFixed(decimales)</code>: Formatea el número a una cantidad fija de decimales redondeando según sea necesario. <strong>¡Devuelve siempre un String!</strong></li>
          <li><code>num.toPrecision(digitos)</code>: Formatea el número a una cantidad fija de dígitos significativos totales.</li>
          <li><code>num.toExponential(fraccion)</code>: Devuelve una cadena con la representación del número en notación exponencial.</li>
          <li><code>num.toString(radix)</code>: Convierte el número a cadena en la base especificada (radix entre 2 y 36):
            <ul>
              <li><code>(255).toString(2)</code> &rarr; <code>"11111111"</code> (Binario).</li>
              <li><code>(255).toString(8)</code> &rarr; <code>"377"</code> (Octal).</li>
              <li><code>(255).toString(16)</code> &rarr; <code>"ff"</code> (Hexadecimal).</li>
            </ul>
          </li>
          <li><code>num.valueOf()</code>: Retorna el valor primitivo numérico envuelto.</li>
        </ul>

        <h4>E. El Objeto Nativo Estático <code>Math</code></h4>
        <p>A diferencia de <code>Number</code>, <strong><code>Math</code> no es un constructor</strong> ni tiene instancias; agrupa funciones matemáticas y constantes:</p>
        <ul>
          <li><strong>Constantes</strong>: <code>Math.PI</code> (~3.14159), <code>Math.E</code> (~2.71828), <code>Math.SQRT2</code> (~1.4142).</li>
          <li><strong>Redondeos</strong>:
            <ul>
              <li><code>Math.round(x)</code>: Redondeo aritmético al entero más cercano (0.5 hacia arriba).</li>
              <li><code>Math.floor(x)</code>: Redondeo hacia abajo (hacia el infinito negativo).</li>
              <li><code>Math.ceil(x)</code>: Redondeo hacia arriba (hacia el infinito positivo).</li>
              <li><code>Math.trunc(x)</code>: Trunca la parte decimal sin redondear.</li>
            </ul>
          </li>
          <li><strong>Generación de Aleatorios</strong>:
            <pre style="background: var(--bg-code-editor); border: 1px solid rgba(87, 76, 67, 0.3); padding: 8px; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 0.85rem; color: #10b981;">
// Fórmula oficial para enteros aleatorios entre min y max (ambos inclusive):
const aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            </pre>
          </li>
          <li><strong>Operaciones analíticas</strong>: <code>Math.max(...nums)</code>, <code>Math.min(...nums)</code>, <code>Math.abs(x)</code>, <code>Math.pow(base, exp)</code> (o <code>base ** exp</code>), <code>Math.sqrt(x)</code>, <code>Math.cbrt(x)</code>.</li>
        </ul>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica de Examen FP: isNaN vs Number.isNaN',
        text: '¿Qué devuelven <code>isNaN("123abc")</code> y <code>Number.isNaN("123abc")</code>? La función global <code>isNaN("123abc")</code> devuelve <strong>true</strong> porque primero intenta convertir el string a número (obteniendo <code>NaN</code>). En cambio, <code>Number.isNaN("123abc")</code> devuelve <strong>false</strong> porque el argumento no es de tipo number. ¡Usa siempre <code>Number.isNaN</code> para evitar falsos positivos!'
      },
      examples: [
        {
          id: 'ex-number-math-precision',
          title: 'Ejemplo Práctico 4: Precisión Numérica con Number.EPSILON, Conversión de Bases y Métodos Math',
          description: 'Demostración práctica de tolerancias de coma flotante, formateo de moneda con toFixed, conversión a hexadecimal y cálculo de aleatorios.',
          initialCode: `// 1. Comparación segura de coma flotante con Number.EPSILON
const a = 0.1 + 0.2;
const b = 0.3;
console.log("0.1 + 0.2 exacto:", a);
console.log("¿0.1 + 0.2 === 0.3?:", a === b); // false

function sonIgualesFlotantes(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON;
}
console.log("Comparación segura con EPSILON:", sonIgualesFlotantes(a, b)); // true

// 2. Comprobación estricta de tipos numéricos
console.log("\\n--- Métodos Estáticos de Number ---");
console.log("Number.isInteger(42):", Number.isInteger(42));       // true
console.log("Number.isInteger(42.5):", Number.isInteger(42.5));   // false
console.log("Number.isNaN(NaN):", Number.isNaN(NaN));             // true
console.log("Number.isNaN('texto'):", Number.isNaN("texto"));     // false (global isNaN daría true)

// 3. Conversión de bases con toString(radix)
const numeroColor = 255;
console.log("\\n--- Conversión de Bases ---");
console.log(\`\${numeroColor} en Binario:\`, numeroColor.toString(2));
console.log(\`\${numeroColor} en Octal:\`, numeroColor.toString(8));
console.log(\`\${numeroColor} en Hexadecimal:\`, numeroColor.toString(16).toUpperCase());

// 4. Formateo y redondeos con toFixed y Math
const precio = 129.4567;
console.log("\\n--- Formateo y Métodos Math ---");
console.log("Precio toFixed(2):", precio.toFixed(2)); // "129.46" (String)
console.log("Math.round(4.5):", Math.round(4.5));     // 5
console.log("Math.floor(-4.1):", Math.floor(-4.1));   // -5
console.log("Math.trunc(-4.9):", Math.trunc(-4.9));   // -4`
        }
      ]
    },

    {
      id: 'apartado-string-metodos',
      title: '3.5 Objeto Predefinido String: Propiedades, Métodos de Manipulación y Búsqueda',
      criteriaRef: 'Criterio a)',
      description: 'Inmutabilidad de cadenas, propiedad length, acceso por índice (at, charAt), búsqueda (includes, indexOf), extracción (slice, substring, split), transformación, relleno (padStart) y localización (localeCompare).',
      theoryHtml: `
        <p>El objeto <strong><code>String</code></strong> es uno de los componentes más versátiles de JavaScript. Permite manipular secuencias textuales mediante una amplísima gama de propiedades y métodos nativos.</p>

        <h4>A. Inmutabilidad y Naturaleza de los Strings</h4>
        <p>En JavaScript, las cadenas son valores <strong>primitivos e inmutables</strong>. Esto implica dos reglas de oro:</p>
        <ol>
          <li><strong>Ningún método de String modifica la cadena original</strong>: Todos los métodos (como <code>replace</code>, <code>slice</code> o <code>trim</code>) devuelven una <em>nueva</em> cadena de texto en memoria.</li>
          <li>Intentar asignar un carácter por índice (<code>cadena[0] = "X"</code>) falla silenciosamente (o lanza un error en modo estricto <code>"use strict"</code>).</li>
        </ol>
        <p><strong>Propiedad fundamental:</strong> <code>cadena.length</code> devuelve el número de unidades de código UTF-16 de la cadena.</p>

        <h4>B. Acceso a Caracteres y Códigos Unicode</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: rgba(255,255,255,0.06); text-align: left;">
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Método / Sintaxis</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Comportamiento</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Ejemplo ("DAW")</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.charAt(i)</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Devuelve el carácter en la posición. Si está fuera de rango, devuelve cadena vacía <code>""</code>.</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.charAt(0) &rarr; "D"</code></td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str[i]</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Acceso indexado tipo array. Si está fuera de rango, devuelve <code>undefined</code>.</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str[1] &rarr; "A"</code></td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.at(i)</code> (ES2022)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><strong>Soporta índices negativos</strong>: <code>-1</code> es el último carácter, <code>-2</code> el penúltimo.</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.at(-1) &rarr; "W"</code></td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.charCodeAt(i)</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Devuelve el código numérico UTF-16 (0 a 65535) del carácter.</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.charCodeAt(0) &rarr; 68</code></td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.codePointAt(i)</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Punto de código Unicode completo de 32 bits (compatible con emojis y caracteres extendidos).</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>"🚀".codePointAt(0) &rarr; 128640</code></td>
            </tr>
          </tbody>
        </table>

        <h4>C. Búsqueda y Comprobación de Contenido</h4>
        <ul>
          <li><code>str.indexOf(sub, [desde])</code>: Devuelve el índice de la primera coincidencia o <code>-1</code> si no existe.</li>
          <li><code>str.lastIndexOf(sub, [desde])</code>: Devuelve el índice de la última coincidencia o <code>-1</code>.</li>
          <li><code>str.includes(sub, [desde])</code>: Retorna <code>true</code> o <code>false</code> si la subcadena está contenida (reemplazo moderno y limpio de <code>indexOf !== -1</code>).</li>
          <li><code>str.startsWith(prefijo, [desde])</code>: Comprueba si la cadena comienza por el texto indicado.</li>
          <li><code>str.endsWith(sufijo, [longitud])</code>: Comprueba si la cadena finaliza con el texto indicado.</li>
          <li><code>str.search(regexp)</code>: Busca coincidencia con una expresión regular y devuelve su posición inicial.</li>
        </ul>

        <h4>D. Métodos de Extracción y Subcadenas</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: rgba(255,255,255,0.06); text-align: left;">
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Método</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Parámetros</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Peculiaridades / Recomendación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.slice(inicio, [fin])</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">(inicio inclusive, fin exclusive)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><span style="color: #10b981; font-weight: 700;">Recomendado Oficial.</span> Admite índices negativos (ej: <code>slice(-4)</code> toma los últimos 4 caracteres).</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.substring(inicio, [fin])</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">(inicio inclusive, fin exclusive)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">No admite negativos (los trata como <code>0</code>). Si <code>inicio &gt; fin</code>, intercambia los argumentos automáticamente.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.substr(inicio, [longitud])</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">(inicio, cantidad de caracteres)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><span style="color: #ef4444; font-weight: 700;">Obsoleto (Deprecated).</span> No debe utilizarse en código moderno. Usar siempre <code>slice()</code>.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>str.split(separador, [limite])</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">(delimitador string o regex)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Divide la cadena y retorna un <strong>Array</strong> con los fragmentos resultantes. <code>"a,b".split(",") &rarr; ["a", "b"]</code>.</td>
            </tr>
          </tbody>
        </table>

        <h4>E. Transformación, Limpieza y Relleno</h4>
        <ul>
          <li><code>str.toLowerCase()</code> / <code>str.toUpperCase()</code>: Conversión estándar a minúsculas o mayúsculas.</li>
          <li><code>str.toLocaleLowerCase()</code> / <code>str.toLocaleUpperCase()</code>: Respetando reglas lingüísticas locales.</li>
          <li><code>str.trim()</code>: Elimina espacios en blanco, tabuladores y saltos de línea al principio y al final.</li>
          <li><code>str.trimStart()</code> (o <code>trimLeft()</code>) / <code>str.trimEnd()</code> (o <code>trimRight()</code>): Limpieza selectiva de los extremos izquierdo o derecho.</li>
          <li><code>str.padStart(longitudObjetivo, [relleno])</code>: Rellena la cadena por la izquierda hasta alcanzar la longitud deseada. Esencial para enmascarar tarjetas (<code>"1234".padStart(8, "*") &rarr; "****1234"</code>) o formatear ceros a la izquierda (<code>"7".padStart(3, "0") &rarr; "007"</code>).</li>
          <li><code>str.padEnd(longitudObjetivo, [relleno])</code>: Rellena la cadena por la derecha.</li>
          <li><code>str.repeat(veces)</code>: Duplica la cadena el número especificado de veces.</li>
          <li><code>str.concat(...cadenas)</code>: Concatena cadenas (habitualmente reemplazado por el operador <code>+</code> o template literals).</li>
        </ul>

        <h4>F. Reemplazo Masivo y Comparación Lingüística</h4>
        <ul>
          <li><code>str.replace(patron, nuevoValor)</code>: Reemplaza la <strong>primera</strong> coincidencia si <code>patron</code> es un string. Para reemplazar todas con este método se requiere una RegExp con flag global (<code>/patron/g</code>).</li>
          <li><code>str.replaceAll(patron, nuevoValor)</code> (ES2021): Reemplaza <strong>todas</strong> las coincidencias del string sin requerir expresiones regulares.</li>
          <li><code>str.localeCompare(otraCadena, [locales], [opciones])</code>:
            <p>Compara dos cadenas según el orden alfabético del idioma del usuario o especificado. Devuelve <code>-1</code> si va antes, <code>1</code> si va después, y <code>0</code> si son equivalentes. <strong>Esencial para ordenar arrays con tildes y letra 'ñ' en español:</strong></p>
            <pre style="background: var(--bg-code-editor); border: 1px solid rgba(87, 76, 67, 0.3); padding: 8px; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 0.85rem; color: #10b981;">
const alumnos = ["Óscar", "Álvaro", "Nuria", "Ñoño", "Daniel"];
alumnos.sort((a, b) => a.localeCompare(b, "es"));
// Resultado ordenado correctamente: ["Álvaro", "Daniel", "Nuria", "Ñoño", "Óscar"]
            </pre>
          </li>
          <li><code>str.normalize([forma])</code>: Normaliza caracteres diacríticos en Unicode (ej: descomponer <code>"é"</code> en <code>"e" + acento</code> con forma <code>"NFD"</code> para eliminar tildes fácilmente).</li>
        </ul>

        <h4>G. Métodos Estáticos del Constructor <code>String</code></h4>
        <ul>
          <li><code>String.fromCharCode(n1, n2, ...)</code>: Construye un string a partir de una secuencia de códigos UTF-16 (ej: <code>String.fromCharCode(65, 66, 67) &rarr; "ABC"</code>).</li>
          <li><code>String.fromCodePoint(p1, p2, ...)</code>: Soporta puntos de código Unicode de 32 bits (ej: <code>String.fromCodePoint(0x1F600) &rarr; "😀"</code>).</li>
          <li><code>String.raw\`plantilla\`</code>: Devuelve la cadena cruda sin procesar secuencias de escape como <code>\\n</code> o <code>\\t</code>.</li>
        </ul>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Buenas Prácticas DAW: slice() frente a substring() y substr()',
        text: 'En pruebas y proyectos profesionales, utiliza <strong>siempre <code>slice()</code></strong> para recortar cadenas. Admite índices negativos de forma intuitiva (ej: <code>cadena.slice(-3)</code> para los 3 últimos caracteres), a diferencia de <code>substring()</code> (que trata negativos como 0 e invierte parámetros de forma impredecible). Desecha por completo <code>substr()</code>, ya que está marcada como obsoleta en el estándar ECMAScript.'
      },
      examples: [
        {
          id: 'ex-string-manipulation-pipeline',
          title: 'Ejemplo Práctico 5: Pipeline de Sanitización, Búsqueda, Máscaras con padStart y Normalización',
          description: 'Flujo completo de procesamiento de cadenas: limpieza de espacios, extracción con slice y at, formateo de números de cuenta con padStart y ordenación con localeCompare.',
          initialCode: `// Demostración completa de métodos del objeto predefinido String
console.log("=== Pipeline de Manipulación de String ===");

// 1. Acceso a caracteres con at(-1) y slice
const curso = "Desarrollo Web en Entorno Cliente";
console.log("Primer carácter (at 0):", curso.at(0));
console.log("Último carácter (at -1):", curso.at(-1));
console.log("Últimas 7 letras (slice -7):", curso.slice(-7));

// 2. Limpieza y comprobación
const entradaUsuario = "   daw2_alumno@instituto.es   ";
const correoLimpio = entradaUsuario.trim().toLowerCase();
console.log("\\nCorreo limpio:", correoLimpio);
console.log("¿Empieza por 'daw2'?:", correoLimpio.startsWith("daw2"));
console.log("¿Contiene '@instituto'?:", correoLimpio.includes("@instituto"));
console.log("Dominio extraído con split:", correoLimpio.split("@")[1]);

// 3. Relleno y enmascaramiento con padStart y padEnd
const idFactura = 48;
const codigoFormateado = String(idFactura).padStart(6, "0");
console.log("\\nCódigo factura con padStart(6, '0'):", codigoFormateado); // "000048"

const numeroTarjeta = "4548123456789012";
const ultimos4 = numeroTarjeta.slice(-4);
const tarjetaEnmascarada = ultimos4.padStart(numeroTarjeta.length, "*");
console.log("Tarjeta enmascarada:", tarjetaEnmascarada); // "************9012"

// 4. Reemplazo masivo con replaceAll
const textoOriginal = "El servidor A y el servidor B reportan OK.";
const textoCambiado = textoOriginal.replaceAll("servidor", "nodo");
console.log("\\nReemplazo con replaceAll:", textoCambiado);

// 5. Ordenación lingüística en español con localeCompare
const nombres = ["Zapata", "Ángel", "Ñoño", "Bárbara", "Álvaro"];
const ordenados = [...nombres].sort((a, b) => a.localeCompare(b, "es"));
console.log("\\nOrdenación correcta en español (localeCompare):", ordenados);`
        }
      ]
    },

    {
      id: 'apartado-date-gestion-temporal',
      title: '3.6 Objeto Nativo Date, Marcas de Tiempo y Formateo Internacional',
      criteriaRef: 'Criterio a)',
      description: 'Instanciación de fechas, marcas de tiempo Unix Epoch, manipulación de componentes temporales, cálculo de intervalos y formateo con Intl.DateTimeFormat.',
      theoryHtml: `
        <p>El objeto nativo <strong><code>Date</code></strong> representa un único instante temporal en milisegundos transcurridos desde el <strong>Unix Epoch</strong> (1 de enero de 1970 a las 00:00:00 UTC).</p>

        <h4>A. Formas de Instanciar un Objeto Date</h4>
        <ol>
          <li><code>new Date()</code>: Fecha y hora exacta en el instante de la ejecución en la zona horaria del cliente.</li>
          <li><code>new Date(milisegundos)</code>: Timestamp en ms desde el 1/1/1970 (ej: <code>new Date(0)</code> = 01/01/1970 UTC).</li>
          <li><code>new Date("2026-09-05T10:30:00Z")</code>: Parseo de cadena de fecha en formato estricto ISO 8601.</li>
          <li><code>new Date(año, mesIndice, dia, horas, minutos, segundos, ms)</code>: Parámetros numéricos separados.</li>
        </ol>

        <h4>B. La Trampa Histórica de los Meses en JavaScript</h4>
        <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 12px; margin: 12px 0; border-radius: var(--radius-sm);">
          <strong>¡Cuidado en los Exámenes de FP!</strong> Los meses en JavaScript están <strong>indexados en base 0</strong>:
          <ul>
            <li><code>0</code> = Enero, <code>1</code> = Febrero, ..., <code>8</code> = <strong>Septiembre</strong>, ..., <code>11</code> = Diciembre.</li>
            <li>En cambio, los días del mes (<code>getDate()</code>) van del <code>1</code> al <code>31</code>.</li>
            <li>El día de la semana (<code>getDay()</code>) va del <code>0</code> (Domingo) al <code>6</code> (Sábado).</li>
          </ul>
        </div>

        <h4>C. Métodos Getters y Setters (Locales vs UTC)</h4>
        <ul>
          <li><code>getFullYear()</code> / <code>setFullYear(año)</code>: Año con 4 dígitos (no usar el obsoleto <code>getYear()</code>).</li>
          <li><code>getMonth()</code>: Devuelve el índice del mes (0 a 11).</li>
          <li><code>getDate()</code>: Día del mes (1 a 31).</li>
          <li><code>getHours()</code>, <code>getMinutes()</code>, <code>getSeconds()</code>, <code>getMilliseconds()</code>: Componentes horarios.</li>
          <li><code>getTime()</code> / <code>Date.now()</code>: Devuelve el valor numérico en milisegundos (ideal para aritmética de fechas).</li>
        </ul>

        <h4>D. Aritmética Temporal: Diferencia entre Fechas</h4>
        <p>Para calcular la diferencia de días entre dos fechas, se restan sus timestamps en milisegundos y se divide por la cantidad de milisegundos en un día natural (<code>1000 * 60 * 60 * 24 = 86.400.000 ms</code>):</p>
        <pre style="background: var(--bg-code-editor); border: 1px solid rgba(87, 76, 67, 0.3); padding: 12px; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 0.85rem; color: #38bdf8;">
const msPorDia = 1000 * 60 * 60 * 24;
const diasDiferencia = Math.floor(Math.abs(fechaB.getTime() - fechaA.getTime()) / msPorDia);
        </pre>

        <h4>E. Formateo Moderno con <code>Intl.DateTimeFormat</code></h4>
        <p>La API nativa de internacionalización <code>Intl.DateTimeFormat</code> permite formatear fechas de acuerdo a la localización cultural del usuario sin librerías externas pesadas (como Moment.js):</p>
        <pre style="background: var(--bg-code-editor); border: 1px solid rgba(87, 76, 67, 0.3); padding: 12px; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 0.85rem; color: #fbd38d;">
const formateador = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'full',
  timeStyle: 'short'
});
console.log(formateador.format(new Date())); // "sábado, 5 de septiembre de 2026, 12:30"
        </pre>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica: getDay() vs getDate()',
        text: 'Nunca confundas <code>getDate()</code> con <code>getDay()</code>: <code>getDate()</code> devuelve el número del día del mes (ej: 25 de mayo -> 25). <code>getDay()</code> devuelve el día de la semana (0 para Domingo, 1 para Lunes, ..., 5 para Viernes).'
      },
      examples: [
        {
          id: 'ex-date-calc-difference',
          title: 'Ejemplo Práctico 6: Cálculo de Plazos de Entrega y Formateo Internacional',
          description: 'Cálculo de días restantes hasta una fecha de entrega límite de un proyecto DAW y formateo en español.',
          initialCode: `// Fecha actual vs Fecha límite de entrega de proyecto
const hoy = new Date();
// 15 de Octubre de 2026 (mes 9 en base 0):
const fechaLimite = new Date(2026, 9, 15, 23, 59, 59);

const diferenciaMs = fechaLimite.getTime() - hoy.getTime();
const msPorDia = 1000 * 60 * 60 * 24;
const diasRestantes = Math.ceil(diferenciaMs / msPorDia);

console.log("Fecha actual:", hoy.toLocaleDateString("es-ES"));
console.log("Fecha límite:", fechaLimite.toLocaleDateString("es-ES"));
console.log(\`Plazo disponible: \${diasRestantes} días naturales restantes.\`);

// Formateo formal para acta de departamento
const formatoOficial = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

console.log("Acta oficial fijada el:", formatoOficial.format(fechaLimite));`
        }
      ]
    },

    {
      id: 'apartado-regexp-cadenas',
      title: '3.7 Expresiones Regulares Nativas (RegExp) y Métodos de Cadena',
      criteriaRef: 'Criterios a), h)',
      description: 'Definición de patrones literales y con constructor, modificadores (flags), clases de caracteres, cuantificadores, métodos test() / exec() y métodos de String asociados.',
      theoryHtml: `
        <p>Una <strong>Expresión Regular (RegExp)</strong> es un objeto predefinido en JavaScript que describe un patrón formal de búsqueda y manipulación de texto.</p>

        <h4>A. Creación de Expresiones Regulares</h4>
        <ul>
          <li><strong>Notación Literal (Recomendada)</strong>: <code>const regex = /^[0-9]{8}[A-Z]$/i;</code>. Se compila en tiempo de parseo del script.</li>
          <li><strong>Constructor <code>new RegExp(patron, flags)</code></strong>: <code>const regex = new RegExp("^[0-9]{8}[A-Z]$", "i");</code>. Necesario cuando el patrón se construye dinámicamente en tiempo de ejecución. Recuerda escapar las barras: <code>"\\\\d+"</code>.</li>
        </ul>

        <h4>B. Modificadores Principales (Flags)</h4>
        <ul>
          <li><code>g</code> (Global): Busca todas las coincidencias en el texto, en lugar de detenerse tras la primera.</li>
          <li><code>i</code> (Case-Insensitive): Ignora diferencias entre mayúsculas y minúsculas.</li>
          <li><code>m</code> (Multilínea): Modifica <code>^</code> y <code>$</code> para que coincidan con el inicio y fin de cada línea individual.</li>
          <li><code>u</code> (Unicode): Habilita soporte completo para caracteres Unicode y emojis.</li>
        </ul>

        <h4>C. Elementos de la Sintaxis de Expresiones Regulares</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: rgba(255,255,255,0.06); text-align: left;">
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Símbolo</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Significado</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>^</code> / <code>$</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Anclas de inicio y fin de cadena completa</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>/^DAW/</code> empieza por "DAW"</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>\\d</code> / <code>\\D</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Dígito numérico <code>[0-9]</code> / No dígito</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>/\\d{3}/</code> tres números</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>\\w</code> / <code>\\W</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Carácter alfanumérico <code>[a-zA-Z0-9_]</code> / No alfanumérico</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>/\\w+/</code> identificador</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>\\s</code> / <code>\\S</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Espacio en blanco, tabulador, salto de línea / No espacio</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>/\\s+/</code> separar por espacios</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>+</code> / <code>*</code> / <code>?</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">1 o más / 0 o más / Opcional (0 o 1)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>/https?/</code> http o https</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>{n,m}</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Cuantificador de repetición: entre n y m veces</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>/\\d{4,6}/</code> entre 4 y 6 cifras</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>(patron)</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Grupo de captura: aísla subpartes referenciables con <code>$1</code>, <code>$2</code></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><code>/(\\w+)@(\\w+\\.\\w+)/</code></td>
            </tr>
          </tbody>
        </table>

        <h4>D. Métodos del Objeto RegExp vs Métodos de String</h4>
        <ul>
          <li><code>regex.test(cadena)</code>: Devuelve <code>true</code> o <code>false</code>. El método más rápido y eficiente para validaciones.</li>
          <li><code>regex.exec(cadena)</code>: Devuelve un array con la coincidencia y grupos de captura, o <code>null</code>.</li>
          <li><code>string.match(regex)</code>: Devuelve array de coincidencias.</li>
          <li><code>string.replace(regex, reemplazo)</code>: Sustituye coincidencias. Si se usan grupos de captura, se referencian con <code>$1</code>, <code>$2</code>, etc.</li>
        </ul>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Trampa Devastadora en Exámenes: regex.test() con flag /g',
        text: 'Si declaras una RegExp con el flag global <code>/g</code> (ej: <code>const r = /abc/g;</code>), el objeto almacena el puntero interno <code>r.lastIndex</code>. Al llamar consecutivamente <code>r.test("abc")</code>: la primera vez devolverá <code>true</code> y avanzará <code>lastIndex = 3</code>; ¡la segunda vez sobre la misma cadena devolverá <code>false</code>! Para validaciones simples con <code>test()</code>, <strong>NUNCA uses el flag /g</strong>.'
      },
      examples: [
        {
          id: 'ex-regexp-validator-replace',
          title: 'Ejemplo Práctico 7: Validación de Formatos y Reemplazo con Grupos de Captura',
          description: 'Validación de código postal español (5 dígitos, provincias 01 a 52) y reordenación de fechas con grupos de captura.',
          initialCode: `// 1. Validador de Código Postal de España (01000 a 52999)
const regexCP = /^(0[1-9]|[1-4][0-9]|5[0-2])\\d{3}$/;

console.log("¿30001 (Murcia) es válido?:", regexCP.test("30001"));
console.log("¿28013 (Madrid) es válido?:", regexCP.test("28013"));
console.log("¿99123 (Provincia inexistente)?:", regexCP.test("99123"));
console.log("¿Texto '30001a'?:", regexCP.test("30001a"));

// 2. Transformación de formato de fecha usando Grupos de Captura:
// Convertir de "AAAA-MM-DD" a "DD/MM/AAAA"
const fechaIso = "2026-09-05";
const regexFecha = /^(\\d{4})-(\\d{2})-(\\d{2})$/;

const fechaEspañola = fechaIso.replace(regexFecha, "$3/$2/$1");
console.log(\`Transformación: \${fechaIso} => \${fechaEspañola}\`);`
        }
      ]
    },

    {
      id: 'apartado-webstorage-json',
      title: '3.8 Persistencia en Cliente: Web Storage (localStorage, sessionStorage) y Serialización JSON',
      criteriaRef: 'Criterios a), g), h)',
      description: 'Almacenamiento clave-valor estructurado con localStorage y sessionStorage, cuotas y ciclo de vida, serialización con el objeto nativo JSON y eventos storage.',
      theoryHtml: `
        <p>Para persistir información en el navegador sin depender de cookies ni sobrecargar las cabeceras HTTP, el estándar HTML5 introdujo la <strong>Web Storage API</strong> (compuesta por <code>localStorage</code> y <code>sessionStorage</code>), complementada con el objeto nativo <strong><code>JSON</code></strong> para estructurar datos complejos.</p>

        <h4>A. De las Cookies a Web Storage: Ventajas Técnicas</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: rgba(255,255,255,0.06); text-align: left;">
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Característica</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">localStorage</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">sessionStorage</th>
              <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Cookies HTTP (Histórico)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><strong>Persistencia</strong></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Permanente (hasta borrado explícito del usuario o por código)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Temporal (se destruye al cerrar la pestaña o ventana)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Definida por <code>max-age</code> o <code>expires</code></td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><strong>Ámbito (Scope)</strong></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Mismo origen (protocolo + dominio + puerto) compartido por todas las pestañas</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Mismo origen pero <em>aislado por pestaña/ventana individual</em></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Mismo dominio y rutas (path) especificadas</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><strong>Capacidad</strong></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">~5 MB a 10 MB por origen</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">~5 MB por origen y pestaña</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Apenas 4 KB por cookie</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><strong>Tráfico de Red</strong></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">100% cliente (nunca se envía en peticiones HTTP)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">100% cliente (nunca se envía en peticiones HTTP)</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Se envía automáticamente en CADA petición HTTP</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);"><strong>API</strong></td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Interfaz <code>Storage</code> limpia y orientada a objetos</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Interfaz <code>Storage</code> limpia y orientada a objetos</td>
              <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.1);">Manipulación compleja de cadena con <code>document.cookie</code></td>
            </tr>
          </tbody>
        </table>

        <h4>B. La Interfaz Común <code>Storage</code>: Métodos y Propiedades</h4>
        <p>Tanto <code>window.localStorage</code> como <code>window.sessionStorage</code> implementan exactamente los mismos métodos sincrónicos:</p>
        <ul>
          <li><code>storage.setItem(clave, valor)</code>: Almacena el valor asociado a la clave. <strong>¡Atención crítica!</strong> Los valores siempre se convierten internamente a <code>string</code>.</li>
          <li><code>storage.getItem(clave)</code>: Devuelve el valor textual almacenado o <code>null</code> si la clave no existe.</li>
          <li><code>storage.removeItem(clave)</code>: Elimina la clave y su valor del almacén.</li>
          <li><code>storage.clear()</code>: Vacía completamente todos los pares clave-valor almacenados para ese origen.</li>
          <li><code>storage.key(indice)</code>: Retorna el nombre de la clave en la posición indicada (0 a <code>length - 1</code>).</li>
          <li><code>storage.length</code>: Propiedad numérica que indica la cantidad de claves almacenadas.</li>
        </ul>

        <h4>C. Serialización y Deserialización Segura con <code>JSON</code></h4>
        <p>Dado que Web Storage solo guarda cadenas, para almacenar objetos, arrays o booleanos sin perder su estructura se utiliza el objeto nativo <strong><code>JSON</code></strong>:</p>
        <pre style="background: var(--bg-code-editor); border: 1px solid rgba(87, 76, 67, 0.3); padding: 12px; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 0.85rem; color: #fbd38d;">
// 1. Escritura: Objeto -> String JSON -> localStorage
const usuario = { id: 101, nombre: "Lucía", roles: ["admin", "editor"] };
localStorage.setItem("sesion_usuario", JSON.stringify(usuario));

// 2. Lectura Segura: localStorage -> Parseo con try/catch -> Objeto JS
function obtenerSesionSegura(clave) {
  try {
    const raw = localStorage.getItem(clave);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Error al deserializar JSON de almacenamiento:", err.message);
    return null; // Retorno seguro ante corrupción de datos
  }
}
        </pre>

        <h4>D. Gestión de Errores: La Excepción <code>QuotaExceededError</code></h4>
        <p>Cuando el almacén alcanza el límite de memoria asignado por el navegador (~5 MB por origen) o cuando el usuario navega en modos ultra-restrictivos de privacidad, <code>setItem()</code> lanza una excepción de tipo <code>DOMException: QuotaExceededError</code>. Toda escritura en almacenamiento persistente debe estar protegida dentro de un bloque <code>try / catch</code>.</p>

        <h4>E. Sincronización Multi-Pestaña con el Evento <code>storage</code></h4>
        <p>Cuando un script modifica <code>localStorage</code>, el navegador emite un evento <code>storage</code> en el objeto <code>window</code>:</p>
        <pre style="background: var(--bg-code-editor); border: 1px solid rgba(87, 76, 67, 0.3); padding: 10px; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 0.85rem; color: #10b981;">
window.addEventListener("storage", (evento) => {
  console.log(\`Clave modificada: \${evento.key}\`);
  console.log(\`Valor anterior: \${evento.oldValue}\`);
  console.log(\`Nuevo valor: \${evento.newValue}\`);
  console.log(\`Origen que disparó el cambio: \${evento.url}\`);
});
        </pre>
        <p><strong>Comportamiento canónico de examen FP:</strong> El evento <code>storage</code> <strong>NO</strong> se dispara en la pestaña que realizó la modificación, sino en <em>todas las demás pestañas o ventanas abiertas del mismo origen</em>. Esto permite sincronizar carritos de compra o estados de autenticación en tiempo real sin recargar.</p>
      `,
      callout: {
        type: 'architecture',
        title: 'La Trampa de almacenar objetos sin JSON.stringify',
        text: 'Si ejecutas <code>localStorage.setItem("user", { nombre: "Carlos" })</code> sin serializar, JavaScript aplicará coerción implícita: <code>String({ nombre: "Carlos" })</code> se convertirá en <code>"[object Object]"</code>. Al leer con <code>getItem("user")</code> recibirás la cadena <code>"[object Object]"</code> y habrás perdido todos los datos. ¡Aplica siempre <code>JSON.stringify()</code> al guardar y <code>JSON.parse()</code> al recuperar!'
      },
      examples: [
        {
          id: 'ex-webstorage-json-manager',
          title: 'Ejemplo Práctico 8: Gestor de Persistencia y Preferencias con Web Storage y JSON',
          description: 'Implementación didáctica y segura de un servicio de almacenamiento desacoplado con soporte de serialización JSON y gestión de excepciones.',
          initialCode: `// Demostración de Almacenamiento Web estructurado con localStorage y JSON
// 1. Servicio desacoplado de Storage (Patrón Repository)
const StorageService = {
  guardar(clave, valor) {
    try {
      const serializado = JSON.stringify(valor);
      localStorage.setItem(clave, serializado);
      console.log(\`✓ Guardado en Storage [\${clave}]:\`, serializado);
      return true;
    } catch (err) {
      console.error(\`Error al guardar en Storage [\${clave}]:\`, err.message);
      return false;
    }
  },

  recuperar(clave, valorPorDefecto = null) {
    try {
      const datos = localStorage.getItem(clave);
      if (datos === null) return valorPorDefecto;
      return JSON.parse(datos);
    } catch (err) {
      console.warn(\`Error al parsear datos de [\${clave}], usando fallback:\`, err.message);
      return valorPorDefecto;
    }
  },

  eliminar(clave) {
    localStorage.removeItem(clave);
    console.log(\`✓ Clave eliminada [\${clave}]\`);
  }
};

// 2. Caso de uso: Guardar configuración de tema y carrito de un usuario
const perfilAlumno = {
  usuarioId: "daw2-042",
  preferencias: { tema: "dark", fontSize: 16 },
  modulosMatriculados: ["DWEC", "DIW", "DAW"],
  ultimoAcceso: new Date().toISOString()
};

// Guardamos en localStorage
StorageService.guardar("perfil_estudiante", perfilAlumno);

// Recuperamos y comprobamos integridad de los tipos
const recuperado = StorageService.recuperar("perfil_estudiante");
console.log("\\n--- Datos Recuperados ---");
console.log("Nombre de usuario:", recuperado.usuarioId);
console.log("Tema visual:", recuperado.preferencias.tema);
console.log("Módulos (Array):", recuperado.modulosMatriculados.join(", "));
console.log("Total claves en localStorage:", localStorage.length);`
        }
      ]
    }
  ],

  // =========================================================================
  // BATERÍA DE 14 PREGUNTAS DE AUTOEVALUACIÓN (TIPO TEST DE EXAMEN FP)
  // Con explicaciones pedagógicas exhaustivas basadas en los criterios a) a h)
  // =========================================================================
  quizzes: [
    {
      id: 'quiz-ra3-1',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'BOM: Objeto Global window',
      question: 'En el navegador, tras ejecutar el siguiente código en el ámbito global superior, ¿qué mostrará la consola?',
      codeSnippet: `var alumno = "Marcos";
let modulo = "DAW Cliente";
const centro = "IES FP";

console.log(window.alumno, window.modulo, window.centro);`,
      options: [
        '"Marcos" "DAW Cliente" "IES FP"',
        '"Marcos" undefined undefined',
        'undefined undefined undefined',
        'Lanza un ReferenceError: modulo is not defined'
      ],
      correctIndex: 1,
      explanation: 'En JavaScript del navegador, las variables declaradas con "var" en el ámbito global se añaden como propiedades del objeto "window" (window.alumno = "Marcos"). Por el contrario, las declaraciones con "let" y "const" (introducidas en ES6) residen en el ámbito léxico del script (Declarative Environment Record) y NO se vinculan a window. Por tanto, window.modulo y window.centro devuelven undefined.'
    },

    {
      id: 'quiz-ra3-2',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'BOM: location vs History',
      question: '¿Cuál es la diferencia fundamental entre ejecutar window.location.assign(url) y window.location.replace(url)?',
      codeSnippet: `// Opción A:
window.location.assign("https://fp.edu/login");

// Opción B:
window.location.replace("https://fp.edu/login");`,
      options: [
        'assign() solo admite URLs relativas mientras que replace() requiere URLs absolutas',
        'replace() sustituye la entrada de la página actual en el historial de sesión, impidiendo que el usuario vuelva atrás con el botón del navegador',
        'assign() recarga la caché del navegador mientras que replace() hace una recarga forzada desde el servidor',
        'No hay ninguna diferencia; replace() es simplemente un alias moderno de assign()'
      ],
      correctIndex: 1,
      explanation: '"location.assign(url)" añade la nueva URL a la pila de navegación del historial, permitiendo al usuario regresar a la página anterior mediante el botón Atrás. En cambio, "location.replace(url)" sobreescribe la página actual en la sesión del historial, impidiendo volver a ella con el botón Atrás. Esta técnica es obligatoria tras procesar formularios de pago o autenticación para evitar reenvíos accidentales.'
    },

    {
      id: 'quiz-ra3-3',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'BOM: screen vs inner dimensions',
      question: 'Un usuario tiene un monitor de resolución 1920x1080 píxeles, con una barra de tareas de Windows de 40 píxeles de altura. ¿Qué propiedad nos indicará la altura neta disponible para el navegador?',
      codeSnippet: `const h1 = window.screen.height;
const h2 = window.screen.availHeight;
const h3 = window.innerHeight;`,
      options: [
        'window.screen.height (devolverá 1040)',
        'window.screen.availHeight (devolverá 1040, descontando la barra de tareas)',
        'window.innerHeight (devolverá siempre 1080)',
        'window.outerHeight (que coincide obligatoriamente con screen.height)'
      ],
      correctIndex: 1,
      explanation: '"screen.height" mide la resolución física total del monitor (1080px). "screen.availHeight" mide el espacio vertical disponible para ventanas del sistema operativo, restando la barra de tareas fija u otros elementos del sistema (1080 - 40 = 1040px). Por su parte, "window.innerHeight" mide el viewport interior de la ventana del navegador (descontando pestañas, barra de marcadores e inspección DevTools).'
    },

    {
      id: 'quiz-ra3-4',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'BOM: Diálogos Modales y Event Loop',
      question: '¿Qué consecuencia técnica directa ocurre en el navegador al ejecutarse una llamada a window.alert() o window.prompt()?',
      codeSnippet: `console.log("Paso 1");
setTimeout(() => console.log("Paso 2 (Timer)"), 0);
alert("Atención docente");
console.log("Paso 3");`,
      options: [
        'alert() se ejecuta de forma asíncrona mediante una Promesa y no detiene la ejecución',
        'alert() detiene síncronamente el hilo principal (UI Thread), congelando el renderizado y los temporizadores hasta que el usuario pulse Aceptar',
        'alert() se envía a la cola de microtareas y se ejecuta después de console.log("Paso 3")',
        'El navegador ignora la llamada a alert() si hay temporizadores pendientes en la cola de tareas'
      ],
      correctIndex: 1,
      explanation: 'Los diálogos modales clásicos (alert, confirm, prompt) son síncronos y bloqueantes: suspenden la ejecución del hilo principal de JavaScript (Event Loop) y congelan el renderizado del navegador hasta que el usuario interactúe y cierre la ventana modal del sistema.'
    },

    {
      id: 'quiz-ra3-5',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'String: Métodos de Extracción y Negativos',
      question: '¿Cuál es el resultado de evaluar "DAW-Cliente".slice(-7) y por qué se recomienda frente a substring()?',
      codeSnippet: `const modulo = "DAW-Cliente";
const resultado = modulo.slice(-7);
console.log(resultado);`,
      options: [
        'Devuelve "Cliente", porque slice() admite índices negativos computando desde el final de la cadena hacia atrás',
        'Devuelve undefined, ya que en JavaScript los índices de String nunca pueden ser negativos',
        'Lanza un RangeError en tiempo de ejecución',
        'Devuelve "DAW-Cli" contando 7 posiciones desde el inicio'
      ],
      correctIndex: 0,
      explanation: 'El método "str.slice(inicio, fin)" es el estándar recomendado para extraer subcadenas en JavaScript moderno porque admite índices negativos: "-7" indica comenzar a contar 7 caracteres antes del final de la cadena ("Cliente"). En contraste, el método clásico "substring(-7)" trata cualquier valor negativo como 0, devolviendo la cadena completa desde el principio.'
    },

    {
      id: 'quiz-ra3-6',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Math: Aleatoriedad en Rango',
      question: '¿Cuál de las siguientes expresiones genera con total certeza un número entero aleatorio entre 10 y 20 (ambos inclusive)?',
      codeSnippet: `// Opciones para generar entero en rango cerrado [10, 20]:
const n1 = Math.floor(Math.random() * 10) + 10;
const n2 = Math.floor(Math.random() * 11) + 10;
const n3 = Math.round(Math.random() * 10) + 10;
const n4 = Math.ceil(Math.random() * 11) + 10;`,
      options: [
        'n1: Math.floor(Math.random() * 10) + 10;',
        'n2: Math.floor(Math.random() * 11) + 10;',
        'n3: Math.round(Math.random() * 10) + 10;',
        'n4: Math.ceil(Math.random() * 11) + 10;'
      ],
      correctIndex: 1,
      explanation: 'La amplitud de un rango cerrado [min, max] es (max - min + 1). Para [10, 20] es (20 - 10 + 1) = 11 posibles enteros. Math.random() * 11 produce un número en [0, 10.999...]. Aplicando Math.floor() obtenemos enteros equiprobables del 0 al 10. Al sumarle min (10), el resultado es exactamente un número entero del 10 al 20 inclusive.'
    },

    {
      id: 'quiz-ra3-7',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'Math: Redondeo de Negativos',
      question: '¿Cuáles son los resultados de evaluar Math.floor(-3.7) y Math.trunc(-3.7)?',
      codeSnippet: `console.log(Math.floor(-3.7), Math.trunc(-3.7));`,
      options: [
        '-3 y -3',
        '-4 y -3',
        '-3 y -4',
        '-4 y -4'
      ],
      correctIndex: 1,
      explanation: '"Math.floor(x)" siempre redondea hacia el entero inferior (hacia el infinito negativo); como -4 es menor que -3.7, Math.floor(-3.7) da -4. En cambio, "Math.trunc(x)" (introducido en ES6) simplemente descarta la parte decimal sin redondear, devolviendo -3.'
    },

    {
      id: 'quiz-ra3-8',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Date: Índice de Meses',
      question: 'Al ejecutar new Date(2026, 4, 15), ¿a qué fecha natural del calendario se refiere?',
      codeSnippet: `const examen = new Date(2026, 4, 15);
console.log(examen.getMonth());`,
      options: [
        '15 de Abril de 2026',
        '15 de Mayo de 2026',
        '4 de Enero de 2026',
        '4 de Mayo de 2026'
      ],
      correctIndex: 1,
      explanation: 'En JavaScript los meses son 0-indexados (Enero = 0, Febrero = 1, Marzo = 2, Abril = 3, Mayo = 4). Por tanto, pasar el número 4 como segundo argumento al constructor de Date representa el mes de Mayo. El día del mes es el 15.'
    },

    {
      id: 'quiz-ra3-9',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'Date: Diferencia Temporal',
      question: 'Para calcular la cantidad exacta de días completos entre dos instancias de Date en JavaScript, ¿cuál es el cálculo correcto?',
      codeSnippet: `const fInicio = new Date("2026-09-01");
const fFin = new Date("2026-09-11");
// ¿Cómo calcular los días de diferencia?`,
      options: [
        'fFin.getDate() - fInicio.getDate();',
        '(fFin.getTime() - fInicio.getTime()) / (1000 * 60 * 60 * 24);',
        'fFin.getDay() - fInicio.getDay();',
        'Date.parse(fFin) - Date.parse(fInicio); sin dividir por nada'
      ],
      correctIndex: 1,
      explanation: 'Restar fFin.getDate() solo funciona dentro del mismo mes calendario y falla en cambios de mes o año. El método estándar consiste en restar los milisegundos Epoch obtenidos con getTime() y dividir el resultado entre los milisegundos que componen un día natural (1000 ms * 60 s * 60 min * 24 h = 86.400.000 ms).'
    },

    {
      id: 'quiz-ra3-10',
      difficulty: 'Avanzado',
      difficultyClass: 'diff-examen',
      topicTag: 'RegExp: El Peligro del Flag /g y lastIndex',
      question: '¿Qué imprimirá por consola el siguiente fragmento con RegExp.test() repetido?',
      codeSnippet: `const patron = /daw/g;
const texto = "daw";

console.log(patron.test(texto));
console.log(patron.test(texto));`,
      options: [
        'true y true',
        'true y false',
        'false y false',
        'Lanza un TypeError en la segunda llamada'
      ],
      correctIndex: 1,
      explanation: 'Cuando una RegExp contiene el flag global "/g", el objeto conserva un estado interno en la propiedad mutable "patron.lastIndex". En la primera llamada, test() encuentra la coincidencia en el índice 0 y actualiza lastIndex a 3 (el final de la coincidencia). En la segunda llamada, la búsqueda comienza en el índice 3, donde ya no hay texto coincidente, devolviendo false y reseteando lastIndex a 0.'
    },

    {
      id: 'quiz-ra3-11',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'RegExp: Grupos de Captura en Replace',
      question: '¿Cuál será el contenido de la variable "resultado" tras ejecutar este reemplazo?',
      codeSnippet: `const codigo = "PROYECTO-2026";
const resultado = codigo.replace(/^([A-Z]+)-(\\d{4})$/, "$2::$1");
console.log(resultado);`,
      options: [
        '"PROYECTO-2026"',
        '"$2::$1"',
        '"2026::PROYECTO"',
        '"2026-PROYECTO"'
      ],
      correctIndex: 2,
      explanation: 'Los paréntesis definen grupos de captura numerados: el primer grupo ($1) captura las letras ("PROYECTO") y el segundo grupo ($2) captura los cuatro dígitos ("2026"). En la cadena de sustitución, "$2::$1" coloca primero el segundo grupo seguido de "::" y el primer grupo, dando "2026::PROYECTO".'
    },

    {
      id: 'quiz-ra3-12',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'JSON: Tipos No Serializables',
      question: '¿Qué ocurre al serializar con JSON.stringify() un objeto que contiene funciones, undefined o símbolos?',
      codeSnippet: `const datos = {
  nombre: "Carlos",
  calcular: function() { return 10; },
  extra: undefined,
  id: Symbol("alumno")
};
console.log(JSON.stringify(datos));`,
      options: [
        'Lanza un TypeError por contener tipos incompatibles',
        '{"nombre":"Carlos","calcular":"function","extra":null,"id":null}',
        '{"nombre":"Carlos"} (las propiedades con funciones, undefined y Symbol son omitidas)',
        '{"nombre":"Carlos","calcular":{},"extra":{},"id":{}}'
      ],
      correctIndex: 2,
      explanation: 'En la especificación oficial de JSON (RFC 8259), no existen tipos para funciones, undefined ni Symbols. Al invocar JSON.stringify() sobre un objeto, las propiedades cuyos valores sean funciones, undefined o Symbol son omitidas por completo de la cadena resultante.'
    },

    {
      id: 'quiz-ra3-13',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Web Storage: localStorage vs sessionStorage',
      question: '¿Cuál es la diferencia fundamental en persistencia y ámbito de aislamiento entre localStorage y sessionStorage?',
      codeSnippet: `// Ventana A y Ventana B abiertas en el mismo navegador hacia https://mi-instituto.es
localStorage.setItem("tema", "dark");
sessionStorage.setItem("token_temporal", "xyz-123");`,
      options: [
        'localStorage se comparte entre todas las pestañas/ventanas del mismo origen y persiste tras cerrar el navegador; sessionStorage solo vive en esa pestaña específica y se destruye al cerrarla',
        'sessionStorage se guarda en el servidor web mediante peticiones HTTP automáticas, mientras que localStorage se guarda en cliente',
        'localStorage tiene un límite de 4 KB y sessionStorage permite almacenar hasta 500 MB',
        'No existe ninguna diferencia funcional; sessionStorage es simplemente el nombre antiguo de localStorage en navegadores heredados'
      ],
      correctIndex: 0,
      explanation: '"localStorage" ofrece almacenamiento permanente con ámbito por origen (protocolo + dominio + puerto) compartido entre todas las pestañas y ventanas del navegador. Por su parte, "sessionStorage" mantiene los datos única y exclusivamente mientras la pestaña o ventana permanezca abierta (sobrevive a recargas con F5, pero se destruye inmediatamente al cerrar la pestaña), sin compartirse con otras pestañas aunque compartan el mismo origen.'
    },

    {
      id: 'quiz-ra3-14',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'Web Storage: Serialización y Coerción de Tipos',
      question: 'Si ejecutamos localStorage.setItem("usuario", { nombre: "Carlos", curso: "DAW2" }) sin serializar previamente con JSON.stringify(), ¿qué devolverá después localStorage.getItem("usuario")?',
      codeSnippet: `const alumno = { nombre: "Carlos", curso: "DAW2" };
localStorage.setItem("usuario", alumno);

const recuperado = localStorage.getItem("usuario");
console.log(recuperado);`,
      options: [
        'La cadena "[object Object]", perdiéndose los datos originales por coerción implícita a String',
        'El objeto JavaScript original { nombre: "Carlos", curso: "DAW2" }',
        'Lanza una excepción de tipo DOMException: InvalidTypeException',
        'null, porque Web Storage rechaza silenciosamente cualquier valor que no sea de tipo string'
      ],
      correctIndex: 0,
      explanation: 'La Web Storage API (localStorage y sessionStorage) solo almacena cadenas de texto. Cuando se pasa un valor que no es string como segundo parámetro de setItem(), JavaScript ejecuta internamente String(valor). Al convertir un objeto plano, String({ ... }) produce la cadena literal "[object Object]", corrompiendo la información. Por ello es obligatorio usar JSON.stringify() al guardar y JSON.parse() al recuperar.'
    }
  ],

  // =========================================================================
  // BATERÍA DE 8 RETOS DE PROGRAMACIÓN GUIADA (CODING CHALLENGES)
  // Con suites de pruebas unitarias automáticas evaluadas en evaluator.js
  // =========================================================================
  challenges: [
    {
      id: 'challenge-ra3-1',
      title: 'Reto 1: Extractor de Parámetros de URL con URLSearchParams',
      difficulty: 'Básico',
      topicTag: 'BOM: location & search',
      type: 'variable',
      targetVars: ['parametrosExtraidos', 'totalParametros'],
      instructions: `En el desarrollo web con JavaScript, procesar la cadena de consulta (query string) de una URL es una tarea diaria.
      <ul>
        <li>Dada la variable de entrada <code>cadenaQuery</code> (que puede comenzar con <code>?</code> o no, o estar vacía):</li>
        <li>Utiliza el objeto nativo <code>URLSearchParams</code> para procesar la cadena.</li>
        <li>Construye un objeto JavaScript plano en <code>parametrosExtraidos</code> con cada par clave-valor.</li>
        <li>Asigna a <code>totalParametros</code> el número de parámetros distintos presentes en la consulta.</li>
        <li>Ejemplo: Para <code>"?modulo=0612&curso=2"</code> debe producir <code>parametrosExtraidos = { modulo: "0612", curso: "2" }</code> y <code>totalParametros = 2</code>.</li>
        <li>Si la cadena está vacía (<code>""</code>), <code>parametrosExtraidos</code> debe ser un objeto vacío <code>{}</code> y <code>totalParametros = 0</code>.</li>
      </ul>`,
      starterCode: `// Variable de entrada (query string simulada):
let cadenaQuery = "?modulo=0612&ciclo=DAW&curso=2";

// Variables de resultado:
let parametrosExtraidos = {};
let totalParametros = 0;

// TODO: Utiliza URLSearchParams para poblar parametrosExtraidos y contar totalParametros:


console.log("Parámetros extraídos:", parametrosExtraidos);
console.log("Total parámetros:", totalParametros);`,
      hint: 'Crea const sp = new URLSearchParams(cadenaQuery); luego itera con for (const [k, v] of sp.entries()) y asigna parametrosExtraidos[k] = v.',
      tests: [
        {
          name: 'Extrae correctamente parámetros estándar con ? inicial',
          inputs: { cadenaQuery: "?modulo=0612&ciclo=DAW&curso=2" },
          expected: {
            parametrosExtraidos: { modulo: "0612", ciclo: "DAW", curso: "2" },
            totalParametros: 3
          }
        },
        {
          name: 'Procesa query string sin el carácter ? inicial',
          inputs: { cadenaQuery: "usuario=raulp&rol=docente" },
          expected: {
            parametrosExtraidos: { usuario: "raulp", rol: "docente" },
            totalParametros: 2
          }
        },
        {
          name: 'Maneja cadena vacía devolviendo objeto vacío y contador en 0',
          inputs: { cadenaQuery: "" },
          expected: {
            parametrosExtraidos: {},
            totalParametros: 0
          }
        },
        {
          name: 'Extrae un único parámetro correctamente',
          inputs: { cadenaQuery: "?id=105" },
          expected: {
            parametrosExtraidos: { id: "105" },
            totalParametros: 1
          }
        }
      ]
    },

    {
      id: 'challenge-ra3-2',
      title: 'Reto 2: Generador Estadístico de Tiradas en Rango con Math',
      difficulty: 'Básico',
      topicTag: 'Objeto Nativo Math',
      type: 'variable',
      targetVars: ['sumaTotal', 'mediaAritmetica', 'tiradasGeneradas'],
      instructions: `Simula el lanzamiento controlado de un dado o generación de números enteros pseudoaleatorios dentro de un rango utilizando el objeto nativo <code>Math</code>:
      <ul>
        <li>Dadas las entradas: <code>limiteMin</code>, <code>limiteMax</code> y <code>cantidadTiradas</code>.</li>
        <li>Genera exactamente <code>cantidadTiradas</code> números enteros aleatorios uniformemente distribuidos en el rango cerrado <code>[limiteMin, limiteMax]</code> (ambos límites inclusive) mediante la fórmula oficial con <code>Math.floor</code> y <code>Math.random</code>.</li>
        <li>Guarda los números en el array <code>tiradasGeneradas</code>.</li>
        <li>Calcula la <code>sumaTotal</code> de todos los valores generados.</li>
        <li>Calcula la <code>mediaAritmetica</code> redondeada a 2 decimales (como tipo <code>number</code>, usando <code>Number((sumaTotal / cantidadTiradas).toFixed(2))</code>). Si <code>cantidadTiradas</code> es 0, la suma y la media deben ser 0.</li>
      </ul>`,
      starterCode: `// Variables de entrada:
let limiteMin = 1;
let limiteMax = 6;
let cantidadTiradas = 5;

// Variables de resultado:
let tiradasGeneradas = [];
let sumaTotal = 0;
let mediaAritmetica = 0;

// TODO: Genera las tiradas en el rango [limiteMin, limiteMax] y calcula suma y media:


console.log("Tiradas:", tiradasGeneradas);
console.log("Suma Total:", sumaTotal, "| Media:", mediaAritmetica);`,
      hint: 'Usa la fórmula: Math.floor(Math.random() * (limiteMax - limiteMin + 1)) + limiteMin dentro de un bucle de 0 a cantidadTiradas.',
      tests: [
        {
          name: 'Genera exactamente la cantidad de tiradas pedida dentro de los límites',
          inputs: { limiteMin: 1, limiteMax: 6, cantidadTiradas: 6 },
          customCheck: (outputs) => {
            const { tiradasGeneradas, sumaTotal, mediaAritmetica } = outputs;
            if (!Array.isArray(tiradasGeneradas) || tiradasGeneradas.length !== 6) return false;
            const todosEnRango = tiradasGeneradas.every(n => Number.isInteger(n) && n >= 1 && n <= 6);
            if (!todosEnRango) return false;
            const sumaReal = tiradasGeneradas.reduce((a, b) => a + b, 0);
            if (sumaTotal !== sumaReal) return false;
            const mediaReal = Number((sumaReal / 6).toFixed(2));
            return Math.abs(mediaAritmetica - mediaReal) < 0.01;
          },
          customError: 'Las tiradas deben ser números enteros entre 1 y 6, y la suma/media deben coincidir con los números generados.'
        },
        {
          name: 'Para límites idénticos (min = max = 10) todas las tiradas son 10',
          inputs: { limiteMin: 10, limiteMax: 10, cantidadTiradas: 4 },
          expected: {
            tiradasGeneradas: [10, 10, 10, 10],
            sumaTotal: 40,
            mediaAritmetica: 10
          }
        },
        {
          name: 'Maneja cantidadTiradas = 0 devolviendo array vacío y 0 en métricas',
          inputs: { limiteMin: 5, limiteMax: 15, cantidadTiradas: 0 },
          expected: {
            tiradasGeneradas: [],
            sumaTotal: 0,
            mediaAritmetica: 0
          }
        },
        {
          name: 'Rango de 1 tirada única en límites [50, 100]',
          inputs: { limiteMin: 50, limiteMax: 100, cantidadTiradas: 1 },
          customCheck: (outputs) => {
            const { tiradasGeneradas, sumaTotal, mediaAritmetica } = outputs;
            return tiradasGeneradas.length === 1 &&
                   tiradasGeneradas[0] >= 50 && tiradasGeneradas[0] <= 100 &&
                   sumaTotal === tiradasGeneradas[0] &&
                   mediaAritmetica === tiradasGeneradas[0];
          },
          customError: 'Una única tirada debe ser un entero en el rango [50, 100].'
        }
      ]
    },

    {
      id: 'challenge-ra3-3',
      title: 'Reto 3: Calculador de Antigüedad y Diferencia en Días con Date',
      difficulty: 'Medio',
      topicTag: 'Objeto Nativo Date',
      type: 'variable',
      targetVars: ['diasDiferencia', 'estaVencido', 'diaSemanaInicio'],
      instructions: `Gestiona plazos administrativos de convocatorias y entregas en FP utilizando el objeto nativo <code>Date</code>:
      <ul>
        <li>Dadas dos cadenas de fecha en formato ISO: <code>fechaInicioStr</code> y <code>fechaFinStr</code> (ej: <code>"2026-09-01"</code>).</li>
        <li>Instancia sendos objetos <code>Date</code> a partir de dichas cadenas.</li>
        <li>Calcula los días naturales completos de diferencia absoluta entre ambas fechas y guárdalo en <code>diasDiferencia</code> (usando la diferencia de milisegundos con <code>Math.round(Math.abs(fFin - fInicio) / (1000 * 60 * 60 * 24))</code>).</li>
        <li>Determina si la fecha de inicio es estrictamente posterior a la fecha de fin y asígnalo al booleano <code>estaVencido</code> (es decir, <code>fInicio.getTime() > fFin.getTime()</code>).</li>
        <li>Asigna a <code>diaSemanaInicio</code> el nombre del día de la semana de la fecha de inicio en español: <code>"domingo"</code>, <code>"lunes"</code>, <code>"martes"</code>, <code>"miércoles"</code>, <code>"jueves"</code>, <code>"viernes"</code> o <code>"sábado"</code> (recuerda que <code>getDay()</code> devuelve 0 para domingo, 1 para lunes, etc.).</li>
      </ul>`,
      starterCode: `// Variables de entrada:
let fechaInicioStr = "2026-09-01";
let fechaFinStr = "2026-09-11";

// Variables de resultado:
let diasDiferencia = 0;
let estaVencido = false;
let diaSemanaInicio = "";

// TODO: Instancia los objetos Date, calcula días de diferencia, vencimiento y día de la semana:


console.log("Días de diferencia:", diasDiferencia);
console.log("¿Está vencido?:", estaVencido);
console.log("Día de inicio:", diaSemanaInicio);`,
      hint: 'Milisegundos en un día: 1000 * 60 * 60 * 24 = 86400000. Mapea getDay() con un array ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"].',
      tests: [
        {
          name: 'Calcula 10 días entre 01/09/2026 (martes) y 11/09/2026',
          inputs: { fechaInicioStr: "2026-09-01", fechaFinStr: "2026-09-11" },
          expected: {
            diasDiferencia: 10,
            estaVencido: false,
            diaSemanaInicio: "martes"
          }
        },
        {
          name: 'Detecta vencido si fecha de inicio es posterior a la de fin',
          inputs: { fechaInicioStr: "2026-10-15", fechaFinStr: "2026-10-05" },
          expected: {
            diasDiferencia: 10,
            estaVencido: true,
            diaSemanaInicio: "jueves"
          }
        },
        {
          name: 'Mismo día resulta en 0 días de diferencia y no vencido',
          inputs: { fechaInicioStr: "2026-06-07", fechaFinStr: "2026-06-07" },
          expected: {
            diasDiferencia: 0,
            estaVencido: false,
            diaSemanaInicio: "domingo"
          }
        },
        {
          name: 'Diferencia a través de cambio de año (31 días entre 1 dic y 1 ene)',
          inputs: { fechaInicioStr: "2026-12-01", fechaFinStr: "2027-01-01" },
          expected: {
            diasDiferencia: 31,
            estaVencido: false,
            diaSemanaInicio: "martes"
          }
        }
      ]
    },

    {
      id: 'challenge-ra3-4',
      title: 'Reto 4: Validador Estricto de Códigos Postales con RegExp',
      difficulty: 'Medio',
      topicTag: 'Expresiones Regulares (RegExp)',
      type: 'variable',
      targetVars: ['esValido', 'codigoProvincia', 'esMurcia'],
      instructions: `La validación de datos de entrada es un criterio fundamental del RA3 y RA5 en DAW. Valida un código postal español según la normativa postal oficial:
      <ul>
        <li>Dada la variable <code>codigoPostal</code> (de tipo string).</li>
        <li>Un código postal de España es válido si y solo si:
          <ul>
            <li>Consta de exactamente 5 dígitos numéricos (anclado con <code>^</code> y <code>$</code>).</li>
            <li>Los dos primeros dígitos representan una provincia española válida, que comprende desde el <code>01</code> hasta el <code>52</code> (las provincias 00 o superiores a 52 no existen).</li>
          </ul>
        </li>
        <li>Asigna a <code>esValido</code> un booleano (<code>true</code> o <code>false</code>) indicando si cumple la especificación.</li>
        <li>Si es válido:
          <ul>
            <li>Asigna a <code>codigoProvincia</code> los dos primeros caracteres (ej: <code>"30"</code>).</li>
            <li>Asigna a <code>esMurcia</code> <code>true</code> si el código de provincia es estrictamente <code>"30"</code> (Región de Murcia), o <code>false</code> en caso contrario.</li>
          </ul>
        </li>
        <li>Si no es válido: asigna a <code>codigoProvincia</code> la cadena <code>""</code> y a <code>esMurcia</code> el valor <code>false</code>.</li>
      </ul>`,
      starterCode: `// Variable de entrada:
let codigoPostal = "30008";

// Variables de resultado:
let esValido = false;
let codigoProvincia = "";
let esMurcia = false;

// TODO: Valida el código postal mediante RegExp y extrae la provincia:


console.log("¿Es válido?:", esValido);
console.log("Código de provincia:", codigoProvincia, "| ¿Es Murcia?:", esMurcia);`,
      hint: 'Puedes usar una expresión regular como /^(0[1-9]|[1-4][0-9]|5[0-2])\\d{3}$/. Si test() es true, codigoProvincia = codigoPostal.substring(0, 2).',
      tests: [
        {
          name: 'Código postal 30008 de Murcia es válido y se identifica',
          inputs: { codigoPostal: "30008" },
          expected: {
            esValido: true,
            codigoProvincia: "30",
            esMurcia: true
          }
        },
        {
          name: 'Código postal 28013 de Madrid es válido y no es Murcia',
          inputs: { codigoPostal: "28013" },
          expected: {
            esValido: true,
            codigoProvincia: "28",
            esMurcia: false
          }
        },
        {
          name: 'Provincia 00999 es inválida (00 no existe)',
          inputs: { codigoPostal: "00999" },
          expected: {
            esValido: false,
            codigoProvincia: "",
            esMurcia: false
          }
        },
        {
          name: 'Provincia 60123 es inválida (máximo oficial es 52)',
          inputs: { codigoPostal: "60123" },
          expected: {
            esValido: false,
            codigoProvincia: "",
            esMurcia: false
          }
        }
      ]
    },

    {
      id: 'challenge-ra3-5',
      title: 'Reto 5: Enmascarador de Datos Sensibles con RegExp y Replace',
      difficulty: 'Medio',
      topicTag: 'RegExp: Grupos y String.replace',
      type: 'variable',
      targetVars: ['emailEnmascarado', 'dominioExtraido'],
      instructions: `En cumplimiento del RGPD en aplicaciones cliente, es habitual anonimizar u ocultar datos personales sensibles antes de renderizarlos en pantalla:
      <ul>
        <li>Dada una dirección de correo electrónico en la variable <code>correoOriginal</code> (ej: <code>"profesor.javascript@campusfp.es"</code>).</li>
        <li>Utiliza una expresión regular con <strong>grupos de captura</strong> y el método <code>replace()</code>:
          <ul>
            <li>Extrae el nombre de usuario (antes de la <code>@</code>) y el dominio completo (después de la <code>@</code>).</li>
            <li>Enmascara el usuario dejando únicamente los <strong>dos primeros caracteres</strong> visibles, seguidos de exactamente tres asteriscos <code>***</code>.</li>
            <li>Si el usuario tiene 2 o menos caracteres, deja el primer carácter visible seguido de <code>***</code>.</li>
            <li>Une la parte enmascarada con el carácter <code>@</code> y el dominio original intacto en <code>emailEnmascarado</code>.</li>
            <li>Almacena el dominio limpio en la variable <code>dominioExtraido</code>.</li>
          </ul>
        </li>
        <li>Ejemplo: Para <code>"carlos@gmail.com"</code> produce <code>emailEnmascarado = "ca***@gmail.com"</code> y <code>dominioExtraido = "gmail.com"</code>.</li>
      </ul>`,
      starterCode: `// Variable de entrada:
let correoOriginal = "laura.garcia@murciaeduca.es";

// Variables de resultado:
let emailEnmascarado = "";
let dominioExtraido = "";

// TODO: Procesa correoOriginal con expresiones regulares para enmascarar el usuario:


console.log("Email enmascarado:", emailEnmascarado);
console.log("Dominio extraído:", dominioExtraido);`,
      hint: 'Puedes capturar con /^([^@]+)@(.+)$/. Luego toma los primeros 2 caracteres del usuario con slice(0, 2) y concatena "***@" + dominio.',
      tests: [
        {
          name: 'Enmascara correctamente correo corporativo largo',
          inputs: { correoOriginal: "laura.garcia@murciaeduca.es" },
          expected: {
            emailEnmascarado: "la***@murciaeduca.es",
            dominioExtraido: "murciaeduca.es"
          }
        },
        {
          name: 'Enmascara correo corto manteniendo 2 caracteres si tiene más de 2',
          inputs: { correoOriginal: "carlos@gmail.com" },
          expected: {
            emailEnmascarado: "ca***@gmail.com",
            dominioExtraido: "gmail.com"
          }
        },
        {
          name: 'Usuario de 2 caracteres muestra 1 carácter y asteriscos',
          inputs: { correoOriginal: "al@empresa.com" },
          expected: {
            emailEnmascarado: "a***@empresa.com",
            dominioExtraido: "empresa.com"
          }
        },
        {
          name: 'Dominio complejo con subdominios se preserva intacto',
          inputs: { correoOriginal: "admin@server01.dept.fp.org" },
          expected: {
            emailEnmascarado: "ad***@server01.dept.fp.org",
            dominioExtraido: "server01.dept.fp.org"
          }
        }
      ]
    },

    {
      id: 'challenge-ra3-6',
      title: 'Reto 6: Serializador Seguro y Filtro de Propiedades con JSON',
      difficulty: 'Avanzado',
      topicTag: 'Objeto Nativo JSON',
      type: 'variable',
      targetVars: ['jsonFiltrado', 'clavesExcluidasContadas', 'objetoRecuperado'],
      instructions: `La serialización de datos con <code>JSON.stringify()</code> admite un segundo parámetro opcional denominado <em>replacer</em> que permite transformar o excluir propiedades antes de emitir la cadena JSON:
      <ul>
        <li>Dada la variable <code>objetoUsuario</code> y el array de nombres de propiedades prohibidas <code>clavesProhibidas</code> (ej: <code>["password", "token", "apiKey"]</code>).</li>
        <li>Serializa <code>objetoUsuario</code> a JSON utilizando <code>JSON.stringify()</code> junto con una función <em>replacer</em>:
          <ul>
            <li>Si el nombre de la clave examinada está incluido en <code>clavesProhibidas</code>, la función debe devolver <code>undefined</code> para omitir la clave por completo del JSON.</li>
            <li>En caso contrario, devuelve el valor original.</li>
          </ul>
        </li>
        <li>Almacena la cadena JSON resultante en <code>jsonFiltrado</code>.</li>
        <li>Cuenta cuántas propiedades del objeto original fueron excluidas y guárdalo en <code>clavesExcluidasContadas</code>.</li>
        <li>Deserializa <code>jsonFiltrado</code> utilizando <code>JSON.parse()</code> y almacena el nuevo objeto seguro en <code>objetoRecuperado</code>.</li>
      </ul>`,
      starterCode: `// Variables de entrada:
let objetoUsuario = {
  id: 101,
  username: "alumnodaw",
  password: "SuperSecret123!",
  email: "alumno@fp.es",
  token: "eyJhbGciOi...",
  activo: true
};
let clavesProhibidas = ["password", "token"];

// Variables de resultado:
let jsonFiltrado = "";
let clavesExcluidasContadas = 0;
let objetoRecuperado = {};

// TODO: Serializa con función replacer omitiendo claves prohibidas y reconstruye:


console.log("JSON seguro:", jsonFiltrado);
console.log("Claves excluidas:", clavesExcluidasContadas);
console.log("Objeto seguro reconstruido:", objetoRecuperado);`,
      hint: 'La función replacer recibe (key, value). Si clavesProhibidas.includes(key) incrementa el contador y retorna undefined; si no, retorna value.',
      tests: [
        {
          name: 'Filtra password y token dejando intactas las propiedades seguras',
          inputs: {
            objetoUsuario: { id: 101, username: "alumnodaw", password: "123", email: "a@fp.es", token: "tok" },
            clavesProhibidas: ["password", "token"]
          },
          expected: {
            jsonFiltrado: '{"id":101,"username":"alumnodaw","email":"a@fp.es"}',
            clavesExcluidasContadas: 2,
            objetoRecuperado: { id: 101, username: "alumnodaw", email: "a@fp.es" }
          }
        },
        {
          name: 'Si no hay claves prohibidas coincidentes, conserva todas las propiedades',
          inputs: {
            objetoUsuario: { codigo: "0612", modulo: "DAW" },
            clavesProhibidas: ["secreto", "password"]
          },
          expected: {
            jsonFiltrado: '{"codigo":"0612","modulo":"DAW"}',
            clavesExcluidasContadas: 0,
            objetoRecuperado: { codigo: "0612", modulo: "DAW" }
          }
        },
        {
          name: 'Filtra clave sensible apiKey única',
          inputs: {
            objetoUsuario: { servicio: "OpenWeather", apiKey: "xyz-987", unidades: "metric" },
            clavesProhibidas: ["apiKey"]
          },
          expected: {
            jsonFiltrado: '{"servicio":"OpenWeather","unidades":"metric"}',
            clavesExcluidasContadas: 1,
            objetoRecuperado: { servicio: "OpenWeather", unidades: "metric" }
          }
        },
        {
          name: 'Maneja objeto vacío sin errores',
          inputs: {
            objetoUsuario: {},
            clavesProhibidas: ["token"]
          },
          expected: {
            jsonFiltrado: '{}',
            clavesExcluidasContadas: 0,
            objetoRecuperado: {}
          }
        }
      ]
    },

    {
      id: 'challenge-ra3-7',
      title: 'Reto 7: Gestor de Preferencias y Carrito con Web Storage y Serialización JSON',
      difficulty: 'Medio',
      topicTag: 'BOM: Web Storage (localStorage, sessionStorage) y JSON',
      type: 'variable',
      targetVars: ['jsonSerializado', 'recuperado', 'tipoDatoRecuperado', 'existeClave'],
      instructions: `La persistencia en cliente con Web Storage (localStorage y sessionStorage) requiere serializar objetos y arrays mediante <code>JSON.stringify()</code> para no corromper la información en <code>"[object Object]"</code>:
      <ul>
        <li>Dadas las variables de entrada:
          <ul>
            <li><code>clave</code>: Nombre o clave bajo la que persistir (string).</li>
            <li><code>datos</code>: Objeto o estructura de datos JavaScript a guardar.</li>
            <li><code>usarSession</code>: Booleano que indica el almacén de destino (<code>true</code> para <code>sessionStorage</code>, <code>false</code> para <code>localStorage</code>).</li>
          </ul>
        </li>
        <li>Selecciona el almacén correspondiente (<code>sessionStorage</code> si <code>usarSession</code> es true, o <code>localStorage</code> en caso contrario).</li>
        <li>Serializa el objeto <code>datos</code> a formato JSON y guárdalo en la variable <code>jsonSerializado</code>.</li>
        <li>Guarda la cadena <code>jsonSerializado</code> en el almacén seleccionado bajo la <code>clave</code> indicada usando <code>storage.setItem()</code>.</li>
        <li>Verifica si la clave existe en el almacén mediante <code>storage.getItem(clave) !== null</code> y asigna el resultado a <code>existeClave</code>.</li>
        <li>Recupera el texto almacenado con <code>storage.getItem(clave)</code>, parsea el resultado con <code>JSON.parse()</code> y asígnalo a <code>recuperado</code>.</li>
        <li>Asigna a <code>tipoDatoRecuperado</code> el tipo devuelto por <code>typeof recuperado</code>.</li>
      </ul>`,
      starterCode: `// Variables de entrada:
let clave = "preferencias_docente";
let datos = { usuario: "Raúl", tema: "dark", modulos: ["DWEC", "DAW"] };
let usarSession = false;

// Variables de resultado:
let jsonSerializado = "";
let recuperado = null;
let tipoDatoRecuperado = "";
let existeClave = false;

// TODO:
// 1. Selecciona sessionStorage si usarSession es true, de lo contrario localStorage.
// 2. Serializa 'datos' con JSON.stringify() en 'jsonSerializado'.
// 3. Guarda 'jsonSerializado' en el storage seleccionado bajo la 'clave'.
// 4. Comprueba con storage.getItem(clave) !== null y asígnalo a 'existeClave'.
// 5. Lee el valor con storage.getItem(clave), parsea con JSON.parse() y guárdalo en 'recuperado'.
// 6. Asigna 'typeof recuperado' a 'tipoDatoRecuperado'.


console.log("JSON serializado:", jsonSerializado);
console.log("¿Existe clave en Storage?:", existeClave);
console.log("Objeto recuperado:", recuperado);
console.log("Tipo:", tipoDatoRecuperado);`,
      hint: 'Define const storage = usarSession ? sessionStorage : localStorage; luego usa JSON.stringify(datos) para setItem, y JSON.parse(storage.getItem(clave)) para recuperarlo.',
      tests: [
        {
          name: 'Almacena y recupera preferencias estructuradas en localStorage',
          inputs: {
            clave: "user_prefs",
            datos: { tema: "dark", fontSize: 16, modulos: ["DWEC", "DAW"] },
            usarSession: false
          },
          expected: {
            jsonSerializado: '{"tema":"dark","fontSize":16,"modulos":["DWEC","DAW"]}',
            recuperado: { tema: "dark", fontSize: 16, modulos: ["DWEC", "DAW"] },
            tipoDatoRecuperado: "object",
            existeClave: true
          }
        },
        {
          name: 'Almacena token y expiración en sessionStorage',
          inputs: {
            clave: "auth_token",
            datos: { token: "jwt-xyz-789", expira: 1726000000 },
            usarSession: true
          },
          expected: {
            jsonSerializado: '{"token":"jwt-xyz-789","expira":1726000000}',
            recuperado: { token: "jwt-xyz-789", expira: 1726000000 },
            tipoDatoRecuperado: "object",
            existeClave: true
          }
        },
        {
          name: 'Preserva arrays complejos de elementos de carrito',
          inputs: {
            clave: "carrito_compra",
            datos: [{ item: "Portátil", precio: 850 }, { item: "Ratón", precio: 25 }],
            usarSession: false
          },
          expected: {
            jsonSerializado: '[{"item":"Portátil","precio":850},{"item":"Ratón","precio":25}]',
            recuperado: [{ item: "Portátil", precio: 850 }, { item: "Ratón", precio: 25 }],
            tipoDatoRecuperado: "object",
            existeClave: true
          }
        }
      ]
    },

    {
      id: 'challenge-ra3-8',
      title: 'Reto 8 (Mini-Proyecto): Analizador y Perfilador de Entorno de Cliente (BOM Profiler)',
      difficulty: 'Avanzado',
      topicTag: 'BOM Integral (Screen, Location, Navigator)',
      type: 'variable',
      targetVars: ['perfilCliente', 'puntuacionModernidad'],
      instructions: `Como proyecto integrador del Resultado de Aprendizaje 3, construye un diagnosticador de capacidades del cliente web a partir de los subobjetos del BOM:
      <ul>
        <li>Dadas las entradas que simulan los datos del entorno: <code>anchoPantalla</code>, <code>altoPantalla</code>, <code>urlNavegador</code>, <code>idiomaNavegador</code> y <code>esConexionSegura</code>.</li>
        <li>Genera en <code>perfilCliente</code> un objeto con las siguientes propiedades calculadas:
          <ul>
            <li><code>tipoDispositivo</code>: <code>"movil"</code> si <code>anchoPantalla &lt; 768</code>, <code>"tablet"</code> si <code>anchoPantalla &gt;= 768 && anchoPantalla &lt; 1024</code>, o <code>"escritorio"</code> si es mayor o igual a 1024.</li>
            <li><code>resolucion</code>: Cadena formateada <code>"\${anchoPantalla}x\${altoPantalla}"</code>.</li>
            <li><code>orientacion</code>: <code>"horizontal"</code> si <code>anchoPantalla &gt;= altoPantalla</code>, o <code>"vertical"</code> si el alto supera al ancho.</li>
            <li><code>idiomaPrincipal</code>: Los 2 primeros caracteres en minúsculas de <code>idiomaNavegador</code> (ej: <code>"es"</code> de <code>"es-ES"</code>).</li>
            <li><code>esHttps</code>: Booleano exactamente igual a <code>esConexionSegura</code>.</li>
            <li><code>protocolo</code>: Si <code>esConexionSegura</code> es <code>true</code> asigna <code>"https:"</code>, de lo contrario <code>"http:"</code>.</li>
          </ul>
        </li>
        <li>Calcula una <code>puntuacionModernidad</code> numérica (de 0 a 100):
          <ul>
            <li>Base inicial: 50 puntos.</li>
            <li>Suma 25 puntos si <code>esConexionSegura</code> es <code>true</code>.</li>
            <li>Suma 15 puntos si <code>anchoPantalla &gt;= 1920</code> (pantalla Full HD o superior).</li>
            <li>Suma 10 puntos si el idioma contiene guión separador regional (ej: <code>"es-ES"</code>).</li>
          </ul>
        </li>
      </ul>`,
      starterCode: `// Variables de entrada que simulan el entorno BOM:
let anchoPantalla = 1920;
let altoPantalla = 1080;
let urlNavegador = "https://aulavirtual.fp.es/dashboard";
let idiomaNavegador = "es-ES";
let esConexionSegura = true;

// Variables de resultado:
let perfilCliente = {};
let puntuacionModernidad = 0;

// TODO: Construye el objeto perfilCliente y calcula puntuacionModernidad:


console.log("Perfil del cliente BOM generado:", perfilCliente);
console.log("Puntuación de modernidad:", puntuacionModernidad);`,
      hint: 'Usa condicionales para tipoDispositivo (móvil < 768, tablet 768-1023, escritorio >= 1024) y calcula la puntuación acumulando sobre 50 con las condiciones indicadas.',
      tests: [
        {
          name: 'Entorno de escritorio Full HD seguro con idioma regional obtiene 100 puntos',
          inputs: {
            anchoPantalla: 1920,
            altoPantalla: 1080,
            urlNavegador: "https://campus.es",
            idiomaNavegador: "es-ES",
            esConexionSegura: true
          },
          expected: {
            perfilCliente: {
              tipoDispositivo: "escritorio",
              resolucion: "1920x1080",
              orientacion: "horizontal",
              idiomaPrincipal: "es",
              esHttps: true,
              protocolo: "https:"
            },
            puntuacionModernidad: 100
          }
        },
        {
          name: 'Dispositivo móvil en vertical con conexión insegura',
          inputs: {
            anchoPantalla: 390,
            altoPantalla: 844,
            urlNavegador: "http://prueba.local",
            idiomaNavegador: "en-US",
            esConexionSegura: false
          },
          expected: {
            perfilCliente: {
              tipoDispositivo: "movil",
              resolucion: "390x844",
              orientacion: "vertical",
              idiomaPrincipal: "en",
              esHttps: false,
              protocolo: "http:"
            },
            puntuacionModernidad: 60 // 50 base + 0 https + 0 resolucion + 10 idioma regional
          }
        },
        {
          name: 'Tablet en orientación horizontal',
          inputs: {
            anchoPantalla: 820,
            altoPantalla: 600,
            urlNavegador: "https://plataforma.edu",
            idiomaNavegador: "fr",
            esConexionSegura: true
          },
          expected: {
            perfilCliente: {
              tipoDispositivo: "tablet",
              resolucion: "820x600",
              orientacion: "horizontal",
              idiomaPrincipal: "fr",
              esHttps: true,
              protocolo: "https:"
            },
            puntuacionModernidad: 75 // 50 base + 25 https + 0 res + 0 idioma
          }
        },
        {
          name: 'Monitor ultrawide 4K (2560x1440) seguro',
          inputs: {
            anchoPantalla: 2560,
            altoPantalla: 1440,
            urlNavegador: "https://lab.es",
            idiomaNavegador: "de-DE",
            esConexionSegura: true
          },
          expected: {
            perfilCliente: {
              tipoDispositivo: "escritorio",
              resolucion: "2560x1440",
              orientacion: "horizontal",
              idiomaPrincipal: "de",
              esHttps: true,
              protocolo: "https:"
            },
            puntuacionModernidad: 100
          }
        }
      ]
    }
  ]
};
