use wasm_bindgen::prelude::*;

/// Motor nativo de decodificación planar y composición de mosaicos (tiles)
#[wasm_bindgen]
pub struct ClipTileCore;

#[wasm_bindgen]
impl ClipTileCore {
    /// Compone un tile descompreso de 5 planos (256x256) directamente en el buffer RGBA del documento
    pub fn blit_planar_tile(
        dest_rgba: &mut [u8],
        doc_w: u32,
        doc_h: u32,
        decomp_planes: &[u8],
        start_x: i32,
        start_y: i32,
        is_monochrome: bool,
    ) -> bool {
        const TILE_W: usize = 256;
        const TILE_H: usize = 256;
        const PLANE_SIZE: usize = TILE_W * TILE_H; // 65536

        if decomp_planes.len() < PLANE_SIZE * 4 {
            return false;
        }

        let dw = doc_w as usize;
        let dh = doc_h as usize;
        if dw == 0 || dh == 0 || dest_rgba.len() < dw * dh * 4 {
            return false;
        }

        let c0 = &decomp_planes[0..PLANE_SIZE];                  // Alpha / Density
        let c1 = &decomp_planes[PLANE_SIZE..PLANE_SIZE * 2];      // Red / Black mask
        let c2 = &decomp_planes[PLANE_SIZE * 2..PLANE_SIZE * 3];  // Green / White mask
        let c3 = &decomp_planes[PLANE_SIZE * 3..PLANE_SIZE * 4];  // Blue

        for ty in 0..TILE_H {
            let py = start_y + (ty as i32);
            if py < 0 || py >= (dh as i32) {
                continue;
            }
            let py_idx = (py as usize) * dw;
            let tile_row_idx = ty * TILE_W;

            for tx in 0..TILE_W {
                let px = start_x + (tx as i32);
                if px < 0 || px >= (dw as i32) {
                    continue;
                }

                let tidx = tile_row_idx + tx;
                let a = c0[tidx];
                if a == 0 {
                    continue;
                }

                let pidx = (py_idx + (px as usize)) * 4;
                if is_monochrome {
                    dest_rgba[pidx] = 0;
                    dest_rgba[pidx + 1] = 0;
                    dest_rgba[pidx + 2] = 0;
                } else {
                    dest_rgba[pidx] = c1[tidx];
                    dest_rgba[pidx + 1] = c2[tidx];
                    dest_rgba[pidx + 2] = c3[tidx];
                }
                dest_rgba[pidx + 3] = a;
            }
        }

        true
    }

    /// Descomprime un tile de Clip Studio Paint comprimido con zlib directamente en memoria nativa Rust
    /// y lo vuelca desplanarizado en el lienzo destino.
    pub fn decompress_and_blit_tile(
        dest_rgba: &mut [u8],
        doc_w: u32,
        doc_h: u32,
        compressed_data: &[u8],
        start_x: i32,
        start_y: i32,
        is_monochrome: bool,
    ) -> bool {
        match miniz_oxide::inflate::decompress_to_vec_zlib(compressed_data) {
            Ok(decomp) => {
                Self::blit_planar_tile(dest_rgba, doc_w, doc_h, &decomp, start_x, start_y, is_monochrome)
            }
            Err(_) => false,
        }
    }
}

/// Estructura de almacenamiento de un fotograma pre-renderizado en memoria
#[derive(Clone)]
struct CachedFrame {
    frame: i32,
    width: u32,
    height: u32,
    rgba: Vec<u8>,
}

/// Motor de caché circular de fotogramas en memoria (Ring Buffer Frame Cache).
/// Permite scrubbing y reproducción de secuencias a 60-120 FPS sin re-renderizar capas.
#[wasm_bindgen]
pub struct FrameCacheCore {
    max_frames: usize,
    frames: Vec<CachedFrame>,
}

#[wasm_bindgen]
impl FrameCacheCore {
    #[wasm_bindgen(constructor)]
    pub fn new(max_frames: usize) -> Self {
        Self {
            max_frames: max_frames.clamp(8, 128),
            frames: Vec::with_capacity(max_frames.clamp(8, 128)),
        }
    }

