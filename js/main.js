/* ── NAV SHADOW ── */
window.addEventListener('scroll', function () {
  var nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('shadow', window.scrollY > 8);
});

/* ── HERO SLIDER ── */
(function () {
  var slides = document.querySelectorAll('.hero .slide');
  var dots   = document.querySelectorAll('.hero .sdot');
  if (!slides.length) return;

  var cur = 0;
  var total = slides.length;
  var timer = null;

  /* REPLACE WITH THIS: */
function goTo(n) {
  var prev = cur;
  cur = ((n % total) + total) % total;
  if (prev === cur) return;

  // Remove active from old slide
  slides[prev].classList.remove('active');
  if (dots[prev]) dots[prev].classList.remove('on');

  // Add active to new slide
  slides[cur].classList.add('active');
  if (dots[cur]) dots[cur].classList.add('on');
}

  function startAuto() {
    stopAuto();
    timer = setInterval(function () { goTo(cur + 1); }, 4000);
  }

  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  var nextBtn = document.querySelector('.hero .s-next');
  var prevBtn = document.querySelector('.hero .s-prev');

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      stopAuto(); goTo(cur + 1); startAuto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      stopAuto(); goTo(cur - 1); startAuto();
    });
  }

  dots.forEach(function (d, i) {
    d.addEventListener('click', function () {
      stopAuto(); goTo(i); startAuto();
    });
  });

  startAuto();
})();

/* ── SCROLL REVEAL ── */
(function () {
  var els = document.querySelectorAll('.rv, .rvl, .rvr');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var ro = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { ro.observe(el); });
})();

/* ── SOLUTIONS TAB ── */
window.solTab = function (n, el) {
  document.querySelectorAll('.sol-tab').forEach(function (t) { t.classList.remove('on'); });
  document.querySelectorAll('.sol-panel').forEach(function (p) { p.classList.remove('on'); });
  el.classList.add('on');
  var panels = document.querySelectorAll('.sol-panel');
  if (panels[n]) panels[n].classList.add('on');
};

/* ── PRODUCT FILTER ── */
window.filterProducts = function (cat, el) {
  document.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('on'); });
  el.classList.add('on');
  document.querySelectorAll('.pcard').forEach(function (c) {
    c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
  });
};

/* ── CONTACT FORM ── */
window.submitForm = function (btn) {
  btn.textContent = 'Enquiry Sent! We will contact you soon.';
  btn.style.background = '#16a34a';
  setTimeout(function () {
    btn.textContent = 'Send Enquiry';
    btn.style.background = '';
  }, 4500);
};

/* ── COUNTER ANIMATION ── */
(function () {
  var counters = [
    { selector: '.astat-num', targets: [] }
  ];

  var statEls = document.querySelectorAll('.astat-num');
  if (!statEls.length) return;

  // Store original values
  statEls.forEach(function (el) {
    el.dataset.target = parseInt(el.textContent);
    el.dataset.suffix = el.textContent.replace(/[0-9]/g, ''); // gets "+" or "+"
    el.textContent = '0' + el.dataset.suffix;
  });

  function animateCounter(el) {
    var target = parseInt(el.dataset.target);
    var suffix = el.dataset.suffix;
    var duration = 2000; // 2 seconds
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // Ease out effect
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // Trigger when stats section comes into view
  if (!('IntersectionObserver' in window)) {
    statEls.forEach(function (el) { animateCounter(el); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(function (el) { observer.observe(el); });
})();


/* ── FLOATING PARTICLES ── */
(function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.35;';
  hero.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var particles = [];
  var count = 60;

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create particles
  for (var i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connection lines
    particles.forEach(function (a, i) {
      particles.forEach(function (b, j) {
        if (i >= j) return;
        var dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255,42,59,' + (0.12 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      });
    });

    // Draw particles
    particles.forEach(function (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,42,59,' + p.opacity + ')';
      ctx.fill();

      // Move
      p.x += p.dx;
      p.y += p.dy;

      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();
})();


/* ── MAGNETIC BUTTON EFFECT ── */
(function () {
  var btns = document.querySelectorAll('.btn-red, .btn-ghost, .nav-cta, .btn-white');
  if (!btns.length) return;

  btns.forEach(function (btn) {
    btn.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease';

    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull — moves max 8px in any direction
      var moveX = x * 0.25;
      var moveY = y * 0.25;

      btn.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
    });

    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translate(0, 0)';
    });
  });
})();


/* ── SMOKE / FOG EFFECT ── */
(function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;

  var smokeCount = 6;

  for (var i = 0; i < smokeCount; i++) {
    var puff = document.createElement('div');
    puff.className = 'dp-smoke';

    // Random size between 300–600px
    var size = Math.random() * 300 + 300;
    var startX = Math.random() * 100;
    var delay = Math.random() * 8;
    var duration = Math.random() * 10 + 14;

    puff.style.cssText = [
      'position:absolute',
      'width:' + size + 'px',
      'height:' + size + 'px',
      'left:' + startX + '%',
      'bottom:-100px',
      'border-radius:50%',
      'background:radial-gradient(circle, rgba(255,42,59,0.04) 0%, rgba(255,255,255,0.02) 50%, transparent 70%)',
      'pointer-events:none',
      'z-index:2',
      'animation:dp-smoke ' + duration + 's ' + delay + 's ease-in-out infinite',
      'filter:blur(40px)',
      'transform-origin:center bottom'
    ].join(';');

    hero.appendChild(puff);
  }

  // Inject keyframes
  var style = document.createElement('style');
  style.textContent = [
    '@keyframes dp-smoke {',
    '  0%   { transform: translateY(0)   scale(1)   rotate(0deg);   opacity: 0; }',
    '  15%  { opacity: 1; }',
    '  80%  { opacity: 0.6; }',
    '  100% { transform: translateY(-80vh) scale(2.5) rotate(25deg); opacity: 0; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);
})();



/* ── 3D TILT EFFECT ON PRODUCT CARDS ── */
(function () {
  var cards = document.querySelectorAll('.pcard, .wcard, .ind-card');
  if (!cards.length) return;

  cards.forEach(function (card) {
    card.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
    card.style.willChange = 'transform';

    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;

      // Max tilt 12 degrees
      var tiltX = ((y - cy) / cy) * -12;
      var tiltY = ((x - cx) / cx) * 12;

      card.style.transform = [
        'perspective(800px)',
        'rotateX(' + tiltX + 'deg)',
        'rotateY(' + tiltY + 'deg)',
        'scale(1.04)'
      ].join(' ');

      card.style.boxShadow = '0 20px 40px rgba(255,42,59,0.15)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
      card.style.boxShadow = '';
    });
  });
})();

