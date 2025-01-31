import { appColors } from "@/constants/Colors";
import { Redirect, Stack, useRouter } from "expo-router";
export default function AuthRouteLayout() {
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios"
          ? {}
          : {
              headerLargeTitle: false,
              headerTransparent: false,
              headerBlurEffect: "systemChromeMaterial",
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: false,
              headerLargeStyle: {
                backgroundColor: "transparent",
              },
              animation: "slide_from_right",
            }),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Sign In", headerShown: false }}
      />
      <Stack.Screen
        name="enter-password"
        options={{ headerTitle: "Sign in", headerShown: false }}
      />
    </Stack>
  );
}
