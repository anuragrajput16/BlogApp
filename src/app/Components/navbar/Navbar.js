import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import blog_logo_image from "../../assets/blog-logo-image.png"
export const Navbar = () => {
  return (
    <>
      <div className="blog-navbar">
        <div >
        <Link to={"/all_blog"}>
          <img src={blog_logo_image} id="blog-logo" alt="blog-icon"/>
        </Link>
        </div>
       <div id="blog-navbar">
        <Link to={"/my_blog"} style={{ textDecoration: "none", }}>
          <div id="blog-myPost">My post</div>
        </Link>
        <Link to={"/all_blog"} style={{ textDecoration: "none" }}>
          <div id="blog-blog">Blog</div>
        </Link>
        <div className="blog-nav-btn">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <div id="blog-login">Login</div>
          </Link>

          <Link to={"/user_signup"} style={{ textDecoration: "none" }}>
            <div id="blog-signup">Signup</div>
          </Link>
        </div>
        </div>
      </div>
    </>
  );
};
