'use server';

import { Category } from 'src/app/(main)/catalog/page';

export default async function fetchSubCategories(id: number): Promise<{
  category: Category;
  filters: { id: number; name: string; filter_id: number }[];
}> {
  return await fetch(`https://marcas.pro/api/categories/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());
}
