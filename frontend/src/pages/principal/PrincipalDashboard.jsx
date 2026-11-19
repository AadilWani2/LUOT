import { useEffect, useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  UserX,
  UserPlus,
  Trash2,
  Bell,
  Send,
  FileUp,
} from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import NoticeCard from '../../components/NoticeCard';

const DEPARTMENTS = [
  'Computer Science',
  'Electronics & Comm.',
  'AI & Data Science',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
];

export default function PrincipalDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('hods'); // hods | notices
  const [hods, setHods] = useState([]);
  const [notices, setNotices] = useState([]);

  // Add HOD Directly State
  const [newHod, setNewHod] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Computer Science',
  });

  // Notice State
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    content: '',
    category: 'General',
    targetSemester: 'ALL',
    isUrgent: true,
  });
  const [pdfFile, setPdfFile] = useState(null);

  const fetchAll = async () => {
    try {
      const [hodRes, noticeRes] = await Promise.all([
        api.get('/principal/hods'),
        api.get('/notices/my'),
      ]);
      setHods(hodRes.data);
      setNotices(noticeRes.data);
    } catch (err) {
      console.error('Error loading Principal dashboard:', err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await api.patch(`/principal/hods/${id}/status`, { status });
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Status update failed');
    }
  };

  const handleAddHod = async (e) => {
    e.preventDefault();
    try {
      await api.post('/principal/hods', newHod);
      setNewHod({ name: '', email: '', password: '', department: 'Computer Science' });
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not add HOD');
    }
  };

  const handleDeleteHod = async (id) => {
    if (!window.confirm('Remove this HOD account permanently?')) return;
    try {
      await api.delete(`/principal/hods/${id}`);
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not remove HOD');
    }
  };

  const handlePublishNotice = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(noticeForm).forEach(([k, v]) => formData.append(k, v));
      if (pdfFile) formData.append('pdf', pdfFile);
      await api.post('/notices', formData);
      setNoticeForm({ title: '', content: '', category: 'General', targetSemester: 'ALL', isUrgent: true });
      setPdfFile(null);
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to publish notice');
    }
  };

  const pendingCount = hods.filter((h) => h.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      {/* Principal Header */}
      <div className="bg-luot-teal text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luot-gold text-luot-teal text-xs font-bold mb-2">
            <ShieldCheck size={14} /> Principal — Super Admin
          </span>
          <h1 className="font-serif text-3xl font-bold">{user?.name}</h1>
          <p className="text-xs text-white/75 mt-1">
            Loyal University Of Technology • Central Administration
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab('hods')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer ${
              tab === 'hods' ? 'bg-luot-gold text-luot-teal' : 'bg-white/10 text-white'
            }`}
          >
            Manage HODs {pendingCount > 0 && `(${pendingCount} Pending)`}
          </button>
          <button
            onClick={() => setTab('notices')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
              tab === 'notices' ? 'bg-luot-gold text-luot-teal' : 'bg-white/10 text-white'
            }`}
          >
            <Bell size={14} /> Official Notices
          </button>
        </div>
      </div>

      {tab === 'hods' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add HOD Directly */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-luot-teal/10 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-luot-teal mb-4 flex items-center gap-2">
                <UserPlus size={18} className="text-luot-gold" /> Add HOD Directly
              </h2>
              <form onSubmit={handleAddHod} className="space-y-3.5">
                <input
                  required
                  placeholder="HOD Full Name"
                  value={newHod.name}
                  onChange={(e) => setNewHod({ ...newHod, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Official Email"
                  value={newHod.email}
                  onChange={(e) => setNewHod({ ...newHod, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm"
                />
                <input
                  required
                  type="password"
                  minLength={6}
                  placeholder="Initial Password"
                  value={newHod.password}
                  onChange={(e) => setNewHod({ ...newHod, password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm"
                />
                <select
                  value={newHod.department}
                  onChange={(e) => setNewHod({ ...newHod, department: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm bg-white"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-luot-teal hover:bg-luot-teal-dark text-white font-semibold text-sm cursor-pointer"
                >
                  Create Approved HOD
                </button>
              </form>
            </div>
          </div>

          {/* HOD Approval & Directory List */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-serif text-xl font-bold text-luot-teal">
              HOD Registrations & Directory ({hods.length})
            </h2>

            {hods.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center text-sm text-luot-teal/65 border border-luot-teal/10">
                No HOD accounts yet. Add one on the left or wait for HOD registration requests.
              </div>
            ) : (
              hods.map((hod) => (
                <div
                  key={hod._id}
                  className="bg-white rounded-2xl p-5 border border-luot-teal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-lg font-bold text-luot-teal">
                        {hod.name}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                          hod.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700'
                            : hod.status === 'pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {hod.status}
                      </span>
                    </div>
                    <p className="text-xs text-luot-teal/75">
                      Department of <strong>{hod.department}</strong> · {hod.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {hod.status !== 'approved' && (
                      <button
                        onClick={() => handleStatus(hod._id, 'approved')}
                        className="px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <UserCheck size={14} /> Approve
                      </button>
                    )}
                    {hod.status === 'pending' && (
                      <button
                        onClick={() => handleStatus(hod._id, 'rejected')}
                        className="px-3.5 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <UserX size={14} /> Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteHod(hod._id)}
                      className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                      title="Remove HOD"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Principal Official Notice Publisher */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 border border-luot-teal/10">
              <h2 className="font-serif text-xl font-bold text-luot-teal mb-4">
                Issue Principal Circular
              </h2>
              <form onSubmit={handlePublishNotice} className="space-y-4">
                <input
                  required
                  placeholder="Circular Title"
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Circular details..."
                  value={noticeForm.content}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm"
                />
                <label className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-luot-teal/30 text-xs text-luot-teal cursor-pointer">
                  <FileUp size={16} className="text-luot-gold" />
                  <span>{pdfFile ? pdfFile.name : 'Attach PDF Circular (Optional)'}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files[0] || null)}
                    className="hidden"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-luot-teal text-white font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={15} /> Publish All-College Circular
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {notices.map((n) => (
              <NoticeCard key={n._id} notice={n} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}