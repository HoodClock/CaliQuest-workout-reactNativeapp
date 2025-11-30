import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ExerciseListScreen from '../screens/ExerciseListScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import TimerScreen from '../screens/TimerScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileButton from '../components/ProfileButton';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <ProfileButton onPress={() => navigation.navigate('Profile')} />
          ),
        })}
      />
      <Stack.Screen 
        name="Exercises" 
        component={ExerciseListScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <ProfileButton onPress={() => navigation.navigate('Profile')} />
          ),
        })}
      />
      <Stack.Screen 
        name="ExerciseDetail" 
        component={ExerciseDetailScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <ProfileButton onPress={() => navigation.navigate('Profile')} />
          ),
        })}
      />
      <Stack.Screen 
        name="Timer" 
        component={TimerScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <ProfileButton onPress={() => navigation.navigate('Profile')} />
          ),
        })}
      />
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <ProfileButton onPress={() => navigation.navigate('Profile')} />
          ),
        })}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}