'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'components//ui/carousel';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function ServicesCarousel({
  imagesStrings,
}: {
  imagesStrings: string[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Carousel
        setApi={setApi}
        className="max-w-full sm:max-w-[320px] lg:w-[660px] lg:max-w-[660px] min-[2000px]:w-[1000px] min-[2000px]:max-w-full"
      >
        <CarouselContent>
          {imagesStrings.map((image, index) => (
            <CarouselItem
              key={index}
              className={`relative h-[226px] sm:h-48 max-w-full sm:max-w-[340px] lg:h-[390px] lg:w-[675px] lg:max-w-[675px] min-[2000px]:w-[1000px] min-[2000px]:max-w-full ${
                index === 0 && 'pl-4'
              }`}
            >
              <Image
                src={`data:image/webp;base64,${image}`}
                className="object-cover object-center"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={`${index} image`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='max-sm:hidden' />
        <CarouselNext className='max-sm:hidden' />
      </Carousel>
      <div className="mt-3 sm:mt-2 flex flex-row max-sm:justify-center sm:grid sm:max-w-[320px] grid-cols-4 gap-2 lg:max-w-[675px] min-[2000px]:max-w-[1000px]">
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className={`max-sm:w-2 max-sm:rounded-lg h-2 sm:h-1 ${
              i + 1 === current ? 'bg-[#131313] sm:bg-blue' : 'bg-[#3C3C43] sm:bg-blue opacity-20 sm:opacity-10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
