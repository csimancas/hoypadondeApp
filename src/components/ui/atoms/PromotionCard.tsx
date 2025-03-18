import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Label from "./Label";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;

interface PromoCardProps {
  title: string;
  days: string[];
  time: string;
}

const WEEK_DAYS = ["L", "M", "X", "J", "V", "S", "D"];

const PromoCard = ({ title, days, time }: PromoCardProps) => {
  const renderDays = () => {
    return WEEK_DAYS.map((day, index) => {
      const isActive = days.includes(day);
      return (
        <View
          key={index}
          style={[styles.dayBadge, isActive ? styles.activeDay : styles.inactiveDay]}
        >
          <Text style={[styles.dayText, isActive ? styles.activeDayText : styles.inactiveDayText]}>
            {day}
          </Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <MaterialCommunityIcons name="percent" size={32} color="white" />
      </View>

      <View style={styles.rightSection}>
        <Label style={{ width: "100%" }} flexWrap="wrap" variant="content2" ellipsizeMode={'tail'}>
          {title}
        </Label>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{time}</Text>
          <View style={styles.daysContainer}>{renderDays()}</View>
        </View>
        <Button
          mode="text"
          onPress={() => console.log("Ver detalles presionado")}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          icon={() => <MaterialCommunityIcons name="chevron-right" size={18} color="#12171D" />}
        >
          Ver detalles
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  leftSection: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#12171D",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 105,
  },
  rightSection: {
    flex: 1,
    padding: 16,
    width: "72%",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#6D6D6D",
  },
  daysContainer: {
    flexDirection: "row",
  },
  dayBadge: {
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  activeDay: {
    backgroundColor: "#12171D",
  },
  inactiveDay: {
    backgroundColor: "transparent",
  },
  activeDayText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  inactiveDayText: {
    color: "#A0A0A0",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonContent: {
    flexDirection: "row-reverse",
  },
  buttonLabel: {
    fontSize: 14,
    color: "#12171D",
  },
});

export default PromoCard;