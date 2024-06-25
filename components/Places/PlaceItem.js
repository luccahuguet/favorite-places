import { Colors } from "@/constants/Colors";
import { Pressable, Text, View, Image, StyleSheet } from "react-native";

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect}
    >
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.light.primary500,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    flex: 1,
    height: 100,
    width: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  info: {
    flex: 2,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.light.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.light.gray700,
  },
});
