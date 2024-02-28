import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { FaMinus, FaPlus  } from "react-icons/fa";
import { HiOutlineCash } from "react-icons/hi";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { motion } from 'framer-motion';
import axios from 'axios';

export default function OrderPage() {
  const [showDelivery, setShowDelivery] = useState('Deliver')
  const [cofDetails, setCofDetails] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [orderMessage, setOrderMessage] = useState(null)
  const token = localStorage.getItem('authToken')
  const {id} = useParams()

  const[coffCount, setCoffCount] = useState(1)
  const inCreaseCoffCount = () =>{
    setCoffCount(coffCount+1)
  }
  const decreaseCoffCount = () =>{
    if(coffCount === 1) return
    setCoffCount(coffCount-1)
  }
  
  useEffect(()=>{
    const handleUserDetails = async() => {
      try{
        const response = await axios.get('http://localhost:4000/user_details', {headers: {Authorization: `Bearer ${token}`}})
        setUserDetails(response.data.userDetails)
      }
      catch(err){
        console.error(err.response.data)
      }
    }
    handleUserDetails()
  },[token])

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/details/${id}`);
        setCofDetails(res.data.resDetails);
      } catch (err) {
        console.error(err.res.data);
      }
    };
    handleFetch();
  }, [id]);

  if(!cofDetails){
    return <div className='flex items-center justify-center h-screen'>Loading...</div>;
  }

  const handleOrder = async() => {
    try{
      const totalPrice = (cofDetails.coffeePrice * coffCount + cofDetails.deliveryFee)
      const numberOfCoffee = coffCount
      const response = await axios.post(`http://localhost:4000/order_details/${id}`,{totalPrice, numberOfCoffee}, {headers: {Authorization: `Bearer ${token}`}})
      console.log(response.data)
      setOrderMessage(response.data.message)
    }
    catch(err){
      console.error(err.response.data)
    }
  }
  
  if(!userDetails){
    return <div>Loading...</div>
  }
  
  return (
    <div className='flex flex-col gap-8 px-8 text-lightBlack'>
      <div className='flex items-center justify-between py-5 text-2xl'>
        <Link to={`/details/${id}`}><IoIosArrowBack /></Link>
        <h4 className='font-semibold '>Order</h4>
        <div/>
      </div>
      <div className='flex gap-5 text-white'>
        <button className={`${showDelivery === 'Deliver' ? 'bg-buttonColor' : ' bg-white text-black' }  text-lg rounded-md w-full`}  onClick={()=>setShowDelivery('Deliver')} >Deliver</button> 
        <button className={`${showDelivery === 'Pick Up' ? 'bg-buttonColor' : ' bg-white text-black' }  text-lg rounded-md w-full`}  onClick={()=>setShowDelivery('Pick Up')} >Pick Up</button> 
      </div>
      { showDelivery === 'Deliver' && (
      <div className='flex flex-col gap-8 '>
        <div>
          <h3 className='text-xl font-bold '>Delivey Address</h3>
          <h4 className='text-lg font-semibold '>{userDetails.userName}</h4>
          <p className='text-sm font-semibold opacity-55 '>{userDetails.deliveryAddress}</p>
        </div>
        <div className='flex items-center justify-between py-5 border-opacity-20 border-y-2 border-lightBlack'>
          <div className='flex items-center gap-2'>
            <img src={cofDetails.coffeeImage} alt='coffee' className='h-14 w-14 rounded-xl'/>
            <div>
              <h4 className='text-lg font-semibold '>{cofDetails.coffeeCategory}</h4>
              <p className='text-sm font-semibold opacity-55 '>{cofDetails.coffeeName}</p>
            </div>
          </div>
          <div className='flex gap-3'> 
            <div className='flex items-center justify-center p-1 border rounded-full border-lightBlack opacity-60'>
              <FaMinus onClick={decreaseCoffCount}/>
            </div>
            <p className='text-xl font-semibold'>{coffCount}</p>
            <div className='flex items-center justify-center p-1 border rounded-full border-lightBlack opacity-60'>
              <FaPlus onClick={inCreaseCoffCount}/>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-xl font-bold '>Payment Summary</h3>
          <div className='flex justify-between'>
            <h4 className='font-semibold '>Price</h4>
            <p>${(cofDetails.coffeePrice * coffCount).toFixed(2)}</p>
          </div>
          <div className='flex justify-between'>
            <h4 className='font-semibold '>Delivery Fee</h4>
            <p><strike>$2.00</strike> ${cofDetails.deliveryFee}</p>
          </div>
          <div className='flex justify-between pt-3 border-t border-opacity-25 border-lightBlack'>
            <h4 className='font-semibold '>Total Payment</h4>
            <p>${(cofDetails.coffeePrice * coffCount + cofDetails.deliveryFee).toFixed(2)}</p>
          </div>
          <div className='flex justify-between mt-3'>
            <div className='flex gap-3 '>
              <HiOutlineCash className='text-3xl text-buttonColor'/>
              <div className='flex bg-black rounded-full bg-opacity-10'>
                <div className='flex items-center justify-center px-2 text-lg text-white rounded-full bg-buttonColor'>
                  <p>cash</p>
                </div>
                <div className='flex items-center justify-center px-2 text-lg font-bold'>
                  <p>${(cofDetails.coffeePrice * coffCount + cofDetails.deliveryFee).toFixed(2)}</p>
                </div>
              </div>
            </div>
            <PiDotsThreeCircleFill className='text-2xl '/>
          </div>
        </div>
        <button type='submit' onClick={handleOrder} className='py-3 text-xl font-bold text-white bg-buttonColor rounded-2xl'>Order</button>
      </div>
      )}
      { (orderMessage !== null) && (
        <div className='fixed left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-80'>
          <motion.div 
            whileInView={{scale:[0,1], opacity:[0,1]}}
            transition={{duration:0.35}}
            className='flex bg-black w-[300px] h-[200px] flex-col  rounded-xl p-5  justify-between'>
            <div className='flex flex-col items-center justify-center h-full '>
              <IoMdCheckmarkCircle className='text-6xl text-buttonColor'/>
              <p className='text-xl font-bold text-white'>{orderMessage}</p>
            </div>
            <div className='flex justify-end '>
              <button onClick={()=>setOrderMessage(null)} className='px-3 py-[2px] rounded-md text-white bg-buttonColor '>Ok</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>  
  )
}
