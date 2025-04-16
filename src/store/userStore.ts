// import {create} from 'zustand';
// import {persist} from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// import useAuthStore from './authStore';

// // Definimos el tipo del estado
// type UserState = {
//   favorites: string[]; // Array de IDs de negocios favoritos
//   addFavorite: (businessId: string) => void; // Agregar favorito
//   removeFavorite: (businessId: string) => void; // Eliminar favorito
//   isFavorite: (businessId: string) => boolean; // Verificar si es favorito
//   loadFavoritesFromFirestore: () => Promise<void>; // Cargar favoritos
// };

// // Creamos el store con persistencia
// export const useUserStore = create<UserState>()(
//   persist(
//     (set, get) => ({
//       favorites: [], // Inicialmente no hay favoritos

//       addFavorite: (businessId: string) => {
//         const {favorites} = get();
//         const authUser = useAuthStore.getState().user;

//         // Verificar si ya existe
//         if (favorites.includes(businessId)) {
//           return; // No hacer nada si ya existe
//         }

//         // Actualizar estado local
//         const newFavorites = [...favorites, businessId];
//         set({favorites: newFavorites});

//         // Actualizar en Firestore si hay usuario
//         if (authUser) {
//           firestore()
//             .collection('users')
//             .doc(authUser.uid)
//             .update({
//               favorites: newFavorites,
//             })
//             .catch(error => console.error('Error al añadir favorito:', error));
//         }
//       },

//       removeFavorite: (businessId: string) => {
//         const {favorites} = get();
//         const authUser = useAuthStore.getState().user;

//         // Actualizar estado local
//         const newFavorites = favorites.filter(id => id !== businessId);
//         set({favorites: newFavorites});

//         // Actualizar en Firestore si hay usuario
//         if (authUser) {
//           firestore()
//             .collection('users')
//             .doc(authUser.uid)
//             .update({
//               favorites: newFavorites,
//             })
//             .catch(error =>
//               console.error('Error al eliminar favorito:', error),
//             );
//         }
//       },

//       isFavorite: (businessId: string) => {
//         return get().favorites.includes(businessId);
//       },

//       loadFavoritesFromFirestore: async () => {
//         const authUser = useAuthStore.getState().user;
//         if (!authUser) {
//           return;
//         }

//         try {
//           const userDoc = await firestore()
//             .collection('users')
//             .doc(authUser.uid)
//             .get();

//           if (userDoc.exists) {
//             const userData = userDoc.data();
//             // Si el usuario existe pero no tiene favoritos, inicializar campo
//             if (!userData?.favorites) {
//               await firestore()
//                 .collection('users')
//                 .doc(authUser.uid)
//                 .set({favorites: []}, {merge: true});
//               set({favorites: []});
//             } else {
//               set({favorites: userData.favorites || []});
//             }
//           } else {
//             // Si el documento no existe, créalo con un array vacío de favoritos
//             await firestore()
//               .collection('users')
//               .doc(authUser.uid)
//               .set({favorites: []});
//             set({favorites: []});
//           }
//         } catch (error) {
//           console.error('Error al cargar favoritos:', error);
//         }
//       },
//     }),
//     {
//       name: 'user-favorites-store',
//       storage: {
//         getItem: async name => {
//           const value = await AsyncStorage.getItem(name);
//           return value ? JSON.parse(value) : null;
//         },
//         setItem: async (name, value) => {
//           await AsyncStorage.setItem(name, JSON.stringify(value));
//         },
//         removeItem: async name => {
//           await AsyncStorage.removeItem(name);
//         },
//       },
//     },
//   ),
// );

// // Suscripción para cargar favoritos cuando el usuario inicia sesión
// useAuthStore.subscribe(
//   state => state.user,
//   user => {
//     if (user) {
//       useUserStore.getState().loadFavoritesFromFirestore();
//     } else {
//       // Si el usuario cierra sesión, limpiar favoritos
//       useUserStore.setState({favorites: []});
//     }
//   },
// );
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import useAuthStore from './authStore';

// Definimos el tipo del estado
type UserState = {
  favoritesBussines: string[]; // Array de IDs de negocios favoritos
  favoritesLoaded: boolean; // Flag para controlar si ya cargamos favoritos
  addFavorite: (businessId: string) => void; // Agregar favorito
  removeFavorite: (businessId: string) => void; // Eliminar favorito
  isFavorite: (businessId: string) => boolean; // Verificar si es favorito
  loadFavoritesFromFirestore: () => Promise<void>; // Cargar favoritos
};

