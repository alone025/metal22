'use client';

import { Button } from 'components//ui/button';
import Cookies from 'js-cookie';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Product } from 'src/app/(main)/catalog/category/[categorySlug]/page';
import { Input } from 'src/components/ui/input';

export default function PopularPage() {
  const token = Cookies.get('token');

  const router = useRouter();

  const [productsList, setProductsList] = useState<Product[]>([]);

  const [productId, setProductId] = useState('');

  async function getPopularProducts() {
    const res = await fetch('https://marcas.pro/api/popular', {
      method: 'GET',
      cache: 'no-cache',
    }).then((res) => res.json());

    if (res) {
      setProductsList(res);
    }
  }

  const addProductToPopular = async () => {
    await fetch(`https://marcas.pro/api/popular?productID=${productId}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    await getPopularProducts();

    toast('Продукт успешно добавлен в популярные товары');
  };

  const deleteProductFromPopular = async (productId: number) => {
    await fetch(`https://marcas.pro/api/popular/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    await getPopularProducts();

    toast('Продукт успешно удален из популярных товаров');
  };

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      getPopularProducts();
    }
  }, [router, token]);

  return (
    <div className="flex flex-col gap-6 p-10">
      <h2 className="mt-4 text-3xl font-semibold">Популярные товары</h2>
      {productsList.map(({ Product }) => (
        <div
          key={Product.name + Product.id}
          className="flex items-center gap-2"
        >
          <a
            href={`/dashboard/product/${Product.id}`}
            className="z-10 flex flex-1 justify-between gap-20 border-[1px] border-[#0000001A] p-[34px] max-lg:flex-col max-lg:p-[20px]"
          >
            <div className="text-max-lg relative z-10 flex w-full items-center gap-20 font-normal text-black max-lg:flex-col max-lg:items-start max-lg:gap-[20px]">
              <p className="w-[200px] text-text-blue">Имя: {Product.name}</p>
              <p className="w-[200px]">ID: {Product.id}</p>
            </div>
          </a>
          <Button
            variant="ghost"
            className="min-h-full rounded-none"
            onClick={() => deleteProductFromPopular(Product.id)}
          >
            <TrashIcon className="text-red-500" />
          </Button>
        </div>
      ))}

      <div className="flex flex-col items-start gap-4">
        <h2 className="mt-4 text-3xl font-semibold">
          Добавить новый продукт в список популярных
        </h2>
        <Input
          className="w-60"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder={'ID продукта'}
        />
        <Button onClick={addProductToPopular}>Добавить</Button>
      </div>
    </div>
  );
}
