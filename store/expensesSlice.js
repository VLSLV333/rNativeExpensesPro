import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    values: {
      id: Math.random(),
      description: "Bought PS5",
      date: new Date().getTime(),
      amount: "25",
    },
    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought house",
      date: new Date("2023-05-25").getTime(),
      amount: "45",
    },
    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought Lambo",
      date: new Date("2022-05-10").getTime(),
      amount: "155",
    },
    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought PS5",
      date: new Date().getTime(),
      amount: "25",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought house",
      date: new Date("2023-05-25").getTime(),
      amount: "45",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought Lambo",
      date: new Date("2022-05-10").getTime(),
      amount: "155",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought PS5",
      date: new Date().getTime(),
      amount: "25",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought house",
      date: new Date("2023-05-25").getTime(),
      amount: "45",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought Lambo",
      date: new Date("2022-05-10").getTime(),
      amount: "155",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought PS5",
      date: new Date().getTime(),
      amount: "25",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought house",
      date: new Date("2023-05-25").getTime(),
      amount: "45",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought Lambo",
      date: new Date("2022-05-10").getTime(),
      amount: "155",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought PS5",
      date: new Date().getTime(),
      amount: "25",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought house",
      date: new Date("2023-05-25").getTime(),
      amount: "45",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought Lambo",
      date: new Date("2022-05-10").getTime(),
      amount: "155",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought PS5",
      date: new Date().getTime(),
      amount: "25",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought house",
      date: new Date("2023-05-25").getTime(),
      amount: "45",
    },

    isValid: { amount: true, date: true, description: true },
  },
  {
    values: {
      id: Math.random(),
      description: "Bought Lambo",
      date: new Date("2022-05-10").getTime(),
      amount: "155",
    },

    isValid: { amount: true, date: true, description: true },
  },
];

const expensesSlice = createSlice({
  name: "expensesSlice",
  initialState,
  reducers: {
    addExpense: (state, { payload }) => {
      state.unshift(payload);
    },
    removeExpense: (state, { payload }) => {
      const expenseToChange = state.find((expense) => expense.values.id === payload);
      state.splice(state.indexOf(expenseToChange), 1);
    },
    editExpense: (state, { payload }) => {
      const expenseToChange = state.find(
        (expense) => expense.values.id === payload.values.id
      );
      state.splice(state.indexOf(expenseToChange), 1, payload);
    },
  },
});

export const { addExpense, editExpense, removeExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
