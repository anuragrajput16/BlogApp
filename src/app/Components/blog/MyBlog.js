import React from "react";
import { Navbar } from "../navbar/Navbar";
import "./myBlog.css";
import { Link } from "react-router-dom";

import my_blog_img from "../../assets/working_people.jpg";
import comment_btn from "../../assets/message_icon.png";
import like_btn from "../../assets/thumbs_up_icon.png";
import { Footer } from "../footer/Footer";

export const MyBlog = () => {
  return (
    <>
      <Navbar />
      <div className="myBlog">
        <div className="myBlog-1div">
          <div>
            <h3>My Blog</h3>
          </div>

          <Link to={"/add_blog"}>
            <div>
              <button type="button" className="addBlog">
                Add Blog
              </button>
            </div>
          </Link>
        </div>
        {/* we have to make ot details user can delete and edit the comment */}
        <div className="myBlog-2div">
          <ul>
            {/* {blog_data && blog_data.map(({}) => (
              <Link
                to={`/blog_details/${_id}`}
                key={_id}
                style={{ textDecoration: "none" }}
              > */}

            {/* this is a blog to uncomment */}
            <div className="card" style={{ width: "18rem" }}>
              <Link to={"/blog_details"} style={{ textDecoration: "none" }}>
                <img
                  className="card-img-top"
                  src={my_blog_img}
                  alt="Card image cap"
                />
              </Link>
              <div className="card-body">
                <div className="card-title">
                  <div>
                    <h5>Card title</h5>
                  </div>
                  <div>
                    <small className="text-muted">date</small>
                  </div>
                </div>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
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
                      <button id="like-btn">
                        <img src={like_btn} alt="like-btn" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* this is a link of blog */}
            {/* </Link>
            ))} */}
          </ul>
        </div>
        {/* <!-- review description and review are end --> */}
        <Footer />
      </div>
    </>
  );
};
