
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../../features/auth/authSlice";
import thunk from "redux-thunk";
import AddBlogSlice from "../../features/blog/AddBlogSlice";
const store = configureStore(
  {
    reducer: {
      user: AuthSlice,
      blog:AddBlogSlice,
    },
  },
  applyMiddleware(thunk)
);
export default store;
