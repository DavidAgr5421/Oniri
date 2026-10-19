export type ToolId = 'pen' | 'brush' | 'eraser' | 'eyedropper' | 'bucket' | 'shape' | 'hand';
export type ShapeType = 'line' | 'rectangle' | 'ellipse';
export type ShapeFillMode = 'stroke' | 'fill';
export type TipShape = 'circle' | 'square' | 'calligraphic';
export type AntiAliasingLevel = 'none' | 'weak' | 'medium' | 'strong';
export type InkMode = 'uniform' | 'accumulate';

export interface BrushSettings {
  size: number;
  minSizeRatio: number;
  pressureSize: boolean;
  pressureCurve: number;
  opacity: number;
  flow: number;
  pressureFlow: boolean;
  inkMode: InkMode;
  hardness: number;
  antiAliasing: AntiAliasingLevel;
  spacing: number;
  tipShape: TipShape;
  tipRoundness: number;
  tipAngle: number;
  followDirection: boolean;
  taperStart: number;
  taperEnd: number;
  stabilization: number;
  tolerance: number;
  shapeType: ShapeType;
  shapeFill: ShapeFillMode;
  color: string;
}

export interface SubTool {
  id: string;
  name: string;
  tool: ToolId;
  description: string;
  settings: Partial<BrushSettings>;
  custom?: boolean;
}

