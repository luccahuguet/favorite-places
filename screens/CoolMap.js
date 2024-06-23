import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Button } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "@/components/UI/IconButton";

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
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
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView style={styles.map} region={region} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker title="Picked Location" coordinate={selectedLocation} />
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
