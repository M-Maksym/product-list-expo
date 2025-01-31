import { Stack } from "expo-router";

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
        options={{ headerTitle: "Products", headerShown: false }}
      />
      <Stack.Screen
        name="productDetails/[productId]"
        options={{ headerTitle: "ProductDetail", headerShown: false }}
      />
    </Stack>
  );
}
