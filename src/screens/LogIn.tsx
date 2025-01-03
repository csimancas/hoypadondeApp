import React from 'react';
import { View,  Button, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import NavigationMethods from '../utils/navigation';
import ScreenContainer from '../components/ui/atoms/ScreenContainer';


const LogIn = () => {
  const { navigateTo } = NavigationMethods();
  return (
    <ScreenContainer>
      <View style={styles.logoContainer}>

      <Image source={require('../assets/logo_nombre.png')} style={styles.logo} resizeMode='contain'/>
      </View>
      
      <TextInput
        outlineColor="white"
        selectionColor="white"
        label="Email"
        style={{width: "100%", height: 50, marginTop: 20}}
      />
      <TextInput
        label="Contraseña"
        style={{width: "100%", height: 50, marginTop: 20}}
      />
      <Button
        title="Iniciar Sesión"
        onPress={() => {
          navigateTo('Home');
        }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width: 200,
    height: 200,
  },
  logo:{
    width: 50,
    height: 50,
  }
});

export default LogIn;
