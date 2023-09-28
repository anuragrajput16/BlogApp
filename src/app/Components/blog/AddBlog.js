import React, { useEffect, useState } from "react";
import { Navbar } from "../navbar/Navbar";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import "./addBlog.css";
import { toast, ToastContainer } from "react-toastify";

import { addBlog, clearAddBlogState } from "../../features/blog/AddBlogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const AddBlog = () => {
  const [blogPic, setBlogPic] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.blog);
  const { message, success } = data;
  console.log("Response", message, success);

  useEffect(() => {

      
      if (!success) {
          console.log("this is useEffect error ", success);
      // toast.error(success, {
      //   position: toast.POSITION.TOP_CENTER,}
        
      dispatch(clearAddBlogState());
      
    };
    
    if (message === "Blog published successfully") {
      console.log("this is userSignUp ", message);
      toast.success (message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearAddBlogState());
      navigate("/all_blog");
    }
});

// defaultValues of formik
const defaultValues = {
  title: "",
  description: "",
};
const addBlogPic = (e) => {
  setBlogPic(e.target.files[0]); // how to take profile pic
};

// validationSchema of formik
const validationSchema = yup.object().shape({
  title: yup.string().required("pleas enter title"),
  description: yup.string().required("pleas enter description"),
});
//  handle on submit
const handleSubmit = (values) => {
  const addBlogObj = { ...values, blogPic: blogPic };
  console.log("handleSubmitAddBlogObj", addBlogObj);
  dispatch(addBlog(addBlogObj));  //we are dispatching thunk and its data.
  };
  
  return (
      <>
      <ToastContainer/>
      <Navbar />
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="addBlog-parent">
          
        <div className="addBlog-box shadow p-3 mb-5 bg-white rounded">
            <div>
              <h2 id="add-blog">Add Blog</h2>
            </div>
              <Form className="form">
                <div>
                  <Field
                    className="addBlog-form-data"
                    type="text"
                    name="title"
                    placeholder="Title"
                  />
                  <div>
                    <p className="addBlog-validation">
                      <ErrorMessage name="title" />
                    </p>
                  </div>
                </div>

                {/* 2 Field */}
                <div>
                  <Field
                    className="addBlog-form-data"
                    as="textarea"
                    rows="4"
                    cols="5"
                    name="description"
                    placeholder="Description..."
                  />
                  <div>
                    <p className="addBlog-validation">
                      <ErrorMessage name="description" />
                    </p>
                  </div>
                </div>
                {/* field 3 */}
                <div>
                  <Field
                    onChange={addBlogPic}
                    className="addBlog-form-data"
                    type="file"
                    name="blogPic"
                    style={{ border: "none" }}
                  />
                  <div>
                    <p className="addBlog-validation">
                      <ErrorMessage name="blogPic" />
                    </p>
                  </div>
                </div>
                <div>
                  <button type="submit" className="addBlog-btn">save</button>
                </div>
              </Form>
        
          </div>
        
        </div>
      </Formik>
    </>
  );
};
