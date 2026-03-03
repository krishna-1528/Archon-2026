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
      className="group relative h-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative min-h-130 transition-transform duration-700 transform-[rotateY(0deg)] group-hover:transform-[rotateY(180deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 p-6 sm:p-7"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-xl sm:text-2xl font-black mb-4">{event.title}</h3>

            <div className="mb-4 rounded-xl overflow-hidden border border-white/10 bg-black/20">
              <img
                src={event.poster}
                alt={`${event.title} poster`}
                className="w-full h-44 object-cover"
                loading="lazy"
              />
            </div>

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

            <Link to={`/event/${event.id}`} className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-primary text-black font-black uppercase tracking-[0.2em] ring-1 ring-primary/40 hover:ring-2 hover:ring-primary/70 transition-all"
              >
                Explore
              </motion.button>
            </Link>
          </div>
        </div>

        <div
          className="absolute inset-0 p-6 sm:p-7"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="h-full rounded-2xl border border-primary/30 bg-black/40 p-6 flex flex-col justify-center items-center text-center">
            <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-3">Prize Pool</p>
            <h3 className="text-xl sm:text-2xl font-black mb-4">{event.title}</h3>
            <p className="text-white/80 leading-relaxed mb-8">{event.prizes}</p>
            <Link
              to={`/event/${event.id}`}
              className="w-full inline-flex items-center justify-center py-3.5 rounded-xl border border-primary text-primary font-black uppercase tracking-[0.2em] hover:bg-primary/10 transition-all"
            >
              View Event
            </Link>
          </div>
        </div>
      </div>

    </motion.article>
  );
};

export default TacticalEventCard;
