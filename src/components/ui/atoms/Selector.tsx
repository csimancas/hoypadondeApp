import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ViewSelector = () => {
  const [selectedView, setSelectedView] = useState("map"); // Estado inicial

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedView === "map" ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => setSelectedView("map")}
      >
        <Text
          style={[
            styles.text,
            selectedView === "map" ? styles.selectedText : styles.unselectedText,
          ]}
        >
          Negocios
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedView === "list" ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => setSelectedView("list")}
      >
        <Text
          style={[
            styles.text,
            selectedView === "list" ? styles.selectedText : styles.unselectedText,
          ]}
        >
          Promociones
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4", // Fondo general
    borderRadius: 10,
    padding: 5,
    alignSelf: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#6200EE", // Color púrpura
  },
  unselectedButton: {
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedText: {
    color: "#ffffff",
  },
  unselectedText: {
    color: "#aaaaaa",
  },
});

export default ViewSelector;