export const SUBTOOLS: SubTool[] = [
  // Pen / Inking tools (P)
  {
    id: 'g-pen',
    name: 'Pluma G (G-Pen)',
    tool: 'pen',
    description: 'Trazo nítido y dinámico con alta respuesta a la presión.',
    settings: {
      size: 6,
      minSizeRatio: 0.0,
      pressureSize: true,
      pressureCurve: 1.35,
      flow: 1.0,
      pressureFlow: false,
      inkMode: 'uniform',
      hardness: 1.0,
      antiAliasing: 'medium',
      spacing: 0.06,
      tipShape: 'circle',
      taperStart: 8,
      taperEnd: 18,
      stabilization: 5,
    },
  },
  {
    id: 'real-g-pen',
    name: 'Pluma G Real',
    tool: 'pen',
    description: 'Textura analógica y leve sangrado para manga tradicional.',
    settings: {
      size: 5,
      minSizeRatio: 0.1,
      pressureSize: true,
      pressureCurve: 1.2,
      flow: 0.95,
      pressureFlow: true,
      inkMode: 'uniform',
      hardness: 0.85,
      antiAliasing: 'weak',
      spacing: 0.07,
      tipShape: 'circle',
      taperStart: 6,
      taperEnd: 14,
      stabilization: 4,
    },
  },
  {
    id: 'turnip-pen',
    name: 'Pluma Cuchara (Kabura)',
    tool: 'pen',
    description: 'Grosor consistente y líneas limpias para entintar detalles.',
    settings: {
      size: 4,
      minSizeRatio: 0.65,
      pressureSize: true,
      pressureCurve: 1.0,
      flow: 1.0,
      pressureFlow: false,
      inkMode: 'uniform',
      hardness: 1.0,
      antiAliasing: 'medium',
      spacing: 0.06,
      tipShape: 'circle',
      taperStart: 3,
      taperEnd: 8,
      stabilization: 6,
    },
  },
  {
    id: 'manga-line',
    name: 'Entintado Manga',
    tool: 'pen',
    description: 'Estabilización alta para curvas suaves sin temblor de pulso.',
    settings: {
      size: 8,
      minSizeRatio: 0.0,
      pressureSize: true,
      pressureCurve: 1.5,
      flow: 1.0,
      pressureFlow: false,
      inkMode: 'uniform',
      hardness: 1.0,
      antiAliasing: 'weak',
      spacing: 0.05,
      tipShape: 'circle',
      taperStart: 12,
      taperEnd: 24,
      stabilization: 8,
    },
  },

  // Brush / Painting tools (B)
  {
    id: 'watercolor',
    name: 'Acuarela Suave',
    tool: 'brush',
    description: 'Bordes suaves translúcidos ideales para colorear y sombras.',
    settings: {
      size: 30,
      minSizeRatio: 0.5,
      pressureSize: true,
      pressureCurve: 1.2,
      flow: 0.45,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.35,
      antiAliasing: 'strong',
      spacing: 0.08,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 3,
    },
  },
  {
    id: 'thick-paint',
    name: 'Óleo / Pintura Densa',
    tool: 'brush',
    description: 'Pincelada corpórea con cobertura rápida y buena mezcla.',
    settings: {
      size: 26,
      minSizeRatio: 0.6,
      pressureSize: true,
      pressureCurve: 1.2,
      flow: 0.85,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.7,
      antiAliasing: 'medium',
      spacing: 0.06,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 2,
    },
  },
  {
    id: 'airbrush',
    name: 'Aerógrafo Suave',
    tool: 'brush',
    description: 'Gradaciones difuminadas sin textura de borde evidente.',
    settings: {
      size: 60,
      minSizeRatio: 0.4,
      pressureSize: true,
      pressureCurve: 1.1,
      flow: 0.3,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.1,
      antiAliasing: 'strong',
      spacing: 0.04,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 1,
    },
  },
  {
    id: 'flat-brush',
    name: 'Pincel Plano',
    tool: 'brush',
    description: 'Puntas rectangulares para fondos arquitectónicos y ropa.',
    settings: {
      size: 22,
      minSizeRatio: 0.7,
      pressureSize: false,
      pressureCurve: 1.2,
      flow: 0.85,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.9,
      antiAliasing: 'medium',
      spacing: 0.05,
      tipShape: 'square',
      tipRoundness: 0.28,
      tipAngle: 35,
      followDirection: true,
      taperStart: 0,
      taperEnd: 0,
      stabilization: 2,
    },
  },

  // Eraser tools (E)
  {
    id: 'hard-eraser',
    name: 'Borrador Duro',
    tool: 'eraser',
    description: 'Eliminación 100% limpia sin halos difusos.',
    settings: {
      size: 24,
      minSizeRatio: 0.3,
      pressureSize: false,
      pressureCurve: 1.2,
      flow: 1.0,
      pressureFlow: false,
      inkMode: 'uniform',
      hardness: 1.0,
      antiAliasing: 'medium',
      spacing: 0.05,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 3,
    },
  },
  {
    id: 'soft-eraser',
    name: 'Borrador Suave',
    tool: 'eraser',
    description: 'Desvanecimiento gradual para degradados y luz.',
    settings: {
      size: 36,
      minSizeRatio: 0.5,
      pressureSize: true,
      pressureCurve: 1.2,
      flow: 0.6,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.25,
      antiAliasing: 'strong',
      spacing: 0.05,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 2,
    },
  },
  {
    id: 'kneaded-eraser',
    name: 'Goma Maleable',
    tool: 'eraser',
    description: 'Baja opacidad para aclarar trazos suavemente.',
    settings: {
      size: 50,
      minSizeRatio: 0.6,
      pressureSize: true,
      pressureCurve: 1.1,
      flow: 0.3,
      pressureFlow: true,
      inkMode: 'accumulate',
      hardness: 0.4,
      antiAliasing: 'strong',
      spacing: 0.06,
      tipShape: 'circle',
      taperStart: 0,
      taperEnd: 0,
      stabilization: 2,
    },
  },

  // Shape tools (U)
  {
    id: 'straight-line',
    name: 'Línea Directa',
    tool: 'shape',
    description: 'Trazos rectos precisos entre dos puntos.',
    settings: { shapeType: 'line', shapeFill: 'stroke', size: 4 },
  },
  {
    id: 'rect',
    name: 'Rectángulo',
    tool: 'shape',
    description: 'Cajas delimitadoras y marcos ortogonales.',
    settings: { shapeType: 'rectangle', shapeFill: 'stroke', size: 4 },
  },
  {
    id: 'ellipse',
    name: 'Elipse / Círculo',
    tool: 'shape',
    description: 'Círculos y óvalos con o sin relleno.',
    settings: { shapeType: 'ellipse', shapeFill: 'stroke', size: 4 },
  },

  // Bucket tools (G)
  {
    id: 'bucket-layer',
    name: 'Capa de Edición',
    tool: 'bucket',
    description: 'Rellena respetando únicamente las líneas de la capa actual.',
    settings: { tolerance: 20 },
  },
  {
    id: 'bucket-all',
    name: 'Todas las Capas',
    tool: 'bucket',
    description: 'Rellena respetando la composición visible de todas las capas.',
    settings: { tolerance: 35 },
  },

  // Eyedropper (I)
  {
    id: 'eyedropper-pixel',
    name: 'Cuentagotas',
    tool: 'eyedropper',
    description: 'Muestrea el color exacto del píxel seleccionado.',
    settings: {},
  },

  // Hand (H)
  {
    id: 'hand-pan',
    name: 'Mover Lienzo',
    tool: 'hand',
    description: 'Desplaza el encuadre del lienzo sin alterarlo.',
    settings: {},
  },
];

