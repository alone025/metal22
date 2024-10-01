'use server';

export type fetchedProduct = {
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category_name: string;
    category_id: number;
    discount: number;
  };
  filters: {
    id: number;
    value: string;
    name: string;
    filter_id: number;
  }[];
};

export default async function fetchProduct(
  id: string
): Promise<fetchedProduct> {
  return await fetch(`https://marcas.pro/api/product/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
}
