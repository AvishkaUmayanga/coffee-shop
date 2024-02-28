import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function AllCoffees() {
  const [coffDetails, setCoffDetails] = useState(null)
  const token = localStorage.getItem('authToken')
  const [dashboardError, setdashboardError] = useState('')
  
  useEffect(()=>{
    const fetchCoffee = async() =>{
      try{
        const response = await axios.get('http://localhost:4000/all_coffee', {headers: {Authorization: `Bearer ${token}`}})
        setCoffDetails(response.data.allCoffee)
      }
      catch(err){
        setdashboardError(err.response.data.message)
      }
    }
    fetchCoffee()
  },[token])

  const handleDelete = async(id) =>{
    console.log(id)
    try{
      const response = await axios.delete('http://localhost:4000/delete_coffee'+id, {headers: {Authorization: `Bearer ${token}`}})
      alert(response.data.message)
      window.location.reload()
    }
    catch(err){
      console.error(err.response.data)
    }
  }
  return (
    <div>
      <div className='flex flex-col gap-8 '>
        {coffDetails?.map((details,index)=>(
        <div key={index} className='flex p-2 bg-lightGray  rounded-xl lg:w-[1000px] gap-10 shadow-lg max-md:flex-col  max-md:w-[300px] max-md:text-center  md:w-[700px] items-center '>
          {/* <div className='flex flex-col max-md:items-center '> */}
            <div className='w-[100px] h-[100px] rounded-xl max-md:w-[200px] max-md:h-[200px] '>
              <img src={details.coffeeImage} alt='coffee' className='object-cover w-full h-full rounded-xl'/>
            </div>
            <div className='flex flex-col justify-between '>
              <div className='flex flex-col '>
                <h4 className='text-lg font-bold '>{details.coffeeCategory}</h4>
                <p className='text-sm font-bold opacity-75 '>{details.coffeeName}</p>
              </div>
              <div className='flex lg:max-w-[750px] md:max-w-[450px] max-lg:text-sm'>
                <p key={index}>{details.coffeeDescription}</p>
              </div>
             </div>
           {/* </div> */}
          <div className='flex justify-center gap-3 md:flex-col '>
            <Link to={`/update_coffee/${details._id}`}><button className='w-[100px] rounded-2xl bg-goldYellow py-1 hover:scale-110 duration-300'>Update</button></Link>
            <button onClick={()=>handleDelete(details._id)} className='w-[100px] rounded-2xl bg-red text-white py-1 hover:scale-110 duration-300'>Delete</button>
          </div>
        </div>
        ))}
      </div>
      { (dashboardError !== '') && (
        <div className='fixed left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-80 '>
          <p className='text-xl font-bold text-white'>{dashboardError}</p>
        </div>
      )}
    </div>
  )
}
