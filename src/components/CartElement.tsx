'use client';

import React from 'react';
import { useStore } from 'zustand';
import { cartStore } from 'src/store/cart';

export default function CartElement() {
  const products = useStore(cartStore, (state) => state.products);
  const services = useStore(cartStore, (state) => state.services);
  const categories = useStore(cartStore, (state) => state.categories);

  const totalItems = products.length + services.length + categories.length;

  return (
    <p className="text-xs font-normal text-black opacity-60">
      {totalItems === 0 ? 'Корзина пуста' : `Товаров: ${totalItems}`}
    </p>
  );
}
