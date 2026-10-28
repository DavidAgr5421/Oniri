use eframe::egui;
use oniri_brush_core::StrokeStabilizerCore;

/// Presets de pincel estándar optimizados para ilustración y animación
#[derive(Clone, Copy, PartialEq, Eq, Debug, serde::Serialize, serde::Deserialize)]
pub enum BrushPreset {
    /// Plumilla G: trazo entintado nítido, alta sensibilidad de presión y remate cónico
    GPen,
    /// Plumilla Maru: trazo ultrafino para detalles, tramas y dibujo minucioso
    MaruPen,
    /// Plumilla Texturizada (Gasa-gasa): mordida orgánica en bordes para manga y cómic
    TexturedPen,
    /// Plumilla Caligráfica: cincel a 45° para caligrafía, kanji y rotulación
    Calligraphy,
    /// Lápiz Grafito: borde difuminado con diente de grano de papel y opacidad por presión
    Pencil,
    /// Aerógrafo: rocío suave Gaussiano para sombras, degradados y rubor
    Airbrush,
    /// Borrador Duro: borrado nítido al 100%
    HardEraser,
    /// Borrador Suave: borrado gradual difuminado
    SoftEraser,
}

impl BrushPreset {
    pub fn name(&self) -> &'static str {
        match self {
            Self::GPen => "Plumilla G (Inking)",
            Self::MaruPen => "Plumilla Maru (Detalle)",
            Self::TexturedPen => "Plumilla Rugosa (Gasa)",
            Self::Calligraphy => "Caligráfico (Cincel 45°)",
            Self::Pencil => "Lápiz Grafito (HB)",
            Self::Airbrush => "Aerógrafo Suave",
            Self::HardEraser => "Borrador Duro",
            Self::SoftEraser => "Borrador Suave",
        }
    }

    pub fn icon(&self) -> &'static str {
        match self {
            Self::GPen => "✒",
            Self::MaruPen => "🖋",
            Self::TexturedPen => "🖌",
            Self::Calligraphy => "🪶",
            Self::Pencil => "✏",
            Self::Airbrush => "💨",
            Self::HardEraser => "🧼",
            Self::SoftEraser => "🧽",
        }
    }

    pub fn is_eraser(&self) -> bool {
        matches!(self, Self::HardEraser | Self::SoftEraser)
    }
}

/// Configuración completa de parámetros para un pincel nativo
#[derive(Clone, Debug)]
pub struct BrushSettings {
    pub preset: BrushPreset,
    pub size: f32,
    pub min_size_ratio: f32,
    pub hardness: f32,
    pub flow: f32,
    pub opacity: f32,
    pub spacing: f32,
    pub stabilization: f32,
    pub pressure_size: bool,
    pub pressure_flow: bool,
    pub pressure_gamma: f32,
    pub taper_start: f32,
}

impl Default for BrushSettings {
    fn default() -> Self {
        Self::from_preset(BrushPreset::GPen)
    }
}

