import React from 'react';
import Image from 'next/image';
import { Button } from 'components//ui/button';
import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import truncateText from 'src/utils/truncateText';

type ServiceCardProps = {
  service: Service;
  type: 'multiple' | 'single';
  index: number;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
};

export default function AdminServiceCard({
  service,
  type,
  index,
  moveUp,
  moveDown,
}: ServiceCardProps) {
  return (
    <div className="relative mx-auto grid h-[470px] w-[1680px] grid-cols-2 grid-rows-3 bg-gray-2 p-7 max-[1700px]:flex max-[1700px]:h-full max-[1700px]:w-[900px] max-[1700px]:flex-col max-[1700px]:items-center max-[1700px]:gap-10 max-lg:flex max-lg:h-auto max-lg:w-[320px] max-lg:flex-col max-lg:gap-[20px]">
      <h3 className="text-[32px] font-bold leading-[38.4px] text-black">
        {service.Title}
      </h3>
      {type === 'single' ? (
        <Image
          width={670}
          height={410}
          alt="Img"
          src={`data:image/webp;base64,${service.Image1}`}
          className="row-span-3"
        />
      ) : (
        <Image
          fill
          alt="Img"
          src={`data:image/webp;base64,${service.Image1}`}
          className="row-span-3"
        />
      )}
      <p className="text-max-lg w-[543px] font-normal text-black opacity-70 max-lg:w-auto">
        {truncateText(service.Description[0], 240)}
      </p>
      <div className="grid w-[550px] gap-5 max-lg:flex max-lg:w-full max-lg:flex-col">
        <Button
          asChild
          className="text-max-lg h-[55px] rounded-none font-medium text-white"
        >
          <a href={`/dashboard/service/${service.Id}`}>Редактировать</a>
        </Button>
      </div>
      <div className="flex gap-2 p-2">
        <Button variant="outline" onClick={() => moveUp(index)}>
          ↑
        </Button>
        <Button variant="outline" onClick={() => moveDown(index)}>
          ↓
        </Button>
      </div>
    </div>
  );
}
