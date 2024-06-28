import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Button } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "@/components/UI/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params?.initialLocation;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    const marker = { latitude: lat, longitude: lng };

    setSelectedLocation(marker);
    console.log("selected!");
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      alert("No location picked!", "pick a location first, you monster");
      return;
    }

    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView style={styles.map} region={region} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
