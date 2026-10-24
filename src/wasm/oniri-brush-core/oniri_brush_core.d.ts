/* tslint:disable */
/* eslint-disable */

/**
 * Motor nativo de Cinemática Directa (FK), Cinemática Inversa (IK) y matrices 2D de Armadura
 */
export class BoneIKCore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Multiplicación de matrices afines 2D [a, b, c, d, tx, ty]
     */
    static compose_mat2d(m1: Float32Array, m2: Float32Array): Float32Array;
    /**
     * Distancia mínima de un punto (px, py) al segmento (x1, y1)-(x2, y2)
     */
    static distance_to_segment(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number;
    /**
     * Inversión de matriz afín 2D
     */
    static invert_mat2d(m: Float32Array): Float32Array;
    static normalize_angle_deg(deg: number): number;
    /**
     * Resuelve IK de 1 hueso (Look-At / Aim)
     */
    static solve_one_bone_aim(head_x: number, head_y: number, target_x: number, target_y: number, parent_world_angle: number, rest_rotation: number): number;
    /**
     * Resuelve la cinemática inversa analítica de 2 huesos (Law of Cosines)
     * Retorna `TwoBoneIKResult` con las rotaciones delta para el padre y el hijo.
     */
    static solve_two_bone_ik(root_x: number, root_y: number, target_x: number, target_y: number, l1: number, l2: number, bend_positive: boolean, grandparent_world_angle: number, parent_rest_rotation: number, child_rest_rotation: number): TwoBoneIKResult;
}

/**
 * Motor en Rust + WASM para Esqueleto 2D (FK/IK), Pesos de Malla y Linear Blend Skinning (LBS)
 */
export class BoneSkinCore {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Calcula la grilla de vértices y los 3 pesos de influencia inversa por hueso en Bind Pose.
     * `bone_segments`: slice plano `[bindHeadX, bindHeadY, bindTailX, bindTailY, ...]` (stride 4).
     * Retorna la cantidad de vértices generados en `vertices_buffer` (stride 10).
     */
    build_mesh_vertices(min_x: number, min_y: number, bw: number, bh: number, cols: number, rows: number, bone_segments: Float32Array): number;
    /**
     * Calcula en un solo lote WASM todos los vértices deformados por LBS y las matrices afines
     * de cada triángulo texturizado (con expansión de centroide de 0.45px anti-costuras).
     * - `packed_vertices`: stride 10 `[x, y, u, v, b0, w0, b1, w1, b2, w2]`
     * - `packed_indices`: índices de triángulos `[i0, i1, i2, ...]` (stride 3)
     * - `skin_matrices`: matrices 2D `[a, b, c, d, tx, ty]` por hueso (stride 6)
     * Retorna la cantidad de triángulos válidos escritos en `triangles_buffer` (stride 12).
     */
    compute_skinned_triangles(packed_vertices: Float32Array, packed_indices: Uint32Array, skin_matrices: Float32Array, bx: number, by: number, bw: number, bh: number): number;
    get_triangles_len(): number;
    get_triangles_ptr(): number;
    get_vertices_len(): number;
    get_vertices_ptr(): number;
    constructor();
    /**
     * Escanea el canal alpha de una capa RGBA8 con paso `step` y retorna `[min_x, min_y, bw, bh]`
     */
    scan_layer_bounds(rgba: Uint8Array, w: number, h: number, step: number, pad: number): Int32Array;
}

/**
 * Configuración completa de dinámica del pincel para el motor en Rust
 */
export class BrushDynamicsConfig {
    free(): void;
    [Symbol.dispose](): void;
    constructor(base_size: number, min_size_ratio: number, spacing_ratio: number, pressure_size: boolean, pressure_gamma: number, taper_start: number, velocity_size_enabled: boolean, velocity_min_ratio: number, velocity_curve: number, random_size_ratio: number, flow: number, pressure_flow: boolean, velocity_flow: boolean, ink_mode_uniform: boolean, ribbon: boolean, follow_direction: boolean, is_custom_tip: boolean, tip_shape_code: number, tip_angle_deg: number, tip_cycle_mode: number, tip_count: number, spray_enabled: boolean, spray_density: number, spray_radius: number, is_rain_tip: boolean, is_mouse: boolean);
    base_size: number;
    flow: number;
    follow_direction: boolean;
    ink_mode_uniform: boolean;
    is_custom_tip: boolean;
    is_mouse: boolean;
    is_rain_tip: boolean;
    min_size_ratio: number;
    pressure_flow: boolean;
    pressure_gamma: number;
    pressure_size: boolean;
    random_size_ratio: number;
    ribbon: boolean;
    spacing_ratio: number;
    spray_density: number;
    spray_enabled: boolean;
    spray_radius: number;
    taper_start: number;
    tip_angle_deg: number;
    tip_count: number;
    /**
     * 0 = single, 1 = sequential, 2 = reverse, 3 = random
     */
    tip_cycle_mode: number;
    /**
     * 0 = circle, 1 = square, 2 = calligraphic
     */
    tip_shape_code: number;
    velocity_curve: number;
    velocity_flow: boolean;
    velocity_min_ratio: number;
    velocity_size_enabled: boolean;
}

