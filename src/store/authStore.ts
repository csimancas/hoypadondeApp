import {create} from 'zustand';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AuthState, User} from '../types/auth';
import useUserStore from './userStore';
import {Alert} from 'react-native';

const useAuthStore = create<AuthState>(set => ({
  user: null,
  loading: false,
  error: null,

  // Registro de usuario
  registerUser: async (
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    password: string,
  ) => {
    set({loading: true, error: null});
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      await firebaseUser.updateProfile({
        displayName: `${nombre} ${apellido}`,
      });

      const userData = {
        nombre,
        apellido,
        email,
        telefono,
        created_at: firestore.FieldValue.serverTimestamp(),
        lastAccess: firestore.FieldValue.serverTimestamp(),
        favoritos: [],
      };

      await firestore().collection('users').doc(firebaseUser.uid).set(userData);

      const user: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        ...userData,
      };

      set({user, loading: false});

      // Guardar en userStore para persistencia
      useUserStore.getState().setUser(user);

      return firebaseUser;
    } catch (error: any) {
      set({error: error.message, loading: false});
      console.log(error);
      throw error;
    }
  },

  // Inicio de sesión
  loginUser: async (email: string, password: string) => {
    set({loading: true, error: null});
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      // Obtener datos adicionales del usuario desde Firestore
      const userDoc = await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .get();

      // Obtener todos los datos del usuario
      const userData = userDoc.data();

      if (userData) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          ...userData,
        };

        set({user, loading: false});
        useUserStore.getState().setUser(user);

        await firestore().collection('users').doc(firebaseUser.uid).update({
          lastAccess: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        throw new Error('No se encontraron datos de usuario');
      }
    } catch (error: any) {
      set({error: error.message, loading: false});
      console.log('Error de inicio de sesión:', error);
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      await auth().signOut();
      set({user: null});
      useUserStore.getState().clearUser();
    } catch (error: any) {
      console.log('Error al cerrar sesión:', error);
    }
  },

  clearError: () => set({error: null}),

  checkUserSession: () => {
    set({loading: true});

    const unsubscribe = auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(firebaseUser.uid)
            .get();
          const userData = userDoc.data();

          if (userData) {
            const userInfo = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              ...userData,
            };

            set({
              user: userInfo,
              loading: false,
            });

            useUserStore.getState().setUser(userInfo);

            await firestore().collection('users').doc(firebaseUser.uid).update({
              lastAccess: firestore.FieldValue.serverTimestamp(),
            });
          } else {
            set({user: null, loading: false});
            console.log('No se encontraron datos de usuario en Firestore');
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
          set({loading: false, error: 'Error al cargar datos del usuario'});
        }
      } else {
        set({user: null, loading: false});
        useUserStore.getState().clearUser();
      }
    });

    return () => unsubscribe();
  },

  toggleFavoriteBusiness: async (businessId: string) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'No hay usuario autenticado');
      }

      const userRef = firestore().collection('users').doc(currentUser?.uid);
      const userDoc = await userRef.get();
      const userData = userDoc.data();

      if (!userData) {
        throw new Error('No se encontraron datos de usuario');
      }
      const favoritesBussines = userData.favoritesBussines || [];
      const isCurrentlyFavorite = favoritesBussines.includes(businessId);
      let updatedFavorites;

      if (isCurrentlyFavorite) {
        updatedFavorites = favoritesBussines.filter(id => id !== businessId);
        await userRef.update({
          favoritesBussines: firestore.FieldValue.arrayRemove(businessId),
        });
      } else {
        updatedFavorites = [...favoritesBussines, businessId];
        await userRef.update({
          favoritesBussines: firestore.FieldValue.arrayUnion(businessId),
        });
      }
      const currentUserState = useAuthStore.getState().user;
      if (currentUserState) {
        const updatedUser = {
          ...currentUserState,
          favoritesBussines: updatedFavorites,
        };
        set({user: updatedUser});
        useUserStore.getState().setUser(updatedUser);
      }
      return !isCurrentlyFavorite;
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
      throw error;
    }
  },

  toggleFavoritePromotions: async (promotionId: string) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'No hay usuario autenticado');
        return false;
      }

      const userRef = firestore().collection('users').doc(currentUser?.uid);
      const userDoc = await userRef.get();
      const userData = userDoc.data();

      if (!userData) {
        throw new Error('No se encontraron datos de usuario');
      }

      const favoritePromotions = userData.favoritePromotions || [];
      const isCurrentlyFavorite = favoritePromotions.includes(promotionId);
      let updatedFavorites;

      if (isCurrentlyFavorite) {
        updatedFavorites = favoritePromotions.filter(id => id !== promotionId);
        await userRef.update({
          favoritePromotions: firestore.FieldValue.arrayRemove(promotionId),
        });
      } else {
        updatedFavorites = [...favoritePromotions, promotionId];
        await userRef.update({
          favoritePromotions: firestore.FieldValue.arrayUnion(promotionId),
        });
      }

      const currentUserState = useAuthStore.getState().user;
      if (currentUserState) {
        const updatedUser = {
          ...currentUserState,
          favoritePromotions: updatedFavorites,
        };
        set({user: updatedUser});
        useUserStore.getState().setUser(updatedUser);
      }

      return !isCurrentlyFavorite;
    } catch (error) {
      console.error('Error al actualizar favoritos de promociones:', error);
      throw error;
    }
  },
}));

export default useAuthStore;
