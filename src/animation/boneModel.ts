import type { InterpolationType } from './timelineModel';
import { rustStrokeEngine } from '../brush/rustStrokeEngine';

export type BoneInteractionMode = 'rig' | 'pose_fk' | 'pose_ik' | 'mesh_weights';

export interface Bone2D {
  id: string;
  name: string;
  parentId: string | null;
  // Rest / Bind pose in document coordinates (pixels, 0..DOC_W, 0..DOC_H)
  // If parentId === null, restX and restY are in document coordinates.
  // If parentId !== null, restX and restY are local coordinates in the parent bone's frame
  // (where +X is along the parent bone's direction, so a connected child has restX = parent.length, restY = 0).
  restX: number;
  restY: number;
  restRotation: number; // Degrees relative to parent (or document +X if root)
  length: number;       // Visual length of bone in pixels
  color: string;
  ikBendPositive?: boolean; // Preferred knee/elbow bend direction for 2-bone IK
}

export interface BonePoseDelta {
  dX: number;        // Animated offset X in parent space (default 0)
  dY: number;        // Animated offset Y in parent space (default 0)
  dRotation: number; // Animated rotation delta in degrees (default 0)
  scaleX: number;    // Scale along bone (default 1)
  scaleY: number;    // Scale perpendicular to bone (default 1)
}

export interface SkeletonKeyframe {
  frame: number;
  interpolation: InterpolationType;
  // boneId -> BonePoseDelta
  poses: Map<string, BonePoseDelta>;
}

export interface EvaluatedBoneWorld {
  id: string;
  name: string;
  parentId: string | null;
  // Rest / Bind pose world transform
  bindHeadX: number;
  bindHeadY: number;
  bindTailX: number;
  bindTailY: number;
  bindWorldAngleDeg: number;
  bindMatrix: [number, number, number, number, number, number]; // [a, b, c, d, tx, ty]
  bindInverseMatrix: [number, number, number, number, number, number];
  // Animated pose world transform at frame
  headX: number;
  headY: number;
  tailX: number;
  tailY: number;
  worldAngleDeg: number;
  worldScaleX: number;
  worldScaleY: number;
  worldMatrix: [number, number, number, number, number, number]; // [a, b, c, d, tx, ty]
  // Skinning matrix: M_world * M_bind^-1 (maps a document point from bind pose to animated pose)
  skinMatrix: [number, number, number, number, number, number];
  length: number;
  color: string;
}

export interface LayerMeshSkin {
  layerId: string;
  cols: number;
  rows: number;
  bounds: { x: number; y: number; w: number; h: number };
  // Rest vertices in document space: length = (cols + 1) * (rows + 1)
  vertices: {
    x: number;
    y: number;
    u: number; // 0..1 within bounds
    v: number; // 0..1 within bounds
    weights: { boneId: string; weight: number }[];
  }[];
  // Triangle index triplets into vertices[]
  indices: [number, number, number][];
  // Optional packed typed arrays for zero-copy Rust/WASM Linear Blend Skinning
  packedVertices?: Float32Array;
  packedIndices?: Uint32Array;
  boneOrderIds?: string[];
}

// --- 2D Affine Matrix Math ([a, b, c, d, tx, ty] matching Canvas2D transform(a,b,c,d,e,f)) ---

export type Mat2D = [number, number, number, number, number, number];

export function identityMat2D(): Mat2D {
  return [1, 0, 0, 1, 0, 0];
}

export function composeMat2D(m1: Mat2D, m2: Mat2D): Mat2D {
  const [a1, b1, c1, d1, tx1, ty1] = m1;
  const [a2, b2, c2, d2, tx2, ty2] = m2;
  return [
    a1 * a2 + c1 * b2,
    b1 * a2 + d1 * b2,
    a1 * c2 + c1 * d2,
    b1 * c2 + d1 * d2,
    a1 * tx2 + c1 * ty2 + tx1,
    b1 * tx2 + d1 * ty2 + ty1,
  ];
}