/**
 * Motor nativo de decodificación planar y composición de mosaicos (tiles)
 */
export class ClipTileCore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Compone un tile descompreso de 5 planos (256x256) directamente en el buffer RGBA del documento
     */
    static blit_planar_tile(dest_rgba: Uint8Array, doc_w: number, doc_h: number, decomp_planes: Uint8Array, start_x: number, start_y: number, is_monochrome: boolean): boolean;
}

/**
 * Motor nativo de mezcla cromática, difuminado (smudge) y tintado de color
 */
export class ColorBlendCore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Aplica tintado monocromo in-place (Color de capa / Papel cebolla) sobre un buffer RGBA
     */
    static apply_tint_in_place(rgba_buffer: Uint8Array, tint_r: number, tint_g: number, tint_b: number): void;
    /**
     * Mezcla el color del pincel con el color muestreado del lienzo (acuarela/óleo)
     */
    static blend_color_mix(brush_r: number, brush_g: number, brush_b: number, sampled_r: number, sampled_g: number, sampled_b: number, sampled_a: number, color_mix: number, pressure: number): Uint8Array;
    /**
     * Mezcla dos colores (Principal y Subcolor/Secundario) en función de la presión
     */
    static blend_dual_color(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, pressure: number): Uint8Array;
    /**
     * Evalúa la respuesta del grano de textura de papel sobre el canal alpha
     * `mode`: 0 = height (comparar altura), 1 = subtract, 2 = multiply, 3 = outline
     */
    static evaluate_paper_texture(grain_val: number, base_alpha: number, pressure: number, density: number, mode: number, invert: boolean): number;
    /**
     * Actualiza el estado acumulado de arrastre / difuminado (Smudge / Blender)
     * Retorna `[r, g, b, alpha]`
     */
    static step_smudge(current_r: number, current_g: number, current_b: number, current_a: number, sampled_r: number, sampled_g: number, sampled_b: number, sampled_a: number, pick_rate: number): Float32Array;
}

export class FilterCore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adjust brightness (-1.0 to 1.0) and contrast (-1.0 to 1.0) in place.
     */
    static adjust_brightness_contrast(rgba: Uint8Array, brightness: number, contrast: number): void;
    /**
     * Adjust Hue, Saturation and Value (HSV).
     * - `hue_delta_deg`: -180.0 to 180.0
     * - `sat_scale`: 0.0 to 3.0 (1.0 = unchanged)
     * - `val_scale`: 0.0 to 3.0 (1.0 = unchanged)
     */
    static adjust_hsv(rgba: Uint8Array, hue_delta_deg: number, sat_scale: number, val_scale: number): void;
    /**
     * Convert to black or white based on luminance threshold (0..255).
     * Pixels with luminance >= threshold become white (255), otherwise black (0).
     * Transparent pixels remain unaffected.
     */
    static binarize(rgba: Uint8Array, threshold: number): void;
    /**
     * Fast separable 1D Gaussian blur on an RGBA buffer.
     * Returns a new blurred RGBA vector of identical dimensions.
     */
    static gaussian_blur(src_rgba: Uint8Array, width: number, height: number, radius: number): Uint8Array;
    /**
     * Invert RGB channels in place, preserving alpha.
     */
    static invert_colors(rgba: Uint8Array): void;
}

export class FloodFillCore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Non-contiguous color fill: replaces all pixels matching the color under (start_x, start_y)
     * across the whole buffer within tolerance, respecting optional selection mask.
     */
    static fill_all_matching(rgba: Uint8Array, width: number, height: number, start_x: number, start_y: number, fill_r: number, fill_g: number, fill_b: number, fill_a: number, tolerance: number, selection_mask: Uint8Array): FloodFillResult | undefined;
    /**
     * 4-way scanline flood fill on an RGBA buffer in place.
     * If `selection_mask` is non-empty, filling only applies where mask > 0.
     * Returns bounding box and filled count, or None if no pixels were changed.
     */
    static scanline_fill(rgba: Uint8Array, width: number, height: number, start_x: number, start_y: number, fill_r: number, fill_g: number, fill_b: number, fill_a: number, tolerance: number, selection_mask: Uint8Array): FloodFillResult | undefined;
}

