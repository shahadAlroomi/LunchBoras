import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>LunchBorås </Text>
      <Pressable onPress={() => router.push("/favorites")}>
        <Text>Favorites</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/restaurant/1")}>
        <Text>Restaurang 1</Text>
      </Pressable>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
