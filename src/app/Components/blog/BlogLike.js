import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { getBlogDetails, LikeBlog } from "../../features/blogs/blogSlice";
// import { addComment } from "../../features/comment/commentSlice";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
 import like1 from "../../assets/thumbs_up_iconOn.png";
 import dislike from "../../assets/thumbs_up_icon.png";
import { Formik, Form, Field, successMessage, ErrorMessage } from "formik";
import * as yup from "yup";

import { Navbar } from "../navbar/Navbar";
import { Footer } from "../footer/Footer";
// import { Dropdown } from "bootstrap";
// import ReactDropdown from "react-dropdown";

const BlogLike = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let res = localStorage.getItem("user");
  let user = JSON.parse(res);   //?
  const { id } = useParams();    //we have taken the id 
  console.log("UseParams id",id);

  const data = useSelector((state) => state.blog); // 2 authslice se data lekr ayega
  const {
    blglist1_msg,
    blgcreate_msg,
    blgDetail_msg,
    blog_details,        //some changes
    blog_comment,
    blog_data,
    loading,
    error,
    success,
  } = data;

  useEffect(() => {
    //useSelector se data lekar show krega
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      //dispatch(clearState());
    }
    if (blgDetail_msg) {
      toast.success(blgDetail_msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      //dispatch(clearState());
      //let path = `Login`;
      //navigate(path);
    }
  }, [error, blgDetail_msg]);

  useEffect(() => {
    //useSelector se data lekar show krega
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      //dispatch(clearState());
    }
    if (blglist1_msg) {
      toast.success(blglist1_msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      //dispatch(clearState());
      //    let path = `Login`;
      //navigate(path);
    }
  }, [error, blglist1_msg]);

  const [like, setLiked] = useState(false);      // for like button we have created a like state to be false
  const [execute, setExecute] = useState();      // two states

  const handleClicked = () => {
    setLiked(!like);                       // code samjhna hai
    setExecute("true");
  };

  const body = {
    id: id,
    like: like,
  };

//   useEffect(() => {
//     dispatch(getBlogDetails(id));          // this code will go on thunk with id
//   }, [dispatch]);

//   useEffect(() => {
//     if (execute) {
//       dispatch(LikeBlog(body));
//     }
//     setExecute("false");
//   }, [like]);

  // useEffect(() => {
  //   dispatch(deleteBlog(id));
  //   //  dispatch(getCompanies());
  // }, [delete]);

  // const handleSubmit = () => {
  //   //  dispatch(deleteBlog(id));
  //   let path = `/moral/${id}`; //path dene k liye
  //   navigate(path);
  // };

  let nameid1 = blog_details.userId && blog_details.userId._id;
  let nameid2 = user._id;

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    //      let path = `/`;
    // navigate(path);
  };

//   formik
  const defaultValue = {
    comment: "",
  };
  const validationSchema = yup.object().shape({
    comment: yup.string().required("please enter your Subject"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    // const user = JSON.parse(localStorage.getItem("user"));
    // const user_obj = { ...values, userId: user._id, blogId: id };
    // console.log("Check :-", user_obj);

    // dispatch(addComment(user_obj));  // this is thunk
    // setShow(false);
  };

  return (
    <>
      <ToastContainer />
    <Navbar/>
      <section>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="blogdetails my-5">
                <div className="blogimg">
                  <img
                    src={`http://localhost:7000$`
                    // {blog_details.blog_pic}`
                    }
                    className="MDimg"
                  />
                </div>
                <div className="blogname mt-3">
                  <h3>Title :- {blog_details.title}</h3>
                  <h4>
                    Written by :-
                    {/* {blog_details && blog_details.userId.name} */}
                  </h4>
                </div>
                <div className="blogcontent">
                  <p>
                    <b>Discription :-</b> {blog_details.discribtion}
                  </p>
                </div>
                <div className="like">
                  <div className="likecomment">
                    {like ? (
                      <img src={like1} onClick={handleClicked} />
                    ) : (
                      <img src={dislike} onClick={handleClicked} />
                    )}
                    <button className="btn logoutbtn" onClick={handleShow}>
                      Comment
                    </button>{" "}
                    {"  "}
                    {show ? (
                      <div>
                        <Formik
                          initialValues={defaultValue}
                          validationSchema={validationSchema}
                          onSubmit={handleSubmit}
                        >
                          <Form className="Cform">
                            <h3>Add Comment</h3>
                            <div className="name">
                              <Field
                                type="text"
                                name="comment"
                                className="form-control"
                                placeholder=" Please Enter your name"
                              />{" "}
                              <p className="text-danger">
                                <ErrorMessage name="comment" />
                              </p>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-success"
                              onSubmit={handleSubmit}
                            >
                              Submit
                            </button>
                            <button
                              className="btn btn-info"
                              type="button"
                              onClick={handleClose}
                            >
                              Close
                            </button>
                          </Form>
                        </Formik>
                      </div>
                    ) : (
                      <small>.</small>
                    )}
                  </div>

                  {nameid1 == nameid2 ? (
                    <div className="dropbtn">
                      <div className="dropdown">
                        <button
                          className="btn editlikebtn dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></button>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to={`/editblog/${id}`}>
                              <button className="btn logoutbtn my-1">
                                Edit
                              </button>
                            </Link>
                            {"  "}
                          </li>
                          <li>
                            <Link to={`/deleteblog/${id}`}>
                              <button className="btn logoutbtn my-1">
                                Delete
                              </button>
                            </Link>{" "}
                            {"  "}
                          </li>
                        </ul>
                      </div>

                      {/* {like ? (
                                                <img src={like1} onClick={handleClicked} style={{ width: "10%", marginTop: "2%" }} />
                                            ) : (
                                                <img src={dislike} onClick={handleClicked} style={{ width: "10%", marginTop: "2%" }} />
                                            )

                                            } */}
                    </div>
                  ) : (
                    <small>.</small>
                  )}
                </div>{" "}
                {/*  like div end */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mainsignup1">
        <div className="container">
          <h3>Comments</h3>
          <hr />

          {blog_comment &&
            blog_comment.map(({ comment, blogId, userId, createdAt }) => (
              <div className="row maincomment my-4">
                <div className="col-2">
                  <img
                    src={`http://localhost:7000${userId.user_profile}`}
                    alt=""
                    className="commentimg"
                  />
                </div>
                <div className="commentdata col-7">
                  <h3>{userId.name}</h3>
                  <p> {createdAt} </p>
                  <p> {comment}</p>
                </div>

                <div className="col-3">
                  {nameid1 == nameid2 ? (
                    <button className="btn logoutbtn my-3">Delete</button>
                  ) : (
                    <button className="btn logoutbtn my-3">Like</button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default BlogLike;