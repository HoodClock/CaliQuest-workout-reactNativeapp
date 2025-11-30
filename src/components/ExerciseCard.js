import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function ExerciseCard({ item, onPress }) {
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
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: { flexDirection: "row", backgroundColor: "#f2f2f2", borderRadius: 10, overflow: "hidden" },
    thumb: { width: 120, height: 90 },
    info: { padding: 12, justifyContent: "center" },
    name: { fontSize: 16, fontWeight: "700" },
    duration: { marginTop: 6, color: "#666" },
});
