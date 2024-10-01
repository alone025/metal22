'use client';

import React, { useEffect, useState } from 'react';
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
import fetchProduct from 'src/utils/fetchProduct';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ImageUploader from 'src/app/(admin)/_components/ImageUploader';
import base64ToFile from 'src/app/(admin)/dashboard/service/[id]/base64ToFile';
import { Label } from 'components//ui/label';

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const token = Cookies.get('token');

  const router = useRouter();

  const [category, setCategory] = useState<Category>();
  const [subCategory, setSubCategory] = useState<{
    category: Category;
    filters: { id: number; name: string; value?: string; filter_id: number }[];
  }>();

  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');

  const [subCategoriesList, setSubCategoriesList] = useState<SubCategory[]>([]);

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  const [productName, setProductName] = useState('');

  const [productDescription, setProductDescription] = useState('');

  const [productPrice, setProductPrice] = useState('');

  const [image, setImage] = useState<File[]>([]);

  const [discount, setDiscount] = useState('');

  const [filters, setFilters] = useState<
    { filter_id: number; value: string }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesRes = fetchCategories();
        const productRes = fetchProduct(params.id);

        const [categories, { product, filters }] = await Promise.all([
          categoriesRes,
          productRes,
        ]);

        setCategoriesList(categories);

        setProductName(product.name);
        setProductDescription(product.description);
        setProductPrice(product.price.toString());
        setDiscount(product.discount.toString());

        const file = base64ToFile(
          'data:image/webp;base64,' + product.image,
          `Image1.jpg`
        );

        if (file) {
          setImage([file]);
        }

        const subcategory = await fetchSubCategories(product.category_id);
        const parentCategory = categories.find(
          (categ) => categ.id === subcategory.category.parent_id
        );

        if (parentCategory) {
          setCategory(parentCategory);
          setSubCategoriesList(parentCategory.subcategories);
          setCategoryId(parentCategory.id.toString());
          setSubCategoryId(subcategory.category.id.toString());
          setSubCategory({ ...subcategory, filters });
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }

    if (!token) {
      router.push('/login');
    } else {
      fetchData();
    }
  }, [router, token, params.id]);

  const handleInputChange = (filterId: number, newValue: string) => {
    setFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (f) => f.filter_id === filterId
      );
      if (existingFilterIndex > -1) {
        const updatedFilters = [...prevFilters];
        updatedFilters[existingFilterIndex] = {
          ...updatedFilters[existingFilterIndex],
          value: newValue,
        };
        return updatedFilters;
      } else {
        return [...prevFilters, { filter_id: filterId, value: newValue }];
      }
    });
  };

  return (
    <div className="h-[1100px] w-full p-6">
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
          formData.append('discount', discount);

          const res = await fetch(
            `https://marcas.pro/api/product/${params.id}`,
            {
              method: 'PATCH',
              headers: {
                Authorization: 'Bearer ' + token,
              },

              body: formData,
            }
          );

          const filterUpdatePromises = filters.map((filter) =>
            fetch(
              `https://marcas.pro/api/productfilter?product_id=${params.id}&filter_id=${filter.filter_id}`,
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
            .then(() => {
              toast('Продукт успешно изменен');
            })
            .catch((error) => {
              console.error('Error updating filters:', error);
            });

          return res;
        }}
      >
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl font-semibold">Изменить товар</h2>
          <div className="flex flex-col gap-4">
            <div>
              <p>Выберите категорию</p>
              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value);
                  const categ = categoriesList.filter(
                    (categ) => categ.id === Number(value)
                  )[0];
                  setCategory(categ);
                  setSubCategoriesList(categ.subcategories);
                }}
              >
                <SelectTrigger className="relative border-none bg-gray-2 font-medium text-black ">
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
              <p>Выберите подкатегорию</p>
              <Select
                value={subCategoryId}
                onValueChange={async (value) => {
                  setSubCategoryId(value);
                  if (value) {
                    const res = await fetchSubCategories(Number(value));
                    setSubCategory(res);
                  }
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
              <p>Название товара</p>
              <Input
                className="rounded-none border-none bg-gray-2"
                required
                name="name"
                value={productName}
                onChange={(e) => setProductName(e.currentTarget.value)}
              />
            </div>

            <div>
              <p>Описание</p>
              <Input
                className="rounded-none border-none bg-gray-2"
                required
                name="description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.currentTarget.value)}
              />
            </div>

            <div>
              <p>Цена</p>
              <Input
                className="rounded-none border-none bg-gray-2"
                required
                value={productPrice}
                type={'number'}
                name="price"
                onChange={(e) => setProductPrice(e.currentTarget.value)}
              />
            </div>

            <Label className="flex flex-col gap-2">
              Скидка (процент)
              <Input
                className="rounded-none border-none bg-gray-2"
                type={'number'}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="15 - понижение цены на 15 процентов, 115 - повышение цены на 15 процентов"
              />
            </Label>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold">Характеристики</h2>
          {subCategory?.filters &&
            subCategory.filters.map((filter) => (
              <div key={filter.name}>
                <p>{filter.name}</p>
                <Input
                  className="rounded-none border-none bg-gray-2"
                  required
                  defaultValue={filter.value}
                  onChange={(e) =>
                    handleInputChange(filter.filter_id, e.currentTarget.value)
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

        <div className="flex gap-4">
          <Button
            disabled={!category || !subCategory}
            type="submit"
            className="rounded-none"
          >
            Сохранить товар
          </Button>
          <Button
            type="button"
            className="rounded-none bg-red-600 bg-opacity-10 text-red-600"
            onClick={async () => {
              await fetch(`https://marcas.pro/api/product/${params.id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              });
              toast('Продукт успешно удален');
              router.push('/dashboard/product/list');
            }}
          >
            Удалить товар
          </Button>
        </div>
      </form>
    </div>
  );
}
