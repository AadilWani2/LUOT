import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { name: 'About', path: '/about' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Curriculum', path: '/curriculum' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Notices', path: '/notices' },
  ];

  const dashboardPath =
    user?.role === 'super_admin'
      ? '/principal/dashboard'
      : user?.role === 'hod'
      ? '/hod/dashboard'
      : '/student/dashboard';

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Minimal Brand Mark */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-2.5"
        >
          <span className="font-serif text-2xl font-semibold tracking-tight text-luot-teal">
            LUOT
          </span>
          <span className="hidden sm:inline text-xs text-stone-500 font-normal">
            Loyal University Of Technology
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-[13px] transition-colors ${
                  isActive
                    ? 'text-luot-teal font-medium'
                    : 'text-stone-500 hover:text-luot-teal'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to={dashboardPath}
                className="text-[13px] font-medium text-luot-teal hover:opacity-75 transition-opacity"
              >
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                title="Log out"
                className="p-2 rounded-full text-stone-400 hover:text-red-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login/faculty"
                className="text-[13px] text-stone-500 hover:text-luot-teal transition-colors"
              >
                Faculty
              </Link>
              <Link
                to="/login/student"
                className="px-4 py-1.5 rounded-full bg-luot-teal text-white text-[13px] font-medium hover:bg-luot-teal-dark transition-colors"
              >
                Student Portal
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-luot-teal"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Minimal Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#FAFAF9] border-b border-stone-200 px-5 py-6 space-y-5">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-base font-medium text-luot-teal"
            >
              Home
            </Link>
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className="text-base text-stone-600 hover:text-luot-teal"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col gap-2.5">
            {user ? (
              <>
                <Link
                  to={dashboardPath}
                  onClick={() => setOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-luot-teal text-white text-center text-sm font-medium"
                >
                  Open Dashboard ({user.name})
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-lg border border-stone-200 text-stone-600 text-sm font-medium"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login/student"
                  onClick={() => setOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-luot-teal text-white text-center text-sm font-medium"
                >
                  Student Login
                </Link>
                <Link
                  to="/login/faculty"
                  onClick={() => setOpen(false)}
                  className="w-full py-2.5 rounded-lg border border-stone-300 text-luot-teal text-center text-sm font-medium"
                >
                  Faculty / Principal Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
