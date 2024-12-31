import { useColorScheme } from 'react-native';

const colors = {
  lightTheme: {
    roundness: 8,
    colors: {
      primary: '#D4AF37',
      background: '#EFE8D8',
      text: '#000000',
      accent: '#1A242F',
      disabled: '#E0E0E0',
      placeholder: '#888888',
    },
  },
  darkTheme: {
    roundness: 8,
    colors: {
      primary: '#D4AF37',
      background: '#1A242F',
      text: '#FFFFFF',
      accent: '#EFE8D8',
      disabled: '#888888',
      placeholder: '#CCCCCC',
    },
  },
};

const usePreferredTheme = () => {
  const colorScheme = useColorScheme(); // Devuelve 'light' o 'dark'
  
  return colorScheme === 'dark' ? colors.darkTheme : colors.lightTheme;
};

export default colors;
export { usePreferredTheme };
