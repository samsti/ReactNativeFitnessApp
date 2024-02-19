import React, { useState } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import Input from '../../components/Input';
import CustomButton from '../../components/customButton';
import { useNavigation } from '@react-navigation/native';
import userIcon from '../../assets/images/user.png';
import lockIcon from '../../assets/images/zamek.png';
import logo from '../../assets/images/logo_login.png';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage



const LogInScreen = () => {
  const [username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const navigation = useNavigation();

  const onLogInPressed = async () => {
    if (!username || !Password) {
      Alert.alert('Invalid Input', 'Please fill in both username and password fields');
      return;
    }

    try {
      // Retrieve the user with the provided username from Firestore
      const userSnapshot = await firestore().collection('user').where('username', '==', username).get();
      
      if (userSnapshot.empty) {
        Alert.alert('Invalid Input', 'User not found');
        return;
      }

      // Assuming there's only one user with the provided username, retrieve the user data
      const userData = userSnapshot.docs[0].data();

      // Check if the provided password matches the stored password
      if (Password !== userData.Password) {
        Alert.alert('Invalid Input', 'Username or password is incorrect');
        return;
      }

      // If everything is correct, navigate to Home screen
      navigation.navigate('Home');
      Alert.alert('Logged in successfully');
      await AsyncStorage.setItem('username', username);
      //console.warn(username);

    } catch (error) {
      console.error('Sign-in error:', error);
      Alert.alert('Sign-in Error', 'An error occurred during sign-in. Please try again.');
    }
  };
  
  const onDontHaveAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="height" contentContainerStyle={{ flex: 1}} style={styles.root}>
        <Image source={logo} style={styles.logo} />
        <Input 
          placeholder="Username" 
          value={username} 
          setValue={setUsername} 
          secureTextEntry={false}
          imageSource={userIcon}
        />
        <Input 
          placeholder="Password" 
          value={Password} 
          setValue={setPassword} 
          secureTextEntry={true}
          imageSource={lockIcon}
        />
        <CustomButton text="Sign in" onPress={onLogInPressed} />
        <CustomButton 
          text="Don't have an account? Make one" 
          onPress={onDontHaveAccount}
          type="PRIMARY"
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: "black",
    justifyContent: 'center',
    width: "95%",
    height: "50%",
    marginTop: "50%",
    marginBottom: "50%",
    marginLeft: "2.5%",
  },
  logo: {
    marginTop: "-40%",
    width: 150,
    height: 150,
  },
  container: {},
});

export default LogInScreen;