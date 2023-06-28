import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const storeAddInputSlice = createSlice({
  name: "storeAddInputSlice",
  initialState,
  reducers: {
    setAddInput: (state, { payload }) => {
      return state = payload;
    },
  },
});

export const { setAddInput } = storeAddInputSlice.actions;

export default storeAddInputSlice.reducer;
