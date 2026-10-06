import { StyleSheet, Text, View } from "react-native";

import type { Lunch } from "../services/lunchApi";

type LunchCardProps = {
  lunch: Lunch;
};

export default function LunchCard({ lunch }: LunchCardProps) {
  return (
    <View style={s.card}>
      <Text style={s.restaurant}>{lunch.restaurant}</Text>

      <Text style={s.day}>{lunch.day}</Text>

      <Text style={s.dish}>{lunch.dish}</Text>

      <Text style={s.price}>{lunch.price}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  restaurant: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 5,
  },

  day: {
    fontSize: 15,
    color: "#FFB82E",
    fontWeight: "600",
    marginBottom: 10,
  },

  dish: {
    fontSize: 16,
    color: "#444444",
    lineHeight: 24,
    marginBottom: 12,
  },

  price: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666666",
  },
});
