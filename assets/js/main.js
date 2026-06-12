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
    let wi = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = words[wi];
      ci += deleting ? -1 : 1;
      typed.textContent = word.slice(0, ci);
      let delay = deleting ? 55 : 110;
      if (!deleting && ci === word.length) { deleting = true; delay = 1500; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    };
    tick();
  }
}

// Hero code window — typewriter with syntax colors + mouse tilt
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
