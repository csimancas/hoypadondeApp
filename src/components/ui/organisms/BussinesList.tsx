import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, StatusBar } from 'react-native';
import BussinesCard from '../molecules/BussinesCard';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import useBusinessStore from '../../../store/bussinesStore';
import NavigationMethods from '../../../utils/navigation';
import CategoriesList from '../molecules/CategoryList';
import SearchBarComponent from '../molecules/SearchBar';
import useAuthStore from '../../../store/authStore';
import Label from '../atoms/Label';

const BussinesList = () => {
  const { navigateWithParams } = NavigationMethods();
  const { fetchBusinesses, businesses, loading, error, setSelectedBusiness } = useBusinessStore();
  const { user } = useAuthStore();

  console.log(user)

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


  const UserLabel = () => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Label>Bienvenido {user?.nombre}!</Label>
      </View>
      
    );
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <UserLabel/>
        <SearchBarComponent onSearch={setSearchQuery} />
        <CategoriesList />
        <FlatList
          data={filteredBusinesses} // Usamos los filtrados
          renderItem={({ item }) => (
            <BussinesCard
              action={() => {
                setSelectedBusiness(item); // Guarda el negocio al hacer clic
                navigateWithParams('BussinesDetail', { name: item.name });
              }}
              bussinesId={item.id}
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
