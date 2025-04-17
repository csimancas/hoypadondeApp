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
import useAuthStore from '../../../store/authStore';

// Definimos una interfaz para el tipo de negocio
interface Business {
  id: string;
  name: string;
  address: string;
  logo: string;
  opening_hours: any; // Idealmente, definiríamos un tipo más específico para opening_hours
  // Añadir más propiedades según sea necesario
}

const FavBussinesView: React.FC = () => {
  const {user} = useAuthStore();
  const favBussines = user?.favoritesBussines || [];
  const [favoriteBusinesses, setFavoriteBusinesses] = useState<Business[]>([]);

  // Obtener datos de los stores - cambiado a favoritesBussines

  const {businesses, setSelectedBusiness} = useBusinessStore();
  const {getTodaySchedule, isBusinessOpenNow} = commonFunctions();
  const {navigateTo} = NavigationMethods();

  useEffect(() => {
    const filteredArray: Business[] = [];
    favBussines.forEach((id: string) => {
      const business = businesses.find((b: Business) => b.id === id);
      if (business) {
        filteredArray.push(business);
      }
    });
    setFavoriteBusinesses(filteredArray);
  }, [businesses, favBussines]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteBusinesses}
        keyExtractor={(item: Business) => item.id}
        renderItem={({item}: {item: Business}) => (
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
