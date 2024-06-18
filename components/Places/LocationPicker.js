import { Button, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

function LocationPicker() {
  const [permission, askForPermission] = useForegroundPermissions();

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
    console.log("Location:", location);
  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>
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
});
