import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: true, errorMessage: null };

const appStateSlice = createSlice({
  name: "appStateSlice",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.errorMessage = payload;
    },
  },
});

export const { setLoading, setError } = appStateSlice.actions;

export default appStateSlice.reducer;
