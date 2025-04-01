import React, {useState} from 'react';
import {
  Text,
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

const TepicRegion: Region = {
  latitude: 21.508742,
  longitude: -104.895081,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const BussinesMap = () => {
  const {businesses} = useBusinessStore();
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMarkerPress = business => {
    setSelectedBusiness(business);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBusiness(null);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={TepicRegion}>
        {businesses.map(business => (
          <Marker
            key={business.id}
            coordinate={{
              latitude: business.location.latitude,
              longitude: business.location.longitude,
            }}
            onPress={() => handleMarkerPress(business)}>
            <View style={styles.markerView}>
              <Image
                source={markerImage}
                style={[
                  styles.markerImage,

                  {
                    tintColor:
                      selectedBusiness?.id === business.id
                        ? colors.lightTheme.colors.primary
                        : colors.lightTheme.colors.placeholder,
                  },
                ]}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.cardContainer}>
              <HorizontalBussinesCard
                image={selectedBusiness?.logo}
                name={selectedBusiness?.name}
              />
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
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 6,
    marginHorizontal: 16,
  },
});

export default BussinesMap;
