'use server';

export async function logIn(
  username: string,
  password: string
): Promise<{ token: string } | 'Invalid'> {
  try {
    return await fetch('https://marcas.pro/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => res.json());
  } catch (e) {
    return 'Invalid';
  }
}
