import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});

      setLocation(currentLocation);
    };

    getLocation();
  }, []);

  return (
    <ScrollView>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        }}
        style={s.image}
      />

      <View style={s.container}>
        <Text style={s.title}>Restaurant {id}</Text>

        <Text style={s.description}>
          En trevlig restaurang i Borås som serverar god lunch med flera
          alternativ att välja mellan.
        </Text>

        <View style={s.info}>
          <Text style={s.label}>📍 Adress</Text>
          <Text style={s.text}>Allégatan 1, Borås</Text>
        </View>

        <View style={s.info}>
          <Text style={s.label}>🍽️ Lunch</Text>
          <Text style={s.text}>Dagens lunch från 119 kr</Text>
        </View>

        <View style={s.info}>
          <Text style={s.label}>🕐 Öppettider</Text>
          <Text style={s.text}>11:00 – 14:00</Text>
        </View>

        <View style={s.info}>
          <Text style={s.label}>⭐ Betyg</Text>
          <Text style={s.text}>4.5 / 5</Text>
        </View>

        {location && (
          <View style={s.info}>
            <Text style={s.label}>📍 Din position</Text>
            <Text style={s.text}>Latitude: {location.coords.latitude}</Text>
            <Text style={s.text}>Longitude: {location.coords.longitude}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  image: {
    width: "100%",
    height: 220,
  },

  container: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
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
});
