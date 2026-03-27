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
      } catch (error) {
        console.error('Error fetching lands:', error);
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
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary"></div>
          </div>
        ) : (
          <>
            <div className="mb-8 md:mb-10">
              <div className="flex flex-wrap gap-2 fade-in-up">
                {regions.map((region) => (
                  <button 
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                      activeRegion === region 
                        ? 'bg-secondary text-white shadow-sm' 
                        : 'bg-white/80 text-on-surface-variant hover:bg-white border border-slate-200/60'
                    }`}
                  >
                    {region === 'All' ? 'All' : region}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLands.map((land, index) => (
                <Link 
                  key={land._id} 
                  to={`/lands/${land.slug}`}
                  className={`group bg-white rounded-xl border border-slate-200/50 overflow-hidden hover:shadow-md hover:border-slate-300/70 transition-all duration-300 fade-in-up stagger-${Math.min(index + 2, 5)}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      src={land.heroImg || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'} 
                      alt={land.title}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">{land.type}</span>
                      </span>
                    </div>
                    {land.status === 'sold' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium uppercase text-sm tracking-wider">Sold</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-label text-xs uppercase tracking-widest text-tertiary mb-1">{land.location}</p>
                        <h3 className="font-headline text-lg text-secondary group-hover:text-tertiary transition-colors leading-tight">{land.title}</h3>
                      </div>
                      <p className="font-headline text-lg text-secondary whitespace-nowrap">LKR {land.price}</p>
                    </div>
                    
                    <p className="font-body text-sm text-on-surface-variant line-clamp-2 mb-4">{land.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
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
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-on-surface-variant text-5xl mb-4 block">search_off</span>
                <p className="font-body text-on-surface-variant">No lands found.</p>
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
