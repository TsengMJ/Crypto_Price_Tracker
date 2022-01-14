import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import RNSpeedometer from "react-native-speedometer";

const SPEEDOMETER_LABELS = [
  { name: "Extreme Fear", activeBarColor: "#ff5400" },
  { name: "Fear", activeBarColor: "#f4ab44" },
  { name: "Greed", activeBarColor: "#f2cf1f" },
  { name: "Extreme Greed", activeBarColor: "#14eb6e" },
];

const FGIndexSpeedometer = ({ title, value }) => {
  const [FGStatus, setFGStatus] = useState(null);

  useEffect(() => {
    let newStatus;
    switch (true) {
      case value < 25:
        newStatus = { title: "Extreme Fear", color: "#ff5400" };
        break;
      case value < 50:
        newStatus = { title: "Fear", color: "#f4ab44" };
        break;
      case value < 75:
        newStatus = { title: "Extreme Greed", color: "#f2cf1f" };
        break;
      default:
        newStatus = { title: "Extreme Greed", color: "#14eb6e" };
    }

    setFGStatus(newStatus);
  }, [value]);

  return (
    <View style={styles.speedometerWrapper}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Fear & Greed Index (Newest)</Text>
      </View>

      <RNSpeedometer
        value={value}
        maxValue={100}
        defaultValue={0}
        labels={SPEEDOMETER_LABELS}
        imageWrapperStyle={{ top: 2 }}
        labelNoteStyle={{ height: 0 }}
      />

      {FGStatus ? (
        <View style={styles.statusWrapper}>
          <Text style={[styles.statusText, { color: FGStatus.color }]}>
            {FGStatus.title}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default FGIndexSpeedometer;

const styles = StyleSheet.create({
  titleWrapper: {
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  statusWrapper: {
    marginTop: 24,
    paddingVertical: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