impl BrushSettings {
    pub fn from_preset(preset: BrushPreset) -> Self {
        match preset {
            BrushPreset::GPen => Self {
                preset,
                size: 12.0,
                min_size_ratio: 0.12,
                hardness: 1.0,
                flow: 1.0,
                opacity: 1.0,
                spacing: 0.08,
                stabilization: 12.0,
                pressure_size: true,
                pressure_flow: false,
                pressure_gamma: 1.0,
                taper_start: 25.0,
            },
            BrushPreset::MaruPen => Self {
                preset,
                size: 5.0,
                min_size_ratio: 0.20,
                hardness: 1.0,
                flow: 1.0,
                opacity: 1.0,
                spacing: 0.07,
                stabilization: 8.0,
                pressure_size: true,
                pressure_flow: false,
                pressure_gamma: 1.1,
                taper_start: 35.0,
            },
            BrushPreset::TexturedPen => Self {
                preset,
                size: 14.0,
                min_size_ratio: 0.18,
                hardness: 0.95,
                flow: 1.0,
                opacity: 1.0,
                spacing: 0.09,
                stabilization: 10.0,
                pressure_size: true,
                pressure_flow: false,
                pressure_gamma: 1.0,
                taper_start: 20.0,
            },
            BrushPreset::Calligraphy => Self {
                preset,
                size: 20.0,
                min_size_ratio: 0.22,
                hardness: 1.0,
                flow: 1.0,
                opacity: 1.0,
                spacing: 0.06,
                stabilization: 10.0,
                pressure_size: true,
                pressure_flow: false,
                pressure_gamma: 1.0,
                taper_start: 15.0,
            },
            BrushPreset::Pencil => Self {
                preset,
                size: 9.0,
                min_size_ratio: 0.35,
                hardness: 0.55,
                flow: 0.60,
                opacity: 0.85,
                spacing: 0.12,
                stabilization: 8.0,
                pressure_size: true,
                pressure_flow: true,
                pressure_gamma: 0.92,
                taper_start: 15.0,
            },
            BrushPreset::Airbrush => Self {
                preset,
                size: 48.0,
                min_size_ratio: 0.60,
                hardness: 0.15,
                flow: 0.25,
                opacity: 0.45,
                spacing: 0.08,
                stabilization: 5.0,
                pressure_size: false,
                pressure_flow: true,
                pressure_gamma: 1.25,
                taper_start: 0.0,
            },
            BrushPreset::HardEraser => Self {
                preset,
                size: 24.0,
                min_size_ratio: 0.20,
                hardness: 1.0,
                flow: 1.0,
                opacity: 1.0,
                spacing: 0.10,
                stabilization: 0.0,
                pressure_size: true,
                pressure_flow: false,
                pressure_gamma: 1.0,
                taper_start: 0.0,
            },
            BrushPreset::SoftEraser => Self {
                preset,
                size: 36.0,
                min_size_ratio: 0.30,
                hardness: 0.35,
                flow: 0.50,
                opacity: 0.70,
                spacing: 0.12,
                stabilization: 0.0,
                pressure_size: true,
                pressure_flow: true,
                pressure_gamma: 1.0,
                taper_start: 0.0,
            },
        }
    }

    /// Evalúa la respuesta de presión del lápiz/stylus con punta cónica suave al final
    #[inline(always)]
    pub fn evaluate_pressure(&self, raw_pressure: f32) -> f32 {
        let p = raw_pressure.clamp(0.0, 1.0);
        if p <= 0.001 {
            return 0.0;
        }
        if p >= 0.999 {
            return 1.0;
        }

        // Taper de despegue de la punta física
        let adjusted = if p < 0.22 {
            let t = p / 0.22;
            p * (0.35 + 0.65 * t)
        } else {
            p
        };

        adjusted.powf(self.pressure_gamma.max(0.1))
    }

    /// Calcula el diámetro del dab según la presión y distancia recorrida
    #[inline(always)]
    pub fn evaluate_diameter(&self, pressure: f32, distance: f32) -> f32 {
        let p = self.evaluate_pressure(pressure);
        let size_factor = if self.pressure_size {
            self.min_size_ratio + (1.0 - self.min_size_ratio) * p
        } else {
            1.0
        };

        let taper_factor = if self.taper_start > 0.0 {
            let t = (distance / self.taper_start).clamp(0.0, 1.0);
            t * t * (3.0 - 2.0 * t)
        } else {
            1.0
        };

        (self.size * size_factor * taper_factor).max(0.5)
    }

    /// Calcula la opacidad / flujo efectivo para el dab
    #[inline(always)]
    pub fn evaluate_alpha(&self, pressure: f32) -> f32 {
        let p = self.evaluate_pressure(pressure);
        let flow_factor = if self.pressure_flow {
            self.flow * p.powf(1.15)
        } else {
            self.flow
        };

        (self.opacity * flow_factor).clamp(0.01, 1.0)
    }
}

/// Gestor de sesión de trazo estabilizado
pub struct StrokeTracker {
    pub stabilizer: StrokeStabilizerCore,
    pub stroke_distance: f32,
    pub last_pos: Option<egui::Pos2>,
    pub last_pressure: f32,
}

impl Default for StrokeTracker {
    fn default() -> Self {
        Self {
            stabilizer: StrokeStabilizerCore::new(),
            stroke_distance: 0.0,
            last_pos: None,
            last_pressure: 1.0,
        }
    }
}

impl StrokeTracker {
    pub fn begin(&mut self, pos: egui::Pos2, pressure: f32) {
        self.stabilizer.begin_stroke(pos.x, pos.y, pressure);
        self.stroke_distance = 0.0;
        self.last_pos = Some(pos);
        self.last_pressure = pressure;
    }

    pub fn reset(&mut self) {
        self.last_pos = None;
        self.stroke_distance = 0.0;
    }
}

