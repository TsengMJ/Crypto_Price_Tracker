import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";

const { width: SIZE } = Dimensions.get("window");

const BottomSheetPriceChart = ({
  name,
  symbol,
  logoUrl,
  currentPrice,
  priceChangePercentage7d,
  sparkline,
}) => {
  const sharedCurrentPrice = useSharedValue(currentPrice);
  const [chartReady, setChartReady] = useState(false);
  const percentageColor = priceChangePercentage7d > 0 ? "green" : "red";

  useEffect(() => {
    sharedCurrentPrice.value = currentPrice;

    setTimeout(() => {
      setChartReady(true);
    }, 0);
  }, [currentPrice]);

  const formatUSD = (value) => {
    "worklet";
    if (value === "") {
      return `$ ${currentPrice.toLocaleString("en-US", { currency: "USD" })}`;
    }

    const fixedVal = `$ ${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

    return fixedVal;
  };

  return (
    <ChartPathProvider
      data={{ points: sparkline, smoothingStrategy: "bezier" }}
    >
      <View style={styles.chartWrapper}>
        <View style={styles.titlesWrapper}>
          <View style={styles.upperTitleWrapper}>
            <View style={styles.upperLeftTitleWrapper}>
              <Image source={{ uri: logoUrl }} style={styles.image} />
              <View style={styles.subtitleWrapper}>
                <Text style={styles.subtitle}>
                  {name} ({symbol.toUpperCase()})
                </Text>
              </View>
            </View>

            <Text style={styles.subtitle}>7d</Text>
          </View>

          <View style={styles.bottomTitleWrapper}>
            <ChartYLabel format={formatUSD} style={styles.price} />
            <Text style={[styles.percentage, { color: percentageColor }]}>
              {priceChangePercentage7d.toFixed(2)}%
            </Text>
          </View>
        </View>

        {chartReady ? (
          <View style={{ marginTop: 0 }}>
            <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
            <ChartDot style={{ backgroundColor: "black" }} />
          </View>
        ) : null}
      </View>
    </ChartPathProvider>
  );
};

export default React.memo(BottomSheetPriceChart);

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3,
    zIndex: 999,
  },
  chartWrapper: {},
  titlesWrapper: {
    margin: 16,
  },
  upperTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 32,
    width: 32,
  },
  subtitleWrapper: {
    marginHorizontal: 8,
  },
  subtitle: {
    color: "gray",
  },
  bottomTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
  },
  percentage: {
    fontSize: 18,
  },
});
