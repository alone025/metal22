

import Image from 'next/image';
import dynamic from 'next/dynamic';


import headerIMG from "src/assets/About/headerImg.png"





// const DynamicHashChecker = dynamic(() => import('./browserHA'), { ssr: false });

// const DynamicHashCheckerTabBar = dynamic(() => import('src/app/(main)/_components/TabMobile'), { ssr: false });


export default function AboutCompanyPage() {

 
  

  return (
    <div className="flex w-full flex-col rounded-b-lg sm:rounded-b-none sm:gap-10 bg-[#FBFBFB] mb-2 sm:mb-0">
        <Image src={headerIMG} alt='header' className='w-full mb-6 sm:hidden'/>
        {/* <DynamicHashCheckerTabBar  />
        <DynamicHashChecker/> */}
    </div>
  );
}
