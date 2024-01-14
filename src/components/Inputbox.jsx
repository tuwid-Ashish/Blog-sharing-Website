import React, { forwardRef, useId } from 'react'

const Inputbox = forwardRef(function Input({
    lable,
    type="text",
    className='',
    ...prps

},ref) {
   const  Id = useId()
  return (
    <div>
        {lable&& <label className='inline-block mb-1 pl-1' htmlFor={Id}>{lable}</label>  
    }      
    <input type={type} className={`px-3 py-2 rounded-lg bg-white shadow-md text-black outline-none focus:bg-gray-100 duration-200 border border-gray-200 w-full  ${className}`} 
    {...prps}
    ref={ref}
    />
    </div>
  )
})

export default Inputbox
