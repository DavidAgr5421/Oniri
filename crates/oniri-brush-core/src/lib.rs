use wasm_bindgen::prelude::*;

pub mod bones;
pub mod clip_tiles;
pub mod color_blend;
pub mod fill;
pub mod gif;
pub mod selection;
pub mod stabilizer;
pub use bones::BoneSkinCore;
pub use clip_tiles::ClipTileCore;
pub use color_blend::ColorBlendCore;
pub use fill::SmartFillCore;
pub use gif::GifEncoderCore;
pub use selection::SelectionCore;
pub use stabilizer::StrokeStabilizerCore;

const MIN_STAMP_DIAMETER: f32 = 0.4;
const MIN_STAMP_STEP: f32 = 1.1;
const STAMP_GUARD: u32 = 20000;
const SPRAY_SCALE_BUCKETS: [f32; 6] = [0.45, 0.60, 0.75, 0.90, 1.05, 1.20];

#[cfg(feature = "console_error_panic_hook")]
#[wasm_bindgen]
pub fn init_engine_hooks() {
    console_error_panic_hook::set_once();
}

#[inline(always)]
fn clamp01(v: f32) -> f32 {
    if v < 0.0 {
        0.0
    } else if v > 1.0 {
        1.0
    } else {
        v
    }
}

/// Configuración completa de dinámica del pincel para el motor en Rust
#[wasm_bindgen]
#[derive(Clone, Copy, Debug)]
pub struct BrushDynamicsConfig {
    pub base_size: f32,
    pub min_size_ratio: f32,
    pub spacing_ratio: f32,
    pub pressure_size: bool,
    pub pressure_gamma: f32,
    pub taper_start: f32,
    pub velocity_size_enabled: bool,
    pub velocity_min_ratio: f32,
    pub velocity_curve: f32,
    pub random_size_ratio: f32,
    pub flow: f32,
    pub pressure_flow: bool,
    pub velocity_flow: bool,
    pub ink_mode_uniform: bool,
    pub ribbon: bool,
    pub follow_direction: bool,
    pub is_custom_tip: bool,
    /// 0 = circle, 1 = square, 2 = calligraphic
    pub tip_shape_code: u8,
    pub tip_angle_deg: f32,
    /// 0 = single, 1 = sequential, 2 = reverse, 3 = random
    pub tip_cycle_mode: u8,
    pub tip_count: u32,
    pub spray_enabled: bool,
    pub spray_density: u32,
    pub spray_radius: f32,
    pub is_rain_tip: bool,
    pub is_mouse: bool,
}

#[wasm_bindgen]
impl BrushDynamicsConfig {
    #[wasm_bindgen(constructor)]
    #[allow(clippy::too_many_arguments)]
    pub fn new(
        base_size: f32,
        min_size_ratio: f32,
        spacing_ratio: f32,
        pressure_size: bool,
        pressure_gamma: f32,
        taper_start: f32,
        velocity_size_enabled: bool,
        velocity_min_ratio: f32,
        velocity_curve: f32,
        random_size_ratio: f32,
        flow: f32,
        pressure_flow: bool,
        velocity_flow: bool,
        ink_mode_uniform: bool,
        ribbon: bool,
        follow_direction: bool,
        is_custom_tip: bool,
        tip_shape_code: u8,
        tip_angle_deg: f32,
        tip_cycle_mode: u8,
        tip_count: u32,
        spray_enabled: bool,
        spray_density: u32,
        spray_radius: f32,
        is_rain_tip: bool,
        is_mouse: bool,
    ) -> Self {
        Self {
            base_size: base_size.max(MIN_STAMP_DIAMETER),
            min_size_ratio: clamp01(min_size_ratio),
            spacing_ratio: spacing_ratio.max(0.01),
            pressure_size,
            pressure_gamma: pressure_gamma.max(0.1),
            taper_start: taper_start.max(0.0),
            velocity_size_enabled,
            velocity_min_ratio: velocity_min_ratio.clamp(0.05, 1.0),
            velocity_curve: velocity_curve.max(0.2),
            random_size_ratio: random_size_ratio.clamp(0.05, 1.0),
            flow: clamp01(flow),
            pressure_flow,
            velocity_flow,
            ink_mode_uniform,
            ribbon,
            follow_direction,
            is_custom_tip,
            tip_shape_code,
            tip_angle_deg,
            tip_cycle_mode,
            tip_count,
            spray_enabled,
            spray_density: spray_density.max(1),
            spray_radius,
            is_rain_tip,
            is_mouse,
        }
    }
}

