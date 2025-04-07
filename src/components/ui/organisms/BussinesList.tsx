import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';
import BussinesCard from '../molecules/BussinesCard';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import useBusinessStore from '../../../store/bussinesStore';
import NavigationMethods from '../../../utils/navigation';
import CategoriesList from '../molecules/CategoryList';
import SearchBarComponent from '../molecules/SearchBar';
import useAuthStore from '../../../store/authStore';
import Label from '../atoms/Label';

const BussinesList = () => {
  const {navigateWithParams} = NavigationMethods();
  const {fetchBusinesses, businesses, loading, error, setSelectedBusiness} =
    useBusinessStore();
  const {user} = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    const filtered = businesses.filter(business =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredBusinesses(filtered);
  }, [searchQuery, businesses]);

  // Función para manejar la actualización al deslizar hacia abajo
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBusinesses().then(() => {
      setRefreshing(false);
    });
  }, [fetchBusinesses]);

  const UserLabel = () => {
    return (
      <View style={{paddingHorizontal: 16}}>
        <Label>¿Hoypadonde, {user?.nombre}?</Label>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <UserLabel />
        <SearchBarComponent onSearch={setSearchQuery} />
        <CategoriesList />
        <FlatList
          data={filteredBusinesses}
          renderItem={({item}) => (
            <BussinesCard
              action={() => {
                setSelectedBusiness(item);
                navigateWithParams('BussinesDetail', {name: item.name});
              }}
              bussinesId={item.id}
              image={item.logo}
              name={item.name}
              location={item.address}
              opening_hours={item.opening_hours}
            />
          )}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#12171D']} // Color del indicador de carga
              tintColor="#12171D"
            />
          }
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
