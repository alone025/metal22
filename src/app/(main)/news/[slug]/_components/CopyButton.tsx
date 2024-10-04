'use client'
import React, { useState } from 'react'
import { Button } from 'src/components/ui/button'

type Props = {}

const CopyButton = (props: Props) => {
    const [copyCl, setCopyCl] = useState(false)

    const handleCopy = () => {
        const baseURl = window.location.href
        navigator.clipboard.writeText(baseURl)
      setCopyCl(true)
    }
  return (
    <Button onClick={handleCopy} className='flex flex-row w-full gap-2 items-center justify-center bg-transparent hover:bg-transparent rounded-lg border border-solid border-[#A2A2A2] text-sm font-normal text-[#414141]'>
    {
     !copyCl ? (
       <>
        Поделиться
     <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
<path d="M12.5 10.7202C11.9933 10.7202 11.54 10.9202 11.1933 11.2335L6.44 8.46683C6.47333 8.3135 6.5 8.16016 6.5 8.00016C6.5 7.84016 6.47333 7.68683 6.44 7.5335L11.14 4.7935C11.5 5.12683 11.9733 5.3335 12.5 5.3335C13.6067 5.3335 14.5 4.44016 14.5 3.3335C14.5 2.22683 13.6067 1.3335 12.5 1.3335C11.3933 1.3335 10.5 2.22683 10.5 3.3335C10.5 3.4935 10.5267 3.64683 10.56 3.80016L5.86 6.54016C5.5 6.20683 5.02667 6.00016 4.5 6.00016C3.39333 6.00016 2.5 6.8935 2.5 8.00016C2.5 9.10683 3.39333 10.0002 4.5 10.0002C5.02667 10.0002 5.5 9.7935 5.86 9.46016L10.6067 12.2335C10.5733 12.3735 10.5533 12.5202 10.5533 12.6668C10.5533 13.7402 11.4267 14.6135 12.5 14.6135C13.5733 14.6135 14.4467 13.7402 14.4467 12.6668C14.4467 11.5935 13.5733 10.7202 12.5 10.7202Z" fill="#414141"/>
</svg>
       </>
     ) : (
       <>
        Ссылка скопирована
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M6.00009 10.7804L3.68676 8.46704C3.42676 8.20704 3.00676 8.20704 2.74676 8.46704C2.48676 8.72704 2.48676 9.14704 2.74676 9.40704L5.53342 12.1937C5.79342 12.4537 6.21342 12.4537 6.47342 12.1937L13.5268 5.14037C13.7868 4.88037 13.7868 4.46037 13.5268 4.20037C13.2668 3.94037 12.8468 3.94037 12.5868 4.20037L6.00009 10.7804Z" fill="#414141"/>
</svg>
       </>
     )
    }
     </Button>
  )
}

export default CopyButton