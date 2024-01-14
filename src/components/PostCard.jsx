import React from 'react'
import Service from '../appwrite/config'
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react"
import authService from '../appwrite/Auth'

 function  PostCard({$id,featuredImage,title,userID}) {
  return (
     <Link to={`/post/${$id}`}>

 <Card className="w-60 bg-emerald-100 Rounded-xl p-4 bg-blue-gray-100">
      <CardHeader className="relative ">
        <img
          src={Service.getfilePreview(featuredImage)?Service.getfilePreview(featuredImage):"https://www.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg"}
          alt={title}
        />
      </CardHeader>  
      <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
       

     </Card>
    {/* <div className='w-60 bg-emerald-100 Rounded-xl p-4'>
        <div className="justify-center w-full m-auto">
            
            <img src={Service.getfilePreview(featuredImage)} 
            alt={title} 
            className='w-3/5'
            />
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
    </div> */}
    </Link>
  )
}

export default PostCard
