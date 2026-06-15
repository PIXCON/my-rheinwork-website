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
    let wi = 0, ci = 0, deleting = false, visible = true, running = false;
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
    tick();
  }
}

// Hero code window: typewriter with syntax colors + mouse tilt
const heroCode = document.getElementById('heroCode');
if (heroCode) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // each line is a list of {t: text, c: token class suffix} ('' = default)
  const LINES = [
    [['import ', 'key'], ['{ createStudio, deploy } ', 'punc'], ['from ', 'key'], ['"@rheinwork/core"', 'str']],
    [['', '']],
    [['const ', 'key'], ['rheinwork ', ''], ['= ', 'punc'], ['createStudio', 'fn'], ['({', 'punc']],
    [['  builds: ', ''], ['[', 'punc'], ['"software"', 'str'], [', ', 'punc'], ['"apps"', 'str'], [', ', 'punc'], ['"websites"', 'str'], ['],', 'punc']],
    [['  stack: ', ''], ['[', 'punc'], ['"TypeScript"', 'str'], [', ', 'punc'], ['"Go"', 'str'], [', ', 'punc'], ['"React"', 'str'], ['],', 'punc']],
    [['  cloud: ', ''], ['"edge"', 'str'], [',', 'punc']],
    [['})', 'punc']],
    [['', '']],
    [['export async function ', 'key'], ['ship', 'fn'], ['(project) ', 'punc'], ['{', 'punc']],
    [['  const ', 'key'], ['build ', ''], ['= ', 'punc'], ['await ', 'key'], ['rheinwork', ''], ['.compile', 'fn'], ['(project)', 'punc']],
    [['  await ', 'key'], ['deploy', 'fn'], ['(build, ', 'punc'], ['{ fast: ', ''], ['true', 'key'], [', scale: ', 'punc'], ['"auto"', 'str'], [' })', 'punc']],
    [['  return ', 'key'], ['build', ''], ['.url', 'fn']],
    [['}', 'punc']],
    [['', '']],
    [['// shipped, faster than you thought possible', 'com']],
  ];
  // flatten into a stream of { ch, cls } including newlines (cls null)
  const stream = [];
  LINES.forEach((line, li) => {
    line.forEach(([text, cls]) => { for (const ch of text) stream.push({ ch, cls }); });
    if (li < LINES.length - 1) stream.push({ ch: '\n', cls: null });
  });
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const render = (k) => {
    let html = '', buf = '', cur = '';
    const flush = () => { if (buf) { html += cur ? `<span class="t-${cur}">${esc(buf)}</span>` : esc(buf); buf = ''; } };
    for (let i = 0; i < k; i++) {
      const u = stream[i];
      if (u.ch === '\n') { flush(); html += '\n'; continue; }
      if (u.cls !== cur) { flush(); cur = u.cls; }
      buf += u.ch;
    }
    flush();
    heroCode.innerHTML = html;
  };
  if (reduce) {
    render(stream.length);
  } else {
    let k = 0;
    const tick = () => {
      k++;
      render(k);
      let delay = 26;
      const u = stream[k - 1];
      if (u && u.ch === '\n') delay = 180;
      if (k >= stream.length) { setTimeout(() => { k = 0; render(0); setTimeout(tick, 500); }, 2400); return; }
      setTimeout(tick, delay);
    };
    tick();
  }

  // subtle mouse tilt on the code window
  const win = document.getElementById('codeWindow');
  const hero = document.querySelector('.hero');
  if (win && hero && !reduce) {
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      win.style.transform = `rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
    });
    hero.addEventListener('mouseleave', () => { win.style.transform = 'rotateY(0deg) rotateX(0deg)'; });
  }
}

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
