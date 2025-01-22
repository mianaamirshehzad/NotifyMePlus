import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const NotificationScreen: React.FC = () => {

//   useEffect(() => {
//     PushNotification.configure({
//       onNotification: function(notification) {
//         console.log('LOCAL NOTIFICATION ==>', notification);
//       },
//       requestPermissions: Platform.OS === 'ios',
//     });
//   }, []);

  
//   // Create a function to display the notification
//   const showNotification = () => {
//     PushNotification.localNotification({
//       title: "Test Notification",
//       message: 'This is a test notification sent to yourself!',
//       playSound: true,
//       soundName: 'default',
//   });
// };
    

  // const sendNotification = () => {
  //   PushNotification.localNotification({
  //     title: 'Test Notification',
  //     message: 'This is a test notification sent to yourself!',
  //   });
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circularButton}
      // onPress={sendNotification}
      >
        <Text style={styles.buttonText}>Notify Me</Text>
      </TouchableOpacity>
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
  circularButton: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 10, 
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NotificationScreen;
