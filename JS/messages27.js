// Arcade cabinet: 3 reels x 9 memories
(() => {
  'use strict';

  // Config
  const CONFIG = {
    useImages: false,   // true once IMG27/ is ready
    imgDir: 'IMG27',
    imgExt: 'jpg',
    spinMs: [1000, 1500, 2000],
    tickMs: 70,
    coinRare: 0.6       // rare chance per reel when a coin is in
  };
  const PER_REEL = 9;
  const TOTAL = PER_REEL * 3;

  // Dummy data. Items 3, 6, 9 are rare. Optional: img per item.
  const REELS = [1, 2, 3].map(reel =>
    Array.from({ length: PER_REEL }, (_, k) => {
      const n = k + 1;
      return {
        title: `思い出 ${reel}-${n}`,
        message: `これはリール${reel}の${n}番目のダミーメッセージです。実際のメッセージに差し替えてください。`,
        rare: n % 3 === 0
      };
    })
  );
  const rareIdx = REELS.map(items => items.flatMap((it, i) => (it.rare ? [i] : [])));

  // DOM
  const $ = id => document.getElementById(id);
  const cabinet = $('cabinet'), marqueeMain = $('marqueeMain'), counterEl = $('counter'),
        statusEl = $('status'), rollBtn = $('rollBtn'), hint = $('lcdHint'), rowsWrap = $('lcdRows'),
        coinEl = $('coin'), coinBtn = $('coinBtn'), coinLabel = $('coinLabel');
  const stars = document.querySelectorAll('#stars .star');
  const rows = Array.from(rowsWrap.children);
  const reels = Array.from(document.querySelectorAll('.reel')).map(el => ({
    el,
    img: el.querySelector('.face-img'),
    ph: el.querySelector('.ph'),
    label: el.querySelector('.ph-label')
  }));

  const pad = n => String(n).padStart(2, '0');
  const rnd = n => Math.floor(Math.random() * n);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Images (optional)
  const imgPath = (r, i) => REELS[r][i].img || `${CONFIG.imgDir}/r${r + 1}-${pad(i + 1)}.${CONFIG.imgExt}`;
  const imgOk = new Set();
  const keep = [];

  function preloadImages() {
    REELS.forEach((items, r) => items.forEach((_, i) => {
      const im = new Image();
      im.decoding = 'async';
      im.onload = () => imgOk.add(r * PER_REEL + i);
      im.src = imgPath(r, i);
      keep.push(im);
    }));
  }
  if (CONFIG.useImages) {
    const start = () => ('requestIdleCallback' in window ? requestIdleCallback(preloadImages) : setTimeout(preloadImages, 300));
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });
  }

  function setFace(r, i) {
    const reel = reels[r];
    if (i === null) {
      reel.img.hidden = true; reel.ph.hidden = false; reel.label.textContent = '?';
      return;
    }
    if (CONFIG.useImages && imgOk.has(r * PER_REEL + i)) {
      reel.img.src = imgPath(r, i);
      reel.img.alt = REELS[r][i].title;
      reel.img.hidden = false; reel.ph.hidden = true;
    } else {
      reel.img.hidden = true; reel.ph.hidden = false;
      reel.label.textContent = `PHOTO ${r + 1}-${pad(i + 1)}`;
    }
  }
  [0, 1, 2].forEach(r => setFace(r, null));

  // State
  const found = new Set();
  let rolling = false;
  let coinIn = false;
  let marqueeTimer = 0;

  const setStatus = s => { statusEl.textContent = s; };
  const renderCounter = () => { counterEl.textContent = `${pad(found.size)} / ${TOTAL}`; };

  function setRow(r, item) {
    const row = rows[r];
    row.classList.toggle('rare', !!(item && item.rare));
    row.querySelector('h2').textContent = item ? item.title : '...';
    row.querySelector('p').textContent = item ? item.message : '';
  }

  function spin(r, duration, finalIdx) {
    return new Promise(resolve => {
      const reel = reels[r];
      reel.el.classList.remove('hit');
      reel.el.classList.add('spinning');
      const end = performance.now() + duration;
      let last = -1;
      (function tick() {
        if (performance.now() < end) {
          let i; do { i = rnd(PER_REEL); } while (i === last);
          last = i;
          setFace(r, i);
          setTimeout(tick, CONFIG.tickMs);
        } else {
          setFace(r, finalIdx);
          reel.el.classList.remove('spinning');
          resolve();
        }
      })();
    });
  }

  // Coin raises the chance of landing on a rare item
  const pickIdx = (r, boost) => {
    if (boost && Math.random() < CONFIG.coinRare) {
      const pool = rareIdx[r];
      return pool[rnd(pool.length)];
    }
    return rnd(PER_REEL);
  };

  function reveal(r, idx) {
    const item = REELS[r][idx];
    setRow(r, item);
    if (item.rare) { reels[r].el.classList.add('hit'); stars[r].classList.add('on'); }
    found.add(r * PER_REEL + idx);
    renderCounter();
    const rc = reels[r].el.getBoundingClientRect();
    sparkBurst(rc.left + rc.width / 2, rc.top + rc.height / 2, 10);
  }

  function setMarquee(text, ms) {
    clearTimeout(marqueeTimer);
    marqueeMain.textContent = text;
    if (ms) marqueeTimer = setTimeout(() => { marqueeMain.textContent = '27 LUCKY MEMORIES'; }, ms);
  }

  // Coin
  coinBtn.addEventListener('click', () => {
    if (rolling || coinIn) return;
    coinIn = true;
    coinEl.classList.add('on');
    coinLabel.textContent = 'COIN IN';
    setStatus('COIN IN');
  });

  // Roll
  async function roll() {
    if (rolling) return;
    rolling = true;
    rollBtn.disabled = true;

    const boost = coinIn;
    if (boost) {
      coinIn = false;
      coinEl.classList.remove('on');
      coinLabel.textContent = 'INSERT COIN';
    }

    cabinet.classList.remove('jackpot');
    stars.forEach(s => s.classList.remove('on'));
    setMarquee('27 LUCKY MEMORIES');
    hint.hidden = true; rowsWrap.hidden = false;
    rows.forEach(row => { row.classList.remove('rare'); row.querySelector('h2').textContent = '...'; row.querySelector('p').textContent = ''; });
    setStatus(boost ? 'COIN ROLL' : 'ROLLING');

    const finals = [0, 1, 2].map(r => pickIdx(r, boost));
    await Promise.all(finals.map((f, r) => spin(r, CONFIG.spinMs[r], f).then(() => reveal(r, f))));

    const jackpot = finals.every((f, r) => REELS[r][f].rare);
    if (jackpot) {
      cabinet.classList.add('jackpot');
      setMarquee('JACKPOT!!', 3200);
      setStatus('JACKPOT');
      setTimeout(() => cabinet.classList.remove('jackpot'), 3200);
      coinRain();
    } else if (found.size === TOTAL) {
      setMarquee('ALL CLEAR!', 3200);
      setStatus('ALL CLEAR');
      coinRain();
    } else {
      setStatus('RESULT');
    }
    rolling = false;
    rollBtn.disabled = false;
  }
  rollBtn.addEventListener('click', roll);

  // Tap sparkle (anywhere except ROLL)
  const COLORS = ['#29e0ff', '#ff3ea5', '#ffd34d', '#ffffff', '#8b5cff'];
  const MAX_LIVE = 90;
  let live = 0;

  function sparkBurst(x, y, n = 8) {
    if (reduceMotion || live > MAX_LIVE) return;
    const frag = document.createDocumentFragment();

    const pulse = document.createElement('i');
    pulse.className = 'pulse';
    pulse.style.left = x + 'px'; pulse.style.top = y + 'px';
    pulse.addEventListener('animationend', () => pulse.remove(), { once: true });
    frag.appendChild(pulse);

    for (let k = 0; k < n; k++) {
      const s = document.createElement('i');
      s.className = k % 3 === 0 ? 'spark plus' : 'spark';
      const a = Math.random() * Math.PI * 2, d = 26 + Math.random() * 46;
      s.style.cssText = `left:${x}px;top:${y}px;--dx:${(Math.cos(a) * d).toFixed(1)}px;--dy:${(Math.sin(a) * d).toFixed(1)}px;--c:${COLORS[rnd(COLORS.length)]}`;
      live++;
      s.addEventListener('animationend', () => { s.remove(); live--; }, { once: true });
      frag.appendChild(s);
    }
    document.body.appendChild(frag);
  }

  document.addEventListener('pointerdown', e => {
    const b = rollBtn.getBoundingClientRect();
    if (e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom) return;
    sparkBurst(e.clientX, e.clientY, 8);
  }, { passive: true });

  // Coin rain (canvas made on demand, removed after)
  let rainOn = false;
  function coinRain() {
    if (rainOn || reduceMotion) return;
    rainOn = true;
    const cv = document.createElement('canvas');
    cv.className = 'fx';
    cv.width = innerWidth; cv.height = innerHeight;
    document.body.appendChild(cv);
    const ctx = cv.getContext('2d');
    const palette = ['#ffd34d', '#fff3b8', '#ffd34d', '#ff3ea5', '#29e0ff'];
    const coins = Array.from({ length: innerWidth < 600 ? 50 : 90 }, () => ({
      x: Math.random() * cv.width,
      y: -20 - Math.random() * cv.height * 0.7,
      vy: 2 + Math.random() * 3,
      r: 5 + Math.random() * 5,
      ph: Math.random() * 6.28,
      vs: 0.1 + Math.random() * 0.15,
      c: palette[rnd(palette.length)]
    }));
    let frames = 0;
    (function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const c of coins) {
        c.y += c.vy; c.ph += c.vs;
        ctx.fillStyle = c.c;
        ctx.beginPath();
        ctx.ellipse(c.x, c.y, Math.abs(Math.cos(c.ph)) * c.r + 1, c.r, 0, 0, 6.283);
        ctx.fill();
      }
      if (++frames < 240) requestAnimationFrame(draw);
      else { cv.remove(); rainOn = false; }
    })();
  }

  // Easter egg: 5 quick taps on the marquee title
  let taps = 0, tapTimer = 0;
  marqueeMain.addEventListener('click', () => {
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => { taps = 0; }, 1500);
    if (++taps >= 5) {
      taps = 0;
      const r = marqueeMain.getBoundingClientRect();
      sparkBurst(r.left + r.width / 2, r.top + r.height / 2, 28);
    }
  });

  renderCounter();
})();
