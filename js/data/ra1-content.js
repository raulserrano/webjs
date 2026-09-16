/**
 * CONTENIDO DIDÁCTICO INTEGRAL: RESULTADO DE APRENDIZAJE 1 (RA1)
 * Módulo: Desarrollo Web en Entorno Cliente (0612) - FP DAW (Ciclo Superior)
 * Criterios de evaluación oficiales a) hasta f) según currículo oficial.
 * 
 * Enfoque didáctico: Claro, accesible, ameno y adaptado a las necesidades de aprendizaje
 * de los estudiantes de FP, evitando jerga innecesaria de bajo nivel y centrándose
 * en conceptos clave, buenas prácticas y preparación de exámenes.
 */

export const RA1_CONTENT = {
  id: 'ra1',
  title: 'Arquitecturas y Tecnologías de Programación sobre Clientes Web',
  duration: '10 Horas lectivas',
  officialCode: 'RA1 - Criterios a-f',

  // =========================================================================
  // LISTA DE SUBTEMAS DIDÁCTICOS (APARTADOS 1 AL 7)
  // =========================================================================
  topics: [
    {
      id: 'modelos-cliente-servidor',
      title: '1. Modelos de Ejecución Cliente/Servidor y Arquitecturas Web',
      criteriaRef: 'Criterio a)',
      description: 'Cómo se comunican el navegador y el servidor, el reparto de responsabilidades entre ambos y la evolución desde las páginas tradicionales hasta las aplicaciones modernas (SPAs).',
      theoryHtml: `
        <p>Cualquier aplicación web actual funciona mediante el <strong>modelo cliente/servidor</strong>. En este esquema, dos partes con funciones muy claras se comunican a través de internet usando peticiones y respuestas mediante el protocolo seguro <strong>HTTPS</strong>:</p>

        <div class="code-runner-widget" style="margin: 16px 0; background: var(--bg-surface-2); border: var(--border-subtle); padding: 16px; border-radius: var(--radius-lg);">
          <div style="font-family: var(--font-code); font-size: 0.85rem; line-height: 1.6; color: var(--text-primary);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: 10px;">
              <span style="font-weight: 700; color: var(--color-brand);">[ CLIENTE: Navegador Web ]</span>
              <span style="color: var(--color-cyan); font-size: 0.75rem;">Internet (HTTP/HTTPS)</span>
              <span style="font-weight: 700; color: var(--color-brand);">[ SERVIDOR: Backend y Base de Datos ]</span>
            </div>
            <div>1. Usuario escribe una dirección web &nbsp;&nbsp;─── (Petición HTTP) ──────► &nbsp;Recibe la solicitud y busca los archivos</div>
            <div>2. Recibe los archivos iniciales &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◄── (Respuesta con HTML/CSS/JS) &nbsp;Envía la página básica</div>
            <div>3. El navegador procesa y dibuja &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Usa la CPU y memoria del usuario</div>
            <div>4. Pide solo datos nuevos (asíncrono) &nbsp;─── (Petición Fetch / JSON) ──► &nbsp;Consulta la base de datos de forma segura</div>
            <div>5. Actualiza la pantalla al instante &nbsp;&nbsp;&nbsp;&nbsp;◄── (Responde con datos puros) &nbsp;Envía solo los datos necesarios</div>
          </div>
        </div>

        <h4>A. Reparto de Tareas: ¿Qué hace el Servidor y qué hace el Cliente?</h4>
        <p>Una de las primeras decisiones al crear una aplicación web es decidir dónde se ejecuta cada parte del trabajo:</p>
        <ul>
          <li><strong>El Servidor (Backend)</strong>:
            <ul>
              <li><em>Su trabajo principal</em>: Es la "caja fuerte" del sistema. Se encarga de guardar y consultar la base de datos, comprobar usuarios y contraseñas, procesar pagos y garantizar que nadie modifique datos sin permiso.</li>
              <li><em>Ventajas</em>: Es un entorno 100% seguro y controlado por nosotros. Nadie desde fuera puede ver ni alterar el código que se ejecuta en el servidor.</li>
              <li><em>Inconvenientes</em>: Cada vez que el servidor tiene que responder a algo, hay un pequeño tiempo de espera a través de la red (latencia). Si millones de usuarios hacen peticiones a la vez, el servidor puede saturarse.</li>
            </ul>
          </li>
          <li><strong>El Cliente (Frontend - El Navegador)</strong>:
            <ul>
              <li><em>Su trabajo principal</em>: Es la "cara visible". Muestra la interfaz gráfica, responde a los clics del usuario, anima elementos y comprueba de forma inmediata si un formulario tiene datos válidos (por ejemplo, si un email tiene una arroba).</li>
              <li><em>Ventajas</em>: Aprovecha el procesador y la memoria del ordenador o móvil del propio usuario. Ofrece una respuesta instantánea sin parpadeos ni esperas de red.</li>
              <li><em>Inconvenientes</em>: Es un entorno que no podemos controlar ni considerar seguro. Cualquier persona puede abrir las herramientas del navegador, ver el código JavaScript o manipular peticiones. Por eso, <strong>la seguridad real siempre debe verificarse en el servidor</strong>.</li>
            </ul>
          </li>
        </ul>

        <h4>B. Evolución de las Aplicaciones Web</h4>
        <p>A lo largo de los años, la forma de navegar y estructurar las páginas web ha ido mejorando notablemente:</p>
        <ol>
          <li><strong>Web Tradicional (Páginas clásicas)</strong>:
            <p>Cada vez que hacías clic en un enlace o enviabas un formulario, el navegador pedía una página completa nueva al servidor. La pantalla se quedaba en blanco un instante y se volvía a cargar todo desde cero. Esto resultaba más lento e incómodo para el usuario.</p>
          </li>
          <li><strong>SPAs (Single-Page Applications / Aplicaciones de una sola página)</strong>:
            <p>Es el modelo utilizado por aplicaciones populares como Gmail, Spotify o Twitter. El navegador descarga una sola página básica al inicio y, a partir de ese momento, JavaScript se encarga de cambiar lo que ves en pantalla pidiendo solo los datos necesarios (en formato JSON). <em>Ventaja:</em> La navegación es instantánea y fluida, como si fuera una app instalada en el ordenador.</p>
          </li>
          <li><strong>Webs Modernas Híbridas</strong>:
            <p>Frameworks actuales (como Next.js o Astro) combinan lo mejor de ambos mundos: envían la primera página ya preparada desde el servidor para que aparezca muy rápido y posicione bien en Google (SEO), y luego activan JavaScript para que el usuario disfrute de la máxima interactividad.</p>
          </li>
        </ol>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica de Examen FP (DAW)',
        text: 'En una aplicación web, ¿por qué es obligatorio validar los datos de un formulario tanto en el cliente con JavaScript como en el servidor con el backend?<br><br><strong>Respuesta didáctica:</strong> Validar en el cliente sirve para <em>mejorar la experiencia del usuario</em>, avisándole al instante si ha olvidado un campo sin tener que esperar a internet. Pero <strong>nunca garantiza seguridad</strong>, ya que un atacante puede saltarse el navegador y enviar datos fraudulentos directamente. La validación en el servidor es la única que protege con total seguridad la base de datos.'
      },
      examples: [
        {
          id: 'ex-latencia-red',
          title: 'Simulación: Rapidez del Cómputo en el Navegador vs Espera de Red',
          description: 'Comprueba con este ejemplo cómo filtrar miles de elementos directamente en tu navegador es prácticamente instantáneo comparado con esperar una respuesta por internet.',
          initialCode: `// 1. Procesamiento directo en el navegador (memoria RAM del equipo del usuario):
const inicioTiempo = performance.now();

// Creamos una lista simulada de 10.000 alumnos en memoria:
const alumnos = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  nombre: "Estudiante DAW " + (i + 1),
  nota: Math.round((Math.random() * 10) * 10) / 10
}));

