import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Body from '../../components/BodySvg'
import BodyBack from '../../components/BodyBackSvg'
import NavBar from '../../components/navBar';

const BodyScreen = () => {

  return (
  <>
  <NavBar/>
    <View style={styles.container}>
      <View style={styles.body}>
      <BodyBack />
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
    backgroundColor: '#484847',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%', 
  },

});

export default BodyScreen;
