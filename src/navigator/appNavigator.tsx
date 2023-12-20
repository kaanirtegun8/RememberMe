import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { HomePage } from "../pages/HomePage";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HomePage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomePage" component={HomePage} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
