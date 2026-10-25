import {
  ADJUSTMENT_LABELS,
  buildCurveLut,
  cloneAdjustment,
  createDefaultAdjustment,
  type AdjustmentParams,
  type CurveChannel,
  type CurvePoint,
  type GradientStop,
  type Triple,
} from '../brush/adjustments';
import type { LayerManager } from '../brush/layers';

let openPanel: { el: HTMLElement; close: () => void } | null = null;

type Updater = (next: AdjustmentParams) => void;

function makeSlider(
  label: string,
  min: number,
  max: number,
  step: number,
  value: number,
  onInput: (v: number) => void,
  fmt: (v: number) => string = (v) => String(Math.round(v * 100) / 100),
): { row: HTMLElement; set: (v: number) => void } {
  const row = document.createElement('label');
  row.className = 'adj-row';
  const name = document.createElement('span');
  name.className = 'adj-label';
  name.textContent = label;
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  const out = document.createElement('span');
  out.className = 'adj-value';
  out.textContent = fmt(value);
  input.addEventListener('input', () => {
    const v = Number(input.value);
    out.textContent = fmt(v);
    onInput(v);
  });
  input.addEventListener('dblclick', () => {
    // Doble clic: valor neutro (centro del rango o 1 para gamma)
    const neutral = min < 0 ? 0 : min === 0.1 ? 1 : value;
    input.value = String(neutral);
    out.textContent = fmt(neutral);
    onInput(neutral);
  });
  row.append(name, input, out);
  return {
    row,
    set: (v: number) => {
      input.value = String(v);
      out.textContent = fmt(v);
    },
  };
}

function section(title: string): HTMLElement {
  const h = document.createElement('div');
  h.className = 'adj-section';
  h.textContent = title;
  return h;
}

function buildBrightnessContrast(p: Extract<AdjustmentParams, { kind: 'brightness-contrast' }>, up: Updater): HTMLElement[] {
  const cur = { ...p };
  return [
    makeSlider('Brillo', -100, 100, 1, cur.brightness, (v) => {
      cur.brightness = v;
      up({ ...cur });
    }).row,
    makeSlider('Contraste', -100, 100, 1, cur.contrast, (v) => {
      cur.contrast = v;
      up({ ...cur });
    }).row,
  ];
}

function buildLevels(p: Extract<AdjustmentParams, { kind: 'levels' }>, up: Updater): HTMLElement[] {
  const cur = { ...p };
  const mk = (label: string, key: 'inBlack' | 'inWhite' | 'outBlack' | 'outWhite', min: number, max: number) =>
    makeSlider(label, min, max, 1, cur[key], (v) => {
      cur[key] = v;
      up({ ...cur });
    }).row;
  return [
    section('Entrada'),
    mk('Negro', 'inBlack', 0, 254),
    makeSlider(
      'Gamma',
      0.1,
      3,
      0.01,
      cur.gamma,
      (v) => {
        cur.gamma = v;
        up({ ...cur });
      },
      (v) => v.toFixed(2),
    ).row,
    mk('Blanco', 'inWhite', 1, 255),
    section('Salida'),
    mk('Negro', 'outBlack', 0, 255),
    mk('Blanco', 'outWhite', 0, 255),
  ];
}

function buildHsl(p: Extract<AdjustmentParams, { kind: 'hsl' }>, up: Updater): HTMLElement[] {
  const cur = { ...p };
  return [
    makeSlider('Tono', -180, 180, 1, cur.hue, (v) => {
      cur.hue = v;
      up({ ...cur });
    }, (v) => `${Math.round(v)}°`).row,
    makeSlider('Saturación', -100, 100, 1, cur.saturation, (v) => {
      cur.saturation = v;
      up({ ...cur });
    }).row,
    makeSlider('Luminosidad', -100, 100, 1, cur.lightness, (v) => {
      cur.lightness = v;
      up({ ...cur });
    }).row,
  ];
}

function buildColorBalance(p: Extract<AdjustmentParams, { kind: 'color-balance' }>, up: Updater): HTMLElement[] {
  const cur = {
    ...p,
    shadows: [...p.shadows] as Triple,
    midtones: [...p.midtones] as Triple,
    highlights: [...p.highlights] as Triple,
  };
  const out: HTMLElement[] = [];
  const zones: [string, 'shadows' | 'midtones' | 'highlights'][] = [
    ['Sombras', 'shadows'],
    ['Medios tonos', 'midtones'],
    ['Luces', 'highlights'],
  ];
  const axes = ['Cian ↔ Rojo', 'Magenta ↔ Verde', 'Amarillo ↔ Azul'];
  for (const [title, key] of zones) {
    out.push(section(title));
    for (let c = 0; c < 3; c++) {
      out.push(
        makeSlider(axes[c], -100, 100, 1, cur[key][c], (v) => {
          cur[key][c] = v;
          up({
            kind: 'color-balance',
            shadows: [...cur.shadows] as Triple,
            midtones: [...cur.midtones] as Triple,
            highlights: [...cur.highlights] as Triple,
          });
        }).row,
      );
    }
  }
  return out;
}

