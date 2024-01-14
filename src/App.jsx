import { StrictMode, useEffect, useState } from 'react'
import { useDispatch} from "react-redux"
import './App.css'
import authService from './appwrite/Auth'
import Service from "./appwrite/config"
import { login,logout } from "./components/store/AuthSlice";
import {addPost} from "./components/store/PostSlice"
import { Header,Footer } from './components/index';
import { Outlet } from "react-router-dom";
function App() {
 
   const [loading,setloading] = useState(true)
   const dispatch = useDispatch()

   useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
       Service.getposts([]).then((post) => {
          if (post) {
            post.documents.map(post => dispatch(addPost(post)))
          }
        })
      }
      else{
       dispatch(logout())
      }
            
      // userData?dispatch(login(userData)):dispatch(logout(userData))
    } ) 
    .finally( ()=> setloading(false))
   },[])
     return !loading?(
      
        <div className="w-full block">      
      <Header/>
       <Outlet/> 
      <Footer/>
     
        </div>
         
     ):null
}

export default App
