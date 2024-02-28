import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Orders() {
  const [orderDetails, setOrderDetails] = useState(null)
  const [dashboardError, setDashboardError] = useState(null)
  useEffect(()=>{
    const handleOrders = async() =>{
      try{
        const token = localStorage.getItem('authToken')
        const response = await axios.get('http://localhost:4000/all_orders', {headers: {Authorization: `Bearer ${token}`}})
        setOrderDetails(response.data.allDetails)
      }
      catch(err){
        console.error(err.response.data)
        setDashboardError(err.response.data.message)
      }
    }
    handleOrders()
  },[])
  
  return (
    <div >
      <div className='grid grid-cols-2 gap-5 lg:gap-10 lg:grid-cols-4 md:grid-cols-3'>
        {orderDetails?.map((order, index)=>(
        <div key={index} className='flex flex-col items-center p-4 bg-lightGray rounded-xl'>
          <img src={order.coffeeDetails.coffeeImage} alt='coffee' className=' w-[120px] h-[100px] rounded-xl'/>
          <h3 className='text-lg '>{order.coffeeDetails.coffeeCategory}</h3> 
          <h4>{order.coffeeDetails.coffeeName}</h4> 
          <p className='text-sm '>{order.userDetails.userName}</p>
          <p className='text-sm '>{order.userDetails.deliveryAddress}</p>
          <p className='text-sm '>number of items : {order.numberOfCoffee}</p>
          <p className='text-sm '>${order.totalPrice.toFixed(2)}</p>
        </div>
        ))}
      </div>
      { (dashboardError !== null) && (
        <div className='fixed left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-80 '>
          <p className='text-xl font-bold text-white'>{dashboardError}</p>
        </div>
      )}
    </div>
  )
}
