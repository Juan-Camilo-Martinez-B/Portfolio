"use client";
import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const trail: { x: number; y: number }[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY + 12; // Solo debajo del cursor
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // guardar posiciones recientes
      trail.push({ x: mouse.current.x, y: mouse.current.y });
      if (trail.length > 20) trail.shift(); // longitud del rastro

      // dibujar rastro suave
      ctx.beginPath();
      for (let i = 0; i < trail.length - 1; i++) {
        const p1 = trail[i];
        const p2 = trail[i + 1];
        ctx.strokeStyle = `rgba(249, 115, 22, ${(i + 1) / trail.length})`; // naranja con fade
        ctx.lineWidth = 2;
        ctx.shadowColor = "#f97316";
        ctx.shadowBlur = 8;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
}
