import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Swords, 
  Wrench, 
  Calendar, 
  Shield,
  Info,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MapPin,
  Handshake,
  Users,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const navigationItems = [
  { path: '/', icon: Home, label: 'Home', color: '#10b981' },
  { path: '/arenas', icon: Swords, label: 'Bottle Arenas', color: '#10b981' },
  { path: '/workshops', icon: Wrench, label: 'Worshops', color: '#3b82f6' },
  { path: '/events', icon: Calendar, label: 'Events', color: '#8b5cf6' },
  { path: '/expo', icon: Shield, label: 'Defense Expo', color: '#ef4444' },
  { path: '/sponsors', icon: Handshake, label: 'Sponsors', color: '#ff00ff' },
  { path: '/about', icon: Info, label: 'About Us', color: '#00f2ff' },
];

const socialItems = [
  { href: 'https://www.instagram.com/rru_official/', icon: Instagram, label: 'Insta', color: '#ff00ff' },
  { href: 'https://www.linkedin.com/school/rru-gandhinagar/', icon: Linkedin, label: 'Linkedin', color: '#00f2ff' },
  { href: 'https://www.youtube.com/', icon: Youtube, label: 'Youtube', color: '#ff00ff' },
  { href: 'https://x.com/', icon: Twitter, label: 'Twitter', color: '#00f2ff' },
  { href: 'https://maps.google.com/?q=Rashtriya+Raksha+University+Gandhinagar', icon: MapPin, label: 'Location', color: '#ff00ff' },
  { href: '/team', icon: Users, label: 'Team/Contact', color: '#ff00ff' },
];

const isItemActive = (path, location) => {
  if (path === '/') {
    return location.pathname === '/' && location.hash === '';
  }
  if (path.startsWith('/#')) {
    return location.pathname === '/' && location.hash === path.slice(1);
  }
  return location.pathname === path;
};

const FloatingSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSocialExpanded, setIsSocialExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSocialIndex, setHoveredSocialIndex] = useState(null);
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside 
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-[90] flex-col gap-3"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          setIsExpanded(false);
          setHoveredIndex(null);
        }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {/* Glass Container */}
        <div className="relative bg-background/40 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl" />
          
          {/* Navigation Items */}
          <div className="relative space-y-2">
            {navigationItems.map((item, index) => {
              const isActive = isItemActive(item.path, location);

              return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive ? 'bg-primary/20 text-primary' : 'text-white/60 hover:bg-white/5 hover:text-white hover:shadow-lg hover:shadow-primary/20'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <>
                  {/* Icon */}
                  <motion.div
                    animate={{ 
                      scale: isActive || hoveredIndex === index ? 1.1 : 1,
                      rotate: isActive ? 5 : hoveredIndex === index ? 2 : 0,
                      x: hoveredIndex === index ? 2 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <item.icon 
                      size={20} 
                      strokeWidth={2.5}
                      style={{ color: isActive ? item.color : undefined }}
                    />
                  </motion.div>

                  {/* Label - Slides in on hover/expand */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden whitespace-nowrap text-sm font-bold tracking-wide"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 border-2 rounded-xl"
                      style={{ borderColor: item.color }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Arrow */}
                  {hoveredIndex === index && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute -right-8"
                    >
                      <ChevronRight size={16} className="text-primary" />
                    </motion.div>
                  )}
                </>
              </NavLink>
            );
            })}
          </div>

          {/* Archon Logo on Sidebar */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center">
            <Shield size={16} className="text-primary/60" />
          </div>
        </div>
      </motion.aside>

      {/* Desktop Right Sidebar */}
      <motion.aside
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[90] flex-col gap-3"
        onMouseEnter={() => setIsSocialExpanded(true)}
        onMouseLeave={() => {
          setIsSocialExpanded(false);
          setHoveredSocialIndex(null);
        }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <div className="relative bg-background/40 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl">
          <div className="absolute inset-0 bg-secondary/5 rounded-2xl blur-xl" />

          <div className="relative space-y-2">
            {socialItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                className="group relative flex items-center justify-end gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-300 text-white/60 hover:bg-white/5 hover:text-white hover:shadow-lg hover:shadow-secondary/20"
                onMouseEnter={() => setHoveredSocialIndex(index)}
                onMouseLeave={() => setHoveredSocialIndex(null)}
                whileHover={{ x: -2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              >
                <AnimatePresence>
                  {isSocialExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap text-sm font-bold tracking-wide"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                <motion.div whileHover={{ scale: 1.08 }} transition={{ type: 'spring', stiffness: 420 }}>
                  <item.icon size={20} strokeWidth={2.5} style={{ color: item.color }} />
                </motion.div>

                {hoveredSocialIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute -left-8"
                  >
                    <ChevronRight size={16} className="text-secondary rotate-180" />
                  </motion.div>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.aside>

      {/* Mobile Floating Menu Button */}
      <MobileNav items={navigationItems} />
    </>
  );
};

// Mobile Navigation
const MobileNav = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[100] bg-primary text-black p-4 rounded-full shadow-2xl"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Menu size={24} strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[95]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="fixed bottom-24 right-6 z-[96] w-[min(90vw,320px)] max-h-[70vh] overflow-y-auto bg-background/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl"
              initial={{ scale: 0, opacity: 0, originX: 1, originY: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="space-y-2 min-w-[200px]">
                {items.map((item) => {
                  const isActive = isItemActive(item.path, location);

                  return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                      isActive ? 'bg-primary/20 text-primary' : 'text-white/70 hover:bg-white/5 hover:translate-x-1'
                    }`}
                  >
                    <item.icon size={20} style={{ color: isActive ? item.color : undefined }} />
                    <span className="font-bold text-sm">{item.label}</span>
                  </NavLink>
                  );
                })}

                <div className="my-2 border-t border-white/15" />

                {socialItems.map((item) => (
                  <a
                    key={`mobile-${item.label}`}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all text-white/70 hover:bg-white/5 hover:translate-x-1"
                  >
                    <item.icon size={20} style={{ color: item.color }} />
                    <span className="font-bold text-sm">{item.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingSidebar;
