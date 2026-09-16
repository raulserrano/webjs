const fs = require('fs');
const content = fs.readFileSync('assets/generate_presentation.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.indexOf('slide-footer') !== -1) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
