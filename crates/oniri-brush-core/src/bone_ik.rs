use wasm_bindgen::prelude::*;

/// Resultado del cálculo analítico de IK para extremidades de 2 huesos
#[wasm_bindgen]
#[derive(Clone, Copy, Debug)]
pub struct TwoBoneIKResult {
    pub parent_d_rotation: f32,
    pub child_d_rotation: f32,
}

/// Motor nativo de Cinemática Directa (FK), Cinemática Inversa (IK) y matrices 2D de Armadura
#[wasm_bindgen]
pub struct BoneIKCore;

#[wasm_bindgen]
impl BoneIKCore {
    /// Resuelve la cinemática inversa analítica de 2 huesos (Law of Cosines)
    /// Retorna `TwoBoneIKResult` con las rotaciones delta para el padre y el hijo.
    pub fn solve_two_bone_ik(
        root_x: f32,
        root_y: f32,
        target_x: f32,
        target_y: f32,
        l1: f32,
        l2: f32,
        bend_positive: bool,
        grandparent_world_angle: f32,
        parent_rest_rotation: f32,
        child_rest_rotation: f32,
    ) -> TwoBoneIKResult {
        let dx = target_x - root_x;
        let dy = target_y - root_y;
        let dist_raw = (dx * dx + dy * dy).sqrt();

        let l1_clamped = l1.max(1.0);
        let l2_clamped = l2.max(1.0);

        let max_reach = (l1_clamped + l2_clamped - 0.01).max(1.0);
        let min_reach = (l1_clamped - l2_clamped).abs() + 0.01;
        let d = dist_raw.clamp(min_reach, max_reach);

        let base_angle_rad = dy.atan2(dx);

        // Ley del coseno para ángulos interiores
        let cos_angle1 = ((l1_clamped * l1_clamped + d * d - l2_clamped * l2_clamped) / (2.0 * l1_clamped * d)).clamp(-1.0, 1.0);
        let cos_angle2 = ((l1_clamped * l1_clamped + l2_clamped * l2_clamped - d * d) / (2.0 * l1_clamped * l2_clamped)).clamp(-1.0, 1.0);

        let bend_sign = if bend_positive { 1.0f32 } else { -1.0f32 };
        let angle1_rad = base_angle_rad - bend_sign * cos_angle1.acos();
        let interior_knee_rad = cos_angle2.acos();
        let child_local_angle_rad = bend_sign * (std::f32::consts::PI - interior_knee_rad);

        let desired_parent_world_deg = angle1_rad.to_degrees();
        let parent_d_rot = Self::normalize_angle_deg(
            desired_parent_world_deg - grandparent_world_angle - parent_rest_rotation
        );

        let desired_child_relative_deg = child_local_angle_rad.to_degrees();
        let child_d_rot = Self::normalize_angle_deg(
            desired_child_relative_deg - child_rest_rotation
        );

        TwoBoneIKResult {
            parent_d_rotation: parent_d_rot,
            child_d_rotation: child_d_rot,
        }
    }

    /// Resuelve IK de 1 hueso (Look-At / Aim)
    pub fn solve_one_bone_aim(
        head_x: f32,
        head_y: f32,
        target_x: f32,
        target_y: f32,
        parent_world_angle: f32,
        rest_rotation: f32,
    ) -> f32 {
        let desired_world_angle = (target_y - head_y).atan2(target_x - head_x).to_degrees();
        Self::normalize_angle_deg(desired_world_angle - parent_world_angle - rest_rotation)
    }

    pub fn normalize_angle_deg(deg: f32) -> f32 {
        let mut a = ((deg + 180.0) % 360.0 + 360.0) % 360.0 - 180.0;
        if a == -180.0 {
            a = 180.0;
        }
        a
    }

    /// Multiplicación de matrices afines 2D [a, b, c, d, tx, ty]
    pub fn compose_mat2d(m1: &[f32], m2: &[f32]) -> Vec<f32> {
        let a1 = m1[0]; let b1 = m1[1]; let c1 = m1[2]; let d1 = m1[3]; let tx1 = m1[4]; let ty1 = m1[5];
        let a2 = m2[0]; let b2 = m2[1]; let c2 = m2[2]; let d2 = m2[3]; let tx2 = m2[4]; let ty2 = m2[5];

        vec![
            a1 * a2 + c1 * b2,
            b1 * a2 + d1 * b2,
            a1 * c2 + c1 * d2,
            b1 * c2 + d1 * d2,
            a1 * tx2 + c1 * ty2 + tx1,
            b1 * tx2 + d1 * ty2 + ty1,
        ]
    }

    /// Inversión de matriz afín 2D
    pub fn invert_mat2d(m: &[f32]) -> Vec<f32> {
        let a = m[0]; let b = m[1]; let c = m[2]; let d = m[3]; let tx = m[4]; let ty = m[5];
        let det = a * d - b * c;
        if det.abs() < 1e-8 {
            return vec![1.0, 0.0, 0.0, 1.0, -tx, -ty];
        }
        let inv_det = 1.0 / det;
        let na = d * inv_det;
        let nb = -b * inv_det;
        let nc = -c * inv_det;
        let nd = a * inv_det;
        let ntx = -(na * tx + nc * ty);
        let nty = -(nb * tx + nd * ty);
        vec![na, nb, nc, nd, ntx, nty]
    }

    /// Distancia mínima de un punto (px, py) al segmento (x1, y1)-(x2, y2)
    pub fn distance_to_segment(
        px: f32,
        py: f32,
        x1: f32,
        y1: f32,
        x2: f32,
        y2: f32,
    ) -> f32 {
        let vx = x2 - x1;
        let vy = y2 - y1;
        let len_sq = vx * vx + vy * vy;
        if len_sq < 1e-6 {
            return ((px - x1).powi(2) + (py - y1).powi(2)).sqrt();
        }
        let t = (((px - x1) * vx + (py - y1) * vy) / len_sq).clamp(0.0, 1.0);
        let proj_x = x1 + t * vx;
        let proj_y = y1 + t * vy;
        ((px - proj_x).powi(2) + (py - proj_y).powi(2)).sqrt()
    }
}
