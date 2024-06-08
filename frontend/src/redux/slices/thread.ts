import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string;
  photoProfile: string;
}

interface Thread {
  content: string;
  image?: string;
  createdBy: User;
  numberOfReplies: number;
  numberOfLikes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThreadState {
  thread: Thread[];
}

const initialState: ThreadState = {
  thread: [],
};

export const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    setThread: (state, action: { payload: Thread[] }) => {
      state.thread = action.payload;
    },
  },
});

export const { setThread } = threadSlice.actions;
export default threadSlice.reducer;
