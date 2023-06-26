import { useNavigation } from '@react-navigation/native';

import { StyleSheet, View, Text, Pressable } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

const color = GlobalStyles.colors;

export default function ExpenseItem({ description, amount, date, id }) {
  const navigation = useNavigation();

  const itemPressHandler = () => {
    navigation.navigate('ManageExpenses', { id });
  };

  return (
    <View>
      <Pressable
        onPress={itemPressHandler}
        style={({ pressed }) => [
          styles.rootContainer,
          pressed && styles.pressed,
        ]}
        android_ripple={color.primary700}
      >
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>
            {new Date(date).toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount} numberOfLines={1}>
            {Number(amount).toFixed(2)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 12,
    marginTop: 8,
    backgroundColor: color.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 7,
    elevation: 3,
    shadowColor: color.gray500,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
  },
  pressed: {
    backgroundColor: color.primary700,
  },
  textBase: {
    color: color.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 80,
  },
  amount: {
    color: color.primary500,
    fontWeight: 'bold',
  },
});
