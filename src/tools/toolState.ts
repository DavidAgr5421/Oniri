export type ToolId = 'move' | 'pen' | 'brush' | 'effect' | 'eraser' | 'eyedropper' | 'bucket' | 'shape' | 'bone' | 'hand' | 'rotate' | 'select';
export type BoneToolMode = 'rig' | 'pose_fk' | 'pose_ik';
export type SelectionCombineMode = 'replace' | 'add' | 'subtract';
export type ShapeType = 'line' | 'rectangle' | 'ellipse';
export type ShapeFillMode = 'stroke' | 'fill';
export type TipShape = 'circle' | 'square' | 'calligraphic';
export type AntiAliasingLevel = 'none' | 'weak' | 'medium' | 'strong';
export type InkMode = 'uniform' | 'accumulate';

export type TipTextureId =
  | 'default'
  | 'real-g'
  | 'gasagasa'
  | 'flat-square'
  | 'brush02'
  | 'pencil-01'
  | 'pencil-02'
  | 'pencil-03'
  | 'brush-pen-01'
  | 'brush-pen-02'
  | 'dry-ink'
  | 'charcoal-01'
  | 'star02'
  | 'star04'
  | 'lb1'
  | 'lb2'
  | 'lb3'
  | 'lb4'
  | 'rain-1'
  | 'rain-2';
export type TipCycleMode = 'single' | 'sequential' | 'reverse' | 'random';
export type PaperTextureId =
  | 'none'
  | 'oil-paint'
  | 'pencil-paper'
  | 'birds-eye-maple'
  | 'canvas'
  | 'canvas-02'
  | 'cotton'
  | 'fine-textured'
  | 'rough-textured'
  | 'drawing-paper-c'
  | 'dappled-cloud';
export type TextureMode = 'subtract' | 'multiply' | 'height' | 'outline';
export type DualBlendMode = 'multiply' | 'subtract' | 'darken' | 'lighten';
export type ThicknessDirection = 'horizontal' | 'vertical';

export type { PressureCurveMode, PressureCurveSettings } from '../brush/pressureResponse';
import type { PressureCurveSettings } from '../brush/pressureResponse';

/**
 * Device-level input response (CSP File > Preferences > Tablet). Not part of a
 * sub tool: the pressure curve and the tilt behaviour belong to the tablet, the
 * sub tool only decides how the responded pressure is spent.
 */
export interface TabletSettings {
  pressure: PressureCurveSettings;
  tiltEnabled: boolean;
  /** 0 = keep the footprint upright, 1 = full physical elongation. */
  tiltAmount: number;
}

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
  thicknessDirection?: ThicknessDirection;
  tipAngle: number;
  followDirection: boolean;
  randomSizeRatio?: number;
  taperStart: number;
  taperEnd: number;
  stabilization: number;
  tolerance: number;
  shapeType: ShapeType;
  shapeFill: ShapeFillMode;
  color: string;
  tipTexture?: TipTextureId;
  tipTextures?: TipTextureId[];
  tipCycleMode?: TipCycleMode;
  ribbon?: boolean;
  paperTexture?: PaperTextureId;
  textureDensity?: number;
  textureScale?: number;
  textureMode?: TextureMode;
  textureInvert?: boolean;
  textureApplyPerTip?: boolean;
  dualBrushEnabled?: boolean;
  dualTipShape?: TipShape;
  dualTipTexture?: TipTextureId;
  dualSizeRatio?: number;
  dualBlendMode?: DualBlendMode;
  colorMix?: number;
  colorMixAlpha?: number;
  smudge?: number;
  spray?: boolean;
  sprayRadius?: number;
  sprayDensity?: number;
  compositeMode?: 'source-over' | 'lighter' | 'screen' | 'destination-out';
  subColorMix?: boolean;
  closeGap?: number;
  areaScaling?: number;
  referMode?: 'editing' | 'reference' | 'all';
  velocitySize?: boolean;
  velocityMinRatio?: number;
  velocityCurve?: number;
  velocityFlow?: boolean;
}

