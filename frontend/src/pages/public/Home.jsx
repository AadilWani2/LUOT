import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  BellRing,
  ArrowRight,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  LogOut,
  Briefcase,
  Cpu,
  Radio,
  BrainCircuit,
  Cog,
  Building,
  Code2,
  Quote,
} from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import NoticeCard from '../../components/NoticeCard';
import Reveal from '../../components/Reveal';
import CountUp from '../../components/CountUp';
import About from './About';
import Admissions from './Admissions';
import Curriculum from './Curriculum';
import Gallery from './Gallery';

export default function Home() {
  const { user, logout } = useAuth();
  const dashboardPath =
    user?.role === 'super_admin'
      ? '/principal/dashboard'
      : user?.role === 'hod'
      ? '/hod/dashboard'
      : '/student/dashboard';
  const [searchQuery, setSearchQuery] = useState('');
  const [notices, setNotices] = useState([]);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicNotices = async () => {
      try {
        const { data } = await api.get('/notices/public');
        setNotices(data.slice(0, 3)); // Show latest 3 on Home
      } catch (err) {
        console.error('Failed to load public notices:', err);
      } finally {
        setLoadingNotices(false);
      }
    };
    fetchPublicNotices();
  }, []);

  const handleCourseSearch = (e) => {
    e.preventDefault();
    navigate(`/curriculum?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div>
      {/* 1. Editorial Hero & Course Finder (Mobile-Polished) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-10 sm:pb-16">
        {/* Top Editorial Headline */}
        <div className="max-w-3xl mb-6 sm:mb-10 animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luot-gold/20 text-luot-teal text-[11px] font-bold uppercase tracking-widest mb-3 sm:mb-4">
            <GraduationCap size={14} className="text-luot-teal" />
            Admissions Open 2026–27
          </span>

          <h1 className="font-serif text-[2rem] leading-[1.15] sm:text-5xl lg:text-[3.5rem] font-bold text-luot-teal tracking-tight">
            Shaping tomorrow&apos;s{' '}
            <span className="relative inline-block">
              <span className="relative z-10">leading</span>
              <span className="absolute left-0 bottom-0.5 sm:bottom-1 w-full h-2.5 sm:h-3.5 bg-luot-gold/80 -rotate-1 z-0 rounded-xs animate-highlight" />
            </span>{' '}
            engineers &amp; innovators.
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-luot-teal/75 leading-relaxed max-w-xl">
            Loyal University Of Technology blends rigorous engineering
            foundations with hands-on research labs, industry mentorship, and
            transparent academic governance.
          </p>
        </div>

        {/* Hero Image + Overlapping Course Finder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
          {/* Campus Photo */}
          <div className="lg:col-span-12 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-luot-teal/10 aspect-[4/3] sm:aspect-[16/8] lg:aspect-[21/9]">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80"
              alt="Loyal University Of Technology Campus"
              className="w-full h-full object-cover animate-image-settle"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luot-teal/50 via-transparent to-transparent" />
          </div>

          {/* Floating Course Finder Card */}
          <div className="lg:col-span-7 -mt-8 sm:-mt-14 lg:-mt-32 mx-2 sm:mx-4 lg:mx-0 lg:ml-8 relative z-20 bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-luot-teal/10 p-4 sm:p-7">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-luot-teal">
                Find your program
              </h2>
              <Link
                to="/curriculum"
                className="text-xs font-semibold text-luot-teal/70 hover:text-luot-gold inline-flex items-center gap-1"
              >
                All Courses <ArrowRight size={13} />
              </Link>
            </div>

            {/* Mobile-Friendly Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate('/curriculum');
              }}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-luot-teal/45"
                />
                <input
                  type="text"
                  placeholder="Search B.Tech CSE, AI, Robotics..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl sm:rounded-full bg-luot-bg border border-luot-teal/15 text-sm text-luot-teal placeholder:text-luot-teal/45 focus:outline-none focus:border-luot-teal focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full bg-luot-teal hover:bg-luot-teal-dark text-white font-semibold text-sm transition-colors active:scale-[0.98] cursor-pointer shrink-0"
              >
                Explore
              </button>
            </form>

            {/* Swipeable Quick Department Pills */}
            <div className="mt-4 pt-3.5 border-t border-luot-teal/10 flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-2">
              {['Computer Science', 'AI & Data Science', 'Electronics', 'Mechanical', 'Civil'].map(
                (course) => (
                  <Link
                    key={course}
                    to="/curriculum"
                    className="shrink-0 px-3.5 py-1.5 rounded-full bg-luot-bg hover:bg-luot-gold/25 text-luot-teal text-xs font-semibold transition-colors"
                  >
                    {course}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Semester Notification Strip (Auth-Aware) */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-luot-teal text-white rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-luot-gold/20 text-luot-gold shrink-0">
                <BellRing size={24} />
              </div>
              {user ? (
                <div>
                  <h3 className="font-serif text-xl font-semibold">
                    Welcome back, {user.name}
                  </h3>
                  <p className="text-sm text-white/75 mt-1">
                    {user.role === 'student'
                      ? `Signed in as Semester ${user.semester} (${user.department}). Open your dashboard to view your semester circulars.`
                      : `Signed in to the LUOT Administration Portal (${user.department || 'Administration'}).`}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif text-xl font-semibold">
                    Log in for your semester-related notifications
                  </h3>
                  <p className="text-sm text-white/75 mt-1">
                    Enrolled LUOT students get a personalized feed with only their
                    semester circulars, urgent all-college alerts, fee portal, and
                    complaint forum.
                  </p>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <Link
                  to={dashboardPath}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm transition-all duration-200 active:scale-[0.98] w-full md:w-auto"
                >
                  Open My Dashboard
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <button
                  onClick={logout}
                  title="Log Out"
                  aria-label="Log Out"
                  className="p-3 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer shrink-0"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login/student"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm shrink-0 transition-all duration-200 active:scale-[0.98] w-full md:w-auto"
              >
                Student Portal Login
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </section>
      </Reveal>

      {/* 3. Public Notice Board Preview */}
      <Reveal>
        <section id="mobile-notices" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-luot-gold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luot-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-luot-gold" />
                </span>
                Live Updates
              </span>
              <h2 className="font-serif text-3xl font-bold text-luot-teal mt-1">
                Public Notice Board
              </h2>
            </div>
            <Link
              to="/notices"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-luot-teal hover:text-luot-gold transition-colors"
            >
              View all notices <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {loadingNotices ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-luot-teal/8 animate-pulse space-y-3"
                >
                  <div className="flex gap-2">
                    <div className="h-5 w-20 bg-luot-teal/10 rounded-full" />
                    <div className="h-5 w-16 bg-luot-gold/20 rounded-full" />
                  </div>
                  <div className="h-5 w-3/4 bg-luot-teal/10 rounded-lg" />
                  <div className="h-3 w-full bg-luot-teal/8 rounded-lg" />
                  <div className="h-3 w-5/6 bg-luot-teal/8 rounded-lg" />
                </div>
              ))}
            </div>
          ) : notices.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center text-sm text-luot-teal/65 border border-luot-teal/10">
              No public notices published yet. Notices posted by the Principal or HODs for All College will appear here automatically.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {notices.map((notice) => (
                <NoticeCard key={notice._id} notice={notice} />
              ))}
            </div>
          )}
        </section>
      </Reveal>

      {/* 4. Quick University Stats Strip */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, end: 25, suffix: '+', label: 'Degree Programs' },
              { icon: Users, end: 140, suffix: '+', label: 'Research Faculty' },
              { icon: Award, end: 94, suffix: '%', label: 'Placement Record' },
              { icon: BookOpen, end: 8, suffix: ' Semesters', label: 'Structured Curriculum' },
            ].map(({ icon: Icon, end, suffix, label }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-6 border border-luot-teal/10 text-center"
              >
                <Icon size={24} className="mx-auto text-luot-gold mb-3" />
                <div className="font-serif text-2xl font-bold text-luot-teal">
                  <CountUp end={end} suffix={suffix} />
                </div>
                <div className="text-xs font-medium text-luot-teal/70 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 5. Academic Departments Showcase */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-luot-teal/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
                Schools of Engineering
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luot-teal mt-1">
                Academic Departments
              </h2>
            </div>
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-luot-teal hover:text-luot-gold transition-colors group"
            >
              Explore Full Curriculum
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: 'Computer Science & Eng.',
                code: 'B.Tech • 4 Years',
                desc: 'Systems programming, distributed cloud architecture, and software engineering.',
                icon: Cpu,
              },
              {
                name: 'AI & Data Science',
                code: 'B.Tech • 4 Years',
                desc: 'Machine learning, neural networks, statistical modeling, and applied AI.',
                icon: BrainCircuit,
              },
              {
                name: 'Electronics & Comm.',
                code: 'B.Tech • 4 Years',
                desc: 'VLSI design, embedded microcontrollers, IoT hardware, and 5G networks.',
                icon: Radio,
              },
              {
                name: 'Information Technology',
                code: 'B.Tech • 4 Years',
                desc: 'Full-stack web systems, cybersecurity, enterprise databases, and DevOps.',
                icon: Code2,
              },
              {
                name: 'Mechanical Engineering',
                code: 'B.Tech • 4 Years',
                desc: 'Robotics, CAD/CAM manufacturing, thermal systems, and automation.',
                icon: Cog,
              },
              {
                name: 'Civil Engineering',
                code: 'B.Tech • 4 Years',
                desc: 'Structural design, smart infrastructure, GIS mapping, and green construction.',
                icon: Building,
              },
            ].map((dept) => {
              const Icon = dept.icon;
              return (
                <Link
                  key={dept.name}
                  to="/curriculum"
                  className="group bg-white rounded-2xl p-6 border border-luot-teal/10 hover:border-luot-gold/60 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-luot-teal/8 text-luot-teal group-hover:bg-luot-teal group-hover:text-luot-gold transition-colors flex items-center justify-center mb-4">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-luot-teal/55">
                      {dept.code}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-luot-teal mt-1">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-luot-teal/70 mt-2 leading-relaxed">
                      {dept.desc}
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-luot-teal group-hover:text-luot-gold transition-colors">
                    View Syllabus <ArrowRight size={13} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* 6. Placements & Industry Partners */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-luot-teal/10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luot-gold">
                  <Briefcase size={14} /> Career Outcomes
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luot-teal mt-2 leading-tight">
                  Built for industry from Semester 1.
                </h2>
                <p className="text-sm text-luot-teal/75 mt-3 leading-relaxed">
                  Our Training & Placement Cell partners with leading engineering
                  firms, product startups, and research labs for internships and
                  full-time roles.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-3 gap-2.5 sm:gap-4">
                {[
                  { value: '95%', label: 'Placement Rate' },
                  { value: '24 LPA', label: 'Highest Package' },
                  { value: '120+', label: 'Hiring Partners' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-luot-bg rounded-2xl p-3 sm:p-5 text-center border border-luot-teal/8"
                  >
                    <p className="font-serif text-2xl sm:text-3xl font-bold text-luot-teal">
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-semibold text-luot-teal/65 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Pills */}
            <div className="mt-8 pt-6 border-t border-luot-teal/10 flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold text-luot-teal/55 mr-2">
                Recent Recruiters:
              </span>
              {['TCS', 'Infosys', 'Microsoft', 'Atlassian', 'L&T Tech', 'Wipro', 'Bosch', 'Zoho'].map(
                (company) => (
                  <span
                    key={company}
                    className="px-3.5 py-1.5 rounded-full bg-luot-bg border border-luot-teal/10 text-xs font-semibold text-luot-teal/80"
                  >
                    {company}
                  </span>
                )
              )}
            </div>
          </div>
        </section>
      </Reveal>

      {/* 7. Editorial Principal's Message */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-luot-teal text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <Quote
              size={120}
              className="absolute -top-4 -right-4 text-white/5 pointer-events-none"
            />
            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
                From the Principal&apos;s Desk
              </span>
              <blockquote className="font-serif text-2xl sm:text-3xl font-medium leading-snug mt-4">
                &ldquo;At Loyal University Of Technology, we don&apos;t just teach
                students to pass examinations—we train engineers to build
                resilient systems, question assumptions, and lead with integrity.&rdquo;
              </blockquote>
              <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-serif text-lg font-bold">Dr. Rajesh Verma</p>
                  <p className="text-xs text-white/70">
                    Principal &amp; Director, Loyal University Of Technology
                  </p>
                </div>
                <Link
                  to="/about"
                  className="text-xs font-semibold text-luot-gold hover:underline inline-flex items-center gap-1"
                >
                  Read University Vision <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 8. Closing Admissions CTA */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
          <div className="bg-luot-gold/20 border border-luot-gold/40 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-luot-teal">
                Admissions Open for 2026–27
              </h2>
              <p className="text-sm text-luot-teal/80 mt-1.5 max-w-xl">
                Explore eligibility criteria, seat intake, and submit your
                application online in minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/admissions"
                className="px-6 py-3 rounded-full bg-luot-teal hover:bg-luot-teal-dark text-white font-semibold text-sm inline-flex items-center gap-2 transition-colors active:scale-[0.98]"
              >
                Apply Now <ArrowRight size={15} />
              </Link>
              <Link
                to="/gallery"
                className="px-6 py-3 rounded-full bg-white border border-luot-teal/20 text-luot-teal hover:bg-luot-bg font-semibold text-sm transition-colors active:scale-[0.98]"
              >
                Tour Campus
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 5. Mobile All-In-One Continuous Experience */}
      <div className="md:hidden mt-10 border-t border-luot-teal/10 divide-y divide-luot-teal/10">
        <section id="mobile-about">
          <About />
        </section>
        <section id="mobile-admissions">
          <Admissions />
        </section>
        <section id="mobile-curriculum">
          <Curriculum />
        </section>
        <section id="mobile-gallery">
          <Gallery />
        </section>
      </div>
    </div>
  );
}