import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Share, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AboutBussines from '../molecules/AboutBussines';
import PromotionsList from '../molecules/PromotionsList';
import AmenitiesCard from '../molecules/AmenitiesCard';
import MenusList from '../molecules/MenuList';

interface RouteParams {
  name?: string;
}

const BussinesDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = route.params as RouteParams;

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
      headerTransparent: false,
    });
  }, [navigation, name, shareBusiness]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.contentContainer} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AboutBussines />
          <AmenitiesCard />
          <PromotionsList />
          <MenusList style={styles.lastItem} /> 
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 50, // Espacio extra al final para evitar corte
  },
  lastItem: {
    marginBottom: 50, // Asegurar que el último elemento no se corte
  },
});

export default BussinesDetail;
