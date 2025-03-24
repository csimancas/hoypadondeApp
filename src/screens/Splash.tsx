import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import NavigationMethods from '../utils/navigation';
import ScreenContainer from '../components/ui/atoms/ScreenContainer';
import useAuthStore from '../store/authStore';

const Splash = () => {
  const { user, checkUserSession } = useAuthStore();
  const { navigateTo } = NavigationMethods();

  useEffect(() => {
    checkUserSession();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigateTo('HomeStack');
      } else {
        navigateTo('LogIn');
      }
    }, 2000);

    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, [user]); // Dependencia de `user`

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
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
  image: {
    width: 300,
    height: 300,
  },
});

export default Splash;