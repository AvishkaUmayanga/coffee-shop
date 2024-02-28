import React, { useState } from 'react'
import FormInputs from '../../components/FormInputs'
import axios from 'axios'
import { RiErrorWarningFill } from "react-icons/ri"

export default function AddCoffee() {
  const [resError, setResError] = useState('')
  const [formData, setFormData] = useState({
    coffeeCategory:'',
    coffeeName:'',
    coffeePrice:'',
    deliveryFee:'',
    coffeeDescription:'',
    coffeeRating:'',
    numOfRating:'',
    coffeeImage:null,
  })

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData({...formData,[name] : value})
  }

  const handleImgChange = (e) =>{
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = () =>{
      setFormData({...formData, coffeeImage:reader.result})
    }
    
    if(file){
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      const token = localStorage.getItem('authToken')
      const response = await axios.post('http://localhost:4000/add_coffee',{formData}, {headers: {Authorization: `Bearer ${token}`}})
      alert(response.data.message)
    }
    catch(err){
      console.error(err.respose)
      setResError(err.response.data.message)
    }
  }
 
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className='sm:w-[500px] p-5  rounded-2xl w-[300px] max-md:text-sm py-8 shadow-sm shadow-lightBlack flex flex-col gap-5 bg-lightGray'>
        {resError && (<div className='flex items-center justify-center gap-2 p-2 py-3 font-semibold text-white rounded-xl bg-red'><RiErrorWarningFill className='text-2xl '/>{resError}</div>)}
        <div className='flex flex-col text-start'>
          <label>Category</label>
          <select name='coffeeCategory' required className='border-b bg-lightGray focus:outline-none border-lightBlack' onChange={handleChange}>
            <option value=''></option>
            <option value='Cappuccino'>Cappuccino</option>
            <option value='Macchiato'>Macchiato</option>
            <option value='Latte'>Latte</option>
          </select>
        </div>
        <FormInputs labelName='Coffee Name' inputFieldName='coffeeName' inputType='text' onChange={handleChange}/>
        <FormInputs labelName='Price' inputFieldName='coffeePrice' inputType='number' onChange={handleChange}/>
        <FormInputs labelName='Delivery Fee' inputFieldName='deliveryFee' inputType='number' onChange={handleChange}/>
        <div className='flex flex-col text-start'>
          <label>Description</label>
          <textarea name="coffeeDescription" required  rows="2" className='border-b focus:outline-none bg-lightGray border-lightBlack' onChange={handleChange}/>
        </div>
        <FormInputs labelName='Rating' inputFieldName='coffeeRating' inputType='number' onChange={handleChange}/>
        <FormInputs labelName='Number of Ratings' inputFieldName='numOfRating' inputType='number' onChange={handleChange}/>
        <FormInputs labelName='Coffee Image' inputFieldName='coffeeImage' inputType='file' accept='image/*' onChange={handleImgChange}/>
        <button type="submit" className=' bg-buttonColor w-[200px] text-white flex self-center  justify-center rounded-xl py-1 hover:scale-110 duration-300'>Add</button>
      </form>
    </div>
  )
}
