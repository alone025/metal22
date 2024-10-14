import slugify from '@sindresorhus/slugify';
import { Button } from '../../../../../../components/ui/button';
import getProductPrice from '../../../../../utils/getProductPrice';
import { Product } from '../page';
import { AddToCartPopUp } from './AddToCartPopUp';

export function ProductCard({
  product,
  categorySlug,
  index,
}: {
  product: Product;
  categorySlug: string;
  index: number;
}) {
  const { Product, Filters } = product;
  return (
    <div className="z-10 flex justify-between gap-20 border-[1px] border-[#0000001A] p-[34px]">
      <a
        className="text-max-lg relative z-20 flex w-full flex-col gap-6 font-normal text-black"
        href={`${categorySlug}/${slugify(Product.name)}-${Product.id}`}
        onClick={(e) => {
          if (e.target instanceof HTMLButtonElement) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div className="flex items-center justify-between gap-6">
          <p className="text-3xl text-text-blue ">{Product.name} </p>

          <div className="flex gap-6 items-center justify-between">
            <div className='flex gap-2 items-start justify-between'>
            <p className="relative flex w-fit flex-row gap-2 justify-center">
              {getProductPrice(Product)}
              {index === 0 && <p className="absolute bottom-[96px]">Цена</p>}
            </p>

            {Product.discount > 0 && Product.discount < 100 && (
              <span className="text-red-500">{Product.discount}%</span>
            )}
            </div>


<AddToCartPopUp
            trigger={
              <Button className="text-max-lg relative z-20 h-[55px] w-[210px] rounded-none bg-blue-3 font-medium text-white">
                В корзину
              </Button>
            }
            categorySlug={categorySlug}
            id={Product.id}
            name={Product.name}
            price={Product.price}
          />
          </div>

        
        </div>

        <div className="flex w-full items-center gap-20 font-normal text-black">
          {Filters &&
            Filters.map((filter) => (
              <div
                key={filter.name}
                className="flex w-[150px] cursor-pointer flex-col justify-start gap-2 pl-2 text-base font-normal text-black max-lg:text-xs"
              >
                <p key={filter.id + Product.id} className="opacity-40">
                  {filter.name}
                </p>
                <p>{filter.value}</p>
              </div>
            ))}
        </div>
      </a>
    </div>
  );
}