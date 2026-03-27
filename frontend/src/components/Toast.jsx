import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

let toastId = 0;
let addToastFn = null;

export const toast = {
  success: (message) => addToastFn?.({ type: 'success', message, id: ++toastId }),
  error: (message) => addToastFn?.({ type: 'error', message, id: ++toastId }),
  loading: (message) => addToastFn?.({ type: 'loading', message, id: ++toastId }),
};

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    addToastFn = (t) => {
      setToasts(prev => [...prev, t]);
      setTimeout(() => {
        setToasts(prev => prev.filter(x => x.id !== t.id));
      }, 4000);
    };
    return () => { addToastFn = null; };
  }, []);

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-3 border animate-slide-in ${
            t.type === 'success' 
              ? 'bg-white border-emerald-200 text-emerald-800' 
              : t.type === 'error' 
                ? 'bg-white border-red-200 text-red-700' 
                : 'bg-white border-blue-200 text-blue-700'
          }`}
        >
          {t.type === 'success' && (
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {t.type === 'error' && (
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          {t.type === 'loading' && (
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            </div>
          )}
          <span className="text-slate-700">{t.message}</span>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default Toast;
