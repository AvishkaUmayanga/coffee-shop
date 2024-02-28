import React from 'react'

const CoffeeButtons = ({btnText, isActive, onClick}) => {
  return (
    <div>
      <button 
        className={`${isActive ? 'bg-buttonColor text-white' : ' bg-white text-black ' } px-2 text-lg rounded-md lg:w-[200px] lg:py-1`} 
        onClick={onClick}>
          {btnText}
      </button>
    </div>
  )
}

export default CoffeeButtons
