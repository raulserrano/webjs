/**
 * CONTENIDO DIDÁCTICO INTEGRAL: RESULTADO DE APRENDIZAJE 6 (RA6)
 * Módulo: Desarrollo Web en Entorno Cliente (0612) - FP DAW
 * Criterios de evaluación oficiales a) hasta h) y contenidos BORM / BOE RD 686/2010
 * "Desarrolla aplicaciones web analizando y aplicando las características del modelo de objetos del documento (DOM)."
 */

export const RA6_CONTENT = {
  id: 'ra6',
  title: 'Modelo de Objetos del Documento (DOM)',
  duration: '10 Horas lectivas',
  officialCode: 'RA6 - Criterios a-h',

  // =========================================================================
  // LISTA DE APARTADOS TEÓRICOS (8 APARTADOS CON EJEMPLOS VISUALES Y CALLOUTS)
  // =========================================================================
  topics: [
    {
      id: 'apartado-dom-arbol-nodos',
      title: '6.1 El Árbol Jerárquico del DOM y Tipos de Nodos',
      criteriaRef: 'Criterios a), b)',
      description: 'Estructura arbórea de una página web, el objeto document, jerarquía de herencia y diferenciación de tipos de nodos W3C (Document, Element, Text, Comment).',
      theoryHtml: `
        <p>El <strong>DOM (Document Object Model)</strong> es la representación estructural en memoria que el navegador construye a partir del código HTML. No es el archivo de texto HTML, sino un <strong>árbol vivo de objetos interconectados</strong> que JavaScript puede inspeccionar, mutar y escuchar en tiempo real.</p>

        <h4>A. Jerarquía de Herencia en el DOM</h4>
        <p>Todos los nodos del árbol descienden de la interfaz base <code>EventTarget</code>, lo que les confiere la capacidad de emitir y escuchar eventos:</p>
        <div style="background: var(--bg-surface-2); border: var(--border-subtle); border-radius: var(--radius-md); padding: 14px; margin: 12px 0; font-family: var(--font-code); font-size: 0.85rem;">
          <span style="color: var(--color-brand); font-weight: 700;">EventTarget</span> (Capacidad de suscribirse a eventos con addEventListener)<br>
          └── <span style="color: var(--color-cyan); font-weight: 700;">Node</span> (Propiedades comunes: parentNode, childNodes, firstElementChild, nodeType, nodeName, textContent, nodeValue)<br>
              ├── <span style="color: #0284c7;">Document</span> (Representa la totalidad del documento web: <code>window.document</code>)<br>
              ├── <span style="color: #15803d; font-weight: 700;">Element</span> (Etiquetas HTML: <code>div</code>, <code>p</code>, <code>button</code>...)<br>
              │    └── <span style="color: #15803d;">HTMLElement</span> (Elementos con atributos HTML específicos como id, title, style)<br>
              ├── <span style="color: #b45309;">CharacterData</span><br>
              │    ├── <span style="color: #b45309;">Text</span> (El contenido textual dentro de una etiqueta)<br>
              │    └── <span style="color: var(--text-muted);">Comment</span> (Comentarios en el código <code>&lt;!-- ... --&gt;</code>)<br>
              └── <span style="color: #7c3aed;">DocumentFragment</span> (Contenedor ligero en memoria sin padre en el DOM activo)
        </div>

        <h4>B. Constantes de Tipos de Nodo W3C</h4>
        <p>La propiedad <code>node.nodeType</code> devuelve un entero indicando la naturaleza del nodo:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: var(--bg-surface-2); text-align: left;">
              <th style="padding: 8px; border: var(--border-subtle);">Constante W3C</th>
              <th style="padding: 8px; border: var(--border-subtle);">Valor</th>
              <th style="padding: 8px; border: var(--border-subtle);">Ejemplo</th>
              <th style="padding: 8px; border: var(--border-subtle);">nodeName</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle);"><code>Node.ELEMENT_NODE</code></td>
              <td style="padding: 8px; border: var(--border-subtle); font-weight: 700; color: var(--color-brand);">1</td>
              <td style="padding: 8px; border: var(--border-subtle);"><code>&lt;div&gt;</code>, <code>&lt;span&gt;</code></td>
              <td style="padding: 8px; border: var(--border-subtle);">Nombre de etiqueta en mayúsculas (<code>"DIV"</code>)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle);"><code>Node.TEXT_NODE</code></td>
              <td style="padding: 8px; border: var(--border-subtle); font-weight: 700; color: var(--color-brand);">3</td>
              <td style="padding: 8px; border: var(--border-subtle);">Texto visible o saltos de línea</td>
              <td style="padding: 8px; border: var(--border-subtle);"><code>"#text"</code></td>
            </tr>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle);"><code>Node.COMMENT_NODE</code></td>
              <td style="padding: 8px; border: var(--border-subtle); font-weight: 700; color: var(--color-brand);">8</td>
              <td style="padding: 8px; border: var(--border-subtle);"><code>&lt;!-- Nota docente --&gt;</code></td>
              <td style="padding: 8px; border: var(--border-subtle);"><code>"#comment"</code></td>
            </tr>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle);"><code>Node.DOCUMENT_NODE</code></td>
              <td style="padding: 8px; border: var(--border-subtle); font-weight: 700; color: var(--color-brand);">9</td>
              <td style="padding: 8px; border: var(--border-subtle);"><code>window.document</code></td>
              <td style="padding: 8px; border: var(--border-subtle);"><code>"#document"</code></td>
            </tr>
          </tbody>
        </table>

        <h4>C. La Trampa de los Nodos de Texto: <code>childNodes</code> vs <code>children</code></h4>
        <p>Un error clásico en JavaScript cliente consiste en confundir nodos con elementos:</p>
        <ul>
          <li><strong><code>element.childNodes</code></strong>: Colección <code>NodeList</code> que incluye <em>todos</em> los nodos hijos (incluyendo espacios en blanco y saltos de línea formateados en HTML como nodos <code>#text</code>, y comentarios <code>#comment</code>).</li>
          <li><strong><code>element.children</code></strong>: Colección <code>HTMLCollection</code> que contiene <strong>exclusivamente elementos HTML</strong> (omite comentarios y textos intermedios).</li>
        </ul>

        <h4>D. Lectura y Asignación de Texto: <code>node.textContent</code></h4>
        <p>La propiedad <code>node.textContent</code> pertenece a la interfaz base <code>Node</code>. Permite leer o sobrescribir el texto de cualquier nodo (y de todos sus descendientes) sin parsear etiquetas HTML. Para nodos de texto o comentario individuales, <code>node.nodeValue</code> expone la cadena interna directamente.</p>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Frecuente de Examen FP',
        text: '¿Por qué <code>lista.childNodes.length</code> suele ser mayor que <code>lista.children.length</code>? Porque los saltos de línea y tabulaciones entre etiquetas <code>&lt;li&gt;</code> son interpretados por el parser HTML como nodos de texto (<code>nodeType === 3</code>).'
      },
      examples: [
        {
          id: 'ex-dom-arbol-inspeccion',
          title: 'Ejemplo Visual: Inspección del Árbol de Nodos en Tiempo Real',
          description: 'Pulsa en "▶ Ejecutar" para examinar los nodos hijos de la tarjeta, comparar childNodes frente a children y clasificar cada nodo W3C por consola. Puedes usar el botón "</> HTML Inicial" para ver los saltos y comentarios en el marcado base.',
          isVisual: true,
          domFixture: `
            <!-- Comentario W3C: Tarjeta de perfil de estudiante DAW -->
            <div class="dom-card-preview" id="demo-tarjeta-usuario">
              <div class="dom-title-box">
                <h4 class="dom-title-text" id="demo-nombre-usuario">Elena Gómez</h4>
                <span class="dom-badge" id="demo-badge-rol">Estudiante DAW</span>
              </div>
              <p style="margin: 0; color: var(--text-secondary); font-size: 0.88rem;" id="demo-desc-usuario">
                Especialidad en Desarrollo Web en Entorno Cliente.
              </p>
              <div class="dom-controls-row" id="demo-zona-etiquetas">
                <span class="dom-badge">JavaScript</span>
                <span class="dom-badge">DOM W3C</span>
              </div>
            </div>
          `,
          initialCode: `// Inspección pedagógica del árbol DOM y clasificación de nodos W3C
const tarjeta = document.getElementById("demo-tarjeta-usuario");

console.log("=== 1. Propiedades del Nodo Raíz ===");
console.log("Nombre del nodo (nodeName):", tarjeta.nodeName); // "DIV"
console.log("Tipo de nodo (nodeType):", tarjeta.nodeType);     // 1 (Node.ELEMENT_NODE)

console.log("\\n=== 2. childNodes (Todos los nodos) vs children (Solo elementos) ===");
console.log("tarjeta.childNodes.length:", tarjeta.childNodes.length, "(incluye textos y saltos)");
console.log("tarjeta.children.length:", tarjeta.children.length, "(exclusivamente etiquetas HTML)");

console.log("\\n=== 3. Clasificación de cada nodo hijo en childNodes ===");
for (let i = 0; i < tarjeta.childNodes.length; i++) {
  const nodo = tarjeta.childNodes[i];
  let tipoDesc = "Desconocido";
  if (nodo.nodeType === Node.ELEMENT_NODE) {
    tipoDesc = \`<\${nodo.nodeName.toLowerCase()}> [ELEMENT_NODE]\`;
  } else if (nodo.nodeType === Node.TEXT_NODE) {
    tipoDesc = \`"\${nodo.nodeValue.replace(/\\n/g, "\\\\n")}" [TEXT_NODE]\`;
  } else if (nodo.nodeType === Node.COMMENT_NODE) {
    tipoDesc = \`<!-- \${nodo.nodeValue} --> [COMMENT_NODE]\`;
  }

  console.log(\`Posición [\${i}]: Tipo \${nodo.nodeType} -> \${tipoDesc}\`);
}

console.log("\\n=== 4. Navegación básica entre nodos padres e hijos ===");
const primerElemento = tarjeta.firstElementChild;
console.log("Primer elemento hijo:", primerElemento.nodeName);
console.log("Elemento padre del primer hijo:", primerElemento.parentElement.nodeName);

// Modificación básica de contenido textual heredado de la interfaz Node
const badgeRol = document.getElementById("demo-badge-rol");
badgeRol.textContent = "✓ Alumna Graduada (Verificada en Árbol)";
console.log("\\n✓ Propiedad node.textContent actualizada en el lienzo visual.");`
        }
      ]
    },

    {
      id: 'apartado-dom-selectores',
      title: '6.2 Métodos de Acceso y Selección en el Árbol DOM',
      criteriaRef: 'Criterios b), c)',
      description: 'Selectores modernos querySelector y querySelectorAll vs métodos tradicionales. Navegación transversal entre nodos (parentNode, children, siblings).',
      theoryHtml: `
        <p>Para manipular el documento, primero debemos localizar los nodos deseados. La API del DOM ofrece dos familias de métodos de búsqueda:</p>

        <h4>A. Métodos Tradicionales vs Selectores Modernos W3C</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: var(--bg-surface-2); text-align: left;">
              <th style="padding: 8px; border: var(--border-subtle);">Método</th>
              <th style="padding: 8px; border: var(--border-subtle);">Parámetro</th>
              <th style="padding: 8px; border: var(--border-subtle);">Retorno</th>
              <th style="padding: 8px; border: var(--border-subtle);">Naturaleza de la Colección</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle);"><code>getElementById('id')</code></td>
              <td style="padding: 8px; border: var(--border-subtle);">ID único (sin #)</td>
              <td style="padding: 8px; border: var(--border-subtle);"><code>Element</code> o <code>null</code></td>
              <td style="padding: 8px; border: var(--border-subtle);">-</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle);"><code>getElementsByClassName('c')</code></td>
              <td style="padding: 8px; border: var(--border-subtle);">Nombre de clase</td>
              <td style="padding: 8px; border: var(--border-subtle);"><code>HTMLCollection</code></td>
              <td style="padding: 8px; border: var(--border-subtle); color: var(--color-warning); font-weight: 700;">VIVA (Live)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle);"><code>querySelector('selector')</code></td>
              <td style="padding: 8px; border: var(--border-subtle);">Selector CSS3</td>
              <td style="padding: 8px; border: var(--border-subtle);">Primer <code>Element</code> o <code>null</code></td>
              <td style="padding: 8px; border: var(--border-subtle);">-</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle);"><code>querySelectorAll('selector')</code></td>
              <td style="padding: 8px; border: var(--border-subtle);">Selector CSS3</td>
              <td style="padding: 8px; border: var(--border-subtle);"><code>NodeList</code></td>
              <td style="padding: 8px; border: var(--border-subtle); color: var(--color-success); font-weight: 700;">ESTÁTICA (Snapshot)</td>
            </tr>
          </tbody>
        </table>

        <h4>B. Colecciones Vivas (Live) vs Estáticas (Static Snapshot)</h4>
        <ul>
          <li><strong>Colección Viva (<code>HTMLCollection</code>)</strong>: Si el DOM cambia tras la consulta (por ejemplo, al añadir un elemento nuevo), la colección se actualiza automáticamente. Puede provocar bucles infinitos al iterar mientras se crean o borran elementos.</li>
          <li><strong>Colección Estática (<code>NodeList</code> de <code>querySelectorAll</code>)</strong>: Es una instantánea fija en el momento de la consulta. Si se agregan o eliminan nodos del DOM después, la colección no cambia. Además, dispone de <code>.forEach()</code> nativo.</li>
        </ul>

        <h4>C. Navegación Transversal (DOM Traversal)</h4>
        <p>Una vez obtenido un elemento de referencia, podemos movernos por el árbol sin realizar nuevas búsquedas:</p>
        <ul>
          <li>Hacia arriba: <code>node.parentElement</code> o <code>node.closest('selector')</code> (busca el ancestro más cercano que coincide con el selector).</li>
          <li>Hacia abajo: <code>element.firstElementChild</code>, <code>element.lastElementChild</code>, <code>element.children</code>.</li>
          <li>Hacia los lados (hermanos): <code>element.previousElementSibling</code>, <code>element.nextElementSibling</code>.</li>
        </ul>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Buena Práctica Profesional',
        text: 'Prioriza siempre <code>querySelector</code> y <code>querySelectorAll</code> por su flexibilidad y porque <code>NodeList</code> cuenta con <code>.forEach()</code>. Si usas <code>getElementsByClassName</code>, recuerda convertirlo a Array con <code>Array.from()</code> antes de usar métodos modernos como map o filter.'
      },
      examples: [
        {
          id: 'ex-dom-selectores-productos',
          title: 'Ejemplo Visual: Métodos de Selección y Navegación Transversal',
          description: 'Observa cómo seleccionar elementos con querySelector y querySelectorAll, compararlos con colecciones vivas y recorrer el árbol mediante firstElementChild, nextElementSibling y closest(). Puedes pulsar "</> HTML Inicial" para ver las clases e IDs del marcado.',
          isVisual: true,
          domFixture: `
            <div class="dom-card-preview" id="panel-catalogo-productos">
              <div class="dom-title-box">
                <h4 class="dom-title-text">Catálogo de Libros Técnicos</h4>
                <span class="dom-badge" id="contador-ofertas">3 libros</span>
              </div>
              <ul class="dom-list-container" id="lista-libros">
                <li class="dom-list-item item-libro" id="libro-eloquent">
                  <span>Eloquent JavaScript (4ª Ed.)</span>
                  <span class="dom-badge">35€</span>
                </li>
                <li class="dom-list-item item-libro libro-oferta" id="libro-good-parts">
                  <span>JavaScript: The Good Parts</span>
                  <span class="dom-badge badge-brand">28€ · OFERTA</span>
                </li>
                <li class="dom-list-item item-libro libro-oferta" id="libro-ydkjs">
                  <span>You Don't Know JS Yet</span>
                  <span class="dom-badge badge-brand">42€ · OFERTA</span>
                </li>
              </ul>
            </div>
          `,
          initialCode: `// Métodos de selección W3C y Navegación Transversal (DOM Traversal)
// 1. Selector por ID (búsqueda rápida de elemento único)
const panel = document.getElementById("panel-catalogo-productos");
const contadorBadge = document.getElementById("contador-ofertas");

// 2. Selectores CSS modernos: querySelector y querySelectorAll
const primerLibro = document.querySelector("#lista-libros .item-libro");
const librosEnOferta = document.querySelectorAll("#lista-libros .libro-oferta");

console.log("=== 1. Familias de Selectores ===");
console.log("Primer libro (querySelector):", primerLibro.firstElementChild.textContent);
console.log("Libros en oferta (querySelectorAll NodeList):", librosEnOferta.length);

// 3. Comparativa: getElementsByClassName devuelve una colección viva (HTMLCollection)
const coleccionViva = document.getElementsByClassName("item-libro");
console.log("Total catálogo (getElementsByClassName HTMLCollection):", coleccionViva.length);

// 4. Navegación transversal (DOM Traversal sin volver a buscar)
console.log("\\n=== 2. Navegación Transversal ===");
librosEnOferta.forEach((item, index) => {
  const tituloSpan = item.firstElementChild;       // Navegar al primer elemento hijo
  const badgePrecio = item.lastElementChild;      // Navegar al último elemento hijo
  const hermanoSiguiente = item.nextElementSibling; // Hermano lateral adyacente

  console.log(\`[Oferta #\${index + 1}]: "\${tituloSpan.textContent}" | Precio: \${badgePrecio.textContent}\`);
  if (hermanoSiguiente) {
    console.log(\`   -> Hermano adyacente: "\${hermanoSiguiente.firstElementChild.textContent}"\`);
  }

  // Modificación visual usando la propiedad estándar className
  item.className = "dom-list-item item-libro libro-oferta item-highlight";
  badgePrecio.className = "dom-badge badge-success";
});

// Navegación hacia arriba en el árbol: .parentElement y .closest()
const listaPadre = primerLibro.parentElement;
const contenedorPanel = primerLibro.closest(".dom-card-preview");
console.log("\\nPadre directo del libro:", listaPadre.id);
console.log("Ancestro más cercano .dom-card-preview:", contenedorPanel.id);

// 5. Actualizamos el contador en la cabecera
contadorBadge.textContent = \`\${librosEnOferta.length} en oferta activa\`;
contadorBadge.className = "dom-badge badge-success";
console.log("\\n✓ Contador y resaltados visuales actualizados en el lienzo.");`
        }
      ]
    },

    {
      id: 'apartado-dom-creacion-modificacion',
      title: '6.3 Creación, Inserción y Eliminación Dinámica de Nodos',
      criteriaRef: 'Criterio d)',
      description: 'Generación programática de elementos con createElement, inserción moderna (append, prepend, before, after) vs clásica (appendChild, insertBefore), y eliminación segura con remove.',
      theoryHtml: `
        <p>Una aplicación web dinámica necesita generar elementos HTML sobre la marcha (por ejemplo, al recibir datos de una API o ante la acción de un usuario). El DOM provee métodos específicos para construir e insertar nodos en el documento.</p>

        <h4>A. Ciclo de Vida de un Nodo: De la Memoria al Documento</h4>
        <ol>
          <li><strong>Creación en memoria</strong>: <code>const div = document.createElement('div')</code>. El nodo existe en la memoria de JavaScript pero <em>aún no forma parte de la vista</em>.</li>
          <li><strong>Configuración de propiedades</strong>: Se le asigna contenido textual, atributos, clases o eventos (<code>div.className = 'alerta'</code>; <code>div.textContent = 'Guardado'</code>).</li>
          <li><strong>Inserción en el árbol activo</strong>: Se vincula a un nodo padre existente en el DOM. En ese momento exacto, el motor del navegador ejecuta el cálculo de estilos y renderizado.</li>
        </ol>

        <h4>B. Métodos Modernos de Inserción (DOM Living Standard)</h4>
        <p>Los métodos modernos superan las limitaciones de <code>appendChild</code> al aceptar múltiples nodos e incluso cadenas de texto directamente:</p>
        <ul>
          <li><strong><code>padre.append(...nodosOStrings)</code></strong>: Inserta al final del interior del padre (sustituye con ventaja a <code>appendChild</code>).</li>
          <li><strong><code>padre.prepend(...nodosOStrings)</code></strong>: Inserta al principio del interior del padre.</li>
          <li><strong><code>elemento.before(...nodos)</code></strong>: Inserta inmediatamente antes del elemento (como hermano anterior).</li>
          <li><strong><code>elemento.after(...nodos)</code></strong>: Inserta inmediatamente después del elemento (como hermano posterior).</li>
          <li><strong><code>elemento.replaceWith(...nodos)</code></strong>: Reemplaza el elemento por otro nuevo.</li>
          <li><strong><code>elemento.remove()</code></strong>: Elimina el nodo directamente del DOM sin necesidad de acceder a su padre (evita <code>padre.removeChild(hijo)</code>).</li>
        </ul>

        <h4>C. Seguridad y Rendimiento: <code>innerHTML</code> vs <code>textContent</code></h4>
        <div style="background: rgba(153, 27, 27, 0.06); border-left: 4px solid var(--color-danger); padding: 12px; margin: 12px 0; font-size: 0.88rem;">
          <strong>¡Peligro de Vulnerabilidad XSS (Cross-Site Scripting)!</strong><br>
          Nunca utilices <code>innerHTML</code> con datos introducidos por el usuario sin sanitizar. Si el usuario ingresa <code>&lt;img src="x" onerror="robarCookies()"&gt;</code>, el navegador ejecutará el script malicioso. Usa <strong><code>textContent</code></strong> para texto plano: es 100% inmune a inyecciones de código y mucho más rápido porque no activa el parser HTML.
        </div>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica de Examen FP',
        text: '¿Cuál es la diferencia entre <code>padre.appendChild(nodo)</code> y <code>padre.append(nodo, "texto")</code>? <code>appendChild</code> solo acepta un único objeto Node y devuelve el nodo insertado; <code>append</code> acepta múltiples argumentos (tanto objetos Node como cadenas de texto plano convertidas automáticamente a TextNode) y no devuelve valor.'
      },
      examples: [
        {
          id: 'ex-dom-creacion-tareas',
          title: 'Ejemplo Visual: Gestor Dinámico de Tareas en el DOM',
          description: 'Crea nuevos elementos li completos con badges informativos, insértalos dinámicamente en el navegador y elimina elementos antiguos con element.remove(). Puedes alternar a "</> HTML Inicial" para ver el marcado previo a la mutación.',
          isVisual: true,
          domFixture: `
            <div class="dom-card-preview" id="panel-gestor-tareas">
              <div class="dom-title-box">
                <h4 class="dom-title-text">Lista de Tareas del Sprint</h4>
                <span class="dom-badge badge-brand" id="badge-total-tareas">2 pendientes</span>
              </div>
              <ul class="dom-list-container" id="lista-tareas-sprint">
                <li class="dom-list-item" id="tarea-antigua">
                  <span>Revisar compatibilidad con Internet Explorer 11</span>
                  <span class="dom-badge badge-danger">Desfasada</span>
                </li>
                <li class="dom-list-item" id="tarea-activa-1">
                  <span>Implementar diseño atómico con CSS Vanilla</span>
                  <span class="dom-badge badge-brand">En Progreso</span>
                </li>
              </ul>
            </div>
          `,
          initialCode: `// 1. Eliminar la tarea desfasada usando el método moderno .remove()
const tareaDesfasada = document.getElementById("tarea-antigua");
if (tareaDesfasada) {
  tareaDesfasada.remove();
  console.log("✓ Tarea desfasada eliminada con .remove()");
}

// 2. Crear un nuevo elemento <li> completo en memoria
const nuevaTarea = document.createElement("li");
nuevaTarea.className = "dom-list-item item-highlight";

const textoTarea = document.createElement("span");
textoTarea.textContent = "Desarrollar componente de Lienzo DOM interactivo";

const badgePrioridad = document.createElement("span");
badgePrioridad.className = "dom-badge badge-success";
badgePrioridad.textContent = "Alta Prioridad";

// Unir los elementos hijos al <li>
nuevaTarea.append(textoTarea, badgePrioridad);

// 3. Insertar al principio de la lista con prepend()
const lista = document.getElementById("lista-tareas-sprint");
lista.prepend(nuevaTarea);

// 4. Actualizar el contador de la cabecera
const totalTareas = lista.children.length;
const badgeTotal = document.getElementById("badge-total-tareas");
badgeTotal.textContent = \`\${totalTareas} activas\`;
badgeTotal.className = "dom-badge badge-success";

console.log(\`✓ Lista actualizada en vivo: \${totalTareas} elementos visibles.\`);`
        }
      ]
    },

    {
      id: 'apartado-dom-atributos-clases-estilos',
      title: '6.4 Manipulación de Atributos, Clases (classList) y Dataset',
      criteriaRef: 'Criterios d), e)',
      description: 'Gestión de atributos HTML estándar, manipulación fluida de estilos mediante la API classList y lectura/escritura de metadatos personalizados con dataset (data-*).',
      theoryHtml: `
        <p>Una vez creados o seleccionados los elementos, su apariencia y comportamiento se controlan modificando sus atributos, sus clases CSS y sus metadatos de datos personalizados.</p>

        <h4>A. Métodos de Atributos Estándar</h4>
        <ul>
          <li><code>element.getAttribute('nombre')</code>: Obtiene el valor del atributo (ej: <code>href</code>, <code>src</code>, <code>disabled</code>).</li>
          <li><code>element.setAttribute('nombre', 'valor')</code>: Asigna o reemplaza el valor de un atributo.</li>
          <li><code>element.hasAttribute('nombre')</code>: Comprueba si el atributo existe (devuelve booleano).</li>
          <li><code>element.removeAttribute('nombre')</code>: Elimina el atributo del elemento.</li>
        </ul>

        <h4>B. La API <code>classList</code>: Adiós a <code>className</code></h4>
        <p>Antiguamente se modificaba la propiedad <code>className</code> como una cadena de texto, lo que requería engorrosas expresiones regulares. La API moderna <code>classList</code> ofrece métodos atómicos limpios:</p>
        <ul>
          <li><code>classList.add('clase1', 'clase2')</code>: Añade una o más clases sin duplicar las existentes.</li>
          <li><code>classList.remove('clase')</code>: Elimina una clase de forma segura (si no existe, no falla).</li>
          <li><code>classList.toggle('clase', forceBoolean?)</code>: La añade si no está, la retira si ya estaba. Admite un segundo parámetro booleano opcional.</li>
          <li><code>classList.contains('clase')</code>: Devuelve <code>true</code> si el elemento tiene la clase.</li>
          <li><code>classList.replace('claseVieja', 'claseNueva')</code>: Sustituye una clase por otra atómicamente.</li>
        </ul>

        <h4>C. Atributos Personalizados HTML5: <code>data-*</code> y la API <code>dataset</code></h4>
        <p>El estándar HTML5 permite almacenar metadatos en cualquier etiqueta mediante el prefijo <code>data-</code>. En JavaScript se accede a ellos a través del objeto <strong><code>element.dataset</code></strong> con una regla de conversión automática:</p>
        <div style="background: var(--bg-surface-2); border: var(--border-subtle); border-radius: var(--radius-md); padding: 12px; margin: 10px 0; font-family: var(--font-code); font-size: 0.85rem;">
          HTML: &lt;button data-user-role="editor" data-id="104"&gt;<br>
          JS Lectura:  <code>btn.dataset.userRole</code> (kebab-case se convierte a camelCase)<br>
          JS Escritura: <code>btn.dataset.userRole = "admin"</code> (actualiza el atributo en el DOM)
        </div>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Buenas Prácticas de Estilado',
        text: 'Nunca utilices <code>element.style</code> para definir bloques de diseño extensos. La buena práctica según los estándares web consiste en definir clases semánticas en CSS y utilizar <code>element.classList.toggle()</code> desde JavaScript para activarlas o desactivarlas.'
      },
      examples: [
        {
          id: 'ex-dom-dataset-clases',
          title: 'Ejemplo Visual: Conmutador de Estado y Lectura de dataset',
          description: 'Lee los metadatos data-* de una tarjeta de servidor, conmuta su estado visual entre apagado y en línea con classList, y actualiza los badges visualmente.',
          isVisual: true,
          domFixture: `
            <div class="dom-card-preview" id="servidor-card" data-server-id="srv-prod-01" data-cluster="europa-oeste" data-status="detenido">
              <div class="dom-title-box">
                <h4 class="dom-title-text" id="servidor-nombre">Servidor Web Nginx</h4>
                <span class="dom-badge badge-danger" id="servidor-badge">DETENIDO</span>
              </div>
              <p style="margin: 0 0 10px 0; font-size: 0.86rem; color: var(--text-secondary);" id="servidor-detalles">
                Cluster: europa-oeste | ID: srv-prod-01
              </p>
              <div class="dom-controls-row">
                <button class="dom-btn-preview" id="btn-toggle-servidor">Conmutar Estado</button>
              </div>
            </div>
          `,
          initialCode: `// Lectura de dataset (conversión automática a camelCase)
const tarjeta = document.getElementById("servidor-card");
const badge = document.getElementById("servidor-badge");
const detalles = document.getElementById("servidor-detalles");

console.log("=== Lectura de Metadatos dataset ===");
console.log("Server ID:", tarjeta.dataset.serverId);
console.log("Cluster:", tarjeta.dataset.cluster);
console.log("Estado inicial:", tarjeta.dataset.status);

// Modificación del estado del servidor en vivo
if (tarjeta.dataset.status === "detenido") {
  // Actualizamos el dataset
  tarjeta.dataset.status = "en-linea";
  tarjeta.dataset.uptime = "99.98%";

  // Modificamos clases visuales con la API classList
  tarjeta.classList.add("active-theme");
  badge.classList.replace("badge-danger", "badge-success");
  badge.textContent = "✓ EN LÍNEA";

  detalles.textContent = \`Cluster: \${tarjeta.dataset.cluster} | ID: \${tarjeta.dataset.serverId} | Uptime: \${tarjeta.dataset.uptime}\`;

  console.log("✓ Estado actualizado a EN LÍNEA en el lienzo visual.");
} else {
  tarjeta.dataset.status = "detenido";
  tarjeta.classList.remove("active-theme");
  badge.classList.replace("badge-success", "badge-danger");
  badge.textContent = "DETENIDO";
  console.log("✓ Estado actualizado a DETENIDO en el lienzo visual.");
}`
        }
      ]
    },

    {
      id: 'apartado-dom-estilos-computados',
      title: '6.5 Estilos en Línea vs Estilos Computados (getComputedStyle)',
      criteriaRef: 'Criterio e)',
      description: 'Diferencia crítica entre la propiedad element.style (solo estilos inline) y window.getComputedStyle() (estilos calculados por la cascada CSS). Manipulación de variables CSS.',
      theoryHtml: `
        <p>Uno de los errores más comunes de los desarrolladores web noveles es intentar leer estilos aplicados por hojas CSS externas mediante <code>element.style</code>.</p>

        <h4>A. La Propiedad <code>element.style</code></h4>
        <ul>
          <li>Representa <strong>únicamente los estilos inline</strong> declarados en el atributo <code>style="..."</code> del propio elemento HTML.</li>
          <li>Si el color de fondo proviene de una clase en una hoja <code>.css</code> externa, <code>element.style.backgroundColor</code> devolverá una <strong>cadena vacía (<code>""</code>)</strong>.</li>
          <li>Las propiedades compuestas se escriben en <em>camelCase</em>: <code>fontSize</code>, <code>backgroundColor</code>, <code>zIndex</code>.</li>
        </ul>

        <h4>B. La Función <code>window.getComputedStyle(element)</code></h4>
        <p>Es el método oficial para conocer el valor real que el motor de renderizado del navegador está aplicando tras resolver la especificidad, la cascada y la herencia de estilos CSS:</p>
        <div style="background: var(--bg-surface-2); border: var(--border-subtle); border-radius: var(--radius-md); padding: 12px; margin: 10px 0; font-family: var(--font-code); font-size: 0.85rem;">
          const estilos = window.getComputedStyle(elemento);<br>
          console.log(estilos.width);           // Devuelve valor resuelto en px (ej: "320px")<br>
          console.log(estilos.backgroundColor); // Devuelve valor normalizado rgb() o rgba()
        </div>

        <h4>C. Manipulación de Variables CSS (CSS Custom Properties)</h4>
        <p>JavaScript puede leer y modificar las variables CSS semánticas en tiempo real para crear temas dinámicos:</p>
        <ul>
          <li>Escribir: <code>document.documentElement.style.setProperty('--color-brand', '#364F59')</code>.</li>
          <li>Leer: <code>getComputedStyle(document.documentElement).getPropertyValue('--color-brand').trim()</code>.</li>
        </ul>
      `,
      callout: {
        type: 'fp-exam',
        title: 'Pregunta Clásica de Examen FP',
        text: 'Un botón tiene en CSS <code>.btn { width: 200px; }</code>. ¿Qué imprime <code>console.log(btn.style.width)</code>? Imprime <code>""</code> (cadena vacía). Para obtener <code>"200px"</code> es obligatorio usar <code>window.getComputedStyle(btn).width</code>.'
      },
      examples: [
        {
          id: 'ex-dom-estilos-computados',
          title: 'Ejemplo Visual: Medidor de Capacidad y Lectura de Estilos Computados',
          description: 'Ajusta dinámicamente la anchura de una barra de progreso en vivo, cambia su color según el umbral y consulta los estilos exactos calculados por el navegador.',
          isVisual: true,
          domFixture: `
            <div class="dom-card-preview" id="panel-medidor-capacidad">
              <div class="dom-title-box">
                <h4 class="dom-title-text">Uso de Almacenamiento en Servidor</h4>
                <span class="dom-badge badge-brand" id="texto-porcentaje">75%</span>
              </div>
              <div style="width: 100%; height: 16px; background: var(--bg-surface-2); border-radius: 4px; overflow: hidden; margin: 10px 0;">
                <div id="barra-progreso" style="width: 75%; height: 100%; background: var(--color-brand); transition: width 0.4s ease, background-color 0.4s ease;"></div>
              </div>
              <p style="margin: 0; font-size: 0.82rem; color: var(--text-muted);" id="info-estilos-computados">
                Inspeccionando dimensiones computadas...
              </p>
            </div>
          `,
          initialCode: `// Modificación dinámica de estilos inline y lectura de computados
const barra = document.getElementById("barra-progreso");
const textoPorcentaje = document.getElementById("texto-porcentaje");
const infoComputados = document.getElementById("info-estilos-computados");

// 1. Modificamos la barra al 92% (alerta de capacidad)
const nuevoPorcentaje = 92;
barra.style.width = \`\${nuevoPorcentaje}%\`;
barra.style.backgroundColor = "var(--color-danger)";

textoPorcentaje.textContent = \`\${nuevoPorcentaje}% (CRÍTICO)\`;
textoPorcentaje.classList.replace("badge-brand", "badge-danger");

// 2. Consultamos los estilos computados resueltos en píxeles reales por el motor de render
const computados = window.getComputedStyle(barra);
const anchoEnPixeles = computados.width;
const colorFinal = computados.backgroundColor;

console.log("=== Estilos Computados Resueltos ===");
console.log("Anchura exacta en píxeles:", anchoEnPixeles);
console.log("Color de fondo resuelto:", colorFinal);

infoComputados.textContent = \`Anchura física calculada: \${anchoEnPixeles} | Color: \${colorFinal}\`;`
        }
      ]
    },

    {
      id: 'apartado-dom-eventos-delegacion',
      title: '6.6 Manejo de Eventos del DOM y Delegación de Eventos',
      criteriaRef: 'Criterio e)',
      description: 'El modelo de eventos W3C, addEventListener, fases de captura y propagación (bubbling), event.target vs currentTarget, y el patrón de delegación de eventos en árboles dinámicos.',
      theoryHtml: `
        <p>El DOM es un entorno guiado por eventos. Cuando un usuario hace clic, pulsa una tecla o mueve el ratón, el navegador despacha un objeto <strong><code>Event</code></strong> a través del árbol de nodos.</p>

        <h4>A. Las Tres Fases del Evento W3C</h4>
        <ol>
          <li><strong>Fase de Captura (Capturing phase)</strong>: El evento desciende desde <code>window</code> y <code>document</code> pasando por todos los ancestros hasta llegar al elemento destino.</li>
          <li><strong>Fase de Destino (Target phase)</strong>: El evento alcanza el elemento específico donde ocurrió la interacción.</li>
          <li><strong>Fase de Burbujeo (Bubbling phase)</strong>: El evento asciende de vuelta por los ancestros hasta la raíz. <em>La inmensa mayoría de listeners se ejecutan en esta fase.</em></li>
        </ol>

        <h4>B. Propiedades Cruciales del Objeto Event</h4>
        <ul>
          <li><strong><code>event.target</code></strong>: El elemento exacto más profundo sobre el que se originó el evento (ej: el <code>&lt;button&gt;</code> o <code>&lt;span&gt;</code> pulsado).</li>
          <li><strong><code>event.currentTarget</code></strong>: El elemento que tiene registrado el listener actual (es decir, el elemento donde está asignado el <code>addEventListener</code>).</li>
          <li><strong><code>event.stopPropagation()</code></strong>: Detiene la propagación del evento hacia los elementos superiores en la fase de burbujeo.</li>
          <li><strong><code>event.preventDefault()</code></strong>: Cancela la acción predeterminada del navegador (ej: evita que un enlace <code>&lt;a&gt;</code> navegue o que un formulario se envíe).</li>
        </ul>

        <h4>C. Patrón de Diseño: Delegación de Eventos (Event Delegation)</h4>
        <p>En lugar de añadir un listener a cada botón individual (lo que consume memoria y no funciona con elementos creados en el futuro), se añade <strong>un único listener al elemento contenedor padre</strong>. Gracias al burbujeo, el padre detecta los clics de todos sus hijos:</p>
        <div style="background: var(--bg-surface-2); border: var(--border-subtle); border-radius: var(--radius-md); padding: 12px; margin: 10px 0; font-family: var(--font-code); font-size: 0.85rem;">
          contenedorPadre.addEventListener('click', (e) => {<br>
          &nbsp;&nbsp;const boton = e.target.closest('.btn-accion');<br>
          &nbsp;&nbsp;if (!boton || !contenedorPadre.contains(boton)) return;<br>
          &nbsp;&nbsp;// Ejecutar acción con boton.dataset.id<br>
          });
        </div>
      `,
      callout: {
        type: 'architecture',
        title: 'Principio de Rendimiento en Grandes Aplicaciones',
        text: 'Si tienes una tabla con 1.000 filas con botones de eliminar, registrar 1.000 listeners individuales satura la memoria del navegador. Con la delegación de eventos, solo registras 1 listener en la etiqueta <code>&lt;table&gt;</code>, garantizando escalabilidad y compatibilidad con elementos dinámicos.'
      },
      examples: [
        {
          id: 'ex-dom-delegacion-eventos',
          title: 'Ejemplo Visual: Delegación de Eventos en Lista Dinámica',
          description: 'Observa cómo un único listener en el contenedor padre gestiona acciones de completar o borrar sobre elementos existentes y nuevos creados dinámicamente.',
          isVisual: true,
          domFixture: `
            <div class="dom-card-preview" id="panel-delegacion-demo">
              <div class="dom-title-box">
                <h4 class="dom-title-text">Lista Interactiva con Delegación</h4>
                <button class="dom-btn-preview dom-btn-primary" id="btn-agregar-item-demo">+ Añadir Fila</button>
              </div>
              <ul class="dom-list-container" id="lista-delegada">
                <li class="dom-list-item" data-id="1">
                  <span>Aprender Delegación de Eventos</span>
                  <div class="dom-controls-row" style="margin: 0;">
                    <button class="dom-btn-preview btn-completar" title="Marcar como completada">✓</button>
                    <button class="dom-btn-preview btn-borrar" title="Eliminar fila">✕</button>
                  </div>
                </li>
                <li class="dom-list-item" data-id="2">
                  <span>Comprender event.target vs currentTarget</span>
                  <div class="dom-controls-row" style="margin: 0;">
                    <button class="dom-btn-preview btn-completar" title="Marcar como completada">✓</button>
                    <button class="dom-btn-preview btn-borrar" title="Eliminar fila">✕</button>
                  </div>
                </li>
              </ul>
              <div class="dom-alert-box" id="feedback-delegacion" style="display: none;"></div>
            </div>
          `,
          initialCode: `// 1. Seleccionamos el contenedor padre
const listaPadre = document.getElementById("lista-delegada");
const feedback = document.getElementById("feedback-delegacion");
const btnAgregar = document.getElementById("btn-agregar-item-demo");

// 2. PATRÓN DE DELEGACIÓN: Un solo listener en el <ul>
listaPadre.addEventListener("click", (event) => {
  // Comprobamos si el clic fue en un botón de completar
  const btnCompletar = event.target.closest(".btn-completar");
  if (btnCompletar) {
    const item = btnCompletar.closest("li");
    item.classList.toggle("item-completed");
    feedback.style.display = "flex";
    feedback.className = "dom-alert-box alert-success";
    feedback.textContent = \`✓ Tarea #\${item.dataset.id} conmutada como completada.\`;
    console.log(\`[Delegación] Tarea \${item.dataset.id} marcada por evento burbujeado.\`);
    return;
  }

  // Comprobamos si el clic fue en un botón de borrar
  const btnBorrar = event.target.closest(".btn-borrar");
  if (btnBorrar) {
    const item = btnBorrar.closest("li");
    const id = item.dataset.id;
    item.remove();
    feedback.style.display = "flex";
    feedback.className = "dom-alert-box";
    feedback.textContent = \`✕ Fila #\${id} eliminada mediante delegación.\`;
    console.log(\`[Delegación] Fila \${id} eliminada.\`);
  }
});

// 3. Añadimos un elemento nuevo en caliente para demostrar que el listener ya funciona en él
let contador = 3;
btnAgregar.addEventListener("click", () => {
  const nuevoLi = document.createElement("li");
  nuevoLi.className = "dom-list-item item-highlight";
  nuevoLi.dataset.id = String(contador++);
  nuevoLi.innerHTML = \`
    <span>Elemento dinámico #\${nuevoLi.dataset.id}</span>
    <div class="dom-controls-row" style="margin: 0;">
      <button class="dom-btn-preview btn-completar" title="Completar">✓</button>
      <button class="dom-btn-preview btn-borrar" title="Borrar">✕</button>
    </div>
  \`;
  listaPadre.appendChild(nuevoLi);
  console.log(\`✓ Fila dinámicamente insertada (ID: \${nuevoLi.dataset.id}). No requirió registrar ningún nuevo listener.\`);
});

console.log("✓ Sistema de delegación de eventos operativo en el lienzo.");`
        }
      ]
    },

    {
      id: 'apartado-dom-rendimiento-fragmentos',
      title: '6.7 Optimización del Renderizado: DocumentFragment y Reflow/Repaint',
      criteriaRef: 'Criterio f)',
      description: 'El pipeline de renderizado del motor web (Recalculate Style, Layout/Reflow, Paint, Composite). Inserciones masivas atómicas con DocumentFragment y clonación de plantillas template.',
      theoryHtml: `
        <p>Manipular el DOM es una de las operaciones computacionalmente más costosas en JavaScript. Para construir aplicaciones web profesionales con animaciones a 60 FPS, debemos entender cómo trabaja el motor de renderizado.</p>

        <h4>A. El Coste del Reflujo (Reflow) y Repintado (Repaint)</h4>
        <ul>
          <li><strong>Layout / Reflow (Reflujo)</strong>: El navegador calcula las coordenadas físicas exactas, ancho y alto de cada elemento en la pantalla. Se desencadena al añadir o borrar nodos, cambiar dimensiones o leer propiedades como <code>offsetWidth</code>.</li>
          <li><strong>Paint (Repintado)</strong>: El navegador colorea los píxeles (colores, fondos, sombras, texto). Es más rápido que el reflujo, pero repetirlo en exceso causa lentitud.</li>
        </ul>

        <h4>B. El Problema del Bucle Invasivo</h4>
        <p>Si insertamos 100 elementos individualmente dentro de un bucle <code>for</code> usando <code>appendChild()</code>, el navegador puede verse forzado a recalcular el diseño 100 veces consecutivas, congelando la interfaz.</p>

        <h4>C. La Solución Oficial: <code>DocumentFragment</code></h4>
        <p>Un <strong><code>DocumentFragment</code></strong> es un contenedor DOM virtual ultraligero que existe únicamente en la memoria RAM de JavaScript. No tiene elemento padre en el árbol activo:</p>
        <ol>
          <li>Se crea con <code>const fragmento = document.createDocumentFragment();</code>.</li>
          <li>Se añaden los 100 elementos dentro del fragmento en memoria.</li>
          <li>Se inserta el fragmento en el DOM real en <strong>una única operación atómica</strong> (<code>padre.appendChild(fragmento)</code>).</li>
          <li>Al insertarse, el fragmento se "vacía" automáticamente dejando solo sus hijos en el DOM y provocando <strong>un único ciclo de Reflow</strong>.</li>
        </ol>

        <h4>D. La Etiqueta <code>&lt;template&gt;</code></h4>
        <p>HTML5 provee la etiqueta inerte <code>&lt;template&gt;</code> cuyo contenido no se renderiza al cargar la página ni descarga imágenes hasta que se clona explícitamente en JavaScript mediante <code>template.content.cloneNode(true)</code>.</p>
      `,
      callout: {
        type: 'pro-tip',
        title: 'Pregunta de Rendimiento en Entrevistas y Exámenes',
        text: '¿Qué ventaja tiene <code>document.createDocumentFragment()</code> sobre un <code>&lt;div&gt;</code> temporal? El <code>div</code> añade un nodo contenedor extra e innecesario al árbol DOM de la página; el <code>DocumentFragment</code> no genera ningún nodo envoltorio en el DOM final.'
      },
      examples: [
        {
          id: 'ex-dom-fragment-rendimiento',
          title: 'Ejemplo Visual: Inserción Masiva Atómica con DocumentFragment',
          description: 'Compara la generación de múltiples tarjetas métricas insertadas en una sola operación atómica en memoria vs inserciones directas repetitivas.',
          isVisual: true,
          domFixture: `
            <div class="dom-card-preview" id="panel-metricas-fragment">
              <div class="dom-title-box">
                <h4 class="dom-title-text">Monitor de Rendimiento en Tiempo Real</h4>
                <button class="dom-btn-preview dom-btn-primary" id="btn-generar-metricas">⚡ Cargar Métricas</button>
              </div>
              <div id="grid-metricas-contenedor" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin-top: 10px;">
                <!-- Elementos generados por DocumentFragment -->
              </div>
            </div>
          `,
          initialCode: `// Demostración de alto rendimiento con DocumentFragment
const contenedor = document.getElementById("grid-metricas-contenedor");
const datosMetricas = [
  { clave: "CPU", valor: "38%", estado: "badge-success" },
  { clave: "Memoria", valor: "2.4 GB", estado: "badge-brand" },
  { clave: "Latencia", valor: "14 ms", estado: "badge-success" },
  { clave: "Hilos", valor: "8 Activos", estado: "badge-brand" }
];

console.log("=== Construcción en Memoria con DocumentFragment ===");
const tInicio = performance.now();

// 1. Creamos el contenedor virtual en memoria
const fragmento = document.createDocumentFragment();

datosMetricas.forEach(m => {
  const tarjetaMini = document.createElement("div");
  tarjetaMini.className = "dom-list-item item-highlight";
  tarjetaMini.style.flexDirection = "column";
  tarjetaMini.style.alignItems = "flex-start";
  tarjetaMini.style.gap = "4px";

  const etiqueta = document.createElement("span");
  etiqueta.style.fontSize = "0.75rem";
  etiqueta.style.color = "var(--text-muted)";
  etiqueta.textContent = m.clave;

  const valorBadge = document.createElement("span");
  valorBadge.className = \`dom-badge \${m.estado}\`;
  valorBadge.textContent = m.valor;

  tarjetaMini.append(etiqueta, valorBadge);
  fragmento.appendChild(tarjetaMini);
});

// 2. Inserción atómica en el DOM (¡Un solo reflujo!)
contenedor.innerHTML = "";
contenedor.appendChild(fragmento);

const duracion = (performance.now() - tInicio).toFixed(2);
console.log(\`✓ \${datosMetricas.length} tarjetas insertadas atómicamente en \${duracion}ms.\`);`
        }
      ]
    },

    {
      id: 'apartado-dom-arquitectura-tres-facetas',
      title: '6.8 Arquitectura de las 3 Facetas e Independencia Tecnológica',
      criteriaRef: 'Criterios f), g), h)',
      description: 'Separación estricta de responsabilidades: Contenido (HTML5 semántico), Aspecto (CSS desacoplado) y Comportamiento (JavaScript no intrusivo). Compatibilidad multi-navegador.',
      theoryHtml: `
        <p>El criterio de evaluación <strong>h)</strong> exige la independización estricta de las tres facetas en cualquier aplicación web profesional. Romper esta separación genera código frágil, difícil de mantener y no reutilizable.</p>

        <h4>A. Las Tres Facetas de la Arquitectura Web</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.88rem;">
          <thead>
            <tr style="background: var(--bg-surface-2); text-align: left;">
              <th style="padding: 8px; border: var(--border-subtle);">Faceta</th>
              <th style="padding: 8px; border: var(--border-subtle);">Tecnología</th>
              <th style="padding: 8px; border: var(--border-subtle);">Responsabilidad Exclusiva</th>
              <th style="padding: 8px; border: var(--border-subtle);">Mala Práctica (Anti-patrón)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle); font-weight: 700; color: var(--color-brand);">1. Contenido</td>
              <td style="padding: 8px; border: var(--border-subtle);">HTML5 Semántico</td>
              <td style="padding: 8px; border: var(--border-subtle);">Estructura de la información, accesibilidad (ARIA) y significado.</td>
              <td style="padding: 8px; border: var(--border-subtle);">Atributos <code>onclick="..."</code> o etiquetas de formato visual como <code>&lt;font&gt;</code>.</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle); font-weight: 700; color: var(--color-cyan);">2. Aspecto</td>
              <td style="padding: 8px; border: var(--border-subtle);">CSS Desacoplado</td>
              <td style="padding: 8px; border: var(--border-subtle);">Disposición visual, colores, tipografía, temas y animaciones.</td>
              <td style="padding: 8px; border: var(--border-subtle);">Estilos en línea forzados desde JS (ej: <code>element.style.color = "red"</code>).</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: var(--border-subtle); font-weight: 700; color: var(--color-success);">3. Comportamiento</td>
              <td style="padding: 8px; border: var(--border-subtle);">JavaScript Moderno</td>
              <td style="padding: 8px; border: var(--border-subtle);">Lógica de negocio, interactividad, estado y comunicación asíncrona.</td>
              <td style="padding: 8px; border: var(--border-subtle);">Generar estructuras HTML complejas como cadenas de texto hardcodeadas.</td>
            </tr>
          </tbody>
        </table>

        <h4>B. JavaScript No Intrusivo (Unobtrusive JavaScript)</h4>
        <p>El código JavaScript debe ser totalmente independiente del marcado:</p>
        <ul>
          <li>Nunca mezclar lógica en atributos HTML (evitar <code>onclick</code>, <code>onchange</code>). Usar siempre <code>addEventListener</code> en archivos <code>.js</code> separados.</li>
          <li>Para cambiar el aspecto, JavaScript <strong>solo conmuta clases semánticas</strong> (<code>classList.toggle('is-active')</code>). Es la hoja CSS la que decide cómo se visualiza esa clase.</li>
          <li>Si el usuario desactiva JavaScript o el script falla, el contenido HTML base debe seguir siendo legible y accesible.</li>
        </ul>

        <h4>C. Compatibilidad entre Navegadores (Cross-Browser)</h4>
        <p>Los estándares modernos gobernados por W3C y WHATWG garantizan compatibilidad uniforme en Chrome, Firefox, Safari y Edge. Las APIs legadas (como <code>attachEvent</code> de IE) están obsoletas en favor de la especificación DOM Living Standard.</p>
      `,
      callout: {
        type: 'architecture',
        title: 'Regla de Oro de la Arquitectura de Software',
        text: 'Si el cliente pide mañana cambiar el color de error de rojo a fucsia o activar un modo oscuro, <strong>no deberías tener que tocar ni una sola línea de JavaScript</strong>. Si tienes que editar código JS para cambiar un color, has violado la separación de las 3 facetas.'
      },
      examples: [
        {
          id: 'ex-dom-tres-facetas-toast',
          title: 'Ejemplo Visual: Componente de Notificación con las 3 Facetas',
          description: 'Observa la separación estricta: HTML semántico con atributos ARIA, CSS que define el tema mediante clases y JS no intrusivo que gestiona el estado.',
          isVisual: true,
          domFixture: `
            <div class="dom-card-preview" id="panel-tres-facetas">
              <div class="dom-title-box">
                <h4 class="dom-title-text">Demostración: Separación de 3 Facetas</h4>
                <div class="dom-controls-row" style="margin: 0;">
                  <button class="dom-btn-preview" id="btn-toast-exito">Disparar Éxito</button>
                  <button class="dom-btn-preview" id="btn-toast-error">Disparar Alerta</button>
                </div>
              </div>
              <div id="caja-notificacion" class="dom-alert-box" role="status" aria-live="polite" style="display: none;">
                <span id="notificacion-icono">ℹ</span>
                <span id="notificacion-mensaje">Mensaje del sistema</span>
              </div>
            </div>
          `,
          initialCode: `// JavaScript no intrusivo: solo gestiona el estado y activa clases semánticas
const notificacion = document.getElementById("caja-notificacion");
const icono = document.getElementById("notificacion-icono");
const mensaje = document.getElementById("notificacion-mensaje");

const btnExito = document.getElementById("btn-toast-exito");
const btnError = document.getElementById("btn-toast-error");

function mostrarNotificacion(texto, tipo) {
  // 1. Actualizamos el contenido textual accesible (Contenido)
  mensaje.textContent = texto;

  // 2. Conmutamos la clase CSS predefinida (Aspecto desacoplado)
  if (tipo === "exito") {
    icono.textContent = "✓";
    notificacion.className = "dom-alert-box alert-success";
  } else {
    icono.textContent = "⚠";
    notificacion.className = "dom-alert-box";
  }

  // 3. Mostramos la notificación
  notificacion.style.display = "flex";
  console.log(\`[3 Facetas] Notificación de tipo "\${tipo}" mostrada con éxito.\`);
}

// Vinculación de listeners no intrusivos
btnExito.addEventListener("click", () => {
  mostrarNotificacion("Operación completada con éxito conforme a los estándares W3C.", "exito");
});

btnError.addEventListener("click", () => {
  mostrarNotificacion("Atención: Comprueba que no estás utilizando estilos inline invasivos.", "error");
});

// Disparo inicial de demostración
mostrarNotificacion("El sistema respeta la independencia de contenido, aspecto y comportamiento.", "exito");`
        }
      ]
    }
  ],

  // =========================================================================
  // TEST DE AUTOEVALUACIÓN TEÓRICO-PRÁCTICA (12 PREGUNTAS DE EXAMEN OFICIAL)
  // =========================================================================
  quizzes: [
    {
      id: 'quiz-dom-1',
      topicTag: 'Apartado 6.1: Tipos de Nodos',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Qué valor numérico tiene la constante Node.ELEMENT_NODE según la especificación W3C del DOM?',
      options: [
        '1',
        '2',
        '3',
        '9'
      ],
      correctIndex: 0,
      explanation: 'Node.ELEMENT_NODE equivale a 1. Los nodos de texto (Node.TEXT_NODE) equivalen a 3 y el documento raíz (Node.DOCUMENT_NODE) equivale a 9.'
    },
    {
      id: 'quiz-dom-2',
      topicTag: 'Apartado 6.1: Nodos vs Elementos',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: '¿Cuál es la diferencia fundamental entre element.childNodes y element.children?',
      options: [
        'childNodes devuelve un Array de JavaScript y children devuelve un NodeList.',
        'childNodes incluye todos los nodos (incluyendo nodos de texto por espacios en blanco y comentarios), mientras que children solo incluye nodos de tipo elemento HTML.',
        'children incluye todos los nodos del documento y childNodes solo los elementos descendientes directos.',
        'Son exactamente sinónimos y devuelven la misma colección en todos los navegadores.'
      ],
      correctIndex: 1,
      explanation: 'childNodes devuelve un NodeList con todos los nodos (texto, comentarios, elementos). children devuelve un HTMLCollection que filtra exclusivamente los elementos HTML (nodeType === 1).'
    },
    {
      id: 'quiz-dom-3',
      topicTag: 'Apartado 6.2: Colecciones del DOM',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: '¿Qué diferencia crucial existe entre la colección devuelta por getElementsByClassName() y la devuelta por querySelectorAll()?',
      options: [
        'getElementsByClassName devuelve una colección viva (Live HTMLCollection), mientras que querySelectorAll devuelve una instantánea estática (Static NodeList).',
        'querySelectorAll devuelve una colección viva que se actualiza en tiempo real, mientras que getElementsByClassName es estática.',
        'getElementsByClassName solo funciona en navegadores obsoletos y no está estandarizada.',
        'querySelectorAll no permite iterar mediante forEach mientras que getElementsByClassName sí.'
      ],
      correctIndex: 0,
      explanation: 'getElementsByClassName devuelve un HTMLCollection vivo (si agregas un nuevo elemento al DOM, se refleja inmediatamente en la colección). querySelectorAll devuelve un NodeList estático (snapshot).'
    },
    {
      id: 'quiz-dom-4',
      topicTag: 'Apartado 6.3: Seguridad y XSS',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      question: '¿Por qué las directrices de seguridad desaconsejan el uso de innerHTML para insertar datos introducidos por el usuario?',
      options: [
        'Porque innerHTML no funciona en navegadores modernos basados en Chromium.',
        'Porque abre una vulnerabilidad crítica de inyección de código malicioso XSS (Cross-Site Scripting), siendo preferible usar textContent.',
        'Porque innerHTML borra automáticamente todas las hojas de estilo CSS de la página.',
        'Porque solo permite insertar texto plano sin formato.'
      ],
      correctIndex: 1,
      explanation: 'Si se concatena una entrada de usuario sin sanitizar en innerHTML, un atacante puede inyectar etiquetas como <img src=x onerror=...> y ejecutar scripts arbitrarios (XSS). textContent trata todo el contenido como texto inofensivo.'
    },
    {
      id: 'quiz-dom-5',
      topicTag: 'Apartado 6.3: Métodos de Inserción',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Cuál de los siguientes métodos modernos permite eliminar un elemento del DOM directamente sin necesidad de referenciar a su elemento padre?',
      options: [
        'element.removeChild()',
        'element.deleteNode()',
        'element.remove()',
        'document.destroy(element)'
      ],
      correctIndex: 2,
      explanation: 'El método moderno element.remove() elimina el nodo directamente del árbol DOM sin requerir element.parentNode.removeChild(element).'
    },
    {
      id: 'quiz-dom-6',
      topicTag: 'Apartado 6.4: API dataset',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: 'Dado el marcado <div id="user" data-user-role="gestor-aulas">, ¿cómo se accede correctamente a dicho valor desde JavaScript?',
      options: [
        'document.getElementById("user").dataset["user-role"] únicamente.',
        'document.getElementById("user").dataset.userRole',
        'document.getElementById("user").dataUserRole',
        'document.getElementById("user").getAttributeData("user-role")'
      ],
      correctIndex: 1,
      explanation: 'La API dataset convierte automáticamente los nombres kebab-case (data-user-role) a camelCase (dataset.userRole).'
    },
    {
      id: 'quiz-dom-7',
      topicTag: 'Apartado 6.4: API classList',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Qué método de classList permite añadir una clase si no está presente, o retirarla si ya existe?',
      options: [
        'classList.switch()',
        'classList.toggle()',
        'classList.swap()',
        'classList.change()'
      ],
      correctIndex: 1,
      explanation: 'classList.toggle("clase") conmuta la presencia de la clase: la agrega si no existe y la retira si ya estaba.'
    },
    {
      id: 'quiz-dom-8',
      topicTag: 'Apartado 6.5: Estilos Computados',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      question: 'Un elemento tiene definida su anchura en una hoja CSS externa con .caja { width: 350px; }. ¿Qué devolverá elemento.style.width en JavaScript?',
      options: [
        '"350px"',
        '350 (número)',
        '"" (cadena vacía), ya que element.style solo lee estilos inline declarados en el atributo style.',
        'null'
      ],
      correctIndex: 2,
      explanation: 'element.style solo refleja los estilos asignados directamente en el atributo HTML style. Para leer estilos aplicados por hojas CSS externas se debe utilizar window.getComputedStyle(elemento).width.'
    },
    {
      id: 'quiz-dom-9',
      topicTag: 'Apartado 6.6: Eventos del DOM',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: 'Dentro del manejador de un evento, ¿cuál es la diferencia entre event.target y event.currentTarget?',
      options: [
        'event.target es el elemento donde se registró el addEventListener y currentTarget es el objeto window.',
        'event.target es el elemento exacto donde se originó el evento y event.currentTarget es el elemento que tiene suscrito el listener.',
        'Son idénticos y nunca pueden tener valores distintos.',
        'event.target solo existe en eventos de ratón y currentTarget en eventos de teclado.'
      ],
      correctIndex: 1,
      explanation: 'event.target hace referencia al elemento que originó el evento (el nodo más profundo pulsado), mientras que event.currentTarget es el elemento donde se vinculó el manejador (fundamental en el patrón de delegación).'
    },
    {
      id: 'quiz-dom-10',
      topicTag: 'Apartado 6.6: Delegación de Eventos',
      difficulty: 'Examen FP',
      difficultyClass: 'diff-examen',
      question: '¿Qué método del DOM permite buscar hacia arriba en la jerarquía el ancestro más próximo que coincida con un selector CSS?',
      options: [
        'element.findParent()',
        'element.closest()',
        'element.ancestorSelector()',
        'element.parentElementMatching()'
      ],
      correctIndex: 1,
      explanation: 'element.closest(selector) asciende por el árbol de nodos devolviendo el ancestro más cercano (o el propio elemento) que coincide con el selector CSS indicado.'
    },
    {
      id: 'quiz-dom-11',
      topicTag: 'Apartado 6.7: Optimización y Fragmentos',
      difficulty: 'Intermedio',
      difficultyClass: 'diff-medio',
      question: '¿Cuál es la principal ventaja de utilizar document.createDocumentFragment() al insertar múltiples elementos en el DOM?',
      options: [
        'Convierte automáticamente el código JavaScript a WebAssembly para mayor velocidad.',
        'Permite construir todos los elementos en memoria e insertarlos en el DOM real en una sola operación, provocando un único reflujo (reflow).',
        'Elimina automáticamente las imágenes duplicadas para ahorrar ancho de banda.',
        'Permite ejecutar código de servidor en el cliente.'
      ],
      correctIndex: 1,
      explanation: 'DocumentFragment es un contenedor ligero en memoria. Al insertarse en el DOM, se transfieren sus nodos hijos en una única operación atómica, evitando múltiples ciclos costosos de reflujo (reflow).'
    },
    {
      id: 'quiz-dom-12',
      topicTag: 'Apartado 6.8: Arquitectura de las 3 Facetas',
      difficulty: 'Básico',
      difficultyClass: 'diff-facil',
      question: '¿Cuál de las siguientes prácticas cumple estrictamente con el principio de JavaScript No Intrusivo (Unobtrusive JS)?',
      options: [
        'Añadir <button onclick="validarFormulario()"> en el marcado HTML.',
        'Definir element.style.color = "#ff0000" para marcar un error visual en el elemento.',
        'Separar la estructura en HTML semántico, definir las clases en CSS y vincular los manejadores en un script externo con addEventListener.',
        'Escribir todo el código CSS y JS dentro del cuerpo del HTML en etiquetas <script> y <style>.'
      ],
      correctIndex: 2,
      explanation: 'El JavaScript no intrusivo exige desacoplar el comportamiento (listeners con addEventListener en archivos JS externos) del contenido (HTML semántico) y del aspecto (hojas de estilo CSS).'
    }
  ],

  // =========================================================================
  // RETOS DE PROGRAMACIÓN GUIADA (6 RETOS CON LIENZO VISUAL Y EVALUACIÓN DOM)
  // =========================================================================
  challenges: [
    {
      id: 'ra6-ch1-selectores',
      title: 'Reto 1: Extractor y Contador de Elementos Activos',
      topicTag: 'Criterios a, b, c · Selectores y Navegación',
      difficulty: 'Básico',
      instructions: `
        <p>En este reto debes utilizar selectores del DOM y navegación transversal para analizar una lista de estudiantes y actualizar el panel de control en tiempo real (puedes usar el botón <strong>"&lt;/&gt; HTML Inicial"</strong> para consultar la estructura base):</p>
        <ul>
          <li>Localiza todos los elementos de la lista que tienen la clase <code>.alumno-item.activo</code> dentro de <code>#lista-clase-daw</code> usando <code>querySelectorAll</code>.</li>
          <li>Cuenta cuántos alumnos activos hay en total mediante la propiedad <code>.length</code> de la colección.</li>
          <li>Asigna ese número como texto al elemento con id <code>#contador-activos</code> usando la propiedad <code>textContent</code>.</li>
          <li>Localiza al primer alumno activo de la lista y asigna su nombre (el contenido de su <code>&lt;span&gt;</code>) como texto al elemento con id <code>#primer-alumno-conectado</code>.</li>
        </ul>
      `,
      hint: 'Usa <code>contador.textContent = activos.length;</code> y para el primer alumno conectado: <code>primerConectado.textContent = activos[0].firstElementChild.textContent;</code> (o con <code>activos[0].querySelector("span").textContent</code>).',
      domFixture: `
        <div class="dom-card-preview" id="panel-reto-alumnos">
          <div class="dom-title-box">
            <h4 class="dom-title-text">Alumnos Conectados al Servidor DAW</h4>
            <span class="dom-badge badge-success" id="contador-activos">0</span>
          </div>
          <div style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 8px;">
            Primer conectado: <strong id="primer-alumno-conectado" style="color: var(--color-brand);">Ninguno</strong>
          </div>
          <ul class="dom-list-container" id="lista-clase-daw">
            <li class="dom-list-item alumno-item activo"><span>Lucía Fernández</span><span class="dom-badge badge-success">Online</span></li>
            <li class="dom-list-item alumno-item"><span>Marcos Valls</span><span class="dom-badge badge-danger">Ausente</span></li>
            <li class="dom-list-item alumno-item activo"><span>Sofía Morales</span><span class="dom-badge badge-success">Online</span></li>
            <li class="dom-list-item alumno-item activo"><span>Daniel Navarro</span><span class="dom-badge badge-success">Online</span></li>
          </ul>
        </div>
      `,
      starterCode: `// Reto 1: Selección y Navegación Transversal en el DOM
// 1. Obtén todos los li que tienen la clase "activo" dentro de #lista-clase-daw
const activos = document.querySelectorAll("#lista-clase-daw .alumno-item.activo");

// 2. Obtén los elementos del panel donde mostrar los resultados
const contador = document.getElementById("contador-activos");
const primerConectado = document.getElementById("primer-alumno-conectado");

// 3. Asigna la cantidad de alumnos activos y el nombre del primer conectado:
// Escribe tu solución aquí:

`,
      type: 'dom',
      tests: [
        {
          name: 'El elemento #contador-activos muestra el número correcto de alumnos activos (3)',
          testFn: `(canvas) => {
            const contador = canvas.querySelector("#contador-activos");
            return contador && contador.textContent.trim() === "3";
          }`,
          error: 'El texto de #contador-activos debe ser exactamente "3".'
        },
        {
          name: 'El elemento #primer-alumno-conectado muestra el nombre del primer alumno activo ("Lucía Fernández")',
          testFn: `(canvas) => {
            const destacado = canvas.querySelector("#primer-alumno-conectado");
            return destacado && destacado.textContent.trim() === "Lucía Fernández";
          }`,
          error: 'El texto de #primer-alumno-conectado debe ser "Lucía Fernández".'
        }
      ]
    },

    {
      id: 'ra6-ch2-creacion-nodos',
      title: 'Reto 2: Inserción Dinámica de Notificaciones con createElement',
      topicTag: 'Criterio d · Creación y Manipulación de Nodos',
      difficulty: 'Intermedio',
      instructions: `
        <p>Crea programáticamente una nueva notificación en el panel de avisos del sistema:</p>
        <ul>
          <li>Crea un nuevo elemento <code>&lt;li&gt;</code> con la clase <code>dom-list-item item-highlight</code>.</li>
          <li>Crea un elemento <code>&lt;span&gt;</code> con el texto <code>"Copia de seguridad finalizada"</code>.</li>
          <li>Crea un elemento <code>&lt;span&gt;</code> con la clase <code>dom-badge badge-success</code> y el texto <code>"ÉXITO"</code>.</li>
          <li>Inserta ambos spans dentro del <code>&lt;li&gt;</code>.</li>
          <li>Inserta el <code>&lt;li&gt;</code> al principio de la lista <code>#lista-notificaciones-sistema</code> usando <code>prepend()</code>.</li>
        </ul>
      `,
      hint: 'Crea el li con <code>document.createElement("li")</code>, añade sus clases y luego usa <code>nuevoLi.append(spanTexto, spanBadge)</code> antes de hacer <code>lista.prepend(nuevoLi)</code>.',
      domFixture: `
        <div class="dom-card-preview" id="panel-reto-notificaciones">
          <div class="dom-title-box">
            <h4 class="dom-title-text">Bandeja de Alertas del Sistema</h4>
            <span class="dom-badge badge-brand">Sistema Activo</span>
          </div>
          <ul class="dom-list-container" id="lista-notificaciones-sistema">
            <li class="dom-list-item">
              <span>Actualización de kernel aplicada</span>
              <span class="dom-badge">INFO</span>
            </li>
          </ul>
        </div>
      `,
      starterCode: `// Reto 2: Generación e inserción de una notificación con createElement y prepend
const lista = document.getElementById("lista-notificaciones-sistema");

// Escribe tu solución aquí:

`,
      type: 'dom',
      tests: [
        {
          name: 'La lista contiene 2 elementos tras la inserción',
          testFn: `(canvas) => {
            const items = canvas.querySelectorAll("#lista-notificaciones-sistema li");
            return items.length === 2;
          }`,
          error: 'La lista debe tener 2 elementos li.'
        },
        {
          name: 'El primer elemento tiene el texto "Copia de seguridad finalizada" y el badge "ÉXITO"',
          testFn: `(canvas) => {
            const primerItem = canvas.querySelector("#lista-notificaciones-sistema li:first-child");
            if (!primerItem) return false;
            const tieneTexto = primerItem.textContent.includes("Copia de seguridad finalizada");
            const badge = primerItem.querySelector(".badge-success");
            const tieneBadge = badge && badge.textContent.trim() === "ÉXITO";
            return tieneTexto && tieneBadge;
          }`,
          error: 'El primer li debe contener "Copia de seguridad finalizada" y un badge con clase "badge-success" y texto "ÉXITO".'
        },
        {
          name: 'El nuevo elemento tiene las clases dom-list-item e item-highlight',
          testFn: `(canvas) => {
            const primerItem = canvas.querySelector("#lista-notificaciones-sistema li:first-child");
            return primerItem && primerItem.classList.contains("dom-list-item") && primerItem.classList.contains("item-highlight");
          }`,
          error: 'El nuevo elemento debe incluir las clases "dom-list-item" e "item-highlight".'
        }
      ]
    },

    {
      id: 'ra6-ch3-dataset-clases',
      title: 'Reto 3: Gestión de Estado con dataset y classList',
      topicTag: 'Criterios d, e · Atributos, Clases y dataset',
      difficulty: 'Intermedio',
      instructions: `
        <p>Actualiza el estado de una tarjeta de usuario para ascenderlo a categoría premium:</p>
        <ul>
          <li>Selecciona la tarjeta con id <code>#tarjeta-usuario-reto</code>.</li>
          <li>Lee su atributo <code>data-plan</code>. Si es <code>"gratuito"</code>, cámbialo a <code>"premium"</code> usando la API <code>dataset</code>.</li>
          <li>Añade al <code>dataset</code> la propiedad <code>fechaRenovacion</code> con el valor <code>"2026-12-31"</code>.</li>
          <li>Añade la clase <code>active-theme</code> a la tarjeta.</li>
          <li>Localiza el badge <code>#badge-plan-usuario</code>, cambia su clase de <code>badge-brand</code> a <code>badge-success</code> y actualiza su texto a <code>"PLAN PREMIUM"</code>.</li>
        </ul>
      `,
      hint: 'Modifica <code>tarjeta.dataset.plan = "premium"</code> y <code>tarjeta.dataset.fechaRenovacion = "2026-12-31"</code>. Usa <code>badge.classList.replace("badge-brand", "badge-success")</code>.',
      domFixture: `
        <div class="dom-card-preview" id="tarjeta-usuario-reto" data-plan="gratuito" data-user-id="usr-784">
          <div class="dom-title-box">
            <h4 class="dom-title-text">Carlos Méndez</h4>
            <span class="dom-badge badge-brand" id="badge-plan-usuario">PLAN GRATUITO</span>
          </div>
          <p style="margin: 0; font-size: 0.86rem; color: var(--text-secondary);">
            Acceso estándar a los laboratorios prácticos de cliente.
          </p>
        </div>
      `,
      starterCode: `// Reto 3: Actualización de estado con dataset y classList
const tarjeta = document.getElementById("tarjeta-usuario-reto");
const badge = document.getElementById("badge-plan-usuario");

// Escribe tu solución aquí:

`,
      type: 'dom',
      tests: [
        {
          name: 'El dataset.plan es "premium" y dataset.fechaRenovacion es "2026-12-31"',
          testFn: `(canvas) => {
            const tarjeta = canvas.querySelector("#tarjeta-usuario-reto");
            return tarjeta && tarjeta.dataset.plan === "premium" && tarjeta.dataset.fechaRenovacion === "2026-12-31";
          }`,
          error: 'tarjeta.dataset.plan debe ser "premium" y tarjeta.dataset.fechaRenovacion debe ser "2026-12-31".'
        },
        {
          name: 'La tarjeta tiene la clase active-theme',
          testFn: `(canvas) => {
            const tarjeta = canvas.querySelector("#tarjeta-usuario-reto");
            return tarjeta && tarjeta.classList.contains("active-theme");
          }`,
          error: 'Debes añadir la clase "active-theme" a la tarjeta.'
        },
        {
          name: 'El badge tiene la clase badge-success y el texto "PLAN PREMIUM"',
          testFn: `(canvas) => {
            const badge = canvas.querySelector("#badge-plan-usuario");
            return badge && badge.classList.contains("badge-success") && badge.textContent.trim() === "PLAN PREMIUM";
          }`,
          error: 'El badge debe tener la clase "badge-success" y su texto debe ser "PLAN PREMIUM".'
        }
      ]
    },

    {
      id: 'ra6-ch4-delegacion-eventos',
      title: 'Reto 4: Delegación de Eventos en Lista de Productos',
      topicTag: 'Criterio e · Eventos y Delegación',
      difficulty: 'Examen FP',
      instructions: `
        <p>Implementa un sistema de eliminación dinámico utilizando el patrón de <strong>Delegación de Eventos</strong>:</p>
        <ul>
          <li>Registra un único listener de evento <code>click</code> sobre el contenedor padre <code>#lista-productos-reto</code>.</li>
          <li>Dentro del listener, comprueba si el elemento pulsado o su ancestro es un botón con la clase <code>.btn-quitar-producto</code> usando <code>event.target.closest()</code>.</li>
          <li>Si coincide, localiza la fila <code>&lt;li&gt;</code> contenedora con <code>closest("li")</code> y elimínala del DOM con <code>.remove()</code>.</li>
          <li>Actualiza el contador con id <code>#total-productos-reto</code> para que refleje el número exacto de elementos <code>&lt;li&gt;</code> restantes en la lista.</li>
        </ul>
      `,
      hint: 'Usa <code>lista.addEventListener("click", (e) => { const btn = e.target.closest(".btn-quitar-producto"); if (!btn) return; btn.closest("li").remove(); contador.textContent = lista.children.length; })</code>.',
      domFixture: `
        <div class="dom-card-preview" id="panel-reto-carrito">
          <div class="dom-title-box">
            <h4 class="dom-title-text">Cesta de la Compra</h4>
            <span class="dom-badge badge-brand" id="total-productos-reto">3</span>
          </div>
          <ul class="dom-list-container" id="lista-productos-reto">
            <li class="dom-list-item" data-id="p1">
              <span>Teclado Mecánico Custom</span>
              <button class="dom-btn-preview btn-quitar-producto">Eliminar</button>
            </li>
            <li class="dom-list-item" data-id="p2">
              <span>Ratón Ergonómico 1000 DPI</span>
              <button class="dom-btn-preview btn-quitar-producto">Eliminar</button>
            </li>
            <li class="dom-list-item" data-id="p3">
              <span>Alfombrilla Desk Mat XXL</span>
              <button class="dom-btn-preview btn-quitar-producto">Eliminar</button>
            </li>
          </ul>
        </div>
      `,
      starterCode: `// Reto 4: Delegación de eventos para eliminar productos
const lista = document.getElementById("lista-productos-reto");
const contador = document.getElementById("total-productos-reto");

// Registra un único listener en el contenedor padre:

`,
      type: 'dom',
      tests: [
        {
          name: 'Al hacer clic en el botón de eliminar de un producto, la fila correspondiente se elimina',
          testFn: `(canvas) => {
            const lista = canvas.querySelector("#lista-productos-reto");
            const primerBoton = lista.querySelector(".btn-quitar-producto");
            if (!primerBoton) return false;
            primerBoton.click();
            return lista.querySelectorAll("li").length === 2;
          }`,
          error: 'Al pulsar en .btn-quitar-producto debe eliminarse su fila li asociada.'
        },
        {
          name: 'El contador #total-productos-reto se actualiza correctamente tras la eliminación',
          testFn: `(canvas) => {
            const contador = canvas.querySelector("#total-productos-reto");
            return contador && (contador.textContent.trim() === "2" || contador.textContent.trim() === "1");
          }`,
          error: 'El contador debe actualizarse con el número de elementos restantes en la lista.'
        }
      ]
    },

    {
      id: 'ra6-ch5-document-fragment',
      title: 'Reto 5: Inserción de Alto Rendimiento con DocumentFragment',
      topicTag: 'Criterio f · Optimización y Fragmentos',
      difficulty: 'Intermedio',
      instructions: `
        <p>Inserta una lista de tecnologías web en el contenedor <code>#contenedor-tags-reto</code> utilizando <code>DocumentFragment</code> para minimizar los reflujos de render:</p>
        <ul>
          <li>Crea un fragmento de documento con <code>document.createDocumentFragment()</code>.</li>
          <li>Recorre el array <code>["HTML5", "CSS3", "ES6+", "DOM W3C", "Vite"]</code>.</li>
          <li>Para cada tecnología, crea un elemento <code>&lt;span&gt;</code> con la clase <code>dom-badge badge-brand</code> y su texto correspondiente.</li>
          <li>Añade cada span al fragmento.</li>
          <li>Inserta el fragmento en <code>#contenedor-tags-reto</code> en una única operación con <code>appendChild()</code>.</li>
        </ul>
      `,
      hint: 'Usa <code>const fragmento = document.createDocumentFragment();</code>, añade los spans en un forEach y finalmente <code>contenedor.appendChild(fragmento);</code>.',
      domFixture: `
        <div class="dom-card-preview" id="panel-reto-fragmento">
          <div class="dom-title-box">
            <h4 class="dom-title-text">Stack Tecnológico del Proyecto</h4>
          </div>
          <div id="contenedor-tags-reto" class="dom-controls-row">
            <!-- Los badges deben insertarse aquí mediante DocumentFragment -->
          </div>
        </div>
      `,
      starterCode: `// Reto 5: Inserción atómica con DocumentFragment
const contenedor = document.getElementById("contenedor-tags-reto");
const tecnologias = ["HTML5", "CSS3", "ES6+", "DOM W3C", "Vite"];

// Escribe tu solución aquí:

`,
      type: 'dom',
      tests: [
        {
          name: 'Se han insertado exactamente 5 badges en el contenedor',
          testFn: `(canvas) => {
            const badges = canvas.querySelectorAll("#contenedor-tags-reto .dom-badge");
            return badges.length === 5;
          }`,
          error: 'Deben existir exactamente 5 elementos .dom-badge en el contenedor.'
        },
        {
          name: 'Todos los badges tienen las clases dom-badge y badge-brand',
          testFn: `(canvas) => {
            const badges = Array.from(canvas.querySelectorAll("#contenedor-tags-reto .dom-badge"));
            return badges.every(b => b.classList.contains("dom-badge") && b.classList.contains("badge-brand"));
          }`,
          error: 'Todos los elementos deben incluir las clases "dom-badge" y "badge-brand".'
        },
        {
          name: 'Los textos coinciden con el array de tecnologías',
          testFn: `(canvas) => {
            const textos = Array.from(canvas.querySelectorAll("#contenedor-tags-reto .dom-badge")).map(b => b.textContent.trim());
            const esperados = ["HTML5", "CSS3", "ES6+", "DOM W3C", "Vite"];
            return JSON.stringify(textos) === JSON.stringify(esperados);
          }`,
          error: 'Los textos de los badges deben coincidir con ["HTML5", "CSS3", "ES6+", "DOM W3C", "Vite"].'
        }
      ]
    },

    {
      id: 'ra6-ch6-tres-facetas-acordeon',
      title: 'Reto 6: Las 3 Facetas - Acordeón Accesible con aria-expanded',
      topicTag: 'Criterio h · Independencia de las 3 Facetas',
      difficulty: 'Examen FP',
      instructions: `
        <p>Construye el comportamiento de un acordeón interactivo y accesible respetando la separación estricta de las tres facetas (sin estilos inline en JS):</p>
        <ul>
          <li>Selecciona el botón <code>#btn-toggle-acordeon</code> y el panel <code>#panel-contenido-acordeon</code>.</li>
          <li>Vincula un listener de <code>click</code> al botón.</li>
          <li>Al pulsar, conmuta la clase <code>active-theme</code> en el panel usando <code>classList.toggle("active-theme")</code>.</li>
          <li>Comprueba si el panel tiene la clase <code>active-theme</code>:
            <ul>
              <li>Si la tiene: actualiza el atributo de accesibilidad <code>aria-expanded</code> del botón a <code>"true"</code> y cambia el texto del badge indicador a <code>"ABIERTO"</code>.</li>
              <li>Si no la tiene: actualiza <code>aria-expanded</code> a <code>"false"</code> y el texto del badge a <code>"CERRADO"</code>.</li>
            </ul>
          </li>
        </ul>
      `,
      hint: 'Utiliza <code>boton.setAttribute("aria-expanded", estaAbierto ? "true" : "false")</code>. No uses <code>panel.style.display</code> para no violar la faceta de aspecto.',
      domFixture: `
        <div class="dom-card-preview" id="acordeon-reto-container">
          <div class="dom-title-box">
            <h4 class="dom-title-text">Preguntas Frecuentes DAW</h4>
            <span class="dom-badge" id="badge-acordeon-estado">CERRADO</span>
          </div>
          <button class="dom-btn-preview" id="btn-toggle-acordeon" aria-expanded="false" style="margin-bottom: 8px;">
            ¿Qué garantiza la separación de las 3 facetas? ▾
          </button>
          <div id="panel-contenido-acordeon" class="dom-alert-box" style="display: none;">
            Garantiza que el contenido HTML, los estilos CSS y el código JavaScript puedan modificarse de forma independiente sin romper el resto de la aplicación.
          </div>
        </div>
      `,
      starterCode: `// Reto 6: Acordeón accesible con las 3 facetas
const boton = document.getElementById("btn-toggle-acordeon");
const panel = document.getElementById("panel-contenido-acordeon");
const badge = document.getElementById("badge-acordeon-estado");

// Vincula el evento click y actualiza clases y atributos aria-expanded:

`,
      type: 'dom',
      tests: [
        {
          name: 'Al pulsar el botón una vez, el panel conmuta la clase active-theme, aria-expanded pasa a "true" y el badge muestra "ABIERTO"',
          testFn: `(canvas) => {
            const boton = canvas.querySelector("#btn-toggle-acordeon");
            const panel = canvas.querySelector("#panel-contenido-acordeon");
            const badge = canvas.querySelector("#badge-acordeon-estado");
            if (!boton || !panel || !badge) return false;

            boton.click();
            const isOpen = panel.classList.contains("active-theme");
            const isAriaTrue = boton.getAttribute("aria-expanded") === "true";
            const isBadgeOpen = badge.textContent.trim() === "ABIERTO";
            return isOpen && isAriaTrue && isBadgeOpen;
          }`,
          error: 'Al pulsar el botón, el panel debe tener la clase "active-theme", el botón aria-expanded="true" y el badge "ABIERTO".'
        },
        {
          name: 'Al pulsar el botón por segunda vez, el acordeón se cierra, aria-expanded vuelve a "false" y el badge muestra "CERRADO"',
          testFn: `(canvas) => {
            const boton = canvas.querySelector("#btn-toggle-acordeon");
            const panel = canvas.querySelector("#panel-contenido-acordeon");
            const badge = canvas.querySelector("#badge-acordeon-estado");
            if (!boton || !panel || !badge) return false;

            // Segundo clic (cerrar)
            boton.click();
            const isClosed = !panel.classList.contains("active-theme");
            const isAriaFalse = boton.getAttribute("aria-expanded") === "false";
            const isBadgeClosed = badge.textContent.trim() === "CERRADO";
            return isClosed && isAriaFalse && isBadgeClosed;
          }`,
          error: 'Al hacer un segundo clic, el acordeón debe cerrarse, aria-expanded debe ser "false" y el badge "CERRADO".'
        }
      ]
    }
  ]
};
