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
    <footer className="w-full border-t border-primary/10 bg-surface pt-12 md:pt-16 pb-8 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 md:gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-xl md:text-2xl">home</span>
              <span className="text-xl md:text-2xl font-headline italic font-light tracking-wide text-primary">
                Estate Curator
              </span>
            </Link>
            <p className="text-tertiary text-sm md:text-base leading-relaxed max-w-md mb-6">
              Trusted real estate in Sri Lanka's Northern Province. Quality properties in selected areas.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+94112548900" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm">
                <span className="material-symbols-outlined text-secondary text-lg">phone</span>
                <span>+94 11 254 8900</span>
              </a>
              <a href="mailto:curator@estatecurator.lk" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm">
                <span className="material-symbols-outlined text-secondary text-lg">mail</span>
                <span>curator@estatecurator.lk</span>
              </a>
            </div>
          </div>

          {/* Areas - SEO */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-primary font-semibold mb-4 md:mb-6">Areas</h4>
            <div className="flex flex-col gap-2 md:gap-3">
              {areas.map((area) => (
                <Link key={area} to="/" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">
                  {area}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-primary font-semibold mb-4 md:mb-6">Quick Links</h4>
            <div className="flex flex-col gap-2 md:gap-3">
              <Link to="/" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">Home</Link>
              <Link to="/lands" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">Lands</Link>
              <Link to="/blog" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">Blog</Link>
              <Link to="/about" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">About Us</Link>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 mt-4 md:mt-6">
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chat</span>
              </a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">camera</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 md:pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs md:text-sm text-on-surface-variant">
            © {currentYear} Estate Curator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
