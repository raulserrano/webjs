# Tareas para Realizar en Casa — Resultado de Aprendizaje 1 (RA1)
**Módulo:** Desarrollo Web en Entorno Cliente (Código: 0612)  
**Ciclo Formativo:** Grado Superior en Desarrollo de Aplicaciones Web (DAW)  
**Resultado de Aprendizaje 1:** *Selecciona las arquitecturas y tecnologías de programación sobre clientes Web, identificando y analizando las capacidades y características de cada una.*

---

## Tarea 1: Auditoría Técnica y Diagnóstico de Seguridad en Clientes Web con DevTools y Lighthouse

### 📋 Ficha Técnica
* **Criterios de Evaluación evaluados:**
  * **a)** Caracterización y diferenciación de modelos de ejecución cliente / servidor.
  * **b)** Capacidades y mecanismos de ejecución de los navegadores Web.
  * **d)** Particularidades de programación de scripts vs programación tradicional (Sandbox y Políticas de Seguridad).
  * **f)** Herramientas de desarrollo, depuración y auditoría web.
* **Tiempo estimado de realización:** 2.5 – 3 horas.
* **Modalidad:** Individual.
* **Formato de entrega:** Documento PDF o Markdown (`TAREA1_Nombre_Apellido.pdf`) que incluya capturas justificadas y conclusiones técnicas.

---

### 🎯 Contexto y Misión Profesional
Has sido contratado como desarrollador junior en una consultora tecnológica. Tu primer encargo consiste en auditar una página web pública existente (por ejemplo, el portal de tu centro educativo, un periódico digital o una tienda de comercio electrónico) para evaluar la eficiencia de su arquitectura cliente, su rendimiento de renderizado en el navegador y el cumplimiento de las restricciones de seguridad web.

---

### 📝 Pasos Guiados para el Alumno

#### Paso 1: Diagnóstico de Calidad y Rendimiento con Google Lighthouse (Criterio f)
1. Abre el navegador Google Chrome o Microsoft Edge en modo **Ventana de incógnito** (para evitar la interferencia de extensiones).
2. Accede al sitio web asignado/elegido y abre las herramientas de desarrollador (**F12**).
3. Dirígete a la pestaña **Lighthouse**, selecciona el dispositivo **Navegación Móvil (Mobile)** y genera un informe marcando las 4 categorías: *Rendimiento*, *Accesibilidad*, *Buenas Prácticas* y *SEO*.
4. **Análisis requerido en el informe:**
   * Puntuación obtenida en cada una de las 4 categorías.
   * Identifica al menos **dos oportunidades de mejora de rendimiento** detectadas por Lighthouse (por ejemplo: recursos que bloquean el renderizado inicial, imágenes sin formato moderno de compresión o exceso de código JavaScript no utilizado).
   * Explica técnicamente cómo resolverías cada una de esas dos incidencias aplicando las buenas prácticas vistas en clase.

#### Paso 2: Radiografía del Modelo Cliente/Servidor en la Pestaña Network (Criterios a y b)
1. Ve a la pestaña **Red (Network)** y recarga la página completamente con vaciado de caché (*Ctrl + F5* o botón derecho en el botón de recargar con DevTools abierto -> *Vaciar caché y recarga forzada*).
2. Filtra las peticiones para responder a las siguientes cuestiones con captura de pantalla demostrativa:
   * ¿Cuál es el tamaño total transferido por la red vs el tamaño descomprimido de los recursos?
   * ¿Cuántos archivos JavaScript (`.js`) se descargan y cuánto tiempo tarda en ejecutarse la petición más lenta?
   * Localiza una petición asíncrona de tipo `Fetch / XHR` (si el sitio la utiliza) y explica qué datos viajan en la respuesta (JSON/texto) y por qué este patrón SPA/asíncrono evita recargar la página entera.
   * Explica brevemente la diferencia entre el tiempo de espera por red (*Waiting for server response / TTFB*) y el tiempo que pasa el navegador parseando y ejecutando los scripts (*Content Download / Execution*).

#### Paso 3: Experimentación Práctica con el Sandbox y la Seguridad del Navegador (Criterio d)
1. Ve a la pestaña **Consola (Console)** del navegador sobre esa misma página.
2. Ejecuta las siguientes sentencias y documenta los resultados obtenidos con su correspondiente captura:
   ```javascript
   // A. Intentar inspeccionar información del cliente expuesta por la API BOM/Navigator:
   console.log("Navegador:", navigator.userAgent);
   console.log("Idioma:", navigator.language);
   console.log("Cores disponibles:", navigator.hardwareConcurrency);

   // B. Comprobación del Sandbox: ¿Puede JavaScript acceder libremente al sistema de archivos local?
   // Reflexiona y responde: ¿Por qué en la consola no existe ninguna función nativa como 'readFile("C:/Windows/...")'?
   // ¿Qué mecanismo exige el navegador cuando un usuario realmente necesita subir un archivo?
   ```
