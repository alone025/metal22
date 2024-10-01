'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components//ui/select';
import Image from 'next/image';
import icon from 'src/assets/Header/icon.svg';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from 'components//ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components//ui/dropdown-menu';
import { Button } from 'components//ui/button';
import React, { useEffect, useState } from 'react';
import { menuItems } from 'components//Header';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from 'components//ui/drawer';
import menuIcon from 'src/assets/Header/List.svg';
import { usePathname } from 'next/navigation';
import { useStore } from 'zustand';
import { cartStore } from 'src/store/cart';
import logoIcon from 'src/assets/Header/logo.svg';

type MobileMenuProps = {
  setLastScrollPosition: (newValue: number) => void;
};

export default function MobileMenu({ setLastScrollPosition }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setLastScrollPosition(1);
      }, 1);
    }
  }, [isOpen, setLastScrollPosition]);

  const town = useStore(cartStore, (state) => state.town);
  const changeTown = useStore(cartStore, (state) => state.changeTown);

  return (
    <Drawer
      direction={'right'}
      open={isOpen}
      onOpenChange={setIsOpen}
      preventScrollRestoration={false}
    >
      <DrawerTrigger asChild>
        <Button
          className="hidden h-[62px] w-[71px] max-2xl:flex max-2xl:h-full max-2xl:w-[400px]"
          variant="outline"
        >
          <Image src={menuIcon} height={24} width={24} alt="menu" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto flex h-full w-[264px] flex-col items-start justify-around bg-white shadow 3xl:container">
        <a href="/">
          <Image src={logoIcon} alt="icon" className="ml-5 mt-[72px]  w-1/2" />
        </a>
        <Select
          onValueChange={(value) => changeTown(value)}
          value={town ?? 'Краснодар'}
        >
          <SelectTrigger
            className={`relative ml-5 pl-0 text-lg font-medium text-black before:absolute before:left-0 before:top-0 before:mr-2 before:-translate-y-1/2 before:text-xs before:opacity-60 before:content-['Город:']`}
          >
            <Image src={icon} alt="icon" className={`mr-3 hidden`} />
            <SelectValue placeholder="Выбрать город" className={`text-lg`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Краснодар">Краснодар</SelectItem>
            <SelectItem value="Москва">Москва</SelectItem>
            <SelectItem value="Красноярск">Красноярск</SelectItem>
          </SelectContent>
        </Select>
        <NavigationMenu className="flex-grow-0">
          <NavigationMenuList className="flex-grow-0 flex-col items-start">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.title} className="!ml-0 pl-1">
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
                  <NavigationMenuLink
                    href={item.path}
                    className={navigationMenuTriggerStyle()}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <DrawerClose asChild className="w-full">
          <Button
            className={`flex h-[53px] w-full justify-normal rounded-none text-left text-lg`}
          >
            Закрыть
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
