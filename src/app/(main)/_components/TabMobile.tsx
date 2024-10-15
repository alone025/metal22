import React, { useEffect, useState } from 'react'

type Props = {}

const TabMobile = (props: Props) => {

  const [activeTab , setActiveTab] = useState('about')
  const [pathname, setPathname] = useState('')
  const [hashTage, setHashTage] = useState('')

  const handleNewPageOpen = (e: string, eb: string) => {
    if (typeof window !== "undefined") {
   if(e){
    window.open(`/${e}`, '_current')
   }
  }
  }

useEffect(()=>{

if(pathname === '/about'){
  if(hashTage === "#prices"){
    setActiveTab('aboutPrice')
  }else{
    setActiveTab("about")
  }
}else if (pathname === "/contacts"){
  setActiveTab('contacts')
}
}, [pathname, hashTage])


useEffect(() => {
  if (typeof window !== 'undefined') {
    setPathname(window.location.pathname);
    setHashTage(window.location.hash)

    const handleLocationChange = () => {
      setPathname(window.location.pathname);
      setHashTage(window.location.hash)
    };
  
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }
}, []);


  return (
    <div className="tab-mobile flex sm:hidden flex-row px-6">
        <div className="tabes relative w-full" onClick={()=> handleNewPageOpen('about','about')} >
            <p className={`px-4 py-[10px] text-center text-[17px] ${activeTab === 'about' ? 'font-normal text-[#131313]':'font-light text-[#3C3C4399]'}`}>О нас</p>
            {
              activeTab === "about" &&   <div className="btm-line w-full h-[2px] bg-[#015292] rounded-full"></div>
            }
        </div>
        <div className="tabes relative w-full" onClick={()=> handleNewPageOpen('about#prices','aboutPrice')}>
            <p className={`px-4 py-[10px] text-center text-[17px] ${activeTab === 'aboutPrice' ? 'font-normal text-[#131313]':'font-light text-[#3C3C4399]'}`}>Ценности</p>
            {
              activeTab === "aboutPrice" &&   <div className="btm-line w-full h-[2px] bg-[#015292] rounded-full"></div>
            }
            </div>
            <div className="tabes relative w-full" onClick={()=> handleNewPageOpen('contacts','contacts')} >
                <p className={`px-4 py-[10px] text-center text-[17px] ${activeTab === 'contacts' ? 'font-normal text-[#131313]':'font-light text-[#3C3C4399]'}`} >Контакты</p>
                {
              activeTab === "contacts" &&   <div className="btm-line w-full h-[2px] bg-[#015292] rounded-full"></div>
            }
            </div>
    </div>
  )
}

export default TabMobile