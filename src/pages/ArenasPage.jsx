import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import TacticalEventCard from '../components/TacticalEventCard';
import { tacticalEvents, esportsEvents } from '../data/eventsData';

const ArenasPage = () => {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[65vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          <p className="text-primary font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
            Tactical Events Command
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-tight mb-5">
            BATTLE ARENA
            <br />
            <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              GRID
            </span>
          </h1>
          <p className="text-base sm:text-xl text-white/60 max-w-3xl mx-auto">
            Mission-ready competitions, strategic simulations, and digital warfare arenas curated for ARCHON 2026.
          </p>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-20" id="battle-grid">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            number={1}
            title="Tactical Event Cards"
            subtitle="Seven core Battle Arena operations"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
            {tacticalEvents.map((event, index) => (
              <div key={event.id} id={event.id} className="h-full">
                <TacticalEventCard event={event} delay={index * 0.05} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10 px-4 sm:px-6 md:px-20" id="esports">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-3xl sm:text-5xl font-black mb-3">E-SPORTS ARENA</h2>
            <p className="text-secondary font-mono text-xs sm:text-sm uppercase tracking-[0.25em]">
              Sector: Digital Warfare
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {esportsEvents.map((event, index) => (
              <TacticalEventCard key={event.id} event={event} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArenasPage;
