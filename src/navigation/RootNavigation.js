import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../auth/AuthContext";
import AppNavigator from "./AppNavigator";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { user } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        // render only if user is not present
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        <Stack.Screen name="App" component={AppNavigator} />
      )}
    </Stack.Navigator>
  );
}
