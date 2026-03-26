import React from 'react';

const WhatsAppButton = () => {
  const rawPhone =
    (typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env.VITE_WHATSAPP_NUMBER) ||
    "+0000000000";

  const phone = rawPhone.replace(/[^0-9]/g, '');
  const message = 'Can i get more info';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50"
    >
      <div className="
        flex items-center justify-center
        w-14 h-14
        rounded-full
        bg-[#25D366]
        hover:bg-[#1DA851]
        shadow-lg
        transition-all duration-200
        hover:scale-110
        active:scale-95
      ">
        
        {/* ✅ WhatsApp icon from public folder */}
        <img
          src="/whatsapp.svg"
          alt="WhatsApp"
          className="w-7 h-7"
        />

      </div>
    </a>
  );
};

export default WhatsAppButton;