import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, AlertCircle } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
        portal: 'student',
      });
      loginSuccess(data.token, data.user);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-16 animate-fade-up">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-luot-teal/10 shadow-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luot-teal/10 text-luot-teal text-xs font-bold mb-4">
          <GraduationCap size={15} />
          Student Portal
        </div>

        <h1 className="font-serif text-3xl font-bold text-luot-teal">
          Student Login
        </h1>
        <p className="text-xs text-luot-teal/70 mt-1.5 mb-6">
          Sign in to view your semester-specific notices, fee portal, and complaint forum.
        </p>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-luot-teal mb-1.5">
              University Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@luot.edu.in"
              className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-luot-teal mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-full bg-luot-teal hover:bg-luot-teal-dark text-white font-semibold text-sm transition-colors cursor-pointer disabled:opacity-60"
          >
            {submitting ? 'Signing in...' : 'Sign In to Student Portal'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-luot-teal/70">
          New to LUOT?{' '}
          <Link to="/register" className="font-bold text-luot-teal underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}