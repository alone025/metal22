import { Breadcrumb } from 'components//Breadcrumb';
import findIdInSlug from 'src/utils/findIdInSlug';

import { Button } from 'components//ui/button';
import { OrderCallPopup } from 'components//OrderCallPopup';
import ServicesCarousel from 'src/app/(main)/catalog/_components/ServicesCarousel';
import React from 'react';
import AddServicePopup from 'src/app/(main)/catalog/services/[serviceSlug]/AddServicePopup';

import {BreadcrumbItem, BreadcrumbLink, Breadcrumb as BreadcrumbShad} from "src/components/ui/breadcrumb"
import Link from 'next/link';

export type Service = {
  Id: number;
  Title: string;
  Description: string[];
  Image1: string;
  Image2: string;
  Image3: string;
  Image4: string;
};

async function fetchService(id: number): Promise<Service> {
  return await fetch(`https://marcas.pro/api/service/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());
}

export default async function ServicePage({
  params,
}: {
  params: { serviceSlug: string };
}) {
  const id = findIdInSlug(params.serviceSlug);

  if (!id) throw new Error('Invalid href');

  const service = await fetchService(Number(id));

  return (
    <div className="mx-auto flex flex-col sm:gap-10 bg-[#FBFBFB] px-[120px] pb-[200px] pt-10 max-lg:px-[27px] max-lg:pt-[64px] max-sm:px-0 max-sm:pt-0 max-sm:pb-[50px]">
      <Breadcrumb
        linksList={[
          { href: '/', name: 'Главная' },
          { href: '/catalog', name: 'Каталог' },
          { href: params.serviceSlug, name: service.Title },
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
          <BreadcrumbLink className='text-sm font-roboto font-normal text-[#3C3C434D]' as={Link} href={`/catalog/services/${params.serviceSlug}`} >
          {service.Title}
          </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbShad>
      </div>
      <div className="flex flex-col gap-10">
        <h1 className="max-[640px]:hidden text-5xl font-semibold text-blue-3 max-lg:text-4xl">
          {service.Title}
        </h1>
        <div className="flex max-w-full sm:gap-10 max-[2000px]:max-w-[1390px] max-sm:max-w-full max-lg:flex-col">
          <ServicesCarousel
            imagesStrings={[
              service.Image1,
              service.Image2,
              service.Image3,
              service.Image4,
            ]}
          />

          <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-5 max-lg:hidden"></div>
          </div>

            <div className="btns-mobile px-6 mt-8 sm:hidden">
            <div className="flex flex-row gap-2">
              <OrderCallPopup
                trigger={
                  <Button className="bg-[#307BAA] w-full rounded-lg h-12 text-base font-normal text-white p-0 ">
                    Заказать услугу
                  </Button>
                }
                text={`Заказ услуги ${service.Title}`}
              />
              <AddServicePopup service={service} mobiled={true} />
            </div>
            </div>

          <div className="flex flex-col justify-between gap-4">
            <div className="flex max-sm:px-6 max-sm:mt-10 w-[675px] flex-col gap-4 max-lg:mb-[65px] max-sm:mb-0 max-lg:w-auto ">
              <h2 className="max-sm:hidden text-3xl font-medium max-sm:text-[#131313] sm:font-bold uppercase max-[2000px]:text-2xl max-sm:text-2xl">
                Что это такое?
              </h2>
              <h2 className="sm:hidden text-3xl font-medium max-sm:text-[#131313] sm:font-bold uppercase max-[2000px]:text-2xl max-sm:text-2xl">
                {service.Title}
              </h2>
              <div className="flex flex-col gap-3">
                {service.Description.map((description) => (
                  <p
                    className="text-xl max-sm:text-[#414141] font-light sm:font-medium sm:opacity-80 max-[2000px]:text-lg max-lg:text-base "
                    key={description}
                  >
                    {description}
                  </p>
                ))}
              </div>
            </div>
            <div className="hidden sm:flex flex-col gap-2">
              <OrderCallPopup
                trigger={
                  <Button className="text-max-lg h-[55px] w-3/5 rounded-none bg-blue-3 font-medium text-white max-lg:w-auto min-[2000px]:text-lg">
                    Заказать услугу
                  </Button>
                }
                text={`Заказ услуги ${service.Title}`}
              />
              <AddServicePopup service={service} mobiled={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
