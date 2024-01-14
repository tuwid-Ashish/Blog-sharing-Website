import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     posts:[]
}

export const PostSlice = createSlice({
    name:"Post",
    initialState,
    reducers:{
        addPost:(state,action)=>{
            // console.log("enter the game", action.payload);
            const post= action.payload
            
            state.posts.push(post)
        },
        
        deletePost:(state,action)=>{
            state.posts.filter((post)=> post.postdata.$id !== action.payload.$id)
        },
        
        updatePost:(state,action)=>{
            state.posts.map((post)=>post.editable?post.postdata=action.payload:post)
        },
        RemovePosts:(state)=>{
            state.posts = []
        }
    }
})

export const {deletePost,updatePost,addPost,RemovePosts} = PostSlice.actions

const Postreducer = PostSlice.reducer
export default Postreducer