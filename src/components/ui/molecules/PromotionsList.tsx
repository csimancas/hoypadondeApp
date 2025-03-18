import React, { useRef } from "react";
import { View, FlatList, StyleSheet, Dimensions, Animated } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import PromoCard from "../atoms/PromotionCard";

const { width } = Dimensions.get("window");

interface PromotionsListProps {
  data: [];
}

const PromotionsList = ({ data }: PromotionsListProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  console.log(3333, JSON.stringify(data));

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={140}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <PromoCard
            title={item.title}
            subtitle={item.description}
            days={item.days}
            time_range={item.time_range} // Pasar time_range completo
            valid_from={item.valid_from}
            valid_until={item.valid_until}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  cardContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PromotionsList;