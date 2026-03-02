import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TacticalEventCard = ({ event, delay = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay }}
      className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="px-2.5 py-1 rounded-full border border-primary/40 text-primary text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono">
            TR-26
          </span>
          <span className="text-white/50 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]">
            EVENT_LOG //
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black mb-5">{event.title}</h3>

        <div className="grid grid-cols-2 gap-3 mb-6 text-xs sm:text-sm">
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-white/40 uppercase tracking-wider">Date</p>
            <p className="text-white/90 font-semibold mt-1">{event.date}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-white/40 uppercase tracking-wider">Time</p>
            <p className="text-white/90 font-semibold mt-1">{event.time}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-white/40 uppercase tracking-wider">Loc</p>
            <p className="text-white/90 font-semibold mt-1">{event.loc}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-white/40 uppercase tracking-wider">Entry</p>
            <p className="text-white/90 font-semibold mt-1">{event.entry}</p>
          </div>
        </div>

        <Link to={`/event/${event.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-xl bg-primary text-black font-black uppercase tracking-[0.2em] ring-1 ring-primary/40 hover:ring-2 hover:ring-primary/70 transition-all"
          >
            Explore
          </motion.button>
        </Link>
      </div>
    </motion.article>
  );
};

export default TacticalEventCard;
