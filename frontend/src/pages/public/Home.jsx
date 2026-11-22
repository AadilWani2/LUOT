import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import NoticeCard from '../../components/NoticeCard';
import SEO from '../../components/SEO';

const DEPARTMENTS = [
  { name: 'Computer Science & Engineering', degree: 'B.Tech · 4 Years' },
  { name: 'Artificial Intelligence & Data Science', degree: 'B.Tech · 4 Years' },
  { name: 'Electronics & Communication', degree: 'B.Tech · 4 Years' },
  { name: 'Information Technology', degree: 'B.Tech · 4 Years' },
  { name: 'Mechanical Engineering', degree: 'B.Tech · 4 Years' },
  { name: 'Civil Engineering', degree: 'B.Tech · 4 Years' },
];

export default function Home() {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const dashboardPath =
    user?.role === 'super_admin'
      ? '/principal/dashboard'
      : user?.role === 'hod'
      ? '/hod/dashboard'
      : '/student/dashboard';

  useEffect(() => {
    api
      .get('/notices/public')
      .then(({ data }) => setNotices(data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      <SEO
        title="Premier Engineering & Technology Institute"
        description="Loyal University Of Technology (LUOT) is a leading institution offering accredited B.Tech, BCA, MCA, and M.Tech degrees in Computer Science, AI/ML, and Electronics. Apply for 2026–27."
        canonical="/"
        keywords="LUOT, Loyal University Of Technology, engineering college, B.Tech admissions 2026, computer science engineering, technology institute"
      />

      {/* 1. Minimal Editorial Hero */}
      <section className="pt-14 sm:pt-24 pb-12 sm:pb-16">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-5">
          Admissions Open · Academic Year 2026–27
        </p>

        <h1 className="font-serif text-4xl sm:text-6xl font-medium text-luot-teal leading-[1.08] max-w-3xl">
          Engineering education built on rigor, research, and clarity.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
          Loyal University Of Technology prepares engineers and researchers
          through hands-on laboratories, industry mentorship, and transparent
          academic governance.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/admissions"
            className="px-6 py-3 rounded-full bg-luot-teal text-white text-sm font-medium hover:bg-luot-teal-dark transition-colors inline-flex items-center gap-2"
          >
            Apply for Admission <ArrowRight size={15} />
          </Link>
          <Link
            to={user ? dashboardPath : '/login/student'}
            className="px-6 py-3 rounded-full border border-stone-300 text-luot-teal text-sm font-medium hover:border-luot-teal transition-colors"
          >
            {user ? 'Open My Portal' : 'Student Portal'}
          </Link>
        </div>
      </section>

      {/* 2. Clean Campus Frame */}
      <section className="pb-16 sm:pb-24">
        <div className="rounded-2xl overflow-hidden bg-stone-200 aspect-[16/10] sm:aspect-[21/9]">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=85"
            alt="Loyal University Of Technology Campus"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Minimal Metrics Row */}
        <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-stone-200">
          <div>
            <p className="font-serif text-2xl sm:text-3xl font-medium text-luot-teal">
              95%
            </p>
            <p className="text-xs text-stone-500 mt-1">Placement Rate</p>
          </div>
          <div>
            <p className="font-serif text-2xl sm:text-3xl font-medium text-luot-teal">
              6 Schools
            </p>
            <p className="text-xs text-stone-500 mt-1">B.Tech Programs</p>
          </div>
          <div>
            <p className="font-serif text-2xl sm:text-3xl font-medium text-luot-teal">
              120+
            </p>
            <p className="text-xs text-stone-500 mt-1">Industry Partners</p>
          </div>
        </div>
      </section>

      {/* 3. Live Public Notice Board */}
      <section className="py-16 border-t border-stone-200">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
              Circulars
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-luot-teal mt-1">
              Latest Notices
            </h2>
          </div>
          <Link
            to="/notices"
            className="text-xs font-medium text-luot-teal hover:text-luot-gold inline-flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 rounded-xl bg-white border border-stone-200 animate-pulse"
              />
            ))}
          </div>
        ) : notices.length === 0 ? (
          <p className="text-sm text-stone-500 py-8">
            No public notices published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {notices.map((notice) => (
              <NoticeCard key={notice._id} notice={notice} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Minimalist Departments Index */}
      <section className="py-16 border-t border-stone-200">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
              Academics
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-luot-teal mt-1">
              Departments
            </h2>
          </div>
          <Link
            to="/curriculum"
            className="text-xs font-medium text-luot-teal hover:text-luot-gold inline-flex items-center gap-1 transition-colors"
          >
            Full syllabus <ArrowRight size={14} />
          </Link>
        </div>

        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.name}
              to="/curriculum"
              className="group py-5 flex items-center justify-between gap-4 hover:px-2 transition-all"
            >
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-luot-teal group-hover:text-luot-gold transition-colors">
                  {dept.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{dept.degree}</p>
              </div>
              <ArrowUpRight
                size={18}
                className="text-stone-400 group-hover:text-luot-teal transition-colors shrink-0"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Calm Closing Note */}
      <section className="py-20 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="max-w-lg">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-luot-teal">
            Ready to join Loyal University Of Technology?
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Review eligibility criteria, explore the campus gallery, or submit
            your application online.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/admissions"
            className="px-6 py-3 rounded-full bg-luot-teal text-white text-sm font-medium hover:bg-luot-teal-dark transition-colors"
          >
            Apply Now
          </Link>
          <Link
            to="/gallery"
            className="px-6 py-3 rounded-full border border-stone-300 text-luot-teal text-sm font-medium hover:border-luot-teal transition-colors"
          >
            Campus Tour
          </Link>
        </div>
      </section>
    </div>
  );
}
