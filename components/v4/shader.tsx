"use client";

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  EmberField — raw WebGL fragment shader.                            */
/*  Domain-warped fbm rendered as slow amber silk on warm black.       */
/*  Pointer-reactive, DPR-capped, pauses off-screen / hidden tab,      */
/*  renders a single static frame under prefers-reduced-motion.        */
/* ------------------------------------------------------------------ */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.55;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return v;
}

vec3 ramp(float t) {
  vec3 black = vec3(0.024, 0.020, 0.016);
  vec3 ember = vec3(0.28, 0.10, 0.025);
  vec3 amber = vec3(0.93, 0.58, 0.10);
  vec3 cream = vec3(1.0, 0.88, 0.62);
  vec3 c = mix(black, ember, smoothstep(0.18, 0.55, t));
  c = mix(c, amber, smoothstep(0.55, 0.85, t));
  c = mix(c, cream, smoothstep(0.88, 1.0, t));
  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.038;

  // pointer pulls the field gently
  vec2 m = uMouse;
  m.x *= uRes.x / uRes.y;
  float md = length(p - m);
  vec2 pull = (p - m) * 0.18 * exp(-md * 2.2);

  // iq-style domain warp
  vec2 q = vec2(
    fbm(p * 1.4 + vec2(0.0, t * 0.7)),
    fbm(p * 1.4 + vec2(5.2, 1.3) - t * 0.5)
  );
  vec2 r = vec2(
    fbm(p * 1.4 + 2.6 * q + vec2(1.7, 9.2) + t * 0.35 + pull),
    fbm(p * 1.4 + 2.6 * q + vec2(8.3, 2.8) - t * 0.25)
  );
  float v = fbm(p * 1.4 + 2.4 * r);

  // shape: concentrate energy toward the upper-right, away from the copy
  float band = smoothstep(0.95, 0.15, abs((uv.y - 0.45) - (uv.x - 0.5) * -0.35));
  float side = 0.3 + 0.7 * smoothstep(0.15, 0.85, uv.x) * smoothstep(0.0, 0.6, uv.y);
  float energy = pow(v, 2.3) * (0.45 + 0.55 * band) * side;

  // pointer adds a soft warm bloom
  energy += 0.08 * exp(-md * 3.0);

  vec3 col = ramp(clamp(energy * 1.28, 0.0, 1.0));

  // vignette — bottom fade into page bg is a CSS overlay
  float vig = smoothstep(1.4, 0.42, length(uv - vec2(0.6, 0.4)));
  col *= 0.3 + 0.7 * vig;

  // film dither
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("v4 shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function EmberField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: false }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return; // CSS fallback gradient stays visible

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = false;
    let inView = true;
    const start = performance.now();

    // pointer state, lerped for silk-smooth response
    const target = { x: 0.5, y: 0.45 };
    const cur = { x: 0.5, y: 0.45 };

    // adaptive quality: the field is soft, so it upscales invisibly.
    // Start at <=0.9MP backing store; degrade further if frames run slow.
    const MAX_PIXELS = 900_000;
    let quality = 1;
    let frozen = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw || !ch) return;
      const fit = Math.sqrt(MAX_PIXELS / (cw * ch * dpr * dpr));
      const scale = dpr * Math.min(1, fit) * quality;
      const w = Math.max(2, Math.floor(cw * scale));
      const h = Math.max(2, Math.floor(ch * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const frame = () => {
      resize();
      cur.x += (target.x - cur.x) * 0.07;
      cur.y += (target.y - cur.y) * 0.07;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, cur.x, 1.0 - cur.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // 30fps cap — the field drifts slowly, 30 is indistinguishable
    const FRAME_MS = 33;
    let last = 0;
    let slowStreak = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      const t0 = performance.now();
      last = now;
      frame();
      const cost = performance.now() - t0;
      // degrade gracefully on weak GPUs / software rendering
      if (cost > 50) {
        slowStreak += 1;
        if (slowStreak === 8) {
          if (quality > 0.5) {
            quality = 0.5;
            slowStreak = 0;
          } else {
            // still slow at quarter pixels: freeze on a final frame
            frozen = true;
            cancelAnimationFrame(raf);
            running = false;
          }
        }
      } else {
        slowStreak = 0;
      }
    };

    const play = () => {
      if (!running && inView && !document.hidden && !reduced && !frozen) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) play();
        else pause();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);

    if (reduced) {
      // single static frame
      resize();
      frame();
    } else {
      play();
    }

    return () => {
      pause();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        // graceful fallback if WebGL is unavailable
        background:
          "radial-gradient(ellipse 80% 60% at 30% 30%, rgba(180,83,9,0.25), transparent 60%), #0a0907",
      }}
    />
  );
}
