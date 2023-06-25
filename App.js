import { StatusBar } from 'expo-status-bar';

import IconButton from './components/UI/IconButton';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import ManageExpense from './screens/ManageExpenses';

import { Provider } from 'react-redux';
import store from './store/store';

import { Ionicons } from '@expo/vector-icons';

import { GlobalStyles } from './constants/styles';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const color = GlobalStyles.colors;

function BottomTabScreens() {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: color.primary500,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerRightContainerStyle: {
          paddingRight: 15,
        },
        headerRight: ({ tintColor }) => (
          <IconButton
            name="add"
            color={tintColor}
            size={33}
            onPress={() => navigation.navigate('ManageExpenses')}
          />
        ),
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: color.primary500,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 1,
          borderTopColor: color.primary800,
        },
        tabBarActiveTintColor: color.accent500,
      })}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="hourglass-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: color.primary500,
              },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="BottomTabScreens"
              component={BottomTabScreens}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpense}
              options={({ navigation }) => ({
                presentation: 'modal',
                headerRight: ({ tintColor }) => (
                  <IconButton
                    size={33}
                    color={tintColor}
                    name={'close-outline'}
                    onPress={() => navigation.goBack()}
                    style={{ paddingRight: 0 }}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
