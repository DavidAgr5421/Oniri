import type { LayerManager } from '../brush/layers';
import type { BrushEngine } from '../brush/brushEngine';
import { isTransformModalLocked } from '../selection/transformModal';
import './timeline.css';
import type { TimelineManager } from './timelineManager';
import type { AnimationTrack, AudioClip, InterpolationType, TimeDisplayFormat } from './timelineModel';
import { openExportAnimationModal } from './exportAnimation';
import { timelineAudioManager } from './audioManager';

let cellWidth = 24;
const MIN_CELL_WIDTH = 10;
const MAX_CELL_WIDTH = 64;

function formatRulerTime(frame: number, fps: number, format: TimeDisplayFormat = 'frames'): string {
  if (format === 'frames') {
    return String(frame);
  }
  const zeroIdx = frame - 1;
  const sec = Math.floor(zeroIdx / fps);
  const remFrames = (zeroIdx % fps) + 1;
  if (format === 'sec_frames') {
    return `${sec}s+${remFrames}f`;
  }
  const mins = Math.floor(sec / 60);
  const secs = sec % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(remFrames - 1).padStart(2, '0')}`;
}

export function mountTimelineView(
  container: HTMLElement,
  timeline: TimelineManager,
  layerManager: LayerManager,
  engine?: BrushEngine
): void {
  container.innerHTML = '';

  const panel = document.createElement('div');
  panel.className = 'timeline-panel';
  panel.style.setProperty('--cell-width', `${cellWidth}px`);

  // Timeline Top Height Resizer
  const topResizer = document.createElement('div');
  topResizer.className = 'csp-timeline-height-resizer';
  topResizer.title = 'Arrastrar para cambiar la altura de la línea de tiempo';

  const savedTimelineH = localStorage.getItem('oniri.timeline.height');
  if (savedTimelineH) {
    const h = Math.max(90, Math.min(600, Number(savedTimelineH)));
    document.documentElement.style.setProperty('--timeline-height', `${h}px`);
  }

  let isDraggingTop = false;
  let startTopY = 0;
  let startTopH = 190;

  topResizer.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingTop = true;
    startTopY = e.clientY;
    startTopH = panel.offsetHeight;
    topResizer.classList.add('dragging');
    topResizer.setPointerCapture(e.pointerId);
  });

  topResizer.addEventListener('pointermove', (e) => {
    if (!isDraggingTop) return;
    const dy = e.clientY - startTopY;
    const newH = Math.max(90, Math.min(600, startTopH - dy));
    document.documentElement.style.setProperty('--timeline-height', `${newH}px`);
    localStorage.setItem('oniri.timeline.height', String(newH));
  });

  const stopTopDrag = (e: PointerEvent) => {
    if (!isDraggingTop) return;
    isDraggingTop = false;
    topResizer.classList.remove('dragging');
    try {
      topResizer.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };
  topResizer.addEventListener('pointerup', stopTopDrag);
  topResizer.addEventListener('pointercancel', stopTopDrag);
  panel.appendChild(topResizer);

  let selectedTrackId: string | null = timeline.tracks[0]?.id ?? null;
  let zoomSlider: HTMLInputElement | null = null;
  let zoomLabel: HTMLSpanElement | null = null;

  function getSelectedTrack(): AnimationTrack | undefined {
    const found = timeline.tracks.find((t) => t.id === selectedTrackId);
    if (found) return found;
    if (timeline.tracks.length > 0) {
      selectedTrackId = timeline.tracks[0].id;
      return timeline.tracks[0];
    }
    return undefined;
  }

  function setCellWidth(newWidth: number): void {
    cellWidth = Math.max(MIN_CELL_WIDTH, Math.min(MAX_CELL_WIDTH, Math.round(newWidth)));
    panel.style.setProperty('--cell-width', `${cellWidth}px`);
    if (zoomSlider) zoomSlider.value = String(cellWidth);
    if (zoomLabel) zoomLabel.textContent = `${cellWidth}px`;
    render();
  }

  // --- 1. Header & Transport Toolbar ---
  const header = document.createElement('div');
  header.className = 'timeline-header';

  // Left group: Transport & Scene Selector
  const transportGroup = document.createElement('div');
  transportGroup.className = 'timeline-transport-group';

  // Collapse / Expand Toggle
  const collapseBtn = document.createElement('button');
  collapseBtn.className = 'timeline-btn icon-only';
  collapseBtn.title = 'Minimizar / Expandir Línea de Tiempo';
  collapseBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `;
  collapseBtn.addEventListener('click', () => {
    panel.classList.toggle('collapsed');
    const isCol = panel.classList.contains('collapsed');
    collapseBtn.innerHTML = isCol
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`;
  });
  transportGroup.appendChild(collapseBtn);

  // --- Scene Selector (Multi-Animation Scenes System) ---
  const sceneGroup = document.createElement('div');
  sceneGroup.className = 'timeline-scene-group';

  const sceneSelect = document.createElement('select');
  sceneSelect.className = 'timeline-select scene-select';
  sceneSelect.title = 'Seleccionar Escena de Animación';
  sceneSelect.addEventListener('change', () => {
    timeline.switchScene(sceneSelect.value);
  });
  sceneGroup.appendChild(sceneSelect);

  // Single dedicated Scene Edit Button (Gestionar, Crear, Duplicar, Renombrar, Eliminar)
  const sceneEditBtn = document.createElement('button');
  sceneEditBtn.className = 'timeline-btn icon-only';
  sceneEditBtn.title = 'Edición de Escena (Gestionar, Crear nueva, Duplicar, Renombrar, Eliminar)';
  sceneEditBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <line x1="2" y1="9" x2="22" y2="9"/>
      <line x1="7" y1="4" x2="5" y2="9"/>
      <line x1="12" y1="4" x2="10" y2="9"/>
      <line x1="17" y1="4" x2="15" y2="9"/>
      <circle cx="12" cy="15" r="2"/>
    </svg>
  `;
  sceneEditBtn.addEventListener('click', () => {
    openSceneManagerModal(timeline);
  });
  sceneGroup.appendChild(sceneEditBtn);

  transportGroup.appendChild(sceneGroup);

  const sep0 = document.createElement('div');
  sep0.className = 'timeline-separator';
  transportGroup.appendChild(sep0);

  // Jump to First Frame
  const firstFrameBtn = document.createElement('button');
  firstFrameBtn.className = 'timeline-btn icon-only';
  firstFrameBtn.title = 'Primer fotograma (Shift+Izquierda)';
  firstFrameBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
    </svg>
  `;
  firstFrameBtn.addEventListener('click', () => timeline.firstFrame());
  transportGroup.appendChild(firstFrameBtn);

  // Previous Cel (Flip Key)
  const prevCelBtn = document.createElement('button');
  prevCelBtn.className = 'timeline-btn icon-only';
  prevCelBtn.title = 'Celda anterior (Atajo: [)';
  prevCelBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="5" width="2.5" height="14" rx="0.5"/>
      <polygon points="20 6 9 12 20 18"/>
    </svg>
  `;
  prevCelBtn.addEventListener('click', () => timeline.prevCel(selectedTrackId ?? undefined));
  transportGroup.appendChild(prevCelBtn);

  // Prev Frame
  const prevFrameBtn = document.createElement('button');
  prevFrameBtn.className = 'timeline-btn icon-only';
  prevFrameBtn.title = 'Fotograma anterior (Flecha Izquierda)';
  prevFrameBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  `;
  prevFrameBtn.addEventListener('click', () => timeline.prevFrame());
  transportGroup.appendChild(prevFrameBtn);

  // Play / Pause
  const playBtn = document.createElement('button');
  playBtn.className = 'timeline-btn play-btn icon-only';
  playBtn.title = 'Reproducir / Pausa (Enter)';
  playBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  `;
  playBtn.addEventListener('click', () => timeline.togglePlay());
  transportGroup.appendChild(playBtn);

  // Next Frame
  const nextFrameBtn = document.createElement('button');
  nextFrameBtn.className = 'timeline-btn icon-only';
  nextFrameBtn.title = 'Fotograma siguiente (Flecha Derecha)';
  nextFrameBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  `;
  nextFrameBtn.addEventListener('click', () => timeline.nextFrame());
  transportGroup.appendChild(nextFrameBtn);

  // Next Cel (Flip Key)
  const nextCelBtn = document.createElement('button');
  nextCelBtn.className = 'timeline-btn icon-only';
  nextCelBtn.title = 'Celda siguiente (Atajo: ])';
  nextCelBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="4 6 15 12 4 18"/>
      <rect x="17.5" y="5" width="2.5" height="14" rx="0.5"/>
    </svg>
  `;
  nextCelBtn.addEventListener('click', () => timeline.nextCel(selectedTrackId ?? undefined));
  transportGroup.appendChild(nextCelBtn);

  // Jump to Last Frame
  const lastFrameBtn = document.createElement('button');
  lastFrameBtn.className = 'timeline-btn icon-only';
  lastFrameBtn.title = 'Último fotograma (Shift+Derecha)';
  lastFrameBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
    </svg>
  `;
  lastFrameBtn.addEventListener('click', () => timeline.lastFrame());
  transportGroup.appendChild(lastFrameBtn);

  // Loop toggle
  const loopBtn = document.createElement('button');
  loopBtn.className = `timeline-btn icon-only ${timeline.settings.loop ? 'active' : ''}`;
  loopBtn.title = 'Repetir en bucle';
  loopBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  `;
  loopBtn.addEventListener('click', () => {
    timeline.setLoop(!timeline.settings.loop);
  });
  transportGroup.appendChild(loopBtn);

  const sep1 = document.createElement('div');
  sep1.className = 'timeline-separator';
  transportGroup.appendChild(sep1);

  // Frame Counter (clickable to open Timeline Settings Modal)
  const frameDisplay = document.createElement('button');
  frameDisplay.className = 'timeline-frame-counter';
  frameDisplay.title = 'Fotograma actual / Total. Clic para abrir Edición de Línea de Tiempo';
  frameDisplay.addEventListener('click', () => {
    openTimelineSettingsModal(timeline);
  });
  transportGroup.appendChild(frameDisplay);

  // Dedicated Timeline Settings Button
  const timelineEditBtn = document.createElement('button');
  timelineEditBtn.className = 'timeline-btn icon-only';
  timelineEditBtn.title = 'Edición de Línea de Tiempo (Cantidad de fotogramas, FPS, Rango In/Out, División)';
  timelineEditBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  `;
  timelineEditBtn.addEventListener('click', () => {
    openTimelineSettingsModal(timeline);
  });
  transportGroup.appendChild(timelineEditBtn);

  if (engine) {
    const exportAnimBtn = document.createElement('button');
    exportAnimBtn.className = 'timeline-btn icon-only';
    exportAnimBtn.title = 'Exportar Animación (GIF animado, Película MP4/WebM o Secuencia PNG)';
    exportAnimBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
        <line x1="7" y1="2" x2="7" y2="22"/>
        <line x1="17" y1="2" x2="17" y2="22"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
      </svg>
    `;
    exportAnimBtn.addEventListener('click', () => {
      openExportAnimationModal(engine, timeline);
    });
    transportGroup.appendChild(exportAnimBtn);
  }

  header.appendChild(transportGroup);

  // Right group: Track, Cel, Keyframe Actions & Onion Skin
  const actionsGroup = document.createElement('div');
  actionsGroup.className = 'timeline-actions-group';

  // Add Animation Track
  const addTrackBtn = document.createElement('button');
  addTrackBtn.className = 'timeline-btn icon-only';
  addTrackBtn.title = 'Nueva Carpeta de Animación (Pista)';
  addTrackBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <line x1="12" y1="11" x2="12" y2="17"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>
  `;
  addTrackBtn.addEventListener('click', () => {
    const tr = timeline.createTrack();
    selectedTrackId = tr.id;
    render();
  });
  actionsGroup.appendChild(addTrackBtn);

  // Add Audio Track
  const addAudioTrackBtn = document.createElement('button');
  addAudioTrackBtn.className = 'timeline-btn icon-only';
  addAudioTrackBtn.title = 'Nueva Pista de Audio (Sincronización sonora y Lip-Sync)';
  addAudioTrackBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  `;
  addAudioTrackBtn.addEventListener('click', () => {
    timeline.addAudioTrack();
    render();
  });
  actionsGroup.appendChild(addAudioTrackBtn);

  // Add Cel
  const addCelBtn = document.createElement('button');
  addCelBtn.className = 'timeline-btn icon-only';
  addCelBtn.title = 'Nueva Celda de Animación en el fotograma actual';
  addCelBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="12" x2="12" y2="18"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  `;
  addCelBtn.addEventListener('click', () => {
    const tr = getSelectedTrack();
    timeline.createCel(tr?.id, timeline.settings.currentFrame);
  });
  actionsGroup.appendChild(addCelBtn);

  // Delete Cel / Exposure at current frame
  const delCelBtn = document.createElement('button');
  delCelBtn.className = 'timeline-btn icon-only';
  delCelBtn.title = 'Eliminar especificación de celda en fotograma actual';
  delCelBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  `;
  delCelBtn.addEventListener('click', () => {
    const tr = getSelectedTrack();
    if (tr) {
      timeline.removeExposure(tr.id, timeline.settings.currentFrame);
    }
  });
  actionsGroup.appendChild(delCelBtn);

  // --- Keyframe Controls (Enable Keyframes + Add/Delete Keyframe + Interpolation) ---
  const sepKf = document.createElement('div');
  sepKf.className = 'timeline-separator';
  actionsGroup.appendChild(sepKf);

  const toggleKfModeBtn = document.createElement('button');
  toggleKfModeBtn.className = 'timeline-btn icon-only';
  toggleKfModeBtn.title = 'Activar / Desactivar fotogramas clave en esta pista';
  toggleKfModeBtn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffd43b" stroke-width="2.2">
      <polygon points="12 2 22 12 12 22 2 12 12 2"/>
    </svg>
  `;
  toggleKfModeBtn.addEventListener('click', () => {
    const tr = getSelectedTrack();
    if (tr) {
      timeline.toggleTrackKeyframes(tr.id);
    }
  });
  actionsGroup.appendChild(toggleKfModeBtn);

  const addKfBtn = document.createElement('button');
  addKfBtn.className = 'timeline-btn icon-only';
  addKfBtn.title = 'Añadir / Editar Keyframe en el fotograma actual (Atajo: K)';
  addKfBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffd43b" stroke="#ffd43b" stroke-width="1.5">
      <polygon points="12 3 21 12 12 21 3 12 12 3"/>
    </svg>
  `;
  addKfBtn.addEventListener('click', () => {
    const tr = getSelectedTrack();
    if (!tr) return;
    const f = timeline.settings.currentFrame;
    if (!tr.keyframes.has(f)) {
      timeline.addOrUpdateKeyframe(tr.id, f);
    }
    openKeyframeEditorModal(timeline, tr, f);
  });
  actionsGroup.appendChild(addKfBtn);

  const interpSelect = document.createElement('select');
  interpSelect.className = 'timeline-select interp-select-compact';
  interpSelect.title = 'Interpolación del Keyframe (Suave / Lineal / Fijo)';
  interpSelect.innerHTML = `
    <option value="smooth">◆ Suave</option>
    <option value="linear">◇ Lineal</option>
    <option value="hold">■ Fijo</option>
  `;
  interpSelect.addEventListener('change', () => {
    const tr = getSelectedTrack();
    if (!tr) return;
    const f = timeline.settings.currentFrame;
    const val = interpSelect.value as InterpolationType;
    if (tr.keyframes.has(f)) {
      timeline.setKeyframeInterpolation(tr.id, f, val);
    } else {
      timeline.addOrUpdateKeyframe(tr.id, f, { interpolation: val });
    }
  });
  actionsGroup.appendChild(interpSelect);

  // Bone Pose Keyframe / Humanoid Rig quick button
  const boneTimelineBtn = document.createElement('button');
  boneTimelineBtn.className = 'timeline-btn icon-only';
  boneTimelineBtn.title =
    'Esqueleto 2D / Pose Keyframe (Crear esqueleto o registrar pose en este fotograma)';
  boneTimelineBtn.innerHTML = `<span style="font-size:13px; line-height:1;">🦴</span>`;
  boneTimelineBtn.addEventListener('click', () => {
    if (timeline.bones.length === 0) {
      timeline.createHumanoidPreset(800, 450);
    } else {
      timeline.addOrUpdateBoneKeyframe(
        timeline.settings.currentFrame,
        interpSelect.value as InterpolationType,
      );
    }
  });
  actionsGroup.appendChild(boneTimelineBtn);

  const sep2 = document.createElement('div');
  sep2.className = 'timeline-separator';
  actionsGroup.appendChild(sep2);

  // Onion skin toggle
  const onionBtn = document.createElement('button');
  onionBtn.className = `timeline-btn icon-only ${timeline.onionSkin.enabled ? 'active' : ''}`;
  onionBtn.title = 'Activar / Desactivar Papel Cebolla (Atajo: O)';
  onionBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="12" cy="12" r="1"/>
    </svg>
  `;
  onionBtn.addEventListener('click', () => {
    timeline.toggleOnionSkin();
  });
  actionsGroup.appendChild(onionBtn);

  // Onion skin settings gear
  const onionSettingsBtn = document.createElement('button');
  onionSettingsBtn.className = 'timeline-btn icon-only';
  onionSettingsBtn.title = 'Ajustes de Papel Cebolla';
  onionSettingsBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  `;
  onionSettingsBtn.addEventListener('click', () => {
    openOnionSkinModal(timeline, layerManager);
  });
  actionsGroup.appendChild(onionSettingsBtn);

  const sep3 = document.createElement('div');
  sep3.className = 'timeline-separator';
  actionsGroup.appendChild(sep3);

  // Zoom Controls Group
  const zoomGroup = document.createElement('div');
  zoomGroup.className = 'timeline-zoom-group';
  zoomGroup.title = 'Zoom de ancho de fotogramas (Ctrl + Rueda)';

  const zoomOutBtn = document.createElement('button');
  zoomOutBtn.className = 'timeline-btn icon-only';
  zoomOutBtn.title = 'Reducir ancho de fotograma';
  zoomOutBtn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  `;
  zoomOutBtn.addEventListener('click', () => setCellWidth(cellWidth - 3));

  zoomSlider = document.createElement('input');
  zoomSlider.type = 'range';
  zoomSlider.className = 'timeline-zoom-slider';
  zoomSlider.min = String(MIN_CELL_WIDTH);
  zoomSlider.max = String(MAX_CELL_WIDTH);
  zoomSlider.value = String(cellWidth);
  zoomSlider.title = 'Ajustar tamaño visual de las celdas en la línea de tiempo';
  zoomSlider.addEventListener('input', () => {
    setCellWidth(Number(zoomSlider!.value));
  });

  const zoomInBtn = document.createElement('button');
  zoomInBtn.className = 'timeline-btn icon-only';
  zoomInBtn.title = 'Aumentar ancho de fotograma';
  zoomInBtn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  `;
  zoomInBtn.addEventListener('click', () => setCellWidth(cellWidth + 3));

  zoomLabel = document.createElement('span');
  zoomLabel.className = 'timeline-zoom-label';
  zoomLabel.textContent = `${cellWidth}px`;

  zoomGroup.append(zoomOutBtn, zoomSlider, zoomInBtn, zoomLabel);
  actionsGroup.appendChild(zoomGroup);

  header.appendChild(actionsGroup);
  panel.appendChild(header);

  // --- 2. Body (Tracks column on left + Grid on right) ---
  const body = document.createElement('div');
  body.className = 'timeline-body';

  // Left Column: Track Headers
  const leftCol = document.createElement('div');
  leftCol.className = 'timeline-tracks-header-col';

  const tracksCorner = document.createElement('div');
  tracksCorner.className = 'timeline-tracks-corner';
  tracksCorner.innerHTML = `<span>Pistas / Keyframes</span>`;
  leftCol.appendChild(tracksCorner);

  const trackHeadersList = document.createElement('div');
  trackHeadersList.className = 'timeline-track-headers-list';
  leftCol.appendChild(trackHeadersList);
  body.appendChild(leftCol);

  // Track Column Width Splitter
  const trackSplitter = document.createElement('div');
  trackSplitter.className = 'csp-timeline-track-splitter';
  trackSplitter.title = 'Arrastrar para cambiar el ancho de la columna de pistas';

  const savedTracksW = localStorage.getItem('oniri.timeline.tracks-width');
  if (savedTracksW) {
    const w = Math.max(120, Math.min(380, Number(savedTracksW)));
    document.documentElement.style.setProperty('--timeline-tracks-width', `${w}px`);
  }

  let isDraggingTrackSplitter = false;
  let startTrackX = 0;
  let startTrackW = 180;

  trackSplitter.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingTrackSplitter = true;
    startTrackX = e.clientX;
    startTrackW = leftCol.offsetWidth;
    trackSplitter.classList.add('dragging');
    trackSplitter.setPointerCapture(e.pointerId);
  });

  trackSplitter.addEventListener('pointermove', (e) => {
    if (!isDraggingTrackSplitter) return;
    const dx = e.clientX - startTrackX;
    const newW = Math.max(120, Math.min(380, startTrackW + dx));
    document.documentElement.style.setProperty('--timeline-tracks-width', `${newW}px`);
    localStorage.setItem('oniri.timeline.tracks-width', String(newW));
  });

  const stopTrackDrag = (e: PointerEvent) => {
    if (!isDraggingTrackSplitter) return;
    isDraggingTrackSplitter = false;
    trackSplitter.classList.remove('dragging');
    try {
      trackSplitter.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };
  trackSplitter.addEventListener('pointerup', stopTrackDrag);
  trackSplitter.addEventListener('pointercancel', stopTrackDrag);
  body.appendChild(trackSplitter);

  // Right Column: Grid container
  const gridContainer = document.createElement('div');
  gridContainer.className = 'timeline-grid-container';

  const gridContent = document.createElement('div');
  gridContent.className = 'timeline-grid-content';
  gridContainer.appendChild(gridContent);
  body.appendChild(gridContainer);

  panel.style.pointerEvents = 'auto';
  panel.appendChild(body);
  container.appendChild(panel);

  // --- 3. Scrubbing Interaction ---
  let isScrubbing = false;

  const getMinFrame = () => timeline.settings.minFrame ?? 0;
  const frameToX = (f: number): number => (f - getMinFrame()) * cellWidth;

  function clientXToFrame(clientX: number, allowBeyondTotal = false): number {
    const rect = gridContainer.getBoundingClientRect();
    const clickX = clientX - rect.left + gridContainer.scrollLeft;
    const minF = getMinFrame();
    const rawFrame = minF + Math.floor(clickX / cellWidth);
    if (allowBeyondTotal) {
      return Math.max(minF - 200, Math.min(2000, rawFrame));
    }
    return Math.max(minF, Math.min(timeline.settings.totalFrames, rawFrame));
  }

  function handleScrub(e: MouseEvent): void {
    timeline.goToFrame(clientXToFrame(e.clientX, false));
  }

  gridContainer.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isScrubbing = true;
    handleScrub(e);
  });

  gridContainer.addEventListener(
    'wheel',
    (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 2 : -2;
        setCellWidth(cellWidth + delta);
      }
    },
    { passive: false }
  );

  window.addEventListener('mousemove', (e) => {
    if (isScrubbing) {
      handleScrub(e);
    }
  });

  window.addEventListener('mouseup', () => {
    isScrubbing = false;
  });

  let activePlayheadEl: HTMLElement | null = null;

  function syncPlaybackUI(): void {
    if (activePlayheadEl) {
      activePlayheadEl.style.left = `${frameToX(timeline.settings.currentFrame) + cellWidth / 2}px`;
    }
    frameDisplay.textContent = `${timeline.settings.currentFrame} / ${timeline.settings.totalFrames}`;
  }

  // --- 4. Render Grid & Tracks ---
  function render(): void {
    const trSelected = getSelectedTrack();

    // Update Scene Selector
    sceneSelect.innerHTML = '';
    for (const sc of timeline.scenes) {
      const opt = document.createElement('option');
      opt.value = sc.id;
      opt.textContent = `🎬 ${sc.name} (${sc.settings.totalFrames}f)`;
      if (sc.id === timeline.activeSceneId) opt.selected = true;
      sceneSelect.appendChild(opt);
    }

    // Update transport state
    if (timeline.settings.isPlaying) {
      playBtn.classList.add('playing');
      playBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
      `;
    } else {
      playBtn.classList.remove('playing');
      playBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      `;
    }

    loopBtn.classList.toggle('active', timeline.settings.loop);
    onionBtn.classList.toggle('active', timeline.onionSkin.enabled);
    frameDisplay.textContent = `${timeline.settings.currentFrame} / ${timeline.settings.totalFrames}`;

    // Update Keyframe toolbar status
    const kfEnabled = !!trSelected?.keyframesEnabled;
    toggleKfModeBtn.classList.toggle('active', kfEnabled);
    const activeKf = trSelected?.keyframes.get(timeline.settings.currentFrame);
    if (activeKf) {
      interpSelect.value = activeKf.interpolation;
    }

    // Render Left Track Headers
    trackHeadersList.innerHTML = '';

    // 0. Master 2D Skeleton (Bones) Track Header if bones exist
    if (timeline.bones.length > 0) {
      const boneHeaderItem = document.createElement('div');
      boneHeaderItem.className = 'timeline-track-header-item';
      boneHeaderItem.style.height = '28px';
      boneHeaderItem.style.background = 'rgba(56, 189, 248, 0.08)';
      boneHeaderItem.style.borderBottom = '1px solid rgba(56, 189, 248, 0.25)';

      const boneName = document.createElement('span');
      boneName.className = 'timeline-track-name';
      boneName.style.color = '#38bdf8';
      boneName.style.fontWeight = '600';
      boneName.textContent = `🦴 Esqueleto 2D (${timeline.bones.length})`;
      boneHeaderItem.appendChild(boneName);

      const resetPoseMiniBtn = document.createElement('button');
      resetPoseMiniBtn.className = 'timeline-track-kf-btn';
      resetPoseMiniBtn.title = 'Restablecer pose a postura base en este fotograma';
      resetPoseMiniBtn.textContent = '↺';
      resetPoseMiniBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        timeline.resetBonePoseAtFrame(timeline.settings.currentFrame);
      });
      boneHeaderItem.appendChild(resetPoseMiniBtn);

      const boneKfCount = document.createElement('span');
      boneKfCount.className = 'timeline-track-badge';
      boneKfCount.textContent = `${timeline.boneKeyframes.size}k`;
      boneHeaderItem.appendChild(boneKfCount);

      trackHeadersList.appendChild(boneHeaderItem);
    }

    for (const track of timeline.tracks) {
      const item = document.createElement('div');
      item.className = `timeline-track-header-item ${track.id === selectedTrackId ? 'selected' : ''} ${track.keyframesEnabled ? 'has-kf-lane' : ''}`;
      item.addEventListener('click', () => {
        selectedTrackId = track.id;
        render();
      });

      const eye = document.createElement('button');
      eye.className = 'timeline-track-eye-btn';
      eye.innerHTML = track.visible
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/></svg>`;
      eye.addEventListener('click', (ev) => {
        ev.stopPropagation();
        track.visible = !track.visible;
        layerManager.setLayerVisibility(track.folderId, track.visible);
        render();
      });
      item.appendChild(eye);

      const name = document.createElement('span');
      name.className = 'timeline-track-name';
      name.textContent = track.name;
      item.appendChild(name);

      // Keyframe toggle button on track header
      const kfTrackBtn = document.createElement('button');
      kfTrackBtn.className = `timeline-track-kf-btn ${track.keyframesEnabled ? 'active' : ''}`;
      kfTrackBtn.title = track.keyframesEnabled
        ? 'Fotogramas clave activados (Clic para ocultar/desactivar)'
        : 'Activar transformación por Keyframes en esta pista';
      kfTrackBtn.innerHTML = `
        <svg width="11" height="11" viewBox="0 0 24 24" fill="${track.keyframesEnabled ? '#ffd43b' : 'none'}" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 22 12 12 22 2 12 12 2"/>
        </svg>
      `;
      kfTrackBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        selectedTrackId = track.id;
        timeline.toggleTrackKeyframes(track.id);
      });
      item.appendChild(kfTrackBtn);

      const celCount = document.createElement('span');
      celCount.className = 'timeline-track-badge';
      celCount.textContent = `${track.exposures.size}c`;
      item.appendChild(celCount);

      trackHeadersList.appendChild(item);
    }

    // Audio Track Headers
    for (const audioTrack of timeline.audioTracks) {
      const aItem = document.createElement('div');
      aItem.className = 'timeline-track-header-item audio-track-header';

      const aIcon = document.createElement('span');
      aIcon.style.marginRight = '4px';
      aIcon.style.fontSize = '12px';
      aIcon.textContent = '🎵';
      aItem.appendChild(aIcon);

      const aName = document.createElement('span');
      aName.className = 'timeline-track-name';
      aName.textContent = audioTrack.name;
      aName.title = 'Doble clic para renombrar pista de audio';
      aName.addEventListener('dblclick', (ev) => {
        ev.stopPropagation();
        const newName = prompt('Nombre de la pista de audio:', audioTrack.name);
        if (newName && newName.trim()) {
          timeline.renameAudioTrack(audioTrack.id, newName.trim());
          render();
        }
      });
      aItem.appendChild(aName);

      // Mute toggle button
      const muteBtn = document.createElement('button');
      muteBtn.className = `timeline-audio-mute-btn ${audioTrack.muted ? 'muted' : ''}`;
      muteBtn.title = audioTrack.muted ? 'Desmutear audio' : 'Silenciar pista (Mute)';
      muteBtn.innerHTML = audioTrack.muted ? '🔇' : '🔊';
      muteBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        timeline.toggleAudioTrackMute(audioTrack.id);
        render();
      });
      aItem.appendChild(muteBtn);

      // Load audio button
      const loadAudioBtn = document.createElement('button');
      loadAudioBtn.className = 'timeline-audio-load-btn';
      loadAudioBtn.title = 'Cargar archivo de audio (.mp3, .wav, .ogg, .aac, .m4a)';
      loadAudioBtn.innerHTML = `+ Audio`;

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'audio/*';
      fileInput.style.display = 'none';
      fileInput.addEventListener('change', async (ev) => {
        const file = (ev.target as HTMLInputElement).files?.[0];
        if (!file) return;
        try {
          const { audioBuffer, peaks, durationFrames } = await timelineAudioManager.decodeAudio(
            file,
            timeline.settings.fps
          );
          const clip: AudioClip = {
            id: `clip-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: file.name.replace(/\.[^/.]+$/, ''),
            startFrame: timeline.settings.currentFrame,
            durationFrames,
            offsetSeconds: 0,
            volume: 1.0,
            audioBuffer,
            peaks,
            audioBlob: file,
          };
          timeline.addAudioClip(audioTrack.id, clip);
          render();
        } catch (err: any) {
          console.error('Error al decodificar audio:', err);
          alert('No se pudo decodificar el archivo de audio seleccionado.');
        }
      });
      loadAudioBtn.appendChild(fileInput);
      loadAudioBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        fileInput.click();
      });
      aItem.appendChild(loadAudioBtn);

      // Delete audio track button
      const delBtn = document.createElement('button');
      delBtn.className = 'timeline-audio-delete-btn';
      delBtn.title = 'Eliminar pista de audio';
      delBtn.textContent = '✕';
      delBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (confirm(`¿Eliminar pista de audio "${audioTrack.name}"?`)) {
          timeline.removeAudioTrack(audioTrack.id);
          render();
        }
      });
      aItem.appendChild(delBtn);

      trackHeadersList.appendChild(aItem);
    }

    // Render Right Content (Ruler + Track Rows + End-of-Timeline Drag Handle + Playhead)
    gridContent.innerHTML = '';
    const minF = getMinFrame();
    const totalFrames = timeline.settings.totalFrames;
    const totalCols = totalFrames - minF + 1;
    const totalW = totalCols * cellWidth;
    gridContent.style.width = `${totalW + 140}px`;

    // 1. Ruler (with Start/End Playback Brackets + Total Frames Drag Handle)
    const ruler = document.createElement('div');
    ruler.className = 'timeline-ruler';
    ruler.style.width = `${totalW + 140}px`;

    const division = timeline.settings.division ?? 5;
    const timeFormat = timeline.settings.timeFormat ?? 'frames';

    for (let f = minF; f <= totalFrames; f++) {
      const cell = document.createElement('div');
      cell.className = 'timeline-ruler-cell';
      if (f === 0) {
        cell.classList.add('major', 'frame-zero');
        cell.textContent = '0';
      } else if (f < 0) {
        cell.classList.add('negative-frame');
        if (Math.abs(f) % division === 0 || f === minF) {
          cell.classList.add('major');
          cell.textContent = `${f}`;
        }
      } else {
        if (f % division === 0 || f === 1) {
          cell.classList.add('major');
          cell.textContent = formatRulerTime(f, timeline.settings.fps, timeFormat);
        }
      }
      if (f >= timeline.settings.startFrame && f <= timeline.settings.endFrame) {
        cell.classList.add('playback-bound');
      }
      if (f === timeline.settings.startFrame) {
        cell.classList.add('range-start');
      }
      if (f === timeline.settings.endFrame) {
        cell.classList.add('range-end');
      }
      cell.addEventListener('click', (ev) => {
        ev.stopPropagation();
        timeline.goToFrame(f);
      });
      ruler.appendChild(cell);
    }

    // Playback Start Frame Bracket Handle
    const startBracket = document.createElement('div');
    startBracket.className = 'timeline-range-bracket start-bracket';
    startBracket.title = `Inicio de reproducción (Fotograma ${timeline.settings.startFrame}). Arrastra para cambiar inicio.`;
    startBracket.style.left = `${frameToX(timeline.settings.startFrame)}px`;
    attachRangeBracketDrag(startBracket, 'start');
    ruler.appendChild(startBracket);

    // Playback End Frame Bracket Handle
    const endBracket = document.createElement('div');
    endBracket.className = 'timeline-range-bracket end-bracket';
    endBracket.title = `Fin de reproducción (Fotograma ${timeline.settings.endFrame}). Arrastra para cambiar fin.`;
    endBracket.style.left = `${frameToX(timeline.settings.endFrame + 1) - 6}px`;
    attachRangeBracketDrag(endBracket, 'end');
    ruler.appendChild(endBracket);

    // Total Frames End-Boundary Drag Handle on Ruler & Full Height
    const endTimelineHandle = document.createElement('div');
    endTimelineHandle.className = 'timeline-total-end-handle';
    endTimelineHandle.style.left = `${totalW}px`;
    endTimelineHandle.title = `Duración total: ${totalFrames} fotogramas. Arrastra a la derecha o izquierda para aumentar/reducir la cantidad de frames de la línea de tiempo.`;
    endTimelineHandle.innerHTML = `<span class="end-handle-pill">⇔ ${totalFrames}f</span>`;
    attachTotalFramesDrag(endTimelineHandle);
    gridContent.appendChild(endTimelineHandle);

    gridContent.appendChild(ruler);

    // 1b. Master 2D Skeleton (Bones) Keyframe Row if bones exist
    if (timeline.bones.length > 0) {
      const boneLane = document.createElement('div');
      boneLane.className = 'timeline-keyframe-lane';
      boneLane.style.width = `${totalW}px`;
      boneLane.style.height = '28px';
      boneLane.style.background = 'rgba(56, 189, 248, 0.05)';
      boneLane.style.borderBottom = '1px solid rgba(56, 189, 248, 0.25)';

      for (let f = minF; f <= totalFrames; f++) {
        const bcell = document.createElement('div');
        bcell.className = 'timeline-kf-cell';
        if (f === 0) bcell.classList.add('frame-zero-cell');
        else if (f < 0) bcell.classList.add('negative-frame-cell');
        bcell.title = `Fotograma ${f}: Doble clic para registrar Keyframe de Pose 2D`;
        bcell.addEventListener('click', (ev) => {
          ev.stopPropagation();
          timeline.goToFrame(f);
        });
        bcell.addEventListener('dblclick', (ev) => {
          ev.stopPropagation();
          timeline.goToFrame(f);
          timeline.addOrUpdateBoneKeyframe(f, interpSelect.value as InterpolationType);
        });
        boneLane.appendChild(bcell);
      }

      const sortedBoneKfs = Array.from(timeline.boneKeyframes.values()).sort(
        (a, b) => a.frame - b.frame,
      );
      for (let i = 0; i < sortedBoneKfs.length - 1; i++) {
        const k0 = sortedBoneKfs[i];
        const k1 = sortedBoneKfs[i + 1];
        if (k0.interpolation !== 'hold') {
          const spanBar = document.createElement('div');
          spanBar.className = `timeline-kf-span-line ${k0.interpolation}`;
          spanBar.style.left = `${frameToX(k0.frame) + cellWidth / 2}px`;
          spanBar.style.width = `${(k1.frame - k0.frame) * cellWidth}px`;
          spanBar.style.background = '#38bdf8';
          boneLane.appendChild(spanBar);
        }
      }

      for (const bkf of sortedBoneKfs) {
        if (bkf.frame > totalFrames || bkf.frame < minF) continue;
        const diamond = document.createElement('div');
        diamond.className = `timeline-kf-diamond ${bkf.interpolation} ${
          timeline.settings.currentFrame === bkf.frame ? 'active' : ''
        }`;
        diamond.style.left = `${frameToX(bkf.frame) + cellWidth / 2}px`;
        diamond.style.borderColor = '#38bdf8';
        diamond.title = `Pose Keyframe F${bkf.frame} (${bkf.interpolation}) | ${bkf.poses.size} huesos posados\nClic para ir al fotograma, Arrastra para mover, Clic derecho para eliminar`;

        diamond.addEventListener('mousedown', (e: MouseEvent) => {
          if (e.button !== 0) return;
          e.stopPropagation();
          e.preventDefault();
          let moved = false;
          let targetFrame = bkf.frame;

          const onMove = (moveEv: MouseEvent) => {
            const f = clientXToFrame(moveEv.clientX, false);
            if (f !== bkf.frame) moved = true;
            targetFrame = f;
            diamond.style.left = `${frameToX(f) + cellWidth / 2}px`;
          };

          const onUp = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            if (moved && targetFrame !== bkf.frame) {
              timeline.moveBoneKeyframe(bkf.frame, targetFrame);
              timeline.goToFrame(targetFrame);
            } else {
              timeline.goToFrame(bkf.frame);
            }
          };

          window.addEventListener('mousemove', onMove);
          window.addEventListener('mouseup', onUp);
        });

        diamond.addEventListener('contextmenu', (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          timeline.deleteBoneKeyframe(bkf.frame);
        });

        boneLane.appendChild(diamond);
      }

      gridContent.appendChild(boneLane);
    }

    // 2. Track Rows (with Clip Container, Resizable Cels, and Keyframe Diamonds Lane)
    for (const track of timeline.tracks) {
      const rowWrapper = document.createElement('div');
      rowWrapper.className = `timeline-track-row-wrapper ${track.keyframesEnabled ? 'has-kf-lane' : ''}`;
      rowWrapper.style.width = `${totalW}px`;

      const row = document.createElement('div');
      row.className = 'timeline-track-row';
      row.style.width = `${totalW}px`;

      // Background cell columns
      for (let f = minF; f <= totalFrames; f++) {
        const fcell = document.createElement('div');
        fcell.className = 'timeline-frame-cell';
        if (f === 0) fcell.classList.add('frame-zero-cell');
        else if (f < 0) fcell.classList.add('negative-frame-cell');
        if (track.exposures.has(f)) {
          fcell.classList.add('key-cell');
        }
        fcell.addEventListener('click', (ev) => {
          ev.stopPropagation();
          selectedTrackId = track.id;
          timeline.goToFrame(f);
        });
        fcell.addEventListener('dblclick', (ev) => {
          ev.stopPropagation();
          selectedTrackId = track.id;
          timeline.createCel(track.id, f);
        });
        fcell.addEventListener('contextmenu', (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          selectedTrackId = track.id;
          showTimelineContextMenu(ev.clientX, ev.clientY, track, f, timeline, layerManager);
        });
        row.appendChild(fcell);
      }

      // Render Clips & Cel spans inside each clip
      for (const clip of track.clips) {
        const clipStart = Math.max(minF, clip.startFrame);
        const clipEnd = Math.min(totalFrames, clip.endFrame);
        if (clipEnd < clipStart) continue;

        const clipBar = document.createElement('div');
        clipBar.className = 'timeline-clip-container';
        clipBar.style.left = `${frameToX(clipStart)}px`;
        clipBar.style.width = `${(clipEnd - clipStart + 1) * cellWidth}px`;

        // Clip top grab bar & left/right clip handles
        const clipLeftGrip = document.createElement('div');
        clipLeftGrip.className = 'timeline-clip-grip left';
        clipLeftGrip.title = 'Arrastrar inicio del Clip';
        attachClipEdgeDrag(clipLeftGrip, track.id, clip.id, 'left', clip.startFrame, clip.endFrame);
        clipBar.appendChild(clipLeftGrip);

        const clipRightGrip = document.createElement('div');
        clipRightGrip.className = 'timeline-clip-grip right';
        clipRightGrip.title = 'Arrastrar fin del Clip (extiende la pista o la línea de tiempo)';
        attachClipEdgeDrag(clipRightGrip, track.id, clip.id, 'right', clip.startFrame, clip.endFrame);
        clipBar.appendChild(clipRightGrip);

        row.appendChild(clipBar);

        // Sort exposures within this clip
        const sortedExposures = Array.from(clip.exposures.entries())
          .filter(([f]) => f >= clipStart && f <= clipEnd)
          .sort((a, b) => a[0] - b[0]);

        for (let i = 0; i < sortedExposures.length; i++) {
          const [expFrame, celId] = sortedExposures[i];
          const nextExp = sortedExposures[i + 1];
          const endSpan = nextExp ? Math.min(clipEnd, nextExp[0] - 1) : clipEnd;
          const spanLength = Math.max(1, endSpan - expFrame + 1);

          const celLayer = layerManager.layers.find((l) => l.id === celId);
          const celLabel = celLayer ? celLayer.name : '?';

          const block = document.createElement('div');
          block.className = 'timeline-cel-block';
          if (
            timeline.settings.currentFrame >= expFrame &&
            timeline.settings.currentFrame <= endSpan
          ) {
            block.classList.add('active-cel');
          }

          block.style.left = `${frameToX(expFrame)}px`;
          block.style.width = `${spanLength * cellWidth - 2}px`;

          // Left resize handle on cel block
          const leftResizeHandle = document.createElement('div');
          leftResizeHandle.className = 'cel-resize-handle left';
          leftResizeHandle.title = 'Arrastrar borde izquierdo para cambiar inicio de esta celda';
          attachCelEdgeResize(leftResizeHandle, block, row, track, expFrame, endSpan, 'left');
          block.appendChild(leftResizeHandle);

          const dot = document.createElement('div');
          dot.className = 'timeline-cel-dot';
          block.appendChild(dot);

          const lbl = document.createElement('span');
          lbl.className = 'timeline-cel-label';
          lbl.textContent = `${celLabel} (${spanLength}f)`;
          block.appendChild(lbl);

          // Right resize handle on cel block (drag cel duration right/left)
          const rightResizeHandle = document.createElement('div');
          rightResizeHandle.className = 'cel-resize-handle right';
          rightResizeHandle.title =
            'Arrastrar a la derecha o izquierda para aumentar/reducir duración de la celda (Alt = sin desplazar siguientes)';
          attachCelEdgeResize(rightResizeHandle, block, row, track, expFrame, endSpan, 'right');
          block.appendChild(rightResizeHandle);

          // Body drag to move cel starting frame (carrying entire span) OR Click to select
          attachCelBodyDrag(block, row, track, expFrame, spanLength, celLabel, celLayer?.id);

          // Right-click context menu on cel block
          block.addEventListener('contextmenu', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            selectedTrackId = track.id;
            const clickedFrame = clientXToFrame(ev.clientX, false);
            showTimelineContextMenu(ev.clientX, ev.clientY, track, clickedFrame, timeline, layerManager);
          });

          row.appendChild(block);
        }
      }

      rowWrapper.appendChild(row);

      // 3. Keyframe Sub-Lane (when keyframesEnabled on track)
      if (track.keyframesEnabled) {
        const kfLane = document.createElement('div');
        kfLane.className = 'timeline-keyframe-lane';
        kfLane.style.width = `${totalW}px`;

        // Background cells in keyframe lane (double click to add keyframe)
        for (let f = minF; f <= totalFrames; f++) {
          const kcell = document.createElement('div');
          kcell.className = 'timeline-kf-cell';
          if (f === 0) kcell.classList.add('frame-zero-cell');
          else if (f < 0) kcell.classList.add('negative-frame-cell');
          kcell.title = `Fotograma ${f}: Doble clic para crear/editar Keyframe`;
          kcell.addEventListener('dblclick', (ev) => {
            ev.stopPropagation();
            selectedTrackId = track.id;
            timeline.goToFrame(f);
            timeline.addOrUpdateKeyframe(track.id, f);
            openKeyframeEditorModal(timeline, track, f);
          });
          kfLane.appendChild(kcell);
        }

        // Draw interpolation connecting spans between keyframes
        const sortedKfs = Array.from(track.keyframes.values()).sort((a, b) => a.frame - b.frame);
        for (let i = 0; i < sortedKfs.length - 1; i++) {
          const k0 = sortedKfs[i];
          const k1 = sortedKfs[i + 1];
          if (k0.interpolation !== 'hold') {
            const spanBar = document.createElement('div');
            spanBar.className = `timeline-kf-span-line ${k0.interpolation}`;
            spanBar.style.left = `${frameToX(k0.frame) + cellWidth / 2}px`;
            spanBar.style.width = `${(k1.frame - k0.frame) * cellWidth}px`;
            kfLane.appendChild(spanBar);
          }
        }

        // Render diamond markers for each keyframe
        for (const kf of sortedKfs) {
          if (kf.frame > totalFrames || kf.frame < minF) continue;
          const diamond = document.createElement('div');
          diamond.className = `timeline-kf-diamond ${kf.interpolation} ${
            timeline.settings.currentFrame === kf.frame ? 'active' : ''
          }`;
          diamond.style.left = `${frameToX(kf.frame) + cellWidth / 2}px`;
          diamond.title = `Keyframe F${kf.frame} (${kf.interpolation}) | X:${Math.round(kf.x)} Y:${Math.round(kf.y)} Escala:${Math.round(kf.scaleX * 100)}% Rot:${Math.round(kf.rotation)}° Opacidad:${Math.round(kf.opacity * 100)}%\nClic para editar, Arrastra para mover, Clic derecho para eliminar`;

          attachKeyframeDiamondInteraction(diamond, track, kf.frame);
          kfLane.appendChild(diamond);
        }

        rowWrapper.appendChild(kfLane);
      }

      gridContent.appendChild(rowWrapper);
    }

    // 3b. Audio Track Rows in Grid
    for (const audioTrack of timeline.audioTracks) {
      const aRow = document.createElement('div');
      aRow.className = 'timeline-audio-row';
      aRow.style.width = `${totalW}px`;

      // Background frame cells
      for (let f = minF; f <= totalFrames; f++) {
        const cell = document.createElement('div');
        cell.className = 'timeline-frame-cell';
        if (f === 0) cell.classList.add('frame-zero-cell');
        else if (f < 0) cell.classList.add('negative-frame-cell');
        cell.addEventListener('click', (ev) => {
          ev.stopPropagation();
          timeline.goToFrame(f);
        });
        aRow.appendChild(cell);
      }

      // Render Audio Clips with Waveforms
      for (const clip of audioTrack.clips) {
        const clipStart = clip.startFrame;
        const clipEnd = clip.startFrame + clip.durationFrames - 1;
        const clipWidthPx = clip.durationFrames * cellWidth;

        const clipEl = document.createElement('div');
        clipEl.className = 'timeline-audio-clip';
        clipEl.style.left = `${frameToX(clipStart)}px`;
        clipEl.style.width = `${clipWidthPx}px`;
        clipEl.title = `🎵 ${clip.name} (F${clipStart}..F${clipEnd}) - Arrastra para mover o recorta los bordes. Clic derecho para opciones.`;

        // Waveform canvas
        const wfCanvas = document.createElement('canvas');
        wfCanvas.className = 'timeline-audio-waveform-canvas';
        clipEl.appendChild(wfCanvas);
        requestAnimationFrame(() => {
          timelineAudioManager.renderWaveform(wfCanvas, clip, clipWidthPx, 34);
        });

        // Label
        const label = document.createElement('span');
        label.className = 'timeline-audio-label';
        label.textContent = `🎵 ${clip.name}`;
        clipEl.appendChild(label);

        // Left trim grip
        const leftGrip = document.createElement('div');
        leftGrip.className = 'timeline-audio-grip left';
        leftGrip.title = 'Arrastrar para recortar inicio';
        attachAudioClipTrimDrag(leftGrip, audioTrack.id, clip, 'left');
        clipEl.appendChild(leftGrip);

        // Right trim grip
        const rightGrip = document.createElement('div');
        rightGrip.className = 'timeline-audio-grip right';
        rightGrip.title = 'Arrastrar para recortar duración';
        attachAudioClipTrimDrag(rightGrip, audioTrack.id, clip, 'right');
        clipEl.appendChild(rightGrip);

        // Clip body drag & drop
        attachAudioClipBodyDrag(clipEl, audioTrack.id, clip);

        // Context menu for clip (delete / volume)
        clipEl.addEventListener('contextmenu', (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const action = prompt(
            `Opciones para "${clip.name}":\n1. Escribe "borrar" para eliminar\n2. Ingresa volumen 0..100% (actual: ${Math.round(clip.volume * 100)}%):`
          );
          if (action === 'borrar') {
            timeline.removeAudioClip(audioTrack.id, clip.id);
            render();
          } else if (action && !isNaN(Number(action))) {
            clip.volume = Math.max(0, Math.min(2, Number(action) / 100));
            render();
          }
        });

        aRow.appendChild(clipEl);
      }

      gridContent.appendChild(aRow);
    }

    // 4. Playhead
    const playhead = document.createElement('div');
    playhead.className = 'timeline-playhead';
    playhead.style.left = `${frameToX(timeline.settings.currentFrame) + cellWidth / 2}px`;

    const playheadCap = document.createElement('div');
    playheadCap.className = 'timeline-playhead-cap';
    playhead.appendChild(playheadCap);

    gridContent.appendChild(playhead);
    activePlayheadEl = playhead;
  }

  // --- Helper: Drag Total Frames Handle on Right End of Timeline ---
  function attachTotalFramesDrag(handle: HTMLElement): void {
    handle.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();
      handle.classList.add('dragging');

      const onMove = (moveEv: MouseEvent) => {
        const targetTotal = Math.max(1, clientXToFrame(moveEv.clientX, true));
        if (targetTotal !== timeline.settings.totalFrames) {
          timeline.setTotalFrames(targetTotal, true);
        }
      };

      const onUp = () => {
        handle.classList.remove('dragging');
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });
  }

  // --- Helper: Drag Entire Audio Clip Along Timeline ---
  function attachAudioClipBodyDrag(
    clipEl: HTMLElement,
    trackId: string,
    clip: AudioClip
  ): void {
    clipEl.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0 || (e.target as HTMLElement).classList.contains('timeline-audio-grip')) return;
      e.stopPropagation();
      e.preventDefault();

      clipEl.classList.add('dragging');
      const startMouseX = e.clientX;
      const initialStartFrame = clip.startFrame;

      const onMove = (moveEv: MouseEvent) => {
        const deltaPx = moveEv.clientX - startMouseX;
        const deltaFrames = Math.round(deltaPx / cellWidth);
        const newStart = initialStartFrame + deltaFrames;
        clipEl.style.left = `${frameToX(newStart)}px`;
      };

      const onUp = (upEv: MouseEvent) => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        clipEl.classList.remove('dragging');
        const deltaPx = upEv.clientX - startMouseX;
        const deltaFrames = Math.round(deltaPx / cellWidth);
        if (deltaFrames !== 0) {
          timeline.moveAudioClip(trackId, clip.id, initialStartFrame + deltaFrames);
          render();
        }
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });
  }

  // --- Helper: Trim Audio Clip In-Point or Duration ---
  function attachAudioClipTrimDrag(
    grip: HTMLElement,
    trackId: string,
    clip: AudioClip,
    edge: 'left' | 'right'
  ): void {
    grip.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();

      const origStart = clip.startFrame;
      const origDur = clip.durationFrames;
      const origEnd = origStart + origDur - 1;

      const onMove = (moveEv: MouseEvent) => {
        const f = clientXToFrame(moveEv.clientX, true);
        if (edge === 'left') {
          const clampedStart = Math.min(f, origEnd);
          const newDur = origEnd - clampedStart + 1;
          timeline.trimAudioClip(trackId, clip.id, clampedStart, newDur);
        } else {
          const clampedEnd = Math.max(f, origStart);
          const newDur = clampedEnd - origStart + 1;
          timeline.trimAudioClip(trackId, clip.id, origStart, newDur);
        }
      };

      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        render();
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });
  }

  // --- Helper: Drag Start/End Playback Range Brackets on Ruler ---
  function attachRangeBracketDrag(bracket: HTMLElement, which: 'start' | 'end'): void {
    bracket.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();

      const onMove = (moveEv: MouseEvent) => {
        const f = clientXToFrame(moveEv.clientX, true);
        if (which === 'start') {
          if (f < (timeline.settings.minFrame ?? 0)) {
            timeline.updateTimelineSettings({ minFrame: f });
          }
          timeline.setRange(Math.min(f, timeline.settings.endFrame), timeline.settings.endFrame);
        } else {
          if (f > timeline.settings.totalFrames) {
            timeline.setTotalFrames(f, true);
          }
          timeline.setRange(timeline.settings.startFrame, Math.max(f, timeline.settings.startFrame));
        }
      };

      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });
  }

  // --- Helper: Drag Clip Left/Right Grips ---
  function attachClipEdgeDrag(
    grip: HTMLElement,
    trackId: string,
    clipId: string,
    edge: 'left' | 'right',
    origStart: number,
    origEnd: number
  ): void {
    grip.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();

      const onMove = (moveEv: MouseEvent) => {
        const f = clientXToFrame(moveEv.clientX, true);
        if (edge === 'left') {
          timeline.resizeClip(trackId, clipId, Math.min(f, origEnd), origEnd);
        } else {
          timeline.resizeClip(trackId, clipId, origStart, Math.max(f, origStart));
        }
      };

      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });
  }

  // --- Helper: Drag Left or Right Edge of a Cel Block to Resize Cel Span ---
  function attachCelEdgeResize(
    handle: HTMLElement,
    block: HTMLElement,
    row: HTMLElement,
    track: AnimationTrack,
    expFrame: number,
    origEndFrame: number,
    edge: 'left' | 'right'
  ): void {
    handle.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();

      block.classList.add('resizing');
      let previewFrame = edge === 'right' ? origEndFrame : expFrame;

      const onMove = (moveEv: MouseEvent) => {
        const f = clientXToFrame(moveEv.clientX, true);
        if (edge === 'right') {
          previewFrame = Math.max(expFrame, f);
          const previewSpan = previewFrame - expFrame + 1;
          block.style.width = `${previewSpan * cellWidth - 2}px`;
          const lbl = block.querySelector('.timeline-cel-label');
          if (lbl) {
            const baseName = lbl.textContent?.replace(/\s*\(\d+f\)$/, '') ?? '';
            lbl.textContent = `${baseName} (${previewSpan}f)`;
          }
        } else {
          previewFrame = Math.max(getMinFrame(), Math.min(origEndFrame, f));
          const previewSpan = origEndFrame - previewFrame + 1;
          block.style.left = `${frameToX(previewFrame)}px`;
          block.style.width = `${previewSpan * cellWidth - 2}px`;
          const lbl = block.querySelector('.timeline-cel-label');
          if (lbl) {
            const baseName = lbl.textContent?.replace(/\s*\(\d+f\)$/, '') ?? '';
            lbl.textContent = `${baseName} (${previewSpan}f)`;
          }
        }

        row.querySelectorAll('.timeline-frame-cell').forEach((el, idx) => {
          el.classList.toggle('drop-target', getMinFrame() + idx === previewFrame);
        });
      };

      const onUp = (upEv: MouseEvent) => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        block.classList.remove('resizing');
        row.querySelectorAll('.timeline-frame-cell').forEach((el) => el.classList.remove('drop-target'));

        const mode = upEv.altKey ? 'overwrite' : 'ripple';
        timeline.resizeCelSpan(track.id, expFrame, edge, previewFrame, mode);
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });
  }

  // --- Helper: Drag Cel Body (Center) to Move Starting Frame Carrying Entire Span ---
  function attachCelBodyDrag(
    block: HTMLElement,
    row: HTMLElement,
    track: AnimationTrack,
    expFrame: number,
    spanLength: number,
    celLabel: string,
    celLayerId?: string
  ): void {
    let startClientX = 0;
    let isDragging = false;
    let grabOffsetFrames = 0;
    let previewTargetFrame = expFrame;

    block.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return;
      // If clicking resize handles at the ends, only resize span duration!
      if ((e.target as HTMLElement).classList.contains('cel-resize-handle')) return;
      e.stopPropagation();

      selectedTrackId = track.id;
      startClientX = e.clientX;
      isDragging = false;

      // Calculate relative frame grab offset within the cel span
      const clickedFrame = clientXToFrame(e.clientX, true);
      grabOffsetFrames = Math.max(0, Math.min(spanLength - 1, clickedFrame - expFrame));
      previewTargetFrame = expFrame;

      const onMouseMove = (moveEv: MouseEvent) => {
        const deltaX = moveEv.clientX - startClientX;
        if (!isDragging && Math.abs(deltaX) > 4) {
          isDragging = true;
          block.classList.add('dragging');
          block.classList.add('moving-body');
        }

        if (isDragging) {
          const rawHoverFrame = clientXToFrame(moveEv.clientX, true);
          previewTargetFrame = Math.max(getMinFrame(), rawHoverFrame - grabOffsetFrames);

          // Visually move the cel block across the track, carrying its exact span
          block.style.left = `${frameToX(previewTargetFrame)}px`;
          block.style.width = `${spanLength * cellWidth - 2}px`;

          // Update label during drag
          const lbl = block.querySelector('.timeline-cel-label');
          if (lbl) {
            lbl.textContent = `${celLabel} (${spanLength}f) → F${previewTargetFrame}`;
          }

          // Highlight target range of frames
          const endTarget = previewTargetFrame + spanLength - 1;
          row.querySelectorAll('.timeline-frame-cell').forEach((el, idx) => {
            const f = getMinFrame() + idx;
            el.classList.toggle('drop-target', f >= previewTargetFrame && f <= endTarget);
          });
        }
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        row.querySelectorAll('.timeline-frame-cell').forEach((el) => el.classList.remove('drop-target'));

        if (isDragging) {
          block.classList.remove('dragging');
          block.classList.remove('moving-body');

          if (previewTargetFrame !== expFrame) {
            timeline.moveCelSpan(track.id, expFrame, previewTargetFrame, spanLength);
          } else {
            // Restore visual position if dropped back onto same frame
            block.style.left = `${frameToX(expFrame)}px`;
            block.style.width = `${spanLength * cellWidth - 2}px`;
            const lbl = block.querySelector('.timeline-cel-label');
            if (lbl) {
              lbl.textContent = `${celLabel} (${spanLength}f)`;
            }
          }
        } else {
          // Just a single click in center: select cel & go to frame
          timeline.goToFrame(expFrame);
          if (celLayerId) {
            layerManager.setActiveLayer(celLayerId);
          }
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }

  // --- Helper: Keyframe Diamond Drag, Click to Edit, Right-Click to Delete ---
  function attachKeyframeDiamondInteraction(
    diamond: HTMLElement,
    track: AnimationTrack,
    kfFrame: number
  ): void {
    let startX = 0;
    let dragging = false;

    diamond.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      selectedTrackId = track.id;
      startX = e.clientX;
      dragging = false;

      const onMove = (moveEv: MouseEvent) => {
        if (!dragging && Math.abs(moveEv.clientX - startX) > 4) {
          dragging = true;
          diamond.classList.add('dragging');
        }
        if (dragging) {
          const f = clientXToFrame(moveEv.clientX, false);
          diamond.style.left = `${frameToX(f) + cellWidth / 2}px`;
        }
      };

      const onUp = (upEv: MouseEvent) => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        diamond.classList.remove('dragging');

        if (dragging) {
          const targetFrame = clientXToFrame(upEv.clientX, false);
          if (targetFrame !== kfFrame) {
            timeline.moveKeyframe(track.id, kfFrame, targetFrame);
            timeline.goToFrame(targetFrame);
          } else {
            render();
          }
        } else {
          timeline.goToFrame(kfFrame);
          openKeyframeEditorModal(timeline, track, kfFrame);
        }
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });

    diamond.addEventListener('contextmenu', (ev: MouseEvent) => {
      ev.preventDefault();
      ev.stopPropagation();
      timeline.deleteKeyframe(track.id, kfFrame);
    });
  }

  // --- 5. Global Keyboard Shortcuts ---
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      return;
    }

    // Modal transform state: timeline playback & scrubbing are locked
    if (isTransformModalLocked()) {
      e.preventDefault();
      return;
    }

    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault();
      timeline.togglePlay();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      if (e.shiftKey) {
        timeline.lastFrame();
      } else {
        timeline.nextFrame();
      }
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      if (e.shiftKey) {
        timeline.firstFrame();
      } else {
        timeline.prevFrame();
      }
    } else if (e.key === ']' || e.key === '}') {
      e.preventDefault();
      timeline.nextCel(selectedTrackId ?? undefined);
    } else if (e.key === '[' || e.key === '{') {
      e.preventDefault();
      timeline.prevCel(selectedTrackId ?? undefined);
    } else if (e.key === 'o' || e.key === 'O') {
      e.preventDefault();
      timeline.toggleOnionSkin();
    } else if (e.key === 'k' || e.key === 'K') {
      e.preventDefault();
      const tr = getSelectedTrack();
      if (tr) {
        timeline.addOrUpdateKeyframe(tr.id, timeline.settings.currentFrame);
      }
    }
  });

  let wasPlaying = false;
  timeline.subscribe(() => {
    const isPlaying = timeline.settings.isPlaying;
    if (isPlaying) {
      wasPlaying = true;
      syncPlaybackUI();
    } else {
      if (wasPlaying) {
        wasPlaying = false;
      }
      render();
    }
  });
  render();
}

