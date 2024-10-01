import React, { Suspense } from 'react';
import NewsList from './_components/NewsList';
import { Breadcrumb } from 'src/components/Breadcrumb';
import Pagination from 'src/components/Pagination';
import { NewsType } from 'components//News';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';

async function fetchTotalPages(): Promise<{ news: NewsType[]; total: number }> {
  const res = await fetch(`https://marcas.pro/api/news/list?offset=0&limit=1`, {
    method: 'GET',
    cache: 'no-cache',
  });

  return await res.json();
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { total } = await fetchTotalPages();
  const page = searchParams['page'] ?? '1';

  const offset = Number(page) === 1 ? 0 : (Number(page) - 1) * 6;

  return (
    <div className="flex flex-col gap-10 bg-[#FBFBFB] px-[120px] pb-[200px] pt-10 max-lg:px-[27px] max-[365px]:px-0">
      <Breadcrumb
        linksList={[
          { href: '/', name: 'Главная' },
          { href: '/news', name: 'Новости' },
        ]}
      />

        <div className="dive-tope flex flex-row justify-between items-center max-[365px]:px-6">
        <h1 className="text-5xl font-medium sm:font-semibold text-[#131313] sm:text-text-blue max-lg:px-[27px] max-sm:px-0 max-lg:text-4xl max-sm:text-2xl">
        НОВОСТИ
      </h1>
   <div className="selecteee sm:hidden">
   <Select>
  <SelectTrigger className="w-[140px] bg-black text-sm font-roboto font-normal text-white rounded-sm py-[6px] pl-2 pr-1">
    <SelectValue 
      placeholder="Сначала новые" 
      className="text-sm text-white font-roboto font-normal" 
    />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Сначала старые</SelectItem>
    <SelectItem value="dark">Сначала новые</SelectItem>
  </SelectContent>
</Select>
   </div>
        </div>

      <Suspense>
        <NewsList offset={offset} />
      </Suspense>
      <Suspense>
        <Pagination
          currentPage={Number(page)}
          totalPages={Math.ceil(total / 6)}
        />
      </Suspense>
    </div>
  );
}
