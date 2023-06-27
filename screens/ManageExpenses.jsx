import { useLayoutEffect, useState } from "react";

import { Alert } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { removeExpense, editExpense, addExpense } from "../store/expensesSlice";

import { StyleSheet, Text, TextInput, View } from "react-native";

import IconButton from "../components/UI/IconButton";

import MyButton from "../components/UI/MyButton";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import formatDate from "../helpers/formateDate";
import replaceSignsInDate from "../helpers/replaceSignsInDate";

import { storeExpense } from "../helpers/httpRequests";

import { GlobalStyles } from "../constants/styles";

const color = GlobalStyles.colors;

export default function ManageExpense({ route, navigation }) {
  const expenseIdToChange = route?.params?.id;
  const isEditing = !!expenseIdToChange;

  let amountIsValid = null;
  let dateIsValid = null;
  let descriptionValid = null;

  const expenseToEdit = useSelector((state) => state.expensesSlice).find(
    (expense) => expense.values.id === expenseIdToChange
  );

  const [inputValues, setInputValues] = useState({
    values: {
      amount: expenseToEdit ? expenseToEdit.values.amount : "",
      date: expenseToEdit ? formatDate(expenseToEdit.values.date) : "",
      description: expenseToEdit ? expenseToEdit.values.description : "",
      id: expenseToEdit ? expenseToEdit.values.id : Math.random(),
    },
    isValid: { amount: true, date: true, description: true },
  });

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
    amountIsValid =
      !isNaN(Number(inputValues.values.amount.split(",").join("."))) &&
      Number(inputValues.values.amount.split(",").join(".")) > 0;
    dateIsValid =
      new Date(replaceSignsInDate(inputValues.values.date)).toString() !==
      "Invalid Date";
    descriptionValid = inputValues.values.description.trim().length > 0;

    if (amountIsValid || dateIsValid || descriptionValid) {
      if (amountIsValid) {
        setInputValues((state) => ({
          values: state.values,
          isValid: { ...state.isValid, amount: amountIsValid },
        }));
      }
      if (dateIsValid) {
        setInputValues((state) => ({
          values: state.values,
          isValid: { ...state.isValid, date: dateIsValid },
        }));
      }
      if (descriptionValid) {
        setInputValues((state) => ({
          values: state.values,
          isValid: { ...state.isValid, description: descriptionValid },
        }));
      }
    }

    if (!amountIsValid || !dateIsValid || !descriptionValid) {
      if (!amountIsValid) {
        setInputValues((state) => ({
          values: state.values,
          isValid: { ...state.isValid, amount: amountIsValid },
        }));
      }
      if (!dateIsValid) {
        setInputValues((state) => ({
          values: state.values,
          isValid: { ...state.isValid, date: dateIsValid },
        }));
      }
      if (!descriptionValid) {
        setInputValues((state) => ({
          values: state.values,
          isValid: { ...state.isValid, description: descriptionValid },
        }));
      }
      return;
    }

    if (mode) {
      dispatch(
        editExpense({
          values: {
            ...inputValues.values,
            date: replaceSignsInDate(inputValues.values.date),
            description: inputValues.values.description.trim(),
            amount: inputValues.values.amount.split(",").join("."),
          },
          isValid: { ...inputValues.isValid },
        })
      );
    } else {
      dispatch(
        addExpense({
          values: {
            ...inputValues.values,
            date: new Date(
              replaceSignsInDate(inputValues.values.date)
            ).getTime(),
            amount: inputValues.values.amount.split(",").join("."),
          },
          isValid: { ...inputValues.isValid },
        })
      );
      const objectForFirebase = {
        // values: {
        description: inputValues.values.description,
        date: inputValues.values.date,
        amount: inputValues.values.amount,
        // },
        // isValid: { amount: true, date: true, description: true },
      };

      storeExpense(objectForFirebase);
    }
    navigation.goBack();
  };

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
