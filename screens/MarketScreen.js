import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import CryptoPriceListItem from "../components/CryptoPriceListItem";
import BottomSheetPriceChart from "../components/BottomSheetPriceChart";
import { getMarketData } from "../services/cryptoGeckoService";

const MarketScreen = () => {
  const bottomSheetModalRef = useRef(null);
  const [data, setData] = useState([]);
  const [selectedCryptoData, setSelectedCryptoData] = useState(null);
  const snapPoints = useMemo(() => ["50%", "50%"], []);

  useEffect(() => {
    (async () => {
      const marketData = await getMarketData();
      setData(marketData);
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {}, 0.1);
  }, [selectedCryptoData]);

  const renderCryptoPriceListItem = ({ item, index }) => {
    const openBottomSheetPriceChartModal = () => {
      setSelectedCryptoData(item);
      bottomSheetModalRef.current.present();
    };

    return (
      <CryptoPriceListItem
        logoUrl={item.image}
        name={item.name}
        symbol={item.symbol}
        currentPrice={item.current_price}
        priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
        onPress={openBottomSheetPriceChartModal}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderCryptoPriceListItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
        backdropComponent={BottomSheetBackdrop}
      >
        {selectedCryptoData ? (
          <BottomSheetPriceChart
            logoUrl={selectedCryptoData.image}
            name={selectedCryptoData.name}
            symbol={selectedCryptoData.symbol}
            currentPrice={selectedCryptoData.current_price}
            priceChangePercentage7d={
              selectedCryptoData.price_change_percentage_7d_in_currency
            }
            sparkline={selectedCryptoData.sparkline_in_7d.price}
          />
        ) : null}
      </BottomSheetModal>
    </SafeAreaView>
  );
};

const ListHeader = () => {
  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Markets</Text>
      </View>

      <View style={styles.divider} />
    </View>
  );
};

export default React.memo(MarketScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  titleWrapper: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "black",
    marginTop: 16,
    marginHorizontal: 16,
  },
  bottomSheet: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3,
  },
});
