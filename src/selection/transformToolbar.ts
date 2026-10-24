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

  function updatePosition(): void {
    if (!transformManager.isTransforming()) {
      bar.style.display = 'none';
      return;
    }

    bar.style.display = 'flex';

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
