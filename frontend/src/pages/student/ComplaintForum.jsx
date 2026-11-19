import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquareWarning,
} from 'lucide-react';
import api from '../../api/axios';

const CATEGORIES = ['Academics', 'Infrastructure', 'Hostel', 'Examination', 'General'];

const STATUS_BADGE = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  'In Review': 'bg-blue-50 text-blue-700 border-blue-200',
  Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function ComplaintForum() {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({
    category: 'Academics',
    subject: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get('/complaints/my');
      setComplaints(data);
    } catch (err) {
      console.error('Failed to load complaints:', err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    try {
      await api.post('/complaints', form);
      setForm({ category: 'Academics', subject: '', description: '' });
      setSuccess('Your complaint has been submitted to your Departmental HOD & Principal.');
      fetchComplaints();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      <Link
        to="/student/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-luot-teal/70 hover:text-luot-teal mb-6"
      >
        <ArrowLeft size={14} /> Back to Student Dashboard
      </Link>

      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
          Student Grievance Cell
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luot-teal mt-1">
          Student Complaint Forum
        </h1>
        <p className="text-sm text-luot-teal/75 mt-2">
          Submit academic, infrastructure, or examination grievances directly to your HOD and track resolution status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Submit Complaint Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-luot-teal/10 shadow-xs">
            <h2 className="font-serif text-xl font-bold text-luot-teal mb-4 flex items-center gap-2">
              <MessageSquareWarning size={19} className="text-luot-gold" />
              Raise a New Ticket
            </h2>

            {success && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 size={15} className="shrink-0" />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-luot-teal mb-1.5">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm bg-white focus:outline-none focus:border-luot-teal"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-luot-teal mb-1.5">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Lab workstation issue in Room 204"
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-luot-teal mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your issue clearly..."
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-full bg-luot-teal hover:bg-luot-teal-dark text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
              >
                <Send size={15} />
                {submitting ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </form>
          </div>
        </div>

        {/* Submitted Tickets List */}
        <div className="lg:col-span-7">
          <h2 className="font-serif text-xl font-bold text-luot-teal mb-4">
            My Submitted Tickets ({complaints.length})
          </h2>

          {complaints.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-luot-teal/10 text-sm text-luot-teal/65">
              You have not raised any complaints yet.
            </div>
          ) : (
            <div className="space-y-4">
              {complaints.map((c) => (
                <div
                  key={c._id}
                  className="bg-white rounded-2xl p-5 border border-luot-teal/10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-luot-teal/10 text-luot-teal text-xs font-semibold">
                      {c.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border inline-flex items-center gap-1 ${
                        STATUS_BADGE[c.status] || STATUS_BADGE.Pending
                      }`}
                    >
                      {c.status === 'Resolved' ? (
                        <CheckCircle2 size={12} />
                      ) : c.status === 'In Review' ? (
                        <Clock size={12} />
                      ) : (
                        <AlertCircle size={12} />
                      )}
                      {c.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-luot-teal">
                    {c.subject}
                  </h3>
                  <p className="text-xs text-luot-teal/75 mt-1 leading-relaxed">
                    {c.description}
                  </p>

                  {c.adminRemarks && (
                    <div className="mt-3 p-3 rounded-xl bg-luot-bg text-xs text-luot-teal">
                      <span className="font-bold">Admin Remarks:</span> {c.adminRemarks}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

