import React, { useState,useEffect } from 'react'
import {DashBoard} from '../components'
import { useSelector } from 'react-redux'
import {  Container } from '../components'
import { useNavigate } from 'react-router-dom'
import Profile from '../appwrite/Profile'
function DashBoardPage() {
        const [profile,setProfile] = useState(null)
        const userData = useSelector(state=>state.auth.userData)
        const navigate = useNavigate()
    useEffect(()=>{
        console.log(userData);
        if (userData) {   
            Profile.getProfile(userData.name).then((post)=>{
                if (post) {
                    setProfile(post)
                    console.log(post);
                }
            })
        }else navigate("/")
    },[userData,navigate,])
  return profile? (
    <div className='py-8'>
        <Container>
              <DashBoard profile={profile}/>
        </Container>
    </div>
  ): null
}

export default DashBoardPage
