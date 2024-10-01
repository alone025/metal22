'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Category, SubCategory } from 'src/app/(main)/catalog/page';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components//ui/select';

import fetchCategories from 'src/app/(admin)/dashboard/product/new/fetchCategories';
import fetchSubCategories from 'src/app/(admin)/dashboard/product/new/fetchSubCategories';
import { Input } from 'components//ui/input';
import { Button } from 'components//ui/button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import ImageUploader from 'src/app/(admin)/_components/ImageUploader';
import { toast } from 'sonner';

export default function NewProductPage() {
  const token = Cookies.get('token');

  const router = useRouter();

  const [category, setCategory] = useState<Category>();
  const [subCategory, setSubCategory] = useState<{
    category: Category;
    filters: { id: number; name: string }[];
  }>();

  const [subCategoriesList, setSubCategoriesList] = useState<SubCategory[]>([]);

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  const [productName, setProductName] = useState('');

  const [productDescription, setProductDescription] = useState('');

  const [productPrice, setProductPrice] = useState('');

  const [filters, setFilters] = useState<{ id: number; value: string }[]>([]);

  const imageInput = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File[]>([]);

  useEffect(() => {
    async function getCategories() {
      const res = await fetchCategories();

      setCategoriesList(res);
    }

    if (!token) {
      router.push('/login');
    } else {
      getCategories();
    }
  }, [router, token]);

  const handleInputChange = (filterId: number, newValue: string) => {
    setFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (f) => f.id === filterId
      );
      if (existingFilterIndex > -1) {
        const updatedFilters = [...prevFilters];
        updatedFilters[existingFilterIndex] = {
          ...updatedFilters[existingFilterIndex],
          value: newValue,
        };
        return updatedFilters;
      } else {
        return [...prevFilters, { id: filterId, value: newValue }];
      }
    });
  };

  return (
    <div className="h-[1100px] w-full">
      <form
        className="mx-auto flex w-[600px] flex-col gap-10"
        onSubmit={async (e) => {
          e.preventDefault();

          if (!category && !subCategory) return;

          const formData = new FormData(e.currentTarget);

          if (subCategory) {
            formData.append('category_id', subCategory?.category.id.toString());
          }

          formData.append('image', image[0]);

          try {
            const { id }: { id: number } = await fetch(
              'https://marcas.pro/api/product',
              {
                method: 'POST',
                headers: {
                  Authorization: 'Bearer ' + token,
                },

                body: formData,
              }
            ).then((res) => res.json());

            const filterUpdatePromises = filters.map((filter) =>
              fetch(
                `https://marcas.pro/api/productfilter?product_id=${id}&filter_id=${filter.id}`,
                {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                  },
                  body: JSON.stringify({ value: filter.value }),
                }
              )
            );

            Promise.all(filterUpdatePromises)
              .then(() => {})
              .catch((error) => {
                console.error('Error updating filters:', error);
              });
          } catch (err) {
            return err;
          }

          toast('Продукт успешно создан');
        }}
      >
        <div>
          <h2 className="my-8 text-3xl font-semibold">Добавить товар</h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm leading-normal">Выберите категорию</p>
              <Select
                onValueChange={(value) => {
                  const categ = categoriesList.filter(
                    (categ) => categ.id === Number(value)
                  )[0];
                  setCategory(categ);
                  setSubCategoriesList(categ.subcategories);
                }}
              >
                <SelectTrigger className="bg-gray-50 relative border-none bg-gray-2 font-medium text-black">
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
            </div>

            <div>
              <p className="text-sm leading-normal">Выберите подкатегорию</p>
              <Select
                onValueChange={async (value) => {
                  console.log(1);
                  const res = await fetchSubCategories(Number(value));
                  setSubCategory(res);
                }}
              >
                <SelectTrigger
                  className={`relative border-none bg-gray-2 font-medium text-black`}
                >
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

            <div>
              <p className="text-sm leading-normal">Название товара</p>
              <Input
                className="rounded-none border-none bg-gray-2"
                required
                name="name"
                value={productName}
                onChange={(e) => setProductName(e.currentTarget.value)}
              />
            </div>

            <div>
              <p className="text-sm leading-normal">Описание</p>
              <Input
                className="rounded-none border-none bg-gray-2"
                required
                name="description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.currentTarget.value)}
              />
            </div>

            <p className="text-sm leading-normal">Цена</p>
            <Input
              className="rounded-none border-none bg-gray-2"
              required
              value={productPrice}
              type={'number'}
              name="price"
              onChange={(e) => setProductPrice(e.currentTarget.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold">Характеристики</h2>
          {subCategory?.filters &&
            subCategory.filters.map((filter) => (
              <div key={filter.name}>
                <p>{filter.name}</p>
                <Input
                  className="rounded-none border-none bg-gray-2"
                  required
                  onChange={(e) =>
                    handleInputChange(filter.id, e.currentTarget.value)
                  }
                />
              </div>
            ))}
        </div>

        <ImageUploader
          files={image}
          setFiles={setImage}
          maxFiles={1}
          text={'Фото товара'}
        />

        <Button
          className="rounded-none"
          disabled={
            !category ||
            !subCategory ||
            !image[0] ||
            !productPrice ||
            !productName ||
            !productDescription ||
            (subCategory.filters &&
              filters.length !== subCategory.filters.length)
          }
          type="submit"
        >
          Добавить товар
        </Button>
      </form>
    </div>
  );
}