export function invertMat2D(m: Mat2D): Mat2D {
  const [a, b, c, d, tx, ty] = m;
  const det = a * d - b * c;
  if (Math.abs(det) < 1e-8) {
    return [1, 0, 0, 1, -tx, -ty];
  }
  const invDet = 1 / det;
  const na = d * invDet;
  const nb = -b * invDet;
  const nc = -c * invDet;
  const nd = a * invDet;
  const ntx = -(na * tx + nc * ty);
  const nty = -(nb * tx + nd * ty);
  return [na, nb, nc, nd, ntx, nty];
}

export function makeTRS(x: number, y: number, angleDeg: number, sx = 1, sy = 1): Mat2D {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return [cos * sx, sin * sx, -sin * sy, cos * sy, x, y];
}

export function transformPoint2D(m: Mat2D, x: number, y: number): { x: number; y: number } {
  return {
    x: m[0] * x + m[2] * y + m[4],
    y: m[1] * x + m[3] * y + m[5],
  };
}

// --- Forward Kinematics (FK) & Skinning Matrix Evaluation ---

export function evaluateArmatureWorld(
  bones: Bone2D[],
  poseMap?: Map<string, BonePoseDelta>
): Map<string, EvaluatedBoneWorld> {
  const result = new Map<string, EvaluatedBoneWorld>();
  const boneMap = new Map(bones.map((b) => [b.id, b]));

  function evalBone(bone: Bone2D, visiting = new Set<string>()): EvaluatedBoneWorld {
    const cached = result.get(bone.id);
    if (cached) return cached;

    visiting.add(bone.id);
    const parent =
      bone.parentId && !visiting.has(bone.parentId) ? boneMap.get(bone.parentId) : undefined;
    const parentEval = parent ? evalBone(parent, visiting) : undefined;

    const delta = poseMap?.get(bone.id);
    const dX = delta?.dX ?? 0;
    const dY = delta?.dY ?? 0;
    const dRot = delta?.dRotation ?? 0;
    const sx = delta?.scaleX ?? 1;
    const sy = delta?.scaleY ?? 1;

    // 1. Bind / Rest Local & World Matrix
    const localBind = makeTRS(bone.restX, bone.restY, bone.restRotation, 1, 1);
    const bindMatrix = parentEval ? composeMat2D(parentEval.bindMatrix, localBind) : localBind;
    const bindInverseMatrix = invertMat2D(bindMatrix);
    const bindHead = transformPoint2D(bindMatrix, 0, 0);
    const bindTail = transformPoint2D(bindMatrix, bone.length, 0);
    const bindWorldAngleDeg = parentEval
      ? parentEval.bindWorldAngleDeg + bone.restRotation
      : bone.restRotation;

    // 2. Animated Pose Local & World Matrix
    const localPose = makeTRS(bone.restX + dX, bone.restY + dY, bone.restRotation + dRot, sx, sy);
    const worldMatrix = parentEval ? composeMat2D(parentEval.worldMatrix, localPose) : localPose;
    const head = transformPoint2D(worldMatrix, 0, 0);
    const tail = transformPoint2D(worldMatrix, bone.length, 0);
    const worldAngleDeg = parentEval
      ? parentEval.worldAngleDeg + bone.restRotation + dRot
      : bone.restRotation + dRot;
    const worldScaleX = parentEval ? parentEval.worldScaleX * sx : sx;
    const worldScaleY = parentEval ? parentEval.worldScaleY * sy : sy;

    // 3. Skinning Matrix: M_world * M_bind^-1
    const skinMatrix = composeMat2D(worldMatrix, bindInverseMatrix);

    const evaluated: EvaluatedBoneWorld = {
      id: bone.id,
      name: bone.name,
      parentId: bone.parentId,
      bindHeadX: bindHead.x,
      bindHeadY: bindHead.y,
      bindTailX: bindTail.x,
      bindTailY: bindTail.y,
      bindWorldAngleDeg,
      bindMatrix,
      bindInverseMatrix,
      headX: head.x,
      headY: head.y,
      tailX: tail.x,
      tailY: tail.y,
      worldAngleDeg,
      worldScaleX,
      worldScaleY,
      worldMatrix,
      skinMatrix,
      length: bone.length,
      color: bone.color,
    };

    result.set(bone.id, evaluated);
    return evaluated;
  }

  for (const b of bones) {
    evalBone(b);
  }

  return result;
}

