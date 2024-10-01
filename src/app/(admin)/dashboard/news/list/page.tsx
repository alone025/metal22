import React, { Suspense } from 'react';

import Pagination from 'src/components/Pagination';
import { NewsType } from 'components//News';
import AdminNewsList from 'src/app/(admin)/dashboard/news/list/AdminNewsList';

async function fetchTotalPages(): Promise<{ news: NewsType[]; total: number }> {
  const res = await fetch(`https://marcas.pro/api/news/list?offset=0&limit=1`, {
    method: 'GET',
    cache: 'no-cache',
  });

  return await res.json();
}

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { total } = await fetchTotalPages();
  const page = searchParams['page'] ?? '1';

  const offset = Number(page) === 1 ? 0 : (Number(page) - 1) * 6;

  return (
    <div className="flex flex-col gap-10 bg-[#FBFBFB] px-[120px] pb-[200px] pt-10 max-lg:px-[27px] max-[365px]:px-0">
      <h1 className="text-3xl font-semibold">Недавно опубликованные</h1>
      <Suspense>
        <AdminNewsList offset={offset} />
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