#[derive(Clone, Copy, Debug, Default)]
struct StrokeCheckpoint {
    last_x: f32,
    last_y: f32,
    last_pressure: f32,
    last_angle_rad: f32,
    stroke_distance: f32,
    distance_since_stamp: f32,
    stamp_index: u32,
    rng_state: u32,
}

/// Motor de cálculo de trazos, dinámicas y rasterización SDF de sellos en Rust + WASM
#[wasm_bindgen]
pub struct StrokeEngineCore {
    config: BrushDynamicsConfig,
    last_x: f32,
    last_y: f32,
    last_pressure: f32,
    last_angle_rad: f32,
    stroke_distance: f32,
    distance_since_stamp: f32,
    stamp_index: u32,
    current_speed: f32,
    is_active: bool,
    rng_state: u32,
    checkpoint: StrokeCheckpoint,
    // Buffer plano de dabs (stride 7):
    // [x, y, diameter, pressure, alpha, angle_rad, tip_index]
    dabs_buffer: Vec<f32>,
    dirty_min_x: f32,
    dirty_min_y: f32,
    dirty_max_x: f32,
    dirty_max_y: f32,
    // Buffer reutilizable para generación de texturas SDF de punta de pincel (RGBA8)
    stamp_rgba_buffer: Vec<u8>,
}

#[wasm_bindgen]
impl StrokeEngineCore {
    #[wasm_bindgen(constructor)]
    pub fn new(config: BrushDynamicsConfig) -> Self {
        Self {
            config,
            last_x: 0.0,
            last_y: 0.0,
            last_pressure: 1.0,
            last_angle_rad: 0.0,
            stroke_distance: 0.0,
            distance_since_stamp: 0.0,
            stamp_index: 0,
            current_speed: 0.0,
            is_active: false,
            rng_state: 0x9E37_79B9,
            checkpoint: StrokeCheckpoint::default(),
            dabs_buffer: Vec::with_capacity(1400),
            dirty_min_x: f32::MAX,
            dirty_min_y: f32::MAX,
            dirty_max_x: f32::MIN,
            dirty_max_y: f32::MIN,
            stamp_rgba_buffer: Vec::with_capacity(128 * 128 * 4),
        }
    }

    pub fn update_config(&mut self, config: BrushDynamicsConfig) {
        self.config = config;
    }

    pub fn set_speed(&mut self, speed: f32) {
        self.current_speed = speed.max(0.0);
    }

    /// Calcula el diámetro exacto de un dab según curvas de presión, taper, velocidad y tamaño aleatorio
    pub fn evaluate_diameter(
        &self,
        pressure: f32,
        distance: f32,
        speed: f32,
        is_mouse: bool,
        stamp_index: u32,
    ) -> f32 {
        let s = &self.config;
        let p = clamp01(pressure);
        let curved_p = if s.pressure_size {
            p.powf(s.pressure_gamma.max(0.1))
        } else {
            1.0
        };

        let mut smooth_start = 1.0;
        if !is_mouse && s.taper_start > 0.0 {
            let t = (distance / s.taper_start).min(1.0).max(0.0);
            smooth_start = t * t * (3.0 - 2.0 * t);
        }

        let mut speed_factor = 1.0;
        if s.velocity_size_enabled && speed > 1.0 {
            let min_ratio = s.velocity_min_ratio.clamp(0.05, 1.0);
            let curve = s.velocity_curve.max(0.2);
            let normalized_speed = ((speed - 1.0) / 40.0).min(1.0).max(0.0);
            let v_factor = normalized_speed.powf(curve);
            speed_factor = 1.0 - (1.0 - min_ratio) * v_factor;
        }

        let mut random_factor = 1.0;
        if s.random_size_ratio < 0.995 {
            let clamped_min = s.random_size_ratio.clamp(0.05, 1.0);
            let dist_int = (distance * 3.7).floor() as i32 as u32;
            let seed = stamp_index
                .wrapping_add(1)
                .wrapping_mul(2654435761)
                ^ dist_int.wrapping_mul(2246822519);
            let rand01 = ((seed & 0xffff) as f32) / 65535.0;
            random_factor = clamped_min + (1.0 - clamped_min) * rand01;
        }

        let base_factor = s.min_size_ratio + (1.0 - s.min_size_ratio) * curved_p;
        let unload_scale = if !is_mouse && s.pressure_size && p < 0.22 {
            (p / 0.22).max(0.0).powf(0.85)
        } else {
            1.0
        };

        let factor = if is_mouse {
            let vel_part = if s.velocity_size_enabled {
                s.min_size_ratio + (1.0 - s.min_size_ratio) * speed_factor
            } else {
                1.0
            };
            vel_part * random_factor
        } else {
            base_factor * unload_scale * smooth_start * speed_factor * random_factor
        };

        (s.base_size * factor).max(MIN_STAMP_DIAMETER)
    }

