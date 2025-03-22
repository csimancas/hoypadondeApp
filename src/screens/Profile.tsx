import React from 'react';
import { View, Text, Button } from 'react-native';
import useAuthStore from '../store/authStore';
import NavigationMethods from '../utils/navigation';


const Home = () => {
  const { navigateTo } = NavigationMethods();
  const { logoutUser } = useAuthStore();

  const handleLogout = () => {
    try {
      logoutUser().then(() => {
        navigateTo('Login');
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
   <View>
    <Button
     onPress={() => logoutUser()}
      title="Learn More"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
   </View>
    
    // <View>
    //   <Text>Profile</Text>
    // </View>
  );
};


export default Home;
