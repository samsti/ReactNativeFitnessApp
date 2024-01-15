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
    height: "9%",
    borderRadius: 5,
    justifyContent: "center",
  },

  container_PRIMARY: {
    backgroundColor: "black",
    color: "#FF5E00",
    width: "100%",
    marginTop: 0,
  },

  text_PRIMARY: {
    color: "#FF5E00",
    width: "100%",
  },

  container_REGISTER:{
    backgroundColor: "#a83203",
    width: "45%",
    height: "5%",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: "7%",
    marginBottom: 0,
  },

  text: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  container_CARD: {
    ml: '21px',
    color: '#fff',
    background: '#FFA9A9',
    borderRadius: '20px',
    textTransform: 'capitalize',
  },
  text_CARD: {
    fontSize: '14px',
  },


});

export default customButton;
