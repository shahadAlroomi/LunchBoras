import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type Restaurant = {
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

const screenWidth = Dimensions.get("window").width;

export default function RestaurantCard({
  restaurant,
  onPress,
}: RestaurantCardProps) {
  return (
    <Pressable style={s.card} onPress={onPress}>
      <View>
        <Image source={{ uri: restaurant.image }} style={s.restaurantImage} />

        <Pressable style={s.favoriteButton}>
          <Text style={s.heart}>♡</Text>
        </Pressable>
      </View>

      <View style={s.cardContent}>
        <Text style={s.restaurantName}>{restaurant.name}</Text>

        <View style={s.ratingRow}>
          <Text style={s.rating}>★ {restaurant.rating}</Text>

          <Text style={s.distance}>{restaurant.distance}</Text>
        </View>

        <Text style={s.price}>Dagens lunch från {restaurant.price}</Text>

        <Text style={s.openingHours}>🕐 {restaurant.openingHours}</Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    width: screenWidth * 0.72,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginRight: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  restaurantImage: {
    width: "100%",
    height: 145,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 18,
  },
  heart: {
    fontSize: 22,
    color: "#222222",
  },
  cardContent: {
    padding: 14,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "#F0A500",
    fontWeight: "600",
  },
  distance: {
    fontSize: 15,
    color: "#777777",
  },
  price: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 5,
  },
  openingHours: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 22,
  },
});
