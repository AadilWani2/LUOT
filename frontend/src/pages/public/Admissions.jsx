import { useState } from 'react';
import {
  CheckCircle2,
  FileDown,
  CalendarCheck,
  GraduationCap,
  Award,
  Clock,
  ArrowRight,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    step: '01',
    title: 'Online Application',
    desc: 'Submit your academic transcripts, preferred department, and entrance score online.',
  },
  {
    step: '02',
    title: 'Merit & Entrance Screening',
    desc: 'Shortlisting based on national entrance rank (JEE / GATE) or LUOT Entrance Test.',
  },
  {
    step: '03',
    title: 'Document Verification',
    desc: 'In-person or digital verification of mark sheets, ID proof, and category certificates.',
  },
  {
    step: '04',
    title: 'Seat Confirmation',
    desc: 'Pay the first-semester tuition fee and receive your official LUOT Roll Number.',
  },
];

const PROGRAMS = [
  {
    name: 'B.Tech (CSE / AI / ECE / ME)',
    duration: '4 Years (8 Semesters)',
    seats: '360 Seats',
    eligibility: '10+2 with Physics, Chemistry & Maths (Min. 60%)',
  },
  {
    name: 'BCA (Hons.)',
    duration: '3 Years (6 Semesters)',
    seats: '120 Seats',
    eligibility: '10+2 in any stream with Maths / CS (Min. 55%)',
  },
  {
    name: 'M.Tech (Computer Science)',
    duration: '2 Years (4 Semesters)',
    seats: '60 Seats',
    eligibility: 'B.Tech / B.E. in relevant discipline (Min. 60%)',
  },
  {
    name: 'MCA',
    duration: '2 Years (4 Semesters)',
    seats: '90 Seats',
    eligibility: 'Graduation with Maths at 10+2 or degree level',
  },
];

const KEY_DATES = [
  { label: 'Application Portal Opens', date: '15 Dec 2026' },
  { label: 'Last Date to Apply (Round 1)', date: '31 Mar 2027' },
  { label: 'LUOT Entrance Test (LUOT-ET)', date: '18 Apr 2027' },
  { label: 'Merit List & Counseling', date: '05 May 2027' },
];

