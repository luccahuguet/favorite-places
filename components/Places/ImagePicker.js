import { Button, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

function ImagePicker() {
  const [permission, askForPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (permission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await askForPermission();
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

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
  }
  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;
