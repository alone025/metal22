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

export default function AddServicePopup({service, mobiled}:{service: Service, mobiled:boolean}) {
  const addService = useStore(cartStore, (state) => state.addService);

  return (
    <Dialog>
      <DialogTrigger asChild>
    {
      !mobiled ? (     <Button className="max-sm:hidden text-max-lg h-[55px] w-3/5 rounded-none bg-blue-3 font-medium text-white max-lg:w-auto min-[2000px]:text-lg">
        В корзину
      </Button>):(
             <Button className="h-12 w-[59px] rounded-lg bg-[#131313] flex items-center justify-center sm:hidden">
             <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
  <path d="M5.75 13.5C4.925 13.5 4.2575 14.175 4.2575 15C4.2575 15.825 4.925 16.5 5.75 16.5C6.575 16.5 7.25 15.825 7.25 15C7.25 14.175 6.575 13.5 5.75 13.5ZM1.25 2.25C1.25 2.6625 1.5875 3 2 3H2.75L5.45 8.6925L4.4375 10.5225C3.89 11.5275 4.61 12.75 5.75 12.75H14C14.4125 12.75 14.75 12.4125 14.75 12C14.75 11.5875 14.4125 11.25 14 11.25H5.75L6.575 9.75H12.1625C12.725 9.75 13.22 9.4425 13.475 8.9775L16.16 4.11C16.4375 3.615 16.0775 3 15.5075 3H4.4075L3.905 1.9275C3.785 1.665 3.515 1.5 3.23 1.5H2C1.5875 1.5 1.25 1.8375 1.25 2.25V2.25ZM13.25 13.5C12.425 13.5 11.7575 14.175 11.7575 15C11.7575 15.825 12.425 16.5 13.25 16.5C14.075 16.5 14.75 15.825 14.75 15C14.75 14.175 14.075 13.5 13.25 13.5Z" fill="#F2F5F7"/>
</svg>
           </Button>
      )
    }
      
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
