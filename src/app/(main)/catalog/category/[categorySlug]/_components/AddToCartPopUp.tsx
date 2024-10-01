'use client';

import { ReactNode, useEffect, useState } from 'react';
import NumberInput from 'src/app/(main)/catalog/category/[categorySlug]/_components/NumberInput';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from 'src/components/ui/dialog';

import slugify from '@sindresorhus/slugify';
import { Button } from 'components//ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components//ui/select';
import { cartStore } from 'src/store/cart';
import fetchProduct from 'src/utils/fetchProduct';
import { useStore } from 'zustand';

type AddToCartPopUpProps = {
  trigger: ReactNode;
  category_name?: string;
  category_id?: string;
  categorySlug?: string;
  id: number;
  name: string;
  price: number;
};

export function AddToCartPopUp({
  trigger,
  id,
  name,
  price,
  category_name,
  category_id,
  categorySlug,
}: AddToCartPopUpProps) {
  const [value, setValue] = useState('1');
  const [variant, setVariant] = useState('тн.');
  const [filters, setFilters] =
    useState<
      { id: number; value: string; name: string; filter_id: number }[]
    >();

  useEffect(() => {
    async function fetch() {
      const fetchedFilters = await fetchProduct(id.toString());
      if (fetchedFilters.filters) setFilters(fetchedFilters.filters);
    }

    fetch();
  }, [id]);

  const addProduct = useStore(cartStore, (state) => state.addProduct);

  const linkToCategory = categorySlug
    ? categorySlug
    : `${slugify(category_name ?? '')}-${category_id}`;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[1280px] gap-10 bg-white max-lg:min-h-[600px]">
        <DialogHeader>
          <a
            className="text-max-lg relative z-10 mt-10 flex w-full items-center gap-20 border-[1px] border-[#0000001A] p-[34px] font-normal text-black max-lg:mt-0 max-lg:w-[281px] max-lg:flex-col max-lg:items-start max-lg:gap-[24px] max-lg:p-[20px]"
            href={`/catalog/category/${linkToCategory}/${slugify(name)}-${id}`}
          >
            <p className="w-[200px] text-text-blue max-lg:w-auto">{name}</p>
            {filters &&
              filters.map((filter) => (
                <p
                  key={filter.name}
                  className="flex justify-center max-lg:w-full max-lg:justify-normal max-lg:gap-2"
                >
                  <span className="hidden max-lg:block">{filter.name}:</span>
                  {filter.value}
                </p>
              ))}
            <p>
              {price > 1 && <span className="hidden max-lg:block">Цена:</span>}
              {price <= 1 ? 'По запросу' : price.toLocaleString('DE-de')}
            </p>
          </a>
        </DialogHeader>
        <div className="flex items-center gap-20 max-lg:w-[281px] max-lg:flex-col max-lg:items-start ">
          <div className="flex h-[61px] w-[705px] gap-10 max-lg:flex-col max-lg:gap-[20px]">
            <Select
              value={variant}
              onValueChange={(value) => setVariant(value)}
            >
              <SelectTrigger className="h-[60px] w-[135px] justify-between rounded-none border-0 bg-[#F4F7F8]">
                <SelectValue placeholder="Выберите единицу измерения..." />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={'м²'}>м²</SelectItem>
                <SelectItem value={'шт.'}>Штуки</SelectItem>
                <SelectItem value={'м'}>м</SelectItem>
                <SelectItem value={'тн.'}>Тонны</SelectItem>
              </SelectContent>
            </Select>
            <NumberInput value={value} setValue={setValue} />
          </div>
          <DialogClose disabled={!/^\d*\.?\d+$/.test(value)} asChild>
            <Button
              onClick={() => addProduct(id.toString(), value + ' ' + variant)}
              className="text-max-lg h-full w-auto flex-1 rounded-none border-0 bg-blue-3 font-medium text-white max-lg:max-h-[55px] max-lg:w-[281px]"
            >
              В корзину
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
