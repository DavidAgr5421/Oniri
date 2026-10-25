import type { Camera } from 'three';
import { placeLauncherNearBounds } from './launcherAnchor';
import { transformManager } from './transformGizmo';

export interface TransformToolbarOptions {
  camera: Camera;
  canvas: HTMLCanvasElement;
  root?: HTMLElement;
}

export function mountTransformToolbar(options: TransformToolbarOptions): () => void {
  const { camera, canvas, root = document.body } = options;

  const bar = document.createElement('div');
  bar.className = 'csp-transform-toolbar';
  bar.style.display = 'none';

  bar.innerHTML = `
    <button class="csp-trans-btn confirm" title="Confirmar transformación (Enter)">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </button>
    <button class="csp-trans-btn cancel" title="Cancelar transformación (Esc)">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <div class="csp-trans-sep"></div>
    <button class="csp-trans-btn icon-only active" id="trans-mode-affine" title="Transformación Libre (Escalar / Rotar)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <rect x="5" y="5" width="14" height="14"/>
        <rect x="2" y="2" width="4" height="4" fill="currentColor"/>
        <rect x="18" y="2" width="4" height="4" fill="currentColor"/>
        <rect x="18" y="18" width="4" height="4" fill="currentColor"/>
        <rect x="2" y="18" width="4" height="4" fill="currentColor"/>
      </svg>
    </button>
    <button class="csp-trans-btn icon-only" id="trans-mode-mesh" title="Deformación de Malla (Mesh Warp / Lattice)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <rect x="3" y="3" width="18" height="18" rx="1"/>
        <line x1="9" y1="3" x2="9" y2="21"/>
        <line x1="15" y1="3" x2="15" y2="21"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
      </svg>
    </button>
    <div class="csp-trans-mesh-controls" style="display: none; align-items: center; gap: 4px;">
      <select id="trans-mesh-grid" class="csp-trans-select" title="Puntos de la cuadrícula">
        <option value="2">2 × 2</option>
        <option value="3">3 × 3</option>
        <option value="4" selected>4 × 4</option>
        <option value="5">5 × 5</option>
        <option value="6">6 × 6</option>
      </select>
      <button class="csp-trans-btn icon-only" id="trans-mesh-reset" title="Restablecer malla">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"/>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
      </button>
    </div>
    <div class="csp-trans-sep"></div>
    <button class="csp-trans-btn icon-only" id="trans-fliph" title="Voltear Horizontal">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="7 8 3 12 7 16"/>
        <polyline points="17 8 21 12 17 16"/>
        <line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="2 2"/>
      </svg>
    </button>
    <button class="csp-trans-btn icon-only" id="trans-flipv" title="Voltear Vertical">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="8 7 12 3 16 7"/>
        <polyline points="8 17 12 21 16 17"/>
        <line x1="2" y1="12" x2="22" y2="12" stroke-dasharray="2 2"/>
      </svg>
    </button>
    <button class="csp-trans-btn icon-only" id="trans-rot90" title="Rotar 90° en el sentido horario">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="23 4 23 10 17 10"/>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
    </button>
  `;

  root.appendChild(bar);

  bar.querySelector('.confirm')?.addEventListener('click', (e) => {
    e.stopPropagation();
    transformManager.commitTransform();
  });
  bar.querySelector('.cancel')?.addEventListener('click', (e) => {
    e.stopPropagation();
    transformManager.cancelTransform();
  });
  bar.querySelector('#trans-fliph')?.addEventListener('click', (e) => {
    e.stopPropagation();
    transformManager.flipHorizontal();
  });
  bar.querySelector('#trans-flipv')?.addEventListener('click', (e) => {
    e.stopPropagation();
    transformManager.flipVertical();
  });
  bar.querySelector('#trans-rot90')?.addEventListener('click', (e) => {
    e.stopPropagation();
    transformManager.rotate90(true);
  });

  const btnAffine = bar.querySelector<HTMLButtonElement>('#trans-mode-affine');
  const btnMesh = bar.querySelector<HTMLButtonElement>('#trans-mode-mesh');
  const meshControls = bar.querySelector<HTMLElement>('.csp-trans-mesh-controls');
  const gridSelect = bar.querySelector<HTMLSelectElement>('#trans-mesh-grid');
  const btnResetMesh = bar.querySelector<HTMLButtonElement>('#trans-mesh-reset');

  btnAffine?.addEventListener('click', (e) => {
    e.stopPropagation();
    transformManager.setMode('affine');
  });

  btnMesh?.addEventListener('click', (e) => {
    e.stopPropagation();
    transformManager.setMode('mesh');
  });

  gridSelect?.addEventListener('change', (e) => {
    e.stopPropagation();
    const val = parseInt(gridSelect.value, 10) || 4;
    transformManager.setMeshGrid(val, val);
  });

  btnResetMesh?.addEventListener('click', (e) => {
    e.stopPropagation();
    transformManager.resetMesh();
  });

  function updatePosition(): void {
    if (!transformManager.isTransforming()) {
      bar.style.display = 'none';
      return;
    }

    bar.style.display = 'flex';

    const mode = transformManager.getMode();
    if (btnAffine) btnAffine.classList.toggle('active', mode === 'affine');
    if (btnMesh) btnMesh.classList.toggle('active', mode === 'mesh');
    if (meshControls) meshControls.style.display = mode === 'mesh' ? 'inline-flex' : 'none';
    if (gridSelect) gridSelect.value = String(transformManager.getMeshCols());

    // Placement: bottom-center of the gizmo bounds at Y_max, flipping
    // above the gizmo when the bar would leave the viewport.
    placeLauncherNearBounds(bar, camera, canvas, transformManager.getGizmoBoundsDoc());
  }

  const unsub = transformManager.subscribe(() => {
    updatePosition();
  });

  // Track animation frame to smoothly track camera pan/zoom while transforming
  let animId: number | null = null;
  function trackLoop() {
    if (transformManager.isTransforming()) {
      updatePosition();
    }
    animId = requestAnimationFrame(trackLoop);
  }
  animId = requestAnimationFrame(trackLoop);

  return () => {
    unsub();
    if (animId !== null) cancelAnimationFrame(animId);
    bar.remove();
  };
}