// --- Modal: Timeline & Playback Settings Modal ---
function openTimelineSettingsModal(timeline: TimelineManager): void {
  const backdrop = document.createElement('div');
  backdrop.className = 'onion-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'onion-modal timeline-settings-modal';

  const s = timeline.settings;
  const scene = timeline.activeScene;

  modal.innerHTML = `
    <h3>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2">
        <rect x="2" y="3" width="20" height="18" rx="2"/>
        <line x1="8" y1="3" x2="8" y2="21"/>
        <line x1="16" y1="3" x2="16" y2="21"/>
        <line x1="2" y1="9" x2="22" y2="9"/>
        <line x1="2" y1="15" x2="22" y2="15"/>
      </svg>
      Ajustes de Línea de Tiempo
    </h3>

    <div class="onion-setting-row">
      <label>Nombre de la escena</label>
      <input type="text" id="tl-scene-name" class="tl-text-input" value="${scene.name}"/>
    </div>

    <div class="onion-setting-row">
      <label>Cantidad total de fotogramas</label>
      <input type="number" id="tl-total-frames" min="1" max="2000" value="${s.totalFrames}"/>
    </div>

    <div class="onion-setting-row">
      <label>Velocidad (Fotogramas por seg / FPS)</label>
      <div style="display:flex; gap:6px; align-items:center;">
        <input type="number" id="tl-fps" min="1" max="120" value="${s.fps}"/>
        <select id="tl-fps-preset" style="width:95px;">
          <option value="">Preset...</option>
          <option value="8">8 fps (Anime 3s)</option>
          <option value="12">12 fps (2s)</option>
          <option value="24">24 fps (Cine/TV)</option>
          <option value="30">30 fps (Video)</option>
          <option value="60">60 fps (Fluido)</option>
        </select>
      </div>
    </div>

    <div class="onion-setting-row">
      <label>Fotograma mínimo visible (Frame 0 / Negativos)</label>
      <input type="number" id="tl-min-frame" min="-200" max="1" value="${s.minFrame ?? 0}"/>
    </div>

    <div class="onion-setting-row">
      <label>Fotograma de inicio (Playback Start)</label>
      <input type="number" id="tl-start-frame" min="-200" max="2000" value="${s.startFrame}"/>
    </div>

    <div class="onion-setting-row">
      <label>Fotograma final (Playback End)</label>
      <input type="number" id="tl-end-frame" min="1" max="2000" value="${s.endFrame}"/>
    </div>

    <div class="onion-setting-row">
      <label>Formato de visualización de tiempo</label>
      <select id="tl-time-format" style="width:140px;">
        <option value="frames" ${(s.timeFormat ?? 'frames') === 'frames' ? 'selected' : ''}>Fotogramas (0, 1, 5...)</option>
        <option value="sec_frames" ${s.timeFormat === 'sec_frames' ? 'selected' : ''}>Segundos + Fotogramas (0s+1f)</option>
        <option value="timecode" ${s.timeFormat === 'timecode' ? 'selected' : ''}>Código de tiempo (00:00:00)</option>
      </select>
    </div>

    <div class="onion-setting-row">
      <label>División de regla (Línea mayor)</label>
      <select id="tl-division" style="width:90px;">
        <option value="4" ${s.division === 4 ? 'selected' : ''}>Cada 4 f</option>
        <option value="5" ${(s.division ?? 5) === 5 ? 'selected' : ''}>Cada 5 f</option>
        <option value="6" ${s.division === 6 ? 'selected' : ''}>Cada 6 f</option>
        <option value="8" ${s.division === 8 ? 'selected' : ''}>Cada 8 f</option>
        <option value="12" ${s.division === 12 ? 'selected' : ''}>Cada 12 f</option>
      </select>
    </div>

    <div class="onion-setting-row">
      <label>Reproducción en bucle (Loop)</label>
      <input type="checkbox" id="tl-loop" ${s.loop ? 'checked' : ''}/>
    </div>

    <div class="tl-duration-summary" id="tl-duration-summary">
      Duración estimada: ${(s.totalFrames / s.fps).toFixed(2)} seg
    </div>

    <div class="onion-modal-actions">
      <button class="timeline-btn" id="tl-modal-cancel">Cancelar</button>
      <button class="timeline-btn active" id="tl-modal-apply">Aplicar Ajustes</button>
    </div>
  `;

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  const sceneNameInput = modal.querySelector('#tl-scene-name') as HTMLInputElement;
  const minFrameInput = modal.querySelector('#tl-min-frame') as HTMLInputElement;
  const totalInput = modal.querySelector('#tl-total-frames') as HTMLInputElement;
  const fpsInput = modal.querySelector('#tl-fps') as HTMLInputElement;
  const fpsPreset = modal.querySelector('#tl-fps-preset') as HTMLSelectElement;
  const startInput = modal.querySelector('#tl-start-frame') as HTMLInputElement;
  const endInput = modal.querySelector('#tl-end-frame') as HTMLInputElement;
  const formatSelect = modal.querySelector('#tl-time-format') as HTMLSelectElement;
  const divSelect = modal.querySelector('#tl-division') as HTMLSelectElement;
  const loopCheck = modal.querySelector('#tl-loop') as HTMLInputElement;
  const summaryEl = modal.querySelector('#tl-duration-summary') as HTMLElement;

  const updateSummary = () => {
    const tf = Math.max(1, Number(totalInput.value) || 1);
    const fps = Math.max(1, Number(fpsInput.value) || 12);
    summaryEl.textContent = `Duración total: ${(tf / fps).toFixed(2)} seg (${tf} fotogramas a ${fps} FPS)`;
  };

  totalInput.addEventListener('input', () => {
    const newTotal = Math.max(1, Number(totalInput.value) || 1);
    if (Number(endInput.value) === s.totalFrames || Number(endInput.value) > newTotal) {
      endInput.value = String(newTotal);
    }
    updateSummary();
  });

  fpsInput.addEventListener('input', updateSummary);
  fpsPreset.addEventListener('change', () => {
    if (fpsPreset.value) {
      fpsInput.value = fpsPreset.value;
      updateSummary();
    }
  });

  const close = () => backdrop.remove();

  modal.querySelector('#tl-modal-cancel')?.addEventListener('click', close);
  modal.querySelector('#tl-modal-apply')?.addEventListener('click', () => {
    const newMin = Math.min(0, Number(minFrameInput.value) || 0);
    const newTotal = Math.max(1, Number(totalInput.value) || s.totalFrames);
    const newFps = Math.max(1, Number(fpsInput.value) || s.fps);
    const rawStart = Number(startInput.value);
    const newStart = isNaN(rawStart) ? 1 : Math.max(newMin, rawStart);
    const newEnd = Math.max(newStart, Math.min(newTotal, Number(endInput.value) || newTotal));

    timeline.updateTimelineSettings({
      sceneName: sceneNameInput.value,
      minFrame: Math.min(newMin, newStart),
      totalFrames: newTotal,
      fps: newFps,
      startFrame: newStart,
      endFrame: newEnd,
      timeFormat: formatSelect.value as TimeDisplayFormat,
      division: Number(divSelect.value),
      loop: loopCheck.checked,
    });
    close();
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
}

// --- Modal: Scene Manager & Scene Editor (Multi-Timeline Management) ---
function openSceneManagerModal(timeline: TimelineManager): void {
  const backdrop = document.createElement('div');
  backdrop.className = 'onion-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'onion-modal scene-manager-modal';
  modal.style.width = '390px';

  const renderModalContent = () => {
    const active = timeline.activeScene;
    const scenes = timeline.scenes;

    modal.innerHTML = `
      <h3>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <line x1="2" y1="9" x2="22" y2="9"/>
          <line x1="7" y1="4" x2="5" y2="9"/>
          <line x1="12" y1="4" x2="10" y2="9"/>
          <line x1="17" y1="4" x2="15" y2="9"/>
          <circle cx="12" cy="15" r="2"/>
        </svg>
        Edición y Gestión de Escenas
      </h3>

      <!-- 1. Renombrar Escena Activa -->
      <div style="background:#1c1c1c; border:1px solid #383838; border-radius:6px; padding:10px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:600; color:#888; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">
          Escena Activa:
        </div>
        <div style="display:flex; gap:6px;">
          <input type="text" id="sm-active-name" class="tl-text-input" style="flex:1;" value="${active.name}"/>
          <button class="timeline-btn" id="sm-rename-btn">Renombrar</button>
        </div>
      </div>

      <!-- 2. Acciones Rápidas (Nueva / Duplicar) -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:12px;">
        <button class="timeline-btn" id="sm-new-scene-btn" style="height:32px; justify-content:flex-start; padding:0 10px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          <span>Nueva Escena...</span>
        </button>
        <button class="timeline-btn" id="sm-dup-scene-btn" style="height:32px; justify-content:flex-start; padding:0 10px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffd43b" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>Duplicar Activa</span>
        </button>
      </div>

      <!-- Subformulario colapsable para crear nueva escena -->
      <div id="sm-new-scene-form" style="display:none; background:#181818; border:1px dashed #00e5ff; border-radius:6px; padding:10px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:600; color:#00e5ff; margin-bottom:8px;">Crear Nueva Escena</div>
        <div class="onion-setting-row" style="margin-bottom:8px;">
          <label>Nombre</label>
          <input type="text" id="sm-new-name" class="tl-text-input" style="width:140px;" value="Escena ${scenes.length + 1}"/>
        </div>
        <div class="onion-setting-row" style="margin-bottom:8px;">
          <label>Fotogramas</label>
          <input type="number" id="sm-new-frames" min="1" max="2000" value="${active.settings.totalFrames}"/>
        </div>
        <div class="onion-setting-row" style="margin-bottom:8px;">
          <label>Velocidad (FPS)</label>
          <input type="number" id="sm-new-fps" min="1" max="120" value="${active.settings.fps}"/>
        </div>
        <div class="onion-setting-row" style="margin-bottom:8px;">
          <label>Duplicar pistas/dibujos</label>
          <input type="checkbox" id="sm-new-dup"/>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:8px;">
          <button class="timeline-btn" id="sm-new-cancel" style="height:24px;">Cancelar</button>
          <button class="timeline-btn active" id="sm-new-create" style="height:24px;">Crear</button>
        </div>
      </div>

      <!-- 3. Lista de Escenas -->
      <div style="font-size:11px; font-weight:600; color:#888; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">
        Escenas en el Proyecto (${scenes.length}):
      </div>
      <div class="scene-list-container" style="max-height:160px; overflow-y:auto; border:1px solid #333; border-radius:6px; margin-bottom:14px; background:#141414;">
        ${scenes
          .map(
            (sc) => `
          <div class="scene-list-row" style="display:flex; align-items:center; justify-content:space-between; padding:6px 10px; border-bottom:1px solid #222; font-size:12px; background:${sc.id === timeline.activeSceneId ? '#1a2632' : 'transparent'};">
            <div style="display:flex; align-items:center; gap:8px; overflow:hidden;">
              <span style="color:${sc.id === timeline.activeSceneId ? '#00e5ff' : '#666'};">🎬</span>
              <span style="font-weight:${sc.id === timeline.activeSceneId ? '600' : '400'}; color:${sc.id === timeline.activeSceneId ? '#00e5ff' : '#eee'}; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:160px;">${sc.name}</span>
              <span style="font-size:10px; color:#777;">${sc.settings.totalFrames}f (${(sc.settings.totalFrames / sc.settings.fps).toFixed(1)}s)</span>
            </div>
            <div style="display:flex; gap:4px; align-items:center;">
              ${sc.id !== timeline.activeSceneId ? `<button class="timeline-btn btn-switch-sc" data-id="${sc.id}" style="height:22px; padding:0 8px; font-size:10px;">Activar</button>` : '<span style="font-size:10px; color:#00e5ff; font-weight:600; padding:0 6px;">Activa</span>'}
              ${scenes.length > 1 ? `<button class="timeline-btn btn-del-sc" data-id="${sc.id}" style="height:22px; width:22px; padding:0; color:#ff6b6b; font-size:12px;" title="Eliminar Escena">✕</button>` : ''}
            </div>
          </div>
        `
          )
          .join('')}
      </div>

      <!-- 4. Acciones Inferiores -->
      <div class="onion-modal-actions" style="justify-content:space-between;">
        ${scenes.length > 1 ? `
          <button class="timeline-btn" id="sm-del-active-btn" style="color:#ff6b6b; border-color:#663333;">
            Eliminar Escena Activa
          </button>
        ` : '<div></div>'}
        <button class="timeline-btn active" id="sm-close-btn">Listo</button>
      </div>
    `;

    // Hook events
    modal.querySelector('#sm-rename-btn')?.addEventListener('click', () => {
      const input = modal.querySelector('#sm-active-name') as HTMLInputElement;
      if (input && input.value.trim()) {
        timeline.updateTimelineSettings({ sceneName: input.value.trim() });
        renderModalContent();
      }
    });

    const form = modal.querySelector('#sm-new-scene-form') as HTMLElement;
    modal.querySelector('#sm-new-scene-btn')?.addEventListener('click', () => {
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });

    modal.querySelector('#sm-new-cancel')?.addEventListener('click', () => {
      form.style.display = 'none';
    });

    modal.querySelector('#sm-new-create')?.addEventListener('click', () => {
      const name = (modal.querySelector('#sm-new-name') as HTMLInputElement).value;
      const totalFrames = Number((modal.querySelector('#sm-new-frames') as HTMLInputElement).value) || 24;
      const fps = Number((modal.querySelector('#sm-new-fps') as HTMLInputElement).value) || 12;
      const dup = (modal.querySelector('#sm-new-dup') as HTMLInputElement).checked;

      timeline.createScene(name, dup);
      timeline.updateTimelineSettings({
        totalFrames,
        fps,
        startFrame: 1,
        endFrame: totalFrames,
      });
      renderModalContent();
    });

    modal.querySelector('#sm-dup-scene-btn')?.addEventListener('click', () => {
      timeline.createScene(`${timeline.activeScene.name} (Copia)`, true);
      renderModalContent();
    });

    modal.querySelectorAll('.btn-switch-sc').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id;
        if (id) {
          timeline.switchScene(id);
          renderModalContent();
        }
      });
    });

    modal.querySelectorAll('.btn-del-sc').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id;
        if (id && timeline.scenes.length > 1) {
          const sc = timeline.scenes.find((s) => s.id === id);
          if (confirm(`¿Eliminar la escena "${sc?.name}"?`)) {
            timeline.deleteScene(id);
            renderModalContent();
          }
        }
      });
    });

    modal.querySelector('#sm-del-active-btn')?.addEventListener('click', () => {
      if (timeline.scenes.length > 1) {
        if (confirm(`¿Eliminar la escena "${timeline.activeScene.name}"?`)) {
          timeline.deleteScene(timeline.activeSceneId);
          renderModalContent();
        }
      }
    });

    modal.querySelector('#sm-close-btn')?.addEventListener('click', () => {
      backdrop.remove();
    });
  };

  renderModalContent();
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.remove();
  });
}

