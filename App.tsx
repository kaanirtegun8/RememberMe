import "./src/firebase/index";
import * as React from "react";
import { AppRegistry } from "react-native";
import { expo as appConfig } from "./app.json";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigator/appNavigator";
import { AuthProvider } from "./src/providers/authProvider";

const appName = appConfig.name;

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