    /// Calcula el alpha/flujo de un dab según modo de tinta ('uniform' vs 'accumulate') y velocidad
    pub fn evaluate_alpha(&self, pressure: f32, speed: f32) -> f32 {
        let s = &self.config;
        let p = clamp01(pressure);
        let mut flow = if s.pressure_flow {
            s.flow * p.powf(1.2)
        } else {
            s.flow
        };

        if s.velocity_flow && speed > 2.0 {
            let norm = ((speed - 2.0) / 45.0).min(1.0).max(0.0);
            flow *= 1.0 - norm * 0.30;
        }

        let raw = clamp01(flow);
        if s.ink_mode_uniform {
            return raw.max(0.04);
        }
        if raw >= 0.75 {
            return 1.0;
        }

        let exponent = (s.spacing_ratio * 4.0).max(0.35);
        let alpha = 1.0 - (1.0 - raw).powf(exponent);
        alpha.clamp(0.04, 1.0)
    }

    /// Inicia un trazo y genera el primer dab (o ráfaga de spray inicial) en el buffer zero-copy
    pub fn begin_stroke(&mut self, x: f32, y: f32, pressure: f32) -> usize {
        self.dabs_buffer.clear();
        self.reset_dirty_rect();

        self.last_x = x;
        self.last_y = y;
        self.last_pressure = pressure;
        self.last_angle_rad = self.compute_tip_angle_rad(0.0, 0.0);
        self.distance_since_stamp = 0.0;
        self.stroke_distance = 0.0;
        self.stamp_index = 0;
        self.current_speed = 0.0;
        self.is_active = true;
        self.rng_state = ((x.to_bits() ^ y.to_bits().rotate_left(13)) | 1) ^ 0xA5A5_5A5A;

        let first_tip = self.select_tip_index(0);
        self.stamp_index = 1;
        let alpha = self.evaluate_alpha(pressure, 0.0);

        if self.config.spray_enabled {
            let count = self.config.spray_density.max(1);
            let base_diam = self.evaluate_diameter(pressure, 0.0, 0.0, self.config.is_mouse, 0);
            let radius = if self.config.spray_radius > 0.0 {
                self.config.spray_radius
            } else {
                (base_diam * 1.5).max(12.0)
            };
            let base_angle = self.last_angle_rad;
            for _ in 0..count {
                let r = radius * self.next_rand01().sqrt();
                let th = self.next_rand01() * core::f32::consts::TAU;
                let sx = x + r * th.cos();
                let sy = y + r * th.sin();
                let bucket_idx = (self.next_u32() as usize) % SPRAY_SCALE_BUCKETS.len();
                let p_size = (base_diam * SPRAY_SCALE_BUCKETS[bucket_idx])
                    .round()
                    .max(MIN_STAMP_DIAMETER);
                let p_angle = self.spray_particle_angle(base_angle);
                self.push_dab(sx, sy, p_size, pressure, alpha, p_angle, first_tip);
            }
        } else {
            let diam = self.evaluate_diameter(pressure, 0.0, 0.0, self.config.is_mouse, 0);
            self.push_dab(x, y, diam, pressure, alpha, self.last_angle_rad, first_tip);
        }

        self.dabs_buffer.len() / 7
    }

