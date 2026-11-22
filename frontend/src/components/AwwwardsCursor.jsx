import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AwwwardsCursor() {
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { stiffness: 420, damping: 32, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target.closest('[data-cursor]');
      setLabel(target ? target.getAttribute('data-cursor') : '');
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <motion.div
      style={{ x, y }}
      className="fixed top-0 left-0 z-[90] pointer-events-none hidden lg:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          width: label ? 88 : 14,
          height: label ? 36 : 14,
          backgroundColor: label ? '#F4B829' : '#0B3B36',
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 26 }}
        className="rounded-full flex items-center justify-center shadow-lg"
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-bold uppercase tracking-wider text-luot-teal"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

