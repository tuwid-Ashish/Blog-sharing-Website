import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { PAvatar } from "../index"
import { Link, useNavigate } from 'react-router-dom';
import React from 'react'
import { logout } from '../store/AuthSlice'
import { RemovePosts } from '../store/PostSlice'
import { authService } from '../../appwrite/Auth'
import { useDispatch } from 'react-redux'
import Profile from "../../appwrite/Profile";

export function ProfileIcon({profile}) {
  const dispatch = useDispatch()
  const logoutHandler=(e)=>{
      e.preventDefault()
      console.log("vlick");
      authService.Logout().then(()=>
      dispatch(logout()))
      dispatch(RemovePosts())
  }

  return (
    <Menu>
      <MenuHandler>
       <button> <PAvatar fileID={profile?Profile.getProfilePreview(profile.ProfileImage):"//docs.material-tailwind.com/img/face-2.jpg"}/></button> 
      </MenuHandler>
      <MenuList className="items-center">
        <MenuItem>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/Settings">
            Setting
          </Link>
        </MenuItem>
        <hr className="my-3" />
        <MenuItem onClick={logoutHandler}>Logoutbtn</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default ProfileIcon
