import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import CategoryFilter from "../../components/CategoryFilter";
import FavoritesButton from "../../components/FavoritesButton";
import Header from "../../components/Header";
import LunchCard from "../../components/LunchCard";
import type { Restaurant } from "../../components/RestaurantCard";
import RestaurantCard from "../../components/RestaurantCard";
import SearchBar from "../../components/SearchBar";
import type { Lunch } from "../../services/lunchApi";
import { getLunches } from "../../services/lunchApi";
import { getRestaurants } from "../../services/restaurantApi";

function getWeekNumber(date: Date): number {
  const tempDate = new Date(date.getTime());

  tempDate.setHours(0, 0, 0, 0);

  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

  const week1 = new Date(tempDate.getFullYear(), 0, 4);

  return (
    1 +
    Math.round(
      ((tempDate.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
}

export default function HomeScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alla");

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [lunches, setLunches] = useState<Lunch[]>([]);
  const [lunchLoading, setLunchLoading] = useState(true);

  const weekNumber = getWeekNumber(new Date());

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

  useEffect(() => {
    const loadLunches = async () => {
      try {
        const data = await getLunches();
        setLunches(data);
      } catch (error) {
        console.log("Lunch error:", error);
      } finally {
        setLunchLoading(false);
      }
    };

    loadLunches();
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

      <Text style={s.lunchWeek}>Vecka {weekNumber}</Text>

      {lunchLoading && <Text style={s.message}>Hämtar dagens lunch...</Text>}

      {!lunchLoading &&
        lunches.map((lunch, index) => (
          <LunchCard key={`${lunch.restaurant}-${index}`} lunch={lunch} />
        ))}

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
    marginBottom: 3,
  },

  lunchWeek: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 15,
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
