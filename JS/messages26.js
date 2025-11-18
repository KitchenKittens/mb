// ./JS/messages26.js
document.addEventListener('DOMContentLoaded', () => {
  const basePath = 'IMG26';
  const counter = document.getElementById('counter');
  const sections = Array.from(document.querySelectorAll('.bubble-section'));

  const messages = [
    { title:"All our sunsets", meta:"サントリーニ・2022/5/17", text:"あなたと行った素敵な場所のこと。", img:`${basePath}/photo_A.jpg` },
    { title:"Beach dates, bikini days", meta:"相模ビーチ・2024/8/3", text:"一緒に行った夏の思い出。", img:`${basePath}/photo_B.jpg` },
    { title:"Cats. And maybe dogs?", meta:"川越・2024/10/26", text:"ぬことの出会い。犬もね。", img:`${basePath}/photo_C.jpg` },
    { title:"Dancing as sharks...", meta:"早稲田・2023/12/5", text:"瑞穂ちゃんのかわいさを実感した日。", img:`${basePath}/photo_D.jpg` },
    { title:"Every quite moments", meta:"北浦和・2023/10/30", text:"ぬいちゃんずのゆめ。", img:`${basePath}/photo_E.jpg` },
    { title:"First I love you", meta:"レスター・2022/2/13", text:"初めてのバレンタイン。", img:`${basePath}/photo_F.jpg` },
    { title:"Giggles and Kisses", meta:"日光・2023/9/30", text:"見ざる言わざる聞かざる。", img:`${basePath}/photo_G.jpg` },
    { title:"Holding hands", meta:"京都・2022/7/13", text:"初指輪...おそろ！", img:`${basePath}/photo_H.jpg` },
    { title:"Inside jokes", meta:"レスター・2022/1/25", text:"えりまきとかげ。", img:`${basePath}/photo_I.jpg` },
    { title:"Journeying together", meta:"ミハス・2022/6/12", text:"美味しいものいっぱい。", img:`${basePath}/photo_J.jpg` },
    { title:"Keeping you close", meta:"O2・2022/5/28", text:"貴女のために。", img:`${basePath}/photo_K.jpg` },
    { title:"Laughing nonstop", meta:"横浜・2025/7/27", text:"ふざけあい〜♪", img:`${basePath}/photo_L.jpg` },
    { title:"Morning coffees", meta:"名古屋・2023/1/23", text:"記念日旅行も。", img:`${basePath}/photo_M.jpg` },
    { title:"Notes you left me", meta:"早稲田・2023/12/24", text:"感謝の気持ち。", img:`${basePath}/photo_N.jpg` },
    { title:"Our Europe trip!", meta:"ローマ・2021/12/23", text:"やはり旅はここでないと。", img:`${basePath}/photo_O.jpg` },
    { title:"Picnic adventures", meta:"別所沼公園・2024/3/31", text:"お散歩日和。", img:`${basePath}/photo_P.jpg` },
    { title:"Quiet train rides", meta:"伊東・2025/1/12", text:"お友達と共に。", img:`${basePath}/photo_Q.jpg` },
    { title:"Road trips by the sea", meta:"沖縄・2025/11/1", text:"夏の涼しさ海の綺麗さ。", img:`${basePath}/photo_R.jpg` },
    { title:"Sweating fun", meta:"大阪万博・2025/9/24", text:"半世紀に1度！？", img:`${basePath}/photo_S.jpg` },
    { title:"Tiny moments, Big love", meta:"東京駅・2024/5/26", text:"幸せ。", img:`${basePath}/photo_T.jpg` },
    { title:"Under the stars", meta:"パリ・2022/2/26", text:"ライトアップとともに。", img:`${basePath}/photo_U.jpg` },
    { title:"Vacation bliss", meta:"サントリーニ・2022/5/18", text:"旅沢山。", img:`${basePath}/photo_V.jpg` },
    { title:"Witches and Wizards!", meta:"豊島園・2024/11/24", text:"魔法使いに俺はなる", img:`${basePath}/photo_W.jpg` },
    { title:"XOXO...always", meta:"早稲田・2025/10/31", text:"永遠の愛。", img:`${basePath}/photo_X.jpg` },
    { title:"Your smiles♡", meta:"早稲田・2025/2/9", text:"常に見てたい！。", img:`${basePath}/photo_Y.jpg` },
    { title:"Zero doubts", meta:"伊豆・2025/1/11", text:"26歳の誕生日おめでとう。", img:`${basePath}/photo_Z.jpg` }
  ];

  // バブル生成 for each section
  sections.forEach((sec) => {
    const i = Number(sec.dataset.index);
    const m = messages[i] || { title:`Title ${i+1}`, meta:"meta", text:"text", img:`${basePath}/photo${(i%26)+1}.jpg` };
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    if (i === sections.length - 1) bubble.classList.add('final');
    bubble.innerHTML = `
      <div class="pic"><img src="${m.img}" alt="${m.title}" loading="lazy"></div>
      <div class="text">
        <h3>${m.title}</h3>
        <div class="meta">${m.meta}</div>
        <div class="msg">${m.text}</div>
      </div>`;
    sec.appendChild(bubble);
  });

  const bubbles = Array.from(document.querySelectorAll('.bubble'));

  // Counter at the header
  function updateCounter(i){ const total = bubbles.length; const idx = Math.max(0, Math.min(i, total-1)); counter.textContent = `${idx+1} / ${total}`; }

  // ---- Mobile mode (IO + wobble) ----
  let io;
  const driftStates = new Map();

  function startDrift(el, ampX=14, ampY=10, speedX=0.001, speedY=0.0012){
    if (driftStates.has(el)) return;
    const start = performance.now();
    const state = { start, ampX, ampY, speedX, speedY, running:true };
    driftStates.set(el, state);

    function step(now){
      const st = driftStates.get(el);
      if (!st || !st.running) return;
      const t = now - st.start;
      const dx = Math.sin(t * st.speedX) * st.ampX;
      const dy = Math.cos(t * st.speedY) * st.ampY;
      el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function stopDrift(el){ const st = driftStates.get(el); if (st){ st.running=false; driftStates.delete(el); } el.style.transform='translate(-50%,-50%)'; }

  function enableMobileMode(){
    if (!io){
      io = new IntersectionObserver((entries)=>{
        entries.forEach(en=>{
          const idx = Number(en.target.dataset.index);
          const bubble = bubbles[idx];
          if (en.isIntersecting && en.intersectionRatio>0.55){
            if (!bubble.classList.contains('show')){
              spawnHeartNear(bubble);
              setTimeout(()=>{ bubble.classList.add('show'); startDrift(bubble); updateCounter(idx); },180);
            }else{
              bubble.classList.add('show'); startDrift(bubble); updateCounter(idx);
            }
          }else if (en.intersectionRatio<0.25){
            bubble.classList.remove('show'); stopDrift(bubble);
          }
        });
      }, { threshold:[0,0.25,0.55,0.75] });
    }
    sections.forEach(s=> io.observe(s));
  }
  function disableMobileMode(){
    if (io){ sections.forEach(s=> io.unobserve(s)); }
    bubbles.forEach(b=>{ b.classList.add('show'); stopDrift(b); b.style.transform=''; });
    updateCounter(bubbles.length-1);
  }

  // ---- Desktop subtle drift (grid) ----
  // 交互にわずかに上下させる（負荷を抑えた演出にするため）
  let desktopRAF;
  function startDesktopDrift(){
    cancelAnimationFrame(desktopRAF);
    const start = performance.now();
    function tick(now){
      const t = (now - start) / 1000;
      bubbles.forEach((b, i)=>{
        const amp = 2.5 + (i%3); // 2.5〜4.5px
        const speed = 0.6 + (i%5)*0.1;
        b.style.transform = `translateY(${Math.sin(t*speed + i)*amp}px)`;
      });
      desktopRAF = requestAnimationFrame(tick);
    }
    desktopRAF = requestAnimationFrame(tick);
  }
  function stopDesktopDrift(){
    cancelAnimationFrame(desktopRAF);
    bubbles.forEach(b=> b.style.transform='');
  }

  // ---- Mode switch ----
  const DESKTOP_QUERY = window.matchMedia('(min-width: 1024px)');
  function applyMode(){
    if (DESKTOP_QUERY.matches){
      disableMobileMode();
      startDesktopDrift();
    }else{
      stopDesktopDrift();
      enableMobileMode();
    }
  }
  DESKTOP_QUERY.addEventListener('change', applyMode);
  applyMode();

  // ---- Hearts ----
  function spawnHeartNear(bubbleEl){
    const r = bubbleEl.getBoundingClientRect();
    const x = r.left + r.width*(0.2 + Math.random()*0.6);
    const y = r.top + r.height*(0.35 + Math.random()*0.25);
    spawnHeartAt(x, y, 28 + Math.floor(Math.random()*18));
  }
  function spawnHeartAt(x,y,size){
    const el = document.createElement('div');
    el.className = 'heart'; el.textContent = '❤';
    el.style.left = `${x}px`; el.style.top = `${y}px`; el.style.fontSize = `${size}px`;
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 1100 + Math.random()*600);
  }

  // Tap interactions (mobile & desktop共通) ----
  function spawnTapRing(x,y){
    const ring = document.createElement('div');
    ring.className='tap-ring'; ring.style.left=`${x}px`; ring.style.top=`${y}px`;
    document.body.appendChild(ring);
    setTimeout(()=> ring.remove(), 1000);
  }
  function spawnSparkles(x,y,count=10){
    for(let i=0;i<count;i++){
      const sp = document.createElement('div');
      sp.className='sparkle'; sp.style.left=`${x}px`; sp.style.top=`${y}px`;
      const angle = (Math.random()*Math.PI*1.6)-(Math.PI*0.8);
      const dist = 28 + Math.random()*54;
      const dx = Math.cos(angle)*dist;
      const dy = -Math.abs(Math.sin(angle)*dist);
      sp.style.setProperty('--dx', `${dx}px`);
      sp.style.setProperty('--dy', `${dy}px`);
      document.body.appendChild(sp);
      setTimeout(()=> sp.remove(), 1050);
    }
  }

  // バブル上のタップ/クリック（両環境）
  function attachBubbleInteractions(){
    bubbles.forEach(bub=>{
      bub.style.pointerEvents='auto';
      bub.addEventListener('pointerdown', (e)=>{
        const x=e.clientX, y=e.clientY;
        spawnTapRing(x,y);
        spawnSparkles(x,y,10);
        spawnHeartAt(x,y,22 + Math.floor(Math.random()*6));
        bub.classList.add('press');
        bub.style.setProperty('--pressX', `-50%`);
        bub.style.setProperty('--pressY', `-50%`);
      });
      bub.addEventListener('pointerup', ()=> setTimeout(()=> bub.classList.remove('press'), 140));
      bub.addEventListener('pointercancel', ()=> bub.classList.remove('press'));
      bub.addEventListener('click', (e)=>{ spawnTapRing(e.clientX,e.clientY); spawnSparkles(e.clientX,e.clientY,8); });
    });
  }
  attachBubbleInteractions();

  // 画面どこでもタップ（両環境）
  window.addEventListener('pointerdown', (e)=>{
    // 何かUIを除外したい場合はここで判定可能（例: if (e.target.closest('a,button')) return;）
    spawnTapRing(e.clientX, e.clientY);
    spawnSparkles(e.clientX, e.clientY, 10);
    spawnHeartAt(e.clientX, e.clientY, 24 + Math.floor(Math.random()*10));
  });

  updateCounter(0);
});