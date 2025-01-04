import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';
import Map from '../screens/Map';
import LogIn from '../screens/LogIn';

import colors from '../utils/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente para los iconos generales
const TabIcon = ({ route, focused, color, size }) => {
  let iconName;
  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'user' : 'user-o';
  } else if (route.name === 'Map') {
    iconName = focused ? 'map-marker' : 'map-marker';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colors.darkTheme.colors.background,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          return <TabIcon route={route} focused={focused} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default Navigation;
