import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { authService } from '../auth/authService';

export default function ProfileScreen({ navigation }) {
  const { user, userProfile, setUserProfile } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const result = await authService.signOut();
            // if (result.success) {
            //   navigation.navigate('Login');
            // }
          }
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Not signed in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>
            {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={styles.displayName}>
          {userProfile?.displayName || 'User'}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Workout Stats</Text>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Workouts:</Text>
          <Text style={styles.statValue}>{userProfile?.workoutStats?.totalWorkouts || 0}</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Minutes:</Text>
          <Text style={styles.statValue}>{userProfile?.workoutStats?.totalMinutes || 0}</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Favorite Exercises:</Text>
          <Text style={styles.statValue}>
            {userProfile?.workoutStats?.favoriteExercises?.length || 0}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarLargeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  signOutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});