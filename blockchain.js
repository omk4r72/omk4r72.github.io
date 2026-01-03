const canvas = document.getElementById("chain");
const ctx = canvas.getContext("2d");

/* =========================
   RESPONSIVE SETUP
   ========================= */
let isMobile = window.innerWidth < 768;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  isMobile = window.innerWidth < 768;
}
resize();
window.addEventListener("resize", resize);

/* =========================
   INPUT PROBE (DESKTOP ONLY)
   ========================= */
let mouse = { x: -9999, y: -9999 };

if (!isMobile) {
  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });
}

/* =========================
   NETWORK CONFIG
   ========================= */
const CONFIG = {
  nodes: isMobile ? 45 : 90,
  speed: isMobile ? 0.28 : 0.42,          // 🔥 faster
  linkDist: isMobile ? 120 : 160,
  coreChance: isMobile ? 0.05 : 0.08
};

/* =========================
   NODE MODEL
   ========================= */
const nodes = Array.from({ length: CONFIG.nodes }, () => {
  const core = Math.random() < CONFIG.coreChance;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * CONFIG.speed,
    vy: (Math.random() - 0.5) * CONFIG.speed,
    r: core ? (isMobile ? 2.2 : 2.8) : (isMobile ? 1.4 : 1.6),
    core,
    phase: Math.random() * Math.PI * 2
  };
});

/* =========================
   MAIN LOOP
   ========================= */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* --- UPDATE NODES --- */
  nodes.forEach(n => {
    // desktop probe influence
    if (!isMobile) {
      const dx = mouse.x - n.x;
      const dy = mouse.y - n.y;
      const d = Math.hypot(dx, dy);
      if (d < 160) {
        n.vx += dx * 0.00015;
        n.vy += dy * 0.00015;
      }
    }

    // organic motion
    n.phase += 0.03;                        // 🔥 faster pulse
    n.x += n.vx + Math.sin(n.phase) * 0.03;
    n.y += n.vy + Math.cos(n.phase) * 0.03;

    // bounds
    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
  });

  /* --- CONNECTIONS --- */
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);

      if (d < CONFIG.linkDist) {
        const alpha = 1 - d / CONFIG.linkDist;

        ctx.strokeStyle = `rgba(0,229,255,${alpha * (isMobile ? 0.35 : 0.25)})`;
        ctx.lineWidth = a.core || b.core
          ? (isMobile ? 1.3 : 1.6)
          : (isMobile ? 0.9 : 1.1);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  /* --- DRAW NODES --- */
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);

    if (n.core) {
      ctx.fillStyle = "#00ffd5";
      ctx.shadowColor = "#00ffd5";
      ctx.shadowBlur = isMobile ? 6 : 10;
    } else {
      ctx.fillStyle = "#00e5ff";
      ctx.shadowBlur = 0;
    }

    ctx.fill();
  });

  ctx.shadowBlur = 0;

  requestAnimationFrame(draw);
}

draw();
