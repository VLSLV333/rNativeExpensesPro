import axios from "axios";

const backendURL = "https://expensesapp-v-default-rtdb.firebaseio.com";

export function storeExpense(expenseData) {
  axios.post(backendURL + "/expenses.json", expenseData);
}

export async function fetchExpenses() {
  const responce = await axios.get(backendURL + "/expenses.json");

//   console.log(responce.data);



}
