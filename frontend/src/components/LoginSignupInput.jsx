import React from 'react'

const LoginSignupInput = ({labelName, inputType, inputName, onChange}) => {
  return (
    <div className='flex flex-col text-start'>
      <label>{labelName}</label>
      <input type={inputType} name={inputName} onChange={onChange} autoComplete='off' className='border-b-2 focus:outline-none bg-lightBlack '/>
    </div>
  )
}

export default LoginSignupInput
