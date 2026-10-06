import { Pressable, StyleSheet, Text, View } from "react-native";

type LunchCardProps = {
  onPress: () => void;
};

export default function LunchCard({ onPress }: LunchCardProps) {
  return (
    <View style={s.card}>
      <View style={s.info}>
        <Text style={s.title}>Lunch idag</Text>

        <Text style={s.price}>Dagens lunch från 119 kr</Text>

        <Text style={s.details}>🕐 11:00 – 14:00</Text>

        <Text style={s.details}>📍 Borås</Text>
      </View>

      <Pressable style={s.button} onPress={onPress}>
        <Text style={s.buttonText}>Visa</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    padding: 22,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 8,
  },
  price: {
    fontSize: 17,
    color: "#777777",
    marginBottom: 5,
  },
  details: {
    fontSize: 17,
    color: "#777777",
    marginBottom: 2,
  },
  button: {
    backgroundColor: "#FFB82E",
    paddingHorizontal: 25,
    paddingVertical: 17,
    borderRadius: 22,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
  },
});
