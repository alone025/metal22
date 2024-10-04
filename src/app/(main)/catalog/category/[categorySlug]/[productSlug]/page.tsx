import { Breadcrumb } from 'components//Breadcrumb';
import React from 'react';
import { Category } from 'src/app/(main)/catalog/page';
import slugify from '@sindresorhus/slugify';
import findIdInSlug from 'src/utils/findIdInSlug';
import Image from 'next/image';
import {
  Accordion as ShadAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components//ui/accordion';
import { Button } from 'components//ui/button';
import { AddToCartPopUp } from 'src/app/(main)/catalog/category/[categorySlug]/_components/AddToCartPopUp';
import getProductPrice from 'src/app/utils/getProductPrice';
import { displayedTel, hrefTel } from 'src/constants/tel';


import { BreadcrumbItem, BreadcrumbLink, Breadcrumb as BreadcrumbShad } from 'src/components/ui/breadcrumb';
import Link from 'next/link';

type Product = {
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category_id: number;
    discount: number;
  };
  filters: {
    id: number;
    name: string;
    value: string;
  }[];
};

async function fetchProduct(
  id: number
): Promise<[Product, { category: Category }]> {
  const product = await fetch(`https://marcas.pro/api/product/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());

  const category = await fetch(
    `https://marcas.pro/api/categories/${product.product.category_id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  ).then((res) => res.json());

  return [product, category];
}

export default async function ProductPage({
  params,
}: {
  params: { productSlug: string };
}) {
  const id = findIdInSlug(params.productSlug);

  if (!id) throw new Error('Invalid href');

  const [{ product, filters }, { category }] = await fetchProduct(Number(id));

  return (
    <div className="bg-[#F7F7F7] sm:bg-[#FBFBFB] px-[120px] pb-[200px] pt-10 max-lg:px-[27px] max-lg:pt-[65px] max-sm:pt-0 max-sm:mb-[200px] max-[640px]:p-0">
      <Breadcrumb
        mainClassName="sm:!block"
        className={'max-md:text-lg'}
        linksList={[
          { href: '/', name: 'Главная' },
          { href: '/catalog', name: 'Каталог' },
          {
            href: `/catalog/category/${slugify(category.name)}-${category.id}`,
            name: category.name,
          },
          {
            href: `/catalog/category/${slugify(category.name)}-${category.id}/${
              params.productSlug
            }`,
            name: product.name,
          },
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
          <BreadcrumbItem className='h-4'>
          <BreadcrumbLink className='text-sm font-roboto font-normal text-[#3C3C434D]' as={Link} href={`/catalog/category/${slugify(category.name)}-${category.id}/${
              params.productSlug
            }`} >
          {product.name}
          </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbShad>
      </div>
      <div className="flex gap-10 pt-3 sm:pt-10 max-lg:flex-col">
        <div className="flex flex-col gap-8 sm:gap-10 max-[368px]:items-center">
          <Image
            src={`data:image/webp;base64,${product.image}`}
            alt="Product image"
            width={830}
            height={480}
            className="max-lg:w-[320px] max-sm:w-full"
          />
          <div className="mobile sm:hidden px-6">
          <AddToCartPopUp
              trigger={
                <Button className="text-white font-normal text-base w-full rounded-lg bg-[#307BAA] h-12">
                  В корзину
                </Button>
              }
              
              category_name={category.name}
              category_id={category.id.toString()}
              id={product.id}
              name={product.name}
              price={product.price}
            />
          </div>
          {filters && (
            <ShadAccordion
              type="single"
              collapsible
              className="hidden sm:flex w-full flex-col gap-1 max-[368px]:items-center"
            >
              <AccordionItem
                value="Характеристики"
                key="Характеристики"
                className="w-[820px] border-[1px] border-[#0000001A] bg-white max-lg:w-[320px]"
              >
                <AccordionTrigger className="text-max-lg h-[96px] gap-[53px] px-[30px] py-5 text-left font-semibold">
                  Характеристики
                </AccordionTrigger>
                <AccordionContent className="text-max-lg flex flex-col gap-2 p-8 font-normal text-black">
                  {filters.map((filter) => (
                    <div
                      key={filter.name + filter.id}
                      className="text-max-lg flex gap-3"
                    >
                      <span className="font-semibold">{filter.name}:</span>{' '}
                      <span className="font-normal">{filter.value}</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </ShadAccordion>
          )}
        </div>

        <div className="flex sm:hidden mx-6 max-sm:rounded-lg max-sm:p-3 max-sm:bg-white sm:border-[1px]  sm:border-[#0000001A] max-lg:flex-col">
           
              <h6  className='text-lg font-medium font-roboto text-[#131313]'>Приобретение продукции и уточнения цен</h6>
              <div className="tele mt-6 w-full py-3 px-[10px] flex justify-center rounded-sm bg-[#44C8651A]">
                <a href={`tel:${hrefTel}`} className='text-base text-center font-roboto font-normal underline text-[#44C865]'>{displayedTel}</a>
              </div>
            </div>

            <div className="mobile-charaster bg-white p-3 rounded-lg mt-4 mx-6">
              <h6 className='text-lg font-medium text-[#131313] font-roboto'>Характеристики</h6>
              <div className="overlayse flex flex-col gap-1 mt-4">
              {filters.map((filter) => (
                    <div
                      key={filter.name + filter.id}
                      className="flex gap-1"
                    >
                      <span className="font-light text-[#3C3C4399] text-base font-roboto">{filter.name}:</span>{' '}
                      <span className="font-normal text-base text-[#131313] font-roboto">{filter.value}</span>
                    </div>
                  ))}
              </div>
            </div>


        <div className="fl hidden sm:flex h-fit min-h-[570px] max-w-[530px] flex-col justify-between gap-6 border-[1px] border-[#0000001A] bg-white p-7 max-lg:min-h-full max-lg:justify-start max-lg:gap-[80px]">
          <div className="hidden sm:flex flex-col gap-6">
            <h1 className="text-4xl font-semibold text-text-blue max-lg:text-lg">
              {product.name}
            </h1>
            <p className="text-base font-normal text-black">
              {product.description}
            </p>
            <div className="flex flex-col gap-2 ">
              <p className="font-medium text-black">
                Цена: {getProductPrice(product)}
              </p>
              {product.discount > 0 && product.discount < 100 && (
                <span className="text-red-500">
                  Скидка: {product.discount}%
                </span>
              )}
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-10 max-sm:px-6">
            <div className="flex max-sm:rounded-lg max-sm:p-3 max-sm:bg-white sm:border-[1px]  sm:border-[#0000001A] max-lg:flex-col">
              <div className="items-center justify-center gap-[10px] px-5 py-2.5 opacity-70">
                Приобретение продукции
                <br />и уточнения цен
              </div>
              <a
                href={`tel:${hrefTel}`}
                className="text-max-lg flex-1 bg-gray-2 px-5 py-6 text-center font-bold text-blue-2 underline"
              >
                {displayedTel}
              </a>
            </div>
            <AddToCartPopUp
              trigger={
                <Button className="max-sm:hidden text-max-lg h-[55px] rounded-none font-medium text-white">
                  В корзину
                </Button>
              }
              category_name={category.name}
              category_id={category.id.toString()}
              id={product.id}
              name={product.name}
              price={product.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
