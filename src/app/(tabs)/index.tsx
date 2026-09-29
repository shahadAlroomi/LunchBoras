import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Location permission denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    console.log(location.coords);
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>LunchBorås</Text>
      <Text style={s.subtitle}>Hitta restauranger för dagens lunch</Text>
      <Pressable style={s.button} onPress={() => router.push("/restaurant/1")}>
        <Text style={s.buttonText}>Visa restauranger</Text>
      </Pressable>
      <Pressable
        style={s.favoriteButton}
        onPress={() => router.push("/favorites")}
      >
        <Text style={s.buttonText}>Mina favoriter</Text>
      </Pressable>
      {/*
<Pressable style={s.button} onPress={getLocation}>
  <Text style={s.buttonText}>Hitta min plats</Text>
</Pressable>
*/}
    </View>
  );
}

const s = StyleSheet.create({
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
