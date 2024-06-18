import { Button, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { useState } from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import getMapPreview from "@/util/location";
import { useNavigation } from "expo-router";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();
  const [permission, askForPermission] = useForegroundPermissions();

  const navigation = useNavigation();

  async function verifyPermissions() {
    console.log("Verifying permissions...");
    if (permission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await askForPermission();
      console.log("Permission response:", permissionResponse);
      return permissionResponse.granted;
    }
    if (permission.status === PermissionStatus.DENIED) {
      alert("You need to grant permissions to use this app.");
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync({
      timeout: 5000,
    });

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let imagePreview = <Text>No image picked yet.</Text>;
  if (pickedLocation) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{imagePreview}</View>
      <View style={styles.actions}>
        <Button title="Get User Location" onPress={getLocationHandler} />
        <Button title="Pick on Map" onPress={pickOnMapHandler} />
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: Colors.light.primary100,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
