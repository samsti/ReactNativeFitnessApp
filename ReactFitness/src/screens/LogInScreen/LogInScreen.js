import React, {useState} from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet , useWindowDimensions, ScrollView} from "react-native";
import Input from '../../components/Input';
import CustomButton from '../../components/customButton';
import { useNavigation } from '@react-navigation/native';
import index from '../HomeScreen';
import userIcon from '../../assets/images/user.png';
import lockIcon from '../../assets/images/zamek.png';


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
    
    <View style={styles.root}>
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
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: "black",
      justifyContent: 'center',
    },
    logo: {
        width: '70%',
        maxWidth: 500,
        maxHeight: 200,
    },
    container: {
      
    }
});

export default LogInScreen;
