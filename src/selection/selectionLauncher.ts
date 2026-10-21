import * as THREE from 'three';
import type { BrushEngine } from '../brush/brushEngine';
import { placeLauncherNearBounds } from './launcherAnchor';
import { selectionModel } from './selectionModel';
import { transformManager } from './transformGizmo';

export interface SelectionLauncherOptions {
  camera: THREE.Camera;
  canvas: HTMLCanvasElement;
  engine: BrushEngine;
  root?: HTMLElement;
}

/**
 * CSP "Selection Launcher" (REA study, section 3): floating bar anchored at
 * Y_max of the static selection mask. Hidden while the transform gizmo is
 * active (the Transform Launcher takes over in that modal state).
 */
export function mountSelectionLauncher(options: SelectionLauncherOptions): () => void {
  const { camera, canvas, engine, root = document.body } = options;

  const bar = document.createElement('div');
  bar.className = 'csp-transform-toolbar csp-sel-launcher';
  bar.style.display = 'none';

  bar.innerHTML = `
    <button class="csp-trans-btn" id="sel-deselect" title="Deseleccionar (Ctrl+D)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 2"/>
        <line x1="8" y1="8" x2="16" y2="16"/>
        <line x1="16" y1="8" x2="8" y2="16"/>
      </svg>
    </button>
    <button class="csp-trans-btn icon-only" id="sel-invert" title="Invertir selección (Ctrl+Shift+I)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="12" height="12"/>
        <path d="M9 21h10a2 2 0 0 0 2-2V9"/>
      </svg>
    </button>
    <div class="csp-trans-sep"></div>
    <button class="csp-trans-btn icon-only" id="sel-clear" title="Borrar contenido de la selección (Delete)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      </svg>
    </button>
    <button class="csp-trans-btn icon-only" id="sel-fill" title="Rellenar selección con el color activo (Alt+Delete)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2l7 7-8.5 8.5a2 2 0 0 1-3 0L3 12.5a2 2 0 0 1 0-3L12 2z"/>
        <path d="M7 11l4 4"/>
      </svg>
    </button>
    <div class="csp-trans-sep"></div>
    <button class="csp-trans-btn icon-only" id="sel-transform" title="Escalar/Rotar - Transformación libre (Ctrl+T)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="4 9 4 4 9 4"/>
        <polyline points="15 4 20 4 20 9"/>
        <polyline points="20 15 20 20 15 20"/>
        <polyline points="9 20 4 20 4 15"/>
        <line x1="4" y1="4" x2="9" y2="9"/>
        <line x1="20" y1="4" x2="15" y2="9"/>
        <line x1="20" y1="20" x2="15" y2="15"/>
        <line x1="4" y1="20" x2="9" y2="15"/>
      </svg>
    </button>
  `;

  root.appendChild(bar);

  bar.querySelector('#sel-deselect')?.addEventListener('click', (e) => {
    e.stopPropagation();
    selectionModel.clearSelection();
  });
  bar.querySelector('#sel-invert')?.addEventListener('click', (e) => {
    e.stopPropagation();
    selectionModel.invertSelection();
  });
  bar.querySelector('#sel-clear')?.addEventListener('click', (e) => {
    e.stopPropagation();
    engine.clearActiveLayer();
  });
  bar.querySelector('#sel-fill')?.addEventListener('click', (e) => {
    e.stopPropagation();
    engine.fillSelection();
  });
  bar.querySelector('#sel-transform')?.addEventListener('click', (e) => {
    e.stopPropagation();
    transformManager.startTransform(engine);
  });

  function updatePosition(): void {
    const visible = selectionModel.hasSelection() && !transformManager.isTransforming();
    if (!visible) {
      bar.style.display = 'none';
      return;
    }
    bar.style.display = 'flex';
    const bounds = selectionModel.getBounds();
    if (!bounds) {
      bar.style.display = 'none';
      return;
    }
    placeLauncherNearBounds(bar, camera, canvas, bounds);
  }

  const unsubSelection = selectionModel.subscribe(() => updatePosition());
  const unsubTransform = transformManager.subscribe(() => updatePosition());

  // Keep tracking the camera while panning/zooming with a static selection
  let animId: number | null = null;
  function trackLoop(): void {
    if (bar.style.display !== 'none') updatePosition();
    animId = requestAnimationFrame(trackLoop);
  }
  animId = requestAnimationFrame(trackLoop);

  return () => {
    unsubSelection();
    unsubTransform();
    if (animId !== null) cancelAnimationFrame(animId);
    bar.remove();
  };
}
