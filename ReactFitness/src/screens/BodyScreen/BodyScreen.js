import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Body from '../../components/BodySvg';
import BodyBack from '../../components/BodyBackSvg';
import NavBar from '../../components/navBar';

const BodyScreen = () => {
  const [showFrontBody, setShowFrontBody] = useState(true);

  const toggleBody = () => {
    setShowFrontBody(prevState => !prevState);
  };

  return (
<<<<<<< HEAD
    <>
      <NavBar />
      <View style={styles.container}>
        <View style={styles.body}>
          {showFrontBody ? <Body /> : <BodyBack />}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Rotate Body" onPress={toggleBody} color="#FF5E00" />
        </View>
      </View>
      
    </>
=======
  <>
  <NavBar/>
    <View style={styles.container}>
      <View style={styles.body}>
      <BodyBack />
    </View>
  </View>
  </>
>>>>>>> bb27ab71ff75d2e0e11c244b1744ead2b782f1de
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
<<<<<<< HEAD
    width: '100%',
    height: '80%', // Adjust the height as needed
  },
  buttonContainer: {  // Adjust spacing as needed
    width: '50%',
    marginTop: 50,

=======
    width: '100%', 
    height: '100%', 
>>>>>>> bb27ab71ff75d2e0e11c244b1744ead2b782f1de
  },

});

export default BodyScreen;
