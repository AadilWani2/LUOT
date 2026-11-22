import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <span className="font-serif text-xl font-semibold text-luot-teal">
            LUOT
          </span>
          <p className="text-xs text-stone-500 mt-1">
            Loyal University Of Technology · Engineering &amp; Applied Research
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-xs text-stone-500">
          <Link to="/about" className="hover:text-luot-teal">About</Link>
          <Link to="/admissions" className="hover:text-luot-teal">Admissions</Link>
          <Link to="/curriculum" className="hover:text-luot-teal">Curriculum</Link>
          <Link to="/gallery" className="hover:text-luot-teal">Gallery</Link>
          <Link to="/notices" className="hover:text-luot-teal">Notices</Link>
          <Link to="/login/student" className="hover:text-luot-teal">Student Portal</Link>
        </div>
      </div>

      <div className="border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} Loyal University Of Technology. All rights reserved.</p>
          <p>admissions@luot.edu.in</p>
        </div>
      </div>
    </footer>
  );
}
