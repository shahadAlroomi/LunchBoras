import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Min sida</Text>

      {image ? (
        <Image source={{ uri: image }} style={s.profileImage} />
      ) : (
        <View style={s.placeholder}>
          <Text style={s.placeholderText}>Ingen bild</Text>
        </View>
      )}

      <Pressable style={s.button} onPress={pickImage}>
        <Text style={s.buttonText}>Välj profilbild</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 25,
  },
  placeholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  placeholderText: {
    color: "#777777",
  },
  button: {
    backgroundColor: "#FFB82E",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
