import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const { data } = await axios(`${apiUrl}/users`);
  return data;
});

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  const { data } = await axios(`${apiUrl}/posts`);
  return data;
});

export const fetchComments = createAsyncThunk("fetchComments", async () => {
  const { data } = await axios(`${apiUrl}/comments`);
  return data;
});

export const addPost = createAsyncThunk("addPost", async (post) => {
  const { data } = await axios.post(`${apiUrl}/posts`, post);
  return data;
});

export const deletePost = createAsyncThunk("deletePost", async (id) => {
  const { data } = await axios.delete(`${apiUrl}/posts/${id}`);
  return data;
});

export const addComment = createAsyncThunk("addComment", async (comment) => {
  const { data } = await axios.post(`${apiUrl}/comments`, comment);
  return data;
});

export const slice = createSlice({
  name: "data",
  initialState: { users: [], posts: [], comments: [], status: null },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.status = "success";
    },
    [fetchUsers.rejected]: (state) => {
      state.status = "failed";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "success";
    },
    [fetchPosts.rejected]: (state) => {
      state.status = "failed";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.status = "success";
    },
    [fetchComments.rejected]: (state) => {
      state.status = "failed";
    },
    [addPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
      state.status = "success";
    },
    [addPost.rejected]: (state) => {
      state.status = "failed";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.status = "success";
    },
    [deletePost.rejected]: (state) => {
      state.status = "failed";
    },
    [addComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload);
      state.status = "success";
    },
    [addComment.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default slice.reducer;
