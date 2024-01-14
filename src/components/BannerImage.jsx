import React, { useState } from 'react'
import Inputbox from './Inputbox'
import Profile from '../appwrite/Profile'
import { Button as Btn } from "../components"
import { useSelector } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'
import { useForm } from 'react-hook-form'
import {
    Button,
    Dialog,
    DialogHeader,
} from "@material-tailwind/react"
import { useNavigate } from 'react-router-dom'

function BannerImage({ profile, btnstyle }) {
    const { register, handleSubmit } = useForm()
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(0)
    const handleOpen = () => setOpen(!open);
    const submit = async (data) => {
        setProgress(progress + 10)
        if (profile) {
            const file = data.image[0] ? await Profile.uploadfile(data.image[0]) : null
            setProgress(progress + 20)
            if (file && profile.BannerImage !== null) {
                await Profile.deletefile(profile.BannerImage);
            }
            setProgress(progress + 50)
            await Profile.UpdateProfile(profile.$id, {
                BannerImage: file ? file.$id : undefined,
            });
            setProgress(progress + 100)
            // console.log("just close");
            //  handleOpen()
             window.location.reload()
            // console.log("just close2222");

        } else {
            const file = await Profile.uploadfile(data.image[0]);
            console.log("pic uploaded");
            if (file) {
                const fileId = file.$id;
                data.BannerImage = fileId;
                await Profile.CreateProfile({ ...data, title: userData.name, UserID: userData.$id })
                console.log("document created");
                navigate("/dashboard")
            }
        }
    }


    return (
        <>
            <Btn onClick={handleOpen} chidren={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>}
                classname={`${btnstyle}`}
                variant="gradient"  >
            </Btn>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Change Banner Image</DialogHeader>
                <LoadingBar
                 color='rgb(0 254 226)'
                 progress={progress}
                 onLoaderFinished={() => setProgress(0)}
                />
                <form onSubmit={handleSubmit(submit)} className='flex flex-1 flex-col flex-start'>
                    <Inputbox
                        label="Banner Image :"
                        type="file"
                        placeholder="Banner Image"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: true })}
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
        </>
    )
}

export default BannerImage
