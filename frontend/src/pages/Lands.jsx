import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
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
    <Layout>
      <main className="pt-0 pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
        <header className="mb-10 md:mb-14 fade-in-up">
          <span className="font-label text-secondary uppercase tracking-[0.3em] text-xs font-semibold">Northern Province</span>
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl text-primary mt-2">Our Lands</h1>
          <p className="font-body text-on-surface-variant text-base md:text-lg max-w-md mt-4">
            Curated land holdings across Sri Lanka's northern province.
          </p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="mb-8 md:mb-12">
              <div className="flex flex-wrap gap-2 md:gap-3 fade-in-up stagger-1">
                {regions.map((region) => (
                  <button 
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                      activeRegion === region 
                        ? 'bg-primary text-on-primary shadow-md' 
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
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
                  className={`group fade-in-up stagger-${Math.min(index + 2, 5)}`}
                >
                  <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-5">
                    <img 
                      className="w-full h-56 md:h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-700" 
                      src={land.heroImg || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'} 
                      alt={land.title}
                    />
                    <div className="absolute top-3 md:top-4 left-3 md:left-4">
                      <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{land.type}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-label text-xs uppercase tracking-widest text-tertiary-fixed-variant">{land.location}</p>
                    <h3 className="font-headline text-xl md:text-2xl text-primary group-hover:text-secondary transition-colors">{land.title}</h3>
                    <p className="font-body text-sm text-on-surface-variant line-clamp-2">{land.description}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-outline-variant/20">
                      <span className="font-body text-sm text-on-surface-variant">{land.size}</span>
                      <span className="font-headline text-lg text-tertiary">{land.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredLands.length === 0 && (
              <div className="text-center py-16 md:py-20">
                <span className="material-symbols-outlined text-on-surface-variant text-5xl mb-4 block">search_off</span>
                <p className="font-body text-on-surface-variant">No lands found.</p>
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  );
};

export default Lands;
