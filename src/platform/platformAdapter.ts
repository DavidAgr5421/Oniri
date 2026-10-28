/**
 * Oniri Platform Adapter
 * Provee una capa de abstracción transparente entre el entorno de escritorio nativo (Tauri v2 + Rust)
 * y el entorno Web (Navegador Chrome / WASM).
 */

export interface PlatformInfo {
  isTauri: boolean;
  platform: 'desktop' | 'web';
  backendVersion?: string;
}

export interface FileFilterOption {
  name: string;
  extensions: string[];
}

export class PlatformAdapter {
  private static _isTauri: boolean | null = null;
  private static _desktopVersion: string | null = null;

  /**
   * Determina si la aplicación se está ejecutando dentro del runtime de Tauri v2.
   */
  public static isTauri(): boolean {
    if (this._isTauri !== null) return this._isTauri;
    if (typeof window !== 'undefined') {
      this._isTauri = '__TAURI_INTERNALS__' in window || '__TAURI__' in window;
    } else {
      this._isTauri = false;
    }
    return this._isTauri;
  }

  /**
   * Obtiene la información del entorno actual.
   */
  public static async getPlatformInfo(): Promise<PlatformInfo> {
    const isT = this.isTauri();
    if (isT && !this._desktopVersion) {
      try {
        const { invoke } = await import('@tauri-apps/api/core');
        this._desktopVersion = await invoke<string>('get_desktop_version');
      } catch (e) {
        console.warn('[PlatformAdapter] Error al consultar version nativa:', e);
        this._desktopVersion = 'Tauri v2 Native';
      }
    }

    return {
      isTauri: isT,
      platform: isT ? 'desktop' : 'web',
      backendVersion: this._desktopVersion || undefined,
    };
  }

  /**
   * Diálogo nativo o web para abrir archivos.
   * En Tauri: Abre ventana nativa del sistema operativo (Windows Explorer / macOS Finder).
   * En Web: Abre un input file HTML5 transparente.
   */
  public static async openFileDialog(options?: {
    title?: string;
    filters?: FileFilterOption[];
    multiple?: boolean;
  }): Promise<{ name: string; path?: string; data: Uint8Array }[] | null> {
    if (this.isTauri()) {
      try {
        const { open } = await import('@tauri-apps/plugin-dialog');
        const { readFile } = await import('@tauri-apps/plugin-fs');

        const selected = await open({
          title: options?.title || 'Abrir archivo',
          multiple: options?.multiple || false,
          directory: false,
          filters: options?.filters?.map((f) => ({
            name: f.name,
            extensions: f.extensions,
          })),
        });

        if (!selected) return null;

        const filePaths = Array.isArray(selected) ? selected : [selected];
        const results: { name: string; path?: string; data: Uint8Array }[] = [];

        for (const filePath of filePaths) {
          const data = await readFile(filePath);
          const name = filePath.split(/[\\/]/).pop() || 'file';
          results.push({ name, path: filePath, data });
        }

        return results;
      } catch (err) {
        console.error('[PlatformAdapter] Error en dialogo nativo:', err);
      }
    }

    // Fallback: Entorno Web estándar
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = options?.multiple || false;

      if (options?.filters && options.filters.length > 0) {
        const exts = options.filters.flatMap((f) => f.extensions.map((e) => `.${e}`));
        input.accept = exts.join(',');
      }

      input.onchange = async () => {
        if (!input.files || input.files.length === 0) {
          resolve(null);
          return;
        }

        const results: { name: string; path?: string; data: Uint8Array }[] = [];
        for (let i = 0; i < input.files.length; i++) {
          const file = input.files[i];
          const buffer = await file.arrayBuffer();
          results.push({
            name: file.name,
            data: new Uint8Array(buffer),
          });
        }
        resolve(results);
      };

      input.oncancel = () => resolve(null);
      input.click();
    });
  }

  /**
   * Diálogo para guardar un archivo.
   * En Tauri: Permite elegir la ruta directamente en el disco.
   * En Web: Dispara descarga automática en el navegador.
   */
  public static async saveFileDialog(
    data: Uint8Array,
    options?: {
      title?: string;
      defaultPath?: string;
      filters?: FileFilterOption[];
      mimeType?: string;
    }
  ): Promise<boolean> {
    if (this.isTauri()) {
      try {
        const { save } = await import('@tauri-apps/plugin-dialog');
        const { writeFile } = await import('@tauri-apps/plugin-fs');

        const filePath = await save({
          title: options?.title || 'Guardar archivo',
          defaultPath: options?.defaultPath,
          filters: options?.filters?.map((f) => ({
            name: f.name,
            extensions: f.extensions,
          })),
        });

        if (!filePath) return false;

        await writeFile(filePath, data);
        return true;
      } catch (err) {
        console.error('[PlatformAdapter] Error guardando archivo nativo:', err);
      }
    }

    // Fallback: Descarga web
    const blob = new Blob([data as unknown as BlobPart], {
      type: options?.mimeType || 'application/octet-stream',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = options?.defaultPath || 'proyecto.oniri';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  }

  /**
   * Ejecuta un comando nativo en Rust via IPC de Tauri si está disponible.
   */
  public static async invokeNative<T>(cmd: string, args?: Record<string, unknown>): Promise<T | null> {
    if (!this.isTauri()) return null;
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<T>(cmd, args);
    } catch (e) {
      console.warn(`[PlatformAdapter] Fallo al invocar comando nativo ${cmd}:`, e);
      return null;
    }
  }
}
