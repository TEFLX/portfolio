import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hov = t.closest("a, button, [data-cursor='hover']");
      ring.current?.classList.toggle("hover", !!hov);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}

export function Loader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const messages = [
    "Loading Experience...",
    "Initializing Motion Engine...",
    "Loading Systems...",
    "Preparing Portfolio...",
    "Ready.",
  ];
  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => {
        if (s >= messages.length - 1) {
          clearInterval(t);
          setTimeout(onDone, 350);
          return s;
        }
        return s + 1;
      });
    }, 380);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background gap-6">
      <div className="text-[16px] font-extrabold tracking-[0.3em] text-white/70 uppercase">ORQELIX</div>
      <div className="text-[22px] font-black tracking-tight">
        RITIK <span className="text-gradient">KASHYAP</span>
      </div>
      <div className="w-60 h-px bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#7f77dd] via-[#85b7eb] to-[#5dcaa5] transition-[width] duration-300 ease-out"
          style={{ width: `${((step + 1) / messages.length) * 100}%` }}
        />
      </div>
      <div className="font-mono text-[12px] text-white/40 h-4">{messages[step]}</div>
    </div>
  );
}