    /// Interpola un segmento desde el último punto hasta (x1, y1, p1) con espaciado adaptativo
    pub fn add_point(&mut self, x1: f32, y1: f32, p1: f32) -> usize {
        if !self.is_active {
            return 0;
        }

        self.dabs_buffer.clear();
        self.reset_dirty_rect();

        let x0 = self.last_x;
        let y0 = self.last_y;
        let p0 = self.last_pressure;
        let dx = x1 - x0;
        let dy = y1 - y0;
        let segment = dx.hypot(dy);
        if segment <= 1e-5 {
            self.last_x = x1;
            self.last_y = y1;
            self.last_pressure = p1;
            return 0;
        }

        let spacing = if self.config.ribbon {
            self.config.spacing_ratio.clamp(0.20, 0.85)
        } else {
            self.config.spacing_ratio.clamp(0.06, 0.75)
        };
        let angle_rad = self.compute_tip_angle_rad(dx, dy);
        self.last_angle_rad = angle_rad;

        let mut pos = 0.0f32;
        let mut since = self.distance_since_stamp;
        let mut guard = 0u32;
        let speed = self.current_speed;
        let is_mouse = self.config.is_mouse;

        loop {
            guard += 1;
            if guard > STAMP_GUARD {
                break;
            }
            let u = pos / segment;
            let p_at = p0 + (p1 - p0) * u;
            let diam = self.evaluate_diameter(
                p_at,
                self.stroke_distance + pos,
                speed,
                is_mouse,
                self.stamp_index,
            );
            let min_step = (diam * 0.16).min(3.0).max(MIN_STAMP_STEP);
            let effective_spacing = spacing.max(0.09);
            let step = (diam * effective_spacing).max(min_step);
            let need = (step - since).max(0.0);
            if pos + need > segment {
                since += segment - pos;
                break;
            }
            pos += need;
            since = 0.0;
            let u2 = pos / segment;
            let p2 = p0 + (p1 - p0) * u2;

            let cur_stamp_idx = self.stamp_index;
            let active_tip = self.select_tip_index(cur_stamp_idx);
            self.stamp_index = self.stamp_index.wrapping_add(1);
            let alpha = self.evaluate_alpha(p2, speed);

            if self.config.spray_enabled {
                let count = self.config.spray_density.max(1);
                let base_diam = self.evaluate_diameter(
                    p2,
                    self.stroke_distance + pos,
                    speed,
                    is_mouse,
                    cur_stamp_idx,
                );
                let radius = if self.config.spray_radius > 0.0 {
                    self.config.spray_radius
                } else {
                    (base_diam * 1.5).max(12.0)
                };
                for _ in 0..count {
                    let r = radius * self.next_rand01().sqrt();
                    let th = self.next_rand01() * core::f32::consts::TAU;
                    let sx = x0 + dx * u2 + r * th.cos();
                    let sy = y0 + dy * u2 + r * th.sin();
                    let bucket_idx = (self.next_u32() as usize) % SPRAY_SCALE_BUCKETS.len();
                    let p_size = (base_diam * SPRAY_SCALE_BUCKETS[bucket_idx])
                        .round()
                        .max(MIN_STAMP_DIAMETER);
                    let p_angle = self.spray_particle_angle(angle_rad);
                    self.push_dab(sx, sy, p_size, p2, alpha, p_angle, active_tip);
                }
            } else {
                let stamp_angle = if self.config.is_custom_tip && !self.config.ribbon {
                    angle_rad + (pos * 0.7 + (self.stamp_index as f32)).sin() * 0.08
                } else {
                    angle_rad
                };
                let final_diam = self.evaluate_diameter(
                    p2,
                    self.stroke_distance + pos,
                    speed,
                    is_mouse,
                    self.stamp_index,
                );
                self.push_dab(
                    x0 + dx * u2,
                    y0 + dy * u2,
                    final_diam,
                    p2,
                    alpha,
                    stamp_angle,
                    active_tip,
                );
            }
        }

        self.stroke_distance += segment;
        self.distance_since_stamp = since;
        self.last_x = x1;
        self.last_y = y1;
        self.last_pressure = p1;

        self.dabs_buffer.len() / 7
    }

    /// Guarda el estado actual antes de calcular trazos predichos (renderPredictedStroke)
    pub fn save_checkpoint(&mut self) {
        self.checkpoint = StrokeCheckpoint {
            last_x: self.last_x,
            last_y: self.last_y,
            last_pressure: self.last_pressure,
            last_angle_rad: self.last_angle_rad,
            stroke_distance: self.stroke_distance,
            distance_since_stamp: self.distance_since_stamp,
            stamp_index: self.stamp_index,
            rng_state: self.rng_state,
        };
    }

    /// Restaura el estado guardado tras renderizar la predicción temporal
    pub fn restore_checkpoint(&mut self) {
        self.last_x = self.checkpoint.last_x;
        self.last_y = self.checkpoint.last_y;
        self.last_pressure = self.checkpoint.last_pressure;
        self.last_angle_rad = self.checkpoint.last_angle_rad;
        self.stroke_distance = self.checkpoint.stroke_distance;
        self.distance_since_stamp = self.checkpoint.distance_since_stamp;
        self.stamp_index = self.checkpoint.stamp_index;
        self.rng_state = self.checkpoint.rng_state;
    }

    pub fn end_stroke(&mut self) {
        self.is_active = false;
        self.distance_since_stamp = 0.0;
        self.stroke_distance = 0.0;
    }

    /// Puntero zero-copy al buffer de dabs (stride 7: [x, y, diameter, pressure, alpha, angle_rad, tip_index])
    pub fn get_dabs_ptr(&self) -> *const f32 {
        self.dabs_buffer.as_ptr()
    }

    pub fn get_dabs_len(&self) -> usize {
        self.dabs_buffer.len()
    }

    pub fn get_dirty_rect(&self) -> Vec<f32> {
        if self.dirty_min_x > self.dirty_max_x {
            vec![0.0, 0.0, 0.0, 0.0]
        } else {
            vec![
                self.dirty_min_x,
                self.dirty_min_y,
                self.dirty_max_x,
                self.dirty_max_y,
            ]
        }
    }

