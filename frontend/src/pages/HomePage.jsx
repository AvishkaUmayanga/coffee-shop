import React, { useEffect, useState } from 'react'
import profileImg from '../assets/startBg.png'
import SearchBar from '../containers/homeContainers/SearchBar';
import PromoBar from '../containers/homeContainers/PromoBar';
import CoffeeDrinks from '../containers/homeContainers/CoffeeDrinks';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';

export default function HomePage() {
  const [userDetails, setUserDetails] = useState(null)
  
  useEffect(()=>{
    const handleUserDetails = async() => {
      try{
        const token = localStorage.getItem('authToken')
        const response = await axios.get('http://localhost:4000/user_details', {headers: {Authorization: `Bearer ${token}`}})
        setUserDetails(response.data.userDetails)
      }
      catch(err){
        console.error(err.response.data)
      }
    }
    handleUserDetails()
  },[])
  return (
    <div className='text-white '>
      <div className=' bg-gradient-to-tr from-black to-lightBlack  px-5 pt-10 flex flex-col gap-8 py-[150px] '>
        <div className='flex justify-between '>
          <div className='flex flex-col '>
            <p className='text-sm opacity-85'>Loaction</p>
            { userDetails && (
              <h4>{userDetails.userName},{userDetails.deliveryAddress}</h4> 
            )}
          </div>
          <div>
            <img src={profileImg} alt='user profile' className='w-12 h-12 rounded-xl'/>
          </div>
        </div>
        <div className='flex md:justify-center'>
          <SearchBar />
        </div>
      </div>
      <PromoBar />
      <div className=' mb-[100px]'>
        <CoffeeDrinks />
      </div>
      <NavigationBar />
    </div>
  )
}
