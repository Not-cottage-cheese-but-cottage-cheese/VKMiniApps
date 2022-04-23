import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "gameIsStarted",
  initialState: {
    value: false,
  },
  reducers: {
    start: (state) => {
      state.value = true;
    },
    end: (state) => {
      state.value = false;
    },
  },
});

export const { start, end } = gameSlice.actions;

export default gameSlice.reducer;