    /// Rasterizador nativo en Rust de sellos SDF (Circle, Square Chisel, 45° Calligraphic + Texturas de punta)
    /// Escribe `size * size * 4` bytes RGBA en `stamp_rgba_buffer` para lectura zero-copy desde JS.
    #[allow(clippy::too_many_arguments)]
    pub fn build_sdf_stamp(
        &mut self,
        size: u32,
        diameter: f32,
        hardness: f32,
        cr: u8,
        cg: u8,
        cb: u8,
        aa_width: f32,
        threshold: bool,
        shape_code: u8,
        scale_y: f32,
        mat_mode: u8,
        mat_w: u32,
        mat_h: u32,
        mat_rgba: &[u8],
    ) -> usize {
        let total_bytes = (size as usize) * (size as usize) * 4;
        self.stamp_rgba_buffer.resize(total_bytes, 0);

        let r = diameter * 0.5;
        let is_box = shape_code == 1;
        let is_calligraphic = shape_code == 2;
        let safe_scale_y = scale_y.max(0.08);
        let band = aa_width.max(r * (1.0 - hardness));
        let half_w = r.max(0.5);
        let half_h = (r * safe_scale_y).max(0.5);
        let half = (size as f32) * 0.5;
        let binary = band <= 0.0001;

        let has_mat = mat_mode != 0
            && mat_w > 0
            && mat_h > 0
            && mat_rgba.len() >= (mat_w as usize) * (mat_h as usize) * 4;

        let inv_half_w_pad = 1.0 / (half_w * 1.06);
        let inv_half_h_pad = 1.0 / (half_h * 1.06);
        let inv_band = if !binary { 1.0 / band } else { 0.0 };
        let half_band = band * 0.5;

        let mut i = 0usize;
        for y in 0..size {
            let raw_uy = (y as f32) + 0.5 - half;
            for x in 0..size {
                let raw_ux = (x as f32) + 0.5 - half;
                let mut local_x = raw_ux;
                let mut local_y = raw_uy;

                let mut sd = if is_box {
                    let dx = raw_ux.abs() - half_w;
                    let dy = raw_uy.abs() - half_h;
                    let ox = dx.max(0.0);
                    let oy = dy.max(0.0);
                    ox.hypot(oy) + dx.max(dy).min(0.0)
                } else if is_calligraphic {
                    let rot_x = (raw_ux + raw_uy) * core::f32::consts::FRAC_1_SQRT_2;
                    let rot_y = (-raw_ux + raw_uy) * core::f32::consts::FRAC_1_SQRT_2;
                    local_x = rot_x;
                    local_y = rot_y;
                    let dx = rot_x.abs() - half_w;
                    let dy = rot_y.abs() - half_h;
                    let ox = dx.max(0.0);
                    let oy = dy.max(0.0);
                    ox.hypot(oy) + dx.max(dy).min(0.0)
                } else {
                    let uy = raw_uy / safe_scale_y;
                    raw_ux.hypot(uy) - r
                };

                let mut mat_factor = 1.0f32;
                if has_mat {
                    let u = ((local_x * inv_half_w_pad) * 0.5 + 0.5).clamp(0.0, 0.999);
                    let v = ((local_y * inv_half_h_pad) * 0.5 + 0.5).clamp(0.0, 0.999);
                    let tx = ((u * (mat_w as f32)) as usize).min((mat_w - 1) as usize);
                    let ty = ((v * (mat_h as f32)) as usize).min((mat_h - 1) as usize);
                    let m_idx = (ty * (mat_w as usize) + tx) * 4;
                    let ma = (mat_rgba[m_idx + 3] as f32) / 255.0;

                    match mat_mode {
                        1 => {
                            // Textura de entintado rugoso (Gasa-Gasa)
                            let angle_norm = (local_y.atan2(local_x) + core::f32::consts::PI)
                                / core::f32::consts::TAU;
                            let angle_idx =
                                ((angle_norm * (mat_h as f32)).floor() as usize) % (mat_h as usize);
                            let rad_norm = (local_x / half_w).hypot(local_y / half_h).min(1.0);
                            let rad_idx = ((rad_norm * (mat_w as f32)).floor() as usize)
                                .min((mat_w - 1) as usize);
                            let polar_alpha = (mat_rgba
                                [(angle_idx * (mat_w as usize) + rad_idx) * 4 + 3]
                                as f32)
                                / 255.0;
                            let edge_jitter =
                                (polar_alpha - 0.48) * (r * 0.34).max(0.8).min(3.2);
                            sd -= edge_jitter;
                            mat_factor = 0.72 + 0.28 * ma;
                        }
                        2 => {
                            // Plumilla G con mordida orgánica (Real G-Pen)
                            let edge_jitter = (ma - 0.5) * (r * 0.28).max(0.6).min(2.6);
                            sd -= edge_jitter;
                            mat_factor = ma;
                        }
                        3 => {
                            // Pencil / Ink / Charcoal / Bristle02
                            let edge_soft = aa_width.max(r * 0.16);
                            sd += (1.0 - ma) * edge_soft * 0.85;
                            mat_factor = ma.powf(0.80);
                        }
                        _ => {
                            mat_factor = 0.25 + 0.75 * ma;
                        }
                    }
                }

                let mut a = if binary {
                    if sd < 0.0 {
                        1.0
                    } else {
                        0.0
                    }
                } else {
                    ((half_band - sd) * inv_band).clamp(0.0, 1.0)
                };
                a *= mat_factor;
                if threshold {
                    a = if a >= 0.45 { 1.0 } else { 0.0 };
                }

                self.stamp_rgba_buffer[i] = cr;
                self.stamp_rgba_buffer[i + 1] = cg;
                self.stamp_rgba_buffer[i + 2] = cb;
                self.stamp_rgba_buffer[i + 3] = (a * 255.0).round() as u8;
                i += 4;
            }
        }

        total_bytes
    }

