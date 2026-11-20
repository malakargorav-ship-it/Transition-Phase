/* TRANSITION PHASE — cursor-following image reveal
   Pointer-only visual layer. No study state or LocalStorage is touched. */
(()=> {
  const hosts=[...document.querySelectorAll('.tp-spotlight-host')];
  if(!hosts.length) return;
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=window.matchMedia&&window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if(reduced||coarse) return;

  const radius=260;
  const ease=.1;
  const points=hosts.map(el=>({el,raw:{x:-999,y:-999},smooth:{x:-999,y:-999},active:false}));
  let raf=0;

  function paint(){
    let moving=false;
    points.forEach(point=>{
      if(!point.active) return;
      const rect=point.el.getBoundingClientRect();
      const targetX=point.raw.x-rect.left;
      const targetY=point.raw.y-rect.top;
      point.smooth.x+=(targetX-point.smooth.x)*ease;
      point.smooth.y+=(targetY-point.smooth.y)*ease;
      point.el.style.setProperty('--tp-spot-x',point.smooth.x+'px');
      point.el.style.setProperty('--tp-spot-y',point.smooth.y+'px');
      point.el.style.setProperty('--tp-spot-size',radius+'px');
      if(Math.abs(targetX-point.smooth.x)>.5||Math.abs(targetY-point.smooth.y)>.5) moving=true;
    });
    if(moving) raf=requestAnimationFrame(paint);
    else raf=0;
  }
  function schedule(){
    if(!raf) raf=requestAnimationFrame(paint);
  }

  points.forEach(point=>{
    point.el.addEventListener('pointerenter',event=>{
      if(event.pointerType==='touch') return;
      point.active=true;
      point.raw.x=event.clientX;
      point.raw.y=event.clientY;
      point.smooth.x=event.clientX-point.el.getBoundingClientRect().left;
      point.smooth.y=event.clientY-point.el.getBoundingClientRect().top;
      schedule();
    },{passive:true});
    point.el.addEventListener('pointermove',event=>{
      if(event.pointerType==='touch') return;
      point.active=true;
      point.raw.x=event.clientX;
      point.raw.y=event.clientY;
      schedule();
    },{passive:true});
    point.el.addEventListener('pointerleave',()=>{
      point.active=false;
      point.el.style.setProperty('--tp-spot-x','-999px');
      point.el.style.setProperty('--tp-spot-y','-999px');
    },{passive:true});
  });
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('pagehide',()=>{
    if(raf) cancelAnimationFrame(raf);
  },{once:true});
})();
