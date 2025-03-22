// src/store/authStore.ts
import { create } from 'zustand';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthState, User } from '../types/auth';

const useAuthStore = create<AuthState>((set) => ({
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
    set({ loading: true, error: null });
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const firebaseUser = userCredential.user;

      await firebaseUser.updateProfile({
        displayName: `${nombre} ${apellido}`
      });

      await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .set({
          nombre,
          apellido,
          email,
          telefono,
          created_at: firestore.FieldValue.serverTimestamp(),
          lastAccess: firestore.FieldValue.serverTimestamp()
        });

      const user: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        nombre,
        apellido,
        telefono
      };

      set({ user, loading: false });


      return firebaseUser;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      console.log(error);
      throw error;
    }
  },

  // Inicio de sesión
  loginUser: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const firebaseUser = userCredential.user;

      // Obtener datos adicionales del usuario desde Firestore
      const userDoc = await firestore().collection('users').doc(firebaseUser.uid).get();
      const userData = userDoc.data();

      if (userData) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          nombre: userData.nombre,
          apellido: userData.apellido,
          telefono: userData.telefono
        };
        set({ user, loading: false });
        // Redirigir a la pantalla principal después del inicio de sesión
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
      console.log(error);
      throw error;
    }
  },

  // Cerrar sesión
  logoutUser: async () => {
    try {
      await auth().signOut();
      set({ user: null });
    } catch (error: any) {
      console.log(error);
    }
  },

  // Limpiar errores
  clearError: () => set({ error: null }),


  checkUserSession: () => {
    set({ loading: true });

    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await firestore().collection('users').doc(firebaseUser.uid).get();
        const userData = userDoc.data();

        if (userData) {
          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              nombre: userData.nombre,
              apellido: userData.apellido,
              telefono: userData.telefono,
            },
            loading: false,
          });
        }
      } else {
        set({ user: null, loading: false });
      }
    });

    return () => unsubscribe(); // Desuscribirse cuando el componente se desmonte
  },
}));

export default useAuthStore;
