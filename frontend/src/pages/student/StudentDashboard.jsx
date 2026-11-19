import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CreditCard,
  MessageSquareWarning,
  GraduationCap,
  CalendarClock,
  CheckCircle2,
} from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import NoticeCard from '../../components/NoticeCard';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [filter, setFilter] = useState('ALL_MY'); // ALL_MY | SEMESTER | COLLEGE
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data } = await api.get('/notices/my');
        setNotices(data);
      } catch (err) {
        console.error('Failed to load notices:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter((n) => {
    if (filter === 'SEMESTER') return n.targetSemester === String(user?.semester);
    if (filter === 'COLLEGE') return n.targetSemester === 'ALL';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      {/* Top Student Profile Banner */}
      <div className="bg-luot-teal text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-md">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luot-gold/20 text-luot-gold text-xs font-bold mb-3">
            <GraduationCap size={15} />
            {user?.department} • Semester {user?.semester}
          </div>
          <h1 className="font-serif text-3xl font-bold">
            Welcome back, {user?.name}
          </h1>
          <p className="text-xs text-white/75 mt-1">
            Roll No: <span className="font-semibold text-white">{user?.rollNumber || 'N/A'}</span> · {user?.email}
          </p>
        </div>

        {/* Quick Portal Navigation */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/student/fees"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-xs transition-colors"
          >
            <CreditCard size={15} />
            Fee Payment Portal
          </Link>
          <Link
            to="/student/complaints"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
          >
            <MessageSquareWarning size={15} />
            Complaint Forum
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Filtered Notification Feed */}
        <div className="lg:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="font-serif text-2xl font-bold text-luot-teal flex items-center gap-2">
              <Bell size={20} className="text-luot-gold" />
              Your Notifications
            </h2>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'ALL_MY', label: 'All My Notices' },
                { id: 'SEMESTER', label: `Semester ${user?.semester} Only` },
                { id: 'COLLEGE', label: 'All-College Only' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    filter === tab.id
                      ? 'bg-luot-teal text-white'
                      : 'bg-white border border-luot-teal/15 text-luot-teal hover:bg-luot-teal/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-10 text-center text-sm text-luot-teal/60 border border-luot-teal/10">
              Loading your semester notices...
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-luot-teal/10">
              <p className="font-serif text-lg font-semibold text-luot-teal">
                No notices yet
              </p>
              <p className="text-xs text-luot-teal/65 mt-1">
                When your HOD or the Principal publishes a notice for Semester {user?.semester} or All College, it will appear here immediately.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((notice) => (
                <NoticeCard key={notice._id} notice={notice} />
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick Academic Widgets (UI Showcase) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Attendance Card */}
          <div className="bg-white rounded-3xl p-6 border border-luot-teal/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-bold text-luot-teal">
                Attendance Overview
              </h3>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 size={12} /> Good Standing
              </span>
            </div>
            <div className="text-3xl font-serif font-bold text-luot-teal mb-2">
              86.4%
            </div>
            <div className="w-full h-2.5 bg-luot-bg rounded-full overflow-hidden">
              <div className="h-full bg-luot-teal rounded-full w-[86%]" />
            </div>
            <p className="text-[11px] text-luot-teal/65 mt-3">
              Minimum 75% attendance required for End-Semester Examinations.
            </p>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-white rounded-3xl p-6 border border-luot-teal/10">
            <div className="flex items-center gap-2 mb-4">
              <CalendarClock size={18} className="text-luot-gold" />
              <h3 className="font-serif text-lg font-bold text-luot-teal">
                Semester {user?.semester} Schedule
              </h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-luot-bg flex justify-between">
                <span className="font-semibold text-luot-teal">Mid-Sem Practicals</span>
                <span className="text-luot-teal/70">25 Nov 2026</span>
              </div>
              <div className="p-3 rounded-xl bg-luot-bg flex justify-between">
                <span className="font-semibold text-luot-teal">Project Viva</span>
                <span className="text-luot-teal/70">04 Dec 2026</span>
              </div>
              <div className="p-3 rounded-xl bg-luot-bg flex justify-between">
                <span className="font-semibold text-luot-teal">End-Sem Theory</span>
                <span className="text-luot-teal/70">12 Dec 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

