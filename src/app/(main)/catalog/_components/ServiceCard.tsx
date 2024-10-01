import React from 'react';
import Image from 'next/image';
import { Button } from 'components//ui/button';
import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import slugify from '@sindresorhus/slugify';
import { OrderCallPopup } from 'components//OrderCallPopup';
import truncateText from 'src/utils/truncateText';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from 'components//ui/dialog';

type ServiceCardProps = {
  service: Service;
  type: 'multiple' | 'single';
  addService: (id: string) => void;
};

export default function ServiceCard({
  service,
  type,
  addService,
}: ServiceCardProps) {
  return (
    <div className="relative mx-auto grid h-[470px] w-[1680px] grid-cols-2 grid-rows-3 bg-gray-2 p-7 max-[1700px]:flex max-[1700px]:h-full max-[1700px]:w-[900px] max-[1700px]:flex-col max-[1700px]:items-center max-[1700px]:gap-10 max-lg:flex max-lg:h-auto max-lg:w-[320px] max-lg:flex-col max-lg:gap-[20px]">
      <h3 className="text-[32px] font-bold leading-[38.4px] text-black">
        {service.Title}
      </h3>
      <div className="relative row-span-3 flex max-h-[410px] max-w-[670px] max-[1700px]:h-[200px] max-[1700px]:w-full">
        <Image
          // width={670}
          // height={410}
          fill
          className="object-fill"
          alt="Img"
          src={`data:image/webp;base64,${service.Image1}`}
        />
      </div>

      <p className="text-max-lg w-[543px] font-normal text-black opacity-70 max-lg:w-auto">
        {truncateText(service.Description[0], 240)}
      </p>
      <div className="grid w-[550px] grid-cols-[2fr_1fr] gap-5 max-lg:flex max-lg:w-full max-lg:flex-col">
        <Button
          asChild
          className="text-max-lg h-[55px] rounded-none font-medium text-white"
        >
          <a href={`catalog/services/${slugify(service.Title)}-${service.Id}`}>
            Подробнее
          </a>
        </Button>
        <OrderCallPopup
          trigger={
            <Button className="text-max-lg h-[55px] rounded-none bg-black font-medium text-white">
              Связаться
            </Button>
          }
          text={`Звонок по поводу услуги - "${service.Title}"`}
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-max-lg col-span-2 h-[55px] rounded-none bg-blue-3 font-medium text-white">
              В корзину
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[1280px] gap-10 bg-white max-lg:min-h-[300px]">
            <DialogHeader className="h-auto">
              <a
                className="text-max-lg relative z-10 mt-10 flex w-full items-center gap-20 border-[1px] border-[#0000001A] p-[34px] font-normal text-black max-lg:mt-0 max-lg:w-[281px] max-lg:flex-col max-lg:items-start max-lg:gap-[24px] max-lg:p-[20px]"
                href={`catalog/services/${slugify(service.Title)}-${
                  service.Id
                }`}
              >
                <p>{service.Title}</p>
              </a>
            </DialogHeader>
            <DialogClose
              asChild
              className="flex h-[55px] items-center gap-20 max-lg:w-[281px] max-lg:flex-col max-lg:items-start "
            >
              <Button
                onClick={() => addService(service.Id.toString())}
                className="text-max-lg h-[55px] w-auto flex-1 rounded-none border-0 bg-blue-3 font-medium text-white max-lg:w-[281px]"
              >
                В корзину
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
