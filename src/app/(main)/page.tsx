
import Image from 'next/image';
import { Button } from 'src/components/ui/button';
import WhyUsCard from './_components/WhyUsCard';

import headingElement from 'src/assets/MainPage/headingElement.svg';
import truckImg from 'src/assets/MainPage/truckImg.png';

import contactUsBg from 'src/assets/MainPage/contactUsBg.webp';
import mainTopBackground from 'src/assets/MainPage/mainTopBackground.webp';

import mainPageBg from 'src/assets/MainPage/mainPageBg.webp';
import mapImage from 'src/assets/MainPage/mapImage.png';

import News, { NewsType } from 'src/components/News';
import mainPageAccordionItems from 'src/constants/mainPageAccordionItems';
import Accordion from './_components/Accordion';

import whyUsCardBg1 from 'src/assets/MainPage/whyUsCardBg1.webp';
import whyUsCardBg2 from 'src/assets/MainPage/whyUsCardBg2.webp';
import whyUsCardBg3 from 'src/assets/MainPage/whyUsCardBg3.webp';
import whyUsCardBg4 from 'src/assets/MainPage/whyUsCardBg4.webp';

import partnerImage1 from 'src/assets/MainPage/partnerImg1.png';
import partnerImage2 from 'src/assets/MainPage/partnerImg2.png';
import partnerImage3 from 'src/assets/MainPage/partnerImg3.png';
import partnerImage4 from 'src/assets/MainPage/partnerImg4.png';
import partnerImage5 from 'src/assets/MainPage/partnerImg5.png';

import planshetIMG from 'src/assets/MainPage/planshet.png' 

import { OrderCallPopup } from 'components//OrderCallPopup';
import MainPageSubscribeSection from 'src/app/(main)/_components/MainPageSubscribeSection';
import PopularProductCard from 'src/app/(main)/_components/PopularProductCard';
import MobileSwiper from 'src/components/Swipper';


import partnerMobile1 from "src/assets/MainPage/partnerM1.png"
import partnerMobile2 from "src/assets/MainPage/partnerM2.png"
import partnerMobile3 from "src/assets/MainPage/partnerM3.png"
import partnerMobile4 from "src/assets/MainPage/partnerM4.png"
import partnerMobile5 from "src/assets/MainPage/partnerM5.png"


import { StaticImageData } from 'next/image'; 

interface SlideSPM {
  img: StaticImageData;
  alt: string;
}


const sponsers: SlideSPM[] = [
  {
    img: partnerMobile1,
    alt:"partner1"
  },
  {
    img: partnerMobile2,
    alt:"partner2"
  },
  {
    img: partnerMobile3,
    alt:"partner3"
  },
  {
    img: partnerMobile4,
    alt:"partner4"
  },
  {
    img: partnerMobile5,
    alt:"partner5"
  },

]

const companyAreas = [
  'Металлопрокат',
  'Металлоконструкции',
  'Обработка металла',
  'Нержавеющий металл',
  'Строительство',
];

const whyUsCards = [
  {
    backgroundImage: whyUsCardBg1,
    title: 'Быстрая <br/>доставка по всей России',
    text: 'В нашей компании время – это ценность!  Мы предлагаем  быструю доставку по всей стране.  Свяжитесь с нами, чтобы получить индивидуальное предложение по срокам и стоимости доставки.  Мы делаем все возможное, чтобы ваши заказы были доставлены быстро и надежно!',
  },
  {
    backgroundImage: whyUsCardBg2,
    title: 'Быстрый <br/>отклик на заявки',
    text: 'Мы ценим своих клиентов и гарантируем быстрый отклик на ваши заявки.  Свяжитесь с нами любым удобным для вас способом: по телефону, электронной почте или через сайт. Мы оперативно ответим на ваши вопросы и поможем сделать заказ!',
  },
  {
    backgroundImage: whyUsCardBg3,
    title: 'Все услуги <br/>металлообработки',
    text: 'Мы предоставляем полный спектр услуг по обработке металла. Не существует такого заказа, который мы не смогли бы выполнить.',
  },
  {
    backgroundImage: whyUsCardBg4,
    title: 'Оперативность выполнения заказов',
    text: 'Наши специалисты работают оперативно, а современное оборудование, эффективная коммуникация позволяет выполнять заказы в сжатые сроки.   С нами вы можете быть уверены, что ваш заказ будет готов в срок!',
  },
];

