'use server';

import { cookies } from 'next/headers';

export default async function sendProduct({
  productName,
  productPrice,
  productDescription,
  categoryId,
  image,
}: {
  productName: string;
  productDescription: string;
  productPrice: string;
  categoryId: string;
  image: string;
}) {
  const token = cookies().get('token');

  const formData = new FormData();

  formData.append('name', productName);
  formData.append('description', productDescription);
  formData.append('price', productPrice);
  formData.append('category_id', categoryId);
  formData.append('image', image);

  console.log(token?.value);

  if (!token) throw new Error('missing token');

  try {
    const res = await fetch('https://marcas.pro/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    }).then((res) => {
      return res.json();
    });

    return res;
  } catch (err) {
    return err;
  }
}
