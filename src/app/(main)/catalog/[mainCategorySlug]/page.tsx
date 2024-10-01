import { Breadcrumb } from 'components//Breadcrumb';
import React from 'react';
import { Category, SubCategory } from 'src/app/(main)/catalog/page';
import findIdInSlug from 'src/utils/findIdInSlug';
import Image from 'next/image';
import slugify from '@sindresorhus/slugify';
import { Button } from 'components//ui/button';
import CategoryCard from 'src/app/(main)/catalog/_components/CategoryCard';

async function fetchCategory(id: number) {
  const res: { category: Category; subcategories: SubCategory[] } = await fetch(
    `https://marcas.pro/api/categories/${id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  ).then((res) => res.json());

  if (res.subcategories) {
    res.subcategories = await Promise.all(
      res.subcategories.map(async (subcategory) => {
        const productResponse = await fetch(
          `https://marcas.pro/api/products?category_id=${subcategory.id}&limit=1`,
          {
            method: 'GET',
            cache: 'no-cache',
          }
        ).then((res) => res.json());

        subcategory.image = productResponse[0]?.Product?.image ?? '';
        return subcategory;
      })
    );
  }

  return res;
}

export default async function CategoryPage({
  params,
}: {
  params: { mainCategorySlug: string };
}) {
  const id = findIdInSlug(params.mainCategorySlug);

  if (!id) throw new Error('Invalid href');

  const { category, subcategories } = await fetchCategory(Number(id));

  return (
    <div className="flex flex-col gap-10 bg-[#FBFBFB] px-[120px] pb-[200px] pt-10 max-lg:px-[27px] max-lg:pt-[65px] max-[350px]:px-2">
      <Breadcrumb
        mainClassName="!block"
        className={'max-md:text-lg'}
        linksList={[
          { href: '/', name: 'Главная' },
          { href: '/catalog', name: 'Каталог' },
          { href: params.mainCategorySlug, name: category.name },
        ]}
      />
      {category.Discount > 0 && category.Discount < 100 && (
        <p className="mx-auto text-red-500">Скидка {category.Discount}%</p>
      )}
      <CategoryCard {...category} subcategories={subcategories} />
      <div className="flex flex-row flex-wrap gap-10">
        {subcategories
          ? subcategories.map((subcategory) => (
              <div
                key={subcategory.id}
                className="relative mx-auto flex w-[530px] flex-col items-center justify-between gap-6 bg-gray-2 py-2 max-lg:w-[320px]"
              >
                <h3 className="text-center text-[28px] font-bold text-text-blue">
                  {subcategory.name}
                </h3>
                <div className="relative h-[140px] w-full">
                  <Image
                    className="object-cover mix-blend-darken max-lg:object-fill"
                    src={`data:image/webp;base64,${subcategory.image}`}
                    alt={`${subcategory.name} image`}
                    fill
                  />
                </div>

                {subcategory.Discount > 0 && subcategory.Discount < 100 && (
                  <p className="absolute bottom-20 right-4 text-red-500">
                    Скидка {subcategory.Discount}%
                  </p>
                )}
                <Button asChild className="h-12 w-full rounded-none text-lg">
                  <a
                    href={`/catalog/category/${slugify(subcategory.name)}-${
                      subcategory.id
                    }`}
                  >
                    Подробнее
                  </a>
                </Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
