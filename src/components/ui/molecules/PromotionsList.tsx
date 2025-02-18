import React, { useRef } from "react";
import { View, FlatList, StyleSheet, Dimensions, Animated } from "react-native";
import PromoCard from "../atoms/PromotionCard";

const { width } = Dimensions.get("window");

const promotions = [
  { id: "1", name: "Promo 1" },
  { id: "2", name: "Promo 2" },
  { id: "3", name: "Promo 3" },
];

const PromotionsList = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={promotions}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View style={[styles.cardContainer, { transform: [{ scale }] }]}>
              <PromoCard />
            </Animated.View>
          );
        }}
      />

      {/* Indicadores de paginación */}
      <View style={styles.pagination}>
        {promotions.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#D3D3D3", "#12171D", "#D3D3D3"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, { backgroundColor }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  cardContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});

export default PromotionsList;
