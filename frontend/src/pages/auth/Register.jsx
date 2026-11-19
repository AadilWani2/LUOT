import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const DEPARTMENTS = [
  'Computer Science',
  'Electronics & Comm.',
  'AI & Data Science',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
];

export default function Register() {
  const [role, setRole] = useState('student');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Computer Science',
    rollNumber: '',
    semester: '1',
  });
  const [error, setError] = useState('');
  const [pendingMsg, setPendingMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPendingMsg('');
    setSubmitting(true);

    try {
      const { data } = await api.post('/auth/register', { ...form, role });

      if (data.pendingApproval) {
        setPendingMsg(data.message);
      } else {
        loginSuccess(data.token, data.user);
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-14 animate-fade-up">
      <div className="bg-white rounded-3xl p-8 border border-luot-teal/10 shadow-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luot-teal/10 text-luot-teal text-xs font-bold mb-4">
          <UserPlus size={15} />
          LUOT Account Registration
        </div>

        <h1 className="font-serif text-3xl font-bold text-luot-teal">
          Create your account
        </h1>

        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-luot-bg rounded-2xl my-6 border border-luot-teal/10">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              role === 'student'
                ? 'bg-luot-teal text-white'
                : 'text-luot-teal/70 hover:text-luot-teal'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('hod')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              role === 'hod'
                ? 'bg-luot-gold text-luot-teal'
                : 'text-luot-teal/70 hover:text-luot-teal'
            }`}
          >
            Departmental HOD
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            {error}
          </div>
        )}

        {pendingMsg ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <CheckCircle2 size={36} className="mx-auto text-emerald-600 mb-3" />
            <h3 className="font-serif text-xl font-bold text-luot-teal">
              Approval Pending
            </h3>
            <p className="text-xs text-luot-teal/80 mt-2 leading-relaxed">
              {pendingMsg}
            </p>
            <Link
              to="/login/faculty"
              className="inline-block mt-5 px-5 py-2.5 rounded-full bg-luot-teal text-white text-xs font-semibold"
            >
              Go to Faculty Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
            />

            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
            />

            <input
              name="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              placeholder="Password (min. 6 characters)"
              className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
            />

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm bg-white focus:outline-none focus:border-luot-teal"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {role === 'student' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="rollNumber"
                  required
                  value={form.rollNumber}
                  onChange={handleChange}
                  placeholder="Roll Number (e.g. LUOT2026CS01)"
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
                />
                <select
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm bg-white focus:outline-none focus:border-luot-teal"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {role === 'hod' && (
              <p className="text-[11px] text-luot-teal/70 bg-luot-gold/15 p-3 rounded-xl">
                Note: HOD accounts require approval from the <strong>Principal</strong> before you can log in and publish notices.
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-full bg-luot-teal hover:bg-luot-teal-dark text-white font-semibold text-sm transition-colors cursor-pointer disabled:opacity-60"
            >
              {submitting
                ? 'Creating Account...'
                : role === 'student'
                ? 'Register as Student'
                : 'Request HOD Registration'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-luot-teal/70">
          Already have an account?{' '}
          <Link to="/login/student" className="font-bold text-luot-teal underline">
            Student Login
          </Link>{' '}
          ·{' '}
          <Link to="/login/faculty" className="font-bold text-luot-teal underline">
            Faculty Login
          </Link>
        </p>
      </div>
    </div>
  );
}