'use server';

import { Category } from 'src/app/(main)/catalog/page';

export default async function fetchCategories(): Promise<Category[]> {
  return await fetch('https://marcas.pro/api/categories/list', {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());
}
