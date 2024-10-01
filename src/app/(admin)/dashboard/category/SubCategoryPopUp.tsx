'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from 'components//ui/dialog';
import { Button } from 'components//ui/button';
import { Input } from 'components//ui/input';
import { Label } from 'components//ui/label';

type SubCategoryPopupProps = {
  onAddSubCategory: (subCategory: {
    name: string;
    filters: { name: string; id: number }[];
    Discount: number;
  }) => void;
  initialName?: string;
  initialFilters?: { name: string; id: number }[];
  onFilterDelete?: (filterId: number) => void;
};

export default function SubCategoryPopup({
  onAddSubCategory,
  initialName,
  initialFilters,
  onFilterDelete,
}: SubCategoryPopupProps) {
  const [subCategoryName, setSubCategoryName] = useState(initialName ?? '');
  const [filters, setFilters] = useState<{ name: string; id: number }[]>(
    initialFilters ?? []
  );
  const [discount, setDiscount] = useState('');

  const handleAddFilter = () =>
    setFilters([...filters, { name: 'Новый фильтр', id: 0 }]);
  const handleRemoveFilter = (index: number) => {
    if (onFilterDelete) {
      onFilterDelete(filters[index].id);
    }

    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleChangeFilter = (index: number, value: string, id?: number) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { name: value, id: id ?? 0 };
    setFilters(updatedFilters);
  };

  const handleAddSubCategory = () => {
    if (subCategoryName && filters.every((filter) => filter)) {
      onAddSubCategory({ name: subCategoryName, filters, Discount: +discount });
      if (!initialName) {
        setSubCategoryName('');
        setFilters([]);
        setDiscount('');
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-none text-blue" variant="ghost">
          {initialName ? 'Редактировать' : 'Добавить подкатегорию +'}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-1/2 bg-white">
        <DialogTitle>
          {initialName ? 'Редактирование' : 'Новая подкатегория'}
        </DialogTitle>
        <Label className="flex flex-col gap-2">
          Название подкатегории
          <Input
            className="rounded-none"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            placeholder="Название подкатегории"
            required
          />
        </Label>

        <Label className="flex flex-col gap-2">
          Скидка (процент)
          <Input
            className="rounded-none"
            type={'number'}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="15 - понижение цены на 15 процентов, 115 - повышение цены на 15 процентов"
          />
        </Label>

        {filters.map((filter, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Input
              className="rounded-none"
              value={filter.name}
              onChange={(e) =>
                handleChangeFilter(index, e.target.value, filter.id)
              }
              placeholder={`Фильтр ${index + 1}`}
              required
            />
            <Button
              onClick={() => handleRemoveFilter(index)}
              className="w-1/3 rounded-none text-red-500"
              variant="outline"
            >
              Удалить фильтр
            </Button>
          </div>
        ))}
        <div className="flex gap-4">
          <Button
            onClick={handleAddFilter}
            variant="ghost"
            className="rounded-none"
          >
            Добавить фильтр +
          </Button>
          <DialogClose asChild>
            <Button onClick={handleAddSubCategory} className="rounded-none">
              {initialName ? 'Сохранить изменения' : 'Создать подкатегорию'}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
