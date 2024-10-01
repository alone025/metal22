'use server';

export default async function subscribeEmail(text: {
  email: string;
  user_type: string;
}) {
  await fetch(`https://marcas.pro/api/mail`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(text),
  });
}
