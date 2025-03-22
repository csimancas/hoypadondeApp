import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


const AddFavBusiness = ({ businessId, onToggleFavorite }: { businessId: string; onToggleFavorite?: (id: string, isFavorite: boolean) => void }) => {
    
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    if (onToggleFavorite) {
      onToggleFavorite(businessId, newFavoriteStatus);
    }
  };

  return (
    <Pressable style={[styles.button, isFavorite && styles.favorite]} onPress={handleToggleFavorite}>
      <MaterialIcon name={isFavorite ? 'favorite' : 'favorite-border'} size={24} color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 2 },
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
