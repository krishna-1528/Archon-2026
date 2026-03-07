import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  X,
  ArrowLeft
} from 'lucide-react';

const navigationItems = [
  { path: '/', icon: Home, label: 'Home', color: '#10b981' },
  { path: '/events', icon: Calendar, label: 'Events', color: '#8b5cf6' },
  { path: '/arenas', icon: Swords, label: 'Battle Arenas', color: '#10b981' },
  { path: '/workshops', icon: Wrench, label: 'Worshops', color: '#3b82f6' },
  { path: '/expo', icon: Shield, label: 'Guest/Keynote Speakers', color: '#ef4444' },
  { path: '/sponsors', icon: Handshake, label: 'Sponsors', color: '#ff00ff' },
  { path: '/about', icon: Info, label: 'About Us', color: '#00f2ff' },
];

const socialItems = [
  { href: 'https://www.instagram.com/rakshauni/', icon: Instagram, label: 'Instagram', color: '#ff00ff' },
  { href: 'https://in.linkedin.com/school/rakshauni/', icon: Linkedin, label: 'LinkedIn', color: '#00f2ff' },
  { href: 'https://www.youtube.com/channel/UC6Chuk1oKdZUO0eeUzayHMA', icon: Youtube, label: 'YouTube', color: '#ff00ff' },
  { href: 'https://x.com/RakshaUni/', icon: Twitter, label: 'X', color: '#00f2ff' },
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
  const [isAtTop, setIsAtTop] = useState(true);
  const [isReturningHome, setIsReturningHome] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomeRoute = location.pathname === '/';
  const hasPageLevelBackControl =
    location.pathname.startsWith('/event/') || location.pathname === '/dashboard';
  const mobileScrollItems = [
    { path: '/events', label: 'Events' },
    { path: '/arenas', label: 'Battle Arenas' },
    { path: '/workshops', label: 'Workshops' },
    { path: '/expo', label: 'Guests' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/about', label: 'About Us' },
    { path: '/team', label: 'Team/Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY <= 8;
      setIsAtTop(atTop);

      if (!atTop) {
        setIsOpen(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isHomeRoute) {
      setIsOpen(false);
    }
  }, [isHomeRoute]);

  const handleHomeTap = (event) => {
    event.preventDefault();
    setIsOpen(false);
    setIsReturningHome(true);
    navigate('/');
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
    window.setTimeout(() => {
      setIsReturningHome(false);
    }, 220);
  };

  const handleBackTap = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <AnimatePresence>
        {isHomeRoute && isAtTop && (
          <motion.button
            className={`fixed top-4 left-4 z-[100] p-2 rounded-md border shadow-xl backdrop-blur-md transition-opacity ${
              isOpen
                ? 'bg-linear-to-br from-primary/30 via-background/90 to-secondary/30 border-primary/35 text-white opacity-100 shadow-primary/25'
                : 'bg-linear-to-br from-primary/25 via-background/85 to-secondary/25 border-white/20 text-white opacity-100 shadow-secondary/20'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.05, duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={20} strokeWidth={3} className="opacity-100" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={18} strokeWidth={3} className="drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {!isHomeRoute && !hasPageLevelBackControl && (
        <motion.button
          className="fixed top-4 left-4 z-[100] p-2 rounded-md border border-white/20 bg-linear-to-br from-primary/20 via-background/85 to-secondary/20 text-white shadow-xl backdrop-blur-md"
          onClick={handleBackTap}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          aria-label="Go back"
        >
          <ArrowLeft size={18} strokeWidth={3} className="drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]" />
        </motion.button>
      )}

      {/* Mobile Bottom Navigation */}
      {isHomeRoute && !isOpen && isAtTop && (
        <motion.nav
          className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[98] w-[calc(100%-1.5rem)] max-w-md bg-background/45 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ delay: 0.08, duration: 0.22 }}
        >
          <div className="grid grid-cols-6 gap-1">
            <NavLink
              to="/"
              onClick={handleHomeTap}
              className={`flex items-center justify-center rounded-lg py-2 transition-all ${
                isItemActive('/', location) ? 'bg-primary/20 text-primary' : 'text-white/80'
              }`}
            >
              <Home size={18} style={{ color: isItemActive('/', location) ? '#10b981' : undefined }} />
            </NavLink>

            {socialItems
              .filter((item) => item.label !== 'Location')
              .map((item) => (
                <a
                  key={`mobile-bottom-${item.label}`}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  className="flex items-center justify-center rounded-lg py-2 transition-all text-white/80"
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </a>
              ))}
          </div>
        </motion.nav>
      )}

      <AnimatePresence>
        {isReturningHome && (
          <motion.div
            className="fixed inset-0 z-[110] pointer-events-none bg-background/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isHomeRoute && isOpen && (
          <motion.div
            className="fixed inset-0 z-[96] bg-background/92 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
            </div>

            <motion.div
              className="relative min-h-full px-7 pt-20 pb-16 flex items-center justify-center"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 14, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="w-full max-w-sm mx-auto -translate-y-2 space-y-5 text-center">
                {mobileScrollItems.map((item) => {
                  const isActive = isItemActive(item.path, location);

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`galaxy-gradient-text block py-1.5 font-mono font-black uppercase text-[1.7rem] tracking-[0.18em] leading-none text-center transition-all ${
                        isActive ? 'brightness-125' : 'brightness-100'
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingSidebar;
