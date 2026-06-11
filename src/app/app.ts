import { Component, signal, ViewEncapsulation, afterNextRender, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  menuOpen = signal(false);
  moreOpen = signal(false);
  mobileExpanded = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.initPixelIcon();
        this.initStarCanvas();
        this.initCursor();
        this.initTypewriter();
        this.initScrollAnimations();
        this.initCardTilt();
        this.initConstellation();
        this.initEasterEgg();
        this.initBlob();
      }
    });
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  handleViewMore() {
    if (window.innerWidth <= 768) {
      this.mobileExpanded.set(true);
    } else {
      this.moreOpen.set(true);
    }
  }

  closeMore() {
    this.moreOpen.set(false);
  }

  private initPixelIcon() {
    const pixelData = [
      0,1,1,0,0,1,1,0,
      1,1,1,1,1,1,1,1,
      1,0,1,1,1,1,0,1,
      1,1,1,1,1,1,1,1,
      0,1,1,1,1,1,1,0,
      0,0,1,0,0,1,0,0,
      0,0,1,1,1,1,0,0,
      0,1,1,0,0,1,1,0,
    ];
    const colors = ['transparent', '#A78BFA'];
    const icon = document.getElementById('pixel-icon');
    if (!icon) return;
    pixelData.forEach(v => {
      const s = document.createElement('span');
      s.style.background = colors[v];
      icon.appendChild(s);
    });
  }

  private initStarCanvas() {
    const canvas = document.getElementById('star-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const STAR_COLORS = ['#A78BFA', '#F9A8D4', '#93C5FD', '#6EE7B7', '#ffffff'];
    const stars: { x: number; y: number; r: number; alpha: number; speed: number; color: string; twinkle: number; twinkleSpeed: number }[] = [];

    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.15 + 0.02,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.twinkle += s.twinkleSpeed;
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.round(a * 255).toString(16).padStart(2, '0');
        ctx.fill();
        s.y -= s.speed;
        if (s.y < -2) {
          s.y = canvas.height + 2;
          s.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(drawStars);
    }
    requestAnimationFrame(drawStars);
  }

  private initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    const wand = document.getElementById('cursor-wand');
    if (!wand) return;

    const starFill = wand.querySelector('.wand-star-fill') as SVGElement | null;
    const SPARKLES = ['✦', '✧', '⋆', '✸', '✺'];
    const COLORS = ['#A78BFA', '#F9A8D4', '#93C5FD', '#6EE7B7', '#FDE68A'];
    let mx = 0, my = 0, lastTrail = 0;

    // Follow cursor instantly
    document.addEventListener('mousemove', (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      wand.style.left = mx + 'px';
      wand.style.top = my + 'px';
      spawnSpark(mx, my);
    });

    // Smooth rainbow color cycle on the star tip
    let hue = 270;
    function cycleColor() {
      hue = (hue + 0.6) % 360;
      if (starFill) starFill.setAttribute('fill', `hsl(${hue}, 85%, 75%)`);
      const glowColor = `hsl(${hue}, 85%, 70%)`;
      wand!.style.filter = `drop-shadow(0 0 5px ${glowColor}) drop-shadow(0 0 12px ${glowColor}33)`;
      requestAnimationFrame(cycleColor);
    }
    requestAnimationFrame(cycleColor);

    // Hover: wand tilts and glows brighter
    document.querySelectorAll('a, button, .badge, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        wand.style.transform = 'translate(-10px, -10px) scale(1.35) rotate(-18deg)';
      });
      el.addEventListener('mouseleave', () => {
        wand.style.transform = 'translate(-10px, -10px) scale(1) rotate(0deg)';
      });
    });

    // Sparkle trail
    function spawnSpark(x: number, y: number) {
      const now = Date.now();
      if (now - lastTrail < 55) return;
      lastTrail = now;
      const spark = document.createElement('div');
      spark.className = 'trail-spark';
      // Slight scatter around cursor
      spark.style.left = (x + (Math.random() - 0.5) * 14) + 'px';
      spark.style.top  = (y + (Math.random() - 0.5) * 14) + 'px';
      spark.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      spark.textContent = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 850);
    }
  }

  private initTypewriter() {
    const phrases = [
      'I build fast, accessible web apps.',
      'Craft over speed, always.',
      'Angular & TypeScript enthusiast.',
      'Design-minded developer.',
    ];
    let pi = 0, ci = 0, deleting = false;
    const typeEl = document.getElementById('typewriter');
    if (!typeEl) return;

    function typeStep() {
      const phrase = phrases[pi];
      if (!deleting) {
        typeEl!.textContent = phrase.slice(0, ci + 1);
        ci++;
        if (ci === phrase.length) { deleting = true; setTimeout(typeStep, 2000); return; }
        setTimeout(typeStep, 55);
      } else {
        typeEl!.textContent = phrase.slice(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(typeStep, 400); return; }
        setTimeout(typeStep, 28);
      }
    }
    setTimeout(typeStep, 1600);
  }

  private initScrollAnimations() {
    const headings = document.querySelectorAll('.section-heading');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.2 });
    headings.forEach(h => io.observe(h));
  }

  private initCardTilt() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      const el = card as HTMLElement;
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)';
        el.style.transition = 'transform 0.4s ease';
      });
      el.addEventListener('mouseenter', () => {
        el.style.transition = 'none';
      });
    });
  }

  private initConstellation() {
    const svg = document.querySelector('.constellation-svg');
    const section = document.getElementById('skills');
    if (!svg || !section) return;

    const lines = svg.querySelectorAll('.const-line');

    // Draw lines in once section scrolls into view
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      lines.forEach((line, i) => {
        const delay = i * 55 + 150;
        setTimeout(() => line.classList.add('drawn'), delay);
      });
    }, { threshold: 0.15 });
    io.observe(section);

    // Hover: brighten lines connected to hovered node
    svg.querySelectorAll('.const-node').forEach(node => {
      const nodeId = node.getAttribute('data-id') ?? '';

      node.addEventListener('mouseenter', () => {
        svg.querySelectorAll<SVGElement>(`.const-line[data-connects*="${nodeId}"]`).forEach(l => {
          l.style.strokeOpacity = '0.75';
          l.style.strokeWidth   = '2';
        });
      });

      node.addEventListener('mouseleave', () => {
        svg.querySelectorAll<SVGElement>(`.const-line[data-connects*="${nodeId}"]`).forEach(l => {
          l.style.strokeOpacity = l.classList.contains('cross') ? '0.1' : '0.28';
          l.style.strokeWidth   = '1';
        });
      });
    });
  }

  private initBlob() {
    const canvas = document.getElementById('hero-blob') as HTMLCanvasElement;
    if (!canvas) return;

    const SIZE = 400;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(SIZE, SIZE, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 4.2;

    const RADIUS = 1.25;
    const geo = new THREE.SphereGeometry(RADIUS, 64, 64);
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const orig = (posAttr.array as Float32Array).slice();

    const mat = new THREE.MeshPhongMaterial({
      color: 0xA78BFA,
      emissive: 0x2a0b5e,
      specular: 0xF9A8D4,
      shininess: 60,
      transparent: true,
      opacity: 0.95,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color: 0xF9A8D4, wireframe: true, transparent: true, opacity: 0.05,
    }));
    mesh.add(wire);

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const pl1 = new THREE.PointLight(0xC4B5FD, 4, 16); pl1.position.set(4, 3, 4); scene.add(pl1);
    const pl2 = new THREE.PointLight(0xF9A8D4, 2.6, 16); pl2.position.set(-4, -1, 3); scene.add(pl2);
    const pl3 = new THREE.PointLight(0x6EE7B7, 1.4, 16); pl3.position.set(0, -4, -2); scene.add(pl3);

    // Raw + smoothed pointer, normalized to [-1, 1] over the viewport
    let targetX = 0, targetY = 0;
    let smoothX = 0, smoothY = 0;
    document.addEventListener('mousemove', (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -((e.clientY / window.innerHeight) * 2 - 1);
    });

    const arr = posAttr.array as Float32Array;

    const tick = (t: number) => {
      requestAnimationFrame(tick);
      const tt = t * 0.001;

      // Ease the pointer so motion feels liquid, not jittery
      smoothX += (targetX - smoothX) * 0.09;
      smoothY += (targetY - smoothY) * 0.09;

      // Gentle organic breathing — amplitudes kept small so it stays a rounded blob
      const energy = 1 + Math.min(Math.hypot(targetX - smoothX, targetY - smoothY) * 5, 1.4);
      for (let i = 0; i < arr.length; i += 3) {
        const ox = orig[i], oy = orig[i + 1], oz = orig[i + 2];
        const n =
          Math.sin(ox * 1.5 + tt * 0.7) * Math.cos(oy * 1.5 - tt * 0.5) * 0.10 +
          Math.sin(oy * 2.4 + tt * 0.9) * Math.cos(oz * 2.4 - tt * 0.6) * 0.05 +
          Math.sin(oz * 3.6 + tt * 1.1) * 0.022;
        const d = 1 + n * energy;
        arr[i]     = ox * d;
        arr[i + 1] = oy * d;
        arr[i + 2] = oz * d;
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();

      // Slow auto-spin + lean toward the cursor (the part that reads as "reacting")
      mesh.rotation.y = tt * 0.1 + smoothX * 1.5;
      mesh.rotation.x = smoothY * 1.2 + Math.sin(tt * 0.3) * 0.08;
      renderer.render(scene, camera);
    };
    requestAnimationFrame(tick);
  }

  private initEasterEgg() {
    let typed = '';
    const confCanvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    const toast = document.getElementById('toast');
    if (!confCanvas || !toast) return;
    const confCtx = confCanvas.getContext('2d')!;
    let confettiPieces: { x: number; y: number; vx: number; vy: number; size: number; color: string; rot: number; rotV: number; shape: string }[] = [];
    let confettiActive = false;

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      typed += e.key.toLowerCase();
      if (typed.length > 10) typed = typed.slice(-10);
      if (typed.includes('hello')) {
        typed = '';
        launchConfetti();
        showToast();
      }
    });

    function showToast() {
      toast!.classList.add('show');
      setTimeout(() => toast!.classList.remove('show'), 3000);
    }

    function launchConfetti() {
      confCanvas.width = window.innerWidth;
      confCanvas.height = window.innerHeight;
      confettiPieces = [];
      const COLORS = ['#A78BFA', '#F9A8D4', '#93C5FD', '#6EE7B7', '#FDE68A', '#ffffff'];
      for (let i = 0; i < 140; i++) {
        confettiPieces.push({
          x: Math.random() * confCanvas.width,
          y: -20 - Math.random() * 200,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 3 + 2,
          size: Math.random() * 7 + 4,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rot: Math.random() * Math.PI * 2,
          rotV: (Math.random() - 0.5) * 0.15,
          shape: Math.random() > 0.5 ? 'rect' : 'circle',
        });
      }
      confettiActive = true;
      animConfetti();
    }

    function animConfetti() {
      if (!confettiActive) return;
      confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height);
      confettiPieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.vy += 0.04;
        confCtx.save();
        confCtx.translate(p.x, p.y);
        confCtx.rotate(p.rot);
        confCtx.fillStyle = p.color;
        if (p.shape === 'rect') {
          confCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          confCtx.beginPath();
          confCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          confCtx.fill();
        }
        confCtx.restore();
      });
      confettiPieces = confettiPieces.filter(p => p.y < confCanvas.height + 30);
      if (confettiPieces.length > 0) requestAnimationFrame(animConfetti);
      else { confettiActive = false; confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height); }
    }
  }
}
