/* TRANSITION PHASE — cursor-following cinematic image reveal.
   Visual-only: does not access study data, app state or LocalStorage. */
(()=> {
  const hosts=[...document.querySelectorAll('.tp-spotlight-host')];
  if(!hosts.length) return;
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const coarse=window.matchMedia?.('(hover: none), (pointer: coarse)').matches;
  if(reduced||coarse) return;

  const radius=260, easing=.1;
  const points=hosts.map(el=>({
    el, raw:{x:-1000,y:-1000}, smooth:{x:-1000,y:-1000}, active:false
  }));
  let raf=0;

  function animate(){
    let needsAnotherFrame=false;
    for(const point of points){
      if(!point.active) continue;
      const rect=point.el.getBoundingClientRect();
      const targetX=point.raw.x-rect.left;
      const targetY=point.raw.y-rect.top;
      point.smooth.x+=(targetX-point.smooth.x)*easing;
      point.smooth.y+=(targetY-point.smooth.y)*easing;
      point.el.style.setProperty('--tp-spot-x',point.smooth.x+'px');
      point.el.style.setProperty('--tp-spot-y',point.smooth.y+'px');
      point.el.style.setProperty('--tp-spot-size',radius+'px');
      if(Math.abs(targetX-point.smooth.x)>.35||Math.abs(targetY-point.smooth.y)>.35) needsAnotherFrame=true;
    }
    if(needsAnotherFrame) raf=requestAnimationFrame(animate);
    else raf=0;
  }
  function requestPaint(){if(!raf) raf=requestAnimationFrame(animate)}

  for(const point of points){
    point.el.addEventListener('pointerenter',event=>{
      if(event.pointerType==='touch') return;
      const rect=point.el.getBoundingClientRect();
      point.active=true;
      point.raw={x:event.clientX,y:event.clientY};
      point.smooth={x:event.clientX-rect.left,y:event.clientY-rect.top};
      requestPaint();
    },{passive:true});
    point.el.addEventListener('pointermove',event=>{
      if(event.pointerType==='touch') return;
      point.active=true;
      point.raw={x:event.clientX,y:event.clientY};
      requestPaint();
    },{passive:true});
    point.el.addEventListener('pointerleave',()=>{
      point.active=false;
      point.el.style.setProperty('--tp-spot-x','-1000px');
      point.el.style.setProperty('--tp-spot-y','-1000px');
    },{passive:true});
  }
  window.addEventListener('pagehide',()=>{if(raf) cancelAnimationFrame(raf)},{once:true});
})();