// Creamos el store con persistencia
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      favoritesBussines: [], // Inicialmente no hay favoritos
      favoritesLoaded: false, // Inicialmente no hemos cargado favoritos

      addFavorite: (businessId: string) => {
        const {favoritesBussines} = get();
        const authUser = useAuthStore.getState().user;

        // Verificar si ya existe
        if (favoritesBussines.includes(businessId)) {
          return; // No hacer nada si ya existe
        }

        // Actualizar estado local
        const newFavorites = [...favoritesBussines, businessId];
        set({favoritesBussines: newFavorites});

        // Actualizar en Firestore si hay usuario
        if (authUser) {
          firestore()
            .collection('users')
            .doc(authUser.uid)
            .update({
              favoritesBussines: newFavorites,
            })
            .catch(error => console.error('Error al añadir favorito:', error));
        }
      },

      removeFavorite: (businessId: string) => {
        const {favoritesBussines} = get();
        const authUser = useAuthStore.getState().user;

        // Actualizar estado local
        const newFavorites = favoritesBussines.filter(id => id !== businessId);
        set({favoritesBussines: newFavorites});

        // Actualizar en Firestore si hay usuario
        if (authUser) {
          firestore()
            .collection('users')
            .doc(authUser.uid)
            .update({
              favoritesBussines: newFavorites,
            })
            .catch(error =>
              console.error('Error al eliminar favorito:', error),
            );
        }
      },

      isFavorite: (businessId: string) => {
        return get().favoritesBussines.includes(businessId);
      },

      loadFavoritesFromFirestore: async () => {
        const {favoritesLoaded} = get();
        const authUser = useAuthStore.getState().user;

        // Si no hay usuario o ya cargamos favoritos, no hacer nada
        if (!authUser || favoritesLoaded) {
          console.log(
            'Saltando carga de favoritos:',
            !authUser ? 'No hay usuario autenticado' : 'Favoritos ya cargados',
          );
          return;
        }

        try {
          console.log(
            'Cargando favoritos desde Firestore para usuario:',
            authUser.uid,
          );
          const userDoc = await firestore()
            .collection('users')
            .doc(authUser.uid)
            .get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            // Si el usuario existe pero no tiene favoritos, inicializar campo
            if (!userData?.favoritesBussines) {
              await firestore()
                .collection('users')
                .doc(authUser.uid)
                .set({favoritesBussines: []}, {merge: true});
              set({favoritesBussines: [], favoritesLoaded: true});
              console.log(
                'Usuario existente sin favoritos, inicializado campo',
              );
            } else {
              set({
                favoritesBussines: userData.favoritesBussines || [],
                favoritesLoaded: true,
              });
              console.log(
                'Favoritos cargados:',
                userData.favoritesBussines?.length || 0,
              );
            }
          } else {
            // Si el documento no existe, créalo con un array vacío de favoritos
            await firestore()
              .collection('users')
              .doc(authUser.uid)
              .set({favoritesBussines: []});
            set({favoritesBussines: [], favoritesLoaded: true});
            console.log('Nuevo usuario, creado documento con favoritos vacíos');
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
      // Función que se ejecuta después de que se hidratan los datos
      onRehydrateStorage: () => state => {
        // Si hay un usuario autenticado pero los favoritos no se han cargado,
        // cargarlos automáticamente durante la hidratación
        const authUser = useAuthStore.getState().user;
        if (authUser && state && !state.favoritesLoaded) {
          console.log(
            'Carga inicial de favoritos durante hidratación del store',
          );
          // Ejecutamos en el siguiente ciclo para asegurar que el store esté completamente inicializado
          setTimeout(() => {
            useUserStore.getState().loadFavoritesFromFirestore();
          }, 0);
        }
      },
    },
  ),
);

useAuthStore.subscribe(
  state => state.user,
  (currentUser, previousUser) => {
    if (currentUser && !previousUser) {
      console.log('Usuario inició sesión, reseteando estado de favoritos');
      useUserStore.setState({favoritesLoaded: false});
      useUserStore.getState().loadFavoritesFromFirestore();
    } else if (!currentUser && previousUser) {
      console.log('Usuario cerró sesión, limpiando favoritos');
      useUserStore.setState({favoritesBussines: [], favoritesLoaded: false});
    }
  },
);

const initializeFavorites = () => {
  const authUser = useAuthStore.getState().user;
  if (authUser && !useUserStore.getState().favoritesLoaded) {
    console.log('Inicialización inmediata de favoritos');
    useUserStore.getState().loadFavoritesFromFirestore();
  }
};

setTimeout(initializeFavorites, 0);

export default useUserStore;
