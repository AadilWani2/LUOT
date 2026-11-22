import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';
import AwwwardsCursor from './components/AwwwardsCursor';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Admissions from './pages/public/Admissions';
import Curriculum from './pages/public/Curriculum';
import Gallery from './pages/public/Gallery';
import PublicNotices from './pages/public/PublicNotices';

// Auth Pages
import StudentLogin from './pages/auth/StudentLogin';
import FacultyLogin from './pages/auth/FacultyLogin';
import Register from './pages/auth/Register';

// Role Dashboards
import StudentDashboard from './pages/student/StudentDashboard';
import FeePayment from './pages/student/FeePayment';
import ComplaintForum from './pages/student/ComplaintForum';
import HodDashboard from './pages/hod/HodDashboard';
import PrincipalDashboard from './pages/principal/PrincipalDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SmoothScroll>
          <Preloader />
          <AwwwardsCursor />
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-luot-bg">
            <Navbar />
            <ScrollProgress />
            <main className="flex-1 pt-16 sm:pt-20">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/notices" element={<PublicNotices />} />

                {/* Auth Routes */}
                <Route path="/login/student" element={<StudentLogin />} />
                <Route path="/login/faculty" element={<FacultyLogin />} />
                <Route path="/register" element={<Register />} />

                {/* Student Portal */}
                <Route
                  path="/student/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/fees"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <FeePayment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/complaints"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <ComplaintForum />
                    </ProtectedRoute>
                  }
                />

                {/* HOD Portal */}
                <Route
                  path="/hod/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['hod']}>
                      <HodDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Principal (Super Admin) Portal */}
                <Route
                  path="/principal/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['super_admin']}>
                      <PrincipalDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </BrowserRouter>
    </AuthProvider>
  );
}