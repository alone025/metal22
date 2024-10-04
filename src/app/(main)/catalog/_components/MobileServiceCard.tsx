import slugify from '@sindresorhus/slugify';
import Image from 'next/image';
import React from 'react'
import { Service } from 'src/app/(main)/catalog/services/[serviceSlug]/page';

type Props = {
    service: Service
}

const MobileServiceCard = ({service}: Props) => {
  return (
    <a href={`catalog/services/${slugify(service.Title)}-${service.Id}`} className="mobile-sevice flex items-center justify-center w-40 h-40 relative">
        <div className="bg-image relative w-40 h-40">
            <Image  src={`data:image/webp;base64,${service.Image1}`} width={160} height={160} className='w-full h-full object-cover object-center rounded-lg' alt={service.Title} />
        </div>
        <h4 className='w-[136px] absolute text-center text-sm font-normal text-white z-10 line-clamp-2' >{service.Title}</h4>
        <div className="bg-blacke bg-gradient-to-b from-[#131313] to-[#13131300] w-40 h-40 absolute top-0 left-0 rounded-lg"></div>
    </a>
  )
}

export default MobileServiceCard