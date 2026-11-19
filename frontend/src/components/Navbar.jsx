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
  PhoneCall,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu on location change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About LUOT', path: '/about', icon: Info },
    { name: 'Admissions 2026', path: '/admissions', icon: GraduationCap },
    { name: 'Curriculum & Syllabi', path: '/curriculum', icon: BookOpen },
    { name: 'Campus Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'Notice Board', path: '/notices', icon: Bell },
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

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-luot-bg/95 backdrop-blur-md border-b border-luot-teal/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Monogram */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
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

            {/* Desktop Navigation Links */}
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
                    className="px-4 py-2 text-xs font-semibold rounded-full bg-luot-teal text-white hover:bg-luot-teal-dark inline-flex items-center gap-1.5 transition-colors"
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

            {/* Mobile Top Controls */}
            <div className="flex md:hidden items-center gap-2">
              {user ? (
                <Link
                  to={dashboardPath}
                  className="px-3 py-1.5 rounded-full bg-luot-teal text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
                >
                  <LayoutDashboard size={13} /> Dashboard
                </Link>
              ) : (
                <Link
                  to="/login/student"
                  className="px-3 py-1.5 rounded-full bg-luot-teal text-white text-xs font-semibold shadow-xs"
                >
                  Portal
                </Link>
              )}
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-xl bg-white border border-luot-teal/15 text-luot-teal shadow-xs active:scale-95 transition-transform cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-backdrop-in"
          />

          {/* Drawer Content */}
          <aside className="relative z-10 w-[85%] max-w-sm h-full bg-luot-bg shadow-2xl flex flex-col animate-drawer-in">
            {/* Top Brand Banner */}
            <div className="bg-luot-teal text-white px-5 py-4 flex items-center justify-between">
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight">LUOT</span>
                <p className="text-[10px] tracking-widest uppercase text-luot-gold font-semibold">
                  Loyal University
                </p>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer active:scale-95 transition-transform"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* User Session Info or Quick Auth */}
            <div className="p-4 border-b border-luot-teal/10">
              {user ? (
                <div className="p-4 rounded-2xl bg-white border border-luot-teal/10 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-luot-teal text-luot-gold font-serif font-bold text-lg flex items-center justify-center shrink-0">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-serif text-sm font-bold text-luot-teal truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] font-semibold text-luot-teal/65 uppercase truncate">
                        {user.role === 'student'
                          ? `Sem ${user.semester} • ${user.department}`
                          : user.role === 'super_admin'
                          ? 'Principal'
                          : `HOD • ${user.department}`}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-luot-teal/10">
                    <Link
                      to={dashboardPath}
                      onClick={() => setMenuOpen(false)}
                      className="py-2 rounded-xl bg-luot-teal text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <LayoutDashboard size={13} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogOut size={13} /> Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login/student"
                    onClick={() => setMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl bg-luot-teal text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <GraduationCap size={15} className="text-luot-gold" />
                    Student Login
                  </Link>
                  <Link
                    to="/login/faculty"
                    onClick={() => setMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl border border-luot-teal/25 bg-white text-luot-teal text-xs font-bold text-center flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck size={15} />
                    Faculty Login
                  </Link>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
              {navLinks.map(({ name, path, icon: Icon }) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-luot-teal text-white shadow-xs'
                        : 'bg-white/80 text-luot-teal/85 hover:bg-white border border-luot-teal/5'
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
                        {name}
                      </span>
                      <ChevronRight
                        size={16}
                        className={isActive ? 'text-luot-gold' : 'text-luot-teal/35'}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Drawer Footer Contact */}
            <div className="p-4 bg-white border-t border-luot-teal/10 text-xs text-luot-teal/70 space-y-1">
              <div className="flex items-center gap-2 font-medium text-luot-teal">
                <PhoneCall size={13} className="text-luot-gold shrink-0" />
                <span>Admissions: +91 98765 43210</span>
              </div>
              <p className="text-[11px] text-luot-teal/50">
                Loyal University Of Technology • Tech City Campus
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
