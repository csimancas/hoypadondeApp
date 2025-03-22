import React, { useState } from 'react';
import { Alert, View, Image, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import NavigationMethods from '../../../utils/navigation';
import ScreenContainer from '../atoms/ScreenContainer';
import Label from '../atoms/Label';
import Button from '../atoms/button';
import colors from '../../../utils/colors';
import useAuthStore from '../../../store/authStore';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga
  const { navigateTo } = NavigationMethods();
  const { loginUser } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña.');
      return;
    }
    
    setLoading(true);
    try {
      await loginUser(email, password);
      navigateTo('LogInRouter');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/logo_nombre.png')} 
          style={styles.image} 
          resizeMode="contain"
        />
      </View>

      <TextInput
        autoCapitalize="none"
        label="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        gutterTop={20}
        useAnonymous={false}
        width={'100%'}
        variant={'outlined'}
        text={loading ? 'Cargando...' : 'Iniciar Sesión'}
        borderColor={colors.darkTheme.colors.primary}
        borderRadiusRounded={4}
        isShowLoader={loading}
        isLoading={loading}
        color={colors.darkTheme.colors.text}
        backgroundColor={colors.darkTheme.colors.primary}
        action={handleLogin}
        disabled={loading} // Desactiva el botón mientras carga
      />

      <View style={styles.registerContainer}>
        <Label variant="content" style={styles.registerText}>
          ¿Aún no tienes una cuenta?
        </Label>
        <Pressable onPress={() => navigateTo('Register')}>
          <Label variant="title3" style={styles.registerLink}>
            Regístrate aquí
          </Label>
        </Pressable>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  input: {
    width: '100%',
    height: 50,
    marginTop: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  registerText: {
    color: 'white',
    zIndex: 1,
  },
  registerLink: {
    color: colors.darkTheme.colors.primary,
    fontWeight: 'bold',
  },
});

export default LogIn;
