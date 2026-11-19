import { useEffect, useState } from 'react';
import {
  Send,
  FileUp,
  Trash2,
  MessageSquareWarning,
  Bell,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import NoticeCard from '../../components/NoticeCard';

export default function HodDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('notices'); // notices | complaints
  const [notices, setNotices] = useState([]);
  const [complaints, setComplaints] = useState([]);

  // Notice Form State
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'Academics',
    targetSemester: 'ALL',
    isUrgent: false,
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [feedback, setFeedback] = useState('');

  const fetchData = async () => {
    try {
      const [noticeRes, compRes] = await Promise.all([
        api.get('/notices/my'),
        api.get('/complaints/admin'),
      ]);
      setNotices(noticeRes.data);
      setComplaints(compRes.data);
    } catch (err) {
      console.error('Error loading HOD data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePublish = async (e) => {
    e.preventDefault();
    setPublishing(true);
    setFeedback('');

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      formData.append('category', form.category);
      formData.append('targetSemester', form.targetSemester);
      formData.append('isUrgent', form.isUrgent);
      if (pdfFile) formData.append('pdf', pdfFile);

      await api.post('/notices', formData);
      setForm({
        title: '',
        content: '',
        category: 'Academics',
        targetSemester: 'ALL',
        isUrgent: false,
      });
      setPdfFile(null);
      setFeedback('Notice published successfully!');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to publish notice');
    } finally {
      setPublishing(false);
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Delete this notice?')) return;
    try {
      await api.delete(`/notices/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete notice');
    }
  };

  const handleUpdateComplaint = async (id, status) => {
    const adminRemarks = window.prompt('Add optional remarks for the student:', '');
    if (adminRemarks === null) return;
    try {
      await api.patch(`/complaints/${id}`, { status, adminRemarks });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update complaint');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      {/* Header Banner */}
      <div className="bg-luot-teal text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luot-gold/20 text-luot-gold text-xs font-bold mb-2">
            <Building2 size={14} />
            HOD — Department of {user?.department}
          </span>
          <h1 className="font-serif text-3xl font-bold">{user?.name}</h1>
          <p className="text-xs text-white/75 mt-1">{user?.email}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'notices'
                ? 'bg-luot-gold text-luot-teal'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Bell size={15} /> Notices ({notices.length})
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'complaints'
                ? 'bg-luot-gold text-luot-teal'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <MessageSquareWarning size={15} /> Complaints ({complaints.length})
          </button>
        </div>
      </div>

      {activeTab === 'notices' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Publish Notice Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-luot-teal/10 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-luot-teal mb-4">
                Publish Official Notice
              </h2>

              {feedback && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle2 size={15} /> {feedback}
                </div>
              )}

              <form onSubmit={handlePublish} className="space-y-4">
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Notice Title"
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
                />

                <textarea
                  required
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write notice details..."
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl border border-luot-teal/20 text-sm bg-white"
                  >
                    {['General', 'Academics', 'Exams', 'Events', 'Admissions'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  <select
                    value={form.targetSemester}
                    onChange={(e) => setForm({ ...form, targetSemester: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl border border-luot-teal/20 text-sm bg-white"
                  >
                    <option value="ALL">All College</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={String(sem)}>Semester {sem}</option>
                    ))}
                  </select>
                </div>

                {/* PDF Upload */}
                <label className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-dashed border-luot-teal/30 bg-luot-bg/50 text-xs font-medium text-luot-teal cursor-pointer hover:bg-luot-bg">
                  <FileUp size={16} className="text-luot-gold shrink-0" />
                  <span className="truncate">
                    {pdfFile ? pdfFile.name : 'Attach Official Circular (PDF only, max 5MB)'}
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files[0] || null)}
                    className="hidden"
                  />
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-luot-teal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isUrgent}
                    onChange={(e) => setForm({ ...form, isUrgent: e.target.checked })}
                    className="accent-red-600"
                  />
                  Mark as Urgent / Important (Pins to top)
                </label>

                <button
                  type="submit"
                  disabled={publishing}
                  className="w-full py-3 rounded-full bg-luot-teal hover:bg-luot-teal-dark text-white font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Send size={15} />
                  {publishing ? 'Publishing...' : 'Publish Notice'}
                </button>
              </form>
            </div>
          </div>

          {/* Published Notices Feed */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif text-xl font-bold text-luot-teal">
              Published Notices
            </h2>
            {notices.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center text-sm text-luot-teal/65 border border-luot-teal/10">
                No notices published yet.
              </div>
            ) : (
              notices.map((notice) => (
                <div key={notice._id} className="relative">
                  <NoticeCard notice={notice} />
                  {notice.postedBy?._id === user?._id && (
                    <button
                      onClick={() => handleDeleteNotice(notice._id)}
                      className="absolute top-5 right-5 p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                      title="Delete Notice"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Department Complaints Tab */
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-luot-teal">
            Student Complaints — {user?.department}
          </h2>
          {complaints.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center text-sm text-luot-teal/65 border border-luot-teal/10">
              No student complaints for your department.
            </div>
          ) : (
            complaints.map((c) => (
              <div
                key={c._id}
                className="bg-white rounded-2xl p-6 border border-luot-teal/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-luot-teal/10 text-luot-teal font-semibold">
                      {c.category}
                    </span>
                    <span className="font-semibold text-luot-teal/70">
                      {c.student?.name} (Sem {c.semester} • {c.student?.rollNumber})
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-luot-teal">{c.subject}</h3>
                  <p className="text-xs text-luot-teal/75 mt-1">{c.description}</p>
                  {c.adminRemarks && (
                    <p className="text-xs text-luot-teal mt-2 bg-luot-bg px-3 py-1.5 rounded-lg inline-block">
                      <strong>Remarks:</strong> {c.adminRemarks}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  {['In Review', 'Resolved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateComplaint(c._id, st)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer ${
                        c.status === st
                          ? 'bg-luot-teal text-white'
                          : 'bg-luot-bg text-luot-teal hover:bg-luot-gold/30'
                      }`}
                    >
                      Mark {st}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}