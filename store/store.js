import { configureStore } from "@reduxjs/toolkit";

import expensesSlice from "./expensesSlice";

import appStateSlice from "./appStateSlice";

import storeAddInputSlice from "./storeAddInputSlice";

export default configureStore({
  reducer: {
    expensesSlice,
    appStateSlice,
    storeAddInputSlice
  },
});