export { type SubTool, SUBTOOLS } from './subtoolPresets';
import { type SubTool, SUBTOOLS } from './subtoolPresets';

export type ColorTabId = 'picker' | 'rgb' | 'set' | 'harmony';
export type PreviewBgMode = 'paper' | 'checker' | 'dark';
export type BrushPropKey =
  | 'size'
  | 'opacity'
  | 'flow'
  | 'hardness'
  | 'stabilization'
  | 'pressureSize'
  | 'velocitySize'
  | 'taper'
  | 'tipShape'
  | 'antiAliasing'
  | 'roundness'
  | 'angle'
  | 'spacing'
  | 'colorMix'
  | 'paperTexture'
  | 'textureDensity'
  | 'dualBrush'
  | 'spray'
  | 'sprayRadius'
  | 'sprayDensity'
  | 'compositeMode';

export {
  type ColorSet,
  DEFAULT_COLOR_SETS,
  DEFAULT_HISTORY,
  hexToRgb,
  rgbToHex,
  rgbToHsv,
  hsvToRgb,
  hsvToHex,
  type ColorHarmonyGroup,
  computeColorHarmonies,
} from './colorPalettes';
import {
  type ColorSet,
  DEFAULT_COLOR_SETS,
  DEFAULT_HISTORY,
} from './colorPalettes';

export interface ToolState {
  tool: ToolId;
  activeSubToolId: string;
  brush: BrushSettings;
  tablet: TabletSettings;
  propertiesOpen: boolean;
  // Sub Tool Detail: which properties are pinned/visible in the main Tool Property panel (CSP Eye icon)
  visibleProperties: BrushPropKey[];
  previewBgMode: PreviewBgMode;
  // Bone Rigging & Animation state
  boneMode: BoneToolMode;
  showBonesOverlay: boolean;
  autoKeyBones: boolean;
  // Clip Studio Paint Color System
  colorTab: ColorTabId;
  primaryColor: string;
  secondaryColor: string;
  activeColorSlot: 'primary' | 'secondary';
  isTransparentColor: boolean;
  colorHistory: string[];
  colorSets: ColorSet[];
  activeColorSetId: string;
  selectionCombineMode: SelectionCombineMode;
}

export const DEFAULT_BRUSH: BrushSettings = {
  size: 6,
  minSizeRatio: 0.03,
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
  thicknessDirection: 'vertical',
  tipAngle: 0,
  followDirection: false,
  randomSizeRatio: 1.0,
  taperStart: 0,
  taperEnd: 0,
  stabilization: 4,
  tolerance: 20,
  shapeType: 'rectangle',
  shapeFill: 'stroke',
  color: '#000000',
  tipTexture: 'default',
  tipTextures: [],
  tipCycleMode: 'random',
  ribbon: false,
  paperTexture: 'none',
  textureDensity: 0.0,
  textureScale: 1.0,
  textureMode: 'height',
  textureInvert: false,
  textureApplyPerTip: true,
  dualBrushEnabled: false,
  dualTipShape: 'circle',
  dualTipTexture: 'brush02',
  dualSizeRatio: 1.0,
  dualBlendMode: 'multiply',
  colorMix: 0.0,
  colorMixAlpha: 0.0,
  smudge: 0.0,
  spray: false,
  sprayRadius: 20,
  sprayDensity: 3,
  compositeMode: 'source-over',
  subColorMix: false,
  closeGap: 0,
  areaScaling: 1,
  referMode: 'all',
  velocitySize: false,
  velocityMinRatio: 0.35,
  velocityCurve: 1.0,
  velocityFlow: false,
};

export const DEFAULT_VISIBLE_PROPS: BrushPropKey[] = [
  'size',
  'opacity',
  'hardness',
  'stabilization',
  'pressureSize',
  'velocitySize',
  'tipShape',
  'roundness',
  'angle',
  'colorMix',
  'paperTexture',
  'textureDensity',
];

export const DEFAULT_TABLET: TabletSettings = {
  pressure: { mode: 'soft', gamma: 0.88 },
  tiltEnabled: true,
  tiltAmount: 0.85,
};

