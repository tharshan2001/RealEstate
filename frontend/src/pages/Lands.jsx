import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { landsApi } from '../utils/api';

const Lands = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState('All');

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await landsApi.getLands();
        setLands(response.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchLands();
  }, []);

  const filteredLands = activeRegion === 'All' 
    ? lands 
    : lands.filter(land => land.region === activeRegion);

  const regions = ['All', 'Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vanni'];

  return (
    <>
      <SEO 
        title="Available Lands"
        description="Browse our curated collection of premium lands for sale in Northern Sri Lanka. Properties in Jaffna, Kilinochchi, Mannar, Mullaitivu, and Vanni with verified titles."
        keywords="lands for sale, northern sri lanka, jaffna land, buy land, investment property"
        url="/lands"
      />
      <Layout>
      <main className="pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
        <header className="mb-8 md:mb-12 fade-in-up">
          <span className="font-label text-tertiary uppercase tracking-[0.3em] text-xs font-semibold">Northern Province</span>
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl text-secondary mt-2">Our Lands</h1>
          <p className="font-body text-on-surface-variant text-base md:text-lg max-w-md mt-4">
            Curated land holdings across Sri Lanka's northern province.
          </p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-2 border-surface-container-high rounded-full"></div>
              <div className="absolute inset-0 border-2 border-transparent rounded-full border-t-secondary animate-spin"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 md:mb-10">
              <div className="flex flex-wrap gap-2 fade-in-up">
                {regions.map((region) => (
                  <button 
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ease-out ${
                      activeRegion === region 
                        ? 'bg-secondary text-white shadow-lg shadow-secondary/25' 
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/50 hover:border-secondary/30'
                    }`}
                  >
                    {region === 'All' ? 'All' : region}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredLands.map((land, index) => (
                <Link 
                  key={land._id} 
                  to={`/lands/${land.slug}`}
                  className={`group bg-white rounded-2xl border border-outline-variant/30 overflow-hidden hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-1 transition-all duration-300 ease-out fade-in-up stagger-${Math.min(index + 2, 5)}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                      src={land.heroImg || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'} 
                      alt={land.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">{land.type}</span>
                      </span>
                    </div>
                    {land.status === 'sold' && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="bg-red-600 text-white px-5 py-2.5 rounded-full font-medium uppercase text-xs tracking-widest shadow-lg">Sold</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-tertiary mb-1.5">{land.location}</p>
                        <h3 className="font-headline text-lg text-secondary group-hover:text-tertiary transition-colors duration-300 leading-snug">{land.title}</h3>
                      </div>
                      <p className="font-headline text-lg text-secondary whitespace-nowrap shrink-0">LKR {land.price}</p>
                    </div>
                    
                    <p className="font-body text-sm text-on-surface-variant line-clamp-2 mb-5">{land.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-tertiary">straighten</span>
                        <span className="font-body text-sm text-on-surface-variant">{land.size}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-tertiary">place</span>
                        <span className="font-body text-sm text-on-surface-variant">{land.region}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredLands.length === 0 && (
              <div className="text-center py-20 fade-in">
                <span className="material-symbols-outlined text-on-surface-variant text-6xl mb-4 block">search_off</span>
                <p className="font-body text-on-surface-variant text-lg">No lands found in this region.</p>
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
    </>
  );
};

export default Lands;
