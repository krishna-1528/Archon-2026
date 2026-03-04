import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';

const leadershipTeam = [
  { name: 'Aarav Sharma', role: 'Overall Coordinator', email: 'convener@archon2026.in', phone: '+91 90000 30001' },
  { name: 'Diya Mehta', role: 'Overall Coordinator', email: 'coconvener@archon2026.in', phone: '+91 90000 30002' }
];

const operationsTeam = [
  { name: 'Kunal Shah', role: 'Events Operations Lead' },
  { name: 'Mansi Rao', role: 'Workshops Lead' },
  { name: 'Yash Joshi', role: 'Arena Coordination Lead' },
  { name: 'Ira Soni', role: 'Media & Outreach Lead' },
  { name: 'Neel Desai', role: 'Sponsorship Lead' },
  { name: 'Prisha Amin', role: 'Hospitality Lead' }
];

const contactChannels = [
  {
    title: 'Official Email',
    value: 'contact@archon2026.in',
    href: 'mailto:contact@archon2026.in',
    icon: Mail
  },
  {
    title: 'Helpline',
    value: '+91 079 6812 6800',
    href: 'tel:+9107968126800',
    icon: Phone
  },
  {
    title: 'Campus Location',
    value: 'Rashtriya Raksha University, Gandhinagar',
    href: 'https://maps.google.com/?q=Rashtriya+Raksha+University+Gandhinagar',
    icon: MapPin
  }
];

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/rakshauni/', icon: Instagram },
  { name: 'LinkedIn', href: 'https://in.linkedin.com/school/rakshauni/', icon: Linkedin }
];

const PlaceholderPhoto = ({ label, compact = false }) => (
  <div className={`${compact ? 'w-40 sm:w-44 mx-auto' : 'w-full'} aspect-square rounded-2xl border border-primary/30 bg-black/30 flex items-center justify-center`}>
    <div className="text-center">
      <Users className="mx-auto text-primary/70 mb-2" size={34} />
      <p className="text-xs text-white/60 uppercase tracking-wider">Photo Placeholder</p>
      <p className="text-[11px] text-white/40 mt-1">{label}</p>
    </div>
  </div>
);

const TeamPage = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-20 py-14 sm:py-18">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight mb-5 uppercase tracking-[0.12em] bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Team & Contact
          </h1>
          <p className="text-white/65 max-w-3xl mx-auto text-sm sm:text-base">
            Meet the student committee and coordination leads driving ARCHON 2026 at Rashtriya Raksha University, Gandhinagar.
          </p>
        </motion.div>

        <section className="mb-14 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black mb-6">Cores</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
            {leadershipTeam.map((member, index) => (
              <motion.article
                key={member.email}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group relative overflow-hidden p-3 sm:p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="pointer-events-none absolute -top-20 -right-20 w-44 h-44 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <PlaceholderPhoto label="abc" />
                  <h3 className="text-base sm:text-lg font-black mt-3 mb-1">abc</h3>
                  <p className="text-primary text-xs uppercase tracking-wider mb-3">{member.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-14 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black mb-6">Coordinators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {operationsTeam.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden p-3 sm:p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="pointer-events-none absolute -top-20 -right-20 w-44 h-44 rounded-full bg-secondary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <PlaceholderPhoto label="abc" />
                  <h3 className="text-base sm:text-lg font-black mt-3 mb-1">abc</h3>
                  <p className="text-primary text-xs uppercase tracking-wider mb-3">{member.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="p-5 sm:p-6 rounded-2xl border border-primary/25 bg-linear-to-r from-primary/5 to-secondary/5">
          <h2 className="text-2xl sm:text-3xl font-black mb-6">Contact Desk</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-6">
            {contactChannels.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                className="rounded-xl border border-white/10 bg-black/20 p-3 sm:p-4 hover:border-primary/40 transition-all"
              >
                <item.icon className="text-primary mb-3" size={20} />
                <p className="text-xs uppercase tracking-wider text-white/55 mb-1">{item.title}</p>
                <p className="text-sm sm:text-base font-semibold text-white/90">{item.value}</p>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/85 hover:border-primary/50 hover:text-primary transition-all"
              >
                <social.icon size={16} />
                <span className="text-sm font-semibold">{social.name}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamPage;
