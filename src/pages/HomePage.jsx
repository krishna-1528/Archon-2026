import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Countdown from '../components/Countdown';
import EventsPage from './EventsPage';
import AboutPage from './AboutPage';
import { GENERAL_ENTRY_PASS_FORM_URL } from '../constants/accessPolicy';

const HomePage = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [firstScrollFx, setFirstScrollFx] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const hasPlayedFirstScrollFxRef = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(Boolean(user));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Keep scroll enabled across devices on Home.
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'auto';

    return () => {
      // Always release any inline overflow styles when leaving Home.
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflowX = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflowX = '';
      document.documentElement.style.overflowY = '';
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 8);

      if (!hasPlayedFirstScrollFxRef.current && window.scrollY > 18) {
        hasPlayedFirstScrollFxRef.current = true;
        setFirstScrollFx(true);
        window.setTimeout(() => setFirstScrollFx(false), 500);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-transparent">
      
      {/* Sign In Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isAtTop ? 1 : 0, x: isAtTop ? 0 : 20 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className={`fixed top-5 right-5 z-50 transition-pointer-events ${isAtTop ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <Link to={isLoggedIn ? '/dashboard' : '/signin'} className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-black transition-all duration-300">
          {isLoggedIn ? 'Dashboard' : 'Sign In'}
        </Link>
      </motion.div>

      {/* EVERYTHING BELOW REMAINS EXACTLY THE SAME */}
      {/* Hero Section */}
      <motion.section
        id="home"
        className="relative min-h-screen md:min-h-[80vh] lg:min-h-[75vh] flex flex-col justify-center items-center text-center px-4 pt-14 md:pt-18 lg:pt-20 pb-0 lg:pb-4"
        animate={
          firstScrollFx
            ? { scale: [1, 0.985, 1], opacity: [1, 0.92, 1], y: [0, -10, 0] }
            : { scale: 1, opacity: 1, y: 0 }
        }
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 md:space-y-4 relative z-10 flex flex-col justify-center items-center mt-4 md:mt-5"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring' }}
            className="mt-3 md:mt-4"
          >
            <Shield size={80} className="md:w-28 md:h-28 mx-auto text-primary mb-3 md:mb-4" strokeWidth={1.5} />
          </motion.div>

          {/* Title */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-primary font-mono tracking-[0.3em] mb-2 md:mb-2 text-xs md:text-sm"
            >
              Rashtriya Raksha University
            </motion.p>

            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="text-5xl md:text-9xl font-black tracking-tighter mb-1 md:mb-1 bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent"
            >
              ARCHON
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xl md:text-3xl font-light tracking-[0.2em] mb-2 md:mb-2 text-primary/80"
            >
              2026
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="w-20 h-0.5 bg-primary mb-2 md:mb-2 mx-auto"
            />

            <motion.h2 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              className="max-w-2xl mx-auto text-lg md:text-4xl font-bold leading-snug tracking-wider"
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  textShadow: [
                    '0 0 20px rgba(0,242,255,0.5), 0 0 40px rgba(255,0,255,0.3)',
                    '0 0 30px rgba(255,0,255,0.5), 0 0 60px rgba(0,242,255,0.3)',
                    '0 0 20px rgba(0,242,255,0.5), 0 0 40px rgba(255,0,255,0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', fontFamily: '"Iceberg", sans-serif' }}
              >
                Coming Soon
              </motion.span>
            </motion.h2>
          </div>

          {/* Countdown */}
          <motion.div 
            className="mt-3 md:mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <Countdown targetDate={new Date('2026-04-09T00:00:00')} className="justify-center gap-3 sm:gap-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-3 mt-5 md:mt-4"
          >
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 md:px-7 py-2.5 md:py-3 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest border-2 border-primary bg-primary text-black hover:bg-transparent hover:text-primary transition-all duration-300"
            >
              Register
            </Link>
            <a
              href={GENERAL_ENTRY_PASS_FORM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center px-5 md:px-7 py-2.5 md:py-3 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest border-2 border-white/60 text-white hover:border-primary hover:text-primary transition-all duration-300"
            >
              Entry Pass
            </a>
          </motion.div>

        </motion.div>

      </motion.section>

      {/* Mobile scroll sections: Event Brief first, then About */}
      <div className="lg:hidden relative z-20 mt-2">
        <motion.section
          id="events-mobile"
          className="scroll-mt-24"
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <EventsPage disableAutoScrollReset />
        </motion.section>

        <motion.section
          id="about-mobile"
          className="scroll-mt-24 mt-6"
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <AboutPage />
        </motion.section>
      </div>

    </div>
  );
};

export default HomePage;