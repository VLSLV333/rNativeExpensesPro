import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: Math.random(),
    description: 'Bought PS5',
    date: new Date().getTime(),
    amount: '25',
  },
  {
    id: Math.random(),
    description: 'Bought house',
    date: new Date('2023-05-19').getTime(),
    amount: '45',
  },
  {
    id: Math.random(),
    description: 'Bought Lambo',
    date: new Date('2022-05-10').getTime(),
    amount: '15555',
  },
  {
    id: Math.random(),
    description: 'Bought PS5',
    date: new Date().getTime(),
    amount: '25',
  },
  {
    id: Math.random(),
    description: 'Bought house',
    date: new Date('2023-05-19').getTime(),
    amount: '45',
  },
  {
    id: Math.random(),
    description: 'Bought Lambo',
    date: new Date('2022-05-10').getTime(),
    amount: '155',
  },
  {
    id: Math.random(),
    description: 'Bought PS5',
    date: new Date().getTime(),
    amount: '25',
  },
  {
    id: Math.random(),
    description: 'Bought house',
    date: new Date('2023-05-19').getTime(),
    amount: '45',
  },
  {
    id: Math.random(),
    description: 'Bought Lambo',
    date: new Date('2022-05-10').getTime(),
    amount: '155',
  },
  {
    id: Math.random(),
    description: 'Bought PS5',
    date: new Date().getTime(),
    amount: '25',
  },
  {
    id: Math.random(),
    description: 'Bought house',
    date: new Date('2023-05-19').getTime(),
    amount: '45',
  },
  {
    id: Math.random(),
    description: 'Bought Lambo',
    date: new Date('2022-05-10').getTime(),
    amount: '155',
  },
  {
    id: Math.random(),
    description: 'Bought PS5',
    date: new Date().getTime(),
    amount: '25',
  },
  {
    id: Math.random(),
    description: 'Bought house',
    date: new Date('2023-05-19').getTime(),
    amount: '45',
  },
  {
    id: Math.random(),
    description: 'Bought Lambo',
    date: new Date('2022-05-10').getTime(),
    amount: '155',
  },
  {
    id: Math.random(),
    description: 'Bought PS5',
    date: new Date().getTime(),
    amount: '25',
  },
  {
    id: Math.random(),
    description: 'Bought house',
    date: new Date('2023-05-19').getTime(),
    amount: '45',
  },
  {
    id: Math.random(),
    description: 'Bought Lambo',
    date: new Date('2022-05-10').getTime(),
    amount: '155',
  },
];

const expensesSlice = createSlice({
  name: 'expensesSlice',
  initialState,
  reducers: {
    addExpense: (state, { payload }) => {
      state.push(payload);
    },
    removeExpense: (state, { payload }) => {
      const expenseToChange = state.find((expense) => expense.id === payload);
      state.splice(state.indexOf(expenseToChange), 1);
    },
    editExpense: (state, { payload }) => {
      const expenseToChange = state.find(
        (expense) => expense.id === payload.id
      );

      state.splice(state.indexOf(expenseToChange), 1);
      state.push(payload);
    },
  },
});

export const { addExpense, editExpense, removeExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
