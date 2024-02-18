/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});


const App = () => {

  return (
  <SafeAreaView style={styles.root}>
    <Navigation />
  </SafeAreaView>

  );
};



export default App;
