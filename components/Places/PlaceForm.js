import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "@/constants/Colors";
import Button from "@/components/UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { Place } from "@/models/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(text) {
    setEnteredTitle(text);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={enteredTitle}
          onChangeText={changeTitleHandler}
          style={styles.input}
        />
      </View>
      <View style={styles.imagePickerContainer}>
        <ImagePicker onImageTaken={takeImageHandler} />
      </View>
      <View style={styles.locationPickerContainer}>
        <LocationPicker onPickLocation={pickLocationHandler} />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={savePlaceHandler}>Save Place</Button>
      </View>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.light.primary500,
    fontSize: 16,
  },
  input: {
    borderBottomColor: Colors.light.primary700,
    backgroundColor: Colors.light.primary100,
    fontSize: 16,
    borderBottomWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  imagePickerContainer: {
    marginBottom: 24,
  },
  locationPickerContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 8,
  },
});
