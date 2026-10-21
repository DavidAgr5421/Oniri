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

export interface LauncherButtonItem {
  id: string;
  label: string;
  shortcut?: string;
  defaultVisible: boolean;
  isSeparator?: boolean;
}

export const LAUNCHER_BUTTON_DEFS: LauncherButtonItem[] = [
  { id: 'sel-deselect', label: 'Deseleccionar', shortcut: 'Ctrl+D', defaultVisible: true },
  { id: 'sel-crop', label: 'Recortar lienzo a la selección', defaultVisible: true },
  { id: 'sel-invert', label: 'Invertir área seleccionada', shortcut: 'Ctrl+Shift+I', defaultVisible: true },
  { id: 'sep-1', label: 'Separador 1', defaultVisible: true, isSeparator: true },
  { id: 'sel-expand', label: 'Expandir área seleccionada...', defaultVisible: true },
  { id: 'sel-contract', label: 'Reducir área seleccionada...', defaultVisible: true },
  { id: 'sep-2', label: 'Separador 2', defaultVisible: true, isSeparator: true },
  { id: 'sel-clear', label: 'Borrar contenido de la selección', shortcut: 'Delete', defaultVisible: true },
  { id: 'sel-clear-outside', label: 'Borrar fuera de la selección', shortcut: 'Alt+Delete', defaultVisible: true },
  { id: 'sep-3', label: 'Separador 3', defaultVisible: true, isSeparator: true },
  { id: 'sel-fill', label: 'Rellenar con color activo', shortcut: 'Shift+Delete', defaultVisible: true },
  { id: 'sel-transform', label: 'Escalar / Rotar (Transformación libre)', shortcut: 'Ctrl+T', defaultVisible: true },
  { id: 'sep-4', label: 'Separador 4', defaultVisible: true, isSeparator: true },
  { id: 'sel-settings', label: 'Ajustes del menú flotante de selección', defaultVisible: true },
];

const STORAGE_VISIBLE_KEY = 'oniri.selectionLauncher.visibleButtons';
const STORAGE_ENABLED_KEY = 'oniri.selectionLauncher.enabled';

export function getSelectionLauncherEnabled(): boolean {
  return localStorage.getItem(STORAGE_ENABLED_KEY) !== 'false';
}

export function setSelectionLauncherEnabled(enabled: boolean): void {
  localStorage.setItem(STORAGE_ENABLED_KEY, enabled ? 'true' : 'false');
  launcherStateNotifier();
}

function getVisibleButtonsSet(): Set<string> {
  const saved = localStorage.getItem(STORAGE_VISIBLE_KEY);
  if (!saved) {
    return new Set(LAUNCHER_BUTTON_DEFS.map((b) => b.id));
  }
  try {
    const list = JSON.parse(saved) as string[];
    return new Set(list);
  } catch {
    return new Set(LAUNCHER_BUTTON_DEFS.map((b) => b.id));
  }
}

function saveVisibleButtonsSet(visibleSet: Set<string>): void {
  localStorage.setItem(STORAGE_VISIBLE_KEY, JSON.stringify(Array.from(visibleSet)));
  launcherStateNotifier();
}

let launcherStateNotifier = (): void => {};

/**
 * CSP "Selection Launcher" (Menú flotante de selección / 選択範囲ランチャー):
 * Floating action bar anchored at Y_max of the active selection mask bounding box.
 * Follows canvas navigation, flips above when near screen edge, and provides
 * instant access to canonical CSP selection operations.
 */
