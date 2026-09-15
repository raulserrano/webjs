/**
 * UTILIDAD DE RESALTADO Y FORMATEO DE SINTAXIS HTML (HTML HIGHLIGHTER)
 * Proporciona un visor enriquecido para inspeccionar el marcado HTML base
 * sin dependencias externas. Principio de Responsabilidad Única (SoC).
 */

/**
 * Escapa caracteres especiales de HTML
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Normaliza la indentación de un bloque de HTML multilínea
 * @param {string} html
 * @returns {string}
 */
export function normalizeHtmlIndentation(html) {
  if (!html || typeof html !== 'string') return '';
  const lines = html.trim().split('\n');
  if (lines.length <= 1) return html.trim();

  // Calcular la indentación base mínima de las líneas no vacías a partir de la segunda
  let minIndent = Infinity;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().length === 0) continue;
    const match = line.match(/^(\s*)/);
    if (match && match[1].length < minIndent) {
      minIndent = match[1].length;
    }
  }

  if (minIndent === Infinity || minIndent === 0) {
    return lines.join('\n');
  }

  return lines.map((line, idx) => {
    if (idx === 0) return line.trim();
    if (line.trim().length === 0) return '';
    return line.startsWith(' '.repeat(minIndent))
      ? line.slice(minIndent)
      : line.trim();
  }).join('\n');
}

/**
 * Aplica marcado semántico y coloreado de sintaxis a una cadena HTML
 * @param {string} rawHtml - Marcado HTML sin escapar
 * @returns {string} Cadena HTML segura con etiquetas <span> para coloreado CSS
 */
export function highlightHtmlSyntax(rawHtml) {
  if (!rawHtml || typeof rawHtml !== 'string') return '';

  const normalized = normalizeHtmlIndentation(rawHtml);

  // Expresión regular que tokeniza comentarios, etiquetas completas con atributos y texto
  // Grupos:
  // 1: Comentarios <!-- ... -->
  // 2: Etiquetas HTML <...>
  const tokenRegex = /(<!--[\s\S]*?-->)|(<[^>]+>)|([^<]+)/g;

  return normalized.replace(tokenRegex, (match, comment, tag, text) => {
    if (comment) {
      return `<span class="tok-comment">${escapeHtml(comment)}</span>`;
    }

    if (tag) {
      // Resaltar elementos internos de la etiqueta (nombre de tag, atributos y valores)
      return highlightTagInternals(tag);
    }

    if (text) {
      return escapeHtml(text);
    }

    return escapeHtml(match);
  });
}

/**
 * Resalta el interior de una etiqueta HTML (<tag attr="val">)
 * @param {string} tagStr
 * @returns {string}
 */
function highlightTagInternals(tagStr) {
  // Manejar etiquetas de cierre: </tag>
  const closingMatch = tagStr.match(/^<\s*\/\s*([a-zA-Z0-9-]+)\s*>$/);
  if (closingMatch) {
    return `&lt;<span class="tok-tag">/${closingMatch[1]}</span>&gt;`;
  }

  // Identificar nombre de etiqueta inicial
  const openTagMatch = tagStr.match(/^<\s*([a-zA-Z0-9-]+)/);
  if (!openTagMatch) {
    return escapeHtml(tagStr);
  }

  const tagName = openTagMatch[1];
  let remainder = tagStr.slice(openTagMatch[0].length);

  // Comprobar si es autocierre (ej: />)
  const isSelfClosing = remainder.trim().endsWith('/>');
  const closeMarker = isSelfClosing ? '/&gt;' : '&gt;';
  if (isSelfClosing) {
    remainder = remainder.slice(0, remainder.lastIndexOf('/>'));
  } else if (remainder.endsWith('>')) {
    remainder = remainder.slice(0, remainder.lastIndexOf('>'));
  }

  // Tokenizar atributos dentro de la etiqueta
  const attrRegex = /([a-zA-Z0-9_:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  const highlightedAttrs = remainder.replace(attrRegex, (_, attrName, doubleVal, singleVal, unquotedVal) => {
    const val = doubleVal !== undefined ? `"${escapeHtml(doubleVal)}"` :
                singleVal !== undefined ? `'${escapeHtml(singleVal)}'` :
                unquotedVal !== undefined ? escapeHtml(unquotedVal) : null;

    if (val !== null) {
      return ` <span class="tok-attr">${attrName}</span>=<span class="tok-val">${val}</span>`;
    }
    return ` <span class="tok-attr">${attrName}</span>`;
  });

  return `&lt;<span class="tok-tag">${tagName}</span>${highlightedAttrs}${closeMarker}`;
}