    pub fn get_stamp_ptr(&self) -> *const u8 {
        self.stamp_rgba_buffer.as_ptr()
    }

    pub fn get_stamp_len(&self) -> usize {
        self.stamp_rgba_buffer.len()
    }

    #[inline(always)]
    fn compute_tip_angle_rad(&self, dx: f32, dy: f32) -> f32 {
        let s = &self.config;
        let follows_stroke = (s.ribbon
            || s.follow_direction
            || s.is_custom_tip
            || (s.tip_shape_code == 1 && s.follow_direction))
            && s.tip_shape_code != 2;
        let mut dir_deg = 0.0f32;
        if follows_stroke && (dx != 0.0 || dy != 0.0) {
            dir_deg = dy.atan2(dx).to_degrees();
        }
        (s.tip_angle_deg + dir_deg).to_radians()
    }

    #[inline(always)]
    fn select_tip_index(&self, stamp_index: u32) -> f32 {
        let count = self.config.tip_count;
        if self.config.tip_cycle_mode == 0 || count == 0 {
            return -1.0;
        }
        if count == 1 {
            return 0.0;
        }
        match self.config.tip_cycle_mode {
            1 => (stamp_index % count) as f32,
            2 => {
                let cycle_len = count * 2 - 2;
                let pos_in_cycle = stamp_index % cycle_len;
                let idx = if pos_in_cycle < count {
                    pos_in_cycle
                } else {
                    cycle_len - pos_in_cycle
                };
                idx as f32
            }
            _ => {
                let hash = (stamp_index.wrapping_add(1) as i32)
                    .wrapping_mul(2654435761u32 as i32)
                    .unsigned_abs();
                (hash % count) as f32
            }
        }
    }

    #[inline(always)]
    fn spray_particle_angle(&mut self, angle_rad: f32) -> f32 {
        if self.config.is_rain_tip {
            let base_angle = if self.config.follow_direction {
                angle_rad
            } else {
                self.config.tip_angle_deg.to_radians()
            };
            base_angle + (self.next_rand01() - 0.5) * 0.24
        } else {
            self.next_rand01() * core::f32::consts::TAU
        }
    }

    #[inline(always)]
    fn next_u32(&mut self) -> u32 {
        let mut x = self.rng_state;
        if x == 0 {
            x = 0x9E37_79B9;
        }
        x ^= x << 13;
        x ^= x >> 17;
        x ^= x << 5;
        self.rng_state = x;
        x
    }

    #[inline(always)]
    fn next_rand01(&mut self) -> f32 {
        (self.next_u32() & 0x00FF_FFFF) as f32 / 16_777_215.0
    }

    #[inline(always)]
    #[allow(clippy::too_many_arguments)]
    fn push_dab(
        &mut self,
        x: f32,
        y: f32,
        diameter: f32,
        pressure: f32,
        alpha: f32,
        angle_rad: f32,
        tip_index: f32,
    ) {
        self.dabs_buffer.push(x);
        self.dabs_buffer.push(y);
        self.dabs_buffer.push(diameter);
        self.dabs_buffer.push(pressure);
        self.dabs_buffer.push(alpha);
        self.dabs_buffer.push(angle_rad);
        self.dabs_buffer.push(tip_index);

        let radius = diameter * 0.6 + 4.0;
        self.dirty_min_x = self.dirty_min_x.min(x - radius);
        self.dirty_min_y = self.dirty_min_y.min(y - radius);
        self.dirty_max_x = self.dirty_max_x.max(x + radius);
        self.dirty_max_y = self.dirty_max_y.max(y + radius);
    }

