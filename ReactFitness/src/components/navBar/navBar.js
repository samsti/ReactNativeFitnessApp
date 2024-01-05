import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
const NavBar = ({ title, onLeftButtonPress, leftButtonTitle, onRightButtonPress, rightButtonTitle }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={onLeftButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>{leftButtonTitle}SAM</Text>
      </TouchableOpacity>
      <Image source={require('../../assets/images/logo_main.png')} style={styles.logo} />
      <TouchableOpacity onPress={onRightButtonPress} style={styles.button}>
      
        <Text style={styles.buttonText}>{rightButtonTitle}Burger</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '10%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    padding: 20,
  },
  buttonText: {
    fontSize: 25,
    color: '#FF5E00',
  },
  logo: {
    width: 90, // Adjust width as per your design
    height: 60, // Adjust height as per your design
    resizeMode: 'contain',
    marginLeft: 15,
  },
});

export default NavBar;
