import { commandDispatcher } from './commandDispatcher';

export interface MenuEntry {
  id?: string;
  label?: string;
  shortcut?: string;
  icon?: string;
  divider?: boolean;
  disabled?: boolean | (() => boolean);
  checked?: boolean | (() => boolean);
  action?: () => void;
  submenu?: MenuEntry[];
}

export interface TopMenuCategory {
  id: string;
  title: string;
  accessKey?: string;
  entries: MenuEntry[];
}

export class TopMenuBar {
  public readonly element: HTMLElement;
  private activeMenuIndex: number | null = null;
  private dropdowns: HTMLElement[] = [];
  private menuButtons: HTMLButtonElement[] = [];
  private categories: TopMenuCategory[] = [];

  constructor(categories: TopMenuCategory[]) {
    this.categories = categories;
    this.element = document.createElement('nav');
    this.element.className = 'csp-top-menubar';

    this.render();
    this.attachGlobalEvents();
  }

  private render(): void {
    this.element.innerHTML = '';
    this.dropdowns = [];
    this.menuButtons = [];

    for (let i = 0; i < this.categories.length; i++) {
      const cat = this.categories[i];
      const menuWrapper = document.createElement('div');
      menuWrapper.className = 'csp-menu-top-item';

      const btn = document.createElement('button');
      btn.className = 'csp-menu-top-btn';
      btn.textContent = cat.title;
      btn.setAttribute('data-index', String(i));

      btn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        if (this.activeMenuIndex === i) {
          this.closeAll();
        } else {
          this.openMenu(i);
        }
      });

      btn.addEventListener('pointerenter', () => {
        if (this.activeMenuIndex !== null && this.activeMenuIndex !== i) {
          this.openMenu(i);
        }
      });

      menuWrapper.appendChild(btn);
      this.menuButtons.push(btn);

      // Create dropdown
      const dropdown = this.createDropdown(cat.entries);
      menuWrapper.appendChild(dropdown);
      this.dropdowns.push(dropdown);

      this.element.appendChild(menuWrapper);
    }
  }

  private createDropdown(entries: MenuEntry[]): HTMLElement {
    const list = document.createElement('div');
    list.className = 'csp-dropdown-menu';
    list.style.display = 'none';

    for (const item of entries) {
      if (item.divider) {
        const div = document.createElement('div');
        div.className = 'csp-menu-divider';
        list.appendChild(div);
        continue;
      }

      const row = document.createElement('div');
      row.className = 'csp-menu-row';

      const isItemChecked = typeof item.checked === 'function' ? item.checked() : !!item.checked;
      const isItemDisabled =
        item.id !== undefined
          ? !commandDispatcher.canExecute(item.id)
          : typeof item.disabled === 'function'
          ? item.disabled()
          : !!item.disabled;

      if (isItemDisabled) {
        row.classList.add('disabled');
      }

      // Checkmark slot
      const checkSlot = document.createElement('span');
      checkSlot.className = 'csp-menu-check';
      checkSlot.innerHTML = isItemChecked ? '&#10003;' : '';
      row.appendChild(checkSlot);

      // Icon slot (optional)
      if (item.icon) {
        const iconSlot = document.createElement('span');
        iconSlot.className = 'csp-menu-icon';
        iconSlot.innerHTML = item.icon;
        row.appendChild(iconSlot);
      }

      // Label slot
      const labelSlot = document.createElement('span');
      labelSlot.className = 'csp-menu-label';
      labelSlot.textContent = item.label || '';
      row.appendChild(labelSlot);

      // Shortcut slot
      if (item.shortcut) {
        const scSlot = document.createElement('span');
        scSlot.className = 'csp-menu-shortcut';
        scSlot.textContent = item.shortcut;
        row.appendChild(scSlot);
      }

      // Submenu or click
      if (item.submenu && item.submenu.length > 0) {
        row.classList.add('has-submenu');
        const arrow = document.createElement('span');
        arrow.className = 'csp-menu-arrow';
        arrow.textContent = '›';
        row.appendChild(arrow);

        const subList = this.createDropdown(item.submenu);
        subList.classList.add('csp-submenu');
        row.appendChild(subList);

        row.addEventListener('pointerenter', () => {
          if (!isItemDisabled) subList.style.display = 'flex';
        });
        row.addEventListener('pointerleave', () => {
          subList.style.display = 'none';
        });
      } else {
        row.addEventListener('click', (e) => {
          e.stopPropagation();
          if (isItemDisabled) return;
          this.closeAll();
          window.focus();
          if (item.id) {
            commandDispatcher.execute(item.id);
          } else if (item.action) {
            item.action();
          }
        });
      }

      list.appendChild(row);
    }

    return list;
  }

  public openMenu(index: number): void {
    this.closeAll();
    this.activeMenuIndex = index;
    if (this.menuButtons[index]) {
      this.menuButtons[index].classList.add('active');
    }
    if (this.dropdowns[index]) {
      // Re-evaluate checkmarks and disabled states
      const refreshed = this.createDropdown(this.categories[index].entries);
      const parent = this.dropdowns[index].parentElement;
      if (parent) {
        parent.replaceChild(refreshed, this.dropdowns[index]);
        this.dropdowns[index] = refreshed;
      }
      refreshed.style.display = 'flex';
    }
  }

  public closeAll(): void {
    this.activeMenuIndex = null;
    for (const btn of this.menuButtons) {
      btn.classList.remove('active');
    }
    for (const dd of this.dropdowns) {
      dd.style.display = 'none';
    }
  }

  private attachGlobalEvents(): void {
    window.addEventListener('pointerdown', (e) => {
      const target = e.target as HTMLElement;
      if (!this.element.contains(target)) {
        this.closeAll();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeMenuIndex !== null) {
        this.closeAll();
      }
    });
  }
}