// --- Analytical 2-Bone Inverse Kinematics (Law of Cosines) + 1-Bone Look-At ---

export function solveTwoBoneIK(
  bones: Bone2D[],
  currentPoses: Map<string, BonePoseDelta>,
  endBoneId: string,
  targetX: number,
  targetY: number
): Map<string, BonePoseDelta> {
  const updated = new Map<string, BonePoseDelta>();
  for (const [k, v] of currentPoses.entries()) {
    updated.set(k, { ...v });
  }

  const boneMap = new Map(bones.map((b) => [b.id, b]));
  const childBone = boneMap.get(endBoneId);
  if (!childBone) return updated;

  const evalMap = evaluateArmatureWorld(bones, updated);
  const childEval = evalMap.get(childBone.id);
  if (!childEval) return updated;

  const parentBone = childBone.parentId ? boneMap.get(childBone.parentId) : undefined;
  const parentEval = parentBone ? evalMap.get(parentBone.id) : undefined;

  // Fallback to 1-bone Aim if there is no parent bone
  if (!parentBone || !parentEval) {
    const desiredWorldAngle = (Math.atan2(targetY - childEval.headY, targetX - childEval.headX) * 180) / Math.PI;
    const dRot = normalizeAngleDeg(desiredWorldAngle - childBone.restRotation);
    const prev = updated.get(childBone.id) ?? { dX: 0, dY: 0, dRotation: 0, scaleX: 1, scaleY: 1 };
    updated.set(childBone.id, { ...prev, dRotation: dRot });
    return updated;
  }

  // Check if childBone head is attached near parentBone tail for 2-bone limb IK
  const rootX = parentEval.headX;
  const rootY = parentEval.headY;
  const L1 = Math.max(1, Math.hypot(childEval.headX - rootX, childEval.headY - rootY));
  const L2 = Math.max(1, childBone.length * childEval.worldScaleX);

  const dx = targetX - rootX;
  const dy = targetY - rootY;
  const distRaw = Math.hypot(dx, dy);
  const maxReach = Math.max(1, L1 + L2 - 0.01);
  const minReach = Math.abs(L1 - L2) + 0.01;
  const D = Math.max(minReach, Math.min(maxReach, distRaw));

  const baseAngleRad = Math.atan2(dy, dx);

  // Law of cosines for interior angles
  const cosAngle1 = Math.max(-1, Math.min(1, (L1 * L1 + D * D - L2 * L2) / (2 * L1 * D)));
  const cosAngle2 = Math.max(-1, Math.min(1, (L1 * L1 + L2 * L2 - D * D) / (2 * L1 * L2)));

  const bendSign = childBone.ikBendPositive === false ? -1 : 1;
  const angle1Rad = baseAngleRad - bendSign * Math.acos(cosAngle1);
  const interiorKneeRad = Math.acos(cosAngle2);
  const childLocalAngleRad = bendSign * (Math.PI - interiorKneeRad);

  // Convert parent desired world angle to parent's dRotation
  const grandParentEval = parentBone.parentId ? evalMap.get(parentBone.parentId) : undefined;
  const grandParentWorldAngle = grandParentEval ? grandParentEval.worldAngleDeg : 0;

  const desiredParentWorldDeg = (angle1Rad * 180) / Math.PI;
  const newParentDRot = normalizeAngleDeg(
    desiredParentWorldDeg - grandParentWorldAngle - parentBone.restRotation
  );

  const desiredChildRelativeDeg = (childLocalAngleRad * 180) / Math.PI;
  const newChildDRot = normalizeAngleDeg(desiredChildRelativeDeg - childBone.restRotation);

  const prevParentPose = updated.get(parentBone.id) ?? {
    dX: 0,
    dY: 0,
    dRotation: 0,
    scaleX: 1,
    scaleY: 1,
  };
  updated.set(parentBone.id, { ...prevParentPose, dRotation: newParentDRot });

  const prevChildPose = updated.get(childBone.id) ?? {
    dX: 0,
    dY: 0,
    dRotation: 0,
    scaleX: 1,
    scaleY: 1,
  };
  updated.set(childBone.id, { ...prevChildPose, dRotation: newChildDRot });

  return updated;
}

