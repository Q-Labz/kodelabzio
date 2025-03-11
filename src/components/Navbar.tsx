import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeadModal } from '../contexts/LeadModalContext';
import Logo from './ui/Logo';
import Button from './ui/Button';
import { ROUTES, ROUTE_TITLES } from '../routes/constants';

const Navbar: React.FC = () => {
  const { openModal } = useLeadModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: ROUTES.ABOUT, label: ROUTE_TITLES[ROUTES.ABOUT] },
    { path: ROUTES.SERVICES, label: ROUTE_TITLES[ROUTES.SERVICES] },
    { path: ROUTES.PROJECTS, label: ROUTE_TITLES[ROUTES.PROJECTS] },
    { path: ROUTES.CONTACT, label: ROUTE_TITLES[ROUTES.CONTACT] }
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-deep-brown-200/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-gray-300 hover:text-accent transition-colors relative ${
                  isActive(link.path) ? 'text-accent' : ''
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Button onClick={openModal} size="lg">
              Get Started
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:text-accent transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-deep-brown-200/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-gray-300 hover:text-accent transition-colors py-2 ${
                      isActive(link.path) ? 'text-accent' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openModal();
                  }}
                  className="w-full"
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;