/// Renderiza un dab nativo de alta velocidad directamente en el búfer de píxeles
pub fn stamp_preset_dab(
    buffer: &mut [u8],
    doc_w: u32,
    doc_h: u32,
    cx: f32,
    cy: f32,
    diameter: f32,
    alpha_mul: f32,
    color: [u8; 4],
    preset: BrushPreset,
) -> Option<[u32; 4]> {
    let radius = (diameter * 0.5).max(0.25);
    let pad = (radius + 2.0).ceil();
    let min_x = (cx - pad).floor().max(0.0) as u32;
    let max_x = (cx + pad).ceil().min(doc_w as f32 - 1.0) as u32;
    let min_y = (cy - pad).floor().max(0.0) as u32;
    let max_y = (cy + pad).ceil().min(doc_h as f32 - 1.0) as u32;

    if min_x > max_x || min_y > max_y {
        return None;
    }

    let r_sq = radius * radius;
    let [sr, sg, sb, sa] = color;
    let dw = doc_w as usize;
    let is_eraser = preset.is_eraser();

    for y in min_y..=max_y {
        let dy = y as f32 - cy;
        let dy_sq = dy * dy;
        let row_start = (y as usize * dw) * 4;

        for x in min_x..=max_x {
            let dx = x as f32 - cx;
            let dist_sq = dx * dx + dy_sq;

            let coverage = match preset {
                BrushPreset::GPen | BrushPreset::MaruPen => {
                    if dist_sq <= r_sq + radius {
                        let dist = dist_sq.sqrt();
                        ((radius - dist) + 0.75).clamp(0.0, 1.0)
                    } else {
                        0.0
                    }
                }
                BrushPreset::TexturedPen => {
                    if dist_sq <= (radius + 1.5) * (radius + 1.5) {
                        let dist = dist_sq.sqrt();
                        let angle = dy.atan2(dx);
                        let jitter = (angle * 7.0).sin() * (radius * 0.22).min(2.0);
                        ((radius + jitter - dist) + 0.65).clamp(0.0, 1.0)
                    } else {
                        0.0
                    }
                }
                BrushPreset::Calligraphy => {
                    // Cincel rotado 45°
                    let rx = (dx + dy) * 0.70710678;
                    let ry = (-dx + dy) * 0.70710678;
                    let half_w = radius;
                    let half_h = (radius * 0.28).max(0.8);
                    let dist_x = rx.abs() - half_w;
                    let dist_y = ry.abs() - half_h;
                    let sd = dist_x.max(dist_y);
                    (0.75 - sd).clamp(0.0, 1.0)
                }
                BrushPreset::Pencil => {
                    if dist_sq <= r_sq {
                        let dist = dist_sq.sqrt();
                        let norm = dist / radius;
                        let falloff = 1.0 - norm * norm;
                        let grain = (((x * 73 + y * 179) & 0xFF) as f32) / 255.0;
                        (falloff * (0.65 + 0.35 * grain)).clamp(0.0, 1.0)
                    } else {
                        0.0
                    }
                }
                BrushPreset::Airbrush => {
                    let ratio = dist_sq / r_sq.max(1.0);
                    if ratio <= 2.5 {
                        (-2.5 * ratio).exp().clamp(0.0, 1.0)
                    } else {
                        0.0
                    }
                }
                BrushPreset::HardEraser => {
                    if dist_sq <= r_sq + radius {
                        let dist = dist_sq.sqrt();
                        ((radius - dist) + 0.8).clamp(0.0, 1.0)
                    } else {
                        0.0
                    }
                }
                BrushPreset::SoftEraser => {
                    if dist_sq <= r_sq {
                        let dist = dist_sq.sqrt();
                        let norm = dist / radius;
                        (1.0 - norm).powi(2)
                    } else {
                        0.0
                    }
                }
            };

            if coverage <= 0.001 {
                continue;
            }

            let idx = row_start + (x as usize) * 4;

            if is_eraser {
                let erase_amount = (coverage * alpha_mul * 255.0) as u32;
                let cur_a = buffer[idx + 3] as u32;
                let new_a = cur_a.saturating_sub(erase_amount);
                buffer[idx + 3] = new_a as u8;
                if new_a == 0 {
                    buffer[idx] = 0;
                    buffer[idx + 1] = 0;
                    buffer[idx + 2] = 0;
                }
            } else {
                let alpha = ((sa as f32) * coverage * alpha_mul) as u32;
                if alpha > 0 {
                    let da = buffer[idx + 3] as u32;
                    let out_a = alpha + da * (255 - alpha) / 255;
                    if out_a > 0 {
                        let dr = buffer[idx] as u32;
                        let dg = buffer[idx + 1] as u32;
                        let db = buffer[idx + 2] as u32;

                        buffer[idx] =
                            ((sr as u32 * alpha + dr * da * (255 - alpha) / 255) / out_a) as u8;
                        buffer[idx + 1] =
                            ((sg as u32 * alpha + dg * da * (255 - alpha) / 255) / out_a) as u8;
                        buffer[idx + 2] =
                            ((sb as u32 * alpha + db * da * (255 - alpha) / 255) / out_a) as u8;
                        buffer[idx + 3] = out_a as u8;
                    }
                }
            }
        }
    }

    Some([min_x, min_y, max_x + 1, max_y + 1])
}

