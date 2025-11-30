import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import exercises from "../data/exercises";
import ExerciseCard from "../components/ExerciseCard";
import { useAuth } from "../auth/AuthContext";
import { favoritesService } from "../auth/favroitesServices";

export default function FavoritesScreen({ navigation }) {
    const [favoriteExercises, setFavoriteExercises] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            loadFavorites();
        }
    }, [user]);

    const loadFavorites = async () => {
        if (!user) return;
        
        const result = await favoritesService.getFavorites(user.uid);
        if (result.success) {
            const favExercises = exercises.filter(exercise =>
                result.favorites.includes(exercise.id)
            );
            setFavoriteExercises(favExercises);
        }
    };

    const handleExercisePress = (item, index) => {
        navigation.navigate("ExerciseDetail", {
            exercises: favoriteExercises,
            index: index,
        });
    };

    if (!user) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Please sign in to view favorites</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.backButtonText}>← Back to Home</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (favoriteExercises.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No favorite exercises yet!</Text>
                <Text style={styles.emptySubtext}>
                    Tap the heart icon on exercises to add them to favorites
                </Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.backButtonText}>← Back to Home</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Favorite Exercises</Text>

            <FlatList
                data={favoriteExercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <ExerciseCard
                        item={item}
                        onPress={() => handleExercisePress(item, index)}
                    />
                )}
                contentContainerStyle={{ padding: 12 }}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
            <TouchableOpacity
                style={[styles.backButton, styles.button]}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.buttonText}>← Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: { fontSize: 28, fontWeight: "800", padding: 16 },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
    button: {
        backgroundColor: "#111",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 15,
        width: '80%',
        alignItems: 'center'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
        textAlign: 'center'
    },
    emptySubtext: {
        fontSize: 14,
        color: "#666",
        textAlign: 'center'
    },
    backButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: "#111",
        fontWeight: "600",
    },
});