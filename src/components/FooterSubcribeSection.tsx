'use client';

import React, { useState } from 'react';
import subscribeEmail from 'src/app/utils/subscribeEmail';
import { Input } from 'components//ui/input';
import { Button } from 'components//ui/button';

export default function FooterSubscribeSection() {
  const [email, setEmail] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!email) return;

    subscribeEmail({ email, user_type: 'подписка' });

    setEmail('');
  };

  return (
    <form
      className="flex items-center gap-3 max-lg:flex-col max-lg:gap-0"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Введите вашу эл. почту"
        className="rounded-none border-0 bg-white p-7 text-black text-opacity-80 placeholder:text-gray"
        name="email"
        autoComplete="email"
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        variant="default"
        className="bg-0 text-max-lg rounded-none bg-blue-2 p-[29px] max-lg:w-full"
        type="submit"
      >
        Подписаться
      </Button>
    </form>
  );
}
