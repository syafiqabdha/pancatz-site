const ACTIVE = ['bg-[var(--primary)]', 'text-[#0a0a0a]', 'border-[var(--primary)]'];
const INACTIVE = ['text-[var(--muted-ink)]', 'hover:text-[var(--ink)]'];

/** Tab switching for the server-rendered pricing panels. */
export function initPricing() {
  const tabs = document.querySelectorAll<HTMLButtonElement>('#pricing-steps .step-btn');
  const panels = document.querySelectorAll<HTMLElement>('#pricing-content [data-panel]');
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.remove(...(on ? INACTIVE : ACTIVE));
        t.classList.add(...(on ? ACTIVE : INACTIVE));
        t.setAttribute('aria-selected', String(on));
      });
      panels.forEach((panel) => {
        const on = panel.dataset.panel === tab.dataset.step;
        panel.hidden = !on;
        if (on) revealPrices(panel);
      });
    });
  });
}

function revealPrices(panel: HTMLElement) {
  panel.querySelectorAll<HTMLElement>('.price-num').forEach((el) => {
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}
