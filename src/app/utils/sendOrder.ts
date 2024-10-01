'use server';

import { redirect } from 'next/navigation';

export default async function sendOrder(text: string) {
  fetch(`https://marcas.pro/api/create_order`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ body: text }),
  });
  redirect('/thanks');
}
