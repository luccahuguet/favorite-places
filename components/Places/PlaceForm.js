import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");

  function changeTitleHandler(text) {
    setEnteredTitle(text);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={enteredTitle}
          onChangeText={changeTitleHandler}
          style={styles.input}
        />
      </View>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.light.primary500,
  },
  input: {
    borderBottomColor: Colors.light.primary700,
    backgroundColor: Colors.light.primary100,
    fontSize: 16,
    borderBottomWidth: 2,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});
