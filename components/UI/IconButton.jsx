import { Ionicons } from '@expo/vector-icons';

import { Pressable, StyleSheet, View } from 'react-native';

export default function IconButton({ name, color, size, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.container, style]}>
        <Ionicons name={name} color={color} size={size} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
  },
  pressed: {
    opacity: 0.55,
  },
});
