import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import TimerDisplay from "../components/TimerDisplay";
import { formatTime } from "../utils/timer";
import LottieView from "lottie-react-native";

export default function TimerScreen({ route, navigation }) {
    const { exercises, startIndex = 0 } = route.params;
    const [index, setIndex] = useState(startIndex);
    const [timeLeft, setTimeLeft] = useState(exercises[startIndex].duration || 45);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    // update when index changes
    useEffect(() => {
        const dur = exercises[index]?.duration || 45;
        setTimeLeft(dur);
        setRunning(false);
        return () => clearInterval(intervalRef.current);
    }, [index]);

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((t) => {
                    if (t <= 1) {
                        clearInterval(intervalRef.current);
                        setRunning(false);
                        // Alert to move next
                        setTimeout(() => {
                            if (index < exercises.length - 1) {
                                Alert.alert(
                                    "Time's up",
                                    "Move to next exercise?",
                                    [
                                        {
                                            text: "Next",
                                            onPress: () => setIndex((i) => i + 1),
                                        },
                                        {
                                            text: "Stop",
                                            onPress: () => navigation.popToTop(),
                                            style: "cancel",
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                Alert.alert("Workout complete", "Good job!", [
                                    { text: "Finish", onPress: () => navigation.popToTop() },
                                ]);
                            }
                        }, 200);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
            return () => clearInterval(intervalRef.current);
        } else {
            clearInterval(intervalRef.current);
            return () => { };
        }
    }, [running, index]);

    const onPlayPause = () => setRunning((r) => !r);
    const onReset = () => {
        setRunning(false);
        setTimeLeft(exercises[index].duration || 45);
    };

    const goNext = () => {
        if (index < exercises.length - 1) setIndex((i) => i + 1);
        else {
            Alert.alert("Done", "This was the last exercise.", [{ text: "OK", onPress: () => navigation.popToTop() }]);
        }
    };

    const item = exercises[index];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {item.name} ({index + 1}/{exercises.length})
            </Text>

            <LottieView
                source={item.gif}
                autoPlay
                loop
                style={styles.gif}
            />

            <View style={styles.timerContainer}>
                <TimerDisplay time={formatTime(timeLeft)} />
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton} onPress={onPlayPause}>
                    <Text style={styles.controlText}>{running ? "Pause" : "Start"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={onReset}>
                    <Text style={styles.controlText}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={goNext}>
                    <Text style={styles.controlText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, alignItems: "center", backgroundColor: "#fff" },
    title: { fontSize: 20, fontWeight: "800", marginVertical: 8 },
    gif: { width: "100%", height: 300, borderRadius: 8, backgroundColor: "#000" },
    timerContainer: { marginVertical: 18 },
    controls: { flexDirection: "row", gap: 12 },
    controlButton: { backgroundColor: "#111", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 8, marginHorizontal: 6 },
    controlText: { color: "#fff", fontWeight: "700" },
});
