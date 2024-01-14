import React, { useState } from 'react'
import Profile from '../../appwrite/Profile'
import PAvatar from "../Avatar"
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import {
  Card,
  CardHeader,
  CardBody,
  textarea,
  Typography,
  Dialog,
  DialogHeader,
  Button,
  Textarea,
} from "@material-tailwind/react"
import BannerImage from '../BannerImage'
import ProfileImage from '../ProfileImage'
import { useNavigate } from 'react-router-dom'
import { Button as Btn, PostCard } from "../index"
 
import { Container } from '../index'

function DashBoard({ profile }) {
  const userData = useSelector(state => state.auth.userData)
  const posts = useSelector(state=>state.post.posts)
  const myposts= posts.filter((post)=>post.userID ==userData.$id)
  console.log(myposts);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open);
  const { register, handleSubmit } = useForm()

  const submit = async (data) => {
    if (profile) {
      await Profile.UpdateProfile(profile.$id, { ...data })
      navigate("/dashboard")
    }
    else {
      await Profile.CreateProfile({ ...data, UserID: userData.$id, title: userData.name })
      navigate("/dashboard")
    }
  }
  return (
    <>
      <div className="w-full relative ">
        <img
          className="h-72 w-full rounded-lg object-cover object-center"
          src={profile ? Profile.getProfilePreview(profile.BannerImage) : "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"}
          alt="nature image"
        />
        <BannerImage profile={profile} btnstyle={"absolute  text-white rounded-lg bottom-4 end-2 px-4 py-2"} />
      </div>
      <div className="flex flex-col items-start px-3 relative z-10 bottom-10 w-11/12">
        <div className='flex flex-col  px-3 mx-4'>
          <PAvatar size='xxl' fileID={profile ? Profile.getProfilePreview(profile.ProfileImage) : "//docs.material-tailwind.com/img/face-2.jpg"}
          />
          <ProfileImage profile={profile} />

          <h4 className='text-xl font-bold static'>{profile ? profile.$id : userData.name}</h4>
        </div>
        <Typography variant="h6" color="blue-gray" className="mb-2 text-start w-1/2">
          {profile ? profile.Description : "Tell us something about your self"}

          <Btn onClick={handleOpen} chidren={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
          }
            classname={`bg-transparent text-light-blue-500 `}
            textColor='text-light-blue-500'
            variant="gradient"  >
          </Btn></Typography>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Give update About yourself</DialogHeader>
          <form onSubmit={handleSubmit(submit)} className='flex flex-1 flex-col flex-start'>
            <Textarea
              label="Description :"
              placeholder=""
              className="peer h-full min-h-[150px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              {...register("Description", { required: true })}
            />

            <div className='ms-auto'>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>

              <Button
                variant="gradient"
                color="green"
                className="mr-1"
                type='submit'
              >
                <span>Add</span>
              </Button>

            </div>
          </form>
        </Dialog>
      </div>
      <div className="my-posts-section w-full border-2  flex items-start">
        <Button className='bg-white text-black border-black border-2 border-b-0 '>My posts</Button>
        <div className='w-full py-8'>
           
            <div className='flex flex-wrap'>
              {myposts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
                

          <div />
        </div>
      </div>

      </>
      )
}

      export default DashBoard
