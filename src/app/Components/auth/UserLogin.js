import { Formik, Form, Field, ErrorMessage } from "formik";
import React, {  useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./userLogin.css";
// image
import loginLeftImg from "../../assets/login-blog-left-img.webp";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import google from "../../assets/google.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clearState, userSignIn } from "../../features/auth/authSlice";
export const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);
  const { message, error } = data;
  console.log("Response you get a state", message, error);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearState());
    }
   if (message) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearState());
      navigate("/all_blog");
    }
  },[error,message]);

  // defaultValue
  const defaultValue = {
    userEmail: "",
    userPassword: "",
  };

  // --------------- validationSchema -----------
  const validationSchema = yup.object().shape({
    userEmail: yup.string().email().required("please enter email Id"),
    userPassword: yup.string().required("please enter password"),
  });

  const handleSubmit = (values) => {
    let userObj = { ...values };
    console.log("handleSubmit Values :", userObj);
    dispatch(userSignIn(userObj));
  };

  return (
    <>
    <ToastContainer/>
      <div className="login-parent">
        {/* we have divide login page into two div left 50% and right 50% and parent  */}

        {/* left side div start */}
        <div className="login-left">
          {/* right side img */}
          <div id="login-img">
            <img src={loginLeftImg} alt="Login Img" />
          </div>
          <div id="login-link">
            <Link to={"/user_signup"}>create an account</Link>
          </div>
        </div>
        <Formik
          initialValues={defaultValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div className="login-right">
            <div id="login-heading">Sign in</div>
            <div id="login-form">
              <Form>
                {/* 1 Field */}
                <div>
                  <Field
                    type="email"
                    className="login-form-data"
                    name="userEmail"
                    placeholder="&#xf0e0;    Your Email"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                  />
                  <div>
                    <p className="login-validation">
                      <ErrorMessage name="userEmail" />
                    </p>
                  </div>
                </div>
                {/* 2 field */}
                <div>
                  <Field
                    type="password"
                    name="userPassword"
                    placeholder="&#xf023;    Password"
                    className="login-form-data"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                  />
                  <div>
                    <p className="login-validation">
                      <ErrorMessage name="userPassword" />
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary   login-button"
                  >
                    Login
                  </button>
                </div>
              </Form>
            </div>

            <div className="login-extra-link">
              <div className="or-login-with">
                <h5>Or login with</h5>
              </div>
              <div className="or-login-with">
                <img src={facebook} alt="facebook" />
              </div>
              <div className="or-login-with">
                <img src={twitter} alt="twitter" />
              </div>
              <div className="or-login-with">
                <img src={google} alt="google" />
              </div>
            </div>
          </div>
        </Formik>
      </div>
    </>
  );
};
