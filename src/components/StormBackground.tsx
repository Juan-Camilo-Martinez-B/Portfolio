'use client';

import { useTheme } from '@/contexts/ThemeContext';
import React, { useEffect, useRef } from 'react';

interface LightningProps {
  hue?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

const Lightning: React.FC<LightningProps> = ({
  hue, // Se calculará dinámicamente según el tema
  speed = 1.5,
  intensity = 1.2,
  size = 1.4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const { theme } = useTheme();

  // Determinar el color de los rayos según el tema
  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const lightningHue = hue ?? (isDark ? 24 : 210); // Naranja para dark, azul para light
  const adjustedIntensity = isDark ? intensity : intensity * 1.8; // Aumentar intensidad en modo light para que se vean claramente
  const saturation = isDark ? 0.91 : 0.95; // Mayor saturación para azul en modo light

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Cancelar animación anterior si existe
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gl = canvas.getContext('webgl', { 
      alpha: true, // Habilitar transparencia para que los rayos se dibujen sobre el fondo
      premultipliedAlpha: false 
    });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      uniform float uSaturation;

      #define OCTAVE_COUNT 8

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;

          vec3 finalColor = vec3(0.0);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, uSaturation, 0.98));

          // Tres rayos con diferentes patrones de animación
          
          // Rayo 1 - Izquierda (movimiento rápido y errático)
          vec2 pos1 = uv;
          pos1.x += -1.3;
          pos1 += 1.8 * fbm(pos1 * uSize * 1.3 + 0.8 * iTime * uSpeed) - 0.9;
          float dist1 = abs(pos1.x);
          float brightness1 = pow(0.03 / (dist1 + 0.02), 1.5) * uIntensity * 1.1;
          finalColor += baseColor * brightness1;
          
          // Rayo 2 - Centro (movimiento lento y suave)
          vec2 pos2 = uv;
          pos2.x += 0.0;
          pos2 += 1.2 * fbm(pos2 * uSize * 0.9 + 0.4 * iTime * uSpeed + 5.0) - 0.6;
          float dist2 = abs(pos2.x);
          float brightness2 = pow(0.03 / (dist2 + 0.02), 1.5) * uIntensity * 0.9;
          finalColor += baseColor * brightness2;
          
          // Rayo 3 - Derecha (movimiento medio con pulsos)
          vec2 pos3 = uv;
          pos3.x += 1.3;
          float pulse = sin(iTime * uSpeed * 2.0) * 0.3 + 1.0;
          pos3 += 1.5 * fbm(pos3 * uSize * 1.1 + 0.6 * iTime * uSpeed + 10.0) - 0.75;
          float dist3 = abs(pos3.x);
          float brightness3 = pow(0.03 / (dist3 + 0.02), 1.5) * uIntensity * pulse;
          finalColor += baseColor * brightness3;

          // Calcular alpha basado en la intensidad total de los rayos
          float totalBrightness = brightness1 + brightness2 + brightness3;
          float alpha = min(totalBrightness, 1.0);
          
          fragColor = vec4(finalColor, alpha);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');
    const uHueLocation = gl.getUniformLocation(program, 'uHue');
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
    const uIntensityLocation = gl.getUniformLocation(program, 'uIntensity');
    const uSizeLocation = gl.getUniformLocation(program, 'uSize');
    const uSaturationLocation = gl.getUniformLocation(program, 'uSaturation');
    
    // Habilitar blending normal para que los rayos se dibujen sobre el fondo
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const startTime = performance.now();

    const render = () => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      // Limpiar con transparencia total - el fondo lo maneja el div wrapper
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const currentTime = performance.now();
      
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
      gl.uniform1f(uHueLocation, lightningHue);
      gl.uniform1f(uSpeedLocation, speed);
      gl.uniform1f(uIntensityLocation, adjustedIntensity);
      gl.uniform1f(uSizeLocation, size);
      gl.uniform1f(uSaturationLocation, saturation);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameRef.current = requestAnimationFrame(render);
    };
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [lightningHue, speed, adjustedIntensity, size, saturation, theme, isDark]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-100 dark:bg-black transition-colors duration-300">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

export default Lightning;
