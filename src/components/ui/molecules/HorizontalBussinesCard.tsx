import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9; // Ajustar tamaño relativo a la pantalla

interface HorizontalBussinesCardProps {
  image: string;
  name: string;
  location: string;
  hours: string;
}


const HorizontalBussinesCard = ({image, name, location, hours}: HorizontalBussinesCardProps) => {
  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/200/300"}}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.hours}>{hours}</Text>
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
    width: 100,
    height: 100,
    borderRadius: 10,
    // backgroundColor: "#D9D9D9", // Color de fondo por si no hay imagen
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
