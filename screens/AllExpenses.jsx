import { useSelector } from 'react-redux';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

export default function AllExpenses() {
  const expensesArr = useSelector((state) => state.expensesSlice);
  return <ExpensesOutput expenses={expensesArr} period='Total' fallbackTxt={'Please, create your first expense:)'}/>;
}
