import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {SIGNUP_API} from "../../Server";
import { LOGIN_API } from "../../Server";
let initialState = {
  user: "",
  message: "",
  error: "",
  loading: false,
};
// ------ Signup -----
export const userSignUp = createAsyncThunk(
  "user/userSignUp",
  async (body, thunkAPI) => {
    console.log("Signup data", body);
    const res = await axios.post(`${SIGNUP_API}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      console.log("Signup thunk res:", res.data);
      return res.data
    } else {
      return thunkAPI.rejectWithValue(res.data);
    }
  }
);

//  SignIn
export const userSignIn = createAsyncThunk(
  "user/userSignIn",
  async (body, thunkAPI)=>{
    console.log("SignIn data", body);
    const signInRes = await fetch(`${LOGIN_API}`,{
      method:"post",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(body),
    }) ;

    // debugger
    let data = await signInRes.json();
    if (data.success) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
//Reset Password Email
export const passwordResetEmail = createAsyncThunk(
  "user/passwordResetEmail",
  async (body, thunkAPI) => {
    console.log("Body ", body);
    const res = await fetch(
      "http://localhost:9000/user/send-reset-password-email",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    //debugger
    let data = await res.json();
    if (data.success) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

//Generate Password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (body, thunkAPI) => {
    console.log("reset slice :", body);
    const res = await axios
      .post("http://localhost:9000/user/reset-password", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      });

     
  }
);

// ------- createSlice for all ----
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {           // what is the work of reducers
    clearState: (state) => { //we can difind state with other name
      state.message = "";
      state.user = "";
      state.token = "";
      state.loading = false;
      state.error = "";
      return state;
    }
  },
  extraReducers: {
    // userSignUp  Promise
    [userSignUp.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    },
    [userSignUp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.message = "";
      } else {
        state.message = payload.message;
        state.error = "";
      }
    },
    [userSignUp.rejected]:(state,{payload})=>{
        state.loading=false;
        state.error=payload.error;
        state.message="";
    },

    // userSignIn promise
    [userSignIn.pending]:(state,{payload}) => {
state.loading=true;
    },
    [userSignIn.fulfilled]: (state, { payload }) => {
      //debugger
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        
      } else {
        state.message = payload.message;
        state.token = payload.accessToken;
        state.user = payload.userData;
        localStorage.setItem("message", payload.message);
        localStorage.setItem("user", JSON.stringify(payload.userData));
        localStorage.setItem("token", payload.accessToken);
      }
    },
    [userSignIn.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload.error;
      state.message = "";
    },

    [passwordResetEmail.pending]: (state, { payload }) => {
      // debugger
      state.loading = true;
      state.error = "";
      state.message = "";
    },

    [passwordResetEmail.fulfilled]: (state, { payload }) => { // Destructure payload from action(passwordResetEmail(userEmail,userName ....) )
      //debugger
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.message= "";
      } else {
        state.message = payload.message;
        state.error = "";
      }
    },

    [passwordResetEmail.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      state.message = "";
    },
  
    
    // -------- Generate New Password------------------
    [resetPassword.pending]: (state, { payload }) => {
      // debugger
      state.loading = true;
      state.error = "";
      state.message = "";
    },

    [resetPassword.fulfilled]: (state, { payload }) => {
      //debugger
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.message = "";
      } else {
        state.message = payload.message;
        state.error = "";
      }
    },

    [resetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      // state.error = payload.error;
      state.message = "";
    },

  },
});
export const {clearState}=authSlice.actions;   //?
export default authSlice.reducer;                      // deffrent between default ?