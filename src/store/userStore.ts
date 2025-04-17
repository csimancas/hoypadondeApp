import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definimos el tipo del estado
type UserState = {
  user: any | null; // Puedes reemplazar 'any' con tu tipo de usuario específico
  setUser: (user: any | null) => void; // Función para establecer el usuario
  clearUser: () => void; // Función para limpiar el usuario
};

// Creamos el store con persistencia
export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null, // Inicialmente no hay usuario

      setUser: user => {
        set({user});
      },

      clearUser: () => {
        set({user: null});
      },
    }),
    {
      name: 'user-store',
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

export default useUserStore;
