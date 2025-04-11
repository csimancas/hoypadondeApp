import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import HorizontalBussinesCard from './HorizontalBussinesCard';
import {useUserStore} from '../../../store/userStore';
import useBusinessStore from '../../../store/bussinesStore';
import commonFunctions from '../../../utils/common';
import NavigationMethods from '../../../utils/navigation';

const FavBussinesView = () => {
  const [favoriteBusinesses, setFavoriteBusinesses] = useState([]);

  // Obtener datos de los stores
  const {favorites} = useUserStore();
  const {businesses, loading, error, fetchBusinesses, setSelectedBusiness} =
    useBusinessStore();
  const {getTodaySchedule, isBusinessOpenNow} = commonFunctions();
  const {navigateTo} = NavigationMethods();

  useEffect(() => {
    // Cargar los negocios si aún no están cargados
    if (businesses.length === 0 && !loading && !error) {
      fetchBusinesses();
    }
  }, []);

  useEffect(() => {
    // Filtrar los negocios para obtener solo los favoritos
    if (businesses.length > 0 && favorites.length > 0) {
      const filteredBusinesses = businesses.filter(business =>
        favorites.includes(business.id),
      );
      setFavoriteBusinesses(filteredBusinesses);
    } else {
      setFavoriteBusinesses([]);
    }
  }, [businesses, favorites]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando favoritos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (favoriteBusinesses.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text>No tienes negocios favoritos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteBusinesses}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <HorizontalBussinesCard
            onPress={() => {
              setSelectedBusiness(item);
              navigateTo('BussinesDetail');
            }}
            hours={getTodaySchedule(item.opening_hours)}
            location={item.address}
            isOpen={isBusinessOpenNow(item.opening_hours)}
            image={item.logo}
            name={item.name}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FavBussinesView;
