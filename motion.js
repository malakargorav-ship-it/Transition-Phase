/* TRANSITION PHASE — shared motion controller
   Visual-only enhancement. Does not read, write or rename LocalStorage keys. */
(()=> {
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced) return;

  const selectors=[
    '.hero-art','.metric','.stat-card','.command-hero','.command-section',
    '.sprint-card','.day-cell','.adaptive-panel','.practice-launch',
    '.history-row','.revision-row','.subject-hero','.topic-card',
    '.lesson-head','.lesson-section','.concept-card','.example-card',
    '.question-card','.syllabus-hero','.syllabus-summary',
    '.syllabus-section','.subtopic-row'
  ].join(',');

  let observer=null;
  if('IntersectionObserver' in window){
    observer=new IntersectionObserver((entries,io)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:'0px 0px -4% 0px'});
  }

  function collect(root,selector){
    const found=[];
    if(root.nodeType===1&&root.matches(selector)) found.push(root);
    if(root.querySelectorAll) found.push(...root.querySelectorAll(selector));
    return found;
  }

  function initMotion(root=document){
    collect(root,selectors).forEach((el,index)=>{
      if(el.dataset.tpMotionReady||el.classList.contains('reveal')) return;
      el.dataset.tpMotionReady='true';
      el.classList.add('tp-motion-in');
      el.style.setProperty('--tp-motion-delay',Math.min(index%5,4)*65+'ms');
      if(observer) observer.observe(el);
      else el.classList.add('is-in');
    });
  }

  function initProgress(root=document){
    collect(root,'.progress-track>i,.summary-bar>i').forEach(el=>{
      if(el.dataset.tpProgressReady) return;
      el.dataset.tpProgressReady='true';
      const target=el.style.width;
      if(!target||target==='0%'||target==='0px') return;
      el.style.transition='none';
      el.style.width='0';
      void el.offsetWidth;
      el.style.removeProperty('transition');
      el.style.width=target;
    });
  }

  initMotion();
  initProgress();

  if('MutationObserver' in window){
    const changes=new MutationObserver(records=>{
      records.forEach(record=>{
        record.addedNodes.forEach(node=>{
          if(node.nodeType===1){
            initMotion(node);
            initProgress(node);
          }
        });
      });
    });
    changes.observe(document.body,{childList:true,subtree:true});
  }
})();
