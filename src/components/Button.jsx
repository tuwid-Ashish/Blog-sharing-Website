import React from 'react'

function Button({
    chidren, 
    type="button",
    bgColor='bg-blue-600',
    textColor= 'text-white',
    classname= "px-4 py-2",
    ...prps
}) {
  return (
    <button  className={`${bgColor} ${textColor} ${classname}  rounded-lg`} { ...prps } >
        {chidren}   
    </button>
  )
}

export default Button
