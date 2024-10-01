'use client'
import React, { useEffect, useState } from 'react'
import { Home, Menu , ShoppingCart, Blocks} from 'lucide-react';
import MobileResponsedMenu from './MobileResponsedMenu';



const Sharp = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
    <path d="M14.0417 13.542V21.8753H22.375V13.542H14.0417ZM3.625 21.8753H11.9583V13.542H3.625V21.8753ZM3.625 3.12533V11.4587H11.9583V3.12533H3.625ZM17.8542 1.76074L11.9583 7.64616L17.8542 13.542L23.75 7.64616L17.8542 1.76074V1.76074Z" fill="#3C3C43" fill-opacity="0.3"/>
  </svg>
  )
}


type Props = {}


const Tabbar = (props: Props) => {

  const [pathe, setPathe] = useState(window.location.pathname)

  const [isOpen, setIsOpen] = useState(false);

  const locatione = (e: string) => {
    window.open(`/${e}`, "_current")
  }

  useEffect(()=> {
    setPathe(window.location.pathname)
  }, [])


  return (
   <div className="tabbar-componente z-30 block sm:hidden fixed bottom-0 w-full bg-white shadow-lg">

        <div className="items-as grid grid-cols-4 pb-1 pt-[6px]">
            <div onClick={()=> locatione('')} className="items-indexe flex flex-col gap-1 items-center justify-center">
            <Home color={pathe == "/"? "#1867FF":"#3C3C434D"} />
            <p className={`${pathe == "/"? "text-[#1867FF]":"text-[#3C3C434D]"} text-[10px] font-medium text-center`}>Главная</p>
            </div>
            <div onClick={()=> locatione('catalog')} className="items-indexe flex flex-col gap-1  items-center justify-center">
<Blocks color={pathe == "/catalog"? "#1867FF":"#3C3C434D"} />
                <p className={`${pathe == "/catalog"? "text-[#1867FF]":"text-[#3C3C434D]"} text-[10px] font-medium text-center`}>Каталог</p>
            </div>
            <div onClick={()=> locatione('cart')} className="items-indexe flex flex-col gap-1  items-center justify-center">
                <ShoppingCart color={pathe == "/cart"? "#1867FF":"#3C3C434D"} />
                <p className={`${pathe == "/cart"? "text-[#1867FF]":"text-[#3C3C434D]"} text-[10px] font-medium text-center`}>Корзина</p>
            </div>
            <div onClick={()=> setIsOpen(true)} className="items-indexe flex flex-col gap-1  items-center justify-center">
                <Menu color={pathe == "/menu"? "#1867FF":"#3C3C434D"}  />
                <p className={`${pathe == "/menu"? "text-[#1867FF]":"text-[#3C3C434D]"} text-[10px] font-medium text-center`}>Меню</p>
            </div>
        </div>
        <MobileResponsedMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
   </div>
  )
}

export default Tabbar