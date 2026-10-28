import type { TimelineManager } from './timelineManager';
import type {
  BezierHandle,
  CameraKeyframeCurves,
  TangentMode,
  TransformKeyframeCurves,
} from './timelineModel';
import {
  computeAutoTangents,
  CurvePoint,
  CurvePreset,
  evaluateCurvePoints,
  getCameraChannelPoints,
  getTrackChannelPoints,
} from './fCurveEvaluator';

export interface ChannelDef {
  key: string;
  name: string;
  color: string;
  unit: string;
  defaultVal: number;
}

const TRACK_CHANNELS: ChannelDef[] = [
  { key: 'x', name: 'Posición X', color: '#f43f5e', unit: 'px', defaultVal: 0 },
  { key: 'y', name: 'Posición Y', color: '#10b981', unit: 'px', defaultVal: 0 },
  { key: 'rotation', name: 'Rotación', color: '#3b82f6', unit: '°', defaultVal: 0 },
  { key: 'scaleX', name: 'Escala X', color: '#f59e0b', unit: 'x', defaultVal: 1 },
  { key: 'scaleY', name: 'Escala Y', color: '#ec4899', unit: 'x', defaultVal: 1 },
  { key: 'opacity', name: 'Opacidad', color: '#a855f7', unit: '', defaultVal: 1 },
];

const CAMERA_CHANNELS: ChannelDef[] = [
  { key: 'x', name: 'Cámara Pan X', color: '#ef4444', unit: 'px', defaultVal: 0 },
  { key: 'y', name: 'Cámara Pan Y', color: '#22c55e', unit: 'px', defaultVal: 0 },
  { key: 'zoom', name: 'Cámara Zoom', color: '#eab308', unit: 'x', defaultVal: 1 },
  { key: 'rotation', name: 'Cámara Rotación', color: '#06b6d4', unit: '°', defaultVal: 0 },
];

export class FCurveView {
  private timeline: TimelineManager;
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  // View state
  private activeTarget: 'track' | 'camera' = 'track';
  private selectedTrackId: string | null = null;
  private selectedChannelKey: string = 'x';
  private visibleChannels = new Set<string>(['x', 'y', 'rotation', 'scaleX', 'scaleY', 'opacity', 'zoom']);

  // Pan & Zoom in Graph Space
  private zoomX = 24; // Pixels per frame
  private zoomY = 1.0; // Pixels per value unit
  private panX = 60; // Pixels from canvas left to frame 0
  private panY = 0; // Pixels from canvas center to value 0

  // Selection
  private selectedPoint: { channel: string; frame: number } | null = null;
  private draggingTarget:
    | { type: 'point'; channel: string; frame: number; origFrame: number; origVal: number; startX: number; startY: number }
    | { type: 'inTangent' | 'outTangent'; channel: string; frame: number; startX: number; startY: number }
    | { type: 'pan'; startX: number; startY: number; origPanX: number; origPanY: number }
    | { type: 'playhead'; startX: number }
    | null = null;

  private sidebarEl!: HTMLElement;
  private toolbarEl!: HTMLElement;
  private unsubscribeTimeline: (() => void) | null = null;

