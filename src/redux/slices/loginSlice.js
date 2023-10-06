import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    company_usrnm: "",
    company_name: "",
  },
  reducers: {
    loginInfo: (state, action) => {
      state.company_usrnm = action.payload.username;
      state.company_name = action.payload.company;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginInfo } = loginSlice.actions;

export default loginSlice.reducer;
