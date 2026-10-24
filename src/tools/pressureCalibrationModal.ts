import {
  evaluatePressure,
  GAMMA_MAX,
  GAMMA_MIN,
  type PressureCurveMode,
  type PressureCurveSettings,
} from '../brush/pressureResponse';
import {
  getTabletSettings,
  setTabletSettings,
  type TabletSettings,
} from './toolState';

let activeCalibrationModal: HTMLElement | null = null;

export function closePressureCalibrationModal(): void {
  if (activeCalibrationModal) {
    activeCalibrationModal.remove();
    activeCalibrationModal = null;
  }
}

/**
 * Interactive Pen Pressure Calibration Modal
 *
 * Allows digital artists to draw naturally on a live test canvas. The system
 * samples the physical hand force, renders the live Bézier/Gamma transfer curve,
 * visualizes the real-time input pressure point, and computes the optimal
 * response gamma for their specific hand pressure.
 */
export function openPressureCalibrationModal(): void {
  closePressureCalibrationModal();

  const initialSettings = getTabletSettings();
  let currentMode: PressureCurveMode = initialSettings.pressure.mode;
  let currentGamma = initialSettings.pressure.gamma;
  let currentTiltEnabled = initialSettings.tiltEnabled;

  const samples: number[] = [];
  let maxSample = 0;
  let liveInputPressure = 0;
  let liveOutputPressure = 0;

  const backdrop = document.createElement('div');
  backdrop.className = 'csp-modal-backdrop';
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePressureCalibrationModal();
  });

  const win = document.createElement('div');
  win.className = 'csp-calibration-window';

  // 1. Header
  const header = document.createElement('div');
  header.className = 'csp-calibration-header';
  header.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
      </svg>
      <span>Ajustar nivel de detección de presión del lápiz (Tableta)</span>
    </div>
    <button class="csp-subtool-action-btn" id="calib-close-btn" title="Cerrar (Esc)">✕</button>
  `;
  header.querySelector('#calib-close-btn')?.addEventListener('click', closePressureCalibrationModal);
  win.appendChild(header);

  // 2. Banner Instruction
  const banner = document.createElement('div');
  banner.className = 'csp-calibration-banner';
  banner.textContent =
    'Trace con su lápiz óptico en el lienzo de prueba con su presión habitual, variando de trazos suaves a trazos firmes para calibrar la sensibilidad exacta de su mano.';
  win.appendChild(banner);

  // 3. Body: Two columns (Left: Test Canvas, Right: 2D Curve Graph & Controls)
  const body = document.createElement('div');
  body.className = 'csp-calibration-body';

  // --- Left Column: Test Canvas ---
  const leftCol = document.createElement('div');
  leftCol.className = 'csp-calibration-left';

  const testCanvasHeader = document.createElement('div');
  testCanvasHeader.className = 'csp-calib-sec-header';
  testCanvasHeader.innerHTML = `
    <span>Lienzo de prueba interactivo</span>
    <button class="csp-calib-btn-subtle" id="calib-clear-canvas" title="Limpiar lienzo">↺ Limpiar</button>
  `;
  leftCol.appendChild(testCanvasHeader);

  const testCanvasWrap = document.createElement('div');
  testCanvasWrap.className = 'csp-test-canvas-wrap';

  const testCanvas = document.createElement('canvas');
  testCanvas.width = 340;
  testCanvas.height = 290;
  testCanvas.className = 'csp-test-canvas';
  testCanvasWrap.appendChild(testCanvas);

  const hintOverlay = document.createElement('div');
  hintOverlay.className = 'csp-test-canvas-hint';
  hintOverlay.textContent = 'Trace líneas aquí con su lápiz digital...';
  testCanvasWrap.appendChild(hintOverlay);

  leftCol.appendChild(testCanvasWrap);

  // --- Right Column: Graph & Calibration Controls ---
  const rightCol = document.createElement('div');
  rightCol.className = 'csp-calibration-right';

  const graphHeader = document.createElement('div');
  graphHeader.className = 'csp-calib-sec-header';
  graphHeader.innerHTML = `<span>Curva de respuesta a la presión</span>`;
  rightCol.appendChild(graphHeader);

  const graphCanvasWrap = document.createElement('div');
  graphCanvasWrap.className = 'csp-graph-canvas-wrap';

  const graphCanvas = document.createElement('canvas');
  graphCanvas.width = 280;
  graphCanvas.height = 160;
  graphCanvas.className = 'csp-graph-canvas';
  graphCanvasWrap.appendChild(graphCanvas);
  rightCol.appendChild(graphCanvasWrap);

  // Live Metrics Bar
  const metricsBar = document.createElement('div');
  metricsBar.className = 'csp-calib-metrics';
  metricsBar.innerHTML = `
    <div class="metric-item">
      <span class="m-label">Entrada:</span>
      <span class="m-val" id="m-in">0%</span>
    </div>
    <div class="metric-item">
      <span class="m-label">Salida:</span>
      <span class="m-val" id="m-out">0%</span>
    </div>
    <div class="metric-item">
      <span class="m-label">Máx reg.:</span>
      <span class="m-val" id="m-max">0%</span>
    </div>
    <div class="metric-item">
      <span class="m-label">Muestras:</span>
      <span class="m-val" id="m-count">0</span>
    </div>
  `;
  rightCol.appendChild(metricsBar);

  // Preset Buttons Group
  const presetsWrap = document.createElement('div');
  presetsWrap.className = 'csp-calib-presets-row';
  presetsWrap.innerHTML = `
    <span class="presets-title">Preajustes:</span>
    <div class="preset-buttons">
      <button class="csp-preset-btn" id="btn-p-soft" title="Curva blanda: líneas gruesas con menos esfuerzo">Suave (0.70)</button>
      <button class="csp-preset-btn" id="btn-p-linear" title="Curva lineal 1:1">Lineal (1.00)</button>
      <button class="csp-preset-btn" id="btn-p-hard" title="Curva firme: exige mayor fuerza, ideal para líneas finas">Firme (1.45)</button>
      <button class="csp-preset-btn highlight" id="btn-p-auto" title="Calcula el Gamma óptimo a partir de los trazos de prueba">✨ Auto-Calibrar</button>
    </div>
  `;
  rightCol.appendChild(presetsWrap);

  // Fine Gamma Slider
  const gammaRow = document.createElement('div');
  gammaRow.className = 'csp-calib-slider-row';
  gammaRow.innerHTML = `
    <div class="prop-row-header">
      <span class="prop-label">Ajuste fino de Gamma (Dureza):</span>
      <span class="prop-value" id="gamma-val-label">${currentGamma.toFixed(2)}</span>
    </div>
  `;
  const gammaSlider = document.createElement('input');
  gammaSlider.type = 'range';
  gammaSlider.className = 'csp-slider';
  gammaSlider.min = String(GAMMA_MIN);
  gammaSlider.max = String(GAMMA_MAX);
  gammaSlider.step = '0.05';
  gammaSlider.value = String(currentGamma);
  gammaRow.appendChild(gammaSlider);
  rightCol.appendChild(gammaRow);

  // Tilt Toggle
  const tiltRow = document.createElement('div');
  tiltRow.className = 'csp-toggle-row';
  tiltRow.style.marginTop = '6px';
  const tiltChk = document.createElement('input');
  tiltChk.type = 'checkbox';
  tiltChk.className = 'csp-checkbox';
  tiltChk.id = 'calib-tilt-chk';
  tiltChk.checked = currentTiltEnabled;
  const tiltLbl = document.createElement('label');
  tiltLbl.className = 'csp-check-label';
  tiltLbl.htmlFor = 'calib-tilt-chk';
  tiltLbl.textContent = 'Habilitar detección de inclinación física del lápiz (Tilt)';
  tiltRow.append(tiltChk, tiltLbl);
  rightCol.appendChild(tiltRow);

  body.append(leftCol, rightCol);
  win.appendChild(body);

  // 4. Footer Buttons
  const footer = document.createElement('div');
  footer.className = 'csp-calibration-footer';
  footer.innerHTML = `
    <button class="csp-btn-secondary" id="calib-btn-reset">Restablecer valores de fábrica</button>
    <div style="display:flex;gap:8px;">
      <button class="csp-btn-secondary" id="calib-btn-cancel">Cancelar</button>
      <button class="csp-btn-primary" id="calib-btn-apply">Aceptar y Aplicar</button>
    </div>
  `;
  win.appendChild(footer);
  backdrop.appendChild(win);
  document.body.appendChild(backdrop);
  activeCalibrationModal = backdrop;

  // --- Graph Drawing Logic ---
  const gCtx = graphCanvas.getContext('2d')!;

  function drawCurveGraph(): void {
    const w = graphCanvas.width;
    const h = graphCanvas.height;
    const pad = 24;
    const gw = w - pad * 2;
    const gh = h - pad * 2;

    gCtx.clearRect(0, 0, w, h);

    // Background & Border
    gCtx.fillStyle = '#141619';
    gCtx.fillRect(0, 0, w, h);

    // Grid lines (25%, 50%, 75%)
    gCtx.strokeStyle = '#232730';
    gCtx.lineWidth = 1;
    for (let f = 0.25; f <= 0.75; f += 0.25) {
      // Horizontal
      const y = h - pad - f * gh;
      gCtx.beginPath();
      gCtx.moveTo(pad, y);
      gCtx.lineTo(w - pad, y);
      gCtx.stroke();
      // Vertical
      const x = pad + f * gw;
      gCtx.beginPath();
      gCtx.moveTo(x, pad);
      gCtx.lineTo(x, h - pad);
      gCtx.stroke();
    }

    // Axes
    gCtx.strokeStyle = '#475569';
    gCtx.lineWidth = 1.5;
    gCtx.beginPath();
    gCtx.moveTo(pad, pad);
    gCtx.lineTo(pad, h - pad);
    gCtx.lineTo(w - pad, h - pad);
    gCtx.stroke();

    // Diagonal reference line (1:1 linear)
    gCtx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    gCtx.setLineDash([3, 3]);
    gCtx.beginPath();
    gCtx.moveTo(pad, h - pad);
    gCtx.lineTo(w - pad, pad);
    gCtx.stroke();
    gCtx.setLineDash([]);

    // Transfer curve
    const settings: PressureCurveSettings = { mode: currentMode, gamma: currentGamma };
    gCtx.strokeStyle = '#38bdf8';
    gCtx.lineWidth = 2.5;
    gCtx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const inVal = i / 60;
      const outVal = evaluatePressure(inVal, settings);
      const px = pad + inVal * gw;
      const py = h - pad - outVal * gh;
      if (i === 0) gCtx.moveTo(px, py);
      else gCtx.lineTo(px, py);
    }
    gCtx.stroke();

    // Axis labels
    gCtx.fillStyle = '#94a3b8';
    gCtx.font = '9px sans-serif';
    gCtx.fillText('0%', pad - 6, h - 8);
    gCtx.fillText('100% (Entrada)', w - pad - 65, h - 8);
    gCtx.fillText('100% (Trazo)', pad - 2, pad - 8);

    // Live Pressure Indicator dot on curve
    if (liveInputPressure > 0.001) {
      const ix = pad + Math.min(1, liveInputPressure) * gw;
      const iy = h - pad - Math.min(1, liveOutputPressure) * gh;

      // Vertical & horizontal guide line
      gCtx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      gCtx.lineWidth = 1;
      gCtx.beginPath();
      gCtx.moveTo(ix, h - pad);
      gCtx.lineTo(ix, iy);
      gCtx.lineTo(pad, iy);
      gCtx.stroke();

      // Glowing dot
      gCtx.fillStyle = '#f43f5e';
      gCtx.beginPath();
      gCtx.arc(ix, iy, 4.5, 0, Math.PI * 2);
      gCtx.fill();
      gCtx.strokeStyle = '#ffffff';
      gCtx.lineWidth = 1.5;
      gCtx.stroke();
    }
  }

  drawCurveGraph();

  // --- Test Canvas Drawing Logic ---
  const tCtx = testCanvas.getContext('2d')!;

  function clearTestCanvas(): void {
    tCtx.fillStyle = '#f8fafc';
    tCtx.fillRect(0, 0, testCanvas.width, testCanvas.height);

    // Subtle grid lines
    tCtx.strokeStyle = '#e2e8f0';
    tCtx.lineWidth = 1;
    for (let x = 20; x < testCanvas.width; x += 20) {
      tCtx.beginPath();
      tCtx.moveTo(x, 0);
      tCtx.lineTo(x, testCanvas.height);
      tCtx.stroke();
    }
    for (let y = 20; y < testCanvas.height; y += 20) {
      tCtx.beginPath();
      tCtx.moveTo(0, y);
      tCtx.lineTo(testCanvas.width, y);
      tCtx.stroke();
    }
    hintOverlay.style.display = samples.length === 0 ? 'block' : 'none';
  }

  clearTestCanvas();

  let isDrawing = false;
  let lastTestX = 0;
  let lastTestY = 0;
  let lastTestP = 0;

  function updateMetricsUI(): void {
    const inEl = rightCol.querySelector('#m-in');
    const outEl = rightCol.querySelector('#m-out');
    const maxEl = rightCol.querySelector('#m-max');
    const countEl = rightCol.querySelector('#m-count');
    if (inEl) inEl.textContent = `${Math.round(liveInputPressure * 100)}%`;
    if (outEl) outEl.textContent = `${Math.round(liveOutputPressure * 100)}%`;
    if (maxEl) maxEl.textContent = `${Math.round(maxSample * 100)}%`;
    if (countEl) countEl.textContent = String(samples.length);
  }

  function handleTestPointer(rawX: number, rawY: number, rawPressure: number): void {
    const rect = testCanvas.getBoundingClientRect();
    const x = rawX - rect.left;
    const y = rawY - rect.top;

    const raw = typeof rawPressure === 'number' ? Math.max(0, Math.min(1, rawPressure)) : 0.5;
    const settings: PressureCurveSettings = { mode: currentMode, gamma: currentGamma };
    const effectiveP = evaluatePressure(raw, settings);

    liveInputPressure = raw;
    liveOutputPressure = effectiveP;

    if (raw > 0.02) {
      samples.push(raw);
      if (raw > maxSample) maxSample = raw;
    }

    if (isDrawing) {
      const dx = x - lastTestX;
      const dy = y - lastTestY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(dist / 1.5));

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const curX = lastTestX + dx * t;
        const curY = lastTestY + dy * t;
        const curP = lastTestP + (effectiveP - lastTestP) * t;

        // Dynamic diameter from 0.8px up to 18px based on effective pressure
        const diameter = Math.max(0.8, 18 * Math.pow(curP, 1.25));
        tCtx.save();
        tCtx.fillStyle = '#0f172a';
        tCtx.beginPath();
        tCtx.arc(curX, curY, diameter / 2, 0, Math.PI * 2);
        tCtx.fill();
        tCtx.restore();
      }
    }

    lastTestX = x;
    lastTestY = y;
    lastTestP = effectiveP;

    hintOverlay.style.display = 'none';
    updateMetricsUI();
    drawCurveGraph();
  }

  testCanvas.addEventListener('pointerdown', (e) => {
    isDrawing = true;
    testCanvas.setPointerCapture(e.pointerId);
    const rect = testCanvas.getBoundingClientRect();
    lastTestX = e.clientX - rect.left;
    lastTestY = e.clientY - rect.top;
    const raw = e.pointerType === 'pen' ? (e.pressure > 0 ? e.pressure : 0.08) : 0.5;
    lastTestP = evaluatePressure(raw, { mode: currentMode, gamma: currentGamma });
    handleTestPointer(e.clientX, e.clientY, raw);
  });

  testCanvas.addEventListener('pointermove', (e) => {
    if (!isDrawing) return;
    const coalesced = (e as PointerEvent & { getCoalescedEvents?: () => PointerEvent[] }).getCoalescedEvents?.() ?? [e];
    for (const sample of coalesced) {
      const raw = sample.pointerType === 'pen' ? sample.pressure : 0.5;
      handleTestPointer(sample.clientX, sample.clientY, raw);
    }
  });

  const onTestPointerUp = (e: PointerEvent) => {
    if (!isDrawing) return;
    isDrawing = false;
    try {
      testCanvas.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    liveInputPressure = 0;
    liveOutputPressure = 0;
    drawCurveGraph();
    updateMetricsUI();
  };

  testCanvas.addEventListener('pointerup', onTestPointerUp);
  testCanvas.addEventListener('pointercancel', onTestPointerUp);

  // Clear Canvas Button
  header.querySelector('#calib-clear-canvas')?.addEventListener('click', () => {
    clearTestCanvas();
  });
  leftCol.querySelector('#calib-clear-canvas')?.addEventListener('click', () => {
    clearTestCanvas();
  });

  // Preset Handlers
  function updatePresetButtonsUI(): void {
    const btnSoft = rightCol.querySelector('#btn-p-soft');
    const btnLin = rightCol.querySelector('#btn-p-linear');
    const btnHard = rightCol.querySelector('#btn-p-hard');
    btnSoft?.classList.toggle('active', currentMode === 'soft' || Math.abs(currentGamma - 0.7) < 0.03);
    btnLin?.classList.toggle('active', currentMode === 'linear' || Math.abs(currentGamma - 1.0) < 0.03);
    btnHard?.classList.toggle('active', currentMode === 'hard' || Math.abs(currentGamma - 1.45) < 0.03);

    gammaSlider.value = String(currentGamma);
    const gLabel = rightCol.querySelector('#gamma-val-label');
    if (gLabel) gLabel.textContent = currentGamma.toFixed(2);
    drawCurveGraph();
  }

  rightCol.querySelector('#btn-p-soft')?.addEventListener('click', () => {
    currentMode = 'soft';
    currentGamma = 0.7;
    updatePresetButtonsUI();
  });

  rightCol.querySelector('#btn-p-linear')?.addEventListener('click', () => {
    currentMode = 'linear';
    currentGamma = 1.0;
    updatePresetButtonsUI();
  });

  rightCol.querySelector('#btn-p-hard')?.addEventListener('click', () => {
    currentMode = 'hard';
    currentGamma = 1.45;
    updatePresetButtonsUI();
  });

  // Auto-Calibrate from hand test strokes
  rightCol.querySelector('#btn-p-auto')?.addEventListener('click', () => {
    if (samples.length < 8) {
      alert('Trace primero varios trazos en el lienzo de prueba con su lápiz para calibrar automáticamente.');
      return;
    }
    // Calculate median/average of recorded user pressures
    const sorted = [...samples].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)] || 0.45;
    // Map user's natural medium force to output 0.50:
    // median^gamma = 0.50 => gamma = ln(0.50) / ln(median)
    let autoGamma = Math.log(0.5) / Math.log(Math.max(0.08, Math.min(0.92, median)));
    autoGamma = Math.round(Math.max(GAMMA_MIN, Math.min(GAMMA_MAX, autoGamma)) * 20) / 20;

    currentMode = 'custom';
    currentGamma = autoGamma;
    updatePresetButtonsUI();
  });

  // Slider Input
  gammaSlider.addEventListener('input', () => {
    currentMode = 'custom';
    currentGamma = Number(gammaSlider.value);
    updatePresetButtonsUI();
  });

  // Tilt Checkbox
  tiltChk.addEventListener('change', () => {
    currentTiltEnabled = tiltChk.checked;
  });

  // Reset to factory
  footer.querySelector('#calib-btn-reset')?.addEventListener('click', () => {
    currentMode = 'linear';
    currentGamma = 1.0;
    currentTiltEnabled = false;
    tiltChk.checked = false;
    samples.length = 0;
    maxSample = 0;
    updateMetricsUI();
    clearTestCanvas();
    updatePresetButtonsUI();
  });

  // Cancel
  footer.querySelector('#calib-btn-cancel')?.addEventListener('click', closePressureCalibrationModal);

  // Apply and Persist
  footer.querySelector('#calib-btn-apply')?.addEventListener('click', () => {
    const updated: Partial<TabletSettings> = {
      pressure: {
        mode: currentMode,
        gamma: currentGamma,
      },
      tiltEnabled: currentTiltEnabled,
    };
    setTabletSettings(updated);
    closePressureCalibrationModal();
  });

  updatePresetButtonsUI();
}
