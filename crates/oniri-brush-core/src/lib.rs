use wasm_bindgen::prelude::*;

pub mod bone_ik;
pub mod bones;
pub mod clip_tiles;
pub mod color_blend;
pub mod color_sampler;
pub mod f_curve;
pub mod fill;
pub mod filters;
pub mod flood_fill;
pub mod gif;
pub mod history;
pub mod resample;
pub mod ruler;
pub mod selection;
pub mod stabilizer;
pub mod tile_canvas;
pub mod timeline_core;
pub use bone_ik::BoneIKCore;
pub use bones::BoneSkinCore;
pub use clip_tiles::{ClipTileCore, ClipTimelineParser, FastLayerCompositor, FrameCacheCore};
pub use color_blend::ColorBlendCore;
pub use color_sampler::ColorSamplerCore;
pub use f_curve::wasm_solve_bezier_y;
pub use fill::SmartFillCore;
pub use filters::FilterCore;
pub use flood_fill::{FloodFillCore, FloodFillResult};
pub use gif::GifEncoderCore;
pub use history::HistoryCompressorCore;
pub use resample::{ResampleMode, TransformResampleCore};
pub use ruler::RulerCore;
pub use selection::SelectionCore;
pub use stabilizer::StrokeStabilizerCore;
pub use tile_canvas::SparseTileGrid;
pub use timeline_core::TimelineCore;

