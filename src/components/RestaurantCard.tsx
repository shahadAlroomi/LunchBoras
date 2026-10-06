import { Image, Pressable, Text, View } from "react-native";

type Restaurant = {
  id: number;
  name: string;
  category: string;
  image: string;
  rating: string;
  price: string;
  distance: string;
  openingHours: string;
};

type RestaurantCardProps = {
  restaurant: Restaurant;
  onPress: () => void;
};

export default function RestaurantCard({
  restaurant,
  onPress,
}: RestaurantCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Image source={{ uri: restaurant.image }} />

        <Text>♡</Text>

        <Text>{restaurant.name}</Text>

        <Text>★ {restaurant.rating}</Text>

        <Text>{restaurant.distance}</Text>

        <Text>Dagens lunch från {restaurant.price}</Text>

        <Text>🕐 {restaurant.openingHours}</Text>
      </View>
    </Pressable>
  );
}
