'use client';

import React, { useEffect, useState } from 'react';
import { Category, SubCategory } from 'src/app/(main)/catalog/page';
import fetchCategories from 'src/app/(admin)/dashboard/product/new/fetchCategories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components//ui/select';
import fetchSubCategories from 'src/app/(admin)/dashboard/product/new/fetchSubCategories';
import { Product } from 'src/app/(main)/catalog/category/[categorySlug]/page';
import AdminProductsList from 'src/app/(admin)/dashboard/product/list/_components/AdminProductsList';

export default function ProductsList() {
  const [, setCategory] = useState<Category>();
  const [subCategory, setSubCategory] = useState<{
    category: Category;
    filters: { id: number; name: string }[];
  }>();

  const [subCategoriesList, setSubCategoriesList] = useState<SubCategory[]>([]);

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    async function getCategories() {
      const res = await fetchCategories();

      setCategoriesList(res);
    }

    getCategories();
  }, []);

  useEffect(() => {
    async function getProducts() {
      const res = await fetch(
        `https://marcas.pro/api/products?category_id=${subCategory?.category.id}`,
        {
          method: 'GET',
          cache: 'no-cache',
        }
      ).then((res) => res.json());

      setProductsList(res);
    }

    if (subCategory) {
      getProducts();
    }
  }, [subCategory]);

  const sortedProducts = productsList
    ? productsList.sort((a, b) => {
        if (a.Filters && b.Filters) {
          const sizeAFilter = a.Filters.find(
            (filter) => filter.name === 'Размер'
          );
          const sizeBFilter = b.Filters.find(
            (filter) => filter.name === 'Размер'
          );

          const sizeA = sizeAFilter
            ? sizeAFilter.value
            : a.Filters.find((filter) => filter.name === 'Диаметр')?.value ?? 1;
          const sizeB = sizeBFilter
            ? sizeBFilter.value
            : b.Filters.find((filter) => filter.name === 'Диаметр')?.value ?? 1;

          return +sizeA - +sizeB;
        }
        return 1;
      })
    : null;

  return (
    <div className="w-full flex-col justify-center gap-6 p-6">
      <h1></h1>
      <div className="mx-auto flex w-[600px] flex-col gap-10">
        <div className="flex gap-4">
          <Select
            onValueChange={(value) => {
              const categ = categoriesList.filter(
                (categ) => categ.id === Number(value)
              )[0];
              setCategory(categ);
              setSubCategoriesList(categ.subcategories);
            }}
          >
            <SelectTrigger className="relative font-medium text-black">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              {categoriesList &&
                categoriesList.map((category) => (
                  <SelectItem
                    key={category.name}
                    value={category.id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={async (value) => {
              const res = await fetchSubCategories(Number(value));
              setSubCategory(res);
            }}
          >
            <SelectTrigger className={`relative font-medium text-black`}>
              <SelectValue placeholder="Подкатегория" />
            </SelectTrigger>
            <SelectContent>
              {subCategoriesList &&
                subCategoriesList.map((category) => (
                  <SelectItem
                    key={category.name}
                    value={category.id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <AdminProductsList
        initialProducts={sortedProducts}
        setInitialProducts={setProductsList}
      />
    </div>
  );
}
