/**
 * Canvas Interactive Overlays for CSP-style Ergonomics:
 * 1. Dynamic Brush Sizing Circle (Ctrl+Alt+Drag)
 * 2. Eyedropper Loupe Color Picker Ring (Hold Alt)
 */

export class BrushSizeOverlay {
  private element: HTMLElement;
  private circle: SVGCircleElement;
  private centerDot: SVGCircleElement;
  private badge: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'csp-brush-size-overlay';
    this.element.style.position = 'fixed';
    this.element.style.pointerEvents = 'none';
    this.element.style.zIndex = '600';
    this.element.style.display = 'none';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'csp-brush-size-svg');
    svg.style.overflow = 'visible';

    this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circle.setAttribute('fill', 'rgba(0, 160, 255, 0.12)');
    this.circle.setAttribute('stroke', '#38bdf8');
    this.circle.setAttribute('stroke-width', '1.5');
    this.circle.setAttribute('stroke-dasharray', '4 2');

    this.centerDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.centerDot.setAttribute('r', '2');
    this.centerDot.setAttribute('fill', '#ffffff');

    svg.append(this.circle, this.centerDot);
    this.element.appendChild(svg);

    this.badge = document.createElement('div');
    this.badge.className = 'csp-brush-size-badge';
    this.element.appendChild(this.badge);

    document.body.appendChild(this.element);
  }

  public show(centerX: number, centerY: number, screenRadius: number, docSize: number): void {
    this.element.style.display = 'block';
    this.element.style.left = `${centerX}px`;
    this.element.style.top = `${centerY}px`;

    const r = Math.max(2, screenRadius);
    this.circle.setAttribute('r', String(r));

    this.badge.textContent = `Ø ${docSize.toFixed(1)} px`;
    this.badge.style.transform = `translate(-50%, ${r + 10}px)`;
  }

  public hide(): void {
    this.element.style.display = 'none';
  }

  public dispose(): void {
    this.element.remove();
  }
}

export class EyedropperLoupeOverlay {
  private element: HTMLElement;
  private topHalf: HTMLElement;
  private bottomHalf: HTMLElement;
  private hexLabel: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'csp-eyedropper-loupe';
    this.element.style.position = 'fixed';
    this.element.style.pointerEvents = 'none';
    this.element.style.zIndex = '600';
    this.element.style.display = 'none';

    this.element.innerHTML = `
      <div class="csp-loupe-ring">
        <div class="csp-loupe-top" id="loupe-new-color"></div>
        <div class="csp-loupe-bottom" id="loupe-old-color"></div>
        <div class="csp-loupe-crosshair"></div>
      </div>
      <div class="csp-loupe-hex" id="loupe-hex-text">#ffffff</div>
    `;

    document.body.appendChild(this.element);

    this.topHalf = this.element.querySelector('#loupe-new-color')!;
    this.bottomHalf = this.element.querySelector('#loupe-old-color')!;
    this.hexLabel = this.element.querySelector('#loupe-hex-text')!;
  }

  public show(screenX: number, screenY: number, newHex: string, previousHex: string): void {
    this.element.style.display = 'flex';
    this.element.style.left = `${screenX}px`;
    this.element.style.top = `${screenY}px`;

    this.topHalf.style.backgroundColor = newHex;
    this.bottomHalf.style.backgroundColor = previousHex;
    this.hexLabel.textContent = newHex.toUpperCase();
  }

  public hide(): void {
    this.element.style.display = 'none';
  }

  public dispose(): void {
    this.element.remove();
  }
}

export const brushSizeOverlay = new BrushSizeOverlay();
export const eyedropperLoupeOverlay = new EyedropperLoupeOverlay();
