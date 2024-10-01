'use client';

import React, { FormEvent } from 'react';

import { useRouter } from 'next/navigation';

import { Input } from 'components//ui/input';
import { Button } from 'components//ui/button';
import Cookies from 'js-cookie';
import { logIn } from 'src/app/(main)/login/_components/logIn';

export default function AdminLoginPage() {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = formData.get('name') as string;
    const password = formData.get('password') as string;

    if (!username || !password) return null;

    const response = await logIn(username, password);

    if (response === 'Invalid') return null;

    Cookies.set('token', response.token, { expires: 1 });
    router.push('/dashboard');
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-[200px] flex-col gap-4 p-4"
    >
      <Input type="text" name="name" placeholder="Логин" />
      <Input type="password" name="password" placeholder="Пароль" />
      <Button type="submit">Вход</Button>
    </form>
  );
}