3. **Caso Práctico de Same-Origin Policy (SOP):**
   * Imagina que la web analizada es `https://tienda.example.com`.
   * Indica razonadamente si el navegador permitiría o bloquearía por defecto una petición `fetch()` directa realizada desde dicha página hacia:
     1. `https://tienda.example.com/api/productos`
     2. `http://tienda.example.com/api/productos`
     3. `https://pagos.example.com/checkout`
   * Si la opción 3 es bloqueada, ¿qué tecnología o cabecera HTTP debe configurar el servidor de pagos para autorizarla legítimamente?

---

### 📊 Rúbrica de Calificación (0 a 10 Puntos)

| Criterio Evaluado | Nivel Excelente (9-10) | Nivel Adecuado (6-8) | Nivel Insuficiente (0-5) |
| :--- | :--- | :--- | :--- |
| **Auditoría Lighthouse (30%)** | Analiza en detalle las 4 métricas, identifica 2 cuellos de botella con precisión técnica y propone soluciones exactas basadas en estándares web. | Identifica las métricas y cuellos de botella de forma superficial o con soluciones genéricas. | No realiza la auditoría o no explica las causas de los problemas detectados. |
| **Análisis de Red y Cliente/Servidor (30%)** | Interpreta con soltura la pestaña Network, diferencia tiempos de red de renderizado en cliente y localiza recursos clave con capturas claras. | Identifica peticiones en Network pero confunde tiempos de red con tiempos de computación en cliente. | Capturas incompletas o nula comprensión del flujo de peticiones. |
| **Seguridad: Sandbox y SOP (30%)** | Resuelve con exactitud los casos de SOP identificando protocolo/dominio/puerto y justifica la necesidad del Sandbox y CORS. | Resuelve la mayoría de casos de SOP pero duda en la justificación de CORS o del modelo Sandbox. | Confunde las reglas de origen o no comprende el concepto de aislamiento Sandbox. |
| **Presentación y Rigor Técnico (10%)** | Formato impecable, terminología precisa de la profesión, capturas legibles y redacción estructurada. | Documento correcto con algún descuido de formato o terminología mejorable. | Desorganizado, sin capturas o con copia literal no razonada. |

---
---

## Tarea 2: Laboratorio Experimental de Carga de Scripts, Motores Web y Módulos ES6

### 📋 Ficha Técnica
* **Criterios de Evaluación evaluados:**
  * **b)** Capacidades y mecanismos de ejecución de los navegadores Web (Fases de renderizado, parser HTML y Event Loop).
  * **c)** Identificación y caracterización de principales lenguajes cliente (JavaScript vs TypeScript y WebAssembly).
  * **e)** Integración de lenguajes de marcas con lenguajes de cliente (Ubicación de `<script>`, atributos `async`, `defer`, `type="module"`).
* **Tiempo estimado de realización:** 2.5 – 3 horas.
* **Modalidad:** Individual.
* **Formato de entrega:** Archivo comprimido (`TAREA2_Nombre_Apellido.zip`) que contenga el proyecto web funcional y un documento `INFORME.md` con las respuestas y mediciones.

---

### 🎯 Contexto y Misión Profesional
En un proyecto web de gran envergadura, el equipo de desarrollo detecta que la página principal tarda demasiado en mostrarse en dispositivos móviles porque los scripts están ubicados de manera inadecuada y compiten con la construcción del DOM. Tu misión es construir un banco de pruebas controlado (experimento de laboratorio) para demostrar con datos medibles el impacto de cada método de carga y la ventaja de utilizar módulos modernos ES6.

---

### 📝 Pasos Guiados para el Alumno

#### Paso 1: Estructura del Banco de Pruebas
Crea una carpeta de proyecto con la siguiente estructura de archivos:
```
laboratorio-scripts/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── bloqueante.js
│   ├── diferido.js
│   ├── utilidades.js
│   └── main-modulo.js
└── INFORME.md
```

#### Paso 2: Simulación de Carga y Medición en Consola
1. En `index.html`, crea un documento HTML5 completo con un encabezado `<h1>`, un párrafo largo y un contenedor `<div id="caja-resultado"></div>`.
2. En `bloqueante.js`, implementa un pequeño bucle síncrono que tarde un instante en ejecutarse y registre el tiempo:
   ```javascript
   // js/bloqueante.js
   console.time("⏱ Script Bloqueante");
   console.log("1. Ejecutando script tradicional en <head>...");
   // Intentar acceder al DOM antes de que exista:
   const elemento = document.getElementById("caja-resultado");
   console.log("¿Existe #caja-resultado al ejecutarse?:", elemento ? "SÍ" : "NO (Es null porque el DOM aún no se ha creado)");
   console.timeEnd("⏱ Script Bloqueante");
   ```
