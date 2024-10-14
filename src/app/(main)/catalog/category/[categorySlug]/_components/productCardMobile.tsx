import slugify from "@sindresorhus/slugify";
import { Button } from "../../../../../../components/ui/button";
import getProductPrice from "../../../../../utils/getProductPrice";
import { Product } from "../page";
import { AddToCartPopUp } from "./AddToCartPopUp";


export function ProductCardMobile ({ product, categorySlug }: {product: Product, categorySlug: string}) {
  const {Product, Filters} = product;
  return <div className="z-10 flex flex-col sm:gap-6 max-sm:bg-white max-sm:rounded-sm sm:border-[1px] sm:border-[#0000001A] p-3 sm:p-5">
    <a
      className="text-max-lg relative z-20 flex w-full flex-col gap-[20px] font-normal text-black items-start"
      href={`${categorySlug}/${slugify(Product.name)}-${Product.id}`}
      onClick={(e) => {
        if (e.target instanceof HTMLButtonElement) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <p className="w-full text-lg sm:text-base max-sm:font-medium sm:italic text-[#131313] sm:text-text-blue">{Product.name}</p>
      <div className="flex w-full flex-col items-start gap-1 sm:gap-[20px] font-normal text-black">
        {Filters &&
          Filters.map((filter) => (
            <div
              key={filter.name}
              className="flex w-full flex-row justify-normal gap-2"
            >
              <p key={filter.id + Product.id} className="opacity-100 max-sm:text-sm max-sm:font-light max-sm:font-roboto max-sm:text-[#3C3C4399]">
                {filter.name}:
              </p>
              <p className="max-sm:text-sm max-sm:font-normal max-sm:text-[#131313]">{filter.value}</p>
            </div>
          ))}
        <p className="flex flex-row gap-2 max-sm:text-sm max-sm:font-normal max-sm:text-[#131313]">
          <span className="max-sm:text-sm max-sm:font-light max-sm:font-roboto max-sm:text-[#3C3C4399]" >Цена:</span>
          {getProductPrice(Product)}
        </p>
        {Product.discount > 0 && Product.discount < 100 && (
          <span className="text-red-500">
            Скидка: {Product.discount}%
          </span>
        )}
      </div>
    </a>
    <AddToCartPopUp
      trigger={
        <Button className="text-max-lg max-sm:mt-8 relative z-20 h-[55px] w-full max-sm:mr-2  sm:w-auto rounded-lg sm:rounded-none bg-[#307BAA] sm:bg-blue-3 max-sm:text-base max-sm:font-roboto font-normal sm:font-medium text-white">
          В корзину
        </Button>
      }
      categorySlug={categorySlug}
      id={Product.id}
      name={Product.name}
      price={Product.price}
    />
  </div>
};