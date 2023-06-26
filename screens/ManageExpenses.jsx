import { useLayoutEffect, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { removeExpense, editExpense, addExpense } from "../store/expensesSlice";

import { StyleSheet, Text, TextInput, View } from "react-native";

import IconButton from "../components/UI/IconButton";

import MyButton from "../components/UI/MyButton";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import { GlobalStyles } from "../constants/styles";

const color = GlobalStyles.colors;

export default function ManageExpense({ route, navigation }) {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  const expenseIdToChange = route?.params?.id;
  const isEditing = !!expenseIdToChange;

  const expenseToEdit = useSelector((state) => state.expensesSlice).filter(
    (expense) => expense.id === expenseIdToChange
  )[0];

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (isEditing) {
      navigation.setOptions({ title: "Edit Expense" });
    } else {
      navigation.setOptions({ title: "Add Expense" });
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
      dispatch(editExpense(inputValues));
    } else {
      dispatch(
        //insert real input
        addExpense({
          ...formObj,
          date: new Date(formObj.date).getTime(),
          id: Math.random(),
        })
      );
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (expenseToEdit?.id) {
      setInputValues(expenseToEdit);
    }
  }, [expenseToEdit]);

  return (
    <View style={styles.rootContainer}>
      <ExpenseForm
        styleOuter={styles.form}
        setFormObj={setInputValues}
        formObj={inputValues}
      />
      <View style={styles.notForm}>
        <View style={styles.buttonsContainer}>
          <MyButton mode="flat" onPress={cancelHandler} style={styles.buttons}>
            Cancel
          </MyButton>
          <MyButton
            onPress={() => changeHandler(isEditing)}
            style={styles.buttons}
          >
            {isEditing ? "Edit" : "Add"}
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
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    minWidth: 120,
  },
  form: {
    flex: 2,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  notForm: {
    flex: 2,
  },
});
