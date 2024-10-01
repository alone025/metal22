'use client';
import React from 'react';
import { Button } from './ui/button';
import fura from 'src/assets/MainPage/fura-swipper3.png';
import Image from 'next/image';
import logoMetal from "/public/logo-metal.png"

const Phone = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <path
        d="M8.01252 6.35856L6.95418 6.23773C6.70002 6.20856 6.45002 6.29606 6.27085 6.47523L5.50418 7.24189C4.32502 6.64189 3.35835 5.67939 2.75835 4.49606L3.52918 3.72523C3.70835 3.54606 3.79585 3.29606 3.76668 3.04189L3.64585 1.99189C3.59585 1.57106 3.24168 1.25439 2.81668 1.25439H2.09585C1.62502 1.25439 1.23335 1.64606 1.26252 2.11689C1.48335 5.67523 4.32918 8.51689 7.88335 8.73773C8.35418 8.76689 8.74585 8.37523 8.74585 7.90439V7.18356C8.75002 6.76273 8.43335 6.40856 8.01252 6.35856Z"
        fill="white"
      />
    </svg>
  );
};

const WebApp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <g clip-path="url(#clip0_618_5200)">
        <path
          d="M4.99998 0.833496C2.69998 0.833496 0.833313 2.70016 0.833313 5.00016C0.833313 7.30016 2.69998 9.16683 4.99998 9.16683C7.29998 9.16683 9.16665 7.30016 9.16665 5.00016C9.16665 2.70016 7.29998 0.833496 4.99998 0.833496ZM4.58331 8.30433C2.93748 8.10016 1.66665 6.70016 1.66665 5.00016C1.66665 4.74183 1.69998 4.496 1.75415 4.25433L3.74998 6.25016V6.66683C3.74998 7.12516 4.12498 7.50016 4.58331 7.50016V8.30433ZM7.45831 7.246C7.34998 6.9085 7.04165 6.66683 6.66665 6.66683H6.24998V5.41683C6.24998 5.18766 6.06248 5.00016 5.83331 5.00016H3.33331V4.16683H4.16665C4.39581 4.16683 4.58331 3.97933 4.58331 3.75016V2.91683H5.41665C5.87498 2.91683 6.24998 2.54183 6.24998 2.0835V1.91266C7.47081 2.4085 8.33331 3.60433 8.33331 5.00016C8.33331 5.86683 7.99998 6.65433 7.45831 7.246Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_618_5200">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const GmailEmail = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <path
        d="M8.33331 1.6665H1.66665C1.20831 1.6665 0.83748 2.0415 0.83748 2.49984L0.833313 7.49984C0.833313 7.95817 1.20831 8.33317 1.66665 8.33317H8.33331C8.79165 8.33317 9.16665 7.95817 9.16665 7.49984V2.49984C9.16665 2.0415 8.79165 1.6665 8.33331 1.6665ZM8.16665 3.43734L5.22081 5.279C5.08748 5.36234 4.91248 5.36234 4.77915 5.279L1.83331 3.43734C1.72915 3.37067 1.66665 3.25817 1.66665 3.13734C1.66665 2.85817 1.97081 2.6915 2.20831 2.83734L4.99998 4.58317L7.79165 2.83734C8.02915 2.6915 8.33331 2.85817 8.33331 3.13734C8.33331 3.25817 8.27081 3.37067 8.16665 3.43734Z"
        fill="white"
      />
    </svg>
  );
};

const OpacityBtm = () => {
  return(
    <svg className='absolute bottom-[26px] right-0' xmlns="http://www.w3.org/2000/svg" width="156" height="61" viewBox="0 0 156 61" fill="none">
  <g filter="url(#filter0_f_618_5150)">
    <path d="M63.1034 51L163 30.5V10L107.034 26.5L26.4138 35.5L10 46L63.1034 51Z" fill="#000D19"/>
  </g>
  <defs>
    <filter id="filter0_f_618_5150" x="0" y="0" width="173" height="61" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_618_5150"/>
    </filter>
  </defs>
</svg>
  )
}


type Props = {
  texxt: string
};

const findSecondWordLength = (input: string): number => {

  const words = input.trim().split(/\s+/);


  if (words.length >= 2) {
    return words[1].length;
  }

  return 0;
};


const SwipperCard = ({texxt}: Props) => {

  const secondWordLength = findSecondWordLength(texxt);


  return (
    <div
      className="cswipperCard relative mx-auto max-w-[328px] overflow-hidden rounded-md"
      style={{
        background: 'linear-gradient(110deg, #091825 0%, #015292 100%)',
      }}
    >
      <div className="tope-a mb-3 flex flex-row p-4">
        <div className="texts-tabe min-h-[124px] flex flex-col gap-6">
          <h4 className="max-w-[180px] uppercase text-lg font-extrabold leading-[23.4px] tracking-[0.027px] text-white">
            {texxt} В ЛЮБЫХ ОБЪЁМАХ
          </h4>
          <Button className="max-h-[29px] w-full max-w-[97px] rounded-full border-[0.5px] border-solid border-white bg-transparent px-[10px] py-2 text-[10px] font-normal leading-[13px] text-white">
            Заказать
          </Button>
        </div>
        <div className="images-tabe">
        <Image
            src={logoMetal}
            alt="metalLogo"
            className="absolute right-4 top-4"
          />
          <Image
            src={fura}
            alt="fura"
            className={`absolute w-[200px] z-10 ${secondWordLength > 6 ? 'right-[-38px]':"right-[-28px]" } top-2`}
          />
          <OpacityBtm/>
        </div>
      </div>
      <div className="tope-a-boteme flex flex-row items-center justify-between rounded-b-md bg-[#00000033] p-3">
        <div className="phone flex flex-row items-center gap-1">
          <Phone />
          <p className="text-[8px] font-normal text-white">8(800)300-74-16</p>
        </div>
        <div className="sitee flex flex-row items-center gap-1">
          <WebApp />
          <p className="text-[8px] font-normal text-white">www.marcas.pro</p>
        </div>
        <div className="emaile flex flex-row items-center gap-1">
          <GmailEmail />
          <p className="text-[8px] font-normal text-white">
            info_krd@marcas.pro
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwipperCard;
