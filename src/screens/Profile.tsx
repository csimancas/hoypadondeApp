import React from 'react';
import { View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';


const Home = () => {
  return (
    <WebView source={{ uri: 'https://drive.google.com/file/d/1VpZ_yPoUbfEfIOg2EKWJnCp-kdV1A3s6/view?usp=drive_link' }} style={{ flex: 1 }} />
    
    // <View>
    //   <Text>Profile</Text>
    // </View>
  );
};


export default Home;
