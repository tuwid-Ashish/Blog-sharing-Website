import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as AuthLogin } from './store/AuthSlice'
import { useDispatch } from 'react-redux'
import { Logo, Button, Inputbox } from './index'
import { authService } from '../appwrite/Auth'
import { useForm } from 'react-hook-form'
import { addPost } from '../components/store/PostSlice'
import Service from '../appwrite/config'
import Profile from '../appwrite/Profile'
function Login() {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const login = async (data) => {
    setError("")
    try {
      const Session = await authService.Login(data)
      if (Session) {
        const userdata = await authService.getCurrentUser()
        if (userdata) {
          dispatch(AuthLogin(userdata))   
          Service.getposts([]).then((post) => {
            if (post) {
              post.documents.map(post => dispatch(addPost(post)))
            }
          })

          Profile.getProfile(userdata.name).then((post)=>{
            if (post) {
                console.log(post);
            }else{
              Profile.CreateProfile({title: userdata.name, UserID: userdata.$id})
        
            }
        })
      }
        
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <>
      <div
        className='flex items-center justify-center w-full my-28  px-4 mx-auto'
      >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
              <Inputbox
                lablel="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) => {
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be validate"
                    }
                  }
                })}
              />
              <Inputbox
                lablel="Password"
                type="password"
                placeholder="Enter a Strong Password"
                {...register("password", {
                  required: true,

                })}
              />
              <Button
                chidren={"Login"}
                type='submit'
                classname='px-14 py-3 rounded-full shadow-lg  text-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-white'
              ></Button>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
