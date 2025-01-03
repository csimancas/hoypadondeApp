import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Navigation from './src/navigation';
import { useColorScheme } from 'react-native';
import colors from './src/utils/colors';


const lightTheme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...colors.lightTheme.colors,
  },
};

const darkTheme = {
  roundness: 8,
  colors: {
    ...colors.darkTheme.colors,
  },
};

console.log(colors)

function App(): React.JSX.Element {

  return (
    <PaperProvider theme={darkTheme}>
      <Navigation />
    </PaperProvider>
  );
}

export default App;
