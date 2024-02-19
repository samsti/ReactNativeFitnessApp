import firestore from '@react-native-firebase/firestore';

export function useAuth() {
    const [currentUser, setCurrentUser] = useState()
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user))
      return unsub
    }, [])
  
    return currentUser
  }

export const getUser = async () => {

    try {
      // Retrieve the user with the provided username from Firestore
      const userSnapshot = await firestore().collection('user').doc(useAuth).get();
      
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
    } catch (error) {
      console.error('Sign-in error:', error);
      Alert.alert('Sign-in Error', 'An error occurred during sign-in. Please try again.');
    }
  };

  export default useAuth;