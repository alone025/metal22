'use client';

import React, { useEffect, useState } from 'react';

import { Input } from 'components//ui/input';
import { Button } from 'components//ui/button';
import { Label } from 'components//ui/label';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { TrashIcon } from 'lucide-react';
import ImageUploader from 'src/app/(admin)/_components/ImageUploader';
import SubCategoryPopup from 'src/app/(admin)/dashboard/category/SubCategoryPopUp';
import { Category } from 'src/app/(main)/catalog/page';
import base64ToFile from '../../service/[id]/base64ToFile';
import { SubCategory } from 'src/app/(admin)/dashboard/category/[id]/page';
import { toast } from 'sonner';

const onePixelImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=';

export default function NewCategoryPage() {
  const token = Cookies.get('token');

  const router = useRouter();

  const [categoryName, setCategoryName] = useState('');
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const handleAddSubCategory = (subCategory: {
    name: string;
    filters: { name: string; id: number }[];
    Discount: number;
  }) => {
    setSubCategories([
      ...subCategories,
      { ...subCategory, id: 0, new: true, edited: false },
    ]);
  };

  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', categoryName);
    formData.append('parent_id', '1');
    formData.append('image', files[0]);

    const category: Category = await fetch(
      'https://marcas.pro/api/categories',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },

        body: formData,
      }
    )
      .then((res) => res.json())
      .catch(() => {
        alert('Уже существует категория с таким именем');
      });

    const createdSubCategories: Category[] = [];

    for (const subCategory of subCategories) {
      const subCategoryForm = new FormData();

      subCategoryForm.append('name', subCategory.name);
      subCategoryForm.append('parent_id', category.id.toString());

      const image = base64ToFile(onePixelImage, 'image');

      if (image) {
        subCategoryForm.append('image', image);
      }

      const createdSubCategory: Category = await fetch(
        'https://marcas.pro/api/categories',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },

          body: subCategoryForm,
        }
      )
        .then((res) => res.json())
        .catch(() => {
          alert(`Уже существует подкатегория с именем ${subCategory.name}`);
        });

      createdSubCategories.push(createdSubCategory);

      for (const filter of subCategory.filters) {
        const createdFilter: { id: number } = await fetch(
          'https://marcas.pro/api/filters',
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + token,
            },

            body: JSON.stringify({ name: filter }),
          }
        ).then((res) => res.json());

        await fetch(
          `https://marcas.pro/api/categories_filter?category_id=${createdSubCategory.id}&filter_id=${createdFilter.id}`,
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
      }
    }

    const newOrder = createdSubCategories.map((category) => category.id);

    fetch(`https://marcas.pro/api/categories-list?categoryID=${category.id}`, {
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ categoryIDs: newOrder }),
    }).catch((e) => alert(e));

    toast('Категория успешно создана');
  };

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

  return (
    <div className="h-[1100px] w-full">
      <form
        className="mx-auto flex w-[600px] flex-col gap-10"
        onSubmit={handleSubmit}
      >
        <h2 className="mt-4 text-3xl font-semibold">Добавить категорию</h2>
        <Label className="flex flex-col gap-2">
          Название категории{' '}
          <Input
            className="w-2/3 rounded-none border-none bg-gray-2"
            value={categoryName}
            onChange={(e) => setCategoryName(e.currentTarget.value)}
          />
        </Label>

        <ImageUploader
          files={files}
          setFiles={setFiles}
          maxFiles={1}
          text={''}
        />

        <div className="flex flex-col items-start gap-4">
          <h2 className="text-3xl font-semibold">Подкатегории</h2>
          {subCategories.map(({ name, id }, index) => (
            <div key={index} className="flex w-full items-center gap-2">
              <h4 className="flex-1 bg-gray-2 p-2">{name}</h4>
              <SubCategoryPopup
                onAddSubCategory={(subCategory) => {
                  const newSubCategories = [...subCategories];
                  newSubCategories[index] = {
                    ...subCategory,
                    id,
                    new: false,
                    edited: true,
                  };

                  setSubCategories(newSubCategories);
                }}
                initialName={subCategories[index].name}
                initialFilters={subCategories[index].filters}
              />
              <Button
                variant="ghost"
                onClick={() => {
                  const newSubCategories = [...subCategories];
                  newSubCategories.splice(index, 1);
                  setSubCategories(newSubCategories);
                }}
              >
                <TrashIcon className="text-red-500" />
              </Button>
            </div>
          ))}
          <SubCategoryPopup onAddSubCategory={handleAddSubCategory} />
        </div>

        <Button
          disabled={!categoryName || files.length !== 1}
          type="submit"
          className="rounded-none"
        >
          Создать категорию
        </Button>
      </form>
    </div>
  );
}
