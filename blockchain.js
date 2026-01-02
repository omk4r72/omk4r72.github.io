const canvas = document.getElementById("chain");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = { x: -999, y: -999 };

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const nodes = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.2,
  vy: (Math.random() - 0.5) * 0.2
}));

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  nodes.forEach(a => {
    const dx = mouse.x - a.x;
    const dy = mouse.y - a.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 120) {
      a.vx += dx * 0.0003;
      a.vy += dy * 0.0003;
    }

    a.x += a.vx;
    a.y += a.vy;

    if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
    if (a.y < 0 || a.y > canvas.height) a.vy *= -1;
  });

  for (let i=0;i<nodes.length;i++) {
    for (let j=i+1;j<nodes.length;j++) {
      const d = Math.hypot(nodes[i].x-nodes[j].x, nodes[i].y-nodes[j].y);
      if (d < 140) {
        ctx.strokeStyle = "rgba(0,229,255,0.18)";
        ctx.beginPath();
        ctx.moveTo(nodes[i].x,nodes[i].y);
        ctx.lineTo(nodes[j].x,nodes[j].y);
        ctx.stroke();
      }
    }
  }

  nodes.forEach(n=>{
    ctx.fillStyle="#00e5ff";
    ctx.beginPath();
    ctx.arc(n.x,n.y,1.6,0,Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();
