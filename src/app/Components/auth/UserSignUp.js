import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./userSignUp.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearState } from "../../features/auth/authSlice";
import { userSignUp } from "../../features/auth/authSlice";
// image
import signUpRightImg from "../../assets/signup-blog-right-img.webp";
import { useDispatch, useSelector } from "react-redux";

export const UserSignUp = () => {
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch(); // why we use useDispatch()?
  const navigate = useNavigate();
  const data = useSelector((state) => state.user); // how it works ?
  const { message, error } = data; //destructure
  console.log("Response", message, error);
  // console.log("user Data",userData);

  useEffect(() => {
    console.log("this is useEffect ");
    if (error) {
      console.log("this is userSignUp ", error);
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch(clearState());
    }
    if (message) {
      console.log("this is userSignUp ", message);
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearState());
      navigate("/");
    }
  }, [error, message]);

  // defaultValue
  const defaultValues = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    userCity: "",
    userState: "",
  };
  const addUserPic = (e) => {
    setProfilePic(e.target.files[0]); // how to take profile pic
  };

  // --------------- validationSchema -----------
  const validationSchema = yup.object().shape({
    userName: yup.string().required("please enter name"),
    userEmail: yup.string().email().required("please enter email Id"),
    userPassword: yup.string().required("please enter password"),
    userPhone: yup.string().required("please enter number"),
    userCity: yup.string().required("please select city"),
    userState: yup.string().required("please select state"),
  });

  const handleSubmit = (values) => {
    console.log("handleSubmit", values);
    let userObj = { ...values, profilePic: profilePic };
    console.log("handleSubmit Values :", userObj);
    dispatch(userSignUp(userObj));
  };

  return (
    <>
      <div className="signUp-parent">
        {/* we have divide signup page into two div left 50% and right 50% and parent  */}

        <div className="signUp-left">
          <div id="signUp-heading">Sign up</div>
          <Formik
            initialValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <div id="signUp-form">
              <Form>
                {/* 1 field */}
                <div>
                  <Field
                    type="text"
                    className="signUp-form-data"
                    name="userName"
                    placeholder="&#xf007;  Your Name"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                  />
                  <div>
                    <p className="signUp-validation">
                      <ErrorMessage name="userName" />
                    </p>
                  </div>
                </div>

                {/* 2 Field */}
                <div>
                  <Field
                    type="email"
                    className="signUp-form-data"
                    name="userEmail"
                    placeholder="&#xf0e0;  Your Email"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                  />
                  <div>
                    <p className="signUp-validation">
                      <ErrorMessage name="userEmail" />
                    </p>
                  </div>
                </div>
                {/* 3 field */}
                <div>
                  <Field
                    type="password"
                    name="userPassword"
                    placeholder="&#xf023;  Password"
                    className="signUp-form-data"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                  />
                  <div>
                    <p className="signUp-validation">
                      <ErrorMessage name="userPassword" />
                    </p>
                  </div>
                </div>
                {/* 4 field */}

                <div>
                  <Field
                    type="number"
                    name="userPhone"
                    placeholder="&#xf0e0;  Phone Number"
                    className="signUp-form-data"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                  />
                  <div>
                    <p className="signUp-validation">
                      <ErrorMessage name="userPhone" />
                    </p>
                  </div>
                </div>
                {/* 5 field */}
                <div>
                  <Field
                    type="field"
                    as="select"
                    className="signUp-form-data"
                    name="userCity"
                    placeholder="&#xf64f; City"
                    style={{
                      fontFamily: "Arial, FontAwesome",
                      color: "#746a6a",
                    }}
                  >
                    <option
                      value=""
                      disabled
                      style={{ fontFamily: "Arial, FontAwesome" }}
                    >
                      &#xf64f; City
                    </option>
                    <option value="Indore">Indore</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                  </Field>
                  <div>
                    <p className="signUp-validation">
                      <ErrorMessage name="userCity" />
                    </p>
                  </div>
                </div>
                {/* 6 field */}
                <div>
                  <Field
                    type="field"
                    as="select"
                    className="signUp-form-data"
                    name="userState"
                    placeholder="&#xf3c5;  State"
                    style={{
                      fontFamily: "Arial, FontAwesome",
                      color: "#746a6a",
                    }}
                  >
                    <option
                      value=""
                      disabled
                      style={{ fontFamily: "Arial, FontAwesome" }}
                    >
                      &#xf3c5; {""}State
                    </option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value=" Karnataka"> Karnataka</option>
                    <option value="Telangana ">Telangana </option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </Field>
                  <div>
                    <p className="signUp-validation">
                      <ErrorMessage name="userState" />
                    </p>
                  </div>
                </div>
                {/* 7 field */}
                <div>
                  <Field
                    onChange={(e) => addUserPic(e)}
                    className="signUp-form-data"
                    type="file"
                    name="profilePic"
                    style={{ border: "none" }}
                  />
                  <div>
                    <p className="signUp-validation">
                      <ErrorMessage name="profile" />
                    </p>
                  </div>
                </div>
                <div className="register-button">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg  signUp-button"
                  >
                    Register
                  </button>
                </div>
              </Form>
            </div>
          </Formik>
        </div>

        {/* Right side div start */}
        <div className="signUp-right">
          {/* right side img */}

          <div id="signUp-img">
            <img src={signUpRightImg} alt="SignUp Img" />
          </div>
          <div id="signIn-link">
            <Link to={"/"}>I am already member</Link>
          </div>
        </div>
      </div>
    </>
  );
};