// Filtramos los aprobados inmediatamente con JavaScript:
const aprobados = alumnos.filter(a => a.nota >= 5.0);
const finTiempo = performance.now();
const tiempoLocalMs = (finTiempo - inicioTiempo).toFixed(2);

console.log("=== PROCESAMIENTO DIRECTO EN EL CLIENTE ===");
console.log("Total alumnos aprobados encontrados:", aprobados.length);
console.log("Tiempo que ha tardado tu navegador:", tiempoLocalMs + " ms");

// 2. Comparación con el tiempo medio que tardaría una petición por internet:
const tiempoEsperaInternetMs = 120; // 120 ms de ida y vuelta habitual en WiFi/4G
const vecesMasRapido = (tiempoEsperaInternetMs / Math.max(parseFloat(tiempoLocalMs), 0.1)).toFixed(0);

console.log("\\n=== COMPARATIVA CON INTERNET ===");
console.log("Tiempo estimado de una petición HTTP ida y vuelta:", tiempoEsperaInternetMs + " ms");
console.log("¡Tu navegador filtró los datos unas " + vecesMasRapido + " veces más rápido que esperar a la red!");
console.log("Por esta razón las aplicaciones modernas realizan filtros y búsquedas en el cliente.");`
        }
      ]
    },

    {
      id: 'motores-y-anatomia-navegador',
      title: '2. Anatomía de los Navegadores y Motores de Ejecución',
      criteriaRef: 'Criterio b)',
      description: 'Estructura básica de un navegador web, la diferencia entre pintar la pantalla y ejecutar JavaScript, y cómo los motores modernos ejecutan el código a toda velocidad.',
      theoryHtml: `
        <p>Un navegador web actual no es un simple programa para ver texto, sino una completa plataforma capaz de ejecutar aplicaciones avanzadas. Para entenderlo, conviene conocer sus partes esenciales:</p>

        <h4>A. Las Partes Principales de un Navegador</h4>
        <ul>
          <li><strong>Interfaz de Usuario</strong>: Lo que ves alrededor de la web: la barra de direcciones, botones de avanzar/retroceder, pestañas y marcadores.</li>
          <li><strong>Motor de Renderizado (o de Maquetación)</strong>: Se encarga del <em>diseño visual</em>. Lee el código HTML y CSS y calcula dónde va cada caja, color y texto para dibujarlo en pantalla.</li>
          <li><strong>Motor de JavaScript</strong>: Es el "cerebro lógico". Lee tu código JavaScript y lo transforma en instrucciones que el procesador del ordenador entiende para que todo funcione.</li>
          <li><strong>Módulo de Red</strong>: Gestiona las conexiones a internet, descargando archivos mediante HTTP/HTTPS.</li>
          <li><strong>Almacenamiento Local</strong>: Permite guardar datos directamente en el navegador del usuario (como cookies, <code>localStorage</code> o <code>sessionStorage</code>) para no perder información al cerrar la pestaña.</li>
        </ul>

        <h4>B. Los Principales Motores del Mercado</h4>
        <p>Cada navegador utiliza un motor de renderizado y un motor de JavaScript específicos:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: var(--bg-surface-3); border-bottom: 2px solid var(--border-subtle); text-align: left;">
              <th style="padding: 10px;">Navegador</th>
              <th style="padding: 10px;">Motor de Renderizado (HTML/CSS)</th>
              <th style="padding: 10px;">Motor de JavaScript</th>
              <th style="padding: 10px;">Creador / Uso Clave</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 10px;"><strong>Google Chrome / MS Edge</strong></td>
              <td style="padding: 10px;">Blink</td>
              <td style="padding: 10px;"><strong>V8</strong></td>
              <td style="padding: 10px;">Google (también usado en Node.js)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 10px;"><strong>Mozilla Firefox</strong></td>
              <td style="padding: 10px;">Gecko</td>
              <td style="padding: 10px;"><strong>SpiderMonkey</strong></td>
              <td style="padding: 10px;">Mozilla (el primer motor de la historia)</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Apple Safari</strong></td>
              <td style="padding: 10px;">WebKit</td>
              <td style="padding: 10px;"><strong>JavaScriptCore (Nitro)</strong></td>
              <td style="padding: 10px;">Apple (usado en iPhone, iPad y Mac)</td>
            </tr>
          </tbody>
        </table>

        <h4>C. ¿Cómo Ejecuta el Navegador Nuestro Código JavaScript?</h4>
        <p>En los orígenes de la web, JavaScript era un lenguaje puramente <em>interpretado</em>: el navegador leía el código línea a línea y lo ejecutaba poco a poco, lo cual era lento.</p>
        <p>Hoy en día, motores modernos como <strong>V8</strong> utilizan una técnica inteligente llamada <strong>Compilación en Tiempo Real (JIT - Just-In-Time)</strong>:</p>
        <ol>
          <li><strong>Lectura inicial rápida</strong>: El motor lee tu código y empieza a ejecutarlo inmediatamente sin hacer esperar al usuario.</li>
          <li><strong>Vigilancia de código frecuente</strong>: Mientras el programa funciona, el motor observa qué funciones se ejecutan muchas veces (por ejemplo, funciones dentro de un bucle o cálculos matemáticos).</li>
          <li><strong>Optimización sobre la marcha (JIT)</strong>: Esas funciones frecuentes se traducen directamente a código máquina ultrarrápido adaptado al procesador del equipo, logrando que la aplicación vaya a máxima velocidad.</li>
        </ol>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Consejo Práctico para Programar Mejor en JavaScript',
        text: 'Los motores como V8 optimizan mejor el código cuando es <strong>predecible</strong>. Por ejemplo, si creas una función que suma números, evita pasarle a veces textos o estructuras extrañas. Cuando los tipos de datos son consistentes, el motor del navegador mantiene el código optimizado a la máxima velocidad posible.'
      },
      examples: [
        {
          id: 'ex-navigator-inspection',
          title: 'Inspección de las Capacidades del Navegador (API Navigator)',
          description: 'Averigua qué datos y capacidades expone tu propio navegador usando la API estándar de JavaScript.',
          initialCode: `// Consultamos información del entorno cliente mediante el objeto navigator
console.log("=== DATOS DE ESTE NAVEGADOR (NAVIGATOR API) ===");
console.log("Navegador detectado:", navigator.userAgent);
console.log("Idioma preferido del usuario:", navigator.language);
console.log("¿Está conectado a Internet?:", navigator.onLine ? "SÍ (Online)" : "NO (Sin conexión)");
console.log("¿Tiene cookies activadas?:", navigator.cookieEnabled ? "SÍ" : "NO");

// Capacidad del equipo (hilos lógicos del procesador):
if (navigator.hardwareConcurrency) {
  console.log("Núcleos de procesador disponibles para tareas:", navigator.hardwareConcurrency);
}

// Comprobación de velocidad de carga:
console.log("\\nTiempo transcurrido desde que se abrió la página:");
console.log(performance.now().toFixed(2) + " milisegundos");`
        }
      ]
    },

    {
      id: 'event-loop-concurrencia',
      title: '3. ¿Cómo Gestiona JavaScript Varias Tareas a la Vez? Asincronía y el Event Loop',
      criteriaRef: 'Criterio b)',
      description: 'Por qué JavaScript hace una sola cosa a la vez, cómo el navegador le ayuda a no congelar la pantalla y cómo funciona el Event Loop de forma sencilla.',
      theoryHtml: `
        <p>Una de las curiosidades más importantes de JavaScript es que es un lenguaje <strong>monohilo (Single-Thread)</strong>. Esto significa que cuenta con <strong>un único hilo principal de ejecución</strong>: solo puede realizar <em>una sola acción a la vez</em>.</p>
        <p>Si solo puede hacer una cosa a la vez, ¿por qué una página no se congela cuando descarga una foto grande o pide datos a un servidor? La clave está en la <strong>Asincronía</strong> y en el <strong>Event Loop (Bucle de Eventos)</strong>.</p>

        <h4>A. La Analogía del Cocinero</h4>
        <p>Imagina que JavaScript es un <strong>cocinero con una única sartén</strong> (la Pila de Ejecución o <em>Call Stack</em>):</p>
        <ul>
          <li>Si el cocinero pone agua a hervir y se queda parado mirando la olla durante 10 minutos sin hacer nada más (ejecución bloqueante), nadie atiende a los clientes y el restaurante se para por completo.</li>
          <li>En la web ocurriría lo mismo: si JavaScript se quedara congelado esperando una respuesta de internet, el usuario no podría pulsar botones ni hacer scroll.</li>
        </ul>

        <h4>B. La Solución: El Navegador le Echa una Mano</h4>
        <p>Para evitar bloqueos, JavaScript le pide ayuda al navegador para todas las tareas que requieren esperar:</p>
        <ul>
          <li><strong>Peticiones de red (<code>fetch</code>)</strong>: El navegador se encarga de esperar los datos de internet en segundo plano.</li>
          <li><strong>Temporizadores (<code>setTimeout</code>)</strong>: El navegador cuenta los segundos en un reloj independiente.</li>
          <li><strong>Eventos del usuario</strong>: El navegador vigila cuándo el usuario hace clic o escribe en el teclado.</li>
        </ul>
        <p>Mientras el navegador espera esas respuestas en segundo plano, el hilo principal de JavaScript queda libre para seguir respondiendo al usuario de inmediato.</p>

        <h4>C. ¿Qué es el Event Loop (Bucle de Eventos)?</h4>
        <p>El <strong>Event Loop</strong> actúa como un <strong>coordinador de tareas</strong> que vigila continuamente dos cosas sencillas:</p>
        <ol>
          <li>¿Está ocupado JavaScript en este momento? Si está ejecutando código, el Event Loop espera a que termine.</li>
          <li>En cuanto JavaScript termina lo que estaba haciendo y queda libre, el Event Loop revisa la <strong>cola de espera</strong> y le entrega la siguiente tarea pendiente (por ejemplo: <em>"¡Oye, ya han llegado los datos de internet!"</em> o <em>"¡El temporizador de 3 segundos ya ha terminado!"</em>).</li>
        </ol>

        <h4>D. ¿Cómo Dibuja la Pantalla el Navegador? (En 3 Pasos Sencillos)</h4>
        <p>Para mostrar visualmente una página o actualizarla tras una acción del usuario, el navegador realiza tres pasos básicos:</p>
        <ol>
          <li><strong>Estructura y Estilos</strong>: Lee el código HTML para conocer los elementos y el CSS para saber qué colores y fuentes aplicar.</li>
          <li><strong>Cálculo de Posiciones (Diseño)</strong>: Calcula el tamaño exacto de cada caja y en qué lugar de la pantalla debe situarse.</li>
          <li><strong>Pintado</strong>: Dibuja los colores, textos e imágenes píxel a píxel para que los veas en pantalla.</li>
        </ol>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Estrella de Exámenes FP',
        text: '¿En qué orden saldrán estos mensajes por consola?<br><br><code>console.log("A");<br>setTimeout(() => console.log("B"), 0);<br>console.log("C");</code><br><br><strong>Salida correcta:</strong> <code>A</code>, luego <code>C</code>, y por último <code>B</code>.<br><br><strong>Explicación sencilla:</strong> <code>A</code> y <code>C</code> se ejecutan inmediatamente en el código principal. Aunque el temporizador de <code>B</code> tenga 0 segundos, pasa a la cola de espera del navegador, y el Event Loop espera obligatoriamente a que termine todo el código principal antes de ejecutarlo.'
      },
      examples: [
        {
          id: 'ex-event-loop-live',
          title: 'Demostración en Vivo: Tareas Inmediatas vs Tareas en Segundo Plano',
          description: 'Ejecuta este código para comprobar con tus propios ojos cómo el código inmediato se procesa antes que las tareas programadas con temporizador.',
          initialCode: `// Observa el orden en que se imprimen los mensajes:
console.log("1. ▶ Código inmediato: Empieza el programa");

// Programamos una tarea para dentro de 0 milisegundos:
setTimeout(() => {
  console.log("4. ⏰ Tarea con temporizador: Se ejecuta cuando el código principal ha terminado");
}, 0);

// Una Promesa que se resuelve de inmediato:
Promise.resolve().then(() => {
  console.log("3. ⚡ Promesa resuelta: Tiene prioridad en la lista de espera");
});

console.log("2. ▶ Código inmediato: Termina el programa principal");
console.log("¡Revisa el orden en la consola inferior! El orden siempre es: Código principal -> Promesas -> Temporizadores.");`
        }
      ]
    },

    {
      id: 'ecosistema-lenguajes-cliente',
      title: '4. Ecosistema de Lenguajes en el Cliente: JavaScript, TypeScript y WebAssembly',
      criteriaRef: 'Criterio c)',
      description: 'Los tres lenguajes clave del navegador actual: JavaScript como estándar universal, TypeScript para proyectos profesionales y WebAssembly para tareas de máxima potencia.',
      theoryHtml: `
        <p>Aunque en la web hoy en día podemos usar diversas herramientas, en el navegador destacan tres tecnologías fundamentales:</p>

        <h4>A. JavaScript (ECMAScript): El Estándar Universal de la Web</h4>
        <p>JavaScript nació en 1995 (creado por Brendan Eich en apenas 10 días para Netscape) como un lenguaje sencillo para añadir pequeñas animaciones y validar formularios. Hoy en día está regulado por un estándar internacional oficial llamado <strong>ECMAScript</strong> y es el <strong>único lenguaje de programación que todos los navegadores entienden de forma nativa sin instalar nada</strong>.</p>
        <p>Cada año se publican mejoras muy útiles, como:</p>
        <ul>
          <li>Declaración de variables seguras con <code>let</code> y <code>const</code>.</li>
          <li>Funciones flecha compactas (<code>() =&gt; { ... }</code>).</li>
          <li>Código asíncrono limpio y fácil de leer con <code>async</code> y <code>await</code>.</li>
          <li>Métodos cómodos para listas (<code>map</code>, <code>filter</code>, <code>find</code>).</li>
        </ul>

        <h4>B. TypeScript: JavaScript con Comprobación de Errores para Empresas</h4>
        <p>A medida que las aplicaciones web se hicieron gigantescas, en proyectos grandes era fácil cometer pequeños fallos tontos (por ejemplo, escribir mal el nombre de una propiedad o sumar texto con números sin querer). Para resolverlo, Microsoft creó <strong>TypeScript</strong>:</p>
        <ul>
          <li><strong>¿Qué es?</strong>: Es JavaScript al que se le añade la posibilidad de indicar los tipos de datos (decir si una variable es un texto, un número, una fecha, etc.).</li>
          <li><strong>Ventaja clave</strong>: Te avisa de los errores en el editor de código (como Visual Studio Code) <em>mientras estás escribiendo</em>, antes incluso de abrir la página web.</li>
          <li><strong>Dato fundamental para exámenes</strong>: Los navegadores <strong>NO entienden TypeScript directamente</strong>. Antes de subir la web a producción, una herramienta (llamada compilador o transpilador) limpia los tipos y convierte el código en JavaScript estándar compatible con cualquier navegador.</li>
        </ul>

        <h4>C. WebAssembly (Wasm): Máxima Velocidad para Tareas Exigentes</h4>
        <p>¿Qué ocurre cuando queremos ejecutar en la web algo muy pesado, como un videojuego 3D, un editor de vídeo o una herramienta de diseño gráfico profesional como Figma?</p>
        <ul>
          <li>Para estos casos de alto rendimiento existe <strong>WebAssembly</strong>, un formato binario compacto que permite ejecutar en el navegador código escrito en lenguajes rápidos como <strong>C++, Rust o Go</strong>.</li>
          <li><strong>No sustituye a JavaScript, se ayudan</strong>: JavaScript sigue controlando los botones, menús y la interacción de la página, mientras que WebAssembly se encarga de los cálculos pesados en segundo plano.</li>
        </ul>
      `,
      callout: {
        type: 'pro-tip',
        title: '¿Sabías que...?',
        text: 'Herramientas tan populares como <strong>Figma</strong> (diseño gráfico) o versiones web de <strong>Photoshop</strong> funcionan con tanta fluidez en el navegador porque sus motores gráficos internos están programados en C++ y convertidos a <strong>WebAssembly</strong>, trabajando codo con codo con JavaScript.'
      },
      examples: [
        {
          id: 'ex-wasm-detection',
          title: 'Comprobación de Soporte de WebAssembly y Tipos en JavaScript',
          description: 'Comprueba con este pequeño script si tu navegador actual soporta WebAssembly y experimenta con los tipos de datos en JavaScript.',
          initialCode: `// 1. Verificamos si este navegador cuenta con soporte nativo para WebAssembly:
const tieneSoporteWasm = typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function";

console.log("=== COMPATIBILIDAD DE TECNOLOGÍAS WEB ===");
console.log("¿Tu navegador soporta WebAssembly?:", tieneSoporteWasm ? "SÍ (Aceleración de alto rendimiento lista)" : "NO");

// 2. Naturaleza dinámica de JavaScript (una variable puede cambiar de tipo libremente):
console.log("\\n=== TIPOS DINÁMICOS EN JAVASCRIPT ===");
let dato = 100;
console.log("Valor actual:", dato, "| Tipo de dato:", typeof dato);

dato = "¡Ahora contiene texto!";
console.log("Valor actual:", dato, "| Tipo de dato:", typeof dato);

console.log("\\nEn TypeScript, si intentaras cambiar un número por texto te saldría un aviso de advertencia en rojo en el editor.");`
        }
      ]
    },

    {
      id: 'scripts-vs-tradicional-sandbox',
      title: '5. Lenguajes de Script vs Tradicionales y la Seguridad del Navegador',
      criteriaRef: 'Criterio d)',
      description: 'Diferencias entre scripts web y lenguajes de escritorio, la seguridad Sandbox que te protege al navegar y la regla del mismo origen (SOP y CORS).',
      theoryHtml: `
        <p>A diferencia de los lenguajes tradicionales de escritorio (como C, C++ o Java clásico), JavaScript en el cliente web está diseñado desde su origen para ser <strong>seguro, inmediato y portátil</strong>.</p>

        <h4>A. Diferencias Clave: Scripts Web vs Programas Tradicionales</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: var(--bg-surface-3); border-bottom: 2px solid var(--border-subtle); text-align: left;">
              <th style="padding: 10px;">Aspecto</th>
              <th style="padding: 10px;">Programas Tradicionales (C, C++, Java)</th>
              <th style="padding: 10px;">Scripts Web (JavaScript)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 10px;"><strong>¿Cómo se ejecutan?</strong></td>
              <td style="padding: 10px;">Se compilan antes de usarse en un archivo ejecutable (<code>.exe</code> o binario).</td>
              <td style="padding: 10px;">Se descargan y ejecutan directamente en el navegador del usuario.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 10px;"><strong>Acceso al ordenador</strong></td>
              <td style="padding: 10px;">Pueden acceder a carpetas del disco duro, periféricos y archivos del sistema.</td>
              <td style="padding: 10px;"><strong>Aislados por seguridad</strong>: No pueden tocar tus archivos privados ni el sistema operativo.</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Gestión de memoria</strong></td>
              <td style="padding: 10px;">A menudo manual (el programador debe reservar y liberar memoria).</td>
              <td style="padding: 10px;">Automática mediante el <em>Garbage Collector</em> (limpia la memoria que ya no se usa).</td>
            </tr>
          </tbody>
        </table>

        <h4>B. El Modelo de Seguridad Sandbox (Caja de Arena)</h4>
        <p>Cada vez que entras en una página web nueva en internet, tu navegador está descargando y ejecutando código creado por una persona que no conoces. Si no existiera protección, cualquier página podría leer tus fotos privadas, tus contraseñas o borrarte el disco duro.</p>
        <p>Para protegerte, los navegadores encierran a JavaScript en una <strong>Sandbox (Caja de Arena)</strong> con reglas estrictas:</p>
        <ul>
          <li><strong>Prohibido tocar archivos del disco duro</strong>: Una web no puede leer <code>C:\\MisDocumentos</code> por su cuenta. La única forma de que lea un archivo es si tú lo seleccionas voluntariamente en un botón de subida de archivos (<code>&lt;input type="file"&gt;</code>).</li>
          <li><strong>Permisos obligatorios</strong>: Si una página web necesita acceder a tu cámara, micrófono o localización GPS, el navegador te muestra una ventana de aviso para que des tu permiso explícito.</li>
          <li><strong>Aislamiento entre pestañas</strong>: Lo que ocurre en una pestaña de tu banco no puede espiar ni interferir con lo que ocurre en otra pestaña abierta.</li>
        </ul>

        <h4>C. La Regla del Mismo Origen (Same-Origin Policy - SOP) y CORS</h4>
        <p>La <strong>Política del Mismo Origen</strong> es la regla de seguridad más importante de internet: establece que una página web solo puede consultar y compartir datos con su propio sitio web.</p>
        <p>Dos direcciones tienen el <strong>mismo origen</strong> si coinciden exactamente en tres cosas: <strong>Protocolo + Dominio + Puerto</strong>:</p>
        <div style="background: var(--bg-surface-2); padding: 12px; border-radius: var(--radius-md); font-family: var(--font-code); font-size: 0.82rem; margin: 12px 0;">
          Página de partida: https://www.miinstituto.es:443<br>
          • https://www.miinstituto.es:443/contacto.html &nbsp;──► MISMO ORIGEN (Permitido)<br>
          • <span style="color: var(--color-danger);">http://</span>www.miinstituto.es:443 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──► DISTINTO ORIGEN (Cambia el protocolo http vs https)<br>
          • https://<span style="color: var(--color-danger);">alumnos.</span>miinstituto.es:443 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──► DISTINTO ORIGEN (Cambia el subdominio)<br>
          • https://www.miinstituto.es:<span style="color: var(--color-danger);">8080</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──► DISTINTO ORIGEN (Cambia el puerto)
        </div>
        <p>¿Qué pasa si tu página web necesita consultar datos legítimos a una API externa (por ejemplo, para mostrar el tiempo meteorológico)? Para eso existe <strong>CORS</strong>: el servidor de la API debe enviar una cabecera autorizando expresamente a tu página a recibir la información.</p>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clave de Examen Oficial',
        text: '¿Qué es una petición previa o "Preflight" en CORS?<br><br><strong>Respuesta sencilla:</strong> Cuando una página web va a realizar una operación importante hacia otro servidor diferente (como borrar o modificar datos), el navegador envía antes de forma automática una comprobación rápida y transparente con el método HTTP <strong>OPTIONS</strong> para preguntar: <em>"¿Tengo permiso para hacer esta petición?"</em>. Si el servidor responde que sí, se envía la petición real.'
      },
      examples: [
        {
          id: 'ex-sop-checker',
          title: 'Comprobador Interactivo de Mismo Origen (SOP)',
          description: 'Prueba esta función que compara dos direcciones web y comprueba si el navegador permitiría la comunicación entre ellas.',
          initialCode: `// Función didáctica que comprueba si dos URLs cumplen la regla del Mismo Origen
function comprobarMismoOrigen(url1, url2) {
  try {
    const a = new URL(url1);
    const b = new URL(url2);

    const coincideProtocolo = a.protocol === b.protocol;
    const coincideDominio = a.hostname === b.hostname;
    const coincidePuerto = (a.port || (a.protocol === "https:" ? "443" : "80")) ===
                           (b.port || (b.protocol === "https:" ? "443" : "80"));

    const esValido = coincideProtocolo && coincideDominio && coincidePuerto;

    return {
      esValido,
      mensaje: esValido 
        ? "✓ PERMITIDO: Mismo protocolo, dominio y puerto."
        : "✗ BLOQUEADO: Diferente " + [
            !coincideProtocolo ? "protocolo" : "",
            !coincideDominio ? "dominio" : "",
            !coincidePuerto ? "puerto" : ""
          ].filter(Boolean).join(", ")
    };
  } catch (error) {
    return { esValido: false, mensaje: "URL no válida" };
  }
}

// Probamos casos habituales:
console.log("=== COMPROBACIÓN DE SAME-ORIGIN POLICY ===");

const prueba1 = comprobarMismoOrigen("https://mira.ies.es/inicio", "https://mira.ies.es/notas");
console.log("Misma web, distinta página:", prueba1.mensaje);

const prueba2 = comprobarMismoOrigen("https://mira.ies.es", "http://mira.ies.es");
console.log("HTTPS frente a HTTP:", prueba2.mensaje);

const prueba3 = comprobarMismoOrigen("https://mira.ies.es", "https://campus.ies.es");
console.log("Distinto subdominio:", prueba3.mensaje);`
        }
      ]
    },

    {
      id: 'integracion-html-modulos-csp',
      title: '6. Cómo Añadir JavaScript a HTML: Métodos de Carga y Módulos Modernos',
      criteriaRef: 'Criterio e)',
      description: 'Las distintas formas de enlazar scripts a una página web, cuándo usar async y defer, y las ventajas de organizar tu código con módulos ES6.',
      theoryHtml: `
        <p>Para que una página web funcione correctamente, debemos seguir el principio de <strong>separación de responsabilidades</strong>: el archivo <strong>HTML</strong> contiene la estructura y contenido, el <strong>CSS</strong> define los colores y aspecto visual, y el <strong>JavaScript</strong> aporta la interactividad y la lógica.</p>

        <h4>A. ¿Cómo Carga el Navegador las Etiquetas <code>&lt;script&gt;</code>?</h4>
        <p>Cuando el navegador lee el código HTML de arriba a abajo y se encuentra con una etiqueta de script, su forma de actuar cambia según el atributo que utilicemos:</p>
        <ul>
          <li><strong>Script Tradicional (<code>&lt;script src="app.js"&gt;</code>)</strong>:
            <p><strong>Detiene la lectura del HTML</strong>. El navegador deja de dibujar la página mientras descarga el archivo y lo ejecuta. Si el archivo es grande o la conexión es lenta, el usuario verá la pantalla congelada durante unos instantes.</p>
          </li>
          <li><strong>Script Asíncrono (<code>&lt;script src="analitica.js" async&gt;</code>)</strong>:
            <p>Se descarga en segundo plano sin frenar la página. Sin embargo, en el instante exacto en que termina de descargarse, <strong>se ejecuta de inmediato</strong> deteniendo lo que esté haciendo el navegador. Además, no respeta el orden en que los escribiste. Solo se recomienda para scripts independientes que no necesitan interactuar con tu HTML (por ejemplo, Google Analytics).</p>
          </li>
          <li><strong>Script Diferido (<code>&lt;script src="app.js" defer&gt;</code>) — La Opción Recomendada</strong>:
            <p>Se descarga en segundo plano mientras el HTML sigue leyéndose con total fluidez. Se ejecuta de forma ordenada justo cuando el documento HTML ha terminado de construirse por completo. <strong>Es la mejor práctica para la mayoría de scripts tradicionales</strong>.</p>
          </li>
        </ul>

        <h4>B. Módulos Modernos de JavaScript (<code>type="module"</code>)</h4>
        <p>En el desarrollo web actual, la forma estándar de escribir código limpio y organizado es utilizando módulos nativos:</p>
        <div style="background: var(--bg-surface-2); padding: 12px; border-radius: var(--radius-md); font-family: var(--font-code); font-size: 0.85rem; margin: 12px 0;">
          &lt;script type="module" src="main.js"&gt;&lt;/script&gt;
        </div>
        <p>Ventajas que te ofrecen los módulos:</p>
        <ol>
          <li><strong>Se comportan como <code>defer</code> automáticamente</strong>: No bloquean la carga visual de la página web.</li>
          <li><strong>Código organizado</strong>: Puedes separar tus funciones en varios archivos y conectarlos fácilmente usando <code>export</code> para compartir e <code>import</code> para utilizarlas.</li>
          <li><strong>Variables aisladas</strong>: Las variables que creas en un archivo no chocan accidentalmente con las de otros archivos.</li>
          <li><strong>Modo estricto automático</strong>: Activan por defecto buenas prácticas de programación (evitan errores comunes de JavaScript).</li>
        </ol>

        <h4>C. Buena Práctica Fundamental: Evita el Código Incrustado</h4>
        <p>En el desarrollo profesional está totalmente desaconsejado escribir código JavaScript dentro del propio HTML (como por ejemplo el antiguo <code>&lt;button onclick="saludar()"&gt;</code>). Mezcla responsabilidades y hace el código difícil de mantener. La forma correcta y limpia es usar siempre <code>addEventListener</code> desde tu archivo JavaScript independiente.</p>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Consejo para tus Prácticas y Proyectos',
        text: 'En tus proyectos de clase, utiliza siempre <code>&lt;script type="module" src="..."&gt;</code> o <code>&lt;script defer src="..."&gt;</code> en la cabecera (<code>&lt;head&gt;</code>). De esta manera tu página cargará sin bloqueos y tendrás la garantía de que todo el HTML estará listo cuando tu código JavaScript empiece a funcionar.'
      },
      examples: [
        {
          id: 'ex-module-simulation',
          title: 'Simulación: Cómo los Módulos Protegen Nuestras Variables',
          description: 'Comprueba cómo encapsular código evita conflictos de nombres en comparación con usar variables globales sueltas.',
          initialCode: `// Simulación didáctica de cómo funciona un módulo:
const ModuloCalculadora = (() => {
  // Esta variable es privada de este módulo (nadie desde fuera puede modificarla por error):
  const ivaGeneral = 0.21;

  function calcularTotalConIva(precioBase) {
    return precioBase + (precioBase * ivaGeneral);
  }

  // Exportamos solo lo que queremos que otros utilicen:
  return {
    calcularTotal: calcularTotalConIva
  };
})();

console.log("=== ENCAPSULAMIENTO Y MÓDULOS ===");
const total = ModuloCalculadora.calcularTotal(100);
console.log("Precio final con 21% de IVA:", total + "€");

// Comprobamos que la variable interna no contamina el entorno global:
console.log("¿Se puede acceder a 'ivaGeneral' desde fuera?:", typeof ivaGeneral); // undefined

console.log("\\nEn los módulos ES6 modernos (type='module'), este aislamiento ocurre de forma automática y natural usando simplemente 'export' e 'import'.");`
        }
      ]
    },

    {
      id: 'devtools-depuracion-auditoria',
      title: '7. Herramientas DevTools, Depuración y Auditoría con Lighthouse',
      criteriaRef: 'Criterio f)',
      description: 'Las pestañas imprescindibles de las herramientas de desarrollador (F12), cómo encontrar y corregir errores, auditorías con Lighthouse y linters de código.',
      theoryHtml: `
        <p>Cualquier desarrollador web profesional necesita dominar las <strong>Herramientas de Desarrollador (DevTools)</strong> que vienen integradas en todos los navegadores modernos. Se abren pulsando la tecla <strong>F12</strong> (o <em>Ctrl + Shift + I</em>).</p>

        <h4>A. Las Pestañas Imprescindibles de las DevTools</h4>
        <ul>
          <li><strong>Elementos (Elements / Inspector)</strong>:
            <p>Muestra el código HTML y los estilos CSS en tiempo real. Puedes modificar colores, tamaños, textos o márgenes directamente en la pantalla para comprobar cómo quedan antes de escribirlos en tu código.</p>
          </li>
          <li><strong>Consola (Console)</strong>:
            <p>Es tu bloc de notas y zona de pruebas. Aquí aparecen los mensajes de error de tu código y puedes probar sentencias interactivas usando <code>console.log()</code> o la práctica función <code>console.table()</code>.</p>
          </li>
          <li><strong>Fuentes / Depurador (Sources / Debugger)</strong>:
            <p>Te permite examinar tus archivos de código y colocar <strong>puntos de interrupción (Breakpoints)</strong>. Cuando la ejecución llega a un punto de parada, la página se pausa y puedes ver paso a paso qué vale cada variable. También puedes provocar esta pausa escribiendo la palabra clave <code>debugger;</code> en tu código.</p>
          </li>
          <li><strong>Red (Network)</strong>:
            <p>Muestra cada archivo, imagen o dato que la página descarga por internet, cuánto tiempo tarda y si ha habido algún error (como el famoso error 404 de archivo no encontrado).</p>
          </li>
        </ul>

        <h4>B. Auditorías de Calidad con Google Lighthouse: El Boletín de Notas de tu Web</h4>
        <p><strong>Lighthouse</strong> es una herramienta automática integrada directamente en la pestaña <em>Lighthouse</em> de las DevTools de Google Chrome y Edge. Con solo pulsar un botón, analiza tu página web y le otorga una <strong>puntuación del 0 al 100</strong> en cuatro apartados clave:</p>
        <ol>
          <li><strong>Rendimiento (Performance)</strong>:
            <p>¿Tu página carga rápido? Evalúa que la página aparezca pronto en pantalla, que responda con agilidad al hacer clic y que los elementos no peguen saltos molestos mientras se cargan las imágenes.</p>
          </li>
          <li><strong>Accesibilidad (Accessibility)</strong>:
            <p>¿Cualquier persona puede usar tu web con facilidad? Comprueba que los colores tengan suficiente contraste para leerse bien, que las fuentes sean legibles y que las personas que usan lectores de pantalla o navegan solo con el teclado puedan utilizarla sin problemas.</p>
          </li>
          <li><strong>Buenas Prácticas (Best Practices)</strong>:
            <p>¿Tu web está construida con estándares modernos y seguros? Verifica que la web use conexión segura HTTPS y no utilice funciones obsoletas.</p>
          </li>
          <li><strong>SEO (Posicionamiento en Buscadores)</strong>:
            <p>¿Google y otros buscadores entienden de qué trata tu página? Revisa que la página tenga un título claro (<code>&lt;title&gt;</code>), una descripción adecuada y que se adapte bien a pantallas de teléfonos móviles.</p>
          </li>
        </ol>

        <h4>C. Herramientas que te Ayudan a Escribir Código Limpio</h4>
        <ul>
          <li><strong>Linters (como ESLint)</strong>: Funcionan como un corrector ortográfico para tu código. Te avisan si declaras variables que nunca utilizas o si cometes errores comunes antes de ejecutar la web.</li>
          <li><strong>Formateadores (como Prettier)</strong>: Ordenan y sangran el código automáticamente con un solo clic, logrando que todo el equipo trabaje con el mismo estilo limpio y legible.</li>
        </ul>
      `,
      callout: {
        type: 'pro-tip',
        title: '3 Claves para Obtener Buena Puntuación en Lighthouse',
        text: 'Si quieres que tus proyectos de clase consigan una nota sobresaliente en Lighthouse, aplica siempre estas tres reglas sencillas:<br>1. <strong>Optimiza las imágenes</strong>: no subas fotos gigantescas directamente de la cámara; redúcelas y guárdalas en formatos modernos como WebP.<br>2. <strong>Añade siempre el texto alternativo</strong> (<code>alt="descripción"</code>) en todas las imágenes para garantizar la accesibilidad.<br>3. <strong>Estructura bien tu HTML</strong> con etiquetas semánticas claras (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>) y títulos ordenados (un solo <code>&lt;h1&gt;</code> por página).'
      },
      examples: [
        {
          id: 'ex-devtools-console-pro',
          title: 'Utilidades Prácticas de la Consola de DevTools',
          description: 'Aprende a mostrar datos en tablas claras y a medir el tiempo exacto que tarda una función con la API Console.',
          initialCode: `// Ejemplos de métodos útiles de la consola para tus prácticas:
console.log("=== UTILIDADES PRÁCTICAS DE CONSOLA ===");

// 1. Mostrar colecciones de datos en una tabla ordenada (console.table):
const listaAlumnos = [
  { exp: "DAW-01", alumno: "Lucía García", modulo: "Cliente", calificacion: 8.5 },
  { exp: "DAW-02", alumno: "Marcos Ruiz", modulo: "Cliente", calificacion: 9.2 },
  { exp: "DAW-03", alumno: "Sara Morales", modulo: "Cliente", calificacion: 7.8 }
];

console.log("Visualización cómoda en tabla bidimensional:");
console.table(listaAlumnos);

// 2. Medir cuánto tiempo tarda una operación (console.time y console.timeEnd):
console.time("⏱ Tiempo de cálculo");
let totalSuma = 0;
for (let i = 0; i < 50000; i++) {
  totalSuma += i;
}
console.timeEnd("⏱ Tiempo de cálculo");
console.log("Resultado de la suma:", totalSuma);

// 3. Consejo de depuración:
console.log("\\nConsejo: Si escribes 'debugger;' en cualquier línea de tu código, el navegador pausará la ejecución automáticamente para que puedas inspeccionar los datos.");`
        }
      ]
    }
  ],

  // =========================================================================
  // BANCO DE AUTOEVALUACIÓN (12 PREGUNTAS CLARAS TIPO TEST FP DAW)
  // =========================================================================
  quizzes: [
    {
      id: 'ra1-quiz-1',
      topicTag: 'Criterio a) Cliente vs Servidor',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Cuál es una ventaja principal de realizar cálculos y comprobaciones en el navegador (cliente) mediante JavaScript?',
      options: [
        'Garantiza por sí solo la seguridad total de la base de datos sin necesidad de validaciones adicionales.',
        'Aprovecha el procesador y memoria del dispositivo del usuario, dando respuestas inmediatas y reduciendo el tráfico de red.',
        'Hace innecesario disponer de servidores o servicios de backend en la aplicación.',
        'Impide que cualquier usuario pueda ver o inspeccionar el código fuente de la aplicación.'
      ],
      correctIndex: 1,
      explanation: 'El procesamiento en cliente aprovecha los recursos del equipo del usuario, respondiendo de inmediato a los clics y formularios sin necesidad de esperar a que una petición viaje por internet hasta el servidor.'
    },
    {
      id: 'ra1-quiz-2',
      topicTag: 'Criterio a) Aplicaciones SPAs',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: 'En una aplicación de una sola página (Single-Page Application o SPA), ¿cómo cambia el usuario de sección sin que la pantalla parpadee o se recargue entera?',
      options: [
        'Reiniciando el navegador cada vez que se hace un clic.',
        'Descargando un archivo index.html nuevo y completo en cada enlace.',
        'JavaScript actualiza solo la parte de la pantalla que cambia, pidiendo únicamente los datos nuevos al servidor en formato JSON.',
        'El servidor bloquea la conexión de red y trabaja únicamente sin internet.'
      ],
      correctIndex: 2,
      explanation: 'En las SPAs, la página inicial no se vuelve a recargar; cuando navegas, JavaScript actualiza los elementos visuales necesarios intercambiando pequeños paquetes de datos (JSON) con el servidor.'
    },
    {
      id: 'ra1-quiz-3',
      topicTag: 'Criterio b) Motores del Navegador',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Qué motor de JavaScript utilizan los navegadores Google Chrome y Microsoft Edge?',
      options: [
        'SpiderMonkey',
        'V8',
        'Gecko',
        'WebKit'
      ],
      correctIndex: 1,
      explanation: 'V8 es el prestigioso motor de JavaScript de alto rendimiento desarrollado por Google, utilizado tanto en Google Chrome y Microsoft Edge como en el entorno de servidor Node.js.'
    },
    {
      id: 'ra1-quiz-4',
      topicTag: 'Criterio b) Dibujado en Navegadores',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: '¿Cuáles son los tres pasos esenciales que realiza el navegador para dibujar una página web en pantalla?',
      options: [
        '1) Leer HTML/CSS, 2) Calcular la posición y tamaño de cada elemento, 3) Pintar los colores, textos e imágenes.',
        '1) Formatear el disco duro, 2) Compilar en C++, 3) Enviar un correo electrónico.',
        '1) Reiniciar el router, 2) Descargar fuentes, 3) Cerrar las pestañas secundarias.',
        '1) Borrar las cookies, 2) Crear un archivo PDF, 3) Dibujar los bordes.'
      ],
      correctIndex: 0,
      explanation: 'El navegador primero analiza el contenido y los estilos (HTML y CSS), después calcula el diseño geométrico de las cajas (dónde va cada elemento) y finalmente pinta los píxeles en la pantalla.'
    },
    {
      id: 'ra1-quiz-5',
      topicTag: 'Criterio b) Asincronía y Event Loop',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      question: 'Analiza el siguiente código: ¿En qué orden se mostrarán los números en la consola?\\nconsole.log(1);\\nsetTimeout(() => console.log(2), 0);\\nconsole.log(3);',
      options: [
        '1, 2, 3',
        '1, 3, 2',
        '3, 2, 1',
        '2, 1, 3'
      ],
      codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);`,
      correctIndex: 1,
      explanation: '1 y 3 son síncronos (se ejecutan en el flujo principal de inmediato). El temporizador pasa a la cola de tareas del navegador, y el Event Loop espera a que termine el código principal antes de ejecutar el 2.'
    },
    {
      id: 'ra1-quiz-6',
      topicTag: 'Criterio c) TypeScript',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: '¿Qué ocurre con los tipos e interfaces de TypeScript cuando ejecutamos una aplicación en el navegador web?',
      options: [
        'El navegador comprueba los tipos en vivo y detiene la página si encuentra un error.',
        'Son eliminados antes de ejecutarse en el proceso de compilación, ejecutándose en el navegador código JavaScript estándar.',
        'Se convierten en comentarios de CSS que el navegador interpreta en segundo plano.',
        'Obligan al navegador a descargar un plugin especial de Microsoft para funcionar.'
      ],
      correctIndex: 1,
      explanation: 'Los navegadores web no entienden TypeScript de forma nativa. Antes de publicar la web, las herramientas eliminan los tipos y emiten código JavaScript estándar y limpio que cualquier navegador puede ejecutar.'
    },
    {
      id: 'ra1-quiz-7',
      topicTag: 'Criterio c) WebAssembly (Wasm)',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Para qué se utiliza principalmente WebAssembly (Wasm) en las aplicaciones web actuales?',
      options: [
        'Para sustituir completamente a HTML y diseñar páginas sin etiquetas.',
        'Para ejecutar código compilado a gran velocidad en tareas pesadas como videojuegos 3D, edición gráfica o de vídeo.',
        'Para obligar a los usuarios a escribir en lenguaje ensamblador en lugar de JavaScript.',
        'Para desactivar las conexiones HTTPS de los servidores.'
      ],
      correctIndex: 1,
      explanation: 'WebAssembly permite que programas creados en lenguajes como C++ o Rust se ejecuten a velocidad casi nativa dentro del navegador, complementando a JavaScript en tareas de computación intensiva.'
    },
    {
      id: 'ra1-quiz-8',
      topicTag: 'Criterio d) Seguridad Sandbox',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: '¿Por qué el modelo de seguridad "Sandbox" (Caja de Arena) del navegador prohíbe que JavaScript acceda directamente a los archivos de tu disco duro?',
      options: [
        'Porque los discos duros no son compatibles con el lenguaje JavaScript.',
        'Para evitar que cualquier sitio web malicioso de internet descargue código que pueda leer o borrar tus archivos personales.',
        'Porque el navegador solo tiene memoria suficiente para guardar imágenes.',
        'Para forzar a que todos los ordenadores utilicen discos SSD en lugar de discos mecánicos.'
      ],
      correctIndex: 1,
      explanation: 'El Sandbox aísla el código web descargado para que no pueda dañar el equipo del usuario ni acceder a su sistema de archivos sin permiso expreso.'
    },
    {
      id: 'ra1-quiz-9',
      topicTag: 'Criterio d) Same-Origin Policy',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      question: 'Tomando como dirección base "https://tienda.es:443", ¿cuál de las siguientes opciones pertenece al MISMO ORIGEN según la regla SOP?',
      options: [
        'http://tienda.es:443/catalogo (Protocolo HTTP)',
        'https://tienda.es:8080/catalogo (Puerto distinto)',
        'https://blog.tienda.es:443/catalogo (Subdominio distinto)',
        'https://tienda.es:443/productos/ofertas.html (Mismo protocolo, mismo dominio y mismo puerto)'
      ],
      correctIndex: 3,
      explanation: 'La regla del Mismo Origen requiere que coincidan exactamente el protocolo (https), el dominio (tienda.es) y el puerto (443). La ruta o carpeta interna (/productos/ofertas.html) puede ser cualquier otra.'
    },
    {
      id: 'ra1-quiz-10',
      topicTag: 'Criterio e) Métodos de Carga: defer vs async',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: '¿Por qué se recomienda habitualmente utilizar el atributo "defer" (&lt;script src="app.js" defer&gt;) en lugar de un script normal?',
      options: [
        'Porque duplica la memoria RAM del navegador automáticamente.',
        'Porque descarga el script sin frenar la lectura del HTML y lo ejecuta de forma ordenada cuando el documento está listo.',
        'Porque convierte automáticamente el código JavaScript a lenguaje C++.',
        'Porque impide que el código muestre mensajes de error en la consola.'
      ],
      correctIndex: 1,
      explanation: 'El atributo "defer" permite que la página web se cargue y se dibuje sin bloqueos, posponiendo la ejecución del script ordenadamente hasta que todo el HTML ha sido analizado.'
    },
    {
      id: 'ra1-quiz-11',
      topicTag: 'Criterio e) Módulos Modernos ES6',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: 'Al usar un script con el atributo type="module" (&lt;script type="module" src="app.js"&gt;), ¿cuál de las siguientes ventajas se aplica automáticamente?',
      options: [
        'Todas las variables creadas se comparten automáticamente en la ventana global window.',
        'El archivo tiene su propio ámbito protegido (las variables no chocan con otros archivos) y no frena la carga visual del HTML.',
        'El navegador desactiva la conexión a internet para ese script.',
        'Solo se puede ejecutar una sola línea de código en todo el archivo.'
      ],
      correctIndex: 1,
      explanation: 'Los módulos modernos aíslan sus variables para que no colisionen con las de otros ficheros y se descargan de forma diferida (como defer) para no entorpecer el dibujo de la página.'
    },
    {
      id: 'ra1-quiz-12',
      topicTag: 'Criterio f) Auditorías con Lighthouse',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Qué cuatro aspectos fundamentales evalúa la herramienta Google Lighthouse para calificar la calidad de una página web con notas del 0 al 100?',
      options: [
        'Rendimiento, Accesibilidad, Buenas Prácticas y SEO (Posicionamiento).',
        'Velocidad del procesador, Memoria gráfica, Espacio en disco y Temperatura de la CPU.',
        'Número de enlaces a redes sociales, Tipografía de Windows, Cantidad de clics y Volumen de audio.',
        'Versión del sistema operativo, Marca del monitor, Conexión Bluetooth y Formato de teclado.'
      ],
      correctIndex: 0,
      explanation: 'Lighthouse analiza cuatro pilares esenciales del desarrollo web: Rendimiento (velocidad de carga), Accesibilidad (facilidad de uso para todos), Buenas Prácticas (seguridad y estándares) y SEO (visibilidad en buscadores).'
    }
  ],

  // =========================================================================
  // RETOS DE CÓDIGO INTERACTIVOS (CHALLENGES)
  // Al tratarse de un resultado de aprendizaje introductorio y conceptual,
  // no incluye retos de código con tests unitarios.
  // =========================================================================
  challenges: []
};
