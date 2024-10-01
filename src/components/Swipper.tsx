'use client'
import React, { useState, useRef, useEffect, TouchEvent } from 'react';
import SwipperCard from './SwipperCard';
import useTypeEffect from 'src/app/utils/useTypeEffect';

interface Slide {
  txt: string;
}

interface SwiperProps {
  slides: Slide[];
}


const MobileSwiper: React.FC<SwiperProps> = ({ slides } ) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const typeEffectedText = useTypeEffect(slides[activeIndex].txt, 120);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const nextSlide = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    } else {
      setActiveIndex(slides.length - 1);
    }
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.style.transform = `translateX(-${activeIndex * 100}%)`;
    }
  }, [activeIndex]);

  return (
   <>
   <h6 className='text-lg font-medium text-[#131313] mb-4 mt-6 mx-auto max-w-[328px]'>#{typeEffectedText}</h6>
    <div className="relative w-full pb-5 overflow-hidden">
   
   <div
     ref={swiperRef}
     className="flex transition-transform duration-300 ease-out"
     onTouchStart={handleTouchStart}
     onTouchMove={handleTouchMove}
     onTouchEnd={handleTouchEnd}
   >
     {slides.map((slide, index) => (
       <div key={index} className="min-w-full">
         <SwipperCard texxt={slide.txt} />
       </div>
     ))}
   </div>


   <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
     {slides.map((_, index) => (
       <button
         key={index}
         className={`w-2 h-2 rounded-full ${
           index === activeIndex ? 'bg-[#131313]' : 'bg-[#3C3C432E]'
         }`}
         onClick={() => goToSlide(index)}
       ></button>
     ))}
   </div>
 </div>
   </>
  );
};

export default MobileSwiper;
