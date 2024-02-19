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
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});


const App = () => {
  

  let RNfirebaseConfig = {
    apiKey: "AIzaSyBaq0a7vA__9nCKUnWbwGiWYB5Pz4yV40U",
    authDomain: "XXXXX",
    databaseURL: "XXXXX",
    projectId: "reactnativefitnessapp",
    storageBucket: "reactnativefitnessapp.appspot.com",
    messagingSenderId: "XXXX",
    appId:"1:215623757875:android:5d09c6be01597627f37346",
  }


  if(firebase.app.length == null) {
    firebase.initializeApp(RNfirebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();
  }


  return (
  <SafeAreaView style={styles.root}>
    <Navigation />
  </SafeAreaView>

  );
};



export default App;
