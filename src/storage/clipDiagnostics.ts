/**
 * Diagnóstico de Rendimiento y Memoria para la Importación de Proyectos (.clip / .oniri)
 * Mide y desglosa en consola el tiempo de extracción SQLite, descompresión Rust,
 * jerarquía de capas, montaje DOM y VRAM consumida para detectar cuellos de botella.
 */

export interface ClipImportProfileStats {
  fileName: string;
  fileSizeBytes: number;
  startTime: number;
  endTime: number;
  totalDurationMs: number;
  // Dimensiones
  docWidth: number;
  docHeight: number;
  // Estructura
  totalLayers: number;
  foldersCount: number;
  celsCount: number;
  tracksCount: number;
  totalFrames: number;
  fps: number;
  // Memoria y VRAM
  htmlCanvasesCreated: number;
  vramEstimatedMB: number;
  sparseGridEstimatedMB: number;
  // Tiempos por Fase (ms)
  sqliteExtractTimeMs: number;
  sqliteQueryTimeMs: number;
  layerHierarchyTimeMs: number;
  timelineSetupTimeMs: number;
  initialCelsDecodeTimeMs: number;
  domMountTimeMs: number;
  firstCompositeTimeMs: number;
  // Teselas
  tilesDecoded: number;
  emptyTilesSkipped: number;
  rustDecompressHits: number;
  jsFallbackHits: number;
}

