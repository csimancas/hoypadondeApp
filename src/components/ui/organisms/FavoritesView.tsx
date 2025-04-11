import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Selector from '../atoms/Selector';
import FavPromotions from '../molecules/FavPromotions';
import FavBusiness from '../molecules/FavBusiness';

const FavoriteView = () => {
  const [selectedView, setSelectedView] = useState('businesses');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Mis Favoritos</Text>

        <Selector selectedView={selectedView} onViewChange={setSelectedView} />

        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          {selectedView === 'businesses' ? <FavBusiness /> : <FavPromotions />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333333',
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
  },
});

export default FavoriteView;
