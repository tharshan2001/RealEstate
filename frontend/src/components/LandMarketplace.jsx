import React, { useState } from 'react';

const LandMarketplace = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // HEX map from reference image:
  // Primary: #3F5E46 | Accent: #6D7E73 | Surface: #F5F5ED 
  // Text: #1C261F | Highlight: #B2C2B1

  return (
    <div className="min-h-screen bg-[#F5F5ED] font-sans text-[#1C261F]">
      
      {/* ================= HEADER (Primary Forest Green) ================= */}
      <header className="bg-[#3F5E46] text-[#F5F5ED] sticky top-0 z-50 shadow-sm border-b border-[#6D7E73]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
              <div className="w-7 h-7 bg-[#B2C2B1] rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-[#3F5E46]"></div>
              </div>
              <span className="font-bold text-xl tracking-tighter uppercase">TerraFirma</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center text-[11px] font-bold uppercase tracking-[0.15em]">
              <a href="#" className="text-white hover:text-[#B2C2B1] transition">Marketplace</a>
              <a href="#" className="text-white/80 hover:text-[#B2C2B1] transition">Investments</a>
              <a href="#" className="text-white/80 hover:text-[#B2C2B1] transition">Sell</a>
              <a href="#" className="text-white/80 hover:text-[#B2C2B1] transition">Legal</a>
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-xs font-bold uppercase tracking-widest text-[#B2C2B1] hover:text-white transition">Sign In</button>
              <button className="bg-[#B2C2B1] text-[#1C261F] px-5 py-2 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-white transition">
                List Property
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#B2C2B1]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#3F5E46] py-24 border-b border-[#6D7E73]/30">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/granite.png')]"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-white mb-6 leading-[1.1]">
            Acquire <span className="italic text-[#B2C2B1]">Premium</span> Land <br/> with Absolute Certainty.
          </h1>
          <p className="text-lg text-[#F5F5ED]/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Institutional-grade brokerage for commercial tracts, agricultural assets, and strategic development plots.
          </p>

          {/* Search Panel (The Surface Tone) */}
          <div className="bg-[#F5F5ED] rounded-sm p-2 shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
            <div className="flex-1 text-left px-4 py-3 border-r border-[#6D7E73]/20">
              <label className="block text-[10px] font-black text-[#6D7E73] uppercase tracking-widest mb-1">Geography</label>
              <input type="text" placeholder="Region or District" className="w-full bg-transparent focus:outline-none text-[#1C261F] font-bold placeholder-[#6D7E73]/50" />
            </div>
            <div className="flex-1 text-left px-4 py-3 border-r border-[#6D7E73]/20">
              <label className="block text-[10px] font-black text-[#6D7E73] uppercase tracking-widest mb-1">Asset Class</label>
              <select className="w-full bg-transparent focus:outline-none text-[#1C261F] font-bold appearance-none cursor-pointer">
                <option>Commercial / Industrial</option>
                <option>Agricultural</option>
                <option>Large Tract Residential</option>
              </select>
            </div>
            <button className="bg-[#3F5E46] hover:bg-[#1C261F] text-white font-black py-4 px-10 rounded-sm transition uppercase tracking-[0.2em] text-xs">
              Browse Lands
            </button>
          </div>

          <div className="mt-8 flex justify-center items-center gap-8 text-[#B2C2B1] text-[10px] font-bold uppercase tracking-[0.3em]">
            <span>Verified Agents</span>
            <span className="w-1 h-1 bg-[#6D7E73] rounded-full"></span>
            <span>Legal Due Diligence</span>
            <span className="w-1 h-1 bg-[#6D7E73] rounded-full"></span>
            <span>Secure Escrow</span>
          </div>
        </div>
      </section>

      {/* ================= LISTINGS SECTION ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-[#6D7E73]/20 pb-6">
          <div>
            <h2 className="text-3xl font-serif text-[#1C261F]">Market Highlights</h2>
            <p className="text-[#6D7E73] font-bold text-xs uppercase tracking-widest mt-2">Active Portfolios • 2026</p>
          </div>
          <a href="#" className="text-xs font-black text-[#3F5E46] border-b-2 border-[#3F5E46] pb-1 hover:text-[#6D7E73] hover:border-[#6D7E73] transition uppercase tracking-widest">
            View All Records
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card Style following the "Available" badge look from the screenshot */}
          {[
            { price: 'LKR 45M', type: 'Industrial • 5 acres', loc: 'Western Province', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800' },
            { price: 'LKR 120M', type: 'Agricultural • 15 acres', loc: 'Central Highlands', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800' },
            { price: 'LKR 12M', type: 'Agricultural • 2 acres', loc: 'Kurunegala District', img: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=800' }
          ].map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-[16/10] bg-[#6D7E73]/10 overflow-hidden rounded-sm mb-4 relative">
                <img src={item.img} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700" alt="land" />
                {idx === 1 && (
                  <div className="absolute top-3 left-3 bg-[#3F5E46] text-[#F5F5ED] text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm">
                    Premium Asset
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-2xl font-bold text-[#1C261F]">{item.price}</h3>
                <span className="bg-[#3F5E46] text-[#F5F5ED] text-[9px] px-2 py-1 font-black uppercase tracking-tighter rounded-full mt-1">
                  Available
                </span>
              </div>
              <p className="text-[#6D7E73] text-xs font-black uppercase tracking-widest mb-1">{item.type}</p>
              <p className="text-[#1C261F]/60 text-xs italic font-medium">{item.loc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER (Near-Black Forest) ================= */}
      <footer className="bg-[#1C261F] text-[#F5F5ED]/50 py-16 border-t border-[#6D7E73]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="font-bold text-white text-lg uppercase tracking-tighter mb-4 block">TerraFirma</span>
            <p className="text-xs leading-loose font-medium max-w-xs">
              Specialized land acquisition firm providing secure asset transfer and institutional-grade valuation services.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-6">Marketplace</h4>
            <ul className="text-xs space-y-4 font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#B2C2B1] transition">Industrial</a></li>
              <li><a href="#" className="hover:text-[#B2C2B1] transition">Agricultural</a></li>
              <li><a href="#" className="hover:text-[#B2C2B1] transition">Tract Search</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-6">Compliance</h4>
            <ul className="text-xs space-y-4 font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#B2C2B1] transition">Zoning Laws</a></li>
              <li><a href="#" className="hover:text-[#B2C2B1] transition">Tax Advisory</a></li>
              <li><a href="#" className="hover:text-[#B2C2B1] transition">Due Diligence</a></li>
            </ul>
          </div>

          <div className="bg-[#3F5E46]/10 p-6 border border-[#6D7E73]/20">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Firm Newsletter</h4>
            <div className="flex">
              <input type="email" placeholder="Professional Email" className="bg-transparent border-b border-[#6D7E73] text-xs py-2 w-full focus:outline-none focus:border-[#B2C2B1] transition uppercase font-bold tracking-widest" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandMarketplace;