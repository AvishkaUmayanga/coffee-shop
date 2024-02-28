import React from 'react'
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const CoffeeGrid = ({coffeeData}) => {
  if (!coffeeData) {
    return <div>Loading...</div>;
  }
  return (
    <div className='grid grid-cols-2 gap-8 md:grid-cols-3'>
      {coffeeData.map((data,index)=>(
      <div key={index} className='flex flex-col p-1 text-black bg-white rounded-xl'>
        <img src={data.coffeeImage} alt="coffee" className=' h-[130px]  rounded-xl' />
        <h4 className='text-lg font-bold '>{data.coffeeCategory}</h4>
        <p className='text-sm font-bold opacity-75 '>{data.coffeeName}</p>
        <div className='flex justify-between '>
          <h3 className='text-xl font-bold opacity-85'>$ {data.coffeePrice}</h3>
          <div className='flex items-center justify-center p-2 text-white rounded-md bg-buttonColor'>
            <Link to ={`/details/${data._id}`}><FaPlus /></Link>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}

export default CoffeeGrid