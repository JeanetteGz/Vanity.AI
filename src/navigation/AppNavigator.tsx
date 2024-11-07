// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen'; // Verify this path is correct
import SignupScreen from '../screens/auth/SignupScreen'; // Verify this path is correct

type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Optional: Hide the header for HomeScreen
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ title: 'Sign Up' }} // Optional: Customize header title for SignupScreen
        />
        {/* Add other screens here as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
