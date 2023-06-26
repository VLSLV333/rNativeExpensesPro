import { TextInputMask } from "react-native-masked-text";

const App = () => {
  return (
    <TextInputMask
      type={"datetime"}
      options={{
        format: "YYYY/MM/DD",
      }}
      value={inputVal}
      onChangeText={(text) => {
        setInputVal(text);
      }}
    />
  );
};

export default App;
