import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../screens/LogInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import BodyScreen from "../screens/BodyScreen";
import ExerciseListScreen from "../screens/ExerciseListScreen";
import Calendar from "../screens/CalendarScreen";
import UserScreen from "../screens/UserScreen";
import MealPlanScreen from "../screens/MealPlanScreen";
import Trainings from "../screens/Trainings";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="LogIn" component={LogInScreen}/>
        <Stack.Screen name="Trainings" component={Trainings}/>
        <Stack.Screen name="MealPlan" component={MealPlanScreen}/>
        <Stack.Screen name="User" component={UserScreen}/>
        <Stack.Screen name="Calendar" component={Calendar}/>
        <Stack.Screen name="Body" component={BodyScreen}/>
        <Stack.Screen name="Exercises" component={ExerciseListScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
