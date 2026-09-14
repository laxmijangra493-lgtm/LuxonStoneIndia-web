(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const q = (s, r=document) => r.querySelector(s);
  const qa = (s, r=document) => [...r.querySelectorAll(s)];

  const run = () => {
    const hasAnime = typeof window.anime === 'function';
    if (prefersReduced) return;

    const loader = q('.site-loader');
    if (loader && hasAnime) {
      const tl = anime.timeline({ easing:'easeOutExpo', duration:900 });
      tl.add({targets:'.loader-line', width:'min(440px,55vw)', duration:520})
        .add({targets:'.loader-mark', opacity:[0,1], translateY:[10,0], duration:260}, '-=220')
        .add({targets:'.site-loader', opacity:0, duration:520, complete:()=>loader.remove()}, '+=180');
    } else if (loader) setTimeout(()=>loader.remove(), 650);

    if (hasAnime) {
      anime({targets:'.hero-title', opacity:[0,1], translateY:[42,0], delay:420, duration:1000, easing:'easeOutExpo'});
      anime({targets:'.hero-lede', opacity:[0,1], translateY:[20,0], delay:650, duration:700, easing:'easeOutQuart'});
      anime({targets:'.hero-actions', opacity:[0,1], translateY:[16,0], delay:760, duration:700, easing:'easeOutQuart'});
      anime({targets:'.hero-meta', opacity:[0,1], translateY:[12,0], delay:900, duration:700, easing:'easeOutQuart'});
      anime({targets:'.hero-visual img', scale:[1.1,1], delay:450, duration:1500, easing:'easeOutExpo'});
      anime({targets:'.eyebrow', opacity:[0,1], translateX:[-18,0], delay:360, duration:700, easing:'easeOutQuart'});
    }

    const revealTargets = qa('.reveal-up,.reveal-x,.reveal-x-right');
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const el = entry.target;
        if (hasAnime) {
          const isX = el.classList.contains('reveal-x');
          const isXR = el.classList.contains('reveal-x-right');
          anime({targets:el, opacity:[0,1], translateY:isX||isXR?0:[44,0], translateX:isX?[-44,0]:isXR?[44,0]:0, duration:900, easing:'easeOutExpo'});
        } else { el.style.opacity=1; el.style.transform='none'; }
        observer.unobserve(el);
      });
    },{threshold:.16, rootMargin:'0px 0px -8% 0px'});
    revealTargets.forEach(x=>observer.observe(x));

    // Material-style parallax without scroll-jacking.
    const parallax = qa('.hero-visual img,.gallery-grid figure img');
    window.addEventListener('scroll',()=>{
      const y=window.scrollY;
      parallax.forEach(img=>{
        const rect=img.getBoundingClientRect();
        if(rect.bottom>0 && rect.top<innerHeight){
          const offset=(innerHeight/2-(rect.top+rect.height/2))*0.035;
          img.style.setProperty('--py', `${offset}px`);
          if(img.closest('.hero-visual')) img.style.transform=`translate3d(0,${offset}px,0) scale(1.01)`;
        }
      });
    },{passive:true});

    // Refined cursor, desktop only.
    if (window.matchMedia('(pointer:fine)').matches) {
      const dot=q('.cursor-dot'), ring=q('.cursor-ring'); let mx=0,my=0,rx=0,ry=0;
      window.addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
      const loop=()=>{rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)}; loop();
      qa('a,button,.image-hoverable').forEach(el=>{
        el.addEventListener('mouseenter',()=>ring.classList.add('is-hover'));
        el.addEventListener('mouseleave',()=>ring.classList.remove('is-hover'));
      });
    }

    // Lightweight magnetic buttons.
    qa('.magnetic').forEach(btn=>{
      btn.addEventListener('pointermove',e=>{
        if(!window.matchMedia('(pointer:fine)').matches) return;
        const r=btn.getBoundingClientRect(), x=(e.clientX-(r.left+r.width/2))*0.08, y=(e.clientY-(r.top+r.height/2))*0.08;
        btn.style.transform=`translate3d(${x}px,${y}px,0)`;
      });
      btn.addEventListener('pointerleave',()=>btn.style.transform='translate3d(0,0,0)');
    });
  };

  const contactForm = q('.contact-form');
  contactForm?.addEventListener('submit', e=>{
    e.preventDefault();
    const data = new FormData(contactForm);
    const message = [
      'Luxon Stone India enquiry',
      `Name: ${data.get('name')||''}`,
      `Company: ${data.get('company')||''}`,
      `Project scale: ${data.get('scale')||''}`,
      `Phone: ${data.get('phone')||''}`,
      `Project note: ${data.get('message')||''}`
    ].join('\n');
    window.open('https://wa.me/919996937739?text='+encodeURIComponent(message),'_blank','noopener');
  });

  const openLightbox=fig=>{
    const lb=q('.lightbox'), img=q('.lightbox-inner img',lb), cap=q('.lightbox-caption',lb), source=q('img',fig);
    img.src=source.currentSrc||source.src; img.alt=source.alt; cap.textContent=fig.dataset.caption||''; lb.classList.add('is-open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    if(typeof anime==='function'&&!prefersReduced){ anime({targets:'.lightbox-inner',scale:[.96,1],opacity:[0,1],duration:500,easing:'easeOutExpo'}); }
  };
  const closeLightbox=()=>{const lb=q('.lightbox');lb.classList.remove('is-open');lb.setAttribute('aria-hidden','true');document.body.style.overflow='';};

  window.addEventListener('DOMContentLoaded',()=>{
    qa('.gallery-grid figure').forEach(fig=>fig.addEventListener('click',()=>openLightbox(fig)));
    q('.lightbox-close')?.addEventListener('click',closeLightbox);
    q('.lightbox')?.addEventListener('click',e=>{if(e.target.classList.contains('lightbox'))closeLightbox()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
    const menu=q('.menu-toggle'), nav=q('.main-nav');
    menu?.addEventListener('click',()=>{
      const open=menu.getAttribute('aria-expanded')==='true'; menu.setAttribute('aria-expanded',String(!open));
      nav.style.display=open?'none':'flex'; nav.style.position='fixed'; nav.style.top='72px'; nav.style.left='16px'; nav.style.right='16px'; nav.style.background='var(--warm)'; nav.style.padding='22px'; nav.style.flexDirection='column'; nav.style.gap='18px'; nav.style.border='1px solid var(--line)';
    });
    run();
  });
})();