export interface ToolState {
  tool: ToolId;
  activeSubToolId: string;
  brush: BrushSettings;
  propertiesOpen: boolean;
  // Clip Studio Paint Color System
  primaryColor: string;
  secondaryColor: string;
  activeColorSlot: 'primary' | 'secondary';
  isTransparentColor: boolean;
  colorHistory: string[];
}

export const DEFAULT_BRUSH: BrushSettings = {
  size: 6,
  minSizeRatio: 0.15,
  pressureSize: true,
  pressureCurve: 1.2,
  opacity: 1,
  flow: 1,
  pressureFlow: false,
  inkMode: 'uniform',
  hardness: 1.0,
  antiAliasing: 'medium',
  spacing: 0.06,
  tipShape: 'circle',
  tipRoundness: 1,
  tipAngle: 0,
  followDirection: false,
  taperStart: 6,
  taperEnd: 12,
  stabilization: 5,
  tolerance: 20,
  shapeType: 'rectangle',
  shapeFill: 'stroke',
  color: '#111111',
};

const DEFAULT_HISTORY = [
  '#111111',
  '#ffffff',
  '#e74c3c',
  '#e67e22',
  '#f1c40f',
  '#2ecc71',
  '#1abc9c',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#7f8c8d',
  '#bdc3c7',
];

// ---------------------------------------------------------------------------
// Sub Tool persistence (Clip Studio Paint "Sub Tool Detail" style)
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'oniri.subtools.v1';

const TOOL_IDS: ToolId[] = ['pen', 'brush', 'eraser', 'eyedropper', 'bucket', 'shape', 'hand'];

function isValidSubTool(value: unknown): value is SubTool {
  if (!value || typeof value !== 'object') return false;
  const s = value as Partial<SubTool>;
  return (
    typeof s.id === 'string' &&
    typeof s.name === 'string' &&
    typeof s.tool === 'string' &&
    TOOL_IDS.includes(s.tool as ToolId) &&
    !!s.settings &&
    typeof s.settings === 'object'
  );
}

interface SubToolStorage {
  v: number;
  items: SubTool[];
  deleted: string[];
}

function cloneSubTools(list: SubTool[]): SubTool[] {
  return list.map((s) => ({ ...s, settings: { ...s.settings } }));
}

let deletedBaseIds: string[] = [];

function loadSubTools(): SubTool[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SubToolStorage>;
      if (
        parsed &&
        parsed.v === 1 &&
        Array.isArray(parsed.items) &&
        parsed.items.length > 0 &&
        parsed.items.every(isValidSubTool)
      ) {
        const items = cloneSubTools(parsed.items);
        deletedBaseIds = Array.isArray(parsed.deleted)
          ? parsed.deleted.filter((d): d is string => typeof d === 'string')
          : [];
        const present = new Set(items.map((s) => s.id));
        for (const base of SUBTOOLS) {
          if (!present.has(base.id) && !deletedBaseIds.includes(base.id)) {
            items.push({ ...base, settings: { ...base.settings } });
          }
        }
        return items;
      }
    }
  } catch {
    // Storage corrupted or unavailable: fall back to factory presets.
  }
  return cloneSubTools(SUBTOOLS);
}

