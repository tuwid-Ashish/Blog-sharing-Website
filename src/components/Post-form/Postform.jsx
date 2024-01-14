import React, { useCallback, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Selectbox, RTE, Button, Inputbox, } from "../index"
import Service from '../../appwrite/config'
import { useForm } from 'react-hook-form'
import { addPost, updatePost } from '../store/PostSlice'
import LoadingBar from "react-top-loading-bar"
export default function Postform({ post }) {
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || "",
            content: post?.content || " ",
            status: post?.status || "active",
        }

    })

    const submit = async (data) => {
        setProgress(progress + 10)
        if (post) {
            console.log("the post is avaible");
            const file = data.image[0] ? await Service.uploadfile(data.image[0]) : null;
            setProgress(progress + 20)
            if (file && post.featuredImage !== null) {
                await Service.deletefile(post.featuredImage);
            }
            console.log("After delete ");
            setProgress(progress + 50)
            const dbPost = await Service.UpdatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            setProgress(progress + 70)
            post.$id = data.slug,
                console.log(post.$id);

            if (dbPost) {
                dispatch(updatePost(dbPost))
                setProgress(progress + 100)
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            setProgress(progress + 10)
            const file = await Service.uploadfile(data.image[0]);
            console.log("enter the process");
            setProgress(progress + 23)
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await Service.CreatePost({ ...data, userID: userData.$id });
                setProgress(progress + 40)
                if (dbPost) {
                    console.log(dbPost.$id);
                    dispatch(addPost(dbPost))
                    setProgress(progress + 100)
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        }
        return "";
    }, []);

    useEffect(() => {

        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })
        return () => {
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <LoadingBar
                 color='rgb(0 254 226)'
                 progress={progress}
                 onLoaderFinished={() => setProgress(0)}
                />
            <div className="w-2/3 px-2">
                <Inputbox
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Inputbox
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} default_value={getValues('content')} />
            </div>
            <div className="w-1/3 px-2">
                <Inputbox
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={Service.getfilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Selectbox
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button chidren={post ? "Update" : "Submit"} bgColor={post ? "bg-green-400" : "bg-blue-600"}></Button>
            </div>
        </form>
    )
}


