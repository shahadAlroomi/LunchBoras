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

      <View style={s.items}>
        {lunch.items.map((item, index) => (
          <View key={`${item.name}-${index}`} style={s.item}>
            <Text style={s.bullet}>•</Text>

            <View style={s.itemContent}>
              <Text style={s.dish}>{item.name}</Text>

              <Text style={s.price}>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 5,
  },

  day: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFB82E",
    marginBottom: 15,
  },

  items: {
    gap: 12,
  },

  item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  bullet: {
    fontSize: 20,
    color: "#FFB82E",
    marginRight: 8,
    lineHeight: 24,
  },

  itemContent: {
    flex: 1,
  },

  dish: {
    fontSize: 16,
    color: "#444444",
    lineHeight: 23,
  },

  price: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666666",
    marginTop: 3,
  },
});
