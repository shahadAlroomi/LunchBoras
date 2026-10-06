import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import CategoryFilter from "../../components/CategoryFilter";
import FavoritesButton from "../../components/FavoritesButton";
import Header from "../../components/Header";
import LunchCard from "../../components/LunchCard";
import RestaurantCard from "../../components/RestaurantCard";
import SearchBar from "../../components/SearchBar";
import { getRestaurants } from "../../services/restaurantApi";
import type { Restaurant } from "../../components/RestaurantCard";

export default function HomeScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alla");

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.log(error);
        setError("Kunde inte hämta restauranger.");
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "Alla" || restaurant.category === selectedCategory),
  );

  return (
    <ScrollView
      contentContainerStyle={s.container}
      showsVerticalScrollIndicator={false}
    >
      <Header onProfilePress={() => router.push("/(tabs)/profile")} />

      <SearchBar search={search} setSearch={setSearch} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>Populära restauranger</Text>

        <Pressable onPress={() => setSelectedCategory("Alla")}>
          <Text style={s.seAlla}>Se alla</Text>
        </Pressable>
      </View>

      {loading && <Text style={s.message}>Hämtar restauranger...</Text>}

      {error !== "" && <Text style={s.error}>{error}</Text>}

      {!loading && error === "" && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={s.restaurantList}
        >
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onPress={() => router.push(`/restaurant/${restaurant.id}`)}
            />
          ))}
        </ScrollView>
      )}

      <Text style={s.lunchTitle}>Dagens lunch</Text>

      <LunchCard onPress={() => router.push("/restaurant/1")} />

      <FavoritesButton onPress={() => router.push("/(tabs)/favorites")} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222222",
  },
  seAlla: {
    fontSize: 17,
    fontWeight: "600",
    color: "#555555",
  },
  restaurantList: {
    marginBottom: 30,
  },
  lunchTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 10,
  },
  message: {
    textAlign: "center",
    marginVertical: 20,
    color: "#777777",
  },
  error: {
    textAlign: "center",
    marginVertical: 20,
    color: "red",
  },
});
