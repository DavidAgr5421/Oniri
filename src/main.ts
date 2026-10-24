import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  PlaneGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  CanvasTexture,
  SRGBColorSpace,
  LinearFilter,
} from 'three';
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
import { mountFileMenu } from './storage/fileMenu';
import { viewportNav } from './canvas/viewportNavigation';
import { mountNavigatorPalette } from './canvas/navigatorView';
import { cameraFrameOverlay } from './canvas/cameraFrameOverlay';
import { brushDiagnostics } from './brush/brushDiagnostics';

// --- Viewport & Three.js Setup ---
const viewport = document.getElementById('viewport') ?? document.body;
const canvas = document.createElement('canvas');
viewport.appendChild(canvas);

const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new Scene();

// Orthographic camera for 2D canvas drawing
const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
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
const borderGeo = new PlaneGeometry(16.08, 9.08);
const borderMat = new MeshBasicMaterial({ color: 0x080808, side: DoubleSide });
const borderMesh = new Mesh(borderGeo, borderMat);
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

let canvasTexture = new CanvasTexture(engine.compositeCanvas);
canvasTexture.colorSpace = SRGBColorSpace;
canvasTexture.minFilter = LinearFilter;
canvasTexture.magFilter = LinearFilter;
canvasTexture.generateMipmaps = false;

const canvasGeo = new PlaneGeometry(16, 9);
const canvasMat = new MeshBasicMaterial({ map: canvasTexture, side: DoubleSide });
const canvasMesh = new Mesh(canvasGeo, canvasMat);
scene.add(canvasMesh);

// Selection Overlay (Marching Ants)
let selectionTexture = new CanvasTexture(marchingAnts.overlayCanvas);
selectionTexture.minFilter = LinearFilter;
selectionTexture.magFilter = LinearFilter;
selectionTexture.generateMipmaps = false;

const selectionMat = new MeshBasicMaterial({
  map: selectionTexture,
  transparent: true,
  depthTest: false,
  side: DoubleSide,
});
const selectionMesh = new Mesh(canvasGeo, selectionMat);
selectionMesh.position.set(0, 0, 0.005);
scene.add(selectionMesh);

// Camera Frame & Overscan Mask Overlay (Clip Studio Paint style)
let cameraFrameTexture = new CanvasTexture(cameraFrameOverlay.canvas);
cameraFrameTexture.minFilter = LinearFilter;
cameraFrameTexture.magFilter = LinearFilter;
cameraFrameTexture.generateMipmaps = false;

const cameraFrameMat = new MeshBasicMaterial({
  map: cameraFrameTexture,
  transparent: true,
  depthTest: false,
  side: DoubleSide,
});
const cameraFrameMesh = new Mesh(canvasGeo, cameraFrameMat);
cameraFrameMesh.position.set(0, 0, 0.007);
scene.add(cameraFrameMesh);

// Initialize Viewport Navigation System (Pan, Zoom, 2D Rotation, Display Mirroring)
viewportNav.init({
  camera,
  canvas,
  meshes: [canvasMesh, borderMesh, selectionMesh, cameraFrameMesh],
});

// Mount CSP Navigator Palette
const appEl = document.getElementById('app') ?? document.body;
const navPalette = mountNavigatorPalette(appEl, {
  engine,
});
navPalette.hide(); // Hidden by default, toggled via top bar or shortcut

// Attach Pointer Input
const strokeInputHandle = attachStrokeInput({
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

engine.onDocumentResize = (w: number, h: number) => {
  strokeInputHandle.setDocDimensions(w, h);
  marchingAnts.resize(w, h);
  cameraFrameOverlay.resize(w, h);

  const aspect = w / h;
  let planeW = 16;
  let planeH = 9;
  if (aspect >= 1) {
    planeW = 16;
    planeH = 16 / aspect;
  } else {
    planeH = 12;
    planeW = 12 * aspect;
  }

  canvasMesh.geometry.dispose();
  const newCanvasGeo = new PlaneGeometry(planeW, planeH);
  canvasMesh.geometry = newCanvasGeo;
  selectionMesh.geometry = newCanvasGeo;
  cameraFrameMesh.geometry = newCanvasGeo;

  borderMesh.geometry.dispose();
  borderMesh.geometry = new PlaneGeometry(planeW + 0.08, planeH + 0.08);

  // Critical WebGL fix: When canvas dimensions change, Three.js textures MUST be disposed and recreated
  // so the GPU allocates fresh textures matching the new dimensions, preventing GL_INVALID_VALUE / glTexSubImage2D overflow.
  canvasTexture.dispose();
  canvasTexture = new CanvasTexture(engine.compositeCanvas);
  canvasTexture.colorSpace = SRGBColorSpace;
  canvasTexture.minFilter = LinearFilter;
  canvasTexture.magFilter = LinearFilter;
  canvasTexture.generateMipmaps = false;
  canvasMat.map = canvasTexture;
  canvasMat.needsUpdate = true;

  selectionTexture.dispose();
  selectionTexture = new CanvasTexture(marchingAnts.overlayCanvas);
  selectionTexture.minFilter = LinearFilter;
  selectionTexture.magFilter = LinearFilter;
  selectionTexture.generateMipmaps = false;
  selectionMat.map = selectionTexture;
  selectionMat.needsUpdate = true;

  cameraFrameTexture.dispose();
  cameraFrameTexture = new CanvasTexture(cameraFrameOverlay.canvas);
  cameraFrameTexture.minFilter = LinearFilter;
  cameraFrameTexture.magFilter = LinearFilter;
  cameraFrameTexture.generateMipmaps = false;
  cameraFrameMat.map = cameraFrameTexture;
  cameraFrameMat.needsUpdate = true;

  viewportNav.resetView();
};

engine.onCompositeUpdated = () => {
  canvasTexture.needsUpdate = true;
};

// Mount Top Command Bar (File, Save, Open, Export, Undo, Redo, Navigation, Drop listener)
const topBarContainer = document.getElementById('top-bar-container');
if (topBarContainer) {
  mountFileMenu(topBarContainer, {
    engine,
    timeline,
    onUndo: () => engine.undo(),
    onRedo: () => engine.redo(),
    onToggleNavigator: () => navPalette.toggle(),
    isNavigatorVisible: () => navPalette.element.style.display !== 'none',
    onFlipView: () => viewportNav.toggleFlipHorizontal(),
  });
}

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
  mountTimelineView(timelineContainer, timeline, engine.layerManager, engine);
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

  const frameDirty = cameraFrameOverlay.render();
  if (frameDirty) {
    cameraFrameTexture.needsUpdate = true;
  }

  renderer.render(scene, camera);
}
animate();

console.log('Oniri Studio Paint: Command Bar, Lateral Toolbar, Layers Panel, Timeline and Brush Engine mounted.');
void brushDiagnostics;
console.log(
  '%c🔍 [Oniri Diagnóstico Activo]%c El perfilador de rendimiento está midiendo trazos en tiempo real.\n • Dibuja cualquier trazo con Lápiz de Boceto para ver el informe en consola.\n • Ejecuta %cwindow.oniriDiagnostics.toggleHud()%c para activar el panel flotante en pantalla.',
  'background: #0284c7; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
  'color: inherit;',
  'color: #38bdf8; font-weight: bold;',
  'color: inherit;'
);
