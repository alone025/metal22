import { Category } from 'src/app/(main)/catalog/page';

export default async function fetchCategory(id: number): Promise<Category> {
  const res = await fetch(`https://marcas.pro/api/categories/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());

  return res.category;
}
