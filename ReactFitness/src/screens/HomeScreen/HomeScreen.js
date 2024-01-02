import React from 'react';
import { View, StyleSheet } from 'react-native';
import BodySvg from '../../assets/svg/Body.svg';



const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <BodySvg style={styles.Svg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'block',
  },
  Svg: {
    marginLeft: "25%",
  },
});

export default HomeScreen;
