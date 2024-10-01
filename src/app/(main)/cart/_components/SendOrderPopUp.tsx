'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import React, { ReactNode, useState } from 'react';
import { Button } from 'components//ui/button';
import { fetchedProductWithAmount } from 'src/app/(main)/cart/page';
import slugify from '@sindresorhus/slugify';
import { useStore } from 'zustand';
import { cartStore } from 'src/store/cart';
import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import { Category } from 'src/app/(main)/catalog/page';

type SendOrderPopUpProps = {
  trigger: ReactNode;
  products: fetchedProductWithAmount[];
  services?: Service[];
  categories?: Category[];
  callback: (name: string, phone: string) => void;
};

export function SendOrderPopUp({
  trigger,
  products,
  services,
  categories,
  callback,
}: SendOrderPopUpProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [open, setOpen] = useState(false);

  const [isSent, setIsSent] = useState(false);

  const town = useStore(cartStore, (state) => state.town);

  const handleSubmit = () => {
    // setIsSent(true);
    setOpen(false);
    if (name && phone) {
      callback(name, phone);
    }
    setName('');
    setPhone('');
    // setTimeout(() => {
    //   setIsSent(false);
    //
    // }, 0);
    //   1100
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[1280px] gap-10 bg-white max-lg:min-h-[600px] max-lg:flex-col">
        <DialogHeader>
          {products.map((productDetails) => (
            <a
              key={productDetails.product.name + productDetails.product.id}
              className="text-max-lg relative z-10 mt-10 flex w-full items-center justify-between  border-[1px] border-[#0000001A] p-[34px] font-normal text-black max-lg:mt-0 max-lg:w-[281px] max-lg:flex-col max-lg:items-start max-lg:gap-[20px] max-lg:p-[20px]"
              href={`/catalog/category/${slugify(
                productDetails.product.category_name
              )}-${productDetails.product.category_id}/${slugify(
                productDetails.product.name
              )}-${productDetails.product.id}`}
            >
              <div className="flex items-center gap-20 max-lg:flex-col max-lg:items-start max-lg:gap-[24px]">
                <p className="w-52 max-lg:w-auto">
                  {productDetails.product.name}
                </p>
                {productDetails.filters &&
                  productDetails.filters.map((filter) => (
                    <p
                      key={filter.name}
                      className="flex justify-center max-lg:justify-start"
                    >
                      {filter.value}
                    </p>
                  ))}
              </div>

              <p className="font-medium text-blue">{productDetails.amount}</p>
            </a>
          ))}
          {services?.map((serviceDetails) => (
            <a
              key={serviceDetails.Title + serviceDetails.Id}
              className="text-max-lg relative z-10 mt-10 flex w-full items-center justify-between  border-[1px] border-[#0000001A] p-[34px] font-normal text-black max-lg:mt-0 max-lg:w-[281px] max-lg:flex-col max-lg:items-start max-lg:gap-[20px] max-lg:p-[20px]"
              href={`/catalog/services/${slugify(serviceDetails.Title)}-${
                serviceDetails.Id
              }`}
            >
              <p className="max-lg:w-auto">{serviceDetails.Title}</p>
            </a>
          ))}
          {categories?.map((categoryDetails) => (
            <div
              key={categoryDetails.name + categoryDetails.id}
              className="text-max-lg relative z-10 mt-10 flex w-full items-center justify-between  border-[1px] border-[#0000001A] p-[34px] font-normal text-black max-lg:mt-0 max-lg:w-[281px] max-lg:flex-col max-lg:items-start max-lg:gap-[20px] max-lg:p-[20px]"
            >
              <p className="max-lg:w-auto">{categoryDetails.name}</p>
            </div>
          ))}
        </DialogHeader>
        <div className="flex items-center gap-20 max-lg:flex-col max-lg:gap-[64px]">
          <div className="flex h-[61px] w-[705px] gap-10 max-lg:h-[186px] max-lg:w-[281px] max-lg:flex-col max-lg:gap-[20px] max-lg:pt-2">
            <Input
              placeholder="Имя"
              className="h-auto rounded-none border-0 bg-[#F4F7F8] pl-5 max-lg:h-[61px]"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Раб. номер телефона"
              name="phone"
              autoComplete="phone"
              className="h-auto rounded-none border-0 bg-[#F4F7F8] pl-5 max-lg:h-[61px]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="flex items-center">
              <p className="w-[150px] text-center text-lg font-semibold max-lg:w-[150px] max-lg:pl-2">
                В г. {town}
                <hr className=" w-full text-blue" />
              </p>
            </div>
          </div>
          <Button
            disabled={!name || !phone}
            onClick={handleSubmit}
            className="text-max-lg h-full w-full flex-1 rounded-none font-medium text-white"
          >
            Оформить
          </Button>
        </div>
        {/*<DialogPortal>*/}
        {/*  {isSent && <CheckMarkAnimation start={isSent} />}*/}
        {/*</DialogPortal>*/}
      </DialogContent>
    </Dialog>
  );
}
