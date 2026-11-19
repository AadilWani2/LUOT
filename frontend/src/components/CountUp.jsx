import { useEffect, useRef, useState } from 'react';

export default function CountUp({ end, suffix = '', duration = 1200 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const tick = (now) => {
            const elapsed = Math.min((now - startTime) / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - elapsed, 3);
            setValue(Math.floor(eased * end));
            if (elapsed < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

