'use client';

import { useState, useEffect } from 'react';

const useRussianTypingEffect = (text: string, speed = 100) => {
  const [currentText, setCurrentText] = useState(''); 
  const [currentIndex, setCurrentIndex] = useState(0); 

  useEffect(() => {
   
    setCurrentText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]); 
        setCurrentIndex((prevIndex) => prevIndex + 1); 
      }, speed); 

      return () => clearTimeout(timeout); 
    }
  }, [currentIndex, text, speed]);

  return currentText;
};

export default useRussianTypingEffect;
