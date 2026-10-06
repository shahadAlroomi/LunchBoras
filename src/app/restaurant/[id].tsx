import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { Restaurant } from "../../components/RestaurantCard";
import type { Lunch } from "../../services/lunchApi";
import { getLunches } from "../../services/lunchApi";
import { getRestaurants } from "../../services/restaurantApi";

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  const [lunch, setLunch] = useState<Lunch | null>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [distance, setDistance] = useState<number | null>(null);

  const [isFavorite, setIsFavorite] = useState(false);

  const addFavorite = async () => {
    setIsFavorite(!isFavorite);

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const calculateDistance = (
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number,
  ) => {
    const earthRadius = 6371;

    const latitudeDifference = ((latitude2 - latitude1) * Math.PI) / 180;

    const longitudeDifference = ((longitude2 - longitude1) * Math.PI) / 180;

    const a =
      Math.sin(latitudeDifference / 2) ** 2 +
      Math.cos((latitude1 * Math.PI) / 180) *
        Math.cos((latitude2 * Math.PI) / 180) *
        Math.sin(longitudeDifference / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  };

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const restaurants = await getRestaurants();

        const foundRestaurant = restaurants.find(
          (item) => item.id.toString() === id?.toString(),
        );

        setRestaurant(foundRestaurant || null);

        if (foundRestaurant) {
          const lunches = await getLunches();

          const foundLunch = lunches.find(
            (item) =>
              item.restaurant.toLowerCase().trim() ===
              foundRestaurant.name.toLowerCase().trim(),
          );

          setLunch(foundLunch || null);
        }
      } catch (error) {
        console.log("Restaurant error:", error);
      }
    };

    loadRestaurant();
  }, [id]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.log("Location permission denied");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});

        setLocation(currentLocation);

        if (!restaurant) {
          return;
        }

        const geocodedLocation = await Location.geocodeAsync(
          restaurant.address,
        );

        if (geocodedLocation.length > 0) {
          const restaurantLocation = geocodedLocation[0];

          const calculatedDistance = calculateDistance(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            restaurantLocation.latitude,
            restaurantLocation.longitude,
          );

          setDistance(calculatedDistance);
        }
      } catch (error) {
        console.log("Location error:", error);
      }
    };

    getLocation();
  }, [restaurant]);

  if (!restaurant) {
    return (
      <View style={s.loading}>
        <Text>Hämtar restaurang...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={s.imageContainer}>
        <Image
          source={{
            uri: restaurant.image,
          }}
          style={s.image}
        />

        <Pressable style={s.favoriteButton} onPress={addFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={26}
            color={isFavorite ? "#FFB82E" : "black"}
          />
        </Pressable>
      </View>

      <View style={s.container}>
        <Text style={s.title}>{restaurant.name}</Text>

        <View style={s.info}>
          <Text style={s.label}>🍽️ Kategori</Text>

          <Text style={s.text}>{restaurant.category}</Text>
        </View>

        <View style={s.info}>
          <Text style={s.label}>⭐ Betyg</Text>

          <Text style={s.text}>{restaurant.rating}</Text>
        </View>

        <View style={s.info}>
          <Text style={s.label}>🕐 Öppettider</Text>

          <Text style={s.text}>{restaurant.openingHours}</Text>
        </View>

        <View style={s.info}>
          <Text style={s.label}>📍 Adress</Text>

          <Text style={s.text}>{restaurant.address}</Text>
        </View>

        {lunch && (
          <View style={s.info}>
            <Text style={s.label}>🍽️ Dagens lunch</Text>

            <Text style={s.text}>{lunch.day}</Text>

            {lunch.items.map((item, index) => (
              <View key={`${item.name}-${index}`} style={s.lunchItem}>
                <Text style={s.lunchName}>• {item.name}</Text>

                <Text style={s.lunchPrice}>{item.price}</Text>
              </View>
            ))}
          </View>
        )}

        {distance !== null && (
          <View style={s.info}>
            <Text style={s.label}>📍 Avstånd</Text>

            <Text style={s.text}>{distance.toFixed(1)} km från dig</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 250,
  },

  favoriteButton: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  info: {
    marginBottom: 18,
  },

  label: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
  },

  lunchItem: {
    marginTop: 10,
  },

  lunchName: {
    fontSize: 16,
    lineHeight: 23,
  },

  lunchPrice: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 2,
  },
});
