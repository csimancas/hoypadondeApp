import {create} from 'zustand';
import firestore from '@react-native-firebase/firestore';

const useBusinessStore = create((set, get) => ({
  businesses: [],
  selectedBusiness: null,
  loading: false,
  error: null,

  setBusinesses: businesses => set({businesses, loading: false}),
  setLoading: loading => set({loading}),
  setError: error => set({error, loading: false}),

  fetchBusinesses: async () => {
    set({loading: true, error: null});
    try {
      const querySnapshot = await firestore().collection('businesses').get();
      if (querySnapshot.empty) {
        set({businesses: [], loading: false});
        return;
      }

      const businesses = querySnapshot.docs.map(documentSnapshot => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
        promotions: [],
      }));

      const querySnapshotPromotions = await firestore()
        .collection('promotions')
        .get();

      if (!querySnapshotPromotions.empty) {
        const allPromotions = querySnapshotPromotions.docs.map(
          documentSnapshot => ({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          }),
        );
        // arreglar mas adelante
        // businesses.forEach(item => {
        //   allPromotions.forEach(promotion => {
        //     if (promotion.business_id === item.id) {
        //       item.promotions.push(promotion);
        //     }
        //   });
        // });
        //
        const promotionsByBusinessId = {};
        allPromotions.forEach(promotion => {
          const businessId = promotion.business_id;
          if (!promotionsByBusinessId[businessId]) {
            promotionsByBusinessId[businessId] = [];
          }
          promotionsByBusinessId[businessId].push(promotion);
        });

        // Asignar promociones a cada negocio
        businesses.forEach(business => {
          business.promotions = promotionsByBusinessId[business.id] || [];
        });
      }

      set({
        businesses,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Error al cargar los datos',
        loading: false,
      });
    }
  },

  setSelectedBusiness: business => set({selectedBusiness: business}),
}));

export default useBusinessStore;
