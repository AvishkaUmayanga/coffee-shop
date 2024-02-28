import React, { useEffect, useState } from 'react'
import FormInputs from '../../components/FormInputs'
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function UpdateCoffee() {
  const token = localStorage.getItem('authToken')
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

  const {id} = useParams()
  useEffect(()=>{
    const handleFetch = async() =>{
      try{
        const response = await axios.get(`http://localhost:4000/get_coffee/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        setFormData(response.data.coffeeDetails)
      }
      catch(err){
        console.error(err.response.data)
      }
    }
    handleFetch()
  },[id, token])

  const handleUpdate = async(e) =>{
    e.preventDefault()
    try{
      const response = await axios.put(`http://localhost:4000/update_coffee/${id}`,{formData},{headers: {Authorization: `Bearer ${token}`}})
      console.log(response)
      alert(response.data.message)
    }
    catch(err){
      console.error(err.response.data)
    }
  }
  
  return (
    <div className='bg-white '>
      <div className='fixed top-0 left-0 right-0 flex items-center justify-between px-10 py-1 text-3xl text-center text-white bg-black'>
        <Link to='/dashboard'><div className='p-1 text-2xl text-black duration-300 bg-white border rounded-full hover:scale-110'>
          <IoIosArrowBack />
        </div></Link>
        <h2>Coffee Shop Admin</h2>
        <div/>
      </div>
      {formData !== null && (
      <div className='flex justify-center mt-[80px]'>
        <form action="" onSubmit={handleUpdate} className='sm:w-[500px] p-5  rounded-2xl w-[300px] max-md:text-sm py-8 shadow-sm shadow-lightBlack flex flex-col gap-5 bg-lightGray'>
          <div className='flex flex-col text-start'>
            <label>Category</label>
            <select name='coffeeCategory' className='border-b bg-lightGray focus:outline-none border-lightBlack' value={formData.coffeeCategory} onChange={handleChange}>
              <option value='Cappuccino'>Cappuccino</option>
              <option value='Macchiato'>Macchiato</option>
              <option value='Latte'>Latte</option>
            </select>
          </div>
          <FormInputs labelName='Coffee Name' inputFieldName='coffeeName' inputType='text' value={formData.coffeeName} onChange={handleChange}/>
          <FormInputs labelName='Price' inputFieldName='coffeePrice' inputType='number' value={formData.coffeePrice} onChange={handleChange}/>
          <FormInputs labelName='Delivery Fee' inputFieldName='deliveryFee' inputType='number' value={formData.deliveryFee} onChange={handleChange}/>
          <div className='flex flex-col text-start'>
            <label>Description</label>
            <textarea name="coffeeDescription" value={formData.coffeeDescription}   rows="2" className='border-b focus:outline-none bg-lightGray border-lightBlack' onChange={handleChange}/>
          </div>
          <FormInputs labelName='Rating' inputFieldName='coffeeRating' inputType='number' value={formData.coffeeRating} onChange={handleChange}/>
          <FormInputs labelName='Number of Ratings' inputFieldName='numOfRating' inputType='number' value={formData.numOfRating} onChange={handleChange}/>
          {/* <FormInputs labelName='Coffee Image' inputFieldName='coffeeImage' inputType='file' accept='image/*' value={coffDetails.coffeeImage}/> */}
          <button type="submit" className=' bg-buttonColor w-[200px] text-white flex self-center  justify-center rounded-xl py-1 hover:scale-110 duration-300'>Update</button>
        </form>
      </div>
      )}
    </div>
  )
}
