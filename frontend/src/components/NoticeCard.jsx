import { FileText, Calendar, AlertCircle, Building2, Trash2 } from 'lucide-react';
import { API_BASE_URL } from '../api/axios';

export default function NoticeCard({ notice, onDelete }) {
  const formattedDate = new Date(notice.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const resolvedPdfUrl = notice.pdfUrl
    ? notice.pdfUrl.startsWith('/uploads')
      ? `${API_BASE_URL}${notice.pdfUrl}`
      : notice.pdfUrl
    : null;

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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
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
          <Calendar size={13} /> {formattedDate}
        </span>
      </div>

      {/* Title & Body */}
      <h3 className="font-serif text-lg font-semibold text-luot-teal mb-2">
        {notice.title}
      </h3>
      <p className="text-sm text-luot-teal/75 leading-relaxed mb-4">
        {notice.content}
      </p>

      {/* Footer: Sender, PDF & Optional Delete */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-luot-teal/10">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-luot-teal/70">
          <Building2 size={14} /> {notice.postedByRole} — {notice.department}
        </span>

        <div className="flex items-center gap-3">
          {resolvedPdfUrl && (
            <a
              href={resolvedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-luot-teal hover:text-luot-gold transition-colors"
            >
              <FileText size={14} /> Download Circular (PDF)
            </a>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition-colors cursor-pointer"
              title="Delete Notice"
            >
              <Trash2 size={13} /> Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
