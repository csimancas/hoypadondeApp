import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import colors from '../../../utils/colors';
import MapView, {Marker, Region} from 'react-native-maps';
import HorizontalBussinesCard from '../molecules/HorizontalBussinesCard';
import useBusinessStore from '../../../store/bussinesStore';
import markerImage from '../../../assets/logo_mapa.png';
import commonFunctions from '../../../utils/common';
import NavigationMethods from '../../../utils/navigation';

// Define región inicial
const TepicRegion: Region = {
  latitude: 21.508742,
  longitude: -104.895081,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

// Componente para los marcadores
const BusinessMarker = React.memo(({business, isSelected, onPress}) => {
  return (
    <Marker
      coordinate={{
        latitude: business.location.latitude,
        longitude: business.location.longitude,
      }}
      onPress={() => onPress(business)}>
      <View style={styles.markerView}>
        <Image
          source={markerImage}
          style={[
            styles.markerImage,
            {
              tintColor: isSelected
                ? colors.lightTheme.colors.primary
                : colors.lightTheme.colors.placeholder,
            },
          ]}
        />
      </View>
    </Marker>
  );
});

const BussinesMap = () => {
  const {businesses, setSelectedBusiness} = useBusinessStore();
  const [selectedBusiness, setLocalSelectedBusiness] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {isBusinessOpenNow} = commonFunctions();
  const {navigateTo} = NavigationMethods();

  // Funciones memoizadas
  const handleMarkerPress = useCallback(business => {
    setLocalSelectedBusiness(business);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setLocalSelectedBusiness(null);
  }, []);

  // Marcadores memoizados
  const markers = useMemo(() => {
    return businesses.map(business => (
      <BusinessMarker
        key={business.id}
        business={business}
        isSelected={selectedBusiness?.id === business.id}
        onPress={handleMarkerPress}
      />
    ));
  }, [businesses, selectedBusiness, handleMarkerPress]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={TepicRegion}
        maxZoomLevel={18}
        minZoomLevel={8}
        loadingEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}>
        {markers}
      </MapView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.cardContainer}>
              {selectedBusiness && (
                <HorizontalBussinesCard
                  onPress={() => {
                    setSelectedBusiness(selectedBusiness);
                    navigateTo('BussinesDetail');
                  }}
                  isOpen={isBusinessOpenNow(selectedBusiness.opening_hours)}
                  image={selectedBusiness.logo}
                  name={selectedBusiness.name}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerView: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkTheme.colors.background,
    borderRadius: 15,
  },
  markerImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginBottom: 60,
  },
  cardContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    // backgroundColor: colors.lightTheme.colors.background,
    // elevation: 5,
    // shadowColor: '#000',
    // shadowOpacity: 0.2,
    // shadowOffset: {width: 0, height: -2},
    // shadowRadius: 6,
    // marginHorizontal: 16,
  },
});

export default React.memo(BussinesMap);
