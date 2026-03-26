import React from 'react';
import { useLocation } from 'react-router-dom';

const WhatsAppButton = () => {
  const location = useLocation();
  // Show the button only on non-admin/public pages
  if (location && location.pathname.startsWith('/admin')) return null;
  // Get number from env or fallback
  const rawPhone =
    (typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env.VITE_WHATSAPP_NUMBER) ||
    '+94740404505';

  // Remove everything except digits, including '+'
  let phone = rawPhone.replace(/[^0-9]/g, '');

  // Ensure it starts with country code (example: '94' for Sri Lanka)
  if (phone.startsWith('0')) {
    phone = '94' + phone.slice(1);
  }

  const message = 'Can I get more info';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50"
    >
      <div
        className="
          flex items-center justify-center
          w-14 h-14
          rounded-full
          bg-[#25D366]
          hover:bg-[#1DA851]
          shadow-lg
          transition-all duration-200
          hover:scale-110
          active:scale-95
        "
      >
        <img src="/whatsapp.svg" alt="WhatsApp" className="w-7 h-7" />
      </div>
    </a>
  );
};

export default WhatsAppButton;
