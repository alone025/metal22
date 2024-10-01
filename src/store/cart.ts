'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type storeType = {
  products: {
    id: string;
    amount: string;
  }[];
  services: string[];
  categories: string[];
  town: string;
  changeTown: (newTown: string) => void;
  addProduct: (id: string, amount: string) => void;
  addService: (id: string) => void;
  addCategory: (id: string) => void;
  deleteService: (id: string) => void;
  deleteProduct: (id: string) => void;
  deleteCategory: (id: string) => void;
  clearProducts: () => void;
};

export const cartStore = create<storeType>()(
  persist(
    (set, get) => ({
      town: 'Краснодар',
      changeTown: (newTown: string) => {
        set({ town: newTown });
      },
      products: [],
      services: [],
      categories: [],
      addProduct: (id, amount) => {
        set({
          products: get().products.concat({
            id,
            amount,
          }),
        });
      },

      addService: (id) => {
        set({
          services: get().services.concat([id]),
        });
      },

      addCategory: (id) => {
        set({
          categories: get().categories.concat([id]),
        });
      },

      deleteProduct: (id: string) =>
        set({
          products: get().products.filter((product) => product.id !== id),
        }),

      deleteService: (id: string) =>
        set({
          services: get().services.filter((service) => service !== id),
        }),

      deleteCategory: (id: string) =>
        set({
          categories: get().categories.filter((category) => category !== id),
        }),

      clearProducts: () => set({ products: [] }),
    }),
    {
      name: 'local-storage',
    }
  )
);
