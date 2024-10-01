'use client';

import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from 'components//ui/dialog';
import { Button } from 'components//ui/button';
import slugify from '@sindresorhus/slugify';
import React from 'react';
import { useStore } from 'zustand';
import { cartStore } from 'src/store/cart';

export default function AddServicePopup(service: Service) {
  const addService = useStore(cartStore, (state) => state.addService);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-max-lg h-[55px] w-3/5 rounded-none bg-blue-3 font-medium text-white max-lg:w-auto min-[2000px]:text-lg">
          В корзину
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1280px] gap-10 bg-white max-lg:min-h-[300px]">
        <DialogHeader className="h-auto">
          <a
            className="text-max-lg relative z-10 mt-10 flex w-full items-center gap-20 border-[1px] border-[#0000001A] p-[34px] font-normal text-black max-lg:mt-0 max-lg:w-[281px] max-lg:flex-col max-lg:items-start max-lg:gap-[24px] max-lg:p-[20px]"
            href={`catalog/services/${slugify(service.Title)}-${service.Id}`}
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
            className="text-max-lg h-[55px] w-auto flex-1 rounded-none border-0 bg-blue-3 font-medium text-white max-lg:w-[281px] "
          >
            В корзину
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
