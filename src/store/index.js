import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/game";
import locationsReducer from "./features/locations";

export default configureStore({
  reducer: {
    game: gameReducer,
    locations: locationsReducer,
  },
});
