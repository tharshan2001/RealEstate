import { createContext, useContext, useState, useCallback } from 'react';

const EnquiryContext = createContext();

export const useEnquiry = () => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within EnquiryProvider');
  }
  return context;
};

export const EnquiryProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [landTitle, setLandTitle] = useState(null);

  const openEnquiry = useCallback((title = null) => {
    setLandTitle(title);
    setIsOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsOpen(false);
    setLandTitle(null);
  }, []);

  return (
    <EnquiryContext.Provider value={{ isOpen, landTitle, openEnquiry, closeEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
};
