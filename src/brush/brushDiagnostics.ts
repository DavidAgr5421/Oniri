/**
 * Performance and Diagnostic Profiler for Oniri Brush Engine
 * Tracks pointer events, stamp calculations, texture cache efficiency,
 * and composite render times to diagnose drawing lag in real-time.
 */

export interface StrokeProfileStats {
  brushName: string;
  subtoolId: string;
  startTime: number;
  endTime: number;
  durationMs: number;
  pointerMoveEvents: number;
  coalescedSamples: number;
  totalStamps: number;
  predictedStamps: number;
  cacheHits: number;
  cacheMisses: number;
  stampBuildTimeMs: number;
  predictedStrokeTimeMs: number;
  compositeTimeMs: number;
  maxFrameTimeMs: number;
}

class BrushDiagnosticsManager {
  public enabled = true;
  public showHud = false;
  public inPredictedStroke = false;
  private currentStroke: StrokeProfileStats | null = null;
  private hudElement: HTMLElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      (window as unknown as { oniriDiagnostics: BrushDiagnosticsManager }).oniriDiagnostics = this;
    }
  }

  public startStroke(brushName: string, subtoolId = ''): void {
    if (!this.enabled) return;
    const now = performance.now();
    this.currentStroke = {
      brushName,
      subtoolId,
      startTime: now,
      endTime: 0,
      durationMs: 0,
      pointerMoveEvents: 0,
      coalescedSamples: 0,
      totalStamps: 0,
      predictedStamps: 0,
      cacheHits: 0,
      cacheMisses: 0,
      stampBuildTimeMs: 0,
      predictedStrokeTimeMs: 0,
      compositeTimeMs: 0,
      maxFrameTimeMs: 0,
    };
  }

  public recordPointerMove(coalescedCount: number, durationMs: number): void {
    if (!this.enabled || !this.currentStroke) return;
    this.currentStroke.pointerMoveEvents++;
    this.currentStroke.coalescedSamples += Math.max(1, coalescedCount);
    if (durationMs > this.currentStroke.maxFrameTimeMs) {
      this.currentStroke.maxFrameTimeMs = durationMs;
    }
  }

  public recordStamp(isHit: boolean, buildTimeMs = 0): void {
    if (!this.enabled || !this.currentStroke) return;
    if (this.inPredictedStroke) {
      this.currentStroke.predictedStamps++;
    } else {
      this.currentStroke.totalStamps++;
    }
    if (isHit) {
      this.currentStroke.cacheHits++;
    } else {
      this.currentStroke.cacheMisses++;
      this.currentStroke.stampBuildTimeMs += buildTimeMs;
    }
  }

  public recordPredictedStroke(durationMs: number): void {
    if (!this.enabled || !this.currentStroke) return;
    this.currentStroke.predictedStrokeTimeMs += durationMs;
  }

  public recordComposite(durationMs: number): void {
    if (!this.enabled || !this.currentStroke) return;
    this.currentStroke.compositeTimeMs += durationMs;
  }

  public endStroke(): void {
    if (!this.enabled || !this.currentStroke) return;
    const now = performance.now();
    const s = this.currentStroke;
    s.endTime = now;
    s.durationMs = Math.max(1, now - s.startTime);

    const hitRate = (s.totalStamps + s.predictedStamps) > 0 ? (s.cacheHits / (s.totalStamps + s.predictedStamps)) * 100 : 100;
    const missRate = (s.totalStamps + s.predictedStamps) > 0 ? (s.cacheMisses / (s.totalStamps + s.predictedStamps)) * 100 : 0;
    const stampsPerSec = Math.round((s.totalStamps / s.durationMs) * 1000);

    const isBottleneck = missRate > 40 || s.maxFrameTimeMs > 16.6 || s.predictedStrokeTimeMs > 30;

    const badgeColor = isBottleneck ? '#ef4444' : '#10b981';
    const title = `%c🎨 [Diagnóstico Trazo] ${s.brushName || 'Pincel'} %c⏱️ ${s.durationMs.toFixed(0)} ms | 🖌️ ${s.totalStamps} stamps (${stampsPerSec}/s) | 🔮 Pred: ${s.predictedStamps} | 🎯 Miss: ${missRate.toFixed(1)}%`;

    console.groupCollapsed(
      title,
      `background: ${badgeColor}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;`,
      'color: #38bdf8; font-weight: bold;'
    );

    console.log(
      `%c📊 Estadísticas de Entrada:%c\n • Eventos Pointer: ${s.pointerMoveEvents}\n • Muestras coalescentes (W3C): ${s.coalescedSamples} (${(s.coalescedSamples / Math.max(1, s.pointerMoveEvents)).toFixed(1)}x por evento)`,
      'font-weight: bold; color: #a78bfa;',
      'color: inherit;'
    );

    console.log(
      `%c🎯 Sellos & Caché de Texturas:%c\n • Sellos reales consolidados: ${s.totalStamps}\n • Sellos temporales de predicción: ${s.predictedStamps}\n • Aciertos (Cache Hit): ${s.cacheHits} (${hitRate.toFixed(1)}%)\n • Fallos (Cache Miss / Nuevos Canvases): ${s.cacheMisses} (${missRate.toFixed(1)}%)\n • Tiempo CPU construyendo texturas: ${s.stampBuildTimeMs.toFixed(2)} ms`,
      'font-weight: bold; color: #38bdf8;',
      'color: inherit;'
    );

    console.log(
      `%c⏳ Tiempos Acumulados:%c\n • Predicción viva (renderPredicted): ${s.predictedStrokeTimeMs.toFixed(2)} ms\n • Composición GPU (updateComposite): ${s.compositeTimeMs.toFixed(2)} ms\n • Pico máximo por evento: ${s.maxFrameTimeMs.toFixed(2)} ms (${s.maxFrameTimeMs > 16.6 ? '⚠️ Caída de 60fps' : '✅ Fluido'})`,
      'font-weight: bold; color: #f59e0b;',
      'color: inherit;'
    );

    if (missRate > 40) {
      console.warn(
        `⚠️ DETECCIÓN DE CUELLO DE BOTELLA: Tasa de Cache Miss muy alta (${missRate.toFixed(1)}%).\nEl pincel está regenerando texturas en CPU porque el tamaño o ángulo varía sin cuantizar suficiente.`
      );
    }
    if (stampsPerSec > 6000 && s.maxFrameTimeMs > 16.6) {
      console.warn(
        `⚠️ DETECCIÓN DE SOBRE-SELLADO: Se están generando ${stampsPerSec} sellos/seg con caída de fps (${s.maxFrameTimeMs.toFixed(1)}ms).\nSe recomienda aumentar MIN_STAMP_STEP o spacing para evitar saturar el hilo de render.`
      );
    }

    console.groupEnd();

    if (this.showHud) {
      this.updateHud(s, hitRate, stampsPerSec);
    }

    this.currentStroke = null;
  }

  public toggleHud(visible?: boolean): void {
    this.showHud = visible !== undefined ? visible : !this.showHud;
    if (this.showHud) {
      this.ensureHudElement();
    } else if (this.hudElement) {
      this.hudElement.style.display = 'none';
    }
  }

  private ensureHudElement(): void {
    if (this.hudElement || typeof document === 'undefined') return;
    const el = document.createElement('div');
    el.id = 'oniri-brush-hud';
    el.style.position = 'fixed';
    el.style.bottom = '80px';
    el.style.right = '20px';
    el.style.background = 'rgba(18, 18, 22, 0.88)';
    el.style.backdropFilter = 'blur(8px)';
    el.style.border = '1px solid #334155';
    el.style.borderRadius = '8px';
    el.style.padding = '8px 12px';
    el.style.color = '#e2e8f0';
    el.style.fontFamily = 'monospace';
    el.style.fontSize = '11px';
    el.style.zIndex = '99999';
    el.style.pointerEvents = 'none';
    el.style.lineHeight = '1.4';
    el.innerHTML = '<b>Oniri Profiler</b>: Esperando trazo...';
    document.body.appendChild(el);
    this.hudElement = el;
  }

  private updateHud(s: StrokeProfileStats, hitRate: number, stampsPerSec: number): void {
    this.ensureHudElement();
    if (!this.hudElement) return;
    this.hudElement.style.display = 'block';
    const statusColor = hitRate < 60 || s.maxFrameTimeMs > 16.6 ? '#ef4444' : '#10b981';
    this.hudElement.innerHTML = `
      <div style="color: ${statusColor}; font-weight: bold; margin-bottom: 2px;">● ${s.brushName} (${s.durationMs.toFixed(0)}ms)</div>
      <div>Stamps: <b>${s.totalStamps}</b> (${stampsPerSec}/s)</div>
      <div>Cache Hit: <b>${hitRate.toFixed(1)}%</b> (Miss: ${s.cacheMisses})</div>
      <div>Pico Frame: <b>${s.maxFrameTimeMs.toFixed(1)}ms</b></div>
    `;
  }
}

export const brushDiagnostics = new BrushDiagnosticsManager();
