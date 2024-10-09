'use client'
import React, { useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { StaticImageData } from 'next/image'; 

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';


interface Slide {
  img: StaticImageData;
  alt: string;
}

type Props = {
    slides: Slide[]
}

const SwipperCompany: React.FC<Props> = ({slides}) => {
 

  return (
    <div className="overflow-hidden relative w-full" >
       <Swiper
      spaceBetween={8}
      slidesPerView={2.3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className='flex flex-row gap-2'
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
    >
      {
        slides.map((slideD, slideK)=>(
            <SwiperSlide key={slideK} className='!flex items-center min-w-[158px] justify-center !h-[100px] rounded-lg bg-[#FFFFFF0D]' >
                <Image src={slideD.img} alt={slideD.alt} />
            </SwiperSlide>
        ))
      }
     
    </Swiper>
    </div>
  );
};

export default SwipperCompany;
