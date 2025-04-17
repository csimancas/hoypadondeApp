import {create} from 'zustand';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AuthState, User} from '../types/auth';
import useUserStore from './userStore';

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

      // Datos iniciales del usuario
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
        // Crear un objeto de usuario con todos los campos de userData
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          ...userData, // Esto incluirá todos los campos que existan en Firebase
        };

        set({user, loading: false});

        // Guardar todos los datos en userStore para persistencia
        useUserStore.getState().setUser(user);

        // Actualizar lastAccess
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

  // Cerrar sesión
  logoutUser: async () => {
    try {
      await auth().signOut();
      set({user: null});
      useUserStore.getState().clearUser();
    } catch (error: any) {
      console.log('Error al cerrar sesión:', error);
    }
  },

  // Limpiar errores
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

          // Obtener todos los datos del usuario
          const userData = userDoc.data();

          if (userData) {
            const userInfo = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              ...userData, // Incluye todos los campos de Firestore
            };

            set({
              user: userInfo,
              loading: false,
            });

            // Actualizar también el userStore para persistencia con todos los datos
            useUserStore.getState().setUser(userInfo);

            // Actualizar lastAccess en Firestore
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

  saveBussinessToFavorites: async (businessId: string) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('No hay usuario autenticado');
      }

      const userRef = firestore().collection('users').doc(currentUser.uid);

      // Obtener los favoritos actuales
      const userDoc = await userRef.get();
      const userData = userDoc.data();

      if (!userData) {
        throw new Error('No se encontraron datos de usuario');
      }

      // Verificar si ya existe el array de favoritos
      const favoritos = userData.favoritos || [];

      // Verificar si el negocio ya está en favoritos
      if (favoritos.includes(businessId)) {
        // Si ya está, lo quitamos (toggle)
        await userRef.update({
          favoritos: firestore.FieldValue.arrayRemove(businessId),
        });

        // Actualizar el estado local
        const updatedUser = {
          ...useAuthStore.getState().user,
          favoritos: favoritos.filter(id => id !== businessId),
        };
        set({user: updatedUser});
        useUserStore.getState().setUser(updatedUser);

        return false; // Indicar que se quitó de favoritos
      } else {
        // Si no está, lo agregamos
        await userRef.update({
          favoritos: firestore.FieldValue.arrayUnion(businessId),
        });

        // Actualizar el estado local
        const updatedUser = {
          ...useAuthStore.getState().user,
          favoritos: [...favoritos, businessId],
        };
        set({user: updatedUser});
        useUserStore.getState().setUser(updatedUser);

        return true; // Indicar que se agregó a favoritos
      }
    } catch (error) {
      console.error('Error al guardar en favoritos:', error);
      throw error;
    }
  },

  // Método para verificar si un negocio está en favoritos
  isBusinessFavorite: (businessId: string): boolean => {
    const user = useAuthStore.getState().user;
    if (!user || !user.favoritos) {
      return false;
    }
    return user.favoritos.includes(businessId);
  },
}));

export default useAuthStore;
