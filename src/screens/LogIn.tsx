import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import NavigationMethods from '../utils/navigation';
import ScreenContainer from '../components/ui/atoms/ScreenContainer';
// import Button from '../components/ui/atoms/Button';
import Button from '../components/ui/atoms/button';
import colors from '../utils/colors';


const LogIn = () => {
  const { navigateTo } = NavigationMethods();
  return (
    <ScreenContainer>
      <View style={styles.logoContainer}>

      <Image source={require('../assets/logo_nombre.png')} style={styles.image} resizeMode="contain"/>
      </View>
      <TextInput
        label="Email"
        style={{width: '100%', height: 50, marginTop: 20}}
      />
      <TextInput
        label="Contraseña"
        style={{width: '100%', height: 50, marginTop: 20}}
      />
    <Button
						gutterTop={20}
						useAnonymous={false}
						width={'100%'}
						variant={'outlined'}
						text={'Iniciar Sesión'}
						borderColor={colors.darkTheme.colors.primary}
						borderRadiusRounded={4}
						isShowLoader={false}
						isLoading={false}
						color={colors.darkTheme.colors.text}
						backgroundColor={colors.darkTheme.colors.primary}
						action={() => {
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
    width: 250,
    height: 250,
  },
  logo:{
    width: 50,
    height: 50,
  },
});

export default LogIn;
