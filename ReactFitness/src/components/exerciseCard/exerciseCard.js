import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Animated, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const ExerciseCard = ({ exercise, expanded, toggleExpand }) => {
  const [containerWidth, setContainerWidth] = useState('50%'); 

  const handlePress = () => {
    setContainerWidth(prevWidth => prevWidth === '50%' ? '100%' : '50%');
    toggleExpand();
  };

  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [expanded, fadeAnim]);

  return (
    <View style={styles.container}>
      <FastImage
        source={{ uri: exercise.gifUrl, priority: FastImage.priority.high }}
        style={[
          styles.gifImage,
        ]}
        resizeMode="stretch"
      />

      <TouchableOpacity
        style={[
          styles.cardContainer,
          { width: containerWidth },
          expanded && { marginBottom: 16 },
        ]}
        onPress={handlePress}
      >
        <Text style={styles.exerciseName}>{exercise.name.toUpperCase()}</Text>

        {expanded && (
         
         <>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.sectionHeading}>equipment</Text>
              <Text style={styles.additionalInfo}>{exercise.equipment}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.sectionHeading}>target</Text>
              <Text style={styles.additionalInfo}>{exercise.target}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeading}>Instructions:</Text>
            <Text style={styles.instructions}>{exercise.instructions}</Text>
          </View>
        </>

        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 30,
    marginTop: 15,
    
  },
  infoItem: {
    paddingHorizontal: 80,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  cardContainer: {
    borderRadius: 3,
    padding: 5,
    paddingBottom: 15,
    paddingTop: 0,
    marginBottom: 30,
    backgroundColor: "#FF5E00",
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  gifImage: {
    width: '100%',
    height: 250,
    borderRadius: 3,
  },
  exerciseName: {
    fontSize: 24,
    fontFamily: "Rajdhani-Bold",
    textAlign: 'center',
    marginTop: 8,
    color: 'white',
  },
  sectionHeading: {
    fontSize: 20,
    fontFamily: "Rajdhani-Bold",
    marginTop: 8,
    color: 'white',
    textAlign: 'center',
  },
  additionalInfo: {
    fontSize: 20,
    color: 'white',
    fontFamily: "Rajdhani-Regular",
  },
  instructions: {
    fontSize: 20,
    marginTop: 8,
    color: 'white',
    textAlign: 'center',
    fontFamily: "Rajdhani-Regular",
  },
});

export default ExerciseCard;
