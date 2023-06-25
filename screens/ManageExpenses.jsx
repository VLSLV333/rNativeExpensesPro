import { useLayoutEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { removeExpense, editExpense, addExpense } from '../store/expensesSlice';

import { StyleSheet, Text, View } from 'react-native';

import IconButton from '../components/UI/IconButton';

import MyButton from '../components/UI/MyButton';

import { GlobalStyles } from '../constants/styles';

const color = GlobalStyles.colors;

export default function ManageExpense({ route, navigation }) {
  const expenseIdToChange = route?.params?.id;
  const isEditing = !!expenseIdToChange;

  const expenseToEdit = useSelector((state) => state.expensesSlice).filter(
    (expense) => expense.id === expenseIdToChange
  );

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (isEditing) {
      navigation.setOptions({ title: 'Edit Expense' });
    } else {
      navigation.setOptions({ title: 'Add Expense' });
    }
  }, [isEditing, navigation]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const deleteHandler = () => {
    dispatch(removeExpense(expenseIdToChange));
    navigation.goBack();
  };

  const changeHandler = (mode) => {
    if (mode) {
      dispatch(editExpense(expenseToEdit));
    } else {
      dispatch(
        //insert real input
        addExpense({
          id: Math.random(),
          title: 'Julia',
          date: new Date().getTime(),
          amount: '1000',
        })
      );
    }
    navigation.goBack();
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttonsContainer}>
        <MyButton mode="flat" onPress={cancelHandler} style={styles.buttons}>
          Cancel
        </MyButton>
        <MyButton
          onPress={() => changeHandler(isEditing)}
          style={styles.buttons}
        >
          {isEditing ? 'Edit' : 'Add'}
        </MyButton>
      </View>
      <View style={styles.deleteContainer}>
        {isEditing && (
          <IconButton
            name="trash"
            size={40}
            color={color.error500}
            onPress={deleteHandler}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: color.primary700,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 7,
    borderTopWidth: 2,
    borderTopColor: color.primary200,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    minWidth: 120,
  },
});
