import type { LayerManager } from '../brush/layers';
import './timeline.css';
import type { TimelineManager } from './timelineManager';
import type { AnimationTrack } from './timelineModel';

let cellWidth = 22;
const MIN_CELL_WIDTH = 10;
const MAX_CELL_WIDTH = 64;

export function mountTimelineView(
  container: HTMLElement,
  timeline: TimelineManager,
  layerManager: LayerManager
): void {
  container.innerHTML = '';

  const panel = document.createElement('div');
  panel.className = 'timeline-panel';
  panel.style.setProperty('--cell-width', `${cellWidth}px`);

  let zoomSlider: HTMLInputElement | null = null;
  let zoomLabel: HTMLSpanElement | null = null;

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

  // Left group: Transport
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

  // Separator
  const sep1 = document.createElement('div');
  sep1.className = 'timeline-separator';
  transportGroup.appendChild(sep1);

  // Flip Keys: Prev Cel & Next Cel
  const prevCelBtn = document.createElement('button');
  prevCelBtn.className = 'timeline-btn';
  prevCelBtn.title = 'Celda anterior (Atajo: [)';
  prevCelBtn.innerHTML = `<span>[ ◀ Cel</span>`;
  prevCelBtn.addEventListener('click', () => timeline.prevCel());
  transportGroup.appendChild(prevCelBtn);

  const nextCelBtn = document.createElement('button');
  nextCelBtn.className = 'timeline-btn';
  nextCelBtn.title = 'Celda siguiente (Atajo: ])';
  nextCelBtn.innerHTML = `<span>Cel ▶ ]</span>`;
  nextCelBtn.addEventListener('click', () => timeline.nextCel());
  transportGroup.appendChild(nextCelBtn);

  // Frame Counter Display
  const frameDisplay = document.createElement('div');
  frameDisplay.className = 'timeline-frame-counter';
  frameDisplay.title = 'Fotograma actual / Total. Clic para cambiar duración.';
  frameDisplay.textContent = `${timeline.settings.currentFrame} / ${timeline.settings.totalFrames}`;
  frameDisplay.addEventListener('click', () => {
    const input = prompt('Duración total de fotogramas (1 - 240):', String(timeline.settings.totalFrames));
    if (input) {
      const val = parseInt(input, 10);
      if (!isNaN(val) && val > 0) {
        timeline.setTotalFrames(val);
      }
    }
  });
  transportGroup.appendChild(frameDisplay);

  // FPS Selector
  const fpsSelect = document.createElement('select');
  fpsSelect.className = 'timeline-select';
  fpsSelect.title = 'Tasa de fotogramas (FPS)';
  for (const fps of [8, 12, 16, 24, 30, 60]) {
    const opt = document.createElement('option');
    opt.value = String(fps);
    opt.textContent = `${fps} fps`;
    if (fps === timeline.settings.fps) opt.selected = true;
    fpsSelect.appendChild(opt);
  }
  fpsSelect.addEventListener('change', () => {
    timeline.setFps(Number(fpsSelect.value));
  });
  transportGroup.appendChild(fpsSelect);

  header.appendChild(transportGroup);

  // Right group: Actions & Onion Skin
  const actionsGroup = document.createElement('div');
  actionsGroup.className = 'timeline-actions-group';

  // Add Animation Track
  const addTrackBtn = document.createElement('button');
  addTrackBtn.className = 'timeline-btn';
  addTrackBtn.title = 'Crear nueva Carpeta de Animación';
  addTrackBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
      <line x1="7" y1="2" x2="7" y2="22"/>
      <line x1="17" y1="2" x2="17" y2="22"/>
    </svg>
    <span>+ Pista</span>
  `;
  addTrackBtn.addEventListener('click', () => timeline.createTrack());
  actionsGroup.appendChild(addTrackBtn);

  // Add Cel
  const addCelBtn = document.createElement('button');
  addCelBtn.className = 'timeline-btn';
  addCelBtn.title = 'Crear nueva celda en el fotograma actual';
  addCelBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 5v14M5 12h14"/>
    </svg>
    <span>+ Celda</span>
  `;
  addCelBtn.addEventListener('click', () => timeline.createCel());
  actionsGroup.appendChild(addCelBtn);

  // Batch specify cels (on 2s, on 1s)
  const batchBtn = document.createElement('button');
  batchBtn.className = 'timeline-btn';
  batchBtn.title = 'Asignar celdas por lotes (a doses, a unos)';
  batchBtn.innerHTML = `<span>Lotes (a 2s)</span>`;
  batchBtn.addEventListener('click', () => {
    if (timeline.tracks.length > 0) {
      timeline.batchSpecifyCels(timeline.tracks[0].id, 2);
    }
  });
  actionsGroup.appendChild(batchBtn);

  const sep2 = document.createElement('div');
  sep2.className = 'timeline-separator';
  actionsGroup.appendChild(sep2);

  // Onion skin toggle
  const onionBtn = document.createElement('button');
  onionBtn.className = `timeline-btn ${timeline.onionSkin.enabled ? 'active' : ''}`;
  onionBtn.title = 'Activar / Desactivar Papel Cebolla (Atajo: O)';
  onionBtn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="12" cy="12" r="1"/>
    </svg>
    <span>Papel Cebolla</span>
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
    openOnionSkinModal(timeline);
  });
  actionsGroup.appendChild(onionSettingsBtn);

  const sep3 = document.createElement('div');
  sep3.className = 'timeline-separator';
  actionsGroup.appendChild(sep3);

  // Zoom Controls Group
  const zoomGroup = document.createElement('div');
  zoomGroup.className = 'timeline-zoom-group';
  zoomGroup.title = 'Zoom de fotogramas (Ctrl + Rueda sobre la línea de tiempo)';

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
  zoomSlider.title = 'Ajustar ancho de celdas';
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
  tracksCorner.textContent = 'Pistas de Animación';
  leftCol.appendChild(tracksCorner);

  const trackHeadersList = document.createElement('div');
  trackHeadersList.className = 'timeline-track-headers-list';
  leftCol.appendChild(trackHeadersList);
  body.appendChild(leftCol);

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

  function handleScrub(e: MouseEvent): void {
    const rect = gridContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left + gridContainer.scrollLeft;
    const targetFrame = Math.max(
      1,
      Math.min(timeline.settings.totalFrames, Math.floor(clickX / cellWidth) + 1)
    );
    timeline.goToFrame(targetFrame);
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

  // --- 4. Render Grid & Tracks ---
  function render(): void {
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
    fpsSelect.value = String(timeline.settings.fps);

    // Render Left Track Headers
    trackHeadersList.innerHTML = '';
    for (const track of timeline.tracks) {
      const item = document.createElement('div');
      item.className = 'timeline-track-header-item';

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

      const celCount = document.createElement('span');
      celCount.className = 'timeline-track-badge';
      celCount.textContent = `${track.exposures.size} cels`;
      item.appendChild(celCount);

      trackHeadersList.appendChild(item);
    }

    // Render Right Content (Ruler + Track Rows + Playhead)
    gridContent.innerHTML = '';
    const totalW = timeline.settings.totalFrames * cellWidth;
    gridContent.style.width = `${totalW}px`;

    // 1. Ruler
    const ruler = document.createElement('div');
    ruler.className = 'timeline-ruler';
    ruler.style.width = `${totalW}px`;

    for (let f = 1; f <= timeline.settings.totalFrames; f++) {
      const cell = document.createElement('div');
      cell.className = 'timeline-ruler-cell';
      if (f % 5 === 0 || f === 1) {
        cell.classList.add('major');
        cell.textContent = String(f);
      }
      if (f >= timeline.settings.startFrame && f <= timeline.settings.endFrame) {
        cell.classList.add('playback-bound');
      }
      cell.addEventListener('click', (ev) => {
        ev.stopPropagation();
        timeline.goToFrame(f);
      });
      ruler.appendChild(cell);
    }
    gridContent.appendChild(ruler);

    // 2. Track Rows
    for (const track of timeline.tracks) {
      const row = document.createElement('div');
      row.className = 'timeline-track-row';
      row.style.width = `${totalW}px`;

      // Background cell columns
      for (let f = 1; f <= timeline.settings.totalFrames; f++) {
        const fcell = document.createElement('div');
        fcell.className = 'timeline-frame-cell';
        if (track.exposures.has(f)) {
          fcell.classList.add('key-cell');
        }
        fcell.addEventListener('click', (ev) => {
          ev.stopPropagation();
          timeline.goToFrame(f);
        });
        fcell.addEventListener('dblclick', (ev) => {
          ev.stopPropagation();
          timeline.createCel(track.id, f);
        });
        fcell.addEventListener('contextmenu', (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          showTimelineContextMenu(ev.clientX, ev.clientY, track, f, timeline, layerManager);
        });
        row.appendChild(fcell);
      }

      // Sort exposures by frame
      const sortedExposures = Array.from(track.exposures.entries()).sort((a, b) => a[0] - b[0]);
      for (let i = 0; i < sortedExposures.length; i++) {
        const [expFrame, celId] = sortedExposures[i];
        const nextExp = sortedExposures[i + 1];
        const endSpan = nextExp ? nextExp[0] - 1 : timeline.settings.totalFrames;
        const spanLength = endSpan - expFrame + 1;

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

        block.style.left = `${(expFrame - 1) * cellWidth}px`;
        block.style.width = `${spanLength * cellWidth - 2}px`;

        const dot = document.createElement('div');
        dot.className = 'timeline-cel-dot';
        block.appendChild(dot);

        const lbl = document.createElement('span');
        lbl.className = 'timeline-cel-label';
        lbl.textContent = celLabel;
        block.appendChild(lbl);

        // Drag to move cel starting frame OR Click to select
        let dragStartX = 0;
        let dragOrigFrame = expFrame;
        let isDragging = false;

        block.addEventListener('mousedown', (e: MouseEvent) => {
          if (e.button !== 0) return; // Only left-click
          e.stopPropagation();
          dragStartX = e.clientX;
          dragOrigFrame = expFrame;
          isDragging = false;

          const onMouseMove = (moveEv: MouseEvent) => {
            const deltaX = moveEv.clientX - dragStartX;
            if (!isDragging && Math.abs(deltaX) > 4) {
              isDragging = true;
              block.classList.add('dragging');
            }
            if (isDragging) {
              const rect = gridContainer.getBoundingClientRect();
              const clickX = moveEv.clientX - rect.left + gridContainer.scrollLeft;
              const targetFrame = Math.max(
                1,
                Math.min(timeline.settings.totalFrames, Math.floor(clickX / cellWidth) + 1)
              );
              row.querySelectorAll('.timeline-frame-cell').forEach((el, idx) => {
                el.classList.toggle('drop-target', idx + 1 === targetFrame);
              });
            }
          };

          const onMouseUp = (upEv: MouseEvent) => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            row.querySelectorAll('.timeline-frame-cell').forEach((el) => el.classList.remove('drop-target'));

            if (isDragging) {
              block.classList.remove('dragging');
              const rect = gridContainer.getBoundingClientRect();
              const clickX = upEv.clientX - rect.left + gridContainer.scrollLeft;
              const targetFrame = Math.max(
                1,
                Math.min(timeline.settings.totalFrames, Math.floor(clickX / cellWidth) + 1)
              );
              if (targetFrame !== dragOrigFrame) {
                timeline.moveExposure(track.id, dragOrigFrame, targetFrame);
              }
            } else {
              timeline.goToFrame(expFrame);
              if (celLayer) {
                layerManager.setActiveLayer(celLayer.id);
              }
            }
          };

          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('mouseup', onMouseUp);
        });

        // Right-click context menu on cel block
        block.addEventListener('contextmenu', (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const rect = gridContainer.getBoundingClientRect();
          const clickX = ev.clientX - rect.left + gridContainer.scrollLeft;
          const clickedFrame = Math.max(
            1,
            Math.min(timeline.settings.totalFrames, Math.floor(clickX / cellWidth) + 1)
          );
          showTimelineContextMenu(ev.clientX, ev.clientY, track, clickedFrame, timeline, layerManager);
        });

        row.appendChild(block);
      }

      gridContent.appendChild(row);
    }

    // 3. Playhead
    const playhead = document.createElement('div');
    playhead.className = 'timeline-playhead';
    playhead.style.left = `${(timeline.settings.currentFrame - 1) * cellWidth + cellWidth / 2}px`;

    const playheadCap = document.createElement('div');
    playheadCap.className = 'timeline-playhead-cap';
    playhead.appendChild(playheadCap);

    gridContent.appendChild(playhead);
  }

  // --- 5. Global Keyboard Shortcuts ---
  window.addEventListener('keydown', (e) => {
    // Only handle if not focused on an input element
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
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
      timeline.nextCel();
    } else if (e.key === '[' || e.key === '{') {
      e.preventDefault();
      timeline.prevCel();
    } else if (e.key === 'o' || e.key === 'O') {
      e.preventDefault();
      timeline.toggleOnionSkin();
    }
  });

  timeline.subscribe(render);
  render();
}

