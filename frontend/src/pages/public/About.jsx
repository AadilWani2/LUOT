import { Target, Eye, ShieldCheck, Building, Sparkles } from 'lucide-react';

const CAMPUS_HIGHLIGHTS = [
  {
    title: 'AI & Computing Labs',
    desc: 'High-performance workstations and dedicated research pods for CSE and AI students.',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Central Digital Library',
    desc: 'Over 80,000 technical volumes, IEEE journals, and quiet collaborative study zones.',
    image:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Innovation & Seminar Halls',
    desc: 'Modern auditoriums hosting hackathons, guest lectures, and industry conclaves.',
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
  },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* 1. Split Hero Header with Campus Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        <div className="lg:col-span-6 animate-fade-up">
          <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
            About LUOT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-luot-teal mt-2 leading-tight">
            Shaping engineers, researchers, and{' '}
            <span className="relative inline-block">
              <span className="relative z-10">technology leaders</span>
              <span className="absolute left-0 bottom-1 w-full h-3 bg-luot-gold/80 -rotate-1 z-0 rounded-xs animate-highlight" />
            </span>{' '}
            since 2004.
          </h1>
          <p className="mt-5 text-base text-luot-teal/75 leading-relaxed">
            Loyal University Of Technology (LUOT) is an autonomous technical
            university committed to hands-on engineering education,
            interdisciplinary research, and transparent academic governance.
          </p>
        </div>

        <div className="lg:col-span-6 animate-fade-up-delay">
          <div className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[16/11] bg-luot-teal/10">
            <img
              src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80';
              }}
              alt="LUOT Campus"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-2.5">
              <Sparkles size={18} className="text-luot-gold" />
              <div>
                <p className="text-xs font-bold text-luot-teal">Est. 2004</p>
                <p className="text-[11px] text-luot-teal/70">20+ Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white rounded-3xl p-8 border border-luot-teal/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
          <div className="w-11 h-11 rounded-xl bg-luot-gold/20 text-luot-teal flex items-center justify-center mb-4">
            <Eye size={22} />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-luot-teal mb-3">
            Our Vision
          </h2>
          <p className="text-sm text-luot-teal/75 leading-relaxed">
            To be recognized globally as a center of excellence in computing,
            core engineering, and applied sciences—bridging classroom theory
            with real-world technological impact.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-luot-teal/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
          <div className="w-11 h-11 rounded-xl bg-luot-teal/10 text-luot-teal flex items-center justify-center mb-4">
            <Target size={22} />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-luot-teal mb-3">
            Our Mission
          </h2>
          <p className="text-sm text-luot-teal/75 leading-relaxed">
            To provide an inclusive, research-intensive learning environment
            supported by modern laboratories, dedicated faculty, and strong
            industry partnerships across all eight semesters.
          </p>
        </div>
      </div>

      {/* 3. Campus Life & Facilities Gallery */}
      <div className="mb-16">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
            Campus Infrastructure
          </span>
          <h2 className="font-serif text-3xl font-bold text-luot-teal mt-1">
            Built for hands-on discovery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAMPUS_HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="group bg-white rounded-3xl overflow-hidden border border-luot-teal/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="aspect-[16/10] overflow-hidden bg-luot-teal/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-luot-teal">
                  {item.title}
                </h3>
                <p className="text-sm text-luot-teal/70 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Leadership & Accreditation Banner */}
      <div className="bg-luot-teal text-white rounded-3xl p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
            Governance & Quality
          </span>
          <h2 className="font-serif text-3xl font-bold mt-2">
            Accredited & Industry-Recognized
          </h2>
          <p className="mt-3 text-sm text-white/75 leading-relaxed">
            All undergraduate and postgraduate programs at LUOT follow a
            credit-based semester system approved by national technical
            education bodies, with active departmental oversight by respective
            Heads of Department (HODs) and the Principal&apos;s Office.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
            <ShieldCheck size={22} className="text-luot-gold mb-2" />
            <h3 className="font-semibold text-sm">NAAC Grade &apos;A+&apos;</h3>
            <p className="text-xs text-white/70 mt-1">
              Recognized for academic rigor & campus infrastructure.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
            <Building size={22} className="text-luot-gold mb-2" />
            <h3 className="font-semibold text-sm">6 Core Departments</h3>
            <p className="text-xs text-white/70 mt-1">
              CSE, AI & Data Science, ECE, Mechanical, Civil, and IT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}