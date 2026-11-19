import { useState, useEffect, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Images,
} from 'lucide-react';

const GALLERY_COLLECTIONS = [
  {
    id: 1,
    title: 'Central Digital Library',
    category: 'Library',
    desc: 'Multi-level reading halls, 80,000+ technical volumes, IEEE digital kiosks, and quiet research wings.',
    cover:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80',
        caption: 'Main Reading Hall — Natural-lit quiet study tables',
      },
      {
        url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80',
        caption: 'Reference & Archives Wing — Engineering & IEEE journals',
      },
      {
        url: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1400&q=80',
        caption: 'Upper Mezzanine Stacks — 80,000+ technical volumes',
      },
      {
        url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1400&q=80',
        caption: 'Postgraduate Thesis & Quiet Research Carrels',
      },
    ],
  },
  {
    id: 2,
    title: 'AI & High-Performance Computing Labs',
    category: 'Labs',
    desc: 'Dual-monitor workstations, GPU clusters for machine learning, and cloud systems engineering.',
    cover:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80',
        caption: 'Software & Full-Stack Engineering Workstation Pod',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1400&q=80',
        caption: 'AI & Data Science Lab — Deep learning research bench',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80',
        caption: 'Robotics, IoT & Embedded Hardware Prototyping Lab',
      },
      {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80',
        caption: 'Collaborative Coding Sprint & Hackathon Studio',
      },
    ],
  },
  {
    id: 3,
    title: 'Auditoriums & Smart Lecture Theatres',
    category: 'Auditorium',
    desc: '500-seat acoustic auditorium and tiered smart classrooms with interactive lecture capture.',
    cover:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80',
        caption: 'Tiered Smart Lecture Theatre — Interactive projection',
      },
      {
        url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=80',
        caption: 'Main Convocation & National Tech Symposium Hall',
      },
      {
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
        caption: 'Guest Keynote & Industry Conclave Stage',
      },
      {
        url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=80',
        caption: 'Departmental Seminar & Paper Presentation Room',
      },
    ],
  },
  {
    id: 4,
    title: 'Main Academic Block & Campus Life',
    category: 'Campus',
    desc: 'Architectural academic blocks, sunlit atriums, green courtyards, and student innovation lounges.',
    cover:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=80',
        caption: 'Main Academic Block & Central Courtyard',
      },
      {
        url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1400&q=80',
        caption: 'Campus Walkway & Engineering Quadrangle',
      },
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
        caption: 'Student Innovation Lounge & Club Meetup Space',
      },
      {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80',
        caption: 'Annual Convocation & Graduation Lawn',
      },
    ],
  },
];

const CATEGORIES = ['All', 'Library', 'Labs', 'Auditorium', 'Campus'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCollection, setActiveCollection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filtered =
    activeCategory === 'All'
      ? GALLERY_COLLECTIONS
      : GALLERY_COLLECTIONS.filter((item) => item.category === activeCategory);

  const openCollection = (collection) => {
    setActiveCollection(collection);
    setCurrentIndex(0);
  };

  const closeModal = useCallback(() => {
    setActiveCollection(null);
  }, []);

  const showNext = useCallback(() => {
    if (!activeCollection) return;
    setCurrentIndex((prev) => (prev + 1) % activeCollection.photos.length);
  }, [activeCollection]);

  const showPrev = useCallback(() => {
    if (!activeCollection) return;
    setCurrentIndex((prev) =>
      prev === 0 ? activeCollection.photos.length - 1 : prev - 1
    );
  }, [activeCollection]);

  // Keyboard navigation + body scroll lock when modal is open
  useEffect(() => {
    if (!activeCollection) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCollection, closeModal, showNext, showPrev]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Header */}
      <div className="max-w-2xl mb-8 sm:mb-10 animate-fade-up">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luot-gold">
          <Camera size={14} />
          Inside LUOT
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luot-teal mt-2 leading-tight">
          Campus{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Gallery</span>
            <span className="absolute left-0 bottom-1 w-full h-3.5 bg-luot-gold/80 -rotate-1 z-0 rounded-xs animate-highlight" />
          </span>
        </h1>
        <p className="mt-4 text-base text-luot-teal/75">
          Click any space below to explore multiple interior photos of our
          central library, research laboratories, lecture theatres, and campus.
        </p>
      </div>

      {/* Swipeable Category Filter Pills */}
      <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-2 mb-10 pb-1 animate-fade-up-delay">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-luot-teal text-white shadow-xs'
                : 'bg-white border border-luot-teal/15 text-luot-teal hover:bg-luot-teal/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Collection Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((collection) => (
          <div
            key={collection.id}
            onClick={() => openCollection(collection)}
            className="group bg-white rounded-3xl overflow-hidden border border-luot-teal/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-luot-teal/10">
              <img
                src={collection.cover}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luot-teal/65 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Pill */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-luot-teal">
                {collection.category}
              </span>

              {/* Photo Count Badge */}
              <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luot-teal/90 text-white text-[11px] font-semibold backdrop-blur-xs">
                <Images size={13} className="text-luot-gold" />
                {collection.photos.length} Photos
              </span>

              {/* Bottom Hover Prompt */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                  {collection.title}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-luot-gold translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 shrink-0 ml-3">
                  Explore <ChevronRight size={14} />
                </span>
              </div>
            </div>

            <div className="p-5 flex items-center justify-between gap-4">
              <p className="text-xs text-luot-teal/75 leading-relaxed">
                {collection.desc}
              </p>
              {/* Mini Preview Dots */}
              <div className="flex -space-x-2 shrink-0">
                {collection.photos.slice(0, 3).map((p, idx) => (
                  <img
                    key={idx}
                    src={p.url}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Animated Multi-Photo Collection Modal */}
      {activeCollection && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-backdrop-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-luot-teal/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-luot-gold">
                  {activeCollection.category} • {currentIndex + 1} /{' '}
                  {activeCollection.photos.length}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-luot-teal">
                  {activeCollection.title}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-luot-bg text-luot-teal hover:bg-luot-gold transition-colors cursor-pointer"
                aria-label="Close gallery"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Animated Photo Stage */}
            <div className="relative bg-black aspect-[16/10] sm:aspect-[16/9] overflow-hidden flex items-center justify-center">
              <img
                key={activeCollection.photos[currentIndex].url}
                src={activeCollection.photos[currentIndex].url}
                alt={activeCollection.photos[currentIndex].caption}
                className="w-full h-full object-cover animate-photo-reveal"
              />

              {/* Prev / Next Controls */}
              <button
                onClick={showPrev}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-luot-gold text-luot-teal shadow-lg transition-all active:scale-95 cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={showNext}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-luot-gold text-luot-teal shadow-lg transition-all active:scale-95 cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 py-4">
                <p className="text-xs sm:text-sm text-white font-medium">
                  {activeCollection.photos[currentIndex].caption}
                </p>
              </div>
            </div>

            {/* Clickable Thumbnail Strip */}
            <div className="p-4 bg-luot-bg flex items-center gap-2.5 overflow-x-auto no-scrollbar">
              {activeCollection.photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'ring-2 ring-luot-gold scale-105 opacity-100'
                      : 'opacity-55 hover:opacity-90'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
