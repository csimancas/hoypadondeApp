import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type CustomTextProps = {
  content: string; // El texto que se mostrará
  color?: string; // El color del texto
  variant?: 'displayLarge' | 'displayMedium' | 'displaySmall' |
            'headlineLarge' | 'headlineMedium' | 'headlineSmall' |
            'titleLarge' | 'titleMedium' | 'titleSmall' |
            'bodyLarge' | 'bodyMedium' | 'bodySmall' |
            'labelLarge' | 'labelMedium' | 'labelSmall'; // Tamaño del texto (según los estilos de React Native Paper)
};

const CustomText: React.FC<CustomTextProps> = ({
  content,
  color = '#000000', // Color por defecto: negro
  variant = 'bodyMedium', // Variante por defecto
}) => {
  return (
    <Text style={[styles.text, { color }]} variant={variant}>
      {content}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 4, // Espaciado entre líneas de texto
  },
});

export default CustomText;
