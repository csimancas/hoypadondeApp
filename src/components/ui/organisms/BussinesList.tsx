import React from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import BussinesCard from '../molecules/BussinesCard';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import bussines from '../../../utils/data';

const BussinesList = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bussines}
        renderItem={({ item }) => (
          <BussinesCard
            image={item.images[0]}
            name={item.name}
            location={"location"}
            opening_hours={item.opening_hours} // Pasamos los horarios completos aquí
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BussinesList;
