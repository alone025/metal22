'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from 'components//ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components//ui/dropdown-menu';
import React from 'react';
import Image from 'next/image';
import logoIcon from 'src/assets/Header/logo.svg';

export const adminItems = [
  {
    title: 'Товар',
    dropdownItems: [
      {
        href: '/dashboard/product/new',
        description: 'Добавить товар',
      },
      { href: '/dashboard/product/list', description: 'Опубликованные' },
    ],
  },
  {
    title: 'Популярные',
    href: '/dashboard/product/popular',
    description: 'Популярные',
  },
  {
    title: 'Новость',
    dropdownItems: [
      {
        href: '/dashboard/news/new',
        description: 'Добавить новость',
      },
      { href: '/dashboard/news/list', description: 'Опубликованные' },
    ],
  },
  {
    title: 'Услуга',
    dropdownItems: [
      {
        href: '/dashboard/service/new',
        description: 'Добавить услугу',
      },
      { href: '/dashboard/service/list', description: 'Опубликованные' },
    ],
  },
  {
    title: 'Категория',
    dropdownItems: [
      {
        href: '/dashboard/category/new',
        description: 'Добавить категорию',
      },
      { href: '/dashboard/category/list', description: 'Опубликованные' },
    ],
  },
];

export default function AdminHeader() {
  return (
    <div className="bg-white text-black">
      <div
        className={`mx-auto flex items-center justify-between p-5 3xl:container`}
      >
        <div className="flex gap-20">
          <a href="/" className="text-4xl font-bold">
            <Image src={logoIcon} alt="icon" className="max-w-[120px]" />
          </a>
          <NavigationMenu>
            <NavigationMenuList className="gap-16">
              {adminItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.dropdownItems ? (
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger className="cursor-pointer rounded-md px-4 py-2 text-base hover:bg-accent hover:text-accent-foreground">
                        {item.title}
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="shadow">
                        {item.dropdownItems.map((dropdownItem, subIndex) => (
                          <DropdownMenuItem
                            key={subIndex}
                            className="p-5 text-base"
                            asChild
                          >
                            <a href={dropdownItem.href}>
                              {dropdownItem.description}
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <a
                      href={item.href}
                      className="cursor-pointer rounded-md px-4 py-2 text-base hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.title}
                    </a>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}
