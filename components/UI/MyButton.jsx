import { Pressable, View, Text, StyleSheet } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

const color = GlobalStyles.colors;

export default function MyButton({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          mode === 'flat' ? styles.flat : {},
          pressed && styles.pressed,
        ]}
      >
        <View>
          <Text
            style={[styles.buttonText, mode === 'flat' ? styles.flatText : {}]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 7,
    padding: 8,
    backgroundColor: color.primary500,
    alignItems: 'center',
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: color.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: color.primary300,
    borderRadius: 7,
  },
});
