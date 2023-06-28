import { View, StyleSheet, Text } from "react-native";

import { GlobalStyles } from "../../constants/styles";

import MyButton from "./MyButton";

const color = GlobalStyles.colors;

export default function ErrorOverlay({ errorMessage, onPress, btnTxt }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.text, styles.title]}>An error occured</Text>
      <Text style={styles.text}>{errorMessage}</Text>
      <MyButton onPress={onPress} btnTextStyle={styles.btnText}>
        {btnTxt}
      </MyButton>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: color.primary800,
  },
  text: {
    textAlign: "center",
    marginBottom: 7,
    color: color.error50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  btnText: {
    color: color.error50,
  },
});
