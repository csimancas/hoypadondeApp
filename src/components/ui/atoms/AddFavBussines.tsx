import React from 'react';
import {Pressable, StyleSheet, Alert, Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import useAuthStore from '../../../store/authStore';

const AddFavBusiness = ({
  businessId,
  onToggleFavorite,
}: {
  businessId: string;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
}) => {
  const user = useAuthStore(state => state.user);

  const isFavorite = user?.favoritesBussines.includes(businessId);
  // const isFavorite =

  const handleToggleFavorite = () => {
    if (!user) {
      Alert.alert(
        'Inicio de sesión requerido',
        'Debes iniciar sesión para guardar favoritos',
        [{text: 'OK'}],
      );
      return;
    }

    const newFavoriteStatus = !isFavorite;

    if (newFavoriteStatus) {
      //addFavorite(businessId);
    } else {
      // removeFavorite(businessId);
    }

    if (onToggleFavorite) {
      // onToggleFavorite(businessId, newFavoriteStatus);
    }
  };

  return (
    <Pressable
      style={[styles.button, isFavorite && styles.favorite]}
      onPress={handleToggleFavorite}>
      <MaterialIcon
        name={isFavorite ? 'favorite' : 'favorite-border'}
        size={24}
        color="white"
      />
    </Pressable>
  );
};

// Mantener los estilos originales sin cambios
const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: A3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 2},
    position: 'absolute',
    zIndex: 100,
    right: 5,
    top: 5,
  },
  favorite: {
    backgroundColor: 'red',
  },
});

export default AddFavBusiness;
