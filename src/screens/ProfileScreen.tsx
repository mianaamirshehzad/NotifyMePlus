import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const uploadPhoto = async (uri: string) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`photos/${filename}`);
    await storageRef.putFile(uri);

    const url = await storageRef.getDownloadURL();
    setPhotoUrl(url);
    await firestore().collection('users').doc('your-user-id').set({ photoUrl: url });
  };

  const handleCameraLaunch = () => {
    launchCamera({}, response => {
      if (response.assets && response.assets.length > 0) {
        uploadPhoto(response.assets[0].uri);
      } else if (response.errorMessage) {
        Alert.alert('Camera Error', response.errorMessage);
      }
    });
  };

  const handleGalleryLaunch = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        uploadPhoto(response.assets[0].uri);
      } else if (response.errorMessage) {
        Alert.alert('Gallery Error', response.errorMessage);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      {photoUrl ? <Image source={{ uri: photoUrl }} style={styles.image} /> : <Text>No photo uploaded</Text>}
      <Button title="Take Photo" onPress={handleCameraLaunch} />
      <Button title="Choose from Gallery" onPress={handleGalleryLaunch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

export default ProfileScreen;
