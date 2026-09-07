// ============================================================
// Dark / "night" mode toggle, remembered for the session
// ============================================================
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('modeToggle');
  const label = toggle.querySelector('.mode-toggle__label');
  const STORAGE_KEY = 'cyberaware-theme';

  function applyTheme(theme) {
    if (theme === 'night') {
      root.setAttribute('data-theme', 'night');
      toggle.setAttribute('aria-pressed', 'true');
      label.textContent = 'Day mode';
    } else {
      root.removeAttribute('data-theme');
      toggle.setAttribute('aria-pressed', 'false');
      label.textContent = 'Night mode';
    }
  }

  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'night' : 'day'));

  toggle.addEventListener('click', function () {
    const isNight = root.getAttribute('data-theme') === 'night';
    const next = isNight ? 'day' : 'night';
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
  });
})();

// ============================================================
// Accordion — threats section
// ============================================================
(function () {
  const accordion = document.querySelector('[data-accordion]');
  if (!accordion) return;

  const triggers = accordion.querySelectorAll('.entry__trigger');

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
    });
  });
})();

// ============================================================
// Phishing exhibit — hover/focus/tap a flagged phrase or a
// list item and its counterpart lights up together
// ============================================================
(function () {
  const marks = document.querySelectorAll('.flag-mark');
  const items = document.querySelectorAll('.flag-list li');

  function setActive(id, on) {
    marks.forEach(function (m) {
      if (m.dataset.flag === id) m.classList.toggle('is-active', on);
    });
    items.forEach(function (i) {
      if (i.dataset.flag === id) i.classList.toggle('is-active', on);
    });
  }

  function wire(el) {
    const id = el.dataset.flag;
    el.addEventListener('mouseenter', function () { setActive(id, true); });
    el.addEventListener('mouseleave', function () { setActive(id, false); });
    el.addEventListener('click', function () { setActive(id, true); setTimeout(function () { setActive(id, false); }, 1600); });
  }

  marks.forEach(wire);
  items.forEach(wire);
})();
