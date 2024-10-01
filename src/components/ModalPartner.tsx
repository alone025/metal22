'use client'
import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

type Props = {}

const ModalPartner = (props: Props) => {

    const [sended, setSended] = useState(false)

    const [valeu1, setValue1]= useState('')
    const [valeu2, setValue2]= useState('')
    const [valeu3, setValue3]= useState('')

    const handleNumber = (e: string) => {
        
        if (e === '') {
          setValue3(''); 
        } else if (e.length <= 11) {
          setValue3(e); 
        }
        if (e.length === 11) {
          console.log('Full number reached.');
        }
      };
    


  return (
    <Dialog >
    <DialogTrigger asChild>
    <Button className='mt-12 bg-[#1867FF] text-base w-full h-12 rounded-lg font-normal' >Стать партнёром</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] bg-white p-4 rounded-2xl">
      <DialogHeader className='max-sm:mt-0'>
        <DialogTitle className='text-2xl font-medium text-[#131313] font-roboto' >Партнёрство</DialogTitle>
        <DialogDescription className='text-base mt-2 font-normal font-roboto text-[#666666]'>
        Наши операторы свяжутся с вами в течении 5 минут
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-6">
        <div className="flex flex-col items-start gap-1 relative">
          <Label htmlFor="name" className="text-right text-[13px] font-normal font-roboto text-[#414141]">
          Наименование компании
          </Label>
          <Input onChange={(e)=> setValue1(e.target.value)} value={valeu1} id="name" placeholder="Пример: ТОО “Marcas”" className="px-3 py-[10px] rounded-lg border border-solid border-[#3C3C434D] text-base font-normal text-[#131313] placeholder:text-[#3C3C434D] font-roboto" />
            {
                valeu1.length !== 0 &&   <svg className='absolute bottom-3 right-3' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM12.225 12.225C11.9325 12.5175 11.46 12.5175 11.1675 12.225L9 10.0575L6.8325 12.225C6.54 12.5175 6.0675 12.5175 5.775 12.225C5.4825 11.9325 5.4825 11.46 5.775 11.1675L7.9425 9L5.775 6.8325C5.4825 6.54 5.4825 6.0675 5.775 5.775C6.0675 5.4825 6.54 5.4825 6.8325 5.775L9 7.9425L11.1675 5.775C11.46 5.4825 11.9325 5.4825 12.225 5.775C12.5175 6.0675 12.5175 6.54 12.225 6.8325L10.0575 9L12.225 11.1675C12.51 11.4525 12.51 11.9325 12.225 12.225Z" fill="#3C3C43" fill-opacity="0.6"/>
              </svg>
            }
        </div>
        <div className="flex flex-col relative items-start gap-1">
          <Label htmlFor="username" className="text-right text-[13px] font-normal font-roboto text-[#414141]">
          Ваше имя
          </Label>
          <Input onChange={(e)=> setValue2(e.target.value)} value={valeu2} id="username" placeholder="Имя" className="px-3 py-[10px] rounded-lg border border-solid border-[#3C3C434D] text-base font-normal text-[#131313] placeholder:text-[#3C3C434D] font-roboto" />
          {
                valeu2.length !== 0 &&   <svg className='absolute bottom-3 right-3' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM12.225 12.225C11.9325 12.5175 11.46 12.5175 11.1675 12.225L9 10.0575L6.8325 12.225C6.54 12.5175 6.0675 12.5175 5.775 12.225C5.4825 11.9325 5.4825 11.46 5.775 11.1675L7.9425 9L5.775 6.8325C5.4825 6.54 5.4825 6.0675 5.775 5.775C6.0675 5.4825 6.54 5.4825 6.8325 5.775L9 7.9425L11.1675 5.775C11.46 5.4825 11.9325 5.4825 12.225 5.775C12.5175 6.0675 12.5175 6.54 12.225 6.8325L10.0575 9L12.225 11.1675C12.51 11.4525 12.51 11.9325 12.225 12.225Z" fill="#3C3C43" fill-opacity="0.6"/>
              </svg>
            }
        </div>
        <div className="flex flex-col relative items-start gap-1">
          <Label htmlFor="phoneNm" className="text-right text-[13px] font-normal font-roboto text-[#414141]">
          Номер телефона
          </Label>
          <Input onChange={(e)=> handleNumber(e.target.value)} value={valeu3} id="phoneNm" placeholder="+7 (xxx) xxx-xx-xx" type='number' className="px-3 py-[10px] rounded-lg border border-solid border-[#3C3C434D] text-base font-normal text-[#131313] placeholder:text-[#3C3C434D] font-roboto" />
          {
                valeu3.length !== 0 &&   <svg className='absolute bottom-3 right-3' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM12.225 12.225C11.9325 12.5175 11.46 12.5175 11.1675 12.225L9 10.0575L6.8325 12.225C6.54 12.5175 6.0675 12.5175 5.775 12.225C5.4825 11.9325 5.4825 11.46 5.775 11.1675L7.9425 9L5.775 6.8325C5.4825 6.54 5.4825 6.0675 5.775 5.775C6.0675 5.4825 6.54 5.4825 6.8325 5.775L9 7.9425L11.1675 5.775C11.46 5.4825 11.9325 5.4825 12.225 5.775C12.5175 6.0675 12.5175 6.54 12.225 6.8325L10.0575 9L12.225 11.1675C12.51 11.4525 12.51 11.9325 12.225 12.225Z" fill="#3C3C43" fill-opacity="0.6"/>
              </svg>
            }
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="mss" className="text-right text-[13px] font-normal font-roboto text-[#414141]">
          Сообщение
          </Label>
          <Textarea id="mss" placeholder="Не обязательно" className="px-3 py-[10px] rounded-lg border border-solid border-[#3C3C434D] text-base font-normal text-[#131313] placeholder:text-[#3C3C434D] font-roboto" />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={()=> setSended(true)} disabled={valeu1.length === 0 || valeu2.length === 0 || valeu3.length === 0} type="submit">{sended ?  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M6.74998 12.1277L4.14748 9.52523C3.85498 9.23273 3.38248 9.23273 3.08998 9.52523C2.79748 9.81773 2.79748 10.2902 3.08998 10.5827L6.22498 13.7177C6.51748 14.0102 6.98998 14.0102 7.28248 13.7177L15.2175 5.78273C15.51 5.49023 15.51 5.01773 15.2175 4.72523C14.925 4.43273 14.4525 4.43273 14.16 4.72523L6.74998 12.1277Z" fill="#F2F5F7"/>
</svg>:'Отправить заявку'}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default ModalPartner