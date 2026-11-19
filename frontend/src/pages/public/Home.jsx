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
} from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import NoticeCard from '../../components/NoticeCard';

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
      {/* 1. Editorial Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12 sm:pb-20">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-5 pt-4 z-10">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luot-teal leading-[1.15] tracking-tight">
              A{' '}
              <span className="relative inline-block">
                <span className="relative z-10">leading,</span>
                <span className="absolute left-0 bottom-1 w-full h-4 bg-luot-gold -rotate-1 z-0 rounded-xs" />
              </span>{' '}
              future-ready technology university
            </h1>
            <p className="mt-5 text-base text-luot-teal/75 leading-relaxed">
              Choose from industry-aligned undergraduate and postgraduate programs
              in engineering, computing, and applied sciences at Loyal University
              Of Technology.
            </p>
          </div>

          {/* Right Column: Rounded Campus Image */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg aspect-[16/10] bg-luot-teal/10">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=80"
                alt="Loyal University Of Technology Campus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Overlapping Floating Course Finder Card */}
          <div className="lg:col-span-7 -mt-10 sm:-mt-14 lg:-mt-36 mx-1 sm:mx-0 z-20 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-luot-teal/10 p-5 sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-luot-teal mb-4">
              Course finder
            </h2>
            <form onSubmit={handleCourseSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-luot-teal/50"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="I want to study... (e.g. B.Tech CSE, AI, BCA)"
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-luot-teal/25 text-sm focus:outline-none focus:border-luot-teal"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm transition-colors cursor-pointer"
              >
                Find course
              </button>
            </form>

            <div className="mt-5">
              <p className="text-xs font-semibold text-luot-teal/70 mb-2.5">
                Browse courses
              </p>
              <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-2 pb-1">
                {['B.Tech', 'M.Tech', 'BCA / MCA', 'Curriculum', 'Admissions'].map((tag) => (
                  <Link
                    key={tag}
                    to={tag === 'Admissions' ? '/admissions' : '/curriculum'}
                    className="px-3.5 py-1.5 rounded-full bg-luot-bg hover:bg-luot-teal/10 text-xs font-medium text-luot-teal transition-colors shrink-0"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Semester Notification Strip (Auth-Aware) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-luot-teal text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm transition-colors w-full md:w-auto"
              >
                Open My Dashboard
                <ArrowRight size={16} />
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm shrink-0 transition-colors w-full md:w-auto"
            >
              Student Portal Login
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>

      {/* 3. Public Notice Board Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
              Live Updates
            </span>
            <h2 className="font-serif text-3xl font-bold text-luot-teal mt-1">
              Public Notice Board
            </h2>
          </div>
          <Link
            to="/notices"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-luot-teal hover:text-luot-gold transition-colors"
          >
            View all notices <ArrowRight size={16} />
          </Link>
        </div>

        {loadingNotices ? (
          <div className="bg-white rounded-2xl p-10 text-center text-sm text-luot-teal/60 border border-luot-teal/10">
            Loading latest notices...
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

      {/* 4. Quick University Stats Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: GraduationCap, value: '25+', label: 'Degree Programs' },
            { icon: Users, value: '140+', label: 'Research Faculty' },
            { icon: Award, value: '94%', label: 'Placement Record' },
            { icon: BookOpen, value: '8 Semesters', label: 'Structured Curriculum' },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 border border-luot-teal/10 text-center"
            >
              <Icon size={24} className="mx-auto text-luot-gold mb-3" />
              <div className="font-serif text-2xl font-bold text-luot-teal">
                {value}
              </div>
              <div className="text-xs font-medium text-luot-teal/70 mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}