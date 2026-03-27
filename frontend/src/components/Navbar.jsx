import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEnquiry } from '../context/EnquiryContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openEnquiry } = useEnquiry();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/lands', label: 'Lands' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-surface/95 backdrop-blur-lg shadow-sm shadow-secondary/5' 
          : 'bg-surface/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center -my-2 group">
            <img 
              src="/logo.png" 
              alt="7hilax RealAgro" 
              className="h-24 md:h-30 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 font-label text-sm uppercase tracking-wider transition-all duration-300 ${
                  isActive(link.to)
                    ? 'text-secondary'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive(link.to) && (
                  <span className="absolute inset-0 bg-secondary/10 rounded-lg -z-0"></span>
                )}
                {!isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary/0 group-hover:bg-secondary/50 transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => openEnquiry()}
              className="hidden sm:flex items-center gap-2 bg-secondary text-white px-5 md:px-6 py-2.5 rounded-full font-label text-xs uppercase tracking-wider hover:bg-sage-dark hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300 group"
            >
              <span>Enquire</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-secondary text-2xl transition-transform duration-300" style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'none' }}>
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-surface/95 backdrop-blur-lg border-t border-outline-variant/30 px-4 py-5 space-y-1">
          {navLinks.map((link, idx) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block font-label text-sm uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive(link.to) 
                  ? 'text-secondary bg-secondary/10 font-medium' 
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-secondary'
              }`}
              style={{ transitionDelay: `${idx * 30}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              openEnquiry();
            }}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3.5 rounded-full font-label text-sm uppercase tracking-wider hover:bg-sage-dark transition-all duration-300"
          >
            <span>Enquire Now</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
