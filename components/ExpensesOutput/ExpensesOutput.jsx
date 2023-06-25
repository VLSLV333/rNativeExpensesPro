import { Text, StyleSheet, View } from 'react-native';

import ExpensesSummary from './ExpensesSummary';

import ExpensesList from './ExpensesList';

import { GlobalStyles } from '../../constants/styles';

const color = GlobalStyles.colors;

export default function ExpensesOutput({ expenses, period, fallbackTxt }) {
  let content = <Text style={styles.infoText}>{fallbackTxt}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList arr={expenses} />;
  }

  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary expenses={expenses} period={period} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: color.primary800,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
