import { View, StyleSheet, Text } from "react-native";

import MyInput from "./MyInput";

import { GlobalStyles } from "../../constants/styles";

const color = GlobalStyles.colors;

export default function ExpenseForm({ styleOuter, setFormObj, formObj }) {
  function inputChangeHandler(which, enteredValue) {
    setFormObj((state) => {
      return {
        values: { ...state?.values, [which]: enteredValue },
        isValid: { ...state?.isValid, [which]: true },
      };
    });
  }

  return (
    <View style={[styles.rootContainer, styleOuter]}>
      <Text style={styles.title}>Your Expense</Text>
      <View
        style={[
          styles.dateAmountContainer,
          (!formObj?.isValid?.amount || !formObj?.isValid?.date) &&
            styles.dateAmountContainerWithError,
        ]}
      >
        <View style={styles.flex1}>
          <MyInput
            label="Amount"
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangeHandler.bind(this, "amount"),
              value: formObj?.values?.amount,
            }}
            inputStyle={!formObj?.isValid?.amount && styles.inputError}
            textStyle={!formObj?.isValid?.amount && styles.errorText}
          />
          {!formObj?.isValid?.amount && (
            <Text style={styles.errorText}>Please, provide correct amount</Text>
          )}
        </View>
        <View style={styles.flex1}>
          <MyInput
            label="Date"
            textInputConfig={{
              placeholder: "YYYY/MM/DD",
              onChangeText: inputChangeHandler.bind(this, "date"),
              value: formObj?.values?.date,
              maxLength: 10,
              autoCorrect: false,
            }}
            maskType={"datetime"}
            maskFormat={"YYYY/MM/DD"}
            masked={true}
            inputStyle={!formObj?.isValid?.date && styles.inputError}
            textStyle={!formObj?.isValid?.date && styles.errorText}
          />
          {!formObj?.isValid?.date && (
            <Text style={styles.errorText}>Please, provide correct date</Text>
          )}
        </View>
      </View>
      <View
        style={[
          styles.descriptionContainer,
          !formObj?.isValid?.description && styles.descriptionContainerWithError,
        ]}
      >
        <MyInput
          label="Description"
          multi={true}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, "description"),
            value: formObj?.values?.description,
          }}
          inputStyle={!formObj?.isValid?.description && styles.inputError}
          textStyle={!formObj?.isValid?.description && styles.errorText}
        />
        {!formObj?.isValid?.description && (
          <Text style={styles.errorText}>Please, provide description</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  rootContainer: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  dateAmountContainer: {
    flexDirection: "row",
    marginBottom: 33.5,
  },
  descriptionContainer: {
    marginBottom: 17,
  },
  errorText: {
    color: color.error500,
  },
  dateAmountContainerWithError: {
    marginBottom: 0,
  },
  descriptionContainerWithError: {
    marginBottom: 0,
  },
  inputError: {
    borderColor: color.error500,
    borderWidth: 1,
    backgroundColor: color.error50,
  },
});
