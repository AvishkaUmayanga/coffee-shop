import React, { useState } from 'react'
import LoginSignupInput from '../components/LoginSignupInput'
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function LoginPage({onClose, onSignUpShow}) {
  const [formData, setFormData] = useState({
    email:'',
    password: ''
  })

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData({...formData,[name] : value})
  }

  const [errors, setErrors] = useState({})
  const [ loginError, setLoginError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const validationErrors = {}

    if(!formData.email.trim()){
      validationErrors.email = 'please enter your email'
    }

    if(!formData.password.trim()){
      validationErrors.password = 'please enter your password'
    }

    setErrors(validationErrors)
    
    try{
      const response = await axios.post('http://localhost:4000/login', {formData})
      if(response.data.message === 'Login successfull'){
        alert(response.data.message)
        
        const token = response.data.token 
        localStorage.setItem('authToken', token)
        
        const role = response.data.role 
        if(role === 'admin'){
          navigate('/dashboard')
        }
        if(role === 'user'){
          navigate('/home')
        }
      }
    }
    catch(err){
      console.error(err.response.data);
      setLoginError(true)
      setErrorMessage(err.response.data.message)
    }
  }
  return (
    <div className='fixed flex items-center justify-center w-full h-full bg-black bg-opacity-20 backdrop-blur-sm'>
      <motion.div 
       whileInView={{y:[100,0], opacity:[0,1]}}
       transition={{duration:0.5}}
       className='  rounded-xl bg-lightBlack w-[500px] px-5 pb-10 max-md:w-[350px] flex flex-col gap-8 max-md:gap-4 max-md:py-5 pt-5'>
        <button onClick={onClose} className=' flex self-end border rounded-full bg-white text-black p-1 max-md:p-[2px] hover:scale-110 duration-300 ' >
          <IoClose />
        </button>
        { loginError && (<div className='py-3 text-xl text-white rounded-xl bg-lightRed'><p>{errorMessage}</p></div>)}
        <h3 className='text-3xl font-bold '>Login</h3>
        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-8 '>
          <LoginSignupInput inputType='email' inputName='email' labelName='Email' onChange={handleChange}/>
          {errors.email && <span className=' text-red'>{errors.email}</span>}
          <LoginSignupInput inputType='password' inputName='password' labelName='Password' onChange={handleChange}/>
          {errors.password && <span className=' text-red'>{errors.password}</span>}
          <button type="submit" className=' bg-buttonColor lg:w-[200px] flex self-center justify-center rounded-xl py-2 hover:scale-110 duration-300 w-[150px]'>Login</button>
        </form>
        <p className='text-base '>Don't have an account? <button className='text-lg font-bold text-buttonColor ' onClick={onSignUpShow}>Sign up</button></p>
      </motion.div>
    </div>
  )
}
