import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const areas = [
    'Jaffna Peninsula',
    'Chavakachcheri',
    'Point Pedro',
    'Kilinochchi',
    'Mannar Island',
    'Mullaitivu'
  ];

  return (
    <footer className="w-full border-t border-secondary/10 bg-surface pt-12 md:pt-16 pb-8 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 md:gap-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-xl md:text-2xl">home</span>
              <span className="text-xl md:text-2xl font-headline italic font-light tracking-wide text-secondary">
                7hilax RealAgro
              </span>
            </Link>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-md mb-6">
              Premium agricultural and real estate solutions in Sri Lanka's Northern Province. Quality lands in selected areas.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+94771234567" className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors text-sm">
                <span className="material-symbols-outlined text-tertiary text-lg">phone</span>
                <span>+94 740 404 505</span>
              </a>
              <a href="mailto:info@7hilax.com" className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors text-sm">
                <span className="material-symbols-outlined text-tertiary text-lg">mail</span>
                <span>info@7hilax.com</span>
              </a>
            </div>
          </div>

          {/* Areas - SEO (hidden on small screens for minimal mobile footer) */}
          <div className="hidden md:block">
            <h4 className="font-label text-xs uppercase tracking-widest text-secondary font-semibold mb-4 md:mb-6">Areas</h4>
            <div className="flex flex-col gap-2 md:gap-3">
              {areas.map((area) => (
                <Link key={area} to="/" className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors">
                  {area}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-secondary font-semibold mb-4 md:mb-6">Quick Links</h4>
            <div className="flex flex-col gap-2 md:gap-3">
              <Link to="/" className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors">Home</Link>
              <Link to="/lands" className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors">Lands</Link>
              <Link to="/blog" className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors">Blog</Link>
              <Link to="/about" className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors">About Us</Link>
            </div>
            {/* Social Links (hidden on small screens for minimal mobile footer) */}
            <div className="hidden md:flex gap-4 mt-4 md:mt-6">
              <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">
                <span className="material-symbols-outlined">chat</span>
              </a>
              <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors">
                <span className="material-symbols-outlined">camera</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 md:pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs md:text-sm text-on-surface-variant">
            © {currentYear} 7hilax RealAgro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
