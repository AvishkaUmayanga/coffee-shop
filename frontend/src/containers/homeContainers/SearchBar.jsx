import React from 'react'
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className='flex  bg-lightBlack md:w-[450px] w-full'>
      <input type="text" name="search" id="searchText" placeholder=' Search Coffee' className='w-full pl-1 text-opacity-75 bg-lightBlack focus:outline-none'/>
      <div className='flex items-center justify-center p-2 rounded-md bg-buttonColor'>
        <FaSearch />
      </div>
    </div>
  )
}
