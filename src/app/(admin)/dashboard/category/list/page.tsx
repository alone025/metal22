'use client';

import { Category } from 'src/app/(main)/catalog/page';
import AdminCategoryCard from 'src/app/(admin)/dashboard/category/list/AdminCategoryCard';
import React, { useEffect, useState } from 'react';
import { Button } from 'components//ui/button';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

export default function AdminCategoriesPage() {
  const token = Cookies.get('token');

  const [categories, setCategories] = useState<Category[]>([]);

  function moveCategoryUp(index: number) {
    if (index > 0) {
      const newCategories = [...categories];
      [newCategories[index], newCategories[index - 1]] = [
        newCategories[index - 1],
        newCategories[index],
      ];
      setCategories(newCategories);
    }
  }

  function moveCategoryDown(index: number) {
    if (index < categories.length - 1) {
      const newCategories = [...categories];
      [newCategories[index], newCategories[index + 1]] = [
        newCategories[index + 1],
        newCategories[index],
      ];
      setCategories(newCategories);
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('https://marcas.pro/api/categories/list', {
        method: 'GET',
        cache: 'no-cache',
      }).then((res) => res.json());

      const categoriesWithoutMain = res.filter((c: any) => c.id !== 1);

      setCategories(categoriesWithoutMain);
    }

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-10 bg-[#FBFBFB] px-[120px] pb-[200px] pt-10 max-lg:px-[27px] max-lg:pb-[120px] max-[350px]:p-0 max-[350px]:pb-[120px]">
        <h2
          className="text-5xl font-semibold text-text-blue max-lg:text-4xl"
          id="catalog-items"
        >
          Опубликованные категории
        </h2>
        <div className="flex flex-wrap gap-10">
          {categories &&
            categories.map((category, index) => (
              <AdminCategoryCard
                index={index}
                key={category.id}
                {...category}
                moveDown={moveCategoryDown}
                moveUp={moveCategoryUp}
              />
            ))}
        </div>
        <Button
          onClick={() => {
            const newOrder = categories.map((category) => category.id);

            fetch('https://marcas.pro/api/categories-list?categoryID=1', {
              method: 'PATCH',
              cache: 'no-cache',
              headers: {
                Authorization: 'Bearer ' + token,
              },
              body: JSON.stringify({ categoryIDs: newOrder }),
            })
              .then(() => {
                toast('Порядок сохранен');
              })
              .catch((e) => alert(e));
          }}
        >
          Сохранить новый порядок
        </Button>
      </div>
    </div>
  );
}
