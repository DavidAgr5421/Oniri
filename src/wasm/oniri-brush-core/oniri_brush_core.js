/* @ts-self-types="./oniri_brush_core.d.ts" */

/**
 * Motor en Rust + WASM para Esqueleto 2D (FK/IK), Pesos de Malla y Linear Blend Skinning (LBS)
 */
export class BoneSkinCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BoneSkinCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boneskincore_free(ptr, 0);
    }
    /**
     * Calcula la grilla de vértices y los 3 pesos de influencia inversa por hueso en Bind Pose.
     * `bone_segments`: slice plano `[bindHeadX, bindHeadY, bindTailX, bindTailY, ...]` (stride 4).
     * Retorna la cantidad de vértices generados en `vertices_buffer` (stride 10).
     * @param {number} min_x
     * @param {number} min_y
     * @param {number} bw
     * @param {number} bh
     * @param {number} cols
     * @param {number} rows
     * @param {Float32Array} bone_segments
     * @returns {number}
     */
    build_mesh_vertices(min_x, min_y, bw, bh, cols, rows, bone_segments) {
        const ptr0 = passArrayF32ToWasm0(bone_segments, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.boneskincore_build_mesh_vertices(this.__wbg_ptr, min_x, min_y, bw, bh, cols, rows, ptr0, len0);
        return ret >>> 0;
    }
    /**
     * Calcula en un solo lote WASM todos los vértices deformados por LBS y las matrices afines
     * de cada triángulo texturizado (con expansión de centroide de 0.45px anti-costuras).
     * - `packed_vertices`: stride 10 `[x, y, u, v, b0, w0, b1, w1, b2, w2]`
     * - `packed_indices`: índices de triángulos `[i0, i1, i2, ...]` (stride 3)
     * - `skin_matrices`: matrices 2D `[a, b, c, d, tx, ty]` por hueso (stride 6)
     * Retorna la cantidad de triángulos válidos escritos en `triangles_buffer` (stride 12).
     * @param {Float32Array} packed_vertices
     * @param {Uint32Array} packed_indices
     * @param {Float32Array} skin_matrices
     * @param {number} bx
     * @param {number} by
     * @param {number} bw
     * @param {number} bh
     * @returns {number}
     */
    compute_skinned_triangles(packed_vertices, packed_indices, skin_matrices, bx, by, bw, bh) {
        const ptr0 = passArrayF32ToWasm0(packed_vertices, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(packed_indices, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArrayF32ToWasm0(skin_matrices, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.boneskincore_compute_skinned_triangles(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, bx, by, bw, bh);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_triangles_len() {
        const ret = wasm.boneskincore_get_triangles_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_triangles_ptr() {
        const ret = wasm.boneskincore_get_triangles_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_vertices_len() {
        const ret = wasm.boneskincore_get_vertices_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_vertices_ptr() {
        const ret = wasm.boneskincore_get_vertices_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.boneskincore_new();
        this.__wbg_ptr = ret;
        BoneSkinCoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Escanea el canal alpha de una capa RGBA8 con paso `step` y retorna `[min_x, min_y, bw, bh]`
     * @param {Uint8Array} rgba
     * @param {number} w
     * @param {number} h
     * @param {number} step
     * @param {number} pad
     * @returns {Int32Array}
     */
    scan_layer_bounds(rgba, w, h, step, pad) {
        const ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.boneskincore_scan_layer_bounds(this.__wbg_ptr, ptr0, len0, w, h, step, pad);
        var v2 = getArrayI32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
}
if (Symbol.dispose) BoneSkinCore.prototype[Symbol.dispose] = BoneSkinCore.prototype.free;

/**
 * Configuración completa de dinámica del pincel para el motor en Rust
 */
export class BrushDynamicsConfig {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BrushDynamicsConfigFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_brushdynamicsconfig_free(ptr, 0);
    }
    /**
     * @param {number} base_size
     * @param {number} min_size_ratio
     * @param {number} spacing_ratio
     * @param {boolean} pressure_size
     * @param {number} pressure_gamma
     * @param {number} taper_start
     * @param {boolean} velocity_size_enabled
     * @param {number} velocity_min_ratio
     * @param {number} velocity_curve
     * @param {number} random_size_ratio
     * @param {number} flow
     * @param {boolean} pressure_flow
     * @param {boolean} velocity_flow
     * @param {boolean} ink_mode_uniform
     * @param {boolean} ribbon
     * @param {boolean} follow_direction
     * @param {boolean} is_custom_tip
     * @param {number} tip_shape_code
     * @param {number} tip_angle_deg
     * @param {number} tip_cycle_mode
     * @param {number} tip_count
     * @param {boolean} spray_enabled
     * @param {number} spray_density
     * @param {number} spray_radius
     * @param {boolean} is_rain_tip
     * @param {boolean} is_mouse
     */
    constructor(base_size, min_size_ratio, spacing_ratio, pressure_size, pressure_gamma, taper_start, velocity_size_enabled, velocity_min_ratio, velocity_curve, random_size_ratio, flow, pressure_flow, velocity_flow, ink_mode_uniform, ribbon, follow_direction, is_custom_tip, tip_shape_code, tip_angle_deg, tip_cycle_mode, tip_count, spray_enabled, spray_density, spray_radius, is_rain_tip, is_mouse) {
        const ret = wasm.brushdynamicsconfig_new(base_size, min_size_ratio, spacing_ratio, pressure_size, pressure_gamma, taper_start, velocity_size_enabled, velocity_min_ratio, velocity_curve, random_size_ratio, flow, pressure_flow, velocity_flow, ink_mode_uniform, ribbon, follow_direction, is_custom_tip, tip_shape_code, tip_angle_deg, tip_cycle_mode, tip_count, spray_enabled, spray_density, spray_radius, is_rain_tip, is_mouse);
        this.__wbg_ptr = ret;
        BrushDynamicsConfigFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get base_size() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_base_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get flow() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_flow(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get follow_direction() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_follow_direction(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get ink_mode_uniform() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_ink_mode_uniform(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get is_custom_tip() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_is_custom_tip(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get is_mouse() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_is_mouse(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get is_rain_tip() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_is_rain_tip(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get min_size_ratio() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_min_size_ratio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get pressure_flow() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_pressure_flow(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get pressure_gamma() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_pressure_gamma(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get pressure_size() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_pressure_size(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get random_size_ratio() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_random_size_ratio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get ribbon() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_ribbon(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get spacing_ratio() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_spacing_ratio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get spray_density() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_spray_density(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    get spray_enabled() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_spray_enabled(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get spray_radius() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_spray_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get taper_start() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_taper_start(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get tip_angle_deg() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_tip_angle_deg(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get tip_count() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_tip_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * 0 = single, 1 = sequential, 2 = reverse, 3 = random
     * @returns {number}
     */
    get tip_cycle_mode() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_tip_cycle_mode(this.__wbg_ptr);
        return ret;
    }
    /**
     * 0 = circle, 1 = square, 2 = calligraphic
     * @returns {number}
     */
    get tip_shape_code() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_tip_shape_code(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get velocity_curve() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_velocity_curve(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get velocity_flow() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_velocity_flow(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get velocity_min_ratio() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_velocity_min_ratio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get velocity_size_enabled() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_velocity_size_enabled(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {number} arg0
     */
    set base_size(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_base_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set flow(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_flow(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set follow_direction(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_follow_direction(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set ink_mode_uniform(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_ink_mode_uniform(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set is_custom_tip(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_is_custom_tip(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set is_mouse(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_is_mouse(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set is_rain_tip(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_is_rain_tip(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set min_size_ratio(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_min_size_ratio(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set pressure_flow(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_pressure_flow(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set pressure_gamma(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_pressure_gamma(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set pressure_size(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_pressure_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set random_size_ratio(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_random_size_ratio(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set ribbon(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_ribbon(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set spacing_ratio(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_spacing_ratio(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set spray_density(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_spray_density(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set spray_enabled(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_spray_enabled(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set spray_radius(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_spray_radius(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set taper_start(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_taper_start(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set tip_angle_deg(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_tip_angle_deg(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set tip_count(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_tip_count(this.__wbg_ptr, arg0);
    }
    /**
     * 0 = single, 1 = sequential, 2 = reverse, 3 = random
     * @param {number} arg0
     */
    set tip_cycle_mode(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_tip_cycle_mode(this.__wbg_ptr, arg0);
    }
    /**
     * 0 = circle, 1 = square, 2 = calligraphic
     * @param {number} arg0
     */
    set tip_shape_code(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_tip_shape_code(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set velocity_curve(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_velocity_curve(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set velocity_flow(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_velocity_flow(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set velocity_min_ratio(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_velocity_min_ratio(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set velocity_size_enabled(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_velocity_size_enabled(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) BrushDynamicsConfig.prototype[Symbol.dispose] = BrushDynamicsConfig.prototype.free;

/**
 * Codificador GIF89a en Rust + WASM con cuantización 5-bit O(1) y tabla LZW plana sin asignaciones
 */
export class GifEncoderCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GifEncoderCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gifencodercore_free(ptr, 0);
    }
    /**
     * Comprime un buffer de píxeles indexados mediante LZW variable de GIF89a en `lzw_stream`
     * @param {Uint8Array} indexed
     * @param {number} color_depth
     * @returns {number}
     */
    encode_lzw_frame(indexed, color_depth) {
        const ptr0 = passArray8ToWasm0(indexed, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.gifencodercore_encode_lzw_frame(this.__wbg_ptr, ptr0, len0, color_depth);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_indexed_len() {
        const ret = wasm.gifencodercore_get_indexed_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_indexed_ptr() {
        const ret = wasm.gifencodercore_get_indexed_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_lzw_len() {
        const ret = wasm.gifencodercore_get_lzw_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_lzw_ptr() {
        const ret = wasm.gifencodercore_get_lzw_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_palette_len() {
        const ret = wasm.gifencodercore_get_palette_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_palette_ptr() {
        const ret = wasm.gifencodercore_get_palette_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.gifencodercore_new();
        this.__wbg_ptr = ret;
        GifEncoderCoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Cuantiza un frame RGBA8 a paleta de hasta 255 colores + índice transparente en O(N)
     * @param {Uint8Array} rgba
     * @param {number} width
     * @param {number} height
     * @returns {number}
     */
    quantize_rgba(rgba, width, height) {
        const ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.gifencodercore_quantize_rgba(this.__wbg_ptr, ptr0, len0, width, height);
        return ret;
    }
}
if (Symbol.dispose) GifEncoderCore.prototype[Symbol.dispose] = GifEncoderCore.prototype.free;

/**
 * Motor morfológico en Rust + WASM para Smart Fill, Enclose & Fill y Paint Unfilled Area
 */
export class SmartFillCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SmartFillCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_smartfillcore_free(ptr, 0);
    }
    /**
     * Ejecuta "Cerrar y Rellenar" (Enclose and Fill) en Rust sobre una región local [rw × rh]
     * @param {Uint8Array} boundary_rgba
     * @param {Uint8Array} target_rgba
     * @param {Uint8Array} lasso_rgba
     * @param {number} rw
     * @param {number} rh
     * @param {number} close_gap
     * @param {number} area_scaling
     * @returns {number}
     */
    compute_enclose_fill_mask(boundary_rgba, target_rgba, lasso_rgba, rw, rh, close_gap, area_scaling) {
        const ptr0 = passArray8ToWasm0(boundary_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(target_rgba, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArray8ToWasm0(lasso_rgba, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.smartfillcore_compute_enclose_fill_mask(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, rw, rh, close_gap, area_scaling);
        return ret >>> 0;
    }
    /**
     * Ejecuta el cálculo completo de Smart Fill (Cubo de pintura inteligente) en Rust.
     * Retorna la cantidad de píxeles en la máscara final (0 si no hay área rellenable).
     * @param {Uint8Array} boundary_rgba
     * @param {number} doc_w
     * @param {number} doc_h
     * @param {number} seed_x
     * @param {number} seed_y
     * @param {number} tolerance
     * @param {number} close_gap
     * @param {number} area_scaling
     * @param {boolean} is_multi_layer
     * @returns {number}
     */
    compute_smart_fill_mask(boundary_rgba, doc_w, doc_h, seed_x, seed_y, tolerance, close_gap, area_scaling, is_multi_layer) {
        const ptr0 = passArray8ToWasm0(boundary_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.smartfillcore_compute_smart_fill_mask(this.__wbg_ptr, ptr0, len0, doc_w, doc_h, seed_x, seed_y, tolerance, close_gap, area_scaling, is_multi_layer);
        return ret >>> 0;
    }
    /**
     * Ejecuta "Pintar área no rellenada" (Paint Unfilled Area) en Rust sobre una región [rw × rh]
     * @param {Uint8Array} boundary_rgba
     * @param {Uint8Array} target_rgba
     * @param {Uint8Array} stroke_rgba
     * @param {number} rw
     * @param {number} rh
     * @param {number} close_gap
     * @param {number} area_scaling
     * @returns {number}
     */
    compute_unfilled_area_mask(boundary_rgba, target_rgba, stroke_rgba, rw, rh, close_gap, area_scaling) {
        const ptr0 = passArray8ToWasm0(boundary_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(target_rgba, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArray8ToWasm0(stroke_rgba, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.smartfillcore_compute_unfilled_area_mask(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, rw, rh, close_gap, area_scaling);
        return ret >>> 0;
    }
    /**
     * @returns {Int32Array}
     */
    get_bounds() {
        const ret = wasm.smartfillcore_get_bounds(this.__wbg_ptr);
        var v1 = getArrayI32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get_mask_ptr() {
        const ret = wasm.smartfillcore_get_mask_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.smartfillcore_new();
        this.__wbg_ptr = ret;
        SmartFillCoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) SmartFillCore.prototype[Symbol.dispose] = SmartFillCore.prototype.free;

/**
 * Motor de cálculo de trazos, dinámicas y rasterización SDF de sellos en Rust + WASM
 */
export class StrokeEngineCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrokeEngineCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strokeenginecore_free(ptr, 0);
    }
    /**
     * Interpola un segmento desde el último punto hasta (x1, y1, p1) con espaciado adaptativo
     * @param {number} x1
     * @param {number} y1
     * @param {number} p1
     * @returns {number}
     */
    add_point(x1, y1, p1) {
        const ret = wasm.strokeenginecore_add_point(this.__wbg_ptr, x1, y1, p1);
        return ret >>> 0;
    }
    /**
     * Inicia un trazo y genera el primer dab (o ráfaga de spray inicial) en el buffer zero-copy
     * @param {number} x
     * @param {number} y
     * @param {number} pressure
     * @returns {number}
     */
    begin_stroke(x, y, pressure) {
        const ret = wasm.strokeenginecore_begin_stroke(this.__wbg_ptr, x, y, pressure);
        return ret >>> 0;
    }
    /**
     * Rasterizador nativo en Rust de sellos SDF (Circle, Square Chisel, 45° Calligraphic + Texturas de punta)
     * Escribe `size * size * 4` bytes RGBA en `stamp_rgba_buffer` para lectura zero-copy desde JS.
     * @param {number} size
     * @param {number} diameter
     * @param {number} hardness
     * @param {number} cr
     * @param {number} cg
     * @param {number} cb
     * @param {number} aa_width
     * @param {boolean} threshold
     * @param {number} shape_code
     * @param {number} scale_y
     * @param {number} mat_mode
     * @param {number} mat_w
     * @param {number} mat_h
     * @param {Uint8Array} mat_rgba
     * @returns {number}
     */
    build_sdf_stamp(size, diameter, hardness, cr, cg, cb, aa_width, threshold, shape_code, scale_y, mat_mode, mat_w, mat_h, mat_rgba) {
        const ptr0 = passArray8ToWasm0(mat_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strokeenginecore_build_sdf_stamp(this.__wbg_ptr, size, diameter, hardness, cr, cg, cb, aa_width, threshold, shape_code, scale_y, mat_mode, mat_w, mat_h, ptr0, len0);
        return ret >>> 0;
    }
    end_stroke() {
        wasm.strokeenginecore_end_stroke(this.__wbg_ptr);
    }
    /**
     * Calcula el alpha/flujo de un dab según modo de tinta ('uniform' vs 'accumulate') y velocidad
     * @param {number} pressure
     * @param {number} speed
     * @returns {number}
     */
    evaluate_alpha(pressure, speed) {
        const ret = wasm.strokeenginecore_evaluate_alpha(this.__wbg_ptr, pressure, speed);
        return ret;
    }
    /**
     * Calcula el diámetro exacto de un dab según curvas de presión, taper, velocidad y tamaño aleatorio
     * @param {number} pressure
     * @param {number} distance
     * @param {number} speed
     * @param {boolean} is_mouse
     * @param {number} stamp_index
     * @returns {number}
     */
    evaluate_diameter(pressure, distance, speed, is_mouse, stamp_index) {
        const ret = wasm.strokeenginecore_evaluate_diameter(this.__wbg_ptr, pressure, distance, speed, is_mouse, stamp_index);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_dabs_len() {
        const ret = wasm.strokeenginecore_get_dabs_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Puntero zero-copy al buffer de dabs (stride 7: [x, y, diameter, pressure, alpha, angle_rad, tip_index])
     * @returns {number}
     */
    get_dabs_ptr() {
        const ret = wasm.strokeenginecore_get_dabs_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Float32Array}
     */
    get_dirty_rect() {
        const ret = wasm.strokeenginecore_get_dirty_rect(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get_stamp_len() {
        const ret = wasm.strokeenginecore_get_stamp_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_stamp_ptr() {
        const ret = wasm.strokeenginecore_get_stamp_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {BrushDynamicsConfig} config
     */
    constructor(config) {
        _assertClass(config, BrushDynamicsConfig);
        var ptr0 = config.__destroy_into_raw();
        const ret = wasm.strokeenginecore_new(ptr0);
        this.__wbg_ptr = ret;
        StrokeEngineCoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Restaura el estado guardado tras renderizar la predicción temporal
     */
    restore_checkpoint() {
        wasm.strokeenginecore_restore_checkpoint(this.__wbg_ptr);
    }
    /**
     * Guarda el estado actual antes de calcular trazos predichos (renderPredictedStroke)
     */
    save_checkpoint() {
        wasm.strokeenginecore_save_checkpoint(this.__wbg_ptr);
    }
    /**
     * @param {number} speed
     */
    set_speed(speed) {
        wasm.strokeenginecore_set_speed(this.__wbg_ptr, speed);
    }
    /**
     * @param {BrushDynamicsConfig} config
     */
    update_config(config) {
        _assertClass(config, BrushDynamicsConfig);
        var ptr0 = config.__destroy_into_raw();
        wasm.strokeenginecore_update_config(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) StrokeEngineCore.prototype[Symbol.dispose] = StrokeEngineCore.prototype.free;

export function init_engine_hooks() {
    wasm.init_engine_hooks();
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_41e9ee4f547fc59a: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_error_757e9472f8410341: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./oniri_brush_core_bg.js": import0,
    };
}

const BoneSkinCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boneskincore_free(ptr, 1));
const BrushDynamicsConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_brushdynamicsconfig_free(ptr, 1));
const GifEncoderCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_gifencodercore_free(ptr, 1));
const SmartFillCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_smartfillcore_free(ptr, 1));
const StrokeEngineCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strokeenginecore_free(ptr, 1));

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedInt32ArrayMemory0 = null;
function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('oniri_brush_core_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
