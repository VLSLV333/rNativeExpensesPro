import axios from "axios";

import { backendURL } from "../constants/backEndURL";

export async function storeExpense(expenseData) {
  const response = await axios.post(backendURL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export function updateExpense(id, data) {
  return axios.put(backendURL + `/expenses/${id}.json`, data);
}

export function deleteExpense(id) {
  return axios.delete(backendURL + `/expenses/${id}.json`);
}
