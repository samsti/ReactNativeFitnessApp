import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet , ScrollView, Image, KeyboardAvoidingView} from "react-native";
import Input from '../../components/Input';
import CustomButton from '../../components/customButton';
import Navigation from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import userIcon from '../../assets/images/user.png';
import lockIcon from '../../assets/images/zamek.png';

// require('../../assets/images/user.png'


const RegisterScreen = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordRepeat, setPasswordRepeat] = useState('');
  const [iconImage, setIconImage] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleImageChange = (text) => {
    // Update the state with the new image URL entered in the TextInput
    setIconImage(text);
  };

  const navigation = useNavigation();

    const onRegisterPressed = () => {
      console.warn("Log in")

      navigation.navigate('Home');
    };

    const onHaveAccount = () => {
      console.warn("Sign in")

      navigation.navigate('LogIn');
    };

  return (
    <KeyboardAvoidingView behavior="height" contentContainerStyle={{ flex: 1}} style={styles.root}>
      <Text style={styles.title}>Create an account</Text>
        <Input 
        placeholder="Username" 
        value={Username} 
        imageValue={iconImage}
        setValue={setUsername} 
        secureTextEntry={false}
        imageSource={iconImage !== '' ? { uri: iconImage } : userIcon}
        type="REGISTER" 
        />

        <Input 
        placeholder="Password" 
        value={Password} 
        imageValue={iconImage}
        setValue={setPassword} 
        secureTextEntry={true}
        imageSource={iconImage !== '' ? { uri: iconImage } : lockIcon}
        type="REGISTER" 
        />

        <Input 
        placeholder="Repeat Password"  
        value={PasswordRepeat}  
        setValue={setPasswordRepeat}  
        secureTextEntry={true}
        imageSource={iconImage !== '' ? { uri: iconImage } : lockIcon}
        type="REGISTER" 
        />

        <View style ={styles.line}></View>

        <Input 
        placeholder="věk"  
        value={age}  
        setValue={setAge}  
        secureTextEntry={false}
        imageSource={iconImage !== '' ? { uri: iconImage } : lockIcon}
        type="REGISTER2" 
        />
         <Input 
        placeholder="váha"  
        value={weight}  
        setValue={setWeight}  
        secureTextEntry={false}
        imageSource={iconImage !== '' ? { uri: iconImage } : lockIcon}
        type="REGISTER2" 
        />
        <Input 
        placeholder="výška"  
        value={height}  
        setValue={setHeight}  
        secureTextEntry={false}
        imageSource={iconImage !== '' ? { uri: iconImage } : lockIcon}
        type="REGISTER2" 
        />


      <CustomButton 
      text="Register" 
      onPress={onRegisterPressed} 
      type="REGISTER" 
      />
      <CustomButton 
      text="Have an account? Sign in" 
      onPress={onHaveAccount}
      type="PRIMARY"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 0,
        borderRadius: 5,
        backgroundColor: "black",
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: "20%",
        width: "95%",
        marginLeft: "2.5%",
    },
    title:{
      fontSize: 30, 
      fontWeight: 'bold',
      color: "#FF5E00",
      margin: 10,
    },
    line: {
      height: 1,
      width: "65%",
      backgroundColor: "#FF5E00",
      marginTop: 10,
      marginBottom: 23,
    },
});

export default RegisterScreen;
