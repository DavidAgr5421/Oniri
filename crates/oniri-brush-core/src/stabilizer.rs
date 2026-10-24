use wasm_bindgen::prelude::*;

#[derive(Clone, Copy, Debug)]
struct SmoothPoint {
    x: f32,
    y: f32,
    p: f32,
}

/// Motor nativo de estabilización adaptativa de trazo y subdivisión Bézier
#[wasm_bindgen]
pub struct StrokeStabilizerCore {
    smoothed_x: f32,
    smoothed_y: f32,
    raw_last_x: f32,
    raw_last_y: f32,
    vel_x: f32,
    vel_y: f32,
    total_dist: f32,
    current_speed: f32,
    hist: Vec<SmoothPoint>,
    emitted_points: Vec<f32>, // Stride 3: [x, y, pressure]
}

#[wasm_bindgen]
impl StrokeStabilizerCore {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            smoothed_x: 0.0,
            smoothed_y: 0.0,
            raw_last_x: 0.0,
            raw_last_y: 0.0,
            vel_x: 0.0,
            vel_y: 0.0,
            total_dist: 0.0,
            current_speed: 0.0,
            hist: Vec::with_capacity(4),
            emitted_points: Vec::with_capacity(64),
        }
    }

    /// Inicia un nuevo trazo estabilizado
    pub fn begin_stroke(&mut self, x: f32, y: f32, pressure: f32) {
        self.smoothed_x = x;
        self.smoothed_y = y;
        self.raw_last_x = x;
        self.raw_last_y = y;
        self.vel_x = 0.0;
        self.vel_y = 0.0;
        self.total_dist = 0.0;
        self.current_speed = 0.0;

        self.hist.clear();
        self.hist.push(SmoothPoint { x, y, p: pressure });
        self.emitted_points.clear();
    }

    /// Procesa una muestra bruta del pointer (ratón o lápiz)
    /// Aplica filtrado de jitter, estabilización adaptativa a la velocidad y subdivisión Bézier.
    /// Retorna la cantidad de puntos interpolados emitidos (cada uno stride 3: [x, y, p]).
    pub fn add_raw_point(
        &mut self,
        x: f32,
        y: f32,
        pressure: f32,
        stabilization: f32,
        is_pen: bool,
    ) -> usize {
        self.emitted_points.clear();

        let dxr = x - self.raw_last_x;
        let dyr = y - self.raw_last_y;
        let step_dist = (dxr * dxr + dyr * dyr).sqrt();

        // Rechazo de temblor sub-píxel para evitar apilamiento repetido en reposo
        let min_dist = if is_pen { 0.08 } else { 0.25 };
        if step_dist < min_dist {
            return 0;
        }

        self.total_dist += step_dist;
        self.vel_x = self.vel_x * 0.55 + dxr * 0.45;
        self.vel_y = self.vel_y * 0.55 + dyr * 0.45;
        self.raw_last_x = x;
        self.raw_last_y = y;

        let speed = (self.vel_x * self.vel_x + self.vel_y * self.vel_y).sqrt();
        self.current_speed = speed;

        if stabilization <= 0.0 {
            self.smoothed_x = x;
            self.smoothed_y = y;
        } else {
            // Estabilización adaptativa a la velocidad:
            // Trazos lentos y minuciosos obtienen estabilización fuerte,
            // mientras curvas rápidas y expresivas no sufren retraso elástico (rubber-band lag).
            let base_alpha = 1.0 / (1.0 + stabilization * 0.42);
            let speed_norm = ((speed - 2.0) / 36.0).clamp(0.0, 1.0);
            let alpha = base_alpha + ((base_alpha * 2.4).min(0.82) - base_alpha) * (speed_norm * speed_norm);
            self.smoothed_x += (x - self.smoothed_x) * alpha;
            self.smoothed_y += (y - self.smoothed_y) * alpha;
        }

        // Subdivisión cuadrática Bézier continua
        let pt = SmoothPoint {
            x: self.smoothed_x,
            y: self.smoothed_y,
            p: pressure,
        };

        if self.hist.is_empty() {
            self.hist.push(pt);
            return 0;
        }

        let p1 = *self.hist.last().unwrap();
        let p0 = if self.hist.len() >= 2 {
            self.hist[self.hist.len() - 2]
        } else {
            self.hist[0]
        };

        let m1x = (p0.x + p1.x) * 0.5;
        let m1y = (p0.y + p1.y) * 0.5;
        let m1p = (p0.p + p1.p) * 0.5;

        let m2x = (p1.x + pt.x) * 0.5;
        let m2y = (p1.y + pt.y) * 0.5;
        let m2p = (p1.p + pt.p) * 0.5;

        let seg_dist = ((m2x - m1x).powi(2) + (m2y - m1y).powi(2)).sqrt();
        let subdivisions = if seg_dist > 24.0 {
            5
        } else if seg_dist > 8.0 {
            3
        } else {
            2
        };

        for i in 1..=subdivisions {
            let t = (i as f32) / (subdivisions as f32);
            let mt = 1.0 - t;
            let qx = mt * mt * m1x + 2.0 * mt * t * p1.x + t * t * m2x;
            let qy = mt * mt * m1y + 2.0 * mt * t * p1.y + t * t * m2y;
            let qp = m1p + (m2p - m1p) * t;

            self.emitted_points.push(qx);
            self.emitted_points.push(qy);
            self.emitted_points.push(qp);
        }

        self.hist.push(pt);
        if self.hist.len() > 3 {
            self.hist.remove(0);
        }

        self.emitted_points.len() / 3
    }

    /// Al soltar el lápiz, emite el segmento final hasta el punto de liberación exacto
    pub fn flush_tail(&mut self) -> usize {
        self.emitted_points.clear();
        if self.hist.len() >= 2 {
            let last = *self.hist.last().unwrap();
            let prev = self.hist[self.hist.len() - 2];
            let mx = (prev.x + last.x) * 0.5;
            let my = (prev.y + last.y) * 0.5;
            let mp = (prev.p + last.p) * 0.5;

            // Interpolación de remate
            for i in 1..=2 {
                let t = (i as f32) / 2.0;
                let x = mx + (last.x - mx) * t;
                let y = my + (last.y - my) * t;
                let p = mp + (last.p - mp) * t;
                self.emitted_points.push(x);
                self.emitted_points.push(y);
                self.emitted_points.push(p);
            }
        }
        self.emitted_points.len() / 3
    }

    pub fn get_emitted_ptr(&self) -> *const f32 {
        self.emitted_points.as_ptr()
    }

    pub fn get_emitted_len(&self) -> usize {
        self.emitted_points.len()
    }

    pub fn get_speed(&self) -> f32 {
        self.current_speed
    }
}
