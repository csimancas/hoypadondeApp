import React, { useLayoutEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Share, SafeAreaView, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AboutBussines from '../molecules/AboutBussines';
import PromotionsList from '../molecules/PromotionsList';
import AmenitiesCard from '../molecules/AmenitiesCard';
import MenusList from '../molecules/MenuList';
import useBusinessStore from '../../../store/bussinesStore';

interface RouteParams {
  name?: string;
}

const BussinesDetail = () => {
  const navigation = useNavigation();
  const { selectedBusiness } = useBusinessStore();
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
      headerLeft: () => (
        <Pressable onPress={() => navigation.navigate('HomeStack')} style={{marginRight: 20 }}>
          <Icon name="arrow-back" size={24} color="black" />
        </Pressable>
      ),
      headerTransparent: false,
    });
  }, [navigation, name, shareBusiness]);

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          // style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
        >
          <AboutBussines 
            address={selectedBusiness.address}  
            categories={selectedBusiness.category}
            description={selectedBusiness.description} 
            images={selectedBusiness.images} 
            opening_hours={selectedBusiness.opening_hours}
          />
          <AmenitiesCard data={selectedBusiness.amenities}/>
          {selectedBusiness.promotions?.length > 0 && (
            <PromotionsList data={selectedBusiness.promotions}/>
          )}
          {selectedBusiness.menus?.length > 0 && (  
            <MenusList data={selectedBusiness.menus} /> 
          )}
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  contentContainer: {
    paddingBottom: 50,
  },
  lastItem: {
    marginBottom: 50,
  },
});

export default BussinesDetail;
