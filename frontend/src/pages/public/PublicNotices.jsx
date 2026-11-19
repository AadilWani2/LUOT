import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  AlertCircle,
  FileText,
  BellRing,
  ArrowRight,
  Calendar,
  Building2,
  SlidersHorizontal,
} from 'lucide-react';
import api, { API_BASE_URL } from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import NoticeCard from '../../components/NoticeCard';

const CATEGORIES = ['All', 'General', 'Exams', 'Admissions', 'Events', 'Academics'];

export default function PublicNotices() {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [urgentOnly, setUrgentOnly] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data } = await api.get('/notices/public');
        setNotices(data);
      } catch (err) {
        console.error('Failed to fetch public notices:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const dashboardPath =
    user?.role === 'super_admin'
      ? '/principal/dashboard'
      : user?.role === 'hod'
      ? '/hod/dashboard'
      : '/student/dashboard';

  const pinnedNotice = notices.find((n) => n.isUrgent);

  const filtered = notices.filter((n) => {
    const matchesCat = category === 'All' || n.category === category;
    const matchesUrgent = !urgentOnly || n.isUrgent;
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      (n.department || '').toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesUrgent && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* 1. Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10 animate-fade-up">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
            Official Circulars & Updates
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luot-teal mt-1 leading-tight">
            Public{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Notice Board</span>
              <span className="absolute left-0 bottom-1 w-full h-3.5 bg-luot-gold/80 -rotate-1 z-0 rounded-xs animate-highlight" />
            </span>
          </h1>
          <p className="mt-4 text-base text-luot-teal/75">
            Stay updated with official all-college announcements, exam
            schedules, and downloadable PDF circulars issued by the Principal
            and Departmental HODs.
          </p>
        </div>

        {/* Auth-Aware Portal Prompt */}
        <Link
          to={user ? dashboardPath : '/login/student'}
          className="inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-luot-teal text-white hover:bg-luot-teal-dark transition-colors shrink-0 shadow-sm"
        >
          <BellRing size={20} className="text-luot-gold shrink-0" />
          <div className="text-left">
            <p className="text-xs font-semibold text-luot-gold">
              {user ? `Signed in as ${user.name}` : 'Enrolled Student?'}
            </p>
            <p className="text-xs text-white/85 flex items-center gap-1">
              {user ? 'Open your semester dashboard' : 'Log in for your semester notices'}{' '}
              <ArrowRight size={13} />
            </p>
          </div>
        </Link>
      </div>

      {/* 2. Featured Pinned Urgent Circular */}
      {pinnedNotice && (
        <div className="mb-12 animate-fade-up-delay bg-white rounded-3xl border border-red-200 border-l-4 border-l-red-600 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
                Pinned Urgent Notice
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-luot-teal/10 text-luot-teal">
                All College
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-luot-teal/60">
              <Calendar size={14} />
              {new Date(pinnedNotice.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-luot-teal">
            {pinnedNotice.title}
          </h2>
          <p className="text-sm text-luot-teal/75 mt-2 leading-relaxed max-w-4xl">
            {pinnedNotice.content}
          </p>

          <div className="mt-5 pt-4 border-t border-luot-teal/10 flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-luot-teal/75">
              <Building2 size={15} className="text-luot-gold" />
              Issued by: {pinnedNotice.postedByRole} — {pinnedNotice.department}
            </span>
            {pinnedNotice.pdfUrl && (
              <a
                href={
                  pinnedNotice.pdfUrl.startsWith('/uploads')
                    ? `${API_BASE_URL}${pinnedNotice.pdfUrl}`
                    : pinnedNotice.pdfUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal text-xs font-bold transition-colors"
              >
                <FileText size={14} />
                Download Official Circular (PDF)
              </a>
            )}
          </div>
        </div>
      )}

      {/* 3. Filter & Search Control Bar */}
      <div className="bg-white rounded-2xl p-4 border border-luot-teal/10 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-nowrap lg:flex-wrap overflow-x-auto no-scrollbar items-center gap-2 pb-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-luot-teal/60 mr-1 shrink-0">
            <SlidersHorizontal size={14} />
            Filter:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                category === cat
                  ? 'bg-luot-teal text-white'
                  : 'bg-luot-bg text-luot-teal hover:bg-luot-teal/10'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setUrgentOnly(!urgentOnly)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer inline-flex items-center gap-1 shrink-0 ${
              urgentOnly
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-red-700 border-red-200 hover:bg-red-50'
            }`}
          >
            <AlertCircle size={12} />
            Urgent Only
          </button>
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-luot-teal/50"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notices or department..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-luot-bg border border-luot-teal/15 text-sm focus:outline-none focus:border-luot-teal focus:bg-white"
          />
        </div>
      </div>

      {/* 4. Notice Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-luot-teal/10 p-12 text-center">
          <p className="font-serif text-xl font-semibold text-luot-teal">
            No notices found
          </p>
          <p className="text-sm text-luot-teal/65 mt-1">
            {notices.length === 0
              ? 'No all-college notices have been published yet.'
              : 'Try clearing your search or switching back to "All" categories.'}
          </p>
          {notices.length > 0 && (
            <button
              onClick={() => {
                setCategory('All');
                setUrgentOnly(false);
                setSearch('');
              }}
              className="mt-5 px-5 py-2 rounded-full bg-luot-teal text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((notice) => (
            <NoticeCard key={notice._id} notice={notice} />
          ))}
        </div>
      )}
    </div>
  );
}
