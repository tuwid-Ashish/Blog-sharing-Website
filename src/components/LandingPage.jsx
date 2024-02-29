import React from 'react'
import Button from './Button'
import { login } from './store/AuthSlice'
import { boy } from '../assets'

function LandingPage() {
  return (
    <div className='flex justify-center items-center flex-col gap-8  min-h-[80vh]'>
      <h1 className='md:text-[56px] text-[36px] leading-[70px] font-poppins text-primary font-bold'>Where developer blogs meet <br className='sm:block hidden m-2' /><span className='flex justify-center'>
      community power! <img src={boy} className="ml-4 w-14 h-14" /></span></h1>
      <p className='font-poppins font-normal max-w-[670px] text-dimWhite text-[19px] leading-[30.8px]'>
        Effortlessly create and grow your developer blog ,newsletter, or engeneering team blog with Devtalk. Level up your content creation game
      </p>
      <div className='flex sm:flex-row flex-col sm:justify-center gap-5 justify-between my-5 w-full font-poppins '>
        <Button chidren={"login"} textColor='text-primary' classname='px-14 py-3 rounded-full shadow-lg bg-white  text-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:text-white'/>
        <Button classname='px-14 py-3 rounded-full shadow-lg  text-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-white' chidren={"Sign up"} bgColor='bg-blue-500'/>
      </div>
    </div>
  )
}

export default LandingPage
