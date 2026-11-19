import { useState } from 'react';
import { X, Maximize2, Camera } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Central Digital Library — Reading Hall',
    category: 'Library',
    desc: 'Quiet multi-level study space with 80,000+ technical volumes and digital research terminals.',
    image:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'AI & High-Performance Computing Lab',
    category: 'Labs',
    desc: 'Equipped with dual-monitor workstations for machine learning, cloud, and systems engineering.',
    image:
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Main Academic Block — Atrium',
    category: 'Campus',
    desc: 'Natural-lit central atrium connecting the Computer Science and Electronics wings.',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Reference & Archives Wing',
    category: 'Library',
    desc: 'Dedicated quiet zone for thesis preparation, IEEE journals, and postgraduate research.',
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: 'Main Auditorium & Seminar Hall',
    category: 'Auditorium',
    desc: '500-seat acoustic hall hosting national hackathons, convocations, and guest lectures.',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    title: 'Robotics & Embedded Systems Lab',
    category: 'Labs',
    desc: 'Hardware prototyping benches for microcontroller, IoT, and VLSI experimentation.',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    title: 'Collaborative Innovation Lounge',
    category: 'Campus',
    desc: 'Open-plan student lounge for project brainstorming, coding sprints, and club meetups.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    title: 'Smart Lecture Theatre',
    category: 'Auditorium',
    desc: 'Tiered classroom with interactive projection systems and lecture capture.',
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  },
];

const CATEGORIES = ['All', 'Library', 'Labs', 'Auditorium', 'Campus'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="max-w-2xl mb-10 animate-fade-up">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luot-gold">
          <Camera size={14} />
          Inside LUOT
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-luot-teal mt-2 leading-tight">
          Campus{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Gallery</span>
            <span className="absolute left-0 bottom-1 w-full h-3.5 bg-luot-gold/80 -rotate-1 z-0 rounded-xs" />
          </span>
        </h1>
        <p className="mt-4 text-base text-luot-teal/75">
          Explore our central digital library, research laboratories, smart
          lecture theatres, and collaborative student spaces.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-2 mb-8 pb-1 animate-fade-up-delay">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              activeCategory === cat
                ? 'bg-luot-teal text-white shadow-xs'
                : 'bg-white border border-luot-teal/15 text-luot-teal hover:bg-luot-teal/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group bg-white rounded-3xl overflow-hidden border border-luot-teal/10 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-luot-teal/10">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-luot-teal/0 group-hover:bg-luot-teal/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity p-3 rounded-full bg-white/90 text-luot-teal shadow-md">
                  <Maximize2 size={18} />
                </span>
              </div>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-luot-teal">
                {item.category}
              </span>
            </div>

            <div className="p-5">
              <h3 className="font-serif text-lg font-semibold text-luot-teal">
                {item.title}
              </h3>
              <p className="text-xs text-luot-teal/70 mt-1.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative animate-fade-up"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-luot-teal hover:bg-luot-gold transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>

            <div className="aspect-[16/10] bg-black">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
                  {selectedImage.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-luot-teal mt-0.5">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-luot-teal/75 mt-1">
                  {selectedImage.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}