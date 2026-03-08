import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ArchonPreloader from './components/ArchonPreloader';
import LandingAnimation from './components/LandingAnimation';
import FloatingSidebar from './components/FloatingSidebar';
import HomePage from './pages/HomePage';
import ArenasPage from './pages/ArenasPage';
import WorkshopsPage from './pages/WorkshopsPage';
import EventsPage from './pages/EventsPage';
import ExpoPage from './pages/ExpoPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import SponsorsPage from './pages/SponsorsPage';
import EventDetail from './pages/EventDetail';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
// 1. Import the background component
import GamingPortalBG from './components/GamingPortalBG';

function RouteAwareBackground() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return <GamingPortalBG enablePointerEffect={isHomePage} />;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const timeoutId = window.setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);

      return () => window.clearTimeout(timeoutId);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function AppFooter() {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <footer className="relative px-4 py-8 text-center border-t border-white/10 opacity-50 text-[10px] tracking-widest uppercase">
      All Rights Reserved
    </footer>
  );
}

function App() {
  const hasSessionLoaded = typeof window !== 'undefined' && sessionStorage.getItem('archonLoaded') === 'true';
  const [showPreloader, setShowPreloader] = useState(!hasSessionLoaded);
  const [showLanding, setShowLanding] = useState(!hasSessionLoaded);
  const showExperience = !showPreloader && !showLanding;

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handleLandingComplete = () => {
    setShowLanding(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('archonLoaded', 'true');
    }
  };

  const AnimatedRoutes = () => {
    const location = useLocation();

    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/arenas" element={<ArenasPage />} />
            <Route path="/battle-arena" element={<ArenasPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/event/:eventId" element={<EventDetail />} />
            <Route path="/expo" element={<ExpoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    );
  };

return (
  <Router>
    <ScrollToTop />
    <div className="bg-background min-h-screen text-white">
      <RouteAwareBackground />

      <AnimatePresence mode="wait">
        {showPreloader && (
          <ArchonPreloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showPreloader && showLanding && (
          <LandingAnimation key="landing" onComplete={handleLandingComplete} />
        )}
      </AnimatePresence>

      {showExperience && (
        <>
          {/* Keep grain only after intro for visual clarity during preload */}
          <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-10" />
          
          <FloatingSidebar />

          <main className="relative z-20">
            <AnimatedRoutes />
            <AppFooter />
          </main>
        </>
      )}
    </div>
  </Router>
);

}

export default App;