import React from 'react'

export default function SignupAlert({onClick}) {
  return (
    <div className='fixed flex items-center justify-center w-full h-full bg-black bg-opacity-20 backdrop-blur-sm'>
      <div className='flex bg-black rounded-2xl h-[200px] w-[300px] text-white p-5 flex-col  justify-between'>
        <div className='flex items-center justify-center h-full borde'>
            <p className='text-2xl '>Signup successfull</p>
        </div>
        <div className='flex self-end text-lg justify-self-end'>
          <button className='px-5 py-1 bg-buttonColor rounded-xl' onClick={onClick}>Ok</button>
        </div>
      </div>
    </div>
  )
}
