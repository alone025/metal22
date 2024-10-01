import { Breadcrumb } from 'components//Breadcrumb';

import Image from 'next/image';
import React from 'react';
import findIdInSlug from 'src/utils/findIdInSlug';
import formatDateString from 'src/utils/formatDateString';
import News from 'components//News';
import SubscribeSection from 'src/app/(main)/news/[slug]/_components/SubscribeSection';

async function fetchDetailedNews(id: number): Promise<
  {
    id: number;
    title: string;
    texts: string[];
    image: string;
    views: number;
    date: string;
  }[]
> {
  const currentNews = await fetch(`https://marcas.pro/api/news/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());

  const seeAlso = await fetch(
    `https://marcas.pro/api/news/random?newsID=${id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  ).then((res) => res.json());

  return [currentNews, seeAlso];
}

export default async function DetailedNews({
  params,
}: {
  params: { slug: string };
}) {
  const id = findIdInSlug(params.slug);

  if (!id) throw new Error('Invalid href');

  const [currentNews, seeAlso] = await fetchDetailedNews(Number(id));

  return (
    <div className="flex flex-col gap-10 bg-[#FBFBFB] px-[265px] pb-[200px] pt-10 max-lg:gap-0 max-lg:px-0">
      <Breadcrumb
        linksList={[
          { href: '/', name: 'Главная' },
          { href: '/news', name: 'Новости' },
          { href: params.slug, name: currentNews.title },
        ]}
        
      />


      <h1 className="text-5xl font-semibold text-text-blue max-lg:px-[27px] max-lg:text-4xl">
        НОВОСТИ
      </h1>

      <div className="flex flex-row gap-10 max-lg:flex-col max-lg:gap-0">
        <div className="relative flex flex-col gap-[20px] max-lg:px-[27px] max-lg:py-[52px]">
          <Image
            src={`data:image/webp;base64,${currentNews.image}`}
            height={480}
            width={835}
            alt="News image"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold uppercase text-black">
              {currentNews.title}
            </h2>

            <div className="flex flex-col gap-4">
              {currentNews.texts.map((paragraph, index) => (
                <p
                  className="font-normal text-black opacity-80"
                  key={params.slug + index}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex justify-between max-lg:flex-col">
              <div>
                <span className="text-base font-bold leading-normal text-neutral-900">
                  Просмотров:{' '}
                </span>

                <span className="text-base font-normal leading-normal text-neutral-900">
                  {currentNews.views}
                </span>
              </div>
              <p className="text-base font-normal text-black text-opacity-50">
                {formatDateString(currentNews.date)}
              </p>
            </div>
          </div>
        </div>
        <aside className="flex w-[520px] flex-col gap-10 max-lg:w-auto max-lg:flex-col-reverse max-lg:py-[52px]">
          <div className="flex flex-col gap-10 bg-gray-2 p-8 max-lg:h-[325px] max-lg:py-[52px]">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold  max-lg:text-xl">
                Подписка на новости
              </h2>
              <p className="text-base text-black max-lg:w-[320px]">
                Подпишитесь на нашу рассылку и будьте в курсе всех обновлений,
                акций и специальных предложений.
              </p>
            </div>
            <SubscribeSection />
          </div>
          <div className="flex flex-col gap-7 max-lg:px-[27px] max-lg:py-[52px]">
            <h2 className="text-3xl font-bold text-text-blue">
              Читайте так же:
            </h2>
            <News {...seeAlso} className="" />
          </div>
        </aside>
      </div>
    </div>
  );
}
