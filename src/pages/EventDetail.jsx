import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { eventsData } from '../data/eventsData';

const tabs = ['about', 'prizes', 'rules', 'contact'];

const tabLabels = {
  about: 'About',
  prizes: 'Prizes',
  rules: 'Rules',
  contact: 'Contact'
};

const EventDetail = () => {
  const { eventId } = useParams();
  const [activeTab, setActiveTab] = useState('about');

  const event = useMemo(
    () => eventsData.find((entry) => entry.id === eventId),
    [eventId]
  );

  if (!event) {
    return (
      <div className="min-h-screen px-4 sm:px-6 md:px-20 py-20 flex items-center justify-center">
        <div className="max-w-xl text-center p-8 border border-white/10 rounded-2xl bg-white/5">
          <h1 className="text-3xl sm:text-4xl font-black mb-4">Event Not Found</h1>
          <p className="text-white/60 mb-6">The tactical record you requested is unavailable.</p>
          <Link
            to="/battle-arena"
            className="inline-flex px-6 py-3 rounded-full border border-primary text-primary font-bold uppercase text-xs tracking-wider hover:bg-primary/10 transition-all"
          >
            Return to Battle Arena
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-20 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/battle-arena"
          className="inline-flex items-center gap-2 mb-6 text-white/70 hover:text-primary transition-colors text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back to Arena Grid
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-white/10 rounded-3xl overflow-hidden bg-white/5 min-h-155"
          >
            <img
              src={event.poster}
              alt={`${event.title} poster`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-white/10 rounded-3xl bg-white/5 p-6 sm:p-8 flex flex-col"
          >
            <div className="mb-6">
              <p className="text-primary font-mono text-xs tracking-[0.25em] uppercase mb-3">TR-26 // Event Profile</p>
              <h1 className="text-3xl sm:text-5xl font-black mb-3">{event.title}</h1>
              {Array.isArray(event.categories) && event.categories.length > 0 && (
                <p className="text-xs sm:text-sm uppercase tracking-wider text-primary">
                  Categories: {event.categories.join(' / ')}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider border transition-all ${
                    activeTab === tab
                      ? 'border-primary text-black bg-primary'
                      : 'border-white/20 text-white/70 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>

            <div className="flex-1 min-h-52 border border-white/10 rounded-2xl bg-black/20 p-5 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-xl sm:text-2xl font-black mb-3">{tabLabels[activeTab]}</h2>
                  {activeTab === 'prizes' ? (
                    <p className="text-white/70 leading-relaxed whitespace-pre-line">
                      {event.prizes}
                    </p>
                  ) : (
                    <p className="text-white/70 leading-relaxed">
                      {activeTab === 'about' && event.about}
                      {activeTab === 'rules' && event.rules}
                      {activeTab === 'contact' && event.contact}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={event.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-primary text-primary font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-primary/10 transition-all"
              >
                <Download size={16} /> Download Strategic Briefing (PDF)
              </a>
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-secondary text-black font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all"
              >
                Register
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