// --- Modal: Keyframe Inspector & Transform Editor ---
function openKeyframeEditorModal(
  timeline: TimelineManager,
  track: AnimationTrack,
  frame: number
): void {
  const backdrop = document.createElement('div');
  backdrop.className = 'onion-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'onion-modal';

  const existing = track.keyframes.get(frame);
  const currentVal = existing ?? {
    frame,
    ...timeline.getInterpolatedTransform(track.id, frame),
    interpolation: 'smooth' as InterpolationType,
  };

  modal.innerHTML = `
    <h3>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd43b" stroke="#ffd43b" stroke-width="1.5">
        <polygon points="12 2 22 12 12 22 2 12 12 2"/>
      </svg>
      Keyframe — ${track.name} (Fotograma ${frame})
    </h3>

    <div class="onion-setting-row">
      <label>Interpolación</label>
      <select id="kf-interp" style="width:130px;">
        <option value="smooth" ${currentVal.interpolation === 'smooth' ? 'selected' : ''}>◆ Suave (Smooth)</option>
        <option value="linear" ${currentVal.interpolation === 'linear' ? 'selected' : ''}>◇ Lineal (Linear)</option>
        <option value="hold" ${currentVal.interpolation === 'hold' ? 'selected' : ''}>■ Fijo (Hold)</option>
      </select>
    </div>

    <div class="onion-setting-row">
      <label>Posición X (px)</label>
      <input type="number" id="kf-x" min="-1600" max="1600" step="5" value="${Math.round(currentVal.x)}"/>
    </div>

    <div class="onion-setting-row">
      <label>Posición Y (px)</label>
      <input type="number" id="kf-y" min="-900" max="900" step="5" value="${Math.round(currentVal.y)}"/>
    </div>

    <div class="onion-setting-row">
      <label>Escala (%)</label>
      <input type="number" id="kf-scale" min="10" max="500" step="5" value="${Math.round(currentVal.scaleX * 100)}"/>
    </div>

    <div class="onion-setting-row">
      <label>Rotación (°)</label>
      <input type="number" id="kf-rot" min="-360" max="360" step="5" value="${Math.round(currentVal.rotation)}"/>
    </div>

    <div class="onion-setting-row">
      <label>Opacidad de pista (%)</label>
      <input type="number" id="kf-opacity" min="0" max="100" step="5" value="${Math.round(currentVal.opacity * 100)}"/>
    </div>

    <div class="onion-modal-actions" style="justify-content:space-between;">
      <button class="timeline-btn" id="kf-delete" style="color:#ff6b6b; border-color:#663333;">Eliminar Key</button>
      <div style="display:flex; gap:6px;">
        <button class="timeline-btn" id="kf-reset">Resetear</button>
        <button class="timeline-btn active" id="kf-close">Listo</button>
      </div>
    </div>
  `;

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  const interpEl = modal.querySelector('#kf-interp') as HTMLSelectElement;
  const xEl = modal.querySelector('#kf-x') as HTMLInputElement;
  const yEl = modal.querySelector('#kf-y') as HTMLInputElement;
  const scaleEl = modal.querySelector('#kf-scale') as HTMLInputElement;
  const rotEl = modal.querySelector('#kf-rot') as HTMLInputElement;
  const opEl = modal.querySelector('#kf-opacity') as HTMLInputElement;

  const commitLive = () => {
    const s = Math.max(0.05, (Number(scaleEl.value) || 100) / 100);
    timeline.addOrUpdateKeyframe(track.id, frame, {
      interpolation: interpEl.value as InterpolationType,
      x: Number(xEl.value) || 0,
      y: Number(yEl.value) || 0,
      scaleX: s,
      scaleY: s,
      rotation: Number(rotEl.value) || 0,
      opacity: Math.max(0, Math.min(1, (Number(opEl.value) ?? 100) / 100)),
    });
  };

  interpEl.addEventListener('change', commitLive);
  xEl.addEventListener('input', commitLive);
  yEl.addEventListener('input', commitLive);
  scaleEl.addEventListener('input', commitLive);
  rotEl.addEventListener('input', commitLive);
  opEl.addEventListener('input', commitLive);

  const close = () => backdrop.remove();

  modal.querySelector('#kf-reset')?.addEventListener('click', () => {
    xEl.value = '0';
    yEl.value = '0';
    scaleEl.value = '100';
    rotEl.value = '0';
    opEl.value = '100';
    commitLive();
  });

  modal.querySelector('#kf-delete')?.addEventListener('click', () => {
    timeline.deleteKeyframe(track.id, frame);
    close();
  });

  modal.querySelector('#kf-close')?.addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
}

