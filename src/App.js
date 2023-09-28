
import "./App.css";
import { UserSignUp } from "./app/Components/auth/UserSignUp";
import { UserLogin } from "./app/Components/auth/UserLogin";
import { BrowserRouter, Route ,Routes } from "react-router-dom";

import { AllBlog } from "./app/Components/blog/AllBlog";
import { MyBlog } from "./app/Components/blog/MyBlog";
import { AddBlog } from "./app/Components/blog/AddBlog";
import { BlogDetails } from "./app/Components/blog/BlogDetails";
import { Demo } from "./app/Components/auth/Demo";
import BlogLike from "./app/Components/blog/BlogLike";


// import {Route,Router,Routes } from "react-router-dom";
function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
         <Route path="/" element={<UserLogin/>}/>   
          <Route path="/user_signup" element={<UserSignUp/>}/>
         <Route path="/all_blog" element={<AllBlog/>}/>
         <Route path="/my_blog" element={<MyBlog/>}/>
         <Route path="/add_blog" element={<AddBlog/>}/>
         <Route path="/blog_details/:id" element={<BlogDetails/>}/>
         <Route path="/blog_like" element={<BlogLike/>}/> 
         <Route path="/demo" element={<Demo/>}/>

         
        </Routes>
      </BrowserRouter> 
       
    
      </>
  );
}

export default App;
