import React, { useEffect } from "react";
import { Navbar } from "../navbar/Navbar";
import "./allBlog.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allBlog } from "../../features/blog/AddBlogSlice";

import comment_btn from "../../assets/message_icon.png";
import like_btn from "../../assets/thumbs_up_icon.png";
import like_btn_on from "../../assets/thumbs_up_iconOn.png";
import { Footer } from "../footer/Footer";

export const AllBlog = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.blog);
  console.log("state data", data);
  const { message, blog } = data;
  console.log(blog);

  useEffect(() => {
    dispatch(allBlog());
  }, [dispatch]);

  const changePic = () => {
    if (true) {
      console.log("this is off btn");
      <img src={like_btn_on} alt="like-btn" />;
    } else {
      console.log("this is on btn");
      <img src={like_btn} alt="like-btn" />;
    }
  };
  return (
    <>
      <Navbar />
      <div className="allBlog">
        <div className="allBlog-1div">
          <div id="allBlog-heading">
            <h3>All Blog</h3>
          </div>
          <Link to={"/add_blog"}>
            <div>
              <button type="button" className="addBlog">
                Add Blog
              </button>
            </div>
          </Link>
        </div>
        {/* we have to make ot details and user can do any thing only lik*/}
        <div className="allBlog-parent">
          <div className="allBlog-child">
            {blog &&
              blog.map(
                ({ _id, title, description, like, blogPic, createdAt }) => (
                  <div className="card" style={{ width: "18rem" }}>
                    <Link
                      to={`/blog_details/${_id}`}
                      key={_id}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className="card-img-top"
                        src={`http://localhost:8000${blogPic}`}
                        alt="Card image cap"
                      />
                    </Link>

                    <div className="card-body">
                      <div className="card-title">
                        <div>
                          <h5>{title}</h5>
                        </div>
                        <div>
                          <small className="text-muted">{createdAt}</small>
                        </div>
                      </div>
                      <div className="card-text ">{description}</div>
                      <div className="card-name">
                        <h6>name</h6>
                        <div id="card-logo">
                          <div>
                            <button id="comment-btn">
                              <img
                                src={comment_btn}
                                id="comment-btn"
                                alt="comment-btn"
                              />
                            </button>
                          </div>
                          <div>
                            <button id="like-btn" onClick={changePic}>
                              <img src={like_btn} alt="like-btn" />
                            </button>
                            {like}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>

        {/* <!-- review description and review are end --> */}
        <Footer />
      </div>
    </>
  );
};
