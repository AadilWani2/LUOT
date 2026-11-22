import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, ArrowUpRight, GraduationCap } from 'lucide-react';

export default function ScrollExpandHero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  // Image expands and zooms gently as you scroll
  const imgScale = useTransform(smoothProgress, [0, 1], [1.08, 1]);
  const frameWidth = useTransform(smoothProgress, [0, 0.6], ['92%', '100%']);
  const frameRadius = useTransform(smoothProgress, [0, 0.6], [28, 16]);
  const headlineY = useTransform(smoothProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={containerRef}
      className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-x-clip"
    >
      {/* Editorial Split Headline */}
      <motion.div
        style={{ y: headlineY }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luot-teal/8 text-luot-teal text-[11px] font-bold uppercase tracking-[0.16em] mb-4"
            >
              <GraduationCap size={14} className="text-luot-gold" />
              Admissions 2026–27
            </motion.span>

            <h1 className="font-serif text-[2.25rem] leading-[1.06] sm:text-6xl lg:text-[4.5rem] font-bold text-luot-teal tracking-tight">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Engineering the
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  next{' '}
                  <span className="italic font-normal text-luot-teal/85 underline decoration-luot-gold decoration-4 underline-offset-8">
                    generation
                  </span>{' '}
                  of thinkers.
                </motion.span>
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs space-y-4"
          >
            <p className="text-sm text-luot-teal/75 leading-relaxed">
              Loyal University Of Technology unites deep systems engineering,
              applied AI research, and transparent campus governance.
            </p>
            <Link
              to="/admissions"
              data-cursor="Apply"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-luot-teal group"
            >
              Start Application
              <span className="p-2 rounded-full bg-luot-gold text-luot-teal transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll-Scrubbed Expanding Campus Frame */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          style={{ width: frameWidth, borderRadius: frameRadius }}
          data-cursor="Campus"
          className="relative overflow-hidden shadow-2xl bg-luot-teal/10 aspect-[4/3] sm:aspect-[16/8] lg:aspect-[21/9]"
        >
          <motion.img
            style={{ scale: imgScale }}
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85"
            alt="Loyal University Of Technology Campus"
            className="w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luot-teal/65 via-transparent to-transparent" />
        </motion.div>

        {/* Floating Minimalist Program Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.search?.value?.trim();
            navigate(input ? `/curriculum?q=${encodeURIComponent(input)}` : '/curriculum');
          }}
          className="-mt-8 sm:-mt-10 relative z-20 w-[92%] sm:w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-2 shadow-xl border border-luot-teal/10 flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1 flex items-center">
            <Search size={17} className="absolute left-4 text-luot-teal/45" />
            <input
              name="search"
              type="text"
              placeholder="Search B.Tech CSE, AI & Data Science, Robotics..."
              className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-luot-teal placeholder:text-luot-teal/45 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            data-cursor="Search"
            className="px-7 py-3 rounded-xl sm:rounded-full bg-luot-teal hover:bg-luot-teal-dark text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Explore Programs
          </button>
        </motion.form>
      </div>
    </section>
  );
}

