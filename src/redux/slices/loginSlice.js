import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  company_usrnm: "",
  company_name: "",
  is_staff: false,
  date_list: [],
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginInfo: (state, action) => {
      // console.log("in to login Info ", state, action);
      state.company_usrnm = action.payload.username;
      state.company_name = action.payload.company;
      state.is_staff = action.payload.is_staff;
      state.date_list = action.payload.date_list;
    },
    resetState: (state) => {
      return initialState; // Reset the state to the initial state
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginInfo, resetState } = loginSlice.actions;

export default loginSlice.reducer;
