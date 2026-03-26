import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/lands', label: 'Lands' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <span className="material-symbols-outlined text-primary text-xl md:text-2xl">home</span>
            <span className="text-lg md:text-2xl font-headline italic font-light tracking-wide text-primary">
              7hilax RealAgro
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-label text-sm uppercase tracking-widest pb-1 transition-colors duration-300 ${
                  isActive(link.to)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              to="/"
              className="hidden sm:block bg-primary text-on-primary px-4 md:px-6 py-2 md:py-2.5 rounded-full font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Enquire
            </Link>
            
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-primary">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/20">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block font-label text-sm uppercase tracking-widest py-2 ${
                  isActive(link.to) ? 'text-primary font-semibold' : 'text-on-surface-variant'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-primary text-on-primary px-6 py-3 rounded-full font-label text-sm uppercase tracking-widest"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
