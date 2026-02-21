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
      <section className="relative min-h-screen md:min-h-[85vh] flex flex-col justify-between md:justify-center items-center text-center px-4 pt-24 md:pt-0 pb-12 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3 md:space-y-6 relative z-10 flex-1 flex flex-col justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring' }}
            className="mt-4 md:mt-8"
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
                style={{ backgroundSize: '200% auto' }}
              >
                Coming Soon
              </motion.span>
            </motion.h2>
          </div>

          {/* Countdown */}
          <motion.div 
            className="mt-4 md:mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <Countdown targetDate={new Date('2026-04-09T00:00:00')} className="justify-center" />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-4 md:mt-6 flex justify-center"
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
      <section className="block md:block pt-2 md:pt-6 pb-2 md:pb-4 px-3 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {[
            { title: '4+', subtitle: 'Battle Arenas', desc: 'Robowars, Code-Raksha, Circuit-X' },
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
    </div>
  );
};

export default HomePage;