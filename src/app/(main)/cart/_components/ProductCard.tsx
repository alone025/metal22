import { Button } from 'components//ui/button';

import Image from 'next/image';

import slugify from '@sindresorhus/slugify';
import { fetchedProductWithAmount } from 'src/app/(main)/cart/page';
import sendOrder from 'src/app/utils/sendOrder';
import trashIcon from 'src/assets/Cart/Trash.svg';
import { SendOrderPopUp } from './SendOrderPopUp';

type ProductCardProps = fetchedProductWithAmount & {
  deleteProduct(id: string): void;
  town: string;
};

export default function ProductCard(product: ProductCardProps) {
  return (
    <div className="flex justify-between gap-10 ">
      <div className="flex h-full flex-1 justify-between border-[1px] border-[#0000001A] p-8 max-lg:w-[320px] max-lg:flex-col max-lg:gap-[60px] max-lg:p-[20px] max-[360px]:p-2 max-[332px]:p-1">
        <a
          href={`/catalog/category/${slugify(product.product.category_name)}-${
            product.product.category_id
          }/${slugify(product.product.name)}-${product.product.id}`}
          className="text-max-lg flex flex-1 flex-row items-center justify-between font-normal max-lg:flex-col max-lg:items-start max-lg:gap-[24px]"
        >
          <p className="w-52 text-text-blue">{product.product.name}</p>
          {product.filters &&
            product.filters.map((filter) => (
              <p className="w-52" key={filter.name}>
                {filter.value}
              </p>
            ))}
          <p className="w-52 text-blue">{product.amount}</p>
        </a>
        <div className="flex max-lg:justify-between">
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
