// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// Pricing toggle (monthly / yearly  -> 20% off)
const priceSwitch = document.getElementById('priceSwitch');
if (priceSwitch) {
  const labels = document.querySelectorAll('.pricing-toggle .label');
  priceSwitch.addEventListener('click', () => {
    const yearly = priceSwitch.getAttribute('aria-pressed') === 'true';
    priceSwitch.setAttribute('aria-pressed', String(!yearly));
    labels[0].classList.toggle('active', yearly);
    labels[1].classList.toggle('active', !yearly);
    document.querySelectorAll('.price-card .amount .val').forEach(el => {
      const monthly = +el.dataset.monthly;
      el.textContent = yearly ? monthly : Math.round(monthly * 0.8);
    });
  });
}

// Typewriter effect on the hero's last word
const typed = document.getElementById('typed');
if (typed) {
  let words = [];
  try { words = JSON.parse(typed.dataset.words || '[]'); } catch (e) {}
  if (words.length) {
    let wi = 0, ci = words[0].length, deleting = true, visible = true, running = false;
    typed.textContent = words[0];
    const tick = () => {
      const word = words[wi];
      ci += deleting ? -1 : 1;
      typed.textContent = word.slice(0, ci);
      let delay = deleting ? 55 : 110;
      if (!deleting && ci === word.length) { deleting = true; delay = 1500; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
      if (!visible) { running = false; return; }   // pausieren, wenn der Hero aus dem Sichtfeld ist
      setTimeout(tick, delay);
    };
    const hero = document.getElementById('about');
    if ('IntersectionObserver' in window && hero) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !running) { running = true; tick(); }
      }).observe(hero);
    }
    running = true;
    setTimeout(tick, 1500);   // 1.5s: erst fertig rendern, dann animieren
  }
}

// Hero code window is server-rendered as static HTML (instant paint = best LCP).
// The blinking cursor (.code-caret) stays purely in CSS — no JS needed here.

// Remember the language a visitor picks via the switcher
document.querySelectorAll('.lang-switch .lang-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    try { localStorage.setItem('lang', opt.dataset.lang); } catch (e) {}
  });
});

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Blog list: "show more" reveals the next batch of cards
const blogMore = document.getElementById('blogMore');
if (blogMore) {
  const grid = document.getElementById('blogGrid');
  const step = parseInt(grid.dataset.pageSize || '9', 10);
  blogMore.addEventListener('click', () => {
    const hidden = grid.querySelectorAll('.blog-cell.is-hidden');
    for (let i = 0; i < step && i < hidden.length; i++) {
      hidden[i].classList.remove('is-hidden');
      const card = hidden[i].querySelector('.reveal');
      if (card) card.classList.add('in');
    }
    if (grid.querySelectorAll('.blog-cell.is-hidden').length === 0) blogMore.style.display = 'none';
  });
}

// Contact form: custom required-field validation (red field + inline hint)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  // Lazy-load Turnstile only when the user engages the form -> keeps the script off the
  // initial critical path (better LCP/FCP); api.js auto-renders the .cf-turnstile widget on load.
  const tsWidget = contactForm.querySelector('.cf-turnstile');
  if (tsWidget) {
    const loadTurnstile = () => {
      if (window.__tsLoading) return;
      window.__tsLoading = true;
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true; s.defer = true;
      document.head.appendChild(s);
    };
    contactForm.addEventListener('focusin', loadTurnstile, { once: true });
    contactForm.addEventListener('pointerdown', loadTurnstile, { once: true });
  }
  contactForm.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('invalid', (e) => {
      e.preventDefault();
      const field = el.closest('.field');
      if (!field) return;
      field.classList.add('invalid');
      const err = field.querySelector('.field-error');
      if (err && el.dataset.msgEmail) {
        err.textContent = el.validity.typeMismatch ? el.dataset.msgEmail : (el.dataset.msgRequired || err.textContent);
      }
    });
    const clear = () => el.closest('.field') && el.closest('.field').classList.remove('invalid');
    el.addEventListener('input', clear);
    el.addEventListener('change', clear);
  });
  // Submit only fires when native validation passes
  const errEl = contactForm.querySelector('.form-submit-error');
  const showSuccess = () => {
    contactForm.reset();
    contactForm.querySelectorAll('.field.invalid').forEach(f => f.classList.remove('invalid'));
    contactForm.classList.add('is-sent');
  };
  // Submit only fires when native validation passes (required fields + consent + valid email)
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errEl) errEl.style.display = 'none';
    const endpoint = contactForm.dataset.endpoint;
    const data = Object.fromEntries(new FormData(contactForm).entries());
    if (data.contact_ref) { showSuccess(); return; }   // honeypot filled -> bot, drop silently
    if (!endpoint) { showSuccess(); return; }       // no backend configured yet (local/preview)
    const btn = contactForm.querySelector('button[type="submit"]');
    const label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = contactForm.dataset.sending || label; }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Request failed');
      showSuccess();
    } catch (err) {
      if (errEl) errEl.style.display = 'block';
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = label; }
    }
  });
  const sendAgain = contactForm.querySelector('.form-success-again');
  if (sendAgain) sendAgain.addEventListener('click', () => {
    contactForm.classList.remove('is-sent');
    if (window.turnstile) { try { window.turnstile.reset(); } catch (e) {} }
  });
}
