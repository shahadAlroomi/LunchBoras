import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const restaurants = [
  {
    id: 1,
    name: "Restaurant 1",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    rating: "4.5",
    price: "119 kr",
    distance: "1.2 km",
  },
  {
    id: 2,
    name: "Restaurant 2",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    rating: "4.3",
    price: "129 kr",
    distance: "2.1 km",
  },
  {
    id: 3,
    name: "Restaurant 3",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
    rating: "4.7",
    price: "139 kr",
    distance: "2.8 km",
  },
];

export default function Index() {
  const router = useRouter();

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.logo}>LunchBorås</Text>
          <Text style={s.subtitle}>Hitta dagens lunch</Text>
        </View>

        <Pressable
          style={s.profileButton}
          onPress={() => router.push("/profile")}
        >
          <Text style={s.profileIcon}>👤</Text>
        </Pressable>
      </View>

      {/* Search */}
      <View style={s.searchContainer}>
        <Text style={s.searchIcon}>⌕</Text>

        <TextInput
          style={s.search}
          placeholder="Sök restaurang..."
          placeholderTextColor="#888888"
        />

        <Pressable style={s.filterButton}>
          <Text style={s.filterIcon}>☷</Text>
        </Pressable>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.categories}
      >
        <Pressable style={s.categoryActive}>
          <Text style={s.categoryActiveText}>🍽️ Alla</Text>
        </Pressable>

        <Pressable style={s.category}>
          <Text style={s.categoryText}>🍕 Pizza</Text>
        </Pressable>

        <Pressable style={s.category}>
          <Text style={s.categoryText}>🍔 Burger</Text>
        </Pressable>

        <Pressable style={s.category}>
          <Text style={s.categoryText}>🥗 Sallad</Text>
        </Pressable>
      </ScrollView>

      {/* Popular restaurants */}
      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>Populära restauranger</Text>

        <Pressable>
          <Text style={s.seeAll}>Se alla</Text>
        </Pressable>
      </View>

      {/* Restaurant cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.restaurantList}
      >
        {restaurants.map((restaurant) => (
          <Pressable
            key={restaurant.id}
            style={s.card}
            onPress={() => router.push(`/restaurant/${restaurant.id}`)}
          >
            <View>
              <Image
                source={{ uri: restaurant.image }}
                style={s.restaurantImage}
              />

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
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Today's lunch */}
      <Text style={s.sectionTitle}>Dagens lunch</Text>

      <View style={s.lunchCard}>
        <View>
          <Text style={s.lunchTitle}>Lunch idag 🍽️</Text>

          <Text style={s.lunchText}>Se dagens lunch och öppettider</Text>
        </View>

        <Pressable
          style={s.lunchButton}
          onPress={() => router.push("/restaurant/1")}
        >
          <Text style={s.lunchButtonText}>Visa</Text>
        </Pressable>
      </View>

      {/* Favorites */}
      <Pressable
        style={s.favoritesButton}
        onPress={() => router.push("/favorites")}
      >
        <Text style={s.favoritesText}>♡ Mina favoriter</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222222",
  },

  subtitle: {
    fontSize: 15,
    color: "#777777",
    marginTop: 4,
  },

  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    fontSize: 20,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 18,
    height: 52,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  searchIcon: {
    fontSize: 22,
    color: "#555555",
    marginRight: 8,
  },

  search: {
    flex: 1,
    fontSize: 15,
    color: "#222222",
  },

  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  filterIcon: {
    fontSize: 22,
    color: "#333333",
  },

  categories: {
    marginBottom: 25,
  },

  categoryActive: {
    backgroundColor: "#FFB82E",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  category: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  categoryActiveText: {
    color: "#222222",
    fontWeight: "600",
  },

  categoryText: {
    color: "#555555",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 15,
  },

  seeAll: {
    color: "#555555",
    fontWeight: "600",
  },

  restaurantList: {
    paddingBottom: 30,
  },

  card: {
    width: 220,
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
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 8,
    color: "#222222",
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  rating: {
    fontSize: 14,
    color: "#F0A500",
    fontWeight: "600",
  },

  distance: {
    fontSize: 14,
    color: "#777777",
  },

  price: {
    fontSize: 14,
    color: "#555555",
  },

  lunchCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  lunchTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 5,
  },

  lunchText: {
    color: "#777777",
  },

  lunchButton: {
    backgroundColor: "#FFB82E",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 15,
  },

  lunchButtonText: {
    fontWeight: "600",
    color: "#222222",
  },

  favoritesButton: {
    backgroundColor: "#FFB82E",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  favoritesText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
});
