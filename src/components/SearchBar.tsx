import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  search: string;
  setSearch: (text: string) => void;
};

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <View style={s.container}>
      <TextInput
        style={s.input}
        placeholder="🔎  Sök restaurang..."
        placeholderTextColor="#777777"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 18,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#222222",
  },
  listButton: {
    width: 50,
    height: 50,
    marginRight: 5,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  listIcon: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333333",
  },
});
