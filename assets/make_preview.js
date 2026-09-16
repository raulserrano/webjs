const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve('assets/presentacion_ra1_cifp.html');
const outPath = path.resolve('assets/slide_preview_cover.png');

const cmd = `"${chromePath}" --headless --disable-gpu --window-size=1920,1080 --screenshot="${outPath}" "file:///${htmlPath.replace(/\\/g, '/')}"`;
execSync(cmd);
console.log('Cover preview created:', fs.existsSync(outPath), 'Size:', fs.statSync(outPath).size);
