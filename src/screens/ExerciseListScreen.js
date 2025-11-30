import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import exercises from "../data/exercises";
import ExerciseCard from "../components/ExerciseCard";

export default function ExerciseListScreen({ navigation }) {
    return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercises</Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ExerciseCard
            item={item}
            onPress={() =>
              navigation.navigate("ExerciseDetail", {
                exercises,
                index,
              })
            }
          />
        )}
        contentContainerStyle={{ padding: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 28, fontWeight: "800", padding: 16 },
});
