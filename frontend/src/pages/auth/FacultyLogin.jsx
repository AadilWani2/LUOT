import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

export default function FacultyLogin() {
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
        portal: 'faculty',
      });
      loginSuccess(data.token, data.user);

      if (data.user.role === 'super_admin') {
        navigate('/principal/dashboard');
      } else {
        navigate('/hod/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-16 animate-fade-up">
      <SEO
        title="Faculty & Administration Portal Login"
        description="Authorized administrative access for Loyal University Of Technology Principal, Academic Deans, and Departmental HODs."
        canonical="/login/faculty"
        noIndex={true}
      />
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-luot-teal/10 shadow-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luot-gold/25 text-luot-teal text-xs font-bold mb-4">
          <ShieldCheck size={15} />
          Faculty / HOD / Principal Portal
        </div>

        <h1 className="font-serif text-3xl font-bold text-luot-teal">
          Faculty Login
        </h1>
        <p className="text-xs text-luot-teal/70 mt-1.5 mb-6">
          Authorized access for Principal & approved Departmental HODs.
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
              Official Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="principal@luot.edu.in"
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
            className="w-full py-3 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm transition-colors cursor-pointer disabled:opacity-60"
          >
            {submitting ? 'Verifying...' : 'Sign In to Admin Portal'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-luot-teal/70">
          New Departmental HOD?{' '}
          <Link to="/register" className="font-bold text-luot-teal underline">
            Request HOD Account
          </Link>
        </p>
      </div>
    </div>
  );
}