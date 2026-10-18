export type ToolId = 'brush' | 'eraser' | 'eyedropper' | 'bucket' | 'shape' | 'hand';
export type ShapeType = 'line' | 'rectangle' | 'ellipse';
export type ShapeFillMode = 'stroke' | 'fill';

export interface BrushSettings {
  size: number;
  opacity: number;
  flow: number;
  hardness: number;
  stabilization: number;
  tolerance: number;
  shapeType: ShapeType;
  shapeFill: ShapeFillMode;
  color: string;
}

export interface ToolState {
  tool: ToolId;
  brush: BrushSettings;
  propertiesOpen: boolean;
}

const DEFAULT_BRUSH: BrushSettings = {
  size: 24,
  opacity: 1,
  flow: 1,
  hardness: 0.8,
  stabilization: 3,
  tolerance: 20,
  shapeType: 'rectangle',
  shapeFill: 'stroke',
  color: '#111111',
};

let state: ToolState = {
  tool: 'brush',
  brush: DEFAULT_BRUSH,
  propertiesOpen: true,
};

const listeners = new Set<(s: ToolState) => void>();

function emit(): void {
  for (const listener of listeners) listener(state);
}

export function getToolState(): ToolState {
  return state;
}

export function activeTool(): ToolId {
  return state.tool;
}

export function setTool(tool: ToolId): void {
  if (state.tool === tool) return;
  state = { ...state, tool };
  emit();
}

export function setBrushSettings(patch: Partial<BrushSettings>): void {
  state = { ...state, brush: { ...state.brush, ...patch } };
  emit();
}

export function toggleProperties(force?: boolean): void {
  const next = force !== undefined ? force : !state.propertiesOpen;
  if (state.propertiesOpen === next) return;
  state = { ...state, propertiesOpen: next };
  emit();
}

export function subscribeTools(listener: (s: ToolState) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
