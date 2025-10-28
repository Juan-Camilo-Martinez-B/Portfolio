"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef<{ x: number; y: number }[]>([]);
  const { theme } = useTheme();
  
  // Determinar el color según el tema
  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const cursorColor = isDark ? { r: 249, g: 115, b: 22, hex: '#f97316' } : { r: 59, g: 130, b: 246, hex: '#3b82f6' };

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
      trail.current.push({ x: mouse.current.x, y: mouse.current.y });
      if (trail.current.length > 20) trail.current.shift(); // longitud del rastro

      // dibujar rastro suave
      ctx.beginPath();
      for (let i = 0; i < trail.current.length - 1; i++) {
        const p1 = trail.current[i];
        const p2 = trail.current[i + 1];
        ctx.strokeStyle = `rgba(${cursorColor.r}, ${cursorColor.g}, ${cursorColor.b}, ${(i + 1) / trail.current.length})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = cursorColor.hex;
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
  }, [theme, isDark, cursorColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
}
