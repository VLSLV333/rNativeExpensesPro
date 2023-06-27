import { setInitialState } from "./expensesSlice";

import replaceSignsInDate from "../helpers/replaceSignsInDate";

import axios from "axios";

export const fetchExpensesData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://expensesapp-v-default-rtdb.firebaseio.com/expenses.json"
      );

      //   if (!response.ok) {
      //     throw new Error("Could not fetch cart data!");
      //   }

      //   {"-NYxLmlnL-kg8IRwZ260": {"amount": "77", "date": "2023/06/27", "description": "Go!"}}

      // {
      //     values: {
      //       id: Math.random(),
      //       description: "Bought PS5",
      //       date: new Date().getTime(),
      //       amount: "25",
      //     },
      //     isValid: { amount: true, date: true, description: true },
      //   },

      const storeArray = [];

      const data = response.data;
      
    //   console.log(cartData)

      for (key in data) {
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

      return storeArray;
    };
    try {
      const cartData = await fetchData();

      if (!cartData) {
        console.log("no cart data");
        return;
      }

      console.log(cartData)

      dispatch(setInitialState(cartData));
    } catch (err) {
      console.log(err);
      //   dispatch(
      //     showCartActions.showNotification({
      //       status: "error",
      //       title: "Error!",
      //       message: "Fetching cart data failed!",
      //     })
      //   );
    }
  };
};
