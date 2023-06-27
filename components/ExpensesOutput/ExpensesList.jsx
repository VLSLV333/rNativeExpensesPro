import { StyleSheet, FlatList, View, Text } from "react-native";

import ExpenseItem from "./ExpenseItem";

export default function ExpensesList({ arr }) {
  function render({ item }) {
    return <ExpenseItem {...item.values} />;
  }

  return <FlatList data={arr} renderItem={render} />;
}

const styles = StyleSheet.create({
  text: {
    marginTop: 15,
  },
});