export function normalizeAngleDeg(deg: number): number {
  let a = ((deg + 180) % 360 + 360) % 360 - 180;
  if (a === -180) a = 180;
  return a;
}

// --- Distance from Point to Bone Segment (for hit-testing & automatic skinning weights) ---

export function distanceToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const vx = x2 - x1;
  const vy = y2 - y1;
  const lenSq = vx * vx + vy * vy;
  if (lenSq < 1e-6) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * vx + (py - y1) * vy) / lenSq));
  const projX = x1 + t * vx;
  const projY = y1 + t * vy;
  return Math.hypot(px - projX, py - projY);
}

// --- Automatic 2D Mesh Generation & Linear Blend Skinning (LBS) ---

export function buildLayerMeshSkin(
  layerId: string,
  canvas: HTMLCanvasElement,
  bones: Bone2D[],
  cols = 10,
  rows = 10
): LayerMeshSkin | null {
  if (bones.length === 0) return null;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const w = canvas.width;
  const h = canvas.height;
  const img = ctx.getImageData(0, 0, w, h).data;

  // Compute non-transparent pixel bounding box (with margin)
  let minX = 0;
  let minY = 0;
  let bw = w;
  let bh = h;

  const rustBounds = rustStrokeEngine.scanLayerBounds(img, w, h, 4, 24);
  if (rustBounds) {
    [minX, minY, bw, bh] = rustBounds;
  } else {
    minX = w;
    minY = h;
    let maxX = 0;
    let maxY = 0;
    let foundPixels = false;

    const step = 4; // Fast scan stride
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const alpha = img[(y * w + x) * 4 + 3];
        if (alpha > 8) {
          foundPixels = true;
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!foundPixels) {
      minX = 0;
      minY = 0;
      maxX = w;
      maxY = h;
    } else {
      const pad = 24;
      minX = Math.max(0, minX - pad);
      minY = Math.max(0, minY - pad);
      maxX = Math.min(w, maxX + pad);
      maxY = Math.min(h, maxY + pad);
    }

    bw = Math.max(32, maxX - minX);
    bh = Math.max(32, maxY - minY);
  }

  // Evaluate bind pose of all bones
  const bindEval = Array.from(evaluateArmatureWorld(bones).values());
  const boneOrderIds = bindEval.map((b) => b.id);
  const boneSegments = new Float32Array(bindEval.length * 4);
  for (let i = 0; i < bindEval.length; i++) {
    const b = bindEval[i];
    boneSegments[i * 4] = b.bindHeadX;
    boneSegments[i * 4 + 1] = b.bindHeadY;
    boneSegments[i * 4 + 2] = b.bindTailX;
    boneSegments[i * 4 + 3] = b.bindTailY;
  }

  const packedVertices =
    rustStrokeEngine.buildMeshVertices(minX, minY, bw, bh, cols, rows, boneSegments) ?? undefined;

  const vertices: LayerMeshSkin['vertices'] = [];
  if (packedVertices) {
    const totalVerts = packedVertices.length / 10;
    for (let i = 0; i < totalVerts; i++) {
      const base = i * 10;
      const weights: { boneId: string; weight: number }[] = [];
      for (let k = 0; k < 3; k++) {
        const bIdx = Math.round(packedVertices[base + 4 + k * 2]);
        const wVal = packedVertices[base + 5 + k * 2];
        if (bIdx >= 0 && bIdx < boneOrderIds.length && wVal > 0) {
          weights.push({ boneId: boneOrderIds[bIdx], weight: wVal });
        }
      }
      vertices.push({
        x: packedVertices[base],
        y: packedVertices[base + 1],
        u: packedVertices[base + 2],
        v: packedVertices[base + 3],
        weights,
      });
    }
  } else {
    for (let r = 0; r <= rows; r++) {
      const v = r / rows;
      const vy = minY + v * bh;
      for (let c = 0; c <= cols; c++) {
        const u = c / cols;
        const vx = minX + u * bw;

        // Compute inverse-distance squared weights to each bone in bind pose (top 3 influences)
        const rawWeights = bindEval.map((b) => {
          const d = distanceToSegment(vx, vy, b.bindHeadX, b.bindHeadY, b.bindTailX, b.bindTailY);
          const wVal = 1 / Math.pow(Math.max(6, d), 2.2);
          return { boneId: b.id, weight: wVal };
        });

        rawWeights.sort((a, b) => b.weight - a.weight);
        const top = rawWeights.slice(0, Math.min(3, rawWeights.length));
        const sum = top.reduce((acc, item) => acc + item.weight, 0) || 1;
        const normalized = top.map((item) => ({
          boneId: item.boneId,
          weight: item.weight / sum,
        }));

        vertices.push({
          x: vx,
          y: vy,
          u,
          v,
          weights: normalized,
        });
      }
    }
  }

  const indices: [number, number, number][] = [];
  const packedIndices = new Uint32Array(rows * cols * 6);
  let pIdx = 0;
  const stride = cols + 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i0 = r * stride + c;
      const i1 = i0 + 1;
      const i2 = (r + 1) * stride + c;
      const i3 = i2 + 1;
      indices.push([i0, i1, i2]);
      indices.push([i1, i3, i2]);
      packedIndices[pIdx++] = i0;
      packedIndices[pIdx++] = i1;
      packedIndices[pIdx++] = i2;
      packedIndices[pIdx++] = i1;
      packedIndices[pIdx++] = i3;
      packedIndices[pIdx++] = i2;
    }
  }

  return {
    layerId,
    cols,
    rows,
    bounds: { x: minX, y: minY, w: bw, h: bh },
    vertices,
    indices,
    packedVertices,
    packedIndices,
    boneOrderIds,
  };
}

