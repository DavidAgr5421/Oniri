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
    /**
     * Descomprime un tile de Clip Studio Paint comprimido con zlib directamente en memoria nativa Rust
     * y lo vuelca desplanarizado en el lienzo destino.
     */
    static decompress_and_blit_tile(dest_rgba: Uint8Array, doc_w: number, doc_h: number, compressed_data: Uint8Array, start_x: number, start_y: number, is_monochrome: boolean): boolean;
}

/**
 * Parser nativo de alto rendimiento para pistas de animación y curvas de exposición FCurve de Clip Studio Paint.
 */
export class ClipTimelineParser {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Normaliza un UUID eliminando guiones y convirtiéndolo a minúsculas
     */
    static clean_uuid(raw_uuid: string): string;
    /**
     * Descomprime con miniz_oxide un chunk TrackActionMixer y parsea los keyframes de exposición.
     * Devuelve un JSON string con { "cel_names": [...], "exposures": { "celName": frame } }
     */
    static parse_track_exposures(chunk_bytes: Uint8Array): string;
}

/**
 * Motor nativo de mezcla cromática, difuminado (smudge) y tintado de color
 */
export class ColorBlendCore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Aplica modulación matricial de grano de papel SIMD in-place sobre un buffer RGBA
     * Modula directamente el canal alfa (y premultiplica si llega a 0) en memoria contigua.
     */
    static apply_paper_grain_rect(rgba_buffer: Uint8Array, stride_width: number, rect_width: number, rect_height: number, doc_origin_x: number, doc_origin_y: number, tooth_matrix: Float32Array, tooth_width: number, tooth_height: number, scale: number, density: number, mode: number, invert: boolean): boolean;
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
     * Genera una tesela RGBA matricial de patrón de grano de papel optimizada para repetición
     */
    static generate_paper_pattern_tile(out_rgba: Uint8Array, tile_width: number, tile_height: number, tooth_matrix: Float32Array, tooth_width: number, tooth_height: number, density: number, mode: number, invert: boolean): boolean;
    /**
     * Fusiona la capa superior `src_rgba` sobre `dst_rgba` en memoria con modo de fusión, opacidad y alpha lock
     */
    static merge_layers_simd(dst_rgba: Uint8Array, src_rgba: Uint8Array, width: number, height: number, blend_mode_id: number, opacity: number, lock_alpha: boolean, clip_mask: Uint8Array): boolean;
    /**
     * Fusiona de forma ultra-rápida un rectángulo delimitado [min_x, min_y, max_x, max_y]
     * de un trazo (`src_rgba`) sobre la capa de destino (`dst_rgba`), aplicando opacidad,
     * modo de mezcla (normal, lighter, multiply, screen, etc.) y bloqueo de canal alfa (`lock_alpha`).
     * Si `clip_mask` no está vacío, modula el alfa del trazo por la máscara.
     */
    static merge_stroke_rect(dst_rgba: Uint8Array, src_rgba: Uint8Array, stride_width: number, stride_height: number, min_x: number, min_y: number, max_x: number, max_y: number, blend_mode_id: number, opacity: number, lock_alpha: boolean, clip_mask: Uint8Array): boolean;
    /**
     * Actualiza el estado acumulado de arrastre / difuminado (Smudge / Blender)
     * Retorna `[r, g, b, alpha]`
     */
    static step_smudge(current_r: number, current_g: number, current_b: number, current_a: number, sampled_r: number, sampled_g: number, sampled_b: number, sampled_a: number, pick_rate: number): Float32Array;
}

/**
 * Motor nativo de muestreo cromático ultra-rápido para mezcla de pintura (Óleo / Acuarela / Smudge)
 */
export class ColorSamplerCore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Muestrea un punto (x, y) de un buffer RGBA plano
     * Retorna un vector con [r, g, b, alpha_norm] o vacío si es totalmente transparente
     */
    static sample_rgba(buffer: Uint8Array, width: number, height: number, x: number, y: number): Float32Array;
}

