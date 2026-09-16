const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const html = path.resolve('assets/presentacion_ra1_cifp.html');
const pdf = path.resolve('Presentacion_RA1_CIFP_Carlos_III.pdf');
const pdfAlt = path.resolve('Presentacion_RA1_CIFP_Carlos_III_Actualizada.pdf');

// Check if original is writable
let canWriteOrig = false;
try {
  const fd = fs.openSync(pdf, 'r+');
  fs.closeSync(fd);
  canWriteOrig = true;
} catch (e) {
  canWriteOrig = false;
}

const targetPdf = canWriteOrig ? pdf : pdfAlt;
console.log(`Writing PDF to: ${targetPdf} (original locked: ${!canWriteOrig})`);

const cmd = `"${chrome}" --headless --disable-gpu --allow-file-access-from-files --no-pdf-header-footer --print-to-pdf="${targetPdf}" "file:///${html.replace(/\\/g, '/')}"`;
execSync(cmd);
console.log(`PDF successfully generated! Size: ${fs.statSync(targetPdf).size} bytes`);
