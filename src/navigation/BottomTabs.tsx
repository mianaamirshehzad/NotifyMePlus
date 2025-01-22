import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from '../screens/NotificationScreen';
import NotesScreen from '../screens/NotesScreen';
import CalculateScreen from '../screens/CalculateScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Notify" component={NotificationScreen} />
        <Tab.Screen name="Image" component={ProfileScreen} />
        <Tab.Screen name="Notes" component={NotesScreen} />
        <Tab.Screen name="Calculator" component={CalculateScreen} />
      </Tab.Navigator>
  );
};

export default BottomTabs;