import { createSlice } from "@reduxjs/toolkit";
import addData from "../data/data";

const dataSlice = createSlice({
  name: "data",
  initialState: addData,
  reducers: {
    //change the caption
    setCaptionText: (state, action) => {
      state.caption.text = action.payload;
    },
    //change the CTA Text
    setCtaText: (state, action) => {
      state.cta.text = action.payload;
    },
    // to change background color
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    // setImage
    setUserImage: (state, action) => {
      state.urls.userImage = action.payload;
    },
  },
});

export const { setCaptionText, setCtaText, setBackgroundColor, setUserImage } =
  dataSlice.actions;
export default dataSlice.reducer; // Ensure only the reducer is exported as default
