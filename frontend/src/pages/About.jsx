import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const About = () => {
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about RealAgro - a curated land brokerage specializing in exceptional properties across Sri Lanka's Northern Province. Heritage, sustainability, and investment potential."
        keywords="about realagro, northern sri lanka real estate, land brokerage, heritage property, sustainable development"
        url="/about"
      />
      <Layout>
      <main className="pt-0">
        {/* Hero */}
        <section className="relative h-[55vh] md:h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.75] transition-all duration-700" 
              src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&q=80" 
              alt="Northern Province"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-transparent to-surface/95"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl fade-in-up">
              <span className="inline-block bg-white/10 backdrop-blur-sm text-white/90 text-xs font-label uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">About Us</span>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light leading-[1.1] mb-6">
                Preserving the <span className="italic font-serif">Architectural Soul</span> of Sri Lanka
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 md:px-6 lg:px-8 py-14 md:py-20 lg:py-24 bg-surface">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-2xl md:text-3xl text-secondary mb-8 fade-in-up">Our Focus: Northern Province</h2>
            <div className="space-y-6 text-on-surface-variant font-body text-base md:text-lg leading-relaxed">
              <p className="fade-in-up" style={{ animationDelay: '100ms' }}>
                Estate Curator is a curated land brokerage specializing in exceptional properties across Sri Lanka's northern province. We connect discerning buyers with the island's most significant land holdings—where history, nature, and architectural potential converge.
              </p>
              <p className="fade-in-up" style={{ animationDelay: '150ms' }}>
                The Northern Province represents a rare opportunity. After decades of relative isolation, the region is emerging as a destination for heritage tourism, eco-luxury development, and sustainable agriculture. From Jaffna's colonial architecture to Mullaitivu's pristine beaches, we curate lands that offer both immediate value and long-term legacy potential.
              </p>
              <p className="fade-in-up" style={{ animationDelay: '200ms' }}>
                Every parcel in our portfolio is personally vetted for its unique character, heritage value, and potential for exceptional architecture. We don't just sell land; we present opportunities for legacy investments.
              </p>
            </div>

            <h2 className="font-headline text-2xl md:text-3xl text-secondary mt-14 md:mt-20 mb-8 fade-in-up" style={{ animationDelay: '250ms' }}>Our Commitment</h2>
            <ul className="space-y-4 md:space-y-5">
              {[
                'Every title undergoes rigorous legal due diligence',
                'Personal site visits for every listing',
                'Specialists in heritage and agricultural land',
                'Connections with leading architectural firms',
                'Discreet service for discerning clients'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 fade-in-up" style={{ animationDelay: `${300 + idx * 50}ms` }}>
                  <span className="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-on-surface-variant">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 md:px-6 lg:px-8 py-12 md:py-16 bg-surface-container-low">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '50+', label: 'Properties' },
              { value: '5', label: 'Regions' },
              { value: '100%', label: 'Verified' },
              { value: '15+', label: 'Years' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="font-headline text-3xl md:text-4xl text-secondary mb-2">{stat.value}</div>
                <div className="text-on-surface-variant text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-surface">
          <div className="text-center max-w-xl mx-auto fade-in-up">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-secondary text-3xl">explore</span>
            </div>
            <h3 className="font-headline text-2xl md:text-3xl text-secondary mb-4">Ready to Explore?</h3>
            <p className="text-on-surface-variant mb-8 leading-relaxed max-w-md mx-auto">
              View our curated portfolio of exceptional lands in the Northern Province.
            </p>
            <Link 
              to="/lands" 
              className="inline-flex items-center gap-2 bg-secondary text-white px-10 py-4 rounded-full font-label text-sm uppercase tracking-widest hover:bg-sage-dark hover:shadow-xl hover:shadow-secondary/25 transition-all duration-300"
            >
              View Portfolio
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
    </>
  );
};

export default About;
