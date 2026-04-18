/* ── DARK / LIGHT MODE TOGGLE ── */
(function () {
  var body = document.body;
  var btn  = document.getElementById('theme-toggle');
  if (!btn) return;

  /* ── Logo filenames ──────────────────────────────────
     logo(1).png  = white/light background  → use in LIGHT mode (default)
     logo.png     = black/dark background   → use in DARK  mode
  ──────────────────────────────────────────────────── */
  var LOGO_LIGHT = 'images/logo(1).png';
  var LOGO_DARK  = 'images/logo.png';

  /* Swap nav logo by theme, but keep footer logo black on every page. */
  function setLogos(isDark) {
  var src = isDark ? LOGO_DARK : LOGO_LIGHT;
  document.querySelectorAll('.js-logo').forEach(function (img) {
    img.src = src;
    // Remove any inline background
    img.style.background = 'transparent';
    img.style.padding = '0';
  });
  document.querySelectorAll('.js-foot-logo').forEach(function (img) {
    img.src = LOGO_DARK;
    img.style.background = 'transparent';
    img.style.padding = '0';
  });

  // Remove white box from footer logo container
  var footLogoWrap = document.querySelector('.foot-logo');
  if (footLogoWrap) {
    footLogoWrap.style.background = isDark ? 'transparent' : '';
    footLogoWrap.style.border = isDark ? 'none' : '';
    footLogoWrap.style.boxShadow = isDark ? 'none' : '';
    footLogoWrap.style.padding = isDark ? '0' : '';
  }
}

  /* ── Apply saved preference on page load ── */
  var saved = localStorage.getItem('dp-theme');
  if (saved === 'dark') {
    body.classList.add('dark-mode');
    btn.textContent = '☀️';
    btn.title = 'Switch to Light Mode';
    setLogos(true);
  } else {
    btn.textContent = '🌙';
    btn.title = 'Switch to Dark Mode';
    setLogos(false);
  }

  /* ── Toggle on button click ── */
  btn.addEventListener('click', function () {
    var isDark = body.classList.toggle('dark-mode');
    if (isDark) {
      btn.textContent = '☀️';
      btn.title = 'Switch to Light Mode';
      localStorage.setItem('dp-theme', 'dark');
    } else {
      btn.textContent = '🌙';
      btn.title = 'Switch to Light Mode';
      localStorage.setItem('dp-theme', 'light');
    }
    setLogos(isDark);
  });
})();
