'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Input } from 'components//ui/input';
import { Button } from 'components//ui/button';
import { Textarea } from 'components//ui/textarea';
import { Label } from 'components//ui/label';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import base64ToFile from 'src/app/(admin)/dashboard/service/[id]/base64ToFile';
import ImageUploader from 'src/app/(admin)/_components/ImageUploader';

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const token = Cookies.get('token');

  const router = useRouter();

  const [title, setTitle] = useState('');
  const [paragraphs, setParagraphs] = useState(['']);
  const imageInput = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File[]>([]);

  const [replaceDate, setReplaceDate] = useState(false);

  const handleAddParagraph = () => {
    setParagraphs([...paragraphs, '']);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    let updatedParagraphs = [...paragraphs];
    updatedParagraphs[index] = event.target.value;
    setParagraphs(updatedParagraphs);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.append('title', title);
    paragraphs.forEach((paragraph) => {
      formData.append('text', paragraph);
    });

    formData.append('image', image[0]);

    if (replaceDate) {
      const date = new Date().toISOString();
      formData.append('date', date);
    }

    fetch(`https://marcas.pro/api/news/${params.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    }).then(() => {
      toast('Новость успешно изменена');
    });
  };

  useEffect(() => {
    async function fetchData() {
      const res: {
        id: number;
        title: string;
        texts: string[];
        image: string;
        views: number;
        date: string;
      } = await fetch(`https://marcas.pro/api/news/${params.id}`, {
        method: 'GET',
        cache: 'no-cache',
      }).then((res) => res.json());

      setTitle(res.title);
      setParagraphs(res.texts);
      const file = base64ToFile(
        'data:image/webp;base64,' + res.image,
        `Image1.jpg`
      );

      if (file) {
        setImage([file]);
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
        <h2 className="mt-4 text-3xl font-semibold">Изменить новость</h2>
        <Label className="flex flex-col gap-2">
          Название для статьи{' '}
          <Input
            className="rounded-none border-none bg-gray-2"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </Label>

        <Label className="flex flex-col gap-2">
          Текст для статьи
          <div className="flex flex-col gap-4">
            {paragraphs.map((paragraph, index) => (
              <Textarea
                className="rounded-none border-none bg-gray-2"
                key={index}
                rows={3}
                value={paragraph}
                onChange={(event) => handleChange(event, index)}
              />
            ))}
          </div>
        </Label>

        <Button
          variant={'ghost'}
          className="rounded-none text-blue"
          onClick={handleAddParagraph}
          type={'button'}
        >
          Добавить абзац +
        </Button>

        <div>
          <ImageUploader
            files={image}
            setFiles={setImage}
            maxFiles={1}
            text={'Фото новости'}
          />
        </div>

        <Label className="flex">
          Перезаписать дату новости?
          <Input
            type={'checkbox'}
            className="w-1/2 rounded-none"
            onChange={(e) => setReplaceDate(e.currentTarget.checked)}
          />
        </Label>

        <div className="flex gap-4">
          <Button
            disabled={!title || !paragraphs[0]}
            type="submit"
            className="rounded-none"
          >
            Сохранить статью
          </Button>
          <Button
            type="button"
            className="rounded-none bg-red-600 bg-opacity-10 text-red-600"
            onClick={async () => {
              await fetch(`https://marcas.pro/api/news/${params.id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              });
              toast('Статья успешно удалена');
              router.push('/dashboard/news/list');
            }}
          >
            Удалить статью
          </Button>
        </div>
      </form>
    </div>
  );
}
