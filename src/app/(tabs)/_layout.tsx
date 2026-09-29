import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size }) => (
            <Ionicons name="home-outline" size={size} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ size }) => (
            <Ionicons name="heart-outline" size={size} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Min sida",
          tabBarIcon: ({ size }) => (
            <Ionicons name="person-outline" size={size} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
