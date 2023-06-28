import { View, StyleSheet, ActivityIndicator } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const color = GlobalStyles.colors;

export default function LoadingOverlay() {
  return (
    <View style={styles.rootContainer}>
      <ActivityIndicator size="large" color="white" />
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
});
