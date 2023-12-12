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
} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    fontFamily: 'Radjdhani',
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
