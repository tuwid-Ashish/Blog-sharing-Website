import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../appwrite/config";
import { Button, Container } from "../components";
import {deletePost} from "../components/store/PostSlice"
import parse from "html-react-parser";
import { useSelector,useDispatch } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    // console.log("the post id data ",userData);
    const isAuthor = post && userData ? post.userID === userData.$id : false;
    // console.log(isAuthor);

    useEffect(() => {
        if (slug) {
            Service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePosts = () => {
        dispatch(deletePost(post.$id))
        console.log("delete file hojiygi");
        Service.DeletePost(post.$id).then((status) => {
            if (status) {
                Service.deletefile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={Service.getfilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button chidren={'Edit'} bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button chidren={'Delete'} bgColor="bg-red-500" onClick={deletePosts}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}