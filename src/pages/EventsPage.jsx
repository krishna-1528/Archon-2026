import React from 'react';
import { motion } from 'framer-motion';
import ParallelEvents from '../components/ParallelEvents';
import SectionHeader from '../components/SectionHeader';

const EventsPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <div className="absolute top-10 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          >
            Three Days of Innovation
          </motion.span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mt-4 mb-5 sm:mb-6 leading-tight">
            PARALLEL
            <br />
            <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              EVENTS
            </span>
          </h1>
          <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed px-2">
            Experience keynote speeches, defense expos, and exclusive networking opportunities with industry leaders.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            number={2}
            title="Essential Programming"
            subtitle="Carefully curated events throughout the three-day techfest"
          />

          {/* Events Component */}
          <ParallelEvents />
        </div>
      </section>

      {/* Event Timeline Preview */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-20 bg-linear-to-r from-primary/5 to-secondary/5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-6 sm:p-10 border border-primary/30 rounded-3xl"
        >
          <h3 className="text-2xl sm:text-3xl font-black mb-6 text-center">Event Schedule</h3>
          <div className="space-y-4">
            {[
              { day: 'Day 1', events: 'Opening Ceremony, Keynote Speeches, Workshop Sessions' },
              { day: 'Day 2', events: 'Arenas Competitions, Defence Expo, Hackathon Begins' },
              { day: 'Day 3', events: 'Finals, Award Ceremony, Closing Ceremony' }
            ].map((schedule, i) => (
              <motion.div
                key={schedule.day}
                whileHover={{ x: 10 }}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 sm:p-6 bg-white/5 rounded-xl border border-white/10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-black text-primary w-auto sm:w-24">{schedule.day}</div>
                <div className="flex-1 text-white/70">{schedule.events}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-all"
            >
              Download Full Schedule
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default EventsPage;
