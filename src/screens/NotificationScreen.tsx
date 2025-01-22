import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';

const NotificationScreen: React.FC = () => {
  // useEffect(() => {
  //   // Configure push notifications
  //   PushNotification.configure({
  //     onNotification: function (notification: any) {
  //       console.log('Notification:', notification);
  //     },
  //   });
  // }, []);

  const sendNotification = () => {
    PushNotification.localNotification({
      title: 'Test Notification',
      message: 'This is a test notification sent to yourself!',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notification Screen</Text>
      <Button title="Send Notification" 
      // onPress={sendNotification} 
      color="red" />
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
});

export default NotificationScreen;
