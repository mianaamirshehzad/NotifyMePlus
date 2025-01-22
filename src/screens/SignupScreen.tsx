import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { errorToast, successToast } from '../components/ShowToast';
import { useNavigation } from '@react-navigation/native';

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const tempEmailProviders = ['10minutemail.com', 'tempmail.com', 'mailinator.com']; // Temporary email domains
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Strong password requirements

  const isTemporaryEmail = (email: string): boolean => {
    const domain = email.split('@')[1];
    return tempEmailProviders.some((provider) => domain === provider);
  };

  const validateEmail = (): boolean => {
    if (!emailRegex.test(email)) {
      errorToast({
        text1: 'Invalid Email',
        text2: 'Please enter a valid email addres'
      });
      return false;
    }

    if (isTemporaryEmail(email)) {
      errorToast({
        text1: 'Temporary Email',
        text2: 'Please use a valid email address'
      })
      return false;
    }
    return true;
  };

  const validatePassword = (): boolean => {
    if (!passwordRegex.test(password)) {
      errorToast({
         text1: 'Weak Password',
         text2: 'Your password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
      });
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (validateEmail() && validatePassword()) {
      try {
        await auth().createUserWithEmailAndPassword(email, password);
        successToast({
          text1: 'Success',
          text2: 'You have successfully signed up!'
        })

        navigation.navigate("BottomTabs");
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          errorToast({
            text1: 'Email Already in Use',
            text2: 'Please use a different email address.'
          })
        } else if (error.code === 'auth/invalid-email') {
          errorToast({
            text1: 'Invalid Email',
            text2: 'Please enter a valid email address.'
          })
        } else {
          errorToast({
            text1: 'Error', 
            text2: 'An unknown error occurred!'
          })
        }
      } finally {
        setEmail('');
        setPassword('');
      }
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPasswordScreen");  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    marginTop: 15,
    fontSize: 14,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
