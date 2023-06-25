import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

import { useSelector } from 'react-redux';

export default function RecentExpenses() {
  const weekAgo = new Date().getDate() - 7;

  const recentExpensesArr = useSelector((state) => state.expensesSlice).filter(
    (expense) => new Date(expense.date).getDate() >= weekAgo
  );

  return (
    <ExpensesOutput
      expenses={recentExpensesArr}
      period={'Last 7 days'}
      fallbackTxt={'Please, create your first expense:)'}
    />
  );
}
