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
        <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBApC1Wy3-SQdv9VVRcQKo2RS8YFHT4sUXxOsfnjEzBYZBvx9hLesBF9B6Fw2MCET0dEUaROOiU6hz2Jy2Ewm_R7J-y8ff_ga9iA9eo6if4gqkisbWQnx0Ro87ZvnNuFAY8yYq30bfpsfshEP6uqH-QqqEfSTQojI2QRHCUu5eBkSxWf6s80BXynbYOSCQuIxAvxKhULteKuKyWH1PqMpfGnx-AmrzADtuaNtosq7SC9CBWFRtoS8RLIjs0F2oKS7muMVG4my07Pzzc" 
              alt="Jaffna coastline"
            />
            <div className="absolute inset-0 bg-secondary/40"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="text-white font-label uppercase tracking-[0.3em] text-sm mb-4 md:mb-6 block">Our Story</span>
            <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-headline leading-tight mb-6 md:mb-8">
              The Soul <span className="italic font-light">of the</span> North
            </h1>
            <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
              Rooted in history, crafted for the future. We curate exceptional living spaces that bridge the gap between ancient heritage and modern luxury.
            </p>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <span className="material-symbols-outlined text-white text-3xl">keyboard_double_arrow_down</span>
          </div>
        </section>

        {/* The Heritage Section */}
        <section className="py-12 md:py-20 lg:py-24 px-4 md:px-8 bg-surface">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-headline text-secondary mb-8 md:mb-10 text-center leading-tight">The Northern Legacy</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  className="w-full h-64 md:h-80 lg:h-96 object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ7Ip4A-uEEo7ymP4jf3kJxhRjJLI-bE1ObNLRWA5spcZFTiSWcpthJS74gPPAMjDj2w6PM2_l1pZ3EPP34G-_oRgsP_u1st1L8UaW9V8uguP9h3uruMOd8P2wfdIhetJOjRxRZjVPukbcVe75izYDPjdlCVewDP1hZ068eGhKNp_1bv0L2Vk3pIJdsop7YutImGtwMrZXwBW5B1Wy8_12Lw1d2gJo5XpB2rkB0ttaZIleaOj3miITfHMxIIGavpChvFUcx9IdbyHs" 
                  alt="Jaffna courtyard"
                />
              </div>
              <div className="space-y-4 text-on-surface-variant leading-relaxed font-body text-sm md:text-base">
                <p>Jaffna Estates was born from a deep reverence for the distinct cultural tapestry of Northern Sri Lanka. For centuries, this land has stood as a gateway of ideas, blending Dravidian influences with colonial narratives and indigenous wisdom.</p>
                <p>Our roots are buried deep in the limestone soil. We believe that preserving the legacy of the North isn't about looking backward—it's about carrying the soul of our history into the spaces we build today.</p>
                <p className="text-tertiary font-semibold">Tropical Modernism is our language; the landscape is our canvas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-12 md:py-16 lg:py-24 px-4 md:px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-14 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-secondary mb-4 md:mb-6">Our Mission</h2>
              <p className="text-on-surface-variant font-body">Redefining the standard of living through three core pillars of impact.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-surface-container-lowest p-6 md:p-8 lg:p-10 rounded-xl transition-transform hover:-translate-y-2 duration-300">
                <span className="material-symbols-outlined text-secondary text-3xl md:text-4xl mb-4 md:mb-6">eco</span>
                <h3 className="text-xl md:text-2xl font-headline text-secondary mb-3 md:mb-4">Sustainable Development</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Utilizing locally sourced materials and passive cooling techniques to create structures that breathe with the environment.</p>
              </div>
              <div className="bg-surface-container-lowest p-6 md:p-8 lg:p-10 rounded-xl transition-transform hover:-translate-y-2 duration-300">
                <span className="material-symbols-outlined text-secondary text-3xl md:text-4xl mb-4 md:mb-6">history_edu</span>
                <h3 className="text-xl md:text-2xl font-headline text-secondary mb-3 md:mb-4">Heritage Conservation</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Restoring architectural landmarks and ensuring that new developments honor the geometric purity of Northern design.</p>
              </div>
              <div className="bg-surface-container-lowest p-6 md:p-8 lg:p-10 rounded-xl transition-transform hover:-translate-y-2 duration-300">
                <span className="material-symbols-outlined text-secondary text-3xl md:text-4xl mb-4 md:mb-6">trending_up</span>
                <h3 className="text-xl md:text-2xl font-headline text-secondary mb-3 md:mb-4">Investment Potential</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Unlocking high-value opportunities in the burgeoning Northern market while maintaining ecological and social integrity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 md:py-14 px-4 md:px-8 bg-secondary-container fade-in-up">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { num: '6', label: 'Curated Sites' },
                { num: '6', label: 'Locations' },
                { num: '30+', label: 'Years Heritage' },
                { num: '100%', label: 'Verified Titles' }
              ].map((stat, idx) => (
                <div key={idx} className="p-4 md:p-6">
                  <p className="font-headline text-3xl md:text-4xl text-on-secondary-container">{stat.num}</p>
                  <p className="font-label text-xs uppercase tracking-widest text-on-secondary-container mt-2 opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architectural Philosophy */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-surface overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-secondary mb-6 md:mb-8">Dialogue between Land and Architecture</h2>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-6 md:mb-8">Inspired by the "In-between spaces" of Geoffrey Bawa, our designs reject the boundary between inside and out. In the North, where the sun is fierce and the breeze is a gift, we build for shadow and air.</p>
              <ul className="space-y-4 md:space-y-6">
                <li className="flex items-start gap-3 md:gap-4">
                  <span className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary-container text-lg md:text-xl">foundation</span>
                  </span>
                  <div>
                    <h4 className="font-bold text-secondary text-sm md:text-base">Structural Sincerity</h4>
                    <p className="text-on-surface-variant text-sm">Honest expression of materials—concrete, wood, and stone.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 md:gap-4">
                  <span className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary-container text-lg md:text-xl">wb_sunny</span>
                  </span>
                  <div>
                    <h4 className="font-bold text-secondary text-sm md:text-base">Light and Shade</h4>
                    <p className="text-on-surface-variant text-sm">Dramatic play of shadows through curated pergolas and screens.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 md:gap-4">
              <img 
                className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg mt-8 md:mt-12" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Flx6fiQisHk97SGKZpYabES3p2sDGPBf20CLv0FcMcQj2k42LnHk-fqKfIFKw4wA3GWULwWTVu1WIpgQiFvkE-JKBGf-3QP8J4yBuSdHxbWQdK9-oWba0Lp-UzyiKDUjkWg0hNb3SkaXELyQaB4G6q-auIvpHmNaW5y-KbdELzOTY2SBCSozjTvDet8NpOMgNu0vgGcK2kAKN-TgsBbw060l71_QT_hxkR91iAD5wTyxhj_rSvNx5OaVGOAbTOdPQhpvsI0kAmfy" 
                alt="Architectural shadows"
              />
              <img 
                className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqrcRmgaZ-aJvP7miNg2Zw4rkiAeNy6AOPxfoBxRj8E84TCgislUaN1It_zyMNy9Zb6p-UxYIQRxQ_5OKGenHAwZip7-licX6wceTmSxQkr__Mf7TjX-QHBzdrb8LzSoeiWpE5mEWRGwPDfW_YD9Cu0Yix9rZXdwTSdJEv1_1YxLSnsqGPUBF9IVlI-d2MsM3DhJa5Q5yF-nvob_E66NWr3yLIwhgrDMcyInkYGNDyNQw3QxJ7HigTLhBNcc0XzD_QWuYm_NGAZe-i" 
                alt="Minimalist wall"
              />
            </div>
          </div>
        </section>

        {/* Mobile-only: compact testimonial carousel */}
        <MobileTestimonialsCarousel />

        {/* Testimonials (5 testimonials, no photos) for md and up */}
        <section className="py-12 md:py-16 lg:py-24 px-4 md:px-8 bg-surface-container-highest hidden md:block">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-headline text-2xl md:text-3xl text-secondary mb-8 md:mb-12">What Our Clients Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
              {[
                { quote: "Estate Curator transformed our living spaces into timeless blends of heritage and luxury.", name: "Alex M.", title: "Property Investor" },
                { quote: "The Northern designs feel premium yet welcoming — a rare balance.", name: "Priya K.", title: "Architect" },
                { quote: "Quality, integrity, and thoughtful detail from start to finish.", name: "Jon D.", title: "Home Owner" },
                { quote: "Sustainability with style; the spaces breathe with the climate.", name: "Nila P.", title: "Developer" },
                { quote: "The team understands place and culture; the spaces breathe.", name: "Sanjay R.", title: "Gallerist" },
              ].map((t, idx) => (
                <div key={idx} className="bg-surface-container-low rounded-xl p-4 md:p-6 max-w-xs w-full text-left">
                  <p className="text-sm md:text-base text-on-surface-variant italic">"{t.quote}"</p>
                  <p className="mt-3 font-semibold text-secondary">{t.name}</p>
                  <p className="text-xs text-on-surface-variant">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-surface">
          <div className="max-w-3xl mx-auto bg-secondary rounded-2xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-sage/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-headline mb-6 md:mb-8 relative z-10">Ready to Join the Legacy?</h2>
            <p className="text-white/80 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto relative z-10">Our consultants are ready to walk you through the heritage and potential of the Northern estates.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 relative z-10">
              <Link 
                to="/lands"
                className="bg-white text-secondary px-8 md:px-10 py-3 md:py-4 rounded-full font-label text-sm uppercase tracking-widest hover:scale-105 transition-transform duration-300"
              >
                Explore the Estates
              </Link>
              <button 
                onClick={() => openEnquiry()}
                className="border border-white/30 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-label text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
    </>
  );
};

export default Home;
