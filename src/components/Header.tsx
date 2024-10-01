'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import icon from 'src/assets/Header/icon.svg';
import cartIcon from 'src/assets/Header/ion_cart-sharp.svg';
import logoIcon from 'src/assets/Header/logo.svg';
import iPhone from 'src/assets/Shared/iPhone.svg';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from 'src/components/ui/navigation-menu';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

import { Button } from 'src/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components//ui/dropdown-menu';
import { cn } from 'lib/utils';

import MobileMenu from 'components//MobileMenu';
import { OrderCallPopup } from 'components//OrderCallPopup';
import SearchBlock from 'components//SearchBlock';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { displayedTel, hrefTel } from 'src/constants/tel';
import { cartStore } from 'src/store/cart';
import { useStore } from 'zustand';

const CartElement = dynamic(() => import('src/components/CartElement'), {
  ssr: false,
});

export const menuItems = [
  { path: '/catalog', title: 'Каталог' },
  { path: '/about', title: 'О компании' },
  {
    title: 'Товары и услуги',
    dropdownItems: [
      {
        href: '/catalog/#catalog-items',
        description: 'Наша продукция',
      },
      { href: '/catalog/#services', description: 'Наши услуги' },
    ],
  },
  { path: '/news', title: 'Новости' },
  { path: '/contacts', title: 'Контакты' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const town = useStore(cartStore, (state) => state.town);
  const changeTown = useStore(cartStore, (state) => state.changeTown);
  const clearProducts = useStore(cartStore, (state) => state.clearProducts);

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('local-storage');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const hasProductWithNumericAmount = parsedData.state.products?.some(
        (product: { amount: string | number }) =>
          typeof product.amount === 'number'
      );

      if (hasProductWithNumericAmount) {
        parsedData.state.products = [];
        parsedData.version += 1;
        clearProducts();
        localStorage.setItem('local-storage', JSON.stringify(parsedData));
      }
    }
  }, [clearProducts]);

  const [isHeaderChanging, setIsHeaderChanging] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const header = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const listenScrollEvent = () => {
      const currentScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!isHeaderChanging) {
            if (currentScrollPosition > lastScrollPosition) {
              setScroll(true);
              setIsHeaderChanging(true);
              setTimeout(() => {
                setIsHeaderChanging(false);
              }, 100);
            } else if (currentScrollPosition < lastScrollPosition) {
              setIsHeaderChanging(true);
              setTimeout(() => {
                setIsHeaderChanging(false);
              }, 100);
              setScroll(false);
            }
          }

          setLastScrollPosition(currentScrollPosition);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, [lastScrollPosition, isHeaderChanging]);

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          setScroll(true);
          setTimeout(() => {
            if (header.current) {
              const headerHeight = header.current.offsetHeight;

              const elementPosition =
                element.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - headerHeight;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              });
            }
          }, 0);
        }
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentScrollPositionStyle = window.scrollY;

  return (
    <div
      ref={header}
      className={`top-0 z-40 bg-white text-black transition-all ${
      scroll ? 'top-[-155px] sm:top-[-80px] sm:shadow-2xl' : currentScrollPositionStyle !== 0 ? 'max-[640px]:top-[-80px] max-[640px]:shadow-2xl' : 'max-[640px]:top-[-80px] max-[640px]:shadow-none'
      }
      ${lastScrollPosition > 0 && 'sticky'}
      `}
    >
      <div
        className={`mx-auto flex items-center justify-between p-5 3xl:container max-2xl:hidden`}
      >
        <div className={`flex gap-16`}>
          <Select
            onValueChange={(value) => changeTown(value)}
            value={town ?? 'Краснодар'}
          >
            <SelectTrigger
              className={`relative min-w-[155px] font-medium text-black`}
              aria-label="Выбрать город"
            >
              <Image src={icon} alt="icon" className="mr-3" />
              <SelectValue placeholder="Выбрать город" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="Краснодар">Краснодар</SelectItem>
              <SelectItem value="Москва">Москва</SelectItem>
              <SelectItem value="Красноярск">Красноярск</SelectItem>
            </SelectContent>
          </Select>
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
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
                    <NavigationMenuLink
                      href={item.path}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <a className={`text-black opacity-50`} href="mailto:info@marcas.pro">
          info@marcas.pro
        </a>
      </div>
      <div
        className={`mx-auto flex items-center justify-between gap-20 p-7 3xl:container max-2xl:flex-col max-2xl:gap-4 max-[640px]:px-6 max-[640px]:pb-4 max-2xl:px-[27px] max-2xl:py-6 ${
          scroll && 'max-2xl:py-2'
        }`}
      >
        <div className={`flex justify-between max-2xl:w-full ${scroll && ''}`}>
          <a href="/" className="text-4xl font-bold">
            <Image src={logoIcon} alt="icon" className="max-w-[120px]" />
          </a>
          <div className="hidden flex-col justify-center items-end sm:items-baseline sm:justify-around max-2xl:flex ">
            <p className="font-base text-[11px] opacity-50 max-2xl:text-xs">
              пн-вс с 8:00 до 17:00
            </p>
            <a
              href={`tel:${hrefTel}`}
              className="!text-lg font-semibold max-2xl:!text-base max-[640px]:!text-lg"
            >
              {displayedTel}
            </a>
            <a
              className={`hidden sm:block text-sm text-black opacity-50 max-2xl:text-xs`}
              href="mailto:info@marcas.pro"
            >
              info@marcas.pro
            </a>
          </div>
        </div>

        <div className="box-border flex flex-1 items-center gap-20 max-2xl:w-full max-2xl:flex-col-reverse max-2xl:gap-4">
          <div className="hidden sm:flex gap-10 max-2xl:h-10  max-2xl:w-full max-2xl:justify-end max-2xl:gap-2 max-sm:justify-center">
            <div className="flex flex-col gap-2 max-2xl:hidden max-2xl:justify-center max-2xl:gap-[2px]">
              <p className="font-base text-sm opacity-50 max-2xl:text-xs">
                пн-вс с 8:00 до 17:00
              </p>
              <a
                href={`tel:${hrefTel}`}
                className="text-xl font-semibold max-2xl:text-base max-[350px]:text-sm max-[332px]:text-xs"
              >
                {displayedTel}
              </a>
            </div>
            <div className="flex items-end gap-2 max-2xl:hidden">
              <Image src={iPhone} alt="iPhone" />
              <OrderCallPopup
                trigger={
                  <Button
                    variant={'ghost'}
                    className="h-fit cursor-pointer p-0 text-blue underline hover:bg-white"
                    aria-label={'Заказать звонок'}
                  >
                    Заказать звонок
                  </Button>
                }
                text="Обратный звонок"
              />
            </div>
            <Button
              asChild
              className="hidden h-[62px] w-[71px] max-2xl:flex max-2xl:h-full"
              variant="outline"
            >
              <a
                href="/cart"
                onClick={(e) => {
                  e.preventDefault();

                  if (pathname === '/cart') {
                    router.back();
                  } else router.push('/cart');
                }}
              >
                <Image src={cartIcon} height={24} width={24} alt="cart" />
              </a>
            </Button>
            <MobileMenu setLastScrollPosition={setLastScrollPosition} />
          </div>
          <SearchBlock />
          <a
            href="/cart"
            onClick={(e) => {
              e.preventDefault();

              if (pathname === '/cart') {
                router.back();
              } else router.push('/cart');
            }}
            className="flex gap-3 max-2xl:hidden"
          >
            <Image src={cartIcon} alt="cart" />

            <div>
              <h3 className="font-medium text-blue-3">Ваша корзина</h3>
              <CartElement />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
