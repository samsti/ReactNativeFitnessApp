import { Text, View } from "react-native";
import React, { Component } from "react";
import Card from "../../components/exerciseCard/exerciseCard.js"
export class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
        <Card/>
      </View>
    );
  }
}

export default HomeScreen;
