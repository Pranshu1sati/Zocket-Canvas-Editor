import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice.js"; // Make sure the path is correct

const store = configureStore({
  reducer: {
    //bind slice to store
    data: dataReducer,
  },
});

export default store;
