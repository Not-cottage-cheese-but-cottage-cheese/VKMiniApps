import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "gameIsStarted",
  initialState: {
    value: false,
    players: {
      1: "Игрок 1",
      2: "Игрок 2",
      3: "Игрок 3",
    },
    spyesId: [],
  },
  reducers: {
    start: (state) => {
      state.value = true;
    },
    end: (state) => {
      state.value = false;
    },
    setPlayers: (state, payload) => {
      state.players = payload.payload;
    },
    setSpyesId: (state, payload) => {
      state.spyesId = payload.payload;
    },
    changePlayerName: (state, payload) => {
      if (payload.payload.id > 0) {
        state.players[payload.payload.id] = payload.payload.name
          ? payload.payload.name
          : `Игрок ${payload.payload.id}`;
      }
    },
  },
});

export const { start, end, setPlayers, changePlayerName, setSpyesId } =
  gameSlice.actions;

export default gameSlice.reducer;
