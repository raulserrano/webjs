const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve('assets/crop_logo.html');

const cmd = `"${chromePath}" --headless --disable-gpu --allow-file-access-from-files --virtual-time-budget=2500 --dump-dom "file:///${htmlPath.replace(/\\/g, '/')}"`;
const output = execSync(cmd, { maxBuffer: 20 * 1024 * 1024 }).toString();

const match1 = output.match(/data-logo-top="([^"]+)"/);
const match2 = output.match(/data-logo-banner="([^"]+)"/);
const match3 = output.match(/data-logo-icon="([^"]+)"/);

if (match1 && match1[1].startsWith('data:image/png;base64,')) {
  const b64 = match1[1].replace('data:image/png;base64,', '');
  fs.writeFileSync('assets/logo_top.png', Buffer.from(b64, 'base64'));
  console.log('Saved assets/logo_top.png');
}
if (match2 && match2[1].startsWith('data:image/png;base64,')) {
  const b64 = match2[1].replace('data:image/png;base64,', '');
  fs.writeFileSync('assets/logo_banner.png', Buffer.from(b64, 'base64'));
  console.log('Saved assets/logo_banner.png');
}
if (match3 && match3[1].startsWith('data:image/png;base64,')) {
  const b64 = match3[1].replace('data:image/png;base64,', '');
  fs.writeFileSync('assets/logo_icon.png', Buffer.from(b64, 'base64'));
  console.log('Saved assets/logo_icon.png');
}
