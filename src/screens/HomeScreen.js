import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CaliQuest</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Exercises")}
      >
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Text style={styles.buttonText}>My Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.buttonText}>My Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 36, fontWeight: "800", marginBottom: 30 },
  button: { 
    backgroundColor: "#111", 
    paddingVertical: 14, 
    paddingHorizontal: 30, 
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center'
  },
  secondaryButton: {
    backgroundColor: "#444",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});