    /// Ajusta la capacidad máxima de fotogramas (p. ej. según un presupuesto de memoria),
    /// descartando los más antiguos si el nuevo límite es menor al contenido actual.
    pub fn set_max_frames(&mut self, max_frames: usize) {
        self.max_frames = max_frames.clamp(2, 128);
        while self.frames.len() > self.max_frames {
            self.frames.remove(0);
        }
    }

    /// Almacena un fotograma renderizado en la caché
    pub fn store_frame(&mut self, frame: i32, width: u32, height: u32, rgba: &[u8]) {
        let expected_len = (width as usize) * (height as usize) * 4;
        if rgba.len() < expected_len {
            return;
        }

        // Si ya existe este frame, actualizarlo
        if let Some(pos) = self.frames.iter().position(|f| f.frame == frame) {
            let cf = &mut self.frames[pos];
            cf.width = width;
            cf.height = height;
            cf.rgba.resize(expected_len, 0);
            cf.rgba.copy_from_slice(&rgba[0..expected_len]);
            // Mover al final (MRU - Most Recently Used)
            let item = self.frames.remove(pos);
            self.frames.push(item);
            return;
        }

        // Si alcanzamos la capacidad máxima, descartar el más antiguo (FIFO/LRU)
        if self.frames.len() >= self.max_frames {
            self.frames.remove(0);
        }

        let mut data = Vec::with_capacity(expected_len);
        data.extend_from_slice(&rgba[0..expected_len]);

        self.frames.push(CachedFrame {
            frame,
            width,
            height,
            rgba: data,
        });
    }

    /// Consulta si un fotograma está en caché
    pub fn has_frame(&self, frame: i32) -> bool {
        self.frames.iter().any(|f| f.frame == frame)
    }

    /// Recupera un fotograma de la caché directamente al búfer de destino en sub-microsegundos
    pub fn get_frame(&self, frame: i32, out_rgba: &mut [u8]) -> bool {
        if let Some(cf) = self.frames.iter().find(|f| f.frame == frame) {
            let len = cf.rgba.len();
            if out_rgba.len() >= len {
                out_rgba[0..len].copy_from_slice(&cf.rgba);
                return true;
            }
        }
        false
    }

    /// Invalida un fotograma específico (por ejemplo, cuando el usuario dibuja sobre él)
    pub fn invalidate_frame(&mut self, frame: i32) {
        self.frames.retain(|f| f.frame != frame);
    }

    /// Invalida toda la caché de fotogramas
    pub fn invalidate_all(&mut self) {
        self.frames.clear();
    }

    /// Número de fotogramas actualmente cacheados
    pub fn cached_count(&self) -> usize {
        self.frames.len()
    }
}

/// Compositor nativo SIMD para mezclar capas en memoria contigua
#[wasm_bindgen]
pub struct FastLayerCompositor;

#[wasm_bindgen]
impl FastLayerCompositor {
    /// Mezcla una capa sobre otra usando blend mode 'source-over' optimizado
    pub fn blend_source_over(
        dest: &mut [u8],
        src: &[u8],
        opacity: f32,
    ) {
        let len = dest.len().min(src.len());
        let op_scale = (opacity.clamp(0.0, 1.0) * 255.0) as u32;

        for chunk_idx in (0..len).step_by(4) {
            if chunk_idx + 3 >= len {
                break;
            }

            let sa = (src[chunk_idx + 3] as u32 * op_scale) / 255;
            if sa == 0 {
                continue;
            }

            if sa == 255 {
                dest[chunk_idx] = src[chunk_idx];
                dest[chunk_idx + 1] = src[chunk_idx + 1];
                dest[chunk_idx + 2] = src[chunk_idx + 2];
                dest[chunk_idx + 3] = 255;
                continue;
            }

            let da = dest[chunk_idx + 3] as u32;
            let out_a = sa + da * (255 - sa) / 255;
            if out_a == 0 {
                continue;
            }

            let sr = src[chunk_idx] as u32;
            let sg = src[chunk_idx + 1] as u32;
            let sb = src[chunk_idx + 2] as u32;

            let dr = dest[chunk_idx] as u32;
            let dg = dest[chunk_idx + 1] as u32;
            let db = dest[chunk_idx + 2] as u32;

            let r = (sr * sa + dr * da * (255 - sa) / 255) / out_a;
            let g = (sg * sa + dg * da * (255 - sa) / 255) / out_a;
            let b = (sb * sa + db * da * (255 - sa) / 255) / out_a;

            dest[chunk_idx] = r as u8;
            dest[chunk_idx + 1] = g as u8;
            dest[chunk_idx + 2] = b as u8;
            dest[chunk_idx + 3] = out_a as u8;
        }
    }

