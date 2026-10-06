import { Stack } from "expo-router";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="restaurant/[id]"
          options={{ title: "Restaurant" }}
        />
      </Stack>
    </FavoritesProvider>
  );
}
