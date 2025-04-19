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
import useUserStore from '../../../store/userStore'; // Importa el userStore
import Label from '../atoms/Label';

const BussinesList = ({showFavoritesOnly = false}) => {
  // Añadimos un prop para mostrar solo favoritos
  const {navigateTo} = NavigationMethods();
  const {
    fetchBusinesses,
    businesses,
    promotions,
    loading,
    error,
    setSelectedBusiness,
  } = useBusinessStore();
  const {user} = useAuthStore();
  const {favoritesBussines} = useUserStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBusinesses();
  }, [user, favoritesBussines, showFavoritesOnly, user.id]);

  useEffect(() => {
    let filtered = businesses;
    if (showFavoritesOnly) {
      filtered = businesses.filter(business =>
        favoritesBussines.includes(business.id),
      );
    }

    filtered = filtered.filter(business =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setFilteredBusinesses(filtered);
  }, [searchQuery, businesses, favoritesBussines, showFavoritesOnly]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBusinesses().then(() => {
      setRefreshing(false);
    });
  }, [fetchBusinesses]);

  const UserLabel = () => {
    return (
      <View style={{paddingHorizontal: 16}}>
        <Label>
          {showFavoritesOnly
            ? 'Tus lugares favoritos'
            : `¿Hoypadonde, ${user?.nombre}?`}
        </Label>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <UserLabel />
        <SearchBarComponent onSearch={setSearchQuery} />
        {!showFavoritesOnly && <CategoriesList />}
        <FlatList
          removeClippedSubviews={false}
          data={filteredBusinesses}
          renderItem={({item}) => (
            <BussinesCard
              action={() => {
                setSelectedBusiness(item);
                navigateTo('BussinesDetail');
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
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Label>
                {showFavoritesOnly
                  ? 'No tienes negocios favoritos aún'
                  : 'No se encontraron negocios'}
              </Label>
            </View>
          )}
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default BussinesList;