function openOnionSkinModal(timeline: TimelineManager, _layerManager: LayerManager): void {
  const backdrop = document.createElement('div');
  backdrop.className = 'onion-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'onion-modal';

  let currentTab: 'general' | 'lightTable' = 'general';

  const renderModal = () => {
    const skin = timeline.onionSkin;
    const customRefs = skin.customReferences;
    let activeRef = customRefs.find((r) => r.celId === skin.activeReferenceCelId) ?? customRefs[0];

    // If no custom ref exists yet, find previous cel to allow calibrating it immediately
    let fallbackCelId: string | null = null;
    let fallbackName = 'Celda Anterior';
    if (!activeRef && timeline.tracks.length > 0) {
      const activeTrack = timeline.tracks[0];
      const curF = timeline.settings.currentFrame;
      const sorted = Array.from(activeTrack.exposures.keys()).sort((a, b) => a - b);
      const prevF = [...sorted].reverse().find((frame) => frame < curF);
      if (prevF !== undefined) {
        fallbackCelId = activeTrack.exposures.get(prevF) ?? null;
        if (fallbackCelId) {
          fallbackName = `${activeTrack.name} (F${prevF})`;
        }
      }
    }

    const currentCelId = activeRef ? activeRef.celId : fallbackCelId;
    const currentTransform = currentCelId ? timeline.getOnionSkinTransform(currentCelId) : null;

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="margin:0;">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="9"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="12" cy="12" r="1"/>
          </svg>
          Papel Cebolla y Mesa de Luz
        </h3>
        <button class="csp-lt-mini-btn close" id="onion-modal-top-close" title="Cerrar">✕</button>
      </div>

      <div class="onion-modal-tabs">
        <button class="onion-modal-tab-btn ${currentTab === 'general' ? 'active' : ''}" id="tab-onion-general">
          Configuración General
        </button>
        <button class="onion-modal-tab-btn ${currentTab === 'lightTable' ? 'active' : ''}" id="tab-onion-lt">
          Mesa de Luz y Calibración
        </button>
      </div>

      ${currentTab === 'general' ? `
        <div class="onion-setting-row">
          <label>Mostrar Papel Cebolla</label>
          <input type="checkbox" id="onion-enable" ${skin.enabled ? 'checked' : ''}/>
        </div>

        <div class="onion-setting-row">
          <label>Modo de visualización</label>
          <select id="onion-mode">
            <option value="tint" ${skin.mode === 'tint' ? 'selected' : ''}>Tintado Monocromo</option>
            <option value="color" ${skin.mode === 'color' ? 'selected' : ''}>Color Original</option>
          </select>
        </div>

        <div class="onion-setting-row">
          <label>Celdas anteriores (Pasado)</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="number" id="onion-prev-count" min="1" max="10" value="${skin.prevFrames}"/>
            <input type="color" id="onion-prev-color" value="${skin.prevColor}"/>
          </div>
        </div>

        <div class="onion-setting-row">
          <label>Celdas posteriores (Futuro)</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="number" id="onion-next-count" min="1" max="10" value="${skin.nextFrames}"/>
            <input type="color" id="onion-next-color" value="${skin.nextColor}"/>
          </div>
        </div>

        <div class="onion-setting-row">
          <label>Opacidad inicial (%)</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="range" id="onion-start-opacity-range" min="5" max="100" step="5" value="${Math.round(skin.startOpacity * 100)}" style="width:100px;"/>
            <span id="onion-start-opacity-lbl" style="font-size:11px; font-family:monospace; min-width:32px;">${Math.round(skin.startOpacity * 100)}%</span>
          </div>
        </div>

        <div class="onion-setting-row">
          <label>Atenuación por distancia (%)</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="range" id="onion-step-opacity-range" min="0" max="30" step="5" value="${Math.round(skin.stepOpacity * 100)}" style="width:100px;"/>
            <span id="onion-step-opacity-lbl" style="font-size:11px; font-family:monospace; min-width:32px;">${Math.round(skin.stepOpacity * 100)}%</span>
          </div>
        </div>
      ` : `
        <!-- Light Table / Reference Calibration Tab -->
        <div class="csp-lt-quick-bar" style="margin-bottom:10px;">
          <button class="timeline-btn" id="onion-lt-add-prev" title="Fijar celda anterior como referencia">
            <span>[◀ Anterior</span>
          </button>
          <button class="timeline-btn" id="onion-lt-add-next" title="Fijar celda siguiente como referencia">
            <span>Siguiente ▶]</span>
          </button>
          <select class="timeline-select" id="onion-lt-add-select" style="flex:1;" title="Añadir cualquier celda a la mesa de luz">
            <option value="">+ Fijar Celda...</option>
          </select>
        </div>

        <div class="csp-lt-section-title">
          <span>Celdas Registradas (${customRefs.length})</span>
          ${customRefs.length > 0 ? '<button class="csp-lt-text-link" id="onion-lt-clear-all">Limpiar todo</button>' : ''}
        </div>

        <div class="csp-lt-list-wrap" style="max-height:120px; overflow-y:auto; margin-bottom:10px;">
          ${customRefs.length === 0 ? `
            <div class="csp-lt-empty-hint" style="padding:10px 6px;">
              ${fallbackCelId ? `Calibrando <strong>${fallbackName}</strong>.<br/>Usa <strong>[◀ Anterior]</strong> o <strong>[Siguiente ▶]</strong> para fijar referencias fijas.` : 'Sin referencias registradas.'}
            </div>
          ` : ''}

          ${customRefs.map((ref) => {
            const isActive = activeRef && activeRef.id === ref.id;
            return `
              <div class="csp-lt-item-row ${isActive ? 'active' : ''}" data-id="${ref.id}">
                <button class="csp-lt-eye-btn ${ref.visible ? 'visible' : ''}" data-id="${ref.id}" title="${ref.visible ? 'Ocultar' : 'Mostrar'}">
                  ${ref.visible ? '👁' : '─'}
                </button>
                <div class="csp-lt-item-info">
                  <span class="csp-lt-item-name">${ref.name}</span>
                  <span class="csp-lt-item-sub">${ref.trackName ?? 'Pista'} · F${ref.frame ?? '?'}</span>
                </div>
                <div class="csp-lt-item-swatch" style="background:${ref.colorMode === 'color' ? 'linear-gradient(45deg, #f00, #0f0, #00f)' : (ref.tintColor ?? '#ffd43b')};"></div>
                <button class="csp-lt-item-del" data-id="${ref.id}" title="Quitar referencia">✕</button>
              </div>
            `;
          }).join('')}
        </div>

        ${currentCelId && currentTransform ? `
          <div class="csp-lt-detail-box" style="margin-top:4px;">
            <div class="csp-lt-detail-header">
              <span>Ajustes: <strong>${activeRef ? activeRef.name : fallbackName}</strong></span>
              <button class="timeline-btn" id="onion-lt-reset-btn" style="height:20px; font-size:10px; padding:0 6px;" title="Restablecer posición, escala y rotación original">
                ↺ Restablecer
              </button>
            </div>

            <!-- Opacity & Tint -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <div style="display:flex; align-items:center; gap:6px;">
                <label style="font-size:11px; color:#888;">Opacidad:</label>
                <input type="range" id="onion-ref-opacity" min="5" max="100" value="${Math.round((activeRef?.opacity ?? skin.startOpacity) * 100)}" style="width:70px;"/>
                <span style="font-size:10px; font-family:monospace;">${Math.round((activeRef?.opacity ?? skin.startOpacity) * 100)}%</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px;">
                <label style="font-size:11px; color:#888;">Tinte:</label>
                <input type="color" id="onion-ref-tint" value="${activeRef?.tintColor ?? '#ffd43b'}" style="width:24px; height:20px; padding:0; border:1px solid #444; border-radius:3px; cursor:pointer;"/>
              </div>
            </div>

            <!-- Position D-Pad & Inputs -->
            <div class="csp-lt-transform-section">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:10px; font-weight:600; color:#888; text-transform:uppercase;">Posición y Escala</span>
                <div style="display:flex; gap:4px;">
                  <button class="timeline-btn ${currentTransform.flipX ? 'active' : ''}" id="onion-flip-h" style="height:20px; font-size:10px; padding:0 5px;" title="Voltear Horizontal">⇄ H</button>
                  <button class="timeline-btn ${currentTransform.flipY ? 'active' : ''}" id="onion-flip-v" style="height:20px; font-size:10px; padding:0 5px;" title="Voltear Vertical">⇅ V</button>
                </div>
              </div>

              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                <div class="csp-lt-dpad">
                  <div></div>
                  <button class="csp-lt-dpad-btn" id="onion-pad-up" title="Mover arriba">▲</button>
                  <div></div>
                  <button class="csp-lt-dpad-btn" id="onion-pad-left" title="Mover izquierda">◀</button>
                  <button class="csp-lt-dpad-btn center" id="onion-pad-center" title="Centrar">●</button>
                  <button class="csp-lt-dpad-btn" id="onion-pad-right" title="Mover derecha">▶</button>
                  <div></div>
                  <button class="csp-lt-dpad-btn" id="onion-pad-down" title="Mover abajo">▼</button>
                  <div></div>
                </div>

                <div style="display:flex; flex-direction:column; gap:4px; font-size:11px;">
                  <div style="display:flex; align-items:center; gap:4px;">
                    <span style="color:#777; width:12px;">X:</span>
                    <input type="number" id="onion-num-x" value="${Math.round(currentTransform.x)}" style="width:55px; background:#111; border:1px solid #444; border-radius:3px; color:#eee; font-size:11px; padding:2px 4px;"/>
                    <span style="color:#666; font-size:10px;">px</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:4px;">
                    <span style="color:#777; width:12px;">Y:</span>
                    <input type="number" id="onion-num-y" value="${Math.round(currentTransform.y)}" style="width:55px; background:#111; border:1px solid #444; border-radius:3px; color:#eee; font-size:11px; padding:2px 4px;"/>
                    <span style="color:#666; font-size:10px;">px</span>
                  </div>
                </div>
              </div>

              <!-- Rotation -->
              <div class="onion-setting-row" style="margin-bottom:6px;">
                <label>Rotación</label>
                <div style="display:flex; align-items:center; gap:4px;">
                  <button class="timeline-btn" id="onion-rot-m15" style="height:20px; padding:0 4px; font-size:10px;">-15°</button>
                  <input type="range" id="onion-rot-slider" min="-180" max="180" value="${Math.round(currentTransform.rotation)}" style="width:90px;"/>
                  <button class="timeline-btn" id="onion-rot-p15" style="height:20px; padding:0 4px; font-size:10px;">+15°</button>
                  <span style="font-size:10px; font-family:monospace; min-width:28px; text-align:right;">${Math.round(currentTransform.rotation)}°</span>
                </div>
              </div>

              <!-- Scale -->
              <div class="onion-setting-row" style="margin-bottom:0;">
                <label>Escala</label>
                <div style="display:flex; align-items:center; gap:4px;">
                  <input type="range" id="onion-scale-slider" min="20" max="250" value="${Math.round(currentTransform.scaleX * 100)}" style="width:130px;"/>
                  <span style="font-size:10px; font-family:monospace; min-width:32px; text-align:right;">${Math.round(currentTransform.scaleX * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      `}

      <div class="onion-modal-actions" style="margin-top:14px;">
        <button class="timeline-btn" id="onion-modal-close">Cerrar</button>
      </div>
    `;

    // Wire up tabs
    modal.querySelector('#tab-onion-general')?.addEventListener('click', () => {
      currentTab = 'general';
      renderModal();
    });
    modal.querySelector('#tab-onion-lt')?.addEventListener('click', () => {
      currentTab = 'lightTable';
      renderModal();
    });

    modal.querySelector('#onion-modal-top-close')?.addEventListener('click', close);
    modal.querySelector('#onion-modal-close')?.addEventListener('click', close);

    if (currentTab === 'general') {
      const enableCheck = modal.querySelector('#onion-enable') as HTMLInputElement;
      const modeSelect = modal.querySelector('#onion-mode') as HTMLSelectElement;
      const prevCount = modal.querySelector('#onion-prev-count') as HTMLInputElement;
      const prevColor = modal.querySelector('#onion-prev-color') as HTMLInputElement;
      const nextCount = modal.querySelector('#onion-next-count') as HTMLInputElement;
      const nextColor = modal.querySelector('#onion-next-color') as HTMLInputElement;
      const startRange = modal.querySelector('#onion-start-opacity-range') as HTMLInputElement;
      const stepRange = modal.querySelector('#onion-step-opacity-range') as HTMLInputElement;

      const apply = () => {
        timeline.setOnionSkin({
          enabled: enableCheck.checked,
          mode: modeSelect.value as 'tint' | 'color',
          prevFrames: Number(prevCount.value),
          prevColor: prevColor.value,
          nextFrames: Number(nextCount.value),
          nextColor: nextColor.value,
          startOpacity: Number(startRange.value) / 100,
          stepOpacity: Number(stepRange.value) / 100,
        });
        const lblStart = modal.querySelector('#onion-start-opacity-lbl');
        if (lblStart) lblStart.textContent = `${startRange.value}%`;
        const lblStep = modal.querySelector('#onion-step-opacity-lbl');
        if (lblStep) lblStep.textContent = `${stepRange.value}%`;
      };

      enableCheck?.addEventListener('change', apply);
      modeSelect?.addEventListener('change', apply);
      prevCount?.addEventListener('input', apply);
      prevColor?.addEventListener('input', apply);
      nextCount?.addEventListener('input', apply);
      nextColor?.addEventListener('input', apply);
      startRange?.addEventListener('input', apply);
      stepRange?.addEventListener('input', apply);
    } else {
      // Light Table Tab Wiring
      modal.querySelector('#onion-lt-add-prev')?.addEventListener('click', () => {
        timeline.registerPrevCelToLightTable();
        renderModal();
      });

      modal.querySelector('#onion-lt-add-next')?.addEventListener('click', () => {
        timeline.registerNextCelToLightTable();
        renderModal();
      });

      modal.querySelector('#onion-lt-clear-all')?.addEventListener('click', () => {
        const refs = [...timeline.onionSkin.customReferences];
        for (const r of refs) {
          timeline.removeCustomOnionReference(r.id);
        }
        renderModal();
      });

      // Populate Select
      const selectEl = modal.querySelector('#onion-lt-add-select') as HTMLSelectElement;
      if (selectEl) {
        for (const track of timeline.tracks) {
          const cels = timeline.getCelsInTrack(track.id);
          for (const cel of cels) {
            const opt = document.createElement('option');
            opt.value = cel.id;
            opt.textContent = `${track.name}: ${cel.name}`;
            selectEl.appendChild(opt);
          }
        }
        selectEl.addEventListener('change', () => {
          if (selectEl.value) {
            timeline.addCustomOnionReference(selectEl.value);
            renderModal();
          }
        });
      }

      // Selection & item row actions
      modal.querySelectorAll('.csp-lt-item-row').forEach((row) => {
        const id = (row as HTMLElement).dataset.id;
        row.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('csp-lt-eye-btn') || target.classList.contains('csp-lt-item-del')) {
            return;
          }
          if (id) {
            const ref = timeline.onionSkin.customReferences.find((r) => r.id === id);
            if (ref) {
              timeline.setActiveReferenceCel(ref.celId);
              renderModal();
            }
          }
        });
      });

      modal.querySelectorAll('.csp-lt-eye-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = (btn as HTMLElement).dataset.id;
          const ref = timeline.onionSkin.customReferences.find((r) => r.id === id);
          if (ref) {
            timeline.updateCustomOnionReference(ref.id, { visible: !ref.visible });
            renderModal();
          }
        });
      });

      modal.querySelectorAll('.csp-lt-item-del').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = (btn as HTMLElement).dataset.id;
          if (id) {
            timeline.removeCustomOnionReference(id);
            renderModal();
          }
        });
      });

      // Transform Controls for active reference / cel
      if (currentCelId && currentTransform) {
        const targetCelId = currentCelId;

        modal.querySelector('#onion-lt-reset-btn')?.addEventListener('click', () => {
          timeline.resetOnionSkinTransform(targetCelId);
          renderModal();
        });

        // Opacity
        modal.querySelector('#onion-ref-opacity')?.addEventListener('input', (e) => {
          const val = Number((e.target as HTMLInputElement).value) / 100;
          if (activeRef) {
            timeline.updateCustomOnionReference(activeRef.id, { opacity: val });
          } else {
            timeline.setOnionSkin({ startOpacity: val });
          }
          const lbl = (e.target as HTMLElement).nextElementSibling;
          if (lbl) lbl.textContent = `${Math.round(val * 100)}%`;
        });

        // Tint
        modal.querySelector('#onion-ref-tint')?.addEventListener('input', (e) => {
          const val = (e.target as HTMLInputElement).value;
          if (activeRef) {
            timeline.updateCustomOnionReference(activeRef.id, { tintColor: val, colorMode: 'monochrome' });
          } else {
            timeline.setOnionSkin({ prevColor: val });
          }
        });

        // Flip H & V
        modal.querySelector('#onion-flip-h')?.addEventListener('click', () => {
          const t = timeline.getOnionSkinTransform(targetCelId);
          timeline.updateOnionSkinTransform(targetCelId, { flipX: !t.flipX });
          renderModal();
        });

        modal.querySelector('#onion-flip-v')?.addEventListener('click', () => {
          const t = timeline.getOnionSkinTransform(targetCelId);
          timeline.updateOnionSkinTransform(targetCelId, { flipY: !t.flipY });
          renderModal();
        });

        // D-Pad
        const STEP = 5;
        modal.querySelector('#onion-pad-up')?.addEventListener('click', () => {
          const t = timeline.getOnionSkinTransform(targetCelId);
          timeline.updateOnionSkinTransform(targetCelId, { y: t.y - STEP });
          renderModal();
        });
        modal.querySelector('#onion-pad-down')?.addEventListener('click', () => {
          const t = timeline.getOnionSkinTransform(targetCelId);
          timeline.updateOnionSkinTransform(targetCelId, { y: t.y + STEP });
          renderModal();
        });
        modal.querySelector('#onion-pad-left')?.addEventListener('click', () => {
          const t = timeline.getOnionSkinTransform(targetCelId);
          timeline.updateOnionSkinTransform(targetCelId, { x: t.x - STEP });
          renderModal();
        });
        modal.querySelector('#onion-pad-right')?.addEventListener('click', () => {
          const t = timeline.getOnionSkinTransform(targetCelId);
          timeline.updateOnionSkinTransform(targetCelId, { x: t.x + STEP });
          renderModal();
        });
        modal.querySelector('#onion-pad-center')?.addEventListener('click', () => {
          timeline.updateOnionSkinTransform(targetCelId, { x: 0, y: 0 });
          renderModal();
        });

        // Number X and Y
        modal.querySelector('#onion-num-x')?.addEventListener('change', (e) => {
          const val = Number((e.target as HTMLInputElement).value);
          timeline.updateOnionSkinTransform(targetCelId, { x: val });
        });
        modal.querySelector('#onion-num-y')?.addEventListener('change', (e) => {
          const val = Number((e.target as HTMLInputElement).value);
          timeline.updateOnionSkinTransform(targetCelId, { y: val });
        });

        // Rotation
        const rotSlider = modal.querySelector('#onion-rot-slider') as HTMLInputElement;
        rotSlider?.addEventListener('input', () => {
          const deg = Number(rotSlider.value);
          timeline.updateOnionSkinTransform(targetCelId, { rotation: deg });
          const lbl = rotSlider.nextElementSibling?.nextElementSibling;
          if (lbl) lbl.textContent = `${deg}°`;
        });
        modal.querySelector('#onion-rot-m15')?.addEventListener('click', () => {
          const t = timeline.getOnionSkinTransform(targetCelId);
          timeline.updateOnionSkinTransform(targetCelId, { rotation: t.rotation - 15 });
          renderModal();
        });
        modal.querySelector('#onion-rot-p15')?.addEventListener('click', () => {
          const t = timeline.getOnionSkinTransform(targetCelId);
          timeline.updateOnionSkinTransform(targetCelId, { rotation: t.rotation + 15 });
          renderModal();
        });

        // Scale
        const scaleSlider = modal.querySelector('#onion-scale-slider') as HTMLInputElement;
        scaleSlider?.addEventListener('input', () => {
          const pct = Number(scaleSlider.value);
          const factor = pct / 100;
          timeline.updateOnionSkinTransform(targetCelId, { scaleX: factor, scaleY: factor });
          const lbl = scaleSlider.nextElementSibling;
          if (lbl) lbl.textContent = `${pct}%`;
        });
      }
    }
  };

  const close = (): void => {
    backdrop.remove();
  };

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  renderModal();
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
}

