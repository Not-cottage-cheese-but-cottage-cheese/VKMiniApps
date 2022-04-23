import { createSlice } from "@reduxjs/toolkit";

export const locationsSlice = createSlice({
  name: "locations",
  initialState: {
    nextLocationId: 0,
    locations: {},
  },
  reducers: {
    removeLocation(state, payload) {
      if (state.locations.hasOwnProperty(payload.payload)) {
        delete state.locations[payload.payload];
      }
    },
    setLocation(state, payload) {
      state.locations[state.nextLocationId] = payload.payload;
      state.nextLocationId++;
    },
  },
});

export const { setLocation, removeLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
