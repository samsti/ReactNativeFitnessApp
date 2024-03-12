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
      const userSnapshot = await firestore().collection('user').where('username', '==', username).get();
      
      if (userSnapshot.empty) {
        Alert.alert('Invalid Input', 'User not found');
        return;
      }

      const userData = userSnapshot.docs[0].data();

      if (Password !== userData.Password) {
        Alert.alert('Invalid Input', 'Username or password is incorrect');
        return;
      }

      navigation.navigate('Home');
      Alert.alert('Logged in successfully');
      await AsyncStorage.setItem('username', username);

    } catch (error) {
      Alert.alert('Sign-in Error', 'An error occurred during sign-in. Please try again.');
    }

    setUsername('');
    setPassword('');
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