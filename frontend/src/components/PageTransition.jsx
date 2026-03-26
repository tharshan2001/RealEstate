import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const PageTransition = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionPhase, setTransitionPhase] = useState('enter');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionPhase('exit');
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionPhase('enter');
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`transition-all duration-400 ease-out ${
        transitionPhase === 'enter'
          ? 'opacity-0 translate-y-4'
          : 'opacity-0'
      }`}
      style={{
        animation: transitionPhase === 'enter' ? 'fadeInUp 0.4s ease-out forwards' : 'none',
      }}
    >
      <Outlet />
    </div>
  );
};

export default PageTransition;