import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BottomTabsNavigator } from "./navigators";

export default function App() {
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <BottomTabsNavigator />
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
