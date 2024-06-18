import { Button, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

function LocationPicker() {
  function getLocationHandler() {}

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
