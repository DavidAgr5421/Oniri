import { isTransformModalLocked, warnTransformModalBlocked } from '../selection/transformModal';
import { ensureClipboardHelper, schedulePasteFallback } from '../storage/clipboardManager';

export interface CommandItem {
  id: string;
  label: string;
  category: 'file' | 'edit' | 'animation' | 'layer' | 'select' | 'view' | 'filter' | 'window' | 'help';
  shortcut?: string;
  aliases?: string[];
  icon?: string;
  isEnabled?: () => boolean;
  isChecked?: () => boolean;
  execute: () => void | Promise<void>;
}

class CommandDispatcher {
  private commands = new Map<string, CommandItem>();
  private shortcutMap = new Map<string, string>(); // normalized shortcut -> commandId

  public register(cmd: CommandItem): void {
    this.commands.set(cmd.id, cmd);
    if (cmd.shortcut) {
      const norm = this.normalizeShortcut(cmd.shortcut);
      this.shortcutMap.set(norm, cmd.id);
    }
    if (cmd.aliases) {
      for (const a of cmd.aliases) {
        this.shortcutMap.set(this.normalizeShortcut(a), cmd.id);
      }
    }
  }

  public get(id: string): CommandItem | undefined {
    return this.commands.get(id);
  }

  public getAll(): CommandItem[] {
    return Array.from(this.commands.values());
  }

  public getByCategory(cat: CommandItem['category']): CommandItem[] {
    return this.getAll().filter((c) => c.category === cat);
  }

  public canExecute(id: string): boolean {
    const cmd = this.commands.get(id);
    if (!cmd) return false;

    // Check modal transform lock: only view navigation, cancel, or commit allowed
    if (isTransformModalLocked()) {
      const allowedCategories = ['view', 'window', 'help'];
      const allowedSpecific = ['edit.undo', 'transform.commit', 'transform.cancel'];
      if (!allowedCategories.includes(cmd.category) && !allowedSpecific.includes(cmd.id)) {
        return false;
      }
    }

    if (cmd.isEnabled) {
      try {
        return cmd.isEnabled();
      } catch {
        return false;
      }
    }

    return true;
  }

  public async execute(id: string): Promise<boolean> {
    const cmd = this.commands.get(id);
    if (!cmd) {
      console.warn(`[CommandDispatcher] Command '${id}' not found`);
      return false;
    }

    if (!this.canExecute(id)) {
      if (isTransformModalLocked()) {
        warnTransformModalBlocked(cmd.label);
      }
      return false;
    }

    try {
      await cmd.execute();
      return true;
    } catch (err) {
      console.error(`[CommandDispatcher] Error executing '${id}':`, err);
      return false;
    }
  }

  public normalizeShortcut(sc: string): string {
    const parts = sc.toLowerCase().split('+').map((p) => p.trim());
    const hasCtrl = parts.includes('ctrl') || parts.includes('control') || parts.includes('cmd');
    const hasAlt = parts.includes('alt');
    const hasShift = parts.includes('shift');
    const key = parts.filter((p) => !['ctrl', 'control', 'cmd', 'alt', 'shift'].includes(p))[0] || '';

    const res: string[] = [];
    if (hasCtrl) res.push('ctrl');
    if (hasAlt) res.push('alt');
    if (hasShift) res.push('shift');
    res.push(key);
    return res.join('+');
  }

  public handleKeyEvent(event: KeyboardEvent): boolean {
    const target = event.target as HTMLElement;
    const isRealInput =
      (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) &&
      target.id !== 'oniri-clipboard-helper' &&
      target.id !== 'modal-paste-catcher';

    if (isRealInput) {
      return false;
    }

    const parts: string[] = [];
    if (event.ctrlKey || event.metaKey) parts.push('ctrl');
    if (event.altKey) parts.push('alt');
    if (event.shiftKey) parts.push('shift');

    let key = event.key.toLowerCase();
    if (key === 'control' || key === 'alt' || key === 'shift' || key === 'meta') {
      return false;
    }

    if (key === 'delete') key = 'delete';
    else if (key === 'backspace') key = 'backspace';
    else if (key === 'enter') key = 'enter';
    else if (key === 'escape') key = 'escape';

    parts.push(key);
    const norm = parts.join('+');

    const cmdId = this.shortcutMap.get(norm);
    if (cmdId) {
      if (cmdId === 'edit.paste') {
        // Pre-focus hidden clipboard helper so the browser dispatches a native DOM paste event
        // with complete access to Explorer files (CF_HDROP) and image bitmaps.
        const helper = ensureClipboardHelper();
        helper.focus({ preventScroll: true });

        // Schedule fallback: if the native DOM paste event does not fire within 80ms,
        // execute edit.paste via the Async Clipboard API.
        schedulePasteFallback();
        return false;
      }
      event.preventDefault();
      event.stopPropagation();
      this.execute(cmdId);
      return true;
    }

    return false;
  }
}

export const commandDispatcher = new CommandDispatcher();
