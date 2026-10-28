use wasm_bindgen::prelude::*;

/// Motor nativo de muestreo cromático ultra-rápido para mezcla de pintura (Óleo / Acuarela / Smudge)
#[wasm_bindgen]
pub struct ColorSamplerCore;

#[wasm_bindgen]
impl ColorSamplerCore {
    /// Muestrea un punto (x, y) de un buffer RGBA plano
    /// Retorna un vector con [r, g, b, alpha_norm] o vacío si es totalmente transparente
    pub fn sample_rgba(
        buffer: &[u8],
        width: u32,
        height: u32,
        x: f32,
        y: f32,
    ) -> Vec<f32> {
        let ix = x.floor() as i32;
        let iy = y.floor() as i32;

        if ix < 0 || ix >= (width as i32) || iy < 0 || iy >= (height as i32) {
            return Vec::new();
        }

        let idx = ((iy as usize) * (width as usize) + (ix as usize)) * 4;
        if idx + 3 >= buffer.len() {
            return Vec::new();
        }

        let a = buffer[idx + 3];
        if a < 5 {
            return Vec::new();
        }

        let r = buffer[idx] as f32;
        let g = buffer[idx + 1] as f32;
        let b = buffer[idx + 2] as f32;
        let alpha_norm = a as f32 / 255.0;

        vec![r, g, b, alpha_norm]
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sample_rgba() {
        let mut buf = vec![0u8; 16]; // 2x2
        // Pixel at (1, 0): RGBA(200, 100, 50, 255)
        let idx = (0 * 2 + 1) * 4;
        buf[idx] = 200;
        buf[idx + 1] = 100;
        buf[idx + 2] = 50;
        buf[idx + 3] = 255;

        let sampled = ColorSamplerCore::sample_rgba(&buf, 2, 2, 1.2, 0.1);
        assert_eq!(sampled.len(), 4);
        assert_eq!(sampled[0], 200.0);
        assert_eq!(sampled[1], 100.0);
        assert_eq!(sampled[2], 50.0);
        assert_eq!(sampled[3], 1.0);

        // Outside or transparent
        let empty = ColorSamplerCore::sample_rgba(&buf, 2, 2, 0.0, 0.0);
        assert!(empty.is_empty());
    }
}
