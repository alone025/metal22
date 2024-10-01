'use client';

import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface ImageSliderProps {
  images: StaticImageData[];
}

const ImageSliderInfinitive: React.FC<ImageSliderProps> = ({ images }) => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  const [isPaused, setIsPaused] = useState<boolean>(false);


  const scrollRow = (row: HTMLDivElement, speed: number) => {
    row.scrollLeft += speed;

    if (row.scrollLeft >= row.scrollWidth / 2) {
      row.scrollLeft = 0;
    }

    if (row.scrollLeft <= 0) {
      row.scrollLeft = row.scrollWidth / 2;
    }
  };


  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    let topScrollInterval: NodeJS.Timeout;
    let bottomScrollInterval: NodeJS.Timeout;

    if (!isPaused && topRow && bottomRow) {
      topScrollInterval = setInterval(() => {
        scrollRow(topRow, 1);
      }, 16); 

      bottomScrollInterval = setInterval(() => {
        scrollRow(bottomRow, -1);
      }, 16); 
    }

    return () => {
      clearInterval(topScrollInterval);
      clearInterval(bottomScrollInterval);
    };
  }, [isPaused]);


  const handleMouseEnter = () => setIsPaused(true);
  

  const handleMouseLeave = () => setIsPaused(false);

  
  const duplicatedImages = [...images, ...images];

  return (
    <div className="flex flex-col space-y-4 overflow-hidden pt-[60px] pb-8 bg-white">


      <div
        ref={topRowRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex space-x-4 overflow-x-hidden whitespace-nowrap"
      >
        {duplicatedImages.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            width={200}
            height={200}
            alt={`slider-image-${idx}`}
            className="w-52 h-36 object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
          />
        ))}
      </div>

     
      <div
        ref={bottomRowRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex space-x-4 overflow-x-hidden whitespace-nowrap"
      >
        {duplicatedImages.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            width={200}
            height={200}
            alt={`slider-image-${idx}`}
            className="w-52 h-36 object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSliderInfinitive;
