'use client'
import { Breadcrumb } from 'components//Breadcrumb';
import Image from 'next/image';
import headingStyleLeft from 'src/assets/About/headingStyleLeft.svg';

import aboutUsBg from 'src/assets/About/aboutUsBg.png';

import image2 from 'src/assets/About/IMG-1.png';
import image3 from 'src/assets/About/IMG-2.png';
import image4 from 'src/assets/About/IMG-3.png';
import image1 from 'src/assets/About/IMG.png';
import headerIMG from "src/assets/About/headerImg.png"
import TabMobile from '../_components/TabMobile';
import ImageSliderInfinitive from '../_components/ImageSlidersInfinitive';
import { useEffect, useState } from 'react';


export default function AboutCompanyPage() {

  const [pricess, setPricess] = useState(false)

  const images = [
    image1,
    image2,
    image3,
    image4
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if(window.location.hash === '#prices')
        setPricess(true)
      const handleLocationChange = () => {
        if(window.location.hash === '#prices')
          setPricess(true)
      };
  
    
      window.addEventListener('popstate', handleLocationChange);
  
      return () => {
        window.removeEventListener('popstate', handleLocationChange);
      };
    }
  }, []);
  

  return (
    <div className="flex w-full flex-col rounded-b-lg sm:rounded-b-none sm:gap-10 bg-[#FBFBFB] mb-2 sm:mb-0">
        <Image src={headerIMG} alt='header' className='w-full mb-6 sm:hidden'/>
        <TabMobile  />
     {
      !pricess ? (
        <>
           <div className="sm:pl-[120px] sm:pt-10">
        <Breadcrumb
          linksList={[
            { href: '/', name: 'Главная' },
            { href: '/about', name: 'О компании' },
          ]}
        />
      </div>
      <div className="flex flex-col mt-6 sm:mt-0 sm:gap-[60px] max-[640px]:mb-0 max-[1500px]:mb-[200px]">
        <div className="hidden sm:flex flex-col gap-3 pl-[120px] max-[1500px]:px-[27px]">
          <h1 className="text-5xl font-semibold text-text-blue max-lg:text-4xl">
            О компании
          </h1>
          <Image
            src={headingStyleLeft}
            alt="heading style element"
            aria-hidden
          />
        </div>

        <div className="grid grid-cols-[3fr_2fr] max-[1500px]:flex max-[1500px]:flex-col">
          <div className="inline-flex flex-col items-start justify-start gap-2.5 bg-white sm:bg-zinc-100 py-9 pl-[120px] pr-[304px] max-[640px]:p-6 max-[1500px]:px-[27px]">
            <div className="flex flex-col items-start justify-start gap-6 sm:gap-[41px]">
              <div className="h-[81px] w-[688px] max-[1500px]:h-auto max-[1500px]:w-auto">
                <span className="text-base sm:text-max-lg font-normal sm:font-bold text-[#131313] sm:text-blue-3">
                  Маркас комплект
                </span>
                <span className="text-base sm:text-max-lg font-light sm:font-normal text-[#414141] sm:text-neutral-900">
                  {' '}
                  – ведущая компания, специализирующаяся на оптово-розничной
                  торговле металлоизделий и металлопроката, предоставлении услуг
                  по обработке металла и строительству.
                </span>
              </div>
              <div className="flex flex-col items-start justify-start sm:gap-6">
                <div className="text-base sm:text-xl font-normal sm:font-bold text-[#131313] sm:text-blue-3">
                  Основные направления деятельности:
                </div>
                <div className="dive-animatione-carde flex sm:hidden flex-col gap-2 mt-2">
                  <p className='px-3 py-4 bg-[#F7F7F7] pulseBlueAnim rounded-lg text-base font-light text-[#414141] flex-shrink-0' >Мы предлагаем широкий ассортимент металлоизделийи металлопроката высокого качества.</p>
                  <p className='px-3 py-4 bg-[#F7F7F7] pulseBlueAnim-300 rounded-lg text-base font-light text-[#414141] flex-shrink-0' >Команда высококвалифицированных специалистов обеспечивает выполнение различных видов обработки металла любой сложности.</p>
                  <p className='px-3 py-4 bg-[#F7F7F7] pulseBlueAnim-600 rounded-lg text-base font-light text-[#414141] flex-shrink-0' >Мы осуществляем комплексные строительные работы, начиная
                  от проектирования и заканчивая сдачей готовых объектов</p>
                  <p className='px-3 py-4 bg-[#F7F7F7] pulseBlueAnim-900 rounded-lg text-base font-light text-[#414141] flex-shrink-0' >Услуги горячего цинкования</p>
                </div>
                <ol className="text-max-lg hidden sm:flex list-decimal flex-col gap-3 text-black text-opacity-70 marker:text-sm [&>li]:ml-5">
                  <li>
                    <b>Поставка металлопроката</b> <br />
                    <br />
                    Широкий ассортимент. Наша компания предлагает широкий выбор
                    металлопроката, включая листовой, сортовой, трубный,
                    фасонный прокат, а также металлоконструкции.
                    <br />
                    <br />
                    Разнообразие материалов. В ассортименте представлены
                    различные виды стали, цветные металлы (алюминий, медь,
                    латунь), нержавеющая сталь и другие материалы.
                    <br />
                    <br />
                    Качество и сертификация. Компания гарантирует высокое
                    качество продукции, подтвержденное сертификатами
                    соответствия
                  </li>
                  <li>
                    <b>Дополнительные услуги</b> <br />
                    <br />
                    Порезка и обработка металлопроката. Предлагаем услуги по
                    резке, гибки, сверловке, шлифовке и другим видам обработки
                    металла.
                    <br />
                    <br />
                    Доставка. Организация доставки металлопроката на объекты
                    заказчика, в том числе с использованием собственного
                    автопарка.
                    <br />
                    <br />
                    Консультации. Предоставление квалифицированной консультации
                    по выбору и применению металлопроката.
                  </li>
                  <li>
                    <b>Специализация</b> <br />
                    <br />
                    Отраслевые решения. Строительство, ремонтные работы,
                    цинкование (горячее и холодное).
                    <br />
                    <br />
                    Индивидуальные заказы. Мы способны выполнять индивидуальные
                    заказы, разрабатывая индивидуальные решения для конкретных
                    проектов.
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="relative max-[640px]:hidden bg-[#1A85B9] max-[1500px]:h-[390px]">
            <Image
              src={aboutUsBg}
              width={472}
              height={747}
              quality={100}
              alt="Truck delivery"
              className="absolute left-0"
            />
          </div>
        </div>
      </div>
      <div className="image-slider sm:hidden bg-[#F0F1F3] pt-2">
          <ImageSliderInfinitive images={images} />
        </div>

      <div className="hidden sm:flex flex-col items-start justify-start gap-14 px-[120px] pb-[200px] pt-[300px] max-lg:px-[27px]  max-lg:pt-[140px]">
        <div className="text-5xl font-semibold text-sky-900 max-lg:text-4xl">
          ФОТОГАЛЕРЕЯ
        </div>
        <div className="flex gap-10 max-[975px]:w-full max-[975px]:flex-col max-[975px]:items-center">
          <Image src={image1} alt="Фото с завода" />
          <Image src={image2} alt="Фото с завода" />
          <Image src={image3} alt="Фото с завода" />
          <Image src={image4} alt="Фото с завода" />
        </div>
      </div>
        </>
      ):(
       <div className="pricess-dive px-6 mt-6 h-screen">
        <p className='text-base font-normal text-[#131313]'>Ценности</p>
       </div>
      ) 
     }
    </div>
  );
}
