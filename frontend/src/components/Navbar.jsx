import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEnquiry } from '../context/EnquiryContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openEnquiry } = useEnquiry();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/lands', label: 'Lands' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          <Link to="/" className="flex items-center -my-2">
            <img src="/logo.png" alt="7hilax RealAgro" className="h-16 md:h-20 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-label text-sm uppercase tracking-widest pb-1 transition-colors duration-300 ${
                  isActive(link.to)
                    ? 'text-secondary border-b-2 border-secondary'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => openEnquiry()}
              className="hidden sm:block bg-secondary text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Enquire
            </button>
            
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-secondary">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-slate-200/50">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block font-label text-sm uppercase tracking-widest py-2 ${
                  isActive(link.to) ? 'text-secondary font-semibold' : 'text-on-surface-variant'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                openEnquiry();
              }}
              className="block w-full text-center bg-secondary text-white px-6 py-3 rounded-full font-label text-sm uppercase tracking-widest"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
