export interface CustomScrollContainer {
  wrap: HTMLDivElement;
  list: HTMLDivElement;
  scrollbar: HTMLDivElement;
  thumb: HTMLDivElement;
  update: () => void;
}

export function createCustomScrollContainer(extraWrapClass = ''): CustomScrollContainer {
  const wrap = document.createElement('div');
  wrap.className = `csp-scroll-wrap ${extraWrapClass}`;

  const list = document.createElement('div');
  list.className = 'csp-scroll-list';

  const scrollbar = document.createElement('div');
  scrollbar.className = 'csp-custom-scrollbar';

  const thumb = document.createElement('div');
  thumb.className = 'csp-custom-scroll-thumb';
  scrollbar.appendChild(thumb);

  wrap.append(list, scrollbar);

  const update = (): void => {
    const clientH = list.clientHeight;
    const scrollH = list.scrollHeight;
    const scrollT = list.scrollTop;

    if (scrollH <= clientH + 2) {
      scrollbar.classList.add('hidden');
      return;
    }
    scrollbar.classList.remove('hidden');

    const thumbH = Math.max(20, (clientH / scrollH) * clientH);
    const maxScroll = scrollH - clientH;
    const maxTop = clientH - thumbH;
    const top = maxScroll > 0 ? (scrollT / maxScroll) * maxTop : 0;

    thumb.style.height = `${Math.round(thumbH)}px`;
    thumb.style.transform = `translateY(${Math.round(top)}px)`;
  };

  list.addEventListener('scroll', update, { passive: true });

  let isDragging = false;
  let dragStartY = 0;
  let dragStartScrollTop = 0;

  thumb.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
    dragStartY = e.clientY;
    dragStartScrollTop = list.scrollTop;
    thumb.classList.add('dragging');
    thumb.setPointerCapture(e.pointerId);
  });

  thumb.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dy = e.clientY - dragStartY;
    const clientH = list.clientHeight;
    const scrollH = list.scrollHeight;
    const thumbH = Math.max(20, (clientH / scrollH) * clientH);
    const maxScroll = scrollH - clientH;
    const maxTop = clientH - thumbH;
    if (maxTop > 0) {
      list.scrollTop = dragStartScrollTop + (dy / maxTop) * maxScroll;
    }
  });

  const stopDrag = (e: PointerEvent) => {
    if (!isDragging) return;
    isDragging = false;
    thumb.classList.remove('dragging');
    try {
      thumb.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };
  thumb.addEventListener('pointerup', stopDrag);
  thumb.addEventListener('pointercancel', stopDrag);

  scrollbar.addEventListener('pointerdown', (e) => {
    if (e.target === thumb) return;
    const rect = scrollbar.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clientH = list.clientHeight;
    const scrollH = list.scrollHeight;
    const targetRatio = Math.max(0, Math.min(1, clickY / clientH));
    list.scrollTop = targetRatio * (scrollH - clientH);
  });

  return { wrap, list, scrollbar, thumb, update };
}
