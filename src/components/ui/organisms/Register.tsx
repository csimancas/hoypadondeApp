import React from 'react';
import { View, StyleSheet, Pressable} from 'react-native';
import { TextInput } from 'react-native-paper';
import NavigationMethods from '../../../utils/navigation';
import ScreenContainer from '../atoms/ScreenContainer';
import Label from '../atoms/Label';
import Button from '../atoms/button';
import colors from '../../../utils/colors';

const RegisterUser = () => {
  const { navigateTo, goBack } = NavigationMethods();
  
  return (
    <ScreenContainer>
        <View style={styles.titleContainer}>
            <Label variant="title" style={{color: 'white', textAlign: 'center'}}>¡Bienvenido a Hoy pa Donde! Solo necesitamos algunos datos para personalizar tu experiencia.</Label>
        </View>
        <TextInput
        label="Nombre"
        style={styles.inputStyle}
      />
      <TextInput
        label="Apellido"
        style={styles.inputStyle}
      />
      <TextInput
        label="Teléfono"
        style={styles.inputStyle}
      />
      <TextInput
        label="Email"
        style={styles.inputStyle}
      />
      <TextInput
        label="Contraseña"
        style={styles.inputStyle}
      />
      <TextInput
        label="Repetir contraseña"
        style={styles.inputStyle}
      />
      <Button
				gutterTop={20}
				useAnonymous={false}
				width={'100%'}
				variant={'outlined'}
				text={'Registrarme'}
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
      <View style={styles.textContainer}>
        <Label variant="content" style={styles.primaryLabel}>¿Ya tienes una cuenta?</Label>
          <Pressable onPress={() => goBack()}>
            <Label variant="title3" style={styles.secondaryLabel}> Iniciar sesión</Label>
          </Pressable>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
    titleContainer:{

    },
  inputStyle: {
    width: '100%', height: 50, marginTop: 20
  },
  textContainer:{
    flexDirection: 'column', marginTop: 20, justifyContent:'center', alignItems: 'center',
  },
  primaryLabel:{
    color: 'white',
  },
secondaryLabel:{
    color: colors.darkTheme.colors.primary,
    fontWeight: 'bold',
},
});

export default RegisterUser;
