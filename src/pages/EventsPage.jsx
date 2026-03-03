import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Radar, Shield, GraduationCap, Wrench, Gamepad2, CalendarDays } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const EventsPage = () => {
  const reveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6 }
  };

  const battleBriefings = [
    {
      title: 'Robowars',
      desc: 'Design mission-ready logic architectures and showcase rapid prototyping skills for sovereign systems.',
      icon: Shield
    },
    {
      title: 'Capture The Flag',
      desc: 'Defend and attack in live security scenarios inspired by national-infrastructure cyber resilience drills.',
      icon: Radar
    },
    {
      title: 'Hardware IOT Hackathon',
      desc: 'Jump directly to the tactical gaming bracket details on the Battle Arena page.',
      icon: Gamepad2,
      hashLink: '/battle-arena#esports'
    }
  ];

  const briefingBlocks = [
    {
      title: 'PCB Designing (CIRCUIT-X)',
      desc: 'Short, high-signal talks from defense-tech leaders on innovation, policy, and mission impact.',
      icon: GraduationCap,
      cta: '/events#event-schedule'
    },
    {
      title: 'Blind Coding',
      desc: 'Hands-on sessions covering VLSI, CAD, AI security, and practical rapid-build workflows.',
      icon: Wrench,
      cta: '/workshops'
    },
    {
      title: 'Googly (Technical Quiz)',
      desc: 'Fast-paced side events for strategy, speed, precision, and problem-solving across all three days.',
      icon: CalendarDays,
      cta: '/events#parallel-events'
    },
    {
      title: 'Cad vs Cad',
      desc: 'Fast-paced side events for strategy, speed, precision, and problem-solving across all three days.',
      icon: CalendarDays,
      cta: '/events#parallel-events'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Drone Show Banner */}
      <section className="relative min-h-[75vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <div className="absolute top-10 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 max-w-5xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          >
            Grand Finale • Final Day
          </motion.span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mt-4 mb-5 sm:mb-6 leading-tight">
            GRAND AERIAL
            <br />
            <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              DRONE SHOW
            </span>
          </h1>
          <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed px-2">
            A cinematic night-sky display combining autonomous choreography, synchronized light formations, and immersive storytelling to close ARCHON 2026.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 border border-primary/40 bg-white/5 rounded-full px-5 py-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-mono">
            Live on Day 3 • Main Arena
          </div>
        </motion.div>
      </section>

      {/* Battle Arenas Briefing */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            number={2}
            title="Battle Arenas Briefing"
            subtitle="Quick tactical overview before you dive into full arena details"
          />

          <motion.div
            {...reveal}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {battleBriefings.map((item) => (
              <div
                key={item.title}
                className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{item.desc}</p>
                {item.hashLink ? (
                  <Link
                    to={item.hashLink}
                    className="inline-flex px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-primary text-primary hover:bg-primary/10 transition-all"
                  >
                    Explore More
                  </Link>
                ) : (
                  <Link
                    to="/battle-arena"
                    className="inline-flex px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-primary text-primary hover:bg-primary/10 transition-all"
                  >
                    Explore More
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Briefing Blocks */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 md:px-20" id="parallel-events">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {briefingBlocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center mb-5">
                <block.icon size={22} className="text-secondary" />
              </div>
              <h3 className="text-2xl font-black mb-3">{block.title}</h3>
              <p className="text-white/60 mb-6">{block.desc}</p>
              <Link
                to={block.cta}
                className="inline-flex px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-secondary text-secondary hover:bg-secondary/10 transition-all"
              >
                Explore More
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Event Timeline Preview */}
      <section id="event-schedule" className="py-16 sm:py-20 px-4 sm:px-6 md:px-20 bg-linear-to-r from-primary/5 to-secondary/5">
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
              { day: 'Day 2', events: 'Arenas Competitions, Guest/Keynote Speaker Sessions, Hackathon Begins' },
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
