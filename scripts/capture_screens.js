const { execSync } = require('child_process');
const path = require('path');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const tests = [
  { name: 'verify_cover_1536x695.png', slide: 0, w: 1536, h: 695 },
  { name: 'verify_agenda_1536x695.png', slide: 1, w: 1536, h: 695 },
  { name: 'verify_slide3_jit_1536x695.png', slide: 3, w: 1536, h: 695 },
  { name: 'verify_slide5_pillars_1536x695.png', slide: 5, w: 1536, h: 695 },
  { name: 'verify_slide8_lighthouse_1536x695.png', slide: 8, w: 1536, h: 695 },
  { name: 'verify_slide3_tablet_768x1024.png', slide: 3, w: 768, h: 1024 },
  { name: 'verify_cover_mobile_390x844.png', slide: 0, w: 390, h: 844 }
];

for (const t of tests) {
  const url = `http://localhost:3001/assets/presentacion_ra1_cifp.html#slide-${t.slide}`;
  const outPath = path.resolve(__dirname, '..', t.name);
  try {
    const cmd = `"${chrome}" --headless --disable-gpu --window-size=${t.w},${t.h} --screenshot="${outPath}" "${url}"`;
    execSync(cmd);
    console.log(`Captured ${t.name}`);
  } catch (e) {
    console.error(`Error capturing ${t.name}:`, e.message);
  }
}
