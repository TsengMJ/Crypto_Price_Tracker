import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import moment from "moment";

const { width: SIZE } = Dimensions.get("window");

const FGIndexMonthLineChart = ({ data }) => {
  const formatYLabel = (value) => {
    "worklet";

    if (value === "") {
      return `${data[data.length - 1].y}`;
    }

    return `${value}`;
  };

  const formatXLabel = (value) => {
    "worklet";
    if (value === "") {
      const date = new Date(Number(data[data.length - 1].x * 1000));
      const d = date.getDate();
      const n = date.getMonth() + 1;
      const y = date.getFullYear();
      return ` (${y}-${n}-${d})`;
    }
    const date = new Date(Number(value * 1000));
    const d = date.getDate();
    const n = date.getMonth() + 1;
    const y = date.getFullYear();
    return ` (${y}-${n}-${d})`;
  };

  return (
    <ChartPathProvider data={{ points: data, smoothingStrategy: "bezier" }}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Monthly Fear & Greed Index</Text>
        </View>
        <View style={{ marginTop: 0 }}>
          <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
          <ChartDot style={{ backgroundColor: "black" }} />
        </View>
        <View style={styles.promptWrapper}>
          <Text style={styles.subtitle}>Value: </Text>
          <ChartYLabel format={formatYLabel} style={styles.subtitle} />
          <ChartXLabel format={formatXLabel} style={styles.subtitle} />
        </View>
      </View>
    </ChartPathProvider>
  );
};

export default FGIndexMonthLineChart;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  titleWrapper: {
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  promptWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});
