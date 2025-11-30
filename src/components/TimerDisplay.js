import React from "react";
import { Text } from "react-native";

export default function TimerDisplay({ time }) {
  return <Text style={{ fontSize: 56, fontWeight: "900" }}>{time}</Text>;
}
