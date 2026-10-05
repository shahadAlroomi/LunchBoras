import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View>
      <Text>Min sida</Text>

      {image && (
        <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
      )}

      <Pressable onPress={pickImage}>
        <Text>Välj profilbild</Text>
      </Pressable>
    </View>
  );
}
