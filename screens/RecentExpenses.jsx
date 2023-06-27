import { useEffect } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

import { useSelector } from "react-redux";

import { fetchExpenses } from "../helpers/httpRequests";

export default function RecentExpenses() {
  const weekAgo = new Date().getDate() - 7;

  const recentExpensesArr = useSelector((state) => state.expensesSlice).filter(
    (expense) => new Date(expense.values.date).getDate() >= weekAgo
  );

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ExpensesOutput
      expenses={recentExpensesArr}
      period={"Last 7 days"}
      fallbackTxt={"Please, create your first expense:)"}
    />
  );
}
