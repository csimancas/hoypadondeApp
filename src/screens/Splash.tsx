import React, {useEffect} from 'react';
import { View,  Image, StyleSheet } from 'react-native';
import NavigationMethods from '../utils/navigation';
import ScreenContainer from '../components/ui/atoms/ScreenContainer';

const Splash = () => {
  const { navigateTo } = NavigationMethods();

  useEffect(() => {
    setTimeout(() => {
      navigateTo('LogIn');
    }, 2000);
  }, [navigateTo]);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.image}/>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width: 300,
    height: 300,
    // marginTop: -60,
  },
});

export default Splash;
