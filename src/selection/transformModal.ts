/**
 * CSP-style modal transform lock (REA study, section 2).
 *
 * While a Free Transform gizmo is active the application is in an exclusive
 * modal state: drawing tools, layer operations and timeline scrubbing are
 * refused until the user confirms (Enter / double click) or cancels (Esc).
 * Only canvas navigation (zoom, pan, hand tool) stays available.
 */

let locked = false;
const listeners: Set<() => void> = new Set();

export function isTransformModalLocked(): boolean {
  return locked;
}

export function setTransformModalLocked(next: boolean): void {
  if (locked === next) return;
  locked = next;
  document.body.dataset.transformModal = next ? 'on' : 'off';
  for (const fn of listeners) fn();
}

export function subscribeTransformModal(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

let toastEl: HTMLElement | null = null;
let toastTimer: number | null = null;

/**
 * Non-blocking feedback used when a refused action is attempted mid-transform
 * (CSP shows a dialog; Oniri flashes a hint so the modal state stays strict).
 */
export function warnTransformModalBlocked(action: string): void {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'transform-modal-toast';
    toastEl.setAttribute('role', 'status');
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = `${action}: confirma (Enter) o cancela (Esc) la transformación primero.`;
  toastEl.classList.add('visible');
  if (toastTimer !== null) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastEl?.classList.remove('visible');
  }, 2400);
}