// --- Render a Skinned Mesh Deformed by Evaluated Bones onto a 2D Canvas ---

export function renderSkinnedLayerMesh(
  targetCtx: CanvasRenderingContext2D,
  sourceCanvas: HTMLCanvasElement,
  mesh: LayerMeshSkin,
  evaluatedBones: Map<string, EvaluatedBoneWorld>
): void {
  const { x: bx, y: by, w: bw, h: bh } = mesh.bounds;

  if (
    rustStrokeEngine.available &&
    mesh.packedVertices &&
    mesh.packedIndices &&
    mesh.boneOrderIds &&
    mesh.boneOrderIds.length > 0
  ) {
    const boneCount = mesh.boneOrderIds.length;
    const skinMatrices = new Float32Array(boneCount * 6);
    for (let i = 0; i < boneCount; i++) {
      const bEval = evaluatedBones.get(mesh.boneOrderIds[i]);
      const base = i * 6;
      if (bEval) {
        const m = bEval.skinMatrix;
        skinMatrices[base] = m[0];
        skinMatrices[base + 1] = m[1];
        skinMatrices[base + 2] = m[2];
        skinMatrices[base + 3] = m[3];
        skinMatrices[base + 4] = m[4];
        skinMatrices[base + 5] = m[5];
      } else {
        skinMatrices[base] = 1;
        skinMatrices[base + 3] = 1;
      }
    }

    const batch = rustStrokeEngine.computeSkinnedTriangles(
      mesh.packedVertices,
      mesh.packedIndices,
      skinMatrices,
      bx,
      by,
      bw,
      bh,
    );
    if (batch && batch.count > 0) {
      const tris = batch.triangles;
      for (let t = 0; t < batch.count; t++) {
        const base = t * 12;
        targetCtx.save();
        targetCtx.beginPath();
        targetCtx.moveTo(tris[base], tris[base + 1]);
        targetCtx.lineTo(tris[base + 2], tris[base + 3]);
        targetCtx.lineTo(tris[base + 4], tris[base + 5]);
        targetCtx.closePath();
        targetCtx.clip();
        targetCtx.transform(
          tris[base + 6],
          tris[base + 7],
          tris[base + 8],
          tris[base + 9],
          tris[base + 10],
          tris[base + 11],
        );
        targetCtx.drawImage(sourceCanvas, 0, 0);
        targetCtx.restore();
      }
      return;
    }
  }

  // JS Fallback: Compute deformed vertex positions via Linear Blend Skinning (LBS)
  const deformed: { x: number; y: number }[] = new Array(mesh.vertices.length);
  for (let i = 0; i < mesh.vertices.length; i++) {
    const vtx = mesh.vertices[i];
    let dx = 0;
    let dy = 0;
    let totalW = 0;

    for (const inf of vtx.weights) {
      const bEval = evaluatedBones.get(inf.boneId);
      if (!bEval) continue;
      const pt = transformPoint2D(bEval.skinMatrix, vtx.x, vtx.y);
      dx += pt.x * inf.weight;
      dy += pt.y * inf.weight;
      totalW += inf.weight;
    }

    if (totalW > 0) {
      deformed[i] = { x: dx / totalW, y: dy / totalW };
    } else {
      deformed[i] = { x: vtx.x, y: vtx.y };
    }
  }

  // Draw textured triangles using affine UV-to-XY triangle mapping
  for (const [i0, i1, i2] of mesh.indices) {
    const v0 = mesh.vertices[i0];
    const v1 = mesh.vertices[i1];
    const v2 = mesh.vertices[i2];

    const p0 = deformed[i0];
    const p1 = deformed[i1];
    const p2 = deformed[i2];

    const sx0 = bx + v0.u * bw;
    const sy0 = by + v0.v * bh;
    const sx1 = bx + v1.u * bw;
    const sy1 = by + v1.v * bh;
    const sx2 = bx + v2.u * bw;
    const sy2 = by + v2.v * bh;

    drawTexturedTriangle(
      targetCtx,
      sourceCanvas,
      sx0,
      sy0,
      sx1,
      sy1,
      sx2,
      sy2,
      p0.x,
      p0.y,
      p1.x,
      p1.y,
      p2.x,
      p2.y
    );
  }
}