const whyUsCardsMobile = [
  {
    imgTy: "delivery",
    title: "Быстрая доставка",
    desc: "Оперативная доставка металлопроката по всей России."
  },
  {
    imgTy: "quality",
    title: "Оперативность",
    desc: "Гарантируем быстрый отклик на ваши заявки и оперативное решение потребностей."
  },
  {
    imgTy: "opportunity",
    title: "Ассортимент",
    desc: "Полный спектр услуг по обработке металла. Выполним любой ваш заказ."
  },
  {
    imgTy: "date",
    title: "Точные сроки",
    desc: "Оперативное выполнение с соблюдением сроков. Всегда вовремя, всегда качественно."
  },
]


async function getNews(): Promise<{ news: NewsType[] }> {
  const res = await fetch('https://marcas.pro/api/news/list?offset=0&limit=3', {
    method: 'GET',
    cache: 'no-cache',
  });

  return await res.json();
}

type PopularProduct = {
  Id: number;
  Product: {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
  };
  Category: {
    id: number;
    name: string;
  };
};

async function getProducts() {
  const res = await fetch('https://marcas.pro/api/popular?offset=0&limit=6', {
    method: 'GET',
    cache: 'no-cache',
  });

  const parsedRes: PopularProduct[] = await res.json();

  if (!parsedRes) return [];

  return parsedRes.map((product) => {
    return {
      ...product.Product,
      category: product.Category,
    };
  });
}

interface Slidess {
  txt: string;
}

const defaultSlides: Slidess[] = [
  {
    txt : "Металлопрокат"
  },
  {
    txt : "Металлоконструкции"
  },
  {
    txt : "Обработка металла" 
  },
  {
    txt : "Нержавеющий металл" 
  },
  {
    txt : "Cтроительство"
  },
];

import product1Im from "src/assets/MainPage/product-1.png"
import product2Im from "src/assets/MainPage/product-2.png"
import product3Im from "src/assets/MainPage/product-3.png"
import product4Im from "src/assets/MainPage/product-4.png"
import product5Im from "src/assets/MainPage/product-5.png"
import Link from 'next/link';
import WhyUsCardMobile from './_components/WhyUsCardMobile';
import SwipperCompany from './_components/swipperCompany';
import NewsCard from './_components/NewsCard';

