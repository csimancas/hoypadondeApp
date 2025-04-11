import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import useAuthStore from './authStore';

// Definimos el tipo del estado
type UserState = {
  favorites: string[]; // Array de IDs de negocios favoritos
  addFavorite: (businessId: string) => void; // Agregar favorito
  removeFavorite: (businessId: string) => void; // Eliminar favorito
  isFavorite: (businessId: string) => boolean; // Verificar si es favorito
  loadFavoritesFromFirestore: () => Promise<void>; // Cargar favoritos
};

// Creamos el store con persistencia
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      favorites: [], // Inicialmente no hay favoritos

      addFavorite: (businessId: string) => {
        const {favorites} = get();
        const authUser = useAuthStore.getState().user;

        // Verificar si ya existe
        if (favorites.includes(businessId)) {
          return; // No hacer nada si ya existe
        }

        // Actualizar estado local
        const newFavorites = [...favorites, businessId];
        set({favorites: newFavorites});

        // Actualizar en Firestore si hay usuario
        if (authUser) {
          firestore()
            .collection('users')
            .doc(authUser.uid)
            .update({
              favorites: newFavorites,
            })
            .catch(error => console.error('Error al añadir favorito:', error));
        }
      },

      removeFavorite: (businessId: string) => {
        const {favorites} = get();
        const authUser = useAuthStore.getState().user;

        // Actualizar estado local
        const newFavorites = favorites.filter(id => id !== businessId);
        set({favorites: newFavorites});

        // Actualizar en Firestore si hay usuario
        if (authUser) {
          firestore()
            .collection('users')
            .doc(authUser.uid)
            .update({
              favorites: newFavorites,
            })
            .catch(error =>
              console.error('Error al eliminar favorito:', error),
            );
        }
      },

      isFavorite: (businessId: string) => {
        return get().favorites.includes(businessId);
      },

      loadFavoritesFromFirestore: async () => {
        const authUser = useAuthStore.getState().user;
        if (!authUser) {
          return;
        }

        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(authUser.uid)
            .get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            // Si el usuario existe pero no tiene favoritos, inicializar campo
            if (!userData?.favorites) {
              await firestore()
                .collection('users')
                .doc(authUser.uid)
                .set({favorites: []}, {merge: true});
              set({favorites: []});
            } else {
              set({favorites: userData.favorites || []});
            }
          } else {
            // Si el documento no existe, créalo con un array vacío de favoritos
            await firestore()
              .collection('users')
              .doc(authUser.uid)
              .set({favorites: []});
            set({favorites: []});
          }
        } catch (error) {
          console.error('Error al cargar favoritos:', error);
        }
      },
    }),
    {
      name: 'user-favorites-store',
      storage: {
        getItem: async name => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async name => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);

// Suscripción para cargar favoritos cuando el usuario inicia sesión
useAuthStore.subscribe(
  state => state.user,
  user => {
    if (user) {
      useUserStore.getState().loadFavoritesFromFirestore();
    } else {
      // Si el usuario cierra sesión, limpiar favoritos
      useUserStore.setState({favorites: []});
    }
  },
);
