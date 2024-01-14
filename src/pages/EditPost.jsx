import React, { useEffect, useState } from 'react'
import { Postform, Container } from '../components'
import Service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {
    const [post,setposts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        slug?console.log(slug): console.log("slug nhi ha");
        if (slug) {
            console.log(slug);
            Service.getPost(slug).then((post)=>{
                if (post) {
                    setposts(post)
                    console.log(post);
                }
            })
        }else navigate("/")
    },[slug,navigate])
  return post? (
    <div className='py-8'>
        <Container>
            <Postform post={post}/>
        </Container>
    </div>
  ): null
}
 
export default EditPost
