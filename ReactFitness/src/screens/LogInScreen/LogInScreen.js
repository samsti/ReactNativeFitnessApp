import React, {useState} from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet , useWindowDimensions, ScrollView} from "react-native";
import Input from '../../components/Input';
import CustomButton from '../../components/customButton';
import { useNavigation } from '@react-navigation/native';

const LogInScreen = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

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
        <Input placeholder="Username" value={Username} setValue={setUsername} secureTextEntry={false}/>
        <Input placeholder="Password" value={Password} setValue={setPassword} secureTextEntry={true}/>
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
