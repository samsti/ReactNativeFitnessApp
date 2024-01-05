import React from 'react';
import { View, StyleSheet } from 'react-native';
import Body from '../../components/BodySvg'
import NavBar from '../../components/navBar';

const HomeScreen = () => {
  return (
  <>
  <NavBar/>
    <View style={styles.container}>
      <View style={styles.body}>
      <Body  /> 
    </View>
  </View>
  </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#484847",
  },
  body: {
    marginLeft: "25%",
  },
});

export default HomeScreen;
