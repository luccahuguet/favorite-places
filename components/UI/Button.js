import React from "react";
import { Pressable, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { StyleSheet } from "react-native";

function Button({ onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.primary800,
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "black", // "rgba(0, 0, 0, 0.26)
    // shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.26,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.light.primary50,
  },
});
