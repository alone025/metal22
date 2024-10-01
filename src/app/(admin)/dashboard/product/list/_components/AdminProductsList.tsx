'use client';

import ClientPagination from 'components//ClientPagination';
import { Button } from 'components//ui/button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Product } from 'src/app/(main)/catalog/category/[categorySlug]/page';

interface ProductsListProps {
  initialProducts: Product[] | null;
  setInitialProducts: (products: Product[]) => void;
}

export default function AdminProductsList({
  initialProducts,
  setInitialProducts,
}: ProductsListProps) {
  const token = Cookies.get('token');

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageProducts, setPageProducts] = useState<Product[]>([]);

  const productsPerPage = 10;

  useEffect(() => {
    if (initialProducts) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      setPageProducts(initialProducts.slice(startIndex, endIndex));
    }
  }, [initialProducts, currentPage]);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (!initialProducts)
    return (
      <div className="border-[1px] border-[#0000001A] p-8">
        <p className="text-max-lg font-normal opacity-50">
          В данной категории отсутствуют товары
        </p>
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-4 pt-4 max-lg:pt-[40px]">
        {pageProducts.map(({ Product, Filters }) => (
          <div
            key={Product.name + Product.id}
            className="z-10 flex justify-between gap-20 border-[1px] border-[#0000001A] p-[34px] max-lg:flex-col max-lg:p-[20px]"
          >
            <div className="text-max-lg relative z-10 flex w-full  items-center gap-20 font-normal text-black max-lg:flex-col max-lg:items-start max-lg:gap-[20px]">
              <p className="w-[200px] text-text-blue">{Product.name}</p>
              {Filters &&
                Filters.map((filter) => (
                  <p
                    key={filter.id + Product.id}
                    className="flex w-[150px] justify-center max-lg:justify-normal"
                  >
                    {filter.value}
                  </p>
                ))}
            </div>
            <div className="flex gap-2">
              <Button asChild className="rounded-none">
                <a href={`/dashboard/product/${Product.id}`}>Редактировать</a>
              </Button>
              <Button
                className="rounded-none"
                onClick={async () => {
                  fetch(`https://marcas.pro/api/copy-product/${Product.id}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer ' + token,
                    },
                  }).then(async (res) => {
                    const response: { new_product_id: number } =
                      await res.json();
                    toast('Продукт успешно скопирован');

                    if (typeof window !== 'undefined') {
                      window.open(
                        `/dashboard/product/${response.new_product_id}`,
                        '_blank',
                        'noopener,noreferrer'
                      );
                    }
                  });
                }}
              >
                Копировать
              </Button>
              <Button
                className="rounded-none bg-red-600 bg-opacity-10 text-red-600"
                onClick={async () => {
                  fetch(`https://marcas.pro/api/product/${Product.id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer ' + token,
                    },
                  }).then(() => {
                    const newProducts = initialProducts.filter(
                      (product) => product.Product.id !== Product.id
                    );

                    setInitialProducts(newProducts);

                    toast('Продукт успешно удален');
                  });
                }}
              >
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ClientPagination
        currentPage={currentPage}
        totalPages={Math.ceil(initialProducts.length / productsPerPage)}
        changePage={changePage}
      />
    </div>
  );
}
