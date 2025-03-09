/* eslint-disable react/no-unstable-nested-components */
import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Share } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AboutBussines from '../molecules/AboutBussines';
import PromotionsList from '../molecules/PromotionsList';
import AmenitiesCard from '../molecules/AmenitiesCard';
import MenusList from '../molecules/MenuList';
import Label from '../atoms/Label';

interface RouteParams {
  name?: string;
}

const BussinesDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params as RouteParams; // Obtener el nombre del negocio

  // Función para compartir
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shareBusiness = async () => {
    try {
      await Share.share({
        message: `¡Mira este negocio! ${name} 🔥`,
      });
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name || 'Detalles del negocio',
      headerRight: () => (
        <Icon
          name="share-outline"
          size={24}
          color="black"
          style={{ marginRight: 15 }}
          onPress={shareBusiness}
        />
      ),
    });
  }, [navigation, name, shareBusiness]);

  return (
    <ScrollView style={styles.containerScreen}>
      <AboutBussines />
      <AmenitiesCard />
      <PromotionsList />
      <MenusList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScreen: {
    backgroundColor: '#F0F0F0',
  },
  bussinesTitleContainer: {
    width: '100%',
    height: 80,
    backgroundColor: '#FFFFFF',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BussinesDetail;