let subTools: SubTool[] = loadSubTools();

function persistSubTools(): void {
  try {
    const storage: SubToolStorage = { v: 1, items: subTools, deleted: [...deletedBaseIds] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch {
    // Storage full or unavailable: the in-memory session keeps working.
  }
}

function findSubTool(id: string): SubTool | undefined {
  return subTools.find((s) => s.id === id);
}

function factorySettingsFor(tool: ToolId): Partial<BrushSettings> {
  const template = SUBTOOLS.find((b) => b.tool === tool);
  return template ? { ...template.settings } : {};
}

function mergeBrush(sub: SubTool, color: string): BrushSettings {
  return { ...DEFAULT_BRUSH, ...sub.settings, color };
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const initialSub = findSubTool('g-pen') ?? subTools[0];

let state: ToolState = {
  tool: 'pen',
  activeSubToolId: initialSub ? initialSub.id : 'g-pen',
  brush: initialSub ? mergeBrush(initialSub, DEFAULT_BRUSH.color) : { ...DEFAULT_BRUSH },
  propertiesOpen: true,
  primaryColor: '#111111',
  secondaryColor: '#ffffff',
  activeColorSlot: 'primary',
  isTransparentColor: false,
  colorHistory: DEFAULT_HISTORY,
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
  const subtools = subTools.filter((s) => s.tool === tool);
  const firstSub = subtools[0];
  const nextSubId = firstSub ? firstSub.id : state.activeSubToolId;

  state = {
    ...state,
    tool,
    activeSubToolId: nextSubId,
    brush: firstSub ? mergeBrush(firstSub, state.brush.color) : state.brush,
  };
  emit();
}

export function selectSubTool(subToolId: string): void {
  const found = findSubTool(subToolId);
  if (!found) return;
  state = {
    ...state,
    tool: found.tool,
    activeSubToolId: found.id,
    brush: mergeBrush(found, state.brush.color),
  };
  emit();
}

export function getSubToolsForTool(tool: ToolId): SubTool[] {
  return subTools.filter((s) => s.tool === tool);
}

export function getActiveSubTool(): SubTool | undefined {
  return findSubTool(state.activeSubToolId);
}

export function setBrushSettings(patch: Partial<BrushSettings>): void {
  state = {
    ...state,
    brush: { ...state.brush, ...patch },
  };

  // Every sub tool remembers its own configuration (like CSP sub tools).
  const sub = findSubTool(state.activeSubToolId);
  if (sub) {
    const subPatch: Partial<BrushSettings> = { ...patch };
    delete subPatch.color; // Color is global, owned by the color widget.
    sub.settings = { ...sub.settings, ...subPatch };
    persistSubTools();
  }

  if (patch.color && !state.isTransparentColor) {
    if (state.activeColorSlot === 'primary') {
      state.primaryColor = patch.color;
    } else {
      state.secondaryColor = patch.color;
    }
    addColorToHistory(patch.color);
  }
  emit();
}

// ---------------------------------------------------------------------------
// Sub Tool CRUD
// ---------------------------------------------------------------------------

let customCounter = 0;

function nextCustomId(): string {
  customCounter += 1;
  return `custom-${Date.now().toString(36)}-${customCounter.toString(36)}`;
}

export function createCustomSubTool(name: string, tool?: ToolId): SubTool {
  const targetTool: ToolId = tool ?? state.tool;
  const template = tool
    ? factorySettingsFor(targetTool)
    : { ...(findSubTool(state.activeSubToolId)?.settings ?? {}) };
  const source = tool ? undefined : findSubTool(state.activeSubToolId);

  const sub: SubTool = {
    id: nextCustomId(),
    name: name.trim() || 'Pincel nuevo',
    tool: targetTool,
    description: source
      ? `Pincel personalizado basado en ${source.name}.`
      : 'Pincel personalizado.',
    settings: Object.keys(template).length > 0 ? template : { ...DEFAULT_BRUSH },
    custom: true,
  };

  subTools.push(sub);
  persistSubTools();
  return sub;
}

export function duplicateSubTool(subToolId: string): SubTool | null {
  const source = findSubTool(subToolId);
  if (!source) return null;

  const copy: SubTool = {
    ...source,
    id: nextCustomId(),
    name: `${source.name} (copia)`,
    description: `Copia personalizada de ${source.name}.`,
    settings: { ...source.settings },
    custom: true,
  };

  subTools.push(copy);
  persistSubTools();
  return copy;
}

export function deleteSubTool(subToolId: string): boolean {
  const target = findSubTool(subToolId);
  if (!target) return false;

  const siblings = subTools.filter((s) => s.tool === target.tool);
  if (siblings.length <= 1) return false; // Never empty a tool category.

  subTools = subTools.filter((s) => s.id !== subToolId);
  if (SUBTOOLS.some((b) => b.id === subToolId) && !deletedBaseIds.includes(subToolId)) {
    deletedBaseIds.push(subToolId);
  }
  persistSubTools();

  if (state.activeSubToolId === subToolId) {
    const next = subTools.find((s) => s.tool === target.tool);
    if (next) {
      state = {
        ...state,
        tool: next.tool,
        activeSubToolId: next.id,
        brush: mergeBrush(next, state.brush.color),
      };
    }
  }
  emit();
  return true;
}

export function resetSubTool(subToolId: string): void {
  const target = findSubTool(subToolId);
  if (!target) return;

  const factory = SUBTOOLS.find((b) => b.id === subToolId);
  target.settings = factory ? { ...factory.settings } : factorySettingsFor(target.tool);
  persistSubTools();

  if (state.activeSubToolId === subToolId) {
    state = { ...state, brush: mergeBrush(target, state.brush.color) };
  }
  emit();
}

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export function setPrimaryColor(color: string): void {
  state = {
    ...state,
    primaryColor: color,
    isTransparentColor: false,
    activeColorSlot: 'primary',
    brush: { ...state.brush, color },
  };
  addColorToHistory(color);
  emit();
}

export function setSecondaryColor(color: string): void {
  state = {
    ...state,
    secondaryColor: color,
    isTransparentColor: false,
    activeColorSlot: 'secondary',
    brush: { ...state.brush, color },
  };
  addColorToHistory(color);
  emit();
}

export function setActiveColorSlot(slot: 'primary' | 'secondary'): void {
  const color = slot === 'primary' ? state.primaryColor : state.secondaryColor;
  state = {
    ...state,
    activeColorSlot: slot,
    isTransparentColor: false,
    brush: { ...state.brush, color },
  };
  emit();
}

export function swapColors(): void {
  const oldPrimary = state.primaryColor;
  const oldSecondary = state.secondaryColor;
  const targetColor = state.activeColorSlot === 'primary' ? oldSecondary : oldPrimary;
  state = {
    ...state,
    primaryColor: oldSecondary,
    secondaryColor: oldPrimary,
    brush: { ...state.brush, color: targetColor },
  };
  emit();
}

export function toggleTransparentColor(force?: boolean): void {
  const next = force !== undefined ? force : !state.isTransparentColor;
  state = {
    ...state,
    isTransparentColor: next,
    brush: {
      ...state.brush,
      color: next ? 'transparent' : state.activeColorSlot === 'primary' ? state.primaryColor : state.secondaryColor,
    },
  };
  emit();
}

export function addColorToHistory(hex: string): void {
  if (!hex || hex === 'transparent') return;
  const normalized = hex.toLowerCase();
  const filtered = state.colorHistory.filter((c) => c.toLowerCase() !== normalized);
  state.colorHistory = [normalized, ...filtered].slice(0, 16);
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
