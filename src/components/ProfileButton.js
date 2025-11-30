import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../auth/AuthContext';

export default function ProfileButton({ onPress }) {
  const { userProfile } = useAuth();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});