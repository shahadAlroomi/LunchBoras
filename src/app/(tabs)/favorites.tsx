import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import type { Restaurant } from "../../components/RestaurantCard";
import { useFavorites } from "../../context/FavoritesContext";
import { getRestaurants } from "../../services/restaurantApi";

export default function Favorites() {
  const router = useRouter();

  const { favoriteIds, toggleFavorite } = useFavorites();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.log("Favorites error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const favoriteRestaurants = restaurants.filter((restaurant) =>
    favoriteIds.includes(restaurant.id),
  );

  const removeFavorite = (id: number) => {
    toggleFavorite(id);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>Mina favoriter</Text>

      {loading && <Text style={s.message}>Hämtar favoriter...</Text>}

      {!loading && favoriteRestaurants.length === 0 && (
        <Text style={s.message}>Du har inga favoriter ännu ❤️</Text>
      )}

      {!loading &&
        favoriteRestaurants.map((restaurant) => (
          <Pressable
            key={restaurant.id}
            style={s.card}
            onPress={() => router.push(`/restaurant/${restaurant.id}`)}
          >
            <Image source={{ uri: restaurant.image }} style={s.image} />

            <View style={s.info}>
              <Text style={s.name}>{restaurant.name}</Text>

              <Text style={s.address}>{restaurant.address}</Text>

              <Pressable
                style={s.removeButton}
                onPress={(event) => {
                  event.stopPropagation();
                  removeFavorite(restaurant.id);
                }}
              >
                <Text style={s.removeText}>♥ Ta bort favorit</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    textAlign: "center",
    marginTop: 40,
    color: "#777777",
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    overflow: "hidden",
  },
  image: {
    width: 120,
    height: 140,
  },
  info: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 15,
  },
  removeButton: {
    alignSelf: "flex-start",
  },
  removeText: {
    color: "red",
    fontSize: 14,
    fontWeight: "600",
  },
});
