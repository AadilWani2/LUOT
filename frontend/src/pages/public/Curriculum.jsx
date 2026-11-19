import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Search,
  FileDown,
  Cpu,
  Radio,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';
import SEO from '../../components/SEO';

const DEPARTMENT_META = {
  'Computer Science': {
    icon: Cpu,
    degree: 'B.Tech in Computer Science & Engineering',
    hod: 'Dr. Meera Nair (HOD, CSE)',
    summary:
      'Focuses on algorithms, full-stack systems, artificial intelligence, and cloud architecture with lab-intensive coursework.',
  },
  'Electronics & Comm.': {
    icon: Radio,
    degree: 'B.Tech in Electronics & Communication',
    hod: 'Prof. Arvind Kulkarni (HOD, ECE)',
    summary:
      'Covers embedded systems, VLSI design, signal processing, and next-generation IoT & wireless networks.',
  },
};

const CURRICULUM_DATA = {
  'Computer Science': {
    1: [
      { code: 'CS101', title: 'Programming Fundamentals in C', credits: 4, type: 'Core' },
      { code: 'MA101', title: 'Engineering Mathematics I', credits: 4, type: 'Core' },
      { code: 'PH101', title: 'Applied Physics & Lab', credits: 3, type: 'Lab' },
      { code: 'HS101', title: 'Technical Communication', credits: 2, type: 'Core' },
    ],
    2: [
      { code: 'CS102', title: 'Data Structures & Algorithms', credits: 4, type: 'Core' },
      { code: 'CS104', title: 'Digital Logic Design', credits: 3, type: 'Core' },
      { code: 'MA102', title: 'Discrete Mathematics', credits: 4, type: 'Core' },
      { code: 'CS106', title: 'Web Foundations Lab (HTML/CSS/JS)', credits: 3, type: 'Lab' },
    ],
    3: [
      { code: 'CS201', title: 'Object-Oriented Programming (Java)', credits: 4, type: 'Core' },
      { code: 'CS203', title: 'Computer Organization & Architecture', credits: 4, type: 'Core' },
      { code: 'CS205', title: 'Database Management Systems', credits: 4, type: 'Core' },
      { code: 'CS207', title: 'DBMS & SQL Practical Lab', credits: 2, type: 'Lab' },
    ],
    4: [
      { code: 'CS202', title: 'Operating Systems', credits: 4, type: 'Core' },
      { code: 'CS204', title: 'Design & Analysis of Algorithms', credits: 4, type: 'Core' },
      { code: 'CS206', title: 'Software Engineering', credits: 3, type: 'Core' },
      { code: 'CS208', title: 'Linux & Shell Scripting Lab', credits: 2, type: 'Lab' },
    ],
    5: [
      { code: 'CS301', title: 'Theory of Computation', credits: 4, type: 'Core' },
      { code: 'CS303', title: 'Computer Networks', credits: 4, type: 'Core' },
      { code: 'CS305', title: 'Artificial Intelligence', credits: 4, type: 'Elective' },
      { code: 'CS307', title: 'Network Simulation Lab', credits: 2, type: 'Lab' },
    ],
    6: [
      { code: 'CS302', title: 'Machine Learning', credits: 4, type: 'Elective' },
      { code: 'CS304', title: 'Full-Stack Web Engineering', credits: 4, type: 'Core' },
      { code: 'CS306', title: 'Information & Network Security', credits: 3, type: 'Core' },
    ],
    7: [
      { code: 'CS401', title: 'Cloud Computing & Distributed Systems', credits: 4, type: 'Elective' },
      { code: 'CS403', title: 'Minor Engineering Project', credits: 4, type: 'Project' },
    ],
    8: [
      { code: 'CS402', title: 'Major Capstone Project & Industry Internship', credits: 12, type: 'Project' },
    ],
  },
  'Electronics & Comm.': {
    1: [
      { code: 'EC101', title: 'Basic Electronics Engineering', credits: 4, type: 'Core' },
      { code: 'MA101', title: 'Engineering Mathematics I', credits: 4, type: 'Core' },
      { code: 'EC103', title: 'Circuits & Measurements Lab', credits: 2, type: 'Lab' },
    ],
    2: [
      { code: 'EC102', title: 'Network Analysis & Synthesis', credits: 4, type: 'Core' },
      { code: 'EC104', title: 'Digital Electronics', credits: 4, type: 'Core' },
    ],
    3: [
      { code: 'EC201', title: 'Signals & Systems', credits: 4, type: 'Core' },
      { code: 'EC203', title: 'Analog Circuits Lab', credits: 2, type: 'Lab' },
    ],
    4: [{ code: 'EC202', title: 'Microprocessors & Embedded Systems', credits: 4, type: 'Core' }],
    5: [{ code: 'EC301', title: 'VLSI Design', credits: 4, type: 'Elective' }],
    6: [{ code: 'EC302', title: 'Wireless Communication', credits: 4, type: 'Core' }],
    7: [{ code: 'EC401', title: 'IoT & Sensor Networks', credits: 4, type: 'Elective' }],
    8: [{ code: 'EC402', title: 'Major Capstone Project', credits: 12, type: 'Project' }],
  },
};

const TYPE_STYLES = {
  Core: 'bg-luot-teal/10 text-luot-teal',
  Lab: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Elective: 'bg-luot-gold/25 text-luot-teal',
  Project: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
};

