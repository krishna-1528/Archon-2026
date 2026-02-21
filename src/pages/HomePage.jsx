import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Countdown from '../components/Countdown';
// 1. Import your new background component
import GamingPortalBG from '../components/GamingPortalBG';

const HomePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      
      {/* 2. Replace the old motion divs with the 3D Gaming Portal */}
      <GamingPortalBG />

      {/* EVERYTHING BELOW REMAINS EXACTLY THE SAME */}
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring' }}
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
              INITIATING SOVEREIGN SYSTEMS // 2026
            </motion.p>

            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent"
            >
              ARCHON
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="w-24 h-1 bg-primary mb-8 mx-auto"
            />

            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 font-light leading-relaxed tracking-wide"
            >
              Innovating Technology for National Security
            </motion.h2>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex gap-4 justify-center mt-12"
          >
            <button className="bg-primary text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white transition-all hover:scale-105">
              Register Now
            </button>
            <button className="border border-primary text-primary px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-primary/10 transition-all">
              Learn More
            </button>
          </motion.div>

          {/* Countdown */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <Countdown targetDate={new Date('2026-04-09T00:00:00')} className="justify-center" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
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