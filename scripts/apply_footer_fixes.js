const fs = require('fs');

let content = fs.readFileSync('assets/generate_presentation.js', 'utf8');

// 1. Update .cover-bottom CSS
content = content.replace(
  /\.cover-bottom \{[\s\S]*?padding-top: 16px;[\s\S]*?z-index: 2;/,
  `.cover-bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid rgba(255,255,255,0.2);
      padding-top: 14px;
      padding-bottom: clamp(54px, 7vh, 76px); /* Clearance for floating HUD */
      z-index: 2;`
);

// 2. Update .cover-badge-course CSS
content = content.replace(
  /\.cover-badge-course \{[\s\S]*?backdrop-filter: blur\(10px\);[\s\S]*?\}/,
  `.cover-badge-course {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.3);
      padding: clamp(6px, 1vh, 8px) clamp(10px, 1.2vw, 18px);
      border-radius: 40px;
      font-size: clamp(9.5px, 0.78vw, 13px);
      font-weight: 600;
      letter-spacing: 0.6px;
      color: #E2E8F0;
      backdrop-filter: blur(10px);
      max-width: 100%;
      text-align: center;
    }`
);

// 3. Update all slide-footers to have footer-left, spacer, and footer-right
content = content.replace(
  /<footer class="slide-footer">\s*<span>([^<]+)<\/span>\s*<span>([^<]+)<\/span>\s*<\/footer>/g,
  `<footer class="slide-footer">
        <span class="footer-left">$1</span>
        <div class="footer-center-spacer"></div>
        <span class="footer-right">$2</span>
      </footer>`
);

fs.writeFileSync('assets/generate_presentation.js', content);
console.log('Successfully updated assets/generate_presentation.js');
