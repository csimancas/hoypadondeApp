import React from "react";
import { View, FlatList, StyleSheet, Dimensions, Image } from "react-native";
import { Text } from "react-native-paper";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.4; // Cada tarjeta ocupa el 40% del ancho de la pantalla

interface MenuListProps {
 data: []; 
}

const MenusList = ({data} : MenuListProps) => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Menus
      </Text>
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginTop: 10,
    backgroundColor: "#fff",    
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 8,
    marginBottom: 20, 
  },
  card: {
    width: 120,
    height: 120,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 8,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  badgeContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 12,
  },
  menuTitle: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "bold",
  },
});

export default MenusList;