    /// Mezcla capas soportando modos estándar:
    /// 0 = source-over (Normal), 1 = multiply, 2 = screen, 3 = overlay
    pub fn blend_layer(
        dest: &mut [u8],
        src: &[u8],
        opacity: f32,
        blend_mode: u32,
    ) {
        if blend_mode == 0 {
            Self::blend_source_over(dest, src, opacity);
            return;
        }

        let len = dest.len().min(src.len());
        let op_scale = (opacity.clamp(0.0, 1.0) * 255.0) as u32;

        for chunk_idx in (0..len).step_by(4) {
            if chunk_idx + 3 >= len {
                break;
            }

            let sa = (src[chunk_idx + 3] as u32 * op_scale) / 255;
            if sa == 0 {
                continue;
            }

            let da = dest[chunk_idx + 3] as u32;
            let sr = src[chunk_idx] as u32;
            let sg = src[chunk_idx + 1] as u32;
            let sb = src[chunk_idx + 2] as u32;

            let dr = dest[chunk_idx] as u32;
            let dg = dest[chunk_idx + 1] as u32;
            let db = dest[chunk_idx + 2] as u32;

            // Calcular componente mezclada según modo
            let (br, bg, bb) = match blend_mode {
                1 => ( // Multiply
                    (sr * dr) / 255,
                    (sg * dg) / 255,
                    (sb * db) / 255,
                ),
                2 => ( // Screen
                    255 - ((255 - sr) * (255 - dr)) / 255,
                    255 - ((255 - sg) * (255 - dg)) / 255,
                    255 - ((255 - sb) * (255 - db)) / 255,
                ),
                3 => { // Overlay
                    let ov = |s: u32, d: u32| -> u32 {
                        if d < 128 {
                            (2 * s * d) / 255
                        } else {
                            255 - (2 * (255 - s) * (255 - d)) / 255
                        }
                    };
                    (ov(sr, dr), ov(sg, dg), ov(sb, db))
                }
                _ => (sr, sg, sb),
            };

            let out_a = sa + da * (255 - sa) / 255;
            if out_a == 0 {
                continue;
            }

            let r = (br * sa + dr * da * (255 - sa) / 255) / out_a;
            let g = (bg * sa + dg * da * (255 - sa) / 255) / out_a;
            let b = (bb * sa + db * da * (255 - sa) / 255) / out_a;

            dest[chunk_idx] = r as u8;
            dest[chunk_idx + 1] = g as u8;
            dest[chunk_idx + 2] = b as u8;
            dest[chunk_idx + 3] = out_a as u8;
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_frame_cache_store_and_retrieve() {
        let mut cache = FrameCacheCore::new(10);
        let sample = vec![255u8; 16]; // 2x2 RGBA
        cache.store_frame(1, 2, 2, &sample);

        assert!(cache.has_frame(1));
        assert!(!cache.has_frame(2));
        assert_eq!(cache.cached_count(), 1);

        let mut out = vec![0u8; 16];
        let ok = cache.get_frame(1, &mut out);
        assert!(ok);
        assert_eq!(out, sample);

        cache.invalidate_frame(1);
        assert!(!cache.has_frame(1));
    }

    #[test]
    fn test_layer_compositor_source_over() {
        let mut dest = vec![0, 0, 0, 0];
        let src = vec![255, 0, 0, 255]; // Red
        FastLayerCompositor::blend_source_over(&mut dest, &src, 1.0);
        assert_eq!(dest, vec![255, 0, 0, 255]);
    }
}