  constructor(timeline: TimelineManager) {
    this.timeline = timeline;

    this.container = document.createElement('div');
    this.container.className = 'fcurve-editor-container';

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'fcurve-canvas';
    this.ctx = this.canvas.getContext('2d', { alpha: false })!;

    this.initDOM();
    this.initEvents();

    this.unsubscribeTimeline = (this.timeline as any).subscribe?.(() => {
      this.render();
    }) ?? null;
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public setTarget(target: 'track' | 'camera', trackId?: string): void {
    this.activeTarget = target;
    if (trackId) this.selectedTrackId = trackId;
    else if (!this.selectedTrackId && this.timeline.tracks.length > 0) {
      this.selectedTrackId = this.timeline.tracks[0].id;
    }
    this.selectedChannelKey = target === 'camera' ? 'x' : 'x';
    this.updateSidebar();
    this.fitView();
  }

  private initDOM(): void {
    // Top Toolbar
    this.toolbarEl = document.createElement('div');
    this.toolbarEl.className = 'fcurve-toolbar';
    this.buildToolbar();

    // Main workspace: Left Sidebar + Center Canvas
    const workspace = document.createElement('div');
    workspace.className = 'fcurve-workspace';

    this.sidebarEl = document.createElement('div');
    this.sidebarEl.className = 'fcurve-sidebar';

    const canvasWrapper = document.createElement('div');
    canvasWrapper.className = 'fcurve-canvas-wrapper';
    canvasWrapper.appendChild(this.canvas);

    workspace.appendChild(this.sidebarEl);
    workspace.appendChild(canvasWrapper);

    this.container.appendChild(this.toolbarEl);
    this.container.appendChild(workspace);

    this.updateSidebar();
  }

  private buildToolbar(): void {
    this.toolbarEl.innerHTML = '';

    // Target Selector
    const targetSelect = document.createElement('select');
    targetSelect.className = 'timeline-select fcurve-target-select';
    this.populateTargetSelect(targetSelect);
    targetSelect.addEventListener('change', () => {
      if (targetSelect.value === '__camera__') {
        this.setTarget('camera');
      } else {
        this.setTarget('track', targetSelect.value);
      }
    });
    this.toolbarEl.appendChild(targetSelect);

    const sep1 = document.createElement('div');
    sep1.className = 'timeline-separator';
    this.toolbarEl.appendChild(sep1);

    // Tangent Modes
    const tangentModes: { mode: TangentMode; label: string; icon: string }[] = [
      { mode: 'auto', label: 'Suavizado Automático (Auto Smooth)', icon: '∿' },
      { mode: 'aligned', label: 'Tiradores Alineados (Aligned)', icon: '☍' },
      { mode: 'free', label: 'Tiradores Libres (Free / Sharp)', icon: '∠' },
      { mode: 'linear', label: 'Lineal (Vector)', icon: '⤢' },
    ];

    tangentModes.forEach(({ mode, label, icon }) => {
      const btn = document.createElement('button');
      btn.className = 'timeline-btn fcurve-tangent-btn';
      btn.title = label;
      btn.innerHTML = `<span style="font-size:13px;font-weight:bold;">${icon}</span> <span style="font-size:11px;">${mode}</span>`;
      btn.addEventListener('click', () => {
        this.applyTangentModeToSelected(mode);
      });
      this.toolbarEl.appendChild(btn);
    });

    const sep2 = document.createElement('div');
    sep2.className = 'timeline-separator';
    this.toolbarEl.appendChild(sep2);

    // Presets Dropdown
    const presetLabel = document.createElement('span');
    presetLabel.className = 'fcurve-toolbar-label';
    presetLabel.textContent = 'Curva:';
    this.toolbarEl.appendChild(presetLabel);

    const presetSelect = document.createElement('select');
    presetSelect.className = 'timeline-select fcurve-preset-select';
    presetSelect.innerHTML = `
      <option value="">⚙️ Preajuste de Aceleración...</option>
      <option value="ease-in-out">✦ Ease In-Out (Suave simétrico)</option>
      <option value="ease-in">▶ Ease In (Aceleración)</option>
      <option value="ease-out">◀ Ease Out (Desaceleración)</option>
      <option value="anticipate">↩ Anticipación (Dip inicial)</option>
      <option value="bounce">↺ Rebote (Overshoot)</option>
      <option value="linear">╱ Lineal estricto</option>
      <option value="smooth">~ Auto Catmull-Rom</option>
    `;
    presetSelect.addEventListener('change', () => {
      const val = presetSelect.value as CurvePreset;
      if (val) {
        this.applyPresetToSelected(val);
        presetSelect.value = '';
      }
    });
    this.toolbarEl.appendChild(presetSelect);

    const sep3 = document.createElement('div');
    sep3.className = 'timeline-separator';
    this.toolbarEl.appendChild(sep3);

    // Fit View Button
    const fitBtn = document.createElement('button');
    fitBtn.className = 'timeline-btn icon-only';
    fitBtn.title = 'Ajustar Curvas a la Pantalla (Atajo: F)';
    fitBtn.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
      </svg>
    `;
    fitBtn.addEventListener('click', () => this.fitView());
    this.toolbarEl.appendChild(fitBtn);

    // Delete Keyframe Button
    const delBtn = document.createElement('button');
    delBtn.className = 'timeline-btn icon-only';
    delBtn.title = 'Eliminar Keyframe seleccionado (Supr / Delete)';
    delBtn.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      </svg>
    `;
    delBtn.addEventListener('click', () => this.deleteSelectedKeyframe());
    this.toolbarEl.appendChild(delBtn);
  }

  private populateTargetSelect(select: HTMLSelectElement): void {
    select.innerHTML = '';
    const tracks = this.timeline.tracks;

    const optGroupLayers = document.createElement('optgroup');
    optGroupLayers.label = 'Pistas de Dibujo / Animación';
    tracks.forEach((tr) => {
      const opt = document.createElement('option');
      opt.value = tr.id;
      opt.textContent = `${tr.name} ${tr.keyframesEnabled ? '◆' : ''}`;
      if (this.activeTarget === 'track' && tr.id === this.selectedTrackId) {
        opt.selected = true;
      }
      optGroupLayers.appendChild(opt);
    });
    select.appendChild(optGroupLayers);

    const optGroupCamera = document.createElement('optgroup');
    optGroupCamera.label = 'Cinemática & Encuadre';
    const camOpt = document.createElement('option');
    camOpt.value = '__camera__';
    camOpt.textContent = `🎥 Cámara de Escena ${this.timeline.cameraKeyframesEnabled ? '◆' : ''}`;
    if (this.activeTarget === 'camera') camOpt.selected = true;
    optGroupCamera.appendChild(camOpt);
    select.appendChild(optGroupCamera);
  }

  private updateSidebar(): void {
    this.sidebarEl.innerHTML = '';

    const channels = this.activeTarget === 'camera' ? CAMERA_CHANNELS : TRACK_CHANNELS;

    const title = document.createElement('div');
    title.className = 'fcurve-sidebar-title';
    title.textContent = this.activeTarget === 'camera' ? '🎥 Canales Cámara' : '🎨 Canales de Capa';
    this.sidebarEl.appendChild(title);

    channels.forEach((ch) => {
      const row = document.createElement('div');
      row.className = `fcurve-channel-row ${this.selectedChannelKey === ch.key ? 'active' : ''}`;

      // Visibility Checkbox
      const chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.className = 'fcurve-channel-checkbox';
      chk.checked = this.visibleChannels.has(ch.key);
      chk.addEventListener('change', (e) => {
        e.stopPropagation();
        if (chk.checked) this.visibleChannels.add(ch.key);
        else this.visibleChannels.delete(ch.key);
        this.render();
      });

      // Color Badge
      const badge = document.createElement('span');
      badge.className = 'fcurve-channel-badge';
      badge.style.backgroundColor = ch.color;

      // Name & Value
      const label = document.createElement('span');
      label.className = 'fcurve-channel-name';
      label.textContent = ch.name;

      const valSpan = document.createElement('span');
      valSpan.className = 'fcurve-channel-value';
      valSpan.textContent = this.getFormattedChannelValue(ch.key);

      row.append(chk, badge, label, valSpan);

      row.addEventListener('click', () => {
        this.selectedChannelKey = ch.key;
        this.visibleChannels.add(ch.key);
        chk.checked = true;
        this.updateSidebar();
        this.render();
      });

      this.sidebarEl.appendChild(row);
    });
  }

  private getFormattedChannelValue(channelKey: string): string {
    const curFrame = this.timeline.settings.currentFrame;
    if (this.activeTarget === 'camera') {
      const cam = this.timeline.getInterpolatedCameraTransform(curFrame);
      const val = (cam as any)[channelKey] ?? 0;
      return channelKey === 'zoom' ? `${val.toFixed(2)}x` : Math.round(val).toString();
    } else {
      if (!this.selectedTrackId) return '-';
      const tr = this.timeline.tracks.find((t) => t.id === this.selectedTrackId);
      if (!tr) return '-';
      const transform = this.timeline.getInterpolatedTransform(tr.id, curFrame);
      const val = (transform as any)[channelKey] ?? 0;
      if (channelKey === 'opacity') return `${Math.round(val * 100)}%`;
      if (channelKey.startsWith('scale')) return `${val.toFixed(2)}x`;
      return Math.round(val).toString();
    }
  }

  private initEvents(): void {
    // Resize Observer
    const ro = new ResizeObserver(() => {
      this.resizeCanvas();
      this.render();
    });
    ro.observe(this.canvas);

    // Pointer Events on Canvas
    this.canvas.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));

