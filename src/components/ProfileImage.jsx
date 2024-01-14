import React, { useState } from 'react'
import { Button as Btn } from "../components"
import Inputbox from './Inputbox'
import Profile from '../appwrite/Profile'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import LoadingBar from "react-top-loading-bar"
import {
    Button,
    Dialog,
    DialogHeader,
} from "@material-tailwind/react"
import { useNavigate } from 'react-router-dom'

function ProfileImage({ profile }) {
    const [progress, setProgress] = useState(0)
    const { register, handleSubmit } = useForm()
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open);
    const submit = async (data) => {
        setProgress(progress + 10)
        if (profile) {
            const file = data.image[0] ? await Profile.uploadfile(data.image[0]) : null
            setProgress(progress + 20)
            if (file && profile.ProfileImage !== null) {
                await Profile.deletefile(profile.ProfileImage);
            }
            setProgress(progress + 50)
            await Profile.UpdateProfile(profile.$id, {
                ProfileImage: file ? file.$id : undefined,
            });
            setProgress(progress + 100)
            window.location.reload()
            navigate("/dashboard")

        } else {
            const file = await Profile.uploadfile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.ProfileImage = fileId;
                await Profile.CreateProfile({ ...data, title: userData.name, UserID: userData.$id })
            }
            navigate("/dashboard")
        }
    }


    return (
        <>
          <LoadingBar
                 color='rgb(0 254 226)'
                 progress={progress}
                 onLoaderFinished={() => setProgress(0)}
                />
             <Btn onClick={handleOpen} chidren={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
</svg>

}
                classname={'absolute z-10 top-11 left-24 px-4 py-2'}
                variant="gradient"  >
            </Btn>
            <Dialog open={open} handler={handleOpen}>

                <DialogHeader>Upload Profile image</DialogHeader>
                <form onSubmit={handleSubmit(submit)} className='flex flex-1 flex-col flex-start'>
                    <Inputbox
                        label="Profile Image :"
                        type="file"
                        placeholder="Profile Image"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: true })}
                    />
                    <div className="ms-auto">
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
        </>
    )
}

export default ProfileImage
