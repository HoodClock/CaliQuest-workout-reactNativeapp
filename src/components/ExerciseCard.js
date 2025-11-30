import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { favoritesService } from "../utils/favoritesService";

export default function ExerciseCard({ item, onPress }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkFavoriteStatus();
    }, [item.id]);

    const checkFavoriteStatus = async () => {
        const favorite = await favoritesService.isFavorite(item.id);
        setIsFavorite(favorite);
    };

    const handleFavoritePress = async () => {
        const newFavoriteStatus = await favoritesService.toggleFavorite(item.id);
        setIsFavorite(newFavoriteStatus);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <LottieView
                source={item.gif}
                autoPlay
                loop
                style={styles.thumb}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.duration}>{item.duration}s</Text>
            </View>
            <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={handleFavoritePress}
            >
                <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>
                    {isFavorite ? "♥" : "♡"}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: { 
        flexDirection: "row", 
        backgroundColor: "#f2f2f2", 
        borderRadius: 10, 
        overflow: "hidden",
        position: 'relative'
    },
    thumb: { width: 120, height: 90 },
    info: { padding: 12, justifyContent: "center", flex: 1 },
    name: { fontSize: 16, fontWeight: "700" },
    duration: { marginTop: 6, color: "#666" },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 4,
    },
    favoriteIcon: {
        fontSize: 20,
        color: '#ccc',
    },
    favoriteActive: {
        color: '#ff3b30',
    }
});