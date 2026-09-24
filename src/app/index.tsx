import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LunchBorås</Text>

      <Text style={styles.subtitle}>Hitta restauranger för dagens lunch</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/restaurant/1")}
      >
        <Text style={styles.buttonText}>Visa restauranger</Text>
      </Pressable>

      <Pressable
        style={styles.favoriteButton}
        onPress={() => router.push("/favorites")}
      >
        <Text style={styles.buttonText}>Mina favoriter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#208AEF",
  },
  favoriteButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#555",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
