import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  { id: '1', name: 'Restaurants', icon: 'silverware-fork-knife' },
  { id: '2', name: 'Bars', icon: 'glass-cocktail' },
  { id: '3', name: 'Cinemas', icon: 'filmstrip' },
  { id: '4', name: 'Gyms', icon: 'dumbbell' },
  { id: '5', name: 'Cafés', icon: 'coffee' },
  { id: '6', name: 'Hotels', icon: 'bed' },
];

const CategoriesList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedCategory;
          return (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor: isSelected ? '#12171D' : '#F5F5F5',
                  borderColor: isSelected ? '#12171D' : '#E0E0E0',
                  borderWidth: 1,
                },
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={32} // Icono más grande para mejorar visibilidad
                color={isSelected ? '#FFFFFF' : '#12171D'}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: isSelected ? '#FFFFFF' : '#12171D' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  categoryButton: {
    width: 90,
    height: 90,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 4, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center', // Para mantener el texto alineado
  },
});

export default CategoriesList;
