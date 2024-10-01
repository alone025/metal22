'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Input } from 'components//ui/input';
import { Button } from 'components//ui/button';
import { Textarea } from 'components//ui/textarea';
import { Label } from 'components//ui/label';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ImageUploader from 'src/app/(admin)/_components/ImageUploader';

export default function NewNewsPage() {
  const token = Cookies.get('token');

  const router = useRouter();

  const [title, setTitle] = useState('');
  const [paragraphs, setParagraphs] = useState(['']);
  const imageInput = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File[]>([]);

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

    const date = new Date().toISOString();

    const formData = new FormData();

    formData.append('title', title);
    paragraphs.forEach((paragraph) => {
      formData.append('text', paragraph);
    });

    formData.append('date', date);
    formData.append('image', image[0]);

    fetch(`https://marcas.pro/api/news`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    }).then(() => {
      toast('Новость успешно создана');
    });
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
        <h2 className="mt-4 text-3xl font-semibold">Добавить новость</h2>
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

        <Button
          disabled={!title || !paragraphs[0]}
          type="submit"
          className="rounded-none"
        >
          Опубликовать статью
        </Button>
      </form>
    </div>
  );
}
