'use client';

import React, { useState } from 'react';
import subscribeEmail from 'src/app/utils/subscribeEmail';
import { Input } from 'components//ui/input';
import { Button } from 'components//ui/button';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!email) return;

    subscribeEmail({ email, user_type: 'подписка' });

    setEmail('');
  };

  return (
    <form
      className="flex h-[61px] bg-white text-black max-lg:h-auto max-lg:w-[320px] max-lg:flex-col"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Введите вашу эл. почту"
        className="h-auto border-none text-base font-normal placeholder:text-gray placeholder:text-opacity-80"
        name="email"
        autoComplete="email"
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        variant="default"
        className="text-max-lg h-auto rounded-none bg-blue-2 px-11 py-4 font-medium text-white"
        type="submit"
      >
        Подписаться
      </Button>
    </form>
  );
}