class ClipDiagnosticsManager {
  public enabled = true;
  private current: ClipImportProfileStats | null = null;
  public lastProfile: ClipImportProfileStats | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      (window as unknown as { oniriClipDiagnostics: ClipDiagnosticsManager }).oniriClipDiagnostics = this;
    }
  }

  public startImport(fileName: string, fileSizeBytes: number): void {
    if (!this.enabled) return;
    this.current = {
      fileName,
      fileSizeBytes,
      startTime: performance.now(),
      endTime: 0,
      totalDurationMs: 0,
      docWidth: 0,
      docHeight: 0,
      totalLayers: 0,
      foldersCount: 0,
      celsCount: 0,
      tracksCount: 0,
      totalFrames: 0,
      fps: 0,
      htmlCanvasesCreated: 0,
      vramEstimatedMB: 0,
      sparseGridEstimatedMB: 0,
      sqliteExtractTimeMs: 0,
      sqliteQueryTimeMs: 0,
      layerHierarchyTimeMs: 0,
      timelineSetupTimeMs: 0,
      initialCelsDecodeTimeMs: 0,
      domMountTimeMs: 0,
      firstCompositeTimeMs: 0,
      tilesDecoded: 0,
      emptyTilesSkipped: 0,
      rustDecompressHits: 0,
      jsFallbackHits: 0,
    };
  }

  public recordSqliteExtract(durationMs: number): void {
    if (this.current) this.current.sqliteExtractTimeMs = durationMs;
  }

  public recordSqliteQuery(durationMs: number): void {
    if (this.current) this.current.sqliteQueryTimeMs = durationMs;
  }

  public recordDimensions(w: number, h: number): void {
    if (this.current) {
      this.current.docWidth = w;
      this.current.docHeight = h;
    }
  }

  public recordHierarchy(
    durationMs: number,
    totalLayers: number,
    foldersCount: number,
    celsCount: number,
    htmlCanvases: number
  ): void {
    if (!this.current) return;
    this.current.layerHierarchyTimeMs = durationMs;
    this.current.totalLayers = totalLayers;
    this.current.foldersCount = foldersCount;
    this.current.celsCount = celsCount;
    this.current.htmlCanvasesCreated = htmlCanvases;

    // 4 bytes por píxel (RGBA32) por cada canvas HTML instanciado
    const bytesPerCanvas = this.current.docWidth * this.current.docHeight * 4;
    const totalBytes = bytesPerCanvas * htmlCanvases;
    this.current.vramEstimatedMB = Math.round((totalBytes / (1024 * 1024)) * 10) / 10;
  }

  public recordTimelineSetup(durationMs: number, tracksCount: number, totalFrames: number, fps: number): void {
    if (!this.current) return;
    this.current.timelineSetupTimeMs = durationMs;
    this.current.tracksCount = tracksCount;
    this.current.totalFrames = totalFrames;
    this.current.fps = fps;
  }

  public recordCelDecode(isRust: boolean, tiles: number, emptyTiles: number, durationMs: number): void {
    if (!this.current) return;
    this.current.initialCelsDecodeTimeMs += durationMs;
    this.current.tilesDecoded += tiles;
    this.current.emptyTilesSkipped += emptyTiles;
    if (isRust) {
      this.current.rustDecompressHits++;
    } else {
      this.current.jsFallbackHits++;
    }
  }

  public recordDomMount(durationMs: number): void {
    if (this.current) this.current.domMountTimeMs = durationMs;
  }

  public recordFirstComposite(durationMs: number): void {
    if (this.current) this.current.firstCompositeTimeMs = durationMs;
  }

  public endImport(): void {
    if (!this.enabled || !this.current) return;
    const now = performance.now();
    const p = this.current;
    p.endTime = now;
    p.totalDurationMs = Math.max(1, now - p.startTime);

    // Estimación de memoria si se usa SparseTileGrid de Rust:
    // Solo las teselas con trazo real (128x128 = 64KB RGBA)
    const activeTiles = Math.max(1, p.tilesDecoded);
    const sparseBytes = activeTiles * (128 * 128 * 4);
    p.sparseGridEstimatedMB = Math.round((sparseBytes / (1024 * 1024)) * 10) / 10;

    this.lastProfile = { ...p };
    this.printReport(p);
    this.current = null;
  }

  private printReport(p: ClipImportProfileStats): void {
    const isVramCritical = p.vramEstimatedMB > 300;
    const isDurationCritical = p.totalDurationMs > 1200;
    const isCritical = isVramCritical || isDurationCritical;

    const badgeBg = isCritical ? '#ef4444' : '#10b981';
    const fileSizeMB = (p.fileSizeBytes / (1024 * 1024)).toFixed(1);

    const title = `%c📦 [Diagnóstico Carga] ${p.fileName} %c⏱️ ${p.totalDurationMs.toFixed(0)} ms | 💾 ${fileSizeMB} MB | 🖼️ ${p.docWidth}x${p.docHeight} | 🎨 ${p.totalLayers} capas (${p.vramEstimatedMB} MB VRAM)`;

    console.groupCollapsed(
      title,
      `background: ${badgeBg}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;`,
      'color: #38bdf8; font-weight: bold;'
    );

    console.log(
      `%c📊 Estructura del Documento:%c\n • Lienzo: ${p.docWidth} x ${p.docHeight} px\n • Capas Totales: ${p.totalLayers} (Carpetas: ${p.foldersCount}, Cels: ${p.celsCount})\n • Pistas de Animación: ${p.tracksCount} | Fotogramas: ${p.totalFrames} @ ${p.fps} fps`,
      'font-weight: bold; color: #a78bfa;',
      'color: inherit;'
    );

    console.log(
      `%c💾 Memoria y VRAM:%c\n • Canvases HTML creados: ${p.htmlCanvasesCreated} canvases\n • VRAM consumida estimada: ${p.vramEstimatedMB} MB ${isVramCritical ? '⚠️ (Riesgo de saturación GPU)' : '✅'}\n • Memoria estimada si se usara Rust SparseTileGrid: ~${p.sparseGridEstimatedMB} MB (Ahorro del ${Math.round((1 - p.sparseGridEstimatedMB / Math.max(1, p.vramEstimatedMB)) * 100)}%)`,
      'font-weight: bold; color: #f59e0b;',
      'color: inherit;'
    );

    console.log(
      `%c⏳ Tiempos por Fase (Hilo Principal):%c\n • 1. Extracción SQLite: ${p.sqliteExtractTimeMs.toFixed(1)} ms\n • 2. Parseo Metadatos SQL: ${p.sqliteQueryTimeMs.toFixed(1)} ms\n • 3. Jerarquía y creación de Capas: ${p.layerHierarchyTimeMs.toFixed(1)} ms\n • 4. Montaje DOM de Capas (LayersView): ${p.domMountTimeMs.toFixed(1)} ms\n • 5. Configuración Timeline: ${p.timelineSetupTimeMs.toFixed(1)} ms\n • 6. Decodificación Cels Iniciales: ${p.initialCelsDecodeTimeMs.toFixed(1)} ms\n • 7. Primera Composición GPU: ${p.firstCompositeTimeMs.toFixed(1)} ms`,
      'font-weight: bold; color: #38bdf8;',
      'color: inherit;'
    );

    console.log(
      `%c⚡ Decodificador de Teselas (Rust miniz_oxide vs JS):%c\n • Cels procesados en Rust: ${p.rustDecompressHits} (${p.jsFallbackHits > 0 ? `Fallback JS: ${p.jsFallbackHits}` : '100% Rust Nativo'})\n • Teselas activas decodificadas: ${p.tilesDecoded}\n • Teselas vacías/transparentes descartadas: ${p.emptyTilesSkipped}`,
      'font-weight: bold; color: #34d399;',
      'color: inherit;'
    );

    // Alertas y Diagnóstico Forense
    if (isVramCritical) {
      console.warn(
        `⚠️ ALERTA DE VRAM CRÍTICA: ${p.vramEstimatedMB} MB en ${p.htmlCanvasesCreated} canvases HTML5.\nEl navegador está obligado a gestionar más de ${p.vramEstimatedMB} MB de texturas en GPU simultáneas, lo cual provoca pausas en el Garbage Collector y expulsión de texturas a RAM.`
      );
    }
    if (p.domMountTimeMs > 200) {
      console.warn(
        `⚠️ CUELLO DE BOTELLA EN DOM: El montaje del panel de capas tomó ${p.domMountTimeMs.toFixed(0)} ms.\nSe recomienda virtualizar la lista de capas o diferir el renderizado de miniaturas.`
      );
    }

    console.groupEnd();
  }
}

export const clipDiagnostics = new ClipDiagnosticsManager();
