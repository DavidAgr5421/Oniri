use wasm_bindgen::prelude::*;

/// Codificador GIF89a en Rust + WASM con cuantización 5-bit O(1) y tabla LZW plana sin asignaciones
#[wasm_bindgen]
pub struct GifEncoderCore {
    palette_rgb: Vec<u8>,
    indexed_pixels: Vec<u8>,
    transparent_index: i32,
    lzw_stream: Vec<u8>,
    /// Tabla plana LZW: 4096 prefijos * 256 bytes = 1,048,576 entradas (u16::MAX = vacío)
    lzw_table: Vec<u16>,
    /// Tabla rápida de colores 5-bit (32 * 32 * 32 = 32768 entradas, -1 = vacío)
    color_lut: Vec<i16>,
}

#[wasm_bindgen]
impl GifEncoderCore {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            palette_rgb: Vec::with_capacity(256 * 3),
            indexed_pixels: Vec::new(),
            transparent_index: -1,
            lzw_stream: Vec::with_capacity(65536),
            lzw_table: vec![u16::MAX; 4096 * 256],
            color_lut: vec![-1; 32768],
        }
    }

    /// Cuantiza un frame RGBA8 a paleta de hasta 255 colores + índice transparente en O(N)
    pub fn quantize_rgba(&mut self, rgba: &[u8], width: u32, height: u32) -> i32 {
        let total = (width as usize) * (height as usize);
        if total == 0 || rgba.len() < total * 4 {
            self.palette_rgb.clear();
            self.indexed_pixels.clear();
            self.transparent_index = -1;
            return -1;
        }

        self.palette_rgb.clear();
        self.indexed_pixels.resize(total, 0);
        self.color_lut.fill(-1);
        self.transparent_index = -1;

        for i in 0..total {
            let idx = i * 4;
            let a = rgba[idx + 3];
            if a < 64 {
                if self.transparent_index == -1 {
                    self.transparent_index = (self.palette_rgb.len() / 3) as i32;
                    self.palette_rgb.extend_from_slice(&[0, 0, 0]);
                }
                self.indexed_pixels[i] = self.transparent_index as u8;
                continue;
            }

            let r = rgba[idx];
            let g = rgba[idx + 1];
            let b = rgba[idx + 2];
            let key = (((r as usize) >> 3) << 10) | (((g as usize) >> 3) << 5) | ((b as usize) >> 3);

            let cached = self.color_lut[key];
            let pal_idx = if cached >= 0 {
                cached as u8
            } else {
                let cur_colors = self.palette_rgb.len() / 3;
                if cur_colors < 255 {
                    let new_idx = cur_colors as u8;
                    self.palette_rgb.extend_from_slice(&[r, g, b]);
                    self.color_lut[key] = new_idx as i16;
                    new_idx
                } else {
                    let nearest = self.find_closest_color(r, g, b);
                    self.color_lut[key] = nearest as i16;
                    nearest
                }
            };

            self.indexed_pixels[i] = pal_idx;
        }

        if self.palette_rgb.is_empty() {
            self.palette_rgb.extend_from_slice(&[0, 0, 0]);
        }

        self.transparent_index
    }

    /// Comprime un buffer de píxeles indexados mediante LZW variable de GIF89a en `lzw_stream`
    pub fn encode_lzw_frame(&mut self, indexed: &[u8], color_depth: u8) -> usize {
        self.lzw_stream.clear();
        if indexed.is_empty() {
            return 0;
        }

        let init_code_size = color_depth.max(2) as u32;
        self.lzw_stream.push(init_code_size as u8);

        let clear_code = 1u32 << init_code_size;
        let eof_code = clear_code + 1;

        let mut code_size = init_code_size + 1;
        let mut code_mask = (1u32 << code_size) - 1;
        let mut next_code = eof_code + 1;

        self.lzw_table.fill(u16::MAX);

        let mut accumulator = 0u32;
        let mut bits_accumulated = 0u32;
        let mut sub_block = [0u8; 255];
        let mut sub_len = 0usize;

        let mut emit_code = |code: u32,
                             stream: &mut Vec<u8>,
                             table: &mut [u16],
                             code_size: &mut u32,
                             code_mask: &mut u32,
                             next_code: &mut u32| {
            accumulator |= (code & *code_mask) << bits_accumulated;
            bits_accumulated += *code_size;

            while bits_accumulated >= 8 {
                sub_block[sub_len] = (accumulator & 0xff) as u8;
                sub_len += 1;
                accumulator >>= 8;
                bits_accumulated -= 8;
                if sub_len >= 254 {
                    stream.push(sub_len as u8);
                    stream.extend_from_slice(&sub_block[..sub_len]);
                    sub_len = 0;
                }
            }

            if code == clear_code {
                table.fill(u16::MAX);
                *code_size = init_code_size + 1;
                *code_mask = (1u32 << *code_size) - 1;
                *next_code = eof_code + 1;
            } else if *next_code < 4096 {
                if *next_code > *code_mask && *code_size < 12 {
                    *code_size += 1;
                    *code_mask = (1u32 << *code_size) - 1;
                }
                *next_code += 1;
            }
        };

        emit_code(
            clear_code,
            &mut self.lzw_stream,
            &mut self.lzw_table,
            &mut code_size,
            &mut code_mask,
            &mut next_code,
        );

        let mut prefix = indexed[0] as u32;
        for &k in &indexed[1..] {
            let table_idx = ((prefix as usize) << 8) | (k as usize);
            let entry = self.lzw_table[table_idx];
            if entry != u16::MAX {
                prefix = entry as u32;
            } else {
                emit_code(
                    prefix,
                    &mut self.lzw_stream,
                    &mut self.lzw_table,
                    &mut code_size,
                    &mut code_mask,
                    &mut next_code,
                );
                if next_code >= 4096 {
                    emit_code(
                        clear_code,
                        &mut self.lzw_stream,
                        &mut self.lzw_table,
                        &mut code_size,
                        &mut code_mask,
                        &mut next_code,
                    );
                } else {
                    self.lzw_table[table_idx] = (next_code - 1) as u16;
                }
                prefix = k as u32;
            }
        }

        emit_code(
            prefix,
            &mut self.lzw_stream,
            &mut self.lzw_table,
            &mut code_size,
            &mut code_mask,
            &mut next_code,
        );
        emit_code(
            eof_code,
            &mut self.lzw_stream,
            &mut self.lzw_table,
            &mut code_size,
            &mut code_mask,
            &mut next_code,
        );

        if bits_accumulated > 0 {
            sub_block[sub_len] = (accumulator & 0xff) as u8;
            sub_len += 1;
        }
        if sub_len > 0 {
            self.lzw_stream.push(sub_len as u8);
            self.lzw_stream.extend_from_slice(&sub_block[..sub_len]);
        }
        self.lzw_stream.push(0x00);

        self.lzw_stream.len()
    }

    pub fn get_palette_ptr(&self) -> *const u8 {
        self.palette_rgb.as_ptr()
    }

    pub fn get_palette_len(&self) -> usize {
        self.palette_rgb.len()
    }

    pub fn get_indexed_ptr(&self) -> *const u8 {
        self.indexed_pixels.as_ptr()
    }

    pub fn get_indexed_len(&self) -> usize {
        self.indexed_pixels.len()
    }

    pub fn get_lzw_ptr(&self) -> *const u8 {
        self.lzw_stream.as_ptr()
    }

    pub fn get_lzw_len(&self) -> usize {
        self.lzw_stream.len()
    }

    fn find_closest_color(&self, r: u8, g: u8, b: u8) -> u8 {
        let count = self.palette_rgb.len() / 3;
        let mut best_dist = i32::MAX;
        let mut best_idx = 0u8;
        let ri = r as i32;
        let gi = g as i32;
        let bi = b as i32;

        for i in 0..count {
            if (i as i32) == self.transparent_index {
                continue;
            }
            let p = i * 3;
            let dr = ri - (self.palette_rgb[p] as i32);
            let dg = gi - (self.palette_rgb[p + 1] as i32);
            let db = bi - (self.palette_rgb[p + 2] as i32);
            let dist = dr * dr + dg * dg + db * db;
            if dist < best_dist {
                best_dist = dist;
                best_idx = i as u8;
                if dist == 0 {
                    break;
                }
            }
        }
        best_idx
    }
}
