import { FileText, Trash2 } from 'lucide-react';
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
    <article className="bg-white rounded-xl p-6 border border-stone-200/90 hover:border-stone-300 transition-colors flex flex-col justify-between">
      <div>
        {/* Minimal Meta Line */}
        <div className="flex items-center justify-between gap-3 text-xs text-stone-500 mb-3">
          <div className="flex items-center gap-2">
            {notice.isUrgent && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" title="Urgent" />
            )}
            <span className="font-medium text-luot-teal">
              {notice.targetSemester === 'ALL'
                ? 'All College'
                : `Semester ${notice.targetSemester}`}
            </span>
            <span>·</span>
            <span>{notice.category}</span>
          </div>
          <time className="tabular-nums">{formattedDate}</time>
        </div>

        {/* Content */}
        <h3 className="font-serif text-lg font-medium text-luot-teal leading-snug">
          {notice.title}
        </h3>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
          {notice.content}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
        <span className="text-stone-500">
          {notice.postedByRole} · {notice.department}
        </span>

        <div className="flex items-center gap-3">
          {resolvedPdfUrl && (
            <a
              href={resolvedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-luot-teal hover:text-luot-gold transition-colors"
            >
              <FileText size={14} />
              PDF
            </a>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-1 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
              title="Delete notice"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
