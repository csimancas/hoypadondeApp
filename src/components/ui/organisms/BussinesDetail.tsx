import React, {useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Share,
  Pressable,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import Pdf from 'react-native-pdf';
import AboutBussines from '../molecules/AboutBussines';
import AmenitiesCard from '../molecules/AmenitiesCard';
import PromoCard from '../atoms/PromotionCard';
import Label from '../atoms/Label';
import useBusinessStore from '../../../store/bussinesStore';

const {width, height} = Dimensions.get('window');

interface RouteParams {
  name?: string;
}

const BussinesDetail = () => {
  const navigation = useNavigation();
  const {selectedBusiness} = useBusinessStore();
  const route = useRoute();
  const {name} = route.params as RouteParams;

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
          style={{marginRight: 15}}
          onPress={shareBusiness}
        />
      ),
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.navigate('HomeStack')}
          style={{marginRight: 20}}>
          <Icon name="arrow-back" size={24} color="black" />
        </Pressable>
      ),
      headerTransparent: false,
    });
  }, [navigation, name, shareBusiness]);

  const promotions = selectedBusiness.promotions || [];
  const menus = selectedBusiness.menus || [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* AboutBussines y AmenitiesCard */}
        <AboutBussines
          address={selectedBusiness.address}
          averageTicket={selectedBusiness.averageTicket}
          categories={selectedBusiness.category}
          description={selectedBusiness.description}
          images={selectedBusiness.images}
          opening_hours={selectedBusiness.opening_hours}
        />

        <AmenitiesCard data={selectedBusiness.amenities} />

        {/* Sección de promociones con Carousel */}
        {promotions.length > 0 && (
          <View style={styles.section}>
            <Label variant="title" style={{marginBottom: 12}}>
              Promociones
            </Label>
            <View style={{height: 160}}>
              <Carousel
                loop={false}
                width={width - 48}
                height={140}
                data={promotions}
                scrollAnimationDuration={1000}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.9,
                  parallaxScrollingOffset: 50,
                }}
                renderItem={({item, index}) => (
                  <View style={styles.carouselItemContainer}>
                    <PromoCard
                      action={() => console.log(item)}
                      title={item.title}
                      subtitle={item.description}
                      days={item.days || []}
                      time_range={item.time_range || ''}
                      valid_from={item.valid_from}
                      valid_until={item.valid_until}
                    />
                  </View>
                )}
              />
            </View>
          </View>
        )}

        {/* Sección de menús */}
        {menus.length > 0 && (
          <View style={styles.section}>
            <Label variant="title">Menús</Label>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.menuScrollContainer}>
              {menus.map((menu, index) => (
                <MenuItemCard key={`menu-${index}`} uri={menu} />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItemCard = ({uri}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const isPDF = uri.toLowerCase().endsWith('.pdf');

  return (
    <Pressable onPress={() => setModalVisible(true)}>
      <View style={styles.menuCard}>
        {isPDF ? (
          <View style={styles.pdfPreview}>
            <Icon name="document-text" size={40} color="#007AFF" />
            <Text style={styles.pdfText}>PDF</Text>
          </View>
        ) : (
          <Image source={{uri}} style={styles.menuImage} />
        )}

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color="white" />
            </Pressable>

            {isPDF ? (
              <Pdf
                source={{uri: uri}}
                style={styles.pdfView}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`PDF cargado: ${numberOfPages} páginas`);
                }}
                onPageChanged={(page, totalPages) => {
                  console.log(`Página actual: ${page}`);
                }}
                onError={error => {
                  console.log('Error al cargar PDF:', error);
                }}
                enablePaging={true}
                activityIndicator={() => (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Cargando PDF...</Text>
                  </View>
                )}
              />
            ) : (
              <ImageViewer
                imageUrls={[{url: uri}]}
                enableSwipeDown
                onSwipeDown={() => setModalVisible(false)}
              />
            )}
          </View>
        </Modal>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  contentContainer: {
    paddingBottom: 80,
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  carouselItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  menuScrollContainer: {
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  menuCard: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  menuImage: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  pdfPreview: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  pdfText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  pdfView: {
    flex: 1,
    width: width,
    height: height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BussinesDetail;
