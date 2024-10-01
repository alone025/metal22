import React from 'react'
import Image from 'next/image'
import { StaticImageData } from 'next/image'; 

interface dataC {
    h5: string
    p: string
    image: StaticImageData
}

type Props = {
    cardData: dataC
}

const NewsCard = ({cardData}: Props) => {
  return (
<div className="news-carde w-[260px] flex-shrink-0 rounded-lg overflow-hidden border border-solid border-[#E8E8E8]">
    <div className="carde-tope">
    <Image src={cardData.image} alt='truck'/>
    </div>
    <div className="carde-contente px-3 py-4">
<h6 className='line-clamp-1 text-lg text-[#131313] font-medium leading-[23.4px]' >{cardData.h5}</h6>
<p className='text-sm text-[#666] line-clamp-3 font-light leading-[19.6px] mt-2' >{cardData.p}</p>
<p className='text-[#154FCA] text-sm font-normal leading-[21.28px] line-clamp-1 bg-transparent mt-6'>
Читать статью &gt;&gt;&gt;
</p>
    </div>
</div>
  )
}

export default NewsCard