    #[inline(always)]
    fn reset_dirty_rect(&mut self) {
        self.dirty_min_x = f32::MAX;
        self.dirty_min_y = f32::MAX;
        self.dirty_max_x = f32::MIN;
        self.dirty_max_y = f32::MIN;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn sample_config() -> BrushDynamicsConfig {
        BrushDynamicsConfig::new(
            12.0, 0.2, 0.15, true, 1.0, 10.0, true, 0.35, 1.0, 1.0, 1.0, false, false, true, false,
            false, false, 0, 0.0, 0, 0, false, 1, 0.0, false, false,
        )
    }

    #[test]
    fn test_stroke_engine_and_checkpoints() {
        let mut engine = StrokeEngineCore::new(sample_config());
        let first_count = engine.begin_stroke(10.0, 10.0, 0.8);
        assert_eq!(first_count, 1);

        let seg_count = engine.add_point(50.0, 10.0, 0.9);
        assert!(seg_count > 5);

        engine.save_checkpoint();
        let pred_count = engine.add_point(90.0, 10.0, 0.9);
        assert!(pred_count > 5);
        engine.restore_checkpoint();

        let real_count = engine.add_point(90.0, 10.0, 0.9);
        assert_eq!(pred_count, real_count);
    }

    #[test]
    fn test_sdf_stamp_rasterizer() {
        let mut engine = StrokeEngineCore::new(sample_config());
        let len = engine.build_sdf_stamp(
            32,
            24.0,
            0.8,
            255,
            64,
            32,
            1.1,
            false,
            0,
            1.0,
            0,
            0,
            0,
            &[],
        );
        assert_eq!(len, 32 * 32 * 4);
        let center_idx = (16 * 32 + 16) * 4;
        assert_eq!(engine.stamp_rgba_buffer[center_idx], 255);
        assert_eq!(engine.stamp_rgba_buffer[center_idx + 3], 255);
        let corner_idx = 0;
        assert_eq!(engine.stamp_rgba_buffer[corner_idx + 3], 0);
    }

    #[test]
    fn test_smart_fill_close_gap_and_scaling() {
        let w = 20u32;
        let h = 20u32;
        let mut rgba = vec![0u8; (w * h * 4) as usize];
        // Draw a 10x10 box from (5,5) to (14,14) with a 1px gap at (10,5)
        for x in 5..=14 {
            if x != 10 {
                let top = ((5 * w + x) * 4) as usize;
                rgba[top + 3] = 255;
            }
            let bot = ((14 * w + x) * 4) as usize;
            rgba[bot + 3] = 255;
        }
        for y in 5..=14 {
            let left = ((y * w + 5) * 4) as usize;
            let right = ((y * w + 14) * 4) as usize;
            rgba[left + 3] = 255;
            rgba[right + 3] = 255;
        }

        let mut fill_core = SmartFillCore::new();
        // With close_gap = 1, the 1px opening at (10,5) is sealed so fill stays inside the box
        let count = fill_core.compute_smart_fill_mask(&rgba, w, h, 9, 9, 20.0, 1, 0, true);
        assert!(count > 0 && count <= 8 * 8);
        let bounds = fill_core.get_bounds();
        assert!(bounds[0] >= 6 && bounds[2] <= 13);
    }

    #[test]
    fn test_bone_skin_core() {
        let mut bone_core = BoneSkinCore::new();
        let segments = [10.0f32, 10.0, 50.0, 10.0, 50.0, 10.0, 90.0, 30.0];
        let v_count = bone_core.build_mesh_vertices(0.0, 0.0, 100.0, 100.0, 4, 4, &segments);
        assert_eq!(v_count, 25);

        let verts = unsafe {
            core::slice::from_raw_parts(bone_core.get_vertices_ptr(), bone_core.get_vertices_len())
        }
        .to_vec();
        let indices = [0u32, 1, 5, 1, 6, 5];
        let skin_mats = [1.0f32, 0.0, 0.0, 1.0, 5.0, 2.0, 1.0, 0.0, 0.0, 1.0, -3.0, 4.0];
        let tri_count =
            bone_core.compute_skinned_triangles(&verts, &indices, &skin_mats, 0.0, 0.0, 100.0, 100.0);
        assert_eq!(tri_count, 2);
        assert_eq!(bone_core.get_triangles_len(), 24);
    }

    #[test]
    fn test_gif_encoder_core() {
        let mut gif = GifEncoderCore::new();
        let rgba = [
            255u8, 0, 0, 255, // red
            0, 255, 0, 255, // green
            0, 0, 0, 0, // transparent
            255, 0, 0, 255, // red
        ];
        let trans_idx = gif.quantize_rgba(&rgba, 2, 2);
        assert_eq!(trans_idx, 2);
        assert_eq!(gif.get_indexed_len(), 4);
        let indexed = unsafe {
            core::slice::from_raw_parts(gif.get_indexed_ptr(), gif.get_indexed_len())
        }
        .to_vec();
        let lzw_len = gif.encode_lzw_frame(&indexed, 2);
        assert!(lzw_len > 3);
    }

    #[test]
    fn test_selection_core() {
        let mut mask = vec![0u8; 100 * 100 * 4];
        // Select a 20x20 box from (10, 10) to (29, 29)
        for y in 10..30 {
            for x in 10..30 {
                let p = (y * 100 + x) * 4;
                mask[p] = 255;
                mask[p + 1] = 255;
                mask[p + 2] = 255;
                mask[p + 3] = 255;
            }
        }

        let bounds = SelectionCore::compute_bounds(&mask, 100, 100, true);
        assert_eq!(bounds, vec![10, 10, 29, 29, 20, 20]);

        // Expand by 2 px
        let expanded = SelectionCore::morphology_expand(&mask, 100, 100, 2, true);
        let exp_bounds = SelectionCore::compute_bounds(&expanded, 100, 100, true);
        assert_eq!(exp_bounds, vec![8, 8, 31, 31, 24, 24]);

        // Boundary extraction
        let boundary = SelectionCore::extract_boundary_mask(&mask, 100, 100, true);
        let b_bounds = SelectionCore::compute_bounds(&boundary, 100, 100, true);
        assert_eq!(b_bounds, vec![10, 10, 29, 29, 20, 20]);
        // Pixel at (15, 15) is internal, so boundary should be 0 there
        let internal_alpha = boundary[(15 * 100 + 15) * 4 + 3];
        assert_eq!(internal_alpha, 0);
        // Pixel at (10, 10) is corner, so boundary should be 255
        let edge_alpha = boundary[(10 * 100 + 10) * 4 + 3];
        assert_eq!(edge_alpha, 255);
    }

    #[test]
    fn test_clip_tile_core() {
        let mut dest = vec![0u8; 256 * 256 * 4];
        let mut decomp = vec![0u8; 256 * 256 * 5];
        // Set first pixel in alpha to 255 and red to 200
        decomp[0] = 255; // alpha
        decomp[256 * 256] = 200; // red
        let ok = ClipTileCore::blit_planar_tile(&mut dest, 256, 256, &decomp, 0, 0, false);
        assert!(ok);
        assert_eq!(dest[0], 200); // R
        assert_eq!(dest[3], 255); // A
    }

    #[test]
    fn test_color_blend_core() {
        // Dual color: full pressure should pick primary
        let mixed = ColorBlendCore::blend_dual_color(255, 0, 0, 0, 0, 255, 1.0);
        assert_eq!(mixed, vec![255, 0, 0]);

        // Dual color: zero pressure should pick secondary
        let mixed_zero = ColorBlendCore::blend_dual_color(255, 0, 0, 0, 0, 255, 0.0);
        assert_eq!(mixed_zero, vec![0, 0, 255]);

        // Smudge step
        let smudge = ColorBlendCore::step_smudge(100.0, 100.0, 100.0, 1.0, 200, 200, 200, 1.0, 0.5);
        assert_eq!(smudge[0], 150.0);

        // Tint in place
        let mut rgba = vec![255, 255, 255, 255, 0, 0, 0, 0];
        ColorBlendCore::apply_tint_in_place(&mut rgba, 0, 160, 233);
        assert_eq!(rgba[0], 0);
        assert_eq!(rgba[1], 160);
        assert_eq!(rgba[2], 233);
        assert_eq!(rgba[3], 255);
        // transparent pixel untouched
        assert_eq!(rgba[7], 0);
    }

    #[test]
    fn test_stroke_stabilizer_core() {
        let mut stab = StrokeStabilizerCore::new();
        stab.begin_stroke(10.0, 10.0, 0.5);

        // Move to (20.0, 10.0) with stabilization 5
        let count = stab.add_raw_point(20.0, 10.0, 0.6, 5.0, true);
        assert!(count > 0);
        assert!(stab.get_speed() > 0.0);
        assert_eq!(stab.get_emitted_len(), count * 3);

        // Subpixel jitter should be ignored
        let count_jitter = stab.add_raw_point(20.02, 10.01, 0.6, 5.0, true);
        assert_eq!(count_jitter, 0);

        // Flush tail
        let tail_count = stab.flush_tail();
        assert_eq!(tail_count, 2);
    }
}

