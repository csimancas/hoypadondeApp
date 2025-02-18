import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;

const PromoCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <MaterialCommunityIcons name="percent" size={32} color="white" />
        <Text style={styles.discountText}>Descuento</Text>
        <Text style={styles.discountValue}>60% Off</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.promoTitle}>Nombre promoción</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>10 am - 10 pm</Text>
          <Text style={styles.infoText}>6 - 10 Dec</Text>
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
    width: CARD_WIDTH,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderColor: "#E0E0E0", // Borde gris tenue
    borderWidth: 1, // Grosor del borde
    overflow: "hidden",
    elevation: 5, // Sombra en Android
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  leftSection: {
    backgroundColor: "#12171D",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "28%",
  },
  discountText: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },
  discountValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
  },
  rightSection: {
    flex: 1,
    padding: 16,
    width: "72%",
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#6D6D6D",
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
