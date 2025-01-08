import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";

type Props = {};

const Button = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => {
      console.warn("Change theme 🤣🤣🤣🤣");
    }}>
      <View style={styles.container}>
        <Text style={styles.text}>Change Theme</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ee4c77",
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginHorizontal: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    // textAlign: "center",
  }
});