// ---------------------------------------------------------------------------
// Tablet (device) persistence
// ---------------------------------------------------------------------------

const TABLET_KEY = 'oniri.tablet.v2';

const PRESSURE_MODES: PressureCurveSettings['mode'][] = ['linear', 'soft', 'hard', 'custom'];

function loadTabletSettings(): TabletSettings {
  try {
    const raw = localStorage.getItem(TABLET_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<TabletSettings>;
      if (parsed && typeof parsed === 'object') {
        const pressure = parsed.pressure;
        const validPressure =
          pressure &&
          typeof pressure === 'object' &&
          PRESSURE_MODES.includes(pressure.mode) &&
          typeof pressure.gamma === 'number' &&
          Number.isFinite(pressure.gamma);
        return {
          pressure: validPressure
            ? { mode: pressure.mode, gamma: Math.min(2.5, Math.max(0.3, pressure.gamma)) }
            : { ...DEFAULT_TABLET.pressure },
          tiltEnabled: parsed.tiltEnabled !== undefined ? parsed.tiltEnabled === true : DEFAULT_TABLET.tiltEnabled,
          tiltAmount:
            typeof parsed.tiltAmount === 'number' && Number.isFinite(parsed.tiltAmount)
              ? Math.min(1, Math.max(0, parsed.tiltAmount))
              : DEFAULT_TABLET.tiltAmount,
        };
      }
    }
  } catch {
    // Storage corrupted or unavailable: factory tablet defaults.
  }
  return { ...DEFAULT_TABLET, pressure: { ...DEFAULT_TABLET.pressure } };
}

function persistTabletSettings(settings: TabletSettings): void {
  try {
    localStorage.setItem(TABLET_KEY, JSON.stringify(settings));
  } catch {
    // Storage full or unavailable: the in-memory session keeps working.
  }
}

// ---------------------------------------------------------------------------
// Sub Tool persistence (Clip Studio Paint "Sub Tool Detail" style)
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'oniri.subtools.v12';

const TOOL_IDS: ToolId[] = ['pen', 'brush', 'effect', 'eraser', 'eyedropper', 'bucket', 'shape', 'bone', 'hand', 'select'];

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
        parsed.v === 10 &&
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
    const storage: SubToolStorage = { v: 10, items: subTools, deleted: [...deletedBaseIds] };
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
  const chosenColor = color || sub.settings.color || DEFAULT_BRUSH.color;
  return { ...DEFAULT_BRUSH, ...sub.settings, color: chosenColor };
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const COLOR_SETS_KEY = 'oniri.colorsets.v1';
const VISIBLE_PROPS_KEY = 'oniri.visibleprops.v2';

