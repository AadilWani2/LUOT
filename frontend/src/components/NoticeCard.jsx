import { FileText, Calendar, AlertCircle, Building2 } from 'lucide-react';
import { API_BASE_URL } from '../api/axios';

export default function NoticeCard({ notice }) {
  const formattedDate = new Date(notice.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article
      className={`bg-white rounded-2xl p-6 border transition-all hover:shadow-md ${
        notice.isUrgent
          ? 'border-l-4 border-l-red-600 border-t-luot-teal/10 border-r-luot-teal/10 border-b-luot-teal/10'
          : 'border-luot-teal/10'
      }`}
    >
      {/* Top Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {notice.isUrgent && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
              <AlertCircle size={12} />
              Urgent
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-luot-teal/10 text-luot-teal">
            {notice.targetSemester === 'ALL'
              ? 'All College'
              : `Semester ${notice.targetSemester}`}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-luot-gold/20 text-luot-teal">
            {notice.category}
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs text-luot-teal/60">
          <Calendar size={13} />
          {formattedDate}
        </span>
      </div>

      {/* Title & Body */}
      <h3 className="font-serif text-lg font-semibold text-luot-teal mb-2">
        {notice.title}
      </h3>
      <p className="text-sm text-luot-teal/75 leading-relaxed mb-4">
        {notice.content}
      </p>

      {/* Footer: Sender & PDF */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-luot-teal/10">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-luot-teal/70">
          <Building2 size={14} />
          {notice.postedByRole} — {notice.department}
        </span>

        {notice.pdfUrl && (
          <a
            href={
              notice.pdfUrl.startsWith('/uploads')
                ? `${API_BASE_URL}${notice.pdfUrl}`
                : notice.pdfUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-luot-teal hover:text-luot-gold transition-colors"
          >
            <FileText size={14} />
            Download Circular (PDF)
          </a>
        )}
      </div>
    </article>
  );
}