/// Dibuja un segmento continuo interpolando sellos con espaciado matemático exacto
pub fn stamp_stroke_segment_advanced(
    buffer: &mut [u8],
    doc_w: u32,
    doc_h: u32,
    p0: egui::Pos2,
    p1: egui::Pos2,
    press0: f32,
    press1: f32,
    stroke_dist: &mut f32,
    settings: &BrushSettings,
    color: [u8; 4],
) -> Option<[u32; 4]> {
    let dist = p0.distance(p1);
    let d0 = settings.evaluate_diameter(press0, *stroke_dist);
    let d1 = settings.evaluate_diameter(press1, *stroke_dist + dist);
    let avg_diam = (d0 + d1) * 0.5;

    let spacing = settings.spacing.clamp(0.04, 0.50);
    let step = (avg_diam * spacing).max(0.75);
    let count = (dist / step).ceil().max(1.0) as usize;

    let mut dirty: Option<[u32; 4]> = None;

    for i in 0..=count {
        let t = i as f32 / count as f32;
        let pos = p0.lerp(p1, t);
        let cur_dist = *stroke_dist + dist * t;
        let cur_press = press0 + (press1 - press0) * t;

        let diam = settings.evaluate_diameter(cur_press, cur_dist);
        let alpha = settings.evaluate_alpha(cur_press);

        if let Some(r) = stamp_preset_dab(
            buffer,
            doc_w,
            doc_h,
            pos.x,
            pos.y,
            diam,
            alpha,
            color,
            settings.preset,
        ) {
            dirty = match dirty {
                None => Some(r),
                Some([min_x, min_y, max_x, max_y]) => {
                    Some([min_x.min(r[0]), min_y.min(r[1]), max_x.max(r[2]), max_y.max(r[3])])
                }
            };
        }
    }

    *stroke_dist += dist;
    dirty
}

/// Muestrea el color RGB en una coordenada del búfer (Cuentagotas)
pub fn sample_color_at(buffer: &[u8], doc_w: u32, doc_h: u32, x: f32, y: f32) -> Option<[f32; 3]> {
    let px = x.floor() as i32;
    let py = y.floor() as i32;
    if px >= 0 && px < doc_w as i32 && py >= 0 && py < doc_h as i32 {
        let idx = (py as usize * doc_w as usize + px as usize) * 4;
        let r = buffer[idx] as f32 / 255.0;
        let g = buffer[idx + 1] as f32 / 255.0;
        let b = buffer[idx + 2] as f32 / 255.0;
        Some([r, g, b])
    } else {
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_presets_evaluation() {
        let gpen = BrushSettings::from_preset(BrushPreset::GPen);
        let diam_high = gpen.evaluate_diameter(1.0, 50.0);
        let diam_low = gpen.evaluate_diameter(0.2, 50.0);
        assert!(diam_high > diam_low);
    }

    #[test]
    fn test_stamp_preset_dab() {
        let w = 64;
        let h = 64;
        let mut buffer = vec![0u8; (w * h * 4) as usize];

        let dirty = stamp_preset_dab(
            &mut buffer,
            w,
            h,
            32.0,
            32.0,
            12.0,
            1.0,
            [255, 0, 0, 255],
            BrushPreset::GPen,
        );
        assert!(dirty.is_some());

        let sampled = sample_color_at(&buffer, w, h, 32.0, 32.0).expect("Color");
        assert!(sampled[0] > 0.9);
    }
}
