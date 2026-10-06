import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

type CategoryFilterProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const categories = [
  { name: "Alla", icon: "🍽️" },
  { name: "Pizza", icon: "🍕" },
  { name: "Burger", icon: "🍔" },
  { name: "Sallad", icon: "🥗" },
];

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={s.container}
    >
      {categories.map((category) => {
        const active = selectedCategory === category.name;

        return (
          <Pressable
            key={category.name}
            onPress={() => setSelectedCategory(category.name)}
            style={[s.button, active && s.activeButton]}
          >
            <Text style={s.icon}>{category.icon}</Text>

            <Text style={[s.text, active && s.activeText]}>
              {category.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 25,
    backgroundColor: "#F3F3F3",
    marginRight: 12,
  },
  activeButton: {
    backgroundColor: "#FFB82E",
  },
  icon: {
    fontSize: 17,
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    color: "#555555",
  },
  activeText: {
    color: "#222222",
    fontWeight: "600",
  },
});
