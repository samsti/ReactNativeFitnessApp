// ExerciseCard.js
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, Animated, StyleSheet, Link } from 'react-native';
import FastImage from 'react-native-fast-image';

const ExerciseCard = ({ exercise, styles, expanded, toggleExpand }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, 
      useNativeDriver: true,
    }).start();
  }, [expanded, fadeAnim]);

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        { width: expanded ? '100%' : '100%' },
        expanded && { marginBottom: 16 },
      ]}
      onPress={toggleExpand}
    >
   
      <FastImage
        source={{ uri: exercise.gifUrl, priority: FastImage.priority.high, }}
        style={[
          styles.gifImage,
          expanded && { height: 200 }, 
        ]}
      />
  
        
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      {expanded && (
        <>
          <Text style={styles.sectionHeading}>Equipment:</Text>
          <Text style={styles.additionalInfo}>{exercise.equipment}</Text>

          <Text style={styles.sectionHeading}>Target:</Text>
          <Text style={styles.additionalInfo}>{exercise.target}</Text>

          <Text style={styles.sectionHeading}>Instructions:</Text>
          <Text style={styles.instructions}>{exercise.instructions}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {

    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    backgroundColor: 'red',
  },
  gifImage: {

    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,

  },
  exerciseName: {

    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionHeading: {

    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalInfo: {

    fontSize: 14,
  },
  instructions: {

    fontSize: 14,
    marginTop: 8,
  },
});

export default ExerciseCard;
