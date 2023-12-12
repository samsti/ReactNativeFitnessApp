import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet , ScrollView} from "react-native";
import Input from '../../components/Input';
import CustomButton from '../../components/customButton';
import Navigation from '../../navigation';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordRepeat, setPasswordRepeat] = useState('');

  const navigation = useNavigation();

    const onRegisterPressed = () => {
      console.warn("Log in")
    };

    const onHaveAccount = () => {
      console.warn("Sign in")

      navigation.navigate('LogIn');
    };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>
        <Input 
        placeholder="Username" 
        value={Username} 
        setValue={setUsername} 
        secureTextEntry={false}
        />

        <Input 
        placeholder="Password" 
        value={Password} 
        setValue={setPassword} 
        secureTextEntry={true}
        />

        <Input 
        placeholder="Repeat Password"  
        value={PasswordRepeat}  
        setValue={setPasswordRepeat}  
        secureTextEntry={true}
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
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 0,
        backgroundColor: "black",
        justifyContent: 'center',
        textAlign: 'center',
    },
    container: {
      
    },
    title:{
      fontSize: 30, 
      fontWeight: 'bold',
      color: "#FF5E00",
      margin: 10,
    }
});

export default RegisterScreen;