export default function Curriculum() {
  const [searchParams] = useSearchParams();
  const [department, setDepartment] = useState('Computer Science');
  const [semester, setSemester] = useState(1);
  const [filterText, setFilterText] = useState(searchParams.get('q') || '');

  const subjects = CURRICULUM_DATA[department]?.[semester] || [];
  const filteredSubjects = subjects.filter(
    (s) =>
      s.title.toLowerCase().includes(filterText.toLowerCase()) ||
      s.code.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalCredits = filteredSubjects.reduce((sum, s) => sum + s.credits, 0);
  const activeMeta = DEPARTMENT_META[department];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <SEO
        title="Academic Curriculum & Engineering Course Syllabi"
        description="Comprehensive Choice-Based Credit System (CBCS) curriculum for B.Tech in Computer Science and Electronics & Communication at LUOT. Review semester syllabi and credits."
        canonical="/curriculum"
        keywords="LUOT curriculum, engineering syllabus, B.Tech computer science subjects, ECE syllabus, semester course breakdown, credit system"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Academic Curriculum | Loyal University Of Technology',
          url: 'https://luot.edu.in/curriculum',
          description:
            'Choice-Based Credit System engineering curriculum for B.Tech CSE and ECE across Semesters 1 to 8.',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://luot.edu.in/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Curriculum',
                item: 'https://luot.edu.in/curriculum',
              },
            ],
          },
        }}
      />
      {/* 1. Split Editorial Hero with Lab Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10 sm:mb-14">
        <div className="lg:col-span-6 animate-fade-up">
          <span className="text-xs font-bold uppercase tracking-widest text-luot-gold">
            Academic Structure
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luot-teal mt-2 leading-tight">
            Curriculum designed for{' '}
            <span className="relative inline-block">
              <span className="relative z-10">real-world</span>
              <span className="absolute left-0 bottom-1 w-full h-3.5 bg-luot-gold/80 -rotate-1 z-0 rounded-xs animate-highlight" />
            </span>{' '}
            mastery.
          </h1>
          <p className="mt-5 text-base text-luot-teal/75 leading-relaxed">
            Every LUOT program follows a Choice-Based Credit System (CBCS)
            combining foundational engineering theory, hands-on laboratories,
            and final-year industry capstones.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() =>
                alert(`Downloading ${department} Complete Syllabus PDF (UI Demo)`)
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-luot-gold hover:bg-luot-gold-hover text-luot-teal font-semibold text-sm cursor-pointer transition-colors"
            >
              <FileDown size={16} />
              Download Full Syllabus (PDF)
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 animate-fade-up-delay">
          <div className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[16/10] bg-luot-teal/10">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
              alt="LUOT Computing & Engineering Curriculum"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-2.5">
              <Award size={18} className="text-luot-gold" />
              <div>
                <p className="text-xs font-bold text-luot-teal">CBCS Credit Model</p>
                <p className="text-[11px] text-luot-teal/70">8 Structured Semesters</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Department Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(DEPARTMENT_META).map(([deptName, meta]) => {
          const Icon = meta.icon;
          const isSelected = department === deptName;
          return (
            <button
              key={deptName}
              onClick={() => setDepartment(deptName)}
              className={`text-left p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-luot-teal text-white border-luot-teal shadow-lg'
                  : 'bg-white text-luot-teal border-luot-teal/10 hover:-translate-y-1 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      isSelected ? 'bg-luot-gold/20 text-luot-gold' : 'bg-luot-teal/10 text-luot-teal'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold">{deptName}</h2>
                    <p
                      className={`text-xs ${
                        isSelected ? 'text-white/75' : 'text-luot-teal/65'
                      }`}
                    >
                      {meta.degree}
                    </p>
                  </div>
                </div>
                {isSelected && <CheckCircle2 size={20} className="text-luot-gold shrink-0" />}
              </div>
              <p
                className={`text-xs mt-3 leading-relaxed ${
                  isSelected ? 'text-white/80' : 'text-luot-teal/70'
                }`}
              >
                {meta.summary}
              </p>
            </button>
          );
        })}
      </div>

      {/* 3. Semester Tabs (1 - 8) + Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-2 pb-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <button
              key={sem}
              onClick={() => setSemester(sem)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                semester === sem
                  ? 'bg-luot-gold text-luot-teal shadow-xs'
                  : 'bg-white border border-luot-teal/10 text-luot-teal/75 hover:border-luot-teal/30 hover:text-luot-teal'
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-luot-teal/50"
          />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search subject or code..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-luot-teal/20 text-sm focus:outline-none focus:border-luot-teal"
          />
        </div>
      </div>

      {/* 4. Semester Summary Bar & Course Cards */}
      <div className="bg-white rounded-3xl border border-luot-teal/10 overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-luot-teal/5 border-b border-luot-teal/10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-luot-teal">
              {department} — Semester {semester}
            </h3>
            <p className="text-xs text-luot-teal/65">{activeMeta.hod}</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-luot-teal">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-luot-teal/15">
              <Layers size={13} className="text-luot-gold" />
              {filteredSubjects.length} Courses
            </span>
            <span className="px-3 py-1 rounded-full bg-luot-teal text-white">
              {totalCredits} Total Credits
            </span>
          </div>
        </div>

        {filteredSubjects.length === 0 ? (
          <p className="p-10 text-center text-sm text-luot-teal/60">
            No matching subjects found in Semester {semester}. Try clearing the
            search filter.
          </p>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSubjects.map((subj) => (
              <div
                key={subj.code}
                className="group p-5 rounded-2xl border border-luot-teal/10 bg-luot-bg/40 hover:bg-white hover:shadow-md transition-all duration-200 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-luot-teal/10 text-luot-gold shrink-0 group-hover:bg-luot-teal group-hover:text-luot-gold transition-colors">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-luot-teal/60">
                        {subj.code}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          TYPE_STYLES[subj.type] || TYPE_STYLES.Core
                        }`}
                      >
                        {subj.type}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-luot-teal leading-snug">
                      {subj.title}
                    </h4>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-white border border-luot-teal/15 text-luot-teal text-xs font-bold shrink-0">
                  {subj.credits} Cr
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}