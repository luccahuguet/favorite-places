import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AddPlace from "../screens/AddPlace";
import AllPlaces from "../screens/AllPlaces";
import * as SplashScreen from "expo-splash-screen";
import IconButton from "../components/UI/IconButton";
import { Colors } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.light.primary500,
              },
              headerTintColor: Colors.light.gray700,
              contentStyle: { backgroundColor: Colors.light.gray700 },
            }}
          >
            <Stack.Screen
              name="Your Favorite Places"
              component={AllPlaces}
              options={({ navigation }) => ({
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="add-outline"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate("AddPlace")}
                  />
                ),
              })}
            />
            <Stack.Screen name="Add a Place" component={AddPlace} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <StatusBar style="dark" />
    </>
  );
}
