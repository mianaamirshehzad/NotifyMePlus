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
import { errorToast, infoToast } from '../components/ShowToast';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen: React.FC = () => {
    const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      errorToast({
        text1: 'Error',
        text2: 'Please enter your email address.'
      })
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      infoToast({
        text1: 'Password Reset',
        text2: 'A password reset link has been sent to your email address.'
      });

      navigation.navigate("SignupScreen");
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        errorToast({
            text1: 'Invalid Email',
            text2: 'Please enter a valid email address.'
        })
      } else if (error.code === 'auth/user-not-found') {
        errorToast({
            text1: 'User Not Found',
            text2: 'There is no user corresponding to that email.'
        })
      } else {
        errorToast({
            text1: 'Error',
            text2: 'An unknown error'
        })
      }
    } finally {
        setEmail('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

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
});