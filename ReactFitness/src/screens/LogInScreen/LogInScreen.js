import React, {useState} from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet , useWindowDimensions, ScrollView, KeyboardAvoidingView} from "react-native";
import Input from '../../components/Input';
import CustomButton from '../../components/customButton';
import { useNavigation } from '@react-navigation/native';
import userIcon from '../../assets/images/user.png';
import lockIcon from '../../assets/images/zamek.png';
import logo from '../../assets/images/logo_login.png';
import HomeScreen from '../HomeScreen';


const LogInScreen = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordRepeat, setPasswordRepeat] = useState('');
  const [iconImage, setIconImage] = useState('');

  const handleImageChange = (text) => {
    // Update the state with the new image URL entered in the TextInput
    setIconImage(text);
  };
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onLogInPressed = () => {
      console.warn("Log in")

      navigation.navigate('Home');
    };

    const onDontHaveAccount = () => {
      console.warn("Create Account")

      navigation.navigate('Register');
    };

    

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="height" contentContainerStyle={{ flex: 1}} style={styles.root}>
      <Image source={logo} style={styles.logo} />
        <Input 
          placeholder="Username" 
          value={Username} 
          imageValue={iconImage}
          setValue={setUsername} 
          secureTextEntry={false}
          imageSource={iconImage !== '' ? { uri: iconImage } : userIcon}
        />
        <Input 
          placeholder="Password" 
          value={Password} 
          imageValue={iconImage}
          setValue={setPassword} 
          secureTextEntry={true}
          imageSource={iconImage !== '' ? { uri: iconImage } : lockIcon}
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
      container: {
        
      },
  });
  
  export default LogInScreen;
  
  