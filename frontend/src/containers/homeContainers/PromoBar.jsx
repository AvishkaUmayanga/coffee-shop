import React from 'react'

export default function PromoBar() {
  return (
    <div className=' mx-5 border bg-promoBg h-[200px] bg-cover p-2 rounded-xl -translate-y-1/2 flex flex-col gap-5'>
      <div className=' bg-buttonColor max-w-max py-1 rounded-md px-2'>
        <h3 className=' text-lg font-bold'>Promo</h3>
      </div>
      <div className=' flex  self-center'>
        <h2 className='bg-lightBlack text-4xl font-bold bg-opacity-80'>Buy One get<br/> one Free</h2>
      </div>
    </div>
  )
}
