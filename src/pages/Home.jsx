import React, { useEffect, useState } from 'react'
import Service from '../appwrite/config'
import { PostCard, Container } from '../components'
import {  useSelector } from 'react-redux'
import LandingPage from '../components/LandingPage'

function Home() {
    // const [post, setposts] = useState([])
    const status = useSelector(state=>state.auth.status)
    const posts = useSelector(state=>state.post.posts)
    console.log(posts);
   
    if (posts.length === 0 && status === false) {
        return (
            <div className="w-full py-8 mt-[4.5%] text-center bg-gradient-to-t from-cyan-500 to-blue-500 ">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full ">
                            <LandingPage/>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (                     
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
            </div>
            )

  
}

export default Home
export const HomePostLoader = async()=>{
    const posts =  await Service.getposts([]) 
    if(posts){
             const arr =  [].push(posts.documents)
            
             return arr
         }   
         
 }