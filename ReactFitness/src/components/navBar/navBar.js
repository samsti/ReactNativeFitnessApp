import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBar = ({  }) => {

  const navigation = useNavigation();


  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Body')}>
        <Image source={require('../../assets/images/cviky.png')} style={styles.icon}  />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('MealPlan')}>
        <Image source={require('../../assets/images/jidelnicek.png')} style={styles.icon}  />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Home')}>
        <Image source={require('../../assets/images/logo_main.png')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Home')}>
        <Image source={require('../../assets/images/calendar.png')} style={styles.icon}  />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('User')}>
        <Image source={require('../../assets/images/user_nav.png')} style={styles.icon}  />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: "center",
    backgroundColor: 'black',
    width: '100%',
    minHeight: '10%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu: {
    verticalAlign: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  icon: {
    width: 40, 
    height: 40,
  },
  logo: {
    width: 90, // Adjust width as per your design
    height: 60, // Adjust height as per your design
    resizeMode: 'contain',
  },
});

export default NavBar;
