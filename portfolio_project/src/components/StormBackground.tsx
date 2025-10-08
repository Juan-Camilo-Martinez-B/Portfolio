"use client";

import { useEffect, useRef } from "react";

export default function StormBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx = context;

    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    });
    resizeObserver.observe(container);

    // --- Nubes ---
    const clouds: { x: number; y: number; r: number; speed: number }[] = [];
    const numClouds = 40;

    for (let i = 0; i < numClouds; i++) {
      clouds.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 150 + Math.random() * 200,
        speed: 0.2 + Math.random() * 0.4,
      });
    }

    type Lightning = { x: number; y: number; angle: number; life: number };
    const lightning: Lightning[] = [];

    function drawClouds() {
      clouds.forEach((c) => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          c.x,
          c.y,
          c.r * 0.2,
          c.x,
          c.y,
          c.r
        );
        gradient.addColorStop(0, "rgba(50,50,50,0.15)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();

        c.x += c.speed;
        if (c.x - c.r > width) {
          c.x = -c.r;
          c.y = Math.random() * height * 0.6;
        }
      });
    }

    function drawLightning() {
      lightning.forEach((l, i) => {
        ctx.strokeStyle = `rgba(249,115,22,${l.life / 180})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);

        let x = l.x;
        let y = l.y;
        const maxLength = height * 1.2;

        while (
          y < maxLength &&
          y > -maxLength &&
          x > -maxLength &&
          x < width + maxLength
        ) {
          const step = 30 + Math.random() * 30;
          const jitter = (Math.random() - 0.5) * 0.5;
          const angle = l.angle + jitter;

          x += Math.cos(angle) * step;
          y += Math.sin(angle) * step;

          ctx.lineTo(x, y);
        }

        ctx.stroke();

        l.life -= 1;
        if (l.life <= 0) {
          lightning.splice(i, 1);
        }
      });
    }

    const lightningInterval = setInterval(() => {
      if (lightning.length < 10) {
        const numRays = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numRays; i++) {
          const startX = Math.random() * width;
          const startY = Math.random() * (height * 0.3);
          const angle =
            Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 2);

          lightning.push({
            x: startX,
            y: startY,
            angle,
            life: 180,
          });
        }
      }
    }, 3000);

    function animate() {
      ctx.clearRect(0, 0, width, height);
      drawClouds();
      drawLightning();
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      resizeObserver.disconnect();
      clearInterval(lightningInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
