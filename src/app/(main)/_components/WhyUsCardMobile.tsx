'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import delivery from "src/assets/MainPage/delivery.png"
import quality from "src/assets/MainPage/quality.png"
import opportunity from "src/assets/MainPage/opportunity.png"
import dateImg from "src/assets/MainPage/date.png"

interface Datee {
    imgTy: string
    title: string
    desc: string
}

type Props = {
    date: Datee
}

const WhyUsCardMobile = ({date}: Props) => {

const [imgt, setImgt] = useState(delivery)

useEffect(()=> {
    if(date.imgTy === "delivery"){
setImgt(delivery)
    }else if (date.imgTy === "quality"){
        setImgt(quality)
    }
    else if (date.imgTy === "opportunity"){
        setImgt(opportunity)
    }
    else if (date.imgTy === "date"){
        setImgt(dateImg)
    }else{
        setImgt(delivery) 
    }
},[date.imgTy])

  return (
    <div className="why-we-carde p-4 flex flex-row gap-4 rounded-xl bg-white">
        <div className="lefte min-w-16" >
            <Image src={imgt} alt="dostavka" className='bg-[#F7F7F7] rounded-full'/>
        </div>
        <div className="righte flex flex-col gap-1">
            <h6 className='text-lg font-medium text-[#131313]'>{date.title}</h6>
            <p className='text-sm text-[#414141] font-light'>{date.desc}</p>
        </div>
    </div>
  )
}

export default WhyUsCardMobile