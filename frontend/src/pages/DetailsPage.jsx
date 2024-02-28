import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { GiCoffeeBeans } from "react-icons/gi";
import { SiBuymeacoffee } from "react-icons/si";
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function DetailsPage() {
  const [showMore ,setShowMore] = useState(false)
  const [cofDetails, setCofDetails] = useState(null)
  const {id} = useParams()
  
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

  if (!cofDetails) {
    return <div className='flex items-center justify-center h-screen'>Loading...</div>;
  }
  return (
    <div>
      <div className='flex flex-col gap-8 px-8'>
        <div className='flex items-center justify-between py-5 text-2xl'>
          <Link to='/home'><IoIosArrowBack /></Link>
          <h4 className='font-semibold'>Details</h4>
          <MdOutlineFavorite />
        </div>
        <div className='flex flex-col '>
          <img src={cofDetails.coffeeImage} alt='coffee' className='h-[200px] rounded-xl'/>
        </div>
        <div>
          <h4 className='text-lg font-bold '>{cofDetails.coffeeCategory}</h4>
          <p className='text-sm font-semibold opacity-55 '>{cofDetails.coffeeName}</p>
        </div>
        <div className='flex items-center justify-between py-2 shadow-md '>
          <div className='flex items-center gap-1 '>
            <FaStar className='text-xl text-goldYellow'/>
            <h4 className='text-lg font-bold '>{cofDetails.coffeeRating}</h4>
            <p className='text-sm font-semibold opacity-55 '>({cofDetails.numOfRating})</p>
          </div>
          <div className='flex gap-3 text-xl text-buttonColor'>
            <GiCoffeeBeans />
            <SiBuymeacoffee />
          </div>
        </div>
        <div>
          <h4 className='text-lg font-bold '>Description</h4>
          <p className='text-sm font-semibold opacity-75 text-lightBlack'>{showMore ? cofDetails.coffeeDescription : `${cofDetails.coffeeDescription.substring(0,100)}...`}
            <button  onClick={ ()=> setShowMore(!showMore)} className='ml-1 font-bold text-buttonColor'> {showMore ? 'Show less' : 'Show more'} </button>
          </p>
        </div>
        <div className='flex justify-between pb-20 '>
          <div className=' text-buttonColor'>
            <p className='font-semibold opacity-65 '>Price</p> 
            <h4 className='text-2xl font-bold '>${cofDetails.coffeePrice}</h4>
          </div>
          <motion.button whileTap={{scale:[1,0.9]}} className='w-[150px] text-lg text-white rounded-xl bg-buttonColor' ><Link to={`/order/${cofDetails._id}`}>Buy Now</Link></motion.button>
        </div>
      </div>
    </div>
  )
}
