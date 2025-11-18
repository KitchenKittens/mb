// ./JS/messages26.js
document.addEventListener('DOMContentLoaded', () => {
  const basePath = 'IMG26';
  const counter = document.getElementById('counter');
  const sections = Array.from(document.querySelectorAll('.bubble-section'));

  const messages = [
    { title:"All our sunsets", meta:"場所・日付 A", text:"あなたと初めて会った日のこと。", img:`${basePath}/photo_A.jpg` },
    { title:"Beach dates Bikini days", meta:"場所・日付 B", text:"一緒に行った旅行の思い出。", img:`${basePath}/photo_B.jpg` },
    { title:"Cats. And maybe dogs?", meta:"場所・日付 C", text:"雨の中のささやかな優しさ。", img:`${basePath}/photo_C.jpg` },
    { title:"Dancing as sharks...", meta:"場所・日付 D", text:"おかしくて仕方なかった夜の思い出。", img:`${basePath}/photo_D.jpg` },
    { title:"Every quite moments", meta:"場所・日付 E", text:"忘れられない手料理。", img:`${basePath}/photo_E.jpg` },
    { title:"First I love you", meta:"場所・日付 F", text:"感想を語り合った映画デート。", img:`${basePath}/photo_F.jpg` },
    { title:"Giggles and Kisses", meta:"場所・日付 G", text:"ちょっとした驚きを喜んでくれた。", img:`${basePath}/photo_G.jpg` },
    { title:"Holding hands", meta:"場所・日付 H", text:"夕方の散歩のぬくもり。", img:`${basePath}/photo_H.jpg` },
    { title:"Inside jokes", meta:"場所・日付 I", text:"特別な日の振り返り。", img:`${basePath}/photo_I.jpg` },
    { title:"Journeying together", meta:"場所・日付 J", text:"澄んだ空を見た日。", img:`${basePath}/photo_J.jpg` },
    { title:"Keeping you close", meta:"場所・日付 K", text:"君のために準備した時間。", img:`${basePath}/photo_K.jpg` },
    { title:"Laughing nonstop", meta:"場所・日付 L", text:"共同作業の楽しさ。", img:`${basePath}/photo_L.jpg` },
    { title:"Morning coffees", meta:"場所・日付 M", text:"笑顔が止まらなかった。", img:`${basePath}/photo_M.jpg` },
    { title:"Notes you left me", meta:"場所・日付 N", text:"感謝の気持ち。", img:`${basePath}/photo_N.jpg` },
    { title:"Our Europe trip!", meta:"場所・日付 O", text:"穏やかな朝のコーヒー。", img:`${basePath}/photo_O.jpg` },
    { title:"Picnic adventures", meta:"場所・日付 P", text:"二人のプレイリスト。", img:`${basePath}/photo_P.jpg` },
    { title:"Quiet train rides", meta:"場所・日付 Q", text:"心を込めた贈り物。", img:`${basePath}/photo_Q.jpg` },
    { title:"Road trips by the sea", meta:"場所・日付 R", text:"灯りのきれいな場所。", img:`${basePath}/photo_R.jpg` },
    { title:"Sweet surprises", meta:"場所・日付 S", text:"これからのこと。", img:`${basePath}/photo_S.jpg` },
    { title:"Tiny moments, Big love", meta:"場所・日付 T", text:"幸せになった料理。", img:`${basePath}/photo_T.jpg` },
    { title:"Under the stars", meta:"場所・日付 U", text:"雨音と過ごしたカフェ。", img:`${basePath}/photo_U.jpg` },
    { title:"Vacation bliss", meta:"場所・日付 V", text:"心温まる手紙。", img:`${basePath}/photo_V.jpg` },
    { title:"Witches and Wizards!", meta:"場所・日付 W", text:"語り合った夢。", img:`${basePath}/photo_W.jpg` },
    { title:"XOXO...always", meta:"場所・日付 X", text:"何もしない贅沢。", img:`${basePath}/photo_X.jpg` },
    { title:"Your smiles♡", meta:"場所・日付 Y", text:"星空や雲を眺めた。", img:`${basePath}/photo_Y.jpg` },
    { title:"Zero doubts", meta:"場所・日付 Z", text:"26歳の誕生日おめでとう。", img:`${basePath}/photo_Z.jpg` }
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