import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Restaurant Details</Text>
      <Text>Restaurant {id}</Text>
    </View>
  );
}
