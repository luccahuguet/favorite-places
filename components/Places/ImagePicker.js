import { Button, View, Image, Text, Alert } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

function ImagePicker({ onImageTaken }) {
  const [permission, askForPermission] = useCameraPermissions();
  const [uploadedImage, setUploadedImage] = useState(null);

  async function verifyPermissions() {
    console.log("Verifying permissions...");
    if (permission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await askForPermission();
      console.log("Permission response:", permissionResponse);
      return permissionResponse.granted;
    }
    if (permission.status === PermissionStatus.DENIED) {
      alert("You need to grant camera permissions to use this app.");
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    console.log("Has permission:", hasPermission);

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log("Image result:", image);

    if (!image.canceled && image.assets && image.assets.length > 0) {
      const uri = image.assets[0].uri;
      console.log("Image URI:", uri);
      setUploadedImage(uri);
      onImageTaken(uri);
    } else {
      console.log("Image picking was cancelled or no assets found.");
    }
  }

  let imagePreview = <Text>No image picked yet.</Text>;
  if (uploadedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: uploadedImage }} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.light.primary200,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
