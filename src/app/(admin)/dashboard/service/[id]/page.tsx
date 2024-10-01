'use client';

import React, { useEffect, useState } from 'react';

import { Input } from 'components//ui/input';
import { Button } from 'components//ui/button';
import { Textarea } from 'components//ui/textarea';
import { Label } from 'components//ui/label';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';
import base64ToFile from 'src/app/(admin)/dashboard/service/[id]/base64ToFile';
import ImageUploader from 'src/app/(admin)/_components/ImageUploader';
import { toast } from 'sonner';

export default function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const token = Cookies.get('token');

  const router = useRouter();

  const [title, setTitle] = useState('');
  const [paragraphs, setParagraphs] = useState(['']);

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res: Service = await fetch(
        `https://marcas.pro/api/service/${params.id}`,
        {
          method: 'GET',
          cache: 'no-cache',
        }
      ).then((res) => res.json());

      setTitle(res.Title);
      setParagraphs(res.Description);

      const imagesToFiles: File[] = [];
      for (let i = 1; i <= 4; i++) {
        // @ts-ignore
        const base64Image = res[`Image${i}`] as string;
        if (base64Image) {
          const file = base64ToFile(
            'data:image/webp;base64,' + base64Image,
            `Image${i}.jpg`
          );
          if (file) {
            imagesToFiles.push(file);
          }
        }
      }

      setFiles(imagesToFiles);
    }

    if (!token) {
      router.push('/login');
    } else {
      fetchData();
    }
  }, [router, token, params.id]);

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
      formData.append('description', paragraph);
    });

    formData.delete('image');

    files.forEach((file, index) => {
      if (file instanceof File) {
        formData.append('image' + (index + 1), file);
      }
    });

    fetch(`https://marcas.pro/api/services/${params.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    }).then(() => {
      toast('Услуга успешно изменена');
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
        <h2 className="mt-4 text-3xl font-semibold">Изменить услугу</h2>
        <Label className="flex flex-col gap-2">
          Название для услуги{' '}
          <Input
            className="rounded-none border-none bg-gray-2"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </Label>

        <Label className="flex flex-col gap-2">
          Текст для услуги
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

        <div className="flex flex-col items-start gap-4">
          <ImageUploader
            files={files}
            setFiles={setFiles}
            maxFiles={4}
            text={'Фото услуги'}
          />
        </div>

        <div className="flex gap-4">
          <Button
            disabled={!title || !paragraphs[0] || files.length !== 4}
            type="submit"
            className="rounded-none"
          >
            Изменить услугу
          </Button>
          <Button
            type="button"
            className="rounded-none bg-red-600 bg-opacity-10 text-red-600"
            onClick={async () => {
              await fetch(`https://marcas.pro/api/services/${params.id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              });
              toast('Услуга успешно удалена');
              router.push('/dashboard/service/list');
            }}
          >
            Удалить услугу
          </Button>
        </div>
      </form>
    </div>
  );
}
