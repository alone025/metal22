'use client'
import { Button } from 'components//ui/button';
import { Breadcrumb } from 'components//Breadcrumb';

import iPhone from 'src/assets/Shared/iPhone.svg';
import mailIcon from 'src/assets/Contacts/Mail2.svg';

import Image from 'next/image';
import { OrderCallPopup } from 'components//OrderCallPopup';
import React from 'react';
import { displayedTel, hrefTel } from 'src/constants/tel';
import TabMobile from '../_components/TabMobile';
import headerIMG from "src/assets/About/headerImg.png"

export default function ContactsPage() {
  return (
    <div className="relative overflow-hidden">
        <div className="bg-white sm:hidden">
        <Image src={headerIMG} alt='header' className='w-full mb-6 sm:hidden'/>
        <TabMobile />
        <p className='text-base font-light text-[#414141] mt-6 mx-6' ><span className='font-normal text-[#131313]'>Наши контакты</span> – ваш ключ к успешному сотрудничеству. Обсудим ваш проект, предложим самые выгодные решения
        и обеспечим качественное обслуживание. Мы готовы ответить на все ваши вопросы и начать вместе строить надежные связи</p>
       
        <div className="btns-mean mt-8 flex flex-col gap-2 mx-6 pb-6">
      <div className="btne-1 p-4 flex items-center justify-between bg-[#307BAA] rounded-lg">
        <a className='text-[17px] font-roboto font-normal text-[#F2F5F7]' href="mailto:info_krd@marcas.pro">info_krd@marcas.pro</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#F2F5F7"/>
</svg>
      </div>
      <div className="btne-2 p-4 flex justify-between bg-[#131313] rounded-lg">
       <a href="tel:+8(800)300-74-16" className='text-base max-w-[203px] font-roboto font-light text-[#F2F5F7]'>
       <span className='text-[17px] font-roboto font-normal text-[#F2F5F7]'>8(800)300-74-16</span> для всех клиентов в РФ (пн-вс с 8:00 до 17:00)
       </a>
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M19.23 15.2598L16.69 14.9698C16.08 14.8998 15.48 15.1098 15.05 15.5398L13.21 17.3798C10.38 15.9398 8.06004 13.6298 6.62004 10.7898L8.47004 8.93976C8.90004 8.50977 9.11004 7.90977 9.04004 7.29977L8.75004 4.77977C8.63004 3.76977 7.78004 3.00977 6.76004 3.00977H5.03004C3.90004 3.00977 2.96004 3.94977 3.03004 5.07977C3.56004 13.6198 10.39 20.4398 18.92 20.9698C20.05 21.0398 20.99 20.0998 20.99 18.9698V17.2398C21 16.2298 20.24 15.3798 19.23 15.2598Z" fill="#F2F5F7"/>
</svg>
      </div>
    </div>
        </div>

  
        <div className="mape-mobile  sm:hidden bg-[#F0F1F3] py-2">
        <div className="bg-white h-[428px] p-6 rounded-b-lg">
        <div className="mape-otash relative h-full">
        <iframe
        src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=39.086317%2C45.046561&z=18.4"
        allowFullScreen={true}
        className="relative w-full h-full rounded-lg"
      />
      <div className="absolute bottom-2 left-2 p-3 w-[96%] bg-white rounded-[6px]">
        <p><span>Город:</span> Производство</p>
        <p><span>Офис:</span> ул. Текстильная 21</p>
        <p><span>Склад:</span> Новороссийская 55</p>
        <p><span>Производство:</span> Тихорецкая - 10</p>
      </div>
        </div>
        </div>
      </div>

      
      <div className="absolute max-[640px]:hidden z-10 ml-[120px] mt-10 flex flex-col gap-10 max-lg:ml-[27px] max-lg:mt-[65px] max-[370px]:relative max-[370px]:m-0 max-[370px]:w-full">
        <Breadcrumb
          linksList={[
            { href: '/', name: 'Главная' },
            { href: '/contacts', name: 'Контакты' },
          ]}
          className="text-black"
        />

        <div className="flex-col gap-14 bg-white p-[30px] max-lg:w-[320px] max-[370px]:mx-auto">
          <div className="flex flex-col  gap-10">
            <div className="flex flex-col  gap-12">
              <div className="flex flex-col  gap-6">
                <div className="text-5xl font-semibold text-black max-lg:text-4xl">
                  НАШИ КОНТАКТЫ
                </div>
                <div className="flex gap-10 max-lg:flex-col">
                  <div className="flex gap-3">
                    <div className="relative h-6 w-6">
                      <Image src={iPhone} alt="Phone" />
                    </div>
                    <a
                      href={`tel:${hrefTel}`}
                      className="text-xl font-semibold leading-normal text-black max-lg:text-base"
                    >
                      {displayedTel}
                    </a>
                  </div>
                  <div className="flex items-center justify-start gap-3">
                    <div className="relative h-6 w-6">
                      <Image src={mailIcon} alt="Phone" />
                    </div>
                    <a
                      className="text-xl font-semibold leading-normal text-black max-lg:text-base"
                      href="mailto:info@marcas.pro"
                    >
                      info@marcas.pro
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-max-lg w-[617px] font-normal leading-[27px] text-black opacity-70 max-lg:w-auto max-lg:text-base">
                Наши контакты - ваш ключ к успешному сотрудничеству. Обсудим ваш
                проект, предложим оптимальные решения и обеспечим качественное
                обслуживание. Мы готовы ответить на все ваши вопросы и начать
                вместе строить надежные связи!
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-1.5">
              <div className="inline-flex items-center justify-start gap-4">
                <div className="font-['Noto Sans'] text-max-lg font-normal leading-[27px] text-black opacity-50 max-lg:text-base">
                  Город:
                </div>
                <div className="font-['Noto Sans'] text-max-lg font-semibold leading-[27px] text-black max-lg:text-base">
                  Краснодар
                </div>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5">
                <div className="font-['Noto Sans'] text-max-lg font-normal leading-[27px] text-black opacity-50 max-lg:text-base">
                  Офис:
                </div>
                <div className="font-['Noto Sans'] text-max-lg font-semibold leading-[27px] text-black max-lg:text-base">
                  Текстильная 21
                </div>
              </div>
              <div className="inline-flex items-center justify-start gap-4">
                <div className="font-['Noto Sans'] text-max-lg font-normal leading-[27px] text-black opacity-50 max-lg:text-base">
                  Склад:
                </div>
                <div className="font-['Noto Sans'] text-max-lg font-semibold leading-[27px] text-black max-lg:text-base">
                  Новороссийская 55
                </div>
              </div>
              <div className="inline-flex items-center justify-start gap-4">
                <div className="font-['Noto Sans'] text-max-lg font-normal leading-[27px] text-black opacity-50 max-lg:text-base">
                  Производство:
                </div>
                <div className="font-['Noto Sans'] text-max-lg font-semibold leading-[27px] text-black max-lg:text-base">
                  Тихорецкая - 10
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[56px] flex justify-end max-lg:justify-center">
            <OrderCallPopup
              trigger={
                <Button className="ml-auto h-[50px] w-[190px] rounded-none border-0 bg-blue text-xl font-medium text-white  max-lg:ml-0">
                  Позвонить
                </Button>
              }
              text="Обратный звонок"
            />
          </div>
        </div>
      </div>

      <iframe
        src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=39.086317%2C45.046561&z=18.4"
        allowFullScreen={true}
        className="relative h-[900px] w-full max-[640px]:hidden"
      />
    </div>
  );
}
