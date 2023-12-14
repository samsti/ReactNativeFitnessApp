import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const customButton = ({ onPress, text, type }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a83203",
    marginTop: 15,
    width: "40%",
    height: "10%",
    borderRadius: 5,
    justifyContent: "center",
  },

  container_PRIMARY: {
    backgroundColor: "black",
    color: "#FF5E00",
    width: "100%",
  },

  text_PRIMARY: {
    color: "#FF5E00",
    width: "100%",
  },

  container_REGISTER:{
    backgroundColor: "#a83203",
    width: "40%",
    height: "10%",
    borderRadius: 5,
    justifyContent: "center",
  },

  text: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});

export default customButton;
