import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Countdown from '../components/Countdown';
// 1. Import your new background component
import GamingPortalBG from '../components/GamingPortalBG';

const HomePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      
      {/* Sign In Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="fixed top-6 right-6 z-50"
      >
        <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-black transition-all duration-300">
          Sign In
        </button>
      </motion.div>

      {/* 2. Replace the old motion divs with the 3D Gaming Portal */}
      <GamingPortalBG />

      {/* EVERYTHING BELOW REMAINS EXACTLY THE SAME */}
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 relative z-10"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring' }}
            className="mt-12"
          >
            <Shield size={120} className="mx-auto text-primary mb-6" strokeWidth={1.5} />
          </motion.div>

          {/* Title */}
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-primary font-mono tracking-[0.3em] mb-4 text-sm"
            >
              Rashtriya Raksha University
            </motion.p>

            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="text-7xl md:text-9xl font-black tracking-tighter mb-2 bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent"
            >
              ARCHON
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-2xl md:text-3xl font-light tracking-[0.2em] mb-6 text-primary/80"
            >
              2026
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="w-24 h-1 bg-primary mb-8 mx-auto"
            />

            <motion.h2 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              className="max-w-2xl mx-auto text-2xl md:text-4xl font-bold leading-relaxed tracking-wider"
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
                style={{ backgroundSize: '200% auto' }}
              >
                Coming Soon
              </motion.span>
            </motion.h2>
          </div>

          {/* Countdown */}
          <motion.div 
            className="mt-10 mb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <Countdown targetDate={new Date('2026-04-09T00:00:00')} className="justify-center" />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="pt-8 pb-4 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: '4+', subtitle: 'Battle Arenas', desc: 'Robowars, Code-Raksha, Circuit-X' },
            { title: '10+', subtitle: 'Tech Workshops', desc: 'Advanced security & defense tech' },
            { title: '24hr', subtitle: 'Hackathon', desc: 'National security challenges' }
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              whileHover={{ y: -10, borderColor: '#10b981' }}
              className="p-8 bg-white/5 border border-white/10 rounded-2xl transition-all"
            >
              <h3 className="text-5xl font-black text-primary mb-2">{stat.title}</h3>
              <h4 className="text-xl font-bold mb-2">{stat.subtitle}</h4>
              <p className="text-white/50 text-sm">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;