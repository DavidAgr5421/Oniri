/* tslint:disable */
/* eslint-disable */

/**
 * Configuración de dinámica y respuesta del pincel
 */
export class BrushDynamicsConfig {
    free(): void;
    [Symbol.dispose](): void;
    constructor(base_size: number, min_size_ratio: number, spacing_ratio: number, pressure_gamma: number, velocity_size_enabled: boolean, velocity_min_ratio: number);
    base_size: number;
    min_size_ratio: number;
    pressure_gamma: number;
    spacing_ratio: number;
    velocity_min_ratio: number;
    velocity_size_enabled: boolean;
}

/**
 * Representa una muestra interpolada de un dab de pincel calculada por Rust
 */
export class Dab {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    angle: number;
    opacity: number;
    size: number;
    x: number;
    y: number;
}

/**
 * Motor de cálculo e interpolación de trazos de alta frecuencia en Rust
 */
export class StrokeEngineCore {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Agrega un nuevo punto de movimiento (PointerMove) e interpola dabs
     */
    add_point(x: number, y: number, pressure: number, time_ms: number): number;
    /**
     * Inicia un nuevo trazo en (x, y) con presión dada
     */
    begin_stroke(x: number, y: number, pressure: number, time_ms: number): void;
    /**
     * Finaliza el trazo actual
     */
    end_stroke(): void;
    /**
     * Cantidad total de floats en el buffer (número de dabs = len / 5)
     */
    get_dabs_len(): number;
    /**
     * Puntero en memoria compartida a los dabs [x, y, size, opacity, angle, ...]
     */
    get_dabs_ptr(): number;
    /**
     * Retorna el rectángulo sucio (dirty rect) [min_x, min_y, max_x, max_y]
     */
    get_dirty_rect(): Float32Array;
    constructor(config: BrushDynamicsConfig);
    update_config(config: BrushDynamicsConfig): void;
}

export function init_engine_hooks(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_brushdynamicsconfig_free: (a: number, b: number) => void;
    readonly __wbg_dab_free: (a: number, b: number) => void;
    readonly __wbg_get_brushdynamicsconfig_base_size: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_min_size_ratio: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_pressure_gamma: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_spacing_ratio: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_velocity_min_ratio: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_velocity_size_enabled: (a: number) => number;
    readonly __wbg_get_dab_angle: (a: number) => number;
    readonly __wbg_get_dab_opacity: (a: number) => number;
    readonly __wbg_get_dab_size: (a: number) => number;
    readonly __wbg_get_dab_x: (a: number) => number;
    readonly __wbg_get_dab_y: (a: number) => number;
    readonly __wbg_set_brushdynamicsconfig_base_size: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_min_size_ratio: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_pressure_gamma: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_spacing_ratio: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_velocity_min_ratio: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_velocity_size_enabled: (a: number, b: number) => void;
    readonly __wbg_set_dab_angle: (a: number, b: number) => void;
    readonly __wbg_set_dab_opacity: (a: number, b: number) => void;
    readonly __wbg_set_dab_size: (a: number, b: number) => void;
    readonly __wbg_set_dab_x: (a: number, b: number) => void;
    readonly __wbg_set_dab_y: (a: number, b: number) => void;
    readonly __wbg_strokeenginecore_free: (a: number, b: number) => void;
    readonly brushdynamicsconfig_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly init_engine_hooks: () => void;
    readonly strokeenginecore_add_point: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly strokeenginecore_begin_stroke: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly strokeenginecore_end_stroke: (a: number) => void;
    readonly strokeenginecore_get_dabs_len: (a: number) => number;
    readonly strokeenginecore_get_dabs_ptr: (a: number) => number;
    readonly strokeenginecore_get_dirty_rect: (a: number) => [number, number];
    readonly strokeenginecore_new: (a: number) => number;
    readonly strokeenginecore_update_config: (a: number, b: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
