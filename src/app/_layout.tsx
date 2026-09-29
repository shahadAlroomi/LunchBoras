import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="restaurant/[id]" options={{ title: "Restaurant" }} />
    </Stack>
  );
}
