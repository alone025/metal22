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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from 'components//ui/drawer';
import menuIcon from 'src/assets/Header/List.svg';
import { usePathname } from 'next/navigation';
import { useStore } from 'zustand';
import { cartStore } from 'src/store/cart';
import logoIcon from 'src/assets/Header/logo.svg';

const menuItems = [
    {
        title: "Главная",
        path:"/"
    },
    {
        title: "О компании",
        path:"/about"
    },
    {
        title: "Услуги",
        path:"/catalog#services"
    },
    {
        title: "Продукция",
        path:"/catalog#catalog-items"
    },
    {
        title: "Корзина",
        path:"/cart"
    },
    {
      title:"Новости",
      path: "/news"
    },
    {
        title: "Контакты",
        path:"/contacts"
    },

]


type MobilePropsRes ={
isOpen: boolean
setIsOpen: (e: boolean)=>void
}

export default function MobileResponsedMenu({isOpen, setIsOpen}: MobilePropsRes) {
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);



  const town = useStore(cartStore, (state) => state.town);
  const changeTown = useStore(cartStore, (state) => state.changeTown);

  return (
    <Drawer
      direction={'right'}
      open={isOpen}
      onOpenChange={setIsOpen}
      preventScrollRestoration={false}
    >
      <DrawerContent className="mx-auto flex h-full w-[264px] flex-col items-start bg-white shadow 3xl:container">
      <DrawerHeader className='p-0 flex justify-end pt-[10px] pr-[10px] w-full'>
      <svg onClick={()=> setIsOpen(false)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M24.4 7.61281C23.88 7.09281 23.04 7.09281 22.52 7.61281L16 14.1195L9.47996 7.59947C8.95996 7.07947 8.11996 7.07947 7.59996 7.59947C7.07996 8.11947 7.07996 8.95947 7.59996 9.47947L14.12 15.9995L7.59996 22.5195C7.07996 23.0395 7.07996 23.8795 7.59996 24.3995C8.11996 24.9195 8.95996 24.9195 9.47996 24.3995L16 17.8795L22.52 24.3995C23.04 24.9195 23.88 24.9195 24.4 24.3995C24.92 23.8795 24.92 23.0395 24.4 22.5195L17.88 15.9995L24.4 9.47947C24.9066 8.97281 24.9066 8.11947 24.4 7.61281Z" fill="#3C3C43" fill-opacity="0.6"/>
</svg>
          </DrawerHeader>
        <a href="/" className='pl-5'>
          <Image src={logoIcon} alt="icon" className="w-[72px] h-[72px] absolute top-4" />
        </a>

        <div className="tope-linkers pl-5 mt-10">
            <a href='tel:+8(800)300-74-16' className='text-2xl font-roboto font-medium text-[#131313]' >8(800)300-74-16</a>
            <div className="statuse mt-2 flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <circle opacity="0.15" cx="10" cy="10.5" r="10" fill="#1867FF"/>
  <circle cx="10" cy="10.5" r="6" fill="#1867FF"/>
</svg>
            <p className='text-sm font-normal text-[#666666]' >Сейчас работаем</p>
            </div>
        </div>
        
        
        
           <div className="divenavigate flex flex-col mt-10 w-full">
           {menuItems.map((item, keye) => (
              <div key={keye} className={`!ml-0 w-full px-5 py-4 ${keye + 1 !== 7 && 'border-b'} border-[#E8E8E8]`}>
                  <a
                    href={item.path}
                    className='p-0'
                    onClick={() => setIsOpen(false)}
                    
                  >
                    {item.title}
                  </a>
              </div>
            ))}
           </div>
    
      
        {/* <DrawerClose asChild className="w-full">
          <Button
            className={`flex h-[53px] w-full justify-normal rounded-none text-left text-lg`}
          >
            Закрыть
          </Button>
        </DrawerClose> */}
      </DrawerContent>
    </Drawer>
  );
}
