import React from 'react';
import { motion } from 'framer-motion';
import Workshops from '../components/Workshops';

const WorkshopsPage = () => {
  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-12 sm:mb-16"
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-5 sm:mb-6">
          TECH
          <br />
          <span className="text-primary">WORKSHOPS</span>
        </h1>
        <div className="w-24 sm:w-32 h-1 bg-primary mb-5 sm:mb-6" />
        <p className="text-base sm:text-xl text-white/60 max-w-2xl">
          Master cutting-edge technologies through hands-on sessions led by industry experts and defense technology pioneers.
        </p>
      </motion.div>

      {/* Workshops Component */}
      <Workshops />

      {/* Additional Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mt-14 sm:mt-20 grid md:grid-cols-3 gap-6"
      >
        {[
          { title: 'Expert Mentors', desc: 'Learn from industry leaders and defense tech specialists' },
          { title: 'Hands-On Learning', desc: 'Build real projects and gain practical experience' },
          { title: 'Certificates', desc: 'Earn recognized certifications for all workshops' }
        ].map((benefit, i) => (
          <motion.div
            key={benefit.title}
            whileHover={{ y: -10 }}
            className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">{benefit.title}</h3>
            <p className="text-white/60">{benefit.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WorkshopsPage;
