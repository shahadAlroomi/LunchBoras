import { Pressable, StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  onProfilePress: () => void;
};

export default function Header({ onProfilePress }: HeaderProps) {
  return (
    <View style={s.header}>
      <View>
        <Text style={s.title}>LunchBorås</Text>
        <Text style={s.subtitle}>Hitta dagens lunch</Text>
      </View>

      <Pressable onPress={onProfilePress} style={s.profileButton}>
        <Text style={s.profileIcon}>👤</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222222",
  },
  subtitle: {
    fontSize: 16,
    color: "#777777",
    marginTop: 5,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  profileIcon: {
    fontSize: 25,
  },
});
