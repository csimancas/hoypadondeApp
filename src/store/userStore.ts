import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Definimos el tipo del estado
type UserState = {
  user: FirebaseAuthTypes.User | null;
  favorites: string[]; // Array para almacenar los IDs de los negocios favoritos
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  addFavorite: (businessId: string) => void; // Función para agregar un favorito
  removeFavorite: (businessId: string) => void; // Función para eliminar un favorito
};

// Tipo para la persistencia (opcional)
type UserPersist = (
  config: StateCreator<UserState>,
  options: PersistOptions<UserState>
) => StateCreator<UserState>;

// Creamos el store con persistencia (opcional)
export const useUserStore = create<UserState>(
  (persist as UserPersist)(
    (set) => ({
      user: null,
      favorites: [], // Inicialmente no hay favoritos
      setUser: (user) => set({ user }),
      addFavorite: (businessId) =>
        set((state) => ({
          favorites: [...state.favorites, businessId], // Agrega el ID al array de favoritos
        })),
      removeFavorite: (businessId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== businessId), // Filtra y elimina el ID
        })),
    }),
    {
      name: 'user-store', // Nombre único para el almacenamiento persistente
      getStorage: () => localStorage, // O AsyncStorage en React Native
    }
  )
);