import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Countdown from '../components/Countdown';
import EventsPage from './EventsPage';
import { GENERAL_ENTRY_PASS_FORM_URL } from '../constants/accessPolicy';
// 1. Import your new background component
import GamingPortalBG from '../components/GamingPortalBG';

const HomePage = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const applyOverflowMode = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      document.body.style.overflow = isDesktop ? 'hidden' : 'auto';
    };

    applyOverflowMode();
    window.addEventListener('resize', applyOverflowMode);

    return () => {
      window.removeEventListener('resize', applyOverflowMode);
      // Always release page scroll lock when leaving Home.
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 8);
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
        className={`fixed top-6 right-6 z-50 transition-pointer-events ${isAtTop ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <Link to="/signin" className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-black transition-all duration-300">
          Sign In
        </Link>
      </motion.div>

      {/* 2. Replace the old motion divs with the 3D Gaming Portal */}
      <GamingPortalBG />

      {/* EVERYTHING BELOW REMAINS EXACTLY THE SAME */}
      {/* Hero Section */}
      <section id="home" className="relative min-h-[72vh] md:min-h-[85vh] lg:min-h-[78vh] flex flex-col justify-center items-center text-center px-4 pt-8 md:pt-0 lg:pt-8 pb-0 lg:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3 md:space-y-6 relative z-10 flex flex-col justify-center items-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring' }}
            className="mt-2 md:mt-0"
          >
            <Shield size={80} className="md:w-[120px] md:h-[120px] mx-auto text-primary mb-3 md:mb-6" strokeWidth={1.5} />
          </motion.div>

          {/* Title */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-primary font-mono tracking-[0.3em] mb-1 md:mb-4 text-xs md:text-sm"
            >
              Rashtriya Raksha University
            </motion.p>

            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="text-5xl md:text-9xl font-black tracking-tighter mb-1 md:mb-2 bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent"
            >
              ARCHON
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xl md:text-3xl font-light tracking-[0.2em] mb-2 md:mb-3 text-primary/80"
            >
              2026
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="w-20 h-0.5 bg-primary mb-2 md:mb-4 mx-auto"
            />

            <motion.h2 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              className="max-w-2xl mx-auto text-lg md:text-4xl font-bold leading-relaxed tracking-wider"
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
                className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', fontFamily: '"Iceberg", sans-serif' }}
              >
                Coming Soon
              </motion.span>
            </motion.h2>
          </div>

          {/* Countdown */}
          <motion.div 
            className="mt-2 md:mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <Countdown targetDate={new Date('2026-04-09T00:00:00')} className="justify-center" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6"
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

      </section>

      {/* Featured Section */}
      <section className="hidden lg:block pt-0 md:pt-6 pb-1 md:pb-4 px-3 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {[
            { title: '7+', subtitle: 'Battle Arenas', desc: 'Robowars, Capture The Flag, Cad vs Cad' },
            { title: '10+', subtitle: 'Tech Workshops', desc: 'Advanced security & defense tech' },
            { title: '24hr', subtitle: 'Hackathon', desc: 'National security challenges' }
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              whileHover={{ y: -10, borderColor: '#10b981' }}
              className="p-3 md:p-6 bg-white/5 border border-white/10 rounded-lg md:rounded-2xl transition-all"
            >
              <h3 className="text-3xl md:text-5xl font-black text-primary mb-1">{stat.title}</h3>
              <h4 className="text-sm md:text-xl font-bold mb-1">{stat.subtitle}</h4>
              <p className="text-white/50 text-xs md:text-sm">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Mobile/Tablet Continuous Scroll Section */}
      <div className="lg:hidden relative z-20">
        <motion.section
          id="events"
          className="scroll-mt-24"
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <EventsPage />
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;