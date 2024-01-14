import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { Store } from './components/store/Store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home   from './pages/Home.jsx';
import {AuthLayout,Login }from './components/index.js'
// import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AddPost from './pages/AddPost.jsx';
import AllPosts ,{HandleAllPosts} from './pages/AllPosts.jsx';
import DashBoardPage from './pages/DashBoard.jsx';
import DashBoard from './components/Dashboard/DashBoard.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';
import { ThemeProvider } from "@material-tailwind/react";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children: [
            {
                // loader:HomePostLoader,
                path:"/",
                element:<Home/>
            },
            {
                path:"/login",
                element:(
                    <AuthLayout authentication= {false} >
                        <Login/>
                    </AuthLayout>
                )
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                ),
            },
            {
                // loader:HandleAllPosts,
                path: "/all-posts",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
            {
                path: "/dashboard",
                element: <DashBoardPage/>

                
            }
        ]

    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    
     
    <Provider store={Store}>
        <ThemeProvider>
    <RouterProvider router={router} />
        </ThemeProvider>
    </Provider>
 
     
   
)
