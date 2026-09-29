import { StyleSheet, Text, View } from "react-native";

const favorites = [
  {
    id: 1,
    name: "Restaurant 1",
    address: "Allégatan 1, Borås",
  },
  {
    id: 2,
    name: "Restaurant 2",
    address: "Stora Torget 2, Borås",
  },
];

export default function Favorites() {
  return (
    <View style={s.container}>
      <Text style={s.title}>Mina favoriter</Text>

      {favorites.map((restaurant) => (
        <View key={restaurant.id} style={s.card}>
          <Text style={s.name}>{restaurant.name}</Text>
          <Text style={s.address}>{restaurant.address}</Text>
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  address: {
    fontSize: 15,
  },
});