export default function Admissions() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* 1. Split Editorial Hero with Campus Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        <div className="lg:col-span-6 animate-fade-up">
          <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
            Admissions 2026–27
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-luot-teal mt-2 leading-tight">
            Start your{' '}
            <span className="relative inline-block">
              <span className="relative z-10">engineering</span>
              <span className="absolute left-0 bottom-1 w-full h-3.5 bg-luot-gold/80 -rotate-1 z-0 rounded-xs animate-highlight" />
            </span>{' '}
            journey at LUOT.
          </h1>
          <p className="mt-5 text-base text-luot-teal/75 leading-relaxed">
            Transparent, merit-based admissions for undergraduate and
            postgraduate programs. Join a campus built for research, coding,
            and real-world engineering.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setApplyOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luot-teal hover:bg-luot-teal-dark text-white font-semibold text-sm cursor-pointer transition-colors"
            >
              Apply Now
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => alert('LUOT 2026–27 Prospectus PDF Download (UI Demo)')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm cursor-pointer transition-colors"
            >
              <FileDown size={16} />
              Download Prospectus
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 animate-fade-up-delay">
          <div className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[16/11] bg-luot-teal/10">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
              alt="LUOT Prospective Students"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-luot-teal">
                Applications Open
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 4-Step Admission Process */}
      <div className="mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
          Step-by-Step
        </span>
        <h2 className="font-serif text-3xl font-bold text-luot-teal mt-1 mb-6">
          Admission Process
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-3xl p-6 border border-luot-teal/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <span className="font-serif text-3xl font-bold text-luot-gold">
                {item.step}
              </span>
              <h3 className="font-serif text-lg font-semibold text-luot-teal mt-3">
                {item.title}
              </h3>
              <p className="text-sm text-luot-teal/70 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Key Dates & Merit Scholarships Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        {/* Important Dates */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-7 border border-luot-teal/10">
          <div className="flex items-center gap-2.5 mb-5">
            <Clock size={20} className="text-luot-gold" />
            <h3 className="font-serif text-xl font-bold text-luot-teal">
              Important Dates
            </h3>
          </div>
          <div className="divide-y divide-luot-teal/10">
            {KEY_DATES.map((d) => (
              <div
                key={d.label}
                className="py-3.5 flex items-center justify-between gap-4 text-sm"
              >
                <span className="text-luot-teal/75">{d.label}</span>
                <span className="font-semibold text-luot-teal shrink-0">
                  {d.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Merit Scholarships with Photo */}
        <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-luot-teal text-white grid grid-cols-1 sm:grid-cols-12">
          <div className="sm:col-span-7 p-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luot-gold mb-2">
              <Award size={15} />
              Merit Scholarships
            </div>
            <h3 className="font-serif text-2xl font-bold">
              Up to 50% Tuition Waiver
            </h3>
            <p className="text-sm text-white/75 mt-3 leading-relaxed">
              Top-ranking candidates in JEE Main, GATE, or the LUOT Entrance
              Test automatically qualify for semester-wise merit scholarships.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-white/10">
                90%+ Board Merit
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10">
                Need-Based Aid
              </span>
            </div>
          </div>
          <div className="sm:col-span-5 h-52 sm:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
              alt="LUOT Scholarship Students"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 4. Programs & Eligibility Table */}
      <div className="mb-14">
        <div className="flex items-center gap-2.5 mb-6">
          <GraduationCap size={24} className="text-luot-gold" />
          <h2 className="font-serif text-3xl font-bold text-luot-teal">
            Programs & Eligibility
          </h2>
        </div>

        {/* Mobile Program Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.name}
              className="bg-white rounded-2xl p-5 border border-luot-teal/10 shadow-xs space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-base font-bold text-luot-teal">
                  {prog.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-luot-gold/25 text-luot-teal text-[11px] font-bold shrink-0">
                  {prog.seats}
                </span>
              </div>
              <p className="text-xs font-semibold text-luot-teal/65">
                Duration: {prog.duration}
              </p>
              <p className="text-xs text-luot-teal/80 flex items-start gap-1.5 pt-1 border-t border-luot-teal/10">
                <CheckCircle2 size={14} className="text-luot-gold shrink-0 mt-0.5" />
                <span>{prog.eligibility}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="hidden md:block bg-white rounded-3xl border border-luot-teal/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-luot-teal text-white text-xs uppercase tracking-wider">
                  <th className="py-4 px-6">Program</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Intake</th>
                  <th className="py-4 px-6">Eligibility Criteria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luot-teal/10 text-sm">
                {PROGRAMS.map((prog) => (
                  <tr key={prog.name} className="hover:bg-luot-bg/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-luot-teal">
                      {prog.name}
                    </td>
                    <td className="py-4 px-6 text-luot-teal/75">{prog.duration}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-luot-gold/20 text-luot-teal text-xs font-semibold">
                        {prog.seats}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-luot-teal/75">
                      <span className="inline-flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-luot-gold shrink-0" />
                        {prog.eligibility}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Enrolled Student CTA Banner */}
      <div className="bg-luot-teal text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <CalendarCheck size={26} className="text-luot-gold shrink-0" />
          <div>
            <h3 className="font-serif text-xl font-semibold">
              Already received your LUOT Roll Number?
            </h3>
            <p className="text-xs text-white/75 mt-1">
              Create your student portal account to access semester notices, fee
              payments, and the complaint forum.
            </p>
          </div>
        </div>
        <Link
          to="/register"
          className="px-6 py-3 rounded-full bg-luot-gold text-luot-teal font-semibold text-sm shrink-0 hover:bg-luot-gold-hover transition-colors"
        >
          Student Registration
        </Link>
      </div>

      {/* Interactive Apply Now Modal (UI Demo) */}
      {applyOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 shadow-2xl relative animate-fade-up">
            <button
              onClick={() => setApplyOpen(false)}
              className="absolute top-5 right-5 text-luot-teal/60 hover:text-luot-teal cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle2 size={44} className="mx-auto text-emerald-600 mb-3" />
                <h3 className="font-serif text-2xl font-bold text-luot-teal">
                  Application Received!
                </h3>
                <p className="text-sm text-luot-teal/75 mt-2">
                  Thank you for applying to LUOT. Our Admissions Cell will email
                  your entrance schedule shortly.
                </p>
                <button
                  onClick={() => setApplyOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-luot-teal text-white text-sm font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl font-bold text-luot-teal">
                  Quick Admission Inquiry
                </h3>
                <p className="text-xs text-luot-teal/70 mt-1 mb-5">
                  Fill in your details for the 2026–27 academic intake.
                </p>
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
                  />
                  <select
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal bg-white"
                  >
                    <option value="">Select Program</option>
                    <option>B.Tech — Computer Science</option>
                    <option>B.Tech — Electronics & Comm.</option>
                    <option>BCA (Hons.)</option>
                    <option>M.Tech / MCA</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm cursor-pointer transition-colors"
                  >
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}