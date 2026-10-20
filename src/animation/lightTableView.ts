import type { LayerManager } from '../brush/layers';
import type { TimelineManager } from './timelineManager';

export interface LightTableViewHandle {
  element: HTMLElement;
  show(): void;
  hide(): void;
  toggle(): void;
  isOpen(): boolean;
  destroy(): void;
}

/**
 * Mesa de Luz ha sido unificada dentro del sistema de Papel Cebolla (Clip Studio Paint style).
 * Esta función se mantiene por compatibilidad.
 */
export function createLightTableView(
  timeline: TimelineManager,
  _layerManager: LayerManager
): LightTableViewHandle {
  const dummy = document.createElement('div');
  dummy.style.display = 'none';

  return {
    element: dummy,
    show: () => timeline.setOnionSkin({ enabled: true }),
    hide: () => timeline.setOnionSkin({ enabled: false }),
    toggle: () => timeline.toggleOnionSkin(),
    isOpen: () => timeline.onionSkin.enabled,
    destroy: () => dummy.remove(),
  };
}
