import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Brain, Lightbulb, BookOpen, Users, MessageSquare } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const expoItems = [
  {
    title: "Opening Keynote: The Future of National Security",
    category: "Main Stage",
    icon: Mic,
    description: "A strategic keynote on evolving security challenges, digital resilience, and the role of youth-led innovation.",
    features: ["Policy Insights", "Strategic Roadmap", "Q&A Session"]
  },
  {
    title: "AI & Cyber Warfare",
    category: "Expert Talk",
    icon: Brain,
    description: "Industry experts decode emerging AI-powered threats and practical approaches to proactive cyber defense.",
    features: ["Threat Modeling", "Live Case Studies", "Blue Team Tactics"]
  },
  {
    title: "Innovation Spotlight: Startups in Defense Tech",
    category: "Spotlight",
    icon: Lightbulb,
    description: "Founders and researchers present breakthrough ideas shaping the next generation of defense and security systems.",
    features: ["Startup Pitches", "Prototype Stories", "Mentor Feedback"]
  },
  {
    title: "Leadership Masterclass",
    category: "Professional Growth",
    icon: BookOpen,
    description: "Guest speakers share leadership principles, mission planning practices, and decision-making under pressure.",
    features: ["Command Thinking", "Crisis Communication", "Career Guidance"]
  },
  {
    title: "Panel: Women in Security & Technology",
    category: "Panel Discussion",
    icon: Users,
    description: "Accomplished leaders discuss inclusion, mentorship, and high-impact careers across security and technology sectors.",
    features: ["Career Journeys", "Mentorship Pathways", "Open Forum"]
  },
  {
    title: "Closing Conversation with Distinguished Guests",
    category: "Fireside Session",
    icon: MessageSquare,
    description: "An interactive closing dialogue with keynote guests featuring reflections, lessons, and guidance for participants.",
    features: ["Interactive Discussion", "Audience Questions", "Takeaway Notes"]
  }
];

const ExpoPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <div className="absolute bottom-10 right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
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
            Guest & Keynote Speaker Sessions
          </motion.span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mt-4 mb-5 sm:mb-6 leading-tight">
            GUEST
            <br />
            <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              SPEAKERS
            </span>
          </h1>
          <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed px-2">
            Hear from keynote leaders, domain experts, and distinguished guests across security, strategy, and emerging technology.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            number={3}
            title="Guest/Keynote Speakers"
            subtitle="Curated sessions from leaders, practitioners, and innovators"
          />

      {/* Expo Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
        {expoItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative"
          >
            <div className="relative p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all h-full">
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Category */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-4 bg-primary/10 rounded-xl border border-primary/30"
                  >
                    <item.icon size={32} className="text-primary" strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {item.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-white/50">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <button className="mt-6 w-full py-3 border border-primary/30 rounded-xl text-primary font-bold text-sm uppercase tracking-wider hover:bg-primary/10 transition-all">
                  View Details
                </button>
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-20 bg-linear-to-r from-primary/5 to-secondary/5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-6 sm:p-12 border border-primary/30 rounded-3xl text-center"
        >
          <Mic size={64} className="mx-auto text-primary mb-6" strokeWidth={1.5} />
          <h3 className="text-2xl sm:text-4xl font-black mb-4">Join the Guest & Keynote Experience</h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Attend high-impact talks, connect with notable speakers, and gain practical insights that shape your academic and professional journey.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-all w-full sm:w-auto"
            >
              Reserve Your Seat
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-primary text-primary px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-primary/10 transition-all w-full sm:w-auto"
            >
              Speaker Lineup
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ExpoPage;
