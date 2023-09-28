import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_BLOG_DETAILS } from "../../Server";
import { CREATE_BLOG_API } from "../../Server";
import { ALL_BLOGS_API } from "../../Server";
let initialState = {
  title: "",
  description: "",
  blog: "",
  blogData:"",
  comment: "",
  message: "",
  success: "",
  loading: false,
};
// ------ addBlog-----
export const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (body, thunkAPI) => {
    console.log("addBlog data from body of slice", body);
    const addRes = await axios.post(`${CREATE_BLOG_API}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("after", addRes.data);

    return addRes.data;
  }
);

// ------- allBlog -----
export const allBlog = createAsyncThunk(
  "blog/allBlog",
  async (body, thunkAPI) => {
    const allRes = await axios.get("http://localhost:8000/blog/blogs?search", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("allBlog thunk res:", allRes.data);
    if (allRes.data.success) {
      // console.log("allBlog thunk res:", allRes.data);
      return allRes.data;
    } else {
      return thunkAPI.rejectWithValue(allRes.data);
    }
  }
);

// Blog Details
export const getBlogDetails = createAsyncThunk(
  "blog/getBlogDetails",
  async (id, thunkAPI) => {

    console.log("this is getBlogDetails id", id);
    const res = await axios.get(`${GET_BLOG_DETAILS}${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("get details thunk res:", res.data);
    if (res.data.success) {
      // console.log("allBlog thunk res:", allRes.data);
      return res.data;
    } else {
      return thunkAPI.rejectWithValue(res.data);
    }
  }
);

// ------- createSlice for all ----
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearAddBlogState: (state) => {
      state.title = "";
      state.description = "";
      state.message = "";
      state.comment = "";
      state.loading = false;
      state.success = "";
      state.blogData = "";
      return state;
    },
  },
  extraReducers: {
    // addBlog  Promise
    [addBlog.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [addBlog.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.success) {
        state.blog = payload.blog;
        state.message = payload.message;
      } else {
        state.message = payload.message;

      }
    },
    [addBlog.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = payload.success;
      state.message = "";
    },

    //allBlog promises
    [allBlog.pending]: (state, { payload }) => {
      state.loading = true;
      state.message = "";
      state.success = "";
    },
    [allBlog.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.success) {
        state.message = payload.message;
        state.blog = payload.blog;
      } else {
        state.success = payload.success;
        state.message = payload.message;
      }
    },
    [allBlog.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = "";
      state.message = "";
    },

    // getBlogDetails
    [getBlogDetails.pending]: (state, { payload }) => {
      state.loading = true;
      
    },
    [getBlogDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.success) {
        state.message = payload.message;
        state.blogData = payload.blog;
        state.comment = payload.comment;
      } else {
        state.error = payload.error;
      }
    },

    [getBlogDetails.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});
export const { clearAddBlogState } = blogSlice.actions;
export default blogSlice.reducer;
