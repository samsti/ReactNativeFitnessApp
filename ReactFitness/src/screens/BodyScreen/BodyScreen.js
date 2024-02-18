import React, { useState } from 'react';
import { View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Body from '../../components/BodySvg';
import BodyBack from '../../components/BodyBackSvg';
import NavBar from '../../components/navBar';

const BodyScreen = () => {
  const [showFrontBody, setShowFrontBody] = useState(true);

  const toggleBody = () => {
    setShowFrontBody(prevState => !prevState);
  };

  return (
    <>
      <NavBar />
      <View style={styles.container}>
        <View style={styles.body}>
          {showFrontBody ? <Body /> : <BodyBack />}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleBody}>
            <Image source={require('../../assets/images/recycle.png')} style={styles.rotateIcon}  />
          </TouchableOpacity>
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
    height: '80%', // Adjust the height as needed
  },
  buttonContainer: {  // Adjust spacing as needed
    marginTop: 30,
    justifyContent: 'center',
  },
  rotateIcon: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    marginBottom: -20,
  },
});

export default BodyScreen;
