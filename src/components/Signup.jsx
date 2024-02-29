import React, { useState } from 'react'
import { Button, Inputbox, Logo } from "./index"
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../appwrite/Auth'
import { login } from './store/AuthSlice'
import {addPost} from  "./store/PostSlice"
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import Service from "../appwrite/config"
import Profile from '../appwrite/Profile'
function Signup() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const Signup = async (data) => {
        setError("")
        try {
            const Session = await authService.createAccount(data)
            if (Session) {
                const userdata = await authService.getCurrentUser()
                if (userdata){
                    dispatch(login(userdata))
                   await Service.getposts([]).then((post) => {
                        if (post) {
                          post.documents.map(post => dispatch(addPost(post)))
                        }
                      })
                Profile.CreateProfile({title: userdata.name, UserID: userdata.$id})
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
                className='flex items-center justify-center w-full my-20'
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
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            login in
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(Signup)} >
                        <div className="space-y-5">
                            
                            <Inputbox
                            label="Name: "
                            type ="text"
                            placeholder="Enter your name"
                            {...register("name", { required:true })}
                            />
                            <Inputbox
                            label="Email: "
                            type ="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required:true,
                                // validate: {
                                //     matchPatern:(value)=>{
                                //         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)|| "Email address must be validate"
                                //     }}
                            })}
                            />

                            <Inputbox
                            label="password: "
                            type ="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required:true,
                                validate: {
                                    matchPatern:(value)=>{
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)|| "Email address must be validate"
                                    }}
                            })}
                            />
                        
                            <Button
                            chidren={"Sign up"}
                            type='submit'
                            classname='px-14 py-3 rounded-full shadow-lg  text-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-white'
                            >Sign up</Button>
                        </div>
                         </form>
                </div>
            </div>
        </>
    )
}

export default Signup
