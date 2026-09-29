import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Min sida",
        }}
      />
    </Tabs>
  );
}