async function getCategories(): Promise<Category[]> {
  return await fetch('https://marcas.pro/api/categories/list', {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());
}


// const producteDate = [
//   {
//     name: "Арматуры",
//     imge: product1Im
//   },
//   {
//     name: "Трубы",
//     imge: product2Im
//   },
//   {
//     name: "Катанки",
//     imge: product3Im
//   },
//   {
//     name: "Листы",
//     imge: product4Im
//   },
//   {
//     name: "Балки",
//     imge: product5Im
//   },
// ]



const listes = [
  {
    h4:'Честное сотрудничество:',
    p:'Условия, выгодные для обеих сторон.'
  },
  {
    h4:'Расширение рынков:',
    p:'Доступ к широкому рынку клиентов.'
  }, 
   {
    h4:'Совместные проекты:',
    p:'Участие и поддержка в общих инициативах.'
  },  
  {
    h4:'Маркетинговая поддержка: ',
    p:'Совместное продвижение.'
  },  
  {
    h4:'Долгосрочность:',
    p:'Ориентация на устойчивое сотрудничество.'
  },
]

import cardImage1 from 'src/assets/CardImage/truckImage.png' 
import cardImage2 from 'src/assets/CardImage/metalImage.png' 

import bgSub from "src/assets/MainPage/BG-sub.png"
import MobileAccordition from './_components/MobileAccordition';
import ModalPartner from 'src/components/ModalPartner';
import ModalEmail from 'src/components/ModaleEmail';
import { Category } from './catalog/page';


const cardsData = [
  {
    h5:'Логистический Прорыв в России',
    p:'В августе 2024 года правительство России объявило о запуске масштабного проекта по модернизации логистической инфраструктуры страны. В рамках программы планируется улучшение и расширение железнодорожных, автомобильных и морских путей сообщения, а также строительство новых логистических центров по всей территории России.',
    image: cardImage1
  },
  {
    h5:'Увеличение Производства Металлопроката в России для Удовлетворения Растущего Спроса',
    p:'Особое внимание уделяется производству высококачественного сортового проката и продукции для строительства и машиностроения. Ожидается, что благодаря модернизации производственных линий и увеличению объемов выпуска, российские компании смогут занять лидирующие позиции на мировом рынке металлопроката, удовлетворяя потребности в различных секторах экономики.',
    image: cardImage2
  }
]

export default async function Home() {
  const { news } = await getNews();

  const products = await getProducts();

  const producteData = await getCategories()

 
  const openCat = () => {
    window.open('/catalog', "_current")
  }



  return (
    <div className="mx-auto flex flex-col">
      <div className="relative hidden sm:flex flex-col items-center text-white max-lg:h-[750px]">
        <Image
          fill
          src={mainTopBackground}
          alt="Background image"
          className="pointer-events-none object-cover object-center"
          priority
        />
        <div className="z-10 mx-auto mb-[9px] mt-[64px] flex flex-col items-center gap-10">
          <div className="animate-fadeIn bg-white bg-opacity-10 px-[30px] py-3.5 opacity-0">
            <p className=" text-max-lg font-medium leading-snug text-white max-lg:text-sm">
              МеталлМаркет & Инновации
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-9 flex flex-col items-center text-center text-white">
              <h1 className="animate-fadeIn text-6xl font-black opacity-0 delay-500 max-lg:text-3xl">
                МЕТАЛЛОПРОКАТ
                <br />В ЛЮБЫХ ОБЪЕМАХ
              </h1>
            </div>
          </div>
        </div>
        <div className="z-10 mx-auto flex flex-col items-center gap-10">
          <div className="mb-[65px] text-white">
            <div className="flex animate-fadeIn items-start gap-10 text-[20px] font-semibold opacity-0 delay-1000  max-[1180px]:gap-4 max-[1090px]:flex-col max-lg:ml-5 max-lg:gap-[20px] max-lg:text-base">
              {companyAreas.map((area) => (
                <a
                  href={'/catalog'}
                  className="border-2 border-transparent p-1 transition hover:border-2 hover:border-white"
                  key={area}
                >
                  {area}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="z-10 mx-auto mb-[293px] flex flex-col items-center gap-10">
          <div className="mb-20 flex flex-col items-center">
            <Button
              asChild
              variant="outline"
              className="mainPageButton animate-fadeIn rounded-none px-[50px] py-[35px] text-xl opacity-0 delay-1000 max-lg:px-[35px] max-lg:py-[15px]"
            >
              <a href="/catalog">Каталог</a>
            </Button>
          </div>
        </div>
      </div>
      <div className="swippperr sm:hidden max-[374px]:mb-8">
      <MobileSwiper slides={defaultSlides}/>
      </div>

      <div className="mobile-carde mt-8 bg-white p-6 grid sm:hidden grid-cols-3 gap-y-4 gap-x-2">
             {
              producteData.slice(0,5).map((nmd, nmk)=>(
                <div key={nmk} className="carde-gride flex flex-col gap-1 items-center">
                <div className="tope-im w-[104px] h-[72px] rounded-lg bg-[#F7F7F7] flex items-center justify-center">
                  <Image src={`data:image/webp;base64,${nmd.image}`} alt='product1' width={104} height={72} />
                </div>
                <h4 className='text-sm font-normal leading-[18.2px] text-[#131313] text-center'>{nmd.name}</h4>
              </div>
              ))
             }
             <Link href='/catalog'>
             <div className="carde-gride flex flex-col gap-1 items-center">
                <div className="tope-im w-[104px] h-[72px] rounded-lg bg-[#F7F7F7] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#6797BE"/>
</svg>
                </div>
                <h4 className='text-sm font-normal leading-[18.2px] text-[#131313] text-center'>Еще</h4>
              </div></Link>
      </div>

      <div className="mx-auto hidden sm:block max-w-[1920px] p-[120px] max-[1870px]:p-[60px] max-lg:w-[375px] max-lg:px-[27px] max-lg:py-[52px] max-[374px]:w-[320px] max-[374px]:p-0">
        <div className="flex flex-col gap-14 max-[374px]:w-[320px]">
          <h2 className="text-left text-5xl font-semibold text-text-blue max-lg:w-[320px] max-lg:text-4xl">
            Почему выбирают нас?
          </h2>
          <div className="flex grid-cols-2 justify-between gap-5 max-[1750px]:grid max-lg:flex max-lg:flex-col max-lg:justify-center max-[374px]:w-[320px]">
            {whyUsCards.map(({ title, text, backgroundImage }) => (
              <WhyUsCard
                key={title}
                title={title}
                text={text}
                backgroundImage={backgroundImage.src}
              />
            ))}
          </div>
        </div>
      </div>

            <div className="mobile-why-use sm:hidden mt-[50px] px-6">
              <h4 className='text-2xl font-medium text-[#131313] leading-[31.2px] mb-6' >Почему мы?</h4>
              <div className="carde-s flex flex-col gap-2">
                {
                  whyUsCardsMobile.map((cardD, cardK)=> (
                    <WhyUsCardMobile date={cardD} key={cardK} />
                  ))
                }
              </div>
            </div>

            <div className="downloade-pdfe sm:hidden mt-[50px] bg-white py-10">
              <div className="topes-t px-6">
                <h4 className='text-2xl font-medium text-[#131313]'>НАШЕ КОММЕРЧЕСКОЕ
                ПРЕДЛОЖЕНИЕ</h4>
                <p className='text-base font-light text-[#131313] mt-4 mb-12' >Получите подробное КП с информацией о наших продуктах и услугах, включая металлоизделия, металлопрокат, и обработку металла.</p>
                <Button className='bg-[#307BAA] rounded-lg w-full' ><p className='flex flex-row gap-2 items-center'>
                Скачать КП <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
  <path d="M12.9425 6.75H11.75V3C11.75 2.5875 11.4125 2.25 11 2.25H8C7.5875 2.25 7.25 2.5875 7.25 3V6.75H6.0575C5.39 6.75 5.0525 7.56 5.525 8.0325L8.9675 11.475C9.26 11.7675 9.7325 11.7675 10.025 11.475L13.4675 8.0325C13.94 7.56 13.61 6.75 12.9425 6.75ZM4.25 14.25C4.25 14.6625 4.5875 15 5 15H14C14.4125 15 14.75 14.6625 14.75 14.25C14.75 13.8375 14.4125 13.5 14 13.5H5C4.5875 13.5 4.25 13.8375 4.25 14.25Z" fill="white"/>
</svg></p></Button>
              </div>
              <div className="imge mt-12">
                <Image src={planshetIMG} alt='a'/>
              </div>
            </div>

      <div className="bg-[#131313] sm:bg-zinc-800">
        <div className="mx-auto hidden sm:flex max-w-[1920px] justify-between max-[1510px]:flex-col">
          <div className="ml-[120px] flex flex-col gap-4 py-[70px] text-white max-lg:ml-0 max-lg:px-[27px] max-lg:py-[52px]">
            <h3 className="text-[28px] font-bold">
              Бесплатная доставка по Краснодару!
            </h3>
            <p className="w-[667px] opacity-80 max-lg:w-auto">
              Наши клиенты в Краснодаре могут наслаждаться преимуществами
              бесплатной доставки грузов до 3 тонн. Это уникальное предложение
              призвано обеспечить вас нулевыми расходами на доставку, гарантируя
              при этом максимальное удобство. Надежные и своевременные поставки
              – наш вклад в ваш успех!
            </p>
          </div>
          <Image src={truckImg} height={290} alt="truck image" />
        </div>
        <div className="mobile-contente sm:hidden py-[60px] relative">
          <div className="iconke absolute top-0 right-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="64" viewBox="0 0 32 64" fill="none">
  <path d="M0 64V0H32V64L16.5333 50.9831L0 64Z" fill="#154FCA"/>
</svg>
          </div>
         <div className="tope-scn pl-6">
         <h4 className='text-2xl font-medium text-white mb-4 pr-4'>ПАРТНЁРСТВО</h4>
         <p className='text-base font-light text-[#E8E8E8] pr-4 mb-6' >С нами сотрудничают крупнейшие компании по металлургии в России</p>
         <SwipperCompany slides={sponsers} />
         </div>
         <div className="bottome-scn mx-6 mt-[60px]">
          <h5 className='text-xl font-medium max-w-[200px] mb-8' id='textbg_opacity' >ПРЕИМУЩЕСТВА РАБОТЫ С НАМИ:</h5>
          <div className="liste flex flex-col gap-4">
            {listes.map((lsd, lsk)=>(
              <div key={lsk} className="lise-childe flex flex-row gap-3">
              <div className="lefte flex justify-center items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M7.33331 6.25145V15.7481C7.33331 16.4723 8.13081 16.9123 8.74498 16.5181L16.2066 11.7698C16.775 11.4123 16.775 10.5873 16.2066 10.2206L8.74498 5.48145C8.13081 5.08728 7.33331 5.52728 7.33331 6.25145Z" fill="#154FCA"/>
</svg>
              </div>
              <div className="righte flex flex-col gap-1">
                <p className='text-lg text-white font-normal leading-[23.4px]' >{lsd.h4}</p>
                <p className='text-base text-[#A2A2A2] font-light leading-[22.4px]'>{lsd.p}</p>
              </div>
            </div>
            ))}
          </div>
          <ModalPartner/>
         </div>
        </div>
      </div>

      <div className="last-news-mobile sm:hidden pt-[50px]">
        <div className="tope-texte flex flex-row justify-between items-center mb-6 px-6">
        <h4 className='text-2xl font-medium text-[#131313]' >НОВОСТИ</h4>
            <Link href='/news'>
            <Button className='text-[#154FCA] hover:text-white text-base font-normal px-3 py-[5px] rounded-full border border-solid border-[#E6EEF5] bg-transparent'>
        Все
        </Button></Link>
        </div>
        <div className="cards-news mt-6 pl-6 overflow-x-auto flex gap-3 flex-nowrap">
          {
            news.map((cardData, cardKey)=>(
              <NewsCard cardData={cardData} key={cardKey} />
            ))
          }
        </div>
        <div className="subscribee p-4 rounded-lg relative bg-black mt-10 mb-[50px] mx-6 flex flex-row items-center justify-between gap-4">
          <Image src={bgSub} alt='bgsub' className='absolute top-0 left-0 w-full h-full rounded-lg'/>
          <h6 className='text-lg text-[#F7FAFC] font-medium leading-[23.4px] relative z-10'>Подпишитесь на рассылку</h6>
          <ModalEmail/>
        </div>
      </div>

      <div className="mobile-accordition sm:hidden my-[50px] mx-6">
        <h4 className='text-2xl font-medium text-[#131313]'>ОТВЕТЫ НА ВОПРОСЫ</h4>
          <div className="accorditione-contente mt-6">
            <MobileAccordition items={mainPageAccordionItems[0].items} key={mainPageAccordionItems[0].title} title={mainPageAccordionItems[0].title}/>
          </div>
          <div className="mobile-notificatione-tge p-4 rounded-lg bg-white mt-[50px]">
       <div className="tope-tx">
       <h6 className='mb-3 text-lg font-semibold text-[#131313] leading-[23.4px]'>Остались вопросы?</h6>
       <p className='text-base font-light leading-[22.4px] text-[#131313]'>Если у Вас остались вопросы, Вы можете написать нам на Telegram.</p>
       </div>
     
       <Button className='bg-[#35A0D3] mt-6 h-11 text-base font-roboto font-normal leading-5 text-white flex flex-row justify-center gap-2 items-center w-full'>
        <div className="tg-icone w-[18px] h-[18px] flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
  <path d="M0.514674 6.33086C1.95437 5.53785 3.56147 4.87596 5.06305 4.21071C7.64637 3.12109 10.2399 2.05034 12.8597 1.05349C13.3694 0.883648 14.2852 0.717571 14.375 1.4729C14.3258 2.54211 14.1236 3.60505 13.9848 4.66799C13.6327 7.00551 13.2256 9.33502 12.8287 11.6648C12.6919 12.4409 11.7198 12.8426 11.0977 12.346C9.6028 11.3362 8.09639 10.3363 6.62056 9.30309C6.13712 8.81187 6.58542 8.10641 7.01718 7.75562C8.24844 6.54222 9.55421 5.5113 10.7211 4.23519C11.0359 3.4751 10.1058 4.11568 9.79906 4.31197C8.11346 5.47355 6.46911 6.70604 4.69196 7.7269C3.7842 8.2266 2.72618 7.79957 1.81882 7.52075C1.00528 7.1839 -0.186888 6.84454 0.514592 6.33095L0.514674 6.33086Z" fill="white"/>
</svg>
        </div>
      Написать
      </Button>
      </div>
     
      </div>

    

      <div className="bg-[#FBFBFB] hidden sm:block">
        <div className="mx-auto my-[120px] flex max-w-[1680px] flex-col gap-10 max-lg:px-[27px]">
          <h2 className="text-5xl font-semibold leading-[57.60px] text-text-blue max-lg:text-4xl">
            Популярные товары
          </h2>
          <div className="flex  flex-col gap-[70px]">
            <div className="grid grid-cols-3 justify-center gap-[60px] max-lg:flex max-lg:flex-col">
              {products &&
                products.map((product) => (
                  <PopularProductCard
                    key={product.id + product.name}
                    {...product}
                  />
                ))}
            </div>
            <a href="/catalog/#catalog-items" className="text-center underline">
              Больше товаров
            </a>
          </div>
        </div>
      </div>

      <div className="hidden sm:block relative max-lg:h-[740px]">
        <div className="pointer-events-none absolute z-10 h-full w-full bg-[#00192FB2] max-lg:h-[740px]" />
        <Image
          fill
          src={contactUsBg}
          alt="Background image"
          className="pointer-events-none object-cover object-center"
        />

        <div className="relative z-20 mx-auto my-[70px] flex flex-col items-center gap-10 text-white max-lg:my-[270px]">
          <div className="flex flex-col gap-3 text-center">
            <h3 className="text-[28px] font-bold leading-[42px] ">
              Вам нужен качественный металлопрокат?
            </h3>
            <p>
              Оставьте заявку и наш менеджер свяжется с вами для консультации
            </p>
          </div>
          <OrderCallPopup
            trigger={
              <Button className="h-auto rounded-none bg-blue-2 px-10 py-3">
                Оставить заявку
              </Button>
            }
            text="Обратный звонок"
          />
        </div>
      </div>

      <div>
        <div className="hidden sm:flex flex-col items-center gap-[90px] p-[120px] max-lg:px-[27px] max-lg:py-[52px]">
          <div className="flex flex-col gap-[72px]">
            <div className="flex flex-col gap-[36px] text-center">
              <div className="flex flex-col items-center gap-3">
                <h3 className="text-5xl font-semibold leading-[57.60px] text-text-blue max-lg:text-3xl">
                  НАШИ ПАРТНЕРЫ
                </h3>
                <Image
                  src={headingElement}
                  alt="heading style element"
                  aria-hidden
                />
              </div>
              <p className="text-max-lg mx-auto w-[769px] text-black text-opacity-90 max-lg:w-[320px] max-lg:text-base">
                Наши партнеры – это надёжные поставщики качественных материалов,
                с которыми мы строим долгосрочные и взаимовыгодные отношения.
                Благодаря слаженной работе и чёткому пониманию потребностей друг
                друга, мы оптимизируем процессы, сокращаем сроки поставок и
                обеспечиваем бесперебойную работу наших производственных линий.
                Мы ценим открытость и прозрачность в сотрудничестве, что
                позволяет нам находить оптимальные решения для реализации
                проектов любой сложности.
              </p>
            </div>
            <div className="flex justify-center gap-[52px] max-[1710px]:flex-col">
              <div className="relative mx-auto flex h-[141px] w-[290px] animate-[greyscaleFadeInOut_10s_0s_linear_infinite] items-center justify-center border border-black border-opacity-30 grayscale ">
                <Image
                  width={118}
                  height={77}
                  src={partnerImage1}
                  alt="Мечел"
                  className="pointer-events-none object-cover object-center "
                />
              </div>
              <div className="relative mx-auto flex h-[141px] w-[295px] animate-[greyscaleFadeInOut_10s_2s_linear_infinite] items-center  justify-center border border-black border-opacity-30 grayscale">
                <Image
                  width={180}
                  height={110}
                  src={partnerImage2}
                  alt="НЛМК"
                  className="pointer-events-none object-cover object-center"
                />
              </div>
              <div className="relative mx-auto flex h-[141px] w-[296px] animate-[greyscaleFadeInOut_10s_4s_linear_infinite] items-center justify-center border border-black border-opacity-30 grayscale ">
                <Image
                  width={130}
                  height={130}
                  src={partnerImage3}
                  alt="КТЗ"
                  className="pointer-events-none object-cover object-center"
                />
              </div>
              <div className="relative mx-auto flex h-[141px] w-[295px] animate-[greyscaleFadeInOut_10s_6s_linear_infinite] items-center justify-center border border-black border-opacity-30 grayscale">
                <Image
                  fill
                  src={partnerImage4}
                  alt="ЕВРАЗ"
                  className="pointer-events-none object-cover object-center px-8"
                />
              </div>
              <div className="relative mx-auto flex h-[141px] w-[296px]  animate-[greyscaleFadeInOut_10s_8s_linear_infinite] items-center justify-center border border-black border-opacity-30 grayscale">
                <Image
                  width={120}
                  height={120}
                  src={partnerImage5}
                  alt="ТАГМЕТ"
                  className="pointer-events-none object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="relative h-[722px] w-[1280px] max-[1320px]:h-[420px] max-[1320px]:w-[800px] max-lg:h-[182px] max-lg:w-[320px]">
            <Image
              fill
              src={mapImage}
              alt="Map image"
              className="pointer-events-none object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="clip-path hidden sm:flex flex-col items-center text-white max-lg:h-[740px]">
        <div className="pointer-events-none absolute z-10 h-full w-full bg-[#00192FB2] max-lg:h-[740px]" />
        <Image
          fill
          src={mainPageBg}
          alt="Background image"
          className="pointer-events-none !fixed object-cover object-center"
        />
        <div className="z-20 my-[120px] flex flex-col gap-[52px] max-lg:my-[220px]">
          <div className="flex flex-col gap-3 text-center">
            <h3 className="mx-auto text-[28px] font-bold">Никакого СПАМА!</h3>
            <p>
              Подпишитесь на нашу рассылку и будьте в курсе всех <br />
              обновлений, акций и специальных предложений.
            </p>
          </div>
          <MainPageSubscribeSection />
        </div>
      </div>

      <div className="bg-[#FBFBFB] max-[640px]:hidden max-lg:px-[27px] max-lg:py-[52px] max-[355px]:p-0">
        <div className="mx-auto my-[120px] flex max-w-[1680px] flex-col gap-10 max-lg:my-0">
          <h2 className="text-5xl font-semibold leading-[57.60px] text-text-blue">
            Последние новости
          </h2>
          <div className="flex flex-col gap-[70px]">
            <div className="grid grid-cols-3 justify-center gap-[60px] max-[1710px]:flex max-[1710px]:flex-col max-[1710px]:items-center max-lg:flex-col max-[355px]:w-[320px]">
              {news &&
                news.map((oneNews) => (
                  <News
                    {...oneNews}
                    key={oneNews.id}
                    className="max-lg:hidden max-lg:first:flex"
                  />
                ))}
            </div>
            <a href="/news" className="text-center underline">
              Больше новостей
            </a>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex flex-col gap-[100px] p-[120px] pb-[150px] max-lg:mb-[200px] max-lg:p-0 ">
        <div className="mx-auto flex flex-col items-center gap-3 max-lg:mx-[27px] max-lg:my-[52px]">
          <h2 className="text-5xl font-semibold leading-[57.60px] text-text-blue max-lg:text-center max-lg:text-4xl">
            ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
          </h2>
          <Image src={headingElement} alt="heading style element" aria-hidden />
        </div>
        <div className="mx-auto flex max-w-[1680px] gap-10  max-[1810px]:flex-col max-[1810px]:gap-[70px]">
          <div className="flex flex-col gap-[70px]">
            <Accordion
              key={mainPageAccordionItems[0].title}
              title={mainPageAccordionItems[0].title}
              items={mainPageAccordionItems[0].items}
            />
            <Accordion
              key={mainPageAccordionItems[1].title}
              title={mainPageAccordionItems[1].title}
              items={mainPageAccordionItems[1].items}
            />
          </div>
          <div className="flex flex-col gap-[70px]">
            <Accordion
              key={mainPageAccordionItems[2].title}
              title={mainPageAccordionItems[2].title}
              items={mainPageAccordionItems[2].items}
            />
            <Accordion
              key={mainPageAccordionItems[3].title}
              title={mainPageAccordionItems[3].title}
              items={mainPageAccordionItems[3].items}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