function loadColorSets(): ColorSet[] {
  try {
    const raw = localStorage.getItem(COLOR_SETS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_COLOR_SETS.map((s) => ({ ...s, colors: [...s.colors] }));
}

function persistColorSets(sets: ColorSet[]): void {
  try {
    localStorage.setItem(COLOR_SETS_KEY, JSON.stringify(sets));
  } catch {
    // ignore
  }
}

function loadVisibleProps(): BrushPropKey[] {
  try {
    const raw = localStorage.getItem(VISIBLE_PROPS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure core props like 'paperTexture' and 'textureDensity' are present even with existing localStorage cache
        const set = new Set<BrushPropKey>(parsed as BrushPropKey[]);
        if (!set.has('paperTexture')) set.add('paperTexture');
        if (!set.has('textureDensity')) set.add('textureDensity');
        return Array.from(set);
      }
    }
  } catch {
    // ignore
  }
  return [...DEFAULT_VISIBLE_PROPS];
}

function persistVisibleProps(props: BrushPropKey[]): void {
  try {
    localStorage.setItem(VISIBLE_PROPS_KEY, JSON.stringify(props));
  } catch {
    // ignore
  }
}

const initialSub = findSubTool('g-pen') ?? subTools[0];
const initialSets = loadColorSets();

let state: ToolState = {
  tool: 'pen',
  activeSubToolId: initialSub ? initialSub.id : 'g-pen',
  brush: initialSub ? mergeBrush(initialSub, '#000000') : { ...DEFAULT_BRUSH },
  tablet: loadTabletSettings(),
  propertiesOpen: true,
  visibleProperties: loadVisibleProps(),
  previewBgMode: 'paper',
  boneMode: 'rig',
  showBonesOverlay: true,
  autoKeyBones: true,
  colorTab: 'picker',
  primaryColor: '#000000',
  secondaryColor: '#ffffff',
  activeColorSlot: 'primary',
  isTransparentColor: false,
  colorHistory: DEFAULT_HISTORY,
  colorSets: initialSets,
  activeColorSetId: initialSets[0]?.id ?? 'csp-standard',
  selectionCombineMode: 'replace',
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

function getCurrentSlotColor(s: ToolState = state): string {
  if (s.isTransparentColor) return 'transparent';
  return s.activeColorSlot === 'primary' ? s.primaryColor : s.secondaryColor;
}

export function setTool(tool: ToolId): void {
  if (state.tool === tool) return;
  const subtools = subTools.filter((s) => s.tool === tool);
  const firstSub = subtools[0];
  const nextSubId = firstSub ? firstSub.id : state.activeSubToolId;

  let nextBoneMode = state.boneMode;
  if (tool === 'bone') {
    if (nextSubId === 'bone-rig') nextBoneMode = 'rig';
    else if (nextSubId === 'bone-pose-fk') nextBoneMode = 'pose_fk';
    else if (nextSubId === 'bone-pose-ik') nextBoneMode = 'pose_ik';
  }

  const activeColor = getCurrentSlotColor(state);
  state = {
    ...state,
    tool,
    activeSubToolId: nextSubId,
    boneMode: nextBoneMode,
    brush: firstSub ? mergeBrush(firstSub, activeColor) : { ...state.brush, color: activeColor },
  };
  emit();
}

export function selectSubTool(subToolId: string): void {
  const found = findSubTool(subToolId);
  if (!found) return;
  let nextBoneMode = state.boneMode;
  if (found.id === 'bone-rig') nextBoneMode = 'rig';
  else if (found.id === 'bone-pose-fk') nextBoneMode = 'pose_fk';
  else if (found.id === 'bone-pose-ik') nextBoneMode = 'pose_ik';

  const activeColor = getCurrentSlotColor(state);
  state = {
    ...state,
    tool: found.tool,
    activeSubToolId: found.id,
    boneMode: nextBoneMode,
    brush: mergeBrush(found, activeColor),
  };
  emit();
}

export function setBoneToolMode(mode: BoneToolMode): void {
  const subId =
    mode === 'rig' ? 'bone-rig' : mode === 'pose_fk' ? 'bone-pose-fk' : 'bone-pose-ik';
  state = {
    ...state,
    tool: 'bone',
    activeSubToolId: subId,
    boneMode: mode,
  };
  emit();
}

export function setShowBonesOverlay(show: boolean): void {
  state = { ...state, showBonesOverlay: show };
  emit();
}

export function setAutoKeyBones(autoKey: boolean): void {
  state = { ...state, autoKeyBones: autoKey };
  emit();
}

export function toggleVisibleProperty(prop: BrushPropKey): void {
  const exists = state.visibleProperties.includes(prop);
  const next = exists
    ? state.visibleProperties.filter((p) => p !== prop)
    : [...state.visibleProperties, prop];
  state = { ...state, visibleProperties: next };
  persistVisibleProps(next);
  emit();
}

export function setPreviewBgMode(mode: PreviewBgMode): void {
  state = { ...state, previewBgMode: mode };
  emit();
}

export function setSelectionCombineMode(mode: SelectionCombineMode): void {
  if (state.selectionCombineMode === mode) return;
  state = { ...state, selectionCombineMode: mode };
  emit();
}

export function setColorTab(tab: ColorTabId): void {
  if (state.colorTab === tab) return;
  state = { ...state, colorTab: tab };
  emit();
}

export function setActiveColorSet(setId: string): void {
  if (!state.colorSets.some((s) => s.id === setId)) return;
  state = { ...state, activeColorSetId: setId };
  emit();
}

export function addColorToActiveSet(hex: string): void {
  if (!hex || hex === 'transparent') return;
  const norm = hex.toLowerCase();
  const nextSets = state.colorSets.map((s) => {
    if (s.id !== state.activeColorSetId) return s;
    return { ...s, colors: [...s.colors, norm] };
  });
  state = { ...state, colorSets: nextSets };
  persistColorSets(nextSets);
  emit();
}

export function removeColorFromActiveSet(index: number): void {
  const nextSets = state.colorSets.map((s) => {
    if (s.id !== state.activeColorSetId) return s;
    if (s.colors.length <= 1) return s;
    return { ...s, colors: s.colors.filter((_, idx) => idx !== index) };
  });
  state = { ...state, colorSets: nextSets };
  persistColorSets(nextSets);
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

  if (patch.color && patch.color !== 'transparent') {
    state.isTransparentColor = false;
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
// Tablet settings (device level, shared by every tool)
// ---------------------------------------------------------------------------

export function getTabletSettings(): TabletSettings {
  return state.tablet;
}

export function setTabletSettings(patch: Partial<TabletSettings>): void {
  const next: TabletSettings = {
    pressure: { ...state.tablet.pressure, ...(patch.pressure ?? {}) },
    tiltEnabled: patch.tiltEnabled ?? state.tablet.tiltEnabled,
    tiltAmount:
      patch.tiltAmount !== undefined
        ? Math.min(1, Math.max(0, patch.tiltAmount))
        : state.tablet.tiltAmount,
  };
  if (
    next.pressure.mode === state.tablet.pressure.mode &&
    next.pressure.gamma === state.tablet.pressure.gamma &&
    next.tiltEnabled === state.tablet.tiltEnabled &&
    next.tiltAmount === state.tablet.tiltAmount
  ) {
    return;
  }
  state = { ...state, tablet: next };
  persistTabletSettings(next);
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

export function moveSubToolToTool(subToolId: string, targetTool: ToolId): boolean {
  const target = findSubTool(subToolId);
  if (!target || target.tool === targetTool) return false;
  if (!['pen', 'brush', 'effect', 'eraser'].includes(targetTool)) return false;

  const siblings = subTools.filter((s) => s.tool === target.tool);
  if (siblings.length <= 1) return false; // Never empty a tool category.

  target.tool = targetTool;
  persistSubTools();

  if (state.activeSubToolId === subToolId) {
    state = {
      ...state,
      tool: targetTool,
    };
  }
  emit();
  return true;
}

// ---------------------------------------------------------------------------
// Colors & Color Harmonies
// ---------------------------------------------------------------------------

export function setActiveColor(color: string, recordHistory = true): void {
  if (state.activeColorSlot === 'primary') {
    setPrimaryColor(color, recordHistory);
  } else {
    setSecondaryColor(color, recordHistory);
  }
}

export function setPrimaryColor(color: string, recordHistory = true): void {
  state = {
    ...state,
    primaryColor: color,
    isTransparentColor: false,
    activeColorSlot: 'primary',
    brush: { ...state.brush, color },
  };
  if (recordHistory) {
    addColorToHistory(color);
  }
  emit();
}

export function setSecondaryColor(color: string, recordHistory = true): void {
  state = {
    ...state,
    secondaryColor: color,
    isTransparentColor: false,
    activeColorSlot: 'secondary',
    brush: { ...state.brush, color },
  };
  if (recordHistory) {
    addColorToHistory(color);
  }
  emit();
}

export function commitActiveColorToHistory(): void {
  const color = state.activeColorSlot === 'primary' ? state.primaryColor : state.secondaryColor;
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
      color: next
        ? 'transparent'
        : state.activeColorSlot === 'primary'
          ? state.primaryColor
          : state.secondaryColor,
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