function openOnionSkinModal(timeline: TimelineManager): void {
  const backdrop = document.createElement('div');
  backdrop.className = 'onion-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'onion-modal';

  modal.innerHTML = `
    <h3>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
      Ajustes de Papel Cebolla
    </h3>
    
    <div class="onion-setting-row">
      <label>Mostrar Papel Cebolla</label>
      <input type="checkbox" id="onion-enable" ${timeline.onionSkin.enabled ? 'checked' : ''}/>
    </div>

    <div class="onion-setting-row">
      <label>Modo de color</label>
      <select id="onion-mode">
        <option value="tint" ${timeline.onionSkin.mode === 'tint' ? 'selected' : ''}>Tintado (CSP)</option>
        <option value="color" ${timeline.onionSkin.mode === 'color' ? 'selected' : ''}>Color Original</option>
      </select>
    </div>

    <div class="onion-setting-row">
      <label>Celdas anteriores (Pasado)</label>
      <input type="number" id="onion-prev-count" min="1" max="10" value="${timeline.onionSkin.prevFrames}"/>
    </div>

    <div class="onion-setting-row">
      <label>Color celdas anteriores</label>
      <input type="color" id="onion-prev-color" value="${timeline.onionSkin.prevColor}"/>
    </div>

    <div class="onion-setting-row">
      <label>Celdas posteriores (Futuro)</label>
      <input type="number" id="onion-next-count" min="1" max="10" value="${timeline.onionSkin.nextFrames}"/>
    </div>

    <div class="onion-setting-row">
      <label>Color celdas posteriores</label>
      <input type="color" id="onion-next-color" value="${timeline.onionSkin.nextColor}"/>
    </div>

    <div class="onion-setting-row">
      <label>Opacidad inicial (%)</label>
      <input type="number" id="onion-start-opacity" min="5" max="100" step="5" value="${Math.round(timeline.onionSkin.startOpacity * 100)}"/>
    </div>

    <div class="onion-modal-actions">
      <button class="timeline-btn" id="onion-modal-close">Cerrar</button>
    </div>
  `;

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  const enableCheck = modal.querySelector('#onion-enable') as HTMLInputElement;
  const modeSelect = modal.querySelector('#onion-mode') as HTMLSelectElement;
  const prevCount = modal.querySelector('#onion-prev-count') as HTMLInputElement;
  const prevColor = modal.querySelector('#onion-prev-color') as HTMLInputElement;
  const nextCount = modal.querySelector('#onion-next-count') as HTMLInputElement;
  const nextColor = modal.querySelector('#onion-next-color') as HTMLInputElement;
  const startOpacity = modal.querySelector('#onion-start-opacity') as HTMLInputElement;
  const closeBtn = modal.querySelector('#onion-modal-close') as HTMLButtonElement;

  function applySettings(): void {
    timeline.setOnionSkin({
      enabled: enableCheck.checked,
      mode: modeSelect.value as 'tint' | 'color',
      prevFrames: Number(prevCount.value),
      prevColor: prevColor.value,
      nextFrames: Number(nextCount.value),
      nextColor: nextColor.value,
      startOpacity: Number(startOpacity.value) / 100,
    });
  }

  enableCheck.addEventListener('change', applySettings);
  modeSelect.addEventListener('change', applySettings);
  prevCount.addEventListener('input', applySettings);
  prevColor.addEventListener('input', applySettings);
  nextCount.addEventListener('input', applySettings);
  nextColor.addEventListener('input', applySettings);
  startOpacity.addEventListener('input', applySettings);

  const close = (): void => {
    backdrop.remove();
  };

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
}

