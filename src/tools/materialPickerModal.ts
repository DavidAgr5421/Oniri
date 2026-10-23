import {
  type MaterialCatalogItem,
  PAPER_MATERIAL_CATALOG,
  TIP_MATERIAL_CATALOG,
} from '../brush/brushTextureAssets';

export interface OpenMaterialPickerOptions {
  category: 'paper' | 'tip';
  currentId: string;
  onSelect: (id: string) => void;
}

let activeModalEl: HTMLDivElement | null = null;

export function openMaterialPickerModal(options: OpenMaterialPickerOptions): void {
  if (activeModalEl) {
    activeModalEl.remove();
    activeModalEl = null;
  }

  const catalog: MaterialCatalogItem[] =
    options.category === 'paper' ? PAPER_MATERIAL_CATALOG : TIP_MATERIAL_CATALOG;

  let selectedId = options.currentId || (options.category === 'paper' ? 'none' : 'default');
  let activeTag = 'All';
  let searchQuery = '';

  const allTags = Array.from(
    new Set(['All', ...catalog.flatMap((item) => item.tags)])
  );

  const overlay = document.createElement('div');
  overlay.className = 'csp-mat-modal-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
    zIndex: '9999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(2px)',
  });

  const dialog = document.createElement('div');
  dialog.className = 'csp-mat-modal-dialog';
  Object.assign(dialog.style, {
    width: '620px',
    maxWidth: '94vw',
    height: '470px',
    maxHeight: '88vh',
    backgroundColor: '#2b2b2b',
    border: '1px solid #484848',
    borderRadius: '6px',
    boxShadow: '0 18px 48px rgba(0,0,0,0.75)',
    display: 'flex',
    flexDirection: 'column',
    color: '#e5e5e5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '12px',
    overflow: 'hidden',
  });

  // Header (CSP Dialog Title Bar)
  const header = document.createElement('div');
  Object.assign(header.style, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    backgroundColor: '#222222',
    borderBottom: '1px solid #3c3c3c',
    fontWeight: '600',
    fontSize: '12.5px',
  });
  header.innerHTML = `
    <span>${
      options.category === 'paper'
        ? 'Seleccionar material de textura de papel (Select paper texture material)'
        : 'Seleccionar forma de punta de pincel (Select brush tip shape)'
    }</span>
  `;
  const closeX = document.createElement('button');
  closeX.textContent = '✕';
  Object.assign(closeX.style, {
    background: 'transparent',
    border: 'none',
    color: '#aaa',
    cursor: 'pointer',
    fontSize: '13px',
    padding: '2px 6px',
  });
  closeX.addEventListener('click', () => closeModal());
  header.appendChild(closeX);
  dialog.appendChild(header);

  // Body (Left Tag Sidebar + Right Search & Material List)
  const body = document.createElement('div');
  Object.assign(body.style, {
    display: 'flex',
    flex: '1',
    minHeight: '0',
  });

  // Left Sidebar (Tag List)
  const leftPane = document.createElement('div');
  Object.assign(leftPane.style, {
    width: '155px',
    backgroundColor: '#242424',
    borderRight: '1px solid #3c3c3c',
    padding: '10px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  });
  const tagTitle = document.createElement('div');
  tagTitle.textContent = 'Lista de etiquetas (Tags)';
  Object.assign(tagTitle.style, {
    fontSize: '11px',
    color: '#9ca3af',
    marginBottom: '4px',
  });
  leftPane.appendChild(tagTitle);

  const tagWrap = document.createElement('div');
  Object.assign(tagWrap.style, {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
  });
  leftPane.appendChild(tagWrap);

  // Right Content Area
  const rightPane = document.createElement('div');
  Object.assign(rightPane.style, {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    backgroundColor: '#2f2f2f',
  });

  // Search Bar
  const searchBar = document.createElement('div');
  Object.assign(searchBar.style, {
    padding: '8px 10px',
    borderBottom: '1px solid #3c3c3c',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#292929',
  });
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = '🔍 Buscar material...';
  Object.assign(searchInput.style, {
    width: '100%',
    padding: '5px 8px',
    backgroundColor: '#1e1e1e',
    border: '1px solid #454545',
    borderRadius: '3px',
    color: '#f3f4f6',
    fontSize: '12px',
    outline: 'none',
  });
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    renderList();
  });
  searchBar.appendChild(searchInput);
  rightPane.appendChild(searchBar);

  // Column Header
  const colHeader = document.createElement('div');
  Object.assign(colHeader.style, {
    display: 'grid',
    gridTemplateColumns: '68px 1fr 110px 95px',
    padding: '5px 12px',
    backgroundColor: '#252525',
    borderBottom: '1px solid #3c3c3c',
    color: '#9ca3af',
    fontSize: '11px',
    fontWeight: '600',
  });
  colHeader.innerHTML = `
    <span>Vista</span>
    <span>Nombre del material</span>
    <span>Tipo</span>
    <span>Etiquetas</span>
  `;
  rightPane.appendChild(colHeader);

  // Scrollable Material Rows
  const listContainer = document.createElement('div');
  Object.assign(listContainer.style, {
    flex: '1',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  });
  rightPane.appendChild(listContainer);

  body.appendChild(leftPane);
  body.appendChild(rightPane);
  dialog.appendChild(body);

  // Footer (Selected Material Preview & OK / Cancel Buttons)
  const footer = document.createElement('div');
  Object.assign(footer.style, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    backgroundColor: '#222222',
    borderTop: '1px solid #3c3c3c',
  });

  const selectedLabel = document.createElement('div');
  Object.assign(selectedLabel.style, {
    fontSize: '11.5px',
    color: '#d1d5db',
  });

  const btnGroup = document.createElement('div');
  Object.assign(btnGroup.style, {
    display: 'flex',
    gap: '8px',
  });

  const okBtn = document.createElement('button');
  okBtn.textContent = 'Aceptar (OK)';
  Object.assign(okBtn.style, {
    padding: '5px 18px',
    backgroundColor: '#3b82f6',
    border: '1px solid #60a5fa',
    borderRadius: '3px',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer',
  });
  okBtn.addEventListener('click', () => {
    options.onSelect(selectedId);
    closeModal();
  });

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancelar';
  Object.assign(cancelBtn.style, {
    padding: '5px 14px',
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    borderRadius: '3px',
    color: '#e5e7eb',
    fontSize: '12px',
    cursor: 'pointer',
  });
  cancelBtn.addEventListener('click', () => closeModal());

  btnGroup.appendChild(okBtn);
  btnGroup.appendChild(cancelBtn);
  footer.appendChild(selectedLabel);
  footer.appendChild(btnGroup);
  dialog.appendChild(footer);

  function renderTags(): void {
    tagWrap.innerHTML = '';
    for (const tag of allTags) {
      const btn = document.createElement('button');
      btn.textContent = tag === 'All' ? 'Todos' : tag;
      const isAct = activeTag === tag;
      Object.assign(btn.style, {
        padding: '4px 8px',
        backgroundColor: isAct ? '#3b82f6' : '#333333',
        border: `1px solid ${isAct ? '#60a5fa' : '#4b5563'}`,
        borderRadius: '3px',
        color: isAct ? '#ffffff' : '#d1d5db',
        fontSize: '11px',
        cursor: 'pointer',
      });
      btn.addEventListener('click', () => {
        activeTag = tag;
        renderTags();
        renderList();
      });
      tagWrap.appendChild(btn);
    }
  }

  function renderList(): void {
    listContainer.innerHTML = '';
    const filtered = catalog.filter((item) => {
      const matchesTag = activeTag === 'All' || item.tags.includes(activeTag);
      const matchesQuery =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery) ||
        item.id.toLowerCase().includes(searchQuery) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery));
      return matchesTag && matchesQuery;
    });

    const curItem = catalog.find((c) => c.id === selectedId);
    selectedLabel.textContent = curItem
      ? `Seleccionado: ${curItem.name}`
      : `Seleccionado: ${selectedId}`;

    for (const item of filtered) {
      const isSel = item.id === selectedId;
      const row = document.createElement('div');
      Object.assign(row.style, {
        display: 'grid',
        gridTemplateColumns: '68px 1fr 110px 95px',
        alignItems: 'center',
        padding: '6px 12px',
        borderBottom: '1px solid #3a3a3a',
        backgroundColor: isSel ? '#2563eb38' : 'transparent',
        outline: isSel ? '1px solid #3b82f6' : 'none',
        cursor: 'pointer',
      });

      const thumbBox = document.createElement('div');
      Object.assign(thumbBox.style, {
        width: '54px',
        height: '54px',
        borderRadius: '3px',
        backgroundColor: '#e5e7eb',
        border: '1px solid #525252',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      });

      if (item.dataUrl) {
        const img = document.createElement('img');
        img.src = item.dataUrl;
        Object.assign(img.style, {
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          // Invert white-alpha brush tips so they appear dark on light paper like CSP's material viewer
          filter: options.category === 'tip' ? 'invert(0.85) contrast(1.4)' : 'contrast(1.15)',
        });
        thumbBox.appendChild(img);
      } else {
        thumbBox.innerHTML = `<span style="color:#374151;font-size:20px;font-weight:bold;">${
          options.category === 'tip' ? '●' : '∅'
        }</span>`;
      }

      const nameCol = document.createElement('div');
      Object.assign(nameCol.style, {
        fontWeight: isSel ? '600' : '500',
        color: isSel ? '#93c5fd' : '#f3f4f6',
        paddingRight: '8px',
      });
      nameCol.textContent = item.name;

      const typeCol = document.createElement('div');
      Object.assign(typeCol.style, {
        color: '#9ca3af',
        fontSize: '11px',
      });
      typeCol.textContent = item.dataUrl ? 'Image material' : 'Ajuste base';

      const tagsCol = document.createElement('div');
      Object.assign(tagsCol.style, {
        color: '#9ca3af',
        fontSize: '11px',
      });
      tagsCol.textContent = item.tags.join(', ');

      row.appendChild(thumbBox);
      row.appendChild(nameCol);
      row.appendChild(typeCol);
      row.appendChild(tagsCol);

      row.addEventListener('click', () => {
        selectedId = item.id;
        renderList();
      });
      row.addEventListener('dblclick', () => {
        selectedId = item.id;
        options.onSelect(selectedId);
        closeModal();
      });

      listContainer.appendChild(row);
    }
  }

  function closeModal(): void {
    window.removeEventListener('keydown', onKeyDown);
    if (activeModalEl) {
      activeModalEl.remove();
      activeModalEl = null;
    }
  }

  function onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      options.onSelect(selectedId);
      closeModal();
    }
  }

  overlay.addEventListener('mousedown', (e) => {
    if (e.target === overlay) closeModal();
  });
  window.addEventListener('keydown', onKeyDown);

  renderTags();
  renderList();

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  activeModalEl = overlay;
  setTimeout(() => searchInput.focus(), 20);
}
