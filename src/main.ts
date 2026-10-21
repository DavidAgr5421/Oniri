import * as THREE from 'three';
import { createTimelineManager } from './animation/timelineManager';
import { mountTimelineView } from './animation/timelineView';
import { createBrushEngine, DOC_H, DOC_W } from './brush/brushEngine';
import { attachStrokeInput } from './brush/strokeInput';
import { mountLayersView } from './layers/layersView';
import { setBrushSettings } from './tools/toolState';
import { mountToolsView } from './tools/toolsView';
import { marchingAnts } from './selection/marchingAnts';
import { transformManager } from './selection/transformGizmo';
import { mountSelectionLauncher } from './selection/selectionLauncher';
import { mountTransformToolbar } from './selection/transformToolbar';

// --- Viewport & Three.js Setup ---
const viewport = document.getElementById('viewport') ?? document.body;
const canvas = document.createElement('canvas');
viewport.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

// Orthographic camera for 2D canvas drawing
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
camera.position.set(0, 0.6, 10);

function updateCameraBounds(): void {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;

  renderer.setSize(width, height);

  // Maintain comfortable margin around the 16x9 canvas
  const targetDocH = 11.5;
  const targetDocW = 19;
  const currentW = targetDocH * aspect;
  const scale = currentW < targetDocW ? targetDocW / currentW : 1;
  const viewH = targetDocH * scale;

  camera.left = (-viewH * aspect) / 2;
  camera.right = (viewH * aspect) / 2;
  camera.top = viewH / 2;
  camera.bottom = -viewH / 2;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', updateCameraBounds);
updateCameraBounds();

// Document background drop shadow / border
const borderGeo = new THREE.PlaneGeometry(16.08, 9.08);
const borderMat = new THREE.MeshBasicMaterial({ color: 0x080808, side: THREE.DoubleSide });
const borderMesh = new THREE.Mesh(borderGeo, borderMat);
borderMesh.position.set(0, 0, -0.01);
scene.add(borderMesh);

// Brush Engine & Canvas Texture
const engine = createBrushEngine();

// Timeline & Animation Manager
const timeline = createTimelineManager(engine.layerManager);
engine.setTimelineManager(timeline);

// Initialize with a default animation folder & Cel 1 if none exists
if (timeline.tracks.length === 0) {
  timeline.createTrack('Animation 1');
}

const canvasTexture = new THREE.CanvasTexture(engine.compositeCanvas);
canvasTexture.minFilter = THREE.LinearFilter;
canvasTexture.magFilter = THREE.LinearFilter;
canvasTexture.generateMipmaps = false;

const canvasGeo = new THREE.PlaneGeometry(16, 9);
const canvasMat = new THREE.MeshBasicMaterial({ map: canvasTexture, side: THREE.DoubleSide });
const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
scene.add(canvasMesh);

// Selection Overlay (Marching Ants)
const selectionTexture = new THREE.CanvasTexture(marchingAnts.overlayCanvas);
selectionTexture.minFilter = THREE.LinearFilter;
selectionTexture.magFilter = THREE.LinearFilter;
selectionTexture.generateMipmaps = false;

const selectionMat = new THREE.MeshBasicMaterial({
  map: selectionTexture,
  transparent: true,
  depthTest: false,
  side: THREE.DoubleSide,
});
const selectionMesh = new THREE.Mesh(canvasGeo, selectionMat);
selectionMesh.position.set(0, 0, 0.005);
scene.add(selectionMesh);

// Attach Pointer Input
attachStrokeInput({
  canvas,
  camera,
  plane: canvasMesh,
  engine,
  docW: DOC_W,
  docH: DOC_H,
  onPickColor: (hex) => {
    setBrushSettings({ color: hex });
  },
});

// Mount Lateral Toolbar and Popup
const toolsContainer = document.getElementById('tools-container');
if (toolsContainer) {
  mountToolsView(toolsContainer, {
    onUndo: () => engine.undo(),
    onRedo: () => engine.redo(),
    onFillSelection: () => engine.fillSelection(),
    onClearSelection: () => engine.clearActiveLayer(),
    onTransform: () => {
      if (transformManager.isTransforming()) {
        transformManager.commitTransform();
      } else {
        transformManager.startTransform(engine);
      }
    },
    timeline,
  });
}

// Mount Layers Panel (CSP Style)
const layersContainer = document.getElementById('layers-container');
if (layersContainer) {
  mountLayersView(layersContainer, engine.layerManager, timeline, engine);
}

// Mount Timeline Palette (CSP Style)
const timelineContainer = document.getElementById('timeline-container');
if (timelineContainer) {
  mountTimelineView(timelineContainer, timeline, engine.layerManager);
  mountTransformToolbar({ camera, canvas });
}

// Mount CSP-style floating launchers (Selection Launcher + Transform Launcher)
mountSelectionLauncher({ camera, canvas, engine });

// Render Loop
function animate(): void {
  requestAnimationFrame(animate);

  if (engine.compositeDirty) {
    engine.updateComposite();
    canvasTexture.needsUpdate = true;
  }

  const antsDirty = marchingAnts.render();
  if (antsDirty) {
    selectionTexture.needsUpdate = true;
  }

  renderer.render(scene, camera);
}
animate();

console.log('AnimacionApp: Lateral Toolbar, Layers Panel, Timeline and Brush Engine mounted.');
