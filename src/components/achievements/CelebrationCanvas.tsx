"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  drag: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  confetti: boolean;
  rotation: number;
  rotationSpeed: number;
}

const colors = ["#c084fc", "#8b5cf6", "#6366f1", "#22d3ee", "#f8fafc"];

export default function CelebrationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let animation = 0;
    const particles: Particle[] = [];
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const burst = (x: number, y: number, count: number) => {
      for (let index = 0; index < count; index += 1) {
        const angle = (Math.PI * 2 * index) / count + Math.random() * 0.18;
        const speed = 2.2 + Math.random() * 3.8;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 0.045,
          drag: 0.985,
          life: 0,
          maxLife: 70 + Math.random() * 35,
          size: 1.5 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)] ?? colors[0],
          confetti: false,
          rotation: 0,
          rotationSpeed: 0,
        });
      }
    };
    const confetti = () => {
      const count = window.innerWidth < 600 ? 44 : 72;
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: -20 - Math.random() * 180,
          vx: -0.8 + Math.random() * 1.6,
          vy: 1.2 + Math.random() * 2,
          gravity: 0.018,
          drag: 0.998,
          life: 0,
          maxLife: 150 + Math.random() * 60,
          size: 4 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)] ?? colors[0],
          confetti: true,
          rotation: Math.random() * Math.PI,
          rotationSpeed: -0.12 + Math.random() * 0.24,
        });
      }
    };
    resize();
    burst(window.innerWidth * 0.18, window.innerHeight * 0.2, 24);
    burst(window.innerWidth * 0.82, window.innerHeight * 0.24, 24);
    burst(window.innerWidth * 0.5, window.innerHeight * 0.12, 20);
    confetti();
    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        if (!particle) continue;
        particle.life += 1;
        particle.vx *= particle.drag;
        particle.vy = particle.vy * particle.drag + particle.gravity;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        const alpha = Math.max(0, 1 - particle.life / particle.maxLife);
        context.save();
        context.globalAlpha = alpha;
        context.fillStyle = particle.color;
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        if (particle.confetti) {
          context.fillRect(
            -particle.size,
            -particle.size / 2,
            particle.size * 2,
            particle.size,
          );
        } else {
          context.beginPath();
          context.arc(0, 0, particle.size, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
        if (particle.life >= particle.maxLife) particles.splice(index, 1);
      }
      if (frame < 240 && particles.length)
        animation = requestAnimationFrame(draw);
    };
    animation = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1001]"
      ref={canvasRef}
    />
  );
}
