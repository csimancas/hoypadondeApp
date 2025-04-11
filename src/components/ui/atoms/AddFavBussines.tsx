import React from 'react';
import {Pressable, StyleSheet, Alert} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useUserStore} from '../../../store/userStore';
import useAuthStore from '../../../store/authStore';

const AddFavBusiness = ({
  businessId,
  onToggleFavorite,
}: {
  businessId: string;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
}) => {
  // Usar el auth store para verificar si hay un usuario
  const user = useAuthStore(state => state.user);

  // Usar el store para gestionar favoritos
  const addFavorite = useUserStore(state => state.addFavorite);
  const removeFavorite = useUserStore(state => state.removeFavorite);
  const isFavorite = useUserStore(state => state.isFavorite(businessId));

  const handleToggleFavorite = () => {
    // Si no hay usuario, mostrar alerta
    if (!user) {
      Alert.alert(
        'Inicio de sesión requerido',
        'Debes iniciar sesión para guardar favoritos',
        [{text: 'OK'}],
      );
      return;
    }

    const newFavoriteStatus = !isFavorite;

    // Actualizar favoritos en el store (y en Firebase)
    if (newFavoriteStatus) {
      addFavorite(businessId);
    } else {
      removeFavorite(businessId);
    }

    // Llamar al callback si existe
    if (onToggleFavorite) {
      onToggleFavorite(businessId, newFavoriteStatus);
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
