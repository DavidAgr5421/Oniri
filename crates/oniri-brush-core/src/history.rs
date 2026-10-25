use wasm_bindgen::prelude::*;

const QOI_OP_INDEX: u8 = 0x00;
const QOI_OP_DIFF: u8 = 0x40;
const QOI_OP_LUMA: u8 = 0x80;
const QOI_OP_RUN: u8 = 0xc0;
const QOI_OP_RGB: u8 = 0xfe;
const QOI_OP_RGBA: u8 = 0xff;
const QOI_MASK_2: u8 = 0xc0;

#[inline(always)]
fn color_hash(r: u8, g: u8, b: u8, a: u8) -> usize {
    ((r as usize * 3 + g as usize * 5 + b as usize * 7 + a as usize * 11) % 64)
}

/// Motor nativo de compresión y descompresión ultrarrápida QOI para el historial de Deshacer/Rehacer
#[wasm_bindgen]
pub struct HistoryCompressorCore {
    buffer: Vec<u8>,
}

#[wasm_bindgen]
impl HistoryCompressorCore {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            buffer: Vec::with_capacity(64 * 1024),
        }
    }

    /// Comprime un búfer RGBA de tamaño width x height en formato QOI ultra-rápido
    pub fn compress_rgba(&mut self, data: &[u8], width: u32, height: u32) -> usize {
        let total_pixels = (width * height) as usize;
        if data.len() < total_pixels * 4 {
            return 0;
        }

        self.buffer.clear();
        self.buffer.reserve(total_pixels * 4 + 14 + 8);

        // Header QOI
        self.buffer.extend_from_slice(b"qoif");
        self.buffer.extend_from_slice(&width.to_be_bytes());
        self.buffer.extend_from_slice(&height.to_be_bytes());
        self.buffer.push(4); // RGBA
        self.buffer.push(0); // sRGB

        let mut index = [[0u8; 4]; 64];
        let mut px_prev = [0u8, 0u8, 0u8, 255u8];
        let mut run: u8 = 0;

        for i in 0..total_pixels {
            let offset = i * 4;
            let px = [
                data[offset],
                data[offset + 1],
                data[offset + 2],
                data[offset + 3],
            ];

            if px == px_prev {
                run += 1;
                if run == 62 {
                    self.buffer.push(QOI_OP_RUN | (run - 1));
                    run = 0;
                }
            } else {
                if run > 0 {
                    self.buffer.push(QOI_OP_RUN | (run - 1));
                    run = 0;
                }

                let hash = color_hash(px[0], px[1], px[2], px[3]);
                if index[hash] == px {
                    self.buffer.push(QOI_OP_INDEX | (hash as u8));
                } else {
                    index[hash] = px;

                    if px[3] == px_prev[3] {
                        let vr = px[0].wrapping_sub(px_prev[0]) as i8;
                        let vg = px[1].wrapping_sub(px_prev[1]) as i8;
                        let vb = px[2].wrapping_sub(px_prev[2]) as i8;

                        let vg_r = vr.wrapping_sub(vg);
                        let vg_b = vb.wrapping_sub(vg);

                        if vr >= -2 && vr <= 1 && vg >= -2 && vg <= 1 && vb >= -2 && vb <= 1 {
                            self.buffer.push(
                                QOI_OP_DIFF
                                    | (((vr + 2) as u8) << 4)
                                    | (((vg + 2) as u8) << 2)
                                    | ((vb + 2) as u8),
                            );
                        } else if vg_r >= -8 && vg_r <= 7 && vg >= -32 && vg <= 31 && vg_b >= -8 && vg_b <= 7 {
                            self.buffer.push(QOI_OP_LUMA | ((vg + 32) as u8));
                            self.buffer.push((((vg_r + 8) as u8) << 4) | ((vg_b + 8) as u8));
                        } else {
                            self.buffer.push(QOI_OP_RGB);
                            self.buffer.push(px[0]);
                            self.buffer.push(px[1]);
                            self.buffer.push(px[2]);
                        }
                    } else {
                        self.buffer.push(QOI_OP_RGBA);
                        self.buffer.push(px[0]);
                        self.buffer.push(px[1]);
                        self.buffer.push(px[2]);
                        self.buffer.push(px[3]);
                    }
                }
            }

            px_prev = px;
        }

        if run > 0 {
            self.buffer.push(QOI_OP_RUN | (run - 1));
        }

        // QOI end padding: 7 ceros + 1
        self.buffer.extend_from_slice(&[0, 0, 0, 0, 0, 0, 0, 1]);
        self.buffer.len()
    }

    /// Descomprime un búfer QOI en RGBA crudo
    pub fn decompress_qoi(&mut self, bytes: &[u8], width: u32, height: u32) -> usize {
        let total_pixels = (width * height) as usize;
        let expected_len = total_pixels * 4;
        self.buffer.clear();
        self.buffer.resize(expected_len, 0);

        if bytes.len() < 14 + 8 || &bytes[0..4] != b"qoif" {
            return 0;
        }

        let mut index = [[0u8; 4]; 64];
        let mut px = [0u8, 0u8, 0u8, 255u8];
        let mut px_idx = 0;
        let mut p = 14;
        let end = bytes.len() - 8;

        while p < end && px_idx < total_pixels {
            let b1 = bytes[p];
            p += 1;

            if b1 == QOI_OP_RGB {
                px[0] = bytes[p];
                px[1] = bytes[p + 1];
                px[2] = bytes[p + 2];
                p += 3;
            } else if b1 == QOI_OP_RGBA {
                px[0] = bytes[p];
                px[1] = bytes[p + 1];
                px[2] = bytes[p + 2];
                px[3] = bytes[p + 3];
                p += 4;
            } else if (b1 & QOI_MASK_2) == QOI_OP_INDEX {
                px = index[(b1 & 0x3f) as usize];
            } else if (b1 & QOI_MASK_2) == QOI_OP_DIFF {
                px[0] = px[0].wrapping_add(((b1 >> 4) & 0x03).wrapping_sub(2));
                px[1] = px[1].wrapping_add(((b1 >> 2) & 0x03).wrapping_sub(2));
                px[2] = px[2].wrapping_add((b1 & 0x03).wrapping_sub(2));
            } else if (b1 & QOI_MASK_2) == QOI_OP_LUMA {
                let b2 = bytes[p];
                p += 1;
                let vg = (b1 & 0x3f).wrapping_sub(32);
                px[0] = px[0].wrapping_add(vg.wrapping_add((b2 >> 4).wrapping_sub(8)));
                px[1] = px[1].wrapping_add(vg);
                px[2] = px[2].wrapping_add(vg.wrapping_add((b2 & 0x0f).wrapping_sub(8)));
            } else if (b1 & QOI_MASK_2) == QOI_OP_RUN {
                let run = (b1 & 0x3f) as usize + 1;
                for _ in 0..run {
                    let off = px_idx * 4;
                    self.buffer[off..off + 4].copy_from_slice(&px);
                    px_idx += 1;
                }
                continue;
            }

            let hash = color_hash(px[0], px[1], px[2], px[3]);
            index[hash] = px;

            let off = px_idx * 4;
            self.buffer[off..off + 4].copy_from_slice(&px);
            px_idx += 1;
        }

        self.buffer.len()
    }

    pub fn get_buffer_ptr(&self) -> *const u8 {
        self.buffer.as_ptr()
    }

    pub fn get_buffer_len(&self) -> usize {
        self.buffer.len()
    }
}
