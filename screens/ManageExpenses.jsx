import { useEffect, useLayoutEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { removeExpense, editExpense, addExpense } from "../store/expensesSlice";

import { setLoading, setError } from "../store/appStateSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";

import { setAddInput } from "../store/storeAddInputSlice";

import ErrorOverlay from "../components/UI/ErrorOverlay";

import { StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";

import MyButton from "../components/UI/MyButton";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import formatDate from "../helpers/formateDate";
import replaceSignsInDate from "../helpers/replaceSignsInDate";

import {
  storeExpense,
  updateExpense,
  deleteExpense,
} from "../helpers/httpRequests";

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

  const loading = useSelector((state) => state.appStateSlice.loading);

  const errorMsg = useSelector((state) => state.appStateSlice.errorMessage);

  const savedAddInput = useSelector((state) => state.storeAddInputSlice);

  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (isEditing) {
      setInputValues({
        values: {
          amount: expenseToEdit?.values ? expenseToEdit?.values?.amount : "",
          date: formatDate(expenseToEdit.values.date),
          description: expenseToEdit.values.description,
        },
        isValid: { amount: true, date: true, description: true },
      });
    } else {
      setInputValues({
        values: {
          amount: savedAddInput ? savedAddInput.amount : "",
          date: savedAddInput ? replaceSignsInDate(savedAddInput.date) : "",
          description: savedAddInput ? savedAddInput.description : "",
        },
        isValid: { amount: true, date: true, description: true },
      });
    }
  }, [isEditing, savedAddInput]);

  const dispatch = useDispatch();

  const errorButtonHanlder = () => {
    dispatch(setLoading(false));
    dispatch(setError(null));
  };

  useLayoutEffect(() => {
    if (isEditing) {
      navigation.setOptions({
        title: "Edit Expense",
        headerRight: ({ tintColor }) => (
          <>
            {!errorMsg && (
              <IconButton
                size={33}
                color={tintColor}
                name={"close-outline"}
                onPress={() => navigation.goBack()}
                style={{ paddingRight: 0 }}
              />
            )}
            {errorMsg && (
              <IconButton
                size={33}
                color={tintColor}
                name={"close-outline"}
                onPress={() => errorButtonHanlder()}
                style={{ paddingRight: 0 }}
              />
            )}
          </>
        ),
      });
    } else {
      navigation.setOptions({
        title: "Add Expense",
        headerRight: ({ tintColor }) => (
          <>
            {!errorMsg && (
              <IconButton
                size={33}
                color={tintColor}
                name={"close-outline"}
                onPress={() => navigation.goBack()}
                style={{ paddingRight: 0 }}
              />
            )}
            {errorMsg && (
              <IconButton
                size={33}
                color={tintColor}
                name={"close-outline"}
                onPress={() => errorButtonHanlder()}
                style={{ paddingRight: 0 }}
              />
            )}
          </>
        ),
      });
    }
  }, [isEditing, navigation, errorMsg]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const deleteHandler = async () => {
    dispatch(setLoading(true));

    try {
      await deleteExpense(expenseIdToChange);
      dispatch(removeExpense(expenseIdToChange));
      navigation.goBack();
      dispatch(setLoading(false));
      dispatch(setError(null));
    } catch (e) {
      dispatch(setLoading(false));
      dispatch(
        setError(
          "Couldn`t delete expense:( Please, check internet connection and try again"
        )
      );
    }
  };

  const changeHandler = async (mode) => {
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

    const objectForFirebase = {
      description: inputValues.values.description,
      date: inputValues.values.date,
      amount: inputValues.values.amount,
    };

    if (mode) {
      dispatch(setLoading(true));

      try {
        await updateExpense(expenseIdToChange, objectForFirebase);

        dispatch(
          editExpense({
            values: {
              date: replaceSignsInDate(inputValues.values.date),
              description: inputValues.values.description.trim(),
              amount: inputValues.values.amount.split(",").join("."),
              id: expenseIdToChange,
            },
            isValid: { ...inputValues.isValid },
          })
        );

        navigation.goBack();
        dispatch(setLoading(false));
      } catch (e) {
        dispatch(setLoading(false));
        dispatch(
          setError(
            "Couldn`t update expense:( Please, check internet connection and try again"
          )
        );
      }
    } else {
      dispatch(setLoading(true));
      dispatch(setAddInput(objectForFirebase));

      try {
        const thisExpenseID = await storeExpense(objectForFirebase);

        dispatch(
          addExpense({
            values: {
              ...inputValues.values,
              date: new Date(
                replaceSignsInDate(inputValues.values.date)
              ).getTime(),
              amount: inputValues.values.amount.split(",").join("."),
              id: thisExpenseID,
            },
            isValid: { ...inputValues.isValid },
          })
        );
        navigation.goBack();
        dispatch(setLoading(false));
        dispatch(setAddInput(null));
      } catch (e) {
        dispatch(setLoading(false));
        dispatch(
          setError(
            "Couldn`t add expense:( Please, check internet connection and try again"
          )
        );
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("transitionEnd", (e) => {
      if (e.data.closing && errorMsg) {
        dispatch(setLoading(false));
        dispatch(setError(null));
      }
    });

    return unsubscribe;
  }, [navigation, errorMsg]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (errorMsg) {
    return (
      <ErrorOverlay
        errorMessage={errorMsg}
        onPress={errorButtonHanlder}
        btnTxt="Close"
      />
    );
  }

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
