import { create } from 'zustand';
import firestore from '@react-native-firebase/firestore';

const useBusinessStore = create((set, get) => ({
  businesses: [],
  selectedBusiness: null,
  loading: false,
  error: null,

  setBusinesses: (businesses) => set({ businesses, loading: false }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),

  fetchBusinesses: async () => {
    set({ loading: true, error: null });
    try {
      const querySnapshot = await firestore().collection('businesses').get();
      if (querySnapshot.empty) {
        set({ businesses: [], loading: false });
        return;
      }
      const businesses = querySnapshot.docs.map(documentSnapshot => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data()
      }));
      set({ businesses, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setSelectedBusiness: (business) => set({ selectedBusiness: business }),
}));

export default useBusinessStore;
