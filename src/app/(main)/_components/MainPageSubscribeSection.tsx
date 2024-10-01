'use client';

import React, { useState } from 'react';
import subscribeEmail from 'src/app/utils/subscribeEmail';
import { Input } from 'components//ui/input';
import { Button } from 'components//ui/button';

export default function MainPageSubscribeSection() {
  const [email, setEmail] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!email) return;

    subscribeEmail({ email, user_type: 'подписка' });

    setEmail('');
  };

  return (
    <form
      className="flex bg-white p-1 text-black max-lg:mx-[27px] max-lg:flex-col max-lg:p-0"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Введите вашу эл. почту"
        className="h-auto border-none max-lg:h-[61px]"
        name="email"
        autoComplete="email"
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        variant="default"
        className="h-auto rounded-none bg-blue-2 px-11 py-4"
        type="submit"
      >
        Подписаться
      </Button>
    </form>
  );
}
