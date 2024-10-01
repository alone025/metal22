'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from 'src/components/ui/dialog';
import { ReactNode } from 'react';

type FilterPopUpProps = {
  trigger: ReactNode;
  filter: ReactNode;
};

export function FilterPopUp({ trigger, filter }: FilterPopUpProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[1280px] gap-10 bg-white max-lg:min-h-[600px]">
        <DialogHeader>{filter}</DialogHeader>
        <div className="flex items-center gap-20 max-lg:w-[281px] max-lg:flex-col max-lg:items-start ">
          <DialogClose
            className="text-max-lg h-full w-auto flex-1 rounded-none border-0 bg-blue-3 font-medium text-white max-lg:max-h-[55px] max-lg:w-[281px]"
            // onClick={() =>

            // }
          >
            Применить
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
