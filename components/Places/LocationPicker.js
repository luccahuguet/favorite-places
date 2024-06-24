import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Image,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useNavigation } from "expo-router";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import getMapPreview from "@/util/location";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLocation.latitude,
        lng: route.params.pickedLocation.longitude,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    setIsLoading(true);
    try {
      const location = await getCurrentPositionAsync({ timeout: 5000 });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map."
      );
    }
    setIsLoading(false);
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let imagePreview = <Text>No location picked yet.</Text>;

  if (isLoading) {
    imagePreview = <ActivityIndicator size="large" color={Colors.primary500} />;
  }

  if (pickedLocation) {
    const previewUrl = getMapPreview(pickedLocation.lat, pickedLocation.lng);
    imagePreview = (
      <Image
        style={styles.image}
        source={{ uri: previewUrl }}
        onError={(error) => {
          console.error("Image loading error:", error.nativeEvent.error);
          Alert.alert("Error", "Failed to load map preview. Please try again.");
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
    justifyContent: "center",
    alignItems: "center",
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
