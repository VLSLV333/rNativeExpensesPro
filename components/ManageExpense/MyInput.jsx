import { StyleSheet, View, Text, TextInput } from "react-native";

import { TextInputMask } from "react-native-masked-text";

import { GlobalStyles } from "../../constants/styles";

const color = GlobalStyles.colors;

export default function MyInput({
  label,
  textInputConfig,
  masked = false,
  maskType,
  maskFormat,
  multi,
  inputStyle,
  textStyle
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
      {!masked && (
        <TextInput
          {...textInputConfig}
          style={[styles.input, multi && styles.inputMulti, inputStyle]}
        />
      )}
      {masked && (
        <TextInputMask
          type={maskType}
          options={{
            format: maskFormat,
          }}
          {...textInputConfig}
          style={[styles.input, inputStyle]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 7,
  },
  label: {
    color: "white",
    fontSize: 12,
    color: color.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: color.primary100,
    color: color.primary700,
    padding: 7,
    borderRadius: 7,
    fontSize: 18,
    borderWidth: 1,
    borderColor: color.primary800,
  },
  inputMulti: {
    textAlignVertical: "top",
    minHeight: 55,
  },
});
