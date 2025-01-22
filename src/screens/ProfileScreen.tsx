import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Images from '../assets/Images';


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

  const handleCameraLaunch = async () => {
    try {
      const options : any = {
        mediaType: 'photo',
        quality: 1,
      };
      const result = await ImagePicker.launchImageLibrary(options);
      console.log("gallery result = > ", result);

    } catch (error: any) {
      console.log("error = > ", error);
    }
    // launchCamera({}, response => {
    //   if (response.assets && response.assets.length > 0) {
    //     console.log("res = > ", response.assets);
        
    //     // uploadPhoto(response.assets[0].uri);
    //   } else if (response.errorMessage) {
    //     Alert.alert('Camera Error', response.errorMessage);
    //   }
    // });
  };

  const handleGalleryLaunch = async () => {
    try {
      const options : any = {
        mediaType: 'photo',
        quality: 1,
      };
      const result = await launchImageLibrary(options);
      console.log("gallery result = > ", result);

    } catch (error: any) {
      console.log("error = > ", error);
    }

    // launchImageLibrary({}, response => {
    //   if (response.assets && response.assets.length > 0) {
    //     uploadPhoto(response.assets[0].uri);
    //   } else if (response.errorMessage) {
    //     Alert.alert('Gallery Error', response.errorMessage);
    //   }
    // });
  };

  const handleChangePhoto = () => {
    Alert.alert(
      'Change Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: handleCameraLaunch },
        { text: 'Choose from Gallery', onPress: handleGalleryLaunch },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <View style={styles.imageContainer}>
        <Image source={photoUrl ? { uri: photoUrl } : Images.accountIcon} style={styles.image} />
        <TouchableOpacity style={styles.plusIconContainer} onPress={handleChangePhoto}>
          <Image source={Images.plusIonc} style={styles.plusIcon} />
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginVertical: 20,
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
});

export default ProfileScreen;