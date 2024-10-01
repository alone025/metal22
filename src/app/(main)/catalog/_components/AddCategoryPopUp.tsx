'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from 'components//ui/dialog';
import { Button } from 'components//ui/button';
import React from 'react';
import { useStore } from 'zustand';
import { cartStore } from 'src/store/cart';
import { Category } from 'src/app/(main)/catalog/page';

export default function AddCategoryPopUp(category: Category) {
  const addCategory = useStore(cartStore, (state) => state.addCategory);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-[52px] w-1/2 rounded-none bg-blue-3 text-xl font-medium text-white">
          В корзину
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1280px] gap-10 bg-white max-lg:min-h-[300px]">
        <DialogHeader className="h-auto">
          <div className="text-max-lg relative z-10 mt-10 flex w-full items-center gap-20 border-[1px] border-[#0000001A] p-[34px] font-normal text-black max-lg:mt-0 max-lg:w-[281px] max-lg:flex-col max-lg:items-start max-lg:gap-[24px] max-lg:p-[20px]">
            <p>{category.name}</p>
          </div>
        </DialogHeader>
        <DialogClose
          asChild
          className="flex h-[55px] items-center gap-20 max-lg:w-[281px] max-lg:flex-col max-lg:items-start "
        >
          <Button
            onClick={() => addCategory(category.id.toString())}
            className="text-max-lg h-[55px] w-auto flex-1 rounded-none border-0 bg-blue-3 font-medium text-white max-lg:w-[281px]"
          >
            В корзину
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
