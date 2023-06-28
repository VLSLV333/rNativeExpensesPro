import { setInitialState } from "./expensesSlice";

import { setLoading, setError } from "./appStateSlice";

import { backendURL } from "../constants/backEndURL";

import replaceSignsInDate from "../helpers/replaceSignsInDate";

import axios from "axios";

export const fetchExpensesData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(backendURL + "/expenses.json");

      const storeArray = [];

      const data = response.data;

      for (const key in data) {
        const expenseObject = {
          values: {
            id: key,
            description: data[key].description,
            amount: data[key].amount,
            date: new Date(replaceSignsInDate(data[key].date)).getTime(),
          },
          isValid: { amount: true, date: true, description: true },
        };
        storeArray.push(expenseObject);
      }

      return storeArray.reverse();
    };
    try {
      const cartData = await fetchData();
      
      dispatch(setInitialState(cartData));
      dispatch(setLoading(false));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setLoading(false));
      dispatch(
        setError("Please, check internet connection and try to reload:)")
      );
    }
  };
};
