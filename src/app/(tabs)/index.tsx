import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.logo}>🍽️ LunchBorås</Text>

        <Text style={s.subtitle}>Hitta dagens lunch i Borås</Text>
      </View>

      <Pressable style={s.button} onPress={() => router.push("/restaurant/1")}>
        <Text style={s.buttonText}>Visa restauranger</Text>
      </Pressable>

      <Pressable
        style={s.favoriteButton}
        onPress={() => router.push("/favorites")}
      >
        <Text style={s.buttonText}>❤️ Mina favoriter</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  header: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 40,
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#71883F",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555555",
  },

  button: {
    backgroundColor: "#C7D99A",
    padding: 16,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: "center",
  },

  favoriteButton: {
    backgroundColor: "#E3ECC8",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3F4D27",
  },
});
