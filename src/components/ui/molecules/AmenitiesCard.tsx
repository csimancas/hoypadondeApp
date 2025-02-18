import React from "react";
import { View, FlatList } from "react-native";
import { Text, List, Button } from "react-native-paper";

const features = [
  { id: "1", label: "Takeaway available" },
  { id: "2", label: "Wifi available" },
  { id: "3", label: "Child friendly" },
  { id: "4", label: "Table reservation" },
  { id: "5", label: "Smoking area" },
  { id: "6", label: "Indoor and outdoor" },
];

const MoreInformation = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={{ fontWeight: "bold", marginBottom: 8 }}>
        More Information
      </Text>
      <FlatList
        data={features}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.label}
            left={() => <List.Icon icon="check-circle-outline" color="green" />}
            style={{ flex: 1 }}
          />
        )}
      />
      <View style={{ alignItems: "center", marginTop: 8 }}>
        <Button mode="text" onPress={() => console.log("Ver todos presionado")}>
          Ver todos
        </Button>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 10,
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
};

export default MoreInformation;
