import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 9000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.8 + 0.4,
          opacity: Math.random() * 0.45 + 0.15,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 130;
          if (dist < maxDist) {
            const alpha = 0.12 * (1 - dist / maxDist);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,197,94,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        const r = p.radius * (1 + 0.3 * Math.sin(p.pulse));
        const o = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        // Glow halo
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5);
        grad.addColorStop(0, `rgba(34,197,94,${o * 0.35})`);
        grad.addColorStop(0.5, `rgba(6,182,212,${o * 0.1})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,197,94,${o})`;
        ctx.fill();
      });
    };

    const update = () => {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;
      });
    };

    const loop = () => {
      update();
      draw();
      animId = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    resize();
    initParticles();
    loop();

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  );
};

export default ParticleField;
