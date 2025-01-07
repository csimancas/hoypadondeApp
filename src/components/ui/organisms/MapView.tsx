import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import bussines from '../../../utils/data';

const TepicRegion: Region = {
  latitude: 21.508742, // Coordenada de Tepic
  longitude: -104.895081, // Coordenada de Tepic
  latitudeDelta: 0.1, // Nivel de zoom vertical (más amplio para mostrar los negocios)
  longitudeDelta: 0.1, // Nivel de zoom horizontal
};

const BussinesMap = () => {
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
              latitude: business.location.latitude, // Latitud del negocio
              longitude: business.location.longitude, // Longitud del negocio
            }}
            title={business.name} // Nombre del negocio
            description={business.description} // Descripción breve del negocio
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Asegura que el mapa ocupe toda la pantalla
  },
});

export default BussinesMap;
