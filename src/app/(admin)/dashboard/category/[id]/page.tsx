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
import { toast } from 'sonner';

export type SubCategory = {
  name: string;
  filters: { name: string; id: number }[];
  id: number;
  new: boolean;
  edited: boolean;
  Discount: number;
};

const onePixelImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=';

export default function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const token = Cookies.get('token');

  const router = useRouter();

  const [initialCategoryName, setInitialCategoryName] = useState('');

  const [categoryName, setCategoryName] = useState('');
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const [deletedSubCategories, setDeletedSubCategories] = useState<number[]>(
    []
  );

  const [deletedFilters, setDeletedFilters] = useState<
    { id: number; categoryId: number }[]
  >([]);

  const [discount, setDiscount] = useState('');

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

    if (categoryName !== initialCategoryName) {
      formData.append('name', categoryName);
    }

    formData.append('image', files[0]);

    await fetch(`https://marcas.pro/api/categories/${params.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },

      body: formData,
    }).catch(() => {
      alert('Уже существует категория с таким именем');
    });

    if (discount) {
      await fetch(
        `https://marcas.pro/api/categories/discount?categoryID=${params.id}&percentage=${discount}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
    }

    const createdSubCategories: SubCategory[] = [];

    for (const subCategory of subCategories) {
      let createdSubCategory!: SubCategory;

      const subCategoryForm = new FormData();

      subCategoryForm.append('name', subCategory.name);

      subCategoryForm.append('parent_id', params.id.toString());

      const image = base64ToFile(onePixelImage, 'image');

      if (image && subCategory.new) {
        subCategoryForm.append('image', image);
      }

      if (subCategory.new) {
        createdSubCategory = await fetch('https://marcas.pro/api/categories', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },

          body: subCategoryForm,
        })
          .then((res) => res.json())
          .catch((e) => {
            alert(
              `Ошибка при создании суб категории: ${subCategory.name} - ` + e
            );
          });
      } else if (subCategory.edited) {
        fetch(`https://marcas.pro/api/categories/${subCategory.id}`, {
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + token,
          },

          body: subCategoryForm,
        }).catch((e) => {
          alert(
            `Ошибка при изменение суб категории: ${subCategory.name} - ` + e
          );
        });

        createdSubCategory = subCategory;
      } else {
        createdSubCategory = subCategory;
      }

      if (createdSubCategory) {
        createdSubCategories.push(createdSubCategory);
      }

      if (createdSubCategory && createdSubCategory.Discount) {
        await fetch(
          `https://marcas.pro/api/categories?categoryID=${createdSubCategory.id}&percentage=${subCategory.Discount}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
      }

      if (subCategory.filters && createdSubCategory) {
        for (const filter of subCategory.filters) {
          let fetchedFilter: { id: number };

          if (filter.id === 0) {
            fetchedFilter = await fetch('https://marcas.pro/api/filters', {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + token,
              },

              body: JSON.stringify({ name: filter.name }),
            }).then((res) => res.json());

            await fetch(
              `https://marcas.pro/api/categories_filter?category_id=${createdSubCategory.id}&filter_id=${fetchedFilter.id}`,
              {
                method: 'POST',
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              }
            );
          } else {
            await fetch(`https://marcas.pro/api/filters/${filter.id}`, {
              method: 'PATCH',
              headers: {
                Authorization: 'Bearer ' + token,
              },

              body: JSON.stringify({ name: filter.name }),
            });
          }
        }
      }
    }

    for (const subCategory of deletedSubCategories) {
      await fetch(`https://marcas.pro/api/categories/${subCategory}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    }

    const newOrder = createdSubCategories.map((subCategory) => subCategory.id);

    fetch(`https://marcas.pro/api/categories-list?categoryID=${params.id}`, {
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

    for (const filter of deletedFilters) {
      await fetch(
        `https://marcas.pro/api/categories?category_id=${filter.categoryId}&filter_id=${filter.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
    }

    toast('Категория успешно изменена');
  };

  function moveCategoryUp(index: number) {
    if (index > 0) {
      const newCategories = [...subCategories];
      [newCategories[index], newCategories[index - 1]] = [
        newCategories[index - 1],
        newCategories[index],
      ];
      setSubCategories(newCategories);
    }
  }

  function moveCategoryDown(index: number) {
    if (index < subCategories.length - 1) {
      const newCategories = [...subCategories];
      [newCategories[index], newCategories[index + 1]] = [
        newCategories[index + 1],
        newCategories[index],
      ];
      setSubCategories(newCategories);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const category: { category: Category; subcategories: { id: number }[] } =
        await fetch(`https://marcas.pro/api/categories/${params.id}`, {
          method: 'GET',
          cache: 'no-cache',
        }).then((res) => res.json());

      const subCategories: {
        category: Category;
        filters: { id: number; name: string }[];
      }[] = [];

      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          const subCategoryDetails = await fetch(
            `https://marcas.pro/api/categories/${subcategory.id}`,
            {
              method: 'GET',
              cache: 'no-cache',
            }
          ).then((res) => res.json());

          subCategories.push(subCategoryDetails);
        }

        const parsedSubCategories = subCategories.map((subCategory) => {
          return {
            id: subCategory.category.id,
            name: subCategory.category.name,
            filters: subCategory.filters,
            new: false,
            edited: false,
            Discount: subCategory.category.Discount,
          };
        });

        setSubCategories(parsedSubCategories);
      }

      setInitialCategoryName(category.category.name);
      setCategoryName(category.category.name);
      setDiscount(category.category.Discount.toString());

      const file = base64ToFile(
        'data:image/webp;base64,' + category.category.image,
        `Image1.jpg`
      );

      if (file) {
        setFiles([file]);
      }
    }

    if (!token) {
      router.push('/login');
    } else {
      fetchData();
    }
  }, [params.id, router, token]);

  return (
    <div className="h-[1100px] w-full">
      <form
        className="mx-auto flex w-[600px] flex-col gap-10"
        onSubmit={handleSubmit}
      >
        <h2 className="mt-4 text-3xl font-semibold">Редактировать категорию</h2>
        <Label className="flex flex-col gap-2">
          Название категории{' '}
          <Input
            className="w-2/3 rounded-none border-none bg-gray-2"
            value={categoryName}
            onChange={(e) => setCategoryName(e.currentTarget.value)}
          />
        </Label>

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
                onFilterDelete={(filterId: number) => {
                  if (filterId !== 0) {
                    setDeletedFilters([
                      ...deletedFilters,
                      { id: filterId, categoryId: id },
                    ]);
                  }
                }}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  const subcategory = subCategories[index];
                  const newSubCategories = [...subCategories];
                  newSubCategories.splice(index, 1);
                  setSubCategories(newSubCategories);

                  if (!subcategory.new) {
                    setDeletedSubCategories([
                      ...deletedSubCategories,
                      subcategory.id,
                    ]);
                  }
                }}
              >
                <TrashIcon className="text-red-500" />
              </Button>
              <div className="flex gap-2 p-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => moveCategoryUp(index)}
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => moveCategoryDown(index)}
                >
                  ↓
                </Button>
              </div>
            </div>
          ))}
          <SubCategoryPopup onAddSubCategory={handleAddSubCategory} />
        </div>

        <div className="flex gap-4">
          <Button
            disabled={!categoryName || files.length !== 1}
            type="submit"
            className="rounded-none"
          >
            Сохранить категорию
          </Button>
          <Button
            type="button"
            className="rounded-none bg-red-600 bg-opacity-10 text-red-600"
            onClick={async () => {
              await fetch(`https://marcas.pro/api/categories/${params.id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              });
              router.push('/dashboard/category/list');
            }}
          >
            Удалить категорию
          </Button>
        </div>
      </form>
    </div>
  );
}