export function mountSelectionLauncher(options: SelectionLauncherOptions): () => void {
  const { camera, canvas, engine, root = document.body } = options;

  const bar = document.createElement('div');
  bar.className = 'csp-transform-toolbar csp-sel-launcher';
  bar.style.display = 'none';

  // Build toolbar DOM based on visible buttons
  function rebuildToolbarDOM(): void {
    const visibleSet = getVisibleButtonsSet();
    bar.innerHTML = '';

    const defs = LAUNCHER_BUTTON_DEFS.filter((d) => visibleSet.has(d.id));

    for (const item of defs) {
      if (item.isSeparator) {
        const sep = document.createElement('div');
        sep.className = 'csp-trans-sep';
        bar.appendChild(sep);
        continue;
      }

      const btn = document.createElement('button');
      btn.className = 'csp-trans-btn icon-only';
      btn.id = item.id;
      btn.title = item.shortcut ? `${item.label} (${item.shortcut})` : item.label;

      switch (item.id) {
        case 'sel-deselect':
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 2"/>
              <line x1="8" y1="8" x2="16" y2="16"/>
              <line x1="16" y1="8" x2="8" y2="16"/>
            </svg>
          `;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectionModel.clearSelection();
          });
          break;

        case 'sel-crop':
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
              <path d="M18 22V8a2 2 0 0 0-2-2H2"/>
            </svg>
          `;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Crop: Clear outside selection on active layer
            selectionModel.invertSelection();
            engine.clearActiveLayer();
            selectionModel.invertSelection();
          });
          break;

        case 'sel-invert':
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 3l18 18"/>
              <polygon points="3 3 21 3 21 21" fill="currentColor" fill-opacity="0.3"/>
            </svg>
          `;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectionModel.invertSelection();
          });
          break;

        case 'sel-expand':
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="5" y="5" width="14" height="14" rx="2" stroke-dasharray="2 2"/>
              <polyline points="15 3 21 3 21 9"/>
              <polyline points="9 21 3 21 3 15"/>
              <polyline points="21 15 21 21 15 21"/>
              <polyline points="3 9 3 3 9 3"/>
            </svg>
          `;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showRadiusPopover(btn, 'Expandir selección', (radius) => {
              selectionModel.expandSelection(radius);
            });
          });
          break;

        case 'sel-contract':
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <polyline points="9 5 5 5 5 9" stroke-dasharray="2 1"/>
              <polyline points="15 19 19 19 19 15" stroke-dasharray="2 1"/>
              <polyline points="5 15 5 19 9 19" stroke-dasharray="2 1"/>
              <polyline points="19 9 19 5 15 5" stroke-dasharray="2 1"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          `;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showRadiusPopover(btn, 'Reducir selección', (radius) => {
              selectionModel.contractSelection(radius);
            });
          });
          break;

        case 'sel-clear':
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          `;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            engine.clearActiveLayer();
          });
          break;

        case 'sel-clear-outside':
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="6" y="6" width="12" height="12" stroke-dasharray="3 2"/>
              <line x1="2" y1="2" x2="6" y2="6"/>
              <line x1="22" y1="2" x2="18" y2="6"/>
              <line x1="2" y1="22" x2="6" y2="18"/>
              <line x1="22" y1="22" x2="18" y2="18"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
          `;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectionModel.invertSelection();
            engine.clearActiveLayer();
            selectionModel.invertSelection();
          });
          break;

        case 'sel-fill':
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l7 7-8.5 8.5a2 2 0 0 1-3 0L3 12.5a2 2 0 0 1 0-3L12 2z"/>
              <path d="M7 11l4 4"/>
              <path d="M19 17v4a2 2 0 0 1-2 2H7"/>
            </svg>
          `;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            engine.fillSelection();
          });
          break;

        case 'sel-transform':
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="4 9 4 4 9 4"/>
              <polyline points="15 4 20 4 20 9"/>
              <polyline points="20 15 20 20 15 20"/>
              <polyline points="9 20 4 20 4 15"/>
              <line x1="4" y1="4" x2="9" y2="9"/>
              <line x1="20" y1="4" x2="15" y2="9"/>
              <line x1="20" y1="20" x2="15" y2="15"/>
              <line x1="4" y1="20" x2="9" y2="15"/>
            </svg>
          `;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            transformManager.startTransform(engine);
          });
          break;

        case 'sel-settings':
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          `;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSelectionLauncherSettingsModal();
          });
          break;
      }

      bar.appendChild(btn);
    }
  }

  rebuildToolbarDOM();
  root.appendChild(bar);

  launcherStateNotifier = () => {
    rebuildToolbarDOM();
    updatePosition();
  };

  function updatePosition(): void {
    const isEnabled = getSelectionLauncherEnabled();
    const visible =
      isEnabled && selectionModel.hasSelection() && !transformManager.isTransforming();

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

  // Keep tracking camera in viewport during pan, zoom or canvas rotation
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
    launcherStateNotifier = () => {};
  };
}

/**
 * Compact popover dialog for entering radius in pixels when expanding or reducing selection.
 */
