// PlaceDetails.js
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { fetchPlaceDetails } from "@/util/database";

function PlaceDetails({ route, navigation }) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  function showOnMapHandler() {
    console.log("[PlaceDetails] Navigating to Map with place:", selectedPlace);
    navigation.navigate("Map", {
      initialLocation: {
        lat: selectedPlace.location.lat,
        lng: selectedPlace.location.lng,
      },
    });
  }

  const selectedPlaceId = route.params?.placeId;
  console.log(
    "[PlaceDetails] selectedPlaceId received from route:",
    selectedPlaceId
  );

  useEffect(() => {
    async function loadPlaceData() {
      if (selectedPlaceId) {
        console.log(
          "[PlaceDetails] Fetching place details for ID:",
          selectedPlaceId
        );
        const place = await fetchPlaceDetails(selectedPlaceId);
        console.log("[PlaceDetails] Fetched place:", place);
        setSelectedPlace(place);
        navigation.setOptions({ title: place.title });
      } else {
        console.error("[PlaceDetails] No selectedPlaceId received");
      }
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!selectedPlace) {
    return (
      <View style={styles.centered}>
        <Text>Loading place details...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>ADDRESS: {selectedPlace.address}</Text>
        </View>
        <Button title="View on Map" onPress={showOnMapHandler} />
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  locationContainer: {
    marginVertical: 20,
    marginHorizontal: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
  },
  addressContainer: {
    marginBottom: 15,
  },
  address: {
    color: Colors.light.primary500,
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
