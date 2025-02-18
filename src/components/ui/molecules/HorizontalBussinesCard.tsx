import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85; // Ajustar tamaño relativo a la pantalla

const HorizontalBussinesCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/50" }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Restaurant's name</Text>
        <Text style={styles.location}>Mexico City, Mexico</Text>
        <Text style={styles.hours}>10 am - 10 pm</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: CARD_WIDTH,
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#D9D9D9", // Color de fondo por si no hay imagen
  },
  infoContainer: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    fontSize: 12,
    color: "#666",
  },
  hours: {
    fontSize: 12,
    color: "#666",
  },
});

export default HorizontalBussinesCard;
