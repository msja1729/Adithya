(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function cssVar(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }

  /* ---------------------------------------------------------
     Theme toggle (with circular colour wipe)
     --------------------------------------------------------- */
  var themeToggle = document.getElementById('themeToggle');

  function setTheme(theme, originX, originY) {
    if (!reduceMotion && originX !== undefined) {
      var r = Math.hypot(Math.max(originX, innerWidth - originX), Math.max(originY, innerHeight - originY));
      var wipe = document.createElement('div');
      wipe.className = 'theme-wipe';
      wipe.style.width = wipe.style.height = r * 2 + 'px';
      wipe.style.left = originX - r + 'px';
      wipe.style.top = originY - r + 'px';
      wipe.style.background = theme === 'dark' ? '#05050b' : '#f6f5fb';
      body.appendChild(wipe);
      setTimeout(function () { wipe.remove(); }, 800);
    }
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    refreshPalette();
  }

  function toggleTheme(x, y) {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', x, y);
  }

  themeToggle.addEventListener('click', function (e) {
    var rect = themeToggle.getBoundingClientRect();
    toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
    e.stopPropagation();
  });

  document.addEventListener('keydown', function (e) {
    if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey && !e.altKey &&
        !/input|textarea|select/i.test(e.target.tagName)) {
      toggleTheme(innerWidth / 2, innerHeight / 2);
    }
  });

  /* ---------------------------------------------------------
     Navigation: mobile menu, scrolled state, active section
     --------------------------------------------------------- */
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function (e) {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    e.stopPropagation();
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  var navLinkMap = {};
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    navLinkMap[link.getAttribute('href').slice(1)] = link;
  });

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var key = entry.target.getAttribute('data-nav') || entry.target.id;
      var link = navLinkMap[key];
      if (!link) return;
      Object.keys(navLinkMap).forEach(function (k) { navLinkMap[k].classList.remove('active'); });
      link.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  document.querySelectorAll('main > section[id]').forEach(function (s) { navObserver.observe(s); });

  /* ---------------------------------------------------------
     Scroll progress + navbar background
     --------------------------------------------------------- */
  var progress = document.querySelector('.scroll-progress');
  var ticking = false;

  function onScroll() {
    var max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    navbar.classList.toggle('scrolled', scrollY > 20);
    ticking = false;
  }

  addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     Reveal on scroll (staggered within groups)
     --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  revealEls.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.classList.contains('reveal');
    });
    el.style.setProperty('--delay', Math.min(siblings.indexOf(el), 6) * 0.08 + 's');
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------
     Hero name: split first line into hoverable letters
     --------------------------------------------------------- */
  var firstLine = document.querySelector('#heroName .name-line');
  if (firstLine) {
    var text = firstLine.textContent;
    firstLine.textContent = '';
    firstLine.setAttribute('aria-hidden', 'true');
    text.split('').forEach(function (ch) {
      var span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? ' ' : ch;
      firstLine.appendChild(span);
    });
  }

  /* ---------------------------------------------------------
     Typewriter
     --------------------------------------------------------- */
  var typedEl = document.getElementById('typed');
  var phrases = [
    'Mathematics & Computing @ IISc Bengaluru',
    'building memory firewalls for AI agents',
    'formal verification in Lean 4',
    'RL pipelines · GRPO · LLM fine-tuning',
    'exploring systems security & HPC'
  ];

  if (reduceMotion) {
    typedEl.textContent = phrases[0];
  } else {
    var pi = 0, ci = 0, deleting = false;
    (function type() {
      var phrase = phrases[pi];
      ci += deleting ? -1 : 1;
      typedEl.textContent = phrase.slice(0, ci);
      var delay = deleting ? 28 : 55 + Math.random() * 50;
      if (!deleting && ci === phrase.length) { deleting = true; delay = 1800; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
      setTimeout(type, delay);
    })();
  }

  /* ---------------------------------------------------------
     Animated counters
     --------------------------------------------------------- */
  var counters = document.querySelectorAll('.stat-num[data-count]');

  function runCounter(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals || '0', 10);
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
    var start = performance.now(), dur = 1600;
    (function step(now) {
      var t = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 4);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { runCounter(entry.target); counterObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  counters.forEach(function (c) { counterObserver.observe(c); });

  /* ---------------------------------------------------------
     Card spotlight (all pointers) + 3D tilt (fine pointers)
     --------------------------------------------------------- */
  document.querySelectorAll('.spotlight').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.tilt').forEach(function (el) {
      var max = el.id === 'photoWrap' ? 14 : 5;
      el.addEventListener('pointermove', function (e) {
        if (el.classList.contains('reveal') && !el.classList.contains('in') && el.id !== 'photoWrap') return;
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(900px) rotateX(' + (-py * max) + 'deg) rotateY(' + (px * max) + 'deg) translateY(-4px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });

    /* Magnetic elements */
    document.querySelectorAll('.magnetic').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + x * 0.3 + 'px,' + y * 0.35 + 'px)';
      });
      el.addEventListener('pointerleave', function () {
        el.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1)';
        el.style.transform = '';
        setTimeout(function () { el.style.transition = ''; }, 500);
      });
    });
  }

  /* ---------------------------------------------------------
     Custom cursor
     --------------------------------------------------------- */
  var mouse = { x: innerWidth / 2, y: innerHeight / 2, active: false };

  if (finePointer) {
    body.classList.add('has-cursor');
    var dot = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-ring');
    var ringX = mouse.x, ringY = mouse.y;

    addEventListener('pointermove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      dot.style.transform = 'translate(' + mouse.x + 'px,' + mouse.y + 'px)';
      dot.classList.remove('hidden');
      ring.classList.remove('hidden');
    });

    document.addEventListener('pointerleave', function () {
      mouse.active = false;
      dot.classList.add('hidden');
      ring.classList.add('hidden');
    });

    addEventListener('pointerdown', function () { ring.classList.add('down'); });
    addEventListener('pointerup', function () { ring.classList.remove('down'); });

    document.querySelectorAll('a, button, .chip, .card').forEach(function (el) {
      el.addEventListener('pointerenter', function () { ring.classList.add('hover'); });
      el.addEventListener('pointerleave', function () { ring.classList.remove('hover'); });
    });

    (function follow() {
      var k = reduceMotion ? 1 : 0.18;
      ringX += (mouse.x - ringX) * k;
      ringY += (mouse.y - ringY) * k;
      ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px)';
      requestAnimationFrame(follow);
    })();
  } else {
    addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; }, { passive: true });
  }

  /* ---------------------------------------------------------
     Interactive particle field + click bursts
     --------------------------------------------------------- */
  var canvas = document.getElementById('bgCanvas');
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  var particles = [];
  var sparks = [];
  var palette = [];
  var lineRGB = '168,85,247';

  function hexToRgb(hex) {
    var m = hex.replace('#', '');
    if (m.length === 3) m = m.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(m, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
  }

  function refreshPalette() {
    palette = [cssVar('--a1'), cssVar('--a2'), cssVar('--a3')].map(hexToRgb);
    lineRGB = palette[0];
  }

  function resize() {
    W = innerWidth;
    H = innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.min(Math.round((W * H) / 16000), 110);
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        c: i % 3
      });
    }
  }

  function burst(x, y) {
    var n = 22;
    for (var i = 0; i < n; i++) {
      var a = (Math.PI * 2 * i) / n + Math.random() * 0.3;
      var s = 2 + Math.random() * 4;
      sparks.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, c: i % 3, r: 1.5 + Math.random() * 2 });
    }
    // push nearby particles away like a shockwave
    particles.forEach(function (p) {
      var dx = p.x - x, dy = p.y - y, d = Math.hypot(dx, dy);
      if (d < 220 && d > 0) { p.vx += (dx / d) * (220 - d) / 40; p.vy += (dy / d) * (220 - d) / 40; }
    });
  }

  if (!reduceMotion) {
    addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return;
      burst(e.clientX, e.clientY);
    });
  }

  var LINK = 120, MOUSE_R = 170;

  var looping = false;

  function frame() {
    looping = false;
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      if (mouse.active) {
        var mdx = mouse.x - p.x, mdy = mouse.y - p.y, md = Math.hypot(mdx, mdy);
        if (md < MOUSE_R && md > 0) {
          // gentle attraction that orbits the cursor
          var f = (1 - md / MOUSE_R) * 0.06;
          p.vx += (mdx / md) * f - (mdy / md) * f * 0.8;
          p.vy += (mdy / md) * f + (mdx / md) * f * 0.8;
        }
      }

      p.vx *= 0.985;
      p.vy *= 0.985;
      var speed = Math.hypot(p.vx, p.vy);
      if (speed < 0.12) { p.vx += (Math.random() - 0.5) * 0.05; p.vy += (Math.random() - 0.5) * 0.05; }
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          var alpha = (1 - Math.sqrt(d2) / LINK) * 0.22;
          ctx.strokeStyle = 'rgba(' + lineRGB + ',' + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      if (mouse.active) {
        var cd = Math.hypot(mouse.x - p.x, mouse.y - p.y);
        if (cd < MOUSE_R) {
          ctx.strokeStyle = 'rgba(' + palette[1] + ',' + (1 - cd / MOUSE_R) * 0.5 + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = 'rgba(' + palette[p.c] + ',0.85)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (var k = sparks.length - 1; k >= 0; k--) {
      var s = sparks[k];
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.94;
      s.vy = s.vy * 0.94 + 0.06;
      s.life -= 0.022;
      if (s.life <= 0) { sparks.splice(k, 1); continue; }
      ctx.fillStyle = 'rgba(' + palette[s.c] + ',' + s.life + ')';
      ctx.shadowColor = 'rgba(' + palette[s.c] + ',1)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * s.life + 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (!reduceMotion && !document.hidden) startLoop();
  }

  function startLoop() {
    if (looping) return;
    looping = true;
    requestAnimationFrame(frame);
  }

  refreshPalette();
  resize();

  var resizeTimer;
  addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  if (reduceMotion) {
    // single static frame
    frame();
  } else {
    startLoop();
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) startLoop();
    });
  }
})();
