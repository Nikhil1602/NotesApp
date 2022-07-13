import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
  name: "",
  email: "",
  phone: "",
  country: "",
  code: "",
  state: "",
  city: "",
};

const userReducer = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateImage: (state, action) => {
      state.image = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateCode: (state, action) => {
      state.code = action.payload;
    },
    updatePhone: (state, action) => {
      state.phone = action.payload;
    },
    updateCountry: (state, action) => {
      state.country = action.payload;
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateState: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { updateEmail, updateImage } = userReducer.actions;
export const { updateName, updateCity } = userReducer.actions;
export const { updateCode, updateCountry } = userReducer.actions;
export const { updatePhone, updateState } = userReducer.actions;
export default userReducer.reducer;
