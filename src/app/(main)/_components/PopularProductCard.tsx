'use client';

import Image from 'next/image';
import { Button } from 'src/components/ui/button';
import React from 'react';
import { AddToCartPopUp } from 'src/app/(main)/catalog/category/[categorySlug]/_components/AddToCartPopUp';

type FormattedPopularProduct = {
  category: { id: number; name: string };
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

export default function PopularProductCard({
  id,
  name,
  price,
  image,
  category,
}: FormattedPopularProduct) {
  return (
    <div className="grid h-[300px] grid-cols-2 grid-rows-3 justify-between bg-gray-2 max-lg:flex max-lg:h-auto max-lg:flex-col max-lg:items-center max-lg:gap-[20px]">
      <div className="flex flex-col  justify-between">
        <div className="ml-7 mt-7 flex flex-col gap-3 max-lg:ml-0">
          <p className="text-3xl font-bold text-text-blue">{name}</p>
          <p className="text-max-lg font-normal text-gray">
            {price <= 1 ? 'По запросу' : price.toLocaleString('DE-de')}
          </p>
        </div>
      </div>
      <div className="relative row-span-3 flex w-auto items-end  justify-end max-lg:my-[20px]">
        <Image
          src={`data:image/webp;base64,${image}`}
          alt={name}
          width={266}
          height={230}
          className="row-start-2 h-[230px] w-[266px]  object-cover object-center"
        />
      </div>
      <div className="row-start-3 flex w-2/3 flex-col justify-end">
        <AddToCartPopUp
          trigger={
            <Button className="text-max-lg h-[55px] rounded-none font-medium text-white">
              В корзину
            </Button>
          }
          category_name={category.name}
          category_id={category.id.toString()}
          id={id}
          name={name}
          price={price}
        />
      </div>
    </div>
  );
}
