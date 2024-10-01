import Image from 'next/image';
import { Button } from 'src/components/ui/button';
import React from 'react';
import formatDateString from 'src/utils/formatDateString';
import slugify from '@sindresorhus/slugify';
import truncateText from 'src/utils/truncateText';
import picture from "src/assets/CardImage/metalImage.png"


export type NewsType = {
  id: number;
  title: string;
  texts: string[];
  image: string;
  date: string;
  className: string;
};

export default function News({
  id,
  title,
  texts,
  image,
  date,
  className,
}: NewsType) {
  return (
    <div className={`flex flex-col sm:gap-5 ${className} max-w-[328px] max-[640px]:rounded-lg max-[640px]:border max-[640px]:border-[#E8E8E8]`}>
      <div className="relative max-[640px]:hidden h-[300px] w-[520px] max-lg:h-[185px] max-lg:w-[320px]">
        <Image
          src={`data:image/webp;base64,${image}`}
          alt="background"
          fill
          className="object-cover object-center"
        />
        <Button
          asChild
          variant="outline"
          className="absolute bottom-0 right-0 rounded-none border-0 bg-blue-2 px-[50px] py-[35px] text-xl font-medium text-white"
        >
          <a href={`/news/${slugify(title)}-${id}`}>Читать статью</a>
        </Button>
      </div>
      <div className="hidden sm:flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-bold uppercase text-black">{title}</h4>
          <p className="font-normal text-black opacity-80">
            {truncateText(texts[0], 140)}
          </p>
        </div>
        <p className="text-right font-normal opacity-50 max-lg:w-[320px] ">
          {formatDateString(date)}
        </p>
      </div>
      <div className="imgArea sm:hidden w-full">
        <Image src={`data:image/webp;base64,${image}`} alt='image' className='w-full' />
      </div>
      <div className="contexte sm:hidden px-3 py-4">
        <h6 className='text-lg font-medium text-[#131313] line-clamp-1 leading-[23.4px]' >{title}</h6>
        <p className='text-sm font-light text-[#666] line-clamp-3 leading-[19.6px] mt-2'>{truncateText(texts[0], 140)}</p>
        <a href={`/news/${slugify(title)}-${id}`} className='text-[#154FCA] font-roboto text-sm font-normal leading-[21.28px] line-clamp-1 bg-transparent mt-6'>
Читать статью &gt;&gt;&gt;
</a>
      </div>
      
    </div>
  );
}
