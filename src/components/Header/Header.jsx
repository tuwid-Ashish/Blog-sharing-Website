import React from 'react'
import { Logo, Container ,ProfileIcon} from '../index';
import { useSelector } from "react-redux";
import { Link,useNavigate} from 'react-router-dom';
import Profile from '../../appwrite/Profile';
import { useState } from 'react';
import { useEffect } from 'react';
function Header() {
  const [profile,setProfile] = useState(null)
  const userData =  useSelector((state)=> state.auth.userData)
  useEffect(()=>{
    if(userData){
    Profile.getProfile(userData.name).then((pro)=>{
    if(pro){
      setProfile(pro)
    }
  })}
},[userData]) 
  console.log("profile image id:", profile);
  const Status =  useSelector((state)=> state.auth.status)
 
  //  console.log(Status);
   const navigator = useNavigate()
  const navItem = [
    {
      name: "Home",
      Url: "/",
      active: true
    },
    {
      name: "Login",
      Url: "/login",
      active: !Status
    },
    {
      name: "Signup",
      Url: "/signup",
      active: !Status
    },
    {
      name: "All Posts",
      Url: "/all-posts",
      active: Status
    },
    
    {
      name: "Add Post",
      Url: "/add-post",
      active: Status
    },
    
  ]
  return (
    <header className="py-3 shadow bg-sky-100">
      <Container>
        <nav className ="flex" >
          <div className='mr-4'>
          <Link to="/">
             <Logo />
          </Link>      
          </div>
          <ul className='flex ml-auto'>
            {navItem.map((item)=>
            item.active?(
              <li key={item.name}>
                <button
                onClick={()=> navigator(item.Url)}
                className='inline-block px-6 py-2 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ):null
            )}
            {Status&& (
              <li>
                <ProfileIcon profile={profile}/>
                {/* <Dialogform/> */}
              </li>
            )}
          </ul>
        </nav>
      </Container>

    </header>
  )
}

export default Header
