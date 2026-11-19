import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Home,
  Info,
  GraduationCap,
  BookOpen,
  Image as ImageIcon,
  Bell,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', path: '/', sectionId: 'top', icon: Home },
    { name: 'About', path: '/about', sectionId: 'mobile-about', icon: Info },
    { name: 'Admissions', path: '/admissions', sectionId: 'mobile-admissions', icon: GraduationCap },
    { name: 'Curriculum', path: '/curriculum', sectionId: 'mobile-curriculum', icon: BookOpen },
    { name: 'Gallery', path: '/gallery', sectionId: 'mobile-gallery', icon: ImageIcon },
    { name: 'Notices', path: '/notices', sectionId: 'mobile-notices', icon: Bell },
  ];

  const dashboardPath =
    user?.role === 'super_admin'
      ? '/principal/dashboard'
      : user?.role === 'hod'
      ? '/hod/dashboard'
      : '/student/dashboard';

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  // On mobile, if already on Home ("/"), smoothly scroll to the section on the same page
  const handleMobileJump = (e, link) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      if (link.sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(link.sectionId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Fixed Top Navbar — Always Follows Scroll */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-luot-bg/95 backdrop-blur-md border-b border-luot-teal/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand */}
            <Link
              to="/"
              onClick={(e) => handleMobileJump(e, { sectionId: 'top' })}
              className="flex items-center gap-2.5 sm:gap-3"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-luot-teal">
                LUOT
              </span>
              <div className="flex flex-col leading-tight border-l border-luot-teal/20 pl-2.5 sm:pl-3">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-luot-teal">
                  Loyal University
                </span>
                <span className="text-[9px] sm:text-[11px] font-medium tracking-widest uppercase text-luot-teal/65">
                  Of Technology
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors nav-link-underline ${
                      isActive
                        ? 'text-luot-teal font-semibold active'
                        : 'text-luot-teal/75 hover:text-luot-teal'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <div className="text-right leading-tight mr-1">
                    <p className="text-xs font-bold text-luot-teal">{user.name}</p>
                    <p className="text-[10px] font-semibold text-luot-teal/65 uppercase">
                      {user.role === 'student'
                        ? `Sem ${user.semester} • ${user.department}`
                        : user.role === 'super_admin'
                        ? 'Principal'
                        : `HOD • ${user.department}`}
                    </p>
                  </div>
                  <Link
                    to={dashboardPath}
                    className="px-4 py-2 text-xs font-semibold rounded-full bg-luot-teal text-white hover:bg-luot-teal-dark inline-flex items-center gap-1.5"
                  >
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Log Out"
                    aria-label="Log Out"
                    className="p-2.5 rounded-full border border-luot-teal/20 text-luot-teal hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                  >
                    <LogOut size={16} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login/student"
                    className="px-4 py-2 text-sm font-semibold rounded-full bg-luot-teal text-white hover:bg-luot-teal-dark transition-colors"
                  >
                    Student Login
                  </Link>
                  <Link
                    to="/login/faculty"
                    className="px-4 py-2 text-sm font-semibold rounded-full border border-luot-teal text-luot-teal hover:bg-luot-teal hover:text-white transition-colors"
                  >
                    Faculty Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Top-Right Controls */}
            <div className="flex md:hidden items-center gap-2">
              {user ? (
                <Link
                  to={dashboardPath}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1.5 rounded-full bg-luot-teal text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
                >
                  <LayoutDashboard size={13} /> Portal
                </Link>
              ) : (
                <Link
                  to="/login/student"
                  className="px-3.5 py-1.5 rounded-full bg-luot-teal text-white text-xs font-semibold shadow-xs"
                >
                  Login
                </Link>
              )}
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-xl bg-white border border-luot-teal/15 text-luot-teal shadow-xs active:scale-95 transition-transform"
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar — Tap Anywhere While Scrolling */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-luot-teal/10 shadow-[0_-4px_20px_rgba(11,59,54,0.08)]">
        <div className="grid grid-cols-5 h-16 px-1">
          {[
            { name: 'Home', path: '/', sectionId: 'top', icon: Home },
            { name: 'About', path: '/about', sectionId: 'mobile-about', icon: Info },
            { name: 'Admit', path: '/admissions', sectionId: 'mobile-admissions', icon: GraduationCap },
            { name: 'Courses', path: '/curriculum', sectionId: 'mobile-curriculum', icon: BookOpen },
            {
              name: user ? 'Portal' : 'Login',
              path: user ? dashboardPath : '/login/student',
              sectionId: null,
              icon: user ? LayoutDashboard : User,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => item.sectionId && handleMobileJump(e, item)}
                className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-luot-teal' : 'text-luot-teal/55'
                }`}
              >
                <span
                  className={`p-1.5 rounded-xl transition-colors ${
                    isActive ? 'bg-luot-gold/30 text-luot-teal' : ''
                  }`}
                >
                  <Icon size={18} />
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Slide-Over Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-luot-teal/40 backdrop-blur-xs animate-backdrop-in"
          />

          <aside className="relative z-10 w-[85%] max-w-xs h-full bg-luot-bg shadow-2xl flex flex-col animate-drawer-in">
            <div className="bg-luot-teal text-white px-5 py-5 flex items-center justify-between">
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight">LUOT</span>
                <p className="text-[10px] tracking-widest uppercase text-luot-gold font-semibold">
                  Navigation Menu
                </p>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {user && (
              <div className="mx-4 mt-4 p-4 rounded-2xl bg-white border border-luot-teal/10 shadow-xs">
                <p className="font-serif text-base font-bold text-luot-teal truncate">
                  {user.name}
                </p>
                <p className="text-[11px] font-semibold text-luot-teal/65 mt-0.5">
                  {user.role === 'student'
                    ? `Semester ${user.semester} • ${user.department}`
                    : user.role === 'super_admin'
                    ? 'Principal (Super Admin)'
                    : `HOD • ${user.department}`}
                </p>
                <Link
                  to={dashboardPath}
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 w-full py-2 rounded-xl bg-luot-teal text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <LayoutDashboard size={14} /> Open My Dashboard
                </Link>
              </div>
            )}

            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={(e) => handleMobileJump(e, link)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-luot-teal text-white shadow-sm'
                          : 'bg-white/70 text-luot-teal/85 hover:bg-white border border-luot-teal/5'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-center gap-3">
                          <Icon
                            size={18}
                            className={isActive ? 'text-luot-gold' : 'text-luot-teal/60'}
                          />
                          {link.name}
                        </span>
                        <ChevronRight
                          size={16}
                          className={isActive ? 'text-luot-gold' : 'text-luot-teal/35'}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <div className="p-4 bg-white border-t border-luot-teal/10">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut size={16} /> Log Out of Account
                </button>
              ) : (
                <div className="space-y-2.5">
                  <Link
                    to="/login/student"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-3 rounded-xl bg-luot-teal text-white text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <GraduationCap size={16} className="text-luot-gold" />
                    Student Portal Login
                  </Link>
                  <Link
                    to="/login/faculty"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-3 rounded-xl border border-luot-teal/25 text-luot-teal text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={16} />
                    Faculty / Principal Login
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
