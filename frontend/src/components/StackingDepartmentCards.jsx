import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SCHOOLS = [
  {
    num: '01',
    title: 'Computer Science & Engineering',
    tag: 'B.Tech · 4 Years · 120 Seats',
    desc: 'Distributed cloud systems, compilers, full-stack architecture, and systems programming with dedicated GPU labs.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    bg: 'bg-luot-teal text-white',
    accent: 'text-luot-gold',
  },
  {
    num: '02',
    title: 'Artificial Intelligence & Data Science',
    tag: 'B.Tech · 4 Years · 60 Seats',
    desc: 'Neural architectures, retrieval-augmented systems, computer vision, and statistical modeling.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    bg: 'bg-white text-luot-teal border border-luot-teal/15',
    accent: 'text-luot-gold',
  },
  {
    num: '03',
    title: 'Electronics, VLSI & Robotics',
    tag: 'B.Tech · 4 Years · 60 Seats',
    desc: 'Embedded microcontrollers, autonomous robotics, 5G communication hardware, and IoT prototyping.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    bg: 'bg-[#104A44] text-white',
    accent: 'text-luot-gold',
  },
];

function StackCard({ school, index, total, progress }) {
  const targetScale = 1 - (total - index) * 0.04;
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 sm:top-28 mb-8 sm:mb-12">
      <motion.div
        style={{ scale, top: `calc(${index * 22}px)` }}
        data-cursor="Syllabus"
        className={`relative rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] will-change-transform ${school.bg}`}
      >
        <div className="lg:col-span-7 p-7 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className={`font-serif text-2xl font-bold ${school.accent}`}>
                {school.num}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest opacity-70">
                {school.tag}
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              {school.title}
            </h3>
            <p className="mt-4 text-sm sm:text-base opacity-80 leading-relaxed max-w-lg">
              {school.desc}
            </p>
          </div>

          <Link
            to="/curriculum"
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest group w-fit"
          >
            Explore Curriculum
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-luot-gold"
            />
          </Link>
        </div>

        <div className="lg:col-span-5 relative min-h-[200px] lg:min-h-full overflow-hidden">
          <img
            src={school.image}
            alt={school.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function StackingDepartmentCards() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-luot-gold">
          Academic Excellence
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luot-teal mt-2">
          Schools of Engineering
        </h2>
      </div>

      <div className="relative">
        {SCHOOLS.map((school, i) => (
          <StackCard
            key={school.num}
            school={school}
            index={i}
            total={SCHOOLS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

