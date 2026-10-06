import * as Haptics from "expo-haptics";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useFavorites } from "../context/FavoritesContext";

export type Restaurant = {
  id: number;
  name: string;
  category: string;
  image: string;
  rating: string;
  price: string;
  distance: string;
  openingHours: string;
  address: string;
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
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(restaurant.id);

  const handleFavoritePress = () => {
    toggleFavorite(restaurant.id);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <Pressable style={s.card} onPress={onPress}>
      <View>
        <Image source={{ uri: restaurant.image }} style={s.restaurantImage} />

        <Pressable
          style={s.favoriteButton}
          onPress={handleFavoritePress}
          onPressIn={(event) => event.stopPropagation()}
        >
          <Text style={favorite ? s.heartActive : s.heart}>
            {favorite ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      <View style={s.cardContent}>
        <Text style={s.restaurantName}>{restaurant.name}</Text>

        {restaurant.rating !== "—" && (
          <Text style={s.rating}>★ {restaurant.rating}</Text>
        )}

        {restaurant.price !== "—" && (
          <Text style={s.price}>Dagens lunch från {restaurant.price}</Text>
        )}

        {restaurant.openingHours !== "Ej angivet" && (
          <Text style={s.openingHours}>🕐 {restaurant.openingHours}</Text>
        )}
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
    alignItems: "center",
    justifyContent: "center",
  },
  heart: {
    fontSize: 28,
    color: "#222222",
  },
  heartActive: {
    fontSize: 28,
    color: "orange",
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
  rating: {
    fontSize: 16,
    color: "#F0A500",
    fontWeight: "600",
    marginBottom: 8,
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