function drawTexturedTriangle(
  ctx: CanvasRenderingContext2D,
  img: HTMLCanvasElement,
  u0: number,
  v0: number,
  u1: number,
  v1: number,
  u2: number,
  v2: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): void {
  const denom = u0 * (v2 - v1) - u1 * v2 + u2 * v1 + (u1 - u2) * v0;
  if (Math.abs(denom) < 1e-5) return;

  // Slightcentroid expansion (0.45px) to prevent sub-pixel seams between adjacent triangles
  const cx = (x0 + x1 + x2) / 3;
  const cy = (y0 + y1 + y2) / 3;
  const expand = (px: number, py: number) => {
    const d = Math.hypot(px - cx, py - cy);
    if (d < 1e-3) return { x: px, y: py };
    const f = (d + 0.45) / d;
    return { x: cx + (px - cx) * f, y: cy + (py - cy) * f };
  };
  const ep0 = expand(x0, y0);
  const ep1 = expand(x1, y1);
  const ep2 = expand(x2, y2);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(ep0.x, ep0.y);
  ctx.lineTo(ep1.x, ep1.y);
  ctx.lineTo(ep2.x, ep2.y);
  ctx.closePath();
  ctx.clip();

  const m11 = -(v0 * (x2 - x1) - v1 * x2 + v2 * x1 + (v1 - v2) * x0) / denom;
  const m12 = (v1 * y2 + v0 * (y1 - y2) - v2 * y1 + (v2 - v1) * y0) / denom;
  const m21 = (u0 * (x2 - x1) - u1 * x2 + u2 * x1 + (u1 - u2) * x0) / denom;
  const m22 = -(u1 * y2 + u0 * (y1 - y2) - u2 * y1 + (u2 - u1) * y0) / denom;
  const dx =
    (u0 * (v2 * x1 - v1 * x2) + v0 * (u1 * x2 - u2 * x1) + (u2 * v1 - u1 * v2) * x0) / denom;
  const dy =
    (u0 * (v2 * y1 - v1 * y2) + v0 * (u1 * y2 - u2 * y1) + (u2 * v1 - u1 * v2) * y0) / denom;

  ctx.transform(m11, m12, m21, m22, dx, dy);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}
