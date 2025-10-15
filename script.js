const sparkleBtn = document.getElementById('sparkleBtn');
const themeToggle = document.getElementById('themeToggle');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Glittereffekt
function createSparkles(x, y, count = 24){
  for(let i=0;i<count;i++){
    const s=document.createElement('div');
    s.className='sparkle';
    document.body.appendChild(s);
    const size=Math.random()*8+6;
    s.style.width=s.style.height=size+'px';
    s.style.left=x+'px';
    s.style.top=y+'px';
    const vx=(Math.random()-0.5)*250;
    const vy=-Math.random()*300-60;
    s.animate([
      {transform:'translate(0,0) scale(1)',opacity:1},
      {transform:`translate(${vx}px,${vy}px) scale(.2)`,opacity:0}
    ],{duration:1200+Math.random()*600,easing:'ease-out'}).onfinish=()=>s.remove();
  }
}

sparkleBtn.addEventListener('click', e=>{
  const rect=e.target.getBoundingClientRect();
  createSparkles(rect.left+rect.width/2,rect.top);
});

themeToggle.addEventListener('click',()=>{
  const root=document.documentElement;
  const dark=root.getAttribute('data-theme')==='dark';
  root.setAttribute('data-theme',dark?'':'dark');
  themeToggle.textContent=dark?'🌙':'☀️';
});

document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('click',()=>{
    const title=card.dataset.title;
    modalTitle.textContent=title;
    modalBody.textContent='Detta är '+title+'. Mer magi kommer snart!';
    modal.setAttribute('aria-hidden','false');
  });
});

modalClose.addEventListener('click',()=>modal.setAttribute('aria-hidden','true'));
modal.addEventListener('click',e=>{if(e.target===modal)modal.setAttribute('aria-hidden','true');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.setAttribute('aria-hidden','true');});

const sparkleStyle=document.createElement('style');
sparkleStyle.textContent=`
.sparkle{
  position:fixed;border-radius:999px;pointer-events:none;z-index:9999;
  background:linear-gradient(90deg,rgba(255,154,214,1),rgba(136,212,255,1));
  box-shadow:0 4px 14px rgba(0,0,0,.18);
}`;
document.head.appendChild(sparkleStyle);
