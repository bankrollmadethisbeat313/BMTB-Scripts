import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Fixed ambient layer: drifting yellow orbs, mouse spotlight, grid + vignette overlay.
 * Portaled to document.body so it isn't trapped behind page stacking contexts.
 */
export default function AmbientBackground() {
  const spotRef = useRef(null);
  const target = useRef({ x: 0.5, y: 0.35 });
  const current = useRef({ x: 0.5, y: 0.35 });
  const rafRef = useRef(0);

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const setSpot = (x, y) => {
      document.documentElement.style.setProperty("--bmtb-spot-x", `${x * 100}%`);
      document.documentElement.style.setProperty("--bmtb-spot-y", `${y * 100}%`);
    };

    setSpot(0.5, 0.35);

    if (reduceMotion || !finePointer) {
      return undefined;
    }

    const onMove = (event) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      target.current.x = event.clientX / w;
      target.current.y = event.clientY / h;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;
      setSpot(current.current.x, current.current.y);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return createPortal(
    <div className="bmtb-ambient" aria-hidden="true">
      <div className="bmtb-ambient__base" />
      <div className="bmtb-ambient__orb bmtb-ambient__orb--a" />
      <div className="bmtb-ambient__orb bmtb-ambient__orb--b" />
      <div className="bmtb-ambient__orb bmtb-ambient__orb--c" />
      <div ref={spotRef} className="bmtb-ambient__spotlight" />
      <div className="bmtb-ambient__grid" />
      <div className="bmtb-ambient__noise" />
      <div className="bmtb-ambient__vignette" />
      <div className="bmtb-ambient__scan" />
    </div>,
    document.body,
  );
}
