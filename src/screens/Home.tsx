import React from 'react';
import { View, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import BussinesCard from '../components/ui/molecules/BussinesCard';
import color from '../utils/res/color';

const Home = () => {
  return (
    <>
<ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <BussinesCard />
          <BussinesCard />
          <BussinesCard />
          <BussinesCard />
          <BussinesCard />
        </View>
      </SafeAreaView>
</ScrollView>
    </>
  );
};

export default Home;
