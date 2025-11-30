import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ExerciseListScreen from '../screens/ExerciseListScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import TimerScreen from '../screens/TimerScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Exercises" component={ExerciseListScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      <Stack.Screen name="Timer" component={TimerScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}