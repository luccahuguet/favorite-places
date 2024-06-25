import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
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
import CoolMap from "../screens/CoolMap";
import { init } from "../util/database";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try {
        await init();
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
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
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                title: "Your Favorite Places",
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
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={() => ({
                title: "Add a New Place",
              })}
            />
            <Stack.Screen
              name="Map"
              component={CoolMap}
              options={() => ({
                title: "Map",
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <StatusBar style="dark" />
    </>
  );
}
