import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import BussinesCard from '../components/ui/molecules/BussinesCard';
import color from '../utils/res/color';

const Home = () => {
  return (
    <>

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <BussinesCard />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
