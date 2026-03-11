import { useState, useEffect, useRef } from "react";

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function useCountUp(
  end: number,
  duration = 2200,
  decimals = 0,
  suffix = ""
) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = parseFloat((eased * end).toFixed(decimals));
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [triggered, end, duration, decimals]);

  const formatted =
    decimals > 0 ? count.toFixed(decimals) : count.toLocaleString("pt-BR");

  return { value: formatted + suffix, ref };
}
