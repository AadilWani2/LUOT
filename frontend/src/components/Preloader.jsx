import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [show, setShow] = useState(() => !sessionStorage.getItem('luot_loaded'));
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            sessionStorage.setItem('luot_loaded', '1');
            document.body.style.overflow = '';
          }, 220);
          return 100;
        }
        return prev + Math.floor(Math.random() * 14) + 8;
      });
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-luot-teal text-white flex flex-col justify-between p-6 sm:p-12"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
            <span>Loyal University Of Technology</span>
            <span>Est. 2026</span>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-8xl font-bold tracking-tight"
            >
              LUOT<span className="text-luot-gold">.</span>
            </motion.h1>
          </div>

          <div className="flex items-end justify-between">
            <p className="text-xs text-white/60 max-w-xs">
              Engineering · Artificial Intelligence · Applied Research
            </p>
            <span className="font-serif text-4xl sm:text-6xl font-light text-luot-gold tabular-nums">
              {Math.min(count, 100).toString().padStart(2, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

