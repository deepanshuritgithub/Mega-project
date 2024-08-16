import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'

import {RouterProvider , createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home.jsx"
import { AuthLayout, Login } from './components/index.js'
import AddPost from "./pages/AddPost.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import Signup from "./pages/Signup.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"

const router = createBrowserRouter([
  {
    path: "/",//ye to routee hogaa hamaraa 
    element: <App />, //element konsa render krna chahte hai app hi render kr dijiye 
    children: [//children apne app mai ek array hai 
        //so ab yha pe intersting chiz kya hai yha pe object aayenge bhut saree 
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                //yhaa pe paranthesis kya hai , ye actually mai ek wrapper hai ,  ki apko 2-3 element ya div  es trahh se apko send krna hai to app kr sakte hai  , lekin hm kyaa krengee ki hr ek elememt  ko hm auth layout mai wrap krengee , agr apko yaad ho to auth layout hmne bnaya thaa 
                        //AB YHA PE JO DATA pass krungaa authentication  vo ek manual data hai , so login ke liye autentication chiyee kyaa, login ke liye authentication chiye false 
                <AuthLayout authentication={false}>   
                    <Login />
                </AuthLayout>
            ),
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
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                  {/* yha pe authentcation app true likhoo yaa app authnetication = true likhoo ek hi baat hai  */}
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
    ],  
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    {/* <App />    */}
    {/* app dene ke bjaye hmm router provider yhaa pe de dengee or usii se sara kaam ho jayeagaa     */}
    <RouterProvider router={router}/> 
    </Provider >
  </React.StrictMode>,
)
