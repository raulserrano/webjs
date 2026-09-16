const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve('assets/presentacion_ra1_cifp.html');

// Create a single-slide preview for slide 3 by creating an HTML file with just slide 3
const fullHtml = fs.readFileSync(htmlPath, 'utf8');
// Find slide 3
const parts = fullHtml.split('<div class="slide');
// Slide 3 is index 3
const slide3Html = parts[0] + '<div class="slide' + parts[3].split('<!-- ===================================================================== -->')[0] + '</body></html>';
const tempPath = path.resolve('assets/temp_slide3.html');
fs.writeFileSync(tempPath, slide3Html);

const outPath = path.resolve('assets/slide3_preview.png');
const cmd = `"${chromePath}" --headless --disable-gpu --window-size=1920,1080 --screenshot="${outPath}" "file:///${tempPath.replace(/\\/g, '/')}"`;
execSync(cmd);
console.log('Slide 3 preview captured, size:', fs.statSync(outPath).size);
