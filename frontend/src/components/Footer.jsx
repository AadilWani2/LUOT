import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-luot-teal text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <span className="font-serif text-3xl font-bold tracking-tight">LUOT</span>
          <p className="mt-3 text-sm text-white/75 max-w-md leading-relaxed">
            Loyal University Of Technology is dedicated to research-driven engineering,
            computing, and applied sciences—preparing students for real-world innovation.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold mb-4 text-luot-gold">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-white">About LUOT</Link></li>
            <li><Link to="/admissions" className="hover:text-white">Admissions 2026</Link></li>
            <li><Link to="/curriculum" className="hover:text-white">Curriculum</Link></li>
            <li><Link to="/notices" className="hover:text-white">Notice Board</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold mb-4 text-luot-gold">
            Portals
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/login/student" className="hover:text-white">Student Login</Link></li>
            <li><Link to="/login/faculty" className="hover:text-white">Faculty / HOD Login</Link></li>
            <li><Link to="/register" className="hover:text-white">New Registration</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Loyal University Of Technology (LUOT). All rights reserved.
      </div>
    </footer>
  );
}