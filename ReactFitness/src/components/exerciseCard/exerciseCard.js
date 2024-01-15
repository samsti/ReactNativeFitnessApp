import { View, Text } from "react-native";
import React from "react";
import { Link } from 'react-router-dom';

const exerciseCard = ({ exercise }) => {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
        <View>
            <Text>exerciseCard</Text>
        </View>
    </Link>
  );
};

export default exerciseCard;
