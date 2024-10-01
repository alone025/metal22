'use client'
import React, { useEffect, useState } from 'react';

import footerBackground from 'src/assets/Footer/footerBackground.webp';
import Image from 'next/image';
import FooterSubscribeSection from 'components//FooterSubcribeSection';
import logoIcon from 'src/assets/Footer/logowhite.svg';
import logoIconM from 'src/assets/Header/logo.svg';
import { Button } from './ui/button';
import Link from 'next/link';



const linkers = [
  {
    nm: 'Главная',
    linke: '/',
  },
  {
    nm: 'Услуги',
    linke: '/catalog#services',
  },
  {
    nm: 'Продукция',
    linke: '/catalog#catalog-items',
  },
  {
    nm: 'О компании',
    linke: '/about',
  },
  {
    nm: 'Новости',
    linke: '/news',
  },
  {
    nm: 'Контакты',
    linke: '/contacts',
  },
];

export default function Footer() {

  const [pathname, setPathname] = useState(window.location.pathname);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    
  
      const handleLocationChange = () => {
        setPathname(window.location.pathname);
      };
  
    
      window.addEventListener('popstate', handleLocationChange);
  
      return () => {
        window.removeEventListener('popstate', handleLocationChange);
      };
    }
  }, []);

  return (
    <>
      <div className="relative mx-auto hidden flex-col items-center text-center text-white max-lg:px-7 sm:flex">
        <Image
          fill
          src={footerBackground}
          alt="Background image"
          className="pointer-events-none object-cover object-center"
        />
        <div className="absolute z-10 h-full w-full bg-[#00192FCC] backdrop-blur-[2.5px]"></div>
        <div className="z-20 my-[60px] flex max-w-[702px] flex-col gap-[120px]">
          <div className="flex flex-col gap-12">
            <div className="mx-auto flex max-w-[560px] flex-col gap-3">
              <h3 className="text-[28px] font-bold">БУДЬТЕ В КУРСЕ ВСЕГО!</h3>
              <p className="font-normal opacity-90">
                Подпишитесь на нашу рассылку и будьте в курсе всех обновлений,
                акций и специальных предложений.
              </p>
            </div>
            <FooterSubscribeSection />
          </div>
          <div className="flex flex-col gap-3">
            <a href="/" className="flex justify-center text-4xl font-bold">
              <Image
                src={logoIcon}
                alt="icon"
                className="max-w-[160px] text-white"
              />
            </a>
            <p className="text-max-lg font-bold opacity-90">
              Маркас комплект {''}
              <span className="font-normal">
                – ведущая компания, специализирующаяся на оптово-розничной
                торговле металлоизделий и металлопроката, предоставлении услуг
                по обработке металла и строительству.
              </span>
            </p>
          </div>
        </div>
        <Button asChild className="z-20 mb-2 cursor-pointer rounded-none">
          <a href="/legal">Политика конфиденциальности</a>
        </Button>

        <div className="z-20 w-[100%] bg-[#002443] p-5 max-lg:w-[calc(100%+56px)]">
          <p className="text-max-lg font-medium text-white">
            Marcas complect | 2024
          </p>
        </div>
      </div>
      <div className="mobile-footere sm:hidden rounded-t-lg bg-white px-6 pb-[60px] pt-10">
        <div className="tope-lg mb-12 flex justify-start">
          <Image src={logoIconM} alt="markas" className="w-[7rem]" />
        </div>
        <div className="tabs flex flex-wrap gap-2 max-[400px]:max-w-[280px]">
          {linkers.map((linkD, linkK) => (
            <Link onClick={()=> setPathname(linkD.linke)} key={linkK} href={linkD.linke}>
              <div className="tabe w-max rounded-full border border-solid border-[#E6EEF5] px-4 py-3">
                <p className={`text-sm font-normal leading-[18.2px] ${linkD.linke === pathname ? 'text-[#015292]':'text-[#131313]'}`}>
                  {linkD.nm}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="linkers-emaile mt-12">
          <div className="tope-emaile flex flex-col gap-4">
            <div className="emaile-cm flex flex-row items-center gap-3">
              <div className="svge h-11 w-11 rounded-full bg-[#F7F7F7] flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.6667 3.33325H3.33335C2.41669 3.33325 1.67502 4.08325 1.67502 4.99992L1.66669 14.9999C1.66669 15.9166 2.41669 16.6666 3.33335 16.6666H16.6667C17.5834 16.6666 18.3334 15.9166 18.3334 14.9999V4.99992C18.3334 4.08325 17.5834 3.33325 16.6667 3.33325ZM16.3334 6.87492L10.4417 10.5583C10.175 10.7249 9.82502 10.7249 9.55835 10.5583L3.66669 6.87492C3.45835 6.74159 3.33335 6.51659 3.33335 6.27492C3.33335 5.71659 3.94169 5.38325 4.41669 5.67492L10 9.16658L15.5834 5.67492C16.0584 5.38325 16.6667 5.71659 16.6667 6.27492C16.6667 6.51659 16.5417 6.74159 16.3334 6.87492Z"
                    fill="#A2A2A2"
                  />
                </svg>
              </div>
              <p className="text-base font-normal leading-6 text-[#131313]">
                info_krd@marcas.pro
              </p>
            </div>

            <div className="emaile-cm flex flex-row items-center gap-3">
              <div className="svge h-11 min-w-11 w-11 rounded-full bg-[#F7F7F7] flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M16.025 12.7166L13.9083 12.475C13.4 12.4166 12.9 12.5916 12.5416 12.95L11.0083 14.4833C8.64997 13.2833 6.71664 11.3583 5.51664 8.99163L7.05831 7.44997C7.41664 7.09163 7.59164 6.59163 7.53331 6.0833L7.29164 3.9833C7.19164 3.14163 6.48331 2.5083 5.63331 2.5083H4.19164C3.24997 2.5083 2.46664 3.29163 2.52497 4.2333C2.96664 11.35 8.65831 17.0333 15.7666 17.475C16.7083 17.5333 17.4916 16.75 17.4916 15.8083V14.3666C17.5 13.525 16.8666 12.8166 16.025 12.7166Z" fill="#A2A2A2"/>
</svg>
              </div>
              <p className="text-sm font-normal text-[#A2A2A2] leading-6">
              <span className='text-base font-normal text-[#131313]' >8(800)300-74-16</span> для всех клиентов в РФ (пн-вс с 8:00 до 17:00)
              </p>
            </div>
          </div>
          <Button className='text-base font-normal text-white leading-5 h-12 w-full bg-[#307BAA] mt-8'>
          Заказать консультацию
          </Button>
        </div>
        <div className="privacy-police mt-[60px] text-center">
<Link href='/legal'>
<p className='text-base font-normal leading-5 text-[#414141] underline mb-2'>Политика конфиденциальности</p>
</Link>
            <p className='text-sm font-normal leading-[18.2px] text-[#A2A2A2] '>MarcasPro©2024. Все права защищены.</p>
        </div>
      </div>
    </>
  );
}
