/* ── DARK / LIGHT MODE TOGGLE ── */
(function () {
  var body = document.body;
  var btn  = document.getElementById('theme-toggle');
  if (!btn) return;

  /* Load saved preference */
  var saved = localStorage.getItem('dp-theme');
  if (saved === 'dark') {
    body.classList.add('dark-mode');
    btn.textContent = '☀️';
    btn.title = 'Switch to Light Mode';
  } else {
    btn.textContent = '🌙';
    btn.title = 'Switch to Dark Mode';
  }

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
  });
})();