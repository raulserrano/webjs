const fs = require('fs');
const content = fs.readFileSync('assets/generate_presentation.js', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('<text') || line.includes('<tspan')) {
    const textOnly = line.replace(/<[^>]+>/g, '').trim();
    if (textOnly.length > 35) {
      console.log(`Line ${idx + 1} (len ${textOnly.length}): ${textOnly}`);
    }
  }
});
