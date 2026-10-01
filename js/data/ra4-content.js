/**
 * CONTENIDO DIDÁCTICO INTEGRAL: RESULTADO DE APRENDIZAJE 4 (RA4)
 * Módulo Profesional: Desarrollo Web en Entorno Cliente (Código: 0612)
 * Ciclo Formativo de Grado Superior: Desarrollo de Aplicaciones Web (DAW)
 * Conforme a BOE Núm. 143 (Real Decreto 686/2010) y BORM Núm. 73
 * 
 * "Programa código para clientes Web analizando y utilizando estructuras definidas por el usuario."
 * Criterios de Evaluación: b) hasta i)
 * 
 * Nivel pedagógico adaptado a Formación Profesional: práctico, riguroso, claro y orientado al desarrollo web real.
 */

export const RA4_CONTENT = {
  id: 'ra4',
  title: 'Estructuras de Datos, Funciones y Programación Orientada a Objetos',
  duration: '14 Horas lectivas',
  officialCode: 'RA4 - Criterios b-i',

  // =========================================================================
  // LISTA DE APARTADOS TEÓRICOS (7 APARTADOS CON EJEMPLOS INTERACTIVOS)
  // Numeración oficial reestructurada: 4.1 a 4.7
  // =========================================================================
  topics: [
    {
      id: 'apartado-4-1-definicion-invocacion-funciones',
      title: '4.1 Definición e Invocación de Funciones de Usuario',
      criteriaRef: 'Criterios b), i)',
      description: 'Declaración y expresión de funciones, sintaxis moderna de funciones flecha (Arrow Functions), parámetros por defecto, operador Rest (...args) y documentación técnica con JSDoc.',
      theoryHtml: `
        <p>Una función es un bloque reutilizable de código diseñado para realizar una tarea específica, recibir datos de entrada (parámetros) y devolver un resultado (retorno). En JavaScript existen tres formas principales de definir funciones de usuario:</p>

        <h4>A. Declaración de Funciones (Function Declaration)</h4>
        <p>Se utiliza la palabra reservada <code>function</code> seguida del identificador. Posee <strong>hoisting completo</strong> (elevación), lo que significa que el motor JavaScript registra la función en memoria antes de ejecutar el código, permitiendo invocarla antes de su línea de definición:</p>
        <pre><code class="language-javascript">console.log(sumar(3, 4)); // ✓ Funciona (7) gracias al Hoisting

function sumar(a, b) {
  return a + b;
}</code></pre>

        <h4>B. Expresiones de Función (Function Expression)</h4>
        <p>La función se asigna como valor a una variable o constante. <strong>No tienen elevación de cuerpo</strong>; sólo pueden ejecutarse después de haber sido evaluadas en el flujo del programa:</p>
        <pre><code class="language-javascript">const multiplicar = function(a, b) {
  return a * b;
};</code></pre>

        <h4>C. Funciones Flecha (Arrow Functions - ES6)</h4>
        <p>Introducidas en ECMAScript 2015, ofrecen una sintaxis compacta y moderna. Son la opción predilecta en el desarrollo actual para funciones auxiliares y callbacks:</p>
        <ul>
          <li><strong>Retorno implícito</strong>: Si el cuerpo tiene una sola expresión, se omiten las llaves <code>{}</code> y la palabra <code>return</code>:
            <br><code>const duplicar = n => n * 2;</code>
          </li>
          <li><strong>Paréntesis obligatorios</strong> si no recibe parámetros o recibe más de uno:
            <br><code>const saludar = () => "¡Hola, FP!";</code>
            <br><code>const calcular = (base, altura) => (base * altura) / 2;</code>
          </li>
          <li><strong>Retorno de objetos literales</strong>: Si se retorna un objeto con retorno implícito, debe envolverse entre paréntesis para no confundir las llaves con el cuerpo de la función:
            <br><code>const crearAlumno = (nombre, nota) => ({ nombre, nota });</code>
          </li>
          <li><em>¡Propiedad crítica!</em> Las funciones flecha <strong>no tienen su propio <code>this</code></strong>; heredan el <code>this</code> del contexto léxico donde fueron creadas.</li>
        </ul>

        <h4>D. Parámetros por Defecto y Parámetros Rest (<code>...args</code>)</h4>
        <ul>
          <li><strong>Valores por defecto</strong>: Evitan comprobaciones manuales de <code>undefined</code>:
            <br><code>function configurar(puerto = 3000, debug = false) { ... }</code>
          </li>
          <li><strong>Parámetros Rest (<code>...param</code>)</strong>: Permite a una función aceptar una cantidad indefinida de argumentos empaquetándolos automáticamente en un <strong>array nativo real</strong>. Sustituye de forma limpia y moderna al antiguo objeto <code>arguments</code>:
            <br><code>function sumarTodos(...numeros) { return numeros.reduce((acc, n) => acc + n, 0); }</code>
          </li>
        </ul>

        <h4>E. Documentación con JSDoc</h4>
        <p>En el ámbito profesional de FP se exige documentar las funciones usando el estándar JSDoc. Facilita el autocompletado en entornos como VS Code:</p>
        <pre><code class="language-javascript">/**
 * Calcula el importe final tras aplicar un descuento porcentual.
 * @param {number} precioBase - Precio inicial del artículo en euros.
 * @param {number} [descuento=0] - Porcentaje de descuento (0 a 100).
 * @returns {number} Precio neto con descuento aplicado.
 */
function calcularPrecioNeto(precioBase, descuento = 0) {
  return precioBase * (1 - descuento / 100);
}</code></pre>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Buenas Prácticas DAW',
        text: 'Aplica siempre el principio de <strong>Early Return</strong>: valida los parámetros al inicio de la función y retorna inmediatamente si son erróneos. De este modo mantienes el código plano y evitas anidamientos innecesarios (Arrow Code).'
      },
      examples: [
        {
          id: 'ex-4-1-funciones-usuario',
          title: 'Ejemplo Práctico 1: Funciones Flecha, Rest y Valores por Defecto',
          description: 'Compara declaraciones, funciones flecha con retorno implícito de objetos y el uso del operador Rest para recibir listas dinámicas de notas.',
          initialCode: `// Demostración de funciones definidas por el usuario
console.log("=== 1. Función Flecha con Retorno Implícito ===");
const formatearMoneda = (cantidad, divisa = "€") => \`\${cantidad.toFixed(2)} \${divisa}\`;
console.log(formatearMoneda(15.5));
console.log(formatearMoneda(249.99, "USD"));

console.log("\\n=== 2. Creación de Objetos con Arrow Function ===");
const crearModulo = (codigo, nombre, horas = 100) => ({
  codigo,
  nombre,
  horas,
  tipo: "Ciclo Superior DAW"
});
console.log(crearModulo("0612", "Desarrollo Web en Entorno Cliente", 140));

console.log("\\n=== 3. Operador Rest (...valores) ===");
function calcularEstadisticas(nombreGrupo, ...notas) {
  if (notas.length === 0) {
    return { grupo: nombreGrupo, totalAlumnos: 0, media: 0 };
  }
  const suma = notas.reduce((acc, n) => acc + n, 0);
  const media = Number((suma / notas.length).toFixed(2));
  return {
    grupo: nombreGrupo,
    totalAlumnos: notas.length,
    media,
    aprobados: notas.filter(n => n >= 5).length
  };
}

console.log(calcularEstadisticas("DAW2 - Mañana", 8, 4.5, 9, 7.2, 5, 3.8));`
        }
      ]
    },

    {
      id: 'apartado-4-2-ambitos-callbacks-closures',
      title: '4.2 Ámbitos Léxicos, Callbacks y Clausuras (Closures)',
      criteriaRef: 'Criterio b)',
      description: 'Gestión de ámbitos (global, local, bloque), funciones de primera clase, funciones callback y el patrón pedagógico de clausura (closure) para encapsulación de estado privado.',
      theoryHtml: `
        <p>Para dominar JavaScript en cliente es indispensable comprender cómo el motor gestiona el acceso a las variables según la ubicación donde se definen las funciones.</p>

        <h4>A. Ámbitos en JavaScript (Scope)</h4>
        <ol>
          <li><strong>Ámbito Global</strong>: Variables accesibles desde cualquier lugar del script.</li>
          <li><strong>Ámbito de Función</strong>: Variables declaradas con <code>var</code>, <code>let</code> o <code>const</code> dentro del cuerpo de una función; no son visibles desde el exterior.</li>
          <li><strong>Ámbito de Bloque</strong>: Variables declaradas con <code>let</code> y <code>const</code> dentro de cualquier bloque delimitado por llaves <code>{ ... }</code> (como <code>if</code>, <code>for</code> o <code>while</code>).</li>
        </ol>

        <h4>B. Funciones como Ciudadanos de Primera Clase y Callbacks</h4>
        <p>En JavaScript, las funciones son valores: pueden asignarse a variables, guardarse en arrays, pasarse como argumentos a otras funciones y retornarse desde funciones:</p>
        <ul>
          <li><strong>Callback</strong>: Es una función que se pasa como argumento a otra función con la intención de que sea ejecutada en un momento posterior (por ejemplo, al completarse una tarea o al producirse un evento):</li>
        </ul>
        <pre><code class="language-javascript">function procesarUsuario(id, onSuccess) {
  // Simulación de búsqueda de datos
  const usuario = { id, nombre: "Lucía", rol: "Desarrolladora" };
  onSuccess(usuario); // Invocación del callback
}

procesarUsuario(101, (u) => console.log("Usuario recibido:", u.nombre));</code></pre>

        <h4>C. Clausuras (Closures): Estado Privado sin Clases</h4>
        <p>Una <strong>clausura (closure)</strong> se produce cuando una función interna "recuerda" y mantiene acceso a las variables de su función contenedora (ámbito léxico superior), <em>incluso después de que la función exterior haya terminado de ejecutarse y haya retornado</em>.</p>
        <p>¿Por qué es vital en FP? Porque permite <strong>encapsular datos</strong> y crear variables privadas que no pueden ser modificadas directamente desde la consola global del navegador.</p>
        <pre><code class="language-javascript">function crearContador(valorInicial = 0) {
  let contadorPrivado = valorInicial; // Variable oculta y protegida

  return {
    incrementar: () => ++contadorPrivado,
    decrementar: () => --contadorPrivado,
    obtenerValor: () => contadorPrivado
  };
}

const miContador = crearContador(10);
console.log(miContador.incrementar()); // 11
console.log(miContador.obtenerValor()); // 11
// miContador.contadorPrivado es undefined (¡está protegido!)</code></pre>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Mecanismo del Motor V8',
        text: 'Cuando una función interna referencia variables de su padre, el recolector de basura (Garbage Collector) no destruye ese entorno de variables al retornar, sino que lo preserva en memoria en una estructura llamada <em>Closure Scope</em>.'
      },
      examples: [
        {
          id: 'ex-4-2-closures-callbacks',
          title: 'Ejemplo Práctico 2: Generador de Tickets con Estado Privado (Closure)',
          description: 'Observa cómo una función factoría genera un sistema de turnos de ventanilla donde el número de turno no puede ser alterado externamente.',
          initialCode: `// Demostración de Closure y Encapsulación
console.log("=== Sistema de Turnos de Secretaría (Closure) ===");

function crearGestorTurnos(prefijo = "TURNO") {
  let ultimoNumero = 0; // Estado encapsulado y privado

  return {
    emitirTicket: (cliente) => {
      ultimoNumero++;
      const codigo = \`\${prefijo}-\${String(ultimoNumero).padStart(3, "0")}\`;
      return { codigo, cliente, fecha: new Date().toLocaleTimeString() };
    },
    obtenerTotalAtendidos: () => ultimoNumero,
    reiniciarTurnos: () => {
      const previo = ultimoNumero;
      ultimoNumero = 0;
      return \`Reiniciado. Se atendieron \${previo} personas.\`;
    }
  };
}

const ventanilla1 = crearGestorTurnos("DOC");
const ventanilla2 = crearGestorTurnos("INFO");

console.log(ventanilla1.emitirTicket("María Sánchez"));
console.log(ventanilla1.emitirTicket("Carlos Gil"));
console.log(ventanilla2.emitirTicket("Ana Belén"));

console.log("Total Ventanilla 1:", ventanilla1.obtenerTotalAtendidos()); // 2
console.log("Total Ventanilla 2:", ventanilla2.obtenerTotalAtendidos()); // 1`
        }
      ]
    },

    {
      id: 'apartado-4-3-arrays-creacion-inicializacion',
      title: '4.3 Creación, Inicialización y Manipulación Básica de Arrays',
      criteriaRef: 'Criterios c), d)',
      description: 'Concepto de arrays en JavaScript, sintaxis de inicialización (literal [], Array.of, Array.from), propiedad length, operaciones de pila/cola (push, pop, unshift, shift) y operador spread.',
      theoryHtml: `
        <p>En JavaScript, un <strong>Array</strong> es un objeto especial de tipo lista ordenada cuyos elementos están indexados numéricamente comenzando desde la posición <code>0</code>. A diferencia de lenguajes estrictos como Java o C++, los arrays en JavaScript son <strong>dinámicos</strong> (crecen o menguan automáticamente) y <strong>heterogéneos</strong> (pueden almacenar datos de distintos tipos simultáneamente, aunque las buenas prácticas aconsejan homogeneidad).</p>

        <h4>A. Formas de Creación e Inicialización</h4>
        <ol>
          <li><strong>Notación literal <code>[]</code> (Recomendada)</strong>:
            <br><code>const modulos = ["DWEC", "DWES", "DIW", "DAW"];</code>
          </li>
          <li><strong>Constructor <code>new Array()</code> y su trampa clásica</strong>:
            <ul>
              <li><code>new Array("HTML", "CSS")</code> crea <code>["HTML", "CSS"]</code>.</li>
              <li><code>new Array(4)</code> <strong>NO</strong> crea un array con el número 4, sino un array con 4 posiciones vacías (<em>empty slots</em>), con <code>length: 4</code>. Por esta ambigüedad suele desaconsejarse.</li>
            </ul>
          </li>
          <li><strong><code>Array.of(...elementos)</code></strong>: Soluciona la trampa anterior. <code>Array.of(4)</code> crea siempre <code>[4]</code>.</li>
          <li><strong><code>Array.from(iterable, mapFn)</code></strong>: Convierte colecciones semejantes a arrays (como un <code>NodeList</code> del DOM o una cadena) en un array real de JavaScript.</li>
        </ol>

        <h4>B. La Propiedad <code>length</code> y Vaciamiento Rápido</h4>
        <p>La propiedad <code>length</code> refleja la cantidad de elementos. No es de sólo lectura: asignar un valor menor <strong>trunca</strong> el array de forma destructiva:</p>
        <pre><code class="language-javascript">const notas = [7, 8, 9, 10];
notas.length = 2; // El array ahora es [7, 8]
notas.length = 0; // Vía rápida para vaciar completamente el array</code></pre>

        <h4>C. Operaciones Básicas de Pila y Cola</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: var(--bg-surface-2); border-bottom: 2px solid var(--border-color);">
              <th style="padding: 8px; text-align: left;">Método</th>
              <th style="padding: 8px; text-align: left;">Ubicación</th>
              <th style="padding: 8px; text-align: left;">Acción</th>
              <th style="padding: 8px; text-align: left;">Retorna</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 8px;"><code>push(...elems)</code></td>
              <td style="padding: 8px;">Final</td>
              <td style="padding: 8px;">Inserta uno o más elementos</td>
              <td style="padding: 8px;">Nueva longitud (<code>length</code>)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 8px;"><code>pop()</code></td>
              <td style="padding: 8px;">Final</td>
              <td style="padding: 8px;">Extrae y elimina el último elemento</td>
              <td style="padding: 8px;">El elemento extraído</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 8px;"><code>unshift(...elems)</code></td>
              <td style="padding: 8px;">Principio</td>
              <td style="padding: 8px;">Inserta elementos al inicio</td>
              <td style="padding: 8px;">Nueva longitud (<code>length</code>)</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><code>shift()</code></td>
              <td style="padding: 8px;">Principio</td>
              <td style="padding: 8px;">Extrae y elimina el primer elemento</td>
              <td style="padding: 8px;">El elemento extraído</td>
            </tr>
          </tbody>
        </table>

        <h4>D. Desestructuración y Operador Spread (<code>...</code>) en Arrays</h4>
        <p>Permite extraer posiciones de forma limpia y clonar listas sin mutación:</p>
        <pre><code class="language-javascript">const colores = ["Rojo", "Verde", "Azul", "Amarillo"];
const [primero, segundo, ...resto] = colores;
// primero = "Rojo", segundo = "Verde", resto = ["Azul", "Amarillo"]

// Clonación inmutable:
const copiaColores = [...colores];</code></pre>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica de Examen FP',
        text: '¿Qué diferencia hay entre <code>new Array(3)</code> y <code>[3]</code>? <code>new Array(3)</code> genera un array vacío de longitud 3 con 3 posiciones sin definir (empty slots). Por el contrario, <code>[3]</code> crea un array con un único elemento (el número 3) y longitud 1.'
      },
      examples: [
        {
          id: 'ex-4-3-arrays-basico',
          title: 'Ejemplo Práctico 3: Operaciones de Pila, Cola y Spread en Arrays',
          description: 'Experimenta con la inserción y extracción en extremos de un array, y comprueba cómo fusionar y clonar listas de forma inmutable.',
          initialCode: `// Demostración de arrays básicos y operaciones de cola
console.log("=== 1. Gestión de Cola de Tareas (Queue) ===");
const colaTareas = ["Instalar Node.js", "Configurar VS Code"];

// Añadir al final (push)
colaTareas.push("Aprender Arrays en JS", "Realizar Retos RA4");
console.log("Cola tras push:", colaTareas);

// Atender el primero (shift - FIFO: First In, First Out)
const tareaAtendida = colaTareas.shift();
console.log("Tarea atendida:", tareaAtendida);
console.log("Cola restante:", colaTareas);

console.log("\\n=== 2. Desestructuración y Operador Spread ===");
const lenguajesFrontend = ["HTML", "CSS", "JavaScript"];
const lenguajesBackend = ["Node.js", "PHP"];

// Fusión inmutable con spread
const stackCompleto = [...lenguajesFrontend, ...lenguajesBackend, "SQL"];
console.log("Stack fusionado:", stackCompleto);

// Desestructuración con rest
const [lenguaje1, lenguaje2, ...demas] = stackCompleto;
console.log("Principal:", lenguaje1, "| Secundario:", lenguaje2);
console.log("Restantes:", demas);`
        }
      ]
    },

    {
      id: 'apartado-4-4-arrays-metodos-recorrido-iteracion',
      title: '4.4 Recorrido y Métodos Modernos de Iteración de Arrays',
      criteriaRef: 'Criterios c), d)',
      description: 'Recorrido imperativo frente a programación declarativa de orden superior: forEach, map, filter, reduce, find, some, every, slice vs splice, y ordenación con sort().',
      theoryHtml: `
        <p>El dominio de los métodos de iteración de arrays es una de las competencias más valoradas en el currículo de Formación Profesional. Permite escribir código expresivo, conciso y libre de bucles manuales.</p>

        <h4>A. Recorridos Tradicionales vs Declarativos</h4>
        <ul>
          <li><code>for (let i = 0; i &lt; arr.length; i++)</code>: Control manual del índice. Permite <code>break</code> y <code>continue</code>.</li>
          <li><code>for (const item of arr)</code>: Sintaxis limpia para recorrer los valores directamente.</li>
          <li><code>arr.forEach((item, index) => { ... })</code>: Itera ejecutando un callback por cada elemento. <em>Siempre devuelve <code>undefined</code></em>; se utiliza únicamente para producir efectos secundarios (como imprimir en consola o modificar el DOM).</li>
        </ul>

        <h4>B. Métodos Declarativos Esenciales (Inmutables)</h4>
        <p>Estos métodos <strong>no modifican el array original</strong>, sino que generan un nuevo array o un valor acumulado:</p>
        <ul>
          <li><strong><code>map(callback)</code></strong>: Transforma cada elemento del array devolviendo un nuevo array con la misma longitud:
            <br><code>[1, 2, 3].map(x => x * 10) // [10, 20, 30]</code>
          </li>
          <li><strong><code>filter(callback)</code></strong>: Filtra los elementos evaluando una condición booleana. Devuelve un nuevo array con aquellos elementos que devuelvan <code>true</code>:
            <br><code>[4, 8, 3, 9].filter(n => n >= 5) // [8, 9]</code>
          </li>
          <li><strong><code>reduce(callback, valorInicial)</code></strong>: Reduce todos los elementos a un único resultado acumulado (suma, media, objeto agrupador):
            <br><code>[10, 20, 30].reduce((acumulador, actual) => acumulador + actual, 0) // 60</code>
          </li>
        </ul>

        <h4>C. Métodos de Búsqueda y Verificación</h4>
        <ul>
          <li><strong><code>find(callback)</code></strong>: Devuelve el <em>primer elemento</em> que cumpla el criterio, o <code>undefined</code> si ninguno coincide.</li>
          <li><strong><code>findIndex(callback)</code></strong>: Devuelve el índice del primer elemento coincidente, o <code>-1</code>.</li>
          <li><strong><code>includes(valor)</code></strong>: Devuelve <code>true</code> o <code>false</code> si el valor exacto existe en el array.</li>
          <li><strong><code>some(callback)</code></strong>: Devuelve <code>true</code> si <em>al menos un</em> elemento cumple la condición.</li>
          <li><strong><code>every(callback)</code></strong>: Devuelve <code>true</code> sólo si <em>todos</em> los elementos cumplen la condición.</li>
        </ul>

        <h4>D. Métodos Mutables vs Inmutables: <code>splice()</code> vs <code>slice()</code></h4>
        <ul>
          <li><strong><code>slice(inicio, fin)</code> (Inmutable)</strong>: Extrae una porción del array sin modificar el original. Admite índices negativos.</li>
          <li><strong><code>splice(inicio, cantidadBorrar, ...nuevosElems)</code> (Mutable)</strong>: Modifica directamente el array original, eliminando e insertando elementos en cualquier posición.</li>
          <li><strong><code>sort(comparadorFn)</code> (Mutable)</strong>: Ordena el array original <em>in situ</em>. ¡Atención! Por defecto ordena convirtiendo a cadenas alfabéticas. Para ordenar números de forma ascendente es obligatorio pasar la función comparadora:
            <br><code>numeros.sort((a, b) => a - b);</code>
          </li>
        </ul>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Trampa Clásica de Examen FP',
        text: '¿Por qué <code>[5, 20, 100, 1].sort()</code> devuelve <code>[1, 100, 20, 5]</code>? Porque el método <code>sort()</code> sin argumentos convierte los valores a cadenas de texto e inspecciona sus códigos UTF-16 ("100" empieza por "1", luego va antes que "20"). Para ordenar números se debe usar siempre: <code>arr.sort((a, b) => a - b)</code>.'
      },
      examples: [
        {
          id: 'ex-4-4-arrays-metodos-avanzados',
          title: 'Ejemplo Práctico 4: Procesamiento de Alumnos con map, filter y reduce',
          description: 'Aprende a encadenar métodos funcionales para calcular estadísticas académicas sin escribir un solo bucle manual.',
          initialCode: `// Demostración de procesamiento de datos con map, filter y reduce
const alumnos = [
  { nombre: "Javier", modulo: "DWEC", nota: 4.2 },
  { nombre: "Beatriz", modulo: "DWEC", nota: 8.5 },
  { nombre: "Marcos", modulo: "DWEC", nota: 6.0 },
  { nombre: "Lucía", modulo: "DWEC", nota: 9.8 },
  { nombre: "Pedro", modulo: "DWEC", nota: 4.8 }
];

console.log("=== 1. Alumnos Aprobados (filter) ===");
const aprobados = alumnos.filter(a => a.nota >= 5);
console.log(aprobados);

console.log("\\n=== 2. Diplomas Generados (map) ===");
const diplomas = aprobados.map(a => \`¡Enhorabuena \${a.nombre}! Calificación: \${a.nota}\`);
console.log(diplomas);

console.log("\\n=== 3. Nota Media de la Clase (reduce) ===");
const sumaTotalNotas = alumnos.reduce((acumulado, alumno) => acumulado + alumno.nota, 0);
const notaMedia = Number((sumaTotalNotas / alumnos.length).toFixed(2));
console.log(\`Nota media global (\${alumnos.length} alumnos): \${notaMedia}\`);

console.log("\\n=== 4. Búsqueda y Validación (find, every) ===");
const sobresaliente = alumnos.find(a => a.nota >= 9);
console.log("Primer sobresaliente encontrado:", sobresaliente);

const todosAprobados = alumnos.every(a => a.nota >= 5);
console.log("¿Han aprobado todos?:", todosAprobados); // false`
        }
      ]
    },

    {
      id: 'apartado-4-5-creacion-objetos-literales',
      title: '4.5 Creación de Objetos Literales, Propiedades y Métodos',
      criteriaRef: 'Criterios e), f), g)',
      description: 'Estructuras de objetos en JavaScript: pares clave-valor, notación punto y corchetes, métodos, enlace léxico de this, desestructuración y utilidades de Object.',
      theoryHtml: `
        <p>Un <strong>objeto</strong> en JavaScript es una colección no ordenada de propiedades compuestas por un par clave-valor. Si el valor es un dato primitivo o compuesto se denomina <strong>propiedad</strong>; si el valor es una función que opera sobre ese objeto, se denomina <strong>método</strong>.</p>

        <h4>A. Notación Literal de Objetos</h4>
        <p>Es la forma más directa y utilizada para agrupar datos relacionados:</p>
        <pre><code class="language-javascript">const curso = {
  codigo: "0612",
  nombre: "Desarrollo Web en Entorno Cliente",
  horas: 140,
  activo: true
};</code></pre>

        <h4>B. Acceso a Propiedades: Punto vs Corchetes</h4>
        <ul>
          <li><strong>Notación por punto (<code>obj.propiedad</code>)</strong>: Acceso rápido y legible cuando el identificador es estático y válido.</li>
          <li><strong>Notación por corchetes (<code>obj["propiedad"]</code>)</strong>: Imprescindible cuando la clave:
            <ol>
              <li>Proviene de una variable dinámica: <code>const campo = "nombre"; obj[campo];</code></li>
              <li>Contiene caracteres especiales o espacios: <code>obj["codigo-postal"]</code>.</li>
            </ol>
          </li>
        </ul>

        <h4>C. Métodos y el Uso de <code>this</code></h4>
        <p>Los métodos permiten a los objetos tener comportamiento. Dentro de una función de método tradicional, la palabra reservada <strong><code>this</code></strong> hace referencia al propio objeto que está ejecutando el método:</p>
        <pre><code class="language-javascript">const servidor = {
  host: "127.0.0.1",
  puerto: 8080,
  estado: "detenido",
  iniciar() {
    this.estado = "en ejecución";
    return \`Servidor iniciado en \${this.host}:\${this.puerto}\`;
  }
};</code></pre>
        <p><em>¡Cuidado docente!</em> <strong>Nunca utilices funciones flecha para definir métodos de objetos literales</strong> si necesitas acceder a <code>this</code>. Las funciones flecha no tienen su propio <code>this</code> y apuntarán al ámbito global (<code>window</code>), resultando en <code>undefined</code>.</p>

        <h4>D. Desestructuración de Objetos con Valores por Defecto y Renombrado</h4>
        <pre><code class="language-javascript">const config = { tema: "dark", timeout: 5000 };
// Extraemos variables directamente, con valor por defecto y alias:
const { tema, timeout, reintentos = 3, tema: estiloVisual } = config;</code></pre>

        <h4>E. Métodos Estáticos de la Clase <code>Object</code></h4>
        <ul>
          <li><code>Object.keys(obj)</code>: Devuelve un array con las claves (nombres de propiedad).</li>
          <li><code>Object.values(obj)</code>: Devuelve un array con los valores correspondientes.</li>
          <li><code>Object.entries(obj)</code>: Devuelve una matriz de pares <code>[clave, valor]</code>, ideal para recorrer con <code>for (const [k, v] of Object.entries(obj))</code>.</li>
          <li><code>Object.assign(destino, ...fuentes)</code>: Copia propiedades de uno o varios objetos al destino.</li>
        </ul>
      `,
      callout: {
        type: 'architecture',
        title: 'Buenas Prácticas de Arquitectura',
        text: 'Al diseñar objetos en JavaScript, aplica el principio de <strong>separación de responsabilidades</strong>: utiliza objetos literales para estructuras de datos planas (DTOs o configuración) y reserva las Clases ES6 cuando requieras instanciación masiva, validación en constructores o herencia jerárquica.'
      },
      examples: [
        {
          id: 'ex-4-5-objetos-literales',
          title: 'Ejemplo Práctico 5: Gestión de Artículos con Métodos y Desestructuración',
          description: 'Crea un objeto literal con métodos de cálculo dinámicos, manipula sus propiedades por corchetes y explora sus claves con Object.entries.',
          initialCode: `// Demostración de objetos literales y métodos
console.log("=== 1. Objeto Producto con Métodos ===");
const producto = {
  id: "ART-992",
  descripcion: "Teclado Mecánico RGB",
  precioBase: 79.99,
  ivaPorcentaje: 21,
  stock: 15,

  // Método con acceso a this
  calcularPrecioFinal(descuentoPorcentaje = 0) {
    const conDescuento = this.precioBase * (1 - descuentoPorcentaje / 100);
    const conIva = conDescuento * (1 + this.ivaPorcentaje / 100);
    return Number(conIva.toFixed(2));
  },

  vender(unidades = 1) {
    if (this.stock >= unidades) {
      this.stock -= unidades;
      return \`Venta realizada. Quedan \${this.stock} unidades en stock.\`;
    }
    return "Error: Stock insuficiente.";
  }
};

console.log("Precio normal:", producto.calcularPrecioFinal(), "€");
console.log("Precio con 10% dto:", producto.calcularPrecioFinal(10), "€");
console.log(producto.vender(3));

console.log("\\n=== 2. Inspección con Object.entries() ===");
for (const [clave, valor] of Object.entries(producto)) {
  if (typeof valor !== "function") {
    console.log(\`• \${clave.toUpperCase()}: \${valor}\`);
  }
}`
        }
      ]
    },

    {
      id: 'apartado-4-6-poo-clases-es6-herencia',
      title: '4.6 Programación Orientada a Objetos: Clases ES6 y Prototipos',
      criteriaRef: 'Criterios e), f), g), h)',
      description: 'El paradigma orientado a objetos en JavaScript: clases ES6, método constructor, propiedades públicas y privadas (#), getters y setters, y herencia con extends y super().',
      theoryHtml: `
        <p>A diferencia de lenguajes tradicionales basados en clases como Java o C#, el modelo subyacente de JavaScript es la <strong>herencia basada en prototipos</strong>. Cada objeto tiene un enlace interno a otro objeto denominado su <em>prototipo</em>. A partir de ECMAScript 2015 (ES6), JavaScript introdujo la sintaxis de <strong>Clases (<code>class</code>)</strong> como una capa de "azúcar sintáctico" sobre los prototipos, ofreciendo una estructura clara, familiar y profesional.</p>

        <h4>A. Estructura de una Clase en ES6</h4>
        <pre><code class="language-javascript">class Alumno {
  // 1. Constructor: se ejecuta al hacer 'new Alumno(...)'
  constructor(nombre, expediente) {
    this.nombre = nombre;
    this.expediente = expediente;
    this.calificaciones = [];
  }

  // 2. Método de instancia
  anadirNota(nota) {
    if (nota >= 0 && nota <= 10) {
      this.calificaciones.push(nota);
    }
  }

  // 3. Getter: propiedad computada que se lee sin paréntesis
  get notaMedia() {
    if (this.calificaciones.length === 0) return 0;
    const suma = this.calificaciones.reduce((acc, n) => acc + n, 0);
    return Number((suma / this.calificaciones.length).toFixed(2));
  }
}

const ana = new Alumno("Ana Morales", "EXP-2024-01");
ana.anadirNota(8.5);
ana.anadirNota(9.2);
console.log(ana.notaMedia); // 8.85 (se accede como propiedad)</code></pre>

        <h4>B. Encapsulación y Campos Privados (<code>#campoPrivado</code>)</h4>
        <p>Desde el estándar ES2022, JavaScript soporta de forma nativa campos verdaderamente privados usando el prefijo almohadilla <code>#</code>. Cualquier intento de leer o escribir en ellos desde fuera de la clase producirá un error sintáctico:</p>
        <pre><code class="language-javascript">class CuentaBancaria {
  #saldo = 0; // Propiedad privada inaccesible desde el exterior

  constructor(titular, saldoInicial) {
    this.titular = titular;
    this.#saldo = Math.max(0, saldoInicial);
  }

  ingresar(cantidad) {
    if (cantidad > 0) this.#saldo += cantidad;
  }

  get saldoActual() {
    return this.#saldo;
  }
}</code></pre>

        <h4>C. Herencia Jerárquica con <code>extends</code> y <code>super()</code></h4>
        <p>Una clase puede heredar atributos y métodos de una clase padre usando <code>extends</code>:</p>
        <ul>
          <li><strong>La llamada a <code>super(...args)</code></strong>: En el constructor de la clase hija, es <strong>obligatorio</strong> invocar a <code>super()</code> antes de utilizar la palabra <code>this</code>. Invoca al constructor de la clase base.</li>
          <li><strong>Sobreescritura de métodos (Polimorfismo)</strong>: La clase derivada puede redefinir un método del padre para personalizar su comportamiento.</li>
        </ul>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica de Examen FP',
        text: '¿Qué sucede si en el constructor de una clase hija que usa <code>extends</code> intentas hacer <code>this.propiedad = valor;</code> antes de invocar a <code>super()</code>? El motor de JavaScript lanza un <strong>ReferenceError</strong> inmediato, ya que el objeto <code>this</code> no existe en la memoria de la subclase hasta que el constructor padre (<code>super</code>) ha terminado de inicializarse.'
      },
      examples: [
        {
          id: 'ex-4-6-clases-herencia',
          title: 'Ejemplo Práctico 6: Jerarquía de Vehículos con Clases, Getters y Herencia',
          description: 'Implementa una clase base Vehiculo y una subclase CocheElectrico, comprobando el funcionamiento de constructor, super() y métodos polimórficos.',
          initialCode: `// Demostración de Programación Orientada a Objetos en ES6
console.log("=== Jerarquía de Clases y Herencia ===");

class Vehiculo {
  constructor(marca, modelo, anio) {
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.kilometros = 0;
  }

  conducir(km) {
    if (km > 0) {
      this.kilometros += km;
      console.log(\`\${this.marca} \${this.modelo} ha recorrido \${km} km.\`);
    }
  }

  obtenerFicha() {
    return \`[\${this.anio}] \${this.marca} \${this.modelo} - Odómetro: \${this.kilometros} km\`;
  }
}

// Subclase que hereda de Vehiculo
class CocheElectrico extends Vehiculo {
  #nivelBateria = 100; // Propiedad privada (0 - 100%)

  constructor(marca, modelo, anio, capacidadKWh) {
    super(marca, modelo, anio); // Obligatorio antes de tocar this
    this.capacidadKWh = capacidadKWh;
  }

  conducir(km) {
    super.conducir(km);
    // Consumo estimado: 1% de batería por cada 5 km
    const consumo = km / 5;
    this.#nivelBateria = Math.max(0, this.#nivelBateria - consumo);
    console.log(\`Batería restante: \${this.#nivelBateria.toFixed(1)}%\`);
  }

  get bateria() {
    return \`\${this.#nivelBateria.toFixed(1)}%\`;
  }
}

const miTesla = new CocheElectrico("Tesla", "Model 3", 2024, 75);
console.log(miTesla.obtenerFicha());
miTesla.conducir(150);
console.log("Nivel de batería consultado con getter:", miTesla.bateria);`
        }
      ]
    },

    {
      id: 'apartado-4-7-inmutabilidad-depuracion-objetos',
      title: '4.7 Manipulación Segura, Inmutabilidad y Depuración de Objetos',
      criteriaRef: 'Criterios h), i)',
      description: 'Paso por referencia vs valor, clonación superficial (spread) frente a clonación profunda (structuredClone), congelación (Object.freeze) y depuración técnica en DevTools.',
      theoryHtml: `
        <p>Uno de los mayores focos de fallos en aplicaciones de desarrollo cliente proviene de la confusión entre <strong>tipos primitivos</strong> (se copian por valor) y <strong>objetos / arrays</strong> (se copian por referencia en memoria).</p>

        <h4>A. Paso por Valor vs Paso por Referencia</h4>
        <pre><code class="language-javascript">// Primitivos (por valor):
let a = 10;
let b = a;
b = 20; // 'a' sigue valiendo 10

// Objetos (por referencia):
const usuario1 = { nombre: "David" };
const usuario2 = usuario1; // Copia el puntero de memoria
usuario2.nombre = "Elena";
console.log(usuario1.nombre); // ¡Imprime "Elena"! Ambos comparten el mismo objeto</code></pre>

        <h4>B. Clonación Superficial (Shallow) vs Profunda (Deep)</h4>
        <ul>
          <li><strong>Copia superficial con Spread (<code>{ ...obj }</code> o <code>[...arr]</code>)</strong>: Clona el nivel superior. Si el objeto contiene objetos anidados, las referencias internas seguirán compartidas.</li>
          <li><strong>Copia profunda moderna con <code>structuredClone(obj)</code></strong>: API nativa del navegador que clona recursivamente el objeto completo, independizando todos los niveles de anidamiento sin alterar referencias.</li>
        </ul>

        <h4>C. Congelación e Inmutabilidad con <code>Object.freeze()</code></h4>
        <p>Permite asegurar que un objeto de configuración no sufra modificaciones accidentales durante la ejecución de la aplicación web:</p>
        <ul>
          <li><code>Object.freeze(obj)</code>: Impide añadir nuevas propiedades, eliminar existentes o modificar sus valores. El objeto queda completamente protegido. En modo estricto (<code>"use strict"</code>), intentar modificarlo arroja un <code>TypeError</code>.</li>
          <li><code>Object.seal(obj)</code>: Permite modificar los valores de propiedades ya existentes, pero prohíbe añadir o borrar propiedades.</li>
        </ul>

        <h4>D. Depuración Profesional en Navegador (DevTools)</h4>
        <p>Para depurar estructuras de datos complejas sin saturar la consola con <code>console.log</code> genéricos:</p>
        <ul>
          <li><strong><code>console.table(coleccion)</code></strong>: Renderiza arrays de objetos en una tabla visual estructurada con columnas y ordenación interactiva.</li>
          <li><strong><code>console.dir(objeto)</code></strong>: Muestra el árbol jerárquico navegable con todas las propiedades y métodos del objeto y su prototipo.</li>
          <li><strong>Sentencia <code>debugger;</code></strong>: Si las herramientas de desarrollo (F12) están abiertas, pausa automáticamente la ejecución en esa línea exacta, permitiendo inspeccionar el estado de las variables paso a paso.</li>
        </ul>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Buenas Prácticas Profesionales FP',
        text: 'En arquitecturas web modernas se recomienda programar bajo el principio de <strong>Inmutabilidad por Defecto</strong>: en lugar de modificar los objetos que recibes por parámetro, clónalos con el operador spread o <code>structuredClone</code> y retorna una nueva versión con los cambios. Esto previene efectos colaterales imprevistos.'
      },
      examples: [
        {
          id: 'ex-4-7-inmutabilidad-depuracion',
          title: 'Ejemplo Práctico 7: Clonación Segura, Object.freeze y Diagnóstico en Tabla',
          description: 'Aprende a evitar la mutación involuntaria mediante structuredClone, asegura la inmutabilidad con Object.freeze y visualiza datos con console.table.',
          initialCode: `// Demostración de inmutabilidad y depuración profesional
console.log("=== 1. Clonación Segura con structuredClone ===");
const perfilDocente = {
  nombre: "Raúl",
  centro: "CIFP FP Informática",
  modulos: ["DWEC", "DIW"]
};

// Clonamos en profundidad
const copiaIndependiente = structuredClone(perfilDocente);
copiaIndependiente.modulos.push("Proyecto Intermodular");

console.log("Módulos original:", perfilDocente.modulos); // ["DWEC", "DIW"] (¡Intacto!)
console.log("Módulos copia:", copiaIndependiente.modulos);

console.log("\\n=== 2. Congelación de Configuración con Object.freeze ===");
const CONFIG_APP = Object.freeze({
  API_URL: "https://api.cifp.es/v1",
  TIMEOUT_MS: 3000,
  VERSION: "2.4.0"
});

console.log("¿Está congelado?:", Object.isFrozen(CONFIG_APP)); // true
// CONFIG_APP.TIMEOUT_MS = 5000; // En modo estricto causaría error TypeError

console.log("\\n=== 3. Diagnóstico Visual con console.table ===");
const inventario = [
  { ref: "A01", producto: "Portátil i7", stock: 12, precio: 850 },
  { ref: "A02", producto: "Monitor 27\\"", stock: 25, precio: 199.99 },
  { ref: "A03", producto: "Ratón Óptico", stock: 4, precio: 18.50 }
];

console.table(inventario);`
        }
      ]
    }
  ],

  // =========================================================================
  // BATERÍA DE 10 PREGUNTAS DE AUTOEVALUACIÓN (TIPO TEST OFICIAL FP)
  // Con explicaciones pedagógicas exhaustivas basadas en los criterios b) a i)
  // =========================================================================
  quizzes: [
    {
      id: 'quiz-ra4-1',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Funciones: Hoisting de Declaraciones vs Expresiones',
      question: '¿Qué ocurrirá al ejecutar el siguiente fragmento de código?',
      codeSnippet: `console.log(calcularDoble(4));
console.log(calcularTriple(4));

function calcularDoble(n) {
  return n * 2;
}

const calcularTriple = (n) => n * 3;`,
      options: [
        'Imprime 8 y luego imprime 12 con normalidad',
        'Imprime 8, pero en la segunda línea lanza un ReferenceError porque calcularTriple no está inicializada',
        'Lanza un SyntaxError en la primera línea porque ninguna función puede invocarse antes de su definición',
        'Imprime 8 y luego undefined'
      ],
      correctIndex: 1,
      explanation: 'Las declaraciones de función tradicionales (function calcularDoble) experimentan Hoisting completo: el motor eleva tanto su nombre como su implementación, permitiendo invocarlas antes. Por el contrario, calcularTriple está definida como una expresión con const; las constantes se elevan pero permanecen en la Zona Muerta Temporal (TDZ) hasta su línea de ejecución, lanzando un ReferenceError si se intenta acceder a ellas antes.'
    },

    {
      id: 'quiz-ra4-2',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Funciones Flecha: Contexto de this',
      question: 'Un alumno escribe el siguiente objeto para gestionar un usuario en cliente. Al invocar usuario.saludar(), ¿qué salida se produce en consola?',
      codeSnippet: `const usuario = {
  nombre: "Sara",
  saludar: () => {
    return \`Hola, soy \${this.nombre}\`;
  }
};

console.log(usuario.saludar());`,
      options: [
        '"Hola, soy Sara"',
        '"Hola, soy undefined"',
        'Lanza un TypeError: this.nombre is not a function',
        'Lanza un ReferenceError: this is not defined'
      ],
      correctIndex: 1,
      explanation: 'Las funciones flecha (arrow functions) NO tienen su propio enlace "this". Heredan el "this" del contexto léxico exterior en el que fueron creadas (en este caso el objeto global window en navegadores, o undefined en módulos estrictos). Por tanto, "this.nombre" no busca en el objeto "usuario", sino en window.nombre, resultando en "Hola, soy undefined". Para métodos de objetos literales deben usarse funciones tradicionales (saludar() { ... }).'
    },

    {
      id: 'quiz-ra4-3',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'Parámetros Rest vs arguments',
      question: '¿Cuál es la principal ventaja técnica de utilizar parámetros Rest (...args) frente al arcaico objeto arguments?',
      codeSnippet: `function sumarModerno(...valores) {
  return valores.reduce((acc, v) => acc + v, 0);
}`,
      options: [
        'Los parámetros Rest funcionan únicamente con valores numéricos y los valida automáticamente',
        'Rest genera una instancia real de Array, permitiendo usar directamente métodos como map, filter y reduce sin conversiones',
        'arguments sólo es accesible en navegadores basados en Chromium',
        'Rest parameters no consumen memoria en la pila de ejecución'
      ],
      correctIndex: 1,
      explanation: 'El objeto "arguments" era un objeto semejante a un array (array-like) que contenía length e índices, pero no heredaba de Array.prototype, lo que impedía llamar directamente a .map() o .reduce(). El parámetro Rest (...valores) es un verdadero Array de JavaScript con todos los métodos de orden superior nativos disponibles.'
    },

    {
      id: 'quiz-ra4-4',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Clausuras (Closures) y Encapsulación',
      question: 'Analiza el siguiente código con una clausura (closure). ¿Qué valores se imprimen en las tres llamadas?',
      codeSnippet: `function crearAcumulador(incremento) {
  let total = 0;
  return function() {
    total += incremento;
    return total;
  };
}

const sumarCinco = crearAcumulador(5);
console.log(sumarCinco());
console.log(sumarCinco());
const sumarDiez = crearAcumulador(10);
console.log(sumarDiez());`,
      options: [
        '5, 10, 10',
        '5, 5, 10',
        '5, 10, 20',
        'undefined, undefined, undefined'
      ],
      correctIndex: 0,
      explanation: 'Cada invocación a "crearAcumulador" crea un nuevo entorno léxico cerrado (closure) independiente. La constante "sumarCinco" mantiene su propia variable "total", que pasa de 0 a 5 en la primera llamada y a 10 en la segunda. Al crear "sumarDiez", se genera una clausura completamente nueva con su propio "total = 0", resultando en 0 + 10 = 10.'
    },

    {
      id: 'quiz-ra4-5',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      topicTag: 'Arrays: map vs forEach',
      question: '¿Cuál es la diferencia fundamental entre los métodos de array forEach() y map()?',
      codeSnippet: `const lista = [1, 2, 3];
const res1 = lista.forEach(n => n * 2);
const res2 = lista.map(n => n * 2);`,
      options: [
        'forEach modifica el array original mientras que map no lo modifica',
        'map devuelve un nuevo array con los resultados transformados, mientras que forEach siempre retorna undefined',
        'forEach es asíncrono y map es síncrono',
        'map solo admite funciones flecha mientras que forEach requiere funciones tradicionales'
      ],
      correctIndex: 1,
      explanation: 'El método forEach() está pensado exclusivamente para producir efectos secundarios y siempre devuelve undefined (res1 valdrá undefined). Por el contrario, map() aplica la función a cada elemento y devuelve un nuevo array con los valores retornados (res2 será [2, 4, 6]).'
    },

    {
      id: 'quiz-ra4-6',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Arrays: Métodos Mutables vs Inmutables',
      question: 'Queremos extraer los dos primeros elementos de un array. ¿Qué método debemos usar si NO queremos que el array original sufra modificaciones?',
      codeSnippet: `const modulos = ["DWEC", "DWES", "DIW", "DAW"];
// ¿slice o splice?`,
      options: [
        'modulos.splice(0, 2) porque es el método estándar de corte',
        'modulos.slice(0, 2) porque crea una copia superficial sin mutar el array original',
        'modulos.shift(2) porque extrae los primeros elementos de la lista',
        'modulos.pop(0, 2) porque opera desde el índice inicial'
      ],
      correctIndex: 1,
      explanation: '"slice(inicio, fin)" es un método inmutable que retorna una copia de la porción solicitada sin alterar el array de origen. En cambio, "splice()" es destructivo y muta directamente el array original, eliminando los elementos correspondientes de él.'
    },

    {
      id: 'quiz-ra4-7',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'Objetos: Desestructuración con Alias',
      question: 'En el siguiente fragmento de desestructuración de objetos, ¿qué variables quedan declaradas en el ámbito actual?',
      codeSnippet: `const servidor = { host: "localhost", port: 3000 };
const { host: dominio, port: puerto, ssl = false } = servidor;`,
      options: [
        'servidor, host, port',
        'dominio, puerto, ssl',
        'host, port, ssl',
        'host, dominio, port, puerto, ssl'
      ],
      correctIndex: 1,
      explanation: 'La sintaxis "{ propiedad: alias }" extrae la propiedad "host" pero la asigna a una nueva variable denominada "dominio", y "port" a "puerto". Además, "ssl = false" declara la variable "ssl" con su valor por defecto. Por consiguiente, las variables creadas y accesibles son dominio, puerto y ssl.'
    },

    {
      id: 'quiz-ra4-8',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'POO: Clases ES6 y super()',
      question: 'En Programación Orientada a Objetos con ES6, ¿qué ocurre si una subclase extiende de una superclase y accede a this antes de invocar super()?',
      codeSnippet: `class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

class Estudiante extends Persona {
  constructor(nombre, ciclo) {
    this.ciclo = ciclo; // ¿Qué ocurre aquí?
    super(nombre);
  }
}`,
      options: [
        'Funciona perfectamente porque JavaScript inicializa this al entrar al constructor',
        'Lanza un ReferenceError: Must call super constructor in derived class before accessing \'this\'',
        'Lanza un TypeError: super is not defined',
        'La propiedad ciclo se asigna a window en lugar de a la instancia del estudiante'
      ],
      correctIndex: 1,
      explanation: 'En las clases derivadas de ES6, el enlace a la instancia "this" no existe en memoria hasta que el constructor de la superclase ha sido ejecutado mediante "super()". Intentar acceder a "this" antes de invocar a super() produce un ReferenceError inmediato por especificación del lenguaje.'
    },

    {
      id: 'quiz-ra4-9',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      topicTag: 'Objetos: Inmutabilidad con Object.freeze',
      question: '¿Qué diferencia existe entre Object.freeze(obj) y Object.seal(obj)?',
      codeSnippet: `const conf1 = Object.freeze({ timeout: 1000 });
const conf2 = Object.seal({ timeout: 1000 });`,
      options: [
        'freeze congela objetos mientras seal congela arrays exclusivamente',
        'freeze impide cualquier modificación (lectura total), mientras seal permite modificar los valores de propiedades ya existentes pero prohíbe añadir o borrar propiedades',
        'seal cifra las propiedades con algoritmo SHA-256 mientras freeze solo las protege contra escritura',
        'No hay ninguna diferencia; seal es simplemente un alias obsoleto de freeze'
      ],
      correctIndex: 1,
      explanation: 'Object.freeze() crea una inmutabilidad total de primer nivel: no se pueden añadir, borrar ni alterar los valores de las propiedades. Por su parte, Object.seal() "sella" el objeto: prohíbe agregar nuevas claves o eliminar las existentes, pero SÍ permite modificar los valores de las propiedades que ya estuvieran definidas (conf2.timeout = 2000 es válido).'
    },

    {
      id: 'quiz-ra4-10',
      difficulty: 'Medio',
      difficultyClass: 'diff-medio',
      topicTag: 'POO: Propiedades Privadas (#)',
      question: '¿Cuál es la forma estándar moderna (ES2022+) para declarar un campo estrictamente privado en una clase de JavaScript?',
      codeSnippet: `class Usuario {
  // ¿Cómo se declara el campo privado contrasena?
}`,
      options: [
        'Anteponiendo la palabra reservada private: private contrasena;',
        'Anteponiendo el símbolo almohadilla: #contrasena;',
        'Declarándolo con guion bajo: _contrasena;',
        'Envolviendo la clase dentro de un bloque try / catch'
      ],
      correctIndex: 1,
      explanation: 'A partir de ES2022, el estándar oficial de ECMAScript implementó los Private Class Fields utilizando el prefijo "#" (ej: #contrasena). A diferencia de la antigua convención de guion bajo (_contrasena, que seguía siendo pública), los campos con # son forzados por el motor de JavaScript y producen un error de sintaxis si se intenta acceder a ellos desde el exterior de la clase.'
    }
  ],

  // =========================================================================
  // BATERÍA DE 7 RETOS DE PROGRAMACIÓN GUIADA (CODING CHALLENGES)
  // Pruebas unitarias automáticas con ChallengeEvaluator (tipo 'function')
  // =========================================================================
  challenges: [
    {
      id: 'challenge-ra4-1',
      title: 'Reto 1: Calculadora de Estadísticas con Rest Parameters',
      difficulty: 'Básico',
      topicTag: 'Funciones de Usuario y Parámetros Rest (...args)',
      type: 'function',
      functionName: 'calcularEstadisticasNotas',
      instructions: `Crea una función <code>calcularEstadisticasNotas(nombreModulo, ...notas)</code> que procese las calificaciones de un grupo formativo de FP DAW:
      <ul>
        <li>El primer parámetro obligatorio es <code>nombreModulo</code> (cadena).</li>
        <li>El segundo parámetro utiliza la sintaxis Rest <code>...notas</code> para recibir cualquier cantidad de calificaciones numéricas.</li>
        <li>Si no se recibe ninguna nota (<code>notas.length === 0</code>), retorna:
          <br><code>{ modulo: nombreModulo, cantidad: 0, media: 0, maximo: 0, minimo: 0, aprobados: 0 }</code>.</li>
        <li>Si recibe notas:
          <ul>
            <li>Calcula la <code>media</code> redondeada a 2 decimales (como tipo <code>number</code>).</li>
            <li>Calcula la nota <code>maximo</code> y la nota <code>minimo</code> usando <code>Math.max(...notas)</code> y <code>Math.min(...notas)</code>.</li>
            <li>Cuenta cuántas notas son mayores o iguales a <code>5</code> en la propiedad <code>aprobados</code>.</li>
            <li>Asigna a <code>cantidad</code> el total de notas recibidas.</li>
          </ul>
        </li>
      </ul>`,
      starterCode: `/**
 * Calcula métricas estadísticas para un módulo formativo.
 * @param {string} nombreModulo - Nombre del módulo (ej: "DWEC").
 * @param {...number} notas - Lista variable de notas numéricas.
 * @returns {object} Objeto con modulo, cantidad, media, maximo, minimo y aprobados.
 */
function calcularEstadisticasNotas(nombreModulo, ...notas) {
  // TODO: Implementa el cálculo usando el array notas y Math.max / Math.min:

}

// Pruebas en consola local:
console.log(calcularEstadisticasNotas("DWEC", 7, 8.5, 4, 9.2, 5));`,
      hint: 'Usa notas.reduce((acc, n) => acc + n, 0) para la suma y notas.filter(n => n >= 5).length para los aprobados. Recuerda Number((suma / notas.length).toFixed(2)).',
      tests: [
        {
          name: 'Calcula correctamente métricas de un conjunto estándar de notas',
          testFn: `(fn) => {
            const res = fn("DWEC", 7, 8.5, 4, 9.2, 5);
            return res.modulo === "DWEC" &&
                   res.cantidad === 5 &&
                   res.media === 6.74 &&
                   res.maximo === 9.2 &&
                   res.minimo === 4 &&
                   res.aprobados === 4;
          }`,
          error: 'Las métricas calculadas no coinciden con los valores esperados.'
        },
        {
          name: 'Maneja adecuadamente el caso sin notas recibidas',
          testFn: `(fn) => {
            const res = fn("DIW");
            return res.modulo === "DIW" && res.cantidad === 0 && res.media === 0;
          }`,
          error: 'Cuando no se pasan notas debe retornar cantidad: 0 y media: 0.'
        },
        {
          name: 'Calcula correctamente con una única calificación',
          testFn: `(fn) => {
            const res = fn("DWES", 8);
            return res.cantidad === 1 && res.media === 8 && res.maximo === 8 && res.aprobados === 1;
          }`,
          error: 'Fallo al procesar una sola nota.'
        }
      ]
    },

    {
      id: 'challenge-ra4-2',
      title: 'Reto 2: Generador de Contadores Encapsulados (Patrón Closure)',
      difficulty: 'Intermedio',
      topicTag: 'Ámbitos y Clausuras (Closures)',
      type: 'function',
      functionName: 'crearContadorSeguro',
      instructions: `Para garantizar la seguridad en aplicaciones web cliente, el estado interno nunca debe estar expuesto como propiedad pública manipulable desde la consola del navegador.
      <br><br>
      Implementa una función <code>crearContadorSeguro(valorInicial = 0, incremento = 1)</code> que retorne un objeto con 4 métodos:
      <ul>
        <li><code>incrementar()</code>: Suma el valor de <code>incremento</code> al contador privado y devuelve el nuevo valor.</li>
        <li><code>decrementar()</code>: Resta el valor de <code>incremento</code> al contador privado y devuelve el nuevo valor.</li>
        <li><code>obtenerValor()</code>: Devuelve el valor numérico actual sin modificarlo.</li>
        <li><code>reset()</code>: Restablece el contador al <code>valorInicial</code> original y devuelve dicho valor inicial.</li>
        <li><strong>Restricción clave</strong>: La variable interna debe ser local (closure); el objeto devuelto <em>no debe tener ninguna propiedad pública que exponga el número directamente</em> (ej: <code>contador.valor</code> debe ser <code>undefined</code>).</li>
      </ul>`,
      starterCode: `/**
 * Factoría que genera un contador seguro con estado privado encapsulado.
 * @param {number} [valorInicial=0]
 * @param {number} [incremento=1]
 * @returns {object} Métodos incrementar, decrementar, obtenerValor y reset.
 */
function crearContadorSeguro(valorInicial = 0, incremento = 1) {
  // TODO: Declara la variable privada aquí dentro y retorna los métodos:

}

// Pruebas en consola local:
const cont = crearContadorSeguro(10, 2);
console.log("Inicio:", cont.obtenerValor()); // 10
console.log("Tras sumar:", cont.incrementar()); // 12
console.log("Propiedad directa:", cont.valor); // undefined (¡protegido!)`,
      hint: 'Declara "let cuenta = valorInicial;" dentro de la función y retorna un objeto literal con funciones flecha que modifiquen esa variable.',
      tests: [
        {
          name: 'Incrementa y decrementa correctamente según el paso indicado',
          testFn: `(fn) => {
            const c = fn(10, 5);
            return c.incrementar() === 15 && c.incrementar() === 20 && c.decrementar() === 15;
          }`,
          error: 'Las operaciones de incrementar y decrementar no devuelven los valores esperados.'
        },
        {
          name: 'El método reset restablece el contador al valor inicial',
          testFn: `(fn) => {
            const c = fn(100, 10);
            c.incrementar();
            c.incrementar();
            const trasReset = c.reset();
            return trasReset === 100 && c.obtenerValor() === 100;
          }`,
          error: 'El método reset() debe restaurar el contador al valorInicial.'
        },
        {
          name: 'Garantiza la encapsulación privada (sin propiedades expuestas)',
          testFn: `(fn) => {
            const c = fn(0, 1);
            const claves = Object.keys(c);
            const soloMetodos = claves.every(k => typeof c[k] === 'function');
            return soloMetodos && claves.length === 4;
          }`,
          error: 'El objeto solo debe contener los 4 métodos; la variable de contador debe estar oculta en el closure.'
        }
      ]
    },

    {
      id: 'challenge-ra4-3',
      title: 'Reto 3: Gestión de Cola de Espera con Arrays (FIFO / Prioridad)',
      difficulty: 'Básico',
      topicTag: 'Manipulación de Arrays (push, shift, unshift)',
      type: 'function',
      functionName: 'simularColaEspera',
      instructions: `Simula el sistema de turnos de la secretaría de un centro de Formación Profesional.
      <br><br>
      Escribe la función <code>simularColaEspera(colaInicial, operaciones)</code>:
      <ul>
        <li><code>colaInicial</code> es un array de nombres con las personas que ya están esperando (ej: <code>["Ana", "Juan"]</code>).</li>
        <li><code>operaciones</code> es un array de comandos con formato:
          <ul>
            <li><code>{ accion: "LLEGA", nombre: "Carlos" }</code>: Se añade al final de la cola (usa <code>push</code>).</li>
            <li><code>{ accion: "URGENTE", nombre: "Elena" }</code>: Se añade al principio de la cola con máxima prioridad (usa <code>unshift</code>).</li>
            <li><code>{ accion: "ATENDER" }</code>: Se despacha al primer usuario de la cola (usa <code>shift</code>). Si la cola está vacía, no hace nada.</li>
          </ul>
        </li>
        <li><strong>Inmutabilidad</strong>: La función <em>no debe mutar el array <code>colaInicial</code> recibido</em>; debe trabajar sobre una copia (usa el operador spread <code>[...colaInicial]</code>) y devolver la cola final resultante como un nuevo array.</li>
      </ul>`,
      starterCode: `/**
 * Simula la atención en una cola de espera aplicando operaciones FIFO y prioridad.
 * @param {string[]} colaInicial - Lista inicial de personas esperando.
 * @param {Array<{accion: string, nombre?: string}>} operaciones - Lista de acciones.
 * @returns {string[]} Nuevo array con la cola de espera final.
 */
function simularColaEspera(colaInicial, operaciones) {
  // TODO: Clona la colaInicial y procesa cada operación con un bucle o forEach:

}

// Prueba local:
console.log(simularColaEspera(["Ana", "Marcos"], [
  { accion: "LLEGA", nombre: "Pedro" },
  { accion: "ATENDER" },
  { accion: "URGENTE", nombre: "Directora" }
]));`,
      hint: 'Crea const copia = [...colaInicial]; luego itera operaciones con for...of. Usa switch(op.accion) para push, unshift o shift.',
      tests: [
        {
          name: 'Procesa llegadas ordinarias, urgentes y atenciones correctamente',
          testFn: `(fn) => {
            const inicial = ["Ana", "Marcos"];
            const res = fn(inicial, [
              { accion: "LLEGA", nombre: "Pedro" },
              { accion: "ATENDER" },
              { accion: "URGENTE", nombre: "Directora" }
            ]);
            // Tras LLEGA: ["Ana", "Marcos", "Pedro"]
            // Tras ATENDER: ["Marcos", "Pedro"]
            // Tras URGENTE: ["Directora", "Marcos", "Pedro"]
            return JSON.stringify(res) === JSON.stringify(["Directora", "Marcos", "Pedro"]);
          }`,
          error: 'El orden de la cola final no es el correcto tras aplicar las operaciones.'
        },
        {
          name: 'Respeta la inmutabilidad sin alterar el array colaInicial',
          testFn: `(fn) => {
            const inicial = ["Lucía", "Diego"];
            fn(inicial, [{ accion: "ATENDER" }]);
            return inicial.length === 2 && inicial[0] === "Lucía";
          }`,
          error: 'Has modificado el array original colaInicial. Debes trabajar sobre una copia con spread [...colaInicial].'
        },
        {
          name: 'Maneja adecuadamente una cola vacía sin errores al atender',
          testFn: `(fn) => {
            const res = fn([], [{ accion: "ATENDER" }, { accion: "LLEGA", nombre: "Sonia" }]);
            return JSON.stringify(res) === JSON.stringify(["Sonia"]);
          }`,
          error: 'Fallo al atender en una cola vacía.'
        }
      ]
    },

    {
      id: 'challenge-ra4-4',
      title: 'Reto 4: Análisis de Rendimiento Académico con map, filter y reduce',
      difficulty: 'Intermedio',
      topicTag: 'Iteración Funcional de Arrays',
      type: 'function',
      functionName: 'analizarRendimientoGrupo',
      instructions: `Dada una lista de objetos que representan alumnos de FP con la estructura <code>{ nombre: string, modulo: string, nota: number }</code>:
      <br><br>
      Escribe la función <code>analizarRendimientoGrupo(alumnos, notaCorte = 5)</code> que retorne un objeto con:
      <ul>
        <li><code>totalAlumnos</code>: Cantidad total de alumnos matriculados.</li>
        <li><code>aprobados</code>: Array de cadenas con los nombres de los alumnos con <code>nota &gt;= notaCorte</code> en mayúsculas (usa <code>filter</code> y <code>map</code> con <code>toUpperCase()</code>).</li>
        <li><code>tasaAprobadoPorcentaje</code>: Porcentaje de alumnos aprobados respecto al total, redondeado a 1 decimal (ej: <code>75.0</code>). Si no hay alumnos, debe ser <code>0</code>.</li>
        <li><code>notaMediaAprobados</code>: Media de las notas de los aprobados redondeada a 2 decimales (como tipo <code>number</code> con <code>reduce</code>). Si no hay aprobados, debe ser <code>0</code>.</li>
      </ul>`,
      starterCode: `/**
 * Analiza el rendimiento de una clase mediante métodos funcionales.
 * @param {Array<{nombre: string, modulo: string, nota: number}>} alumnos
 * @param {number} [notaCorte=5]
 * @returns {object} Métricas globales calculadas.
 */
function analizarRendimientoGrupo(alumnos, notaCorte = 5) {
  // TODO: Resuelve usando filter, map y reduce sin usar bucles for/while:

}

// Prueba en consola local:
const listaClase = [
  { nombre: "Beatriz", modulo: "DWEC", nota: 8.5 },
  { nombre: "Javier", modulo: "DWEC", nota: 4.0 },
  { nombre: "Lucía", modulo: "DWEC", nota: 9.0 }
];
console.log(analizarRendimientoGrupo(listaClase));`,
      hint: 'Filtra primero const aps = alumnos.filter(a => a.nota >= notaCorte); luego obtén los nombres con aps.map(a => a.nombre.toUpperCase()).',
      tests: [
        {
          name: 'Calcula correctamente todas las métricas para un grupo con aprobados y suspensos',
          testFn: `(fn) => {
            const data = [
              { nombre: "Beatriz", modulo: "DWEC", nota: 8.5 },
              { nombre: "Javier", modulo: "DWEC", nota: 4.0 },
              { nombre: "Lucía", modulo: "DWEC", nota: 9.0 },
              { nombre: "Carlos", modulo: "DWEC", nota: 3.5 }
            ];
            const res = fn(data, 5);
            return res.totalAlumnos === 4 &&
                   JSON.stringify(res.aprobados) === JSON.stringify(["BEATRIZ", "LUCÍA"]) &&
                   res.tasaAprobadoPorcentaje === 50.0 &&
                   res.notaMediaAprobados === 8.75;
          }`,
          error: 'Las métricas de rendimiento no coinciden con los valores esperados.'
        },
        {
          name: 'Maneja adecuadamente el caso en que ningún alumno alcanza la nota de corte',
          testFn: `(fn) => {
            const data = [
              { nombre: "A", modulo: "M", nota: 3 },
              { nombre: "B", modulo: "M", nota: 4 }
            ];
            const res = fn(data, 5);
            return res.aprobados.length === 0 && res.tasaAprobadoPorcentaje === 0 && res.notaMediaAprobados === 0;
          }`,
          error: 'Cuando no hay aprobados, la tasa y la media deben ser 0 sin arrojar NaN o errores.'
        },
        {
          name: 'Maneja un array de alumnos vacío devolviendo contadores a 0',
          testFn: `(fn) => {
            const res = fn([]);
            return res.totalAlumnos === 0 && res.tasaAprobadoPorcentaje === 0;
          }`,
          error: 'Fallo al procesar un array de entrada vacío.'
        }
      ]
    },

    {
      id: 'challenge-ra4-5',
      title: 'Reto 5: Agrupación Contable por Categorías con reduce',
      difficulty: 'Intermedio',
      topicTag: 'Array.prototype.reduce y Acumuladores Objeto',
      type: 'function',
      functionName: 'totalizarVentasPorCategoria',
      instructions: `En aplicaciones de facturación y comercio electrónico, totalizar importes agrupados por categoría es una tarea habitual resuelta elegantemente con <code>reduce</code>.
      <br><br>
      Escribe la función <code>totalizarVentasPorCategoria(ventas)</code>:
      <ul>
        <li>Recibe un array de objetos venta: <code>{ producto: string, categoria: string, unidades: number, precioUnitario: number }</code>.</li>
        <li>Calcula el subtotal de cada venta multiplicando <code>unidades * precioUnitario</code>.</li>
        <li>Utiliza <code>Array.prototype.reduce()</code> para acumular los importes agrupados por categoría.</li>
        <li>Devuelve un objeto plano cuyas claves sean los nombres de las categorías (en minúsculas) y los valores sean los totales acumulados redondeados a 2 decimales (como tipo <code>number</code>).</li>
        <li>Ejemplo de retorno: <code>{ hardware: 850.50, papeleria: 45.20 }</code>. Si el array está vacío, devuelve un objeto vacío <code>{}</code>.</li>
      </ul>`,
      starterCode: `/**
 * Agrupa y totaliza importes de ventas por categoría usando reduce.
 * @param {Array<{producto: string, categoria: string, unidades: number, precioUnitario: number}>} ventas
 * @returns {Record<string, number>} Totales acumulados por categoría.
 */
function totalizarVentasPorCategoria(ventas) {
  // TODO: Utiliza ventas.reduce((acumulador, venta) => { ... }, {})

}

// Prueba en consola local:
const ticket = [
  { producto: "Ratón", categoria: "Hardware", unidades: 2, precioUnitario: 25 },
  { producto: "Cuaderno", categoria: "Papeleria", unidades: 5, precioUnitario: 3.5 },
  { producto: "Teclado", categoria: "Hardware", unidades: 1, precioUnitario: 60 }
];
console.log(totalizarVentasPorCategoria(ticket));`,
      hint: 'Normaliza la categoría con venta.categoria.toLowerCase(). Si no existe en el acumulador inicialízala a 0, y suma el subtotal. Al final redondea cada valor.',
      tests: [
        {
          name: 'Agrupa y suma correctamente varias ventas de distintas categorías',
          testFn: `(fn) => {
            const ticket = [
              { producto: "Ratón", categoria: "Hardware", unidades: 2, precioUnitario: 25 }, // 50
              { producto: "Cuaderno", categoria: "Papeleria", unidades: 4, precioUnitario: 3 }, // 12
              { producto: "Teclado", categoria: "Hardware", unidades: 1, precioUnitario: 60 }, // 60 -> total hw: 110
              { producto: "Bolígrafos", categoria: "Papeleria", unidades: 10, precioUnitario: 1.5 } // 15 -> total pap: 27
            ];
            const res = fn(ticket);
            return res.hardware === 110 && res.papeleria === 27;
          }`,
          error: 'Los importes agrupados por categoría no coinciden con las sumas esperadas.'
        },
        {
          name: 'Devuelve un objeto vacío {} si el array de ventas está vacío',
          testFn: `(fn) => {
            const res = fn([]);
            return typeof res === 'object' && Object.keys(res).length === 0;
          }`,
          error: 'Un array de ventas vacío debe devolver un objeto vacío {}.'
        },
        {
          name: 'Trata categorías con distintas mayúsculas/minúsculas como la misma',
          testFn: `(fn) => {
            const items = [
              { producto: "A", categoria: "LIBROS", unidades: 1, precioUnitario: 20 },
              { producto: "B", categoria: "libros", unidades: 2, precioUnitario: 10 }
            ];
            const res = fn(items);
            return res.libros === 40 && Object.keys(res).length === 1;
          }`,
          error: 'Las categorías deben unificarse en minúsculas.'
        }
      ]
    },

    {
      id: 'challenge-ra4-6',
      title: 'Reto 6: Factoría de Objetos Producto con Métodos y Desestructuración',
      difficulty: 'Intermedio',
      topicTag: 'Objetos Literales, Métodos y this',
      type: 'function',
      functionName: 'crearProductoCatalogo',
      instructions: `Implementa una función fábrica de objetos <code>crearProductoCatalogo(datos)</code> que reciba un objeto con propiedades desestructuradas y construya un producto con métodos funcionales:
      <ul>
        <li>Desestructura de <code>datos</code>: <code>referencia</code>, <code>nombre</code>, <code>precioBase</code>, <code>tipoIva = 21</code> y <code>stock = 0</code>.</li>
        <li>Si <code>precioBase &lt; 0</code>, lanza un <code>Error("El precio base no puede ser negativo")</code>.</li>
        <li>El objeto retornado debe incluir:
          <ul>
            <li>Las propiedades desestructuradas.</li>
            <li>Método <code>obtenerPVP()</code>: Devuelve el precio base con el IVA aplicado (<code>precioBase * (1 + tipoIva / 100)</code>) redondeado a 2 decimales (como tipo <code>number</code>).</li>
            <li>Método <code>vender(unidades = 1)</code>: Si hay suficiente stock (<code>this.stock &gt;= unidades</code>), resta las unidades al stock y devuelve <code>true</code>. Si no hay suficiente stock, no modifica nada y devuelve <code>false</code>.</li>
            <li>Método <code>reponer(unidades)</code>: Si <code>unidades &gt; 0</code>, las suma al stock y devuelve el nuevo stock.</li>
          </ul>
        </li>
      </ul>`,
      starterCode: `/**
 * Fábrica de objetos producto con métodos y control de stock.
 * @param {object} datos - Objeto con referencia, nombre, precioBase, tipoIva y stock.
 * @returns {object} Objeto producto configurado.
 */
function crearProductoCatalogo(datos) {
  // TODO: Desestructura las propiedades y retorna el objeto con métodos utilizando this:

}

// Prueba en consola local:
const teclado = crearProductoCatalogo({
  referencia: "KB-01",
  nombre: "Teclado Mecánico",
  precioBase: 50,
  stock: 10
});
console.log("PVP:", teclado.obtenerPVP()); // 60.5
console.log("Venta:", teclado.vender(3));  // true -> quedan 7
console.log("Stock actual:", teclado.stock);`
        ,
      hint: 'Usa function() tradicional para los métodos dentro del objeto retornado para que "this" apunte a la instancia del producto.',
      tests: [
        {
          name: 'Calcula el PVP con IVA por defecto del 21% correctamente',
          testFn: `(fn) => {
            const p = fn({ referencia: "R1", nombre: "Monitor", precioBase: 100 });
            return p.obtenerPVP() === 121 && p.stock === 0;
          }`,
          error: 'El cálculo del PVP o el stock por defecto no es correcto.'
        },
        {
          name: 'El método vender descuenta stock solo si hay disponibilidad',
          testFn: `(fn) => {
            const p = fn({ referencia: "R2", nombre: "Ratón", precioBase: 20, stock: 5 });
            const venta1 = p.vender(3); // true -> stock 2
            const venta2 = p.vender(5); // false -> stock sigue en 2
            return venta1 === true && venta2 === false && p.stock === 2;
          }`,
          error: 'El método vender() debe retornar false y no modificar el stock si no hay suficientes existencias.'
        },
        {
          name: 'El método reponer incrementa el stock adecuadamente',
          testFn: `(fn) => {
            const p = fn({ referencia: "R3", nombre: "Cable", precioBase: 5, stock: 2 });
            p.reponer(8);
            return p.stock === 10;
          }`,
          error: 'El método reponer() debe incrementar el stock correctamente.'
        },
        {
          name: 'Lanza un Error si el precio base es negativo',
          testFn: `(fn) => {
            try {
              fn({ referencia: "R4", nombre: "Error", precioBase: -10 });
              return false;
            } catch (err) {
              return true;
            }
          }`,
          error: 'Debe lanzar un Error si precioBase es inferior a 0.'
        }
      ]
    },

    {
      id: 'challenge-ra4-7',
      title: 'Reto 7: Jerarquía de Empleados con Clases ES6 y Herencia',
      difficulty: 'Intermedio',
      topicTag: 'POO: Clases ES6, extends y super()',
      type: 'function',
      functionName: 'generarNominaEmpresa',
      instructions: `Modela una jerarquía de personal técnico para una empresa de desarrollo de software utilizando Clases ES6:
      <br><br>
      Define e implementa dentro de la función <code>generarNominaEmpresa(datosEmpleados)</code>:
      <ol>
        <li>Clase <code>Empleado</code>:
          <ul>
            <li>Constructor que recibe <code>(nombre, sueldoBase)</code>.</li>
            <li>Método <code>calcularSueldoNeto()</code>: Devuelve el <code>sueldoBase</code> multiplicado por <code>0.85</code> (descontando 15% de IRPF/SS), redondeado a 2 decimales (como tipo <code>number</code>).</li>
          </ul>
        </li>
        <li>Clase <code>Desarrollador</code> que herede de <code>Empleado</code> con <code>extends</code>:
          <ul>
            <li>Constructor que recibe <code>(nombre, sueldoBase, lenguajePrincipal)</code>. Recuerda invocar a <code>super()</code>.</li>
            <li>Sobrescribe el método <code>calcularSueldoNeto()</code>: Los desarrolladores tienen un plus de especialidad del <code>10%</code> sobre el sueldo base antes del IRPF. Por tanto, su sueldo neto es <code>(this.sueldoBase * 1.10) * 0.85</code>, redondeado a 2 decimales.</li>
          </ul>
        </li>
      </ol>
      La función recibe un array <code>datosEmpleados</code> con objetos tipo <code>{ tipo: "empleado"|"desarrollador", nombre, sueldoBase, lenguaje? }</code>, instancia las clases correspondientes y retorna un array con:
      <br><code>[{ nombre: string, sueldoNeto: number, rol: string }]</code>.`,
      starterCode: `/**
 * Modela y calcula nóminas mediante clases ES6 con herencia.
 * @param {Array<{tipo: string, nombre: string, sueldoBase: number, lenguaje?: string}>} datosEmpleados
 * @returns {Array<{nombre: string, sueldoNeto: number, rol: string}>}
 */
function generarNominaEmpresa(datosEmpleados) {
  // 1. Define la clase Empleado:

  // 2. Define la clase Desarrollador (extends Empleado):

  // 3. Recorre datosEmpleados, instancia con new y retorna el array de nóminas:

}

// Prueba en consola local:
console.log(generarNominaEmpresa([
  { tipo: "empleado", nombre: "Laura Gestora", sueldoBase: 2000 },
  { tipo: "desarrollador", nombre: "Mario Coder", sueldoBase: 2500, lenguaje: "JavaScript" }
]));`,
      hint: 'En Desarrollador usa constructor(nombre, sueldoBase, lenguaje) { super(nombre, sueldoBase); this.lenguaje = lenguaje; }. Recuerda Number(valor.toFixed(2)).',
      tests: [
        {
          name: 'Calcula correctamente la nómina para Empleados ordinarios',
          testFn: `(fn) => {
            const entrada = [{ tipo: "empleado", nombre: "Laura", sueldoBase: 2000 }];
            const res = fn(entrada);
            // 2000 * 0.85 = 1700
            return res.length === 1 && res[0].nombre === "Laura" && res[0].sueldoNeto === 1700;
          }`,
          error: 'El sueldo neto del empleado ordinario no es correcto (debe ser sueldoBase * 0.85).'
        },
        {
          name: 'Calcula correctamente la nómina para Desarrolladores con plus de especialidad',
          testFn: `(fn) => {
            const entrada = [{ tipo: "desarrollador", nombre: "Mario", sueldoBase: 2500, lenguaje: "JS" }];
            const res = fn(entrada);
            // (2500 * 1.10) * 0.85 = 2750 * 0.85 = 2337.5
            return res.length === 1 && res[0].nombre === "Mario" && res[0].sueldoNeto === 2337.5;
          }`,
          error: 'El cálculo del desarrollador con plus no coincide (debe ser (sueldoBase * 1.10) * 0.85).'
        },
        {
          name: 'Procesa una lista mixta y devuelve los roles apropiados',
          testFn: `(fn) => {
            const entrada = [
              { tipo: "empleado", nombre: "A", sueldoBase: 1000 },
              { tipo: "desarrollador", nombre: "B", sueldoBase: 1000, lenguaje: "TypeScript" }
            ];
            const res = fn(entrada);
            return res[0].sueldoNeto === 850 && res[1].sueldoNeto === 935;
          }`,
          error: 'La lista combinada de nóminas no coincide con los cálculos esperados.'
        }
      ]
    }
  ]
};
