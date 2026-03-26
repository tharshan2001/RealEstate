import Layout from '../components/Layout';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Investment Opportunities in Northern Province',
      excerpt: 'The Northern Province of Sri Lanka is emerging as a prime destination for real estate investment. With infrastructure developments and growing tourism, property values are expected to appreciate significantly.',
      date: 'March 15, 2026',
      category: 'Investment Guide',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80'
    },
    {
      id: 2,
      title: 'Heritage Properties: Preserving the Past',
      excerpt: 'Colonial-era estates in Jaffna offer unique opportunities for heritage tourism. Learn how these properties can be transformed into boutique hotels while maintaining their historical character.',
      date: 'March 10, 2026',
      category: 'Heritage',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'
    },
    {
      id: 3,
      title: 'Coastal Living: Beachfront Properties in Mullaitivu',
      excerpt: 'Discover the pristine beaches of Mullaitivu and why this hidden gem is becoming popular among luxury property buyers seeking untouched coastal landscapes.',
      date: 'March 5, 2026',
      category: 'Coastal Living',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
    }
  ];

  return (
    <Layout>
      <main className="pt-24 md:pt-28 pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
        <header className="mb-10 md:mb-14 text-center">
          <span className="font-label text-secondary uppercase tracking-[0.3em] text-xs font-semibold">Blog</span>
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl text-primary mt-2">Latest Updates</h1>
          <p className="font-body text-on-surface-variant text-base md:text-lg max-w-md mx-auto mt-4">
            News, insights and guides about real estate in Northern Province.
          </p>
        </header>

        {/* Featured Post */}
        <div className="mb-10 md:mb-14">
          <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
            <img 
              className="w-full h-64 md:h-80 lg:h-96 object-cover" 
              src={posts[0].image} 
              alt={posts[0].title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium uppercase tracking-wider">{posts[0].category}</span>
              <h2 className="font-headline text-xl md:text-2xl lg:text-3xl text-white mt-3 md:mt-4 mb-2">{posts[0].title}</h2>
              <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-2xl">{posts[0].excerpt}</p>
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.slice(1).map((post) => (
            <article key={post.id} className="group">
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-5">
                <img 
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-700" 
                  src={post.image} 
                  alt={post.title}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label text-xs uppercase tracking-widest text-tertiary-fixed-variant">{post.category}</span>
                  <span className="font-body text-xs text-on-surface-variant">{post.date}</span>
                </div>
                <h3 className="font-headline text-lg md:text-xl text-primary group-hover:text-secondary transition-colors">{post.title}</h3>
                <p className="font-body text-sm text-on-surface-variant line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 md:mt-16 p-8 md:p-12 bg-surface-container-low rounded-xl text-center">
          <h3 className="font-headline text-xl md:text-2xl text-primary mb-3 md:mb-4">Stay Updated</h3>
          <p className="text-on-surface-variant mb-5 md:mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for the latest property listings and market insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Your Email"
              className="flex-1 bg-surface border border-outline-variant rounded-full px-5 py-3 focus:outline-none focus:border-primary"
              required
            />
            <button 
              type="submit"
              className="bg-primary text-on-primary px-6 py-3 rounded-full font-label text-sm uppercase tracking-widest hover:bg-primary-container transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Blog;