function showTimelineContextMenu(
  x: number,
  y: number,
  track: AnimationTrack,
  targetFrame: number,
  timeline: TimelineManager,
  layerManager: LayerManager
): void {
  document.querySelectorAll('.timeline-context-menu').forEach((el) => el.remove());

  const menu = document.createElement('div');
  menu.className = 'timeline-context-menu';

  // 1. Header with Track Name and Frame Number
  const header = document.createElement('div');
  header.className = 'context-menu-header';
  header.innerHTML = `<span>${track.name}</span><span style="color:#00e5ff;">Fotograma ${targetFrame}</span>`;
  menu.appendChild(header);

  // 2. Section: Asignar Celda Existente (Specify Cel)
  const cels = timeline.getCelsInTrack(track.id);
  const currentAssignedCelId = track.exposures.get(targetFrame);
  const activeCelAtFrame = timeline.getActiveCelForFrame(track.id, targetFrame);

  const sectionTitle = document.createElement('div');
  sectionTitle.className = 'context-menu-section-title';
  sectionTitle.textContent = 'Asignar Celda Existente';
  menu.appendChild(sectionTitle);

  const celsList = document.createElement('div');
  celsList.className = 'context-menu-cels-list';

  if (cels.length === 0) {
    const emptyItem = document.createElement('div');
    emptyItem.className = 'context-menu-item';
    emptyItem.style.color = '#777777';
    emptyItem.style.fontStyle = 'italic';
    emptyItem.textContent = '(Sin celdas en la pista)';
    celsList.appendChild(emptyItem);
  } else {
    for (const cel of cels) {
      const item = document.createElement('div');
      item.className = 'context-menu-item';
      const isAssigned = currentAssignedCelId === cel.id;
      if (isAssigned) {
        item.classList.add('active');
      }

      item.innerHTML = `
        <span style="display:flex; align-items:center; gap:6px;">
          <span style="width:7px; height:7px; border-radius:50%; background:${isAssigned ? '#00e5ff' : '#627d98'};"></span>
          <span>${cel.name}</span>
        </span>
        ${isAssigned ? '<span style="color:#00e5ff; font-weight:bold;">✓</span>' : ''}
      `;

      item.addEventListener('click', () => {
        timeline.specifyCel(track.id, targetFrame, cel.id);
        timeline.goToFrame(targetFrame);
        layerManager.setActiveLayer(cel.id);
        menu.remove();
      });
      celsList.appendChild(item);
    }
  }
  menu.appendChild(celsList);

  const sep1 = document.createElement('div');
  sep1.className = 'context-menu-separator';
  menu.appendChild(sep1);

  // 3. Option: Nueva celda de animación (+)
  const newCelItem = document.createElement('div');
  newCelItem.className = 'context-menu-item';
  newCelItem.innerHTML = `
    <span style="display:flex; align-items:center; gap:6px;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
      <span>Nueva celda de animación</span>
    </span>
  `;
  newCelItem.addEventListener('click', () => {
    timeline.createCel(track.id, targetFrame);
    timeline.goToFrame(targetFrame);
    menu.remove();
  });
  menu.appendChild(newCelItem);

  // 4. Option: Añadir / Editar Keyframe en este fotograma
  const addKfItem = document.createElement('div');
  addKfItem.className = 'context-menu-item';
  addKfItem.innerHTML = `
    <span style="display:flex; align-items:center; gap:6px;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffd43b" stroke="#ffd43b" stroke-width="1.5"><polygon points="12 2 22 12 12 22 2 12 12 2"/></svg>
      <span>${track.keyframes.has(targetFrame) ? 'Editar Keyframe en este frame' : 'Insertar Keyframe aquí'}</span>
    </span>
  `;
  addKfItem.addEventListener('click', () => {
    timeline.goToFrame(targetFrame);
    if (!track.keyframes.has(targetFrame)) {
      timeline.addOrUpdateKeyframe(track.id, targetFrame);
    }
    menu.remove();
    openKeyframeEditorModal(timeline, track, targetFrame);
  });
  menu.appendChild(addKfItem);

  // 5. Option: Dividir Clip aquí (Split Clip)
  const splitClipItem = document.createElement('div');
  splitClipItem.className = 'context-menu-item';
  splitClipItem.innerHTML = `
    <span style="display:flex; align-items:center; gap:6px;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><polyline points="8 6 4 12 8 18"/><polyline points="16 6 20 12 16 18"/></svg>
      <span>Dividir Clip en fotograma ${targetFrame}</span>
    </span>
  `;
  splitClipItem.addEventListener('click', () => {
    timeline.splitClip(track.id, targetFrame);
    menu.remove();
  });
  menu.appendChild(splitClipItem);

  // 6. Option: Asignar por lotes (a 1s, a 2s, a 3s)
  const batchSubItem = document.createElement('div');
  batchSubItem.className = 'context-menu-item';
  batchSubItem.innerHTML = `
    <span style="display:flex; align-items:center; gap:6px;">
      <span>Asignar celdas en lote:</span>
    </span>
    <span style="display:flex; gap:4px;">
      <button class="timeline-btn" data-step="1" style="height:20px; padding:0 5px;">1s</button>
      <button class="timeline-btn" data-step="2" style="height:20px; padding:0 5px;">2s</button>
      <button class="timeline-btn" data-step="3" style="height:20px; padding:0 5px;">3s</button>
    </span>
  `;
  batchSubItem.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const step = Number((btn as HTMLElement).dataset.step) || 2;
      timeline.batchSpecifyCels(track.id, step);
      menu.remove();
    });
  });
  menu.appendChild(batchSubItem);

  // 7. Option: Eliminar especificación de celda (si hay una clave en este frame)
  if (track.exposures.has(targetFrame)) {
    const removeExpItem = document.createElement('div');
    removeExpItem.className = 'context-menu-item';
    removeExpItem.innerHTML = `
      <span style="display:flex; align-items:center; gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span>Eliminar exposición de este frame</span>
      </span>
    `;
    removeExpItem.addEventListener('click', () => {
      timeline.removeExposure(track.id, targetFrame);
      menu.remove();
    });
    menu.appendChild(removeExpItem);
  }

  // 8. Option: Eliminar Celda permanentemente
  if (activeCelAtFrame) {
    const sep2 = document.createElement('div');
    sep2.className = 'context-menu-separator';
    menu.appendChild(sep2);

    const deleteCelItem = document.createElement('div');
    deleteCelItem.className = 'context-menu-item danger';
    deleteCelItem.innerHTML = `
      <span style="display:flex; align-items:center; gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        <span>Eliminar celda "${activeCelAtFrame.name}" del proyecto</span>
      </span>
    `;
    deleteCelItem.addEventListener('click', () => {
      if (confirm(`¿Eliminar la celda "${activeCelAtFrame.name}" permanentemente del proyecto?`)) {
        timeline.deleteCelLayer(track.id, activeCelAtFrame.id);
      }
      menu.remove();
    });
    menu.appendChild(deleteCelItem);
  }

  document.body.appendChild(menu);
  const menuRect = menu.getBoundingClientRect();
  let finalX = x;
  let finalY = y;
  if (finalX + menuRect.width > window.innerWidth) {
    finalX = window.innerWidth - menuRect.width - 10;
  }
  if (finalY + menuRect.height > window.innerHeight) {
    finalY = y - menuRect.height - 4;
  }
  menu.style.left = `${Math.max(10, finalX)}px`;
  menu.style.top = `${Math.max(10, finalY)}px`;

  const dismiss = (ev: MouseEvent) => {
    if (!menu.contains(ev.target as Node)) {
      menu.remove();
      window.removeEventListener('mousedown', dismiss);
      window.removeEventListener('keydown', onKeyDown);
    }
  };

  const onKeyDown = (ke: KeyboardEvent) => {
    if (ke.key === 'Escape') {
      menu.remove();
      window.removeEventListener('mousedown', dismiss);
      window.removeEventListener('keydown', onKeyDown);
    }
  };

  window.addEventListener('mousedown', dismiss);
  window.addEventListener('keydown', onKeyDown);
}
