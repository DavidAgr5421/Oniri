import type { TipShape } from '../tools/toolState';

export interface BrushCursorOverlayHandle {
  update: (
    clientX: number,
    clientY: number,
    screenDiameter: number,
    tipShape: TipShape,
    tipRoundness: number,
    tipAngleDeg: number,
    isVisible: boolean,
    tipTexture?: string,
  ) => void;
  showBadge: (text: string) => void;
  hideBadge: () => void;
  setVisible: (visible: boolean) => void;
  destroy: () => void;
}

export function createBrushCursorOverlay(container: HTMLElement): BrushCursorOverlayHandle {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'oniri-brush-cursor-overlay');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '85';
  svg.style.overflow = 'hidden';

  // Group for the cursor shape (transformed to cursor position and angle)
  const gCursor = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  // Dual-stroke outlines for high contrast over any background
  const outerShape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  outerShape.setAttribute('fill', 'none');
  outerShape.setAttribute('stroke', '#000000');
  outerShape.setAttribute('stroke-width', '2.2');
  outerShape.setAttribute('stroke-linecap', 'round');
  outerShape.setAttribute('stroke-linejoin', 'round');

  const innerShape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  innerShape.setAttribute('fill', 'none');
  innerShape.setAttribute('stroke', '#ffffff');
  innerShape.setAttribute('stroke-width', '1.2');
  innerShape.setAttribute('stroke-linecap', 'round');
  innerShape.setAttribute('stroke-linejoin', 'round');

  // Center crosshair
  const crossH = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  crossH.setAttribute('x1', '-3');
  crossH.setAttribute('y1', '0');
  crossH.setAttribute('x2', '3');
  crossH.setAttribute('y2', '0');
  crossH.setAttribute('stroke', '#ffffff');
  crossH.setAttribute('stroke-width', '1.2');

  const crossV = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  crossV.setAttribute('x1', '0');
  crossV.setAttribute('y1', '-3');
  crossV.setAttribute('x2', '0');
  crossV.setAttribute('y2', '3');
  crossV.setAttribute('stroke', '#ffffff');
  crossV.setAttribute('stroke-width', '1.2');

  const crossHShadow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  crossHShadow.setAttribute('x1', '-4');
  crossHShadow.setAttribute('y1', '0');
  crossHShadow.setAttribute('x2', '4');
  crossHShadow.setAttribute('y2', '0');
  crossHShadow.setAttribute('stroke', '#000000');
  crossHShadow.setAttribute('stroke-width', '2.4');

  const crossVShadow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  crossVShadow.setAttribute('x1', '0');
  crossVShadow.setAttribute('y1', '-4');
  crossVShadow.setAttribute('x2', '0');
  crossVShadow.setAttribute('y2', '4');
  crossVShadow.setAttribute('stroke', '#000000');
  crossVShadow.setAttribute('stroke-width', '2.4');

  gCursor.append(outerShape, innerShape, crossHShadow, crossVShadow, crossH, crossV);
  svg.appendChild(gCursor);

  // Floating diameter badge (shown during Ctrl+Alt resize or size adjustments)
  const gBadge = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  gBadge.style.display = 'none';

  const badgeRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  badgeRect.setAttribute('rx', '3');
  badgeRect.setAttribute('ry', '3');
  badgeRect.setAttribute('fill', 'rgba(18, 20, 24, 0.88)');
  badgeRect.setAttribute('stroke', '#38bdf8');
  badgeRect.setAttribute('stroke-width', '1');

  const badgeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  badgeText.setAttribute('fill', '#ffffff');
  badgeText.setAttribute('font-size', '11');
  badgeText.setAttribute('font-family', 'monospace');
  badgeText.setAttribute('font-weight', '600');
  badgeText.setAttribute('text-anchor', 'middle');
  badgeText.setAttribute('dominant-baseline', 'middle');

  gBadge.append(badgeRect, badgeText);
  svg.appendChild(gBadge);

  container.appendChild(svg);

  let lastBadgeText = '';

  const buildPathD = (
    rx: number,
    ry: number,
    shape: TipShape,
    tipTexture?: string,
  ): string => {
    if (rx < 0.5) rx = 0.5;
    if (ry < 0.5) ry = 0.5;

    if (tipTexture === 'star02' || tipTexture === 'star04') {
      // 4-point star sparkle contour
      const irx = rx * 0.28;
      const iry = ry * 0.28;
      return `M 0 ${-ry} L ${irx} ${-iry} L ${rx} 0 L ${irx} ${iry} L 0 ${ry} L ${-irx} ${iry} L ${-rx} 0 L ${-irx} ${-iry} Z`;
    }

    if (shape === 'square' || tipTexture === 'flat-square') {
      // Flat rectangular chisel + subtle leading orientation tick when large enough
      const tick = rx >= 6 ? ` M ${rx * 0.55} 0 L ${rx} 0` : '';
      return `M ${-rx} ${-ry} L ${rx} ${-ry} L ${rx} ${ry} L ${-rx} ${ry} Z${tick}`;
    }

    if (shape === 'calligraphic') {
      // Slanted 45 deg calligraphy wedge chisel ribbon
      const w = rx;
      const h = Math.max(1.5, ry * 0.35);
      return `M ${-w} ${-h} L ${w} ${-h} L ${w} ${h} L ${-w} ${h} Z`;
    }

    // Circular / Elliptic tip (with directional axis tick when squashed or bristle-textured)
    const isDirectional = ry < rx * 0.92 || tipTexture === 'brush02' || tipTexture === 'gasagasa';
    const dirTick = isDirectional && rx >= 6 ? ` M ${rx * 0.6} 0 L ${rx} 0` : '';
    return `M ${-rx} 0 A ${rx} ${ry} 0 1 0 ${rx} 0 A ${rx} ${ry} 0 1 0 ${-rx} 0 Z${dirTick}`;
  };

  const update = (
    clientX: number,
    clientY: number,
    screenDiameter: number,
    tipShape: TipShape,
    tipRoundness: number,
    tipAngleDeg: number,
    isVisible: boolean,
    tipTexture?: string,
  ): void => {
    if (!isVisible || screenDiameter <= 0) {
      svg.style.display = 'none';
      return;
    }
    svg.style.display = 'block';

    const rect = container.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;

    const rx = Math.max(1, screenDiameter / 2);
    const effectiveRoundness = tipShape === 'calligraphic'
      ? Math.min(0.35, Math.max(0.1, tipRoundness))
      : Math.min(1.0, Math.max(0.08, tipRoundness));
    const ry = Math.max(1, rx * effectiveRoundness);

    const pathD = buildPathD(rx, ry, tipShape, tipTexture);
    outerShape.setAttribute('d', pathD);
    innerShape.setAttribute('d', pathD);
    if (tipTexture === 'gasagasa' || tipTexture === 'brush02') {
      innerShape.setAttribute('stroke-dasharray', rx > 6 ? '3 1.5' : 'none');
    } else {
      innerShape.setAttribute('stroke-dasharray', 'none');
    }

    const effectiveAngle = tipShape === 'calligraphic' ? tipAngleDeg + 45 : tipAngleDeg;
    gCursor.setAttribute('transform', `translate(${localX.toFixed(1)}, ${localY.toFixed(1)}) rotate(${effectiveAngle.toFixed(1)})`);

    if (gBadge.style.display !== 'none' && lastBadgeText) {
      const bx = localX + rx + 14;
      const by = localY - ry - 8;
      gBadge.setAttribute('transform', `translate(${bx.toFixed(1)}, ${by.toFixed(1)})`);
    }
  };

  const showBadge = (text: string): void => {
    lastBadgeText = text;
    badgeText.textContent = text;
    const padX = 7;
    const textW = Math.max(40, text.length * 7.5 + padX * 2);
    const textH = 20;
    badgeRect.setAttribute('x', `${-textW / 2}`);
    badgeRect.setAttribute('y', `${-textH / 2}`);
    badgeRect.setAttribute('width', `${textW}`);
    badgeRect.setAttribute('height', `${textH}`);
    gBadge.style.display = 'block';
  };

  const hideBadge = (): void => {
    gBadge.style.display = 'none';
    lastBadgeText = '';
  };

  const setVisible = (visible: boolean): void => {
    svg.style.display = visible ? 'block' : 'none';
  };

  const destroy = (): void => {
    svg.remove();
  };

  return {
    update,
    showBadge,
    hideBadge,
    setVisible,
    destroy,
  };
}
