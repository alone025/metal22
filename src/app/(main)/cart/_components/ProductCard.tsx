import { Button } from 'components//ui/button';

import Image from 'next/image';

import slugify from '@sindresorhus/slugify';
import { fetchedProductWithAmount } from 'src/app/(main)/cart/page';
import sendOrder from 'src/app/utils/sendOrder';
import trashIcon from 'src/assets/Cart/Trash.svg';
import { SendOrderPopUp } from './SendOrderPopUp';
import { useEffect, useState } from 'react';
import { Input } from 'src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { cartStore } from 'src/store/cart';

type ProductCardProps = fetchedProductWithAmount & {
  deleteProduct(id: string): void;
  town: string;
};

type DataItem = string;

export default function ProductCard(product: ProductCardProps) {
  const [number, setNumber] = useState<number>(0);
  const [filteredString, setFilteredString] = useState<string>('');
  const { products, addAmount } = cartStore();

  const currentProduct = products.find(
    (p) => p.id === product.product.id.toString()
  );

  const extractNumberFromMixedData = (data: DataItem): number => {
    const match = data.match(/[\d]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const extractAndFilterString = (data: DataItem): string => {
    const stringPart = data.replace(/[\d]+/g, '').trim();
    return stringPart;
  };

  const minuse = () => {
    if (number !== null && number > 0) {
      const newNumber = number - 1;
      setNumber(newNumber);
      addAmount(product.keyU, `${newNumber} ${filteredString}`);
    }
  };

  const pluse = () => {
   
    if (number !== null) {
      const newNumber = number + 1;
      setNumber(newNumber);
      addAmount(product.keyU, `${newNumber} ${filteredString}`);
    }
  };

  const changeTip = (e: string) => {
  
    if (e) {
      const vlue = e;
      console.log(vlue);
      setFilteredString(e);
      addAmount(product.keyU, `${number} ${vlue}`);
    } else {
      alert('Xato productCart');
    }
  };

  useEffect(() => {
    const extractedNumber = extractNumberFromMixedData(product.amount);
    setNumber(extractedNumber);

    const filtered = extractAndFilterString(product.amount);
    setFilteredString(filtered);
  }, [product.amount, currentProduct]);

  return (
    <div className="flex justify-between gap-10 ">
      <div className="flex h-full flex-1 justify-between p-8 max-lg:w-[320px] max-lg:flex-col max-lg:gap-[60px] max-lg:p-[20px] max-sm:gap-0 max-sm:rounded-sm max-sm:bg-white max-sm:p-3 sm:border-[1px] sm:border-[#0000001A]">
        <div className="w-de hidden w-full max-sm:flex max-sm:flex-row max-sm:justify-between sm:w-52">
          <p className="w-52 text-text-blue max-sm:font-roboto max-sm:text-lg max-sm:font-medium max-sm:text-[#131313]">
            {product.product.name}
          </p>
          <div
            className="rime-icone sm:hidden"
            onClick={() => product.deleteProduct(product.product.id.toString())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.2997 5.70973C17.9097 5.31973 17.2797 5.31973 16.8897 5.70973L11.9997 10.5897L7.10973 5.69973C6.71973 5.30973 6.08973 5.30973 5.69973 5.69973C5.30973 6.08973 5.30973 6.71973 5.69973 7.10973L10.5897 11.9997L5.69973 16.8897C5.30973 17.2797 5.30973 17.9097 5.69973 18.2997C6.08973 18.6897 6.71973 18.6897 7.10973 18.2997L11.9997 13.4097L16.8897 18.2997C17.2797 18.6897 17.9097 18.6897 18.2997 18.2997C18.6897 17.9097 18.6897 17.2797 18.2997 16.8897L13.4097 11.9997L18.2997 7.10973C18.6797 6.72973 18.6797 6.08973 18.2997 5.70973Z"
                fill="#3C3C43"
                fill-opacity="0.6"
              />
            </svg>
          </div>
        </div>

        <div className="dive mt-4 flex flex-col gap-1 sm:hidden">
          {product.filters &&
            product.filters.map((filter) => (
              <div className="mobile-ande-deskope" key={filter.name}>
                <p className="w-52 max-sm:hidden">{filter.value}</p>
                <p className="sm:hidden">
                  <span className="text-[14px] text-[#3C3C4399]">
                    {filter.name}:{' '}
                  </span>{' '}
                  {filter.value}
                </p>
              </div>
            ))}
          <p className="">
            {' '}
            <span className="text-[14px] text-[#3C3C4399]">Цена: </span>
            {product.product.price}
          </p>
        </div>

        <a
          href={`/catalog/category/${slugify(product.product.category_name)}-${
            product.product.category_id
          }/${slugify(product.product.name)}-${product.product.id}`}
          className="text-max-lg hidden flex-1 flex-row items-center justify-between font-normal max-lg:flex-col max-lg:items-start max-lg:gap-[24px] sm:flex"
        >
          <div className="w-de w-full max-sm:flex max-sm:flex-row max-sm:justify-between sm:w-52">
            <p className="w-52 text-text-blue max-sm:text-lg max-sm:font-medium max-sm:text-[#131313]">
              {product.product.name}
            </p>
            <div
              className="rime-icone sm:hidden"
              onClick={() =>
                product.deleteProduct(product.product.id.toString())
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18.2997 5.70973C17.9097 5.31973 17.2797 5.31973 16.8897 5.70973L11.9997 10.5897L7.10973 5.69973C6.71973 5.30973 6.08973 5.30973 5.69973 5.69973C5.30973 6.08973 5.30973 6.71973 5.69973 7.10973L10.5897 11.9997L5.69973 16.8897C5.30973 17.2797 5.30973 17.9097 5.69973 18.2997C6.08973 18.6897 6.71973 18.6897 7.10973 18.2997L11.9997 13.4097L16.8897 18.2997C17.2797 18.6897 17.9097 18.6897 18.2997 18.2997C18.6897 17.9097 18.6897 17.2797 18.2997 16.8897L13.4097 11.9997L18.2997 7.10973C18.6797 6.72973 18.6797 6.08973 18.2997 5.70973Z"
                  fill="#3C3C43"
                  fill-opacity="0.6"
                />
              </svg>
            </div>
          </div>
          {product.filters &&
            product.filters.map((filter) => (
              <div className="mobile-ande-deskope" key={filter.name}>
                <p className="w-52 max-sm:hidden">{filter.value}</p>
                <p className="sm:hidden">
                  <span className="text-[14px] text-[#3C3C4399]">
                    {filter.name}:{' '}
                  </span>{' '}
                  {filter.value}
                </p>
              </div>
            ))}
          <p className="w-52 text-blue">{product.amount}</p>
        </a>
        <div className="hidden max-lg:justify-between sm:flex">
          <SendOrderPopUp
            trigger={
              <Button className="rounded-none px-16 py-6 max-lg:h-[55px] max-lg:w-[186px]">
                Оформить
              </Button>
            }
            products={[product]}
            callback={(name: string, phone: string) => {
              sendOrder(
                `Город: ${product.town};\nТелефон: ${phone};\nИмя: ${name};\nТовары: ${product.product.name} - ${product.product.id} ID количество ${product.amount};`
              );
            }}
          />
          <Button
            onClick={() => product.deleteProduct(product.product.id.toString())}
            className="hidden h-[55px] w-[75px] justify-center bg-gray-2 align-middle max-lg:flex"
          >
            <Image
              src={trashIcon}
              width={28}
              height={28}
              alt="Remove from cart"
            />
          </Button>
        </div>
        <div className="mobile-btnse mt-8 sm:hidden">
          <div className="flex items-center justify-between">
            <Select value={filteredString} onValueChange={changeTip}>
              <SelectTrigger className="flex items-center justify-center gap-[20px] rounded-[8px] border border-[#3C3C4399] px-[16px] py-[10px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="м²">м²</SelectItem>
                <SelectItem value="шт.">Штуки</SelectItem>
                <SelectItem value="м">м</SelectItem>
                <SelectItem value="тн.">Тонны</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-[6px]">
              <Button
                onClick={() => minuse()}
                className="flex h-[44px] w-[44px] items-center justify-center rounded-[8px] bg-[#131313]"
              >
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M13.5 9.75H4.5C4.0875 9.75 3.75 9.4125 3.75 9C3.75 8.5875 4.0875 8.25 4.5 8.25H13.5C13.9125 8.25 14.25 8.5875 14.25 9C14.25 9.4125 13.9125 9.75 13.5 9.75Z"
                    fill="white"
                  />
                </svg>
              </Button>
              <Input
                className="mx-auto flex h-[44px] w-[69px] items-center justify-center gap-[10px] rounded-[8px] border-[1px] border-[#3C3C434D] text-center  outline-none"
                value={number}
              />
              <Button
                onClick={() => pluse()}
                className="flex h-[44px] w-[44px] items-center justify-center rounded-[8px] bg-[#131313]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M13.5 9.75H9.75V13.5C9.75 13.9125 9.4125 14.25 9 14.25C8.5875 14.25 8.25 13.9125 8.25 13.5V9.75H4.5C4.0875 9.75 3.75 9.4125 3.75 9C3.75 8.5875 4.0875 8.25 4.5 8.25H8.25V4.5C8.25 4.0875 8.5875 3.75 9 3.75C9.4125 3.75 9.75 4.0875 9.75 4.5V8.25H13.5C13.9125 8.25 14.25 8.5875 14.25 9C14.25 9.4125 13.9125 9.75 13.5 9.75Z"
                    fill="white"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => product.deleteProduct(product.product.id.toString())}
        className="h-[114px] bg-gray-2 px-10 max-lg:bottom-[-50px] max-lg:right-[50px] max-lg:hidden max-lg:h-[55px] max-lg:w-[75px] max-lg:p-0"
      >
        <Image src={trashIcon} width={28} height={28} alt="Remove from cart" />
      </Button>
    </div>
  );
}