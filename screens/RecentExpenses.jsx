import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { fetchExpensesData } from "../store/expensesAsync";

import { setLoading } from "../store/appStateSlice";

import LoadingOverlay from "../components/UI/LoadingOverlay";

import ErrorOverlay from "../components/UI/ErrorOverlay";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

export default function RecentExpenses() {
  const loading = useSelector((state) => state.appStateSlice.loading);
  const errorMessage = useSelector((state) => state.appStateSlice.errorMessage);

  const dispatch = useDispatch();

  const reLoadData = () => {
    dispatch(setLoading(true));
    dispatch(fetchExpensesData());
  };

  useEffect(() => {
    dispatch(fetchExpensesData());
  }, []);

  const weekAgo = new Date().getDate() - 7;

  const recentExpensesArr = useSelector((state) => state.expensesSlice).filter(
    (expense) => new Date(expense.values.date).getDate() >= weekAgo
  );

  if (loading) {
    return <LoadingOverlay />;
  }

  if (
    errorMessage === "Please, check internet connection and try to reload:)"
  ) {
    return (
      <ErrorOverlay
        errorMessage={errorMessage}
        onPress={reLoadData}
        btnTxt="Reload"
      />
    );
  }

  return (
    <ExpensesOutput
      expenses={recentExpensesArr}
      period={"Last 7 days"}
      fallbackTxt={"Please, create your first expense:)"}
    />
  );
}
