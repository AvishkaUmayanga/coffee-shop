import React, { useState } from 'react'
import LoginSignupInput from '../components/LoginSignupInput'
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';
import axios from 'axios';
import SignupAlert from '../containers/SignupAlert';

export default function SignUpPage({onClose, onLoginShow}) {
  const [formData, setFormData] = useState({
    userName:'',
    email:'',
    deliveryAddress:'',
    password: '',
    comfirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [signupAlert, setSignupAlert] = useState(false)
  const [ signupError, setSignupError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData({...formData,[name] : value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const validationErrors = {}
    if(!formData.userName.trim()){
      validationErrors.userName = '*user name is required'
    }
    
    if(!formData.email.trim()){
      validationErrors.email = 'email is required'
    }else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)){
      validationErrors.email = '*email is not valid'
    }
    
    if(!formData.deliveryAddress.trim()){
      validationErrors.deliveryAddress = '*address is required'
    }

    if(!formData.password.trim()){
      validationErrors.password = '*password is required'
    }else if(formData.password.length < 6){
      validationErrors.password = 'password should be at least 6 characters'
    }

    if(!formData.comfirmPassword.trim()){
      validationErrors.comfirmPassword =  '*comfirm password is required'
    }else if(formData.comfirmPassword !== formData.password){
      validationErrors.comfirmPassword = 'password not matched'
    }

    setErrors(validationErrors)

    try{
      const response = await axios.post('http://localhost:4000/signup',{formData})
      console.log(response.data)
      if(response.data.message === 'Signup successfull'){
        setSignupAlert(true)
      }
    }
    catch(err){
      console.error(err.response.data)
      setSignupError(true)
      setErrorMessage(err.response.data.message)
    }
  }
  return (
    <div className='fixed flex items-center justify-center w-full h-full bg-black bg-opacity-20 backdrop-blur-sm'>
      <motion.div 
       whileInView={{y:[100,0], opacity:[0,1]}}
       transition={{duration:0.5}}
       className='  rounded-xl bg-lightBlack w-[500px] p-5  max-md:w-[350px] flex flex-col gap-8 max-md:gap-4 max-md:py-5'>
        <button onClick={onClose} className=' flex self-end border rounded-full bg-white text-black p-1 max-md:p-[2px] hover:scale-110 duration-300 ' >
          <IoClose />
        </button>
        { signupError && (<div className='py-3 text-xl text-white rounded-xl bg-lightRed'><p>{errorMessage}</p></div>)}
        <h3 className='text-3xl font-bold '>Signup</h3>
        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-8 '>
          <LoginSignupInput inputType='text' inputName='userName' labelName='User Name' onChange={handleChange} />
          {errors.userName && <span className=' text-red'>{errors.userName}</span>}
          <LoginSignupInput inputType='email' inputName='email' labelName='Email' onChange={handleChange}/>
          {errors.email && <span className=' text-red'>{errors.email}</span>}
          <LoginSignupInput inputType='text' inputName='deliveryAddress' labelName='Address' onChange={handleChange}/>
          
          <LoginSignupInput inputType='password' inputName='password' labelName='Password' onChange={handleChange}/>
          {errors.password && <span className=' text-red'>{errors.password}</span>}
          <LoginSignupInput inputType='password' inputName='comfirmPassword' labelName='Comfirm Password' onChange={handleChange}/>
          {errors.comfirmPassword && <span className=' text-red'>{errors.comfirmPassword}</span>}
          <button type="submit" className=' bg-buttonColor lg:w-[200px] flex self-center justify-center rounded-xl py-2 hover:scale-110 duration-300 w-[150px]'>SignUp</button>
        </form>
        <p className='text-base '>Already have an account? <button className='text-lg font-bold text-buttonColor' onClick={onLoginShow}>Login</button></p>
      </motion.div>
      { signupAlert && <SignupAlert onClick={onLoginShow}/>}
    </div>
  )
}
