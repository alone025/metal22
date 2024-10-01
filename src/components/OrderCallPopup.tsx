'use client';

import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import React, { ReactNode, useState } from 'react';
import sendOrder from 'src/app/utils/sendOrder';
import { useStore } from 'zustand';
import { cartStore } from 'src/store/cart';
import { displayedTel, hrefTel } from 'src/constants/tel';

type OrderCallPopupProps = {
  trigger: ReactNode;
  text: string;
};

export function OrderCallPopup({ trigger, text }: OrderCallPopupProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const town = useStore(cartStore, (state) => state.town);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!name || !phone) return;

    sendOrder(
      `${text.trim()};\n\nГород: ${town};\nТелефон: ${phone};\nИмя: ${name};`
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-lg:max-w-320 max-w-[1280px] gap-10 bg-white max-lg:gap-[40px]">
        <DialogHeader>
          <DialogTitle>Закажите обратный звонок</DialogTitle>
          <DialogDescription>
            Оставьте свои контактные данные, и наши операторы свяжутся с вами в
            кратчайшие сроки. <br /> <br /> Либо можете позвонить нам по номеру{' '}
            <a className="font-semibold" href={`tel:${hrefTel}`}>
              {displayedTel}
            </a>{' '}
            или написав на почту{' '}
            <a className="font-semibold" href="mailto:info@marcas.pro">
              info@marcas.pro
            </a>
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-20 max-lg:flex-col max-lg:gap-[64px]"
        >
          <div className="flex h-[61px] w-[705px] gap-10 max-lg:h-[141px] max-lg:w-[281px] max-lg:flex-col max-lg:gap-[20px]">
            <Input
              placeholder="Имя"
              className="h-[61px] rounded-none border-0 bg-[#F4F7F8] pl-5"
              name="name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Раб. номер телефона"
              className="h-[61px] rounded-none border-0 bg-[#F4F7F8] pl-5"
              name="phone"
              autoComplete="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <DialogClose asChild className="h-full flex-1">
            <Button
              disabled={!name || !phone}
              className="h-full w-full flex-1 rounded-none border-0 max-lg:h-[61px] max-lg:w-[281px]"
              type="submit"
            >
              Заказать обратный звонок
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
