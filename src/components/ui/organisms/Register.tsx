import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import NavigationMethods from '../../../utils/navigation';
import ScreenContainer from '../atoms/ScreenContainer';
import Label from '../atoms/Label';
import Button from '../atoms/button';
import colors from '../../../utils/colors';
import useAuthStore from '../../../store/authStore';

interface NavigationMethods {
  navigateTo: (screen: string) => void;
  goBack: () => void;
}

const RegisterUser: React.FC = () => {
  const { navigateTo, goBack }: NavigationMethods = NavigationMethods();
  const { registerUser, loading, error, clearError } = useAuthStore();
  
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  // Función para validar el formulario
  const validateForm = (): boolean => {
    if (!nombre || !apellido || !telefono || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return false;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Email inválido');
      return false;
    }
    
    // Validación de teléfono (solo números)
    if (!/^\d+$/.test(telefono)) {
      Alert.alert('Error', 'El teléfono debe contener solo números');
      return false;
    }
    
    return true;
  };
  
  // Función para manejar el registro
  const handleRegister = async (): Promise<void> => {
    if (!validateForm()) return;
    
    try {
      await registerUser(nombre, apellido, telefono, email, password).then(() => {
        navigateTo('LogInRouter');
      });
    } catch (error: any) {
      let errorMessage = 'Error al registrar usuario';
      
      switch(error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo ya está registrado';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres';
          break;
      }
      
      Alert.alert('Error', errorMessage);
    }
  };
  
  // Si hay un error en el store, mostrarlo
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      clearError();
    }
  }, [error, clearError]);
  
  return (
    <ScreenContainer>
      <View style={styles.titleContainer}>
        <Label variant="title" style={{color: 'white', textAlign: 'center'}}>
          ¡Bienvenido a Hoy pa Donde! Solo necesitamos algunos datos para personalizar tu experiencia.
        </Label>
      </View>
      <TextInput
        label="Nombre"
        style={styles.inputStyle}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        label="Apellido"
        style={styles.inputStyle}
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        label="Teléfono"
        style={styles.inputStyle}
        value={telefono}
        onChangeText={(text) => {
          setTelefono(text.slice(0, 10)); // Limita a 10 caracteres
        }}
        keyboardType="phone-pad"
      />
      <TextInput
        label="Email"
        style={styles.inputStyle}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Contraseña"
        style={styles.inputStyle}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        label="Repetir contraseña"
        style={styles.inputStyle}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button
        gutterTop={20}
        useAnonymous={false}
        width={'100%'}
        variant={'outlined'}
        text={'Registrarme'}
        borderColor={colors.darkTheme.colors.primary}
        borderRadiusRounded={4}
        isShowLoader={true}
        isLoading={loading}
        color={colors.darkTheme.colors.text}
        backgroundColor={colors.darkTheme.colors.primary}
        action={handleRegister}
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
    marginBottom: 10
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