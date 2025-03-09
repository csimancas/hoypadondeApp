import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, StatusBar } from 'react-native';
import BussinesCard from '../molecules/BussinesCard';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import useBusinessStore from '../../../store/bussinesStore';
import NavigationMethods from '../../../utils/navigation';
import CategoriesList from '../molecules/CategoryList';
import SearchBarComponent from '../molecules/SearchBar';

const BussinesList = () => {
  const { navigateWithParams } = NavigationMethods();
  const { fetchBusinesses, businesses, loading, error } = useBusinessStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    // Filtra los negocios según el nombre
    const filtered = businesses.filter((business) =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  }, [searchQuery, businesses]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SearchBarComponent onSearch={setSearchQuery} />
        <CategoriesList />
        <FlatList
          data={filteredBusinesses} // Usamos los filtrados
          renderItem={({ item }) => (
            <BussinesCard
              action={() => navigateWithParams('BussinesDetail', { name: item.name })}
              image={item.images}
              name={item.name}
              location={item.address}
              opening_hours={item.opening_hours} 
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default BussinesList;
