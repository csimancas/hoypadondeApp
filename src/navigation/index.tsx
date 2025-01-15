import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import OtherIcon from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';
import Map from '../screens/Map';
import LogIn from '../screens/LogIn';
import BussinesDetail from '../screens/BussinesDetail';

import colors from '../utils/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente para los iconos generales
const TabIcon = ({ route, focused, color, size }) => {
  let iconName;
  let isOtherIcon = false;

  if (route.name === 'Home') {
    iconName = 'home';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'user' : 'user-o';
  } else if (route.name === 'Map') {
    iconName = 'map-marker';
  } else if (route.name === 'Favorites') {
    iconName = 'favorite';
    isOtherIcon = true;
  }

  if (isOtherIcon) {
    return <OtherIcon name={iconName} size={size} color={color} />;
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
          height: 70,
          paddingBottom: 30,
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
      <Tab.Screen name="Favorites" component={Favorites} />
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
      <Stack.Screen name="BussinesDetail" component={BussinesDetail} />
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
