import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet , ScrollView, Image, KeyboardAvoidingView, Alert} from "react-native";
import Input from '../../components/Input';
import CustomButton from '../../components/customButton';
import Navigation from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import userIcon from '../../assets/images/user.png';
import lockIcon from '../../assets/images/zamek.png';
import ageIcon from '../../assets/images/age_icon.png';
import heightIcon from '../../assets/images/height_icon.png';
import weightIcon from '../../assets/images/weight_icon.png';
import mailIcon from '../../assets/images/mail.png';
import firestore from '@react-native-firebase/firestore';



const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [PasswordRepeat, setPasswordRepeat] = useState('');
  const [iconImage, setIconImage] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const navigation = useNavigation();

  const signUpTest = async () => {
    try {
      if (!username || !Password || !email || !age || !weight || !height) {
        throw new Error('Please fill in all fields');
      }
  
      // Add user data to Firestore
      await firestore().collection('user').add({
        username,
        Password,
        email,
        age,
        weight,
        height,
      });
  
      Alert.alert("User Created");
      navigation.navigate('LogIn');
    } catch (error) {
      console.error('Sign-up error:', error);
      Alert.alert("Please, fill all the fields", error.message);
    }
  };

  const handleImageChange = (text) => {
    // Update the state with the new image URL entered in the TextInput
    setIconImage(text);
  };

  const onHaveAccount = () => {
    console.warn("Sign in");
    navigation.navigate('LogIn');
  };

  return (
    <KeyboardAvoidingView behavior="height" contentContainerStyle={{ flex: 1}} style={styles.root}>
      <Text style={styles.title}>Create an account</Text>
        <Input 
        placeholder="Username" 
        value={username} 
        imageValue={iconImage}
        setValue={setUsername} 
        secureTextEntry={false}
        imageSource={iconImage !== '' ? { uri: iconImage } : userIcon}
        type="REGISTER" 
        />

        <Input 
        placeholder="Email" 
        value={email} 
        imageValue={iconImage}
        setValue={setEmail} 
        secureTextEntry={false}
        imageSource={iconImage !== '' ? { uri: iconImage } : mailIcon}
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
        placeholder="Age"  
        keyboardType='numeric'
        value={age}  
        setValue={setAge}  
        secureTextEntry={false}
        imageSource={iconImage !== '' ? { uri: iconImage } : ageIcon}
        type="REGISTER2" 
        />
         <Input 
        placeholder="Weight"  
        value={weight}  
        setValue={setWeight}  
        secureTextEntry={false}
        imageSource={iconImage !== '' ? { uri: iconImage } : weightIcon}
        type="REGISTER2" 
        keyboardType="numeric"
        />
        <Input 
        placeholder="Height"  
        value={height}  
        setValue={setHeight}  
        secureTextEntry={false}
        imageSource={iconImage !== '' ? { uri: iconImage } : heightIcon}
        type="REGISTER2" 
        keyboardType="numeric"
        />


      <CustomButton 
      text="Register" 
      onPress={signUpTest} 
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
      fontFamily: "Rajdhani-Bold",
      fontSize: 30, 
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