function showTimelineContextMenu(
  x: number,
  y: number,
  track: AnimationTrack,
  targetFrame: number,
  timeline: TimelineManager,
  layerManager: LayerManager
): void {
  // Remove any existing context menus
  document.querySelectorAll('.timeline-context-menu').forEach((el) => el.remove());

  const menu = document.createElement('div');
  menu.className = 'timeline-context-menu';

  // 1. Header with Track Name and Frame Number
  const header = document.createElement('div');
  header.className = 'context-menu-header';
  header.innerHTML = `<span>${track.name}</span><span style="color:#00e5ff;">Fotograma ${targetFrame}</span>`;
  menu.appendChild(header);

  // 2. Section: Asignar Celda Existente (Specify Cel - CSP Style)
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

  // 4. Option: Eliminar especificación de celda (si hay una clave en este frame)
  if (track.exposures.has(targetFrame)) {
    const removeExpItem = document.createElement('div');
    removeExpItem.className = 'context-menu-item';
    removeExpItem.innerHTML = `
      <span style="display:flex; align-items:center; gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span>Eliminar asignación de este frame</span>
      </span>
    `;
    removeExpItem.addEventListener('click', () => {
      timeline.removeExposure(track.id, targetFrame);
      menu.remove();
    });
    menu.appendChild(removeExpItem);
  }

  // 5. Option: Eliminar Celda permanentemente
  if (activeCelAtFrame) {
    const sep2 = document.createElement('div');
    sep2.className = 'context-menu-separator';
    menu.appendChild(sep2);

    const deleteCelItem = document.createElement('div');
    deleteCelItem.className = 'context-menu-item danger';
    deleteCelItem.innerHTML = `
      <span style="display:flex; align-items:center; gap:6px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        <span>Eliminar celda "${activeCelAtFrame.name}" de la pista</span>
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

  // Positioning: Ensure within window bounds
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

  // Dismiss on click outside or Escape
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
