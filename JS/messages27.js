// Arcade cabinet: 3 reels x 9 memories
(() => {
  "use strict";

  /* ---------- Settings ---------- */
  const CONFIG = {
    useImages: true,         // missing photos fall back to placeholders
    imgDir: "IMG27",
    imgExt: "jpg",
    spinMs: [1000, 1500, 2000],
    tickMs: 70,
    coinRare: 0.6            // rare chance per reel when a coin is in
  };
  const PER_REEL = 9;
  const TOTAL = PER_REEL * 3;

  /* ---------- Memories----------
     m = message, t = title, img = file, rare = true/false (optional)
     Exactly 3 rare per reel. */
  const MEMORIES = [
    // Reel 1
    { m: "何歳になっても「おめでとう」を伝えたい！", t: "思い出その1", img: "IMG27/IMG_1-1.png", rare: true},
    { m: "Let's make this year sparkle a little more than the last.", t: "思い出 その2", img: "IMG27/IMG_1-2.png"},
    { m: "27 years of you, and I'm still counting my lucky stars!", t: "思い出 その3", img: "IMG27/IMG_1-3.png"},
    { m: "都内の夜も意外と悪くないよね。色んなところでデートしようよ。", t: "思い出 その4", img: "IMG27/IMG_1-4.png" },
    { m: "Life is better with you in it, I'm not gonna lie. Next stop: anywhere with you.;)", t: "思い出 その5", img: "IMG27/IMG_1-5.png", rare: true},
    { m: "Even the mirror is jealous of how close we are hehehe.", t: "思い出 その6", img: "IMG27/IMG_1-6.png", rare: true },
    { m: "去年の冬も、今年の冬も、来年の冬も一緒に過ごそう。お互い暖かくね！", t: "思い出 その7", img: "IMG27/IMG_1-7.png" },
    { m: "I bet the snow looks a lot better with two sets of footprints, don't you think?", t: "思い出 その8", img: "IMG27/IMG_1-8.png" },
    { m: "東京タワーの足元で運動も。動き回れる日々たのし。", t: "思い出 その9", img: "IMG27/IMG_1-9.png"},

    // Reel 2
    { m: "The snow melted in your hand, but the warmth didn’t. TBT Io-House.", t: "思い出 その10", img: "IMG27/IMG_2-1.png", rare: true},
    { m: "みんなで映るのもいとおかし。これからもたくさん撮りましょう。", t: "思い出 その11", img: "IMG27/IMG_2-2.png" },
    { m: "黄色い花畑に、黄色い貴女の姿あり。お花畑が似合いますね！", t: "思い出 その12", img: "IMG27/IMG_2-3.png", rare: true },
    { m: "Traffic mirror selfies, our faces in the cities, all so blurry, ain't so lovely?", t: "思い出 その13", img: "IMG27/IMG_2-4.png" },
    { m: "ひょっとこカラオケ、これからも沢山歌い踊ろう！美声を聞かせておくれ。", t: "思い出 その14", img: "IMG27/IMG_2-5.png" },
    { m: "You were the ticket for my neon night, with my favourite outfit.", t: "思い出 その15", img: "IMG27/IMG_2-6.png"},
    { m: "何気ないお散歩も良きかな。貴女といると回り道したくなるけどね。", t: "思い出 その16", img: "IMG27/IMG_2-7.png"},
    { m: "The mountains are huge, but so is my love to you ♡. Perhaps bigger?!", t: "思い出 その17", img: "IMG27/IMG_2-8.png", rare: true },
    { m: "他撮りでも満面の笑顔ができるようなカップルに...私はなりたい。", t: "思い出 その18", img: "IMG27/IMG_2-9.png"},

    // Reel 3
    { m: "Cheers to a night out, and an even bigger cheers to you.", t: "思い出 その19", img: "IMG27/IMG_3-1.png" },
    { m: "Two people, one color, same smiles. That's called a great compatability.", t: "思い出 その20", img: "IMG27/IMG_3-2.png", rare: true},
    { m: "出張の思い出も二人の思い出として塗り替えます。これからも出張先へ連れて行ってネ。", t: "思い出 その21", img: "IMG27/IMG_3-3.png"},
    { m: "Rain or shine, you’re my favorite flower in the garden. Although those hydrangeas look pretty neat.", t: "思い出 その22", img: "IMG27/IMG_3-4.png" },
    { m: "Two paddles, one river, one direction: just like us!", t: "思い出 その23", img: "IMG27/IMG_3-5.png", rare: true},
    { m: "透けた舟で見えるのは、魚と山と貴女の笑顔。", t: "思い出 その24", img: "IMG27/IMG_3-6.png"},
    { m: "I might forget the blue skies and white clouds. But you'll always have a place in me.", t: "思い出 その25", img: "IMG27/IMG_3-7.png", rare: true},
    { m: "急な坂道も肩を寄せれば緩やかになる...かもね？", t: "思い出 その26", img: "IMG27/IMG_3-8.png" },
    { m: "道後の湯より、あなたの隣で温まる方が長持ちする。", t: "思い出 その27", img: "IMG27/IMG_3-9.png" }
  ];

  // REELS[r][i] = { title, message, rare, img }
  const REELS = [0, 1, 2].map(r =>
    MEMORIES.slice(r * PER_REEL, (r + 1) * PER_REEL).map((it, k) => ({
      title: it.t || `思い出 ${r + 1}-${k + 1}`,
      message: it.m,
      img: it.img,
      rare: !!it.rare
    }))
  );
  // Indexes of rare items per reel, used by the coin boost
  const RARE = REELS.map(items => items.flatMap((it, i) => (it.rare ? [i] : [])));

  /* ---------- Elements ---------- */
  const $ = id => document.getElementById(id);
  const cabinet = $("cabinet");
  const marquee = $("marqueeMain");
  const counter = $("counter");
  const statusEl = $("status");
  const rollBtn = $("rollBtn");
  const coin = { box: $("coin"), btn: $("coinBtn"), label: $("coinLabel") };
  const lcd = { hint: $("lcdHint"), rows: $("lcdRows") };
  const starEls = document.querySelectorAll("#stars .star");
  const rowEls = [...lcd.rows.children];
  const reelEls = [...document.querySelectorAll(".reel")].map(node => ({
    node,
    img: node.querySelector(".face-img"),
    ph: node.querySelector(".ph"),
    label: node.querySelector(".ph-label")
  }));

  /* ---------- Helpers ---------- */
  const pad = n => String(n).padStart(2, "0");
  const rnd = n => Math.floor(Math.random() * n);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Images ---------- */
  const imgSrc = (r, i) => REELS[r][i].img || `${CONFIG.imgDir}/r${r + 1}-${pad(i + 1)}.${CONFIG.imgExt}`;
  const loaded = new Set();   // indexes that loaded successfully
  const cache = [];           // keeps Image objects alive

  function preloadImages() {
    REELS.forEach((items, r) => items.forEach((_, i) => {
      const im = new Image();
      im.onload = () => loaded.add(r * PER_REEL + i);
      im.src = imgSrc(r, i);
      cache.push(im);
    }));
  }
  if (CONFIG.useImages) {
    const start = () => ("requestIdleCallback" in window ? requestIdleCallback(preloadImages) : setTimeout(preloadImages, 300));
    if (document.readyState === "complete") start();
    else addEventListener("load", start, { once: true });
  }

  /* ---------- Reel display ---------- */
  // i = null shows the "?" placeholder
  function showFace(r, i) {
    const reel = reelEls[r];
    const usePhoto = i !== null && CONFIG.useImages && loaded.has(r * PER_REEL + i);
    if (usePhoto) {
      reel.img.src = imgSrc(r, i);
      reel.img.alt = REELS[r][i].title;
    }
    reel.img.hidden = !usePhoto;
    reel.ph.hidden = usePhoto;
    if (!usePhoto) reel.label.textContent = i === null ? "☆" : `PHOTO ${r + 1}-${pad(i + 1)}`;
  }
  [0, 1, 2].forEach(r => showFace(r, null));

  function setRow(r, item) {
    const row = rowEls[r];
    row.classList.toggle("rare", !!(item && item.rare));
    row.querySelector("h2").textContent = item ? item.title : "...";
    row.querySelector("p").textContent = item ? item.message : "";
  }

  /* ---------- Game state ---------- */
  const state = { found: new Set(), rolling: false, coinIn: false, marqueeTimer: 0 };

  const setStatus = text => { statusEl.textContent = text; };
  const renderCounter = () => { counter.textContent = `${pad(state.found.size)} / ${TOTAL}`; };

  function setMarquee(text, ms) {
    clearTimeout(state.marqueeTimer);
    marquee.textContent = text;
    if (ms) state.marqueeTimer = setTimeout(() => { marquee.textContent = "27 LUCKY MEMORIES"; }, ms);
  }

  // Spin one reel, then settle on finalIdx
  function spin(r, duration, finalIdx) {
    return new Promise(resolve => {
      const reel = reelEls[r];
      reel.node.classList.remove("hit");
      reel.node.classList.add("spinning");
      const end = performance.now() + duration;
      let last = -1;
      (function tick() {
        if (performance.now() < end) {
          let i;
          do { i = rnd(PER_REEL); } while (i === last);
          last = i;
          showFace(r, i);
          setTimeout(tick, CONFIG.tickMs);
        } else {
          showFace(r, finalIdx);
          reel.node.classList.remove("spinning");
          resolve();
        }
      })();
    });
  }

  // With a coin, pick a rare item more often
  function pickIdx(r, boost) {
    if (boost && Math.random() < CONFIG.coinRare) {
      const pool = RARE[r];
      return pool[rnd(pool.length)];
    }
    return rnd(PER_REEL);
  }

  function reveal(r, idx) {
    const item = REELS[r][idx];
    setRow(r, item);
    if (item.rare) {
      reelEls[r].node.classList.add("hit");
      starEls[r].classList.add("on");
    }
    state.found.add(r * PER_REEL + idx);
    renderCounter();
    const box = reelEls[r].node.getBoundingClientRect();
    sparkBurst(box.left + box.width / 2, box.top + box.height / 2, 10);
  }

  /* ---------- Coin ---------- */
  coin.btn.addEventListener("click", () => {
    if (state.rolling || state.coinIn) return;
    state.coinIn = true;
    coin.box.classList.add("on");
    coin.label.textContent = "COIN IN";
    setStatus("COIN IN");
  });

  /* ---------- Roll ---------- */
  async function roll() {
    if (state.rolling) return;
    state.rolling = true;
    rollBtn.disabled = true;

    const boost = state.coinIn;
    if (boost) {
      state.coinIn = false;
      coin.box.classList.remove("on");
      coin.label.textContent = "INSERT COIN";
    }

    cabinet.classList.remove("jackpot");
    starEls.forEach(s => s.classList.remove("on"));
    setMarquee("27 LUCKY MEMORIES");
    lcd.hint.hidden = true;
    lcd.rows.hidden = false;
    rowEls.forEach((_, r) => setRow(r, null));
    setStatus(boost ? "COIN ROLL" : "ROLLING");

    const finals = [0, 1, 2].map(r => pickIdx(r, boost));
    await Promise.all(finals.map((f, r) => spin(r, CONFIG.spinMs[r], f).then(() => reveal(r, f))));

    const jackpot = finals.every((f, r) => REELS[r][f].rare);
    if (jackpot) {
      cabinet.classList.add("jackpot");
      setMarquee("JACKPOT!!", 3200);
      setStatus("JACKPOT");
      setTimeout(() => cabinet.classList.remove("jackpot"), 3200);
      coinRain();
    } else if (state.found.size === TOTAL) {
      setMarquee("ALL CLEAR!", 3200);
      setStatus("ALL CLEAR");
      coinRain();
    } else {
      setStatus("RESULT");
    }

    state.rolling = false;
    rollBtn.disabled = false;
  }
  rollBtn.addEventListener("click", roll);

  /* ---------- Effects ---------- */
  const COLORS = ["#29e0ff", "#ff3ea5", "#ffd34d", "#ffffff", "#8b5cff"];
  const MAX_LIVE = 90;
  let live = 0;

  // Sparkle burst at (x, y)
  function sparkBurst(x, y, n = 8) {
    if (reduceMotion || live > MAX_LIVE) return;
    const frag = document.createDocumentFragment();

    const pulse = document.createElement("i");
    pulse.className = "pulse";
    pulse.style.left = x + "px";
    pulse.style.top = y + "px";
    pulse.addEventListener("animationend", () => pulse.remove(), { once: true });
    frag.appendChild(pulse);

    for (let k = 0; k < n; k++) {
      const s = document.createElement("i");
      s.className = k % 3 === 0 ? "spark plus" : "spark";
      const a = Math.random() * Math.PI * 2;
      const d = 26 + Math.random() * 46;
      s.style.cssText = `left:${x}px;top:${y}px;--dx:${(Math.cos(a) * d).toFixed(1)}px;--dy:${(Math.sin(a) * d).toFixed(1)}px;--c:${COLORS[rnd(COLORS.length)]}`;
      live++;
      s.addEventListener("animationend", () => { s.remove(); live--; }, { once: true });
      frag.appendChild(s);
    }
    document.body.appendChild(frag);
  }

  // Tap anywhere except ROLL
  document.addEventListener("pointerdown", e => {
    const b = rollBtn.getBoundingClientRect();
    const onRoll = e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom;
    if (!onRoll) sparkBurst(e.clientX, e.clientY, 8);
  }, { passive: true });

  // Coin rain, canvas is created for the animation and removed after
  let raining = false;
  function coinRain() {
    if (raining || reduceMotion) return;
    raining = true;
    const cv = document.createElement("canvas");
    cv.className = "fx";
    cv.width = innerWidth;
    cv.height = innerHeight;
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d");
    const palette = ["#ffd34d", "#fff3b8", "#ffd34d", "#ff3ea5", "#29e0ff"];
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
        c.y += c.vy;
        c.ph += c.vs;
        ctx.fillStyle = c.c;
        ctx.beginPath();
        ctx.ellipse(c.x, c.y, Math.abs(Math.cos(c.ph)) * c.r + 1, c.r, 0, 0, 6.283);
        ctx.fill();
      }
      if (++frames < 240) requestAnimationFrame(draw);
      else { cv.remove(); raining = false; }
    })();
  }

  // Easter egg: 3 quick taps on the marquee title
  let taps = 0, tapTimer = 0;
  marquee.addEventListener("click", () => {
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => { taps = 0; }, 1500);
    if (++taps >= 3) {
      taps = 0;
      sparkBurst(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 100);
    }
  });

  renderCounter();
})();
