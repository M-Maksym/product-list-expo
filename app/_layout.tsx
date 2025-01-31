import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import React from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import SplashScreenAnimation from "@/components/ui/SplahScreen";

export default function RootLayout() {
  const [displaySplash, setDisplaySplash] = useState(true);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Alata-Regular": require("../assets/fonts/Alata-Regular.ttf"),
    "Gabarito-Bold": require("../assets/fonts/Gabarito-Bold.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      setDisplaySplash(false);
    }, 2000);
  }, [loaded]);

  return displaySplash ? (
    <SplashScreenAnimation />
  ) : (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