3. En `diferido.js`, implementa la comprobación con carga diferida:
   ```javascript
   // js/diferido.js
   console.log("2. Ejecutando script con atributo 'defer'...");
   const elementoDefer = document.getElementById("caja-resultado");
   console.log("¿Existe #caja-resultado al ejecutarse defer?:", elementoDefer ? "SÍ (El DOM ya está disponible)" : "NO");
   ```

#### Paso 3: Comparativa de Atributos (`async` vs `defer` vs `type="module"`)
Prueba sucesivamente las siguientes configuraciones en tu `index.html` y documenta el orden exacto de aparición de mensajes en la consola:
1. **Configuración A:** Script tradicional situado en el `<head>` sin atributos.
2. **Configuración B:** Script situado en el `<head>` con atributo `defer`.
3. **Configuración C:** Script situado en el `<head>` con atributo `async`.
4. **Configuración D:** Script modular `<script type="module" src="js/main-modulo.js">`.

**Preguntas a responder en el `INFORME.md`:**
* ¿Por qué el script tradicional en el `<head>` devuelve `null` al intentar seleccionar un elemento del `<body>`?
* ¿Qué diferencia existe entre `async` y `defer` respecto al momento en que se interrumpe el dibujado del HTML?
* ¿Por qué los módulos (`type="module"`) se comportan de manera similar a `defer` por defecto?

#### Paso 4: Aislamiento de Variables con Módulos ES6 (Criterio e)
1. En `utilidades.js`, exporta una función y una constante:
   ```javascript
   // js/utilidades.js
   export const VERSION_APP = "1.0.0";
   const CLAVE_SECRETA_INTERNA = "TokenPrivado12345"; // No se exporta

   export function formatearTitulo(texto) {
     return "📌 " + texto.toUpperCase();
   }
   ```
2. En `main-modulo.js`, importa la función e intenta imprimir las variables:
   ```javascript
   // js/main-modulo.js
   import { VERSION_APP, formatearTitulo } from './utilidades.js';

   console.log("Versión cargada:", VERSION_APP);
   console.log(formatearTitulo("laboratorio de módulos javascript"));

   // Comprobación de aislamiento de ámbito (Scope):
   console.log("¿Existe CLAVE_SECRETA_INTERNA en el ámbito global?:", typeof window.CLAVE_SECRETA_INTERNA);
   ```
3. Abre la consola interactiva del navegador y escribe `window.VERSION_APP`. ¿Aparece definida en el objeto global `window`? Explica por qué esto evita conflictos entre librerías externas.

#### Paso 5: Cuestionario Conceptual Breve (Criterio c)
Incluye en el `INFORME.md` una respuesta concisa a estas dos cuestiones habituales de entrevista técnica:
1. Si un proyecto requiere cálculos matemáticos pesados o gráficos 3D en tiempo real, ¿por qué es conveniente utilizar **WebAssembly** en lugar de JavaScript puro?
2. ¿Por qué se afirma que **TypeScript** mejora la calidad del software si los navegadores web son incapaces de entenderlo de manera directa?

---

### 📊 Rúbrica de Calificación (0 a 10 Puntos)

| Criterio Evaluado | Nivel Excelente (9-10) | Nivel Adecuado (6-8) | Nivel Insuficiente (0-5) |
| :--- | :--- | :--- | :--- |
| **Banco de Pruebas de Carga (30%)** | Proyecto funcional, mide con precisión el bloqueo del DOM, y demuestra con ejemplos claros el comportamiento de tradicional, async, defer y module. | Implementa los scripts pero la medición o el análisis del orden de ejecución es incompleto. | Los scripts no funcionan o no demuestran la diferencia de bloqueo en el DOM. |
| **Implementación Modular ES6 (25%)** | Aplica correctamente `import` y `export`, demuestra el aislamiento de variables y verifica la no contaminación del objeto `window`. | Usa módulos pero no demuestra de forma práctica las ventajas de aislamiento de ámbito (scope). | Errores de sintaxis de módulos o uso de variables globales sueltas. |
| **Respuestas Técnicas e INFORME.md (30%)** | Justifica con gran solidez técnica el funcionamiento del Event Loop, parser HTML, TypeScript y WebAssembly con redacción propia. | Respuestas correctas pero con poca profundidad técnica o explicaciones esquemáticas. | Respuestas erróneas, incompletas o copiadas literalmente sin comprensión. |
| **Estructura y Buenas Prácticas (15%)** | Código limpio, organización impecable de carpetas, comentarios pertinentes y estándares profesionales. | Estructura correcta pero mejorable en orden o formato de archivos. | Código desordenado, sin estructura de carpetas o con errores de ejecución. |