function buildCurves(p: Extract<AdjustmentParams, { kind: 'curves' }>, up: Updater): HTMLElement[] {
  const cur = cloneAdjustment(p) as Extract<AdjustmentParams, { kind: 'curves' }>;
  let channel: CurveChannel = 'rgb';
  const SIZE = 220;

  const tabs = document.createElement('div');
  tabs.className = 'adj-tabs';
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  canvas.className = 'adj-curve-canvas';
  const ctx = canvas.getContext('2d')!;

  const colors: Record<CurveChannel, string> = { rgb: '#e2e8f0', r: '#f87171', g: '#4ade80', b: '#60a5fa' };
  const labels: Record<CurveChannel, string> = { rgb: 'RGB', r: 'R', g: 'G', b: 'B' };

  const toPx = (pt: CurvePoint) => ({ x: (pt.x / 255) * SIZE, y: SIZE - (pt.y / 255) * SIZE });

  function draw(): void {
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = '#14161a';
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      const g = (SIZE / 4) * i;
      ctx.beginPath();
      ctx.moveTo(g, 0);
      ctx.lineTo(g, SIZE);
      ctx.moveTo(0, g);
      ctx.lineTo(SIZE, g);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.moveTo(0, SIZE);
    ctx.lineTo(SIZE, 0);
    ctx.stroke();

    const pts = cur.channels[channel];
    const lut = buildCurveLut(pts);
    ctx.strokeStyle = colors[channel];
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < 256; x++) {
      const px = (x / 255) * SIZE;
      const py = SIZE - (lut[x] / 255) * SIZE;
      if (x === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    for (const pt of pts) {
      const { x, y } = toPx(pt);
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = colors[channel];
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  for (const ch of ['rgb', 'r', 'g', 'b'] as CurveChannel[]) {
    const b = document.createElement('button');
    b.className = 'adj-tab';
    b.textContent = labels[ch];
    b.style.color = colors[ch];
    b.addEventListener('click', () => {
      channel = ch;
      tabs.querySelectorAll('.adj-tab').forEach((t) => t.classList.remove('active'));
      b.classList.add('active');
      draw();
    });
    if (ch === 'rgb') b.classList.add('active');
    tabs.appendChild(b);
  }

  const emit = (): void => up(cloneAdjustment(cur));

  let dragIdx = -1;
  const eventPt = (e: PointerEvent): CurvePoint => {
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 255;
    const y = 255 - ((e.clientY - r.top) / r.height) * 255;
    return { x: Math.max(0, Math.min(255, Math.round(x))), y: Math.max(0, Math.min(255, Math.round(y))) };
  };
  const hit = (e: PointerEvent): number => {
    const r = canvas.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * SIZE;
    const my = ((e.clientY - r.top) / r.height) * SIZE;
    const pts = cur.channels[channel];
    for (let i = 0; i < pts.length; i++) {
      const { x, y } = toPx(pts[i]);
      if (Math.hypot(mx - x, my - y) <= 9) return i;
    }
    return -1;
  };

  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    const pts = cur.channels[channel];
    let idx = hit(e);
    if (e.button === 2) {
      if (idx >= 0 && pts.length > 2) {
        pts.splice(idx, 1);
        draw();
        emit();
      }
      return;
    }
    if (idx < 0) {
      const np = eventPt(e);
      if (pts.some((q) => q.x === np.x)) return;
      pts.push(np);
      pts.sort((a, b) => a.x - b.x);
      idx = pts.indexOf(np);
      emit();
    }
    dragIdx = idx;
    canvas.setPointerCapture(e.pointerId);
    draw();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (dragIdx < 0) return;
    const pts = cur.channels[channel];
    const np = eventPt(e);
    const prev = pts[dragIdx - 1];
    const next = pts[dragIdx + 1];
    const minX = prev ? prev.x + 1 : 0;
    const maxX = next ? next.x - 1 : 255;
    pts[dragIdx] = { x: Math.max(minX, Math.min(maxX, np.x)), y: np.y };
    draw();
    emit();
  });
  const end = (e: PointerEvent): void => {
    dragIdx = -1;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  const hint = document.createElement('div');
  hint.className = 'adj-hint';
  hint.textContent = 'Clic: añadir punto · Arrastrar: mover · Clic derecho: borrar punto';

  const resetBtn = document.createElement('button');
  resetBtn.className = 'adj-btn';
  resetBtn.textContent = 'Restablecer canal';
  resetBtn.addEventListener('click', () => {
    cur.channels[channel] = [
      { x: 0, y: 0 },
      { x: 255, y: 255 },
    ];
    draw();
    emit();
  });

  draw();
  return [tabs, canvas, hint, resetBtn];
}

const GRADIENT_PRESETS: { name: string; stops: GradientStop[] }[] = [
  { name: 'B/N', stops: [{ pos: 0, color: '#000000' }, { pos: 1, color: '#ffffff' }] },
  { name: 'Sepia', stops: [{ pos: 0, color: '#2b1a0e' }, { pos: 0.55, color: '#a9743f' }, { pos: 1, color: '#f6e7c8' }] },
  { name: 'Azul → Naranja', stops: [{ pos: 0, color: '#0b1d4a' }, { pos: 0.5, color: '#7a8fb8' }, { pos: 1, color: '#ffb35c' }] },
  { name: 'Manga cian', stops: [{ pos: 0, color: '#06222e' }, { pos: 1, color: '#e6fbff' }] },
  { name: 'Fuego', stops: [{ pos: 0, color: '#000000' }, { pos: 0.4, color: '#b3171f' }, { pos: 0.75, color: '#ffa31a' }, { pos: 1, color: '#fff7c2' }] },
];

function buildGradientMap(p: Extract<AdjustmentParams, { kind: 'gradient-map' }>, up: Updater): HTMLElement[] {
  const cur = cloneAdjustment(p) as Extract<AdjustmentParams, { kind: 'gradient-map' }>;
  const wrap = document.createElement('div');
  wrap.className = 'adj-gradient';
  const bar = document.createElement('canvas');
  bar.width = 240;
  bar.height = 18;
  bar.className = 'adj-gradient-bar';
  const list = document.createElement('div');
  list.className = 'adj-stop-list';

  const emit = (): void => up(cloneAdjustment(cur));

  function drawBar(): void {
    const c = bar.getContext('2d')!;
    const g = c.createLinearGradient(0, 0, bar.width, 0);
    for (const s of [...cur.stops].sort((a, b) => a.pos - b.pos)) {
      g.addColorStop(Math.max(0, Math.min(1, s.pos)), s.color);
    }
    c.fillStyle = g;
    c.fillRect(0, 0, bar.width, bar.height);
  }

  function renderList(): void {
    list.innerHTML = '';
    cur.stops.forEach((s, i) => {
      const row = document.createElement('div');
      row.className = 'adj-stop';
      const color = document.createElement('input');
      color.type = 'color';
      color.value = s.color;
      color.addEventListener('input', () => {
        s.color = color.value;
        drawBar();
        emit();
      });
      const pos = document.createElement('input');
      pos.type = 'range';
      pos.min = '0';
      pos.max = '100';
      pos.value = String(Math.round(s.pos * 100));
      const posOut = document.createElement('span');
      posOut.className = 'adj-value';
      posOut.textContent = `${Math.round(s.pos * 100)}%`;
      pos.addEventListener('input', () => {
        s.pos = Number(pos.value) / 100;
        posOut.textContent = `${pos.value}%`;
        drawBar();
        emit();
      });
      const del = document.createElement('button');
      del.className = 'adj-btn adj-btn-small';
      del.textContent = '✕';
      del.title = 'Quitar parada';
      del.disabled = cur.stops.length <= 2;
      del.addEventListener('click', () => {
        cur.stops.splice(i, 1);
        renderList();
        drawBar();
        emit();
      });
      row.append(color, pos, posOut, del);
      list.appendChild(row);
    });
  }

  const addBtn = document.createElement('button');
  addBtn.className = 'adj-btn';
  addBtn.textContent = '+ Añadir parada';
  addBtn.addEventListener('click', () => {
    cur.stops.push({ pos: 0.5, color: '#808080' });
    renderList();
    drawBar();
    emit();
  });

  const presets = document.createElement('select');
  presets.className = 'adj-select';
  presets.innerHTML = `<option value="">Preajustes…</option>${GRADIENT_PRESETS.map((g, i) => `<option value="${i}">${g.name}</option>`).join('')}`;
  presets.addEventListener('change', () => {
    if (presets.value === '') return;
    cur.stops = JSON.parse(JSON.stringify(GRADIENT_PRESETS[Number(presets.value)].stops));
    presets.value = '';
    renderList();
    drawBar();
    emit();
  });

  wrap.append(bar, presets, list, addBtn);
  drawBar();
  renderList();
  return [wrap];
}

export function closeAdjustmentEditor(): void {
  openPanel?.close();
}

/**
 * Abre el editor flotante de una capa de ajuste. Los cambios se aplican en vivo.
 */
export function openAdjustmentEditor(layerManager: LayerManager, layerId: string): void {
  const node = layerManager.layers.find((l) => l.id === layerId);
  if (!node || node.type !== 'adjustment' || !node.adjustment) return;

  closeAdjustmentEditor();

  const panel = document.createElement('div');
  panel.className = 'adj-panel';
  panel.addEventListener('pointerdown', (e) => e.stopPropagation());
  panel.addEventListener('keydown', (e) => e.stopPropagation());

  const header = document.createElement('div');
  header.className = 'adj-header';
  const title = document.createElement('span');
  title.textContent = `⚙ ${ADJUSTMENT_LABELS[node.adjustment.kind]}`;
  const closeBtn = document.createElement('button');
  closeBtn.className = 'adj-close';
  closeBtn.textContent = '✕';
  header.append(title, closeBtn);

  const body = document.createElement('div');
  body.className = 'adj-body';

  const footer = document.createElement('div');
  footer.className = 'adj-footer';
  const resetBtn = document.createElement('button');
  resetBtn.className = 'adj-btn';
  resetBtn.textContent = 'Restablecer';
  const doneBtn = document.createElement('button');
  doneBtn.className = 'adj-btn adj-btn-primary';
  doneBtn.textContent = 'Listo';
  footer.append(resetBtn, doneBtn);

  panel.append(header, body, footer);
  document.body.appendChild(panel);

  const update: Updater = (next) => layerManager.setAdjustment(layerId, next);

  function renderBody(): void {
    body.innerHTML = '';
    const current = layerManager.layers.find((l) => l.id === layerId)?.adjustment;
    if (!current) return;
    let controls: HTMLElement[] = [];
    switch (current.kind) {
      case 'brightness-contrast':
        controls = buildBrightnessContrast(current, update);
        break;
      case 'levels':
        controls = buildLevels(current, update);
        break;
      case 'hsl':
        controls = buildHsl(current, update);
        break;
      case 'color-balance':
        controls = buildColorBalance(current, update);
        break;
      case 'curves':
        controls = buildCurves(current, update);
        break;
      case 'gradient-map':
        controls = buildGradientMap(current, update);
        break;
      case 'invert': {
        const msg = document.createElement('div');
        msg.className = 'adj-hint';
        msg.textContent = 'Invierte los colores de todo lo que hay debajo. Sin parámetros.';
        controls = [msg];
        break;
      }
    }
    body.append(...controls);

    // Opacidad de la capa de ajuste (intensidad)
    const live = layerManager.layers.find((l) => l.id === layerId);
    if (live) {
      body.append(
        section('Intensidad'),
        makeSlider('Opacidad', 0, 100, 1, Math.round(live.opacity * 100), (v) => {
          layerManager.setLayerOpacity(layerId, v / 100);
        }, (v) => `${Math.round(v)}%`).row,
      );
    }
  }

  renderBody();

  // Posicionar a la izquierda del panel de capas
  panel.style.right = 'calc(var(--right-dock-width, 250px) + 12px)';
  panel.style.top = '60px';

  // Arrastrar por la cabecera
  let dragging = false;
  let ox = 0;
  let oy = 0;
  header.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('.adj-close')) return;
    dragging = true;
    const r = panel.getBoundingClientRect();
    ox = e.clientX - r.left;
    oy = e.clientY - r.top;
    header.setPointerCapture(e.pointerId);
  });
  header.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    panel.style.right = 'auto';
    panel.style.left = `${Math.max(0, e.clientX - ox)}px`;
    panel.style.top = `${Math.max(0, e.clientY - oy)}px`;
  });
  header.addEventListener('pointerup', () => {
    dragging = false;
  });

  const unsub = layerManager.subscribe(() => {
    // Si la capa fue eliminada, cerrar.
    if (!layerManager.layers.some((l) => l.id === layerId)) close();
  });

  function close(): void {
    unsub();
    panel.remove();
    if (openPanel?.el === panel) openPanel = null;
  }

  resetBtn.addEventListener('click', () => {
    layerManager.setAdjustment(layerId, createDefaultAdjustment(node!.adjustment!.kind));
    renderBody();
  });
  closeBtn.addEventListener('click', close);
  doneBtn.addEventListener('click', close);

  openPanel = { el: panel, close };
}