function showRadiusPopover(
  anchorBtn: HTMLElement,
  titleText: string,
  onApply: (radius: number) => void,
): void {
  // Remove existing popover if open
  document.querySelector('.csp-launcher-popover')?.remove();

  const popover = document.createElement('div');
  popover.className = 'csp-launcher-popover';

  popover.innerHTML = `
    <div class="csp-popover-title">${titleText}</div>
    <div class="csp-popover-row">
      <label>Ancho:</label>
      <input type="number" class="csp-popover-input" min="1" max="64" value="5" />
      <span class="unit">px</span>
    </div>
    <div class="csp-popover-chips">
      <button class="csp-chip" data-val="1">1px</button>
      <button class="csp-chip" data-val="2">2px</button>
      <button class="csp-chip" data-val="5">5px</button>
      <button class="csp-chip" data-val="10">10px</button>
      <button class="csp-chip" data-val="20">20px</button>
    </div>
    <div class="csp-popover-actions">
      <button class="csp-btn-cancel">Cancelar</button>
      <button class="csp-btn-apply">Aplicar</button>
    </div>
  `;

  document.body.appendChild(popover);

  const rect = anchorBtn.getBoundingClientRect();
  const popW = 210;
  const popH = 128;
  const left = Math.max(10, Math.min(window.innerWidth - popW - 10, rect.left + rect.width / 2 - popW / 2));
  const top = rect.top - popH - 8 > 10 ? rect.top - popH - 8 : rect.bottom + 8;

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;

  const input = popover.querySelector('.csp-popover-input') as HTMLInputElement;
  input.focus();
  input.select();

  popover.querySelectorAll('.csp-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const v = chip.getAttribute('data-val');
      if (v) input.value = v;
    });
  });

  const close = () => {
    popover.remove();
    document.removeEventListener('pointerdown', outsideClick);
  };

  const apply = () => {
    const val = Math.max(1, Math.min(64, parseInt(input.value) || 5));
    onApply(val);
    close();
  };

  popover.querySelector('.csp-btn-cancel')?.addEventListener('click', close);
  popover.querySelector('.csp-btn-apply')?.addEventListener('click', apply);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') apply();
    if (e.key === 'Escape') close();
  });

  function outsideClick(e: PointerEvent): void {
    if (!popover.contains(e.target as Node) && !anchorBtn.contains(e.target as Node)) {
      close();
    }
  }
  setTimeout(() => {
    document.addEventListener('pointerdown', outsideClick);
  }, 10);
}

/**
 * Settings modal for customizing which buttons are shown on the CSP Selection Launcher.
 */
export function openSelectionLauncherSettingsModal(): void {
  document.querySelector('.csp-launcher-modal-backdrop')?.remove();

  const backdrop = document.createElement('div');
  backdrop.className = 'csp-launcher-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'csp-calibration-window csp-launcher-modal';
  modal.style.width = '460px';

  const currentVisible = getVisibleButtonsSet();

  modal.innerHTML = `
    <div class="csp-calibration-header">
      <span>Ajustes del menú flotante de selección (CSP)</span>
      <button class="csp-nav-close-btn" id="modal-close">&times;</button>
    </div>
    <div class="csp-calibration-banner">
      Personalice los iconos y atajos visibles en la barra flotante de selección.
    </div>
    <div class="csp-modal-list-body" style="padding: 12px 16px; max-height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;">
      ${LAUNCHER_BUTTON_DEFS.filter((d) => !d.isSeparator)
        .map(
          (d) => `
        <label style="display: flex; align-items: center; gap: 10px; font-size: 12px; cursor: pointer; color: #cbd5e1; padding: 4px 6px; border-radius: 4px; background: rgba(255,255,255,0.03);">
          <input type="checkbox" data-btn-id="${d.id}" ${currentVisible.has(d.id) ? 'checked' : ''} style="cursor: pointer;" />
          <span style="flex: 1;">${d.label}</span>
          ${d.shortcut ? `<span style="font-size: 10px; color: #94a3b8; font-family: monospace;">${d.shortcut}</span>` : ''}
        </label>
      `,
        )
        .join('')}
    </div>
    <div style="padding: 10px 16px; background: #16181b; border-top: 1px solid #2d3139; display: flex; justify-content: space-between; align-items: center;">
      <button class="csp-preset-btn" id="modal-reset" style="padding: 4px 10px; font-size: 11px;">Restablecer valores predeterminados</button>
      <div style="display: flex; gap: 8px;">
        <button class="csp-preset-btn active" id="modal-save" style="padding: 4px 16px; font-size: 11px;">Aceptar</button>
      </div>
    </div>
  `;

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  const close = () => backdrop.remove();

  modal.querySelector('#modal-close')?.addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  modal.querySelector('#modal-reset')?.addEventListener('click', () => {
    const defaultSet = new Set(LAUNCHER_BUTTON_DEFS.map((b) => b.id));
    saveVisibleButtonsSet(defaultSet);
    close();
  });

  modal.querySelector('#modal-save')?.addEventListener('click', () => {
    const newSet = new Set<string>();
    // Keep all separators
    LAUNCHER_BUTTON_DEFS.filter((d) => d.isSeparator).forEach((s) => newSet.add(s.id));

    modal.querySelectorAll<HTMLInputElement>('input[data-btn-id]').forEach((chk) => {
      if (chk.checked) {
        const id = chk.getAttribute('data-btn-id');
        if (id) newSet.add(id);
      }
    });

    saveVisibleButtonsSet(newSet);
    close();
  });
}
