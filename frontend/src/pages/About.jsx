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
        <section className="relative h-[50vh] md:h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover brightness-[0.65]" 
              src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&q=80" 
              alt="Northern Province"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-surface/90"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-white font-light leading-[1.1] mb-4 md:mb-6">
                Preserving the <span className="italic font-serif">Architectural Soul</span> of Sri Lanka
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 bg-surface">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-2xl md:text-3xl text-secondary mb-6">Our Focus: Northern Province</h2>
            <div className="space-y-5 text-on-surface-variant font-body text-base md:text-lg leading-relaxed">
              <p>
                Estate Curator is a curated land brokerage specializing in exceptional properties across Sri Lanka's northern province. We connect discerning buyers with the island's most significant land holdings—where history, nature, and architectural potential converge.
              </p>
              <p>
                The Northern Province represents a rare opportunity. After decades of relative isolation, the region is emerging as a destination for heritage tourism, eco-luxury development, and sustainable agriculture. From Jaffna's colonial architecture to Mullaitivu's pristine beaches, we curate lands that offer both immediate value and long-term legacy potential.
              </p>
              <p>
                Every parcel in our portfolio is personally vetted for its unique character, heritage value, and potential for exceptional architecture. We don't just sell land; we present opportunities for legacy investments.
              </p>
            </div>

            <h2 className="font-headline text-2xl md:text-3xl text-secondary mt-10 md:mt-14 mb-6">Our Commitment</h2>
            <ul className="space-y-3 md:space-y-4">
              {[
                'Every title undergoes rigorous legal due diligence',
                'Personal site visits for every listing',
                'Specialists in heritage and agricultural land',
                'Connections with leading architectural firms',
                'Discreet service for discerning clients'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary mt-0.5 flex-shrink-0">check_circle</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>


        {/* CTA */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-surface">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-headline text-2xl md:text-3xl text-secondary mb-4">Ready to Explore?</h3>
            <p className="text-on-surface-variant mb-6">
              View our curated portfolio of exceptional lands in the Northern Province.
            </p>
            <Link 
              to="/lands" 
              className="inline-block bg-secondary text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-label text-sm uppercase tracking-widest hover:bg-sage-dark transition-all"
            >
              View Portfolio
            </Link>
          </div>
        </section>
      </main>
    </Layout>
    </>
  );
};

export default About;
