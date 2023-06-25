import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

const color = GlobalStyles.colors;

export default function ExpensesSummary({ expenses, period }) {
  const amount = expenses.reduce((sum, exspense) => sum + +exspense.amount, 0);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.sum}>${amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 15,
    backgroundColor: color.primary50,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 14,
    color: color.primary400,
  },
  sum: {
    fontSize: 16,
    color: color.primary500,
    fontWeight: 'bold',
  },
});
