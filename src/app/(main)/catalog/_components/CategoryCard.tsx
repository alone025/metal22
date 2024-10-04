import { Category } from 'src/app/(main)/catalog/page';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components//ui/dropdown-menu';
import React from 'react';
import slugify from '@sindresorhus/slugify';
import { Button } from 'components//ui/button';
import { OrderCallPopup } from 'components//OrderCallPopup';
import AddCategoryPopUp from 'src/app/(main)/catalog/_components/AddCategoryPopUp';

export default function CategoryCard(category: Category) {
  return (
    <div className="relative sm:mx-auto flex max-[640px]:justify-between rounded-lg sm:rounded-none w-[530px] max-[640px]:p-3 max-sm:w-40 max-sm:h-40 flex-col sm:items-center justify-between sm:gap-6 bg-gray-2 sm:pt-8 max-lg:w-[320px]">
      <h3 className="text-left sm:text-center w-[min-content] line-clamp-2 text-sm sm:text-[28px] font-normal sm:font-bold text-[#131313] sm:text-text-blue">
        {category.name}
      </h3>
      <a
        href={`/catalog/${slugify(category.name)}-${slugify(
          category.id.toString()
        )}`}
      >
        <Image
          className="mix-blend-darken"
          src={`data:image/webp;base64,${category.image}`}
          alt="Category image"
          width={130}
          height={240}
        />
      </a>

      {category.Discount > 0 && category.Discount < 100 && (
        <p className="absolute bottom-20 right-4 text-red-500">
          Скидка {category.Discount}%
        </p>
      )}

      <div className="dive max-[640px]:hidden">
      {category.subcategories ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="cursor-pointer justify-end gap-5 bg-blue px-[175px] py-3 text-xl font-medium text-white focus:bg-blue active:bg-blue-3 data-[state=open]:bg-blue-3 max-lg:px-[72px]">
            Подкатегории
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-30 flex w-full flex-col gap-0.5 bg-[#FBFBFB] p-0 shadow"
            collisionPadding={{ top: 370 }}
          >
            {category.subcategories.map((dropdownItem, subIndex) => (
              <div key={subIndex} className="relative">
                <DropdownMenuItem
                  className="text-max-lg w-[530px] cursor-pointer justify-center bg-white p-5 font-medium text-black hover:bg-white max-lg:w-[320px]"
                  asChild
                >
                  <a
                    href={`/catalog/category/${slugify(dropdownItem.name)}-${
                      dropdownItem.id
                    }`}
                  >
                    {dropdownItem.name}
                  </a>
                </DropdownMenuItem>
                {dropdownItem.Discount > 0 && dropdownItem.Discount < 100 && (
                  <p className="absolute bottom-5 right-4 text-red-500 max-lg:bottom-0">
                    Скидка {dropdownItem.Discount}%
                  </p>
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex w-full items-center">
          <OrderCallPopup
            trigger={
              <Button className="h-[52px] w-1/2 rounded-none bg-black py-3 text-xl font-medium">
                Позвонить
              </Button>
            }
            text={`Звонок по поводу категории - "${category.name}"`}
          />
          <AddCategoryPopUp {...category} />
        </div>
      )}
      </div>
    </div>
  );
}
