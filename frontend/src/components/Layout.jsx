import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body">
      <Navbar />
      <main className="pt-20 md:pt-24 lg:pt-28">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
