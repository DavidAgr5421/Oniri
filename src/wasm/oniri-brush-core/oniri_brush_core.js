/* @ts-self-types="./oniri_brush_core.d.ts" */

/**
 * Configuración de dinámica y respuesta del pincel
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
     * @param {number} pressure_gamma
     * @param {boolean} velocity_size_enabled
     * @param {number} velocity_min_ratio
     */
    constructor(base_size, min_size_ratio, spacing_ratio, pressure_gamma, velocity_size_enabled, velocity_min_ratio) {
        const ret = wasm.brushdynamicsconfig_new(base_size, min_size_ratio, spacing_ratio, pressure_gamma, velocity_size_enabled, velocity_min_ratio);
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
    get min_size_ratio() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_min_size_ratio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get pressure_gamma() {
        const ret = wasm.__wbg_get_brushdynamicsconfig_pressure_gamma(this.__wbg_ptr);
        return ret;
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
    set min_size_ratio(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_min_size_ratio(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set pressure_gamma(arg0) {
        wasm.__wbg_set_brushdynamicsconfig_pressure_gamma(this.__wbg_ptr, arg0);
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
 * Representa una muestra interpolada de un dab de pincel calculada por Rust
 */
export class Dab {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DabFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dab_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get angle() {
        const ret = wasm.__wbg_get_dab_angle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get opacity() {
        const ret = wasm.__wbg_get_dab_opacity(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_dab_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_dab_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_dab_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set angle(arg0) {
        wasm.__wbg_set_dab_angle(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set opacity(arg0) {
        wasm.__wbg_set_dab_opacity(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_dab_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_dab_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_dab_y(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) Dab.prototype[Symbol.dispose] = Dab.prototype.free;

/**
 * Motor de cálculo e interpolación de trazos de alta frecuencia en Rust
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
     * Agrega un nuevo punto de movimiento (PointerMove) e interpola dabs
     * @param {number} x
     * @param {number} y
     * @param {number} pressure
     * @param {number} time_ms
     * @returns {number}
     */
    add_point(x, y, pressure, time_ms) {
        const ret = wasm.strokeenginecore_add_point(this.__wbg_ptr, x, y, pressure, time_ms);
        return ret >>> 0;
    }
    /**
     * Inicia un nuevo trazo en (x, y) con presión dada
     * @param {number} x
     * @param {number} y
     * @param {number} pressure
     * @param {number} time_ms
     */
    begin_stroke(x, y, pressure, time_ms) {
        wasm.strokeenginecore_begin_stroke(this.__wbg_ptr, x, y, pressure, time_ms);
    }
    /**
     * Finaliza el trazo actual
     */
    end_stroke() {
        wasm.strokeenginecore_end_stroke(this.__wbg_ptr);
    }
    /**
     * Cantidad total de floats en el buffer (número de dabs = len / 5)
     * @returns {number}
     */
    get_dabs_len() {
        const ret = wasm.strokeenginecore_get_dabs_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Puntero en memoria compartida a los dabs [x, y, size, opacity, angle, ...]
     * @returns {number}
     */
    get_dabs_ptr() {
        const ret = wasm.strokeenginecore_get_dabs_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Retorna el rectángulo sucio (dirty rect) [min_x, min_y, max_x, max_y]
     * @returns {Float32Array}
     */
    get_dirty_rect() {
        const ret = wasm.strokeenginecore_get_dirty_rect(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
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

const BrushDynamicsConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_brushdynamicsconfig_free(ptr, 1));
const DabFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dab_free(ptr, 1));
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

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
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