const MIN_STAMP_DIAMETER: f32 = 0.4;
const MIN_STAMP_STEP: f32 = 1.45;
const STAMP_GUARD: u32 = 20000;
const SPRAY_SCALE_BUCKETS: [f32; 6] = [0.45, 0.60, 0.75, 0.90, 1.05, 1.20];
pub const DAB_STRIDE: usize = 11;

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
    smudge_r: f32,
    smudge_g: f32,
    smudge_b: f32,
    smudge_a: f32,
    has_smudge_color: bool,
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
    // Buffer plano de dabs (stride 11):
    // [x, y, diameter, pressure, alpha, angle_rad, tip_index, r, g, b, flags]
    dabs_buffer: Vec<f32>,
    dirty_min_x: f32,
    dirty_min_y: f32,
    dirty_max_x: f32,
    dirty_max_y: f32,
    // Buffer reutilizable para generación de texturas SDF de punta de pincel (RGBA8)
    stamp_rgba_buffer: Vec<u8>,
    // Máscara de selección activa
    selection_mask: Vec<u8>,
    selection_mask_width: u32,
    selection_mask_height: u32,
    selection_bounds_min_x: f32,
    selection_bounds_min_y: f32,
    selection_bounds_max_x: f32,
    selection_bounds_max_y: f32,
    has_selection_mask: bool,
    selection_is_rgba: bool,
    // Parámetros de color y estado cromático de trazo
    primary_r: u8,
    primary_g: u8,
    primary_b: u8,
    secondary_r: u8,
    secondary_g: u8,
    secondary_b: u8,
    has_sub_color_mix: bool,
    color_mix: f32,
    color_mix_alpha: f32,
    smudge: f32,
    is_erase: bool,
    smudge_r: f32,
    smudge_g: f32,
    smudge_b: f32,
    smudge_a: f32,
    has_smudge_color: bool,
    // Snapshot del lienzo subyacente para muestreo nativo
    canvas_snapshot: Vec<u8>,
    canvas_snapshot_width: u32,
    canvas_snapshot_height: u32,
    has_canvas_snapshot: bool,
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
            selection_mask: Vec::new(),
            selection_mask_width: 0,
            selection_mask_height: 0,
            selection_bounds_min_x: 0.0,
            selection_bounds_min_y: 0.0,
            selection_bounds_max_x: 0.0,
            selection_bounds_max_y: 0.0,
            has_selection_mask: false,
            selection_is_rgba: false,
            primary_r: 0,
            primary_g: 0,
            primary_b: 0,
            secondary_r: 255,
            secondary_g: 255,
            secondary_b: 255,
            has_sub_color_mix: false,
            color_mix: 0.0,
            color_mix_alpha: 0.0,
            smudge: 0.0,
            is_erase: false,
            smudge_r: 0.0,
            smudge_g: 0.0,
            smudge_b: 0.0,
            smudge_a: 0.0,
            has_smudge_color: false,
            canvas_snapshot: Vec::new(),
            canvas_snapshot_width: 0,
            canvas_snapshot_height: 0,
            has_canvas_snapshot: false,
        }
    }

    pub fn update_config(&mut self, config: BrushDynamicsConfig) {
        self.config = config;
    }

    pub fn set_speed(&mut self, speed: f32) {
        self.current_speed = speed.max(0.0);
    }

    /// Configura los parámetros cromáticos para evaluación nativa de mezclas y smudge
    #[allow(clippy::too_many_arguments)]
    pub fn set_stroke_color(
        &mut self,
        primary_r: u8,
        primary_g: u8,
        primary_b: u8,
        secondary_r: u8,
        secondary_g: u8,
        secondary_b: u8,
        has_sub_color_mix: bool,
        color_mix: f32,
        color_mix_alpha: f32,
        smudge: f32,
        is_erase: bool,
    ) {
        self.primary_r = primary_r;
        self.primary_g = primary_g;
        self.primary_b = primary_b;
        self.secondary_r = secondary_r;
        self.secondary_g = secondary_g;
        self.secondary_b = secondary_b;
        self.has_sub_color_mix = has_sub_color_mix;
        self.color_mix = color_mix.max(0.0);
        self.color_mix_alpha = color_mix_alpha.max(0.0);
        self.smudge = smudge.max(0.0);
        self.is_erase = is_erase;
    }

    /// Asigna la instantánea plana RGBA8 del lienzo subyacente para muestreo nativo
    pub fn set_canvas_snapshot(&mut self, snapshot: &[u8], width: u32, height: u32) {
        if snapshot.is_empty() || width == 0 || height == 0 {
            self.clear_canvas_snapshot();
            return;
        }
        self.canvas_snapshot.clear();
        self.canvas_snapshot.extend_from_slice(snapshot);
        self.canvas_snapshot_width = width;
        self.canvas_snapshot_height = height;
        self.has_canvas_snapshot = true;
    }

    /// Elimina la instantánea del lienzo
    pub fn clear_canvas_snapshot(&mut self) {
        self.canvas_snapshot.clear();
        self.canvas_snapshot_width = 0;
        self.canvas_snapshot_height = 0;
        self.has_canvas_snapshot = false;
    }

    /// Asigna la máscara de selección activa para filtrado y modulación directa de dabs
    #[allow(clippy::too_many_arguments)]
    pub fn set_selection_mask(
        &mut self,
        mask_data: &[u8],
        width: u32,
        height: u32,
        bounds_min_x: f32,
        bounds_min_y: f32,
        bounds_max_x: f32,
        bounds_max_y: f32,
        is_rgba: bool,
    ) {
        if mask_data.is_empty() || width == 0 || height == 0 {
            self.clear_selection_mask();
            return;
        }
        self.selection_mask.clear();
        self.selection_mask.extend_from_slice(mask_data);
        self.selection_mask_width = width;
        self.selection_mask_height = height;
        self.selection_bounds_min_x = bounds_min_x;
        self.selection_bounds_min_y = bounds_min_y;
        self.selection_bounds_max_x = bounds_max_x;
        self.selection_bounds_max_y = bounds_max_y;
        self.has_selection_mask = true;
        self.selection_is_rgba = is_rgba;
    }

    /// Elimina la máscara de selección activa
    pub fn clear_selection_mask(&mut self) {
        self.selection_mask.clear();
        self.selection_mask_width = 0;
        self.selection_mask_height = 0;
        self.selection_bounds_min_x = 0.0;
        self.selection_bounds_min_y = 0.0;
        self.selection_bounds_max_x = 0.0;
        self.selection_bounds_max_y = 0.0;
        self.has_selection_mask = false;
        self.selection_is_rgba = false;
    }

    /// Comprueba si hay una máscara de selección asignada
    pub fn has_selection(&self) -> bool {
        self.has_selection_mask
    }

    /// Muestrea el valor de opacidad alfa (0.0..1.0) de la máscara de selección en (x, y)
    pub fn sample_selection_alpha(&self, x: f32, y: f32) -> f32 {
        if !self.has_selection_mask {
            return 1.0;
        }
        let xi = x.round() as i32;
        let yi = y.round() as i32;
        let w = self.selection_mask_width as i32;
        let h = self.selection_mask_height as i32;
        if xi < 0 || xi >= w || yi < 0 || yi >= h {
            return 0.0;
        }

        let stride = if self.selection_is_rgba { 4 } else { 1 };
        let offset = if self.selection_is_rgba { 3 } else { 0 };
        let idx = ((yi as usize) * (self.selection_mask_width as usize) + (xi as usize)) * stride + offset;
        if idx < self.selection_mask.len() {
            (self.selection_mask[idx] as f32) / 255.0
        } else {
            0.0
        }
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
        self.has_smudge_color = false;
        self.smudge_r = 0.0;
        self.smudge_g = 0.0;
        self.smudge_b = 0.0;
        self.smudge_a = 0.0;

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

        self.dabs_buffer.len() / DAB_STRIDE
    }

    /// Interpola un segmento desde el último punto hasta (x1, y1, p1) con espaciado adaptativo
    pub fn add_point(&mut self, x1: f32, y1: f32, p1: f32) -> usize {
        if !self.is_active {
            return 0;
        }

        self.dabs_buffer.clear();
        self.reset_dirty_rect();

        self.step_segment(x1, y1, p1);

        self.dabs_buffer.len() / DAB_STRIDE
    }

    /// Calcula de una sola llamada nativa el lote completo de dabs predichos
    /// a partir de una secuencia plana de puntos: `[x0, y0, p0, x1, y1, p1, ...]` (stride 3).
    /// Guarda y restaura internamente el checkpoint del motor, garantizando cero mutación residual.
    /// Retorna el número de dabs calculados en `dabs_buffer`.
    pub fn predict_stroke_batch(&mut self, points: &[f32]) -> usize {
        let n_points = points.len() / 3;
        if !self.is_active || n_points == 0 {
            return 0;
        }

        self.save_checkpoint();

        self.dabs_buffer.clear();
        self.reset_dirty_rect();

        for i in 0..n_points {
            let base = i * 3;
            self.step_segment(points[base], points[base + 1], points[base + 2]);
        }

        let total = self.dabs_buffer.len() / DAB_STRIDE;

        self.restore_checkpoint();

        total
    }

    /// Genera la predicción curva Bézier cuadrática continua C1 directamente en Rust
    /// a partir de los puntos inicial y objetivo, y el vector de velocidad tangencial.
    /// Guarda y restaura internamente el checkpoint del motor, garantizando cero mutación residual.
    /// Retorna el número de dabs calculados en `dabs_buffer`.
    #[allow(clippy::too_many_arguments)]
    pub fn predict_bezier_stroke(
        &mut self,
        start_x: f32,
        start_y: f32,
        start_p: f32,
        target_x: f32,
        target_y: f32,
        target_p: f32,
        vel_x: f32,
        vel_y: f32,
    ) -> usize {
        if !self.is_active {
            return 0;
        }

        let dx = target_x - start_x;
        let dy = target_y - start_y;
        let dist = dx.hypot(dy);

        if dist <= 1.5 || dist >= 120.0 {
            return 0;
        }

        self.save_checkpoint();
        self.dabs_buffer.clear();
        self.reset_dirty_rect();

        let tan_len = vel_x.hypot(vel_y);
        let (tan_x, tan_y) = if tan_len > 0.01 {
            (vel_x / tan_len, vel_y / tan_len)
        } else {
            (dx / dist, dy / dist)
        };

        // Punto de control extendido a lo largo de la tangente para continuidad C1 sin codos
        let lead = (dist * 0.5).min(30.0);
        let ctrl_x = start_x + tan_x * lead;
        let ctrl_y = start_y + tan_y * lead;

        // Subdivisión adaptativa de la curva Bézier cuadrática
        let steps = if dist > 30.0 { 3 } else { 2 };
        for i in 1..=steps {
            let t = (i as f32) / (steps as f32);
            let mt = 1.0 - t;
            let bx = mt * mt * start_x + 2.0 * mt * t * ctrl_x + t * t * target_x;
            let by = mt * mt * start_y + 2.0 * mt * t * ctrl_y + t * t * target_y;
            let bp = start_p + (target_p - start_p) * t;
            self.step_segment(bx, by, bp);
        }

        let total = self.dabs_buffer.len() / DAB_STRIDE;
        self.restore_checkpoint();
        total
    }

    #[inline(always)]
    fn step_segment(&mut self, x1: f32, y1: f32, p1: f32) {
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
            return;
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
            let min_step = (diam * 0.18).clamp(MIN_STAMP_STEP, 3.2);
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
            smudge_r: self.smudge_r,
            smudge_g: self.smudge_g,
            smudge_b: self.smudge_b,
            smudge_a: self.smudge_a,
            has_smudge_color: self.has_smudge_color,
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
        self.smudge_r = self.checkpoint.smudge_r;
        self.smudge_g = self.checkpoint.smudge_g;
        self.smudge_b = self.checkpoint.smudge_b;
        self.smudge_a = self.checkpoint.smudge_a;
        self.has_smudge_color = self.checkpoint.has_smudge_color;
    }

    pub fn end_stroke(&mut self) {
        self.is_active = false;
        self.distance_since_stamp = 0.0;
        self.stroke_distance = 0.0;
    }

    /// Puntero zero-copy al buffer de dabs (stride 11: [x, y, diameter, pressure, alpha, angle_rad, tip_index, r, g, b, flags])
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
    fn is_dab_in_selection(&self, x: f32, y: f32, radius: f32) -> (bool, f32) {
        if !self.has_selection_mask {
            return (true, 1.0);
        }

        // 1. Descarte ultra-rápido por bounding box de selección
        if (x + radius) < self.selection_bounds_min_x
            || (x - radius) > self.selection_bounds_max_x
            || (y + radius) < self.selection_bounds_min_y
            || (y - radius) > self.selection_bounds_max_y
        {
            return (false, 0.0);
        }

        // 2. Muestreo en el centro del dab
        let center_a = self.sample_selection_alpha(x, y);
        if center_a > 0.01 {
            return (true, center_a);
        }

        // 3. Comprobar puntos en el perímetro del dab (cardinales y diagonales)
        let test_r = radius * 0.75;
        let points = [
            (x - test_r, y),
            (x + test_r, y),
            (x, y - test_r),
            (x, y + test_r),
            (x - test_r * 0.707, y - test_r * 0.707),
            (x + test_r * 0.707, y - test_r * 0.707),
            (x - test_r * 0.707, y + test_r * 0.707),
            (x + test_r * 0.707, y + test_r * 0.707),
        ];

        let mut max_a = 0.0f32;
        for (px, py) in points {
            let a = self.sample_selection_alpha(px, py);
            if a > max_a {
                max_a = a;
            }
            if max_a >= 0.99 {
                break;
            }
        }

        if max_a > 0.01 {
            (true, max_a)
        } else {
            (false, 0.0)
        }
    }

    #[inline(always)]
    fn resolve_dab_color(
        &mut self,
        x: f32,
        y: f32,
        pressure: f32,
        base_alpha: f32,
    ) -> Option<(f32, f32, f32, f32)> {
        if self.is_erase {
            return Some((0.0, 0.0, 0.0, base_alpha));
        }

        let mut r = self.primary_r as f32;
        let mut g = self.primary_g as f32;
        let mut b = self.primary_b as f32;
        let mut alpha = base_alpha;

        // 1. Dual Color / Sub Color Mix
        if self.has_sub_color_mix {
            let t = clamp01(pressure).powf(1.2);
            let r2 = self.secondary_r as f32;
            let g2 = self.secondary_g as f32;
            let b2 = self.secondary_b as f32;
            r = (r2 * (1.0 - t) + r * t).round().clamp(0.0, 255.0);
            g = (g2 * (1.0 - t) + g * t).round().clamp(0.0, 255.0);
            b = (b2 * (1.0 - t) + b * t).round().clamp(0.0, 255.0);
        }

        // 2. Color Mix y Smudge
        if (self.color_mix > 0.0 || self.smudge > 0.0) && self.has_canvas_snapshot {
            let sampled = ColorSamplerCore::sample_rgba(
                &self.canvas_snapshot,
                self.canvas_snapshot_width,
                self.canvas_snapshot_height,
                x,
                y,
            );
            let is_pure_smudger = self.smudge > 0.0 && self.color_mix >= 0.8;

            if !sampled.is_empty() && sampled[3] > 0.02 {
                if self.smudge > 0.0 {
                    if !self.has_smudge_color {
                        self.smudge_r = sampled[0];
                        self.smudge_g = sampled[1];
                        self.smudge_b = sampled[2];
                        self.smudge_a = sampled[3];
                        self.has_smudge_color = true;
                    } else {
                        let pick_rate = 0.35f32;
                        self.smudge_r = (self.smudge_r * (1.0 - pick_rate) + sampled[0] * pick_rate).round();
                        self.smudge_g = (self.smudge_g * (1.0 - pick_rate) + sampled[1] * pick_rate).round();
                        self.smudge_b = (self.smudge_b * (1.0 - pick_rate) + sampled[2] * pick_rate).round();
                        self.smudge_a = self.smudge_a.max(sampled[3]);
                    }
                    r = self.smudge_r;
                    g = self.smudge_g;
                    b = self.smudge_b;
                    alpha *= self.smudge_a;
                } else {
                    // Standard watercolor / oil mixing
                    let lr = sampled[0];
                    let lg = sampled[1];
                    let lb = sampled[2];
                    let la = sampled[3];
                    let p = clamp01(pressure);
                    let base_mix = self.color_mix * (1.0 - p.powf(1.3) * 0.85).max(0.05);
                    let mix = (base_mix * la).clamp(0.0, 1.0);
                    let one_minus_mix = 1.0 - mix;
                    r = (r * one_minus_mix + lr * mix).round().clamp(0.0, 255.0);
                    g = (g * one_minus_mix + lg * mix).round().clamp(0.0, 255.0);
                    b = (b * one_minus_mix + lb * mix).round().clamp(0.0, 255.0);
                }
            } else {
                // Lienzo transparente bajo el cursor
                if is_pure_smudger {
                    if !self.has_smudge_color {
                        // Blender sobre lienzo vacío: omitir dab por completo (no pintar negro)
                        return None;
                    }
                    self.smudge_a *= 0.96;
                    if self.smudge_a < 0.01 {
                        self.has_smudge_color = false;
                        return None;
                    }
                    r = self.smudge_r;
                    g = self.smudge_g;
                    b = self.smudge_b;
                    alpha *= self.smudge_a;
                }
            }
        }

        Some((r, g, b, alpha))
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
        let radius = diameter * 0.5;
        let (in_sel, sel_factor) = self.is_dab_in_selection(x, y, radius);
        if !in_sel {
            return;
        }

        let final_alpha = alpha * sel_factor;
        if final_alpha <= 0.005 {
            return;
        }

        let (r, g, b, resolved_alpha) = match self.resolve_dab_color(x, y, pressure, final_alpha) {
            Some(res) => res,
            None => return,
        };

        if resolved_alpha <= 0.005 {
            return;
        }

        self.dabs_buffer.push(x);
        self.dabs_buffer.push(y);
        self.dabs_buffer.push(diameter);
        self.dabs_buffer.push(pressure);
        self.dabs_buffer.push(resolved_alpha);
        self.dabs_buffer.push(angle_rad);
        self.dabs_buffer.push(tip_index);
        self.dabs_buffer.push(r);
        self.dabs_buffer.push(g);
        self.dabs_buffer.push(b);
        self.dabs_buffer.push(1.0); // flags

        let dirty_pad = diameter * 0.6 + 4.0;
        self.dirty_min_x = self.dirty_min_x.min(x - dirty_pad);
        self.dirty_min_y = self.dirty_min_y.min(y - dirty_pad);
        self.dirty_max_x = self.dirty_max_x.max(x + dirty_pad);
        self.dirty_max_y = self.dirty_max_y.max(y + dirty_pad);
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

        // Test predict_stroke_batch
        let pred_points = vec![110.0, 10.0, 0.9, 130.0, 10.0, 0.95];
        let batch_pred_count = engine.predict_stroke_batch(&pred_points);
        assert!(batch_pred_count > 5);

        // El estado real del motor no debió mutar
        assert_eq!(engine.last_x, 90.0);
        assert_eq!(engine.last_y, 10.0);

        // Test de máscara de selección directa en el generador de dabs
        let mut mask = vec![0u8; 100 * 100];
        // Seleccionar solo la caja [40..60, 40..60]
        for y in 40..60 {
            for x in 40..60 {
                mask[y * 100 + x] = 255;
            }
        }
        engine.set_selection_mask(&mask, 100, 100, 40.0, 40.0, 60.0, 60.0, false);
        assert!(engine.has_selection());

        // Dab en (10, 10) está completamente fuera de la selección -> debe generar 0 dabs
        let out_count = engine.begin_stroke(10.0, 10.0, 0.8);
        assert_eq!(out_count, 0);

        // Dab en (50, 50) está dentro de la selección -> debe generar 1 dab
        let in_count = engine.begin_stroke(50.0, 50.0, 0.8);
        assert_eq!(in_count, 1);

        // Limpiar máscara
        engine.clear_selection_mask();
        assert!(!engine.has_selection());
        let unmasked_count = engine.begin_stroke(10.0, 10.0, 0.8);
        assert_eq!(unmasked_count, 1);

        // Test de Color Mix nativo en Rust
        let mut snapshot = vec![0u8; 100 * 100 * 4];
        // Pintar píxel en (50, 50) de azul: RGBA(0, 0, 255, 255)
        let s_idx = (50 * 100 + 50) * 4;
        snapshot[s_idx] = 0;
        snapshot[s_idx + 1] = 0;
        snapshot[s_idx + 2] = 255;
        snapshot[s_idx + 3] = 255;
        engine.set_canvas_snapshot(&snapshot, 100, 100);
        // Pincel rojo primario, colorMix = 0.5
        engine.set_stroke_color(255, 0, 0, 255, 255, 255, false, 0.5, 0.5, 0.0, false);
        let mix_count = engine.begin_stroke(50.0, 50.0, 0.5);
        assert_eq!(mix_count, 1);
        let dabs_len = engine.get_dabs_len();
        assert_eq!(dabs_len, DAB_STRIDE);
        // Debe tener componente azul mezclado (ni 0 ni 255 puro)
        assert!(engine.dabs_buffer[7] < 255.0); // Rojo mezclado
        assert!(engine.dabs_buffer[9] > 0.0);   // Azul mezclado

        // Test de predict_bezier_stroke
        let bez_count = engine.predict_bezier_stroke(
            50.0, 50.0, 0.5,
            75.0, 55.0, 0.6,
            10.0, 2.0,
        );
        assert!(bez_count > 0);
        // El estado real del motor sigue intacto tras la predicción
        assert_eq!(engine.last_x, 50.0);
        assert_eq!(engine.last_y, 50.0);
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

        // Merge stroke rect with lock_alpha
        // Pixel 0: dest opaque green (0, 255, 0, 255)
        // Pixel 1: dest transparent (0, 0, 0, 0)
        let mut dst = vec![0, 255, 0, 255, 0, 0, 0, 0];
        // Src: opaque red (255, 0, 0, 255)
        let src = vec![255, 0, 0, 255, 255, 0, 0, 255];
        let empty_mask: Vec<u8> = vec![];

        let ok = ColorBlendCore::merge_stroke_rect(
            &mut dst,
            &src,
            2,
            1,
            0,
            0,
            2,
            1,
            0, // normal
            1.0, // opacity 100%
            true, // lock_alpha = true!
            &empty_mask,
        );
        assert!(ok);
        // Pixel 0: was opaque green, painted over by red with lock_alpha -> should be red, alpha 255
        assert_eq!(dst[0], 255);
        assert_eq!(dst[1], 0);
        assert_eq!(dst[2], 0);
        assert_eq!(dst[3], 255);
        // Pixel 1: was transparent, lock_alpha prevents any color from sticking!
        assert_eq!(dst[4], 0);
        assert_eq!(dst[5], 0);
        assert_eq!(dst[6], 0);
        assert_eq!(dst[7], 0);

        // Test matricial paper grain pattern tile generation
        let tooth_mat = vec![0.0f32, 1.0, 0.5, 0.2]; // 2x2 tooth matrix
        let mut tile_rgba = vec![0u8; 2 * 2 * 4];
        let tile_ok = ColorBlendCore::generate_paper_pattern_tile(
            &mut tile_rgba,
            2,
            2,
            &tooth_mat,
            2,
            2,
            0.85,
            0, // height mode
            false,
        );
        assert!(tile_ok);
        // Alpha of tile should be generated based on tooth matrix
        assert_eq!(tile_rgba[0], 255); // R
        assert_eq!(tile_rgba[1], 255); // G
        assert_eq!(tile_rgba[2], 255); // B
        assert!(tile_rgba[3] > 0);     // A > 0

        // Test apply paper grain rect in-place
        let mut stroke_buf = vec![255u8, 0, 0, 255, 0, 255, 0, 255]; // 2 pixels RGBA
        let apply_ok = ColorBlendCore::apply_paper_grain_rect(
            &mut stroke_buf,
            2,
            2,
            1,
            0,
            0,
            &tooth_mat,
            2,
            2,
            1.0,
            0.9,
            0, // height mode
            false,
        );
        assert!(apply_ok);
        // Deep valley should lower alpha
        assert!(stroke_buf[3] < 255);
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

    #[test]
    fn test_bone_ik_core() {
        // Arm pointing right (root at 0,0, L1=50, L2=50), target at (100, 0)
        let res = BoneIKCore::solve_two_bone_ik(
            0.0, 0.0,
            100.0, 0.0,
            50.0, 50.0,
            true,
            0.0, 0.0, 0.0,
        );
        assert!(res.parent_d_rotation.abs() < 2.0);
        assert!(res.child_d_rotation.abs() < 2.0);

        // Target at (50, 50): 90-degree bend
        let res_bent = BoneIKCore::solve_two_bone_ik(
            0.0, 0.0,
            50.0, 50.0,
            50.0, 50.0,
            true,
            0.0, 0.0, 0.0,
        );
        assert_eq!(res_bent.child_d_rotation, 90.0);

        // 1-bone aim directly up (0, -10)
        let aim = BoneIKCore::solve_one_bone_aim(0.0, 0.0, 0.0, -10.0, 0.0, 0.0);
        assert!((aim - (-90.0)).abs() < 1.0);

        // Mat2D identity compose
        let m1 = [1.0, 0.0, 0.0, 1.0, 10.0, 20.0];
        let m2 = [1.0, 0.0, 0.0, 1.0, 5.0, 5.0];
        let composed = BoneIKCore::compose_mat2d(&m1, &m2);
        assert_eq!(composed[4], 15.0);
        assert_eq!(composed[5], 25.0);
    }

    #[test]
    fn test_filter_core() {
        // Invert
        let mut pixels = vec![100, 150, 200, 255, 0, 0, 0, 0];
        FilterCore::invert_colors(&mut pixels);
        assert_eq!(pixels[0], 155);
        assert_eq!(pixels[1], 105);
        assert_eq!(pixels[2], 55);
        assert_eq!(pixels[3], 255);
        // transparent pixel untouched
        assert_eq!(pixels[7], 0);

        // Binarize
        let mut mono = vec![50, 50, 50, 255, 200, 200, 200, 255, 0, 0, 0, 0];
        FilterCore::binarize(&mut mono, 128);
        assert_eq!(mono[0], 0);
        assert_eq!(mono[1], 0);
        assert_eq!(mono[2], 0);
        assert_eq!(mono[4], 255);
        assert_eq!(mono[5], 255);
        assert_eq!(mono[6], 255);
        assert_eq!(mono[11], 0);

        // Brightness & contrast
        let mut bc = vec![128, 128, 128, 255];
        FilterCore::adjust_brightness_contrast(&mut bc, 0.1, 0.0);
        assert!(bc[0] > 140);

        // HSV
        let mut hsv = vec![255, 0, 0, 255]; // pure red
        FilterCore::adjust_hsv(&mut hsv, 120.0, 1.0, 1.0); // +120 deg -> green
        assert!(hsv[1] > 240);
        assert!(hsv[0] < 15);

        // Gaussian Blur (3x3 single white center on black)
        let mut grid = vec![0u8; 9 * 4];
        for i in 0..9 {
            grid[i * 4 + 3] = 255;
        }
        grid[(1 * 3 + 1) * 4] = 255; // center R=255
        let blurred = FilterCore::gaussian_blur(&grid, 3, 3, 1.0);
        assert_eq!(blurred.len(), 36);
        // Center should be diffused to neighbours
        assert!(blurred[(1 * 3 + 0) * 4] > 0);
        assert!(blurred[(1 * 3 + 2) * 4] > 0);
    }

    #[test]
    fn test_flood_fill_core() {
        // 4x4 image, initially all white
        let mut img = vec![255u8; 16 * 4];
        // Draw a horizontal line of black at row 2
        for x in 0..4 {
            img[(2 * 4 + x) * 4] = 0;
            img[(2 * 4 + x) * 4 + 1] = 0;
            img[(2 * 4 + x) * 4 + 2] = 0;
            img[(2 * 4 + x) * 4 + 3] = 255;
        }

        // Flood fill top half with red (255, 0, 0, 255) from (0, 0)
        let res = FloodFillCore::scanline_fill(
            &mut img,
            4,
            4,
            0,
            0,
            255,
            0,
            0,
            255,
            10.0,
            &[],
        );

        assert!(res.is_some());
        let info = res.unwrap();
        // Rows 0 and 1 are 8 pixels
        assert_eq!(info.filled_count, 8);
        assert_eq!(info.min_y, 0);
        assert_eq!(info.max_y, 1);
        assert_eq!(info.min_x, 0);
        assert_eq!(info.max_x, 3);

        // Row 0 should be red
        assert_eq!(img[0], 255);
        assert_eq!(img[1], 0);
        assert_eq!(img[2], 0);

        // Black line (row 2) remains black
        assert_eq!(img[(2 * 4 + 0) * 4], 0);

        // Row 3 (bottom half) remains white
        assert_eq!(img[(3 * 4 + 0) * 4], 255);
        assert_eq!(img[(3 * 4 + 0) * 4 + 1], 255);

        // Non-contiguous fill: replace all remaining white with blue (0, 0, 255, 255)
        let all_res = FloodFillCore::fill_all_matching(
            &mut img,
            4,
            4,
            0,
            3,
            0,
            0,
            255,
            255,
            10.0,
            &[],
        );
        assert!(all_res.is_some());
        assert_eq!(all_res.unwrap().filled_count, 4); // Only row 3
    }

    #[test]
    fn test_transform_resample_core() {
        // 2x2 image with Red, Green, Blue, White pixels
        let src = vec![
            255, 0, 0, 255, // (0, 0) Red
            0, 255, 0, 255, // (1, 0) Green
            0, 0, 255, 255, // (0, 1) Blue
            255, 255, 255, 255, // (1, 1) White
        ];

        // 1. Scale 2x2 to 4x4 with Nearest
        let scaled_nearest = TransformResampleCore::resample_scale(&src, 2, 2, 4, 4, ResampleMode::Nearest);
        assert_eq!(scaled_nearest.len(), 4 * 4 * 4);
        assert_eq!(scaled_nearest[0], 255); // Top-left is Red
        assert_eq!(scaled_nearest[(3 * 4 + 3) * 4], 255); // Bottom-right is White

        // 2. Scale 2x2 to 4x4 with Bilinear
        let scaled_bilinear = TransformResampleCore::resample_scale(&src, 2, 2, 4, 4, ResampleMode::Bilinear);
        assert_eq!(scaled_bilinear.len(), 4 * 4 * 4);

        // 3. Scale 2x2 to 4x4 with Bicubic
        let scaled_bicubic = TransformResampleCore::resample_scale(&src, 2, 2, 4, 4, ResampleMode::Bicubic);
        assert_eq!(scaled_bicubic.len(), 4 * 4 * 4);

        // 4. Affine identity mapping
        let mat_inv = TransformResampleCore::compute_inverse_transform_matrix(
            1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
        );
        let affine_res = TransformResampleCore::resample_affine(&src, 2, 2, 2, 2, &mat_inv, ResampleMode::Nearest);
        assert_eq!(affine_res.len(), 16);
        assert_eq!(affine_res[0], 255);
        assert_eq!(affine_res[4], 0);
        assert_eq!(affine_res[5], 255);
    }
}

