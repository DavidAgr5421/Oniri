/* @ts-self-types="./oniri_brush_core.d.ts" */

/**
 * Motor nativo de Cinemática Directa (FK), Cinemática Inversa (IK) y matrices 2D de Armadura
 */
export class BoneIKCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BoneIKCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boneikcore_free(ptr, 0);
    }
    /**
     * Multiplicación de matrices afines 2D [a, b, c, d, tx, ty]
     * @param {Float32Array} m1
     * @param {Float32Array} m2
     * @returns {Float32Array}
     */
    static compose_mat2d(m1, m2) {
        const ptr0 = passArrayF32ToWasm0(m1, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(m2, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.boneikcore_compose_mat2d(ptr0, len0, ptr1, len1);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
    /**
     * Distancia mínima de un punto (px, py) al segmento (x1, y1)-(x2, y2)
     * @param {number} px
     * @param {number} py
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @returns {number}
     */
    static distance_to_segment(px, py, x1, y1, x2, y2) {
        const ret = wasm.boneikcore_distance_to_segment(px, py, x1, y1, x2, y2);
        return ret;
    }
    /**
     * Inversión de matriz afín 2D
     * @param {Float32Array} m
     * @returns {Float32Array}
     */
    static invert_mat2d(m) {
        const ptr0 = passArrayF32ToWasm0(m, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.boneikcore_invert_mat2d(ptr0, len0);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @param {number} deg
     * @returns {number}
     */
    static normalize_angle_deg(deg) {
        const ret = wasm.boneikcore_normalize_angle_deg(deg);
        return ret;
    }
    /**
     * Resuelve IK de 1 hueso (Look-At / Aim)
     * @param {number} head_x
     * @param {number} head_y
     * @param {number} target_x
     * @param {number} target_y
     * @param {number} parent_world_angle
     * @param {number} rest_rotation
     * @returns {number}
     */
    static solve_one_bone_aim(head_x, head_y, target_x, target_y, parent_world_angle, rest_rotation) {
        const ret = wasm.boneikcore_solve_one_bone_aim(head_x, head_y, target_x, target_y, parent_world_angle, rest_rotation);
        return ret;
    }
    /**
     * Resuelve la cinemática inversa analítica de 2 huesos (Law of Cosines)
     * Retorna `TwoBoneIKResult` con las rotaciones delta para el padre y el hijo.
     * @param {number} root_x
     * @param {number} root_y
     * @param {number} target_x
     * @param {number} target_y
     * @param {number} l1
     * @param {number} l2
     * @param {boolean} bend_positive
     * @param {number} grandparent_world_angle
     * @param {number} parent_rest_rotation
     * @param {number} child_rest_rotation
     * @returns {TwoBoneIKResult}
     */
    static solve_two_bone_ik(root_x, root_y, target_x, target_y, l1, l2, bend_positive, grandparent_world_angle, parent_rest_rotation, child_rest_rotation) {
        const ret = wasm.boneikcore_solve_two_bone_ik(root_x, root_y, target_x, target_y, l1, l2, bend_positive, grandparent_world_angle, parent_rest_rotation, child_rest_rotation);
        return TwoBoneIKResult.__wrap(ret);
    }
}
if (Symbol.dispose) BoneIKCore.prototype[Symbol.dispose] = BoneIKCore.prototype.free;

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
 * Motor nativo de decodificación planar y composición de mosaicos (tiles)
 */
export class ClipTileCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ClipTileCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cliptilecore_free(ptr, 0);
    }
    /**
     * Compone un tile descompreso de 5 planos (256x256) directamente en el buffer RGBA del documento
     * @param {Uint8Array} dest_rgba
     * @param {number} doc_w
     * @param {number} doc_h
     * @param {Uint8Array} decomp_planes
     * @param {number} start_x
     * @param {number} start_y
     * @param {boolean} is_monochrome
     * @returns {boolean}
     */
    static blit_planar_tile(dest_rgba, doc_w, doc_h, decomp_planes, start_x, start_y, is_monochrome) {
        var ptr0 = passArray8ToWasm0(dest_rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(decomp_planes, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.cliptilecore_blit_planar_tile(ptr0, len0, dest_rgba, doc_w, doc_h, ptr1, len1, start_x, start_y, is_monochrome);
        return ret !== 0;
    }
    /**
     * Descomprime un tile de Clip Studio Paint comprimido con zlib directamente en memoria nativa Rust
     * y lo vuelca desplanarizado en el lienzo destino.
     * @param {Uint8Array} dest_rgba
     * @param {number} doc_w
     * @param {number} doc_h
     * @param {Uint8Array} compressed_data
     * @param {number} start_x
     * @param {number} start_y
     * @param {boolean} is_monochrome
     * @returns {boolean}
     */
    static decompress_and_blit_tile(dest_rgba, doc_w, doc_h, compressed_data, start_x, start_y, is_monochrome) {
        var ptr0 = passArray8ToWasm0(dest_rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(compressed_data, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.cliptilecore_decompress_and_blit_tile(ptr0, len0, dest_rgba, doc_w, doc_h, ptr1, len1, start_x, start_y, is_monochrome);
        return ret !== 0;
    }
}
if (Symbol.dispose) ClipTileCore.prototype[Symbol.dispose] = ClipTileCore.prototype.free;

/**
 * Motor nativo de mezcla cromática, difuminado (smudge) y tintado de color
 */
export class ColorBlendCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ColorBlendCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_colorblendcore_free(ptr, 0);
    }
    /**
     * Aplica modulación matricial de grano de papel SIMD in-place sobre un buffer RGBA
     * Modula directamente el canal alfa (y premultiplica si llega a 0) en memoria contigua.
     * @param {Uint8Array} rgba_buffer
     * @param {number} stride_width
     * @param {number} rect_width
     * @param {number} rect_height
     * @param {number} doc_origin_x
     * @param {number} doc_origin_y
     * @param {Float32Array} tooth_matrix
     * @param {number} tooth_width
     * @param {number} tooth_height
     * @param {number} scale
     * @param {number} density
     * @param {number} mode
     * @param {boolean} invert
     * @returns {boolean}
     */
    static apply_paper_grain_rect(rgba_buffer, stride_width, rect_width, rect_height, doc_origin_x, doc_origin_y, tooth_matrix, tooth_width, tooth_height, scale, density, mode, invert) {
        var ptr0 = passArray8ToWasm0(rgba_buffer, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(tooth_matrix, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.colorblendcore_apply_paper_grain_rect(ptr0, len0, rgba_buffer, stride_width, rect_width, rect_height, doc_origin_x, doc_origin_y, ptr1, len1, tooth_width, tooth_height, scale, density, mode, invert);
        return ret !== 0;
    }
    /**
     * Aplica tintado monocromo in-place (Color de capa / Papel cebolla) sobre un buffer RGBA
     * @param {Uint8Array} rgba_buffer
     * @param {number} tint_r
     * @param {number} tint_g
     * @param {number} tint_b
     */
    static apply_tint_in_place(rgba_buffer, tint_r, tint_g, tint_b) {
        var ptr0 = passArray8ToWasm0(rgba_buffer, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.colorblendcore_apply_tint_in_place(ptr0, len0, rgba_buffer, tint_r, tint_g, tint_b);
    }
    /**
     * Mezcla el color del pincel con el color muestreado del lienzo (acuarela/óleo)
     * @param {number} brush_r
     * @param {number} brush_g
     * @param {number} brush_b
     * @param {number} sampled_r
     * @param {number} sampled_g
     * @param {number} sampled_b
     * @param {number} sampled_a
     * @param {number} color_mix
     * @param {number} pressure
     * @returns {Uint8Array}
     */
    static blend_color_mix(brush_r, brush_g, brush_b, sampled_r, sampled_g, sampled_b, sampled_a, color_mix, pressure) {
        const ret = wasm.colorblendcore_blend_color_mix(brush_r, brush_g, brush_b, sampled_r, sampled_g, sampled_b, sampled_a, color_mix, pressure);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Mezcla dos colores (Principal y Subcolor/Secundario) en función de la presión
     * @param {number} r1
     * @param {number} g1
     * @param {number} b1
     * @param {number} r2
     * @param {number} g2
     * @param {number} b2
     * @param {number} pressure
     * @returns {Uint8Array}
     */
    static blend_dual_color(r1, g1, b1, r2, g2, b2, pressure) {
        const ret = wasm.colorblendcore_blend_dual_color(r1, g1, b1, r2, g2, b2, pressure);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Evalúa la respuesta del grano de textura de papel sobre el canal alpha
     * `mode`: 0 = height (comparar altura), 1 = subtract, 2 = multiply, 3 = outline
     * @param {number} grain_val
     * @param {number} base_alpha
     * @param {number} pressure
     * @param {number} density
     * @param {number} mode
     * @param {boolean} invert
     * @returns {number}
     */
    static evaluate_paper_texture(grain_val, base_alpha, pressure, density, mode, invert) {
        const ret = wasm.colorblendcore_evaluate_paper_texture(grain_val, base_alpha, pressure, density, mode, invert);
        return ret;
    }
    /**
     * Genera una tesela RGBA matricial de patrón de grano de papel optimizada para repetición
     * @param {Uint8Array} out_rgba
     * @param {number} tile_width
     * @param {number} tile_height
     * @param {Float32Array} tooth_matrix
     * @param {number} tooth_width
     * @param {number} tooth_height
     * @param {number} density
     * @param {number} mode
     * @param {boolean} invert
     * @returns {boolean}
     */
    static generate_paper_pattern_tile(out_rgba, tile_width, tile_height, tooth_matrix, tooth_width, tooth_height, density, mode, invert) {
        var ptr0 = passArray8ToWasm0(out_rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(tooth_matrix, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.colorblendcore_generate_paper_pattern_tile(ptr0, len0, out_rgba, tile_width, tile_height, ptr1, len1, tooth_width, tooth_height, density, mode, invert);
        return ret !== 0;
    }
    /**
     * Fusiona la capa superior `src_rgba` sobre `dst_rgba` en memoria con modo de fusión, opacidad y alpha lock
     * @param {Uint8Array} dst_rgba
     * @param {Uint8Array} src_rgba
     * @param {number} width
     * @param {number} height
     * @param {number} blend_mode_id
     * @param {number} opacity
     * @param {boolean} lock_alpha
     * @param {Uint8Array} clip_mask
     * @returns {boolean}
     */
    static merge_layers_simd(dst_rgba, src_rgba, width, height, blend_mode_id, opacity, lock_alpha, clip_mask) {
        var ptr0 = passArray8ToWasm0(dst_rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(src_rgba, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArray8ToWasm0(clip_mask, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.colorblendcore_merge_layers_simd(ptr0, len0, dst_rgba, ptr1, len1, width, height, blend_mode_id, opacity, lock_alpha, ptr2, len2);
        return ret !== 0;
    }
    /**
     * Fusiona de forma ultra-rápida un rectángulo delimitado [min_x, min_y, max_x, max_y]
     * de un trazo (`src_rgba`) sobre la capa de destino (`dst_rgba`), aplicando opacidad,
     * modo de mezcla (normal, lighter, multiply, screen, etc.) y bloqueo de canal alfa (`lock_alpha`).
     * Si `clip_mask` no está vacío, modula el alfa del trazo por la máscara.
     * @param {Uint8Array} dst_rgba
     * @param {Uint8Array} src_rgba
     * @param {number} stride_width
     * @param {number} stride_height
     * @param {number} min_x
     * @param {number} min_y
     * @param {number} max_x
     * @param {number} max_y
     * @param {number} blend_mode_id
     * @param {number} opacity
     * @param {boolean} lock_alpha
     * @param {Uint8Array} clip_mask
     * @returns {boolean}
     */
    static merge_stroke_rect(dst_rgba, src_rgba, stride_width, stride_height, min_x, min_y, max_x, max_y, blend_mode_id, opacity, lock_alpha, clip_mask) {
        var ptr0 = passArray8ToWasm0(dst_rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(src_rgba, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArray8ToWasm0(clip_mask, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.colorblendcore_merge_stroke_rect(ptr0, len0, dst_rgba, ptr1, len1, stride_width, stride_height, min_x, min_y, max_x, max_y, blend_mode_id, opacity, lock_alpha, ptr2, len2);
        return ret !== 0;
    }
    /**
     * Actualiza el estado acumulado de arrastre / difuminado (Smudge / Blender)
     * Retorna `[r, g, b, alpha]`
     * @param {number} current_r
     * @param {number} current_g
     * @param {number} current_b
     * @param {number} current_a
     * @param {number} sampled_r
     * @param {number} sampled_g
     * @param {number} sampled_b
     * @param {number} sampled_a
     * @param {number} pick_rate
     * @returns {Float32Array}
     */
    static step_smudge(current_r, current_g, current_b, current_a, sampled_r, sampled_g, sampled_b, sampled_a, pick_rate) {
        const ret = wasm.colorblendcore_step_smudge(current_r, current_g, current_b, current_a, sampled_r, sampled_g, sampled_b, sampled_a, pick_rate);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) ColorBlendCore.prototype[Symbol.dispose] = ColorBlendCore.prototype.free;

/**
 * Motor nativo de muestreo cromático ultra-rápido para mezcla de pintura (Óleo / Acuarela / Smudge)
 */
export class ColorSamplerCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ColorSamplerCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_colorsamplercore_free(ptr, 0);
    }
    /**
     * Muestrea un punto (x, y) de un buffer RGBA plano
     * Retorna un vector con [r, g, b, alpha_norm] o vacío si es totalmente transparente
     * @param {Uint8Array} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} x
     * @param {number} y
     * @returns {Float32Array}
     */
    static sample_rgba(buffer, width, height, x, y) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.colorsamplercore_sample_rgba(ptr0, len0, width, height, x, y);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
}
if (Symbol.dispose) ColorSamplerCore.prototype[Symbol.dispose] = ColorSamplerCore.prototype.free;

/**
 * Compositor nativo SIMD para mezclar capas en memoria contigua
 */
export class FastLayerCompositor {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FastLayerCompositorFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fastlayercompositor_free(ptr, 0);
    }
    /**
     * Mezcla capas soportando modos estándar:
     * 0 = source-over (Normal), 1 = multiply, 2 = screen, 3 = overlay
     * @param {Uint8Array} dest
     * @param {Uint8Array} src
     * @param {number} opacity
     * @param {number} blend_mode
     */
    static blend_layer(dest, src, opacity, blend_mode) {
        var ptr0 = passArray8ToWasm0(dest, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(src, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.fastlayercompositor_blend_layer(ptr0, len0, dest, ptr1, len1, opacity, blend_mode);
    }
    /**
     * Mezcla una capa sobre otra usando blend mode 'source-over' optimizado
     * @param {Uint8Array} dest
     * @param {Uint8Array} src
     * @param {number} opacity
     */
    static blend_source_over(dest, src, opacity) {
        var ptr0 = passArray8ToWasm0(dest, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(src, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.fastlayercompositor_blend_source_over(ptr0, len0, dest, ptr1, len1, opacity);
    }
}
if (Symbol.dispose) FastLayerCompositor.prototype[Symbol.dispose] = FastLayerCompositor.prototype.free;

export class FilterCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FilterCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_filtercore_free(ptr, 0);
    }
    /**
     * Adjust brightness (-1.0 to 1.0) and contrast (-1.0 to 1.0) in place.
     * @param {Uint8Array} rgba
     * @param {number} brightness
     * @param {number} contrast
     */
    static adjust_brightness_contrast(rgba, brightness, contrast) {
        var ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.filtercore_adjust_brightness_contrast(ptr0, len0, rgba, brightness, contrast);
    }
    /**
     * Adjust Hue, Saturation and Value (HSV).
     * - `hue_delta_deg`: -180.0 to 180.0
     * - `sat_scale`: 0.0 to 3.0 (1.0 = unchanged)
     * - `val_scale`: 0.0 to 3.0 (1.0 = unchanged)
     * @param {Uint8Array} rgba
     * @param {number} hue_delta_deg
     * @param {number} sat_scale
     * @param {number} val_scale
     */
    static adjust_hsv(rgba, hue_delta_deg, sat_scale, val_scale) {
        var ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.filtercore_adjust_hsv(ptr0, len0, rgba, hue_delta_deg, sat_scale, val_scale);
    }
    /**
     * Convert to black or white based on luminance threshold (0..255).
     * Pixels with luminance >= threshold become white (255), otherwise black (0).
     * Transparent pixels remain unaffected.
     * @param {Uint8Array} rgba
     * @param {number} threshold
     */
    static binarize(rgba, threshold) {
        var ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.filtercore_binarize(ptr0, len0, rgba, threshold);
    }
    /**
     * Extracción de lineart a transparencia (Clean paper scan to transparent ink)
     * Convierte el fondo de papel blanco en transparencia pura manteniendo los trazos
     * @param {Uint8Array} rgba
     * @param {number} darkness
     * @param {number} threshold
     */
    static extract_lineart_transparent(rgba, darkness, threshold) {
        var ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.filtercore_extract_lineart_transparent(ptr0, len0, rgba, darkness, threshold);
    }
    /**
     * Fast separable 1D Gaussian blur on an RGBA buffer.
     * Returns a new blurred RGBA vector of identical dimensions.
     * @param {Uint8Array} src_rgba
     * @param {number} width
     * @param {number} height
     * @param {number} radius
     * @returns {Uint8Array}
     */
    static gaussian_blur(src_rgba, width, height, radius) {
        const ptr0 = passArray8ToWasm0(src_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.filtercore_gaussian_blur(ptr0, len0, width, height, radius);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Generador de tramas manga (Halftone / Screentones) a partir de capas de sombreado
     * - `frequency_lpi`: líneas/puntos por pulgada (e.g. 30 a 85 LPI típico en manga)
     * - `angle_deg`: ángulo de inclinación de la trama (e.g. 45° estándar)
     * - `dot_shape`: 0 = punto circular, 1 = línea, 2 = diamante
     * @param {Uint8Array} rgba
     * @param {number} width
     * @param {number} height
     * @param {number} frequency_lpi
     * @param {number} angle_deg
     * @param {number} dot_shape
     */
    static generate_screentone(rgba, width, height, frequency_lpi, angle_deg, dot_shape) {
        var ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.filtercore_generate_screentone(ptr0, len0, rgba, width, height, frequency_lpi, angle_deg, dot_shape);
    }
    /**
     * Invert RGB channels in place, preserving alpha.
     * @param {Uint8Array} rgba
     */
    static invert_colors(rgba) {
        var ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.filtercore_invert_colors(ptr0, len0, rgba);
    }
    /**
     * Enfoque de trazos (Unsharp Mask)
     * @param {Uint8Array} rgba
     * @param {number} width
     * @param {number} height
     * @param {number} radius
     * @param {number} amount
     * @param {number} threshold
     */
    static unsharp_mask(rgba, width, height, radius, amount, threshold) {
        var ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.filtercore_unsharp_mask(ptr0, len0, rgba, width, height, radius, amount, threshold);
    }
}
if (Symbol.dispose) FilterCore.prototype[Symbol.dispose] = FilterCore.prototype.free;

export class FloodFillCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FloodFillCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_floodfillcore_free(ptr, 0);
    }
    /**
     * Non-contiguous color fill: replaces all pixels matching the color under (start_x, start_y)
     * across the whole buffer within tolerance, respecting optional selection mask.
     * @param {Uint8Array} rgba
     * @param {number} width
     * @param {number} height
     * @param {number} start_x
     * @param {number} start_y
     * @param {number} fill_r
     * @param {number} fill_g
     * @param {number} fill_b
     * @param {number} fill_a
     * @param {number} tolerance
     * @param {Uint8Array} selection_mask
     * @returns {FloodFillResult | undefined}
     */
    static fill_all_matching(rgba, width, height, start_x, start_y, fill_r, fill_g, fill_b, fill_a, tolerance, selection_mask) {
        var ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(selection_mask, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.floodfillcore_fill_all_matching(ptr0, len0, rgba, width, height, start_x, start_y, fill_r, fill_g, fill_b, fill_a, tolerance, ptr1, len1);
        return ret === 0 ? undefined : FloodFillResult.__wrap(ret);
    }
    /**
     * 4-way scanline flood fill on an RGBA buffer in place.
     * If `selection_mask` is non-empty, filling only applies where mask > 0.
     * Returns bounding box and filled count, or None if no pixels were changed.
     * @param {Uint8Array} rgba
     * @param {number} width
     * @param {number} height
     * @param {number} start_x
     * @param {number} start_y
     * @param {number} fill_r
     * @param {number} fill_g
     * @param {number} fill_b
     * @param {number} fill_a
     * @param {number} tolerance
     * @param {Uint8Array} selection_mask
     * @returns {FloodFillResult | undefined}
     */
    static scanline_fill(rgba, width, height, start_x, start_y, fill_r, fill_g, fill_b, fill_a, tolerance, selection_mask) {
        var ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(selection_mask, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.floodfillcore_scanline_fill(ptr0, len0, rgba, width, height, start_x, start_y, fill_r, fill_g, fill_b, fill_a, tolerance, ptr1, len1);
        return ret === 0 ? undefined : FloodFillResult.__wrap(ret);
    }
}
if (Symbol.dispose) FloodFillCore.prototype[Symbol.dispose] = FloodFillCore.prototype.free;

export class FloodFillResult {
    static __wrap(ptr) {
        const obj = Object.create(FloodFillResult.prototype);
        obj.__wbg_ptr = ptr;
        FloodFillResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FloodFillResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_floodfillresult_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get filled_count() {
        const ret = wasm.__wbg_get_floodfillresult_filled_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get max_x() {
        const ret = wasm.__wbg_get_floodfillresult_max_x(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get max_y() {
        const ret = wasm.__wbg_get_floodfillresult_max_y(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get min_x() {
        const ret = wasm.__wbg_get_floodfillresult_min_x(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get min_y() {
        const ret = wasm.__wbg_get_floodfillresult_min_y(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set filled_count(arg0) {
        wasm.__wbg_set_floodfillresult_filled_count(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set max_x(arg0) {
        wasm.__wbg_set_floodfillresult_max_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set max_y(arg0) {
        wasm.__wbg_set_floodfillresult_max_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set min_x(arg0) {
        wasm.__wbg_set_floodfillresult_min_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set min_y(arg0) {
        wasm.__wbg_set_floodfillresult_min_y(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) FloodFillResult.prototype[Symbol.dispose] = FloodFillResult.prototype.free;

/**
 * Motor de caché circular de fotogramas en memoria (Ring Buffer Frame Cache).
 * Permite scrubbing y reproducción de secuencias a 60-120 FPS sin re-renderizar capas.
 */
export class FrameCacheCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FrameCacheCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_framecachecore_free(ptr, 0);
    }
    /**
     * Número de fotogramas actualmente cacheados
     * @returns {number}
     */
    cached_count() {
        const ret = wasm.framecachecore_cached_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Recupera un fotograma de la caché directamente al búfer de destino en sub-microsegundos
     * @param {number} frame
     * @param {Uint8Array} out_rgba
     * @returns {boolean}
     */
    get_frame(frame, out_rgba) {
        var ptr0 = passArray8ToWasm0(out_rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.framecachecore_get_frame(this.__wbg_ptr, frame, ptr0, len0, out_rgba);
        return ret !== 0;
    }
    /**
     * Consulta si un fotograma está en caché
     * @param {number} frame
     * @returns {boolean}
     */
    has_frame(frame) {
        const ret = wasm.framecachecore_has_frame(this.__wbg_ptr, frame);
        return ret !== 0;
    }
    /**
     * Invalida toda la caché de fotogramas
     */
    invalidate_all() {
        wasm.framecachecore_invalidate_all(this.__wbg_ptr);
    }
    /**
     * Invalida un fotograma específico (por ejemplo, cuando el usuario dibuja sobre él)
     * @param {number} frame
     */
    invalidate_frame(frame) {
        wasm.framecachecore_invalidate_frame(this.__wbg_ptr, frame);
    }
    /**
     * @param {number} max_frames
     */
    constructor(max_frames) {
        const ret = wasm.framecachecore_new(max_frames);
        this.__wbg_ptr = ret;
        FrameCacheCoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Ajusta la capacidad máxima de fotogramas (p. ej. según un presupuesto de memoria),
     * descartando los más antiguos si el nuevo límite es menor al contenido actual.
     * @param {number} max_frames
     */
    set_max_frames(max_frames) {
        wasm.framecachecore_set_max_frames(this.__wbg_ptr, max_frames);
    }
    /**
     * Almacena un fotograma renderizado en la caché
     * @param {number} frame
     * @param {number} width
     * @param {number} height
     * @param {Uint8Array} rgba
     */
    store_frame(frame, width, height, rgba) {
        const ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.framecachecore_store_frame(this.__wbg_ptr, frame, width, height, ptr0, len0);
    }
}
if (Symbol.dispose) FrameCacheCore.prototype[Symbol.dispose] = FrameCacheCore.prototype.free;

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
 * Motor nativo de compresión y descompresión ultrarrápida QOI para el historial de Deshacer/Rehacer
 */
export class HistoryCompressorCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HistoryCompressorCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_historycompressorcore_free(ptr, 0);
    }
    /**
     * Comprime un búfer RGBA de tamaño width x height en formato QOI ultra-rápido
     * @param {Uint8Array} data
     * @param {number} width
     * @param {number} height
     * @returns {number}
     */
    compress_rgba(data, width, height) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.historycompressorcore_compress_rgba(this.__wbg_ptr, ptr0, len0, width, height);
        return ret >>> 0;
    }
    /**
     * Recorta un rectángulo `[crop_x, crop_y, crop_w, crop_h]` de una imagen completa RGBA
     * de tamaño `doc_w x doc_h` en un único buffer de destino plano.
     * Evita miles de llamadas `subarray()` y recolección de basura en JavaScript.
     * @param {Uint8Array} src_rgba
     * @param {number} doc_w
     * @param {number} doc_h
     * @param {number} crop_x
     * @param {number} crop_y
     * @param {number} crop_w
     * @param {number} crop_h
     * @param {Uint8Array} out_rgba
     * @returns {boolean}
     */
    static crop_rgba_rect(src_rgba, doc_w, doc_h, crop_x, crop_y, crop_w, crop_h, out_rgba) {
        const ptr0 = passArray8ToWasm0(src_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray8ToWasm0(out_rgba, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.historycompressorcore_crop_rgba_rect(ptr0, len0, doc_w, doc_h, crop_x, crop_y, crop_w, crop_h, ptr1, len1, out_rgba);
        return ret !== 0;
    }
    /**
     * Descomprime un búfer QOI en RGBA crudo
     * @param {Uint8Array} bytes
     * @param {number} width
     * @param {number} height
     * @returns {number}
     */
    decompress_qoi(bytes, width, height) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.historycompressorcore_decompress_qoi(this.__wbg_ptr, ptr0, len0, width, height);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_buffer_len() {
        const ret = wasm.historycompressorcore_get_buffer_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_buffer_ptr() {
        const ret = wasm.historycompressorcore_get_buffer_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.historycompressorcore_new();
        this.__wbg_ptr = ret;
        HistoryCompressorCoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) HistoryCompressorCore.prototype[Symbol.dispose] = HistoryCompressorCore.prototype.free;

/**
 * @enum {0 | 1 | 2 | 3}
 */
export const ResampleMode = Object.freeze({
    Nearest: 0, "0": "Nearest",
    Bilinear: 1, "1": "Bilinear",
    Bicubic: 2, "2": "Bicubic",
    Lanczos: 3, "3": "Lanczos",
});

/**
 * High-performance Ruler and Perspective Engine in Rust + WebAssembly.
 * Provides real-time magnetic stroke snapping, 1/2/3-point perspective guides,
 * bilateral & radial symmetry reflection, and manga action speedlines.
 */
export class RulerCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RulerCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rulercore_free(ptr, 0);
    }
    /**
     * Begins a new stroke at (start_x, start_y)
     * @param {number} _start_x
     * @param {number} _start_y
     */
    begin_stroke(_start_x, _start_y) {
        wasm.rulercore_begin_stroke(this.__wbg_ptr, _start_x, _start_y);
    }
    /**
     * Generates symmetric reflected/rotated points for a point (x, y) based on active symmetry configuration.
     * Returns a flat buffer of pairs: [x0, y0, x1, y1, ...]
     * @param {number} x
     * @param {number} y
     * @returns {Float32Array}
     */
    get_symmetric_points(x, y) {
        const ret = wasm.rulercore_get_symmetric_points(this.__wbg_ptr, x, y);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    constructor() {
        const ret = wasm.rulercore_new();
        this.__wbg_ptr = ret;
        RulerCoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Resets the current stroke magnetic direction lock on pen lift
     */
    reset_stroke_lock() {
        wasm.rulercore_reset_stroke_lock(this.__wbg_ptr);
    }
    /**
     * Configures perspective vanishing points
     * @param {number} vp1_x
     * @param {number} vp1_y
     * @param {number} vp2_x
     * @param {number} vp2_y
     * @param {number} vp3_x
     * @param {number} vp3_y
     * @param {number} horizon_y
     */
    set_perspective_params(vp1_x, vp1_y, vp2_x, vp2_y, vp3_x, vp3_y, horizon_y) {
        wasm.rulercore_set_perspective_params(this.__wbg_ptr, vp1_x, vp1_y, vp2_x, vp2_y, vp3_x, vp3_y, horizon_y);
    }
    /**
     * Sets active ruler type (0: None, 1: Symmetry, 2: Persp1, 3: Persp2, 4: Persp3, 5: Radial, 6: Parallel)
     * @param {number} ruler_type
     */
    set_ruler_type(ruler_type) {
        wasm.rulercore_set_ruler_type(this.__wbg_ptr, ruler_type);
    }
    /**
     * Toggles or sets magnetic snapping to ruler
     * @param {boolean} enabled
     */
    set_snap_enabled(enabled) {
        wasm.rulercore_set_snap_enabled(this.__wbg_ptr, enabled);
    }
    /**
     * Configures speedline radial / parallel center
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} angle_deg
     */
    set_speedline_params(center_x, center_y, angle_deg) {
        wasm.rulercore_set_speedline_params(this.__wbg_ptr, center_x, center_y, angle_deg);
    }
    /**
     * Configures symmetry ruler parameters
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} angle_deg
     * @param {number} axes
     * @param {boolean} is_mirror
     */
    set_symmetry_params(center_x, center_y, angle_deg, axes, is_mirror) {
        wasm.rulercore_set_symmetry_params(this.__wbg_ptr, center_x, center_y, angle_deg, axes, is_mirror);
    }
    /**
     * Snaps current raw cursor position (cur_x, cur_y) to the active perspective or speedline guide.
     * Returns a 2-element array [snapped_x, snapped_y].
     * @param {number} start_x
     * @param {number} start_y
     * @param {number} cur_x
     * @param {number} cur_y
     * @returns {Float32Array}
     */
    snap_point(start_x, start_y, cur_x, cur_y) {
        const ret = wasm.rulercore_snap_point(this.__wbg_ptr, start_x, start_y, cur_x, cur_y);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) RulerCore.prototype[Symbol.dispose] = RulerCore.prototype.free;

/**
 * Motor nativo de selección, morfología y extracción de bordes (Marching Ants)
 */
export class SelectionCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SelectionCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_selectioncore_free(ptr, 0);
    }
    /**
     * Borde de selección (Border Selection): Convierte la selección en un contorno hueco
     * position: 0 = interior, 1 = centrado, 2 = exterior
     * @param {Uint8Array} mask_rgba
     * @param {number} width
     * @param {number} height
     * @param {number} radius
     * @param {number} position
     * @returns {Uint8Array}
     */
    static border_selection(mask_rgba, width, height, radius, position) {
        const ptr0 = passArray8ToWasm0(mask_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.selectioncore_border_selection(ptr0, len0, width, height, radius, position);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Calcula de manera ultrarrápida los límites de la selección (bounding box)
     * Retorna `[min_x, min_y, max_x, max_y, width, height]` o un vector vacío si no hay selección.
     * @param {Uint8Array} buffer
     * @param {number} width
     * @param {number} height
     * @param {boolean} is_rgba
     * @returns {Int32Array}
     */
    static compute_bounds(buffer, width, height, is_rgba) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.selectioncore_compute_bounds(ptr0, len0, width, height, is_rgba);
        var v2 = getArrayI32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Extrae el contorno perimetral exacto de 1 píxel para las Marching Ants
     * Genera directamente un buffer RGBA con el perímetro marcado para pintar en canvas
     * @param {Uint8Array} src_buffer
     * @param {number} width
     * @param {number} height
     * @param {boolean} is_rgba
     * @returns {Uint8Array}
     */
    static extract_boundary_mask(src_buffer, width, height, is_rgba) {
        const ptr0 = passArray8ToWasm0(src_buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.selectioncore_extract_boundary_mask(ptr0, len0, width, height, is_rgba);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Extrae segmentos de contorno vectoriales [x1, y1, x2, y2, ...]
     * Aplica fusión colineal automática para reducir miles de píxeles a unas pocas líneas.
     * @param {Uint8Array} src_buffer
     * @param {number} width
     * @param {number} height
     * @param {number} min_x
     * @param {number} min_y
     * @param {number} max_x
     * @param {number} max_y
     * @param {boolean} is_rgba
     * @returns {Float32Array}
     */
    static extract_boundary_segments(src_buffer, width, height, min_x, min_y, max_x, max_y, is_rgba) {
        const ptr0 = passArray8ToWasm0(src_buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.selectioncore_extract_boundary_segments(ptr0, len0, width, height, min_x, min_y, max_x, max_y, is_rgba);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Desvanecer selección (Feather): Desenfoque gaussiano separable rápido sobre el canal alfa de la máscara
     * @param {Uint8Array} mask_rgba
     * @param {number} width
     * @param {number} height
     * @param {number} radius
     * @returns {Uint8Array}
     */
    static feather_selection(mask_rgba, width, height, radius) {
        const ptr0 = passArray8ToWasm0(mask_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.selectioncore_feather_selection(ptr0, len0, width, height, radius);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Inversión de máscara booleana directamente a RGBA
     * @param {Uint8Array} src_rgba
     * @param {number} width
     * @param {number} height
     * @returns {Uint8Array}
     */
    static invert_mask(src_rgba, width, height) {
        const ptr0 = passArray8ToWasm0(src_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.selectioncore_invert_mask(ptr0, len0, width, height);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Varita Mágica (Magic Wand): Selección continua o global por tolerancia de color
     * @param {Uint8Array} rgba
     * @param {number} width
     * @param {number} height
     * @param {number} seed_x
     * @param {number} seed_y
     * @param {number} tolerance
     * @param {boolean} contiguous
     * @param {boolean} antialias
     * @returns {Uint8Array}
     */
    static magic_wand_selection(rgba, width, height, seed_x, seed_y, tolerance, contiguous, antialias) {
        const ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.selectioncore_magic_wand_selection(ptr0, len0, width, height, seed_x, seed_y, tolerance, contiguous, antialias);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Erosión morfológica circular (Contract / Reduce Selection) directamente a RGBA
     * @param {Uint8Array} src_buffer
     * @param {number} width
     * @param {number} height
     * @param {number} radius
     * @param {boolean} is_rgba
     * @returns {Uint8Array}
     */
    static morphology_contract(src_buffer, width, height, radius, is_rgba) {
        const ptr0 = passArray8ToWasm0(src_buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.selectioncore_morphology_contract(ptr0, len0, width, height, radius, is_rgba);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Dilatación morfológica circular (Expand Selection) directamente a RGBA
     * @param {Uint8Array} src_buffer
     * @param {number} width
     * @param {number} height
     * @param {number} radius
     * @param {boolean} is_rgba
     * @returns {Uint8Array}
     */
    static morphology_expand(src_buffer, width, height, radius, is_rgba) {
        const ptr0 = passArray8ToWasm0(src_buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.selectioncore_morphology_expand(ptr0, len0, width, height, radius, is_rgba);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
}
if (Symbol.dispose) SelectionCore.prototype[Symbol.dispose] = SelectionCore.prototype.free;

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
     * Dilatación morfológica binaria rápida (0 o 1) con ventana deslizante en memoria contigua
     * @param {Uint8Array} src
     * @param {number} w
     * @param {number} h
     * @param {number} radius
     * @returns {Uint8Array}
     */
    dilate_binary_mask(src, w, h, radius) {
        const ptr0 = passArray8ToWasm0(src, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.smartfillcore_dilate_binary_mask(this.__wbg_ptr, ptr0, len0, w, h, radius);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Erosión morfológica binaria rápida (0 o 1) por dualidad morfológica en memoria contigua
     * @param {Uint8Array} src
     * @param {number} w
     * @param {number} h
     * @param {number} radius
     * @returns {Uint8Array}
     */
    erode_binary_mask(src, w, h, radius) {
        const ptr0 = passArray8ToWasm0(src, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.smartfillcore_erode_binary_mask(this.__wbg_ptr, ptr0, len0, w, h, radius);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
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
 * Representa una cuadrícula esparsa de teselas de 128x128 px para una capa.
 * Las áreas transparentes/vacías ocupan 0 bytes en memoria.
 */
export class SparseTileGrid {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SparseTileGridFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sparsetilegrid_free(ptr, 0);
    }
    /**
     * Retorna el número total de teselas activas en memoria
     * @returns {number}
     */
    allocated_tile_count() {
        const ret = wasm.sparsetilegrid_allocated_tile_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Vacía todas las teselas (reseteo completo de capa sin reasignar vector)
     */
    clear_all() {
        wasm.sparsetilegrid_clear_all(this.__wbg_ptr);
    }
    /**
     * Libera la memoria de una tesela
     * @param {number} col
     * @param {number} row
     */
    clear_tile(col, row) {
        wasm.sparsetilegrid_clear_tile(this.__wbg_ptr, col, row);
    }
    /**
     * Copia una tesela individual a un buffer de destino
     * @param {number} col
     * @param {number} row
     * @param {Uint8Array} out_buf
     * @returns {boolean}
     */
    get_tile_data(col, row, out_buf) {
        var ptr0 = passArray8ToWasm0(out_buf, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sparsetilegrid_get_tile_data(this.__wbg_ptr, col, row, ptr0, len0, out_buf);
        return ret !== 0;
    }
    /**
     * Comprueba si existe una tesela asignada en la coordenada
     * @param {number} col
     * @param {number} row
     * @returns {boolean}
     */
    has_tile(col, row) {
        const ret = wasm.sparsetilegrid_has_tile(this.__wbg_ptr, col, row);
        return ret !== 0;
    }
    /**
     * Importa un lienzo completo RGBA descomponiéndolo automáticamente en teselas esparsas.
     * Las regiones vacías no ocupan memoria.
     * @param {Uint8Array} src_rgba
     * @returns {number}
     */
    import_from_full_buffer(src_rgba) {
        const ptr0 = passArray8ToWasm0(src_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sparsetilegrid_import_from_full_buffer(this.__wbg_ptr, ptr0, len0);
        return ret >>> 0;
    }
    /**
     * @param {number} doc_width
     * @param {number} doc_height
     */
    constructor(doc_width, doc_height) {
        const ret = wasm.sparsetilegrid_new(doc_width, doc_height);
        this.__wbg_ptr = ret;
        SparseTileGridFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Proyecta todas las teselas activas directamente en un búfer RGBA del tamaño del documento
     * @param {Uint8Array} dest_rgba
     * @returns {boolean}
     */
    render_to_full_buffer(dest_rgba) {
        var ptr0 = passArray8ToWasm0(dest_rgba, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sparsetilegrid_render_to_full_buffer(this.__wbg_ptr, ptr0, len0, dest_rgba);
        return ret !== 0;
    }
    /**
     * Asigna o actualiza una tesela con datos RGBA (128x128 = 65536 bytes)
     * @param {number} col
     * @param {number} row
     * @param {Uint8Array} rgba_data
     * @returns {boolean}
     */
    set_tile_data(col, row, rgba_data) {
        const ptr0 = passArray8ToWasm0(rgba_data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sparsetilegrid_set_tile_data(this.__wbg_ptr, col, row, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Actualiza únicamente las teselas que intersecan con el rectángulo delimitador [min_x, min_y, max_x, max_y]
     * a partir de un buffer RGBA sub-rectángulo o lienzo completo.
     * @param {Uint8Array} src_rgba
     * @param {number} stride_width
     * @param {number} min_x
     * @param {number} min_y
     * @param {number} max_x
     * @param {number} max_y
     * @param {number} offset_x
     * @param {number} offset_y
     * @returns {number}
     */
    update_rect_from_buffer(src_rgba, stride_width, min_x, min_y, max_x, max_y, offset_x, offset_y) {
        const ptr0 = passArray8ToWasm0(src_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sparsetilegrid_update_rect_from_buffer(this.__wbg_ptr, ptr0, len0, stride_width, min_x, min_y, max_x, max_y, offset_x, offset_y);
        return ret >>> 0;
    }
}
if (Symbol.dispose) SparseTileGrid.prototype[Symbol.dispose] = SparseTileGrid.prototype.free;

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
    /**
     * Elimina la instantánea del lienzo
     */
    clear_canvas_snapshot() {
        wasm.strokeenginecore_clear_canvas_snapshot(this.__wbg_ptr);
    }
    /**
     * Elimina la máscara de selección activa
     */
    clear_selection_mask() {
        wasm.strokeenginecore_clear_selection_mask(this.__wbg_ptr);
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
     * Puntero zero-copy al buffer de dabs (stride 11: [x, y, diameter, pressure, alpha, angle_rad, tip_index, r, g, b, flags])
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
     * Comprueba si hay una máscara de selección asignada
     * @returns {boolean}
     */
    has_selection() {
        const ret = wasm.strokeenginecore_has_selection(this.__wbg_ptr);
        return ret !== 0;
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
     * Genera la predicción curva Bézier cuadrática continua C1 directamente en Rust
     * a partir de los puntos inicial y objetivo, y el vector de velocidad tangencial.
     * Guarda y restaura internamente el checkpoint del motor, garantizando cero mutación residual.
     * Retorna el número de dabs calculados en `dabs_buffer`.
     * @param {number} start_x
     * @param {number} start_y
     * @param {number} start_p
     * @param {number} target_x
     * @param {number} target_y
     * @param {number} target_p
     * @param {number} vel_x
     * @param {number} vel_y
     * @returns {number}
     */
    predict_bezier_stroke(start_x, start_y, start_p, target_x, target_y, target_p, vel_x, vel_y) {
        const ret = wasm.strokeenginecore_predict_bezier_stroke(this.__wbg_ptr, start_x, start_y, start_p, target_x, target_y, target_p, vel_x, vel_y);
        return ret >>> 0;
    }
    /**
     * Calcula de una sola llamada nativa el lote completo de dabs predichos
     * a partir de una secuencia plana de puntos: `[x0, y0, p0, x1, y1, p1, ...]` (stride 3).
     * Guarda y restaura internamente el checkpoint del motor, garantizando cero mutación residual.
     * Retorna el número de dabs calculados en `dabs_buffer`.
     * @param {Float32Array} points
     * @returns {number}
     */
    predict_stroke_batch(points) {
        const ptr0 = passArrayF32ToWasm0(points, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.strokeenginecore_predict_stroke_batch(this.__wbg_ptr, ptr0, len0);
        return ret >>> 0;
    }
    /**
     * Restaura el estado guardado tras renderizar la predicción temporal
     */
    restore_checkpoint() {
        wasm.strokeenginecore_restore_checkpoint(this.__wbg_ptr);
    }
    /**
     * Muestrea el valor de opacidad alfa (0.0..1.0) de la máscara de selección en (x, y)
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    sample_selection_alpha(x, y) {
        const ret = wasm.strokeenginecore_sample_selection_alpha(this.__wbg_ptr, x, y);
        return ret;
    }
    /**
     * Guarda el estado actual antes de calcular trazos predichos (renderPredictedStroke)
     */
    save_checkpoint() {
        wasm.strokeenginecore_save_checkpoint(this.__wbg_ptr);
    }
    /**
     * Asigna la instantánea plana RGBA8 del lienzo subyacente para muestreo nativo
     * @param {Uint8Array} snapshot
     * @param {number} width
     * @param {number} height
     */
    set_canvas_snapshot(snapshot, width, height) {
        const ptr0 = passArray8ToWasm0(snapshot, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.strokeenginecore_set_canvas_snapshot(this.__wbg_ptr, ptr0, len0, width, height);
    }
    /**
     * Asigna la máscara de selección activa para filtrado y modulación directa de dabs
     * @param {Uint8Array} mask_data
     * @param {number} width
     * @param {number} height
     * @param {number} bounds_min_x
     * @param {number} bounds_min_y
     * @param {number} bounds_max_x
     * @param {number} bounds_max_y
     * @param {boolean} is_rgba
     */
    set_selection_mask(mask_data, width, height, bounds_min_x, bounds_min_y, bounds_max_x, bounds_max_y, is_rgba) {
        const ptr0 = passArray8ToWasm0(mask_data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.strokeenginecore_set_selection_mask(this.__wbg_ptr, ptr0, len0, width, height, bounds_min_x, bounds_min_y, bounds_max_x, bounds_max_y, is_rgba);
    }
    /**
     * @param {number} speed
     */
    set_speed(speed) {
        wasm.strokeenginecore_set_speed(this.__wbg_ptr, speed);
    }
    /**
     * Configura los parámetros cromáticos para evaluación nativa de mezclas y smudge
     * @param {number} primary_r
     * @param {number} primary_g
     * @param {number} primary_b
     * @param {number} secondary_r
     * @param {number} secondary_g
     * @param {number} secondary_b
     * @param {boolean} has_sub_color_mix
     * @param {number} color_mix
     * @param {number} color_mix_alpha
     * @param {number} smudge
     * @param {boolean} is_erase
     */
    set_stroke_color(primary_r, primary_g, primary_b, secondary_r, secondary_g, secondary_b, has_sub_color_mix, color_mix, color_mix_alpha, smudge, is_erase) {
        wasm.strokeenginecore_set_stroke_color(this.__wbg_ptr, primary_r, primary_g, primary_b, secondary_r, secondary_g, secondary_b, has_sub_color_mix, color_mix, color_mix_alpha, smudge, is_erase);
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

/**
 * Motor nativo de estabilización adaptativa de trazo y subdivisión Bézier
 */
export class StrokeStabilizerCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StrokeStabilizerCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_strokestabilizercore_free(ptr, 0);
    }
    /**
     * Procesa una muestra bruta del pointer (ratón o lápiz)
     * Aplica filtrado de jitter, estabilización adaptativa a la velocidad y subdivisión Bézier.
     * Retorna la cantidad de puntos interpolados emitidos (cada uno stride 3: [x, y, p]).
     * @param {number} x
     * @param {number} y
     * @param {number} pressure
     * @param {number} stabilization
     * @param {boolean} is_pen
     * @returns {number}
     */
    add_raw_point(x, y, pressure, stabilization, is_pen) {
        const ret = wasm.strokestabilizercore_add_raw_point(this.__wbg_ptr, x, y, pressure, stabilization, is_pen);
        return ret >>> 0;
    }
    /**
     * Inicia un nuevo trazo estabilizado
     * @param {number} x
     * @param {number} y
     * @param {number} pressure
     */
    begin_stroke(x, y, pressure) {
        wasm.strokestabilizercore_begin_stroke(this.__wbg_ptr, x, y, pressure);
    }
    /**
     * Al soltar el lápiz, emite el segmento final hasta el punto de liberación exacto
     * @returns {number}
     */
    flush_tail() {
        const ret = wasm.strokestabilizercore_flush_tail(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_emitted_len() {
        const ret = wasm.strokestabilizercore_get_emitted_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_emitted_ptr() {
        const ret = wasm.strokestabilizercore_get_emitted_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_speed() {
        const ret = wasm.strokestabilizercore_get_speed(this.__wbg_ptr);
        return ret;
    }
    constructor() {
        const ret = wasm.strokestabilizercore_new();
        this.__wbg_ptr = ret;
        StrokeStabilizerCoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) StrokeStabilizerCore.prototype[Symbol.dispose] = StrokeStabilizerCore.prototype.free;

/**
 * High-performance Timeline and Keyframe Evaluation Engine in Rust + WebAssembly.
 * Eliminates JavaScript GC spikes and resolves full scene composition in < 0.05 ms.
 */
export class TimelineCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TimelineCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_timelinecore_free(ptr, 0);
    }
    /**
     * Adds or updates an animation clip on a track
     * @param {number} track_id
     * @param {number} clip_id
     * @param {number} start_frame
     * @param {number} end_frame
     * @returns {boolean}
     */
    add_clip(track_id, clip_id, start_frame, end_frame) {
        const ret = wasm.timelinecore_add_clip(this.__wbg_ptr, track_id, clip_id, start_frame, end_frame);
        return ret !== 0;
    }
    /**
     * Adds an exposure (Cel instance) to a clip
     * @param {number} track_id
     * @param {number} clip_id
     * @param {number} frame
     * @param {number} cel_id
     * @returns {boolean}
     */
    add_exposure(track_id, clip_id, frame, cel_id) {
        const ret = wasm.timelinecore_add_exposure(this.__wbg_ptr, track_id, clip_id, frame, cel_id);
        return ret !== 0;
    }
    /**
     * Adds or updates a transform keyframe on a track
     * @param {number} track_id
     * @param {number} frame
     * @param {number} x
     * @param {number} y
     * @param {number} scale_x
     * @param {number} scale_y
     * @param {number} rotation
     * @param {number} opacity
     * @param {number} interpolation
     * @returns {boolean}
     */
    add_keyframe(track_id, frame, x, y, scale_x, scale_y, rotation, opacity, interpolation) {
        const ret = wasm.timelinecore_add_keyframe(this.__wbg_ptr, track_id, frame, x, y, scale_x, scale_y, rotation, opacity, interpolation);
        return ret !== 0;
    }
    /**
     * Adds or updates a track
     * @param {number} track_id
     * @param {boolean} visible
     * @param {boolean} keyframes_enabled
     */
    add_track(track_id, visible, keyframes_enabled) {
        wasm.timelinecore_add_track(this.__wbg_ptr, track_id, visible, keyframes_enabled);
    }
    /**
     * Evaluates the complete scene for a frame.
     * Returns a flat buffer with Stride 10 per track:
     * `[track_id, has_active_cel (0.0/1.0), cel_id, opacity, m11, m12, m21, m22, tx, ty]`
     * @param {number} frame
     * @returns {Float32Array}
     */
    evaluate_frame(frame) {
        const ret = wasm.timelinecore_evaluate_frame(this.__wbg_ptr, frame);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Evaluates Onion Skin adjacent cels around the current frame.
     * Returns a flat buffer with Stride 11 per onion cel:
     * `[track_id, cel_id, is_prev (1.0/0.0), distance, opacity, m11, m12, m21, m22, tx, ty]`
     * @param {number} current_frame
     * @param {number} prev_count
     * @param {number} next_count
     * @param {number} start_opacity
     * @param {number} step_opacity
     * @returns {Float32Array}
     */
    evaluate_onion_skin(current_frame, prev_count, next_count, start_opacity, step_opacity) {
        const ret = wasm.timelinecore_evaluate_onion_skin(this.__wbg_ptr, current_frame, prev_count, next_count, start_opacity, step_opacity);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    constructor() {
        const ret = wasm.timelinecore_new();
        this.__wbg_ptr = ret;
        TimelineCoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Removes a track
     * @param {number} track_id
     * @returns {boolean}
     */
    remove_track(track_id) {
        const ret = wasm.timelinecore_remove_track(this.__wbg_ptr, track_id);
        return ret !== 0;
    }
    /**
     * Clears all tracks and keyframes
     */
    reset() {
        wasm.timelinecore_reset(this.__wbg_ptr);
    }
    /**
     * Batch operation: Ripple-deletes the frame range `[start_frame, end_frame]` and collapses time
     * @param {number} track_id
     * @param {number} start_frame
     * @param {number} end_frame
     * @returns {boolean}
     */
    ripple_delete_range(track_id, start_frame, end_frame) {
        const ret = wasm.timelinecore_ripple_delete_range(this.__wbg_ptr, track_id, start_frame, end_frame);
        return ret !== 0;
    }
    /**
     * Sets global timeline parameters
     * @param {number} fps
     * @param {number} total_frames
     * @param {number} start_frame
     * @param {number} end_frame
     * @param {number} min_frame
     * @param {boolean} loop_playback
     */
    set_settings(fps, total_frames, start_frame, end_frame, min_frame, loop_playback) {
        wasm.timelinecore_set_settings(this.__wbg_ptr, fps, total_frames, start_frame, end_frame, min_frame, loop_playback);
    }
    /**
     * Batch operation: Shifts all clips, exposures and keyframes on/after `from_frame` by `delta_frames`
     * @param {number} track_id
     * @param {number} from_frame
     * @param {number} delta_frames
     * @returns {boolean}
     */
    shift_track_frames(track_id, from_frame, delta_frames) {
        const ret = wasm.timelinecore_shift_track_frames(this.__wbg_ptr, track_id, from_frame, delta_frames);
        return ret !== 0;
    }
}
if (Symbol.dispose) TimelineCore.prototype[Symbol.dispose] = TimelineCore.prototype.free;

export class TransformResampleCore {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransformResampleCoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transformresamplecore_free(ptr, 0);
    }
    /**
     * Helper to compute the 6-element inverse affine transform matrix
     * for translation, rotation, scale and pivot offset:
     * `P_src = Center_src + S^-1 * R^-1 * (P_dst - Center_dst)`
     * @param {number} center_src_x
     * @param {number} center_src_y
     * @param {number} center_dst_x
     * @param {number} center_dst_y
     * @param {number} scale_x
     * @param {number} scale_y
     * @param {number} rotation_rad
     * @returns {Float32Array}
     */
    static compute_inverse_transform_matrix(center_src_x, center_src_y, center_dst_x, center_dst_y, scale_x, scale_y, rotation_rad) {
        const ret = wasm.transformresamplecore_compute_inverse_transform_matrix(center_src_x, center_src_y, center_dst_x, center_dst_y, scale_x, scale_y, rotation_rad);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Deformación por Malla (Mesh Warp / Rejilla de deformación):
     * Remuestrea la imagen `src_rgba` deformándola según una malla de control `grid_cols × grid_rows`.
     * `grid_points` contiene `(grid_cols + 1) * (grid_rows + 1) * 2` floats [x0, y0, x1, y1, ...]
     * @param {Uint8Array} src_rgba
     * @param {number} src_w
     * @param {number} src_h
     * @param {number} dst_w
     * @param {number} dst_h
     * @param {number} grid_cols
     * @param {number} grid_rows
     * @param {Float32Array} grid_points
     * @param {ResampleMode} mode
     * @returns {Uint8Array}
     */
    static mesh_warp_resample(src_rgba, src_w, src_h, dst_w, dst_h, grid_cols, grid_rows, grid_points, mode) {
        const ptr0 = passArray8ToWasm0(src_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(grid_points, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transformresamplecore_mesh_warp_resample(ptr0, len0, src_w, src_h, dst_w, dst_h, grid_cols, grid_rows, ptr1, len1, mode);
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * Resample an RGBA patch applying an affine transformation with inverse mapping.
     * `mat_inv` is the 6-element inverse affine matrix:
     * `[a, b, c, d, tx, ty]` where
     * `src_x = a * dst_x + c * dst_y + tx`
     * `src_y = b * dst_x + d * dst_y + ty`
     * @param {Uint8Array} src_rgba
     * @param {number} src_w
     * @param {number} src_h
     * @param {number} dst_w
     * @param {number} dst_h
     * @param {Float32Array} mat_inv
     * @param {ResampleMode} mode
     * @returns {Uint8Array}
     */
    static resample_affine(src_rgba, src_w, src_h, dst_w, dst_h, mat_inv, mode) {
        const ptr0 = passArray8ToWasm0(src_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(mat_inv, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transformresamplecore_resample_affine(ptr0, len0, src_w, src_h, dst_w, dst_h, ptr1, len1, mode);
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * Resample an RGBA image from `(src_w, src_h)` to `(dst_w, dst_h)`.
     * Returns a new RGBA vector of length `dst_w * dst_h * 4`.
     * @param {Uint8Array} src_rgba
     * @param {number} src_w
     * @param {number} src_h
     * @param {number} dst_w
     * @param {number} dst_h
     * @param {ResampleMode} mode
     * @returns {Uint8Array}
     */
    static resample_scale(src_rgba, src_w, src_h, dst_w, dst_h, mode) {
        const ptr0 = passArray8ToWasm0(src_rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transformresamplecore_resample_scale(ptr0, len0, src_w, src_h, dst_w, dst_h, mode);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
}
if (Symbol.dispose) TransformResampleCore.prototype[Symbol.dispose] = TransformResampleCore.prototype.free;

/**
 * Resultado del cálculo analítico de IK para extremidades de 2 huesos
 */
export class TwoBoneIKResult {
    static __wrap(ptr) {
        const obj = Object.create(TwoBoneIKResult.prototype);
        obj.__wbg_ptr = ptr;
        TwoBoneIKResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TwoBoneIKResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_twoboneikresult_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get child_d_rotation() {
        const ret = wasm.__wbg_get_twoboneikresult_child_d_rotation(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get parent_d_rotation() {
        const ret = wasm.__wbg_get_twoboneikresult_parent_d_rotation(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set child_d_rotation(arg0) {
        wasm.__wbg_set_twoboneikresult_child_d_rotation(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set parent_d_rotation(arg0) {
        wasm.__wbg_set_twoboneikresult_parent_d_rotation(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) TwoBoneIKResult.prototype[Symbol.dispose] = TwoBoneIKResult.prototype.free;

export function init_engine_hooks() {
    wasm.init_engine_hooks();
}

/**
 * WASM-exported helper for rapid batch evaluation of Bezier curves
 * @param {number} p0x
 * @param {number} p0y
 * @param {number} p1x
 * @param {number} p1y
 * @param {number} p2x
 * @param {number} p2y
 * @param {number} p3x
 * @param {number} p3y
 * @param {number} target_x
 * @returns {number}
 */
export function wasm_solve_bezier_y(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, target_x) {
    const ret = wasm.wasm_solve_bezier_y(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, target_x);
    return ret;
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_copy_to_typed_array_88899a52af046901: function(arg0, arg1, arg2) {
            new Uint8Array(arg2.buffer, arg2.byteOffset, arg2.byteLength).set(getArrayU8FromWasm0(arg0, arg1));
        },
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

const BoneIKCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boneikcore_free(ptr, 1));
const BoneSkinCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boneskincore_free(ptr, 1));
const BrushDynamicsConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_brushdynamicsconfig_free(ptr, 1));
const ClipTileCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cliptilecore_free(ptr, 1));
const ColorBlendCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_colorblendcore_free(ptr, 1));
const ColorSamplerCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_colorsamplercore_free(ptr, 1));
const FastLayerCompositorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fastlayercompositor_free(ptr, 1));
const FilterCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_filtercore_free(ptr, 1));
const FloodFillCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_floodfillcore_free(ptr, 1));
const FloodFillResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_floodfillresult_free(ptr, 1));
const FrameCacheCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_framecachecore_free(ptr, 1));
const GifEncoderCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_gifencodercore_free(ptr, 1));
const HistoryCompressorCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_historycompressorcore_free(ptr, 1));
const RulerCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rulercore_free(ptr, 1));
const SelectionCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_selectioncore_free(ptr, 1));
const SmartFillCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_smartfillcore_free(ptr, 1));
const SparseTileGridFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sparsetilegrid_free(ptr, 1));
const StrokeEngineCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strokeenginecore_free(ptr, 1));
const StrokeStabilizerCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_strokestabilizercore_free(ptr, 1));
const TimelineCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_timelinecore_free(ptr, 1));
const TransformResampleCoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transformresamplecore_free(ptr, 1));
const TwoBoneIKResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_twoboneikresult_free(ptr, 1));

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

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
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
