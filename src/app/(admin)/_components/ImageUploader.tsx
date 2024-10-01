'use client';

import React, { ChangeEvent, useRef } from 'react';
import { TrashIcon } from 'lucide-react';
import { Button } from 'components//ui/button';

type ImageUploaderProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  maxFiles: number;
  text: string;
};

export default function ImageUploader({
  files,
  setFiles,
  maxFiles,
  text,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileCount = e.target.files.length;
      const newFiles = Array.from(e.target.files).slice(
        0,
        maxFiles - files.length
      );
      setFiles([...files, ...newFiles]);
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, fileIndex) => index !== fileIndex));
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <p>{text}</p>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleFilesChange}
        style={{ display: 'none' }}
      />
      <div className="flex flex-col gap-4">
        {files.map((file, index) => (
          <div key={file.name + index} className="flex items-center gap-2">
            {file.name}
            <Button onClick={() => removeFile(index)} variant="ghost">
              <TrashIcon className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        className="rounded-none"
        onClick={() => fileInputRef.current?.click()}
        disabled={files.length >= maxFiles}
      >
        Добавить файлы
      </Button>
    </div>
  );
}
