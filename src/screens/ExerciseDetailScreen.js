import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native"

export default function ExerciseDetailScreen({ route, navigation }) {
    const { exercises, index } = route.params;
    const item = exercises[index];

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{item.name}</Text>

            <LottieView
                source={item.gif}
                autoPlay
                loop
                style={styles.gif}
            />

            <Text style={styles.info}>Duration: {item.duration}s</Text>

            <TouchableOpacity
                style={styles.playButton}
                onPress={() =>
                    navigation.navigate("Timer", {
                        exercises,
                        startIndex: index,
                    })
                }
            >
                <Text style={styles.playText}>Play</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 18, alignItems: "center", backgroundColor: "#fff" },
    title: { fontSize: 26, fontWeight: "800", marginVertical: 12 },
    gif: { width: "100%", height: 320, borderRadius: 8 },
    info: { fontSize: 16, marginTop: 14 },
    playButton: { marginTop: 24, backgroundColor: "#111", paddingVertical: 14, paddingHorizontal: 32, borderRadius: 10 },
    playText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
