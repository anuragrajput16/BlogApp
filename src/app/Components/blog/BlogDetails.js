import React, { useEffect, useState } from "react";
import { Navbar } from "../navbar/Navbar";
import "./blogDetails.css";
import blog_details_img from "../../assets/working_people.jpg";
import comment_btn from "../../assets/message_icon.png";
import like_btn from "../../assets/thumbs_up_icon.png";
import {Footer} from "../footer/Footer"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetails } from "../../features/blog/AddBlogSlice";
export const BlogDetails = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  // let res = localStorage.getItem("user");
  // let user = JSON.parse(res);   //?
  // console.log("user",user)
  const { id } = useParams();    //we have taken the id 
  // console.log("UseParams id",id);

  const data = useSelector((state) => state.blog); // 2 authslice se data lekr ayega
  console.log("this is blog data",data);
  

  const {blogData}=data;
  
  const {title,description,like,blogPic,createdAt}=blogData
  
  useEffect(() => {
    dispatch(getBlogDetails(id));
  }, [dispatch]);
  // const { 
  //   blog,
  //   loading,        //some changes
  //   error,
  //   success,
  // } = data;

  const [likes, setLiked] = useState(false);      // for like button we have created a like state to be false
  const [execute, setExecute] = useState();      // two states

  const handleClicked = () => {
    setLiked(!like);                       // code samjhna hai
    setExecute("true");
  };

  const body = {
    id: id,
    like: like,
  };


  return (
    <>
      <Navbar />
      <div className="blog-details">
        <div className="card" style={{ width: "80%" }}>
          <img
            className="card-img-top blog-details-img"
            src={`http://localhost:8000${blogPic}`}
            alt="Card image cap"
          />
          <div className="card-body">
            <div className="card-title">
              <div>
                <h5>{title}</h5>
                <div className="card-name">
                  <h6>name</h6>
                </div>
              </div>
              <div>
                <small className="text-muted">{createdAt}</small>
              </div>
            </div>
            <p className="card-text">
             {description}
            </p>

            <div id="blog-card-logo">
              <div>
                <button id="blog-comment-btn">
                  <img src={comment_btn} id="comment-btn" alt="comment-btn" />
                </button>
              </div>
              <div>
                <button id="blog-like-btn">
                  <img src={like_btn} alt="like-btn" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};
