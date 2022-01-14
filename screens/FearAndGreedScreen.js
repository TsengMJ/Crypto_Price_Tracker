import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { getFearAndGreedIndexes } from "../services/fearAndGreedIndexService";

import FGIndexSpeedometer from "../components/FGIndexSpeedometer";
import FGIndexMonthLineChart from "../components/FGIndexMonthLineChart";
import moment from "moment";

const FearAndGreedScreen = () => {
  const [FGIndexes, setFGIndexes] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

  useEffect(() => {
    (async () => {
      const FGIndexes = await getFearAndGreedIndexes();
      await setFGIndexes(FGIndexes);

      const lineChartData = FGIndexes.slice()
        .reverse()
        .map((item, index) => {
          return {
            x: moment(item.timestamp).unix(),
            y: parseInt(item.value),
          };
        });

      setLineChartData(lineChartData);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {FGIndexes ? (
        <FGIndexSpeedometer value={parseInt(FGIndexes[0].value)} />
      ) : null}

      {lineChartData ? <FGIndexMonthLineChart data={lineChartData} /> : null}
    </SafeAreaView>
  );
};

export default FearAndGreedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
});
