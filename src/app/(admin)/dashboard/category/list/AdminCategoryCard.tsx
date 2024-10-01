import Image from 'next/image';

import React from 'react';
import { Button } from 'components//ui/button';

export default function AdminCategoryCard({
  name,
  image,
  id,
  index,
  moveUp,
  moveDown,
}: {
  name: string;
  image: string;
  id: number;
  index: number;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}) {
  return (
    <div className="mx-auto flex w-[530px] flex-col items-center justify-between gap-6 bg-gray-2 pt-8 max-lg:w-[320px]">
      <h3 className="text-center text-[28px] font-bold text-text-blue">
        {name}
      </h3>
      <Image
        src={`data:image/webp;base64,${image}`}
        alt="Category image"
        width={130}
        height={240}
      />
      <Button asChild className="w-full rounded-none">
        <a href={`/dashboard/category/${id}`}>Редактировать</a>
      </Button>
      <div className="flex gap-2 p-2">
        <Button variant="outline" onClick={() => moveUp(index)}>
          ↑
        </Button>
        <Button variant="outline" onClick={() => moveDown(index)}>
          ↓
        </Button>
      </div>
    </div>
  );
}
