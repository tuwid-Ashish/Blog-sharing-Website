import { useState, useEffect } from 'react'
import React from 'react'
import Service from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useLoaderData } from 'react-router-dom'
import { useSelector } from 'react-redux'
function AllPosts() {
    const posts = useSelector(state=>state.post.posts)
    // const [posts, setPosts] = useState([])
    // const posts = useLoaderData()
    // if(posts){
    //     console.log("its there");
    // }
    // Service.getposts([]).then((posts) => {
    //     if (posts) {
    //    setPosts(posts.documents)
    //     }
    // })

    return (
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

export default AllPosts

export const HandleAllPosts = async()=>{

   const posts =  await Service.getposts([]) 
        if(posts){

            return posts.documents
        }   
        
}