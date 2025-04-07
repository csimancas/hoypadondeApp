import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Text,
} from 'react-native';
import Label from '../atoms/Label';
// import Pdf from 'react-native-pdf'; // Instala esta librería para manejar PDFs
import ImageViewer from 'react-native-image-zoom-viewer'; // Para el zoom en imágenes

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.4; // Cada tarjeta ocupa el 40% del ancho de la pantalla

interface MenuListProps {
  data: [];
}

const MenusList = ({data}: MenuListProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  // Función para abrir el modal con la imagen o PDF
  const openModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem('');
  };

  const imageUrls = data.map(item => ({
    url: item,
  }));

  console.log(data);
  return (
    <View style={styles.container}>
      <Label variant="title">Menus</Label>
      {/* <FlatList
        data={data}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <Pressable onPress={() => openModal(item)}>
            <View style={styles.card}>
              <Image source={{uri: item}} style={styles.image} />
            </View>
          </Pressable>
        )}
      /> */}

      {/* Modal para mostrar la imagen o PDF al 100% */}
      <Modal
        visible={modalVisible}
        transparent={false} // Cambia a false para que ocupe toda la pantalla
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          {/* Botón para cerrar el modal */}
          <Pressable onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>

          {/* Mostrar imagen o PDF */}
          {selectedItem.endsWith('.pdf') ? (
            <Pdf source={{uri: selectedItem}} style={styles.pdf} />
          ) : (
            <ImageViewer
              // imageUrls={[{ url: selectedItem }]} // Pasa la URL de la imagen
              imageUrls={imageUrls}
              enableImageZoom={true} // Habilita el zoom
              enableSwipeDown={true} // Permite cerrar el modal deslizando hacia abajo
              onSwipeDown={closeModal} // Cierra el modal al deslizar hacia abajo
              renderHeader={() => (
                <Pressable onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </Pressable>
              )}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  card: {
    width: 120,
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalContainer: {
    flex: 1, // Ocupa toda la pantalla
    backgroundColor: '#000', // Fondo negro para mejor contraste
  },
  closeButton: {
    position: 'absolute',
    top: 40, // Ajusta la posición vertical
    right: 20, // Ajusta la posición horizontal
    zIndex: 1, // Asegura que el botón esté por encima del contenido
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
  },
  pdf: {
    flex: 1, // Ocupa todo el espacio disponible
  },
});

export default MenusList;