/**
 * Compositor nativo SIMD para mezclar capas en memoria contigua
 */
export class FastLayerCompositor {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Mezcla capas soportando modos estándar:
     * 0 = source-over (Normal), 1 = multiply, 2 = screen, 3 = overlay
     */
    static blend_layer(dest: Uint8Array, src: Uint8Array, opacity: number, blend_mode: number): void;
    /**
     * Mezcla una capa sobre otra usando blend mode 'source-over' optimizado
     */
    static blend_source_over(dest: Uint8Array, src: Uint8Array, opacity: number): void;
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
     * Extracción de lineart a transparencia (Clean paper scan to transparent ink)
     * Convierte el fondo de papel blanco en transparencia pura manteniendo los trazos
     */
    static extract_lineart_transparent(rgba: Uint8Array, darkness: number, threshold: number): void;
    /**
     * Fast separable 1D Gaussian blur on an RGBA buffer.
     * Returns a new blurred RGBA vector of identical dimensions.
     */
    static gaussian_blur(src_rgba: Uint8Array, width: number, height: number, radius: number): Uint8Array;
    /**
     * Generador de tramas manga (Halftone / Screentones) a partir de capas de sombreado
     * - `frequency_lpi`: líneas/puntos por pulgada (e.g. 30 a 85 LPI típico en manga)
     * - `angle_deg`: ángulo de inclinación de la trama (e.g. 45° estándar)
     * - `dot_shape`: 0 = punto circular, 1 = línea, 2 = diamante
     */
    static generate_screentone(rgba: Uint8Array, width: number, height: number, frequency_lpi: number, angle_deg: number, dot_shape: number): void;
    /**
     * Invert RGB channels in place, preserving alpha.
     */
    static invert_colors(rgba: Uint8Array): void;
    /**
     * Enfoque de trazos (Unsharp Mask)
     */
    static unsharp_mask(rgba: Uint8Array, width: number, height: number, radius: number, amount: number, threshold: number): void;
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
 * Motor de caché circular de fotogramas en memoria (Ring Buffer Frame Cache).
 * Permite scrubbing y reproducción de secuencias a 60-120 FPS sin re-renderizar capas.
 */
export class FrameCacheCore {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Número de fotogramas actualmente cacheados
     */
    cached_count(): number;
    /**
     * Recupera un fotograma de la caché directamente al búfer de destino en sub-microsegundos
     */
    get_frame(frame: number, out_rgba: Uint8Array): boolean;
    /**
     * Consulta si un fotograma está en caché
     */
    has_frame(frame: number): boolean;
    /**
     * Invalida toda la caché de fotogramas
     */
    invalidate_all(): void;
    /**
     * Invalida un fotograma específico (por ejemplo, cuando el usuario dibuja sobre él)
     */
    invalidate_frame(frame: number): void;
    constructor(max_frames: number);
    /**
     * Ajusta la capacidad máxima de fotogramas (p. ej. según un presupuesto de memoria),
     * descartando los más antiguos si el nuevo límite es menor al contenido actual.
     */
    set_max_frames(max_frames: number): void;
    /**
     * Almacena un fotograma renderizado en la caché
     */
    store_frame(frame: number, width: number, height: number, rgba: Uint8Array): void;
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

/**
 * Motor nativo de compresión y descompresión ultrarrápida QOI para el historial de Deshacer/Rehacer
 */
export class HistoryCompressorCore {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Comprime un búfer RGBA de tamaño width x height en formato QOI ultra-rápido
     */
    compress_rgba(data: Uint8Array, width: number, height: number): number;
    /**
     * Recorta un rectángulo `[crop_x, crop_y, crop_w, crop_h]` de una imagen completa RGBA
     * de tamaño `doc_w x doc_h` en un único buffer de destino plano.
     * Evita miles de llamadas `subarray()` y recolección de basura en JavaScript.
     */
    static crop_rgba_rect(src_rgba: Uint8Array, doc_w: number, doc_h: number, crop_x: number, crop_y: number, crop_w: number, crop_h: number, out_rgba: Uint8Array): boolean;
    /**
     * Descomprime un búfer QOI en RGBA crudo
     */
    decompress_qoi(bytes: Uint8Array, width: number, height: number): number;
    get_buffer_len(): number;
    get_buffer_ptr(): number;
    constructor();
}

export enum ResampleMode {
    Nearest = 0,
    Bilinear = 1,
    Bicubic = 2,
    Lanczos = 3,
}

/**
 * High-performance Ruler and Perspective Engine in Rust + WebAssembly.
 * Provides real-time magnetic stroke snapping, 1/2/3-point perspective guides,
 * bilateral & radial symmetry reflection, and manga action speedlines.
 */
export class RulerCore {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Begins a new stroke at (start_x, start_y)
     */
    begin_stroke(_start_x: number, _start_y: number): void;
    /**
     * Generates symmetric reflected/rotated points for a point (x, y) based on active symmetry configuration.
     * Returns a flat buffer of pairs: [x0, y0, x1, y1, ...]
     */
    get_symmetric_points(x: number, y: number): Float32Array;
    constructor();
    /**
     * Resets the current stroke magnetic direction lock on pen lift
     */
    reset_stroke_lock(): void;
    /**
     * Configures perspective vanishing points
     */
    set_perspective_params(vp1_x: number, vp1_y: number, vp2_x: number, vp2_y: number, vp3_x: number, vp3_y: number, horizon_y: number): void;
    /**
     * Sets active ruler type (0: None, 1: Symmetry, 2: Persp1, 3: Persp2, 4: Persp3, 5: Radial, 6: Parallel)
     */
    set_ruler_type(ruler_type: number): void;
    /**
     * Toggles or sets magnetic snapping to ruler
     */
    set_snap_enabled(enabled: boolean): void;
    /**
     * Configures speedline radial / parallel center
     */
    set_speedline_params(center_x: number, center_y: number, angle_deg: number): void;
    /**
     * Configures symmetry ruler parameters
     */
    set_symmetry_params(center_x: number, center_y: number, angle_deg: number, axes: number, is_mirror: boolean): void;
    /**
     * Snaps current raw cursor position (cur_x, cur_y) to the active perspective or speedline guide.
     * Returns a 2-element array [snapped_x, snapped_y].
     */
    snap_point(start_x: number, start_y: number, cur_x: number, cur_y: number): Float32Array;
}

/**
 * Motor nativo de selección, morfología y extracción de bordes (Marching Ants)
 */
export class SelectionCore {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Borde de selección (Border Selection): Convierte la selección en un contorno hueco
     * position: 0 = interior, 1 = centrado, 2 = exterior
     */
    static border_selection(mask_rgba: Uint8Array, width: number, height: number, radius: number, position: number): Uint8Array;
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
     * Extrae segmentos de contorno vectoriales [x1, y1, x2, y2, ...]
     * Aplica fusión colineal automática para reducir miles de píxeles a unas pocas líneas.
     */
    static extract_boundary_segments(src_buffer: Uint8Array, width: number, height: number, min_x: number, min_y: number, max_x: number, max_y: number, is_rgba: boolean): Float32Array;
    /**
     * Desvanecer selección (Feather): Desenfoque gaussiano separable rápido sobre el canal alfa de la máscara
     */
    static feather_selection(mask_rgba: Uint8Array, width: number, height: number, radius: number): Uint8Array;
    /**
     * Inversión de máscara booleana directamente a RGBA
     */
    static invert_mask(src_rgba: Uint8Array, width: number, height: number): Uint8Array;
    /**
     * Varita Mágica (Magic Wand): Selección continua o global por tolerancia de color
     */
    static magic_wand_selection(rgba: Uint8Array, width: number, height: number, seed_x: number, seed_y: number, tolerance: number, contiguous: boolean, antialias: boolean): Uint8Array;
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
    /**
     * Dilatación morfológica binaria rápida (0 o 1) con ventana deslizante en memoria contigua
     */
    dilate_binary_mask(src: Uint8Array, w: number, h: number, radius: number): Uint8Array;
    /**
     * Erosión morfológica binaria rápida (0 o 1) por dualidad morfológica en memoria contigua
     */
    erode_binary_mask(src: Uint8Array, w: number, h: number, radius: number): Uint8Array;
    get_bounds(): Int32Array;
    get_mask_ptr(): number;
    constructor();
}

/**
 * Representa una cuadrícula esparsa de teselas de 128x128 px para una capa.
 * Las áreas transparentes/vacías ocupan 0 bytes en memoria.
 */
export class SparseTileGrid {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Retorna el número total de teselas activas en memoria
     */
    allocated_tile_count(): number;
    /**
     * Vacía todas las teselas (reseteo completo de capa sin reasignar vector)
     */
    clear_all(): void;
    /**
     * Libera la memoria de una tesela
     */
    clear_tile(col: number, row: number): void;
    /**
     * Obtiene el bounding box rectangular [min_x, min_y, max_x, max_y] que engloba todas las teselas activas
     */
    get_content_bounds(): Uint32Array | undefined;
    /**
     * Copia una tesela individual a un buffer de destino
     */
    get_tile_data(col: number, row: number, out_buf: Uint8Array): boolean;
    /**
     * Comprueba si existe una tesela asignada en la coordenada
     */
    has_tile(col: number, row: number): boolean;
    /**
     * Importa un lienzo completo RGBA descomponiéndolo automáticamente en teselas esparsas.
     * Las regiones vacías no ocupan memoria.
     */
    import_from_full_buffer(src_rgba: Uint8Array): number;
    constructor(doc_width: number, doc_height: number);
    /**
     * Proyecta todas las teselas activas directamente en un búfer RGBA del tamaño del documento
     */
    render_to_full_buffer(dest_rgba: Uint8Array): boolean;
    /**
     * Proyecta todas las teselas activas en un búfer RGBA con opción de omitir el borrado inicial
     * (ideal cuando el llamador ya proporciona un ImageData recién creado, ahorrando copias de 12 MB)
     */
    render_to_full_buffer_opt(dest_rgba: Uint8Array, clear_first: boolean): boolean;
    /**
     * Asigna o actualiza una tesela con datos RGBA (128x128 = 65536 bytes)
     */
    set_tile_data(col: number, row: number, rgba_data: Uint8Array): boolean;
    /**
     * Actualiza únicamente las teselas que intersecan con el rectángulo delimitador [min_x, min_y, max_x, max_y]
     * a partir de un buffer RGBA sub-rectángulo o lienzo completo.
     */
    update_rect_from_buffer(src_rgba: Uint8Array, stride_width: number, min_x: number, min_y: number, max_x: number, max_y: number, offset_x: number, offset_y: number): number;
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
    /**
     * Elimina la instantánea del lienzo
     */
    clear_canvas_snapshot(): void;
    /**
     * Elimina la máscara de selección activa
     */
    clear_selection_mask(): void;
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
     * Puntero zero-copy al buffer de dabs (stride 11: [x, y, diameter, pressure, alpha, angle_rad, tip_index, r, g, b, flags])
     */
    get_dabs_ptr(): number;
    get_dirty_rect(): Float32Array;
    get_stamp_len(): number;
    get_stamp_ptr(): number;
    /**
     * Comprueba si hay una máscara de selección asignada
     */
    has_selection(): boolean;
    constructor(config: BrushDynamicsConfig);
    /**
     * Genera la predicción curva Bézier cuadrática continua C1 directamente en Rust
     * a partir de los puntos inicial y objetivo, y el vector de velocidad tangencial.
     * Guarda y restaura internamente el checkpoint del motor, garantizando cero mutación residual.
     * Retorna el número de dabs calculados en `dabs_buffer`.
     */
    predict_bezier_stroke(start_x: number, start_y: number, start_p: number, target_x: number, target_y: number, target_p: number, vel_x: number, vel_y: number): number;
    /**
     * Calcula de una sola llamada nativa el lote completo de dabs predichos
     * a partir de una secuencia plana de puntos: `[x0, y0, p0, x1, y1, p1, ...]` (stride 3).
     * Guarda y restaura internamente el checkpoint del motor, garantizando cero mutación residual.
     * Retorna el número de dabs calculados en `dabs_buffer`.
     */
    predict_stroke_batch(points: Float32Array): number;
    /**
     * Restaura el estado guardado tras renderizar la predicción temporal
     */
    restore_checkpoint(): void;
    /**
     * Muestrea el valor de opacidad alfa (0.0..1.0) de la máscara de selección en (x, y)
     */
    sample_selection_alpha(x: number, y: number): number;
    /**
     * Guarda el estado actual antes de calcular trazos predichos (renderPredictedStroke)
     */
    save_checkpoint(): void;
    /**
     * Asigna la instantánea plana RGBA8 del lienzo subyacente para muestreo nativo
     */
    set_canvas_snapshot(snapshot: Uint8Array, width: number, height: number): void;
    /**
     * Asigna la máscara de selección activa para filtrado y modulación directa de dabs
     */
    set_selection_mask(mask_data: Uint8Array, width: number, height: number, bounds_min_x: number, bounds_min_y: number, bounds_max_x: number, bounds_max_y: number, is_rgba: boolean): void;
    set_speed(speed: number): void;
    /**
     * Configura los parámetros cromáticos para evaluación nativa de mezclas y smudge
     */
    set_stroke_color(primary_r: number, primary_g: number, primary_b: number, secondary_r: number, secondary_g: number, secondary_b: number, has_sub_color_mix: boolean, color_mix: number, color_mix_alpha: number, smudge: number, is_erase: boolean): void;
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

/**
 * High-performance Timeline and Keyframe Evaluation Engine in Rust + WebAssembly.
 * Eliminates JavaScript GC spikes and resolves full scene composition in < 0.05 ms.
 */
export class TimelineCore {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds or updates an animation clip on a track
     */
    add_clip(track_id: number, clip_id: number, start_frame: number, end_frame: number): boolean;
    /**
     * Adds an exposure (Cel instance) to a clip
     */
    add_exposure(track_id: number, clip_id: number, frame: number, cel_id: number): boolean;
    /**
     * Adds or updates a transform keyframe on a track
     */
    add_keyframe(track_id: number, frame: number, x: number, y: number, scale_x: number, scale_y: number, rotation: number, opacity: number, interpolation: number): boolean;
    /**
     * Adds or updates a track
     */
    add_track(track_id: number, visible: boolean, keyframes_enabled: boolean): void;
    /**
     * Evaluates the complete scene for a frame.
     * Returns a flat buffer with Stride 10 per track:
     * `[track_id, has_active_cel (0.0/1.0), cel_id, opacity, m11, m12, m21, m22, tx, ty]`
     */
    evaluate_frame(frame: number): Float32Array;
    /**
     * Evaluates Onion Skin adjacent cels around the current frame.
     * Returns a flat buffer with Stride 11 per onion cel:
     * `[track_id, cel_id, is_prev (1.0/0.0), distance, opacity, m11, m12, m21, m22, tx, ty]`
     */
    evaluate_onion_skin(current_frame: number, prev_count: number, next_count: number, start_opacity: number, step_opacity: number): Float32Array;
    constructor();
    /**
     * Removes a track
     */
    remove_track(track_id: number): boolean;
    /**
     * Clears all tracks and keyframes
     */
    reset(): void;
    /**
     * Batch operation: Ripple-deletes the frame range `[start_frame, end_frame]` and collapses time
     */
    ripple_delete_range(track_id: number, start_frame: number, end_frame: number): boolean;
    /**
     * Sets global timeline parameters
     */
    set_settings(fps: number, total_frames: number, start_frame: number, end_frame: number, min_frame: number, loop_playback: boolean): void;
    /**
     * Batch operation: Shifts all clips, exposures and keyframes on/after `from_frame` by `delta_frames`
     */
    shift_track_frames(track_id: number, from_frame: number, delta_frames: number): boolean;
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
     * Deformación por Malla (Mesh Warp / Rejilla de deformación):
     * Remuestrea la imagen `src_rgba` deformándola según una malla de control `grid_cols × grid_rows`.
     * `grid_points` contiene `(grid_cols + 1) * (grid_rows + 1) * 2` floats [x0, y0, x1, y1, ...]
     */
    static mesh_warp_resample(src_rgba: Uint8Array, src_w: number, src_h: number, dst_w: number, dst_h: number, grid_cols: number, grid_rows: number, grid_points: Float32Array, mode: ResampleMode): Uint8Array;
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

/**
 * WASM-exported helper for rapid batch evaluation of Bezier curves
 */
export function wasm_solve_bezier_y(p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number, target_x: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_boneikcore_free: (a: number, b: number) => void;
    readonly __wbg_boneskincore_free: (a: number, b: number) => void;
    readonly __wbg_brushdynamicsconfig_free: (a: number, b: number) => void;
    readonly __wbg_cliptilecore_free: (a: number, b: number) => void;
    readonly __wbg_cliptimelineparser_free: (a: number, b: number) => void;
    readonly __wbg_colorblendcore_free: (a: number, b: number) => void;
    readonly __wbg_colorsamplercore_free: (a: number, b: number) => void;
    readonly __wbg_fastlayercompositor_free: (a: number, b: number) => void;
    readonly __wbg_filtercore_free: (a: number, b: number) => void;
    readonly __wbg_floodfillcore_free: (a: number, b: number) => void;
    readonly __wbg_floodfillresult_free: (a: number, b: number) => void;
    readonly __wbg_framecachecore_free: (a: number, b: number) => void;
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
    readonly __wbg_historycompressorcore_free: (a: number, b: number) => void;
    readonly __wbg_rulercore_free: (a: number, b: number) => void;
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
    readonly __wbg_sparsetilegrid_free: (a: number, b: number) => void;
    readonly __wbg_strokeenginecore_free: (a: number, b: number) => void;
    readonly __wbg_strokestabilizercore_free: (a: number, b: number) => void;
    readonly __wbg_timelinecore_free: (a: number, b: number) => void;
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
    readonly cliptilecore_decompress_and_blit_tile: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly cliptimelineparser_clean_uuid: (a: number, b: number) => [number, number];
    readonly cliptimelineparser_parse_track_exposures: (a: number, b: number) => [number, number];
    readonly colorblendcore_apply_paper_grain_rect: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => number;
    readonly colorblendcore_apply_tint_in_place: (a: number, b: number, c: any, d: number, e: number, f: number) => void;
    readonly colorblendcore_blend_color_mix: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly colorblendcore_blend_dual_color: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly colorblendcore_evaluate_paper_texture: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly colorblendcore_generate_paper_pattern_tile: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => number;
    readonly colorblendcore_merge_layers_simd: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => number;
    readonly colorblendcore_merge_stroke_rect: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => number;
    readonly colorblendcore_step_smudge: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly colorsamplercore_sample_rgba: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly fastlayercompositor_blend_layer: (a: number, b: number, c: any, d: number, e: number, f: number, g: number) => void;
    readonly fastlayercompositor_blend_source_over: (a: number, b: number, c: any, d: number, e: number, f: number) => void;
    readonly filtercore_adjust_brightness_contrast: (a: number, b: number, c: any, d: number, e: number) => void;
    readonly filtercore_adjust_hsv: (a: number, b: number, c: any, d: number, e: number, f: number) => void;
    readonly filtercore_binarize: (a: number, b: number, c: any, d: number) => void;
    readonly filtercore_extract_lineart_transparent: (a: number, b: number, c: any, d: number, e: number) => void;
    readonly filtercore_gaussian_blur: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly filtercore_generate_screentone: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number) => void;
    readonly filtercore_invert_colors: (a: number, b: number, c: any) => void;
    readonly filtercore_unsharp_mask: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number) => void;
    readonly floodfillcore_fill_all_matching: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => number;
    readonly floodfillcore_scanline_fill: (a: number, b: number, c: any, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => number;
    readonly framecachecore_cached_count: (a: number) => number;
    readonly framecachecore_get_frame: (a: number, b: number, c: number, d: number, e: any) => number;
    readonly framecachecore_has_frame: (a: number, b: number) => number;
    readonly framecachecore_invalidate_all: (a: number) => void;
    readonly framecachecore_invalidate_frame: (a: number, b: number) => void;
    readonly framecachecore_new: (a: number) => number;
    readonly framecachecore_set_max_frames: (a: number, b: number) => void;
    readonly framecachecore_store_frame: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly gifencodercore_encode_lzw_frame: (a: number, b: number, c: number, d: number) => number;
    readonly gifencodercore_get_indexed_len: (a: number) => number;
    readonly gifencodercore_get_indexed_ptr: (a: number) => number;
    readonly gifencodercore_get_lzw_len: (a: number) => number;
    readonly gifencodercore_get_lzw_ptr: (a: number) => number;
    readonly gifencodercore_get_palette_len: (a: number) => number;
    readonly gifencodercore_get_palette_ptr: (a: number) => number;
    readonly gifencodercore_new: () => number;
    readonly gifencodercore_quantize_rgba: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly historycompressorcore_compress_rgba: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly historycompressorcore_crop_rgba_rect: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: any) => number;
    readonly historycompressorcore_decompress_qoi: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly historycompressorcore_get_buffer_len: (a: number) => number;
    readonly historycompressorcore_get_buffer_ptr: (a: number) => number;
    readonly historycompressorcore_new: () => number;
    readonly init_engine_hooks: () => void;
    readonly rulercore_begin_stroke: (a: number, b: number, c: number) => void;
    readonly rulercore_get_symmetric_points: (a: number, b: number, c: number) => [number, number];
    readonly rulercore_new: () => number;
    readonly rulercore_reset_stroke_lock: (a: number) => void;
    readonly rulercore_set_perspective_params: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
    readonly rulercore_set_ruler_type: (a: number, b: number) => void;
    readonly rulercore_set_snap_enabled: (a: number, b: number) => void;
    readonly rulercore_set_speedline_params: (a: number, b: number, c: number, d: number) => void;
    readonly rulercore_set_symmetry_params: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly rulercore_snap_point: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly selectioncore_border_selection: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly selectioncore_compute_bounds: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly selectioncore_extract_boundary_mask: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly selectioncore_extract_boundary_segments: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly selectioncore_feather_selection: (a: number, b: number, c: number, d: number, e: number) => [number, number];
    readonly selectioncore_invert_mask: (a: number, b: number, c: number, d: number) => [number, number];
    readonly selectioncore_magic_wand_selection: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly selectioncore_morphology_contract: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly selectioncore_morphology_expand: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly smartfillcore_compute_enclose_fill_mask: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly smartfillcore_compute_smart_fill_mask: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly smartfillcore_compute_unfilled_area_mask: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
    readonly smartfillcore_dilate_binary_mask: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly smartfillcore_erode_binary_mask: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly smartfillcore_get_bounds: (a: number) => [number, number];
    readonly smartfillcore_get_mask_ptr: (a: number) => number;
    readonly smartfillcore_new: () => number;
    readonly sparsetilegrid_allocated_tile_count: (a: number) => number;
    readonly sparsetilegrid_clear_all: (a: number) => void;
    readonly sparsetilegrid_clear_tile: (a: number, b: number, c: number) => void;
    readonly sparsetilegrid_get_content_bounds: (a: number) => [number, number];
    readonly sparsetilegrid_get_tile_data: (a: number, b: number, c: number, d: number, e: number, f: any) => number;
    readonly sparsetilegrid_has_tile: (a: number, b: number, c: number) => number;
    readonly sparsetilegrid_import_from_full_buffer: (a: number, b: number, c: number) => number;
    readonly sparsetilegrid_new: (a: number, b: number) => number;
    readonly sparsetilegrid_render_to_full_buffer: (a: number, b: number, c: number, d: any) => number;
    readonly sparsetilegrid_render_to_full_buffer_opt: (a: number, b: number, c: number, d: any, e: number) => number;
    readonly sparsetilegrid_set_tile_data: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly sparsetilegrid_update_rect_from_buffer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly strokeenginecore_add_point: (a: number, b: number, c: number, d: number) => number;
    readonly strokeenginecore_begin_stroke: (a: number, b: number, c: number, d: number) => number;
    readonly strokeenginecore_build_sdf_stamp: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => number;
    readonly strokeenginecore_clear_canvas_snapshot: (a: number) => void;
    readonly strokeenginecore_clear_selection_mask: (a: number) => void;
    readonly strokeenginecore_end_stroke: (a: number) => void;
    readonly strokeenginecore_evaluate_alpha: (a: number, b: number, c: number) => number;
    readonly strokeenginecore_evaluate_diameter: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly strokeenginecore_get_dabs_len: (a: number) => number;
    readonly strokeenginecore_get_dabs_ptr: (a: number) => number;
    readonly strokeenginecore_get_dirty_rect: (a: number) => [number, number];
    readonly strokeenginecore_get_stamp_len: (a: number) => number;
    readonly strokeenginecore_get_stamp_ptr: (a: number) => number;
    readonly strokeenginecore_has_selection: (a: number) => number;
    readonly strokeenginecore_new: (a: number) => number;
    readonly strokeenginecore_predict_bezier_stroke: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
    readonly strokeenginecore_predict_stroke_batch: (a: number, b: number, c: number) => number;
    readonly strokeenginecore_restore_checkpoint: (a: number) => void;
    readonly strokeenginecore_sample_selection_alpha: (a: number, b: number, c: number) => number;
    readonly strokeenginecore_save_checkpoint: (a: number) => void;
    readonly strokeenginecore_set_canvas_snapshot: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly strokeenginecore_set_selection_mask: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
    readonly strokeenginecore_set_speed: (a: number, b: number) => void;
    readonly strokeenginecore_set_stroke_color: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => void;
    readonly strokeenginecore_update_config: (a: number, b: number) => void;
    readonly strokestabilizercore_add_raw_point: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly strokestabilizercore_begin_stroke: (a: number, b: number, c: number, d: number) => void;
    readonly strokestabilizercore_flush_tail: (a: number) => number;
    readonly strokestabilizercore_get_emitted_len: (a: number) => number;
    readonly strokestabilizercore_get_emitted_ptr: (a: number) => number;
    readonly strokestabilizercore_get_speed: (a: number) => number;
    readonly strokestabilizercore_new: () => number;
    readonly timelinecore_add_clip: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly timelinecore_add_exposure: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly timelinecore_add_keyframe: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly timelinecore_add_track: (a: number, b: number, c: number, d: number) => void;
    readonly timelinecore_evaluate_frame: (a: number, b: number) => [number, number];
    readonly timelinecore_evaluate_onion_skin: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly timelinecore_new: () => number;
    readonly timelinecore_remove_track: (a: number, b: number) => number;
    readonly timelinecore_reset: (a: number) => void;
    readonly timelinecore_ripple_delete_range: (a: number, b: number, c: number, d: number) => number;
    readonly timelinecore_set_settings: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly timelinecore_shift_track_frames: (a: number, b: number, c: number, d: number) => number;
    readonly transformresamplecore_compute_inverse_transform_matrix: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly transformresamplecore_mesh_warp_resample: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => [number, number];
    readonly transformresamplecore_resample_affine: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly transformresamplecore_resample_scale: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly wasm_solve_bezier_y: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
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