export class FloodFillResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    filled_count: number;
    max_x: number;
    max_y: number;
    min_x: number;
    min_y: number;
}

/**
 * Codificador GIF89a en Rust + WASM con cuantización 5-bit O(1) y tabla LZW plana sin asignaciones
 */
export class GifEncoderCore {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Comprime un buffer de píxeles indexados mediante LZW variable de GIF89a en `lzw_stream`
     */
    encode_lzw_frame(indexed: Uint8Array, color_depth: number): number;
    get_indexed_len(): number;
    get_indexed_ptr(): number;
    get_lzw_len(): number;
    get_lzw_ptr(): number;
    get_palette_len(): number;
    get_palette_ptr(): number;
    constructor();
    /**
     * Cuantiza un frame RGBA8 a paleta de hasta 255 colores + índice transparente en O(N)
     */
    quantize_rgba(rgba: Uint8Array, width: number, height: number): number;
}

export enum ResampleMode {
    Nearest = 0,
    Bilinear = 1,
    Bicubic = 2,
    Lanczos = 3,
}

/**
 * Motor nativo de selección, morfología y extracción de bordes (Marching Ants)
 */
export class SelectionCore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Calcula de manera ultrarrápida los límites de la selección (bounding box)
     * Retorna `[min_x, min_y, max_x, max_y, width, height]` o un vector vacío si no hay selección.
     */
    static compute_bounds(buffer: Uint8Array, width: number, height: number, is_rgba: boolean): Int32Array;
    /**
     * Extrae el contorno perimetral exacto de 1 píxel para las Marching Ants
     * Genera directamente un buffer RGBA con el perímetro marcado para pintar en canvas
     */
    static extract_boundary_mask(src_buffer: Uint8Array, width: number, height: number, is_rgba: boolean): Uint8Array;
    /**
     * Inversión de máscara booleana directamente a RGBA
     */
    static invert_mask(src_rgba: Uint8Array, width: number, height: number): Uint8Array;
    /**
     * Erosión morfológica circular (Contract / Reduce Selection) directamente a RGBA
     */
    static morphology_contract(src_buffer: Uint8Array, width: number, height: number, radius: number, is_rgba: boolean): Uint8Array;
    /**
     * Dilatación morfológica circular (Expand Selection) directamente a RGBA
     */
    static morphology_expand(src_buffer: Uint8Array, width: number, height: number, radius: number, is_rgba: boolean): Uint8Array;
}

/**
 * Motor morfológico en Rust + WASM para Smart Fill, Enclose & Fill y Paint Unfilled Area
 */
export class SmartFillCore {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Ejecuta "Cerrar y Rellenar" (Enclose and Fill) en Rust sobre una región local [rw × rh]
     */
    compute_enclose_fill_mask(boundary_rgba: Uint8Array, target_rgba: Uint8Array, lasso_rgba: Uint8Array, rw: number, rh: number, close_gap: number, area_scaling: number): number;
    /**
     * Ejecuta el cálculo completo de Smart Fill (Cubo de pintura inteligente) en Rust.
     * Retorna la cantidad de píxeles en la máscara final (0 si no hay área rellenable).
     */
    compute_smart_fill_mask(boundary_rgba: Uint8Array, doc_w: number, doc_h: number, seed_x: number, seed_y: number, tolerance: number, close_gap: number, area_scaling: number, is_multi_layer: boolean): number;
    /**
     * Ejecuta "Pintar área no rellenada" (Paint Unfilled Area) en Rust sobre una región [rw × rh]
     */
    compute_unfilled_area_mask(boundary_rgba: Uint8Array, target_rgba: Uint8Array, stroke_rgba: Uint8Array, rw: number, rh: number, close_gap: number, area_scaling: number): number;
    get_bounds(): Int32Array;
    get_mask_ptr(): number;
    constructor();
}

/**
 * Motor de cálculo de trazos, dinámicas y rasterización SDF de sellos en Rust + WASM
 */
