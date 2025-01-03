import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation';

function App(): React.JSX.Element {

  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}

export default App;
