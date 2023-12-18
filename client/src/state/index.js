import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  posts: [],
  friends:[],
  currentfriends:[], //friends of the current user whose profile is openend
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setfriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setCurrentfriends: (state, action) => {
      
        state.currentfriends = action.payload.friends;
      
    },
  },
});

export const { setMode, setLogin, setLogout, setfriends , setPosts, setPost, setCurrentfriends } =
  authSlice.actions;
export default authSlice.reducer;