export class StrokeEngineCore {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Interpola un segmento desde el último punto hasta (x1, y1, p1) con espaciado adaptativo
     */
    add_point(x1: number, y1: number, p1: number): number;
    /**
     * Inicia un trazo y genera el primer dab (o ráfaga de spray inicial) en el buffer zero-copy
     */
    begin_stroke(x: number, y: number, pressure: number): number;
    /**
     * Rasterizador nativo en Rust de sellos SDF (Circle, Square Chisel, 45° Calligraphic + Texturas de punta)
     * Escribe `size * size * 4` bytes RGBA en `stamp_rgba_buffer` para lectura zero-copy desde JS.
     */
    build_sdf_stamp(size: number, diameter: number, hardness: number, cr: number, cg: number, cb: number, aa_width: number, threshold: boolean, shape_code: number, scale_y: number, mat_mode: number, mat_w: number, mat_h: number, mat_rgba: Uint8Array): number;
    end_stroke(): void;
    /**
     * Calcula el alpha/flujo de un dab según modo de tinta ('uniform' vs 'accumulate') y velocidad
     */
    evaluate_alpha(pressure: number, speed: number): number;
    /**
     * Calcula el diámetro exacto de un dab según curvas de presión, taper, velocidad y tamaño aleatorio
     */
    evaluate_diameter(pressure: number, distance: number, speed: number, is_mouse: boolean, stamp_index: number): number;
    get_dabs_len(): number;
    /**
     * Puntero zero-copy al buffer de dabs (stride 7: [x, y, diameter, pressure, alpha, angle_rad, tip_index])
     */
    get_dabs_ptr(): number;
    get_dirty_rect(): Float32Array;
    get_stamp_len(): number;
    get_stamp_ptr(): number;
    constructor(config: BrushDynamicsConfig);
    /**
     * Restaura el estado guardado tras renderizar la predicción temporal
     */
    restore_checkpoint(): void;
    /**
     * Guarda el estado actual antes de calcular trazos predichos (renderPredictedStroke)
     */
    save_checkpoint(): void;
    set_speed(speed: number): void;
    update_config(config: BrushDynamicsConfig): void;
}

/**
 * Motor nativo de estabilización adaptativa de trazo y subdivisión Bézier
 */
export class StrokeStabilizerCore {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Procesa una muestra bruta del pointer (ratón o lápiz)
     * Aplica filtrado de jitter, estabilización adaptativa a la velocidad y subdivisión Bézier.
     * Retorna la cantidad de puntos interpolados emitidos (cada uno stride 3: [x, y, p]).
     */
    add_raw_point(x: number, y: number, pressure: number, stabilization: number, is_pen: boolean): number;
    /**
     * Inicia un nuevo trazo estabilizado
     */
    begin_stroke(x: number, y: number, pressure: number): void;
    /**
     * Al soltar el lápiz, emite el segmento final hasta el punto de liberación exacto
     */
    flush_tail(): number;
    get_emitted_len(): number;
    get_emitted_ptr(): number;
    get_speed(): number;
    constructor();
}

export class TransformResampleCore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Helper to compute the 6-element inverse affine transform matrix
     * for translation, rotation, scale and pivot offset:
     * `P_src = Center_src + S^-1 * R^-1 * (P_dst - Center_dst)`
     */
    static compute_inverse_transform_matrix(center_src_x: number, center_src_y: number, center_dst_x: number, center_dst_y: number, scale_x: number, scale_y: number, rotation_rad: number): Float32Array;
    /**
     * Resample an RGBA patch applying an affine transformation with inverse mapping.
     * `mat_inv` is the 6-element inverse affine matrix:
     * `[a, b, c, d, tx, ty]` where
     * `src_x = a * dst_x + c * dst_y + tx`
     * `src_y = b * dst_x + d * dst_y + ty`
     */
    static resample_affine(src_rgba: Uint8Array, src_w: number, src_h: number, dst_w: number, dst_h: number, mat_inv: Float32Array, mode: ResampleMode): Uint8Array;
    /**
     * Resample an RGBA image from `(src_w, src_h)` to `(dst_w, dst_h)`.
     * Returns a new RGBA vector of length `dst_w * dst_h * 4`.
     */
    static resample_scale(src_rgba: Uint8Array, src_w: number, src_h: number, dst_w: number, dst_h: number, mode: ResampleMode): Uint8Array;
}

/**
 * Resultado del cálculo analítico de IK para extremidades de 2 huesos
 */
export class TwoBoneIKResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    child_d_rotation: number;
    parent_d_rotation: number;
}

