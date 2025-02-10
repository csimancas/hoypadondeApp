import create from 'zustand';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type UserState = {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
};

export const useUserStore = create<UserState>((set: (arg0: { user: any; }) => any) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));
