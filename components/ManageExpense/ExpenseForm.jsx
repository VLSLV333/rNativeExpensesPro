import { View, TextInput, StyleSheet, Text } from "react-native";

import { useState, useEffect, useLayoutEffect } from "react";

import formatDate from "../../helpers/formateDate";

import MyInput from "./MyInput";

export default function ExpenseForm({ styleOuter, setFormObj, formObj }) {
  //   const [inputValues, setInputValues] = useState({
  //     amount: "",
  //     date: "",
  //     description: "",
  //   });

  function inputChangeHandler(which, enteredValue) {
    setFormObj((state) => {
      return { ...state, [which]: enteredValue };
    });
  }
  //   console.log(formObj)

  //   console.log(year);
  //   console.log(month);
  //   console.log(day);

  //   let dateString = "";

  //   const year = new Date(formObj?.date).getFullYear();
  //   let month = new Date(formObj?.date).getMonth();
  //   const day = new Date(formObj?.date).getDate();

  //   if (year) {
  //     if (String(month).length === 1) {
  //       month = "0" + String(month);
  //     }
  //     dateString = "" + year + month + day;
  //   }

  // console.log(formObj.date);

//   let dateString = formatDate(formObj.date);

//   useEffect(() => {
//     dateString = formatDate(formObj.date);
//   }, [formObj.date]);

    // const date = new Date(formObj.date)

    // console.log(date.toISOString());
    // console.log(date.toISOString().slice(0,10));

  return (
    <View style={[styles.rootContainer, styleOuter]}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.dateAmountContainer}>
        <View style={styles.flex1}>
          <MyInput
            label="Amount"
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangeHandler.bind(this, "amount"),
              value: formObj.amount,
            }}
          />
        </View>
        <View style={styles.flex1}>
          <MyInput
            label="Date"
            textInputConfig={{
              placeholder: "YYYY/MM/DD",
              onChangeText: inputChangeHandler.bind(this, "date"),
            //   value: dateString,
              // value: formObj.date,
              //   value: !!year ? dateString : "",
              value: '1010/20/30',
              maxLength: 10,
              autoCorrect: false,
            }}
            maskType={"datetime"}
            maskFormat={"YYYY/MM/DD"}
            masked={true}
          />
        </View>
      </View>
      <MyInput
        label="Description"
        multi={true}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: formObj.description,
        }}
      />
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
  },
});
