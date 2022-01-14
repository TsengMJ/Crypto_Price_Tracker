import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CryptoPriceListItem = ({
  logoUrl,
  symbol,
  name,
  currentPrice,
  priceChangePercentage7d,
  onPress,
}) => {
  const percentageColor = priceChangePercentage7d > 0 ? "green" : "red";

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        <View style={styles.leftWrapper}>
          <Image source={{ uri: logoUrl }} style={styles.image} />
          <View style={styles.titleWrapper}>
            <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>

        <View style={styles.rightWrapper}>
          <Text style={styles.price}>
            ${currentPrice.toLocaleString("en-US", { currency: "USD" })}
          </Text>
          <Text style={[styles.percentage, { color: percentageColor }]}>
            {priceChangePercentage7d.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoPriceListItem;

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingVertical: 4,
    marginHorizontal: 16,
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
  },
  titleWrapper: {
    marginLeft: 16,
  },
  symbol: {
    fontSize: 15,
    fontWeight: "600",
  },
  name: {
    fontSize: 13,
    color: "gray",
  },
  centerWrapper: {},
  rightWrapper: {
    justifyContent: "center",
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "right",
  },
  percentage: {
    fontSize: 13,
    textAlign: "right",
  },
});
