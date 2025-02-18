import React from "react";
import { View, FlatList, StyleSheet, Dimensions, Image } from "react-native";
import { Text, Card, Badge } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.4; // Cada tarjeta ocupa el 40% del ancho de la pantalla

const menus = [
  { id: "1", title: "Main courses", pages: 3, image: "https://via.placeholder.com/150" },
  { id: "2", title: "Drinks", pages: 0, image: "https://via.placeholder.com/150" },
  { id: "3", title: "Dishes", pages: 2, image: "https://via.placeholder.com/150" },
];

const MenusList = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Menus
      </Text>
      
      <FlatList
        data={menus}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View>
              <Image source={{ uri: item.image }} style={styles.image} />
              {item.pages > 0 && (
                <View style={styles.badgeContainer}>
                  <MaterialCommunityIcons name="book-open-page-variant" size={16} color="#fff" />
                  <Text style={styles.badgeText}>{item.pages} Pages</Text>
                </View>
              )}
            </View>
            <Card.Content>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
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
