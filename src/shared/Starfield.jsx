/* ============================================================
   AMBIENT STARFIELD — fixed full-viewport twinkling backdrop
   ============================================================ */
import React, { useRef, useEffect } from "react";
import { C, reduceMotion } from "./theme.js";
import { setupCanvas } from "./helpers.js";

export function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    let w = window.innerWidth, h = window.innerHeight;
    let ctx = setupCanvas(canvas, w, h);
    let stars = [];
    const make = () => {
      const count = Math.min(240, Math.floor((w * h) / 6000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.2,
        p: Math.random() * Math.PI * 2, s: Math.random() * 0.9 + 0.2,
        c: Math.random() < 0.15 ? C.cool : Math.random() < 0.2 ? C.sun : "#ffffff",
      }));
    };
    make();
    let raf, t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const tw = reduceMotion ? 0.7 : 0.55 + 0.45 * Math.sin(t * st.s + st.p);
        ctx.globalAlpha = tw;
        ctx.fillStyle = st.c;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      w = window.innerWidth; h = window.innerHeight;
      ctx = setupCanvas(canvas, w, h); make();
      if (reduceMotion) draw();
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
