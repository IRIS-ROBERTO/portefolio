import { useRef, useCallback } from "react";

export function useTilt(maxTilt = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -maxTilt;
      const rotY = ((x - cx) / cx) * maxTilt;
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025,1.025,1.025)`;
      el.style.transition = "transform 0.08s ease-out";
      el.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
      el.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = "transform 0.45s ease-out";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
