'use client';

import { CopyIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

interface ImageSliderProps {
  images: StaticImageData[];
}

const ImageSliderInfinitive: React.FC<ImageSliderProps> = ({ images }) => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  const [modalOpen , setModalOpen] = useState(false)

  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  const [indexImg, setIndexImg] = useState<StaticImageData | null>()


  const scrollRow = (row: HTMLDivElement, speed: number) => {
    row.scrollLeft += speed;

    if (row.scrollLeft >= row.scrollWidth / 2) {
      row.scrollLeft = 15;
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
    <>
   {
    modalOpen && indexImg &&  (
      <>
<div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={()=> {setModalOpen(false); setIndexImg(null)}} >
<div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-lg max-w-sm w-full relative">
    <button onClick={()=> {setModalOpen(false); setIndexImg(null)}} className="absolute bg-white leading-[1] w-6 rounded-sm font-roboto text-2xl top-2 right-2 text-gray-500 hover:text-gray-800">
      &times;
    </button>
    <Image src={indexImg} alt='' className='rounded-lg' />
  </div>
</div>
</div>



      </>
    )
    
   }




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
            onClick={()=> {setIndexImg(src); setModalOpen(true)}}
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
            onClick={()=> {setIndexImg(src); setModalOpen(true)}}
          />
        ))}
      </div>
     
    </div>
    </>
  );
};

export default ImageSliderInfinitive;
