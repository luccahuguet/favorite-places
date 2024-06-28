import { FlatList, View, Text, StyleSheet } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";

function PlacesList({ places }) {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    console.log("[PlacesList] Navigating to PlaceDetails with id:", id);
    if (id) {
      navigation.navigate("PlaceDetails", {
        placeId: id,
      });
    } else {
      console.error("[PlacesList] Invalid id received:", id);
    }
  }

  console.log("[PlacesList] Places data:", places);

  if (places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places found. Maybe start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => (item.id ? item.id.toString() : item.title)}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
      style={styles.list}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
    color: Colors.light.primary200,
  },
});
