import React, { useState } from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import { motion } from 'framer-motion'

export default function StartPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  const handleShowSignUp = () =>{
    setShowLogin(false)
    setShowSignUp(true)
  }

  const handleShowLogin = () =>{
    setShowLogin(true)
    setShowSignUp(false)
  }
  return (
    <div className='flex w-screen h-screen text-center text-white bg-black bg-no-repeat bg-contain max-lg:bg-startBg lg:bg-startBgLg md:bg-cover'>
      <div className='flex flex-col justify-end w-full h-full px-5 mx-5 lg:justify-center'>
        <div className='flex flex-col -translate-y-[50px] gap-3 lg:items-center lg:gap-10'>
          <h2 className=' text-4xl font-bold lg:text-6xl max-w-[800px]'>Coffee so good, your taste buds will love it.</h2>
          <p className=' opacity-85 lg:text-lg'>The best grain, the finest roast, the powerful flavor.</p>
          <motion.button whileTap={{scale:[1,0.9]}} onClick={() => setShowLogin(true)} type="button" className=' bg-buttonColor py-3 text-lg font-semibold rounded-2xl lg:w-[200px] hover:scale-110 duration-300'>Get Started</motion.button>
        </div>
      </div>
      { showLogin && <LoginPage onClose={ ()=> setShowLogin(false)} onSignUpShow={handleShowSignUp}/>}
      { showSignUp && <SignUpPage onClose={ ()=> setShowSignUp(false)} onLoginShow={handleShowLogin}/>}
    </div>
  )
}
