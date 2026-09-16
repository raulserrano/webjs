const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read extracted base64 images if available to embed directly into HTML
let logoTopB64 = '';
let logoBannerB64 = '';
let logoIconB64 = '';

if (fs.existsSync('assets/logo_top.png')) {
  logoTopB64 = 'data:image/png;base64,' + fs.readFileSync('assets/logo_top.png').toString('base64');
}
if (fs.existsSync('assets/logo_banner.png')) {
  logoBannerB64 = 'data:image/png;base64,' + fs.readFileSync('assets/logo_banner.png').toString('base64');
}
if (fs.existsSync('assets/logo_icon.png')) {
  logoIconB64 = 'data:image/png;base64,' + fs.readFileSync('assets/logo_icon.png').toString('base64');
}

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentación RA1 - CIFP Carlos III · Módulo 0612</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --brand: #364F59;
      --brand-dark: #1E2D33;
      --brand-deeper: #141F23;
      --brand-light: #4D6E7C;
      --brand-surface: #F0F4F6;
      --brand-surface-subtle: #F8FAFB;
      --brand-border: rgba(54, 79, 89, 0.18);
      --amber: #D97706;
      --amber-bg: #FEF3C7;
      --emerald: #0D9488;
      --emerald-bg: #CCFBF1;
      --cyan: #0284C7;
      --cyan-bg: #E0F2FE;
      --text-main: #1C272C;
      --text-muted: #536771;
      --white: #FFFFFF;
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    html, body {
      width: 100%;
      height: 100%;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--text-main);
      background-color: #0E1619;
      margin: 0;
      padding: 0;
    }

    /* DEFAULT: SLIDE-BY-SLIDE PRESENTATION MODE (FITS SCREEN WITHOUT OVERFLOW) */
    body.slide-mode {
      overflow: hidden;
    }

    body.slide-mode .deck-container {
      width: 100%;
      height: 100vh;
      overflow: hidden;
      position: relative;
    }

    body.slide-mode .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      opacity: 0;
      transition: opacity 0.25s ease;
      z-index: 1;
    }

    body.slide-mode .slide.active {
      display: flex;
      opacity: 1;
      z-index: 2;
    }

    /* CONTINUOUS SCROLL MODE (DOCUMENT VIEW) */
    body.continuous-mode {
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    body.continuous-mode .deck-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 0 110px 0;
      gap: 32px;
    }

    body.continuous-mode .slide {
      position: relative;
      display: flex !important;
      opacity: 1 !important;
      width: 95%;
      max-width: 1600px;
      min-height: 90vh;
      border-radius: var(--radius-md);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    }

    /* TOP PROGRESS BAR */
    .pres-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(90deg, #D97706 0%, #0D9488 50%, #38BDF8 100%);
      width: 10%;
      z-index: 9999;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* SLIDE CARD BASE */
    .slide {
      flex-direction: column;
      justify-content: space-between;
      background: var(--white);
      overflow: hidden;
      box-sizing: border-box;
    }

    /* SLIDE HEADER & FOOTER */
    .slide-header {
      height: clamp(52px, 6.5vh, 70px);
      padding: 0 clamp(16px, 3vw, 48px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1.5px solid var(--brand-border);
      background: var(--white);
      z-index: 10;
      flex-shrink: 0;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .header-logo-img {
      height: clamp(30px, 4vh, 42px);
      object-fit: contain;
    }

    .header-divider {
      width: 1.5px;
      height: 20px;
      background: var(--brand-border);
    }

    .header-tag {
      font-size: clamp(11.5px, 0.85vw, 13.5px);
      font-weight: 600;
      color: var(--brand-light);
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .topic-pill {
      background: var(--brand-surface);
      color: var(--brand);
      padding: 4px 12px;
      border-radius: 30px;
      font-size: clamp(10.5px, 0.8vw, 12.5px);
      font-weight: 700;
      border: 1px solid var(--brand-border);
      white-space: nowrap;
    }

    .slide-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(11.5px, 0.85vw, 13.5px);
      font-weight: 700;
      color: var(--brand);
      background: var(--brand-surface-subtle);
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid var(--brand-border);
      white-space: nowrap;
    }

    .slide-footer {
      height: clamp(38px, 5vh, 48px);
      padding: 0 clamp(16px, 3vw, 48px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--brand-border);
      background: var(--brand-surface-subtle);
      font-size: clamp(10.5px, 0.76vw, 12px);
      color: var(--text-muted);
      z-index: 10;
      flex-shrink: 0;
    }

    .footer-left {
      flex: 1;
      max-width: 30%;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .footer-center-spacer {
      width: clamp(260px, 38vw, 460px);
      flex-shrink: 0;
    }

    .footer-right {
      flex: 1;
      max-width: 30%;
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* SLIDE BODY LAYOUT (RESPONSIVE GRID) */
    .slide-body {
      flex: 1;
      padding: clamp(14px, 2vh, 28px) clamp(16px, 2.5vw, 48px);
      display: grid;
      grid-template-columns: 1fr 1.05fr;
      gap: clamp(16px, 2vw, 36px);
      align-items: center;
      position: relative;
      min-height: 0;
      overflow-y: auto;
    }

    /* TYPOGRAPHY */
    .title-kicker {
      display: inline-block;
      font-size: clamp(10.5px, 0.75vw, 12px);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--amber);
      margin-bottom: 4px;
    }

    .slide-title {
      font-size: clamp(20px, 1.8vw, 30px);
      font-weight: 800;
      line-height: 1.18;
      color: var(--brand-dark);
      margin-bottom: clamp(10px, 1.4vh, 16px);
      letter-spacing: -0.4px;
    }

    .content-cards-column {
      display: flex;
      flex-direction: column;
      gap: clamp(10px, 1.2vh, 14px);
      justify-content: center;
      min-height: 0;
    }

    .card {
      background: var(--brand-surface-subtle);
      border: 1.5px solid var(--brand-border);
      border-radius: var(--radius-md);
      padding: clamp(10px, 1.3vh, 16px) clamp(12px, 1.4vw, 20px);
      box-shadow: 0 2px 8px rgba(54, 79, 89, 0.03);
    }

    .card-title {
      font-size: clamp(13.5px, 0.95vw, 16px);
      font-weight: 700;
      color: var(--brand);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card p, .card ul {
      font-size: clamp(12px, 0.82vw, 14px);
      line-height: 1.45;
      color: var(--text-main);
    }

    .card ul {
      padding-left: 18px;
    }

    .card li {
      margin-bottom: 3px;
    }

    .callout-box {
      background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
      border: 1.5px solid #F59E0B;
      border-left: 5px solid #D97706;
      border-radius: var(--radius-sm);
      padding: clamp(9px, 1.1vh, 13px) clamp(12px, 1.2vw, 16px);
      font-size: clamp(11.5px, 0.78vw, 13px);
      line-height: 1.42;
      color: #92400E;
    }

    .callout-box strong {
      color: #78350F;
    }

    /* RIGHT COLUMN - VISUAL ILLUSTRATION CONTAINER */
    .illustration-column {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: var(--brand-surface-subtle);
      border: 1.5px solid var(--brand-border);
      border-radius: var(--radius-lg);
      padding: clamp(10px, 1.2vh, 18px);
      position: relative;
      box-shadow: 0 4px 16px rgba(54, 79, 89, 0.04);
      height: 100%;
      max-height: clamp(360px, 68vh, 580px);
      min-height: 0;
      overflow: hidden;
    }

    .illustration-column svg {
      width: 100%;
      height: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    /* COVER SLIDE SPECIAL STYLES */
    .cover-slide {
      background: linear-gradient(135deg, var(--brand-deeper) 0%, var(--brand) 100%) !important;
      color: var(--white);
      padding: clamp(24px, 4vh, 60px) clamp(24px, 4vw, 80px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    .cover-slide::before {
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      background: radial-gradient(circle at 85% 20%, rgba(255,255,255,0.08) 0%, transparent 60%);
      pointer-events: none;
    }

    .cover-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
      flex-wrap: wrap;
      gap: 16px;
    }

    .cover-logo-container {
      background: var(--white);
      padding: 10px 18px;
      border-radius: var(--radius-md);
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cover-logo-img {
      height: clamp(38px, 5vh, 56px);
      object-fit: contain;
    }

    .cover-badge-course {
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
    }

    .cover-center {
      margin: auto 0;
      padding: clamp(12px, 2vh, 28px) 0;
      z-index: 2;
      max-width: 1200px;
    }

    .cover-kicker {
      display: inline-block;
      font-size: clamp(11.5px, 0.85vw, 14px);
      font-weight: 700;
      color: #FBBF24;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 10px;
      background: rgba(217, 119, 6, 0.25);
      padding: 5px 14px;
      border-radius: 20px;
      border: 1px solid rgba(251, 191, 36, 0.4);
    }

    .cover-title {
      font-size: clamp(26px, 3.2vw, 46px);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.6px;
      margin-bottom: 14px;
      text-shadow: 0 4px 16px rgba(0,0,0,0.3);
    }

    .cover-desc {
      font-size: clamp(14px, 1.15vw, 18px);
      line-height: 1.5;
      font-weight: 300;
      color: #D1DCE2;
      max-width: 950px;
      margin-bottom: 20px;
    }

    .cover-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .cover-tag {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #FFFFFF;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: clamp(11px, 0.8vw, 13px);
      font-weight: 500;
    }

    .cover-bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid rgba(255,255,255,0.2);
      padding-top: 14px;
      padding-bottom: clamp(54px, 7vh, 76px); /* Clearance for floating HUD */
      z-index: 2;
      flex-wrap: wrap;
      gap: 12px;
    }

    .cover-footer-left {
      font-size: clamp(11.5px, 0.82vw, 13.5px);
      color: #BDCBD2;
      line-height: 1.45;
    }

    .cover-footer-left strong {
      color: #FFFFFF;
    }

    .cover-footer-right {
      font-size: clamp(11px, 0.8vw, 13px);
      color: #94A3B8;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
    }

    /* AGENDA SLIDE STYLES (COMPACT RESPONSIVE) */
    .agenda-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: clamp(10px, 1.2vw, 16px);
      width: 100%;
      margin-top: 6px;
    }

    .agenda-card {
      background: var(--brand-surface-subtle);
      border: 1.5px solid var(--brand-border);
      border-radius: var(--radius-md);
      padding: clamp(10px, 1.4vh, 16px) clamp(12px, 1.2vw, 16px);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      box-shadow: 0 2px 8px rgba(54, 79, 89, 0.03);
    }

    .agenda-card-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(18px, 1.4vw, 22px);
      font-weight: 800;
      color: var(--brand);
      margin-bottom: 4px;
    }

    .agenda-card-title {
      font-size: clamp(13px, 0.95vw, 15px);
      font-weight: 700;
      color: var(--brand-dark);
      line-height: 1.3;
      margin-bottom: 4px;
    }

    .agenda-card-desc {
      font-size: clamp(11px, 0.78vw, 12.5px);
      color: var(--text-muted);
      line-height: 1.4;
    }

    /* CODE CHIP */
    .code-chip {
      font-family: 'JetBrains Mono', monospace;
      background: #1E293B;
      color: #38BDF8;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 11.5px;
      white-space: nowrap;
    }

    /* ========================================================================= */
    /* FLOATING CLASSROOM PRESENTATION HUD (CONTROL BAR)                         */
    /* ========================================================================= */
    .pres-hud {
      position: fixed;
      bottom: 46px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(26, 38, 43, 0.94);
      border: 1px solid rgba(255, 255, 255, 0.22);
      backdrop-filter: blur(14px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55);
      border-radius: 50px;
      padding: 6px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 10000;
      color: #FFFFFF;
      user-select: none;
      transition: all 0.2s ease;
    }

    .hud-btn {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #FFFFFF;
      font-family: 'Outfit', sans-serif;
      font-size: 12.5px;
      font-weight: 600;
      padding: 6px 13px;
      border-radius: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .hud-btn:hover {
      background: var(--brand-light);
      border-color: #FFFFFF;
      transform: translateY(-1px);
    }

    .hud-btn:active {
      transform: translateY(0);
    }

    .hud-select {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #FFFFFF;
      font-family: 'Outfit', sans-serif;
      font-size: 12px;
      font-weight: 500;
      padding: 5px 10px;
      border-radius: 20px;
      outline: none;
      cursor: pointer;
      max-width: 230px;
    }

    .hud-select option {
      background: #1E2D33;
      color: #FFFFFF;
    }

    .hud-info {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12.5px;
      font-weight: 700;
      color: #FBBF24;
      padding: 0 4px;
      white-space: nowrap;
    }

    /* ========================================================================= */
    /* RESPONSIVE BREAKPOINTS (TABLETS, LAPTOPS, MOBILES)                       */
    /* ========================================================================= */
    @media (max-width: 1100px) {
      .agenda-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .slide-body {
        grid-template-columns: 1fr;
        padding: 16px 20px;
        gap: 20px;
      }
      .illustration-column {
        max-height: 420px;
      }
      .hud-select {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .agenda-grid {
        grid-template-columns: 1fr;
      }
      .slide-header {
        padding: 0 14px;
      }
      .header-tag {
        display: none;
      }
      .slide-footer {
        font-size: 10.5px;
        padding: 0 12px;
      }
      .pres-hud {
        padding: 5px 10px;
        gap: 6px;
        bottom: 8px;
      }
      .hud-btn span {
        display: none;
      }
    }

    /* Short screen height adjustments (laptops 1366x768 or 1536x695) */
    @media (max-height: 720px) {
      .slide-header {
        height: 50px;
      }
      .slide-footer {
        height: 34px;
      }
      .slide-body {
        padding: 10px 24px;
        gap: 16px;
      }
      .slide-title {
        font-size: 20px;
        margin-bottom: 8px;
      }
      .card {
        padding: 8px 12px;
      }
      .card p {
        font-size: 12px;
      }
      .callout-box {
        padding: 6px 10px;
        font-size: 11.5px;
      }
      .illustration-column {
        max-height: 400px;
      }
    }

    /* ========================================================================= */
    /* PRINT MEDIA QUERY FOR PIXEL-PERFECT PDF GENERATION                        */
    /* ========================================================================= */
    @media print {
      @page {
        size: 1920px 1080px;
        margin: 0;
      }

      html, body {
        width: 1920px !important;
        height: auto !important;
        background: #FFFFFF !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
      }

      .pres-progress-bar, .pres-hud {
        display: none !important;
      }

      .deck-container {
        padding: 0 !important;
        height: auto !important;
        display: block !important;
      }

      .slide {
        position: relative !important;
        display: flex !important;
        opacity: 1 !important;
        width: 1920px !important;
        height: 1080px !important;
        min-height: 1080px !important;
        max-height: 1080px !important;
        page-break-after: always !important;
        page-break-inside: avoid !important;
        border-bottom: none !important;
        box-shadow: none !important;
        margin: 0 !important;
      }

      .slide-body {
        display: grid !important;
        grid-template-columns: 1fr 1.05fr !important;
        gap: 44px !important;
        padding: 30px 60px !important;
        overflow: visible !important;
      }

      .illustration-column {
        max-height: 620px !important;
      }

      .agenda-grid {
        grid-template-columns: repeat(4, 1fr) !important;
      }
    }
  </style>
</head>
<body class="slide-mode">

  <!-- TOP PROGRESS BAR -->
  <div class="pres-progress-bar" id="progressBar"></div>

  <!-- FLOATING HUD BAR -->
  <div class="pres-hud" id="presHud">
    <button class="hud-btn" id="btnPrev" title="Diapositiva Anterior (Tecla Flecha Izquierda)">
      ◀ <span>Anterior</span>
    </button>
    <div class="hud-info" id="hudCounter">01 / 10</div>
    <button class="hud-btn" id="btnNext" title="Diapositiva Siguiente (Tecla Flecha Derecha o Espacio)">
      <span>Siguiente</span> ▶
    </button>
    
    <select class="hud-select" id="slidePicker" title="Saltar a diapositiva">
      <option value="0">01. Portada Institucional</option>
      <option value="1">02. Índice / Hoja de Ruta</option>
      <option value="2">03. Cliente/Servidor y SPAs</option>
      <option value="3">04. Motor V8 y JIT</option>
      <option value="4">05. Asincronía y Event Loop</option>
      <option value="5">06. JS, TypeScript y Wasm</option>
      <option value="6">07. Sandbox y Same-Origin</option>
      <option value="7">08. Carga HTML y Módulos</option>
      <option value="8">09. DevTools y Lighthouse</option>
      <option value="9">10. Conclusiones y Examen</option>
    </select>

    <button class="hud-btn" id="btnToggleMode" title="Alternar entre modo Diapositivas y Lista Continua (M)">
      📽️ <span>Modo</span>
    </button>

    <button class="hud-btn" id="btnFullscreen" title="Alternar Pantalla Completa (F)">
      ⛶ <span>Completa</span>
    </button>

    <a href="../Presentacion_RA1_CIFP_Carlos_III.pdf" download class="hud-btn" style="text-decoration:none;" title="Descargar la presentación completa en archivo PDF">
      📥 <span>PDF</span>
    </a>
  </div>

  <div class="deck-container" id="deckContainer">

    <!-- ===================================================================== -->
    <!-- SLIDE 1: PORTADA INSTITUCIONAL                                        -->
    <!-- ===================================================================== -->
    <section class="slide cover-slide active" id="slide-0">
      <div class="cover-top-bar">
        <div class="cover-logo-container">
          <img src="${logoTopB64}" class="cover-logo-img" alt="CIFP Carlos III">
          <div style="display:flex; flex-direction:column; justify-content:center; border-left: 2px solid var(--brand-border); padding-left: 12px; margin-left: 4px;">
            <span style="font-weight: 800; font-size: clamp(15px, 1.3vw, 19px); color: var(--brand); letter-spacing: 0.5px;">CIFP CARLOS III</span>
            <span style="font-size: clamp(9.5px, 0.75vw, 11px); font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px;">Centro Integrado de Formación Profesional</span>
            <span style="font-size: clamp(9px, 0.7vw, 10.5px); color: var(--brand-light); font-weight: 500;">Cartagena · Región de Murcia</span>
          </div>
        </div>
        <div class="cover-badge-course">
          FP GRADO SUPERIOR · DESARROLLO DE APLICACIONES WEB (DAW)
        </div>
      </div>

      <div class="cover-center">
        <div class="cover-kicker">MÓDULO PROFESIONAL 0612 · ENTORNO CLIENTE</div>
        <h1 class="cover-title">Arquitecturas y Tecnologías de Programación sobre Clientes Web</h1>
        <p class="cover-desc">
          Guía didáctica y conceptual completa del Resultado de Aprendizaje 1 (RA1). Análisis accesible de modelos cliente/servidor, motores del navegador, Event Loop, TypeScript, WebAssembly, Sandbox y herramientas de auditoría web.
        </p>

        <div class="cover-tags">
          <span class="cover-tag">⚡ Criterios Oficiales a) al f)</span>
          <span class="cover-tag">🌐 Arquitectura Cliente / Servidor</span>
          <span class="cover-tag">🚀 Motor V8 y Compilación JIT</span>
          <span class="cover-tag">🔄 Event Loop y Asincronía</span>
          <span class="cover-tag">🛡️ Seguridad Sandbox & SOP</span>
          <span class="cover-tag">📊 Auditorías con Google Lighthouse</span>
        </div>
      </div>

      <div class="cover-bottom">
        <div class="cover-footer-left">
          <strong>Centro Integrado de Formación Profesional Carlos III</strong> · Departamento de Informática y Comunicaciones<br>
          Cartagena, Región de Murcia
        </div>
        <div class="cover-footer-right">
          CURSO LECTIVO · 10 HORAS RA1
        </div>
      </div>
    </section>

    <!-- ===================================================================== -->
    <!-- SLIDE 2: ÍNDICE GENERAL / HOJA DE RUTA                                -->
    <!-- ===================================================================== -->
    <section class="slide" id="slide-1">
      <header class="slide-header">
        <div class="header-left">
          <img src="${logoTopB64}" class="header-logo-img" alt="CIFP Carlos III">
          <div class="header-divider"></div>
          <span class="header-tag">Módulo 0612: DWEC · FP DAW</span>
        </div>
        <div class="header-right">
          <span class="topic-pill">HOJA DE RUTA DIDÁCTICA</span>
          <span class="slide-num">02 / 10</span>
        </div>
      </header>

      <div class="slide-body" style="grid-template-columns: 1fr; align-items: flex-start;">
        <div>
          <span class="title-kicker">RESULTADO DE APRENDIZAJE 1 (RA1)</span>
          <h2 class="slide-title" style="margin-bottom: 12px;">Los 7 Pilares de la Programación en Cliente Web</h2>
        </div>

        <div class="agenda-grid">
          <div class="agenda-card">
            <div class="agenda-card-num">01</div>
            <div class="agenda-card-title">Cliente/Servidor y SPAs</div>
            <div class="agenda-card-desc">Reparto de tareas entre navegador y backend, y evolución a aplicaciones de una sola página.</div>
          </div>

          <div class="agenda-card">
            <div class="agenda-card-num">02</div>
            <div class="agenda-card-title">Anatomía y Motor V8</div>
            <div class="agenda-card-desc">Motores visuales vs motores JS y compilación en tiempo real (JIT) para máxima velocidad.</div>
          </div>

          <div class="agenda-card">
            <div class="agenda-card-num">03</div>
            <div class="agenda-card-title">Asincronía y Event Loop</div>
            <div class="agenda-card-desc">El modelo monohilo de JS, ayuda del navegador (Web APIs) y coordinación de tareas.</div>
          </div>

          <div class="agenda-card">
            <div class="agenda-card-num">04</div>
            <div class="agenda-card-title">JS, TypeScript y Wasm</div>
            <div class="agenda-card-desc">El estándar universal (JS), tipado estático previo (TS) y cómputo binario potente (Wasm).</div>
          </div>

          <div class="agenda-card">
            <div class="agenda-card-num">05</div>
            <div class="agenda-card-title">Sandbox y Mismo Origen</div>
            <div class="agenda-card-desc">El aislamiento de seguridad para proteger tu disco duro y las reglas SOP / CORS.</div>
          </div>

          <div class="agenda-card">
            <div class="agenda-card-num">06</div>
            <div class="agenda-card-title">Carga HTML y Módulos ES6</div>
            <div class="agenda-card-desc">Scripts síncronos vs async vs defer, y organización modular nativa moderna.</div>
          </div>

          <div class="agenda-card" style="grid-column: span 2;">
            <div class="agenda-card-num">07</div>
            <div class="agenda-card-title">DevTools y Google Lighthouse</div>
            <div class="agenda-card-desc">Pestañas clave de depuración (Elements, Console, Sources) y el boletín de notas de 0 a 100 con Lighthouse.</div>
          </div>
        </div>
      </div>

      <footer class="slide-footer">
        <span class="footer-left">CIFP Carlos III · Departamento de Informática</span>
        <div class="footer-center-spacer"></div>
        <span class="footer-right">RA1: Criterios oficiales a) al f)</span>
      </footer>
    </section>

    <!-- ===================================================================== -->
    <!-- SLIDE 3: APARTADO 1 - CLIENTE / SERVIDOR Y SPAs                       -->
    <!-- ===================================================================== -->
    <section class="slide" id="slide-2">
      <header class="slide-header">
        <div class="header-left">
          <img src="${logoTopB64}" class="header-logo-img" alt="CIFP Carlos III">
          <div class="header-divider"></div>
          <span class="header-tag">Módulo 0612: DWEC · FP DAW</span>
        </div>
        <div class="header-right">
          <span class="topic-pill">APARTADO 1 · CRITERIO A</span>
          <span class="slide-num">03 / 10</span>
        </div>
      </header>

      <div class="slide-body">
        <div class="content-cards-column">
          <div>
            <span class="title-kicker">MODELOS DE ARQUITECTURA WEB</span>
            <h2 class="slide-title">Comunicación Cliente/Servidor y SPAs</h2>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">🛡️</span>
              El Servidor (Backend): La Caja Fuerte
            </div>
            <p>
              Almacena y gestiona la base de datos de forma segura. <strong>Es el único entorno donde se garantiza la seguridad definitiva</strong> y las reglas de negocio privadas. Nadie desde fuera puede ver ni alterar su código.
            </p>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">⚡</span>
              El Cliente (Frontend): Rapidez y Experiencia
            </div>
            <p>
              Se ejecuta en el ordenador o móvil del usuario. Dibuja los botones y pantallas, y <strong>valida formularios al instante sin latencia de red</strong> para dar feedback inmediato al usuario.
            </p>
          </div>

          <div class="callout-box">
            <strong>Pregunta Clásica de Examen:</strong> ¿Por qué validar en el cliente si es obligatorio validar en el servidor?
            <em>Validar en el cliente ofrece una experiencia rápida (UX), pero nunca sustituye la seguridad obligatoria del backend, ya que el código del navegador puede ser modificado por cualquier usuario.</em>
          </div>
        </div>

        <div class="illustration-column">
          <!-- SVG VECTOR DIAGRAM: CLIENTE / SERVIDOR & SPA -->
          <svg viewBox="0 0 760 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="620" rx="16" fill="#FFFFFF"/>
            
            <!-- Box Cliente -->
            <g id="box-cliente">
              <rect x="40" y="50" width="280" height="230" rx="12" fill="#F0F4F6" stroke="#364F59" stroke-width="2"/>
              <rect x="40" y="50" width="280" height="42" rx="12" fill="#364F59"/>
              <text x="60" y="77" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="16">NAVEGADOR CLIENTE (Frontend)</text>
              
              <circle cx="65" cy="120" r="10" fill="#0D9488"/>
              <text x="85" y="125" fill="#1E2D33" font-family="Outfit" font-weight="600" font-size="14">Cómputo en RAM/CPU local</text>
              
              <circle cx="65" cy="155" r="10" fill="#0D9488"/>
              <text x="85" y="160" fill="#1E2D33" font-family="Outfit" font-weight="600" font-size="14">Validación instantánea UX</text>
              
              <circle cx="65" cy="190" r="10" fill="#D97706"/>
              <text x="85" y="195" fill="#1E2D33" font-family="Outfit" font-weight="600" font-size="14">Entorno no confiable (expuesto)</text>

              <rect x="60" y="225" width="240" height="34" rx="6" fill="#E2E8F0"/>
              <text x="80" y="247" fill="#364F59" font-family="JetBrains Mono" font-size="12" font-weight="600">JavaScript / DOM / CSS</text>
            </g>

            <!-- Box Servidor -->
            <g id="box-servidor">
              <rect x="440" y="50" width="280" height="230" rx="12" fill="#F0F4F6" stroke="#364F59" stroke-width="2"/>
              <rect x="440" y="50" width="280" height="42" rx="12" fill="#364F59"/>
              <text x="460" y="77" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="16">SERVIDOR BACKEND (Host)</text>
              
              <circle cx="465" cy="120" r="10" fill="#0D9488"/>
              <text x="485" y="125" fill="#1E2D33" font-family="Outfit" font-weight="600" font-size="14">Seguridad 100% garantizada</text>
              
              <circle cx="465" cy="155" r="10" fill="#0D9488"/>
              <text x="485" y="160" fill="#1E2D33" font-family="Outfit" font-weight="600" font-size="14">Custodia de Base de Datos</text>
              
              <circle cx="465" cy="190" r="10" fill="#D97706"/>
              <text x="485" y="195" fill="#1E2D33" font-family="Outfit" font-weight="600" font-size="14">Latencia de Red (RTT)</text>

              <rect x="460" y="225" width="240" height="34" rx="6" fill="#E2E8F0"/>
              <text x="480" y="247" fill="#364F59" font-family="JetBrains Mono" font-size="12" font-weight="600">API REST / Node / SQL</text>
            </g>

            <!-- Arrows Communication -->
            <path d="M320 120 L440 120" stroke="#364F59" stroke-width="3" stroke-dasharray="6 6"/>
            <polygon points="435,115 445,120 435,125" fill="#364F59"/>
            <rect x="345" y="100" width="70" height="20" rx="4" fill="#364F59"/>
            <text x="352" y="114" fill="#FFFFFF" font-family="JetBrains Mono" font-size="10" font-weight="600">Petición</text>

            <path d="M440 190 L320 190" stroke="#0D9488" stroke-width="3"/>
            <polygon points="325,185 315,190 325,195" fill="#0D9488"/>
            <rect x="340" y="170" width="80" height="20" rx="4" fill="#0D9488"/>
            <text x="348" y="184" fill="#FFFFFF" font-family="JetBrains Mono" font-size="10" font-weight="600">Datos JSON</text>

            <!-- Bottom Section: SPA vs Traditional -->
            <g id="comparativa-spa" transform="translate(0, 310)">
              <rect x="40" y="20" width="680" height="260" rx="12" fill="#F8FAFB" stroke="#E2E8F0" stroke-width="1.5"/>
              <text x="60" y="55" fill="#364F59" font-family="Outfit" font-weight="800" font-size="18">EVOLUCIÓN ARQUITECTÓNICA: TRADICIONAL VS SPA</text>
              
              <!-- Traditional -->
              <rect x="60" y="75" width="310" height="180" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
              <text x="80" y="105" fill="#991B1B" font-family="Outfit" font-weight="700" font-size="15">1. Web Clásica (Multi-Page)</text>
              <text x="80" y="132" fill="#536771" font-family="Outfit" font-size="13">• Cada clic descarga una página completa.</text>
              <text x="80" y="156" fill="#536771" font-family="Outfit" font-size="13">• Pantallazos en blanco en transiciones.</text>
              <text x="80" y="180" fill="#536771" font-family="Outfit" font-size="13">• Alto tráfico redundante de HTML/CSS.</text>
              <rect x="80" y="205" width="270" height="28" rx="6" fill="#FEE2E2"/>
              <text x="95" y="224" fill="#991B1B" font-family="Outfit" font-weight="600" font-size="12">⚠️ Recargas completas del navegador</text>

              <!-- Modern SPA -->
              <rect x="390" y="75" width="310" height="180" rx="10" fill="#FFFFFF" stroke="#0D9488" stroke-width="1.5"/>
              <text x="410" y="105" fill="#0D9488" font-family="Outfit" font-weight="700" font-size="15">2. Single-Page Applications (SPA)</text>
              <text x="410" y="132" fill="#536771" font-family="Outfit" font-size="13">• Carga un único cascarón inicial.</text>
              <text x="410" y="156" fill="#536771" font-family="Outfit" font-size="13">• Navegación fluida sin recargar pantalla.</text>
              <text x="410" y="180" fill="#536771" font-family="Outfit" font-size="13">• Solo intercambia datos puros (JSON).</text>
              <rect x="410" y="205" width="270" height="28" rx="6" fill="#CCFBF1"/>
              <text x="425" y="224" fill="#0D9488" font-family="Outfit" font-weight="600" font-size="12">✓ Experiencia fluida tipo aplicación</text>
            </g>
          </svg>
        </div>
      </div>

      <footer class="slide-footer">
        <span class="footer-left">CIFP Carlos III · Departamento de Informática</span>
        <div class="footer-center-spacer"></div>
        <span class="footer-right">RA1: Criterio a) Modelos de ejecución cliente/servidor</span>
      </footer>
    </section>

    <!-- ===================================================================== -->
    <!-- SLIDE 4: APARTADO 2 - ANATOMÍA DEL NAVEGADOR Y MOTOR V8 (JIT)        -->
    <!-- ===================================================================== -->
    <section class="slide" id="slide-3">
      <header class="slide-header">
        <div class="header-left">
          <img src="${logoTopB64}" class="header-logo-img" alt="CIFP Carlos III">
          <div class="header-divider"></div>
          <span class="header-tag">Módulo 0612: DWEC · FP DAW</span>
        </div>
        <div class="header-right">
          <span class="topic-pill">APARTADO 2 · CRITERIO B</span>
          <span class="slide-num">04 / 10</span>
        </div>
      </header>

      <div class="slide-body">
        <div class="content-cards-column">
          <div>
            <span class="title-kicker">ARQUITECTURA DEL NAVEGADOR</span>
            <h2 class="slide-title">Motores del Navegador y Compilación JIT</h2>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">🎨</span>
              Motor de Renderizado vs Motor JavaScript
            </div>
            <p>
              El navegador tiene dos mitades trabajando en equipo:<br>
              • <strong>Motor de Renderizado</strong> (Blink, Gecko, WebKit): Lee HTML y CSS para dibujar los píxeles y calcular el diseño.<br>
              • <strong>Motor de JavaScript</strong> (V8, SpiderMonkey, Nitro): Ejecuta la lógica del código.
            </p>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">🚀</span>
              Compilación en Tiempo Real (JIT - Just-In-Time)
            </div>
            <p>
              Para no ser lento, el motor <strong>V8</strong> no interpreta línea por línea: empieza a ejecutar de inmediato y compila directamente a <strong>código máquina ultrarrápido</strong> aquellas funciones que se llaman con frecuencia.
            </p>
          </div>

          <div class="callout-box">
            <strong>Consejo Práctico:</strong> Escribe código predecible y ordenado. Si una función espera números, no le pases textos mezclados; así el motor JIT puede mantener tu código a máxima velocidad.
          </div>
        </div>

        <div class="illustration-column">
          <!-- SVG VECTOR DIAGRAM: BROWSER ANATOMY & JIT PIPELINE (ALL TEXT WRAPPED) -->
          <svg viewBox="0 0 760 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="620" rx="16" fill="#FFFFFF"/>

            <!-- Top: Browser Engines Matrix -->
            <g id="motores-matrix">
              <rect x="40" y="25" width="680" height="180" rx="12" fill="#F0F4F6" stroke="#364F59" stroke-width="1.5"/>
              <text x="60" y="55" fill="#364F59" font-family="Outfit" font-weight="800" font-size="16">LOS GRANDES NAVEGADORES Y SUS MOTORES</text>
              
              <!-- Chrome / Edge -->
              <rect x="60" y="70" width="200" height="115" rx="8" fill="#FFFFFF" stroke="#CBD5E1"/>
              <text x="75" y="96" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="14">Chrome / Edge</text>
              <text x="75" y="122" fill="#536771" font-family="Outfit" font-size="12">Render: <tspan fill="#0284C7" font-weight="700">Blink</tspan></text>
              <text x="75" y="145" fill="#536771" font-family="Outfit" font-size="12">Motor JS: <tspan fill="#D97706" font-weight="700">V8 (Google)</tspan></text>
              <text x="75" y="168" fill="#0D9488" font-family="JetBrains Mono" font-size="11">Usado en Node.js</text>

              <!-- Firefox -->
              <rect x="280" y="70" width="200" height="115" rx="8" fill="#FFFFFF" stroke="#CBD5E1"/>
              <text x="295" y="96" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="14">Mozilla Firefox</text>
              <text x="295" y="122" fill="#536771" font-family="Outfit" font-size="12">Render: <tspan fill="#0284C7" font-weight="700">Gecko</tspan></text>
              <text x="295" y="145" fill="#536771" font-family="Outfit" font-size="12">Motor JS: <tspan fill="#D97706" font-weight="700">SpiderMonkey</tspan></text>
              <text x="295" y="168" fill="#0D9488" font-family="JetBrains Mono" font-size="11">1er motor histórico</text>

              <!-- Safari -->
              <rect x="500" y="70" width="200" height="115" rx="8" fill="#FFFFFF" stroke="#CBD5E1"/>
              <text x="515" y="96" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="14">Apple Safari</text>
              <text x="515" y="122" fill="#536771" font-family="Outfit" font-size="12">Render: <tspan fill="#0284C7" font-weight="700">WebKit</tspan></text>
              <text x="515" y="145" fill="#536771" font-family="Outfit" font-size="12">Motor JS: <tspan fill="#D97706" font-weight="700">Nitro (JSC)</tspan></text>
              <text x="515" y="168" fill="#0D9488" font-family="JetBrains Mono" font-size="11">iOS, iPadOS, Mac</text>
            </g>

            <!-- Bottom: JIT Pipeline Simplified -->
            <g id="jit-pipeline" transform="translate(0, 225)">
              <rect x="40" y="20" width="680" height="350" rx="12" fill="#F8FAFB" stroke="#364F59" stroke-width="1.5"/>
              <text x="60" y="52" fill="#364F59" font-family="Outfit" font-weight="800" font-size="16">EL PIPELINE JIT DE V8: DE TEXTO A CÓDIGO MÁQUINA</text>

              <!-- Step 1 -->
              <rect x="65" y="80" width="130" height="130" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
              <circle cx="90" cy="105" r="13" fill="#364F59"/>
              <text x="86" y="110" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="12">1</text>
              <text x="75" y="138" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="13">Código JS</text>
              <text x="75" y="160" fill="#536771" font-family="Outfit" font-size="11.5">
                <tspan x="75" dy="0">Texto plano</tspan>
                <tspan x="75" dy="16">archivo .js</tspan>
              </text>

              <path d="M195 145 L225 145" stroke="#364F59" stroke-width="3"/>
              <polygon points="225,141 233,145 225,149" fill="#364F59"/>

              <!-- Step 2 -->
              <rect x="235" y="80" width="140" height="130" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
              <circle cx="260" cy="105" r="13" fill="#0284C7"/>
              <text x="256" y="110" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="12">2</text>
              <text x="245" y="138" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="13">Ignition</text>
              <text x="245" y="160" fill="#536771" font-family="Outfit" font-size="11.5">
                <tspan x="245" dy="0">Intérprete rápido</tspan>
                <tspan x="245" dy="16">sin esperas</tspan>
              </text>

              <path d="M375 145 L405 145" stroke="#364F59" stroke-width="3"/>
              <polygon points="405,141 413,145 405,149" fill="#364F59"/>

              <!-- Step 3 -->
              <rect x="415" y="80" width="140" height="130" rx="10" fill="#FFFFFF" stroke="#D97706" stroke-width="2"/>
              <circle cx="440" cy="105" r="13" fill="#D97706"/>
              <text x="436" y="110" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="12">3</text>
              <text x="425" y="138" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="13">Perfilado</text>
              <text x="425" y="160" fill="#536771" font-family="Outfit" font-size="11.5">
                <tspan x="425" dy="0">Detecta código</tspan>
                <tspan x="425" dy="16">repetido ("hot")</tspan>
              </text>

              <path d="M555 145 L585 145" stroke="#364F59" stroke-width="3"/>
              <polygon points="585,141 593,145 585,149" fill="#364F59"/>

              <!-- Step 4 -->
              <rect x="595" y="80" width="115" height="130" rx="10" fill="#CCFBF1" stroke="#0D9488" stroke-width="2"/>
              <circle cx="620" cy="105" r="13" fill="#0D9488"/>
              <text x="616" y="110" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="12">4</text>
              <text x="605" y="138" fill="#0F766E" font-family="Outfit" font-weight="700" font-size="13">TurboFan</text>
              <text x="605" y="160" fill="#0F766E" font-family="Outfit" font-size="11.5">
                <tspan x="605" dy="0">Código máquina</tspan>
                <tspan x="605" dy="16">optimizado</tspan>
              </text>

              <!-- Bottom summary banner with WRAPPED tspans -->
              <rect x="65" y="235" width="645" height="90" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
              <text x="85" y="262" fill="#364F59" font-family="Outfit" font-weight="700" font-size="14">¿Por qué es revolucionario el compilador JIT?</text>
              <text x="85" y="286" fill="#536771" font-family="Outfit" font-size="12.5">
                <tspan x="85" dy="0">Permite que aplicaciones web complejas (Google Maps, hojas de cálculo, juegos)</tspan>
                <tspan x="85" dy="20">se ejecuten a velocidad nativa en la CPU sin obligar al usuario a instalar nada.</tspan>
              </text>
            </g>
          </svg>
        </div>
      </div>

      <footer class="slide-footer">
        <span class="footer-left">CIFP Carlos III · Departamento de Informática</span>
        <div class="footer-center-spacer"></div>
        <span class="footer-right">RA1: Criterio b) Capacidades de navegadores y motores de ejecución</span>
      </footer>
    </section>

    <!-- ===================================================================== -->
    <!-- SLIDE 5: APARTADO 3 - ASINCRONÍA Y EL EVENT LOOP                     -->
    <!-- ===================================================================== -->
    <section class="slide" id="slide-4">
      <header class="slide-header">
        <div class="header-left">
          <img src="${logoTopB64}" class="header-logo-img" alt="CIFP Carlos III">
          <div class="header-divider"></div>
          <span class="header-tag">Módulo 0612: DWEC · FP DAW</span>
        </div>
        <div class="header-right">
          <span class="topic-pill">APARTADO 3 · CRITERIO B</span>
          <span class="slide-num">05 / 10</span>
        </div>
      </header>

      <div class="slide-body">
        <div class="content-cards-column">
          <div>
            <span class="title-kicker">CONCURRENCIA EN JAVASCRIPT</span>
            <h2 class="slide-title">Asincronía y el Event Loop</h2>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">🍳</span>
              La Analogía del Cocinero Monohilo
            </div>
            <p>
              JavaScript es <strong>Single-Thread</strong> (un solo hilo): es como un cocinero con una única sartén. Si se quedara esperando 10 minutos a que hierva el agua, la cocina entera se congelaría.<br>
              <strong>Solución:</strong> Delega las esperas en el navegador (Web APIs).
            </p>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">🔄</span>
              El Event Loop: El Coordinador de Tareas
            </div>
            <p>
              El <strong>Event Loop</strong> vigila continuamente: en cuanto el código principal termina y la sartén queda libre, toma la siguiente tarea lista de la cola de espera (ej: datos de internet o temporizador cumplido) y se la entrega a JavaScript.
            </p>
          </div>

          <div class="callout-box">
            <strong>Pregunta Estrella de Exámenes FP:</strong> ¿Por qué un <span class="code-chip">setTimeout(fn, 0)</span> no sale el primero?
            <em>Porque pasa a la cola de espera del navegador, y el Event Loop espera a que todo el código principal termine antes de dejarlo pasar.</em>
          </div>
        </div>

        <div class="illustration-column">
          <!-- SVG VECTOR DIAGRAM: EVENT LOOP ARCHITECTURE -->
          <svg viewBox="0 0 760 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="620" rx="16" fill="#FFFFFF"/>

            <!-- Call Stack Box (Left) -->
            <g id="call-stack">
              <rect x="40" y="35" width="200" height="320" rx="12" fill="#F0F4F6" stroke="#364F59" stroke-width="2"/>
              <rect x="40" y="35" width="200" height="42" rx="12" fill="#364F59"/>
              <text x="55" y="62" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="15">CALL STACK (Pila)</text>
              <text x="55" y="100" fill="#536771" font-family="Outfit" font-size="12">Una sola tarea a la vez</text>

              <rect x="55" y="120" width="170" height="45" rx="8" fill="#FFFFFF" stroke="#0D9488" stroke-width="1.5"/>
              <text x="68" y="147" fill="#0D9488" font-family="JetBrains Mono" font-size="12" font-weight="600">tareaActual()</text>

              <rect x="55" y="175" width="170" height="45" rx="8" fill="#FFFFFF" stroke="#CBD5E1"/>
              <text x="68" y="202" fill="#536771" font-family="JetBrains Mono" font-size="12">console.log("A")</text>

              <rect x="55" y="230" width="170" height="45" rx="8" fill="#FFFFFF" stroke="#CBD5E1"/>
              <text x="68" y="257" fill="#536771" font-family="JetBrains Mono" font-size="12">mainScript()</text>
              
              <text x="65" y="320" fill="#991B1B" font-family="Outfit" font-weight="600" font-size="12">🔒 Bloquea si tarda mucho</text>
            </g>

            <!-- Web APIs (Right Top) -->
            <g id="web-apis">
              <rect x="500" y="35" width="220" height="230" rx="12" fill="#F0F4F6" stroke="#0284C7" stroke-width="2"/>
              <rect x="500" y="35" width="220" height="42" rx="12" fill="#0284C7"/>
              <text x="520" y="62" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="15">NAVEGADOR (Web APIs)</text>
              <text x="520" y="95" fill="#536771" font-family="Outfit" font-size="12">Hilos en 2º plano (sin frenar)</text>

              <rect x="515" y="110" width="190" height="34" rx="6" fill="#FFFFFF" stroke="#BAE6FD"/>
              <text x="525" y="132" fill="#0369A1" font-family="JetBrains Mono" font-size="12">fetch() - Red Internet</text>

              <rect x="515" y="150" width="190" height="34" rx="6" fill="#FFFFFF" stroke="#BAE6FD"/>
              <text x="525" y="172" fill="#0369A1" font-family="JetBrains Mono" font-size="12">setTimeout() - Reloj</text>

              <rect x="515" y="190" width="190" height="34" rx="6" fill="#FFFFFF" stroke="#BAE6FD"/>
              <text x="525" y="212" fill="#0369A1" font-family="JetBrains Mono" font-size="12">addEventListener()</text>
            </g>

            <!-- Arrow Call Stack to Web APIs -->
            <path d="M240 135 Q370 65 500 115" stroke="#0284C7" stroke-width="2.5" stroke-dasharray="5 5"/>
            <polygon points="495,110 503,117 493,121" fill="#0284C7"/>
            <text x="310" y="85" fill="#0284C7" font-family="Outfit" font-size="12" font-weight="700">Delega esperas</text>

            <!-- Callback Queue (Bottom Right) -->
            <g id="task-queue">
              <rect x="420" y="315" width="300" height="130" rx="12" fill="#F0F4F6" stroke="#D97706" stroke-width="2"/>
              <rect x="420" y="315" width="300" height="38" rx="12" fill="#D97706"/>
              <text x="435" y="340" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="14">COLA DE TAREAS LISTAS</text>

              <rect x="435" y="368" width="270" height="32" rx="6" fill="#FFFFFF" stroke="#FDE68A"/>
              <text x="445" y="389" fill="#92400E" font-family="JetBrains Mono" font-size="12">Callback: Datos ya descargados</text>

              <rect x="435" y="405" width="270" height="30" rx="6" fill="#FFFFFF" stroke="#FDE68A"/>
              <text x="445" y="425" fill="#92400E" font-family="JetBrains Mono" font-size="12">Callback: Temporizador finalizado</text>
            </g>

            <!-- Arrow Web APIs to Queue -->
            <path d="M610 265 L610 315" stroke="#D97706" stroke-width="3"/>
            <polygon points="605,307 610,315 615,307" fill="#D97706"/>

            <!-- Event Loop Coordinator Circle -->
            <g id="event-loop-circle" transform="translate(300, 255)">
              <circle cx="50" cy="50" r="46" fill="#364F59" stroke="#0D9488" stroke-width="4"/>
              <path d="M30 40 A30 30 0 1 1 70 70" stroke="#FFFFFF" stroke-width="4" fill="none"/>
              <polygon points="75,60 72,75 58,72" fill="#FFFFFF"/>
              <text x="22" y="48" fill="#FFFFFF" font-family="Outfit" font-weight="800" font-size="12">EVENT</text>
              <text x="24" y="63" fill="#0D9488" font-family="Outfit" font-weight="800" font-size="12">LOOP</text>
            </g>

            <!-- Arrow Queue back to Call Stack through Event Loop -->
            <path d="M420 375 Q320 395 240 275" stroke="#0D9488" stroke-width="3"/>
            <polygon points="245,283 238,273 235,283" fill="#0D9488"/>
            <text x="210" y="355" fill="#0D9488" font-family="Outfit" font-size="12" font-weight="700">Entrega tarea si Stack está vacío</text>

            <!-- Bottom: 3 Steps of Browser Rendering -->
            <g id="render-steps" transform="translate(40, 480)">
              <rect width="680" height="110" rx="10" fill="#F8FAFB" stroke="#E2E8F0"/>
              <text x="20" y="30" fill="#364F59" font-family="Outfit" font-weight="800" font-size="15">¿CÓMO PINTA LA PANTALLA EL NAVEGADOR? (3 PASOS CLAVE)</text>
              
              <rect x="20" y="45" width="200" height="50" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
              <text x="32" y="66" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="13">1. Estructura y Estilos</text>
              <text x="32" y="84" fill="#536771" font-family="Outfit" font-size="11">Lee HTML y reglas CSS</text>

              <path d="M225 70 L245 70" stroke="#364F59" stroke-width="2"/>
              <polygon points="245,67 250,70 245,73" fill="#364F59"/>

              <rect x="255" y="45" width="200" height="50" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
              <text x="267" y="66" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="13">2. Posiciones (Layout)</text>
              <text x="267" y="84" fill="#536771" font-family="Outfit" font-size="11">Calcula medidas y cajas</text>

              <path d="M460 70 L480 70" stroke="#364F59" stroke-width="2"/>
              <polygon points="480,67 485,70 480,73" fill="#364F59"/>

              <rect x="490" y="45" width="170" height="50" rx="6" fill="#CCFBF1" stroke="#0D9488"/>
              <text x="502" y="66" fill="#0F766E" font-family="Outfit" font-weight="700" font-size="13">3. Pintado (Paint)</text>
              <text x="502" y="84" fill="#0F766E" font-family="Outfit" font-size="11">Dibuja los píxeles reales</text>
            </g>
          </svg>
        </div>
      </div>

      <footer class="slide-footer">
        <span class="footer-left">CIFP Carlos III · Departamento de Informática</span>
        <div class="footer-center-spacer"></div>
        <span class="footer-right">RA1: Criterio b) Concurrencia y bucle de eventos</span>
      </footer>
    </section>

    <!-- ===================================================================== -->
    <!-- SLIDE 6: APARTADO 4 - JS, TYPESCRIPT Y WEBASSEMBLY                    -->
    <!-- ===================================================================== -->
    <section class="slide" id="slide-5">
      <header class="slide-header">
        <div class="header-left">
          <img src="${logoTopB64}" class="header-logo-img" alt="CIFP Carlos III">
          <div class="header-divider"></div>
          <span class="header-tag">Módulo 0612: DWEC · FP DAW</span>
        </div>
        <div class="header-right">
          <span class="topic-pill">APARTADO 4 · CRITERIO C</span>
          <span class="slide-num">06 / 10</span>
        </div>
      </header>

      <div class="slide-body">
        <div class="content-cards-column">
          <div>
            <span class="title-kicker">LENGUAJES EN EL CLIENTE</span>
            <h2 class="slide-title">JavaScript, TypeScript y WebAssembly</h2>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">🟡</span>
              JavaScript: El Estándar Universal
            </div>
            <p>
              El único lenguaje de programación que <strong>todos los navegadores entienden de forma nativa sin plugins</strong>. Regulado por el estándar ECMAScript con mejoras anuales constantes (<span class="code-chip">let/const</span>, <span class="code-chip">async/await</span>).
            </p>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">🔷</span>
              TypeScript: Prevención de Errores en Proyectos
            </div>
            <p>
              Añade tipos estáticos a JavaScript. Te avisa de fallos en el editor mientras programas.<br>
              <strong>Clave de examen:</strong> El navegador no entiende TypeScript; se debe compilar (transpilar) a JavaScript estándar antes de publicar.
            </p>
          </div>

          <div class="callout-box">
            <strong>¿Qué es WebAssembly (Wasm)?:</strong> Es un formato binario para ejecutar código en lenguajes como C++ o Rust a velocidad casi nativa. No sustituye a JavaScript; se usan juntos en herramientas como <strong>Figma o videojuegos 3D</strong>.
          </div>
        </div>

        <div class="illustration-column">
          <!-- SVG VECTOR DIAGRAM: 3 PILLARS COMPARISON -->
          <svg viewBox="0 0 760 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="620" rx="16" fill="#FFFFFF"/>

            <!-- Pillar 1: JavaScript -->
            <g id="pillar-js" transform="translate(40, 35)">
              <rect width="210" height="530" rx="14" fill="#FEF9C3" stroke="#CA8A04" stroke-width="2"/>
              <rect width="210" height="60" rx="14" fill="#FACC15"/>
              <text x="35" y="38" fill="#713F12" font-family="Outfit" font-weight="800" font-size="20">JAVASCRIPT</text>

              <rect x="20" y="80" width="170" height="34" rx="6" fill="#FFFFFF"/>
              <text x="32" y="102" fill="#854D0E" font-family="Outfit" font-weight="700" font-size="13">ESTÁNDAR NATIVO</text>

              <text x="25" y="145" fill="#713F12" font-family="Outfit" font-size="13.5" font-weight="500">
                <tspan x="25" dy="0">• Ejecución nativa directa</tspan>
                <tspan x="25" dy="28">• Manipulación total DOM</tspan>
                <tspan x="25" dy="28">• Eventos del usuario</tspan>
                <tspan x="25" dy="28">• Peticiones Fetch / AJAX</tspan>
                <tspan x="25" dy="28">• Tipado dinámico flexible</tspan>
                <tspan x="25" dy="28" font-weight="700" fill="#854D0E">• El corazón de la web</tspan>
              </text>

              <rect x="20" y="450" width="170" height="50" rx="8" fill="#FFFFFF" stroke="#EAB308"/>
              <text x="30" y="472" fill="#713F12" font-family="Outfit" font-weight="700" font-size="12">Rol Principal:</text>
              <text x="30" y="489" fill="#854D0E" font-family="Outfit" font-size="11">Interactividad y UI</text>
            </g>

            <!-- Pillar 2: TypeScript -->
            <g id="pillar-ts" transform="translate(275, 35)">
              <rect width="210" height="530" rx="14" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
              <rect width="210" height="60" rx="14" fill="#3B82F6"/>
              <text x="35" y="38" fill="#FFFFFF" font-family="Outfit" font-weight="800" font-size="20">TYPESCRIPT</text>

              <rect x="20" y="80" width="170" height="34" rx="6" fill="#FFFFFF"/>
              <text x="32" y="102" fill="#1E40AF" font-family="Outfit" font-weight="700" font-size="13">TIPADO ESTÁTICO</text>

              <text x="25" y="145" fill="#1E3A8A" font-family="Outfit" font-size="13.5" font-weight="500">
                <tspan x="25" dy="0">• Superset oficial de JS</tspan>
                <tspan x="25" dy="28">• Tipos en el editor</tspan>
                <tspan x="25" dy="28">• Detección previa de bugs</tspan>
                <tspan x="25" dy="28">• Interfaces y contratos</tspan>
                <tspan x="25" dy="28" font-weight="700" fill="#2563EB">• Se transpila a JS limpio</tspan>
                <tspan x="25" dy="28">• Cero coste en runtime</tspan>
              </text>

              <rect x="20" y="450" width="170" height="50" rx="8" fill="#FFFFFF" stroke="#3B82F6"/>
              <text x="30" y="472" fill="#1E40AF" font-family="Outfit" font-weight="700" font-size="12">Rol Principal:</text>
              <text x="30" y="489" fill="#1D4ED8" font-family="Outfit" font-size="11">Seguridad en Desarrollo</text>
            </g>

            <!-- Pillar 3: WebAssembly -->
            <g id="pillar-wasm" transform="translate(510, 35)">
              <rect width="210" height="530" rx="14" fill="#F5F3FF" stroke="#7C3AED" stroke-width="2"/>
              <rect width="210" height="60" rx="14" fill="#8B5CF6"/>
              <text x="25" y="38" fill="#FFFFFF" font-family="Outfit" font-weight="800" font-size="19">WEBASSEMBLY</text>

              <rect x="20" y="80" width="170" height="34" rx="6" fill="#FFFFFF"/>
              <text x="32" y="102" fill="#5B21B6" font-family="Outfit" font-weight="700" font-size="13">CÓDIGO BINARIO</text>

              <text x="25" y="145" fill="#4C1D95" font-family="Outfit" font-size="13.5" font-weight="500">
                <tspan x="25" dy="0">• Velocidad cuasi-nativa</tspan>
                <tspan x="25" dy="28">• Creado en C++, Rust, Go</tspan>
                <tspan x="25" dy="28">• Cómputo matemático</tspan>
                <tspan x="25" dy="28">• Motores de juegos 3D</tspan>
                <tspan x="25" dy="28">• Edición gráfica (Figma)</tspan>
                <tspan x="25" dy="28" font-weight="700" fill="#6D28D9">• Complementa a JS</tspan>
              </text>

              <rect x="20" y="450" width="170" height="50" rx="8" fill="#FFFFFF" stroke="#8B5CF6"/>
              <text x="30" y="472" fill="#5B21B6" font-family="Outfit" font-weight="700" font-size="12">Rol Principal:</text>
              <text x="30" y="489" fill="#6D28D9" font-family="Outfit" font-size="11">Máximo Rendimiento</text>
            </g>
          </svg>
        </div>
      </div>

      <footer class="slide-footer">
        <span class="footer-left">CIFP Carlos III · Departamento de Informática</span>
        <div class="footer-center-spacer"></div>
        <span class="footer-right">RA1: Criterio c) Principales lenguajes en el cliente</span>
      </footer>
    </section>

    <!-- ===================================================================== -->
    <!-- SLIDE 7: APARTADO 5 - SEGURIDAD SANDBOX Y SAME-ORIGIN POLICY          -->
    <!-- ===================================================================== -->
    <section class="slide" id="slide-6">
      <header class="slide-header">
        <div class="header-left">
          <img src="${logoTopB64}" class="header-logo-img" alt="CIFP Carlos III">
          <div class="header-divider"></div>
          <span class="header-tag">Módulo 0612: DWEC · FP DAW</span>
        </div>
        <div class="header-right">
          <span class="topic-pill">APARTADO 5 · CRITERIO D</span>
          <span class="slide-num">07 / 10</span>
        </div>
      </header>

      <div class="slide-body">
        <div class="content-cards-column">
          <div>
            <span class="title-kicker">SEGURIDAD EN EL NAVEGADOR</span>
            <h2 class="slide-title">El Sandbox y la Regla del Mismo Origen</h2>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">🏖️</span>
              El Sandbox (Caja de Arena)
            </div>
            <p>
              Al entrar en una web descargas código de desconocidos. El navegador lo encierra en una <strong>jaula protegida</strong>:<br>
              • <strong>Prohibido tocar archivos del disco duro</strong> sin permiso explícito.<br>
              • <strong>Permisos obligatorios</strong> para usar la cámara, micrófono o ubicación GPS.
            </p>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">🔒</span>
              La Regla del Mismo Origen (SOP) y CORS
            </div>
            <p>
              Una web solo puede pedir datos a su propio servidor si coinciden 3 datos: <strong>Protocolo + Dominio + Puerto</strong>.<br>
              Si necesitas consultar una API externa legítima, esa API debe autorizarte expresamente mediante la cabecera <strong>CORS</strong>.
            </p>
          </div>

          <div class="callout-box">
            <strong>Petición Preflight (OPTIONS):</strong> Antes de enviar peticiones importantes o destructivas a otro servidor, el navegador envía una consulta previa automática con <strong>OPTIONS</strong> preguntando si tiene permiso.
          </div>
        </div>

        <div class="illustration-column">
          <!-- SVG VECTOR DIAGRAM: SANDBOX & SOP TUPLE -->
          <svg viewBox="0 0 760 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="620" rx="16" fill="#FFFFFF"/>

            <!-- Top: Sandbox Architecture -->
            <g id="sandbox-shield">
              <rect x="40" y="25" width="680" height="230" rx="12" fill="#F0F4F6" stroke="#364F59" stroke-width="2"/>
              <rect x="40" y="25" width="680" height="42" rx="12" fill="#364F59"/>
              <text x="60" y="52" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="16">EL ENTORNO AISLADO SANDBOX (CAJA DE ARENA)</text>

              <!-- Inside Sandbox -->
              <rect x="70" y="85" width="280" height="150" rx="10" fill="#CCFBF1" stroke="#0D9488" stroke-width="2"/>
              <text x="90" y="113" fill="#0F766E" font-family="Outfit" font-weight="700" font-size="15">DENTRO DEL NAVEGADOR</text>
              <text x="90" y="140" fill="#134E4A" font-family="Outfit" font-size="13">✓ Ejecuta JavaScript</text>
              <text x="90" y="165" fill="#134E4A" font-family="Outfit" font-size="13">✓ Modifica el DOM y estilos</text>
              <text x="90" y="190" fill="#134E4A" font-family="Outfit" font-size="13">✓ Guarda en localStorage local</text>
              <text x="90" y="215" fill="#0D9488" font-family="Outfit" font-weight="600" font-size="12">Entorno aislado y vigilado</text>

              <!-- FireWall / Barrier -->
              <line x1="390" y1="80" x2="390" y2="240" stroke="#E11D48" stroke-width="3" stroke-dasharray="6 6"/>
              <circle cx="390" cy="160" r="18" fill="#E11D48"/>
              <text x="384" y="167" fill="#FFFFFF" font-family="Outfit" font-weight="800" font-size="18">X</text>

              <!-- Hardware / OS Blocked -->
              <rect x="430" y="85" width="260" height="150" rx="10" fill="#FEE2E2" stroke="#EF4444" stroke-width="2"/>
              <text x="450" y="113" fill="#991B1B" font-family="Outfit" font-weight="700" font-size="15">SISTEMA DEL USUARIO</text>
              <text x="450" y="140" fill="#7F1D1D" font-family="Outfit" font-size="13">⛔ Disco duro C:\\ privado</text>
              <text x="450" y="165" fill="#7F1D1D" font-family="Outfit" font-size="13">⛔ Cámara web (sin permiso)</text>
              <text x="450" y="190" fill="#7F1D1D" font-family="Outfit" font-size="13">⛔ Memoria física del S.O.</text>
              <text x="450" y="215" fill="#991B1B" font-family="Outfit" font-weight="600" font-size="12">Protección total contra malware</text>
            </g>

            <!-- Bottom: Same-Origin Policy (SOP) Rule -->
            <g id="sop-matrix" transform="translate(0, 275)">
              <rect x="40" y="20" width="680" height="300" rx="12" fill="#F8FAFB" stroke="#CBD5E1" stroke-width="1.5"/>
              <text x="60" y="52" fill="#364F59" font-family="Outfit" font-weight="800" font-size="16">SAME-ORIGIN POLICY: LA REGLA DE LAS 3 COINCIDENCIAS</text>

              <rect x="60" y="70" width="640" height="48" rx="8" fill="#1E2D33"/>
              <text x="80" y="100" fill="#F8FAFC" font-family="JetBrains Mono" font-size="14">
                ORIGEN BASE: <tspan fill="#38BDF8">https://</tspan><tspan fill="#4ADE80">tienda.es</tspan><tspan fill="#FBBF24">:443</tspan>
              </text>

              <!-- Case 1: OK -->
              <rect x="60" y="130" width="640" height="42" rx="6" fill="#FFFFFF" stroke="#0D9488"/>
              <text x="80" y="156" fill="#0F766E" font-family="JetBrains Mono" font-size="13">https://tienda.es:443/productos.html</text>
              <rect x="530" y="138" width="150" height="26" rx="4" fill="#CCFBF1"/>
              <text x="545" y="155" fill="#0F766E" font-family="Outfit" font-weight="700" font-size="12">✓ MISMO ORIGEN</text>

              <!-- Case 2: Protocol diff -->
              <rect x="60" y="182" width="640" height="42" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
              <text x="80" y="208" fill="#991B1B" font-family="JetBrains Mono" font-size="13"><tspan fill="#EF4444" font-weight="800">http://</tspan>tienda.es:443</text>
              <rect x="510" y="190" width="170" height="26" rx="4" fill="#FEE2E2"/>
              <text x="525" y="207" fill="#991B1B" font-family="Outfit" font-weight="700" font-size="12">✗ Protocolo Distinto</text>

              <!-- Case 3: Subdomain diff -->
              <rect x="60" y="234" width="640" height="42" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
              <text x="80" y="260" fill="#991B1B" font-family="JetBrains Mono" font-size="13">https://<tspan fill="#EF4444" font-weight="800">blog.</tspan>tienda.es:443</text>
              <rect x="510" y="242" width="170" height="26" rx="4" fill="#FEE2E2"/>
              <text x="525" y="259" fill="#991B1B" font-family="Outfit" font-weight="700" font-size="12">✗ Subdominio Distinto</text>
            </g>
          </svg>
        </div>
      </div>

      <footer class="slide-footer">
        <span class="footer-left">CIFP Carlos III · Departamento de Informática</span>
        <div class="footer-center-spacer"></div>
        <span class="footer-right">RA1: Criterio d) Scripts vs tradicional y seguridad en la web</span>
      </footer>
    </section>

    <!-- ===================================================================== -->
    <!-- SLIDE 8: APARTADO 6 - INTEGRACIÓN HTML5 Y MÓDULOS ES6                -->
    <!-- ===================================================================== -->
    <section class="slide" id="slide-7">
      <header class="slide-header">
        <div class="header-left">
          <img src="${logoTopB64}" class="header-logo-img" alt="CIFP Carlos III">
          <div class="header-divider"></div>
          <span class="header-tag">Módulo 0612: DWEC · FP DAW</span>
        </div>
        <div class="header-right">
          <span class="topic-pill">APARTADO 6 · CRITERIO E</span>
          <span class="slide-num">08 / 10</span>
        </div>
      </header>

      <div class="slide-body">
        <div class="content-cards-column">
          <div>
            <span class="title-kicker">INTEGRACIÓN DE CÓDIGO</span>
            <h2 class="slide-title">Carga de Scripts en HTML y Módulos ES6</h2>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">⏱️</span>
              ¿Cómo cargar los scripts? defer es la clave
            </div>
            <p>
              • <strong>Script normal</strong>: Bloquea la lectura del HTML mientras descarga.<br>
              • <strong>async</strong>: Descarga en paralelo, pero se ejecuta en cuanto llega sin respetar el orden.<br>
              • <strong>defer (Recomendado)</strong>: Descarga en paralelo y se ejecuta en orden cuando todo el HTML está listo.
            </p>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">📦</span>
              Módulos Modernos (<span class="code-chip">type="module"</span>)
            </div>
            <p>
              Permiten dividir el proyecto en archivos limpios conectándolos con <span class="code-chip">import</span> y <span class="code-chip">export</span>. Tienen comportamiento <span class="code-chip">defer</span> automático y sus variables están aisladas sin contaminar el objeto global <span class="code-chip">window</span>.
            </p>
          </div>

          <div class="callout-box">
            <strong>Buena Práctica Profesional:</strong> Nunca uses manejadores en línea (<span class="code-chip">&lt;button onclick="..."&gt;</span>). Enlaza siempre los eventos con <span class="code-chip">addEventListener</span> desde tu archivo JavaScript.
          </div>
        </div>

        <div class="illustration-column">
          <!-- SVG VECTOR DIAGRAM: TIMELINE OF SCRIPT LOADING (ALL TEXT WRAPPED) -->
          <svg viewBox="0 0 760 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="620" rx="16" fill="#FFFFFF"/>

            <text x="40" y="42" fill="#364F59" font-family="Outfit" font-weight="800" font-size="17">COMPARATIVA DE CARGA DE SCRIPTS EN EL NAVEGADOR</text>

            <!-- Timeline 1: Síncrono Normal -->
            <g id="tl-sync" transform="translate(40, 65)">
              <rect width="680" height="115" rx="10" fill="#F8FAFB" stroke="#CBD5E1"/>
              <text x="20" y="28" fill="#991B1B" font-family="Outfit" font-weight="700" font-size="13.5">1. Script Clásico: &lt;script src="app.js"&gt;</text>
              <text x="20" y="48" fill="#536771" font-family="Outfit" font-size="11.5">Detiene el dibujo del HTML mientras descarga y ejecuta</text>

              <!-- HTML bar -->
              <rect x="20" y="62" width="160" height="24" rx="4" fill="#0D9488"/>
              <text x="45" y="78" fill="#FFFFFF" font-family="Outfit" font-size="11" font-weight="600">Lee HTML...</text>

              <!-- Red Block Pause -->
              <rect x="180" y="62" width="180" height="24" rx="4" fill="#EF4444"/>
              <text x="195" y="78" fill="#FFFFFF" font-family="Outfit" font-size="11" font-weight="600">⛔ Descarga y Ejecuta JS</text>

              <!-- HTML continues -->
              <rect x="360" y="62" width="300" height="24" rx="4" fill="#0D9488"/>
              <text x="440" y="78" fill="#FFFFFF" font-family="Outfit" font-size="11" font-weight="600">Continúa leyendo HTML...</text>
            </g>

            <!-- Timeline 2: Async -->
            <g id="tl-async" transform="translate(40, 195)">
              <rect width="680" height="115" rx="10" fill="#F8FAFB" stroke="#CBD5E1"/>
              <text x="20" y="28" fill="#D97706" font-family="Outfit" font-weight="700" font-size="13.5">2. Script Asíncrono: &lt;script src="analitica.js" async&gt;</text>
              <text x="20" y="48" fill="#536771" font-family="Outfit" font-size="11.5">Descarga en paralelo, pero se ejecuta en cuanto llega pausando el HTML</text>

              <!-- HTML bar with small interruption -->
              <rect x="20" y="62" width="340" height="24" rx="4" fill="#0D9488"/>
              <text x="120" y="78" fill="#FFFFFF" font-family="Outfit" font-size="11" font-weight="600">Lee HTML en paralelo</text>

              <rect x="360" y="62" width="100" height="24" rx="4" fill="#EF4444"/>
              <text x="370" y="78" fill="#FFFFFF" font-family="Outfit" font-size="11" font-weight="600">Ejecuta JS</text>

              <rect x="460" y="62" width="200" height="24" rx="4" fill="#0D9488"/>

              <!-- Download parallel bar -->
              <rect x="120" y="90" width="240" height="16" rx="4" fill="#38BDF8"/>
              <text x="170" y="102" fill="#0C4A6E" font-family="Outfit" font-size="10" font-weight="700">Descarga en 2º plano</text>
            </g>

            <!-- Timeline 3: Defer (Recommended) -->
            <g id="tl-defer" transform="translate(40, 325)">
              <rect width="680" height="115" rx="10" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
              <text x="20" y="28" fill="#15803D" font-family="Outfit" font-weight="800" font-size="13.5">3. Script Diferido: &lt;script src="app.js" defer&gt; ★ RECOMENDADO</text>
              <text x="20" y="48" fill="#166534" font-family="Outfit" font-size="11.5">Descarga en paralelo y se ejecuta justo al terminar el HTML en orden</text>

              <!-- Continuous HTML -->
              <rect x="20" y="62" width="480" height="24" rx="4" fill="#0D9488"/>
              <text x="170" y="78" fill="#FFFFFF" font-family="Outfit" font-size="11" font-weight="600">Lee todo el HTML sin pausas</text>

              <!-- Execute at the end -->
              <rect x="500" y="62" width="160" height="24" rx="4" fill="#16A34A"/>
              <text x="525" y="78" fill="#FFFFFF" font-family="Outfit" font-size="11" font-weight="700">✓ Ejecuta ordenado</text>

              <!-- Parallel Download -->
              <rect x="80" y="90" width="380" height="16" rx="4" fill="#38BDF8"/>
              <text x="200" y="102" fill="#0C4A6E" font-family="Outfit" font-size="10" font-weight="700">Descarga en paralelo sin bloqueos</text>
            </g>

            <!-- Bottom: Module Banner with WRAPPED tspans -->
            <g id="module-banner" transform="translate(40, 460)">
              <rect width="680" height="135" rx="10" fill="#364F59"/>
              <text x="24" y="32" fill="#FBBF24" font-family="Outfit" font-weight="800" font-size="15">MÓDULOS NATIVOS (&lt;script type="module" src="main.js"&gt;)</text>
              <text x="24" y="58" fill="#FFFFFF" font-family="Outfit" font-size="12.5">
                <tspan x="24" dy="0">Comportamiento diferido (defer) automático y aislamiento modular de variables.</tspan>
                <tspan x="24" dy="18">Las variables declaradas no contaminan el objeto global window.</tspan>
              </text>
              <rect x="24" y="88" width="632" height="34" rx="6" fill="#1E2D33"/>
              <text x="40" y="110" fill="#A7F3D0" font-family="JetBrains Mono" font-size="12">
                export function suma(a, b) { ... }  ───►  import { suma } from './calc.js'
              </text>
            </g>
          </svg>
        </div>
      </div>

      <footer class="slide-footer">
        <span class="footer-left">CIFP Carlos III · Departamento de Informática</span>
        <div class="footer-center-spacer"></div>
        <span class="footer-right">RA1: Criterio e) Integración de lenguajes de marcas con cliente</span>
      </footer>
    </section>

    <!-- ===================================================================== -->
    <!-- SLIDE 9: APARTADO 7 - DEVTOOLS Y GOOGLE LIGHTHOUSE                    -->
    <!-- ===================================================================== -->
    <section class="slide" id="slide-8">
      <header class="slide-header">
        <div class="header-left">
          <img src="${logoTopB64}" class="header-logo-img" alt="CIFP Carlos III">
          <div class="header-divider"></div>
          <span class="header-tag">Módulo 0612: DWEC · FP DAW</span>
        </div>
        <div class="header-right">
          <span class="topic-pill">APARTADO 7 · CRITERIO F</span>
          <span class="slide-num">09 / 10</span>
        </div>
      </header>

      <div class="slide-body">
        <div class="content-cards-column">
          <div>
            <span class="title-kicker">HERRAMIENTAS DE DESARROLLO</span>
            <h2 class="slide-title">DevTools y Google Lighthouse</h2>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">🛠️</span>
              Las 4 Pestañas Clave de DevTools (F12)
            </div>
            <p>
              • <strong>Elements</strong>: Inspecciona y retoca el HTML y CSS en tiempo real.<br>
              • <strong>Console</strong>: Muestra mensajes de error y pruebas con <span class="code-chip">console.table()</span>.<br>
              • <strong>Sources</strong>: Pausa el código paso a paso con puntos de parada o <span class="code-chip">debugger;</span>.<br>
              • <strong>Network</strong>: Registra archivos descargados y tiempos de respuesta.
            </p>
          </div>

          <div class="card">
            <div class="card-title">
              <span style="color:var(--brand); font-size:18px;">📊</span>
              Google Lighthouse: El Boletín de Notas
            </div>
            <p>
              Auditoría automática que califica tu web de <strong>0 a 100</strong> en 4 áreas:<br>
              1. <strong>Rendimiento</strong> (velocidad) · 2. <strong>Accesibilidad</strong> (para todos)<br>
              3. <strong>Buenas Prácticas</strong> (seguridad) · 4. <strong>SEO</strong> (Google)
            </p>
          </div>

          <div class="callout-box">
            <strong>3 Claves para Sobresaliente en Lighthouse:</strong><br>
            1. Optimiza y comprime las imágenes (WebP).<br>
            2. Pon siempre el atributo <span class="code-chip">alt="..."</span> en las fotos.<br>
            3. Usa etiquetas semánticas (<span class="code-chip">&lt;header&gt;</span>, <span class="code-chip">&lt;nav&gt;</span>, <span class="code-chip">&lt;main&gt;</span>).
          </div>
        </div>

        <div class="illustration-column">
          <!-- SVG VECTOR DIAGRAM: LIGHTHOUSE DASHBOARD & DEVTOOLS (ALL TEXT WRAPPED) -->
          <svg viewBox="0 0 760 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="620" rx="16" fill="#FFFFFF"/>

            <!-- DevTools Top Bar simulation -->
            <rect x="40" y="25" width="680" height="40" rx="8" fill="#1E293B"/>
            <circle cx="60" cy="45" r="5" fill="#EF4444"/>
            <circle cx="76" cy="45" r="5" fill="#F59E0B"/>
            <circle cx="92" cy="45" r="5" fill="#10B981"/>
            
            <rect x="120" y="31" width="75" height="28" rx="4" fill="#334155"/>
            <text x="130" y="50" fill="#94A3B8" font-family="Outfit" font-size="12">Elements</text>

            <rect x="200" y="31" width="70" height="28" rx="4" fill="#334155"/>
            <text x="212" y="50" fill="#94A3B8" font-family="Outfit" font-size="12">Console</text>

            <rect x="275" y="31" width="70" height="28" rx="4" fill="#334155"/>
            <text x="287" y="50" fill="#94A3B8" font-family="Outfit" font-size="12">Sources</text>

            <rect x="350" y="31" width="70" height="28" rx="4" fill="#334155"/>
            <text x="362" y="50" fill="#94A3B8" font-family="Outfit" font-size="12">Network</text>

            <!-- Active tab: Lighthouse -->
            <rect x="425" y="31" width="90" height="28" rx="4" fill="#364F59"/>
            <text x="437" y="50" fill="#FFFFFF" font-family="Outfit" font-weight="700" font-size="12">Lighthouse</text>

            <!-- Lighthouse Scoreboard Cards (4 Pillars) -->
            <g id="lighthouse-gauges" transform="translate(40, 80)">
              <rect width="680" height="505" rx="12" fill="#F8FAFB" stroke="#CBD5E1" stroke-width="1.5"/>
              <text x="30" y="42" fill="#364F59" font-family="Outfit" font-weight="800" font-size="18">AUDITORÍA LIGHTHOUSE (PUNTUACIONES 0 - 100)</text>

              <!-- Gauge 1: Rendimiento -->
              <g transform="translate(35, 65)">
                <rect width="140" height="210" rx="10" fill="#FFFFFF" stroke="#0D9488" stroke-width="2"/>
                <circle cx="70" cy="70" r="45" fill="#CCFBF1" stroke="#0D9488" stroke-width="6"/>
                <text x="50" y="78" fill="#0F766E" font-family="Outfit" font-weight="800" font-size="26">98</text>
                <text x="20" y="145" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="14.5">Rendimiento</text>
                <text x="20" y="170" fill="#536771" font-family="Outfit" font-size="11.5">
                  <tspan x="20" dy="0">Carga ultrarrápida</tspan>
                  <tspan x="20" dy="16">sin tirones visuales</tspan>
                </text>
              </g>

              <!-- Gauge 2: Accesibilidad -->
              <g transform="translate(195, 65)">
                <rect width="140" height="210" rx="10" fill="#FFFFFF" stroke="#0D9488" stroke-width="2"/>
                <circle cx="70" cy="70" r="45" fill="#CCFBF1" stroke="#0D9488" stroke-width="6"/>
                <text x="45" y="78" fill="#0F766E" font-family="Outfit" font-weight="800" font-size="26">100</text>
                <text x="18" y="145" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="14.5">Accesibilidad</text>
                <text x="18" y="170" fill="#536771" font-family="Outfit" font-size="11.5">
                  <tspan x="18" dy="0">Contraste y apoyo</tspan>
                  <tspan x="18" dy="16">para discapacidades</tspan>
                </text>
              </g>

              <!-- Gauge 3: Buenas Prácticas -->
              <g transform="translate(355, 65)">
                <rect width="140" height="210" rx="10" fill="#FFFFFF" stroke="#0D9488" stroke-width="2"/>
                <circle cx="70" cy="70" r="45" fill="#CCFBF1" stroke="#0D9488" stroke-width="6"/>
                <text x="50" y="78" fill="#0F766E" font-family="Outfit" font-weight="800" font-size="26">96</text>
                <text x="15" y="145" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="14">Buenas Prácticas</text>
                <text x="15" y="170" fill="#536771" font-family="Outfit" font-size="11.5">
                  <tspan x="15" dy="0">Conexión HTTPS y</tspan>
                  <tspan x="15" dy="16">código seguro moderno</tspan>
                </text>
              </g>

              <!-- Gauge 4: SEO -->
              <g transform="translate(515, 65)">
                <rect width="140" height="210" rx="10" fill="#FFFFFF" stroke="#0D9488" stroke-width="2"/>
                <circle cx="70" cy="70" r="45" fill="#CCFBF1" stroke="#0D9488" stroke-width="6"/>
                <text x="45" y="78" fill="#0F766E" font-family="Outfit" font-weight="800" font-size="26">100</text>
                <text x="48" y="145" fill="#1E2D33" font-family="Outfit" font-weight="700" font-size="14.5">SEO</text>
                <text x="20" y="170" fill="#536771" font-family="Outfit" font-size="11.5">
                  <tspan x="20" dy="0">Visibilidad alta</tspan>
                  <tspan x="20" dy="16">en buscadores Google</tspan>
                </text>
              </g>

              <!-- Tooling Section (ESLint / Prettier) with WRAPPED tspans -->
              <rect x="35" y="300" width="620" height="180" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
              <text x="55" y="332" fill="#364F59" font-family="Outfit" font-weight="800" font-size="15">HERRAMIENTAS COMPLEMENTARIAS EN EL EDITOR (VS CODE)</text>

              <g transform="translate(55, 350)">
                <rect width="270" height="110" rx="8" fill="#F0F4F6"/>
                <text x="16" y="30" fill="#364F59" font-family="Outfit" font-weight="700" font-size="14">ESLint (El Corrector)</text>
                <text x="16" y="55" fill="#536771" font-family="Outfit" font-size="12">
                  <tspan x="16" dy="0">Detecta fallos de sintaxis y</tspan>
                  <tspan x="16" dy="18">variables no usadas mientras</tspan>
                  <tspan x="16" dy="18">escribes tu código fuente.</tspan>
                </text>
              </g>

              <g transform="translate(345, 350)">
                <rect width="290" height="110" rx="8" fill="#F0F4F6"/>
                <text x="16" y="30" fill="#364F59" font-family="Outfit" font-weight="700" font-size="14">Prettier (El Formateador)</text>
                <text x="16" y="55" fill="#536771" font-family="Outfit" font-size="12">
                  <tspan x="16" dy="0">Aplica sangrías, comillas</tspan>
                  <tspan x="16" dy="18">consistentes y saltos de línea</tspan>
                  <tspan x="16" dy="18">automáticos al guardar.</tspan>
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <footer class="slide-footer">
        <span class="footer-left">CIFP Carlos III · Departamento de Informática</span>
        <div class="footer-center-spacer"></div>
        <span class="footer-right">RA1: Criterio f) Herramientas de desarrollo, depuración y auditoría</span>
      </footer>
    </section>

    <!-- ===================================================================== -->
    <!-- SLIDE 10: CONCLUSIONES, REPASO DE EXAMEN Y CIERRE                     -->
    <!-- ===================================================================== -->
    <section class="slide cover-slide" id="slide-9" style="justify-content: space-between;">
      <div class="cover-top-bar">
        <div class="cover-logo-container">
          <img src="${logoTopB64}" class="cover-logo-img" alt="CIFP Carlos III">
          <div style="display:flex; flex-direction:column; justify-content:center; border-left: 2px solid var(--brand-border); padding-left: 12px; margin-left: 4px;">
            <span style="font-weight: 800; font-size: clamp(15px, 1.3vw, 19px); color: var(--brand); letter-spacing: 0.5px;">CIFP CARLOS III</span>
            <span style="font-size: clamp(9.5px, 0.75vw, 11px); font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px;">Centro Integrado de Formación Profesional</span>
          </div>
        </div>
        <div class="cover-badge-course">
          SÍNTESIS FINAL DEL RA1 · EVALUACIÓN
        </div>
      </div>

      <div style="z-index: 2; margin: auto 0; padding: clamp(10px, 1.5vh, 20px) 0;">
        <span class="cover-kicker">RESUMEN PARA EXPOSICIÓN Y EXAMEN OFICIAL</span>
        <h2 style="font-size: clamp(22px, 2.4vw, 36px); font-weight: 800; margin-bottom: 16px;">Las 4 Preguntas Imprescindibles que Debes Dominar</h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: clamp(10px, 1.2vw, 16px);">
          <div style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); border-radius: 12px; padding: clamp(10px, 1.4vh, 16px) clamp(14px, 1.4vw, 20px);">
            <div style="font-size: 14.5px; font-weight: 700; color: #FBBF24; margin-bottom: 4px;">1. ¿Dónde se valida de forma segura?</div>
            <div style="font-size: 13px; color: #E2E8F0; line-height: 1.45;">En el servidor (backend). En el cliente se valida por rapidez y experiencia de usuario (UX).</div>
          </div>

          <div style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); border-radius: 12px; padding: clamp(10px, 1.4vh, 16px) clamp(14px, 1.4vw, 20px);">
            <div style="font-size: 14.5px; font-weight: 700; color: #FBBF24; margin-bottom: 4px;">2. ¿Qué motor JS usan Chrome y Edge?</div>
            <div style="font-size: 13px; color: #E2E8F0; line-height: 1.45;">El motor V8 de Google, que utiliza compilación Just-In-Time (JIT) a código máquina.</div>
          </div>

          <div style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); border-radius: 12px; padding: clamp(10px, 1.4vh, 16px) clamp(14px, 1.4vw, 20px);">
            <div style="font-size: 14.5px; font-weight: 700; color: #FBBF24; margin-bottom: 4px;">3. ¿Por qué JS no congela la pantalla?</div>
            <div style="font-size: 13px; color: #E2E8F0; line-height: 1.45;">Porque es monohilo pero delega las esperas en el navegador (Web APIs), coordinadas por el Event Loop.</div>
          </div>

          <div style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); border-radius: 12px; padding: clamp(10px, 1.4vh, 16px) clamp(14px, 1.4vw, 20px);">
            <div style="font-size: 14.5px; font-weight: 700; color: #FBBF24; margin-bottom: 4px;">4. ¿Qué requiere Same-Origin Policy?</div>
            <div style="font-size: 13px; color: #E2E8F0; line-height: 1.45;">Coincidencia exacta en la tupla: Protocolo + Dominio + Puerto. Para excepciones se usa CORS.</div>
          </div>
        </div>
      </div>

      <div class="cover-bottom">
        <div class="cover-footer-left">
          <strong>¡Muchas gracias por su atención!</strong> · Turno de preguntas y debate en clase<br>
          Centro Integrado de Formación Profesional Carlos III · Departamento de Informática
        </div>
        <div class="cover-footer-right">
          FIN DE LA PRESENTACIÓN · RA1
        </div>
      </div>
    </section>

  </div>

  <!-- PRESENTATION SCRIPT LOGIC (SLIDE-BY-SLIDE & CONTINUOUS MODES) -->
  <script>
    (function() {
      const slides = document.querySelectorAll('.slide');
      const totalSlides = slides.length;
      let currentIndex = 0;
      let isSlideMode = true; // default slide presentation mode

      const btnPrev = document.getElementById('btnPrev');
      const btnNext = document.getElementById('btnNext');
      const hudCounter = document.getElementById('hudCounter');
      const slidePicker = document.getElementById('slidePicker');
      const progressBar = document.getElementById('progressBar');
      const btnFullscreen = document.getElementById('btnFullscreen');
      const btnToggleMode = document.getElementById('btnToggleMode');

      function updateUI() {
        const numStr = (currentIndex + 1).toString().padStart(2, '0');
        const totalStr = totalSlides.toString().padStart(2, '0');
        hudCounter.textContent = \`\${numStr} / \${totalStr}\`;
        
        const progressPct = ((currentIndex + 1) / totalSlides) * 100;
        progressBar.style.width = \`\${progressPct}%\`;

        slidePicker.value = currentIndex;

        btnPrev.disabled = (currentIndex === 0);
        btnNext.disabled = (currentIndex === totalSlides - 1);
        btnPrev.style.opacity = (currentIndex === 0) ? '0.4' : '1';
        btnNext.style.opacity = (currentIndex === totalSlides - 1) ? '0.4' : '1';
      }

      function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        currentIndex = index;

        if (isSlideMode) {
          slides.forEach((s, idx) => {
            if (idx === currentIndex) {
              s.classList.add('active');
            } else {
              s.classList.remove('active');
            }
          });
        } else {
          const target = document.getElementById('slide-' + currentIndex);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }

        updateUI();
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, null, '#slide-' + currentIndex);
        }
      }

      function setPresentationMode(slideMode) {
        isSlideMode = slideMode;
        if (isSlideMode) {
          document.body.classList.remove('continuous-mode');
          document.body.classList.add('slide-mode');
          btnToggleMode.innerHTML = '📽️ <span>Diapos</span>';
          btnToggleMode.title = 'Modo actual: Diapositiva a diapositiva. Clic para cambiar a Lista continua (M)';
          goToSlide(currentIndex);
        } else {
          document.body.classList.remove('slide-mode');
          document.body.classList.add('continuous-mode');
          btnToggleMode.innerHTML = '📄 <span>Lista</span>';
          btnToggleMode.title = 'Modo actual: Lista continua. Clic para cambiar a Diapositivas (M)';
          slides.forEach(s => s.classList.remove('active'));
          const target = document.getElementById('slide-' + currentIndex);
          if (target) {
            setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
          }
        }
      }

      // Check URL hash on load
      const hash = window.location.hash;
      if (hash && hash.startsWith('#slide-')) {
        const parsed = parseInt(hash.replace('#slide-', ''), 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < totalSlides) {
          currentIndex = parsed;
        }
      }

      // Initialize
      setPresentationMode(true);
      goToSlide(currentIndex);

      // Button event listeners
      btnPrev.addEventListener('click', () => goToSlide(currentIndex - 1));
      btnNext.addEventListener('click', () => goToSlide(currentIndex + 1));
      
      slidePicker.addEventListener('change', (e) => {
        goToSlide(parseInt(e.target.value, 10));
      });

      btnToggleMode.addEventListener('click', () => {
        setPresentationMode(!isSlideMode);
      });

      btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });

      // Keyboard navigation
      window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;

        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          goToSlide(currentIndex + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          goToSlide(currentIndex - 1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          goToSlide(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          goToSlide(totalSlides - 1);
        } else if (e.key === 'f' || e.key === 'F') {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            if (document.exitFullscreen) document.exitFullscreen();
          }
        } else if (e.key === 'm' || e.key === 'M') {
          setPresentationMode(!isSlideMode);
        }
      });

      // Touch swipe gestures for mobile / tablets
      let touchStartX = 0;
      let touchEndX = 0;
      let touchStartY = 0;
      let touchEndY = 0;

      window.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      window.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      }, { passive: true });

      function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        // Check horizontal swipe dominates
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
          if (diffX < 0) {
            goToSlide(currentIndex + 1); // Swipe left = next
          } else {
            goToSlide(currentIndex - 1); // Swipe right = prev
          }
        }
      }

      // Observer in continuous mode to update counter
      const observer = new IntersectionObserver((entries) => {
        if (isSlideMode) return;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = parseInt(id.replace('slide-', ''), 10);
            if (!isNaN(idx)) {
              currentIndex = idx;
              updateUI();
            }
          }
        });
      }, { threshold: 0.4 });

      slides.forEach(s => observer.observe(s));
    })();
  </script>
</body>
</html>
`;

const htmlFilePath = path.resolve('assets/presentacion_ra1_cifp.html');
const pdfFilePath = path.resolve('Presentacion_RA1_CIFP_Carlos_III.pdf');

fs.writeFileSync(htmlFilePath, htmlContent);
console.log('Saved updated responsive HTML presentation at:', htmlFilePath);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser = fs.existsSync(chromePath) ? chromePath : edgePath;

// Try to regenerate PDF, handle file lock gracefully if user has it opened
try {
  const cmd = `"${browser}" --headless --disable-gpu --allow-file-access-from-files --no-pdf-header-footer --print-to-pdf="${pdfFilePath}" "file:///${htmlFilePath.replace(/\\/g, '/')}"`;
  console.log('Regenerating PDF...');
  execSync(cmd);
  console.log('SUCCESS! Regenerated PDF at:', pdfFilePath);
} catch (err) {
  console.warn('Could not overwrite PDF directly (likely open in viewer). Generating timestamped copy...');
  const altPdf = path.resolve('Presentacion_RA1_CIFP_Carlos_III_updated.pdf');
  const cmdAlt = `"${browser}" --headless --disable-gpu --allow-file-access-from-files --no-pdf-header-footer --print-to-pdf="${altPdf}" "file:///${htmlFilePath.replace(/\\/g, '/')}"`;
  try {
    execSync(cmdAlt);
    console.log('Saved updated PDF copy at:', altPdf);
  } catch (e2) {
    console.error('PDF export failed:', e2.message);
  }
}
