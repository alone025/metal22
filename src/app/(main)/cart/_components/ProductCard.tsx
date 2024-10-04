import { Button } from 'components//ui/button';

import Image from 'next/image';

import slugify from '@sindresorhus/slugify';
import { fetchedProductWithAmount } from 'src/app/(main)/cart/page';
import sendOrder from 'src/app/utils/sendOrder';
import trashIcon from 'src/assets/Cart/Trash.svg';
import { SendOrderPopUp } from './SendOrderPopUp';
import { Input } from 'components//ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

type ProductCardProps = fetchedProductWithAmount & {
  deleteProduct(id: string): void;
  town: string;
};

export default function ProductCard(product: ProductCardProps) {
  // console.log(product.filters)
  return (
    <div className="flex justify-between gap-10 ">
      <div className="flex h-full flex-1 justify-between bg-white p-8 max-lg:w-[320px] max-lg:flex-col max-lg:gap-[60px] max-lg:p-[20px] max-[360px]:p-2 max-[332px]:p-1">
        <a
          href={`/catalog/category/${slugify(product.product.category_name)}-${
            product.product.category_id
          }/${slugify(product.product.name)}-${product.product.id}`}
          className="text-max-lg flex flex-1 flex-row items-center justify-between font-normal max-lg:flex-col max-lg:items-start"
        >
          <div className="flex w-full items-center justify-between">
            <p className="w-52 text-[18px] font-[500] text-black">
              {product.product.name}
            </p>
            <div
              onClick={() =>
                product.deleteProduct(product.product.id.toString())
              }
              className='md:hidden'
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2997 5.70973C17.9097 5.31973 17.2797 5.31973 16.8897 5.70973L11.9997 10.5897L7.10973 5.69973C6.71973 5.30973 6.08973 5.30973 5.69973 5.69973C5.30973 6.08973 5.30973 6.71973 5.69973 7.10973L10.5897 11.9997L5.69973 16.8897C5.30973 17.2797 5.30973 17.9097 5.69973 18.2997C6.08973 18.6897 6.71973 18.6897 7.10973 18.2997L11.9997 13.4097L16.8897 18.2997C17.2797 18.6897 17.9097 18.6897 18.2997 18.2997C18.6897 17.9097 18.6897 17.2797 18.2997 16.8897L13.4097 11.9997L18.2997 7.10973C18.6797 6.72973 18.6797 6.08973 18.2997 5.70973Z"
                  fill="#3C3C43"
                  fill-opacity="0.6"
                />
              </svg>
            </div>
          </div>

          <div className='pt-[30px] md:pt-0 flex flex-col md:flex-row'>
            {product.filters &&
              product.filters.map((filter) => (
                <p className="w-52 " key={filter.name}>
                  <span className="text-[14px] text-[#3C3C4399]">
                    {filter.name}:{' '}
                  </span>
                  {filter.value}
                </p>
              ))}
          </div>

          <p className="w-52 text-black">
            <span className="text-[14px] text-[#3C3C4399]">Цена: </span>
            {product.amount}
          </p>
        </a>
        <div className="flex items-center justify-between">
          <Select>
            <SelectTrigger className="flex items-center justify-center gap-[20px] rounded-[8px] border border-[#3C3C4399] px-[16px] py-[10px]">
              <SelectValue placeholder="Штуки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Штуки1">Штуки1</SelectItem>
              <SelectItem value="Штуки2">Штуки2</SelectItem>
              <SelectItem value="Штуки3">Штуки3</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-[6px]">
            <Button className="flex h-[44px] w-[44px] items-center justify-center rounded-[8px] bg-[#131313]">
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
            <Input className="mx-auto flex h-[44px] w-[69px] items-center justify-center gap-[10px] rounded-[8px] border-[1px] border-[#3C3C434D] text-center  outline-none"></Input>
            <Button className="flex h-[44px] w-[44px] items-center justify-center rounded-[8px] bg-[#131313]">
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
        {/* <div className="flex max-lg:justify-between">
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
          <Button className="hidden h-[55px] w-[75px] justify-center bg-gray-2 align-middle max-lg:flex">
            <Image
              src={trashIcon}
              width={28}
              height={28}
              alt="Remove from cart"
            />
          </Button>
        </div> */}
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
