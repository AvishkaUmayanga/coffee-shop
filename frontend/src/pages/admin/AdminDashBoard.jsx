import React, { useState } from 'react'
import CoffeeButtons from '../../components/CoffeeButtons'
import AllCoffees from '../../containers/adminContainers/AllCoffees'
import AddCoffee from '../../containers/adminContainers/AddCoffee'
import Orders from '../../containers/adminContainers/Orders'

export default function AdminDashBoard() {
  const [activeBtn, setActiveBtn] = useState('See All Coffee')
  return (
    <div className='h-full bg-white'>
      <div className='text-3xl text-center text-white bg-black'>
        <h2>Coffee Shop Admin</h2>
      </div>
      <div className='flex flex-col items-center gap-8 mt-8 lg:px-20 md:px-10'>
        <div className='flex self-center gap-5'>
          <CoffeeButtons btnText='See All Coffee' onClick={() => setActiveBtn('See All Coffee')} isActive={activeBtn  === 'See All Coffee'}/>
          <CoffeeButtons btnText='Add Coffee' onClick={() => setActiveBtn('Add Coffee')} isActive={activeBtn === 'Add Coffee'}/>
          <CoffeeButtons btnText='Orders' onClick={() => setActiveBtn('Orders')} isActive={activeBtn === 'Orders'}/>
        </div>
        {activeBtn === 'See All Coffee'  && <AllCoffees />}
        {activeBtn === 'Add Coffee' && <AddCoffee />}
        {activeBtn === 'Orders' && <Orders />}
      </div>
    </div>
  )
}