    // Wheel Pan & Zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      if (e.ctrlKey) {
        // Zoom both or Y
        const factor = e.deltaY < 0 ? 1.15 : 0.85;
        this.zoomY = Math.max(0.05, Math.min(20, this.zoomY * factor));
      } else if (e.shiftKey) {
        // Pan X
        this.panX -= e.deltaY * 0.5;
      } else {
        // Zoom X focused on mouse frame
        const frameAtMouse = (mouseX - this.panX) / this.zoomX;
        const factor = e.deltaY < 0 ? 1.12 : 0.88;
        this.zoomX = Math.max(4, Math.min(100, this.zoomX * factor));
        this.panX = mouseX - frameAtMouse * this.zoomX;
      }
      this.render();
    });

    // Double Click to Insert Keyframe
    this.canvas.addEventListener('dblclick', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const f = Math.round((x - this.panX) / this.zoomX);
      const val = -(y - (this.canvas.height / 2 + this.panY)) / this.zoomY;
      this.insertKeyframeAt(f, val);
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (!this.container.isConnected || this.container.offsetParent === null) return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        this.deleteSelectedKeyframe();
      } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.altKey) {
        this.fitView();
      }
    });
  }

  private resizeCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    const w = this.canvas.clientWidth || 800;
    const h = this.canvas.clientHeight || 400;
    if (this.canvas.width !== Math.round(w * dpr) || this.canvas.height !== Math.round(h * dpr)) {
      this.canvas.width = Math.round(w * dpr);
      this.canvas.height = Math.round(h * dpr);
      this.ctx.scale(dpr, dpr);
    }
  }

  /**
   * Fits graph view so that all keyframes and their values comfortably fill the canvas
   */
  public fitView(): void {
    const points = this.getAllActiveCurvePoints();
    const w = this.canvas.clientWidth || 800;
    const h = this.canvas.clientHeight || 400;

    if (points.length === 0) {
      this.panX = 70;
      this.panY = 0;
      this.zoomX = 24;
      this.zoomY = 1.0;
      this.render();
      return;
    }

    let minF = Infinity;
    let maxF = -Infinity;
    let minV = Infinity;
    let maxV = -Infinity;

    points.forEach((p) => {
      if (p.frame < minF) minF = p.frame;
      if (p.frame > maxF) maxF = p.frame;
      if (p.value < minV) minV = p.value;
      if (p.value > maxV) maxV = p.value;
    });

    const dF = Math.max(5, maxF - minF);
    const dV = Math.max(10, maxV - minV);

    this.zoomX = Math.max(8, Math.min(80, (w - 140) / dF));
    this.zoomY = Math.max(0.1, Math.min(10, (h - 120) / dV));

    this.panX = 70 - minF * this.zoomX;
    const midV = (minV + maxV) / 2;
    this.panY = midV * this.zoomY;

    this.render();
  }

  // --- Coordinate conversions ---
  private frameToX(frame: number): number {
    return this.panX + frame * this.zoomX;
  }

  private xToFrame(x: number): number {
    return (x - this.panX) / this.zoomX;
  }

  private valueToY(val: number): number {
    const centerY = (this.canvas.clientHeight || 400) / 2;
    return centerY + this.panY - val * this.zoomY;
  }

  private yToValue(y: number): number {
    const centerY = (this.canvas.clientHeight || 400) / 2;
    return -(y - centerY - this.panY) / this.zoomY;
  }

  // --- Rendering ---
  public render(): void {
    if (!this.ctx) return;
    const w = this.canvas.clientWidth || 800;
    const h = this.canvas.clientHeight || 400;
    const centerY = h / 2 + this.panY;

    // Clear background
    this.ctx.fillStyle = '#0f1117';
    this.ctx.fillRect(0, 0, w, h);

    // 1. Grid & Rulers
    this.renderGrid(w, h, centerY);

    // 2. Playhead & Range
    this.renderPlayhead(w, h);

    // 3. Curves
    const channels = this.activeTarget === 'camera' ? CAMERA_CHANNELS : TRACK_CHANNELS;
    channels.forEach((ch) => {
      if (!this.visibleChannels.has(ch.key)) return;
      const pts = this.getChannelPoints(ch.key);
      const isSelectedChannel = this.selectedChannelKey === ch.key;
      this.renderChannelCurve(pts, ch.color, isSelectedChannel);
    });

    // 4. Handles and Points for Selected Keyframe
    this.renderSelectedHandles();

    // 5. Y-Axis Value Labels on Left
    this.renderYAxisLabels(w, h, centerY);
  }

  private renderGrid(w: number, h: number, centerY: number): void {
    this.ctx.save();

    // Horizontal Zero line
    this.ctx.strokeStyle = '#2d3748';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(0, centerY);
    this.ctx.lineTo(w, centerY);
    this.ctx.stroke();

    // Frame grid vertical lines
    const minF = Math.floor(this.xToFrame(0));
    const maxF = Math.ceil(this.xToFrame(w));
    const stepF = this.zoomX > 30 ? 1 : this.zoomX > 15 ? 2 : 5;

    this.ctx.font = '10px Inter, system-ui, sans-serif';
    this.ctx.fillStyle = '#64748b';

    for (let f = minF; f <= maxF; f++) {
      if (f % stepF === 0) {
        const x = this.frameToX(f);
        this.ctx.strokeStyle = f === 0 ? '#475569' : '#1e293b';
        this.ctx.lineWidth = f === 0 ? 1.5 : 0.8;
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, h);
        this.ctx.stroke();

        // Frame number label at bottom
        this.ctx.fillText(`${f}`, x + 3, h - 6);
      }
    }

    this.ctx.restore();
  }

  private renderPlayhead(_w: number, h: number): void {
    const curFrame = this.timeline.settings.currentFrame;
    const x = this.frameToX(curFrame);

    this.ctx.save();
    // Playhead line
    this.ctx.strokeStyle = '#ef4444';
    this.ctx.lineWidth = 1.8;
    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    this.ctx.lineTo(x, h);
    this.ctx.stroke();

    // Playhead head marker
    this.ctx.fillStyle = '#ef4444';
    this.ctx.beginPath();
    this.ctx.moveTo(x - 6, 0);
    this.ctx.lineTo(x + 6, 0);
    this.ctx.lineTo(x, 10);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  private renderChannelCurve(points: CurvePoint[], color: string, isSelected: boolean): void {
    if (points.length === 0) return;

    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = isSelected ? 2.5 : 1.2;
    this.ctx.globalAlpha = isSelected ? 1.0 : 0.5;

    // Draw continuous curve line across the visible domain
    const minF = Math.max(points[0].frame, Math.floor(this.xToFrame(0)) - 1);
    const maxF = Math.min(points[points.length - 1].frame, Math.ceil(this.xToFrame(this.canvas.clientWidth || 800)) + 1);

    this.ctx.beginPath();
    let started = false;

    // Subsample 8 points per frame for silk-smooth curve
    const stepsPerFrame = 6;
    for (let f = minF; f <= maxF; f += 1 / stepsPerFrame) {
      const val = evaluateCurvePoints(points, f);
      const x = this.frameToX(f);
      const y = this.valueToY(val);

      if (!started) {
        this.ctx.moveTo(x, y);
        started = true;
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.stroke();

    // Draw Keyframe Diamonds / Circles
    points.forEach((p) => {
      const px = this.frameToX(p.frame);
      const py = this.valueToY(p.value);
      const isSelectedPoint =
        this.selectedPoint?.channel === this.selectedChannelKey &&
        this.selectedPoint?.frame === p.frame &&
        isSelected;

      this.ctx.beginPath();
      this.ctx.arc(px, py, isSelectedPoint ? 6 : 4, 0, Math.PI * 2);
      this.ctx.fillStyle = isSelectedPoint ? '#ffffff' : color;
      this.ctx.fill();
      this.ctx.strokeStyle = '#0f1117';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
    });

    this.ctx.restore();
  }

  private renderSelectedHandles(): void {
    if (!this.selectedPoint) return;
    const pts = this.getChannelPoints(this.selectedPoint.channel);
    const pt = pts.find((p) => p.frame === this.selectedPoint!.frame);
    if (!pt) return;

    const px = this.frameToX(pt.frame);
    const py = this.valueToY(pt.value);

    const inH = pt.inTangent || { frameOffset: -2, valueOffset: 0 };
    const outH = pt.outTangent || { frameOffset: 2, valueOffset: 0 };

    const inX = this.frameToX(pt.frame + inH.frameOffset);
    const inY = this.valueToY(pt.value + inH.valueOffset);

    const outX = this.frameToX(pt.frame + outH.frameOffset);
    const outY = this.valueToY(pt.value + outH.valueOffset);

    this.ctx.save();

    // In Tangent Line & Handle
    this.ctx.strokeStyle = '#38bdf8';
    this.ctx.lineWidth = 1.2;
    this.ctx.beginPath();
    this.ctx.moveTo(px, py);
    this.ctx.lineTo(inX, inY);
    this.ctx.stroke();

    this.ctx.fillStyle = '#38bdf8';
    this.ctx.beginPath();
    this.ctx.arc(inX, inY, 5, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = '#0f1117';
    this.ctx.stroke();

    // Out Tangent Line & Handle
    this.ctx.strokeStyle = '#38bdf8';
    this.ctx.beginPath();
    this.ctx.moveTo(px, py);
    this.ctx.lineTo(outX, outY);
    this.ctx.stroke();

    this.ctx.fillStyle = '#38bdf8';
    this.ctx.beginPath();
    this.ctx.arc(outX, outY, 5, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.restore();
  }

  private renderYAxisLabels(_w: number, h: number, _centerY: number): void {
    this.ctx.save();
    this.ctx.fillStyle = '#0f1117ee';
    this.ctx.fillRect(0, 0, 50, h);

    this.ctx.strokeStyle = '#334155';
    this.ctx.beginPath();
    this.ctx.moveTo(50, 0);
    this.ctx.lineTo(50, h);
    this.ctx.stroke();

    this.ctx.font = '10px Inter, system-ui, sans-serif';
    this.ctx.fillStyle = '#94a3b8';

    const stepVal = this.zoomY > 5 ? 1 : this.zoomY > 1 ? 5 : this.zoomY > 0.3 ? 20 : 50;
    const minVal = Math.floor(this.yToValue(h));
    const maxVal = Math.ceil(this.yToValue(0));

    for (let v = minVal; v <= maxVal; v++) {
      if (v % stepVal === 0) {
        const y = this.valueToY(v);
        this.ctx.fillText(`${v}`, 6, y + 3);
      }
    }
    this.ctx.restore();
  }

  // --- Interaction Handlers ---
  private onPointerDown(e: PointerEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // 1. Playhead drag check near top or on playhead line
    const curX = this.frameToX(this.timeline.settings.currentFrame);
    if (Math.abs(mx - curX) < 10) {
      this.draggingTarget = { type: 'playhead', startX: mx };
      return;
    }

    // 2. Tangent handles hit test for selected point
    if (this.selectedPoint) {
      const pts = this.getChannelPoints(this.selectedPoint.channel);
      const pt = pts.find((p) => p.frame === this.selectedPoint!.frame);
      if (pt) {
        const inH = pt.inTangent || { frameOffset: -2, valueOffset: 0 };
        const outH = pt.outTangent || { frameOffset: 2, valueOffset: 0 };
        const inX = this.frameToX(pt.frame + inH.frameOffset);
        const inY = this.valueToY(pt.value + inH.valueOffset);
        const outX = this.frameToX(pt.frame + outH.frameOffset);
        const outY = this.valueToY(pt.value + outH.valueOffset);

        if (Math.hypot(mx - inX, my - inY) < 10) {
          this.draggingTarget = {
            type: 'inTangent',
            channel: this.selectedPoint.channel,
            frame: pt.frame,
            startX: mx,
            startY: my,
          };
          return;
        }

        if (Math.hypot(mx - outX, my - outY) < 10) {
          this.draggingTarget = {
            type: 'outTangent',
            channel: this.selectedPoint.channel,
            frame: pt.frame,
            startX: mx,
            startY: my,
          };
          return;
        }
      }
    }

    // 3. Keyframe points hit test
    const pts = this.getChannelPoints(this.selectedChannelKey);
    for (const p of pts) {
      const px = this.frameToX(p.frame);
      const py = this.valueToY(p.value);
      if (Math.hypot(mx - px, my - py) < 10) {
        this.selectedPoint = { channel: this.selectedChannelKey, frame: p.frame };
        this.draggingTarget = {
          type: 'point',
          channel: this.selectedChannelKey,
          frame: p.frame,
          origFrame: p.frame,
          origVal: p.value,
          startX: mx,
          startY: my,
        };
        this.render();
        return;
      }
    }

    // 4. Fallback: Middle-click or canvas Pan
    if (e.button === 1 || e.altKey || e.button === 0) {
      this.draggingTarget = {
        type: 'pan',
        startX: mx,
        startY: my,
        origPanX: this.panX,
        origPanY: this.panY,
      };
    }
  }

  private onPointerMove(e: PointerEvent): void {
    if (!this.draggingTarget) return;
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (this.draggingTarget.type === 'playhead') {
      const f = Math.round(this.xToFrame(mx));
      this.timeline.goToFrame(f);
      return;
    }

    if (this.draggingTarget.type === 'pan') {
      this.panX = this.draggingTarget.origPanX + (mx - this.draggingTarget.startX);
      this.panY = this.draggingTarget.origPanY + (my - this.draggingTarget.startY);
      this.render();
      return;
    }

    if (this.draggingTarget.type === 'point') {
      const newFrame = Math.round(this.xToFrame(mx));
      const newVal = this.yToValue(my);
      this.updatePointValue(this.draggingTarget.channel, this.draggingTarget.frame, newFrame, newVal);
      return;
    }

    if (this.draggingTarget.type === 'inTangent' || this.draggingTarget.type === 'outTangent') {
      const ptFrame = this.draggingTarget.frame;
      const pts = this.getChannelPoints(this.draggingTarget.channel);
      const pt = pts.find((p) => p.frame === ptFrame);
      if (!pt) return;

      const basePx = this.frameToX(pt.frame);
      const basePy = this.valueToY(pt.value);

      const dFrame = (mx - basePx) / this.zoomX;
      const dVal = -(my - basePy) / this.zoomY;

      if (this.draggingTarget.type === 'inTangent') {
        const inTangent: BezierHandle = { frameOffset: Math.min(-0.1, dFrame), valueOffset: dVal };
        let outTangent = pt.outTangent;
        if (pt.tangentMode === 'aligned' || pt.tangentMode === 'auto') {
          // Align opposite handle
          outTangent = { frameOffset: -inTangent.frameOffset, valueOffset: -inTangent.valueOffset };
        }
        this.saveTangents(this.draggingTarget.channel, ptFrame, inTangent, outTangent);
      } else {
        const outTangent: BezierHandle = { frameOffset: Math.max(0.1, dFrame), valueOffset: dVal };
        let inTangent = pt.inTangent;
        if (pt.tangentMode === 'aligned' || pt.tangentMode === 'auto') {
          inTangent = { frameOffset: -outTangent.frameOffset, valueOffset: -outTangent.valueOffset };
        }
        this.saveTangents(this.draggingTarget.channel, ptFrame, inTangent, outTangent);
      }
      this.render();
    }
  }

  private onPointerUp(_e: PointerEvent): void {
    if (this.draggingTarget) {
      this.draggingTarget = null;
      this.updateSidebar();
      this.render();
    }
  }

  private insertKeyframeAt(frame: number, val: number): void {
    const ch = this.selectedChannelKey;
    if (this.activeTarget === 'camera') {
      this.timeline.addOrUpdateCameraKeyframe(frame, { [ch]: val });
    } else if (this.selectedTrackId) {
      this.timeline.addOrUpdateKeyframe(this.selectedTrackId, frame, { [ch]: val });
    }
    this.selectedPoint = { channel: ch, frame };
    this.updateSidebar();
    this.render();
  }

  private deleteSelectedKeyframe(): void {
    if (!this.selectedPoint) return;
    const f = this.selectedPoint.frame;
    if (this.activeTarget === 'camera') {
      this.timeline.deleteCameraKeyframe(f);
    } else if (this.selectedTrackId) {
      this.timeline.deleteKeyframe(this.selectedTrackId, f);
    }
    this.selectedPoint = null;
    this.updateSidebar();
    this.render();
  }

  private updatePointValue(channel: string, oldFrame: number, newFrame: number, newVal: number): void {
    if (this.activeTarget === 'camera') {
      if (oldFrame !== newFrame) {
        this.timeline.moveCameraKeyframe(oldFrame, newFrame);
      }
      this.timeline.addOrUpdateCameraKeyframe(newFrame, { [channel]: newVal });
    } else if (this.selectedTrackId) {
      if (oldFrame !== newFrame) {
        this.timeline.moveKeyframe(this.selectedTrackId, oldFrame, newFrame);
      }
      this.timeline.addOrUpdateKeyframe(this.selectedTrackId, newFrame, { [channel]: newVal });
    }
    this.selectedPoint = { channel, frame: newFrame };
    if (this.draggingTarget && this.draggingTarget.type === 'point') {
      this.draggingTarget.frame = newFrame;
    }
    this.render();
  }

  private saveTangents(
    channel: string,
    frame: number,
    inTangent?: BezierHandle,
    outTangent?: BezierHandle,
    mode: TangentMode = 'aligned'
  ): void {
    if (this.activeTarget === 'camera') {
      this.timeline.setCameraChannelTangents(
        frame,
        channel as keyof CameraKeyframeCurves,
        inTangent,
        outTangent,
        mode
      );
    } else if (this.selectedTrackId) {
      this.timeline.setTrackChannelTangents(
        this.selectedTrackId,
        frame,
        channel as keyof TransformKeyframeCurves,
        inTangent,
        outTangent,
        mode
      );
    }
  }

  private applyTangentModeToSelected(mode: TangentMode): void {
    if (!this.selectedPoint) return;
    const ch = this.selectedPoint.channel;
    const f = this.selectedPoint.frame;
    const pts = this.getChannelPoints(ch);
    const idx = pts.findIndex((p) => p.frame === f);
    if (idx === -1) return;

    if (mode === 'auto') {
      const prev = idx > 0 ? pts[idx - 1] : null;
      const curr = pts[idx];
      const next = idx < pts.length - 1 ? pts[idx + 1] : null;
      const { inTangent, outTangent } = computeAutoTangents(prev, curr, next);
      this.saveTangents(ch, f, inTangent, outTangent, 'auto');
    } else {
      this.saveTangents(ch, f, undefined, undefined, mode);
    }
    this.render();
  }

  private applyPresetToSelected(preset: CurvePreset): void {
    const pts = this.getChannelPoints(this.selectedChannelKey);
    if (pts.length < 2) return;

    let k0Frame = pts[0].frame;
    let k1Frame = pts[1].frame;

    if (this.selectedPoint) {
      const idx = pts.findIndex((p) => p.frame === this.selectedPoint!.frame);
      if (idx !== -1 && idx < pts.length - 1) {
        k0Frame = pts[idx].frame;
        k1Frame = pts[idx + 1].frame;
      } else if (idx > 0) {
        k0Frame = pts[idx - 1].frame;
        k1Frame = pts[idx].frame;
      }
    }

    const target = this.activeTarget === 'camera' ? 'camera' : (this.selectedTrackId || 'camera');
    this.timeline.applyCurvePreset(target, this.selectedChannelKey, k0Frame, k1Frame, preset);
    this.render();
  }

  private getChannelPoints(channelKey: string): CurvePoint[] {
    if (this.activeTarget === 'camera') {
      const kfs = Array.from(this.timeline.cameraKeyframes.values());
      return getCameraChannelPoints(kfs, channelKey as any);
    } else {
      if (!this.selectedTrackId) return [];
      const tr = this.timeline.tracks.find((t) => t.id === this.selectedTrackId);
      if (!tr) return [];
      const kfs = Array.from(tr.keyframes.values());
      return getTrackChannelPoints(kfs, channelKey as any);
    }
  }

  private getAllActiveCurvePoints(): CurvePoint[] {
    const channels = this.activeTarget === 'camera' ? CAMERA_CHANNELS : TRACK_CHANNELS;
    const all: CurvePoint[] = [];
    channels.forEach((ch) => {
      if (this.visibleChannels.has(ch.key)) {
        all.push(...this.getChannelPoints(ch.key));
      }
    });
    return all;
  }

  public destroy(): void {
    if (this.unsubscribeTimeline) {
      this.unsubscribeTimeline();
      this.unsubscribeTimeline = null;
    }
  }
}
