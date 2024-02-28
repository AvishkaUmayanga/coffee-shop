import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { MdOutlineFavorite } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { NavLink } from 'react-router-dom';


const activeLink = ' text-buttonColor'
const inActiveLink = ' text-black'

export default function NavigationBar() {
  return (
    <div className='fixed bottom-0 left-0 right-0 flex items-center justify-between px-8 py-3 text-4xl text-black bg-white rounded-t-2xl '>
      <NavLink to='/home' className={({isActive}) => ( isActive ? activeLink : inActiveLink )}><GoHomeFill /> </NavLink>
      <MdOutlineFavorite />
      <FaShoppingBag className='text-[30px] '/>
      <IoMdNotifications />
    </div>
  )
}
