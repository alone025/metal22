import Image from 'next/image';
import { Button } from 'src/components/ui/button';
import React from 'react';
import formatDateString from 'src/utils/formatDateString';
import truncateText from 'src/utils/truncateText';

export type NewsType = {
  id: number;
  title: string;
  texts: string[];
  image: string;
  date: string;
  className: string;
};

export default function AdminNews({
  id,
  title,
  texts,
  image,
  date,
  className,
}: NewsType) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <div className="relative h-[300px] w-[520px] max-lg:h-[185px] max-lg:w-[320px]">
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
          <a href={`/dashboard/news/${id}`}>Редактировать</a>
        </Button>
      </div>
      <div className="flex flex-col gap-10">
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
    </div>
  );
}
