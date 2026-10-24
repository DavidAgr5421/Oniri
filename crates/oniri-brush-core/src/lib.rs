use wasm_bindgen::prelude::*;

#[cfg(feature = "console_error_panic_hook")]
#[wasm_bindgen]
pub fn init_engine_hooks() {
    console_error_panic_hook::set_once();
}

/// Representa una muestra interpolada de un dab de pincel calculada por Rust
#[wasm_bindgen]
#[derive(Clone, Copy, Debug)]
pub struct Dab {
    pub x: f32,
    pub y: f32,
    pub size: f32,
    pub opacity: f32,
    pub angle: f32,
}

/// Configuración de dinámica y respuesta del pincel
#[wasm_bindgen]
#[derive(Clone, Copy, Debug)]
pub struct BrushDynamicsConfig {
    pub base_size: f32,
    pub min_size_ratio: f32,
    pub spacing_ratio: f32,
    pub pressure_gamma: f32,
    pub velocity_size_enabled: bool,
    pub velocity_min_ratio: f32,
}

#[wasm_bindgen]
impl BrushDynamicsConfig {
    #[wasm_bindgen(constructor)]
    pub fn new(
        base_size: f32,
        min_size_ratio: f32,
        spacing_ratio: f32,
        pressure_gamma: f32,
        velocity_size_enabled: bool,
        velocity_min_ratio: f32,
    ) -> Self {
        Self {
            base_size,
            min_size_ratio,
            spacing_ratio: spacing_ratio.max(0.01),
            pressure_gamma: pressure_gamma.max(0.1),
            velocity_size_enabled,
            velocity_min_ratio,
        }
    }
}

/// Motor de cálculo e interpolación de trazos de alta frecuencia en Rust
#[wasm_bindgen]
pub struct StrokeEngineCore {
    config: BrushDynamicsConfig,
    last_x: f32,
    last_y: f32,
    last_size: f32,
    last_time: f64,
    distance_remainder: f32,
    is_active: bool,
    // Buffer plano de dabs: [x, y, size, opacity, angle, ...]
    dabs_buffer: Vec<f32>,
    dirty_min_x: f32,
    dirty_min_y: f32,
    dirty_max_x: f32,
    dirty_max_y: f32,
}

#[wasm_bindgen]
impl StrokeEngineCore {
    #[wasm_bindgen(constructor)]
    pub fn new(config: BrushDynamicsConfig) -> Self {
        Self {
            config,
            last_x: 0.0,
            last_y: 0.0,
            last_size: config.base_size,
            last_time: 0.0,
            distance_remainder: 0.0,
            is_active: false,
            dabs_buffer: Vec::with_capacity(1024),
            dirty_min_x: f32::MAX,
            dirty_min_y: f32::MAX,
            dirty_max_x: f32::MIN,
            dirty_max_y: f32::MIN,
        }
    }

    pub fn update_config(&mut self, config: BrushDynamicsConfig) {
        self.config = config;
    }

    /// Inicia un nuevo trazo en (x, y) con presión dada
    pub fn begin_stroke(&mut self, x: f32, y: f32, pressure: f32, time_ms: f64) {
        self.dabs_buffer.clear();
        self.reset_dirty_rect();

        let gamma_pressure = pressure.max(0.0).min(1.0).powf(self.config.pressure_gamma);
        let size = self.compute_size(gamma_pressure, 0.0);

        self.last_x = x;
        self.last_y = y;
        self.last_size = size;
        self.last_time = time_ms;
        self.distance_remainder = 0.0;
        self.is_active = true;

        // Primer dab inicial
        self.push_dab(x, y, size, 1.0, 0.0);
    }

    /// Agrega un nuevo punto de movimiento (PointerMove) e interpola dabs
    pub fn add_point(&mut self, x: f32, y: f32, pressure: f32, time_ms: f64) -> usize {
        if !self.is_active {
            return 0;
        }

        self.dabs_buffer.clear();
        self.reset_dirty_rect();

        let dx = x - self.last_x;
        let dy = y - self.last_y;
        let dist = (dx * dx + dy * dy).sqrt();

        if dist < 0.001 {
            return 0;
        }

        let dt = (time_ms - self.last_time).max(1.0);
        let velocity = dist / (dt as f32);

        let gamma_pressure = pressure.max(0.0).min(1.0).powf(self.config.pressure_gamma);
        let target_size = self.compute_size(gamma_pressure, velocity);

        let angle = dy.atan2(dx);
        let mut d = self.distance_remainder;

        while d < dist {
            let t = (d / dist).clamp(0.0, 1.0);
            let ix = self.last_x + dx * t;
            let iy = self.last_y + dy * t;
            let isize = self.last_size + (target_size - self.last_size) * t;

            self.push_dab(ix, iy, isize, 1.0, angle);

            let spacing = (isize * self.config.spacing_ratio).max(1.0);
            d += spacing;
        }

        self.distance_remainder = d - dist;
        self.last_x = x;
        self.last_y = y;
        self.last_size = target_size;
        self.last_time = time_ms;

        self.dabs_buffer.len() / 5
    }

    /// Finaliza el trazo actual
    pub fn end_stroke(&mut self) {
        self.is_active = false;
        self.distance_remainder = 0.0;
    }

    /// Puntero en memoria compartida a los dabs [x, y, size, opacity, angle, ...]
    pub fn get_dabs_ptr(&self) -> *const f32 {
        self.dabs_buffer.as_ptr()
    }

    /// Cantidad total de floats en el buffer (número de dabs = len / 5)
    pub fn get_dabs_len(&self) -> usize {
        self.dabs_buffer.len()
    }

    /// Retorna el rectángulo sucio (dirty rect) [min_x, min_y, max_x, max_y]
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

    #[inline(always)]
    fn compute_size(&self, gamma_pressure: f32, velocity: f32) -> f32 {
        let mut ratio = self.config.min_size_ratio
            + (1.0 - self.config.min_size_ratio) * gamma_pressure;

        if self.config.velocity_size_enabled && velocity > 0.1 {
            // Suavizado por velocidad (trazo rápido produce línea más afilada)
            let vel_factor = (1.0 - (velocity / 20.0).min(1.0) * (1.0 - self.config.velocity_min_ratio)).clamp(0.1, 1.0);
            ratio *= vel_factor;
        }

        (self.config.base_size * ratio).max(1.0)
    }

    #[inline(always)]
    fn push_dab(&mut self, x: f32, y: f32, size: f32, opacity: f32, angle: f32) {
        self.dabs_buffer.push(x);
        self.dabs_buffer.push(y);
        self.dabs_buffer.push(size);
        self.dabs_buffer.push(opacity);
        self.dabs_buffer.push(angle);

        let radius = size * 0.5 + 2.0;
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
