import { createSlice } from "@reduxjs/toolkit";

export interface User {
  fullName: string;
  username: string;
  email: string;
  photoProfile: string;
  bio: string;
}

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {
    fullName: "",
    username: "",
    email: "",
    photoProfile: "",
    bio: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: { payload: User }) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
