import React, {useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  {id: '1', name: 'Restaurants', icon: 'silverware-fork-knife'},
  {id: '2', name: 'Bars', icon: 'glass-cocktail'},
  {id: '3', name: 'Cinemas', icon: 'filmstrip'},
  {id: '4', name: 'Gyms', icon: 'dumbbell'},
  {id: '5', name: 'Cafés', icon: 'coffee'},
  {id: '6', name: 'Hoteles', icon: 'bed'},
];

const CategoriesList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews={false}
        data={categories}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => {
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
              onPress={() => setSelectedCategory(item.id)}>
              <MaterialCommunityIcons
                name={item.icon}
                size={18}
                color={isSelected ? '#FFFFFF' : '#12171D'}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.categoryText,
                  {color: isSelected ? '#FFFFFF' : '#12171D'},
                ]}>
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
    padding: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 'auto',
    borderRadius: 16,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  icon: {
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'left',
    flexShrink: 1,
  },
});

export default CategoriesList;
