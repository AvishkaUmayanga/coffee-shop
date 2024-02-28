import React from 'react'

const FormInputs = ({inputType, inputFieldName , labelName, accept, onChange, value}) => {
  return (
    <div>
      <div className='flex flex-col text-start'>
        <label>{labelName}</label>
        <input type={inputType} name={inputFieldName} accept={accept} onChange={onChange} value={value} required step="any"  className='border-b border-lightBlack focus:outline-none bg-lightGray'/>
      </div>
    </div>
  )
}

export default FormInputs