export function init_engine_hooks(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_boneikcore_free: (a: number, b: number) => void;
    readonly __wbg_boneskincore_free: (a: number, b: number) => void;
    readonly __wbg_brushdynamicsconfig_free: (a: number, b: number) => void;
    readonly __wbg_cliptilecore_free: (a: number, b: number) => void;
    readonly __wbg_colorblendcore_free: (a: number, b: number) => void;
    readonly __wbg_filtercore_free: (a: number, b: number) => void;
    readonly __wbg_floodfillcore_free: (a: number, b: number) => void;
    readonly __wbg_floodfillresult_free: (a: number, b: number) => void;
    readonly __wbg_get_brushdynamicsconfig_base_size: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_flow: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_follow_direction: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_ink_mode_uniform: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_is_custom_tip: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_is_mouse: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_is_rain_tip: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_min_size_ratio: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_pressure_flow: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_pressure_gamma: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_pressure_size: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_random_size_ratio: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_ribbon: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_spacing_ratio: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_spray_density: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_spray_enabled: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_spray_radius: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_taper_start: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_tip_angle_deg: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_tip_count: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_tip_cycle_mode: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_tip_shape_code: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_velocity_curve: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_velocity_flow: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_velocity_min_ratio: (a: number) => number;
    readonly __wbg_get_brushdynamicsconfig_velocity_size_enabled: (a: number) => number;
    readonly __wbg_get_floodfillresult_filled_count: (a: number) => number;
    readonly __wbg_get_floodfillresult_max_x: (a: number) => number;
    readonly __wbg_get_floodfillresult_max_y: (a: number) => number;
    readonly __wbg_get_floodfillresult_min_x: (a: number) => number;
    readonly __wbg_get_floodfillresult_min_y: (a: number) => number;
    readonly __wbg_get_twoboneikresult_child_d_rotation: (a: number) => number;
    readonly __wbg_get_twoboneikresult_parent_d_rotation: (a: number) => number;
    readonly __wbg_gifencodercore_free: (a: number, b: number) => void;
    readonly __wbg_selectioncore_free: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_base_size: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_flow: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_follow_direction: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_ink_mode_uniform: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_is_custom_tip: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_is_mouse: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_is_rain_tip: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_min_size_ratio: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_pressure_flow: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_pressure_gamma: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_pressure_size: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_random_size_ratio: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_ribbon: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_spacing_ratio: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_spray_density: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_spray_enabled: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_spray_radius: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_taper_start: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_tip_angle_deg: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_tip_count: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_tip_cycle_mode: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_tip_shape_code: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_velocity_curve: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_velocity_flow: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_velocity_min_ratio: (a: number, b: number) => void;
    readonly __wbg_set_brushdynamicsconfig_velocity_size_enabled: (a: number, b: number) => void;
    readonly __wbg_set_floodfillresult_filled_count: (a: number, b: number) => void;
    readonly __wbg_set_floodfillresult_max_x: (a: number, b: number) => void;
    readonly __wbg_set_floodfillresult_max_y: (a: number, b: number) => void;
    readonly __wbg_set_floodfillresult_min_x: (a: number, b: number) => void;
    readonly __wbg_set_floodfillresult_min_y: (a: number, b: number) => void;
    readonly __wbg_set_twoboneikresult_child_d_rotation: (a: number, b: number) => void;
    readonly __wbg_set_twoboneikresult_parent_d_rotation: (a: number, b: number) => void;
    readonly __wbg_smartfillcore_free: (a: number, b: number) => void;
    readonly __wbg_strokeenginecore_free: (a: number, b: number) => void;
    readonly __wbg_strokestabilizercore_free: (a: number, b: number) => void;
    readonly __wbg_transformresamplecore_free: (a: number, b: number) => void;
    readonly __wbg_twoboneikresult_free: (a: number, b: number) => void;
    readonly boneikcore_compose_mat2d: (a: number, b: number, c: number, d: number) => [number, number];
    readonly boneikcore_distance_to_segment: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly boneikcore_invert_mat2d: (a: number, b: number) => [number, number];
    readonly boneikcore_normalize_angle_deg: (a: number) => number;
    readonly boneikcore_solve_one_bone_aim: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly boneikcore_solve_two_bone_ik: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly boneskincore_build_mesh_vertices: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly boneskincore_compute_skinned_triangles: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly boneskincore_get_triangles_len: (a: number) => number;
    readonly boneskincore_get_triangles_ptr: (a: number) => number;
    readonly boneskincore_get_vertices_len: (a: number) => number;
    readonly boneskincore_get_vertices_ptr: (a: number) => number;
    readonly boneskincore_new: () => number;
    readonly boneskincore_scan_layer_bounds: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly brushdynamicsconfig_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number, v: number, w: number, x: number, y: number, z: number) => number;
    readonly cliptilecore_blit_planar_tile: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly colorblendcore_apply_tint_in_place: (a: number, b: number, c: any, d: number, e: number, f: number) => void;
    readonly colorblendcore_blend_color_mix: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly colorblendcore_blend_dual_color: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly colorblendcore_evaluate_paper_texture: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly colorblendcore_step_smudge: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly filtercore_adjust_brightness_contrast: (a: number, b: number, c: any, d: number, e: number) => void;
    readonly filtercore_adjust_hsv: (a: number, b: number, c: any, d: number, e: number, f: number) => void;
    readonly filtercore_binarize: (a: number, b: number, c: any, d: number) => void;
    readonly filtercore_gaussian_blur: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly filtercore_invert_colors: (a: number, b: number, c: any) => void;
    readonly floodfillcore_fill_all_matching: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => number;
    readonly floodfillcore_scanline_fill: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => number;
    readonly gifencodercore_encode_lzw_frame: (a: number, b: number, c: number, d: number) => number;
    readonly gifencodercore_get_indexed_len: (a: number) => number;
    readonly gifencodercore_get_indexed_ptr: (a: number) => number;
    readonly gifencodercore_get_lzw_len: (a: number) => number;
    readonly gifencodercore_get_lzw_ptr: (a: number) => number;
    readonly gifencodercore_get_palette_len: (a: number) => number;
    readonly gifencodercore_get_palette_ptr: (a: number) => number;
    readonly gifencodercore_new: () => number;
    readonly gifencodercore_quantize_rgba: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly init_engine_hooks: () => void;
    readonly selectioncore_compute_bounds: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly selectioncore_extract_boundary_mask: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly selectioncore_invert_mask: (a: number, b: number, c: number, d: number) => [number, number];
    readonly selectioncore_morphology_contract: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly selectioncore_morphology_expand: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly smartfillcore_compute_enclose_fill_mask: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly smartfillcore_compute_smart_fill_mask: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly smartfillcore_compute_unfilled_area_mask: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly smartfillcore_get_bounds: (a: number) => [number, number];
    readonly smartfillcore_get_mask_ptr: (a: number) => number;
    readonly smartfillcore_new: () => number;
    readonly strokeenginecore_add_point: (a: number, b: number, c: number, d: number) => number;
    readonly strokeenginecore_begin_stroke: (a: number, b: number, c: number, d: number) => number;
    readonly strokeenginecore_build_sdf_stamp: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => number;
    readonly strokeenginecore_end_stroke: (a: number) => void;
    readonly strokeenginecore_evaluate_alpha: (a: number, b: number, c: number) => number;
    readonly strokeenginecore_evaluate_diameter: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly strokeenginecore_get_dabs_len: (a: number) => number;
    readonly strokeenginecore_get_dabs_ptr: (a: number) => number;
    readonly strokeenginecore_get_dirty_rect: (a: number) => [number, number];
    readonly strokeenginecore_get_stamp_len: (a: number) => number;
    readonly strokeenginecore_get_stamp_ptr: (a: number) => number;
    readonly strokeenginecore_new: (a: number) => number;
    readonly strokeenginecore_restore_checkpoint: (a: number) => void;
    readonly strokeenginecore_save_checkpoint: (a: number) => void;
    readonly strokeenginecore_set_speed: (a: number, b: number) => void;
    readonly strokeenginecore_update_config: (a: number, b: number) => void;
    readonly strokestabilizercore_add_raw_point: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly strokestabilizercore_begin_stroke: (a: number, b: number, c: number, d: number) => void;
    readonly strokestabilizercore_flush_tail: (a: number) => number;
    readonly strokestabilizercore_get_emitted_len: (a: number) => number;
    readonly strokestabilizercore_get_emitted_ptr: (a: number) => number;
    readonly strokestabilizercore_get_speed: (a: number) => number;
    readonly strokestabilizercore_new: () => number;
    readonly transformresamplecore_compute_inverse_transform_matrix: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly transformresamplecore_resample_affine: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly transformresamplecore_resample_scale: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
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
