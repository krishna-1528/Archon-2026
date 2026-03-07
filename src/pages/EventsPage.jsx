import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Gamepad2, GraduationCap, Wrench } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const technicalEvents = [
  {
    title: 'Robowars',
    desc: 'Design, build, and battle bots in a high-intensity combat arena.',
  },
  {
    title: 'Capture The Flag',
    desc: 'Compete in live cybersecurity scenarios based on offense and defense rounds.',
  },
  {
    title: 'Hardware IoT Hackathon',
    desc: 'Rapidly prototype connected systems for practical mission-driven problem statements.',
  },
];

const esportsEvents = [
  {
    title: 'BGMI',
    desc: 'Squad-based battle royale with tactical rotations and elimination scoring.',
  },
  {
    title: 'Valorant',
    desc: 'Team strategy, utility timing, and precision aim decide each bracket match.',
  },
  {
    title: 'Clash Royale / Free Fire Side Brackets',
    desc: 'Fast-paced competitive slots for players across mobile strategy and battle royale formats.',
  },
];

const guestLectures = [
  {
    title: 'Defense Tech Innovation Talk',
    desc: 'Speakers from industry and academia discuss next-gen national security tech.',
  },
  {
    title: 'Cyber Security Leadership Session',
    desc: 'Insights on cyber resilience, digital warfare readiness, and policy-level strategy.',
  },
];

const workshops = [
  {
    title: 'IEEE VLSI Design',
    desc: 'Deep dive into semiconductor architecture and sovereign chip design.',
  },
  {
    title: 'Quantum Technologies',
    desc: 'Hands-on workshop on quantum computing fundamentals, secure communication, and emerging quantum applications.',
  },
  {
    title: 'AI with Cybersecurity',
    desc: 'Securing national infrastructure using machine learning and AI.',
  },
];

const EventsPage = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');

    const applyMode = (event) => {
      setIsMobileView(event.matches);
    };

    applyMode(mediaQuery);
    mediaQuery.addEventListener('change', applyMode);

    // Keep route entry stable on mobile by resetting to top.
    if (mediaQuery.matches) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    return () => {
      mediaQuery.removeEventListener('change', applyMode);
    };
  }, []);

  const reveal = isMobileView
    ? {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.08 },
        transition: { duration: 0.35 },
      }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.55 },
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader number={2} title="Events Briefing" />

        <section className="mb-16">
          <motion.div {...reveal} className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary font-mono">
              <Shield size={14} /> Technical Events
            </div>
          </motion.div>

          <motion.div {...reveal} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technicalEvents.map((item) => (
              <article key={item.title} className="p-6 sm:p-7 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/40 transition-all">
                <h3 className="text-xl sm:text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-white/65 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </motion.div>

          <motion.div {...reveal} className="mt-7 flex justify-center">
            <Link to="/battle-arena" className="inline-flex px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-primary text-primary hover:bg-primary/10 transition-all">
              Explore More
            </Link>
          </motion.div>
        </section>

        <section className="mb-16">
          <motion.div {...reveal} className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/35 bg-secondary/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-secondary font-mono">
              <Gamepad2 size={14} /> Esports
            </div>
          </motion.div>

          <motion.div {...reveal} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {esportsEvents.map((item) => (
              <article key={item.title} className="p-6 sm:p-7 bg-white/5 border border-white/10 rounded-2xl hover:border-secondary/40 transition-all">
                <h3 className="text-xl sm:text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-white/65 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </motion.div>

          <motion.div {...reveal} className="mt-7 flex justify-center">
            <Link to="/battle-arena#esports" className="inline-flex px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-secondary text-secondary hover:bg-secondary/10 transition-all">
              Explore More
            </Link>
          </motion.div>
        </section>

        <section className="mb-16">
          <motion.div {...reveal} className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/80 font-mono">
              <GraduationCap size={14} /> Guest Lectures
            </div>
          </motion.div>

          <motion.div {...reveal} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guestLectures.map((item) => (
              <article key={item.title} className="p-6 sm:p-7 bg-white/5 border border-white/10 rounded-2xl hover:border-white/30 transition-all">
                <h3 className="text-xl sm:text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-white/65 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </motion.div>

          <motion.div {...reveal} className="mt-7 flex justify-center">
            <Link to="/expo" className="inline-flex px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-white/40 text-white/85 hover:bg-white/10 transition-all">
              Explore More
            </Link>
          </motion.div>
        </section>

        <section className="mb-16">
          <motion.div {...reveal} className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary font-mono">
              <Wrench size={14} /> Workshops
            </div>
          </motion.div>

          <motion.div {...reveal} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workshops.map((item) => (
              <article key={item.title} className="p-6 sm:p-7 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/40 transition-all">
                <h3 className="text-xl sm:text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-white/65 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </motion.div>

          <motion.div {...reveal} className="mt-7 flex justify-center">
            <Link to="/workshops" className="inline-flex px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-primary text-primary hover:bg-primary/10 transition-all">
              Explore More
            </Link>
          </motion.div>
        </section>

        <section id="event-schedule" className="py-16 sm:py-20 px-4 sm:px-6 md:px-20 bg-linear-to-r from-primary/5 to-secondary/5 rounded-3xl border border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto p-6 sm:p-10 border border-primary/30 rounded-3xl"
          >
            <h3 className="text-2xl sm:text-3xl font-black mb-6 text-center">Event Schedule</h3>
            <div className="space-y-4">
              {[
                { day: 'Day 1', events: 'Opening Ceremony, Keynote Speeches, Workshop Sessions' },
                { day: 'Day 2', events: 'Arenas Competitions, Guest Speaker Sessions, Hackathon Begins' },
                { day: 'Day 3', events: 'Finals, Award Ceremony, Closing Ceremony' },
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
              <motion.a
                href="/assets/events/archon-event-schedule.txt"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex bg-primary text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-all"
              >
                Download Full Schedule
              </motion.a>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default EventsPage;
