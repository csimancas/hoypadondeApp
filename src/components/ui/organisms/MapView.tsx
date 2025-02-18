import React, { useState } from "react";
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import HorizontalBussinesCard from "../molecules/HorizontalBussinesCard";
import bussines from "../../../utils/data";

const TepicRegion: Region = {
  latitude: 21.508742, 
  longitude: -104.895081,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const BussinesMap = () => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMarkerPress = (business) => {
    setSelectedBusiness(business);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBusiness(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={TepicRegion}
      >
        {bussines.map((business, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: business.location.latitude,
              longitude: business.location.longitude,
            }}
            onPress={() => handleMarkerPress(business)}
          />
        ))}
      </MapView>

      {/* Modal para mostrar la tarjeta en la parte inferior sin tapar la Bottom Navigation */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.cardContainer}>
              <HorizontalBussinesCard />
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    marginBottom: 60, // Separa la tarjeta del Bottom Navigation
  },
  cardContainer: {
    // backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    marginHorizontal: 16,
  },
});

export default BussinesMap;
