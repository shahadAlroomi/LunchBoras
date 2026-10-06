import { Pressable, StyleSheet, Text } from "react-native";

type FavoritesButtonProps = {
  onPress: () => void;
};

export default function FavoritesButton({ onPress }: FavoritesButtonProps) {
  return (
    <Pressable style={s.button} onPress={onPress}>
      <Text style={s.text}>♡ Mina favoriter</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  button: {
    backgroundColor: "#FFB82E",
    borderRadius: 25,
    paddingVertical: 20,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222222",
  },
});
