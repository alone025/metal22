'use client';

import { useEffect } from 'react';

export default function ThanksPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-[70vh] p-2 text-center">
      <h1>Спасибо за заявку! Мы свяжемся с вами в ближайшее время</h1>
    </div>
  );
}
