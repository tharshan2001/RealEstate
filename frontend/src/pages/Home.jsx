import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useEnquiry } from '../context/EnquiryContext';
import MobileTestimonialsCarousel from '../components/MobileTestimonialsCarousel';

const Home = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <>
      <SEO 
        title="Premium Land Holdings in Northern Sri Lanka"
        description="Discover curated land holdings across Sri Lanka's Northern Province. From Jaffna to Mullaitivu, find your perfect investment property with verified titles."
        keywords="land for sale northern sri lanka, jaffna property, real estate investment, agricultural land, Jaffna estates"
        url="/"
      />
      <Layout>
      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative h-[75vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBApC1Wy3-SQdv9VVRcQKo2RS8YFHT4sUXxOsfnjEzBYZBvx9hLesBF9B6Fw2MCET0dEUaROOiU6hz2Jy2Ewm_R7J-y8ff_ga9iA9eo6if4gqkisbWQnx0Ro87ZvnNuFAY8yYq30bfpsfshEP6uqH-QqqEfSTQojI2QRHCUu5eBkSxWf6s80BXynbYOSCQuIxAvxKhULteKuKyWH1PqMpfGnx-AmrzADtuaNtosq7SC9CBWFRtoS8RLIjs0F2oKS7muMVG4my07Pzzc" 
              alt="Jaffna coastline"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-secondary/60"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center fade-in-up">
            <span className="inline-block text-white/80 font-label uppercase tracking-[0.3em] text-xs md:text-sm mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">Our Story</span>
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline leading-tight mb-6 md:mb-8">
              The Soul <span className="italic font-light">of the</span> North
            </h1>
            <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
              Rooted in history, crafted for the future. We curate exceptional living spaces that bridge the gap between ancient heritage and modern luxury.
            </p>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <span className="material-symbols-outlined text-white/80 text-3xl">keyboard_double_arrow_down</span>
          </div>
        </section>

        {/* The Heritage Section */}
        <section className="py-14 md:py-20 lg:py-28 px-4 md:px-8 bg-surface">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16 fade-in-up">
              <span className="font-label text-tertiary uppercase tracking-[0.3em] text-xs font-semibold">Our Heritage</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-headline text-secondary mt-3 leading-tight">The Northern Legacy</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative overflow-hidden rounded-2xl group fade-in-up" style={{ animationDelay: '100ms' }}>
                <img 
                  className="w-full h-72 md:h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ7Ip4A-uEEo7ymP4jf3kJxhRjJLI-bE1ObNLRWA5spcZFTiSWcpthJS74gPPAMjDj2w6PM2_l1pZ3EPP34G-_oRgsP_u1st1L8UaW9V8uguP9h3uruMOd8P2wfdIhetJOjRxRZjVPukbcVe75izYDPjdlCVewDP1hZ068eGhKNp_1bv0L2Vk3pIJdsop7YutImGtwMrZXwBW5B1Wy8_12Lw1d2gJo5XpB2rkB0ttaZIleaOj3miITfHMxIIGavpChvFUcx9IdbyHs" 
                  alt="Jaffna courtyard"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-5 md:space-y-6 text-on-surface-variant leading-relaxed font-body text-sm md:text-base fade-in-up" style={{ animationDelay: '200ms' }}>
                <p>Jaffna Estates was born from a deep reverence for the distinct cultural tapestry of Northern Sri Lanka. For centuries, this land has stood as a gateway of ideas, blending Dravidian influences with colonial narratives and indigenous wisdom.</p>
                <p>Our roots are buried deep in the limestone soil. We believe that preserving the legacy of the North isn't about looking backward—it's about carrying the soul of our history into the spaces we build today.</p>
                <p className="text-secondary font-semibold">Tropical Modernism is our language; the landscape is our canvas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-14 md:py-20 lg:py-28 px-4 md:px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto fade-in-up">
              <span className="font-label text-tertiary uppercase tracking-[0.3em] text-xs font-semibold">What We Do</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-secondary mt-3 mb-5">Our Mission</h2>
              <p className="text-on-surface-variant font-body text-base md:text-lg">Redefining the standard of living through three core pillars of impact.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: 'eco', title: 'Sustainable Development', desc: 'Utilizing locally sourced materials and passive cooling techniques to create structures that breathe with the environment.' },
                { icon: 'history_edu', title: 'Heritage Conservation', desc: 'Restoring architectural landmarks and ensuring that new developments honor the geometric purity of Northern design.' },
                { icon: 'trending_up', title: 'Investment Potential', desc: 'Unlocking high-value opportunities in the burgeoning Northern market while maintaining ecological and social integrity.' }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-surface-container-lowest p-8 md:p-10 lg:p-12 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-secondary/10 fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-secondary text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-headline text-secondary mb-4">{item.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-secondary-container fade-in-up">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { num: '6', label: 'Curated Sites' },
                { num: '6', label: 'Locations' },
                { num: '30+', label: 'Years Heritage' },
                { num: '100%', label: 'Verified Titles' }
              ].map((stat, idx) => (
                <div key={idx} className="p-4 md:p-6">
                  <p className="font-headline text-4xl md:text-5xl text-on-secondary-container">{stat.num}</p>
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-secondary-container mt-2 opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architectural Philosophy */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-surface overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 fade-in-up">
              <span className="font-label text-tertiary uppercase tracking-[0.3em] text-xs font-semibold">Our Philosophy</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-secondary mt-3 mb-6 md:mb-8 leading-tight">Dialogue between Land and Architecture</h2>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8 md:mb-10">Inspired by the "In-between spaces" of Geoffrey Bawa, our designs reject the boundary between inside and out. In the North, where the sun is fierce and the breeze is a gift, we build for shadow and air.</p>
              <div className="space-y-5 md:space-y-6">
                {[
                  { icon: 'foundation', title: 'Structural Sincerity', desc: 'Honest expression of materials—concrete, wood, and stone.' },
                  { icon: 'wb_sunny', title: 'Light and Shade', desc: 'Dramatic play of shadows through curated pergolas and screens.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 md:gap-5">
                    <span className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-secondary-container text-xl md:text-2xl">{item.icon}</span>
                    </span>
                    <div>
                      <h4 className="font-semibold text-secondary text-base md:text-lg mb-1">{item.title}</h4>
                      <p className="text-on-surface-variant text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 md:gap-5 fade-in-up" style={{ animationDelay: '100ms' }}>
              <img 
                className="w-full h-56 md:h-72 lg:h-96 object-cover rounded-2xl mt-8 md:mt-16" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Flx6fiQisHk97SGKZpYabES3p2sDGPBf20CLv0FcMcQj2k42LnHk-fqKfIFKw4wA3GWULwWTVu1WIpgQiFvkE-JKBGf-3QP8J4yBuSdHxbWQdK9-oWba0Lp-UzyiKDUjkWg0hNb3SkaXELyQaB4G6q-auIvpHmNaW5y-KbdELzOTY2SBCSozjTvDet8NpOMgNu0vgGcK2kAKN-TgsBbw060l71_QT_hxkR91iAD5wTyxhj_rSvNx5OaVGOAbTOdPQhpvsI0kAmfy" 
                alt="Architectural shadows"
              />
              <img 
                className="w-full h-56 md:h-72 lg:h-96 object-cover rounded-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqrcRmgaZ-aJvP7miNg2Zw4rkiAeNy6AOPxfoBxRj8E84TCgislUaN1It_zyMNy9Zb6p-UxYIQRxQ_5OKGenHAwZip7-licX6wceTmSxQkr__Mf7TjX-QHBzdrb8LzSoeiWpE5mEWRGwPDfW_YD9Cu0Yix9rZXdwTSdJEv1_1YxLSnsqGPUBF9IVlI-d2MsM3DhJa5Q5yF-nvob_E66NWr3yLIwhgrDMcyInkYGNDyNQw3QxJ7HigTLhBNcc0XzD_QWuYm_NGAZe-i" 
                alt="Minimalist wall"
              />
            </div>
          </div>
        </section>

        {/* Mobile-only: compact testimonial carousel */}
        <MobileTestimonialsCarousel />

        {/* Testimonials for md and up */}
        <section className="py-14 md:py-20 lg:py-28 px-4 md:px-8 bg-surface-container-highest hidden md:block">
          <div className="max-w-7xl mx-auto text-center">
            <span className="font-label text-tertiary uppercase tracking-[0.3em] text-xs font-semibold">Testimonials</span>
            <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl text-secondary mt-3 mb-12 md:mb-16">What Our Clients Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
              {[
                { quote: "Estate Curator transformed our living spaces into timeless blends of heritage and luxury.", name: "Alex M.", title: "Property Investor" },
                { quote: "The Northern designs feel premium yet welcoming — a rare balance.", name: "Priya K.", title: "Architect" },
                { quote: "Quality, integrity, and thoughtful detail from start to finish.", name: "Jon D.", title: "Home Owner" },
                { quote: "Sustainability with style; the spaces breathe with the climate.", name: "Nila P.", title: "Developer" },
                { quote: "The team understands place and culture; the spaces breathe.", name: "Sanjay R.", title: "Gallerist" },
              ].map((t, idx) => (
                <div key={idx} className="bg-surface-container-low rounded-2xl p-5 md:p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-8 h-8 text-secondary/20 mb-3">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                  <p className="text-sm md:text-base text-on-surface-variant italic leading-relaxed">"{t.quote}"</p>
                  <p className="mt-4 font-semibold text-secondary text-sm">{t.name}</p>
                  <p className="text-xs text-on-surface-variant">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-surface">
          <div className="max-w-4xl mx-auto bg-secondary rounded-3xl p-10 md:p-14 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-sage/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-sage/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 fade-in-up">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="material-symbols-outlined text-white text-3xl">explore</span>
              </div>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-headline mb-6">Ready to Join the Legacy?</h2>
              <p className="text-white/80 text-base md:text-lg mb-10 max-w-xl mx-auto">Our consultants are ready to walk you through the heritage and potential of the Northern estates.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/lands"
                  className="bg-white text-secondary px-10 py-4 rounded-full font-label text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Explore the Estates
                </Link>
                <button 
                  onClick={() => openEnquiry()}
                  className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-label text-sm uppercase tracking-widest hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
    </>
  );
};

export default Home;
