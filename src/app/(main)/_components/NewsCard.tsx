import React from 'react'
import Image from 'next/image'
import truncateText from 'src/utils/truncateText';
import slugify from '@sindresorhus/slugify';

interface dataC {
  id: number;
  title: string;
  texts: string[];
  image: string;
  date: string;
  className: string;
}

type Props = {
    cardData: dataC
}

const NewsCard = ({cardData}: Props) => {
  return (
<div className="news-carde w-[260px] flex-shrink-0 rounded-lg overflow-hidden border border-solid border-[#E8E8E8]">
    <div className="carde-tope">
    <Image  src={`data:image/webp;base64,${cardData.image}`} width={'260'} height={'140'} alt='truck' className='w-[260px] h-[140px]'/>
    </div>
    <div className="carde-contente px-3 py-4">
<h6 className='line-clamp-1 text-lg text-[#131313] font-medium leading-[23.4px]' >{cardData.title}</h6>
<p className='text-sm text-[#666] line-clamp-3 font-light leading-[19.6px] mt-2' >{truncateText(cardData.texts[0], 140)}</p>
<a href={`/news/${slugify(cardData.title)}-${cardData.id}`} className='text-[#154FCA] font-roboto text-sm font-normal leading-[21.28px] line-clamp-1 bg-transparent mt-6'>
Читать статью &gt;&gt;&gt;
</a>
    </div>
</div>
  )
}

export default NewsCard