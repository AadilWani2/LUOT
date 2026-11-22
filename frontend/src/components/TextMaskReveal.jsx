import { motion } from 'framer-motion';

export default function TextMaskReveal({ children, delay = 0, className = '' }) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}