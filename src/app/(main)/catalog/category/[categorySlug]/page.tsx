import { Breadcrumb } from 'components//Breadcrumb';
import React from 'react';
import { Category } from 'src/app/(main)/catalog/page';
import findIdInSlug from 'src/utils/findIdInSlug';
import ProductsList from 'src/app/(main)/catalog/category/[categorySlug]/_components/ProductsList';
import { BreadcrumbItem, BreadcrumbLink, Breadcrumb as BreadcrumbShad } from 'src/components/ui/breadcrumb';

import slugify from '@sindresorhus/slugify';
import Link from 'next/link';

export type Product = {
  Product: {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category_id: number;
    category_name: string;
    discount: number;
  };
  Filters: {
    id: number;
    name: string;
    value: string;
    filter_id: number;
  }[];
};

async function fetchSubCategory(
  id: number
): Promise<[{ category: Category }, Product[]]> {
  const res = await fetch(`https://marcas.pro/api/categories/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());

  const products = await fetch(
    `https://marcas.pro/api/products?category_id=${id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  ).then((res) => res.json());

  return [res, products];
}

export default async function SubCategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const id = findIdInSlug(params.categorySlug);

  if (!id) throw new Error('Invalid href');

  const [{ category }, products] = await fetchSubCategory(Number(id));

  const sortedProducts = products
    ? products.sort((a, b) => {
        if (a.Filters && b.Filters) {
          const sizeAFilter = a.Filters.find(
            (filter) => filter.name === 'Размер'
          );
          const sizeBFilter = b.Filters.find(
            (filter) => filter.name === 'Размер'
          );

          const sizeA = sizeAFilter
            ? sizeAFilter.value
            : a.Filters.find((filter) => filter.name === 'Диаметр')?.value ?? 1;
          const sizeB = sizeBFilter
            ? sizeBFilter.value
            : b.Filters.find((filter) => filter.name === 'Диаметр')?.value ?? 1;

          return +sizeA - +sizeB;
        }
        return 1;
      })
    : [];

  return (
    <div className="flex flex-col gap-10 px-[120px] pb-[200px] pt-10 max-lg:px-[27px] max-sm:px-0 max-lg:pt-[65px] max-sm:pt-0">
      <Breadcrumb
        mainClassName="sm:!block"
        className={'max-md:text-lg flex items-center'}
        linksList={[
          { href: '/', name: 'Главная' },
          { href: '/catalog', name: 'Каталог' },
          { href: params.categorySlug, name: category.name },
        ]}
      />
        <div className="mobile-breadcrumb-news sm:hidden p-6 mb-3">
        <BreadcrumbShad>
          <BreadcrumbItem className='h-4 text-[#131313]'>
          <BreadcrumbLink className='text-sm text-[#131313] font-normal font-roboto' as={Link} href='/catalog' >
          Каталог
          </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem className='h-4'>
          <BreadcrumbLink className='text-sm font-roboto font-normal text-[#3C3C434D]' as={Link} href={`/catalog/category/${slugify(category.name)}-${category.id}`} >
          {category.name}
          </BreadcrumbLink>
          </BreadcrumbItem>
        
        </BreadcrumbShad>
      </div>
      <div className="flex flex-col gap-10 max-sm:px-6">
        <ProductsList
          initialProducts={sortedProducts}
          categorySlug={params.categorySlug}
          categoryName={category.name.toUpperCase()}
        />
      </div>
    </div>
  );
}
